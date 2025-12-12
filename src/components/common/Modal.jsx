import ReactDOM from 'react-dom';
import {useEffect, useRef} from "react";
import "../../assets/css/marble/modal-marble.css"

export default function Modal({children, isOpen, onClose, message}) {

    const elRef = useRef(null);

    if (!elRef.current && typeof document !== "undefined") {
        const div = document.createElement("div");
        div.className = "modal-portal-container";
        elRef.current = div;
    }

    useEffect(() => {
        const root = document.body; // or document.getElementById("root")
        const el = elRef.current;
        if (!el) return;

        root.appendChild(el);

        return () => {
            root.removeChild(el);
        };
    }, []);



    if (!elRef.current) return null;

    return ReactDOM.createPortal(
        isOpen ? (
            <div className="modal-backdrop" onClick={onClose} >
                <div className="modal-window" onClick={(e) => e.stopPropagation()} >
                    {message && <div className="modal-message">{message}</div>}
                    <button className="modal-close-btn" onClick={onClose}>
                        &times;
                    </button>
                    {children}
                </div>
            </div>
        ) : null,
        elRef.current
    );
}