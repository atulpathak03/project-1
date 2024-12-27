import jwt from 'jsonwebtoken';

//admin authentication middleware

const authAdmin = async (req, res, next) => {
    try{
        const {atoken } = req.headers
        if (!atoken){
            return res.json({success: false, message: "No token found"})
        }
        const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);
        if (token_decoded.role !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "You are not authorized to access this route"})}
        next()
    }

    catch(err){
        console.log(err)
        return res.json({success: false, message: "Invalid token"})
    }
}

export default authAdmin;