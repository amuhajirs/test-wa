import { findByEmail } from "../user/userRepo.js"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import generateOTP from "../../helpers/otp.js";

export const loginService = async (email, password) => {
    const user = await findByEmail(email, true)

    if(!user){
        throw new Error('Bad Credential');
    }

    // Check Password
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword){
        throw new Error('Bad Credential');
    }

    // Generate JWT Token
    const token = jwt.sign(
        {id: user._id},
        process.env.JWT_KEY,
        {expiresIn: '1d'}
    );

    return token
}

export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await findByEmail(decoded.email, false)
        return user
    } catch {
        throw new Error('Unauthorized')
    }
}

export const sendOTPWa = async (wa, phone) => {
    const otp = generateOTP(6)
    console.log(otp)

    await wa.sendText(`${phone}@c.us`, `OTP: ${otp}`)
}