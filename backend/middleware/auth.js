import { User } from "../model/user.js";
import Jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try{
        const { token } = req.cookies
        if(!token){
            return res.status(400).json({success: false, message: "⚠️Login Token Not Found⚠️"})
        }
        const decode = Jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decode._id)
        req.user = user
        next()
    }
    catch(error){
        return res.status(500).json({success: false, message: `⚠️${error.message}⚠️`})
    }
}