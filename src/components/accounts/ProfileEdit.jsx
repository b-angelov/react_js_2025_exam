import {useContext, useEffect, useState} from "react";
import authContext from "../../contexts/AuthContext.js";
import {useForm} from "../../hooks/useForm.js";
import MainContext from "../../contexts/MainContext.js";


let initialFormValues = {
    first_name: "",
    last_name: "",
    email:"",
    description: "",
    image: null,
    birth_date: "",
    profile:{
        description: "",
        image: null,
        birth_date: "",
    },
}

export default function ProfileEdit() {

    const {user, api, setUser} = useContext(authContext)
    const {setMessage} = useContext(MainContext)
    const [profileData, setProfileData] = useState(initialFormValues)

    useEffect(() => {
        setProfileData(prev=>({...user, ...user?.profile}))
    }, [user]);


    const submit = (formValues)=>{
        const {first_name, last_name,email,description,image,birth_date} = formValues;
        console.log(formValues)
        const data = {first_name, last_name,email,profile:{description, birth_date}};
        const img = {image}
        console.log(data)
        api.patch("api/profile/my/", data)
            .then(response=>{
                return api.patch("api/profile/my/", img, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            })
            .then(response=>{
            setUser(prev=>({...prev, ...response.data}));
            setMessage(`Профилът е обновен успешно!`)
        }).catch(error=>{
            setMessage(`Грешка при обновяване на профила`)
            console.log(error.message);
        })
    }

    const {values, changeHandler, submitHandler, imageRef} = useForm(profileData, submit);

    return (
        <>
            <form action="" method="post" encType="multipart/form-data" className="site-form" onSubmit={submitHandler}>
                <div>
                    <label htmlFor="id_description">Описание:</label>


                    <textarea value={values.description} onChange={changeHandler} name="description" cols="40" rows="10" maxLength="3000" id="id_description"></textarea>

                </div>

                <div>
                    <label htmlFor="id_image">Изображение:</label>


                    Сега: <a href="#">
                    <img src={values.image} alt="няма изображение" style={{maxWidth:"20vw", maxHeight:"20vh"}}/></a>
                    <input type="checkbox"  onChange={changeHandler} name="image-clear" id="image-clear_id"/>
                    <label htmlFor="image-clear_id">Изчисти</label><br/>
                    Промени:
                    <input type="file" onChange={changeHandler} name="image" accept="image/*" id="id_image" ref={imageRef}/>

                </div>

                <div>
                    <label htmlFor="id_first_name">Име:</label>
                    <input type="text" onChange={changeHandler} value={values.first_name} name={"first_name"} id={"id_first_name"} />
                    <label htmlFor="id_last_name">Фамилия:</label>
                    <input type="text" onChange={changeHandler} value={values.last_name} name={"last_name"} id={"id_last_name"} />
                    <label htmlFor="id_birth_date">Рождена дата:</label>
                    <input type="text" onChange={changeHandler} name="birth_date" name={"birth_date"} value={values.birth_date} id="id_birth_date"/>
                    <label htmlFor="id_email">Имейл:</label>
                    <input type="email" onChange={changeHandler} name="email" value={values.email} id="id_email"/>


                </div>
                <input type="submit" value="изпращане"/>
            </form>
        </>
    )
}