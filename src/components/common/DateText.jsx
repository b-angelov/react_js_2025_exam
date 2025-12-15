import {useState} from "react";

export default function DateText({ children, value, onChange }) {
    const [editing, setEditing] = useState(false);

    return editing ? (<>
        <input
            type="date"
            value={value || new Date()}
            autoFocus
            onFocus={()=>{  }}
            style={{
                appearance: "none",
                "-webkit-appearance": "none",
                background: "none",
                border: "none 0px !important"
            }}
            onChange={e => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
        />
        {children || value || "—"}
        </>
    ) : (
        <span
            role="button"
            tabIndex={0}
            onClick={() => setEditing(true)}
            onKeyDown={e => e.key === "Enter" && setEditing(true)}
        >
      {children || value || "—"}
    </span>
    );
}
