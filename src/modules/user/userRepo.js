import User from "../../model/User.js"

export const findByEmail = async (email, selectPassword) => {
    const userQ = User.findOne({ email });

    if(selectPassword) {
        const user = await userQ
        return user
    }

    const user = await userQ.select('-password')
    return user
}