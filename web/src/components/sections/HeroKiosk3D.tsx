"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * HeroKiosk3D — kiosque Treeosk stylisé en 3D (procédural, aucun modèle externe) : corps chrome
 * à bords arrondis + écran sombre + socle, qui TOURNE lentement sur lui-même et réagit au curseur.
 * Matière chrome argenté froid (env-map gradient + touche d'acier), DA respectée. Reduced-motion
 * → une seule frame (statique). Aucune dépendance hors `three`.
 */
export default function HeroKiosk3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w() / h(), 0.1, 100);
    camera.position.set(0, 0.4, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // Environnement réfléchi : gradient chrome argenté froid + une fine bande d'acier.
    const cnv = document.createElement("canvas");
    cnv.width = 8;
    cnv.height = 256;
    const ctx = cnv.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    g.addColorStop(0.0, "#ffffff");
    g.addColorStop(0.14, "#eef1f4");
    g.addColorStop(0.3, "#dde2e6");
    g.addColorStop(0.46, "#41627f"); // fine bande d'acier
    g.addColorStop(0.54, "#d2d8dd");
    g.addColorStop(0.72, "#b0b6bc");
    g.addColorStop(1.0, "#7c8288");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 256);
    const envTex = new THREE.CanvasTexture(cnv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    scene.environment = envTex;

    const kiosk = new THREE.Group();

    const chrome = new THREE.MeshStandardMaterial({
      color: 0xe6e8ea,
      metalness: 1,
      roughness: 0.22,
      envMap: envTex,
      envMapIntensity: 1.9,
    });
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x0c0d10,
      metalness: 0.5,
      roughness: 0.45,
      envMap: envTex,
      envMapIntensity: 0.6,
    });

    // Corps
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.35, 2.7, 1.15, 6, 0.14), chrome);
    kiosk.add(body);
    // Écran (proéminent, sombre)
    const screen = new THREE.Mesh(new RoundedBoxGeometry(0.86, 1.5, 0.1, 4, 0.05), screenMat);
    screen.position.set(0, 0.24, 0.6);
    kiosk.add(screen);
    // Bandeau haut (léger)
    const topbar = new THREE.Mesh(new RoundedBoxGeometry(1.4, 0.16, 1.2, 4, 0.06), chrome);
    topbar.position.set(0, 1.42, 0);
    kiosk.add(topbar);
    // Socle
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.2, 1.28, 4, 0.06), chrome);
    base.position.set(0, -1.44, 0);
    kiosk.add(base);

    kiosk.position.y = -0.1;
    scene.add(kiosk);

    // Lumières : key + fill blanches + rim acier.
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(4, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 1.0);
    fill.position.set(-5, 2, 3);
    scene.add(fill);
    const steel = new THREE.PointLight(0x3a5a7a, 18, 22);
    steel.position.set(-3, -1, 3);
    scene.add(steel);
    scene.add(new THREE.AmbientLight(0xcbced2, 0.6));

    const mouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!reduced) window.addEventListener("mousemove", onMove);

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      // rotation continue + attraction curseur + léger flottement
      kiosk.rotation.y += 0.006;
      kiosk.rotation.y += (mouse.x * 0.5 - (kiosk.rotation.y % (Math.PI * 2))) * 0; // (rotation libre)
      kiosk.rotation.x = Math.sin(t * 0.4) * 0.06 + mouse.y * 0.18;
      kiosk.position.y = -0.1 + Math.sin(t * 0.6) * 0.06;
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();
    if (reduced) cancelAnimationFrame(raf);

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
      kiosk.traverse((o) => {
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
