// import React, { useState, useEffect } from 'react';
// import { getAddressDetailsApiCall } from '../../services/BookService';
// import './AddressCard.css';

// const AddressCard = () => {
//     const [addressList, setAddressList] = useState([]);
//     const [selectedAddress, setSelectedAddress] = useState({ addressLine: '', city: '', state: '' });

//     useEffect(() => {
//         const getAllAddress = async () => {
//             let response = await getAddressDetailsApiCall();
//             setAddressList(response.data.data.address);
//         };
//         getAllAddress();
//     }, []);

//     const handleAddressChange = (type) => {
//         const address = addressList.find((address) => address.type === type);
//         if (address) {
//             setSelectedAddress(address);
//         }
//     };

//     return (
//         <div className="address-container">
//             <div className="address-type-select">
//                 <div className="address-type-option">
//                     <input
//                         type="radio"
//                         id="home"
//                         value="Home"
//                         name="location"
//                         onClick={() => handleAddressChange('home')}
//                     />
//                     <label htmlFor="home">Home</label>
//                 </div>
//                 <div className="address-type-option">
//                     <input
//                         type="radio"
//                         id="office"
//                         value="Office"
//                         name="location"
//                         onClick={() => handleAddressChange('office')}
//                     />
//                     <label htmlFor="office">Office</label>
//                 </div>
//                 <div className="address-type-option">
//                     <input
//                         type="radio"
//                         id="other"
//                         value="Other"
//                         name="location"
//                         onClick={() => handleAddressChange('other')}
//                     />
//                     <label htmlFor="other">Other</label>
//                 </div>
//             </div>

//             <div className="address-new-form">
//                 <div className="address-edit-form">
//                     <div className="address-field">
//                         <label>Address</label>
//                         <input
//                             id="newFullAddress"
//                             className="address-input"
//                             value={selectedAddress.addressLine}
//                             readOnly
//                         />
//                     </div>
//                     <div className="address-city-state">
//                         <div className="address-field">
//                             <label>City/Town</label>
//                             <input
//                                 id="newCity"
//                                 className="address-input"
//                                 value={selectedAddress.city}
//                                 readOnly
//                             />
//                         </div>
//                         <div className="address-field">
//                             <label>State</label>
//                             <input
//                                 id="newState"
//                                 className="address-input"
//                                 value={selectedAddress.state}
//                                 readOnly
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddressCard;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { addItemToAddress, editItemToAddress } from '../../utils/store/AddressSlice';
import './AddressCard.css';

const AddressCard = () => {
  const addressItems = useSelector((store) => store.address.addressItems);
  const [editIndex, setEditIndex] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const dispatch = useDispatch();
//   const cartItems = useSelector((store) => store.cart.cartItems);

  const saveAddress = (index) => {
    const addressObj = {
      type: addressItems[index].selectedAddressType,
      addressLine: document.getElementById(`fullAddress-${index}`).value,
      city: document.getElementById(`city-${index}`).value,
      state: document.getElementById(`state-${index}`).value,
    };
    dispatch(editItemToAddress({ index, addressObj }));
    setEditIndex(null);
  };

  const addNewAddress = () => {
    const addressObj = {
      type: document.querySelector('input[name="location"]:checked')?.value,
      addressLine: document.getElementById('newFullAddress').value,
      city: document.getElementById('newCity').value,
      state: document.getElementById('newState').value,
    };
    // cartItems?._id?.address?.push(addNewAddress);
    dispatch(addItemToAddress(addressObj));
    setShowNewAddressForm(false);
  };

  return (
    <div className='address-card-container'>
      <Button
        className="add-new-address-button"
        variant="outlined"
        onClick={() => setShowNewAddressForm(true)}
      >
        Add New Address
      </Button>
      {addressItems.length > 0 ? (
        addressItems.map((useraddress, index) => (
          <div key={index} className="address-item">
            <div className="address-item-header">
              <div>
                <input type="radio" name="address" defaultChecked />
                <span className="address-type-in">
                  {index + 1}. {useraddress.type}
                </span>
                {editIndex === index ? (
                  <span className="cancel-button" onClick={() => setEditIndex(null)}>
                    Cancel
                  </span>
                ) : (
                  <span className="edit-button" onClick={() => setEditIndex(index)}>
                    Edit
                  </span>
                )}
              </div>
              {editIndex === index && (
                <span className="save-button" onClick={() => saveAddress(index)}>
                  Save
                </span>
              )}
            </div>
            <div className="address-details">
              {editIndex === index ? (
                <div className="edit-address-form">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      id={`fullAddress-${index}`}
                      className="input-field"
                      defaultValue={useraddress.addressLine}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City/Town</label>
                      <input
                        id={`city-${index}`}
                        type="text"
                        className="input-field"
                        defaultValue={useraddress.city}
                      />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input
                        id={`state-${index}`}
                        type="text"
                        className="input-field"
                        defaultValue={useraddress.state}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="address-view">
                  <span className="address-label">Address</span>
                  <span className="address-text">{`${useraddress.addressLine}, ${useraddress.city}, ${useraddress.state}`}</span>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}

      {showNewAddressForm && (
        <div className="new-address-form">
          <div className="form-group">
            <label>Address</label>
            <input id="newFullAddress" className="input-field" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City/Town</label>
              <input id="newCity" className="input-field" />
            </div>
            <div className="form-group">
              <label>State</label>
              <input id="newState" className="input-field" />
            </div>
          </div>
          <div className="form-group">
            <label>Type</label>
            <div className="radio-group">
              <div className="radio-item">
                <input type="radio" id="home" value="Home" name="location" />
                <label htmlFor="home">Home</label>
              </div>
              <div className="radio-item">
                <input type="radio" id="work" value="Work" name="location" />
                <label htmlFor="work">Work</label>
              </div>
              <div className="radio-item">
                <input type="radio" id="others" value="Others" name="location" />
                <label htmlFor="others">Others</label>
              </div>
            </div>
          </div>
          <div className="form-actions">
            <Button
              className="cancel-button"
              variant="outlined"
              onClick={() => setShowNewAddressForm(false)}
            >
              Cancel
            </Button>
            <Button
              className="save-button"
              variant="contained"
              onClick={addNewAddress}
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
