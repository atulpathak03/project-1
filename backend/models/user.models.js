import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, default: "" }, // Default value is an empty string
  address: { type: Object, required: {line1:'',line2:''} },
  gender: { type: String, default: "Not Selected" },
  dob: { type: String, default: "Not Selected" },
  phone: { type: String, default: "00000000000" } // Default value is 10 zeros
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;