'use client'

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { addProject, editProject, uploadResume, getProjects, deleteProject, logout, addSkill, getSkills, deleteSkill } from '../actions';

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  
  // State to track the project currently being edited
  const [editingProject, setEditingProject] = useState(null);

  // Fetch initial data on load
  useEffect(() => {
    async function fetchData() {
      const projectData = await getProjects();
      if (projectData) setProjects(projectData);
      
      const skillData = await getSkills();
      if (skillData) setSkills(skillData);
    }
    fetchData();
  }, []);

  // --- WRAPPER FUNCTIONS FOR TOASTS & NO-RELOADS ---

  const handleProjectSubmit = async (formData) => {
    const toastId = toast.loading(editingProject ? 'Updating project...' : 'Saving project...');
    try {
      if (editingProject) {
        formData.append('id', editingProject._id);
        await editProject(formData);
      } else {
        await addProject(formData);
      }
      
      // Fetch the updated list instantly without reloading the page
      const updatedProjects = await getProjects();
      setProjects(updatedProjects);
      
      // Clear the form and reset edit state
      document.getElementById('project-form').reset();
      setEditingProject(null);
      toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to save project.', { id: toastId });
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to the form
  };

  const cancelEdit = () => {
    setEditingProject(null);
    document.getElementById('project-form').reset();
  };

  const handleResumeSubmit = async (formData) => {
    const toastId = toast.loading('Uploading resume...');
    try {
      await uploadResume(formData);
      document.getElementById('resume-form').reset();
      toast.success('Resume updated successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to upload resume.', { id: toastId });
    }
  };

  const handleSkillSubmit = async (formData) => {
    const toastId = toast.loading('Adding skill...');
    try {
      await addSkill(formData);
      const updatedSkills = await getSkills();
      setSkills(updatedSkills);
      document.getElementById('skill-form').reset();
      toast.success('Skill added successfully!', { id: toastId });
    } catch (error) {
      toast.error('Failed to add skill.', { id: toastId });
    }
  };

  const handleDeleteProject = async (id) => {
    const toastId = toast.loading('Deleting project...');
    const formData = new FormData();
    formData.append('id', id);
    await deleteProject(formData);
    setProjects(projects.filter(project => project._id !== id));
    
    // If we delete the project we are currently editing, cancel the edit
    if (editingProject?._id === id) {
      cancelEdit();
    }
    
    toast.success('Project deleted.', { id: toastId });
  };

  const handleDeleteSkill = async (id) => {
    const toastId = toast.loading('Deleting skill...');
    const formData = new FormData();
    formData.append('id', id);
    await deleteSkill(formData);
    setSkills(skills.filter(skill => skill._id !== id));
    toast.success('Skill deleted.', { id: toastId });
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/admin'; 
  };

  return (
    <div className="min-h-screen p-10 bg-gray-950 text-white flex flex-col gap-10 font-sans">
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#1f2937', color: '#fff', border: '1px solid #374151' } }} />
      
      {/* Header & Logout */}
      <div className="flex justify-between items-center max-w-2xl mx-auto w-full">
        <h1 className="text-3xl font-bold flex items-center gap-4">
          <span className="h-px w-8 bg-gradient-to-r from-blue-400 to-cyan-400" />
          Admin Dashboard
        </h1>
        <button onClick={handleLogout} className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded hover:bg-red-500/20 transition-colors">
          Logout
        </button>
      </div>

      {/* 1. Add / Edit Project Form */}
      <section className={`p-8 rounded-xl max-w-2xl mx-auto w-full shadow-lg border transition-colors duration-300 ${editingProject ? 'bg-blue-900/10 border-blue-500/30' : 'bg-gray-900 border-white/10'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-cyan-400">
            {editingProject ? '✏️ Edit Project' : '1. Add New Project'}
          </h2>
          {editingProject && (
            <button type="button" onClick={cancelEdit} className="text-sm text-gray-400 hover:text-white transition-colors">
              Cancel Edit
            </button>
          )}
        </div>

        <form action={handleProjectSubmit} id="project-form" className="flex flex-col gap-6">
          
          {/* Global Details */}
          <div className="space-y-4">
            <input type="text" name="title" defaultValue={editingProject?.title || ''} placeholder="Project Title" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors" required />
            <input type="text" name="tags" defaultValue={editingProject?.tags?.join(', ') || ''} placeholder="Tags (comma separated, e.g., React, Node.js)" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors" required />
          </div>

          {/* Card View Details (Thumbnail & Short Desc) */}
          <div className="p-5 rounded-lg border border-cyan-500/20 bg-cyan-500/5 space-y-4">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Small Card View (Grid)</h3>
            <textarea name="shortDescription" defaultValue={editingProject?.shortDescription || ''} placeholder="Short Tagline / Summary (1-2 sentences)" className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors h-20 resize-none" required />
            
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">Thumbnail Image (Square/Landscape)</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="file" name="thumbnailFile" accept="image/*" className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer w-full" />
                <input type="text" name="thumbnailPath" defaultValue={editingProject?.thumbnail || ''} placeholder="OR Image URL" className="p-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 w-full" />
              </div>
            </div>
          </div>

          {/* Expanded View Details (Full Image & Long Desc) */}
          <div className="p-5 rounded-lg border border-blue-500/20 bg-blue-500/5 space-y-4">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Expanded View (Modal)</h3>
            <textarea name="description" defaultValue={editingProject?.description || ''} placeholder="Full Detailed Description..." className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-400 transition-colors h-32 resize-none" required />
            
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-400">Full Image / Banner</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="file" name="imageFile" accept="image/*" className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600 cursor-pointer w-full" />
                <input type="text" name="imagePath" defaultValue={editingProject?.image || ''} placeholder="OR Image URL" className="p-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-blue-400 w-full" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input type="url" name="link" defaultValue={editingProject?.link || ''} placeholder="Live URL (Optional)" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors" />
            <input type="url" name="github" defaultValue={editingProject?.github || ''} placeholder="GitHub URL (Optional)" className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors" />
          </div>
          
          <button type="submit" className={`mt-2 text-white font-bold p-4 rounded-xl transition-all duration-300 ${editingProject ? 'bg-gradient-to-r from-blue-600 to-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]' : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'}`}>
            {editingProject ? 'Update Project' : 'Save Project'}
          </button>
        </form>
      </section>

      {/* 2. Upload Resume Form */}
      <section className="bg-gray-900 border border-white/10 p-8 rounded-xl max-w-2xl mx-auto w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-cyan-400">2. Upload Resume (PDF)</h2>
        <form action={handleResumeSubmit} id="resume-form" className="flex flex-col gap-4">
          <input type="file" name="file" accept="application/pdf" className="p-3 rounded-lg bg-gray-800 text-gray-300 border border-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20" required />
          <button type="submit" className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold p-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            Upload PDF
          </button>
        </form>
      </section>

      {/* 3. Add Skill Form */}
      <section className="bg-gray-900 border border-white/10 p-8 rounded-xl max-w-2xl mx-auto w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-cyan-400">3. Manage Skills</h2>
        <form action={handleSkillSubmit} id="skill-form" className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Skill Name (e.g., Node.js)" className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors" required />
          <select name="category" className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-cyan-400 transition-colors" required>
            <option value="Languages & Databases">Languages & Databases</option>
            <option value="Libraries & Frameworks">Libraries & Frameworks</option>
            <option value="Tools & Analytics">Tools & Analytics</option>
            <option value="Specializations">Specializations</option>
          </select>
          <button type="submit" className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold p-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
            Save Skill
          </button>
        </form>

        {/* List Skills */}
        <div className="mt-6 flex flex-wrap gap-3">
          {skills.map(skill => (
            <div key={skill._id} className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full text-sm">
              <span className="text-cyan-300">[{skill.category}]</span> 
              <span className="text-white">{skill.name}</span>
              <button onClick={() => handleDeleteSkill(skill._id)} className="ml-2 text-red-400 hover:text-red-300 font-bold">
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Manage Existing Projects */}
      <section className="bg-gray-900 border border-white/10 p-8 rounded-xl max-w-2xl mx-auto w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-cyan-400">4. Manage Projects</h2>
        <div className="flex flex-col gap-4">
          {projects.length === 0 ? (
            <p className="text-gray-400">No projects found in database.</p>
          ) : (
            projects.map((project) => (
              <div key={project._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-800 rounded-lg border border-gray-700 gap-4">
                <div>
                  <h3 className="font-bold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1 w-full sm:w-64">{project.description}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => handleEditClick(project)}
                    className="flex-1 sm:flex-none bg-blue-500/20 text-blue-400 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteProject(project._id)}
                    className="flex-1 sm:flex-none bg-red-600/20 text-red-400 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}