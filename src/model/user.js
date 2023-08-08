import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: Buffer
})

userSchema.statics.isThisEmailInUse = async (email) => {
    if (!email) throw new Error('Email is required')
    try {
        const user = await this.findOne({email})
        return user ? true : false
   } catch (error) {
       console.log('Error in isThisEmailInUse', error.message)
       return false
   } 
}

export default mongoose.model('User', userSchema)