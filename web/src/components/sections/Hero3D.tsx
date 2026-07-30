"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Objet 3D signature — torus-knot chrome métallique réfléchissant, éclairé
 * par un environnement gradient chrome argenté + une fine bande d'acier (accent contenu).
 * Réactif au curseur (rotation) et au scroll (parallax). Reduced-motion → statique.
 * Palette 100% DA : chrome argenté froid + touche d'acier #3a5a7a. Aucune dépendance hors `three`.
 */
export default function Hero3D({ scrollParallax = true }: { scrollParallax?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const w = () => mount.clientWidth;
    const h = () => mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    // Environnement réfléchi : gradient chrome vertical + streak laiton au centre.
    const cnv = document.createElement("canvas");
    cnv.width = 8;
    cnv.height = 256;
    const ctx = cnv.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 256);
    // chrome argenté froid : sheen spectral TRÈS désaturé + une seule fine bande d'acier
    g.addColorStop(0.0, "#ffffff");
    g.addColorStop(0.12, "#eef1f4"); // cool white
    g.addColorStop(0.26, "#cfd5da"); // silver froid
    g.addColorStop(0.4, "#aeb4ba"); // silver moyen
    g.addColorStop(0.47, "#3a5a7a"); // fine bande d'acier (unique touche colorée)
    g.addColorStop(0.54, "#c2cad0"); // retour argent immédiat (bleu contenu)
    g.addColorStop(0.68, "#9aa0a6"); // silver froid
    g.addColorStop(0.82, "#7c8288");
    g.addColorStop(1.0, "#565b60");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 256);
    const envTex = new THREE.CanvasTexture(cnv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    scene.environment = envTex;

    const geo = new THREE.TorusKnotGeometry(0.85, 0.27, 240, 36);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xe6e8ea,
      metalness: 1,
      roughness: 0.22,
      envMap: envTex,
      envMapIntensity: 2.0,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Lumières : key + fill blanches (éclat chrome) + rim laiton (accent sur les arêtes).
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 1.1);
    fill.position.set(-4, 2, 3);
    scene.add(fill);
    // rim acier discret (touche froide sur les arêtes, sans colorer tout le métal)
    const steel = new THREE.PointLight(0x3a5a7a, 16, 20);
    steel.position.set(-3, -1.5, 2.5);
    scene.add(steel);
    scene.add(new THREE.AmbientLight(0xcbced2, 0.6));

    const mouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    if (!reduced) window.addEventListener("mousemove", onMove);

    let scrollY = 0;
    const onScroll = () => (scrollY = window.scrollY);
    if (!reduced) window.addEventListener("scroll", onScroll, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      const t = clock.getElapsedTime();
      // rotation de base + attraction curseur + dérive au scroll
      knot.rotation.y += 0.004 + (mouse.x * 0.03 - knot.rotation.y * 0) * 0;
      knot.rotation.x = Math.sin(t * 0.3) * 0.12 + mouse.y * 0.35;
      knot.rotation.y += mouse.x * 0.004;
      knot.position.y = Math.sin(t * 0.6) * 0.08 - (scrollParallax ? scrollY * 0.0012 : 0);
      camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    render();
    if (reduced) cancelAnimationFrame(raf); // 1 frame suffit

    const onResize = () => {
      camera.aspect = w() / h();
      camera.updateProjectionMatrix();
      renderer.setSize(w(), h());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      mat.dispose();
      envTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
