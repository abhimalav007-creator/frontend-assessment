type ParameterSliderProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (val: number) => void;
};

export default function ParameterSlider({ label, min, max, step, value, onChange }: ParameterSliderProps) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1">{label}: {value}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
