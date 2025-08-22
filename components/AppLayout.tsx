"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import ModelSelector from "./ModelSelector";
import ChatBubble from "./ChatBubble";
import ParametersPanel from "./ParametersPanel";
import PromptEditor from "./PromptEditor";
import Button from "./Button";

export default function AppLayout() {
  const [models, setModels] = useState<{id:string,name:string}[]>([]);
  const [templates, setTemplates] = useState<{id:number,name:string,prompt:string}[]>([]);
  const [model, setModel] = useState("gpt-3.5");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(256);
  const [messages, setMessages] = useState<{role:"user"|"assistant", text:string}[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [errorModels, setErrorModels] = useState<string|null>(null);
  const [errorTemplates, setErrorTemplates] = useState<string|null>(null);

  const params = useMemo(()=>({model,temperature,maxTokens}), [model,temperature,maxTokens]);

  // Fetch models
  useEffect(()=>{
    async function fetchModels(){
      try{
        const res = await fetch("/api/models");
        if(!res.ok) throw new Error("Failed to fetch models");
        const data = await res.json();
        setModels(data);
        setModel(data[0]?.id || "");
      } catch(err:any){ setErrorModels(err.message) }
      finally{ setLoadingModels(false) }
    }
    fetchModels();
  },[]);

  // Fetch templates
  useEffect(()=>{
    async function fetchTemplates(){
      try{
        const res = await fetch("/api/templates");
        if(!res.ok) throw new Error("Failed to fetch templates");
        const data = await res.json();
        setTemplates(data);
      } catch(err:any){ setErrorTemplates(err.message) }
      finally{ setLoadingTemplates(false) }
    }
    fetchTemplates();
  },[]);

  const onSend = (prompt:string)=>{
    if(!prompt.trim()) return;
    const fakeResponse = `Response from ${params.model} (temp ${params.temperature}, max ${params.maxTokens})\n\nDummy AI response for: "${prompt}"`;
    setMessages(m=>[...m,{role:"user",text:prompt},{role:"assistant",text:fakeResponse}]);
  }

  const copyJSON = ()=>{
    navigator.clipboard.writeText(JSON.stringify({params,messages},null,2));
    alert("Copied session JSON to clipboard");
  }

  const downloadJSON = ()=>{
    const blob = new Blob([JSON.stringify({params,messages},null,2)],{type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "session.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 flex flex-col gap-4">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">AI Interface Prototype</h1>
        <div className="flex gap-3 items-center">
          {loadingModels ? <p className="text-sm text-gray-500">Loading models...</p> :
            errorModels ? <p className="text-sm text-red-500">{errorModels}</p> :
            <ModelSelector value={model} onChange={setModel} options={models}/>
          }
          <ThemeToggle />
        </div>
      </header>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1">
        {/* Parameters Sidebar */}
        <aside className="md:col-span-1 p-4 border rounded-2xl dark:border-gray-700 flex flex-col gap-4">
          <h2 className="font-semibold mb-2">Parameters</h2>
          <ParametersPanel temperature={temperature} maxTokens={maxTokens} onChangeTemperature={setTemperature} onChangeMaxTokens={setMaxTokens}/>
          <div className="flex gap-2">
            <Button onClick={copyJSON}>Copy JSON</Button>
            <Button onClick={downloadJSON} className="bg-gray-700 hover:bg-gray-800">Download JSON</Button>
          </div>
        </aside>

        {/* Chat + Prompt Editor */}
        <main className="md:col-span-3 flex flex-col border rounded-2xl dark:border-gray-700 p-4">
          {loadingTemplates ? <p>Loading templates...</p> :
            errorTemplates ? <p className="text-red-500">{errorTemplates}</p> :
            <PromptEditor onSend={onSend} templates={templates}/>
          }
          <section className="flex-1 overflow-y-auto mt-4 flex flex-col gap-2">
            {messages.length===0 && <p className="text-sm text-gray-500 dark:text-gray-400">Your conversation will appear here…</p>}
            {messages.map((m,i)=>
              <motion.div key={i} initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.3}}>
                <ChatBubble role={m.role} text={m.text}/>
              </motion.div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
