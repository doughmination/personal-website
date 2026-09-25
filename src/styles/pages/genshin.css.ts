/* personal/src/styles/pages/genshin.css.ts
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import { globalStyle } from "@vanilla-extract/css";
import { vars } from "../themes.css";

globalStyle(".genshin-stage", {
  maxWidth: 1320,
  margin: "0 auto",
  padding: "2rem 1rem 4rem",
});

globalStyle(".genshin-intro", {
  textAlign: "center",
  marginBottom: "2rem",
});

globalStyle(".genshin-intro h1", {
  color: vars.accent,
  marginBottom: "0.25rem",
});

globalStyle(".genshin-intro p", {
  color: vars.text,
  opacity: 0.85,
  maxWidth: "44ch",
  margin: "0 auto",
});

globalStyle(".genshin-grid", {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "1.5rem",
  "@media": {
    "(max-width: 820px)": { display: "none" },
  },
});

globalStyle(".genshin-desktop-only", {
  display: "none",
  "@media": {
    "(max-width: 820px)": {
      display: "block",
      textAlign: "center",
      color: vars.text,
      background: vars.bgRaised,
      border: `1px solid ${vars.bgDeep}`,
      borderRadius: 0,
      padding: "2rem 1.5rem",
      maxWidth: "40ch",
      margin: "1rem auto 0",
      lineHeight: 1.5,
    },
  },
});

globalStyle(".genshin-partial-note, .genshin-stale-note", {
  textAlign: "center",
  color: vars.text,
  opacity: 0.65,
  fontSize: "0.8rem",
  maxWidth: "48ch",
  margin: "-1rem auto 1.5rem",
  lineHeight: 1.5,
});

globalStyle(".genshin-stale-note", {
  color: vars.warning,
  opacity: 0.85,
});

globalStyle(".genshin-card", {
  background: vars.bgRaised,
  border: `1px solid ${vars.surface}`,
  borderRadius: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  boxShadow: "4px 4px 0 rgba(0, 0, 0, 0.35)",
  transition: "transform 0.18s ease, box-shadow 0.18s ease",
});

globalStyle(".genshin-card:hover", {
  transform: "translate(-2px, -2px)",
  boxShadow: "6px 6px 0 rgba(0, 0, 0, 0.35)",
});

globalStyle(".genshin-viewer", {
  position: "relative",
  width: "100%",
  aspectRatio: "3 / 5",
  minHeight: 420,
  background: `radial-gradient(circle at 50% 30%, ${vars.surface}, ${vars.bgDeep})`,
});

globalStyle(".genshin-tag", {
  position: "absolute",
  top: "0.6rem",
  right: "0.6rem",
  zIndex: 2,
  padding: "0.2rem 0.6rem",
  borderRadius: 0,
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  color: vars.bgDeep,
  boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.3)",
  pointerEvents: "none",
});

globalStyle(".genshin-tag.owned", { background: vars.success });
globalStyle(".genshin-tag.want", { background: vars.warning });

globalStyle(".genshin-tag.owned.untracked", {
  background: "transparent",
  color: vars.success,
  border: `1px dashed ${vars.success}`,
  boxShadow: "none",
});

globalStyle(".genshin-meta", {
  padding: "1rem 1.1rem 1.2rem",
  borderTop: `1px solid ${vars.bgDeep}`,
});

globalStyle(".genshin-meta h2", {
  margin: "0 0 0.15rem",
  color: vars.accentAlt,
  fontSize: "1.15rem",
});

globalStyle(".genshin-level", {
  marginTop: "0.5rem",
});

globalStyle(".genshin-level-row", {
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "0.5rem",
  marginBottom: "0.35rem",
});

globalStyle(".genshin-level-value", {
  fontSize: "0.82rem",
  fontWeight: 700,
  color: vars.peach,
  letterSpacing: "0.01em",
});

globalStyle(".genshin-level-cap", {
  fontSize: "0.72rem",
  color: vars.text,
  opacity: 0.55,
});

globalStyle(".genshin-level-track", {
  position: "relative",
  height: 6,
  width: "100%",
  borderRadius: 0,
  background: vars.bgDeep,
  overflow: "hidden",
});

globalStyle(".genshin-level-fill", {
  display: "block",
  height: "100%",
  borderRadius: 0,
  background: `linear-gradient(90deg, ${vars.accentAlt}, ${vars.accent})`,
  transition: "width 0.3s ease",
});

globalStyle(".genshin-level-track.maxed .genshin-level-fill", {
  background: vars.success,
});

globalStyle(".genshin-meta .element", {
  fontSize: "0.85rem",
  color: vars.peach,
  margin: "0 0 0.5rem",
});

globalStyle(".genshin-meta .credit", {
  fontSize: "0.72rem",
  opacity: 0.6,
  margin: 0,
  lineHeight: 1.4,
});

globalStyle(".genshin-no-model", {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

globalStyle(".genshin-no-model img", {
  width: "55%",
  maxWidth: 256,
  aspectRatio: "1 / 1",
  objectFit: "contain",
  imageRendering: "auto",
});
