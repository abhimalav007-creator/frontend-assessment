  "use client";

  import { useState, useEffect } from "react";

  interface Template {
    id: number;
    name: string;
    prompt: string;
  }

  export default function PromptEditor() {
    const [prompt, setPrompt] = useState("");
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selected, setSelected] = useState<number | null>(null);

    // Load saved templates from localStorage
    useEffect(() => {
      const saved = localStorage.getItem("templates");
      if (saved) {
        setTemplates(JSON.parse(saved));
      }
    }, []);

    // Save templates whenever they change
    useEffect(() => {
      localStorage.setItem("templates", JSON.stringify(templates));
    }, [templates]);

    const saveTemplate = () => {
      if (!prompt.trim()) return;
      const newTemplate: Template = {
        id: Date.now(),
        name: `Template ${templates.length + 1}`,
        prompt,
      };
      setTemplates([...templates, newTemplate]);
      setPrompt("");
    };

    const loadTemplate = (id: number) => {
      const t = templates.find((tpl) => tpl.id === id);
      if (t) {
        setPrompt(t.prompt);
        setSelected(id);
      }
    };

    const deleteTemplate = (id: number) => {
      setTemplates(templates.filter((tpl) => tpl.id !== id));
      if (selected === id) {
        setPrompt("");
        setSelected(null);
      }
    };

    return (
      <div className="flex flex-col gap-4">
        <label htmlFor="prompt" className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Enter Prompt
        </label>
        <textarea
          id="prompt"
          rows={5}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full rounded-lg border p-2 bg-white dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          placeholder="Type your AI prompt here..."
        />

        <div className="flex gap-2">
          <button
            onClick={saveTemplate}
            className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Save Template
          </button>
        </div>

        {templates.length > 0 && (
          <div className="mt-2">
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Saved Templates</h3>
            <ul className="flex flex-col gap-2">
              {templates.map((tpl) => (
                <li
                  key={tpl.id}
                  className={`p-2 rounded-lg border flex justify-between items-center ${
                    selected === tpl.id ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-50 dark:bg-gray-700"
                  }`}
                >
                  <span>{tpl.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadTemplate(tpl.id)}
                      className="text-sm px-2 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteTemplate(tpl.id)}
                      className="text-sm px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
