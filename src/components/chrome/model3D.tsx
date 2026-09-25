/* personal/src/components/chrome/model3D.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

// Unused models model-viewer keeps in memory after a viewer unmounts
const MODEL_CACHE_SIZE = 2;

// How far off-screen a viewer mounts early, so it is ready on arrival
const VISIBILITY_MARGIN = "300px 0px";

let mvPromise: Promise<void> | null = null;

function configureModelViewer() {
  const ModelViewer = customElements.get("model-viewer") as
    | (CustomElementConstructor & { modelCacheSize?: number })
    | undefined;

  if (ModelViewer) {
    ModelViewer.modelCacheSize = MODEL_CACHE_SIZE;
  }
}

function loadModelViewer(): Promise<void> {
  if (typeof window !== "undefined" && customElements.get("model-viewer")) {
    return Promise.resolve();
  }
  if (!mvPromise) {
    mvPromise = import("@google/model-viewer/dist/model-viewer.min.js")
      .then(() => configureModelViewer())
      .catch(() => {
        mvPromise = null;
      });
  }
  return mvPromise;
}

type Model3DProps = {
  src: string;
  poster?: string;
  alt?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  loading?: "lazy" | "eager";
  cameraOrbit?: string;
  className?: string;
  style?: CSSProperties;
};

export default function Model3D({
  src,
  poster,
  alt = "3D model",
  autoRotate = true,
  interactive = true,
  loading = "lazy",
  cameraOrbit,
  className,
  style,
}: Model3DProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  // Only keep a live viewer while near the viewport; unmounting frees its GPU memory
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting),
      { rootMargin: VISIBILITY_MARGIN },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isOnScreen) loadModelViewer();
  }, [isOnScreen]);

  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    el.setAttribute("src", src);
    if (poster) el.setAttribute("poster", poster);
    el.setAttribute("alt", alt);
    el.setAttribute("loading", loading);
    el.setAttribute("reveal", "auto");
    el.setAttribute("shadow-intensity", "1");
    el.setAttribute("exposure", "1");
    el.setAttribute("interaction-prompt", "none");
    if (autoRotate) el.setAttribute("auto-rotate", "");
    else el.removeAttribute("auto-rotate");
    if (interactive) el.setAttribute("camera-controls", "");
    else el.removeAttribute("camera-controls");
    if (cameraOrbit) {
      el.setAttribute("camera-orbit", cameraOrbit);
      el.setAttribute("min-camera-orbit", cameraOrbit);
      el.setAttribute("max-camera-orbit", cameraOrbit);
    }
  }, [isOnScreen, src, poster, alt, autoRotate, interactive, loading, cameraOrbit]);

  const Tag = "model-viewer" as unknown as React.ElementType;

  const sizing: CSSProperties = {
    width: "100%",
    height: "100%",
    minHeight: "20rem",
    display: "block",
  };

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        ...sizing,
        ...style,
      }}
    >
      {isOnScreen && (
        <Tag
          ref={viewerRef}
          style={{
            ...sizing,
            "--poster-color": "transparent",
          }}
        />
      )}
    </div>
  );
}
