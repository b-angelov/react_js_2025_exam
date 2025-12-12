import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Modal from "../common/Modal.jsx";
import "../../assets/css/accounts/forms.css"
import Spinner from "../common/Spinner.jsx";
import {useForm} from "../../hooks/useForm.js";
import useAuth from "../../hooks/useAuth.js";
import routes from "../../routes/routes.js";

const initialFormValues ={
    username: "",
    password1: "",
    password2: "",
}

export default function Register() {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [submitEnabled, setSubmitEnabled] = useState(false);
    const [message, setMessage] = useState("");
    const [formValues, setFormValues] = useState(initialFormValues);
    const {register} = useAuth();

    function close() {
        navigate(-1);
    }

    function submit(formData){
        console.log(formData)
        register(formData.username, formData.password1, formData.password2,setMessage).then(response=>{
            if (response.status === 201){
                setMessage("Регистрацията е успешена!")
                navigate(routes["profile-page"])
            }
            return response
        }).catch(error=>{
            console.log(error)
            setMessage("Регистрацията се провали!")
        })
    }

    const {changeHandler, submitHandler, values} = useForm(initialFormValues,submit)

    useEffect(()=>{
        if(values?.username?.length > 0 && (values?.password1?.length < 8 || values?.password1 !== values?.password2)){
            setSubmitEnabled(false);
            if(values?.password1 !== values?.password2){
                setMessage("Паролите не съвпадат!");
            } else if(values?.password1.length < 8){
                setMessage("Паролата трябва да е поне 8 символа!");
            }
        } else{
            setMessage("")
            setSubmitEnabled(true);
        }
    },[values])


    return (<>
        <Spinner></Spinner>
        <Modal isOpen={isOpen} onClose={close} message={message}>
        <form method="post" className="login register" onSubmit={submitHandler}>
            <div>
                <label htmlFor="id_username">Потребителско име:</label>

                <input type="text" name="username" maxLength="150" autoCapitalize="none" autoComplete="username"
                       autoFocus="" required="" aria-describedby="id_username_helptext" id="id_username" onChange={changeHandler}/>
            </div>

            <div>
                <label htmlFor="id_password1">Парола:</label>

                <input type="password" name="password1"
                       className="border bg-white font-medium min-w-20 rounded-md shadow-sm text-font-default-light text-sm focus:ring focus:ring-primary-300 focus:border-primary-600 focus:outline-none group-[.errors]:border-red-600 group-[.errors]:focus:ring-red-200 dark:bg-gray-900 dark:border-gray-700 dark:text-font-default-dark dark:focus:border-primary-600 dark:focus:ring-primary-700 dark:focus:ring-opacity-50 dark:group-[.errors]:border-red-500 dark:group-[.errors]:focus:ring-red-600/40 px-3 py-2 w-full max-w-2xl"
                       autoComplete="new-password" aria-describedby="id_password1_helptext" id="id_password1" onChange={changeHandler}/>
            </div>

            <div>
                <label htmlFor="id_password2">Потвърждение на паролата:</label>

                <input type="password" name="password2"
                       className="border bg-white font-medium min-w-20 rounded-md shadow-sm text-font-default-light text-sm focus:ring focus:ring-primary-300 focus:border-primary-600 focus:outline-none group-[.errors]:border-red-600 group-[.errors]:focus:ring-red-200 dark:bg-gray-900 dark:border-gray-700 dark:text-font-default-dark dark:focus:border-primary-600 dark:focus:ring-primary-700 dark:focus:ring-opacity-50 dark:group-[.errors]:border-red-500 dark:group-[.errors]:focus:ring-red-600/40 px-3 py-2 w-full max-w-2xl"
                       autoComplete="new-password" aria-describedby="id_password2_helptext" id="id_password2" onChange={changeHandler}/>
            </div>

            <input type="submit" value="регистриране" disabled={!submitEnabled}/>
        </form>
        </Modal>
        </>
    )
}