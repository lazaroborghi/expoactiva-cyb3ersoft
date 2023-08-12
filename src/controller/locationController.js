import Location from '../model/location.js';
import Device from '../model/device.js';

// Crear una nueva ubicación
export const newLocation = async (req, res) => {
    const { longitude, latitude, date, time, deviceId } = req.body;

    // Verificar si el dispositivo existe
    const device = await Device.findOne({ deviceId });
    if (!device) {
        return res.status(400).json({ message: 'Invalid device ID' });
    }

    const location = new Location({
        longitude,
        latitude,
        date,
        time,
        deviceId
    });

    try {
        await location.save();
        res.status(201).json(location);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Obtener ubicaciones por fecha y hora
export const getLocationsByDateTime = async (req, res) => {
    const { date, time } = req.query;

    let query = {};
    if (date) {
        query.date = date;
    }
    if (time) {
        query.time = time;
    }

    try {
        const locations = await Location.find(query);
        if (locations.length === 0) {
            return res.status(404).json({ message: 'No locations found for the given date and/or time' });
        }
        res.status(200).json(locations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Obtener ubicaciones por dispositivo
export const getLocationsByDevice = async (req, res) => {
    const deviceId = req.params.deviceId;

    // Verificar si el dispositivo existe
    const device = await Device.findOne({ deviceId });
    if (!device) {
        return res.status(400).json({ message: 'Invalid device ID' });
    }

    try {
        const locations = await Location.find({ device: deviceId });
        res.status(200).json(locations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
