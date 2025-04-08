import {useEffect, useState} from "react";

export default function useExternalStyles(){
    const [stylesToLoad, setStylesToLoad] = useState([]);
    const [loadStyles, setLoadStyles] = useState(false);

    useEffect(() => {
        if (!loadStyles) {
            return;
        }
        for (const style of stylesToLoad) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = style;
            document.head.appendChild(link);
        }
    }, [loadStyles]);


    return {
        addStyle: (path) => {
            if (stylesToLoad.includes(path)) {
                return;
            }
            setStylesToLoad((prevStyles) => [...prevStyles, path]);
        },
        setLoadStyles
    };
}