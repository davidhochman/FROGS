// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
    user: null,
    setUser: () => {},
    business: null,
    setBusiness: () => {},
    profileView: null,
    setProfileView: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [profileView, setProfileView] = useState(null);


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedBusiness = localStorage.getItem('business');
        const storedProfile = localStorage.getItem('profileView');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedBusiness) {
            setBusiness(JSON.parse(storedBusiness));

        }
        if (storedProfile) {
            setProfileView(JSON.parse(storedProfile));
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        if (business) {
            localStorage.setItem('business', JSON.stringify(business));
        }  else {
            localStorage.removeItem('business');
        }
        if (profileView) {
            localStorage.setItem('profileView', JSON.stringify(profileView))
        } else {
            localStorage.removeItem('profileView')
        }
    }, [user, business, profileView]);

    return (
        <UserContext.Provider value={{ user, setUser, business, setBusiness, profileView, setProfileView}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
