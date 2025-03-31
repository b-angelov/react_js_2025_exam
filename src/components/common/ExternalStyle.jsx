import {useEffect} from "react";

export default function ExternalStyle(props) {
    useEffect(() => {
            const {url} = props
            const element = document.createElement(
                "link",
            )
            element.rel = "stylesheet"
            element.href = url
            document.head.appendChild(
                element
            )
        }
        , [])
}