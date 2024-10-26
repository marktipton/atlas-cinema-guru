"use client";

import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="flex items-center justify-center h-screen">
        {`Hello ${session.user?.name}`}
      </div>
    );
  }
  return <div>Hello Cinema Guru, please sign in</div>
}
