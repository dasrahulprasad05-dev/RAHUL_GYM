import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { PageTransition } from "@/components/animations/PageTransition";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "Basic",
    price: "29",
    description: "Perfect for getting started with your fitness journey.",
    features: [
      { name: "Access to gym floor", included: true },
      { name: "Basic equipment usage", included: true },
      { name: "Locker room access", included: true },
      { name: "Group classes", included: false },
      { name: "Personal training sessions", included: false },
      { name: "Nutrition plan", included: false },
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "59",
    description: "Our most popular plan for dedicated fitness enthusiasts.",
    features: [
      { name: "Access to gym floor", included: true },
      { name: "Basic equipment usage", included: true },
      { name: "Locker room access", included: true },
      { name: "Unlimited group classes", included: true },
      { name: "1 Personal training session/mo", included: true },
      { name: "Nutrition plan", included: false },
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "99",
    description: "The ultimate fitness experience with all perks included.",
    features: [
      { name: "Access to gym floor", included: true },
      { name: "Basic equipment usage", included: true },
      { name: "Locker room access", included: true },
      { name: "Unlimited group classes", included: true },
      { name: "4 Personal training sessions/mo", included: true },
      { name: "Custom nutrition plan", included: true },
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-lime-400/5 blur-[120px]" />
        
        <PageTransition>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white sm:text-6xl mb-4">
                Simple, Transparent <span className="gradient-text">Pricing</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Choose the perfect plan for your fitness goals. No hidden fees, cancel anytime.
              </p>
            </div>

            <StaggerContainer className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <StaggerItem key={plan.name}>
                  <div className={`relative rounded-3xl border p-8 flex flex-col h-full backdrop-blur-sm transition-all duration-300 ${
                    plan.popular 
                      ? "border-lime-400 bg-lime-400/[0.02] shadow-2xl shadow-lime-400/10 scale-105 z-10" 
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <span className="bg-lime-400 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-zinc-400 text-sm mb-6 h-10">{plan.description}</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                        <span className="text-zinc-500 font-medium">/month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-lime-400 shrink-0" />
                          ) : (
                            <X className="h-5 w-5 text-zinc-600 shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? "text-zinc-300" : "text-zinc-600"}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      className={`w-full h-12 rounded-xl font-bold ${
                        plan.popular
                          ? "bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-lg shadow-lime-400/20"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      render={<Link href="/register" />}
                    >
                      Get Started
                    </Button>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </PageTransition>
      </main>

      <FooterSection />
    </div>
  );
}
