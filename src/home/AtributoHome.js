import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { List, Divider, Colors } from 'react-native-paper'
import { connect } from 'react-redux'

class AtributoHome extends React.Component {

    render() {
        const { atributos } = this.props
        const dados = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6']
        const valor = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]
        atributos.map(attr => attr.soma = attr.dados.reduce((soma, d) => soma+valor[d], 0))
        atributos.map(attr => attr.ds = attr.dados.reduce((d, atual) => `${dados[atual]} + ${d}`, ''))
        console.log(atributos)
        return (
            <View style={styles.containerCard}>
                {(atributos.length == 0) &&
                    <List.Item title="Não há atributos cadastrados" titleStyle={styles.semItem} style={styles.item} />
                }
                <FlatList
                    style={{ height: 500 }} //deixar dinamico senão scroll pode não funcionar
                    data={atributos}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <List.Item title={`${item.label}: ${item.soma}`} titleEllipsizeMode='middle'
                                    description={item.ds.substr(0,item.ds.length-2)}
                                    left={props => <List.Icon {...props} color={Colors.indigo400} icon={item.icon} />}
                                />
                                <Divider />
                            </View>
                        )
                    }}
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
    }
})

const mapStateToProps = ({ atributos }) => {
    return {
        atributos: atributos.atributos,
    }
}

export default connect(mapStateToProps, null)(AtributoHome)