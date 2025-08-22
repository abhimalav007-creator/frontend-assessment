"use client";

import { useState, useEffect } from "react";

interface Params {
  temperature: number;
  maxTokens: number;
  topP: number;
}

export default function ParametersPanel() {
  const [params, setParams] = useState<Params>({
    temperature: 0.7,
    maxTokens: 512,
    topP: 1,
  });

  // Load params from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("params");
    if (saved) {
      setParams(JSON.parse(saved));
    }
  }, []);

  // Save params whenever they change
  useEffect(() => {
    localStorage.setItem("params", JSON.stringify(params));
  }, [params]);

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Parameters
      </h2>

      {/* Temperature */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Temperature: {params.temperature}
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={params.temperature}
          onChange={(e) =>
            setParams({ ...params, temperature: parseFloat(e.target.value) })
          }
          className="w-full accent-blue-500"
        />
      </div>

      {/* Max Tokens */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Max Tokens: {params.maxTokens}
        </label>
        <input
          type="range"
          min={50}
          max={2000}
          step={50}
          value={params.maxTokens}
          onChange={(e) =>
            setParams({ ...params, maxTokens: parseInt(e.target.value) })
          }
          className="w-full accent-green-500"
        />
      </div>

      {/* Top P */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Top P: {params.topP}
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          value={params.topP}
          onChange={(e) =>
            setParams({ ...params, topP: parseFloat(e.target.value) })
          }
          className="w-full accent-purple-500"
        />
      </div>
    </div>
  );
}
