import "../../assets/css/articles/article.css";
import user_icon from "../../assets/images/users/default_user.png";
import get_age from "../../utils/get_age.js";
import AuthContext from "../../contexts/AuthContext.js";
import React, {useContext, useEffect} from "react";
import capitalize from "../../utils/capitalize.js";
import {Link} from "react-router-dom";
import routes from "../../routes/routes.js";
import DeleteProfileModal from "./DeleteProfileModal.jsx";
import {useParams} from "react-router";


export default function UserProfile() {

    const [user, setUser] = React.useState({});
    const {user:me, is_admin,is_superuser} = useContext(AuthContext);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const {api} = useContext(AuthContext);
    const {id} = useParams();

    useEffect(() => {
        api.get(`api/profile/${id}/`).then(response => {
            setUser({...response.data});
        }).catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, []);

    return (
        <section className="single-article">
            <p style={{"textTransform": "capitalize"}}>{"Потребителски профил:"}</p>
            <article>
                <header>
                    <figure>
                        <img src={user?.profile?.image || user_icon} alt={"user picture"}/>
                    </figure>
                    {/*<a href="{% url 'profile-edit-page' %}">*/}
                    {/*    <button>{% translate 'edit' %}</button>*/}
                    {/*</a>*/}
                    {/*<a href="{% url 'profile-delete-page' %}">*/}
                    {/*    <button>{% translate 'delete' %}</button>*/}
                    {/*</a>*/}
                    {user?.username && (<>
                        <h1>{"Потребителско име"}</h1>
                        <p>{user?.username}</p>
                    </>)
                    }
                    {(user?.first_name || user?.last_name) && (<>
                            <h2>{"Имена"}</h2>
                            <p>{capitalize(user?.first_name)} {capitalize(user?.last_name)}</p></>
                    )
                    }
                    {user?.profile?.birth_date && (<>
                        <h2>{"Възраст"}</h2>
                        <p>{get_age(user?.profile?.birth_date)}</p>
                    </>)
                    }
                </header>
                <main>
                    {user?.profile?.description && (
                        <>
                            <h1>{"Описание"}</h1>
                            <p>{user?.profile?.description}</p>
                        </>
                    )}
                    {(((me?.user_id && id) && (me?.user_id == id)) || is_admin() || is_superuser()) &&
                        (<nav>
                        <ul>
                            <li>
                                <span to={routes["profile-delete-page"]} onClick={e=> {
                                    e.stopPropagation()
                                    setShowDeleteModal(true)
                                }} data-discover="true" style={{cursor:"pointer"}}></span>
                                <DeleteProfileModal isOpen={showDeleteModal} onClose={setShowDeleteModal} profileName={user?.username}></DeleteProfileModal>
                            </li>
                            <li>
                                <Link to={routes["profile-edit-page"]} onClick={e=>e.stopPropagation()} data-discover="true"></Link>
                            </li>
                        </ul>
                    </nav>)}
                </main>
                {user?.email && (<>
                    <h2>{"Имейл"}</h2>
                    {user?.email}
                </>)}
            </article>
        </section>
    )
}