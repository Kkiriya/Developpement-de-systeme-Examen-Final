"use client";

import { useState } from "react";

import { useLanguage } from "@/app/components/LanguageProvider";
import { useRewards } from "@/app/context/RewardsContext";

const rewards = [
  {
    id: "coupon5",
    nameKey: "coupon5",
    descriptionKey: "coupon5Description",
    cost: 1000,
    type: "coupon",
    code: "POINTS5",
  },
  {
    id: "coupon10",
    nameKey: "coupon10",
    descriptionKey: "coupon10Description",
    cost: 2000,
    type: "coupon",
    code: "POINTS10",
  },
  {
    id: "coupon15",
    nameKey: "coupon15",
    descriptionKey: "coupon15Description",
    cost: 3000,
    type: "coupon",
    code: "POINTS15",
  },
  {
    id: "shipping",
    nameKey: "shippingReward",
    descriptionKey: "shippingDescription",
    cost: 1500,
    type: "shipping",
  },
  {
    id: "credit5",
    nameKey: "credit5",
    descriptionKey: "credit5Description",
    cost: 5000,
    type: "credit",
  },
  {
    id: "credit10",
    nameKey: "credit10",
    descriptionKey: "credit10Description",
    cost: 10000,
    type: "credit",
  },
  {
    id: "credit20",
    nameKey: "credit20",
    descriptionKey: "credit20Description",
    cost: 20000,
    type: "credit",
  },
] as const;

const wheelPrizes = [
  {
    id: "discount25",
    labelKey: "wheel25",
    descriptionKey: "wheel25Description",
  },
  {
    id: "points5000",
    labelKey: "points5000",
    descriptionKey: "points5000Description",
  },
  {
    id: "discount30",
    labelKey: "wheel30",
    descriptionKey: "wheel30Description",
  },
  {
    id: "points10000",
    labelKey: "points10000",
    descriptionKey: "points10000Description",
  },
  {
    id: "discount40",
    labelKey: "wheel40",
    descriptionKey: "wheel40Description",
  },
  {
    id: "points20000",
    labelKey: "points20000",
    descriptionKey: "points20000Description",
  },
  {
    id: "credit10",
    labelKey: "credit10",
    descriptionKey: "credit10Description",
  },
  {
    id: "freeShipping",
    labelKey: "shippingReward",
    descriptionKey: "shippingDescription",
  },
] as const;

const wheelSegmentClasses = [
  "fill-[#e2e8f0] dark:fill-[#38bdf8]",
  "fill-[#0ea5e9] dark:fill-[#0f172a]",
  "fill-[#e2e8f0] dark:fill-[#38bdf8]",
  "fill-[#0ea5e9] dark:fill-[#0f172a]",
  "fill-[#e2e8f0] dark:fill-[#38bdf8]",
  "fill-[#0ea5e9] dark:fill-[#0f172a]",
  "fill-[#e2e8f0] dark:fill-[#38bdf8]",
  "fill-[#0ea5e9] dark:fill-[#0f172a]",
];

const wheelTextClasses = [
  "fill-[#0f172a] dark:fill-[#0f172a]",
  "fill-white dark:fill-white",
  "fill-[#0f172a] dark:fill-[#0f172a]",
  "fill-white dark:fill-white",
  "fill-[#0f172a] dark:fill-[#0f172a]",
  "fill-white dark:fill-white",
  "fill-[#0f172a] dark:fill-[#0f172a]",
  "fill-white dark:fill-white",
];

function getWheelPath(index: number) {
  const center = 250;
  const radius = 235;
  const sliceAngle = 360 / wheelPrizes.length;

  const startAngle = index * sliceAngle - 90;
  const endAngle = startAngle + sliceAngle;

  const startRadians = (startAngle * Math.PI) / 180;
  const endRadians = (endAngle * Math.PI) / 180;

  const x1 = center + radius * Math.cos(startRadians);
  const y1 = center + radius * Math.sin(startRadians);

  const x2 = center + radius * Math.cos(endRadians);
  const y2 = center + radius * Math.sin(endRadians);

  return `
    M ${center} ${center}
    L ${x1} ${y1}
    A ${radius} ${radius} 0 0 1 ${x2} ${y2}
    Z
  `;
}

export default function RewardsPage() {
  const { t } = useLanguage();

  const {
    points,
    storeCredit,
    freeShipping,
    redeemedCoupons,
    redeemCoupon,
    redeemFreeShipping,
    redeemStoreCredit,
    awardWheelPrize,
    spinWheel,
    wheelOpen,
    openWheel,
    closeWheel,
  } = useRewards();

  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<(typeof wheelPrizes)[number] | null>(
    null,
  );

  function redeemReward(reward: (typeof rewards)[number]) {
    setMessage("");

    let success = false;

    if (reward.type === "coupon" && reward.code) {
      success = redeemCoupon(reward.cost, reward.code);

      if (success) {
        setMessage(`${t.rewards.successCoupon} ${reward.code}`);
      }
    }

    if (reward.type === "shipping") {
      success = redeemFreeShipping();

      if (success) {
        setMessage(t.rewards.successShipping);
      }
    }

    if (reward.type === "credit") {
      success = redeemStoreCredit(reward.cost);

      if (success) {
        setMessage(`${reward.cost / 1000} $ ${t.rewards.successCredit}`);
      }
    }

    if (!success) {
      setMessage(t.rewards.insufficientPointsMessage);
    }
  }

  function handleSpinWheel() {
    if (isSpinning) {
      return;
    }

    const success = spinWheel();

    if (!success) {
      setMessage(t.rewards.insufficientPointsMessage);
      return;
    }

    setMessage("");
    setWonPrize(null);
    setIsSpinning(true);

    const prizeIndex = Math.floor(Math.random() * wheelPrizes.length);
    const sliceAngle = 360 / wheelPrizes.length;

    const targetAngle =
      360 * 5 + (360 - prizeIndex * sliceAngle - sliceAngle / 2);

    setRotation((current) => current + targetAngle);

    window.setTimeout(() => {
      const prize = wheelPrizes[prizeIndex];

      awardWheelPrize(prize.id);
      setWonPrize(prize);
      setIsSpinning(false);
    }, 5000);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        {/* Balance */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t.rewards.balance}
          </p>

          <div className="mt-2 flex items-end gap-3">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              {points.toLocaleString("fr-CA")}
            </h1>

            <span className="mb-1 text-slate-600 dark:text-slate-300">
              {t.rewards.points}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-700 dark:text-slate-200">
            <span>
              {t.rewards.credit}:{" "}
              <strong className="text-slate-900 dark:text-white">
                {storeCredit.toFixed(2)} $
              </strong>
            </span>

            <span>
              {t.rewards.freeShipping}:{" "}
              <strong className="text-slate-900 dark:text-white">
                {freeShipping ? t.rewards.available : t.rewards.unavailable}
              </strong>
            </span>
          </div>

          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-100 p-4 text-sm dark:border-slate-700 dark:bg-slate-800">
            <strong className="text-slate-900 dark:text-white">
              {t.rewards.howToEarn}
            </strong>

            <p className="mt-1 text-slate-700 dark:text-slate-300">
              {t.rewards.earnDescription}
            </p>
          </div>
        </div>

        {/* Wheel */}
        <section className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="px-8 pb-7 pt-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-3xl dark:bg-sky-950">
              🎡
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              Roulez la roue !
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Tentez votre chance et gagnez une récompense aléatoire. Vous
              pourriez obtenir un rabais, des points supplémentaires, du crédit
              ou même la livraison gratuite !
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-300">
              ⭐ 10,000 {t.rewards.points} par tour
            </div>

            <div>
              <button
                type="button"
                onClick={openWheel}
                disabled={points < 10000}
                className="mt-6 rounded-lg bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
              >
                🎡 Tourner la roue
              </button>
            </div>

            {points < 10000 && (
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Il vous faut 10,000 points pour faire tourner la roue.
              </p>
            )}
          </div>
        </section>

        {/* Message */}
        {message && (
          <div className="mb-8 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200">
            {message}
          </div>
        )}

        {/* Rewards */}
        <section>
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {t.rewards.title}
            </h2>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Échangez vos points contre des récompenses et des avantages.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => {
              const alreadyRedeemed = Boolean(
                reward.type === "coupon" &&
                reward.code &&
                redeemedCoupons.includes(reward.code),
              );

              const unavailable =
                points < reward.cost ||
                (reward.type === "shipping" && freeShipping) ||
                alreadyRedeemed;

              return (
                <div
                  key={reward.id}
                  className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {t.rewards[reward.nameKey]}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {t.rewards[reward.descriptionKey]}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {reward.cost.toLocaleString("fr-CA")} {t.rewards.points}
                    </span>

                    <button
                      type="button"
                      onClick={() => redeemReward(reward)}
                      disabled={Boolean(unavailable)}
                      className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
                    >
                      {alreadyRedeemed
                        ? t.rewards.alreadyRedeemed
                        : reward.type === "shipping" && freeShipping
                          ? t.rewards.alreadyAvailable
                          : points < reward.cost
                            ? t.rewards.insufficientPoints
                            : t.rewards.redeem}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Wheel Modal */}
      {wheelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8">
            <button
              type="button"
              onClick={() => {
                if (!isSpinning) {
                  closeWheel();
                  setWonPrize(null);
                }
              }}
              disabled={isSpinning}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              ×
            </button>

            <div className="px-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-2xl dark:bg-sky-950">
                🎡
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                Tentez votre chance !
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-400">
                Une récompense aléatoire vous attend. Bonne chance !
              </p>

              <div className="mt-3 text-xs font-semibold text-sky-600 dark:text-sky-400">
                10,000 {t.rewards.points}
              </div>
            </div>

            {/* Wheel */}
            <div className="relative mx-auto mt-6 aspect-square w-full max-w-[520px]">
              {/* Pointer */}
              <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                <div className="h-0 w-0 border-l-[14px] border-r-[14px] border-t-[28px] border-l-transparent border-r-transparent border-t-slate-900 drop-shadow-lg dark:border-t-white" />
              </div>

              <svg
                viewBox="0 0 500 500"
                className="h-full w-full overflow-visible drop-shadow-xl"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "transform 5s cubic-bezier(0.12, 0.8, 0.18, 1)"
                    : "none",
                }}
              >
                {wheelPrizes.map((prize, index) => {
                  const sliceAngle = 360 / wheelPrizes.length;

                  const textAngle = index * sliceAngle + sliceAngle / 2 - 90;

                  const textRadius = 150;

                  const textX =
                    250 + textRadius * Math.cos((textAngle * Math.PI) / 180);

                  const textY =
                    250 + textRadius * Math.sin((textAngle * Math.PI) / 180);

                  return (
                    <g key={prize.id}>
                      <path
                        d={getWheelPath(index)}
                        className={wheelSegmentClasses[index]}
                        stroke="white"
                        strokeWidth="3"
                      />

                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${textAngle + 90} ${textX} ${textY})`}
                        className={`text-[12px] font-bold ${wheelTextClasses[index]}`}
                      >
                        {t.rewards[prize.labelKey as keyof typeof t.rewards]}
                      </text>
                    </g>
                  );
                })}

                {/* Center */}
                <circle
                  cx="250"
                  cy="250"
                  r="55"
                  className="fill-white dark:fill-slate-100"
                  stroke="#0f172a"
                  strokeWidth="5"
                />

                <circle
                  cx="250"
                  cy="250"
                  r="42"
                  className="fill-slate-900 dark:fill-slate-950"
                />

                <text
                  x="250"
                  y="250"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-3xl"
                >
                  🎁
                </text>

                <circle
                  cx="250"
                  cy="250"
                  r="240"
                  fill="none"
                  className="stroke-slate-900 dark:stroke-white"
                  strokeWidth="10"
                />
              </svg>
            </div>

            {/* Won Prize */}
            {wonPrize && (
              <div className="mx-auto mt-6 max-w-xl rounded-2xl bg-sky-50 p-6 text-center ring-1 ring-sky-200 dark:bg-sky-950/40 dark:ring-sky-900">
                <p className="text-sm font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
                  🎉 Félicitations !
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                  {t.rewards[wonPrize.labelKey as keyof typeof t.rewards]}
                </h3>

                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {t.rewards[wonPrize.descriptionKey as keyof typeof t.rewards]}
                </p>
              </div>
            )}

            {/* Spin */}
            <div className="mt-7 flex justify-center">
              <button
                type="button"
                onClick={handleSpinWheel}
                disabled={isSpinning || points < 10000}
                className="rounded-lg bg-sky-600 px-8 py-3 font-bold text-white shadow-sm transition hover:bg-sky-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
              >
                {isSpinning ? "..." : `🎡 10,000 ${t.rewards.points}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
