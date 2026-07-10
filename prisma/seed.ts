import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminHash = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@gym.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@gym.com",
      password: adminHash,
      role: "ADMIN",
    },
  });

  // Create member user
  const memberHash = await bcrypt.hash("user123", 12);
  const member = await prisma.user.upsert({
    where: { email: "member@gym.com" },
    update: {},
    create: {
      name: "John Member",
      email: "member@gym.com",
      password: memberHash,
      role: "USER",
    },
  });

  // Create trainer user
  const trainerHash = await bcrypt.hash("trainer123", 12);
  const trainerUser = await prisma.user.upsert({
    where: { email: "trainer@gym.com" },
    update: {},
    create: {
      name: "Sarah Power",
      email: "trainer@gym.com",
      password: trainerHash,
      role: "TRAINER",
    },
  });

  // Create second trainer
  const trainer2Hash = await bcrypt.hash("trainer123", 12);
  const trainerUser2 = await prisma.user.upsert({
    where: { email: "mike@gym.com" },
    update: {},
    create: {
      name: "Mike Strong",
      email: "mike@gym.com",
      password: trainer2Hash,
      role: "TRAINER",
    },
  });

  // Create trainer profiles
  const trainer = await prisma.trainer.upsert({
    where: { userId: trainerUser.id },
    update: {},
    create: {
      userId: trainerUser.id,
      bio: "Certified strength & HIIT coach with 8 years experience. Specializing in functional training and body transformations.",
      specialties: "Strength, HIIT, Mobility",
      experience: 8,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop",
    },
  });

  const trainer2 = await prisma.trainer.upsert({
    where: { userId: trainerUser2.id },
    update: {},
    create: {
      userId: trainerUser2.id,
      bio: "Former professional athlete turned personal trainer. Expert in athletic performance and rehabilitation.",
      specialties: "Athletics, Rehab, CrossFit",
      experience: 12,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=400&fit=crop",
    },
  });

  // Create classes
  const now = Date.now();
  const DAY = 86400000;

  await prisma.class.deleteMany({});

  await prisma.class.createMany({
    data: [
      {
        title: "Morning HIIT Burn",
        description: "High intensity interval training to start your day strong. Burn up to 600 calories in this explosive 45-minute session.",
        duration: 45,
        capacity: 20,
        level: "Intermediate",
        schedule: new Date(now + DAY * 1),
        price: 15,
        trainerId: trainer.id,
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop",
      },
      {
        title: "Powerlifting Fundamentals",
        description: "Learn the big three lifts — squat, bench, deadlift — with perfect form and progressive overload principles.",
        duration: 60,
        capacity: 12,
        level: "Beginner",
        schedule: new Date(now + DAY * 2),
        price: 25,
        trainerId: trainer.id,
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=500&fit=crop",
      },
      {
        title: "Yoga Flow & Mobility",
        description: "Restore, stretch and improve range of motion. Perfect for recovery days or enhancing your flexibility.",
        duration: 50,
        capacity: 25,
        level: "Beginner",
        schedule: new Date(now + DAY * 3),
        price: 12,
        trainerId: trainer2.id,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop",
      },
      {
        title: "CrossFit WOD",
        description: "Workout of the Day — constantly varied, high-intensity functional movements. Push your limits every session.",
        duration: 60,
        capacity: 15,
        level: "Advanced",
        schedule: new Date(now + DAY * 1),
        price: 20,
        trainerId: trainer2.id,
        image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&h=500&fit=crop",
      },
      {
        title: "Boxing Cardio",
        description: "Non-contact boxing workout combining technique drills with cardio intervals. Great for stress relief.",
        duration: 45,
        capacity: 18,
        level: "Intermediate",
        schedule: new Date(now + DAY * 4),
        price: 18,
        trainerId: trainer.id,
        image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=500&fit=crop",
      },
      {
        title: "Spin & Burn",
        description: "Indoor cycling class with energizing music and interval challenges. Torch calories while building endurance.",
        duration: 40,
        capacity: 30,
        level: "Beginner",
        schedule: new Date(now + DAY * 5),
        price: 14,
        trainerId: trainer2.id,
        image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&h=500&fit=crop",
      },
    ],
  });

  // Create a membership for the member
  await prisma.membership.upsert({
    where: { id: "seed-membership-1" },
    update: {},
    create: {
      id: "seed-membership-1",
      userId: member.id,
      plan: "Pro",
      price: 49.99,
      startDate: new Date(),
      endDate: new Date(now + DAY * 30),
      status: "ACTIVE",
    },
  });

  console.log("✅ Seed complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Admin  → admin@gym.com / admin123");
  console.log("Member → member@gym.com / user123");
  console.log("Trainer → trainer@gym.com / trainer123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
