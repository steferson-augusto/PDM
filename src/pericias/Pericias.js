import React from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import { Appbar, List, IconButton, TextInput, Colors, FAB } from 'react-native-paper'
import { connect } from 'react-redux'
import DialogPericias from './DialogPericias'
import DialogNewPericia from './DialogNewPericia'

class Pericias extends React.Component {
    state = {
        expanded: true,
        visible: false,
        visibleNew: false,
        dado: null,
        indice: null,
        snack: {
            status: false,
            text: ''
        }
    }

    _handlePress = () => this.setState({ expanded: !this.state.expanded })

    _openDialogNew = () => this.setState({ visibleNew: true })

    _openDialog = (indice, dado) => this.setState({ visible: true, dado, indice })

    _closeDialog = () => this.setState({ visible: false, visibleNew: false, dado: null })

    render() {
        const dados = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12 +1', 'd12 +2', 'd12 +3', 'd12 +4', 'd12 +5', 'd12 +6']
        const { pericias } = this.props
        return (
            <View>
                <Appbar.Header contentContainerStyle={styles.contentScroll}>
                    <Appbar.Content title="Perícias" />
                    {this.props.loading &&
                        <ActivityIndicator
                            color={Colors.lightBlue100}
                            size={40}
                            style={{ marginRight: 16 }}
                        />
                    }
                </Appbar.Header>
                <View style={{ minHeight: "87%" }}>
                    <FlatList
                        style={{ height: 500 }} //deixar dinamico senão scroll pode não funcionar
                        data={pericias}
                        keyExtractor={(item, index) => `${index}`}
                        renderItem={({ item, index }) => {
                            return (
                                <List.Accordion title={item.label} key={item.label}>
                                    <View style={styles.listContainer}>
                                        {item.dados.map((dado, i) => {
                                            return (
                                                <View key={item.label + i} style={styles.container}>
                                                    <TextInput style={styles.input}
                                                        label={"Dado " + (i + 1)}
                                                        mode='outlined'
                                                        value={dados[dado]}
                                                        disabled={true}
                                                    />
                                                    <IconButton style={styles.icon}
                                                        icon="more-vert"
                                                        size={20}
                                                        onPress={() => this._openDialog(index, i)}
                                                    />
                                                </View>
                                            )
                                        })}
                                    </View>
                                </List.Accordion>
                            )
                        }}
                    />
                    <FAB
                        style={styles.fab}
                        icon="add"
                        onPress={() => this._openDialogNew()}
                    />
                    <DialogNewPericia visible={this.state.visibleNew} close={this._closeDialog} />
                    {this.state.visible &&
                        <DialogPericias visible={this.state.visible} close={this._closeDialog}
                            dado={this.state.dado} indice={this.state.indice} />
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentScroll: {
        padding: 20
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
    },
    container: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 3,
        paddingLeft: 12,
    },
    input: {
        height: 50,
        width: 75,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0
    },
    icon: {
        marginLeft: 0,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.green700
    },
})

const mapStateToProps = ({ pericias, loading }) => {
    return {
        pericias: pericias.pericias,
        loading: loading.pericias
    }
}

export default connect(mapStateToProps, null)(Pericias)