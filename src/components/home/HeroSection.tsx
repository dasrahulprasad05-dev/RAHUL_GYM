"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/Stagger";

const stats = [
  { label: "Active Members", value: "2,400+" },
  { label: "Weekly Classes", value: "85+" },
  { label: "Expert Trainers", value: "32" },
  { label: "Avg. Rating", value: "4.9★" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 min-h-screen flex flex-col justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-400/10 via-transparent to-transparent" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-lime-400/5 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-lime-400/3 blur-[100px]" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(163,230,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(163,230,53,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-2 text-sm font-medium text-lime-400"
            >
              <Flame className="h-4 w-4 animate-pulse" />
              New members get 7 days free
              <Sparkles className="h-4 w-4" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
            >
              Train Hard.
              <br />
              <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
                Live Strong.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
            >
              World-class trainers, cutting-edge classes and a community that
              pushes you past your limits. Your transformation starts here.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-13 bg-lime-400 px-8 text-base font-bold text-zinc-950 hover:bg-lime-300 shadow-xl shadow-lime-400/25 transition-all hover:shadow-lime-400/40 hover:scale-105"
              >
                <Link href="/register">
                  Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-13 border-zinc-700 px-8 text-base text-zinc-300 hover:bg-white/5 hover:border-zinc-500"
              >
                <Link href="/classes">Browse Classes</Link>
              </Button>
            </motion.div>
          </div>
        </FadeIn>

        {/* Stats */}
        <StaggerContainer className="mt-24 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm hover:border-lime-400/20 transition-colors"
              >
                <div className="text-3xl font-bold text-white sm:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{stat.label}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
