export interface User {
  id: string;
  username: string;
  email: string;
  // posts?: Post[]; Can be queried separately
  // comments?: Comment[]; Can be queried separately
  image: string;
}
