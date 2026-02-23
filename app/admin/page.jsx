import { login } from './actions';

// We removed 'use client' - this is now a Server Component
export default function AdminLogin() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-950 text-white font-sans">
      <form action={login} className="flex flex-col gap-4 p-8 bg-gray-900 border border-white/10 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-cyan-400">Admin Access</h1>
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          className="p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors"
          required 
        />
        <button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold p-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
          Login
        </button>
      </form>
    </div>
  );
}