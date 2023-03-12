import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ANSIToHTML from "ansi-to-html";
import { Spinner, Lightning } from "phosphor-react";

import { getWebContainerInstance } from "../../lib/web-container";
import { useEditorContext } from "../../context/editor.context";

// prettier-ignore
const initialCode = [
  "// You need to declare what modules you want use.",
  "// Click in 'Enviroment' > 'Dependencies'",
  "",
  "import chalk from 'chalk';",
  "import 'isomorphic-fetch';",
  "",
  `fetch("https://jsonplaceholder.typicode.com/users/1")`,
  "  .then(response => response.json())",
  "  .then(data => console.log(data))",
  "",
  `console.log(chalk.magenta("Hello, world!"))`,
  "",
  `// This is running Node.JS natively on Browser!`,
  `// Click "Run Code" below and test`,
].join("\n");

const ANSIConverter = new ANSIToHTML();

export default function Editor() {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const { dependencies } = useEditorContext();

  async function handleEvaluteCode() {
    setIsRunning(true);

    const webContainer = await getWebContainerInstance();

    await webContainer.mount({
      "index.js": {
        file: {
          contents: code,
        },
      },
      "package.json": {
        file: {
          contents: `
            {
              "name": "example-app",
              "type": "module",
              "dependencies": ${dependencies.replaceAll("\n", "").replaceAll(" ", "")},
              "scripts": {
                "start": "node index.js"
              }
            }
          `.trim(),
        },
      },
    });

    const install = await webContainer.spawn("pnpm", ["i"], {
      // output: false,
    });

    setOutput(["🔥 Installing dependencies!"]);

    install.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
        },
      })
    );

    await install.exit;

    setOutput((state) => [...state, "---------", "🚀 Running the application!"]);

    const start = await webContainer.spawn("pnpm", ["start"]);

    start.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((state) => [...state, ANSIConverter.toHtml(data)]);
        },
      })
    );

    setIsRunning(false);
  }

  function handleClearOutput() {
    setOutput([]);
  }

  return (
    <div className="p-4 max-w-[1000px] mx-auto">
      <CodeEditor
        spellCheck={false}
        value={code}
        placeholder="Please enter JS code."
        onChange={(event) => setCode(event.target.value)}
        language="js"
        minHeight={80}
        padding={20}
        className="text-sm bg-secundary font-monospace rounded"
      />

      <div className="bg-black p-4 rounded-md mt-4 min-h-[64px] relative flex items-center">
        {output.length > 0 ? (
          <div className="font-monospace px-1 text-sm max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#21202e] scrollbar-track-[#171620]">
            {output.map((line) => (
              <p key={Math.random()} dangerouslySetInnerHTML={{ __html: line }}></p>
            ))}
          </div>
        ) : (
          <span className="text-weak text-sm lg:ml-4"> Click on run to evalute the code. </span>
        )}

        <div className="absolute right-2 top-4 md:right-4 lg:right-8 flex md:gap-1 lg:gap-2">
          <button
            onClick={handleClearOutput}
            className="text-sm text-red-600 duration-200 hover:bg-red-600 hover:text-white px-2 rounded-md"
          >
            Clear
          </button>

          {isRunning ? (
            <button className="bg-[#9448bc] font-bold text-sm rounded-md px-2 h-9 flex items-center gap-1">
              <Spinner weight="bold" color="#FFF" size={14} className="animate-spin" /> Stop running
            </button>
          ) : (
            <button onClick={handleEvaluteCode} className="bg-[#9448bc] font-bold text-sm rounded-md px-2 h-9 flex items-center gap-1">
              <Lightning weight="bold" color="#FFF" size={14} />
              Run code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
