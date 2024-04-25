import { useParams } from "next/navigation";
import { useMemo } from "react";

// for retrieve the converstionsId
export const useConversations = () => {
  const params = useParams();

  //get the current conversation id from the params
  const conversationsId = useMemo(
    () => params?.conversationsId,
    [params?.conversationsId]
  );

  //find the currently active conversitons id
  const isActive = useMemo(() => !!conversationsId, [conversationsId]);

  return {
    isActive,
    conversationsId,
  };
};
