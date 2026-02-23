'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import { Project, Resume, Skill } from '@/lib/models';

export async function login(formData) {
  const password = formData.get('password');
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', { httpOnly: true, secure: true, path: '/' });
    
    redirect('/admin/dashboard');
  }
  return { error: 'Invalid password' };
}

export async function addProject(formData) {
  await connectDB();
  
  const tagsString = formData.get('tags');
  const tagsArray = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  await Project.create({
    title: formData.get('title'),
    description: formData.get('description'),
    link: formData.get('link'),
    github: formData.get('github'),
    image: formData.get('image'),
    tags: tagsArray,
  });
}

export async function uploadResume(formData) {
  await connectDB();
  const file = formData.get('file');
  if (!file) return;

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  
  await Resume.findOneAndUpdate({}, { pdfBase64: base64 }, { upsert: true });
}

export async function getProjects() {
  await connectDB();
  const projects = await Project.find({}).lean();
  
  return projects.map(p => ({
    ...p,
    _id: p._id.toString()
  }));
}

export async function getResume() {
  await connectDB();
  const resume = await Resume.findOne({}).lean();
  
  if (resume && resume.pdfBase64) {
    return `data:application/pdf;base64,${resume.pdfBase64}`;
  }
  return null;
}

export async function deleteProject(formData) {
  await connectDB();
  const id = formData.get('id');
  await Project.findByIdAndDelete(id);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
}

export async function addSkill(formData) {
  await connectDB();
  await Skill.create({
    name: formData.get('name'),
    category: formData.get('category') || 'Other',
  });
}

export async function getSkills() {
  await connectDB();
  const skills = await Skill.find({}).lean();
  return skills.map(s => ({
    ...s,
    _id: s._id.toString()
  }));
}

export async function deleteSkill(formData) {
  await connectDB();
  const id = formData.get('id');
  await Skill.findByIdAndDelete(id);
}