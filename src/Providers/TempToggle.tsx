import React, { createContext, useState } from 'react';

export const TempContext = createContext({
    unit: 'metric',
    toggleUnit: () => {},
});

function TempToggle({ children }: { children: React.ReactNode }) {
    const [unit, setUnit] = useState('metric');

    const toggleUnit = () => {
        setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
    };

    return (
        <TempContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TempContext.Provider>
    );
}

export default TempToggle;
