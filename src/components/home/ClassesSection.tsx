"use client";

import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Clock, Users, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ClassWithDetails {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  capacity: number;
  level: string;
  image: string | null;
  price: number | null;
  schedule: Date;
  bookings: { id: string }[];
  trainer: { user: { name: string | null } } | null;
}

export function ClassesSection({ classes }: { classes: ClassWithDetails[] }) {
  const displayClasses = classes.slice(0, 6);

  const levelColor: Record<string, string> = {
    Beginner: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    Intermediate: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    Advanced: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-lime-400">
                Popular Classes
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
                Find Your <span className="gradient-text">Perfect Fit</span>
              </h2>
              <p className="mt-3 text-zinc-400 max-w-xl">
                From high-intensity workouts to mindful stretching — we have
                something for everyone.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-4 sm:mt-0 border-zinc-700 text-zinc-300 hover:bg-white/5"
              render={<Link href="/classes" />}
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayClasses.map((cls) => (
            <StaggerItem key={cls.id}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-lime-400/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{
                      backgroundImage: cls.image
                        ? `url(${cls.image})`
                        : "linear-gradient(135deg, #18181b, #27272a)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge
                      variant="outline"
                      className={`${levelColor[cls.level] || ""} text-xs`}
                    >
                      {cls.level}
                    </Badge>
                  </div>
                  {cls.price && (
                    <div className="absolute top-3 right-3 rounded-lg bg-zinc-950/70 backdrop-blur-sm px-2.5 py-1 text-sm font-bold text-lime-400">
                      ${cls.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {cls.title}
                  </h3>
                  {cls.trainer && (
                    <p className="text-sm text-zinc-500 mb-3">
                      with {cls.trainer.user.name}
                    </p>
                  )}
                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                    {cls.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {cls.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {cls.bookings.length}/{cls.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5" />
                      {cls.level}
                    </span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
