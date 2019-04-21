import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Portal, Dialog, TextInput, HelperText, Menu } from 'react-native-paper'
import { connect } from 'react-redux'
import { fire } from '../store/actions/item'
import { loadingItens } from '../store/actions/loading'

class DialogItem extends React.Component {
    state = {
        checked: 'normal',
        visible: false,
        nome: '',
        qtd: 0,
        peso: 0,
        error: false,
        error2: {
            status: false,
            label: "Quantidade mínima é 1"
        },
        menu: false,
        selecionado: {
            label: '',
            indice: 0
        },
    }

    componentWillReceiveProps(nextProps) {
        const { armazens, armazem, indice } = nextProps
        let nome = ''
        let qtd = 1
        let peso = 0
        let selecionado = { label: '', indice: null }
        const obj = armazens[armazem]
        if (obj) {
            selecionado.label = obj.label
            selecionado.indice = armazem
            if (obj.itens[indice]){
                nome = obj.itens[indice].nome
                peso = obj.itens[indice].peso
                qtd = obj.itens[indice].qtd
            }
        }
        this.setState({ nome, qtd, peso, selecionado })
    }

    add = () => {
        if (this.state.nome.length < 4) {
            this.setState({ error: true })
        } else if (this.state.qtd <= 0) {
            this.setState({ error2: { status: true, label: "Quantidade mínima é 1" } })
        } else if (this.state.peso < 0) {
            this.setState({ error2: { status: true, label: "Peso mínimo é 0" } })
        } else {
            let { armazens, armazem, indice } = this.props
            const { nome, peso, qtd, selecionado } = this.state
            if (armazens[armazem]) {
                if (armazens[armazem].itens[indice]) {
                    armazens[armazem].itens[indice] = { nome, peso: parseFloat(peso), qtd: parseInt(qtd) }
                    if (armazem != selecionado.indice) {
                        const item = armazens[armazem].itens.splice(indice, 1)
                        armazens[selecionado.indice].itens.push(item[0])
                    }
                } else {
                    armazens[armazem].itens.push({ nome, peso, qtd })
                }
                this.props.loadingItens(true)
                this.props.onFire(armazens)
                this.setState({ nome: '', qtd: 1, peso: 0 })
                this.props.close()
            }
        }
    }

    render() {
        const { close, visible, indice, armazens } = this.props
        const { error, error2 } = this.state
        const title = indice >= 0 ? "EDITAR ITEM" : "ADICIONAR ITEM"
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
                                    placeholder="Nome do item"
                                    mode='outlined'
                                    value={this.state.nome}
                                    onChangeText={nome => this.setState({ nome })}
                                    error={error}
                                />
                                <HelperText
                                    type="error"
                                    visible={error}
                                >
                                    Tamanho mínimo de 4 caracteres
                                </HelperText>
                                <TextInput style={styles.qtd}
                                    label='Quantidade' mode='outlined'
                                    placeholder="Quantidade"
                                    value={`${this.state.qtd}`}
                                    onChangeText={qtd => this.setState({ qtd })}
                                    keyboardType={'numeric'}
                                />
                                <TextInput style={styles.qtd}
                                    label='Peso (kg)' mode='outlined'
                                    placeholder="Peso"
                                    value={`${this.state.peso}`}
                                    onChangeText={peso => this.setState({ peso })}
                                    keyboardType={'numeric'}
                                />
                                <HelperText style={styles.nome}
                                    type="error"
                                    visible={error2.status}
                                >
                                    {error2.label}
                                </HelperText>
                                <Menu
                                    visible={this.state.menu}
                                    onDismiss={() => this.setState({ menu: false })}
                                    anchor={
                                        <Button onPress={() => this.setState({ menu: true })}
                                        mode="outlined" style={styles.menu}>
                                            {this.state.selecionado.label}
                                        </Button>
                                    }
                                >
                                    {armazens.map((arm, i) => {
                                        return (
                                            <Menu.Item
                                                onPress={() => this.setState({menu: false, selecionado: {label: arm.label, indice: i}})}
                                                title={arm.label} key={i}
                                            />
                                        )
                                    })}
                                </Menu>
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
    qtd: {
        width: '45%'
    },
    menu: {
        width: 250,
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogItem)