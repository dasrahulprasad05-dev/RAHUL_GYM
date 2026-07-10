import { getClasses } from "@/app/actions/classes";
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
import { Plus, Edit, Trash2 } from "lucide-react";

export default async function AdminClassesPage() {
  const classes = await getClasses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1">
            Manage Classes
          </h1>
          <p className="text-zinc-400">
            Create, update, and manage all gym classes.
          </p>
        </div>
        <Button className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-semibold shadow-lg shadow-lime-400/20">
          <Plus className="mr-2 h-4 w-4" />
          Add Class
        </Button>
      </div>

      <div className="rounded-xl border border-white/10 bg-zinc-900/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-950/50">
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-zinc-400">Class Name</TableHead>
              <TableHead className="text-zinc-400">Schedule</TableHead>
              <TableHead className="text-zinc-400">Trainer</TableHead>
              <TableHead className="text-zinc-400">Level</TableHead>
              <TableHead className="text-zinc-400">Capacity</TableHead>
              <TableHead className="text-right text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.length === 0 ? (
              <TableRow className="border-white/10">
                <TableCell colSpan={6} className="h-24 text-center text-zinc-500">
                  No classes found. Add your first class!
                </TableCell>
              </TableRow>
            ) : (
              classes.map((cls) => (
                <TableRow key={cls.id} className="border-white/10 hover:bg-white/[0.02]">
                  <TableCell className="font-medium text-white">
                    {cls.title}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {format(new Date(cls.schedule), "MMM d, yyyy h:mm a")}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {cls.trainer?.user.name || "TBA"}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                      {cls.level}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {cls.bookings.length} / {cls.capacity}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-white/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
