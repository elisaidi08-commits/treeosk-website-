"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * KioskMorph3D — « Product Morphing » : borne Treeosk (monolithe chrome MIROIR poli, arrondi,
 * calqué sur nos vraies bornes) qui reste fixe et déploie un MODULE 3D par expérience
 * (anneau+caméra photobooth, bras laser gravure, manette gaming, diffuseur scent, hôtesse,
 * cluster custom). Écran + halo prennent la couleur de l'expérience. Chrome via env-map clair
 * → lisible en LIGHT comme en DARK. Procédural, aucune dépendance hors `three`.
 */
export default function KioskMorph3D({
  active,
  accent,
  light = true,
}: {
  active: number;
  accent: string;
  light?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const accentRef = useRef(accent);
  const lightRef = useRef(light);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    accentRef.current = accent;
  }, [accent]);
  useEffect(() => {
    lightRef.current = light;
  }, [light]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, w() / h(), 0.1, 100);
    camera.position.set(0, 0.3, 6.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    mount.appendChild(renderer.domElement);

    // Env-map chrome clair (reflets polis) — indépendant du thème → borne lisible light & dark.
    const cnv = document.createElement("canvas");
    cnv.width = 8;
    cnv.height = 256;
    const cx = cnv.getContext("2d")!;
    const grd = cx.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0.0, "#ffffff");
    grd.addColorStop(0.26, "#f0f3f6");
    grd.addColorStop(0.5, "#cbd2d8");
    grd.addColorStop(0.62, "#8f979e"); // ligne de reflet (définit les arêtes)
    grd.addColorStop(0.8, "#dbe1e5");
    grd.addColorStop(1.0, "#aeb5bb");
    cx.fillStyle = grd;
    cx.fillRect(0, 0, 8, 256);
    const envTex = new THREE.CanvasTexture(cnv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    scene.environment = envTex;

    // Matériau PHYSIQUE avec clearcoat (fini produit réaliste, moins « CGI »).
    const chromeMats: THREE.MeshPhysicalMaterial[] = [];
    const chrome = () => {
      const m = new THREE.MeshPhysicalMaterial({
        color: 0xeceef0,
        metalness: 1,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        envMap: envTex,
        envMapIntensity: 2.0,
      });
      chromeMats.push(m);
      return m;
    };
    // Finition selon le thème : BLANC laqué (clearcoat) en light, chrome miroir en dark.
    let curLight: boolean | null = null;
    const applyFinish = (isLight: boolean) => {
      chromeMats.forEach((m) => {
        if (isLight) {
          m.color.setHex(0xffffff);
          m.metalness = 0.0;
          m.roughness = 0.5;
          m.clearcoat = 1;
          m.clearcoatRoughness = 0.28;
          m.envMapIntensity = 0.7;
        } else {
          m.color.setHex(0xeceef0);
          m.metalness = 1;
          m.roughness = 0.08;
          m.clearcoat = 1;
          m.clearcoatRoughness = 0.1;
          m.envMapIntensity = 2.0;
        }
      });
    };
    const dark = () =>
      new THREE.MeshStandardMaterial({ color: 0x15171b, metalness: 0.7, roughness: 0.45, envMap: envTex });

    // Matériaux émissifs (prennent la couleur de l'expérience)
    const accentMats: THREE.MeshStandardMaterial[] = [];
    const accentMat = (base = 0x0c0d10) => {
      const m = new THREE.MeshStandardMaterial({
        color: base,
        metalness: 0.4,
        roughness: 0.4,
        emissive: 0x3a5a7a,
        emissiveIntensity: 0.4,
      });
      accentMats.push(m);
      return m;
    };

    // ---- BORNE (monolithe chrome, comme nos vraies bornes) --------------------------------
    const kiosk = new THREE.Group();
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.7, 3.15, 1.15, 10, 0.34), chrome());
    kiosk.add(body);
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.85, 0.18, 1.3, 5, 0.06), chrome());
    base.position.y = -1.62;
    kiosk.add(base);
    // Écran sombre (lueur accent = « allumé »)
    const screen = new THREE.Mesh(new RoundedBoxGeometry(0.92, 1.5, 0.04, 4, 0.06), accentMat(0x0a0b0e));
    screen.position.set(0, 0.25, 0.6);
    kiosk.add(screen);

    kiosk.position.y = 0.12;
    scene.add(kiosk);

    // Ombre de contact douce au sol (« pose » la borne — gros gain de réalisme)
    const shcnv = document.createElement("canvas");
    shcnv.width = 256;
    shcnv.height = 256;
    const shx = shcnv.getContext("2d")!;
    const rg = shx.createRadialGradient(128, 128, 8, 128, 128, 128);
    rg.addColorStop(0, "rgba(0,0,0,0.55)");
    rg.addColorStop(0.55, "rgba(0,0,0,0.2)");
    rg.addColorStop(1, "rgba(0,0,0,0)");
    shx.fillStyle = rg;
    shx.fillRect(0, 0, 256, 256);
    const shadowTex = new THREE.CanvasTexture(shcnv);
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.6, 2.4),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.set(0, -1.62, 0.1);
    scene.add(shadow);

    // ---- MODULES (un par expérience) ------------------------------------------------------
    const modules: THREE.Group[] = [];

    // 0 · Photobooth — anneau lumineux + objectif
    const mPhoto = new THREE.Group();
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.05, 20, 60), accentMat());
    ring.position.set(0, 0.7, 0.78);
    mPhoto.add(ring);
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.18, 24), chrome());
    lens.rotation.x = Math.PI / 2;
    lens.position.set(0, 0.7, 0.86);
    mPhoto.add(lens);
    modules.push(mPhoto);

    // 1 · Gravure — bras robotisé/laser articulé
    const mLaser = new THREE.Group();
    const arm1 = new THREE.Mesh(new RoundedBoxGeometry(0.13, 0.8, 0.13, 3, 0.05), chrome());
    arm1.position.set(0.78, 0.95, 0.6);
    arm1.rotation.z = 0.55;
    mLaser.add(arm1);
    const arm2 = new THREE.Mesh(new RoundedBoxGeometry(0.11, 0.66, 0.11, 3, 0.04), chrome());
    arm2.position.set(0.4, 0.45, 0.68);
    arm2.rotation.z = -0.75;
    mLaser.add(arm2);
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), accentMat());
    tip.position.set(0.14, 0.18, 0.72);
    mLaser.add(tip);
    modules.push(mLaser);

    // 2 · Gaming — manette flottante
    const mGame = new THREE.Group();
    const pad = new THREE.Mesh(new RoundedBoxGeometry(0.56, 0.28, 0.15, 4, 0.06), dark());
    pad.position.set(0, -0.05, 1.05);
    pad.rotation.x = -0.3;
    mGame.add(pad);
    for (const dx of [-0.14, 0.14]) {
      const stick = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), accentMat());
      stick.position.set(dx, 0.03, 1.13);
      mGame.add(stick);
    }
    modules.push(mGame);

    // 3 · Scent — buse diffuseur + volutes
    const mScent = new THREE.Group();
    const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 0.3, 24), chrome());
    nozzle.position.set(0, 1.75, 0.3);
    mScent.add(nozzle);
    for (let i = 0; i < 4; i++) {
      const mist = new THREE.Mesh(new THREE.SphereGeometry(0.06 - i * 0.01, 12, 12), accentMat());
      mist.position.set((i % 2 ? 0.06 : -0.06) * (i + 1), 1.98 + i * 0.2, 0.3);
      mScent.add(mist);
    }
    modules.push(mScent);

    // 4 · Kiosk & hôtesse virtuelle — silhouette devant l'écran
    const mHost = new THREE.Group();
    const headH = new THREE.Mesh(new THREE.SphereGeometry(0.13, 20, 20), accentMat());
    headH.position.set(0, 0.6, 0.72);
    mHost.add(headH);
    const bodyH = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.24, 0.78, 24), accentMat());
    bodyH.position.set(0, 0.08, 0.72);
    mHost.add(bodyH);
    modules.push(mHost);

    // 5 · Custom — cluster de blocs modulaires
    const mCustom = new THREE.Group();
    const spots = [
      [-0.3, 0.6, 0.78],
      [0.32, 0.25, 0.85],
      [-0.12, -0.15, 0.88],
      [0.27, 0.7, 0.76],
    ];
    spots.forEach((s, i) => {
      const cube = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.22, 0.22, 3, 0.05), i % 2 ? accentMat() : chrome());
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
    // Éclairage studio adouci (key + fill + rim) → séparation, moins « flat CGI ».
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 0.85);
    fill.position.set(-5, 2, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-2, 3, -5);
    scene.add(rim);
    const accentLight = new THREE.PointLight(0x3a5a7a, 5, 18);
    accentLight.position.set(0, 0.4, 3);
    scene.add(accentLight);
    scene.add(new THREE.AmbientLight(0xcbced2, 0.5));

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
      if (curLight !== lightRef.current) {
        curLight = lightRef.current;
        applyFinish(curLight);
      }
      col.set(accentRef.current);
      accentMats.forEach((m) => m.emissive.lerp(col, 0.12));
      accentLight.color.lerp(col, 0.1);

      modules.forEach((m, i) => {
        const target = i === activeRef.current ? 1 : 0;
        const s = THREE.MathUtils.lerp(m.scale.x, target, 0.16);
        m.scale.setScalar(s);
        m.visible = s > 0.02;
      });

      kiosk.rotation.y = Math.sin(t * 0.25) * 0.1 + mouse.x * 0.22;
      kiosk.rotation.x = mouse.y * 0.08;
      kiosk.position.y = 0.12 + Math.sin(t * 0.6) * 0.05;
      camera.lookAt(0, 0.12, 0);
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
      shadowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
