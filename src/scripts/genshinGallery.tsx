/* personal/src/scripts/genshinGallery.tsx
 * Copyright (c) 2026 Clove Nytrix Doughmination Twilight
 * Licensed under the DASL-1.0 Licence.
 * See LICENCE.md in the project root for full licence information.
 */

"use client";

import { useGenshinRoster } from "doughmination-api";
import Model3D from "@components/chrome/model3D";
import { useLanguage } from "@/i18n/languageProvider";

type Tier = "owned" | "want";

export type Character = {
  name: string;
  tier?: Tier;
  level?: number;
  modelSlug?: string;
  noModel?: boolean;
};

type ResolvedCharacter = {
  name: string;
  model: string | null;
  icon?: string;
  tier: Tier;
  level?: number;
  tracked?: boolean;
};

const MODEL_BASE_URL = "https://m.doughmination.gay/models";

// "Hu Tao" -> "hutao"
function toModelSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function modelUrl(character: Character) {
  const slug = character.modelSlug ?? toModelSlug(character.name);
  return `${MODEL_BASE_URL}/${slug}.glb`;
}

const ASCENSION_CAPS = [20, 40, 50, 60, 70, 80, 90] as const;
const MAX_LEVEL = 90;

function ascensionProgress(level: number) {
  const clamped = Math.min(Math.max(level, 1), MAX_LEVEL);
  if (clamped >= MAX_LEVEL) {
    return {
      cap: MAX_LEVEL,
      floor: ASCENSION_CAPS.at(-2)!,
      fill: 1,
      maxed: true,
    };
  }
  const cap = ASCENSION_CAPS.find((c) => c > clamped)!;
  const capIndex = ASCENSION_CAPS.indexOf(cap);
  const floor = capIndex === 0 ? 1 : ASCENSION_CAPS[capIndex - 1];
  return {
    cap,
    floor,
    fill: (clamped - floor) / (cap - floor),
    maxed: false,
  };
}

const TIER_ORDER: Record<Tier, number> = {
  want: 0,
  owned: 1,
};

function orderCharacters(characters: ResolvedCharacter[]): ResolvedCharacter[] {
  return [...characters].sort((a, b) => {
    if (TIER_ORDER[a.tier] !== TIER_ORDER[b.tier]) {
      return TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    }
    if ((b.level ?? 0) !== (a.level ?? 0)) {
      return (b.level ?? 0) - (a.level ?? 0);
    }
    return a.name.localeCompare(b.name);
  });
}

export default function GenshinGallery({
  uid,
  characters,
}: {
  uid: string;
  characters: Character[];
}) {
  const { t } = useLanguage();
  const { data: roster } = useGenshinRoster(uid);

  // The roster only knows showcased characters, so it can add levels but never downgrade to "want"
  const merged = characters.map((c): ResolvedCharacter => {
    const live = roster?.characters.find((r) => r.name === c.name);

    const base: ResolvedCharacter = {
      name: c.name,
      model: c.noModel ? null : modelUrl(c),
      icon: live?.icon_url,
      tier: c.tier ?? "owned",
      level: c.level,
    };

    if (!live?.owned) return base;

    return {
      ...base,
      tier: "owned",
      level: live.level ?? base.level,
      tracked: live.tracked,
    };
  });
  const ordered = orderCharacters(merged);

  return (
    <>
      {roster?.stale ? (
        <p className="genshin-stale-note" role="note">
          {t("genshin.staleNote")}
        </p>
      ) : (
        roster?.partial && (
          <p className="genshin-partial-note" role="note">
            {t("genshin.partialNote")}
          </p>
        )
      )}

      <div className="genshin-grid">
        {ordered.map((c) => {
          const showLevel = c.tier === "owned" && typeof c.level === "number";
          const progress = showLevel ? ascensionProgress(c.level!) : null;
          const untracked = c.tier === "owned" && c.tracked === false;

          return (
            <article className="genshin-card" key={c.name}>
              <div className="genshin-viewer">
                {c.tier && (
                  <span
                    className={`genshin-tag ${c.tier}${untracked ? " untracked" : ""}`}
                    title={untracked ? t("genshin.untracked") : undefined}
                  >
                    {t(c.tier === "owned" ? "genshin.owned" : "genshin.want")}
                  </span>
                )}
                {c.model ? (
                  <Model3D
                    src={c.model}
                    autoRotate={false}
                    alt={t("genshin.modelAlt").replace("{name}", c.name)}
                  />
                ) : (
                  <div className="genshin-no-model">
                    {c.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.icon}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="genshin-meta">
                <h2>{c.name}</h2>
                {progress && (
                  <div className="genshin-level">
                    <div className="genshin-level-row">
                      <span className="genshin-level-value">
                        {t("genshin.level").replace("{n}", String(c.level))}
                      </span>
                      <span className="genshin-level-cap">
                        {untracked
                          ? t("genshin.lastSeen")
                          : progress.maxed
                            ? t("genshin.max")
                            : t("genshin.toLevel").replace("{n}", String(progress.cap))}
                      </span>
                    </div>
                    <div
                      className={`genshin-level-track${progress.maxed ? " maxed" : ""}`}
                      role="progressbar"
                      aria-valuemin={progress.floor}
                      aria-valuemax={progress.cap}
                      aria-valuenow={c.level}
                      aria-label={t("genshin.progressLabel")
                        .replace("{name}", c.name)
                        .replace("{n}", String(progress.cap))}
                    >
                      <span
                        className="genshin-level-fill"
                        style={{ width: `${Math.round(progress.fill * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
