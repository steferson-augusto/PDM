import React from 'react'
import { View, Text } from 'react-native'
import { Appbar } from 'react-native-paper'

export default class Itens extends React.Component {

    render() {
        const color = "#c51162"
        return (
            <View>
                <Appbar.Header style={[{ backgroundColor: color }]}>
                    <Appbar.Content title="Itens" />
                </Appbar.Header>
                <Text>Itens</Text>
            </View>
        )
    }
}