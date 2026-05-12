'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import { Project, Resume, Skill } from '@/lib/models';

// ==========================================
// AUTHENTICATION
// ==========================================

export async function login(formData) {
  const password = formData.get('password');
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set('admin_token', 'authenticated', { httpOnly: true, secure: true, path: '/' });
    redirect('/admin/dashboard');
  }
  return { error: 'Invalid password' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
}

// ==========================================
// PROJECTS (Create, Read, Update, Delete)
// ==========================================

export async function addProject(formData) {
  await connectDB();
  
  const tagsString = formData.get('tags');
  const tagsArray = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  // Handle Thumbnail Upload
  let thumbnailFinal = formData.get('thumbnailPath'); 
  const thumbnailFile = formData.get('thumbnailFile');
  if (thumbnailFile && thumbnailFile.size > 0) {
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    thumbnailFinal = `data:${thumbnailFile.type};base64,${buffer.toString('base64')}`;
  }

  // Handle Main Image Upload
  let imageFinal = formData.get('imagePath'); 
  const imageFile = formData.get('imageFile');
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    imageFinal = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
  }

  await Project.create({
    title: formData.get('title'),
    shortDescription: formData.get('shortDescription'),
    description: formData.get('description'),
    link: formData.get('link'),
    github: formData.get('github'),
    thumbnail: thumbnailFinal,
    image: imageFinal,
    tags: tagsArray,
  });
}

export async function updateProjectOrder(orderedIds) {
  try {
    await connectDB();

    // Mapping through IDs to create an array of update promises
    const updates = orderedIds.map((id, index) => 
      Project.findByIdAndUpdate(id, { order: index })
    );

    // Wait for all updates to finish
    await Promise.all(updates);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update project order:", error);
    return { success: false };
  }
}

export async function editProject(formData) {
  await connectDB();
  const id = formData.get('id');
  
  const tagsString = formData.get('tags');
  const tagsArray = tagsString ? tagsString.split(',').map(tag => tag.trim()) : [];

  const updateData = {
    title: formData.get('title'),
    shortDescription: formData.get('shortDescription'),
    description: formData.get('description'),
    link: formData.get('link'),
    github: formData.get('github'),
    tags: tagsArray,
  };

  // Process Thumbnail
  const thumbnailFile = formData.get('thumbnailFile');
  if (thumbnailFile && thumbnailFile.size > 0) {
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    updateData.thumbnail = `data:${thumbnailFile.type};base64,${buffer.toString('base64')}`;
  } else if (formData.get('thumbnailPath')) {
    updateData.thumbnail = formData.get('thumbnailPath');
  }

  // Process Main Image
  const imageFile = formData.get('imageFile');
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    updateData.image = `data:${imageFile.type};base64,${buffer.toString('base64')}`;
  } else if (formData.get('imagePath')) {
    updateData.image = formData.get('imagePath');
  }

  await Project.findByIdAndUpdate(id, updateData);
}

export async function getProjects() {
  await connectDB();
  const projects = await Project.find({}).sort({ order: 1 }).lean();
  
  return projects.map(p => ({
    ...p,
    _id: p._id.toString()
  }));
}

export async function deleteProject(formData) {
  await connectDB();
  const id = formData.get('id');
  await Project.findByIdAndDelete(id);
}

// ==========================================
// RESUME
// ==========================================

export async function uploadResume(formData) {
  await connectDB();
  const file = formData.get('file');
  if (!file || file.size === 0) return;

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString('base64');
  
  await Resume.findOneAndUpdate({}, { pdfBase64: base64 }, { upsert: true });
}

export async function getResume() {
  await connectDB();
  const resume = await Resume.findOne({}).lean();
  if (resume && resume.pdfBase64) {
    return `data:application/pdf;base64,${resume.pdfBase64}`;
  }
  return null;
}

// ==========================================
// SKILLS
// ==========================================

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