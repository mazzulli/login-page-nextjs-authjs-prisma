"use server";

import db from "@/_lib/db/db";
import { userSchema, UserSchema } from "@/_lib/models/user-schema";
import { revalidatePath } from "next/cache";

export const upsertUser = async (data: UserSchema) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  userSchema.parse(data);

  if (!data.id) {
    //verify if there is a email with the same email received
    const existingUser = await db.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("Email already registered.");
    }
  }

  // Convert array to comma-separated string
  const accessTypeString = data.accessType.join(", ");

  await db.user.upsert({
    where: { id: data.id ?? "" },
    update: {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.secret,
      accessType: accessTypeString,
      isActive: data.isActive,
    },
    create: {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.secret,
      accessType: accessTypeString,
      isActive: data.isActive,
    },
  });

  revalidatePath("/users");
};
