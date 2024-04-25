"use client";
import Coversationfallback from "@/components/_shared/conversation/conversation-fallback";
import Itemslist from "@/components/_shared/items-list/items-list";
import React from "react";
import AddUserDialog from "./_components/add-user-dialog";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";
import Request from "./_components/request";

const Users = () => {
  const requests = useQuery(api.requests.get);

  return (
    <>
      <Itemslist title={"Users"} action={<AddUserDialog />}>
        {requests ? (
          requests.length === 0 ? (
            <p className="w-full h-full flex items-center justify-center">
              No Request Found
            </p>
          ) : (
            requests.map((request) => {
              return (
                <Request
                  key={request.request._id}
                  id={request.request._id}
                  username={request.sender.name}
                  email={request.sender.email}
                  imageUrl={request.sender.imageUrl}
                />
              );
            })
          )
        ) : (
          <Loader2 className="w-8 h-8 " />
        )}
      </Itemslist>
      <Coversationfallback />
    </>
  );
};

export default Users;
