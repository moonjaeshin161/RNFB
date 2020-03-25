import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from '@ui-kitten/components'

const BigAvatar = ({ source }) => (
    <Avatar
        style={styles.avatar}
        source={source}
    />
)


export default BigAvatar

const styles = StyleSheet.create({
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 16,
    }
})
