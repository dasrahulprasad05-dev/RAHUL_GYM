import { Navbar } from "@/components/layout/Navbar";
import { FooterSection } from "@/components/home/FooterSection";
import { PageTransition } from "@/components/animations/PageTransition";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

async function getTrainers() {
  return prisma.trainer.findMany({
    include: {
      user: true,
      classes: {
        select: { id: true }
      }
    }
  });
}

export default async function TrainersPage() {
  const trainers = await getTrainers();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <PageTransition>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-white sm:text-6xl mb-4">
                Our <span className="gradient-text">Trainers</span>
              </h1>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Meet the industry experts dedicated to helping you achieve your fitness goals.
                Learn from the best.
              </p>
            </div>

            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {trainers.map((trainer) => (
                <StaggerItem key={trainer.id}>
                  <div className="group rounded-3xl border border-white/10 bg-white/[0.02] p-2 hover:bg-white/[0.04] hover:border-lime-400/20 transition-all duration-500 overflow-hidden">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
                      <div className="absolute inset-0 bg-zinc-800" />
                      {trainer.image && (
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                          style={{ backgroundImage: `url(${trainer.image})` }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                      
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{trainer.user.name}</h3>
                          <p className="text-lime-400 font-medium text-sm">{trainer.specialties}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 pb-4">
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {trainer.bio}
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="text-sm font-medium text-zinc-300">
                          <span className="text-white text-lg mr-1">{trainer.experience}</span>
                          Years Exp.
                        </div>
                      </div>
                    </div>
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
