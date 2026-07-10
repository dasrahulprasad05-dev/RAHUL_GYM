import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, User as UserIcon, Shield, CreditCard } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

export const metadata = {
  title: "My Profile | IronPulse Gym",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Fetch full user details from the database
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      memberships: {
        where: { status: "ACTIVE" },
        take: 1,
      }
    }
  });

  if (!user) {
    redirect("/login");
  }

  const activeMembership = user.memberships[0];

  return (
    <FadeIn>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">My Profile</h1>
        <p className="text-zinc-400">
          Manage your account settings and membership details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Details Card */}
        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-white">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <Avatar className="h-24 w-24 border-2 border-lime-400">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback className="bg-zinc-800 text-2xl text-lime-400 font-bold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">{user.name}</h3>
                <div className="inline-flex items-center rounded-full bg-lime-400/10 px-2.5 py-0.5 text-xs font-semibold text-lime-400">
                  {user.role}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950/50 border border-white/5">
                <Mail className="h-5 w-5 text-zinc-500" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Email Address</p>
                  <p className="text-sm font-medium text-zinc-200">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950/50 border border-white/5">
                <UserIcon className="h-5 w-5 text-zinc-500" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Account ID</p>
                  <p className="text-sm font-medium text-zinc-200 truncate max-w-[200px]">{user.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-950/50 border border-white/5">
                <Calendar className="h-5 w-5 text-zinc-500" />
                <div>
                  <p className="text-xs font-medium text-zinc-500">Joined On</p>
                  <p className="text-sm font-medium text-zinc-200">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Membership Details Card */}
        <Card className="bg-zinc-900/50 border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium text-white">Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            {activeMembership ? (
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="p-5 rounded-xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-lime-400/20 rounded-full blur-2xl" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm font-medium text-lime-400 mb-1">Current Plan</p>
                      <h4 className="text-2xl font-bold text-white">{activeMembership.plan}</h4>
                    </div>
                    <Shield className="h-8 w-8 text-lime-400 opacity-80" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Billing Cycle</p>
                      <p className="text-sm font-medium text-zinc-200">Monthly (${activeMembership.price})</p>
                    </div>
                    <div>
                      <p className="text-xs text-zinc-500 mb-1">Next Payment</p>
                      <p className="text-sm font-medium text-zinc-200">
                        {new Date(activeMembership.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="w-full bg-lime-400 text-zinc-950 hover:bg-lime-300 font-bold">
                    Upgrade Plan
                  </Button>
                  <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800">
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center bg-zinc-950/50 rounded-lg border border-white/5 h-[280px]">
                <CreditCard className="h-10 w-10 text-zinc-600 mb-4" />
                <h4 className="text-lg font-medium text-white mb-2">No Active Membership</h4>
                <p className="text-sm text-zinc-400 mb-6 max-w-[250px]">
                  You are currently on the free tier. Upgrade to access premium classes and features.
                </p>
                <Button className="bg-lime-400 text-zinc-950 hover:bg-lime-300 font-bold px-8">
                  View Plans
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </FadeIn>
  );
}
