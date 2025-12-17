import {useForm} from "../../hooks/useForm.js";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import AuthContext from "../../contexts/AuthContext.js";
import MainContext from "../../contexts/MainContext.js";
import {useNavigate} from "react-router";
import saintImage from "../../assets/images/articles/saint.webp";


let initialFormValues = {
    title: "",
    content: "",
    image: null,
    saint: [],
    feast: [],
}

export default function RenderArticleForm({method="post",id}) {

    const {api} = useContext(AuthContext)
    const {setMessage} = useContext(MainContext)
    const [feastsAndSaints, setFeastsAndSaints] = useState({feasts:[], saints:[]})
    const [articleData, setArticleData] = useState(initialFormValues)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [currentImege, setCurrentImage] = useState((<img src={saintImage} alt={"current image"} style={{maxWidth:"15rem", height:"auto"}}/>))
    const navigate = useNavigate();

    const defaults = {
        post:{
            url:"api/articles/create",
            func: api.post,
            success:"Статията е създадена успешно!!",
            error:"Грешка при създаване на статията!",
        },
        put:{
            url:`api/articles/${id}/edit`,
            func: api.put,
            success:"Статията е редактирана успешно!!",
            error:"Грешка при редактиране на статията!",
        },
        patch:{
            url:`api/articles/${id}/edit`,
            func: api.patch,
            success:"Статията е редактирана успешно!!",
            error:"Грешка при редактиране на статията!",
        },
        "delete":{
            url:`api/articles/${id}/edit`,
            func: api.delete,
            success:"Статията е изтрита успешно!!",
            error:"Грешка при изтриване на статията!",
        },
    }
    const {url, func, success, error:err} = defaults[method] || defaults["post"];



    const {feasts, saints} = useMemo(() => {
        const feasts = feastsAndSaints.feasts.map((feast) => {
            const selected = articleData?.feast && articleData.feast.map((feast)=>feast.id).includes(feast.id);
            return (<option key={feast.id} value={feast.id} >{feast.name}</option>)
        })
        const saints = feastsAndSaints.saints.map((saint) => {
            const selected = articleData?.saint && articleData.saint.map((saint)=>saint.id).includes(saint.id);
            return (<option key={saint.id} value={saint.id} >{saint.name}</option>)
        })
        return {feasts, saints}
    }, [feastsAndSaints])

    useEffect(() => {
        if(id){
            api.get(url).then(response => {
                const data = response.data;
                setArticleData(data);
                console.log("article data updated")
            }).catch(error => {
                console.error("There was an error fetching the article data!", error);
                setMessage("Грешка при извличане на статията!");
            });
        }
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

    useEffect(() => {
        if(articleData) {
            const {title, content, image,saint,feast} = articleData;
            image && setCurrentImage(<img src={image} alt={"current image"} style={{maxWidth:"15rem", height:"auto"}}/>);
            setFormValues((prev)=>({...prev,title,content}));
        }
    }, [articleData]);

    const submit = async (formData) => {
        const {title,content,image,saint:saint_ids,feast:feast_ids} = formData;

        if (method!=="delete" && (!title || !content)) {
            setMessage("Моля попълнете заглавие и съдържание!");
            return;
        }

        func(url, {title,content,image,saint_ids:saint_ids,feast_ids:feast_ids}, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(response => {
            if(response.status >= 200 && response.status < 300) {
                setMessage(success);
            }else{
                setMessage(err);
            }
            navigate(`/articles/${response.data.id}`);
        }).catch(error => {
            console.error(err, error);
            setMessage(err);
        })
    }


    const {values, changeHandler, submitHandler: handleSubmit, imageRef} = useForm(formValues, submit);
    return (<form method="post" encType={"multipart/form-data"} onSubmit={handleSubmit}>

        <div>
            <label htmlFor="id_title">Title:</label>


            <input value={values.title} disabled={method === "delete"} onChange={changeHandler} type="text" name="title" maxLength="1000" required="" id="id_title"/>

        </div>

        <div>
            <label htmlFor="id_content">Content:</label>


            <textarea value={values.content} disabled={method === "delete"} onChange={changeHandler} name="content" cols="40" rows="10" id="id_content"></textarea>

        </div>

        <div>
            {currentImege}
            <label htmlFor="id_image">Image:</label>


            <input disabled={method === "delete"} onChange={changeHandler} type="file" name="image" accept="image/*" id="id_image" ref={imageRef}/>

        </div>

        <div>
            <label htmlFor="id_saint">Saint:</label>

            <select value={values.saint} disabled={method === "delete"} onChange={changeHandler} name="saint" id="id_saint" multiple={true}>
                {saints}
            </select>

        </div>

        <div>
            <label htmlFor="id_feast">Feast:</label>


            <select value={values.feast} disabled={method === "delete"} onChange={changeHandler} name="feast" id="id_feast" multiple={true}>
                {feasts}
            </select>


        </div>
        <input type="submit" value="изпращане"/>

    </form>)
}