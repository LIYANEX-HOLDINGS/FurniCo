"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { useCmsStore } from "@/store/cmsStore";
import { useTranslation } from "@/hooks/useTranslation";

import { Price } from "../ui/Price";

export default function DealCountdown() {
  const { dealDay } = useCmsStore();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
    const targetDate = new Date(dealDay.endTime).getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(intervalId);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dealDay.endTime]);

  if (!isClient) return null;

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-bg-light rounded-xl overflow-hidden flex flex-col md:flex-row relative group">
          
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10">
            <span className="text-[#e32c2b] font-albert-sans font-semibold tracking-wider uppercase mb-2">
              {t('deal_of_the_day')}
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-foreground font-albert-sans mb-4">
              {dealDay.subtitle}
            </h2>
            <p className="text-text-muted font-roboto mb-8 max-w-md">
              {dealDay.description}
            </p>
            
            <div className="flex items-center gap-4 mb-10">
              <Price amount={dealDay.price} className="text-3xl font-bold text-primary" />
              <Price amount={dealDay.oldPrice} className="text-lg text-text-muted line-through" />
            </div>

            {/* Countdown Flip Boxes */}
            <div className="flex gap-4 mb-10">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white shadow-sm flex items-center justify-center rounded text-2xl font-bold font-albert-sans text-foreground mb-2">
                  {formatNumber(timeLeft.days)}
                </div>
                <span className="text-xs uppercase text-text-muted font-roboto tracking-wider">{t('days')}</span>
              </div>
              <span className="text-2xl font-bold mt-3 text-text-muted">:</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white shadow-sm flex items-center justify-center rounded text-2xl font-bold font-albert-sans text-foreground mb-2">
                  {formatNumber(timeLeft.hours)}
                </div>
                <span className="text-xs uppercase text-text-muted font-roboto tracking-wider">{t('hrs')}</span>
              </div>
              <span className="text-2xl font-bold mt-3 text-text-muted">:</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white shadow-sm flex items-center justify-center rounded text-2xl font-bold font-albert-sans text-foreground mb-2">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <span className="text-xs uppercase text-text-muted font-roboto tracking-wider">{t('mins')}</span>
              </div>
              <span className="text-2xl font-bold mt-3 text-text-muted">:</span>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white shadow-sm flex items-center justify-center rounded text-2xl font-bold font-albert-sans text-primary mb-2">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <span className="text-xs uppercase text-text-muted font-roboto tracking-wider">{t('secs')}</span>
              </div>
            </div>

            <Button size="lg" className="w-fit text-base uppercase tracking-wider px-10">
              {t('shop_now')}
            </Button>
          </div>

          <div className="w-full md:w-1/2 h-[400px] md:h-auto relative">
            <Image
              src={dealDay.image}
              alt="Deal Attraction"
              fill
              className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
