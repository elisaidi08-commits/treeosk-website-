"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * KioskMorph3D — « Product Morphing » (brief animation) : un vrai KIOSQUE Treeosk en 3D reste
 * fixe au centre (socle + cabinet + grand écran encadré + canopée) et SE TRANSFORME selon
 * l'expérience active : un module se déploie (anneau+caméra photobooth, bras laser gravure,
 * manette gaming, diffuseur scent, hôtesse virtuelle, cluster custom) et l'écran + un halo
 * prennent la couleur de l'expérience. Procédural, aucune dépendance hors `three`.
 */
export default function KioskMorph3D({ active, accent }: { active: number; accent: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const accentRef = useRef(accent);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    accentRef.current = accent;
  }, [accent]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w() / h(), 0.1, 100);
    camera.position.set(0, 0.35, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    mount.appendChild(renderer.domElement);

    // Env-map chrome argenté froid
    const cnv = document.createElement("canvas");
    cnv.width = 8;
    cnv.height = 256;
    const cx = cnv.getContext("2d")!;
    const gr = cx.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0.0, "#ffffff");
    gr.addColorStop(0.16, "#eef1f4");
    gr.addColorStop(0.34, "#dde2e6");
    gr.addColorStop(0.5, "#b6bdc3");
    gr.addColorStop(0.72, "#8a9096");
    gr.addColorStop(1.0, "#6a6f74");
    cx.fillStyle = gr;
    cx.fillRect(0, 0, 8, 256);
    const envTex = new THREE.CanvasTexture(cnv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    scene.environment = envTex;

    const chrome = () =>
      new THREE.MeshStandardMaterial({
        color: 0xdfe2e5,
        metalness: 1,
        roughness: 0.24,
        envMap: envTex,
        envMapIntensity: 2.0,
      });
    const dark = () =>
      new THREE.MeshStandardMaterial({ color: 0x14161a, metalness: 0.7, roughness: 0.5, envMap: envTex });

    // Matériaux qui prennent la couleur de l'expérience (émissif) — mis à jour chaque frame.
    const accentMats: THREE.MeshStandardMaterial[] = [];
    const accentMat = (base = 0x101216) => {
      const m = new THREE.MeshStandardMaterial({
        color: base,
        metalness: 0.4,
        roughness: 0.4,
        emissive: 0x3a5a7a,
        emissiveIntensity: 0.9,
      });
      accentMats.push(m);
      return m;
    };

    // ---- LE KIOSQUE (fixe) ----------------------------------------------------------------
    const kiosk = new THREE.Group();

    // socle
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.7, 0.28, 1.25, 5, 0.07), chrome());
    base.position.y = -1.7;
    kiosk.add(base);
    // cabinet (corps)
    const bodyGeo = new RoundedBoxGeometry(1.35, 2.55, 1.0, 6, 0.12);
    const body = new THREE.Mesh(bodyGeo, chrome());
    body.position.y = -0.25;
    kiosk.add(body);
    // canopée / bandeau haut (un peu plus large)
    const canopy = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.34, 1.12, 5, 0.09), chrome());
    canopy.position.y = 1.18;
    kiosk.add(canopy);
    // barre lumineuse de la canopée (émissive, prend l'accent)
    const lightbar = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.06, 0.06, 3, 0.02), accentMat(0x0c0d10));
    lightbar.position.set(0, 1.18, 0.57);
    kiosk.add(lightbar);
    // cadre écran (chrome)
    const bezel = new THREE.Mesh(new RoundedBoxGeometry(1.0, 1.55, 0.1, 5, 0.05), chrome());
    bezel.position.set(0, 0.15, 0.5);
    kiosk.add(bezel);
    // écran (verre sombre + lueur accent = « allumé »)
    const screen = new THREE.Mesh(new RoundedBoxGeometry(0.84, 1.36, 0.04, 4, 0.03), accentMat(0x0a0b0e));
    screen.position.set(0, 0.15, 0.57);
    kiosk.add(screen);

    kiosk.position.y = 0.15;
    scene.add(kiosk);

    // ---- MODULES (un par expérience) ------------------------------------------------------
    const modules: THREE.Group[] = [];

    // 0 · Photobooth — anneau lumineux + objectif caméra
    const mPhoto = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 20, 60), accentMat(0x0c0d10));
    ring.position.set(0, 0.62, 0.72);
    mPhoto.add(ring);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 0.16, 24), chrome());
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0.62, 0.78);
    mPhoto.add(lens);
    modules.push(mPhoto);

    // 1 · Gravure — bras laser articulé
    const mLaser = new THREE.Group();
    const arm1 = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.7, 0.12, 3, 0.04), chrome());
    arm1.position.set(0.7, 0.85, 0.55);
    arm1.rotation.z = 0.5;
    mLaser.add(arm1);
    const arm2 = new THREE.Mesh(new RoundedBoxGeometry(0.1, 0.6, 0.1, 3, 0.03), chrome());
    arm2.position.set(0.35, 0.42, 0.62);
    arm2.rotation.z = -0.7;
    mLaser.add(arm2);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), accentMat(0x101216));
    tip.position.set(0.12, 0.18, 0.66);
    mLaser.add(tip);
    modules.push(mLaser);

    // 2 · Gaming — manette flottante
    const mGame = new THREE.Group();
    const pad = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.26, 0.14, 4, 0.06), dark());
    pad.position.set(0, -0.1, 0.95);
    pad.rotation.x = -0.3;
    mGame.add(pad);
    for (const dx of [-0.13, 0.13]) {
      const stick = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), accentMat(0x101216));
      stick.position.set(dx, -0.02, 1.02);
      mGame.add(stick);
    }
    modules.push(mGame);

    // 3 · Scent — buse diffuseur + brume
    const mScent = new THREE.Group();
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 0.28, 24), chrome());
    nozzle.position.set(0, 1.5, 0.25);
    mScent.add(nozzle);
    for (let i = 0; i < 4; i++) {
      const mist = new THREE.Mesh(new THREE.SphereGeometry(0.05 - i * 0.008, 12, 12), accentMat(0x0c0d10));
      mist.position.set((i % 2 ? 0.05 : -0.05) * (i + 1), 1.7 + i * 0.18, 0.25);
      mScent.add(mist);
    }
    modules.push(mScent);

    // 4 · Kiosk & hôtesse virtuelle — silhouette sur l'écran
    const mHost = new THREE.Group();
    const headH = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), accentMat(0x0c0d10));
    headH.position.set(0, 0.5, 0.66);
    mHost.add(headH);
    const bodyH = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.22, 0.7, 24), accentMat(0x0c0d10));
    bodyH.position.set(0, 0.05, 0.66);
    mHost.add(bodyH);
    modules.push(mHost);

    // 5 · Bespoke / custom — cluster de blocs modulaires
    const mCustom = new THREE.Group();
    const spots = [
      [-0.28, 0.5, 0.72],
      [0.3, 0.2, 0.78],
      [-0.1, -0.15, 0.8],
      [0.25, 0.62, 0.7],
    ];
    spots.forEach((s, i) => {
      const cube = new THREE.Mesh(
        new RoundedBoxGeometry(0.2, 0.2, 0.2, 3, 0.04),
        i % 2 ? accentMat(0x101216) : chrome(),
      );
      cube.position.set(s[0], s[1], s[2]);
      cube.rotation.set(i * 0.4, i * 0.6, 0);
      mCustom.add(cube);
    });
    modules.push(mCustom);

    modules.forEach((m) => {
      m.scale.setScalar(0.001);
      m.visible = false;
      kiosk.add(m);
    });

    // ---- Lumières -------------------------------------------------------------------------
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 1.0);
    fill.position.set(-5, 2, 3);
    scene.add(fill);
    const accentLight = new THREE.PointLight(0x3a5a7a, 14, 18);
    accentLight.position.set(0, 0.4, 3);
    scene.add(accentLight);
    scene.add(new THREE.AmbientLight(0xcbced2, 0.6));

    const mouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!reduced) window.addEventListener("mousemove", onMove);

    const col = new THREE.Color();
    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      col.set(accentRef.current);

      // teinte accent : émissifs + lumière
      accentMats.forEach((m) => m.emissive.lerp(col, 0.12));
      accentLight.color.lerp(col, 0.1);

      // morph : le module actif se déploie, les autres se rétractent
      modules.forEach((m, i) => {
        const target = i === activeRef.current ? 1 : 0;
        const s = THREE.MathUtils.lerp(m.scale.x, target, 0.16);
        m.scale.setScalar(s);
        m.visible = s > 0.02;
      });

      // kiosque FIXE (léger flottement + réaction curseur, pas de rotation continue)
      kiosk.rotation.y = Math.sin(t * 0.25) * 0.1 + mouse.x * 0.22;
      kiosk.rotation.x = mouse.y * 0.1;
      kiosk.position.y = 0.15 + Math.sin(t * 0.6) * 0.05;

      camera.lookAt(0, 0.15, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
