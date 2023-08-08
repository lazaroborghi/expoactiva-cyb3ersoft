import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
})

export default mongoose.model('Location', locationSchema)