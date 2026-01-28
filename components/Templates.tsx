
import React from 'react';
import { WorkflowTemplate, WorkflowNode } from '../types';

interface TemplatesProps {
  onApply: (nodes: WorkflowNode[], name: string) => void;
}

const TEMPLATES: WorkflowTemplate[] = [
  {
    id: 't1',
    name: 'SaaS MVP Kickstart',
    description: 'Perfect for fast-moving startups building a web-based product.',
    nodes: [
      { id: '1', title: 'Market Research', description: 'Validate idea with users.', type: 'planning', status: 'completed' },
      { id: '2', title: 'UX Wireframing', description: 'Design core user journeys.', type: 'planning', status: 'todo' },
      { id: '3', title: 'Backend Setup', description: 'Express.js & MongoDB init.', type: 'development', status: 'todo' },
      { id: '4', title: 'Staging Deploy', description: 'Setup CI/CD pipeline.', type: 'deployment', status: 'todo' },
    ]
  },
  {
    id: 't2',
    name: 'Mobile App Lifecycle',
    description: 'Dedicated flow for iOS and Android native development.',
    nodes: [
      { id: 'm1', title: 'Asset Preparation', description: 'Icons, splash screens, assets.', type: 'planning', status: 'todo' },
      { id: 'm2', title: 'React Native Dev', description: 'Component development.', type: 'development', status: 'todo' },
      { id: 'm3', title: 'TestFlight Beta', description: 'External tester feedback.', type: 'testing', status: 'todo' },
      { id: 'm4', title: 'App Store Submission', description: 'Meta data and review.', type: 'deployment', status: 'todo' },
    ]
  },
  {
    id: 't3',
    name: 'Library/SDK Release',
    description: 'Workflow focused on documentation, versioning, and NPM publishing.',
    nodes: [
      { id: 's1', title: 'API Specification', description: 'Define public interface.', type: 'planning', status: 'todo' },
      { id: 's2', title: 'Main Logic', description: 'Core library features.', type: 'development', status: 'todo' },
      { id: 's3', title: 'Documentation', description: 'Auto-generate TS docs.', type: 'review', status: 'todo' },
      { id: 's4', title: 'Semantic Versioning', description: 'Release to registry.', type: 'deployment', status: 'todo' },
    ]
  }
];

const Templates: React.FC<TemplatesProps> = ({ onApply }) => {
  return (
    <div className="flex-1 p-8 overflow-auto bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Workflow Templates</h1>
          <p className="text-slate-500">Accelerate your setup with battle-tested software flows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full group transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {tpl.id === 't1' ? '🚀' : tpl.id === 't2' ? '📱' : '📦'}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{tpl.name}</h3>
              <p className="text-sm text-slate-500 mb-8 flex-1 leading-relaxed">
                {tpl.description}
              </p>
              <div className="space-y-4">
                <div className="flex -space-x-1">
                  {['P', 'D', 'T', 'D'].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 text-[8px] flex items-center justify-center font-bold text-slate-400">
                      {c}
                    </div>
                  ))}
                  <span className="text-[10px] text-slate-400 self-center ml-2">{tpl.nodes.length} Steps</span>
                </div>
                <button 
                  onClick={() => onApply(tpl.nodes, tpl.name)}
                  className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-indigo-600 transition-colors"
                >
                  Use This Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
