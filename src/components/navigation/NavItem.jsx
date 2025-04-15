import {Link, NavLink} from "react-router-dom";
import routes from "../../routes/routes.js";
import {useState} from "react";

export default function NavItem(props) {
    const {item} = props;
    const [dropdown, setDropdown] = useState(false);
    let children = null;
    const lnk = item.url_internal ? (
        <NavLink to={routes[item.url_internal]} className="dropdown-toggle" data-toggle="dropdown"
              role="button" aria-haspopup="true"
              aria-expanded="false" style={{"textTransform": "capitalize", cursor:"pointer"}}>{item.item_name} <span
            className="caret"></span></NavLink>
    ) : (
        <a href={item.url_external} className="dropdown-toggle" data-toggle="dropdown"
           role="button" aria-haspopup="true"
           aria-expanded="false" style={{"textTransform": "capitalize", cursor:"pointer"}}>{item.item_name} <span
            className="caret"></span></a>
    )

    const lnk2 = item.url_internal ? (
        <li><NavLink to={routes[item.url_internal]} style={{"textTransform": "capitalize", cursor:"pointer"}}>{item.item_name}</NavLink></li>
    ) : (
        <li><a href={item.url_external} style={{"textTransform": "capitalize", cursor:"pointer"}}>{item.item_name}</a></li>
    )

    if(item?.children?.length) {
        children = item.children.map((child, idx) => {
            return (<NavItem key={child.url_internal+idx} item={child}/>)
        });
    }

    return item?.children?.length ? (
        <li className="dropdown" onMouseOver={()=>setDropdown(true)} onMouseLeave={()=>setDropdown(false)}>
            {lnk}
            <ul className="dropdown-menu" style={{display: dropdown ? "flex" : "none"}}>
                {children}
            </ul>
        </li>
    ) : (
        <>
            {lnk2}
        </>
    );
}