import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Appbar, List, IconButton, TextInput, Snackbar, Colors } from 'react-native-paper'
import { connect } from 'react-redux'
import DialogAtributos from './DialogAtributos'

class Atributos extends React.Component {
    state = {
        dados: ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6'],
        expanded: true,
        visible: false,
        dialog: "",
        indice: null,
        valor: 0,
        snack: {
            status: false,
            text: ''
        }
    }

    _handlePress = () => this.setState({ expanded: !this.state.expanded })

    _openDialog = (dialog, indice) => {
        const atributo = this.props.atributos
        this.setState({ visible: true, dialog, indice, valor: atributo[dialog][indice] })
    }

    _closeDialog = () => this.setState({ visible: false, dialog: '' })

    render() {
        const color = "#2962ff"
        const { atributos, labels, icons } = this.props
        return (
            <View>
                <Appbar.Header style={[{ backgroundColor: color }]}>
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
                    <List.Section style={{ flexWrap: 'wrap' }}>
                        {labels.map(l => {
                            return (
                                <List.Accordion title={l} key={l}
                                    left={props => <List.Icon {...props} icon={icons[l]} />}>
                                    <View style={styles.listContainer}>
                                        {atributos[l].map((attr, i) => {
                                            return (
                                                <View key={l + i} style={styles.container}>
                                                    <TextInput style={styles.input}
                                                        label={"Dado " + (i + 1)}
                                                        mode='outlined'
                                                        value={this.state.dados[attr]}
                                                        disabled={true}
                                                    />
                                                    <IconButton style={styles.icon}
                                                        icon="more-vert"
                                                        size={20}
                                                        onPress={() => this._openDialog(l, i)}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </View>
                                </List.Accordion>
                            )
                        })}
                    </List.Section>
                    {this.state.visible &&
                        <DialogAtributos visible={this.state.visible} close={this._closeDialog}
                            label={this.state.dialog} valor={this.state.valor}
                            onDelDado={this.delDado} indice={this.state.indice} />}
                    <Snackbar
                        visible={this.state.snack.status}
                        onDismiss={() => this.setState({ snack: { status: false, text: "" } })}
                        duration={Snackbar.DURATION_MEDIUM}
                    >
                        {this.state.snack.text}
                    </Snackbar>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerLoading: {
        minHeight: "60%",
        justifyContent: 'center',
        alignItems: 'center'
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
        labels: atributos.labels,
        icons: atributos.icons,
        loading: loading.atributos
    }
}

export default connect(mapStateToProps, null)(Atributos)