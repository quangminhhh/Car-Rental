import React, { useEffect } from 'react';
import { Input, Form } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {userRegister} from "../redux/actions/userActions";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spinner from "../components/Spinner";

AOS.init();
function Register() {
    const { loading } = useSelector(state => state.alertsReducer);
    const cloudinaryImageUrl = "https://res.cloudinary.com/dja1l7evr/image/upload/t_rotate/v1730816185/otwkelok1ibqfgnbtlle.webp";
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(userRegister(values));
        console.log('Success:', values);
    };
    useEffect(() => {
        AOS.refresh();
    }, []);

    return (
        <div className="login">

            {loading && (
                <div data-aos="fade-in" data-aos-duration="1000">
                    <Spinner />
                </div>
            )}

            <div className="login-image-container">
                <img
                    data-aos-duration={"800"}
                    data-aos="slide-left"
                    src={cloudinaryImageUrl}
                    alt="CarModel"
                />
                <h1 className='login-logo'>LUXURY CAR RENT</h1>
            </div>

            <div className="login-form-container">
                <Form
                    className="login-form"
                    layout="vertical"
                    onFinish={onFinish}
                    style={{textAlign: "left"}}
                >
                    <h1>Register</h1>
                    <hr />
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Username is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="cpassword"
                        label="Confirm Password"
                        rules={[{ required: true, message: "Password is required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <button className='btn1 mt-2 mb-3'>Register</button>
                    <hr/>
                    <Link to="/login">Click Here to Login</Link>
                </Form>
            </div>
        </div>
    );
}

export default Register;