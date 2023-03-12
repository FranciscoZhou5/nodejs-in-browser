import * as DialogPrimitives from "@radix-ui/react-dialog";
import CodeEditor from "@uiw/react-textarea-code-editor";

import { useEditorContext } from "../../../../context/editor.context";

interface IDependenciesDialogProps {
  open: boolean;
  close(): void;
}

export default function DependenciesDialog({ open, close }: IDependenciesDialogProps) {
  const { dependencies, setDependencies } = useEditorContext();

  return (
    <div>
      <DialogPrimitives.Root open={open}>
        <DialogPrimitives.Portal>
          <DialogPrimitives.Overlay className="fixed inset-0 z-20 bg-black/50" />

          <DialogPrimitives.Content className="outline-none p-4 rounded-md max-w-[330px] md:max-w-[360px] lg:max-w-[400px] w-11/12 fixed z-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black">
            <DialogPrimitives.Title className="font-bold text-lg"> Dependencies </DialogPrimitives.Title>

            <DialogPrimitives.Description className="text-sm text-weak">
              Add module that you want to use in the editor here
            </DialogPrimitives.Description>

            <div className="mt-2">
              <CodeEditor
                value={dependencies}
                onChange={(event) => setDependencies(event.target.value)}
                language="json"
                className="text-sm bg-secundary font-monospace rounded"
              />
            </div>

            <div className="flex justify-end mt-4">
              <DialogPrimitives.Close onClick={close} className="text-sm bg-[#9448bc] font-bold rounded-md px-4 h-9">
                Save
              </DialogPrimitives.Close>
            </div>
          </DialogPrimitives.Content>
        </DialogPrimitives.Portal>
      </DialogPrimitives.Root>
    </div>
  );
}
