import React from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import {
    Button,
    Portal,
    Dialog,
} from 'react-native-paper';

export default class DialogAtributos extends React.Component {
    state = {
        checked: 'normal',
    }

    render() {
        const { visible, close, atributo, onUpEstagio, onDownEstagio, valor, onAddDado, onDelDado } = this.props
        return (
            <Portal>
                <Dialog onDismiss={close} visible={visible}>
                    <Dialog.Title style={styles.title}> {atributo} </Dialog.Title>
                    <Dialog.ScrollArea style={{ maxHeight: 170, paddingHorizontal: 0 }}>
                        <ScrollView>
                            <View style={styles.container}>
                                <Button icon="keyboard-arrow-up" mode="outlined" 
                                onPress={onUpEstagio} disabled={valor==10} >
                                    Aumentar estágio
                                </Button>
                                <Button icon="keyboard-arrow-down" mode="outlined"
                                onPress={onDownEstagio} disabled={valor==0} >
                                    Diminuir estágio
                                </Button>
                                <Button icon="add" mode="outlined" onPress={onAddDado}>
                                    Adicionar dado
                                </Button>
                                <Button icon="remove" mode="outlined" onPress={onDelDado}>
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
});
