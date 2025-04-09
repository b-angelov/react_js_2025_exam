import {useState} from "react";

export default function useReload() {
    const [reloadPages,setReloadPages] = useState({})
    const def = () => {}

    function setReloadPage(page, reloadCallback){
        setReloadPages((prevState) => {
        if (prevState[page] === reloadCallback) {
            return prevState;
        }
        return {
            ...prevState,
            [page]: reloadCallback,
            default: def,
        }
            })
    }

    const reloadPage = (page) => {
        const pg = reloadPages[page] || reloadPages.default;
        pg && pg();
    }

    return {
        setReloadPage,
        reloadPage,
    }
}