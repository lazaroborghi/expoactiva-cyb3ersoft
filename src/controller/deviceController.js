import { v4 as uuidv4 } from 'uuid';
import Device from '../model/device.js';

// Crear un nuevo dispositivo
export const createDevice = async (req, res) => {
    const deviceInfo = req.body.deviceInfo;
    
    // Generar un ID único para el dispositivo utilizando uuid
    const deviceId = uuidv4();
    
    const device = new Device({ deviceId, deviceInfo });

    try {
        await device.save();
        res.status(201).json(device);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Obtener todos los dispositivos
export const getAllDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.status(200).json(devices);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Obtener un dispositivo por ID
export const getDeviceById = async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const device = await Device.findOne({ deviceId });
        
        if(!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        
        res.status(200).json(device);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Actualizar un dispositivo por ID
export const updateDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    const updatedDeviceInfo = req.body.deviceInfo;

    try {
        const device = await Device.findOneAndUpdate({ deviceId }, { deviceInfo: updatedDeviceInfo }, { new: true });

        if(!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        res.status(200).json(device);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Eliminar un dispositivo por ID
export const deleteDevice = async (req, res) => {
    const deviceId = req.params.deviceId;

    try {
        const result = await Device.findOneAndDelete({ deviceId });
        
        if(!result) {
            return res.status(404).json({ message: "Device not found" });
        }

        res.status(200).json({ message: "Device deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
