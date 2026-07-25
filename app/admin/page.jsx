import { login } from './actions';

// We removed 'use client' - this is now a Server Component
export default function AdminLogin() {
  return (
    <div className="flex h-screen items-center justify-center bg-black text-white font-sans">
      <form action={login} className="flex flex-col gap-4 p-8 bg-black border border-white/10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Admin Access</h1>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          className="p-3 rounded-bl-none bg-black border-0 border-b border-slate-600 focus:outline-none focus:border-slate-400 transition-colors"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-black to-black text-white font-bold p-3 rounded-lg border border-slate-600 hover:shadow-lg hover:shadow-slate-500/20 transition-all duration-300">
          Login
        </button>
      </form>
    </div>
  );
}