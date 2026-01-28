
import React from 'react';

interface HeaderProps {
  workflowName: string;
  onSave: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ workflowName, onSave, onReset }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-sm font-bold text-slate-800">{workflowName}</h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] text-slate-400 font-medium">Synchronized locally</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onReset}
          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
        >
          Reset
        </button>
        <button 
          onClick={onSave}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-all active:scale-95"
        >
          Deploy Pipeline
        </button>
      </div>
    </header>
  );
};

export default Header;
