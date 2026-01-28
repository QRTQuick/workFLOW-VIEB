
import React from 'react';
import { WorkflowNode } from '../types';

interface DashboardProps {
  nodes: WorkflowNode[];
}

const Dashboard: React.FC<DashboardProps> = ({ nodes }) => {
  const stats = {
    total: nodes.length,
    completed: nodes.filter(n => n.status === 'completed').length,
    inProgress: nodes.filter(n => n.status === 'in-progress').length,
    blocked: nodes.filter(n => n.status === 'blocked').length,
  };

  const progress = Math.round((stats.completed / stats.total) * 100) || 0;

  return (
    <div className="flex-1 p-8 overflow-auto bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Project Overview</h1>
          <p className="text-slate-500">Real-time metrics for your current development cycle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Steps', value: stats.total, color: 'bg-indigo-500' },
            { label: 'Completed', value: stats.completed, color: 'bg-emerald-500' },
            { label: 'Active', value: stats.inProgress, color: 'bg-blue-500' },
            { label: 'Blocked', value: stats.blocked, color: 'bg-rose-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-slate-800">{stat.value}</span>
                <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Workflow Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-sm font-medium text-slate-600">Completion Rate</span>
                <span className="text-2xl font-bold text-indigo-600">{progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-400">
                {stats.completed} out of {stats.total} stages reached their definition of done.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Activity</h3>
            <div className="space-y-6">
              {[
                { user: 'JD', action: 'moved Core API to', target: 'In Progress', time: '2m ago' },
                { user: 'AS', action: 'completed', target: 'Auth Flow', time: '1h ago' },
                { user: 'MK', action: 'blocked', target: 'Legacy Migration', time: '3h ago' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
                    {activity.user}
                  </div>
                  <div>
                    <p className="text-sm text-slate-700">
                      <span className="font-bold">{activity.user}</span> {activity.action} <span className="font-medium italic">"{activity.target}"</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5 uppercase">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
