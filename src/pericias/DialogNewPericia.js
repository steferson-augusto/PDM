import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Portal, Dialog, TextInput, HelperText } from 'react-native-paper'
import { connect } from 'react-redux'
import { fire } from '../store/actions/pericia'
import { loadingPericias } from '../store/actions/loading'

class DialogNewPericia extends React.Component {
    state = {
        checked: 'normal',
        visible: false,
        label: '',
        error: false
    }

    add = () => {
        if (this.state.label.length < 4) {
            this.setState({error: true})
        } else {
            let { pericias } = this.props
            const obj = { dados: [0], label: this.state.label }
            pericias.push(obj)
            this.props.loadingPericias(true)
            this.props.onFire(pericias)
            this.setState({ label: '' })
            this.props.close()
        }
    }

    render() {
        const { close, visible } = this.props
        const { error } = this.state
        return (
            <Portal>
                <Dialog onDismiss={close} visible={visible} style={{ marginTop: "-50%" }}>
                    <Dialog.Title style={styles.title}>Adicionar Perícia</Dialog.Title>
                    <Dialog.ScrollArea>
                        <ScrollView>
                            <View style={styles.container}>
                                <TextInput style={styles.input}
                                    label='Nome'
                                    placeholder="Nome da perícia"
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
                                    Adicionar
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
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    input: {
        width: '100%',
    },
    button: {
        width: 130,
        marginTop: 15
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogNewPericia)