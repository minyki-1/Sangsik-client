import { DefaultSession } from "node_modules/next-auth/core/types";

export type SessionUser =
  | ({
      id?: string | null;
    } & DefaultSession["user"])
  | null
  | undefined;
