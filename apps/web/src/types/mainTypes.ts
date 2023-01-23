import { ClientSafeProvider } from "next-auth/react";

export type ProvidersType = Record<string, ClientSafeProvider>;

export type UserType = {
  email: string;
  id: string;
  image?: string;
  name: string;
};
