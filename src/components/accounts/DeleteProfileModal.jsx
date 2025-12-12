import Modal from "../common/Modal.jsx";
import {useContext} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import MainContext from "../../contexts/MainContext.js";

export default function DeleteProfileModal({isOpen, onClose, profileName, profileId="my"}) {

    const {user, api, setUser, setToken} = useContext(AuthContext);
    const {setMessage} = useContext(MainContext);

    const deleteProfile = async () => {
        try{
            await api.delete(`api/profile/${profileId}/`)
            setUser({})
            setToken(null)
            await setMessage(`Профилът "${user?.username}" е изтрит успешно!`)
        }catch{
            setMessage("Грешка при изтриване на профила!")
        }
        onClose(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <h2>Наистина ли искате да изтриете профил: {profileName} ?</h2>
            <button onClick={deleteProfile}>ДА, изтрий</button>
        </Modal>
    )
}