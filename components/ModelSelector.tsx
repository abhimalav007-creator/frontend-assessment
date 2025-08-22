interface Model {
  id: string;
  name: string;
}

interface ModelSelectorProps {
  value: string;
  onChange: (val: string) => void;
  options: Model[]; // <- add this
}

export default function ModelSelector({ value, onChange, options }: ModelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="model" className="text-sm font-medium text-gray-700 dark:text-gray-200">
        Select Model
      </label>
      <select
        id="model"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border p-2 bg-white dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
        aria-label="Model Selector"
      >
        {options.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
