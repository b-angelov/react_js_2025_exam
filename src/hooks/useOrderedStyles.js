import {useEffect, useState} from "react";
import useExternalStyles from "./useExternalStyles.js";

export default function useOrderedStyles() {
    const [stylesToLoad, setStylesToLoad] = useState({});
    const [loadedStyles, setLoadedStyles] = useState({});
    const assets = import.meta.glob('../assets/css/**/*');

    const {addStyle,setLoadStyles} = useExternalStyles()


    useEffect(() => {
        (async () => {
            for (const [name, style] of Object.entries(stylesToLoad)) {
                const path = `../assets/css${style}`;
                const importAssets = assets[path];
                const styleData = await importAssets();
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