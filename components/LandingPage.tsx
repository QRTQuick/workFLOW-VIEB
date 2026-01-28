import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode'; // Import jwt-decode library

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
          console.debug("Google Identity: Credential received", response);
          // Decode the JWT token to extract user data
          try {
            const decoded: { name: string; email: string; picture: string } = jwt_decode(response.credential);
            const userData = {
              name: decoded.name,
              email: decoded.email,
              avatar: decoded.picture,
            };
            onLogin(userData);
          } catch (error) {
            console.error("Error decoding Google credential:", error);
            onLogin(); // Fallback to guest login
          }
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
            onClick={() => onLogin()} // This button now acts as a guest login if Google fails or not configured
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
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-300 to-slate-500 max-w-4xl">
            Revolutionize your workflows with <span className="text-indigo-400">AI-powered collaboration</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Unify your team, automate tasks, and gain intelligent insights to streamline your operations and drive innovation.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              onClick={handleGoogleLogin}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-base shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12c0-1.04-.09-2.05-.25-3.02H12v6.02h5.46c-.6 3.19-3.41 5.4-6.46 5.4a9 9 0 0 1-9-9a9 9 0 0 1 9-9c3.12 0 5.48 1.45 6.7 2.8l3.61-3.61C20.67 2.65 18.33 1 12 1A11 11 0 0 0 1 12a11 11 0 0 0 11 11c6.54 0 11-4.63 11-11Z"/></svg>
              Login with Google
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 text-center text-slate-500 text-sm shrink-0 relative z-50">
        <p>&copy; 2024 workFLOW VIEB. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
