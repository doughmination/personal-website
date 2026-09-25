/* personal/src/app/genshin/page.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

import type { Metadata } from "next";
import GenshinGallery, { type Character } from "@scripts/genshinGallery";
import { Tr } from "@components/chrome/i18nText";
import "@styles/pages/genshin.css";

export const metadata: Metadata = {
  title: "Genshin — Clove Nytrix Doughmination Twilight",
  description:
    "A little gallery of 3D renders of Genshin Impact characters Clove finds cute — spin them around.",
  keywords: [
    "Clove Nytrix Doughmination Twilight",
    "doughmination.gay",
    "Genshin Impact",
    "3D models",
    "Furina",
    "Hu Tao",
    "Lumine",
  ],
  alternates: { canonical: "https://doughmination.gay/genshin" },
  openGraph: {
    type: "website",
    siteName: "doughmination.gay",
    title: "Genshin — Clove Nytrix Doughmination Twilight",
    description:
      "A little gallery of 3D renders of Genshin Impact characters Clove finds cute.",
    url: "https://doughmination.gay/genshin",
    locale: "en_GB",
    images: [
      {
        url: "https://m.doughmination.gay/img/avatars/favicon.png",
        alt: "Clove Nytrix Doughmination Twilight logo",
      },
    ],
  },
};

const GENSHIN_UID = "691386457";

const CHARACTERS: Character[] = [
  { name: "Aino" },
  {
    name: "Alyosha",
    noModel: true,
  },
  { name: "Amber" },
  { name: "Barbara" },
  { name: "Bennett" },
  { name: "Charlotte" },
  { name: "Chongyun" },
  { name: "Collei" },
  { name: "Columbina" },
  { name: "Dehya" },
  { name: "Diona" },
  { name: "Faruzan" },
  { name: "Fischl" },
  { name: "Freminet" },
  {
    name: "Furina",
    tier: "want",
  },
  {
    name: "Hu Tao",
    tier: "want",
  },
  { name: "Ineffa" },
  { name: "Jahoda" },
  { name: "Kachina" },
  { name: "Kaeya" },
  {
    name: "Lan Yan",
    noModel: true,
  },
  { name: "Lisa" },
  { name: "Lynette" },
  { name: "Lumine" },
  { name: "Manekin" },
  { name: "Manekina" },
  { name: "Mona" },
  { name: "Noelle" },
  { name: "Ororon" },
  { name: "Prune" },
  { name: "Sandrone" },
  { name: "Sethos" },
  { name: "Sucrose" },
  { name: "Tartaglia" },
  { name: "Xiangling" },
  {
    name: "Yumemizuki Mizuki",
    modelSlug: "yumemizuki",
  },
];

export default function GenshinPage() {
  return (
    <main className="genshin-stage">
      <div className="genshin-intro">
        <h1><Tr k="genshin.title" /></h1>
        <p>
          <Tr k="genshin.intro" />
        </p>
      </div>

      <p className="genshin-desktop-only" role="note">
        <Tr k="genshin.desktopOnly" />
      </p>

      <GenshinGallery uid={GENSHIN_UID} characters={CHARACTERS} />
    </main>
  );
}
