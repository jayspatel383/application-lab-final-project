import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, "Password is required"] 
  },
  phone: { 
    type: String, 
    default: "",
    // Explicitly set required to false
    required: false  
  },
  address: { 
    type: String, 
    default: "",
    // Explicitly set required to false  
    required: false  
  },
  isAdmin: { 
    type: Boolean, 
    default: false 
  }
}, { 
  timestamps: true 
});

export default mongoose.model("User", userSchema);