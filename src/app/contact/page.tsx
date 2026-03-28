"use client"
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="py-16 md:py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-3xl md:text-5xl font-bold font-albert-sans mb-6">Contact Us</h1>
          <p className="text-text-muted font-roboto text-lg">We love to hear from you. Friendly customer service is our top priority, and we are happy to assist you with any questions or concerns.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 flex flex-col gap-8 bg-[#fdfdfd] border border-border-light p-8 rounded-sm">
            <h3 className="font-albert-sans font-bold text-2xl border-b border-border-light pb-4">Information</h3>
            
            <div className="flex gap-4 items-start">
              <div className="bg-bg-light p-3 rounded-full text-primary mt-1"><MapPin className="w-5 h-5"/></div>
              <div className="font-roboto flex flex-col">
                <span className="font-bold text-foreground font-albert-sans mb-1 text-lg">Address</span>
                <span className="text-text-muted leading-relaxed">212 Main Street, City<br/>State 101010, Country</span>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-bg-light p-3 rounded-full text-primary mt-1"><Phone className="w-5 h-5"/></div>
              <div className="font-roboto flex flex-col">
                <span className="font-bold text-foreground font-albert-sans mb-1 text-lg">Phone</span>
                <span className="text-text-muted">+1-202-555-0172<br/>Toll-Free: 1-800-123-4567</span>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-bg-light p-3 rounded-full text-primary mt-1"><Mail className="w-5 h-5"/></div>
              <div className="font-roboto flex flex-col">
                <span className="font-bold text-foreground font-albert-sans mb-1 text-lg">Email</span>
                <span className="text-text-muted">support@cozycorner.com<br/>questions@cozycorner.com</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white border border-border-light p-8 md:p-12 rounded-sm shadow-sm md:shadow-none">
            <h3 className="font-albert-sans font-bold text-2xl mb-8">Send us a message</h3>
            <form className="flex flex-col gap-6 font-roboto" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Your Name <span className="text-[#e74c3c]">*</span></label>
                  <input type="text" id="name" required className="w-full border border-border-light rounded py-3 px-4 focus:outline-none focus:border-primary transition-colors bg-bg-light" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Your Email <span className="text-[#e74c3c]">*</span></label>
                  <input type="email" id="email" required className="w-full border border-border-light rounded py-3 px-4 focus:outline-none focus:border-primary transition-colors bg-bg-light" placeholder="john@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <input type="text" id="subject" className="w-full border border-border-light rounded py-3 px-4 focus:outline-none focus:border-primary transition-colors bg-bg-light" placeholder="Order Inquiry" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Your Message <span className="text-[#e74c3c]">*</span></label>
                <textarea id="message" required rows={6} className="w-full border border-border-light rounded py-3 px-4 focus:outline-none focus:border-primary transition-colors bg-bg-light resize-y" placeholder="How can we help you?"></textarea>
              </div>
              <button className="bg-foreground text-white hover:bg-primary py-4 px-10 rounded-sm font-albert-sans font-semibold tracking-wider uppercase transition-colors self-start mt-2">
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
