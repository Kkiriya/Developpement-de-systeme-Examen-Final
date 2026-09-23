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
  } = useRewards();

  const [message, setMessage] = useState("");

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

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        {/* Balance */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
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

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-700 dark:text-slate-200">
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

          {/* How to earn points */}
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-100 p-4 text-sm dark:border-slate-700 dark:bg-slate-800">
            <strong className="text-slate-900 dark:text-white">
              {t.rewards.howToEarn}
            </strong>

            <p className="mt-1 text-slate-700 dark:text-slate-300">
              {t.rewards.earnDescription}
            </p>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="mb-6 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sm font-medium text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200">
            {message}
          </div>
        )}

        {/* Rewards */}
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">
          {t.rewards.title}
        </h2>

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
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
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
      </div>
    </main>
  );
}
