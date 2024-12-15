import React from 'react';
import {Button, Dropdown, Row, Col} from 'antd';

function DefaultLayout(props) {
    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const items = [
        {
            key: '1',
            label: (
                <a  href="/" style={{ textDecoration: 'none' }}>
                    Home
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <span onClick={handleLogout} style={{cursor: 'pointer'}}>
                    Logout
                </span>
            ),
        },
    ];
    return (
        <div>
            <div className="header bs1">
                <Row gutter={16} justify={'center'}>
                    <Col lg={20} sm={24} xs={24}>
                        <div className="d-flex justify-content-between align-items-center">

                            <h1>LuxuryCarRental</h1>

                            <Dropdown
                                menu={{
                                    items,
                                }}
                                placement="bottom"
                                arrow
                            >
                                <Button>{user?.username}</Button>
                            </Dropdown>

                        </div>
                    </Col>
                </Row>

            </div>
            <div className="content">
                {props.children}
            </div>
        </div>
    );
}

export default DefaultLayout;
