import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  github: String,
  image: String,
  tags: [String],
});

const resumeSchema = new mongoose.Schema({
  pdfBase64: String, 
});

const skillSchema = new mongoose.Schema({
  name: String,
  category: String, 
});

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);
export const Skill = mongoose.models.Skill || mongoose.model('Skill', skillSchema);