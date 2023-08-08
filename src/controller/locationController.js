import Location from '../model/location.js'

export const newLocation = async (req, res) => {
    const location = new Location(req.body)
    try {
        await location.save()
        res.status(201).json(location)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}