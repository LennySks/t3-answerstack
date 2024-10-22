import { Visibility } from "~/app/models/Visibility";

export interface CreateThread {
  name: string;
  description: string;
  image?: string;
  banner?: string;
  visibility: Visibility;
}
