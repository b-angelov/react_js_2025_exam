import {Link, NavLink} from "react-router-dom";
import routes from "../../routes/routes.js";

export default function NavItem(props) {
    const {item} = props;
    const lnk = item.url_internal ? (
        <NavLink to={routes[item.url_internal]} className="dropdown-toggle" data-toggle="dropdown"
              role="button" aria-haspopup="true"
              aria-expanded="false" style={{"text-transform": "capitalize", cursor:"pointer"}}>{item.item_name} <span
            className="caret"></span></NavLink>
    ) : (
        <a href={item.url_external} className="dropdown-toggle" data-toggle="dropdown"
           role="button" aria-haspopup="true"
           aria-expanded="false" style={{"text-transform": "capitalize", cursor:"pointer"}}>{item.item_name} <span
            className="caret"></span></a>
    )

    const lnk2 = item.url_internal ? (
        <li><NavLink to={routes[item.url_internal]} style={{"text-transform": "capitalize", cursor:"pointer"}}>{item.item_name}</NavLink></li>
    ) : (
        <li><a href={item.url_external} style={{"text-transform": "capitalize", cursor:"pointer"}}>{item.item_name}</a></li>
    )

    return item.children.length ? (
        <li className="dropdown">
            {lnk}
            <ul className="dropdown-menu">
                {lnk2}
            </ul>
        </li>
    ) : (
        <>
            {lnk2}
        </>
    );
}