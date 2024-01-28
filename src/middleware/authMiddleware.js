import { verifyToken } from "../modules/auth/authService.js";

const authMiddleware = async (req, res, next)=>{
    const token = req.cookies.token;
    
    if(token){
        try {
            const user = await verifyToken(token)
            req.user = user
            next()
        } catch (err) {
            res.status(401).json({message: err.message});
        }
    } else {
        res.status(401).json({message: 'Unauthorized'});
    }
};

export default authMiddleware;