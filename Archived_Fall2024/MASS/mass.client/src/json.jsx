import React, { createContext, useContext, useState } from 'react';

const JSONContext = createContext();

export const JSONProvider = ({ children }) => {
    const [data, setData] = useState({ key: "value" });

    return (
        <JSONContext.Provider value={{ data, setData }}>
            {children}
        </JSONContext.Provider>
    );
};

export const useJSON = () => useContext(JSONContext);

// Wrap your app in the provider
// <JSONProvider><App /></JSONProvider>
