"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * HeroKiosk3D — borne Treeosk en 3D calquée sur nos vraies bornes (monolithe chrome MIROIR
 * poli, arrondi, minimaliste), avec un écran affichant un de nos assets. Même modèle que le
 * morphing pour la cohérence ; ici il TOURNE lentement + réagit au curseur. Reduced-motion → statique.
 */
export default function HeroKiosk3D({ light = true }: { light?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef(light);
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
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const cnv = document.createElement("canvas");
    cnv.width = 8;
    cnv.height = 256;
    const cx = cnv.getContext("2d")!;
    const grd = cx.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0.0, "#ffffff");
    grd.addColorStop(0.26, "#f2f5f7");
    grd.addColorStop(0.5, "#d4dbe0");
    grd.addColorStop(0.62, "#9aa2a9"); // ligne de reflet
    grd.addColorStop(0.8, "#dfe4e8");
    grd.addColorStop(1.0, "#bcc2c8");
    cx.fillStyle = grd;
    cx.fillRect(0, 0, 8, 256);
    const envTex = new THREE.CanvasTexture(cnv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    scene.environment = envTex;

    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xeef0f2,
      metalness: 1,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      envMap: envTex,
      envMapIntensity: 2.0,
    });
    // Finition selon le thème : BLANC laqué (clearcoat) en light, chrome miroir en dark.
    let curLight: boolean | null = null;
    const applyFinish = (isLight: boolean) => {
      if (isLight) {
        chrome.color.setHex(0xffffff);
        chrome.metalness = 0.0;
        chrome.roughness = 0.5;
        chrome.clearcoatRoughness = 0.28;
        chrome.envMapIntensity = 0.7;
      } else {
        chrome.color.setHex(0xeef0f2);
        chrome.metalness = 1;
        chrome.roughness = 0.08;
        chrome.clearcoatRoughness = 0.1;
        chrome.envMapIntensity = 2.0;
      }
    };

    const kiosk = new THREE.Group();
    const body = new THREE.Mesh(new RoundedBoxGeometry(1.7, 3.15, 1.15, 10, 0.34), chrome);
    kiosk.add(body);
    const base = new THREE.Mesh(new RoundedBoxGeometry(1.85, 0.18, 1.3, 5, 0.06), chrome);
    base.position.y = -1.62;
    kiosk.add(base);

    // Écran sombre avec lueur acier (« allumé ») — pas d'image
    const screen = new THREE.Mesh(
      new RoundedBoxGeometry(0.92, 1.5, 0.04, 4, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x0a0b0e, emissive: 0x3a5a7a, emissiveIntensity: 0.32, metalness: 0.4, roughness: 0.4 }),
    );
    screen.position.set(0, 0.25, 0.6);
    kiosk.add(screen);

    kiosk.position.y = 0.12;
    scene.add(kiosk);

    // Ombre de contact douce au sol (réalisme)
    const shcnv = document.createElement("canvas");
    shcnv.width = 256;
    shcnv.height = 256;
    const shx = shcnv.getContext("2d")!;
    const rg = shx.createRadialGradient(128, 128, 8, 128, 128, 128);
    rg.addColorStop(0, "rgba(0,0,0,0.5)");
    rg.addColorStop(0.55, "rgba(0,0,0,0.18)");
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

    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(4, 6, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 0.85);
    fill.position.set(-5, 2, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 0.9);
    rim.position.set(-2, 3, -5);
    scene.add(rim);
    const steel = new THREE.PointLight(0x3a5a7a, 5, 18);
    steel.position.set(-3, -1, 3);
    scene.add(steel);
    scene.add(new THREE.AmbientLight(0xcbced2, 0.5));

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
      if (curLight !== lightRef.current) {
        curLight = lightRef.current;
        applyFinish(curLight);
      }
      kiosk.rotation.y += 0.006;
      kiosk.rotation.x = Math.sin(t * 0.4) * 0.05 + mouse.y * 0.12;
      kiosk.position.y = 0.12 + Math.sin(t * 0.6) * 0.05;
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
      camera.lookAt(0, 0.12, 0);
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
      shadowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" aria-hidden />;
}
