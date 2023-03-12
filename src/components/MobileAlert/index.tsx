import { useEffect, useMemo, useState } from "react";

import * as AlertDialogPrimitives from "@radix-ui/react-alert-dialog";

export default function MobileAlert() {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }, []);

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsOpen(true);
    }
  }, []);

  return (
    <AlertDialogPrimitives.Root open={isOpen}>
      <AlertDialogPrimitives.Portal>
        <AlertDialogPrimitives.Overlay forceMount className="fixed inset-0 z-20 bg-black/50" />

        <AlertDialogPrimitives.Content className="fixed bg-secundary p-3 rounded-md max-w-[310px] w-full z-50 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <AlertDialogPrimitives.Title className="font-bold text-xl"> Dispositivo móvel detectado </AlertDialogPrimitives.Title>

          <AlertDialogPrimitives.Description className="text-sm text-weak">
            Para obter uma melhor experiência, use um computador.
          </AlertDialogPrimitives.Description>

          <div className="flex justify-end">
            <AlertDialogPrimitives.Cancel
              className="bg-primary min-w-[48px] text-sm text-weak h-8 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Ok
            </AlertDialogPrimitives.Cancel>
          </div>
          {/* <AlertDialogPrimitives.Title />
          <AlertDialogPrimitives.Description />
          <AlertDialogPrimitives.Cancel />
          <AlertDialogPrimitives.Action /> */}
        </AlertDialogPrimitives.Content>
      </AlertDialogPrimitives.Portal>
    </AlertDialogPrimitives.Root>
  );
}
