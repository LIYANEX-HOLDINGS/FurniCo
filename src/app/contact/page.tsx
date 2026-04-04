"use client"
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-bold font-albert-sans mb-6">{t('contact_us')}</h1>
          <p className="text-text-muted font-roboto text-lg">{t('latest_description')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 flex flex-col gap-8 bg-[#fdfdfd] border border-border-light p-8 rounded-sm">
            <h3 className="font-albert-sans font-bold text-2xl border-b border-border-light pb-4">{t('information')}</h3>
            
            <div className="flex gap-4 items-start">
              <div className="bg-bg-light p-3 rounded-full text-primary mt-1"><MapPin className="w-5 h-5"/></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider">{t('address')}</span>
                <span className="text-sm text-text-muted">123 Cozy Lane, Comfort City, CC 56789</span>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-bg-light p-3 rounded-full text-primary mt-1"><Phone className="w-5 h-5"/></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider">{t('contact_info')}</span>
                <span className="text-sm text-text-muted">+1 (202) 555-0172</span>
                <span className="text-sm text-text-muted">hello@cozycorner.com</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-bg-light p-3 rounded-full text-primary mt-1"><Mail className="w-5 h-5"/></div>
              <div className="flex flex-col pt-4">
                <span className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider">{t('office_hours')}</span>
                <span className="text-sm text-text-muted">{t('mon_fri')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100" onSubmit={e => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-bold font-albert-sans text-foreground uppercase tracking-wider">{t('your_name')}</label>
                <input type="text" placeholder={t('your_name')} className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-roboto" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold font-albert-sans text-foreground uppercase tracking-wider">{t('your_email')}</label>
                <input type="email" placeholder="example@mail.com" className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-roboto" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold font-albert-sans text-foreground uppercase tracking-wider">{t('subject_label')}</label>
                <input type="text" placeholder={t('subject_placeholder')} className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-roboto" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold font-albert-sans text-foreground uppercase tracking-wider">{t('message_label')}</label>
                <textarea rows={5} placeholder={t('message_placeholder')} className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-roboto resize-none" />
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full md:w-auto px-10 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest hover:bg-primary-dark transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20">{t('submit')}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
