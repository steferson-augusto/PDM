import React from 'react'
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Appbar, List, IconButton, TextInput, Colors } from 'react-native-paper'
import { connect } from 'react-redux'
import DialogAtributos from './DialogAtributos'

class Atributos extends React.Component {
    state = {
        expanded: true,
        visible: false,
        dado: null,
        indice: null,
        snack: {
            status: false,
            text: ''
        }
    }

    _handlePress = () => this.setState({ expanded: !this.state.expanded })

    _openDialog = (indice, dado) => this.setState({ visible: true, dado, indice })

    _closeDialog = () => this.setState({ visible: false, dado: null })

    render() {
        const dados = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6']
        const { atributos } = this.props
        return (
            <View>
                <Appbar.Header contentContainerStyle={styles.contentScroll}>
                    <Appbar.Content title="Atributos" />
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
                        data={atributos}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <List.Accordion title={item.label} key={index}
                                    left={props => <List.Icon {...props} icon={item.icon} />}>
                                    <View style={styles.listContainer}>
                                        {item.dados.map((dado, i) => {
                                            return (
                                                <View key={item.label + i} style={styles.container}>
                                                    <TextInput style={styles.input}
                                                        label={`Dado ${i + 1}`}
                                                        mode='outlined'
                                                        value={dados[dado]}
                                                        disabled={true}
                                                    />
                                                    <IconButton style={styles.icon}
                                                        icon="more-vert"
                                                        size={20}
                                                        onPress={() => this._openDialog(index, i)}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </View>
                                </List.Accordion>
                            )
                        }}
                    />
                    {this.state.visible &&
                        <DialogAtributos visible={this.state.visible} close={this._closeDialog}
                            dado={this.state.dado} indice={this.state.indice}
                        />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentScroll: {
        padding: 20
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
    },
    container: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        paddingLeft: 12,
    },
    input: {
        height: 50,
        width: 75,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0
    },
    icon: {
        marginLeft: 0,
    }
})

const mapStateToProps = ({ atributos, loading }) => {
    return {
        atributos: atributos.atributos,
        loading: loading.atributos
    }
}

export default connect(mapStateToProps, null)(Atributos)