import { useMemo, useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import ModelSelector from '@/components/ModelSelector';
import ChatBubble from '@/components/ChatBubble';
import ParameterSlider from '@/components/ParameterSlider';
import PromptEditor from '@/components/PromptEditor';
import Button from '@/components/Button';

export default function Home() {
  const [model, setModel] = useState('gpt-3.5');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(256);
  const [messages, setMessages] = useState<{role:'user'|'assistant'; text:string}[]>([]);

  const params = useMemo(() => ({ model, temperature, maxTokens }), [model, temperature, maxTokens]);

  const onSend = (prompt: string) => {
    if (!prompt.trim()) return;
    const fakeResponse = `Response from ${params.model} (temp ${params.temperature}, max ${params.maxTokens})\n\nThis is a dummy AI response for:\n"${prompt}"`;
    setMessages(m => [...m, { role:'user', text: prompt }, { role:'assistant', text: fakeResponse }]);
  };

  const copyJSON = () => {
    const data = { params, messages };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert('Copied session JSON to clipboard');
  };

  const downloadJSON = () => {
    const data = { params, messages };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "session.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <h1 className="text-2xl font-bold">AI Interface Prototype</h1>
        <div className="flex gap-3 items-center">
          <ModelSelector value={model} onChange={setModel} />
          <ThemeToggle />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="md:col-span-1 p-4 border rounded-2xl dark:border-gray-700">
          <h2 className="font-semibold mb-2">Parameters</h2>
          <ParameterSlider label="Temperature" min={0} max={1} step={0.1} value={temperature} onChange={setTemperature} />
          <ParameterSlider label="Max Tokens" min={50} max={1000} step={25} value={maxTokens} onChange={setMaxTokens} />
          <div className="mt-4 flex gap-2">
            <Button onClick={copyJSON}>Copy JSON</Button>
            <Button onClick={downloadJSON} className="bg-gray-700">Download JSON</Button>
          </div>
        </aside>

        <main className="md:col-span-3 flex flex-col border rounded-2xl dark:border-gray-700 p-4">
          <section className="mb-4">
            <PromptEditor onSend={onSend} />
          </section>
          <section className="flex-1 overflow-y-auto flex flex-col gap-2">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500">Your conversation will appear here…</p>
            )}
            {messages.map((m,i) => <ChatBubble key={i} role={m.role} text={m.text} />)}
          </section>
        </main>
      </div>
    </div>
  );
}
