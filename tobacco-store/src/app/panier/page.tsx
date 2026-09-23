"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/app/context/CartContext";
import { useRewards } from "@/app/context/RewardsContext";
import { useLanguage } from "@/app/components/LanguageProvider";

export default function CartPage() {
  const { t, language } = useLanguage();

  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const {
    earnPoints,
    storeCredit,
    redeemedCoupons,
    consumeCoupon,
    consumeStoreCredit,
  } = useRewards();

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [appliedCredit, setAppliedCredit] = useState(0);

  const [couponError, setCouponError] = useState("");
  const [purchaseMessage, setPurchaseMessage] = useState("");

  const TAX_RATE = 0.14975;

  const coupons: Record<string, number> = {
    DEMO10: 0.1,
    TEST15: 0.15,
    SCHOOL20: 0.2,

    POINTS5: 0.05,
    POINTS10: 0.1,
    POINTS15: 0.15,
  };

  const discountRate = appliedCoupon ? (coupons[appliedCoupon] ?? 0) : 0;

  const discount = subtotal * discountRate;

  const discountedSubtotal = subtotal - discount;

  const creditApplied = Math.min(appliedCredit, discountedSubtotal);

  const taxableSubtotal = discountedSubtotal - creditApplied;

  const tax = taxableSubtotal * TAX_RATE;

  const total = taxableSubtotal + tax;

  /*
   * Points are calculated from the amount after
   * the coupon discount, but before taxes and
   * store credit.
   */
  const pointsEarned = Math.floor(discountedSubtotal) * 100;

  function formatPoints(points: number) {
    return points.toLocaleString(language === "fr" ? "fr-CA" : language);
  }

  function formatPrice(value: number) {
    return new Intl.NumberFormat(
      language === "fr" ? "fr-CA" : language === "en" ? "en-CA" : "es-CA",
      {
        style: "currency",
        currency: "CAD",
      },
    ).format(value);
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setCouponError(t.cart.invalidCode);
      return;
    }

    const isRegularCoupon = code in coupons;

    const isRedeemedCoupon = redeemedCoupons.includes(code);

    if (!isRegularCoupon && !isRedeemedCoupon) {
      setCouponError(t.cart.invalidCode);
      return;
    }

    if (appliedCoupon === code) {
      setCouponError(t.cart.alreadyApplied);
      return;
    }

    setAppliedCoupon(code);
    setCouponError("");
  }

  function removeCoupon() {
    setAppliedCoupon("");
    setCoupon("");
    setCouponError("");
  }

  function applyStoreCredit() {
    if (storeCredit <= 0 || discountedSubtotal <= 0) {
      return;
    }

    setAppliedCredit(Math.min(storeCredit, discountedSubtotal));
  }

  function removeStoreCredit() {
    setAppliedCredit(0);
  }

  function handlePurchase() {
    if (items.length === 0) {
      return;
    }

    const earned = earnPoints(discountedSubtotal);

    /*
     * Only consume the coupon if it came from
     * the rewards system. Demo coupons remain
     * reusable.
     */
    if (appliedCoupon && redeemedCoupons.includes(appliedCoupon)) {
      consumeCoupon(appliedCoupon);
    }

    if (creditApplied > 0) {
      consumeStoreCredit(creditApplied);
    }

    items.forEach((item) => {
      removeFromCart(item.product.id);
    });

    setPurchaseMessage(
      t.cart.orderConfirmed.replace("{points}", formatPoints(earned)),
    );

    setCoupon("");
    setAppliedCoupon("");
    setAppliedCredit(0);
    setCouponError("");
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {purchaseMessage ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              </div>

              <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                {t.cart.orderConfirmedTitle}
              </h1>

              <p className="mt-3 text-green-600 dark:text-green-400">
                {purchaseMessage}
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-8 w-8 text-slate-500 dark:text-slate-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 1.9-1.4L21 7H6"
                  />
                  <circle cx="10" cy="20" r="1" />
                  <circle cx="18" cy="20" r="1" />
                </svg>
              </div>

              <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                {t.cart.emptyTitle}
              </h1>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                {t.cart.emptyDescription}
              </p>
            </>
          )}

          <Link
            href="/catalogue"
            className="mt-8 inline-block rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            {t.cart.viewCatalogue}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <Link
          href="/catalogue"
          className="text-sm font-semibold text-sky-600 hover:underline dark:text-sky-400"
        >
          {t.cart.backToCatalogue}
        </Link>

        <h1 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
          {t.cart.title}
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          {t.cart.description}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                    {item.product.category}
                  </p>

                  <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {item.product.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                    {formatPrice(item.product.price)} {t.cart.per}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                      aria-label={t.cart.decreaseQuantity.replace(
                        "{name}",
                        item.product.name,
                      )}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      −
                    </button>

                    <span className="min-w-10 text-center text-sm font-semibold text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      aria-label={t.cart.increaseQuantity.replace(
                        "{name}",
                        item.product.name,
                      )}
                      className="px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <strong className="text-slate-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </strong>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm font-semibold text-red-600 hover:underline dark:text-red-400"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {t.cart.summary}
          </h2>

          {/* Coupon */}
          <div className="mt-6">
            <label
              htmlFor="coupon"
              className="mb-2 block text-sm font-semibold text-slate-900 dark:text-white"
            >
              {t.cart.promotionalCode}
            </label>

            <div className="flex gap-2">
              <input
                id="coupon"
                type="text"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder={t.cart.placeholder}
                className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-sky-500 dark:focus:ring-sky-950"
              />

              <button
                type="button"
                onClick={applyCoupon}
                className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                {t.cart.apply}
              </button>
            </div>

            {couponError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {couponError}
              </p>
            )}

            {appliedCoupon && (
              <div className="mt-3 flex items-center justify-between rounded-lg bg-green-50 px-3 py-2 text-sm dark:bg-green-950/30">
                <span className="text-green-700 dark:text-green-400">
                  {t.cart.codeApplied.replace("{code}", appliedCoupon)}
                </span>

                <button
                  type="button"
                  onClick={removeCoupon}
                  className="font-semibold text-red-600 hover:underline dark:text-red-400"
                >
                  {t.cart.remove}
                </button>
              </div>
            )}
          </div>

          {/* Store credit */}
          <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {t.cart.storeCredit}
                </h3>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {t.cart.availableCredit}:{" "}
                  <strong className="text-slate-900 dark:text-white">
                    {formatPrice(storeCredit)}
                  </strong>
                </p>
              </div>

              {storeCredit > 0 &&
                discountedSubtotal > 0 &&
                appliedCredit === 0 && (
                  <button
                    type="button"
                    onClick={applyStoreCredit}
                    className="shrink-0 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
                  >
                    {t.cart.useCredit}
                  </button>
                )}
            </div>

            {appliedCredit > 0 && (
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-green-50 px-4 py-3 text-sm dark:bg-green-950/30">
                <span className="text-green-700 dark:text-green-400">
                  {t.cart.creditApplied}: {formatPrice(creditApplied)}
                </span>

                <button
                  type="button"
                  onClick={removeStoreCredit}
                  className="shrink-0 font-semibold text-red-600 hover:underline dark:text-red-400"
                >
                  {t.cart.removeCredit}
                </button>
              </div>
            )}
          </div>

          {/* Price breakdown */}
          <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 dark:border-slate-700">
            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>{t.cart.subtotal}</span>

              <span>{formatPrice(subtotal)}</span>
            </div>

            {discount > 0 && (
              <>
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>{t.cart.discount}</span>

                  <span>-{formatPrice(discount)}</span>
                </div>

                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{t.cart.afterDiscount}</span>

                  <span>{formatPrice(discountedSubtotal)}</span>
                </div>
              </>
            )}

            {creditApplied > 0 && (
              <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                <span>{t.cart.storeCredit}</span>

                <span>-{formatPrice(creditApplied)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
              <span>{t.cart.taxes}</span>

              <span>{formatPrice(tax)}</span>
            </div>
          </div>

          {/* Points */}
          <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950/40">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-sky-900 dark:text-sky-200">
                {t.cart.earnedPoints}
              </span>

              <span className="text-lg font-bold text-sky-700 dark:text-sky-300">
                +{formatPoints(pointsEarned)}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-sky-800 dark:text-sky-300">
              {t.cart.pointsDescription}
            </p>
          </div>

          {/* Total */}
          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-700">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {t.cart.total}
            </span>

            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {formatPrice(total)}
            </span>
          </div>

          {/* Checkout */}
          <button
            type="button"
            onClick={handlePurchase}
            className="mt-6 w-full rounded-lg bg-sky-600 px-6 py-3 font-semibold text-white transition hover:bg-sky-700"
          >
            {t.cart.checkout}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            {t.cart.checkoutNote.replace(
              "{points}",
              formatPoints(pointsEarned),
            )}
          </p>
        </aside>
      </div>
    </div>
  );
}
