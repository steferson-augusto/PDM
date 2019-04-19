import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'
import { connect } from 'react-redux'
import { update, fire } from './store/actions/atributo'
import { loadingAtributos } from './store/actions/loading'

class DialogAtributos extends React.Component {
    state = {
        checked: 'normal',
        visible: false,
    }

    upEstagio = () => {
        let { atributos, label, indice } = this.props
        atributos[label][indice]++
        this.saveAtributos(atributos)
    }

    downEstagio = () => {
        let { atributos, label, indice } = this.props
        atributos[label][indice]--
        this.saveAtributos(atributos)
    }

    addDado = () => {
        let { atributos, label } = this.props
        atributos[label].push(0)
        this.saveAtributos(atributos)
        this.props.close()
    }

    delDado = () => {
        let { atributos, label, indice } = this.props
        atributos[label].splice(indice, 1)
        this.saveAtributos(atributos)
        this.props.close()
    }

    saveAtributos(attrs) {
        this.props.loadingAtributos(true)
        let obj = this.props.labels.map(l => {
            return {
                label: l,
                dados: attrs[l]
            }
        })
        this.props.onFire(obj)
    }

    render() {
        const { close, visible, label, indice, atributos } = this.props
        const dados = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6']
        const arr = atributos[label]
        const valor = arr[indice]
        const atual = dados[valor]
        return (
            <Portal>
                <Dialog onDismiss={close} visible={visible}>
                    <Dialog.Title style={styles.title}> {label}: {atual} </Dialog.Title>
                    <Dialog.ScrollArea style={{ maxHeight: 180, paddingHorizontal: 0 }}>
                        <ScrollView>
                            <View style={styles.container}>
                                <Button icon="keyboard-arrow-up" mode="outlined"
                                    onPress={this.upEstagio} disabled={valor >= 10} >
                                    Aumentar estágio
                                </Button>
                                <Button icon="keyboard-arrow-down" mode="outlined"
                                    onPress={this.downEstagio} disabled={valor <= 0} >
                                    Diminuir estágio
                                </Button>
                                <Button icon="add" mode="outlined" onPress={this.addDado} disabled={arr.length >= 6}>
                                    Adicionar dado
                                </Button>
                                <Button icon="remove" mode="outlined" onPress={this.delDado} disabled={arr.length <= 0}>
                                    Remover dado
                                </Button>
                            </View>
                        </ScrollView>
                    </Dialog.ScrollArea>
                </Dialog>
            </Portal>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    container: {
        paddingBottom: 23
    }
})

const mapStateToProps = ({ atributos }) => {
    return {
        atributos: atributos.atributos,
        labels: atributos.labels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: atributos => dispatch(update(atributos)),
        onFire: atributos => dispatch(fire(atributos)),
        loadingAtributos: loading => dispatch(loadingAtributos(loading)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAtributos)