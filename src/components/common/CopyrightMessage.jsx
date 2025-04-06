import punycode from "punycode";

export default function CopyrightMessage() {

    const fullYear = new Date().getFullYear();
    const location = punycode.toUnicode(window.location.toString());

    return (
        <div id="copyright">
            <div className="copyright">
                <div className="copyright-text">
                    <span style={{color:"#ffffff", fontFamily:"Arial"}}>
                        <p>{`${location} ${fullYear} \u00A9`}</p>
                        <p>Всички права запазени</p>
                    </span>
                </div>
            </div>
        </div>
    );
}
