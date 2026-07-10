"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { classSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function getClasses() {
  return prisma.class.findMany({
    include: {
      trainer: { include: { user: true } },
      bookings: true,
    },
    orderBy: { schedule: "asc" },
  });
}

export async function getClassById(id: string) {
  return prisma.class.findUnique({
    where: { id },
    include: {
      trainer: { include: { user: true } },
      bookings: { include: { user: true } },
    },
  });
}

export async function createClass(data: unknown) {
  await requireAdmin();
  const validated = classSchema.parse(data);

  await prisma.class.create({
    data: {
      title: validated.title,
      description: validated.description,
      duration: validated.duration,
      capacity: validated.capacity,
      level: validated.level,
      schedule: new Date(validated.schedule),
      price: validated.price,
      trainerId: validated.trainerId || null,
      image: validated.image || null,
    },
  });

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
  revalidatePath("/");
}

export async function updateClass(id: string, data: unknown) {
  await requireAdmin();
  const validated = classSchema.parse(data);

  await prisma.class.update({
    where: { id },
    data: {
      title: validated.title,
      description: validated.description,
      duration: validated.duration,
      capacity: validated.capacity,
      level: validated.level,
      schedule: new Date(validated.schedule),
      price: validated.price,
      trainerId: validated.trainerId || null,
      image: validated.image || null,
    },
  });

  revalidatePath("/admin/classes");
  revalidatePath("/classes");
}

export async function deleteClass(id: string) {
  await requireAdmin();
  // Delete associated bookings first
  await prisma.booking.deleteMany({ where: { classId: id } });
  await prisma.class.delete({ where: { id } });
  revalidatePath("/admin/classes");
  revalidatePath("/classes");
}
