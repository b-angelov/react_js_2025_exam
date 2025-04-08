import punycode from "punycode";
import {useEffect, useState} from "react";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
// import styles from "/src/assets/css/common/copyright.module.css";


export default function CopyrightMessage() {

    const {addStyle,loadedStyles} = useOrderedStyles()
    addStyle(`/src/assets/css/common/copyright.module.css`,'copyright')
    const [styles,setStyles] = useState({})

    useEffect(()=>{
        setStyles(loadedStyles["copyright"] ? loadedStyles["copyright"].default : {})
    },[loadedStyles])

    const fullYear = new Date().getFullYear();
    const location = punycode.toUnicode(window.location.toString());
    const copyrightClass = `copyright-text ${styles['copyright-text']}`

    return (
        <div id="copyright">
            <div className="copyright">
                <div className={copyrightClass}>
                    <span style={{color:"#ffffff", fontFamily:"Arial"}}>
                        <p>{`${location} ${fullYear} \u00A9`}</p>
                        <p>Всички права запазени</p>
                    </span>
                </div>
            </div>
        </div>
    );
}
