"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { UserPlus2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutationState } from "../../../../../hooks/useMutationState";
import { api } from "../../../../../convex/_generated/api";
import { ConvexError } from "convex/values";
import { useToast } from "@/components/ui/use-toast";

const addUserFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field can't be empty" })
    .email("Please Enter a valid email"),
});

function AddUserDialog() {
  const { toast } = useToast();

  const { mutate: createRequest, pending } = useMutationState(
    api.request.create
  );
  const form = useForm<z.infer<typeof addUserFormSchema>>({
    resolver: zodResolver(addUserFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = async (values: z.infer<typeof addUserFormSchema>) => {
    try {
      await createRequest({ email: values.email });
      form.reset();
      toast({ description: "Request Sent Successfully" });
    } catch (error) {
      toast({
        variant: "destructive",
        description:
          error instanceof ConvexError
            ? error.data
            : "Unexpected error occured",
      });
    }
  };
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" variant="outline">
              <DialogTrigger>
                <UserPlus2 />
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Send Request to connect with User or Friend
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" variant={"outline"} disabled={pending}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUserDialog;
