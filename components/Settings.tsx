
import React, { useState } from 'react';

interface SettingsProps {
  workflowName: string;
  setWorkflowName: (name: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ workflowName, setWorkflowName }) => {
  const [isPublic, setIsPublic] = useState(true);
  const [isStrict, setIsStrict] = useState(false);

  return (
    <div className="flex-1 p-8 overflow-auto bg-slate-50">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Workspace Settings</h1>
          <p className="text-slate-500">Configure project visibility and pipeline rules.</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">General Configuration</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-tight">Project Title</label>
              <input 
                type="text" 
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm font-medium"
              />
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-800">Public Visibility</p>
                  <p className="text-xs text-slate-400">Collaborators can view and suggest changes.</p>
                </div>
                <button 
                  onClick={() => setIsPublic(!isPublic)}
                  className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-colors ${isPublic ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isPublic ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div>
                  <p className="text-sm font-bold text-slate-800">Strict Step Enforcement</p>
                  <p className="text-xs text-slate-400">Require completion of previous steps before starting next ones.</p>
                </div>
                <button 
                  onClick={() => setIsStrict(!isStrict)}
                  className={`w-12 h-6 rounded-full relative flex items-center px-1 transition-colors ${isStrict ? 'bg-indigo-600' : 'bg-slate-300'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${isStrict ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-50 pb-4">Security & Persistence</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Automatic Backup</p>
                <p className="text-xs text-slate-400">Snapshot workspace state every 10 minutes.</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md">ACTIVE</span>
            </div>
          </div>

          <div className="bg-rose-50 p-8 rounded-2xl border border-rose-100 space-y-4">
            <h3 className="text-lg font-bold text-rose-800">Danger Zone</h3>
            <p className="text-sm text-rose-700">Permanent deletion of this workflow. This action is irreversible.</p>
            <button 
              onClick={() => alert("Deletion feature disabled for demo mode.")}
              className="bg-rose-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-rose-700 shadow-sm shadow-rose-200 transition-all active:scale-95"
            >
              Delete Project Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
