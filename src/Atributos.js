import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Appbar, List, IconButton, TextInput, Snackbar } from 'react-native-paper'
import { atributos } from './services/firebase'
import DialogAtributos from './DialogAtributos'

export default class Atributos extends React.Component {
    state = {
        dados: ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6'],
        atributos: [],
        labels: [],
        expanded: true,
        visible: false,
        dialog: "",
        indice: null,
        snack: {
            status: false,
            text: ''
        }
    }
    async componentDidMount() {
        await this.get()
    }

    _handlePress = () => this.setState({ expanded: !this.state.expanded })

    get = async () => {
        const docRef = atributos

        docRef.get()
            .then(querySnapshot => {
                let atributos = []
                let labels = []
                querySnapshot.data().atributos.map(attr => {
                    atributos[attr.label] = attr.dados
                    labels.push(attr.label)
                })
                this.setState({ atributos, labels })
            })
    }

    _openDialog = (dialog, indice) => {
        this.setState({ visible: true, dialog, indice })
    }

    _closeDialog = () => this.setState({ visible: false, dialog: '' })

    upEstagio = () => {
        const { dialog, indice } = this.state
        let atributo = this.state.atributos
        atributo[dialog][indice]++
        this.saveAtributos(atributo)
    }

    downEstagio = () => {
        const { dialog, indice } = this.state
        let atributo = this.state.atributos
        atributo[dialog][indice]--
        this.saveAtributos(atributo)
    }

    saveAtributos(attrs) {
        const docRef = atributos
        let obj = this.state.labels.map(l => {
            return {
                label: l,
                dados: attrs[l]
            }
        })

        docRef.update({
            atributos: obj
        }).then(() => {
            this.setState({ visible: false, snack: {status: true, text: "Salvo com sucesso"} })
        }).catch(() => {
            this.setState({ visible: false, snack: {status: true, text: "Falha ao salvar as informações"} })
        })
    }

    render() {
        const color = "#2962ff"
        return (
            <View>
                <Appbar.Header style={[{ backgroundColor: color }]}>
                    <Appbar.Content title="Atributos" />
                </Appbar.Header>

                <List.Section>
                    {this.state.labels.map(l => {
                        return (
                            <List.Accordion title={l} key={l}
                                left={props => <List.Icon {...props} icon="help" />}>
                                <View style={styles.listContainer}>
                                    {this.state.atributos[l].map((attr, i) => {
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
                <DialogAtributos visible={this.state.visible} close={this._closeDialog}
                    atributo={this.state.dialog} onUpEstagio={this.upEstagio}
                    onDownEstagio={this.downEstagio} />
                <Snackbar
                    visible={this.state.snack.status}
                    onDismiss={() => this.setState({ snack: {status: false, text: ""} })}
                    duration={Snackbar.DURATION_MEDIUM}
                >
                    {this.state.snack.text}
                </Snackbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%'
    },
    container: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {

    },
    icon: {
        flex: 1
    }
})