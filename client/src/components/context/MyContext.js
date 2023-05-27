import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [boughts, setBoughts] = useState([]);

    return (
        <MyContext.Provider value={{ cart, setCart ,searchValue,setSearchValue,user, setUser ,boughts, setBoughts}}>
            {children}
        </MyContext.Provider>
    );
};