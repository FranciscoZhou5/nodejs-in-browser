import { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ANSIToHTML from "ansi-to-html";
import { getWebContainerInstance } from "../../lib/web-container";

const initialCode = [
  "import chalk from 'chalk';",
  "",
  "function sum(a, b) {",
  "  return a + b",
  "}",
  "",
  `console.log(chalk.green(sum(1, 2)))`,
].join("\n");

const ANSIConverter = new ANSIToHTML();

export default function Editor() {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState([]);

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
              "dependencies": {
                "chalk": "latest"
              },
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
          // console.log(data);
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

      <div className="bg-[#0e0d13] p-4 rounded-md mt-4 min-h-[64px] relative flex items-center">
        {output.length > 0 ? (
          <div className="font-monospace text-sm ">
            {output.map((line) => (
              <p key={line} dangerouslySetInnerHTML={{ __html: line }}></p>
            ))}
          </div>
        ) : (
          <span className="text-weak text-sm"> Click on run to evalute the code. </span>
        )}

        <div className="absolute right-4">
          <button onClick={handleEvaluteCode} className="bg-[#9448bc] font-bold text-sm rounded-md px-2 h-9">
            Run code
          </button>
        </div>
      </div>
    </div>
  );
}
