import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'
import { connect } from 'react-redux'
import { fire } from '../store/actions/atributo'
import { loadingAtributos } from '../store/actions/loading'

class DialogAtributos extends React.Component {
    state = {
        checked: 'normal',
        visible: false,
    }

    up = () => {
        let { atributos, dado, indice } = this.props
        atributos[indice].dados[dado]++
        this.save(atributos)
    }

    down = () => {
        let { atributos, dado, indice } = this.props
        atributos[indice].dados[dado]--
        this.save(atributos)
    }

    add = () => {
        let { atributos, indice } = this.props
        atributos[indice].dados.push(0)
        this.save(atributos)
        this.props.close()
    }

    del = () => {
        let { atributos, dado, indice } = this.props
        atributos[indice].dados.splice(dado, 1)
        this.save(atributos)
        this.props.close()
    }

    save(atributos) {
        this.props.loadingAtributos(true)
        this.props.onFire(atributos)
    }

    render() {
        const { close, visible, dado, indice, atributos } = this.props
        const dados = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6']
        const arr = atributos[indice].dados
        const valor = arr[dado]
        const atual = dados[valor]
        return (
            <Portal>
                <Dialog onDismiss={close} visible={visible}>
                    <Dialog.Title style={styles.title}> {atributos[indice].label}: {atual} </Dialog.Title>
                    <Dialog.ScrollArea style={{ maxHeight: 180, paddingHorizontal: 0 }}>
                        <ScrollView>
                            <View style={styles.container}>
                                <Button icon="keyboard-arrow-up" mode="outlined"
                                    onPress={this.up} disabled={valor >= 10} >
                                    Aumentar estágio
                                </Button>
                                <Button icon="keyboard-arrow-down" mode="outlined"
                                    onPress={this.down} disabled={valor <= 0} >
                                    Diminuir estágio
                                </Button>
                                <Button icon="add" mode="outlined" onPress={this.add} disabled={arr.length >= 6}>
                                    Adicionar dado
                                </Button>
                                <Button icon="remove" mode="outlined" onPress={this.del} disabled={arr.length <= 0}>
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
        atributos: atributos.atributos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFire: atributos => dispatch(fire(atributos)),
        loadingAtributos: loading => dispatch(loadingAtributos(loading)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAtributos)