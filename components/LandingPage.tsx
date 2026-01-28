
import React from 'react';

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold text-xl">WV</div>
          <span className="text-xl font-bold tracking-tight">workFLOW VIEB</span>
        </div>
        <div className="flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Documentation</a>
          <button 
            onClick={onLogin}
            className="px-6 py-2.5 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Now Powered by Gemini 3.0
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
            Automate your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Software Workflows</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Design, visualize, and optimize your development pipelines with AI-driven insights. 
            The high-end desktop experience for elite engineering teams.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-10 py-4 bg-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all active:scale-95"
            >
              Get Started for Free
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Mock Preview */}
        <div className="mt-20 w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl shadow-2xl relative">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-40 bg-slate-800/50 rounded-xl animate-pulse"></div>
            <div className="h-40 bg-slate-800/50 rounded-xl animate-pulse delay-75"></div>
            <div className="h-40 bg-slate-800/50 rounded-xl animate-pulse delay-150"></div>
          </div>
        </div>
      </main>

      <footer className="p-12 text-center text-slate-500 text-sm border-t border-slate-900">
        &copy; 2024 workFLOW VIEB. Built for the modern engineer.
      </footer>
    </div>
  );
};

export default LandingPage;
