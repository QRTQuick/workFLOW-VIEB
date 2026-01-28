
import React from 'react';

interface DocumentationProps {
  onBack: () => void;
  onGetStarted: () => void;
}

const Documentation: React.FC<DocumentationProps> = ({ onBack, onGetStarted }) => {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'concepts', title: 'Core Concepts' },
    { id: 'ai', title: 'AI Strategist' },
    { id: 'collaboration', title: 'Team Collaboration' },
    { id: 'security', title: 'Security' },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white font-bold text-sm">WV</div>
          <span className="font-bold tracking-tight">Documentation</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors"
          >
            Back to Home
          </button>
          <button 
            onClick={onGetStarted}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-100 hidden md:block sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-8">
          <nav className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Navigation</p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8 md:p-16 max-w-4xl">
          <section id="intro" className="mb-20">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Introduction</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Welcome to <strong>workFLOW VIEB</strong>, the premium desktop-grade workspace for modern software engineering teams. 
              Our platform bridges the gap between high-level architectural planning and low-level task execution.
            </p>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-2">Key Value Propositions:</h4>
              <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
                <li>Visualized Software Development Lifecycle (SDLC).</li>
                <li>AI-assisted bottleneck analysis and flow generation.</li>
                <li>Zero-config real-time synchronization.</li>
                <li>Enterprise-grade security and authentication.</li>
              </ul>
            </div>
          </section>

          <section id="concepts" className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Core Concepts</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">Workflow Nodes</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  The atomic unit of workFLOW VIEB. Each node represents a specific stage in your pipeline.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="text-[10px] font-bold text-amber-700 uppercase">Planning</span>
                    <p className="text-xs text-amber-600 mt-1">Research, wireframes, and specs.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Development</span>
                    <p className="text-xs text-blue-600 mt-1">Coding, API design, and logic.</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">States & Transitions</h3>
                <p className="text-slate-600 leading-relaxed">
                  Nodes move through four primary states: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">Todo</code>, 
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">In Progress</code>, 
                  <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">Completed</code>, 
                  and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600">Blocked</code>.
                </p>
              </div>
            </div>
          </section>

          <section id="ai" className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">AI Strategist</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our integration with <strong>Google Gemini 3.0</strong> allows you to generate optimized workflows from natural language descriptions.
            </p>
            <div className="bg-slate-900 rounded-2xl p-6 text-indigo-300 font-mono text-xs">
              <p className="mb-2 opacity-50">// Prompt Example</p>
              <p>"Build a scalable microservices architecture for a fintech app..."</p>
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-emerald-400">✓ Generating 12-step optimal workflow...</p>
              </div>
            </div>
          </section>

          <section id="collaboration" className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Team Collaboration</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Invite team members using their professional email addresses. Each member can be assigned roles like 
              <span className="font-bold"> Lead</span>, <span className="font-bold">Maintainer</span>, or <span className="font-bold">Contributor</span>.
            </p>
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
               <div className="bg-slate-50 px-6 py-3 text-[10px] font-bold uppercase text-slate-400 border-b border-slate-100">Permissions Matrix</div>
               <div className="p-6 space-y-2">
                 <div className="flex justify-between text-sm"><span>Lead</span> <span className="text-indigo-600">Full Access</span></div>
                 <div className="flex justify-between text-sm"><span>Maintainer</span> <span className="text-indigo-600">Edit Only</span></div>
                 <div className="flex justify-between text-sm"><span>Contributor</span> <span className="text-indigo-600">View Only</span></div>
               </div>
            </div>
          </section>

          <section id="security" className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Security & Authentication</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              We leverage Google Identity Services (GIS) for secure, seamless authentication. 
              All data transmitted between the client and our AI engine is encrypted in transit using TLS 1.3.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Your workflow data is stored using a local-first persistence model with periodic cloud synchronization 
              to ensure no progress is ever lost, even during connectivity interruptions.
            </p>
          </section>

          <div className="mt-32 p-12 bg-indigo-600 rounded-3xl text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to accelerate?</h3>
            <p className="mb-8 opacity-80">Join 50,000+ developers using workFLOW VIEB every day.</p>
            <button 
              onClick={onGetStarted}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all"
            >
              Start Building Now
            </button>
          </div>
        </main>
      </div>

      <footer className="p-12 text-center text-slate-400 text-sm border-t border-slate-50">
        &copy; 2024 workFLOW VIEB. For further assistance, contact support@dev.flow
      </footer>
    </div>
  );
};

export default Documentation;
