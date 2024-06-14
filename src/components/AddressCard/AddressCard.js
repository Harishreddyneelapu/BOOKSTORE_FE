import React, { useState, useEffect } from 'react';
import { getAddressDetailsApiCall } from '../../services/BookService';
import './AddressCard.css';

const AddressCard = () => {
    const [addressList, setAddressList] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({ addressLine: '', city: '', state: '' });

    useEffect(() => {
        const getAllAddress = async () => {
            let response = await getAddressDetailsApiCall();
            setAddressList(response.data.data.address);
        };
        getAllAddress();
    }, []);

    const handleAddressChange = (type) => {
        const address = addressList.find((address) => address.type === type);
        if (address) {
            setSelectedAddress(address);
        }
    };

    return (
        <div className="address-container">
            <div className="address-type-select">
                <div className="address-type-option">
                    <input
                        type="radio"
                        id="home"
                        value="Home"
                        name="location"
                        onClick={() => handleAddressChange('home')}
                    />
                    <label htmlFor="home">Home</label>
                </div>
                <div className="address-type-option">
                    <input
                        type="radio"
                        id="office"
                        value="Office"
                        name="location"
                        onClick={() => handleAddressChange('office')}
                    />
                    <label htmlFor="office">Office</label>
                </div>
                <div className="address-type-option">
                    <input
                        type="radio"
                        id="other"
                        value="Other"
                        name="location"
                        onClick={() => handleAddressChange('other')}
                    />
                    <label htmlFor="other">Other</label>
                </div>
            </div>

            <div className="address-new-form">
                <div className="address-edit-form">
                    <div className="address-field">
                        <label>Address</label>
                        <input
                            id="newFullAddress"
                            className="address-input"
                            value={selectedAddress.addressLine}
                            readOnly
                        />
                    </div>
                    <div className="address-city-state">
                        <div className="address-field">
                            <label>City/Town</label>
                            <input
                                id="newCity"
                                className="address-input"
                                value={selectedAddress.city}
                                readOnly
                            />
                        </div>
                        <div className="address-field">
                            <label>State</label>
                            <input
                                id="newState"
                                className="address-input"
                                value={selectedAddress.state}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;
