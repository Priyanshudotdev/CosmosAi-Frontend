import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import axios from "axios";
import { BACKEND_URL } from '../config';

export function Home() {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000000] via-[#140107]  to-[#2c0110] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Wand2 className="w-12 h-12 text-[#C21E56]" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">
            CosmosAI
          </h1>
          <p className="text-lg text-gray-300">
            Turn your dreams into websites.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-none backdrop-blur-xl bg-[#00000049] rounded-lg shadow-lg p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="w-full h-32 p-4 bg-transparent text-gray-100 border border-[#ffffff4f] rounded-lg focus:border-transparent resize-none placeholder-gray-500"
            />
            <button
              type="submit"
              className="w-full mt-4 bg-[#C21E56] text-gray-100 py-3 px-6 rounded-lg font-medium hover:opacity-[.8] transition-colors"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}