import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Portal, Dialog, TextInput, HelperText, Menu } from 'react-native-paper'
import { connect } from 'react-redux'
import { fire } from '../store/actions/item'
import { loadingItens } from '../store/actions/loading'

class DialogArmazem extends React.Component {
    state = {
        checked: 'normal',
        visible: false,
        label: '',
        error: false,
    }

    componentWillReceiveProps(nextProps) {
        const { armazens, armazem } = nextProps
        let label = ''
        if (armazens[armazem]) {
            label = armazens[label]
        }
        this.setState({ label })
    }

    add = () => {
        if (this.state.label < 4) {
            this.setState({ error: true })
        } else {
            let { armazens, armazem } = this.props
            const { label } = this.state
            if (armazens[armazem]) {
                armazens[armazem].label = label
            } else {
                armazens.push({ label, itens: [] })
            }
            this.props.loadingItens(true)
            this.props.onFire(armazens)
            this.setState({ label: '' })
            this.props.close()
        }
    }

    render() {
        const { close, visible, indice, armazens } = this.props
        const { error, error2 } = this.state
        const title = indice >= 0 ? "EDITAR ARMAZÉM" : "ADICIONAR ARMAZÉM"
        const button = indice >= 0 ? "SALVAR" : "ADICIONAR"
        return (
            <Portal>
                <Dialog onDismiss={close} visible={visible} style={{ marginTop: "-50%" }}>
                    <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                    <Dialog.ScrollArea>
                        <ScrollView>
                            <View style={styles.container}>
                                <TextInput style={styles.nome}
                                    label='Nome'
                                    placeholder="Nome do armazém"
                                    mode='outlined'
                                    value={this.state.label}
                                    onChangeText={label => this.setState({ label })}
                                    error={error}
                                />
                                <HelperText
                                    type="error"
                                    visible={error}
                                >
                                    Tamanho mínimo de 4 caracteres
                                </HelperText>
                                <Button mode="contained" onPress={() => this.add()} style={styles.button}>
                                    {button}
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
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    container: {
        paddingBottom: 23,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    nome: {
        width: '100%',
    },
    button: {
        width: 130,
        marginTop: 15
    }
})

const mapStateToProps = ({ itens }) => {
    return {
        armazens: itens.armazens,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFire: itens => dispatch(fire(itens)),
        loadingItens: loading => dispatch(loadingItens(loading)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogArmazem)