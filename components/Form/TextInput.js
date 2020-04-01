import React from 'react'
import { Input } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const TextInput = ({ placeholder, value, name, setInputs, inputs }) => {

    const changeHandler = (value, name) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    return (
        <Input
            style={styles.input}
            placeholder={placeholder}
            value={value}
            onChangeText={(value) => changeHandler(value, name)}
            name={name}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        marginVertical: 5
    }
});

export default TextInput;

