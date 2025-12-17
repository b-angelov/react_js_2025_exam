import {useEffect, useRef, useState} from "react";

export function useForm(initialValues, submitCallback) {
    const [values, setValues] = useState(initialValues);
    const imageRef = useRef(null);

    useEffect(() => {
        setValues(prev=>({...prev,...initialValues}));
    },[initialValues])

    const changeHandler = (e) => {

        if ((e.currentTarget.type === "file") && imageRef.current && imageRef.current.files[0]) {
            setValues(prev => {
                    return {
                        ...prev,
                        image: imageRef.current.files[0],
                    }
                }
            );
            return;
        }
        if(e.currentTarget.tagName === "SELECT") {
            const selectedOptions = Array.from(e.currentTarget.selectedOptions).map(option => option.value);
            setValues(prevState => ({
                ...prevState,
                [e.target.name]: selectedOptions,
            }));
            return;
        }

        setValues(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        submitCallback(values);
    };

    return {
        values,
        changeHandler,
        submitHandler,
        imageRef,
    };
}