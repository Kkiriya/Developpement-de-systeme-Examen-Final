"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "airsmokes-rewards";

interface RewardsData {
  points: number;
  storeCredit: number;
  freeShipping: boolean;
  redeemedCoupons: string[];
}

interface RewardsContextType extends RewardsData {
  earnPoints: (amountSpent: number) => number;
  redeemCoupon: (cost: number, couponCode: string) => boolean;
  redeemFreeShipping: () => boolean;
  redeemStoreCredit: (points: number) => boolean;

  consumeCoupon: (couponCode: string) => boolean;
  consumeStoreCredit: (amount: number) => number;
  consumeFreeShipping: () => boolean;

  awardWheelPrize: (prizeId: string) => void;
  spinWheel: () => boolean;

  wheelOpen: boolean;
  openWheel: () => void;
  closeWheel: () => void;
}

const defaultRewards: RewardsData = {
  points: 0,
  storeCredit: 0,
  freeShipping: false,
  redeemedCoupons: [],
};

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [rewards, setRewards] = useState<RewardsData>(() => {
    if (typeof window === "undefined") {
      return defaultRewards;
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return defaultRewards;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return defaultRewards;
    }
  });

  const [wheelOpen, setWheelOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rewards));
  }, [rewards]);

  function earnPoints(amountSpent: number) {
    const pointsEarned = Math.floor(amountSpent) * 100;

    setRewards((current) => ({
      ...current,
      points: current.points + pointsEarned,
    }));

    return pointsEarned;
  }

  function redeemCoupon(cost: number, couponCode: string) {
    if (rewards.points < cost) {
      return false;
    }

    if (rewards.redeemedCoupons.includes(couponCode)) {
      return false;
    }

    setRewards((current) => ({
      ...current,
      points: current.points - cost,
      redeemedCoupons: [...current.redeemedCoupons, couponCode],
    }));

    return true;
  }

  function redeemFreeShipping() {
    const cost = 1500;

    if (rewards.points < cost) {
      return false;
    }

    if (rewards.freeShipping) {
      return false;
    }

    setRewards((current) => ({
      ...current,
      points: current.points - cost,
      freeShipping: true,
    }));

    return true;
  }

  function redeemStoreCredit(points: number) {
    if (points <= 0 || points % 1000 !== 0) {
      return false;
    }

    if (rewards.points < points) {
      return false;
    }

    const credit = points / 1000;

    setRewards((current) => ({
      ...current,
      points: current.points - points,
      storeCredit: current.storeCredit + credit,
    }));

    return true;
  }

  function consumeCoupon(couponCode: string) {
    if (!rewards.redeemedCoupons.includes(couponCode)) {
      return false;
    }

    setRewards((current) => ({
      ...current,
      redeemedCoupons: current.redeemedCoupons.filter(
        (code) => code !== couponCode,
      ),
    }));

    return true;
  }

  function consumeStoreCredit(amount: number) {
    if (amount <= 0 || rewards.storeCredit <= 0) {
      return 0;
    }

    const creditUsed = Math.min(amount, rewards.storeCredit);

    setRewards((current) => ({
      ...current,
      storeCredit: current.storeCredit - creditUsed,
    }));

    return creditUsed;
  }

  function consumeFreeShipping() {
    if (!rewards.freeShipping) {
      return false;
    }

    setRewards((current) => ({
      ...current,
      freeShipping: false,
    }));

    return true;
  }

  function awardWheelPrize(prizeId: string) {
    setRewards((current) => {
      switch (prizeId) {
        case "discount25":
          return current.redeemedCoupons.includes("WHEEL25")
            ? current
            : {
                ...current,
                redeemedCoupons: [...current.redeemedCoupons, "WHEEL25"],
              };

        case "discount30":
          return current.redeemedCoupons.includes("WHEEL30")
            ? current
            : {
                ...current,
                redeemedCoupons: [...current.redeemedCoupons, "WHEEL30"],
              };

        case "discount40":
          return current.redeemedCoupons.includes("WHEEL40")
            ? current
            : {
                ...current,
                redeemedCoupons: [...current.redeemedCoupons, "WHEEL40"],
              };

        case "points5000":
          return {
            ...current,
            points: current.points + 5000,
          };

        case "points10000":
          return {
            ...current,
            points: current.points + 10000,
          };

        case "points20000":
          return {
            ...current,
            points: current.points + 20000,
          };

        case "credit10":
          return {
            ...current,
            storeCredit: current.storeCredit + 10,
          };

        case "freeShipping":
          return {
            ...current,
            freeShipping: true,
          };

        default:
          return current;
      }
    });
  }

  function spinWheel() {
    const cost = 10000;

    if (rewards.points < cost) {
      return false;
    }

    setRewards((current) => ({
      ...current,
      points: current.points - cost,
    }));

    return true;
  }

  function openWheel() {
    setWheelOpen(true);
  }

  function closeWheel() {
    setWheelOpen(false);
  }

  return (
    <RewardsContext.Provider
      value={{
        points: rewards.points,
        storeCredit: rewards.storeCredit,
        freeShipping: rewards.freeShipping,
        redeemedCoupons: rewards.redeemedCoupons,

        earnPoints,
        redeemCoupon,
        redeemFreeShipping,
        redeemStoreCredit,

        consumeCoupon,
        consumeStoreCredit,
        consumeFreeShipping,

        awardWheelPrize,
        spinWheel,

        wheelOpen,
        openWheel,
        closeWheel,
      }}
    >
      {children}
    </RewardsContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardsContext);

  if (!context) {
    throw new Error("useRewards must be used inside RewardsProvider");
  }

  return context;
}
