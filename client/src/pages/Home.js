import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import {getAllCars} from "../redux/actions/carsActions";
import {Col, Row, DatePicker } from "antd";
import Spinner from "../components/Spinner"
import moment from "moment";
const {RangePicker} = DatePicker;


function Home() {
    const {cars} = useSelector(state => state.carsReducer);
    const {loading} = useSelector(state => state.alertsReducer);
    const dispatch = useDispatch();
    const [totalCars, setTotalCars] = useState([]);
    useEffect(() => {
        dispatch(getAllCars());
    },[dispatch])

    useEffect(() => {
        setTotalCars(cars);
    }, [cars]);

    const setFilter = (values) => {
        console.log("Filter values:", values);

        if (!values) {
            setTotalCars(cars);
            return;
        }

        const selectedFrom = moment(values[0]);
        const selectedTo = moment(values[1]);

        console.log("Selected From:", selectedFrom.format("MMM DD YYYY HH:mm"));
        console.log("Selected To:", selectedTo.format("MMM DD YYYY HH:mm"));

        const filteredCars = cars.filter(car => {
            // Kiểm tra xem có bookedTimeSlots hay không
            const bookedSlots = car.bookedTimeSlots || [];

            for (const booking of bookedSlots) {
                const bookingFrom = moment(booking.from, "MMM DD YYYY HH:mm"); // Correct format
                const bookingTo = moment(booking.to, "MMM DD YYYY HH:mm"); // Correct format

                console.log("Car:", car.make, car.model);
                console.log("  Booking From:", bookingFrom.format("MMM DD YYYY HH:mm"));
                console.log("  Booking To:", bookingTo.format("MMM DD YYYY HH:mm"));

                if (
                    selectedFrom.isBetween(bookingFrom, bookingTo, null, '[]') ||
                    selectedTo.isBetween(bookingFrom, bookingTo, null, '[]') ||
                    bookingFrom.isBetween(selectedFrom, selectedTo, null, '[]') ||
                    bookingTo.isBetween(selectedFrom, selectedTo, null, '[]')
                ) {
                    console.log("  Not available");
                    return false; // Xe không khả dụng
                }
            }

            console.log("  Available");
            return true; // Xe khả dụng
        });

        console.log("Filtered Cars:", filteredCars);
        setTotalCars(filteredCars);
    };

    return (
        <DefaultLayout>

            <Row className="mt-3" justify={"center"}>

                <Col lg={20 } sm={24} className={"d-flex justify-content-left"}>

                    <RangePicker
                        showTime={{format: "HH:mm"}}
                        format="MMM DD YYYY HH:mm"
                        onChange={setFilter}
                        disabledDate={(current) => {
                            return current && current < moment().startOf('day');
                        }}
                    />

                </Col>

            </Row>


            {loading === true && (<Spinner/>)}

            <Row justify={'center'} gutter={16} >

                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24} key={car._id}>
                        <div className="car p-2 bs1">
                            <img src={car.image_url} className="carimg" alt="CarModel"/>

                            <div className="car-content d-flex align-items-center justify-content-between">

                                <div>
                                    <p>{car.make}</p>
                                    <p>{car.rentPerHour} Rent Per Hour /-</p>

                                </div>

                                <div>
                                    <button className="btn1 mt-2">
                                        <Link to={`/bookingcar/${car._id}`} style={{ textDecoration: 'none' }}>Book Now</Link>
                                    </button>
                                </div>

                            </div>

                        </div>
                    </Col>
                })}

            </Row>

        </DefaultLayout>
    )
}
export default Home;