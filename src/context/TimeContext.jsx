import { createContext, useContext, useState } from "react";

export const TimeContext = createContext();

export const useTime = () => {
    return useContext(TimeContext);
}


export const TimeProvider = ({children}) => {
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [audio, setAudio] = useState(null);

    const addHour = (hr) => {
        setHour(hr);
    };

    const addMin = (newMin) => {
        setMin(newMin);
    };

    const deleteTime = () => {
        setHour(0);
        setMin(0);
    };

    const addAudio = (obj) => {
        setAudio(obj);
    }

    const deleteAudio = () => {
        setAudio();
    }

    return (
        <TimeContext.Provider value={{hour, min, audio, addHour, addMin, deleteTime, addAudio, deleteAudio}}>
            {children}
        </TimeContext.Provider>
    )
};
