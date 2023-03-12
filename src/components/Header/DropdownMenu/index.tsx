import * as DropdownMenuPrimitives from "@radix-ui/react-dropdown-menu";
import { Cube } from "phosphor-react";
import { useState } from "react";
import DependenciesDialog from "./DependenciesDialog";

export default function DropdownMenu() {
  const [dependenciesDialogOpen, setDependenciesDialogOpen] = useState(false);

  function handleOpenDependenciesDialog() {
    setDependenciesDialogOpen(true);
  }

  function handleCloseDependenciesDialog() {
    setDependenciesDialogOpen(false);
  }

  return (
    <div className="">
      <DropdownMenuPrimitives.Root>
        <DropdownMenuPrimitives.Trigger asChild>
          <button className="text-weak text-xs md:text-sm hover:bg-primary duration-200 py-1 px-2 rounded-md outline-none radix-state-open:text-white radix-state-open:bg-primary">
            Enviroment
          </button>
        </DropdownMenuPrimitives.Trigger>

        <DropdownMenuPrimitives.Portal>
          <DropdownMenuPrimitives.Content align="start" sideOffset={5} className="text-sm text-weak bg-black py-1 min-w-[200px] rounded-md">
            <DropdownMenuPrimitives.Item
              onClick={handleOpenDependenciesDialog}
              className="outline-none cursor-default flex items-center gap-1 hover:bg-secundary hover:text-white py-1 pl-4"
            >
              <Cube size={18} />
              <span>Dependencies</span>
            </DropdownMenuPrimitives.Item>

            <DropdownMenuPrimitives.Arrow />
          </DropdownMenuPrimitives.Content>
        </DropdownMenuPrimitives.Portal>
      </DropdownMenuPrimitives.Root>

      <DependenciesDialog open={dependenciesDialogOpen} close={handleCloseDependenciesDialog} />
    </div>
  );
}
