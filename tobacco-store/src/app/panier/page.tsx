"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/app/components/CartContext";
import { useLanguage } from "@/app/components/LanguageProvider";
import { useState } from "react";

export default function CartPage() {
  const { t } = useLanguage();

  const { items, updateQuantity, removeFromCart, subtotal } = useCart();

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const TAX_RATE = 0.14975;

  const coupons: Record<string, number> = {
    DEMO10: 0.1,
    TEST15: 0.15,
    SCHOOL20: 0.2,
  };

  const discountRate = appliedCoupon ? (coupons[appliedCoupon] ?? 0) : 0;

  const discount = subtotal * discountRate;
  const discountedSubtotal = subtotal - discount;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const formattedSubtotal = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
  }).format(subtotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 text-slate-500 dark:text-slate-400"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.836L5.6 6.75m0 0h13.65c.668 0 1.163.615.994 1.262l-1.35 5.25a1 1 0 0 1-.97.75H8.07a1 1 0 0 1-.97-.757L5.6 6.75Zm2.47 7.262-1 3.5a1 1 0 0 0 .963 1.275h10.434M9 21a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              />
            </svg>
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            Votre panier est vide
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            Ajoutez des produits à votre panier pour les retrouver ici.
          </p>

          <Link
            href="/catalogue"
            className="mt-8 inline-block rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Voir le catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div>
        <Link
          href="/catalogue"
          className="text-sm font-semibold text-sky-600 transition hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
        >
          ← Retour au catalogue
        </Link>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Votre panier
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Vérifiez les articles ajoutés à votre panier.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart items */}
        <div className="space-y-4">
          {items.map((item) => {
            const formattedPrice = new Intl.NumberFormat("fr-CA", {
              style: "currency",
              currency: "CAD",
            }).format(item.product.price);

            return (
              <article
                key={item.product.id}
                className="flex gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Product image */}
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product information */}
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
                    {item.product.category}
                  </span>

                  <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                    {item.product.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {formattedPrice} / {item.product.qty}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    {/* Quantity controls */}
                    <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="flex h-9 w-9 items-center justify-center text-lg text-slate-600 transition hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                        aria-label={`Diminuer la quantité de ${item.product.name}`}
                      >
                        −
                      </button>

                      <span className="flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="flex h-9 w-9 items-center justify-center text-lg text-slate-600 transition hover:bg-slate-100 hover:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400"
                        aria-label={`Augmenter la quantité de ${item.product.name}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-sm font-medium text-red-600 transition hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Résumé
          </h2>

          {/* Coupon */}
          <div className="mt-6">
            <label
              htmlFor="coupon"
              className="text-sm font-semibold text-slate-900 dark:text-white"
            >
              Code promotionnel
            </label>

            <div className="mt-2 flex gap-2">
              <input
                id="coupon"
                type="text"
                value={coupon}
                onChange={(event) => {
                  setCoupon(event.target.value.toUpperCase());
                  setCouponError("");
                }}
                placeholder="Ex. DEMO10"
                className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="button"
                onClick={() => {
                  const normalizedCoupon = coupon.trim().toUpperCase();

                  if (!coupons[normalizedCoupon]) {
                    setAppliedCoupon("");
                    setCouponError("Code invalide.");
                    return;
                  }

                  setAppliedCoupon(normalizedCoupon);
                  setCouponError("");
                }}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Appliquer
              </button>
            </div>

            {couponError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {couponError}
              </p>
            )}

            {appliedCoupon && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                Code {appliedCoupon} appliqué.
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          {/* Subtotal */}
          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Sous-total
              </span>

              <span className="font-semibold text-slate-900 dark:text-white">
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(subtotal)}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600 dark:text-green-400">
                  Réduction ({Math.round(discountRate * 100)}%)
                </span>

                <span className="font-semibold text-green-600 dark:text-green-400">
                  -
                  {new Intl.NumberFormat("fr-CA", {
                    style: "currency",
                    currency: "CAD",
                  }).format(discount)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Sous-total après réduction
              </span>

              <span className="font-semibold text-slate-900 dark:text-white">
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(discountedSubtotal)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                Taxes ({(TAX_RATE * 100).toFixed(3)}%)
              </span>

              <span className="font-semibold text-slate-900 dark:text-white">
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(tax)}
              </span>
            </div>
          </div>

          <div className="my-6 border-t border-slate-200 dark:border-slate-800" />

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Total
            </span>

            <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">
              {new Intl.NumberFormat("fr-CA", {
                style: "currency",
                currency: "CAD",
              }).format(total)}
            </span>
          </div>

          {/* Prototype action */}
          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-lg bg-slate-300 px-4 py-3 text-sm font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-400"
          >
            Finaliser la commande
          </button>

          <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
            Fonctionnalité non disponible dans cette version du prototype.
          </p>
        </aside>
      </div>
    </div>
  );
}
