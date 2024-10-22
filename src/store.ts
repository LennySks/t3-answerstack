import { create } from "zustand";
import { type Thread } from "./app/models/Thread";
import { api } from "./trpc/server";

type ThreadsState = {
  threads: Thread[];
  setThreads: () => Promise<void>;
};

export const useThreadsStore = create<ThreadsState>((set) => ({
  threads: [],
  setThreads: async () => {
    const response = (await api.threads.getThreads()) as Thread[];
    set({ threads: response });
  },
}));
