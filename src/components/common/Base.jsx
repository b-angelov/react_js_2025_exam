import Calendar from "../calendar/Calendar.jsx";
import ExternalStyle from "./ExternalStyle.jsx";
import CopyrightMessage from "./CopyrightMessage.jsx";
import useExternalStyles from "../../hooks/useExternalStyles.js";
import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import Nav from "../navigation/Nav.jsx";
import {Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";
import {useEffect, useState} from "react";
import useReload from "../../hooks/useReload.js";
import routes from "../../routes/routes.js";
import useAPI from "../../hooks/useAPI.js";
import {Link} from "react-router";


export default function Base(){

    const {reload,setReload} = useState(false)
    const {setReloadPage} = useReload()
    const {addStyle,addExternalStyle} = useOrderedStyles();
    addStyle(`/main.css`,'main')
    addExternalStyle(`${import.meta.env.VITE_API_ADDRESS}dstyles/marble/css/`)
    const {context, login, user} = useAuth()
    const reloadCallback = ()=> setReload(!reload)



    useEffect(() => {
        (async () =>{
            await login()
    })();
        setReloadPage("home", reloadCallback)
    }, []);



    return (
        <>
            {/*<ExternalStyle url={`${import.meta.env.VITE_API_ADDRESS}dstyles/marble/css/`}/>*/}
            {/*!--{# here you can add planet image container if you'd like#}--*/}
            <div id="container">
                <div id="container-top-border">

                </div>

                <div id="website">
                    <div id="header-main-wrapper">
                        <div id="header">
                            <Link to={routes["home"]}>
                                <div id="logo">

                                </div>
                            </Link>
                            <div className="user-name">
                                {/*<!--{% if user.is_authenticated %}
                                    <span>{% translate 'you are logged in as: '|capfirst %}{{
                                user
                                .username | capfirst
                            }}</span>
                            {% endif %}-->*/}
                            </div>
                        </div>


                        <div id="user3">
                            <table cellPadding="00" cellSpacing="00" className="pill" align="center"
                                   style={{padding:"0px", margin:"auto",  textAlign:"center", borderCollapse:"collapse",  borderSpacing:0, borderStyle:"none", borderWidth:"0px"}}>
                                <tbody>
                                <tr>
                                    <td className="pwdth">

                                    </td>

                                    <td className="pill_up_border">

                                    </td>

                                    <td className="pwdth">

                                    </td>

                                </tr>

                                <tr>
                                    <td className="pill_l">
                                        &nbsp;
                                    </td>

                                    <td className="pill_m">
                                        <div className="" id="use3">
                                            <Nav/>
                                            {/*<!--{ % nav_render 'navigation/nav.html' 'main-menu' user %}
                                            {% block use3_content %}

                                            {% endblock %}-->*/}
                                        </div>

                                    </td>

                                    <td className="pill_r">
                                        &nbsp;
                                    </td>

                                </tr>
                                </tbody>

                            </table>

                        </div>

                    </div>

                    <div id="content">
                        <div id="style-around">
                            <div id="style-around-column">
                                <div className="images-container-backgrounder">
                                    <div className="images-container-backgrounder-row">
                                        <div className="top-item-backgrounder">

                                        </div>

                                    </div>

                                    <div className="images-container-backgrounder-row">
                                        <div className="main-item-backgrounder main-item-backgrounder-left">

                                        </div>

                                    </div>

                                    <div className="images-container-backgrounder-row">
                                        <div className="bottom-item-backgrounder">

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div id="right-style">
                                <div className="images-container-backgrounder">
                                    <div className="images-container-backgrounder-row">
                                        <div className="top-item-backgrounder">

                                        </div>

                                    </div>

                                    <div className="images-container-backgrounder-row">
                                        <div className="main-item-backgrounder main-item-backgrounder-right">

                                        </div>

                                    </div>

                                    <div className="images-container-backgrounder-row">
                                        <div className="bottom-item-backgrounder">

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div id="left">

                            </div>

                            <div id="component_right">
                                <div className="" id="above-component">
                                    {/*<!--{% if user.is_authenticated %}
                                        <form action="/auth/logout/" id="logout-form" method="post" style="visibility: hidden;">{% csrf_token %}</form>
                                {% endif %}
                                {% block over_main_content %}

                                {% endblock %}-->*/}
                                </div>

                                <div id="component" className="no-component-background" >
                                    <div className="message-container" >
                                        {/*<!--{% block message_content %}
                                        {% for message in messages %}
                                            <div>
                                        {{message}}
                                    </div>
                                    {% endfor %}
                                    {% endblock %}-->*/}
                                    </div>

                                    <div className={`component-wrapper`} >
                                        <Outlet/>
                                        {/*<!--{ % block main_content %}

                                        {% endblock %}-->*/}
                                    </div>

                                </div>

                                <div className="" id="below-component">
                                    {/*<!--{ % block under_main_content %}

                                    {% endblock %}-->*/}
                                </div>

                            </div>


                        </div>

                        <div id="footer">
                            <CopyrightMessage/>
                            {/*<!--{ % block footer_content %}

                            {% endblock %}
                            {% include 'common/copyright-message.html' %}-->*/}

                        </div>

                    </div>

                </div>

                <div id="bottom">

                </div>

            </div>

            {/*<!--</tag|class=div|containerplanetimage>-->*/}

        </>
    );
}