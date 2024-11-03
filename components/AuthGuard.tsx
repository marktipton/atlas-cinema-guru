"use client";

import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const AuthGuard: React.FC<Props> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return <div>Hello Cinema Guru, please sign in</div>;

  return <>{children}</>;
};

export default AuthGuard;