'use client';

import { useReducer, useEffect } from "react";
import { createContext } from "react";

const reducer = (state, action) => {

    console.log('action.type', action.type);
    console.log('action.payload', action.payload);

    if (action.type === 'set_seller')
        return { ...state, seller: action.payload };

    if (action.type === 'remove_seller')
        return { ...state, seller: undefined };
    
    if (action.type === 'set_buyer')
        return { ...state, buyer: action.payload };

    if (action.type === 'remove_buyer')
        return { ...state, buyer: undefined };

    return state;
};

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [ clientDB, dispatch ] = useReducer(reducer, {
        buyer: undefined,
        seller: undefined
    });

    useEffect(() => {
        console.log('clientDB', clientDB);
    });

    return (
        <Context.Provider value={{ clientDB, dispatch }}>
            { children }
        </Context.Provider>
    );
};

export default ContextProvider;