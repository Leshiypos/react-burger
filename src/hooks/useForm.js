import { useState } from "react";

export function useForm(initialState = {}){
	const [values, setValues] = useState(initialState);

	const handleChange = (event) => {
		const {name, value} = event.target;
		setValues({...values, [name] : value});

	}
	return {values, setValues, handleChange};
}