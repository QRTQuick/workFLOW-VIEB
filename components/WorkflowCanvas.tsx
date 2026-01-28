
import React from 'react';
import { WorkflowNode, WorkflowStatus } from '../types';

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  onStatusChange: (id: string, status: WorkflowStatus) => void;
  onAddNode: () => void;
}

const typeStyles: Record<string, string> = {
  planning: 'bg-amber-100 text-amber-700 border-amber-200',
  development: 'bg-blue-100 text-blue-700 border-blue-200',
  testing: 'bg-purple-100 text-purple-700 border-purple-200',
  review: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  deployment: 'bg-rose-100 text-rose-700 border-rose-200',
};

const statusStyles: Record<WorkflowStatus, string> = {
  todo: 'bg-slate-100 border-slate-200',
  'in-progress': 'border-indigo-500 ring-2 ring-indigo-100',
  completed: 'bg-emerald-50 border-emerald-200 opacity-75',
  blocked: 'bg-rose-50 border-rose-300',
};

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({ nodes, onStatusChange, onAddNode }) => {
  return (
    <div className="flex-1 overflow-auto workflow-grid relative p-12 flex flex-col gap-8">
      <div className="flex flex-wrap gap-8 justify-center">
        {nodes.map((node, index) => (
          <div key={node.id} className="flex items-center group">
            <div 
              className={`w-72 bg-white rounded-xl shadow-sm border p-5 transition-all hover:shadow-md ${statusStyles[node.status]}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${typeStyles[node.type]}`}>
                  {node.type}
                </span>
                <select 
                  value={node.status}
                  onChange={(e) => onStatusChange(node.id, e.target.value as WorkflowStatus)}
                  className="text-xs bg-transparent border-none focus:ring-0 text-slate-400 cursor-pointer hover:text-indigo-600"
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{node.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {node.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 border border-white text-[10px] flex items-center justify-center">👤</div>
                </div>
                {node.status === 'completed' && <span className="text-emerald-500 text-xs font-bold">✓ Done</span>}
              </div>
            </div>
            
            {index < nodes.length - 1 && (
              <div className="hidden lg:flex flex-col items-center justify-center mx-4">
                <div className="w-8 h-px bg-slate-200 relative">
                  <div className="absolute right-0 -top-1 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-slate-300"></div>
                </div>
              </div>
            )}
          </div>
        ))}

        <button 
          onClick={onAddNode}
          className="w-72 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-8 text-slate-400 hover:border-indigo-300 hover:text-indigo-400 hover:bg-white transition-all group"
        >
          <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">+</span>
          <span className="text-sm font-medium">Add Step</span>
        </button>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
