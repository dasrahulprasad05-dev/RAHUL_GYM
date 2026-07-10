import { auth } from "@/lib/auth";
import { getUserBookings } from "@/app/actions/bookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, Dumbbell, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function MemberDashboardPage() {
  const session = await auth();
  const bookings = await getUserBookings();
  
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.class.schedule) > new Date() && b.status === "CONFIRMED"
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          Member Dashboard
        </h1>
        <p className="text-zinc-400">
          Welcome back, {session?.user?.name}. Ready for your next workout?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Upcoming Classes Widget */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-2 bg-zinc-900/50 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium text-white">
              Upcoming Classes
            </CardTitle>
            <Button asChild variant="ghost" size="sm" className="text-lime-400 hover:text-lime-300">
              <Link href="/classes">Book More</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center bg-zinc-950/50 rounded-lg border border-white/5">
                <Calendar className="h-8 w-8 text-zinc-600 mb-3" />
                <p className="text-zinc-400 font-medium mb-1">No upcoming classes</p>
                <p className="text-sm text-zinc-500">Book a class to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingBookings.slice(0, 3).map((booking) => (
                  <div key={booking.id} className="flex items-start justify-between p-4 rounded-xl bg-zinc-950/50 border border-white/5 hover:border-lime-400/20 transition-colors">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center justify-center w-14 h-14 bg-lime-400/10 text-lime-400 rounded-lg shrink-0 border border-lime-400/20">
                        <span className="text-xs font-bold uppercase">{format(new Date(booking.class.schedule), "MMM")}</span>
                        <span className="text-lg font-black">{format(new Date(booking.class.schedule), "d")}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{booking.class.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {format(new Date(booking.class.schedule), "h:mm a")}
                          </span>
                          <span className="flex items-center gap-1">
                            <Dumbbell className="h-3.5 w-3.5" />
                            {booking.class.duration} min
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-lime-400/10 text-lime-400 border-lime-400/20 hidden sm:flex">
                      Confirmed
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats or Membership Info */}
        <Card className="col-span-1 bg-zinc-900/50 border-white/10">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white">
              Membership Status
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col items-center justify-center py-6 text-center bg-zinc-950/50 rounded-lg border border-white/5 h-full">
                <div className="h-16 w-16 bg-lime-400/10 rounded-full flex items-center justify-center mb-4">
                  <Badge className="bg-lime-400 text-zinc-950 hover:bg-lime-400 font-bold uppercase tracking-widest px-3 py-1 text-xs">
                    PRO
                  </Badge>
                </div>
                <h3 className="text-white font-semibold mb-1">Active Membership</h3>
                <p className="text-sm text-zinc-400">Renews in 14 days</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
