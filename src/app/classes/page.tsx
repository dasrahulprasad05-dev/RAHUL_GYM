import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { getClasses } from "@/app/actions/classes";
import { PageTransition } from "@/components/animations/PageTransition";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Zap, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { format } from "date-fns";

export default async function ClassesPage() {
  const classes = await getClasses();
  const session = await auth();

  const levelColor: Record<string, string> = {
    Beginner: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
    Intermediate: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    Advanced: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <PageTransition>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white sm:text-6xl mb-4">
                Our <span className="gradient-text">Classes</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Discover our range of premium fitness classes led by expert trainers.
                Book your spot today and push your limits.
              </p>
            </div>

            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => {
                const isFull = cls.bookings.length >= cls.capacity;
                const isBooked = cls.bookings.some((b) => b.userId === session?.user?.id && b.status === "CONFIRMED");

                return (
                  <StaggerItem key={cls.id}>
                    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col h-full hover:border-lime-400/20 transition-all duration-300">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden shrink-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{
                            backgroundImage: cls.image
                              ? `url(${cls.image})`
                              : "linear-gradient(135deg, #18181b, #27272a)",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <Badge
                            variant="outline"
                            className={`${levelColor[cls.level] || ""} text-xs font-semibold backdrop-blur-md`}
                          >
                            {cls.level}
                          </Badge>
                        </div>
                        {cls.price && (
                          <div className="absolute top-4 right-4 rounded-xl bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 text-sm font-bold text-lime-400 border border-lime-400/20">
                            ${cls.price}
                          </div>
                        )}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {cls.title}
                          </h3>
                          {cls.trainer && (
                            <p className="text-sm text-zinc-300 font-medium">
                              with {cls.trainer.user.name}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <p className="text-sm text-zinc-400 mb-6 flex-1">
                          {cls.description}
                        </p>
                        
                        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm text-zinc-300 mb-6 bg-zinc-900/50 rounded-xl p-4 border border-white/5">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-lime-400" />
                            <span>{format(new Date(cls.schedule), "MMM d, h:mm a")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-lime-400" />
                            <span>{cls.duration} min</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-lime-400" />
                            <span>{cls.bookings.length} / {cls.capacity} booked</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-lime-400" />
                            <span>{cls.level}</span>
                          </div>
                        </div>

                        {session ? (
                          <Button
                            asChild
                            disabled={isFull || isBooked}
                            className={`w-full ${
                              isBooked 
                                ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-800 border border-zinc-700" 
                                : isFull 
                                  ? "bg-red-500/10 text-red-500 hover:bg-red-500/10 border border-red-500/20"
                                  : "bg-lime-400 text-zinc-950 hover:bg-lime-300 shadow-lg shadow-lime-400/20 font-bold"
                            }`}
                          >
                            <Link href={`/member`}>
                              {isBooked ? "Already Booked" : isFull ? "Class Full" : "Book Class"}
                            </Link>
                          </Button>
                        ) : (
                          <Button asChild className="w-full bg-zinc-100 text-zinc-950 hover:bg-white font-bold">
                            <Link href="/login">Sign in to Book</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </PageTransition>
      </main>

      <FooterSection />
    </div>
  );
}
