import express from 'express';
import Booking from '../Models/bookingModel.js';
import Car from '../Models/carModel.js';
const router = express.Router();
import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';

const stripe = Stripe('sk_test_51PyqgMGCBBx9e5AwYOS7BmTDeOBrqHqX0QROp3V3TrWOrinvSsTvZuXNoRSa93KHVQWZF2x3bts4TxajUhixW1Ww00uE247jYq');

router.post('/bookcar', async (req, res) => {
    const { token } = req.body;

    console.log("Request received at /bookcar endpoint");
    console.log("Request body:", req.body);

    try {
        console.log("Creating Stripe customer...");
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });
        console.log("Stripe customer created:", customer);

        console.log("Creating Stripe charge...");
        const payment = await stripe.charges.create(
            {
                amount: req.body.totalAmount * 100,
                currency: 'USD',
                customer: customer.id,
                receipt_email: token.email,
            },
            {
                idempotencyKey: uuidv4(),
            }
        );
        console.log("Stripe charge created:", payment);

        if (payment) {
            console.log("Payment succeeded. Saving booking to database...");
            req.body.transactionID = payment.id;

            // Save booking to database
            const newBooking = new Booking(req.body);
            await newBooking.save();
            console.log("Booking saved to database:", newBooking);

            console.log("Fetching car from database with ID:", req.body.car);
            const car = await Car.findOne({ _id: req.body.car });
            console.log("Car fetched from database:", car);

            console.log("Updating bookedTimeSlots for the car...");
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);
            await car.save();
            console.log("Car updated successfully:", car);

            res.send("Your Booking Is Successful");
        } else {
            console.error("Payment failed:", payment);
            return res.status(400).json({ message: "Payment failed" });
        }
    } catch (err) {
        console.error("Error in /bookcar route:", err.message, err.stack);
        return res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;
