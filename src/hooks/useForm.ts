import React, { useState } from "react";

interface TUseForm<T>{
	values: T;
	setValues: (state: T) => void ;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void ;
}

export function useForm<T>(initialState: T): TUseForm<T>{
	const [values, setValues] = useState(initialState);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = event.target;
		setValues({...values, [name] : value});

	}
	return {values, setValues, handleChange};
}