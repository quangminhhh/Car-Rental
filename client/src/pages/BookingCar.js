import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../redux/actions/carsActions";
import {bookCar} from "../redux/actions/bookingActions.js";
import moment from "moment";
import Spinner from "../components/Spinner";
import {Col, Row, Divider, DatePicker, Checkbox, Modal, Button} from "antd";
const { RangePicker } = DatePicker;

function BookingCar() {
    const {loading} = useSelector(state => state.alertsReducer);
    const { cars } = useSelector(state => state.carsReducer);
    const dispatch = useDispatch();
    const [car, setCar] = useState({});
    const {carid } = useParams();
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0)
    const [driver, setdriver] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const storedCar = localStorage.getItem(`car-${carid}`);
        if (storedCar) {
            setCar(JSON.parse(storedCar));
        }

        dispatch(getAllCars());
    }, [dispatch, carid]);

    useEffect(() => {
        if (cars.length > 0 && carid) {
            const foundCar = cars.find(c => c._id === carid);
            if (foundCar) {
                setCar(foundCar);
                localStorage.setItem(`car-${carid}`, JSON.stringify(foundCar));
            }
        }
    }, [cars, carid]);

    useEffect(() => {
        setTotalAmount(totalHours * car.rentPerHour + (driver ? totalHours * 30 : 0));
    }, [driver, totalHours, car.rentPerHour]);

    function selectTimeSlots(values) {
        if (values && values.length === 2) {
            const fromValue = values[0];
            const toValue = values[1];

            console.log("From Value:", fromValue);
            console.log("To Value:", toValue);

            setFrom(fromValue.format('MMM DD YYYY HH:mm'));
            setTo(toValue.format('MMM DD YYYY HH:mm'));

            setTotalHours(toValue.diff(fromValue, "hours"));
        }
    }

    function onToken(token){
        const reqObj= {
            token,
            user : JSON.parse(localStorage.getItem("user"))._id,
            car : car._id,
            totalHours,
            totalAmount,
            driverRequired : driver,
            bookedTimeSlots: {
                from,
                to
            }
        }
        console.log("Request object sent to backend:", reqObj);
        console.log("Generated Stripe token:", token);
        dispatch(bookCar(reqObj))
    }

    return (
        <DefaultLayout>
            {loading === true && (<Spinner/>)}
            <Row justify={'center'} className={"d-flex align-items-center"} style={{minHeight:"80vh"}}>
                <Col lg={10} sm={24} xs={24}>
                    <img src={car.image_url} className="carimg2 bs1" alt="CarModel"/>
                </Col>

                <Col lg={10} sm={24} xs={24} className={"text-right"}>
                    <Divider type="horizontal" dashed>CarModel Info </Divider>
                    <div style={{textAlign: "right"}}>
                        <p>{car.make} {car.model} {car.class} {car.year} </p>
                        <p>Engine: {car.engine} ({car.transmission})</p>
                        <p>Horse Power: {car.horsepower}</p>
                        <p>Fuel: {car.fuel_type}</p>
                    </div>
                    <Divider type={"horizontal"} dashed>Select Time Slot</Divider>
                    <div style={{textAlign: 'right'}}>
                        <RangePicker
                            showTime={{format: "HH:mm"}}
                            format="MMM DD YYYY HH:mm"
                            onChange={selectTimeSlots}
                            disabledDate={(current) => {
                                return current && current < moment().startOf('day');
                            }}
                        />
                        <br/>
                        <br/>
                        <button className={"btn1 mt-2"} onClick={()=>{setShowModal(true)}}>See Booked Slots</button>
                        {from && to && (
                            <>
                                <p>Total Hours: <b>{totalHours}</b></p>
                                <p>Rent Per Hour: <b>{car.rentPerHour}</b></p>
                                <Checkbox onChange={(e) => {
                                    if (e.target.checked) {
                                        setdriver(true)
                                    } else {
                                        setdriver(false)
                                    }
                                }}>Driver Required</Checkbox>
                                <h3>Total Amount: {totalAmount}</h3>
                                <StripeCheckout
                                    shippingAddress
                                    token={ onToken}
                                    currency={"USD"}
                                    amount={totalAmount*100}
                                    stripeKey="pk_test_51PyqgMGCBBx9e5AwFgn0dErALmedUQ9tjGCxueb26ZqF8GNK2j0cFdSuMq2dUGMQk1jSIGhPXx67ivQxT77zGnYJ00x6lUlbBq">

                                    <button className={"btn1"}>
                                        Book Now
                                    </button>
                                </StripeCheckout>
                            </>
                        )}

                    </div>
                </Col>

            </Row>
            <Modal
                open={showModal}
                closable={false}
                title="Booked Time Slots"
                footer={[
                    <Button key="close" onClick={() => setShowModal(false)}>CLOSE</Button>
                ]}
            >
                {car && (
                    <div className="p-2">
                        {car.bookedTimeSlots?.map((slot, index) => (
                            <button key={index} className="btn1 mt-2">
                                {slot.from} - {slot.to}
                            </button>
                        ))}
                    </div>
                )}
            </Modal>
        </DefaultLayout>
    );
}

export default BookingCar;