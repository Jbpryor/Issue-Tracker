import React, { useState, useEffect } from "react";
import './user.scss';
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { modifyUser, removeUser } from "../../../Store/Slices/userSlice";
import CountryMenu from "./Country Menu/countryMenu";
import PictureContent from "./Picture Content/pictureContent";
import UserButtons from "./User Buttons/userButtons";

function User() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { userId } = useParams();

    const demoUser = useSelector((state) => state.demoUser);
    const theme = useSelector((state) => state.settings.themes[state.settings.theme]);
    const users = useSelector((state) => state.users);

    const user = users.find((user) => {
        if (typeof user.id === 'string') {
          return user.id === userId;
        } else {
          return user.id.toString() === userId;
        }
    });

    const [ editMode, setEditMode ] = useState(false);
    const [ email, setEmail ] = useState(user.email ? user.email : '');
    const [ street, setStreet ] = useState(user.address && user.address.street ? user.address.street : '');
    const [ city, setCity ] = useState(user.address && user.address.city ? user.address.city : '');
    const [ state, setState ] = useState(user.address && user.address.state ? user.address.state : '');
    const [ zip, setZip ] = useState(user.address && user.address.zip ? user.address.zip : '');
    const [ country, setCountry ] = useState(user.address && user.address.country ? user.address.country : '');

    const [ accountActive, setAccountActive ] = useState(true);
    const [ notificationsActive, setNotificationsActive ] = useState(false);
    const [ passwordActive, setPasswordActive ] = useState(false);
    const [ viewUserButtons, setViewUserButtons ] = useState(true);
    const [, setProfilePicture] = useState(null);

    const handleEdit = () => {
        setEditMode(true);
      };

    const handleCancel = () => {
        setEmail((prevEmail) => user.email || '')
        setStreet((prevStreet) => user.address?.street || ''),
        setCity((prevCity) => user.address?.city || ''),
        setState((prevState) => user.address?.state || ''),
        setZip((prevZip) => user.address?.zip || ''),
        setCountry((prevCountry) => user.address?.country || ''),
        setEditMode(false);
    };

    const saveEditedUser = () => {

        const updatedAddress = {
            street: street,
            city: city,
            state: state,
            zip: zip,
            country: country,
        };
    
        const updatedUser = {
            ...user,
            email: email,
            address: updatedAddress,
        };    
    
        dispatch(modifyUser(updatedUser));    
        setEditMode(false);
        alert('Information Saved!');
    };

    const handleFileSelected = (file) => {
      setProfilePicture(file);
    };

    const handleRemoveUser = () => {
        // this needs a nav to enter password to delete
        dispatch(removeUser(user.id));
        alert('User Deleted');
        navigate('/users');
    };
    

    return (
        <section className="user" style={{ color: theme.font_color, background: theme.background_color }} >
            <div className="user-container">

                <UserButtons setAccountActive={setAccountActive} setNotificationsActive={setNotificationsActive} setPasswordActive={setPasswordActive} viewUserButtons={viewUserButtons} setViewUserButtons={setViewUserButtons} demoUser={demoUser} theme={theme} handleRemoveUser={handleRemoveUser}  />

                <div className={`user-account-container ${accountActive ? 'active' : ''}`}>

                    <div className="user-img-container" style={{ background: theme.primary_color, border: `2px solid ${theme.border}` }} >
                        <PictureContent onFileSelected={handleFileSelected} />
                    </div>

                    <div className="user-info-container" style={{ background: theme.primary_color, border: `2px solid ${theme.border}` }} >
                        <div className="user-full-name-container">
                            <div className="user-full-name-content">
                                <div className="user-full-name title">Full Name:</div>
                                <div className="user-full-name space">
                                    {user.name.first} {user.name.last}
                                </div>
                            </div>
                            <div className="user-email-content">
                                <div className="user-email title">Email:</div>
                                {editMode ? (
                                    <input className="user-email-title" type='email' value={email} onChange={(event) => setEmail(event.target.value)} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} />
                                ) : (
                                    <div className="user-email space">{email}</div>
                                )}
                            </div>
                        </div>
                        <div className="address-container">
                            <div className="address-content">
                                <div className="address title">Address:</div>
                                {editMode ? (
                                    <input className="user-address" type="text" value={street} onChange={(event) => setStreet(event.target.value)} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} />
                                ) : (
                                    <div className="user-address space">{street}</div>
                                )}
                            </div>
                        </div>
                        <div className="city-state-container">
                            <div className="city-content">
                                <div className="city title">City:</div>
                                {editMode ? (
                                    <input className="user-city" type="text" value={city} onChange={(event) => setCity(event.target.value)} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} />
                                ): (
                                    <div className="user-city space">{city}</div>
                                )}
                            </div>
                            <div className="state-content">
                                <div className="state title">State/Province:</div>
                                {editMode ? (
                                    <input className="user-state" type="text" value={state} onChange={(event) => setState(event.target.value)} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} />
                                ): (
                                    <div className="user-state space">{state}</div>
                                )}
                            </div>
                        </div>
                        <div className="zip-country-container">
                            <div className="zip-content">
                                <div className="zip title">Zip Code:</div>
                                {editMode ? (
                                    <input className="user-zip" type="text" value={zip} onChange={(event) => setZip(event.target.value)} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }}  />
                                ) : (
                                    <div className="user-zip space">{zip}</div>
                                )}
                            </div>
                            <div className="country-content">
                                <div className="country title">Country:</div>
                                {editMode ? (
                                    <select id="country" name="address.country" value={country} onChange={(event) => setCountry(event.target.value)} style={{ background: theme.background_color, border: `1px solid ${theme.border}`, color: theme.font_color }} ><CountryMenu /></select>
                                ) : (
                                    <div className="user-country space">{country}</div>
                                )}
                            </div>
           
                        </div>
                        <div className="edit-info-button-container">
                            {editMode ? (
                                <>
                                    <button className="save-info-button" onClick={saveEditedUser} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Save</button>
                                    <button className="cancel-edit-info-button" onClick={handleCancel} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Cancel</button>
                                </>
                            ) : (
                                    <button className="edit-info-button" onClick={handleEdit} style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Edit Information</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className={`user-notifications-container ${notificationsActive ? 'active' : ''}`}>
                    <div className="notifications-content">
                        <div className="notifications-global" style={{ background: theme.primary_color, border: `2px solid ${theme.border}` }} >
                            <div className="notification-content">
                                <div className="notification-title">All Notifications</div>
                                <div className="notification-button-container">
                                    <button className="enable">Enable</button>
                                    <button className="disable">Disable</button>
                                </div>
                            </div>
                            <div className="notification-content">
                                <div className="notification-title">Notification bell icon</div>
                                <div className="notification-button-container">
                                    <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                    <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                </div>
                            </div>
                        </div>
                        <div className="notifications-local" style={{ background: theme.primary_color, border: `2px solid ${theme.border}` }} >
                            <div className="notification-header">Notify me when:</div>
                            <div className="notifications">
                                <div className="notification-content">
                                    <div className="notification-title">new project added</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">new issue added</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">new user added</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">new report added</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue closed</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue status change</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue is commented</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">issue attachment is added</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>
                                <div className="notification-content">
                                    <div className="notification-title">user role change</div>
                                    <div className="notification-button-container">
                                        <button className="enable" style={{ border: `1px solid ${theme.border}`}}>Enable</button>
                                        <button className="disable" style={{ border: `1px solid ${theme.border}`}}>Disable</button>
                                    </div>
                                </div>

                                <div className="notification-save-button-container">
                                    <button className="notifications-save-button" style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Save Changes</button>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`user-password-container ${passwordActive ? 'active' : ''}`} >
                    <div className="user-password-content" style={{ background: theme.primary_color, color: theme.font_color, border: `2px solid ${theme.border}` }}>

                        <div className="title-container">
                            <div className="title-content">
                                <div className="title">Change Password</div>
                                <div className="password-details">Update your password regularly and make sure it is unique from other passwords you use.</div>
                            </div>
                            <div className="password-icon">
                                <i className='bx bxs-lock'></i>
                            </div>
                        </div>

                        <div className="password-content">
                            <div className="current-password">
                                <div className="title">Current Password*</div>
                                <input type="password" style={{ background: theme.background_color, color: theme.font_color }} />
                            </div>
                            <div className="new-password">
                                <div className="title">New Password*</div>
                                <input type="password" style={{ background: theme.background_color, color: theme.font_color }} />
                            </div>
                            <div className="re-enter-password">
                                <div className="title">Re-enter New Password*</div>
                                <input type="password" style={{ background: theme.background_color, color: theme.font_color }} />
                            </div>
                        </div>

                        <div className="new-password-button-container">
                            <button className="new-password-submit-button" style={{ background: theme.background_color, color: theme.font_color, border: `1px solid ${theme.border}` }} >Submit</button>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default User;