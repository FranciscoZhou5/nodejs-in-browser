import { createPortal } from "react-dom";
import Editor from "./components/Editor";
import Header from "./components/Header";
import MobileAlert from "./components/MobileAlert";

export default function App() {
  return (
    <>
      <Header />

      {createPortal(<MobileAlert />, document.body)}

      <main>
        <Editor />
      </main>
    </>
  );
}
