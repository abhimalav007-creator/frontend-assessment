"use client";

import { useEffect, useState } from "react";

interface Model {
  id: string;
  name: string;
}

export default function ModelSelector() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch("/api/models");
        if (!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();
        setModels(data);
        setSelected(data[0]?.id || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading models...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="model" className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Select Model
      </label>
      <select
        id="model"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="rounded-lg border p-2 bg-white dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        aria-label="Model Selector"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
