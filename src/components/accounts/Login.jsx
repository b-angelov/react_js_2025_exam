import useOrderedStyles from "../../hooks/useOrderedStyles.js";
import {useForm} from "../../hooks/useForm.js";
import useAuth from "../../hooks/useAuth.js";
import {useNavigate} from "react-router";
import routes from "../../routes/routes.js";

const formValues = {
    username:"",
    password:""
}

export default function Login() {
    const {addStyle} = useOrderedStyles();
    const {login} = useAuth();
    const navigate = useNavigate();

    const loginSubmitHandler = ({username, password}) =>{
        (async ()=> {
            const logged = await login(username, password)
            console.log(logged)
            if (logged?.status === 200){
                navigate(routes["home"])
            }else{
                console.log("Login failed")
            }

        })()
    }

    const {values, changeHandler, submitHandler} = useForm(formValues, loginSubmitHandler)
    addStyle('/accounts/forms.css','form-css')

    return (<>
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
    </>);
}