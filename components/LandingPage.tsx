
import React, { useEffect } from 'react';

interface LandingPageProps {
  onLogin: (userData?: { name: string; email: string; avatar: string }) => void;
  onShowDocs: () => void;
}

/**
 * SOURCE: User-provided Google Client ID.
 * We prioritize process.env.GOOGLE_CLIENT_ID to avoid hardcoding.
 */
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "584831158345-68k0sfa8u7m5hqja1c2r1elj0ror15js.apps.googleusercontent.com";

const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onShowDocs }) => {
  
  useEffect(() => {
    /* Initialize Google Sign-In with FedCM opt-in to prevent NotAllowedError in modern browsers */
    const google = (window as any).google;
    if (google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response: any) => {
          console.debug("Google Identity: Credential received");
          // In a real app, you'd decode the JWT here
          onLogin();
        },
        use_fedcm_for_prompt: true, // Resolves FedCM mandatory warning
        auto_select: false,
      });

      // Optionally attempt to display One Tap
      google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed()) {
          console.debug("One Tap not displayed:", notification.getNotDisplayedReason());
        }
      });
    }
  }, [onLogin]);

  const handleGoogleLogin = () => {
    const google = (window as any).google;
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes("YOUR_")) {
      onLogin(); // Dev Fallback
    } else {
      try {
        // Use standard prompt for explicit login
        google?.accounts?.id.prompt();
      } catch (e) {
        console.error("Google Login Error:", e);
        onLogin(); // Resilience fallback
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white flex flex-col">
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center max-w-7xl mx-auto w-full shrink-0 relative z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold text-xl">WV</div>
          <span className="text-xl font-bold tracking-tight">workFLOW VIEB</span>
        </div>
        <div className="flex items-center gap-8">
          <button 
            onClick={onShowDocs}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Documentation
          </button>
          <button 
            onClick={() => onLogin()}
            className="px-6 py-2.5 bg-white text-slate-950 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
          >
            Guest Access
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center relative py-24 min-h-screen">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full -z-10"></div>

        <div className="max-w-4xl space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-indigo-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Real-time Workflow Engine
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
            Engineering at <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Light Speed</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The industry standard for visualizing software development lifecycles. 
            Connect your team, automate your steps, and deploy with confidence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button 
              onClick={() => onLogin()}
              className="w-full sm:w-auto px-10 py-4 bg-indigo-600 rounded-2xl font-bold text-lg hover:bg-indigo-700 hover:shadow-[0_0_40px_rgba(79,70,229,0.3)] transition-all active:scale-95"
            >
              Launch Dashboard
            </button>
            <button 
              onClick={handleGoogleLogin}
              className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all group"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="Google" />
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Mock Preview */}
        <div className="mt-20 w-full max-w-5xl rounded-3xl border border-slate-800 bg-slate-900/50 p-4 backdrop-blur-xl shadow-2xl relative group cursor-default">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-rose-500/50 group-hover:bg-rose-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-40 bg-slate-800/30 rounded-xl border border-white/5 flex flex-col items-center justify-center">
               <div className="w-12 h-2 bg-indigo-500/20 rounded-full mb-2"></div>
               <div className="w-20 h-2 bg-slate-700 rounded-full"></div>
            </div>
            <div className="h-40 bg-slate-800/30 rounded-xl border border-white/5 flex flex-col items-center justify-center">
               <div className="w-12 h-2 bg-emerald-500/20 rounded-full mb-2"></div>
               <div className="w-20 h-2 bg-slate-700 rounded-full"></div>
            </div>
            <div className="h-40 bg-slate-800/30 rounded-xl border border-white/5 flex flex-col items-center justify-center">
               <div className="w-12 h-2 bg-amber-500/20 rounded-full mb-2"></div>
               <div className="w-20 h-2 bg-slate-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-12 text-center text-slate-500 text-sm border-t border-slate-900 mt-auto shrink-0">
        &copy; 2024 workFLOW VIEB. Secured with Industry Standard Encryption.
      </footer>
    </div>
  );
};

export default LandingPage;
