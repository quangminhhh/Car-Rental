import React from 'react';
import { Input, Form } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Spinner from "../components/Spinner";

AOS.init();

function Login() {
    const cloudinaryImageUrl = "https://res.cloudinary.com/dja1l7evr/image/upload/t_Gradient fade/v1730816185/otwkelok1ibqfgnbtlle.webp";
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer);
    const onFinish = (values) => {
        dispatch(userLogin(values));
        console.log('Success:', values);
    };

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
                    data-aos="slide-right"
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
                    style={{ textAlign: "left" }}
                >
                    <h1>Login</h1>
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
                        <Input type="password" />
                    </Form.Item>

                    <button className='btn1 mt-2'>Login</button>
                    <hr />
                    <Link to="/register">Click Here to Register</Link>
                </Form>
            </div>
        </div>
    );
}

export default Login;