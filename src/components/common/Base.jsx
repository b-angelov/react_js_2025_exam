import Calendar from "../calendar/Calendar.jsx";
import ExternalStyle from "./ExternalStyle.jsx";


export default function Base(){
    import(`../../assets/css/main.css`);
    return (
        <>
            <ExternalStyle url={`${import.meta.env.VITE_API_ADDRESS}dstyles/marble/css/`}/>
            {/*!--{# here you can add planet image container if you'd like#}--*/}
            <div id="container">
                <div id="container-top-border">

                </div>

                <div id="website">
                    <div id="header-main-wrapper">
                        <div id="header">
                            <a href="#">
                                <div id="logo">

                                </div>
                            </a>
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
                                            {/*<!--{ % nav_render 'navigation/nav.html' 'main-menu' user %}
                                            {% block use3_content %}

                                            {% endblock %}-->*/}
                                        </div>

                                    </td>

                                    <td className="pill_r">
                                        &nbsp;
                                    </td>

                                </tr>

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

                                <div id="component" className="no-component-background  disable-preview">
                                    <div className="message-container  disable-preview">
                                        {/*<!--{% block message_content %}
                                        {% for message in messages %}
                                            <div>
                                        {{message}}
                                    </div>
                                    {% endfor %}
                                    {% endblock %}-->*/}
                                    </div>

                                    <div className="component-wrapper">
                                        <Calendar />
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