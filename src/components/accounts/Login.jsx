import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import {useForm} from "../../hooks/useForm.js";
import useAuth from "../../hooks/useAuth.js";
import {useNavigate} from "react-router";
import routes from "../../routes/routes.js";
import {useContext, useState} from "react";
import MainContext from "../../contexts/MainContext.js";
import Modal from "../common/Modal.jsx";
import "../../assets/css/accounts/forms.css"
import Spinner from "../common/Spinner.jsx";


const formValues = {
    username:"",
    password:""
}

export default function Login() {
    const {addStyle} = useOrderedStyles();
    const {login} = useAuth();
    const {setMessage} = useContext(MainContext)
    const [loginMessages, setLoginMessages] = useState("")
    const navigate = useNavigate();

    const loginSubmitHandler = ({username, password}) =>{
        (async ()=> {
            const logged = await login(username, password, setLoginMessages)
            if (logged?.status === 200){
                navigate(routes["home"])
            }else{
                console.log("Login failed")
            }

        })()
    }

    function close(){
        navigate("/")
    }

    const {changeHandler, submitHandler} = useForm(formValues, loginSubmitHandler)
    addStyle('/accounts/forms.css','form-css')

    return (<>
        <Spinner></Spinner>
        <Modal isOpen={true} onClose={close} message={loginMessages}>
        <div className="login">
            <form name="login-form" id="login-form" className="login" method="post" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="id_username">Потребителско име:</label>


                    <input type="text" className="username" name={"username"} autoFocus="" autoCapitalize="none" autoComplete="username"
                           maxLength="150" required="" id="id_username" onChange={changeHandler}/>

                </div>

                <div>
                    <label htmlFor="id_password">Парола:</label>


                    <input type="password" name="password" autoComplete="current-password" required=""
                           id="id_password" onChange={changeHandler}/>


                </div>
                <input type="submit" value="влизане" onSubmit={submitHandler}/>
            </form>
        </div>
        </Modal>
    </>);
}