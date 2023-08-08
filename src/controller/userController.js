
import User from '../model/user.js'

export const createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}