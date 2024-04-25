import { useQuery } from "convex/react";
import { MessageSquare, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { api } from "../convex/_generated/api";

export const useNavigations = () => {
  const pathname = usePathname();

  const requestsCount = useQuery(api.requests.count);
  const path = useMemo(
    () => [
      {
        name: "Conversations",
        href: "/conversations",
        icon: <MessageSquare />,
        active: pathname.startsWith("/conversations"),
      },
      {
        name: "Users",
        href: "/users",
        icon: <Users />,
        active: pathname.startsWith("/users"),
        count: requestsCount,
      },
    ],
    [pathname, requestsCount]
  );

  return path;
};
