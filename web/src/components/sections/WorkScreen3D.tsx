"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * WorkScreen3D — « télé » Treeosk en full 3D : un moniteur chrome (bezel + pied + socle) dont
 * l'ÉCRAN affiche du TEXTE (ce que fait Treeosk), dessiné sur une CanvasTexture et mis à jour
 * quand le texte change. Rotation douce + réactif au curseur. Finition thème-aware (blanc
 * satiné en light, chrome miroir en dark). Procédural, aucune dépendance hors `three`.
 */
export default function WorkScreen3D({
  text,
  accent,
  light = true,
}: {
  text: string;
  accent: string;
  light?: boolean;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const textRef = useRef(text);
  const accentRef = useRef(accent);
  const lightRef = useRef(light);
  useEffect(() => {
    textRef.current = text;
  }, [text]);
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
    const camera = new THREE.PerspectiveCamera(38, w() / h(), 0.1, 100);
    camera.position.set(0, 0.45, 7.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w(), h());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    mount.appendChild(renderer.domElement);

    // Env-map chrome clair
    const ecnv = document.createElement("canvas");
    ecnv.width = 8;
    ecnv.height = 256;
    const ex = ecnv.getContext("2d")!;
    const gr = ex.createLinearGradient(0, 0, 0, 256);
    gr.addColorStop(0.0, "#ffffff");
    gr.addColorStop(0.26, "#f0f3f6");
    gr.addColorStop(0.5, "#cbd2d8");
    gr.addColorStop(0.62, "#8f979e");
    gr.addColorStop(0.8, "#dbe1e5");
    gr.addColorStop(1.0, "#aeb5bb");
    ex.fillStyle = gr;
    ex.fillRect(0, 0, 8, 256);
    const envTex = new THREE.CanvasTexture(ecnv);
    envTex.mapping = THREE.EquirectangularReflectionMapping;
    envTex.colorSpace = THREE.SRGBColorSpace;
    scene.environment = envTex;

    const chromeMats: THREE.MeshStandardMaterial[] = [];
    const chrome = () => {
      const m = new THREE.MeshStandardMaterial({ color: 0xeceef0, metalness: 1, roughness: 0.1, envMap: envTex, envMapIntensity: 2.1 });
      chromeMats.push(m);
      return m;
    };
    let curLight: boolean | null = null;
    const applyFinish = (isLight: boolean) => {
      chromeMats.forEach((m) => {
        if (isLight) {
          m.color.setHex(0xffffff);
          m.metalness = 0.18;
          m.roughness = 0.42;
          m.envMapIntensity = 0.5;
        } else {
          m.color.setHex(0xeceef0);
          m.metalness = 1;
          m.roughness = 0.1;
          m.envMapIntensity = 2.1;
        }
      });
    };

    // ---- Écran : CanvasTexture avec le texte -----------------------------------------------
    const SW = 1024;
    const SH = 640;
    const scnv = document.createElement("canvas");
    scnv.width = SW;
    scnv.height = SH;
    const sx = scnv.getContext("2d")!;
    const screenTex = new THREE.CanvasTexture(scnv);
    screenTex.colorSpace = THREE.SRGBColorSpace;

    const wrap = (str: string, maxW: number) => {
      const words = str.split(" ");
      const lines: string[] = [];
      let line = "";
      for (const wd of words) {
        const test = line ? line + " " + wd : wd;
        if (sx.measureText(test).width > maxW && line) {
          lines.push(line);
          line = wd;
        } else line = test;
      }
      if (line) lines.push(line);
      return lines;
    };

    const drawScreen = (str: string, accentHex: string) => {
      sx.fillStyle = "#0a0b0e";
      sx.fillRect(0, 0, SW, SH);
      // léger dégradé
      const g2 = sx.createRadialGradient(SW * 0.3, SH * 0.3, 40, SW * 0.5, SH * 0.5, SW * 0.7);
      g2.addColorStop(0, "rgba(255,255,255,0.05)");
      g2.addColorStop(1, "rgba(0,0,0,0)");
      sx.fillStyle = g2;
      sx.fillRect(0, 0, SW, SH);
      // overline
      sx.fillStyle = accentHex;
      sx.font = "500 30px Arial, sans-serif";
      sx.textAlign = "left";
      sx.textBaseline = "alphabetic";
      sx.fillText("TREEOSK", 70, 110);
      // filet accent
      sx.fillRect(70, 130, 90, 6);
      // titre
      sx.fillStyle = "#f2f3f4";
      sx.font = "600 96px Arial, sans-serif";
      const lines = wrap(str, SW - 140);
      const startY = 300;
      lines.forEach((ln, i) => sx.fillText(ln, 70, startY + i * 108));
      screenTex.needsUpdate = true;
    };
    let shownText = "";
    let shownAccent = "";
    drawScreen(textRef.current, accentRef.current);
    shownText = textRef.current;
    shownAccent = accentRef.current;

    const tv = new THREE.Group();
    // bezel
    const bezel = new THREE.Mesh(new RoundedBoxGeometry(3.4, 2.15, 0.22, 5, 0.08), chrome());
    tv.add(bezel);
    // écran
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(3.05, 1.82),
      new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }),
    );
    screen.position.z = 0.12;
    tv.add(screen);
    // pied + socle
    const neck = new THREE.Mesh(new RoundedBoxGeometry(0.22, 0.7, 0.22, 3, 0.05), chrome());
    neck.position.y = -1.45;
    tv.add(neck);
    const stand = new THREE.Mesh(new RoundedBoxGeometry(1.5, 0.14, 0.9, 4, 0.05), chrome());
    stand.position.y = -1.82;
    tv.add(stand);

    tv.position.y = 0.35;
    scene.add(tv);

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdfe1e3, 1.0);
    fill.position.set(-5, 2, 3);
    scene.add(fill);
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
      if (curLight !== lightRef.current) {
        curLight = lightRef.current;
        applyFinish(curLight);
      }
      if (textRef.current !== shownText || accentRef.current !== shownAccent) {
        shownText = textRef.current;
        shownAccent = accentRef.current;
        drawScreen(shownText, shownAccent);
      }
      tv.rotation.y = Math.sin(t * 0.3) * 0.16 + mouse.x * 0.25;
      tv.rotation.x = mouse.y * 0.08;
      tv.position.y = 0.55 + Math.sin(t * 0.6) * 0.04;
      camera.lookAt(0, 0.35, 0);
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
      screenTex.dispose();
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
