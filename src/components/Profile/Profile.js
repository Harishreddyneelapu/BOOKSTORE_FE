import React from 'react';
import { Link } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import './Profile.css';

function Profile() {
    return (
        <>
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-breadcrumb">
                        <Link to={'/dashboard/allBooks'} className="profile-home-link">Home /</Link>
                        <span> Profile</span>
                    </div>
                    <div className="profile-details">
                        <h1 className="profile-title">Personal Details</h1>
                        <div className="profile-info">
                            <div className="profile-info-item">
                                <label>Full Name</label>
                                <span className="profile-info-value">Harish Reddy</span>
                            </div>
                            <div className="profile-info-item">
                                <label>Email Id</label>
                                <span className="profile-info-value">test@gmail.com</span>
                            </div>
                            <div className="profile-info-item">
                                <label>Mobile Number</label>
                                <span className="profile-info-value">9701939346</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-address">
                <AddressCard />
            </div>
        </>
    );
}

export default Profile;
