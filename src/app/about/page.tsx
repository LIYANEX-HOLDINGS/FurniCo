"use client"
import Image from "next/image";
import { CheckCircle2, Users, Lightbulb, Heart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();

  const stats = [
    { label: t('about_story'), value: "2018" },
    { label: t('products'), value: "1,200+" },
    { label: t('community'), value: "50k+" },
    { label: t('style'), value: "12" },
  ];

  const values = [
    {
      title: t('quality'),
      description: t('quality_desc'),
      icon: CheckCircle2,
    },
    {
      title: t('sustainability'),
      description: t('sustain_desc'),
      icon: Heart,
    },
    {
      title: t('modern'),
      description: t('modern_desc'),
      icon: Lightbulb,
    },
    {
      title: t('community'),
      description: t('community_desc'),
      icon: Users,
    },
  ];

  return (
    <div className="bg-background font-albert-sans overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
          alt="Cozy Interior"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-in slide-in-from-bottom-8 duration-700">
            {t('about_hero')}
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 font-roboto">
            {t('footer_desc')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-primary font-bold tracking-widest uppercase mb-4 block">{t('about_story')}</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                {t('banner_title_2')}
              </h2>
              <div className="space-y-6 text-text-muted font-roboto text-lg leading-relaxed">
                <p>{t('latest_description')}</p>
                <p>{t('footer_desc')}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 border-t border-border-light pt-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">{t('style')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {values.map((val) => (
              <div key={val.title} className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                  <val.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed font-roboto">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="bg-foreground text-white rounded-[2rem] p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 italic font-albert-sans tracking-tight">
                {t('hero_title')}
              </h2>
              <p className="text-lg text-white/70 mb-10 font-roboto max-w-xl mx-auto">
                {t('hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/shop" className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-lg shadow-primary/30">
                  {t('view_all')}
                </a>
                <a href="/contact" className="bg-white/10 text-white backdrop-blur-md px-10 py-4 rounded-full font-bold border border-white/20 hover:bg-white/20 transition-all">
                  {t('contact')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
