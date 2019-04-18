import React from 'react'
import { View, Text } from 'react-native'
import { Appbar } from 'react-native-paper'

export default class Pericias extends React.Component {

    render() {
        const color = "#00796b"
        return (
            <View>
                <Appbar.Header style={[{ backgroundColor: color }]}>
                    <Appbar.Content title="Perícias"/>
                </Appbar.Header>
                <Text>Perícias</Text>
            </View>
        )
    }
}