import React from 'react'
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { Appbar, Colors, List, Divider } from 'react-native-paper'
import { connect } from 'react-redux'
import AtributoHome from './AtributoHome'

class Home extends React.Component {
   
    render() {
        const { armazens, loadingAtributos, loadingPericias, loadingItens, atributos, pericias } = this.props
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Home" />
                    {(loadingAtributos || loadingPericias || loadingItens) &&
                        <ActivityIndicator
                            color={Colors.lightBlue100}
                            size={40}
                            style={{ marginRight: 16 }}
                        />
                    }
                </Appbar.Header>
                <View style={styles.containerCard}>
                    <AtributoHome></AtributoHome>
                </View>
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
    }
})

const mapStateToProps = ({ atributos, pericias, itens, loading }) => {
    return {
        atributos: atributos.atributos,
        pericias: pericias.pericias,
        armazens: itens.armazens,
        loadingAtributos: loading.atributos,
        loadingPericias: loading.pericias,
        loadingItens: loading.itens,
    }
}

export default connect(mapStateToProps, null)(Home)