import { getUserBookings, cancelBooking } from "@/app/actions/bookings";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default async function MemberBookingsPage() {
  const bookings = await getUserBookings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-lime-400/10 text-lime-400 border-lime-400/20";
      case "CANCELLED":
        return "bg-red-400/10 text-red-400 border-red-400/20";
      case "COMPLETED":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
          My Bookings
        </h1>
        <p className="text-zinc-400">
          View your upcoming classes and past booking history.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-950/50">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-zinc-400">Class Name</TableHead>
              <TableHead className="text-zinc-400">Date & Time</TableHead>
              <TableHead className="text-zinc-400">Trainer</TableHead>
              <TableHead className="text-zinc-400">Status</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={5} className="h-24 text-center text-zinc-500">
                  You have no bookings yet. Time to hit the gym!
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => {
                const isUpcoming = new Date(booking.class.schedule) > new Date();
                const canCancel = isUpcoming && booking.status === "CONFIRMED";

                return (
                  <TableRow key={booking.id} className="border-white/10 hover:bg-white/[0.02]">
                    <TableCell className="font-medium text-white">
                      {booking.class.title}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {format(new Date(booking.class.schedule), "MMM d, yyyy h:mm a")}
                    </TableCell>
                    <TableCell className="text-zinc-300">
                      {booking.class.trainer?.user.name || "TBA"}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {canCancel && (
                        <form action={async () => {
                          "use server";
                          await cancelBooking(booking.id);
                        }}>
                          <Button 
                            type="submit" 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                        </form>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
