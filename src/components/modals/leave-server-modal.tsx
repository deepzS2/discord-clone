"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

export function LeaveServerModal() {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "leaveServer";
  const onModalClose = () => onClose();

  const { server } = data;

  const { mutate: leaveServer, isLoading } = useMutation({
    mutationFn: async () => {
      await axios.patch(`/api/servers/${server?.id}/leave`);
    },
    onError: console.error,
    onSuccess: () => {
      onClose();
      router.refresh();
      router.push("/");
    },
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalClose}>
      <DialogContent className="overflow-hidden p-0 text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold text-center">
            Leave Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to leave{" "}
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="py-4 px-6 bg-gray-100">
          <div className="flex justify-between items-center w-full">
            <Button disabled={isLoading} onClick={onModalClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              variant="primary"
              onClick={leaveServer}
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
