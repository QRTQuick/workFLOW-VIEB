import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WorkflowCanvas from './components/WorkflowCanvas';
import AIConsultant from './components/AIConsultant';
import Dashboard from './components/Dashboard';
import Templates from './components/Templates';
import Team from './components/Team';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import Documentation from './components/Documentation';
import { WorkflowNode, WorkflowStatus, TeamMember } from './types';

const INITIAL_NODES: WorkflowNode[] = [
  {
    id: '1',
    title: 'Requirement Analysis',
    description: 'Gather user stories and technical requirements for the MVP.',
    type: 'planning',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Core API Development',
    description: 'Design and implement the primary REST/GraphQL endpoints.',
    type: 'development',
    status: 'in-progress',
  },
  {
    id: '3',
    title: 'Unit Testing',
    description: 'Achieve 80% code coverage on core logic modules.',
    type: 'testing',
    status: 'todo',
  },
];

const MOCK_TEAM: TeamMember[] = [
  { id: '1', name: 'John Developer', role: 'Lead', avatar: 'JD', status: 'online' },
  { id: '2', name: 'Sarah Architect', role: 'Maintainer', avatar: 'SA', status: 'busy' },
];

type AppView = 'landing' | 'documentation' | 'app';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<{name: string, email: string, avatar: string} | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [nodes, setNodes] = useState<WorkflowNode[]>(INITIAL_NODES);
  const [workflowName, setWorkflowName] = useState('Global Operations API');
  const [team, setTeam] = useState<TeamMember[]>(MOCK_TEAM);

  // Effect to load user from local storage on initial mount
  useEffect(() => {
    const cachedUser = localStorage.getItem('currentUser');
    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setUser(parsedUser);
        setView('app'); // Set view to app if user is cached
      } catch (e) {
        console.error('Failed to parse cached user data', e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLogin = (userData?: { name: string; email: string; avatar: string }) => {
    const userToSet = userData || {
      name: "Alex Rivera",
      email: "alex.rivera@dev.flow",
      avatar: "AR"
    };
    setUser(userToSet);
    setView('app');
    localStorage.setItem('currentUser', JSON.stringify(userToSet)); // Cache user data
  };

  const handleLogout = () => {
    setView('landing');
    setUser(null);
    setActiveTab('dashboard');
    localStorage.removeItem('currentUser'); // Clear cached user data
  };

  const handleStatusChange = (id: string, status: WorkflowStatus) => {
    setNodes(prev => prev.map(node => node.id === id ? { ...node, status } : node));
  };

  const handleAddNode = () => {
    const newNode: WorkflowNode = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Workflow Step',
      description: 'Define the objectives and technical requirements for this step.',
      type: 'development',
      status: 'todo',
    };
    setNodes(prev => [...prev, newNode]);
  };

  const handleApplyWorkflow = (newNodes: WorkflowNode[], name?: string) => {
    setNodes(newNodes);
    if (name) setWorkflowName(name);
    else setWorkflowName("AI Optimized Strategy");
    setActiveTab('workflows');
  };

  const handleSave = () => {
    alert(`Success: "${workflowName}" configurations have been synced to the cloud.`);
  };

  const handleReset = () => {
    if (confirm("Reset current workflow to its initial state? All unsaved changes will be lost.")) {
      setNodes(INITIAL_NODES);
      setWorkflowName('Global Operations API');
    }
  };

  const handleAddTeamMember = (email: string) => {
    const namePart = email.split('@')[0];
    const newMember: TeamMember = {
      id: Math.random().toString(36).substr(2, 5),
      name: namePart.charAt(0).toUpperCase() + namePart.slice(1),
      role: 'Contributor',
      avatar: namePart.slice(0, 2).toUpperCase(),
      status: 'online'
    };
    setTeam(prev => [...prev, newMember]);
  };

  if (view === 'landing') {
    return <LandingPage onLogin={handleLogin} onShowDocs={() => setView('documentation')} />;
  }

  if (view === 'documentation') {
    return <Documentation onBack={() => setView('landing')} onGetStarted={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      <div className="flex flex-col flex-1 min-h-screen lg:pl-64">
        <Header user={user} workflowName={workflowName} onSave={handleSave} onReset={handleReset} onAddNode={handleAddNode} />
        <main className="flex-1 p-8 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard user={user} workflowName={workflowName} nodes={nodes} team={team} />} {/* Pass user prop to Dashboard */}
          {activeTab === 'workflows' && <WorkflowCanvas nodes={nodes} setNodes={setNodes} onApplyWorkflow={handleApplyWorkflow} />}
          {activeTab === 'ai-consultant' && <AIConsultant onApplyWorkflow={handleApplyWorkflow} />}
          {activeTab === 'templates' && <Templates onApplyWorkflow={handleApplyWorkflow} />}
          {activeTab === 'team' && <Team team={team} onAddMember={handleAddTeamMember} />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'docs' && <Documentation onBack={() => setActiveTab('dashboard')} onGetStarted={() => setActiveTab('dashboard')} />}
        </main>
      </div>
    </div>
  );
};

export default App;
