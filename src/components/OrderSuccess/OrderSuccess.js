import React from 'react';
import popperhead from '../../assets/popper_head.svg';
import popperfoot from '../../assets/popper_foot.svg';
import { Link } from 'react-router-dom';
import './OrderSuccess.css';

function OrderSuccess() {
    return (
        <div className="success-success-container">
            <img src={popperhead} alt="popperHead" className="success-popper-head" />
            <h1 className="success-success-title">Order Placed Successfully</h1>
            <img src={popperfoot} alt="popperFoot" className="success-popper-foot" />
            <p className="success-success-message">
                <span className="success-success-highlight">Hurray!!!</span> your order is confirmed. The order id is #123456. Save the order id for further communication.
            </p>
            <table className="success-contact-table">
                <thead>
                    <tr className="success-contact-header">
                        <th className="success-contact-email">Email us</th>
                        <th className="success-contact-phone">Contact us</th>
                        <th className="success-contact-address">Address</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="success-contact-email-data">admin@bookstore.com</td>
                        <td className="success-contact-phone-data">+91 8163475881</td>
                        <td className="success-contact-address-data">42, 14th Main, 15th Cross, Sector 4, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034</td>
                    </tr>
                </tbody>
            </table>
            <Link to="/dashboard/allBooks" className="success-continue-button">Continue shopping</Link>
        </div>
    );
}

export default OrderSuccess;
