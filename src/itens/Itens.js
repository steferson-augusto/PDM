import React from 'react'
import { View, FlatList, ActivityIndicator, Text } from 'react-native'
import { Appbar, Colors } from 'react-native-paper'
import { connect } from 'react-redux'

class Itens extends React.Component {

    render() {
        // const color = "#c51162"
        const { armazens } = this.props
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Itens" />
                    {this.props.loading &&
                        <ActivityIndicator
                            color={Colors.lightBlue100}
                            size={40}
                            style={{ marginRight: 16 }}
                        />
                    }
                </Appbar.Header>
                <View>
                    <FlatList
                        style={{ height: 500 }} //deixar dinamico senão scroll pode não funcionar
                        data={armazens}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <Text>{item.label}</Text>
                            )
                        }}
                    />
                </View>

            </View>
        )
    }
}

const mapStateToProps = ({ itens, loading }) => {
    return {
        armazens: itens.armazens,
        loading: loading.itens
    }
}

export default connect(mapStateToProps, null)(Itens)