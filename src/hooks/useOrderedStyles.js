import {useEffect, useState} from "react";
import useExternalStyles from "./useExternalStyles.js";

export default function useOrderedStyles() {
    const [stylesToLoad, setStylesToLoad] = useState({});
    const [loadedStyles, setLoadedStyles] = useState({});

    const {addStyle,setLoadStyles} = useExternalStyles()


    useEffect(() => {
        (async () => {
            for (const [name, style] of Object.entries(stylesToLoad)) {
                const styleData = await import(style);
                setLoadedStyles((prevStyles) => ({
                    ...prevStyles,
                    [name]: styleData,
                }));
            }
            setLoadStyles(true)
        })();
    }, [stylesToLoad]);

    // const addStyle = {}
    return {
        addStyle: (path, name) => {
            if (stylesToLoad.hasOwnProperty(name)){
                return;
            }
            setStylesToLoad((prevStyles) => {return {...prevStyles, [name]:path}});
        },
        loadedStyles,
        addExternalStyle: addStyle,
    };
}