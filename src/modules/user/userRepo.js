import User from "../../model/User.js"

export const findByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user
}