import { loginService, sendOTPWa } from './authService.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await loginService(email, password)

        // Set Cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ message: 'Login Success' });
    } catch (err) {
        res.status(401).json({ message: err.message })
    }

}

export const logout = (_, res) => {
    // Clear Cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.json({ message: 'Logged Out' });
}

export const otp = async (req, res) => {
    const { phone } = req.body
    const wa = req.app.get('wa')

    try {
        await sendOTPWa(wa, phone)
        res.json({ success: 1, msg: 'Success' })
    } catch (err) {
        res.status(500).json({ success: 0, msg: err.message })
    }
}