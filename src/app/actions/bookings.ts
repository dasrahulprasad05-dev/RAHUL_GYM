"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function bookClass(classId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Please log in to book a class");

  const cls = await prisma.class.findUnique({
    where: { id: classId },
    include: { bookings: { where: { status: "CONFIRMED" } } },
  });

  if (!cls) throw new Error("Class not found");
  if (cls.bookings.length >= cls.capacity) throw new Error("This class is full");

  const existing = await prisma.booking.findUnique({
    where: {
      userId_classId: {
        userId: session.user.id,
        classId,
      },
    },
  });

  if (existing) {
    if (existing.status === "CANCELLED") {
      await prisma.booking.update({
        where: { id: existing.id },
        data: { status: "CONFIRMED" },
      });
    } else {
      throw new Error("You have already booked this class");
    }
  } else {
    await prisma.booking.create({
      data: {
        userId: session.user.id,
        classId,
      },
    });
  }

  revalidatePath("/member");
  revalidatePath("/member/bookings");
  revalidatePath("/classes");
}

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking || booking.userId !== session.user.id) {
    throw new Error("Unauthorized");
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/member");
  revalidatePath("/member/bookings");
}

export async function getUserBookings() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  return prisma.booking.findMany({
    where: { userId: session.user.id },
    include: {
      class: {
        include: {
          trainer: { include: { user: true } },
        },
      },
    },
    orderBy: { bookedAt: "desc" },
  });
}
