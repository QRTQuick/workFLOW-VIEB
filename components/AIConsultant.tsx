
import React, { useState } from 'react';
import { generateWorkflowSuggestion, analyzeWorkflow } from '../services/gemini';
import { WorkflowNode } from '../types';

interface AIConsultantProps {
  currentNodes: WorkflowNode[];
  onApplyWorkflow: (nodes: WorkflowNode[]) => void;
}

const AIConsultant: React.FC<AIConsultantProps> = ({ currentNodes, onApplyWorkflow }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [suggestedNodes, setSuggestedNodes] = useState<WorkflowNode[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const result = await generateWorkflowSuggestion(prompt);
      setAiAnalysis(result.suggestion);
      setSuggestedNodes(result.nodes);
    } catch (error) {
      setAiAnalysis("Failed to generate workflow. Check API key.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeWorkflow(currentNodes);
      setAiAnalysis(result);
      setSuggestedNodes([]);
    } catch (error) {
      setAiAnalysis("Analysis failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-xl z-10">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="animate-pulse">✨</span> AI Strategist
        </h2>
        <p className="text-xs text-slate-500 mt-1">Generate or optimize your dev flows.</p>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">Project Description</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Build a React app with automated testing and Vercel deployment..."
            className="w-full h-32 p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
          />
          <button 
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isLoading ? 'Thinking...' : 'Generate Workflow'}
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button 
            onClick={handleAnalyze}
            disabled={isLoading || currentNodes.length === 0}
            className="w-full border border-indigo-200 text-indigo-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-50 transition-colors"
          >
            Analyze Current Flow
          </button>
        </div>

        {aiAnalysis && (
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-800 mb-2 uppercase">AI Insights</h4>
            <div className="text-xs text-indigo-900 leading-relaxed whitespace-pre-wrap">
              {aiAnalysis}
            </div>
            {suggestedNodes.length > 0 && (
              <button 
                onClick={() => onApplyWorkflow(suggestedNodes)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-indigo-700 shadow-md"
              >
                Apply AI Suggestions
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIConsultant;
