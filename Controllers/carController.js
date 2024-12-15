import CarModel from '../Models/carModel.js';

export const getLuxuryCars = async (req, res) => {
    try {
        const cars = await CarModel.find();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addLuxuryCar = async (req, res) => {
    const car = new CarModel(req.body);
    try {
        const newCar = await car.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteLuxuryCar = async (req, res) => {
    try {
        const car = await CarModel.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ message: "CarModel not found" });
        res.json({ message: "CarModel deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
