import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db/root";
import { users } from "~/server/db/posts";

export async function createUserInDb() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const existingUser = await db.query.users.findFirst({
      where: (model, { eq }) => eq(model.id, user.id),
    });

    if (!existingUser) {
      await db.insert(users).values({
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? "",
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
}
