'use client';

import { useReducer, useEffect } from "react";
import { createContext } from "react";

const reducer = (state, action) => {

    console.log('action.type', action.type);
    console.log('action.payload', action.payload);

    if (action.type === 'seller_registered') {
        return { ...state, seller: action.payload };
    };


    return state;
};

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [ clientDB, dispatch ] = useReducer(reducer, {
        user: undefined,
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