import { Sidebar } from "@/components/layout/Sidebar";
import { PageTransition } from "@/components/animations/PageTransition";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 flex">
      <Sidebar />
      <main className="flex-1 lg:pl-64 pl-[68px] transition-all duration-300">
        <div className="p-6 md:p-8 max-w-7xl mx-auto h-full min-h-screen">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </main>
    </div>
  );
}
