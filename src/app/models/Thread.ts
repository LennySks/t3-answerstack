import { Visibility } from "~/app/models/Visibility";

export interface Thread {
  id: number;
  name: string;
  description: string;
  image?: string | null;
  banner?: string | null;
  createdAt?: Date;
  createdBy?: string | null;
  visibility: Visibility;
}
