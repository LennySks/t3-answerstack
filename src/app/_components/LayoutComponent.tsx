import { TopNav } from "~/app/_components/topnav";
import { Sidebar } from "~/app/_components/Sidebar";
import SidebarThreads from "~/app/_components/SidebarThreads";
import { Toaster } from "sonner";
import { api } from "~/trpc/server";
import { Visibility } from "~/app/models/Visibility";
import { useThreadsStore } from "~/store";

export async function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const threads = (await api.threads.getThreads()).map((thread) => ({
    ...thread,
    visibility: thread.visibility as Visibility, // Explicitly cast here
  }));

  return (
    <>
      <TopNav />
      <div className="flex flex-grow">
        <aside className="w-64 flex-shrink-0 border-r border-border p-4">
          <Sidebar>
            <SidebarThreads threads={threads} />
          </Sidebar>
        </aside>
        <main className="flex-grow p-4">{children}</main>
        <Toaster richColors />
      </div>
    </>
  );
}
