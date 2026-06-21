import mongoose from "mongoose";

const ProfilePhotoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Prevent mongoose from recreating the model if it already exists
export default mongoose.models.ProfilePhoto || mongoose.model("ProfilePhoto", ProfilePhotoSchema);