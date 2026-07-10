"use client";

import { motion } from "framer-motion";
import { Dumbbell, Users, Zap, Heart, Clock, Trophy } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Stagger";

const features = [
  {
    icon: Dumbbell,
    title: "World-Class Equipment",
    description:
      "State-of-the-art machines and free weights for every training style.",
    gradient: "from-lime-400 to-emerald-400",
  },
  {
    icon: Users,
    title: "Expert Trainers",
    description:
      "Certified coaches with years of experience to guide your journey.",
    gradient: "from-cyan-400 to-blue-400",
  },
  {
    icon: Zap,
    title: "High-Energy Classes",
    description:
      "From HIIT to Yoga, find the perfect class to match your goals.",
    gradient: "from-orange-400 to-red-400",
  },
  {
    icon: Heart,
    title: "Wellness Programs",
    description:
      "Holistic approach combining fitness, nutrition and recovery.",
    gradient: "from-pink-400 to-purple-400",
  },
  {
    icon: Clock,
    title: "24/7 Access",
    description:
      "Train on your schedule. Our doors are always open for you.",
    gradient: "from-amber-400 to-orange-400",
  },
  {
    icon: Trophy,
    title: "Track Progress",
    description:
      "Monitor your gains with our digital tracking and analytics tools.",
    gradient: "from-violet-400 to-indigo-400",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400/[0.02] to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wider text-lime-400">
              Why Choose Us
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
              Everything You Need to{" "}
              <span className="gradient-text">Succeed</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
              We provide all the tools, guidance, and motivation you need to
              achieve your fitness goals.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
