import React from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { Appbar, Colors, List, Divider, FAB } from 'react-native-paper'
import { connect } from 'react-redux'
import DialogItem from './DialogItem'
import DialogArmazem from './DialogArmazem'

class Itens extends React.Component {
    state = {
        visibleItem: false,
        armazem: null,
        item: null,
        visibleArmazem: false,
    }

    _closeDialog = () => this.setState({ visibleItem: false, visibleArmazem: false })

    render() {
        const { armazens } = this.props
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Itens" />
                    {this.props.loading &&
                        <ActivityIndicator
                            color={Colors.lightBlue100}
                            size={40}
                            style={{ marginRight: 16 }}
                        />
                    }
                    <FAB small
                        style={styles.fabHeader}
                        icon="add"
                        onPress={() => this.setState({ visibleArmazem: true, armazem: null })}
                    />
                </Appbar.Header>
                <View style={styles.containerCard}>
                    <FlatList
                        style={{ height: 500 }} //deixar dinamico senão scroll pode não funcionar
                        data={armazens}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <List.Accordion
                                    title={`${item.label} - ${item.itens.reduce((soma, a) => soma + (a.peso * a.qtd), 0)} kg`}
                                    key={item.label}
                                >
                                    <View style={styles.container}>
                                        {item.itens.length <= 0 &&
                                            <List.Item title="Não há itens neste armazém" titleStyle={styles.semItem} style={styles.item} />
                                        }
                                        {item.itens.map((it, i) => {
                                            return (
                                                <View key={i} style={styles.item}>
                                                    <List.Item title={it.nome}
                                                        description={`Quantidade: ${it.qtd} - Peso unitário: ${it.peso} kg`}
                                                        titleEllipsizeMode='middle'
                                                        onPress={() => this.setState({ visibleItem: true, armazem: index, item: i })}
                                                    />
                                                    <Divider />
                                                </View>
                                            )
                                        })}
                                        <View style={styles.containerFAB}>
                                            <FAB small
                                                style={[styles.fab, {backgroundColor: Colors.green700}]}
                                                icon="add"
                                                onPress={() => this.setState({ visibleItem: true, armazem: index, item: null })}
                                            />
                                            <FAB small 
                                                style={[styles.fab, {backgroundColor: Colors.yellow500}]}
                                                icon="create"
                                                onPress={() => this.setState({ visibleArmazem: true, armazem: index })}
                                            />
                                        </View>
                                    </View>
                                </List.Accordion>
                            )
                        }}
                    />
                </View>
                <DialogItem visible={this.state.visibleItem} close={this._closeDialog}
                    armazem={this.state.armazem} indice={this.state.item}
                />
                <DialogArmazem visible={this.state.visibleArmazem}
                    close={this._closeDialog} armazem={this.state.armazem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerCard: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 11
    },
    container: {
        alignItems: 'center',
    },
    item: {
        width: '100%'
    },
    semItem: {
        color: "#999"
    },
    fab: {
        margin: 9,
    },
    fabHeader: {
        margin: 11,
        backgroundColor: Colors.green300,
    },
    containerFAB: {
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

const mapStateToProps = ({ itens, loading }) => {
    return {
        armazens: itens.armazens,
        loading: loading.itens
    }
}

export default connect(mapStateToProps, null)(Itens)