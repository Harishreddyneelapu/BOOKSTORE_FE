// import { useEffect, useState } from "react";
// import { getAddressDetailsApiCall } from "../../services/BookService";

// function AddressCard(){
//     const [addressList, setAddressList] = useState([]);

//     useEffect(()=>{
//         const getAllAddress = async ()=>{
//             let response = await getAddressDetailsApiCall();
//             setAddressList(response.data.data.address)
//         }
//         getAllAddress();
//     },[])
// }
// export default AddressCard;

// import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import { getAddressDetailsApiCall } from '../../services/BookService';
// import './AddressCard.css';

// const AddressCard = () => {
//     const [addressList, setAddressList] = useState([]);
//     const [editIndex, setEditIndex] = useState(null);
//     const [showNewAddressForm, setShowNewAddressForm] = useState(false);

//     useEffect(() => {
//         const getAllAddress = async () => {
//             let response = await getAddressDetailsApiCall();
//             setAddressList(response.data.data.address);
//         };
//         console.log(addressList);
//         getAllAddress();
//     }, []);

//     return (
//         <div className="address-container">
//             <Button
//                 style={{ marginLeft: '750px', marginTop: '-280px', borderRadius: '3px' }}
//                 variant="outlined"
//                 sx={{ color: '#A03037', borderColor: '#A03037' }}
//                 onClick={() => setShowNewAddressForm(true)}
//             >
//                 Add New Address
//             </Button>
//             {addressList.length > 0 ? (
//                 addressList.map((useraddress, index) => (
//                     <div key={index}>
//                         <div className="address-header">
//                             <div className="address-radio">
//                                 <input type="radio" name="address" defaultChecked />
//                                 <span className="address-type">
//                                     {index + 1}. {useraddress.addressType}
//                                 </span>
//                                 {editIndex === index ? (
//                                     <span
//                                         className="address-edit-cancel"
//                                         onClick={() => setEditIndex(null)}
//                                     >
//                                         Cancel
//                                     </span>
//                                 ) : (
//                                     <span
//                                         className="address-edit"
//                                         onClick={() => setEditIndex(index)}
//                                     >
//                                         Edit
//                                     </span>
//                                 )}
//                             </div>
//                             {editIndex === index && (
//                                 <span
//                                     className="address-save"
//                                     onClick={() => setEditIndex(null)}
//                                 >
//                                     Save
//                                 </span>
//                             )}
//                         </div>
//                         <div className="address-details">
//                             {editIndex === index ? (
//                                 <div className="address-edit-form">
//                                     <div className="address-field">
//                                         <span>Address</span>
//                                         <input
//                                             id={`fullAddress-${index}`}
//                                             className="address-input"
//                                             defaultValue={useraddress.fullAddress}
//                                         />
//                                     </div>
//                                     <div className="address-city-state">
//                                         <div className="address-field">
//                                             <label>City/Town</label>
//                                             <input
//                                                 id={`city-${index}`}
//                                                 type="text"
//                                                 className="address-input"
//                                                 defaultValue={useraddress.city}
//                                             />
//                                         </div>
//                                         <div className="address-field">
//                                             <label>State</label>
//                                             <input
//                                                 id={`state-${index}`}
//                                                 type="text"
//                                                 className="address-input"
//                                                 defaultValue={useraddress.state}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <div className="address-display">
//                                     <span>Address</span>
//                                     <span>{`${useraddress.addressLine}, ${useraddress.city}, ${useraddress.state}`}</span>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No address found</p>
//             )}

//             {showNewAddressForm && (
//                 <div className="address-new-form">
//                     <div className="address-edit-form">
//                         <div className="address-field">
//                             <label>Address</label>
//                             <input id="newFullAddress" className="address-input" />
//                         </div>
//                         <div className="address-city-state">
//                             <div className="address-field">
//                                 <label>City/Town</label>
//                                 <input id="newCity" className="address-input" />
//                             </div>
//                             <div className="address-field">
//                                 <label>State</label>
//                                 <input id="newState" className="address-input" />
//                             </div>
//                         </div>
//                         <div className="address-type-select">
//                             <div className="address-type-option">
//                                 <input type="radio" id="home" value="Home" name="location" />
//                                 <label htmlFor="home">Home</label>
//                             </div>
//                             <div className="address-type-option">
//                                 <input type="radio" id="work" value="Work" name="location" />
//                                 <label htmlFor="work">Work</label>
//                             </div>
//                             <div className="address-type-option">
//                                 <input type="radio" id="others" value="Others" name="location" />
//                                 <label htmlFor="others">Others</label>
//                             </div>
//                         </div>
//                         <div className="address-buttons">
//                             <Button
//                                 className="address-cancel-button"
//                                 variant="outlined"
//                                 sx={{ color: '#A03037', borderColor: '#A03037' }}
//                                 onClick={() => setShowNewAddressForm(false)}
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 className="address-save-button"
//                                 variant="contained"
//                                 sx={{ backgroundColor: '#3371B5' }}
//                                 onClick={() => setShowNewAddressForm(false)} 
//                             >
//                                 Save
//                             </Button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
// export default AddressCard;

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
