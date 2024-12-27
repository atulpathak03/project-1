import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from "../models/doctor.models.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // Validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });

        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        return res.json({ success: true, message: "Doctor created successfully" });

    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
}

//API FOR ADMIN LOGIN
const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }
    catch(err){
        console.log(err);
        res.json({success:false,message: err.message});
    }
}

export { addDoctor,loginAdmin };
