
import React, { useState } from 'react';
import { TeamMember } from '../types';

interface TeamProps {
  members: TeamMember[];
  onInvite: (email: string) => void;
}

const Team: React.FC<TeamProps> = ({ members, onInvite }) => {
  const [email, setEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      onInvite(email);
      setEmail('');
    } else {
      alert("Please enter a valid developer email.");
    }
  };

  return (
    <div className="flex-1 p-8 overflow-auto bg-slate-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Team Collaborators</h1>
            <p className="text-slate-500">Manage permissions and project access.</p>
          </div>
          
          <form onSubmit={handleInvite} className="flex gap-2">
            <input 
              type="email" 
              placeholder="developer@company.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
            />
            <button 
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Invite
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Collaborator</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600 ring-2 ring-indigo-50">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{member.name}</p>
                        <p className="text-xs text-slate-400 lowercase">{member.name.replace(' ', '.')}@dev.flow</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${
                      member.role === 'Lead' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                      member.role === 'Maintainer' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                      'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {member.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        member.status === 'online' ? 'bg-emerald-500' : 
                        member.status === 'busy' ? 'bg-amber-500' : 'bg-slate-300'
                      }`}></div>
                      <span className="text-xs text-slate-500 capitalize">{member.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => alert(`Opening permissions for ${member.name}...`)}
                      className="text-slate-400 hover:text-indigo-600 font-bold text-xs"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Team;
