
import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: {name: string, email: string, avatar: string} | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'workflows', label: 'Workflows', icon: '📐' },
    { id: 'templates', label: 'Templates', icon: '📄' },
    { id: 'team', label: 'Team', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-sm">WV</div>
          workFLOW VIEB
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white ring-2 ring-indigo-900/50">
            {user?.avatar || '??'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-[10px] text-slate-500 truncate uppercase tracking-tight">Pro Account</p>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full py-2 text-xs font-bold text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
