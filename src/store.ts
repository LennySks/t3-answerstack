import { create } from "zustand";
import { type Thread } from "./app/models/Thread";

type ThreadsState = {
  threads: Thread[];
  selectedThread: Thread | null;
  initializeThreads: (initialThreads: Thread[]) => void;
  // setSelectedThread: (threadId: number) => void;
};

export const useThreadsStore = create<ThreadsState>((set) => ({
  threads: [],
  selectedThread: null,
  initializeThreads: (initialThreads: Thread[]) =>
    set({ threads: initialThreads }),
  // setSelectedThread: (threadId: number) => set({ selectedThread: threadId }),
}));
