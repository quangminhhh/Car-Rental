import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    class: {type: String, required: true},
    rentPerHour: {type: Number, required: true},
    engine: {type: String, required: true},
    horsepower: {type: Number, required: true},
    transmission: {type: String, required: true},
    fuel_type: {type: String, required: true},
    image_url: {type: String, required: true},
    bookedTimeSlots: [{
        from: {type: String},
        to: {type: String}
    }],
    capacity: {type: Number, required: true},
},
    {timestamps: true},
);

const CarModel = mongoose.model('cars', carSchema);

export default CarModel;
