"use client"
import { useState, useEffect } from "react";
import { useCmsStore, HeroSlide, Testimonial } from "@/store/cmsStore";
import { 
  Layout, 
  Image as ImageIcon, 
  MessageSquare, 
  Award, 
  Clock, 
  Lightbulb, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle,
  ExternalLink
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TabType = "hero" | "testimonials" | "brands" | "deals" | "inspiration" | "storefront";

export default function AdminContentPage() {
  const { 
    heroSlides, updateHeroSlides,
    testimonials, updateTestimonials,
    brands, updateBrands,
    dealDay, updateDealDay,
    inspiration, updateInspiration,
    latestProducts, updateLatestProducts,
    featuredOffers, updateFeaturedOffers
  } = useCmsStore();

  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [isClient, setIsClient] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => setIsClient(true), []);

  const handleSave = () => {
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("All changes saved!");
      setTimeout(() => setSaveStatus(null), 3000);
    }, 800);
  };

  if (!isClient) return null;

  const tabs = [
    { id: "hero", label: "Hero Slider", icon: ImageIcon },
    { id: "testimonials", label: "Testimonials", icon: MessageSquare },
    { id: "brands", label: "Brands", icon: Award },
    { id: "deals", label: "Deals", icon: Clock },
    { id: "inspiration", label: "Inspiration", icon: Lightbulb },
    { id: "storefront", label: "Storefront", icon: Layout },
  ];

  return (
    <div className="space-y-8 pb-20 text-foreground">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-albert-sans">Website Content</h1>
          <p className="text-gray-500 font-roboto mt-1">Manage your homepage sections and marketing content.</p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus && (
            <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> {saveStatus}
            </span>
          )}
          <button 
            onClick={handleSave}
            className="bg-primary text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold hover:bg-primary-hover transition-all shadow-lg active:scale-95"
          >
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 border-b-2 transition-all font-bold text-sm",
              activeTab === tab.id 
                ? "border-primary text-primary" 
                : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-200"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {activeTab === "hero" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Hero Slides</h3>
              <button 
                onClick={() => updateHeroSlides([...heroSlides, { id: Date.now().toString(), title: "New Slide", subtitle: "", description: "", image: "", buttonText: "Shop Now" }])}
                className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Slide
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {heroSlides.map((slide, index) => (
                <div key={slide.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3 aspect-video relative bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                    {slide.image ? (
                      <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-300">No Image</div>
                    )}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm font-bold"
                        value={slide.title}
                        onChange={(e) => {
                          const next = [...heroSlides];
                          next[index].title = e.target.value;
                          updateHeroSlides(next);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Button Text</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm"
                        value={slide.buttonText}
                        onChange={(e) => {
                          const next = [...heroSlides];
                          next[index].buttonText = e.target.value;
                          updateHeroSlides(next);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Subtitle</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const next = [...heroSlides];
                          next[index].subtitle = e.target.value;
                          updateHeroSlides(next);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Image URL</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm"
                        value={slide.image}
                        onChange={(e) => {
                          const next = [...heroSlides];
                          next[index].image = e.target.value;
                          updateHeroSlides(next);
                        }}
                      />
                    </div>
                    <div className="space-y-1 col-span-full">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Description</label>
                      <textarea 
                        className="w-full border border-gray-200 rounded p-2 focus:border-primary outline-none text-sm min-h-[60px]"
                        value={slide.description}
                        onChange={(e) => {
                          const next = [...heroSlides];
                          next[index].description = e.target.value;
                          updateHeroSlides(next);
                        }}
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => updateHeroSlides(heroSlides.filter(s => s.id !== slide.id))}
                    className="self-start p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Client Reviews</h3>
              <button 
                onClick={() => updateTestimonials([...testimonials, { id: Date.now().toString(), name: "New Client", role: "Customer", text: "" }])}
                className="text-primary text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t, index) => (
                <div key={t.id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <input 
                          className="font-bold border-none outline-none focus:ring-0 p-0 text-sm"
                          value={t.name}
                          onChange={(e) => {
                            const next = [...testimonials];
                            next[index].name = e.target.value;
                            updateTestimonials(next);
                          }}
                        />
                        <input 
                          className="text-xs text-gray-400 block border-none outline-none focus:ring-0 p-0"
                          value={t.role}
                          onChange={(e) => {
                            const next = [...testimonials];
                            next[index].role = e.target.value;
                            updateTestimonials(next);
                          }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => updateTestimonials(testimonials.filter(item => item.id !== t.id))}
                      className="text-gray-300 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea 
                    className="w-full text-sm font-roboto text-gray-600 italic border border-gray-50 rounded p-2 focus:border-primary outline-none"
                    value={t.text}
                    rows={4}
                    onChange={(e) => {
                      const next = [...testimonials];
                      next[index].text = e.target.value;
                      updateTestimonials(next);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "brands" && (
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm space-y-8">
            <h3 className="text-xl font-bold">Partner Logos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands.map((brand, i) => (
                <div key={i} className="group relative aspect-video bg-gray-50 rounded-lg p-4 border border-border-light flex items-center justify-center">
                  <Image src={brand} alt="Brand" width={100} height={40} className="object-contain grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100" />
                  <button 
                    onClick={() => updateBrands(brands.filter((_, idx) => idx !== i))}
                    className="absolute -top-2 -right-2 bg-white text-red-500 p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => {
                  const url = prompt("Enter logo URL:");
                  if (url) updateBrands([...brands, url]);
                }}
                className="aspect-video border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary hover:text-primary transition-all text-gray-400 group"
              >
                <Plus className="w-6 h-6 group-hover:scale-110" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Add Logo</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "deals" && (
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm space-y-10">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Deal of the Day</h3>
                <p className="text-sm text-gray-500">Configure your daily hero promotion and countdown.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Promotion Label</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                    value={dealDay.title}
                    onChange={(e) => updateDealDay({...dealDay, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Subtitle/Offer Text</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                    value={dealDay.subtitle}
                    onChange={(e) => updateDealDay({...dealDay, subtitle: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Sale Price ($)</label>
                    <input 
                      type="number"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                      value={dealDay.price}
                      onChange={(e) => updateDealDay({...dealDay, price: parseFloat(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Regular Price ($)</label>
                    <input 
                      type="number"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                      value={dealDay.oldPrice}
                      onChange={(e) => updateDealDay({...dealDay, oldPrice: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">End Date/Time</label>
                  <input 
                    type="datetime-local"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                    defaultValue={new Date(dealDay.endTime).toISOString().slice(0, 16)}
                    onChange={(e) => updateDealDay({...dealDay, endTime: new Date(e.target.value).toISOString()})}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Product Image URL</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary mb-4"
                    value={dealDay.image}
                    onChange={(e) => updateDealDay({...dealDay, image: e.target.value})}
                  />
                  <div className="aspect-square relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                    {dealDay.image ? (
                      <Image src={dealDay.image} alt="Deal" fill className="object-cover" />
                    ) : (
                      <span className="text-gray-300">Preview</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Detailed Description</label>
              <textarea 
                className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-primary min-h-[100px]"
                value={dealDay.description}
                onChange={(e) => updateDealDay({...dealDay, description: e.target.value})}
              />
            </div>
          </div>
        )}

        {activeTab === "inspiration" && (
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Inspiration Bundle</h3>
                <p className="text-sm text-gray-500">Configure the large lifestyle promo section.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Main Title</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                    value={inspiration.title}
                    onChange={(e) => updateInspiration({...inspiration, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Subtitle</label>
                  <input 
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                    value={inspiration.subtitle}
                    onChange={(e) => updateInspiration({...inspiration, subtitle: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Short Description</label>
                  <textarea 
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-primary min-h-[120px]"
                    value={inspiration.description}
                    onChange={(e) => updateInspiration({...inspiration, description: e.target.value})}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-gray-700">Lifestyle Image URL</label>
                <div className="flex gap-2 mb-4">
                  <input 
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:border-primary"
                    value={inspiration.image}
                    onChange={(e) => updateInspiration({...inspiration, image: e.target.value})}
                  />
                  <button className="px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="aspect-video relative bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  {inspiration.image ? (
                    <Image src={inspiration.image} alt="Inspiration" fill className="object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-300">Preview</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "storefront" && (
          <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm space-y-10">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
              <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center">
                <Layout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Storefront Settings</h3>
                <p className="text-sm text-gray-500">Configure global headings and product display settings.</p>
              </div>
            </div>

            <div className="space-y-8 pt-10 border-t border-gray-50">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Featured Offers (3 Banners)</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredOffers.map((offer, index) => (
                  <div key={offer.id} className="bg-gray-50 border border-gray-100 rounded-xl p-6 shadow-sm space-y-4">
                    <div className="aspect-video relative rounded-lg overflow-hidden border border-gray-200">
                      <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Tag (e.g. Sales, Tables)</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm font-bold bg-transparent"
                        value={offer.tag}
                        onChange={(e) => {
                          const next = [...featuredOffers];
                          next[index].tag = e.target.value;
                          updateFeaturedOffers(next);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Title</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm font-bold bg-transparent"
                        value={offer.title}
                        onChange={(e) => {
                          const next = [...featuredOffers];
                          next[index].title = e.target.value;
                          updateFeaturedOffers(next);
                        }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Image URL</label>
                      <input 
                        className="w-full border-b border-gray-200 py-1 focus:border-primary outline-none text-sm bg-transparent"
                        value={offer.image}
                        onChange={(e) => {
                          const next = [...featuredOffers];
                          next[index].image = e.target.value;
                          updateFeaturedOffers(next);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
