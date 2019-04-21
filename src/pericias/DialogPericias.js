import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'
import { connect } from 'react-redux'
import { fire } from '../store/actions/pericia'
import { loadingPericias } from '../store/actions/loading'

class DialogPericias extends React.Component {
    state = {
        checked: 'normal',
        visible: false,
    }

    up = () => {
        let { pericias, dado, indice } = this.props
        pericias[indice].dados[dado]++
        this.save(pericias)
    }

    down = () => {
        let { pericias, dado, indice } = this.props
        pericias[indice].dados[dado]--
        this.save(pericias)
    }

    add = () => {
        let { pericias, indice } = this.props
        pericias[indice].dados.push(0)
        this.save(pericias)
        this.props.close()
    }

    del = () => {
        let { pericias, dado, indice } = this.props
        pericias[indice].dados.splice(dado, 1)
        this.save(pericias)
        this.props.close()
    }

    rmv = () => {
        let { pericias, indice } = this.props
        pericias.splice(indice, 1)
        this.save(pericias)
        this.props.close()
    }

    save(pericias) {
        this.props.loadingPericias(true)
        this.props.onFire(pericias)
    }

    render() {
        const { close, visible, dado, indice, pericias } = this.props
        const dados = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6']
        const arr = pericias[indice].dados
        const valor = arr[dado]
        const atual = dados[valor]
        return (
            <Portal>
                <Dialog onDismiss={close} visible={visible}>
                    <Dialog.Title style={styles.title}> {pericias[indice].label}: {atual} </Dialog.Title>
                    <Dialog.ScrollArea style={{ maxHeight: 220, paddingHorizontal: 0 }}>
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
                                <Button icon="delete" mode="outlined" onPress={this.rmv}>
                                    Excluir perícia
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

const mapStateToProps = ({ pericias }) => {
    return {
        pericias: pericias.pericias,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFire: pericias => dispatch(fire(pericias)),
        loadingPericias: loading => dispatch(loadingPericias(loading)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPericias)