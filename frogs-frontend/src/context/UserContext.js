// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext({
    user: null,
    setUser: () => {},
    business: null,
    setBusiness: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedBusiness = localStorage.getItem('business');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedBusiness) {
            setBusiness(JSON.parse(storedBusiness));
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
        } else {
            localStorage.removeItem('business');
        }
    }, [user, business]);

    return (
        <UserContext.Provider value={{ user, setUser, business, setBusiness }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
