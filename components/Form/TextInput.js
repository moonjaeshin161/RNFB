import React from 'react'
import { Input } from '@ui-kitten/components'

const TextInput = ({ placeholder, value, name, setInputs, inputs }) => {

    const changeHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <Input
            placeholder={placeholder}
            value={value}
            onChangeText={(value) => changeHandler(value, name)}
            name={name}
        />
    )
}

export default TextInput;

