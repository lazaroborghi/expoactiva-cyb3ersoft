import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    deviceInfo: {
        type: String,
        required: true
    }
});

export default mongoose.model('Device', deviceSchema);
