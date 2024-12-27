'use client';

import { useReducer } from "react";
import { createContext } from "react";

const reducer = (state, action) => {



    return state;
};

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [ clientDB, dispatch ] = useReducer(reducer, {
        user: undefined
    });

    return (
        <Context.Provider value={{ clientDB, dispatch }}>
            { children }
        </Context.Provider>
    );
};

export default ContextProvider;