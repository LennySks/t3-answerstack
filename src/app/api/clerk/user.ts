import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function getUser() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    // Check if the user already exists in the database
    const existingUser = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, Number(user.id)),
    });

    if (!existingUser) {
      // If the user doesn't exist, insert them into the database
      await db.insert.users.create({
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 },
    );
  }

  // if user doesnt exist, create the user
  // if user exists continue
}
