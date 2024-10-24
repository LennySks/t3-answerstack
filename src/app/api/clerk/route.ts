import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const username = user.username ?? "";
    const email = user.emailAddresses[0]?.emailAddress ?? "";
    const existingUser = await api.users.getUserById({ id: user.id });

    if (!existingUser) {
      await api.users.createUser({
        id: user.id,
        username: username,
        email: email,
      });

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error("Error saving user data:", error);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 },
    );
  }
}
