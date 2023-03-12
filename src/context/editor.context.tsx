import { createContext, useContext, useState } from "react";

interface IEditorContextValues {
  dependencies: string;
  setDependencies: React.Dispatch<React.SetStateAction<string>>;
}

const EditorContext = createContext<IEditorContextValues>({} as IEditorContextValues);

interface IEditorContextProviderProps {
  children: React.ReactNode;
}

// prettier-ignore
const initialCode = [
  `{`,
  `  "chalk": "latest",`,
  `  "isomorphic-fetch": "latest"`,
  `}`
].join('\n')

export function EditorContextProvider({ children }: IEditorContextProviderProps) {
  const [dependencies, setDependencies] = useState(initialCode);

  const values: IEditorContextValues = {
    dependencies,
    setDependencies,
  };

  return <EditorContext.Provider value={values}>{children}</EditorContext.Provider>;
}

export function useEditorContext() {
  return useContext(EditorContext);
}
