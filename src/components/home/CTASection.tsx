"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn>
          <motion.div
            whileHover={{ scale: 1.005 }}
            className="relative rounded-3xl border border-lime-400/20 bg-gradient-to-br from-lime-400/10 via-zinc-900/50 to-zinc-950 p-12 sm:p-16 overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-lime-400/10 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-lime-400/5 blur-[100px]" />

            <div className="relative text-center">
              <h2 className="text-3xl font-bold text-white sm:text-5xl">
                Ready to Transform
                <br />
                <span className="gradient-text">Your Body & Mind?</span>
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-lg">
                Join thousands of members who have already started their fitness
                journey with IronPulse. First week is on us.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-13 bg-lime-400 px-10 text-base font-bold text-zinc-950 hover:bg-lime-300 shadow-xl shadow-lime-400/25"
                >
                  <Link href="/register">
                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 border-zinc-600 px-8 text-base text-zinc-300"
                >
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
