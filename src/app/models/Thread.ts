export interface Thread {
  id: number;
  name: string;
  description: string;
  image?: string;
  banner?: string;
  createdAt: Date;
  createdBy?: string;
}
