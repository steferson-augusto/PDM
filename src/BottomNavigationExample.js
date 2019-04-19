import * as React from 'react'
import { connect } from 'react-redux'
import { BottomNavigation } from 'react-native-paper'
import { doc } from 'rxfire/firestore'
import { atributos as attrFire } from './services/firebase'
import { update } from './store/actions/atributo'
import { loadingAtributos } from './store/actions/loading'
import Atributos from './Atributos'
import Itens from './Itens'
import Pericias from './Pericias'

class ButtomNavigationExample extends React.Component {
  static title = 'Bottom Navigation';
  state = {
    index: 0,
    routes: [
      {
        key: 'atributos',
        title: 'Atributos',
        icon: 'fitness-center',
        color: '#2962ff',
      },
      {
        key: 'pericias',
        title: 'Perícias',
        icon: 'build',
        color: '#00796b',
      },
      {
        key: 'itens',
        title: 'Itens',
        icon: 'work',
        color: '#c51162',
      },
    ],
  }

  componentWillMount() {
    doc(attrFire).subscribe(snapshot => {
      let atributos = []
      let labels = []
      let icons = []
      snapshot.data().atributos.map(attr => {
        atributos[attr.label] = attr.dados
        icons[attr.label] = attr.icon
        labels.push(attr.label)
      })
      this.props.onUpdate({atributos, labels, icons})
      this.props.loadingAtributos(false)
    })
  }

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={index => this.setState({ index })}
        renderScene={BottomNavigation.SceneMap({
          atributos: Atributos,
          pericias: Pericias,
          itens: Itens,
        })}
      >
      </BottomNavigation>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onUpdate: atributos => dispatch(update(atributos)),
      loadingAtributos: loading => dispatch(loadingAtributos(loading)),
  }
}

export default connect(null, mapDispatchToProps)(ButtomNavigationExample)