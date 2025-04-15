import {useForm} from "../../hooks/useForm.js";
import {useContext, useEffect, useMemo, useState} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import MainContext from "../../contexts/MainContext.js";
import {useNavigate} from "react-router";

const initialFormValues = {
    title: "",
    content: "",
    image: null,
    saint: [],
    feast: [],
}

export default function ArticleCreate() {

    const {api} = useContext(AuthContext)
    const {setMessage} = useContext(MainContext)
    const [feastsAndSaints, setFeastsAndSaints] = useState({feasts:[], saints:[]})
    const navigate = useNavigate();
    const {feasts, saints} = useMemo(() => {
        const feasts = feastsAndSaints.feasts.map((feast) => {
            return (<option key={feast.id} value={feast.id}>{feast.name}</option>)
        })
        const saints = feastsAndSaints.saints.map((saint) => {
            return (<option key={saint.id} value={saint.id}>{saint.name}</option>)
        })
        return {feasts, saints}
    }, [feastsAndSaints])

    useEffect(() => {
        (async ()=>{
            if(feasts.length && saints.length){return}
            await api.get(`orth_calendar/feasts/`).then(response => {
                const data = response.data;
                setFeastsAndSaints(prevState => ({...prevState, feasts: data}))
                console.log("feasts updated")
            }).catch(error => {
                console.error("There was an error fetching the feasts!", error);
                setMessage("Грешка при извличане на празниците!");
            });
            await api.get(`orth_calendar/saints/`).then(response => {
                const data = response.data;
                setFeastsAndSaints(prevState => ({...prevState, saints: data}))
                console.log("saints updated")
            }).catch(error => {
                console.error("There was an error fetching the saints!", error);
                setMessage("Грешка при извличане на светците!");
            });
        })()
    },[])

    const submit = async (formData) => {

        const {title,content} = formData;

        if (!title || !content) {
            setMessage("Моля попълнете заглавие и съдържание!");
            return;
        }

        api.post(`api/articles/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => {
            console.log(response.data);
            setMessage("Статията е създадена успешно!!");
            navigate(`/articles/${response.data.id}`);
        }).catch(error => {
            console.error("There was an error creating the article!", error);
            setMessage("Грешка при създаване на статията!");
        })
    }


    const {values, changeHandler, submitHandler: handleSubmit} = useForm(initialFormValues, submit);

    return (<form method="post" encType={"multipart/form-data"} onSubmit={handleSubmit}>

        <div>
            <label htmlFor="id_title">Title:</label>


            <input onChange={changeHandler} type="text" name="title" maxLength="1000" required="" id="id_title"/>

        </div>

        <div>
            <label htmlFor="id_content">Content:</label>


            <textarea onChange={changeHandler} name="content" cols="40" rows="10" id="id_content"></textarea>

        </div>

        <div>
            <label htmlFor="id_image">Image:</label>


            <input onChange={changeHandler} type="file" name="image" accept="image/*" id="id_image"/>

        </div>

        <div>
            <label htmlFor="id_saint">Saint:</label>


            <select onChange={changeHandler} name="saint" id="id_saint" multiple={true}>
                {saints}
            </select>

        </div>

        <div>
            <label htmlFor="id_feast">Feast:</label>


            <select onChange={changeHandler} name="feast" id="id_feast" multiple={true}>
                {feasts}
            </select>


        </div>
        <input type="submit" value="изпращане"/>

    </form>)
}