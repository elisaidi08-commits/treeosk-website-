"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * HeroKiosk3D — kiosque Treeosk crédible en 3D (procédural : socle + cabinet + grand écran
 * encadré + canopée lumineuse), même modèle que le morphing pour la cohérence. Ici il TOURNE
 * lentement sur lui-même + réagit au curseur. Matière chrome argenté froid, écran lueur acier.
 * Reduced-motion → statique. Aucune dépendance hors `three`.
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
    const camera = new THREE.PerspectiveCamera(40, w() / h(), 0.1, 100);
    camera.position.set(0, 0.35, 6.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    mount.appendChild(renderer.domElement);

    const cnv = document.createElement("canvas");
    cnv.width = 8;
    cnv.height = 256;
    const cx = cnv.getContext("2d")!;
    const gr = cx.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0.0, "#ffffff");
    gr.addColorStop(0.16, "#eef1f4");
    gr.addColorStop(0.34, "#dde2e6");
    gr.addColorStop(0.46, "#41627f"); // fine bande d'acier
    gr.addColorStop(0.54, "#d2d8dd");
    gr.addColorStop(0.72, "#b0b6bc");
    gr.addColorStop(1.0, "#7c8288");
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
    const steelGlow = new THREE.MeshStandardMaterial({
      color: 0x0a0b0e,
      metalness: 0.4,
      roughness: 0.4,
      emissive: 0x3a5a7a,
      emissiveIntensity: 0.8,
    });

    const kiosk = new THREE.Group();
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.7, 0.28, 1.25, 5, 0.07), chrome());
    base.position.y = -1.7;
    kiosk.add(base);
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.35, 2.55, 1.0, 6, 0.12), chrome());
    body.position.y = -0.25;
    kiosk.add(body);
    const canopy = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.34, 1.12, 5, 0.09), chrome());
    canopy.position.y = 1.18;
    kiosk.add(canopy);
    const lightbar = new THREE.Mesh(new RoundedBoxGeometry(1.2, 0.06, 0.06, 3, 0.02), steelGlow);
    lightbar.position.set(0, 1.18, 0.57);
    kiosk.add(lightbar);
    const bezel = new THREE.Mesh(new RoundedBoxGeometry(1.0, 1.55, 0.1, 5, 0.05), chrome());
    bezel.position.set(0, 0.15, 0.5);
    kiosk.add(bezel);
    const screen = new THREE.Mesh(new RoundedBoxGeometry(0.84, 1.36, 0.04, 4, 0.03), steelGlow);
    screen.position.set(0, 0.15, 0.57);
    kiosk.add(screen);
    kiosk.position.y = 0.15;
    scene.add(kiosk);

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 1.0);
    fill.position.set(-5, 2, 3);
    scene.add(fill);
    const steel = new THREE.PointLight(0x3a5a7a, 16, 20);
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
      kiosk.rotation.y += 0.006; // rotation continue
      kiosk.rotation.x = Math.sin(t * 0.4) * 0.05 + mouse.y * 0.14;
      kiosk.position.y = 0.15 + Math.sin(t * 0.6) * 0.05;
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.lookAt(0, 0.15, 0);
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
