"use client";

import Link from "next/link";
import { Home, TrendingUp, Star, Plus } from "lucide-react";
import NewThreadModal from "./modals/NewThreadModal";

export function Sidebar() {
  return (
    <div className="rounded-lg bg-background">
      <nav className="space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-2 rounded p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Home size={24} />
          <span>Home</span>
        </Link>
        <Link
          href="/popular"
          className="flex items-center space-x-2 rounded p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <TrendingUp size={24} />
          <span>Popular</span>
        </Link>
        <Link
          href="/favorites"
          className="flex items-center space-x-2 rounded p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Star size={24} />
          <span>Favorites</span>
        </Link>
      </nav>
      <hr className="my-4 border-border" />
      <h2 className="mb-4 text-lg font-semibold">Threads</h2>
      <nav className="space-y-2">
        <div
          className="flex cursor-pointer items-center space-x-2 rounded p-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          onClick={() => {
            const modal = document.getElementById("my_modal_3");
            if (modal) {
              (modal as HTMLDialogElement).showModal();
            }
          }}
        >
          <Plus size={24} />
          <span>Create a thread</span>
        </div>
        <NewThreadModal />
      </nav>
    </div>
  );
}
