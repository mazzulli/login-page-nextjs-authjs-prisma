"use server";

import { auth } from "@/_lib/auth";
import db from "@/_lib/db/db";
import {
  examConfigSchema,
  ExamConfigSchema,
  ExamSchema,
  examSchema,
} from "@/_lib/models/exam-schema";
import { revalidatePath } from "next/cache";

export const upsertExam = async (data: ExamSchema) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  examSchema.parse(data);

  const result = await db.exam.upsert({
    where: { id: data.id ?? "" },
    update: { ...data, isClosed: false, userId: session.user?.id },
    create: { ...data, isClosed: false, userId: session.user?.id },
  });
  revalidatePath("/");
  revalidatePath("/exam-application");
  return JSON.parse(JSON.stringify(result));
};

export const upsertExamConfig = async (data: ExamConfigSchema) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const numericValue = parseFloat(data.price.replace(/\D/g, "")) / 100;

  examConfigSchema.parse(data);

  const result = await db.examValue.upsert({
    where: { id: data.id ?? "" },
    update: data,
    create: {
      name: data.name,
      price: numericValue,
    },
  });
  revalidatePath("/");
  revalidatePath("/exam-configurations");
  return JSON.parse(JSON.stringify(result));
};
