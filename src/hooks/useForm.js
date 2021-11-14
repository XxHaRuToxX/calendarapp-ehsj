import { useState } from 'react';



export const useForm = (initialState={}) => {
    const [valuesForm, setValuesForm] = useState(initialState);

    const reset=()=>{
        setValuesForm(initialState);
    }

    const onChangeValues=(e)=>{
        setValuesForm({
            ...valuesForm,
            [e.target.name]:e.target.value
        })
    }
    
    return [
        valuesForm,
        onChangeValues,
        reset,
    ]
}
