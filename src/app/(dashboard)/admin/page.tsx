import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dumbbell, CalendarCheck, DollarSign } from "lucide-react";

async function getStats() {
  const [totalUsers, totalClasses, activeBookings, revenue] = await Promise.all([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.class.count(),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.membership.aggregate({
      _sum: { price: true },
      where: { status: "ACTIVE" },
    }),
  ]);

  return {
    totalUsers,
    totalClasses,
    activeBookings,
    revenue: revenue._sum.price || 0,
  };
}

export default async function AdminDashboardPage() {
  const session = await auth();
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-zinc-400">
          Welcome back, {session?.user?.name}. Here&apos;s an overview of your gym.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Total Members
            </CardTitle>
            <Users className="h-4 w-4 text-lime-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Active Classes
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-lime-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalClasses}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Active Bookings
            </CardTitle>
            <CalendarCheck className="h-4 w-4 text-lime-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeBookings}</div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-lime-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${stats.revenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Add charts or tables here later */}
    </div>
  );
}
