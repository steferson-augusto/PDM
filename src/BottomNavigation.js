import React from 'react'
import { connect } from 'react-redux'
import { BottomNavigation } from 'react-native-paper'
import { doc } from 'rxfire/firestore'
import { atributos as attrFire, pericias as periciaFire, armazens as itemFire } from './services/firebase'
import { update as updateAtributos } from './store/actions/atributo'
import { update as updatePericias } from './store/actions/pericia'
import { update as updateItens } from './store/actions/item'
import { loadingAtributos, loadingPericias, loadingItens } from './store/actions/loading'
import Atributos from './atributos/Atributos'
import Itens from './itens/Itens'
import Pericias from './pericias/Pericias'

class BottomNavigationMenu extends React.Component {
  static title = 'Bottom Navigation'
  state = {
    index: 0,
    routes: [
      {
        key: 'atributos',
        title: 'Atributos',
        icon: 'person',
      },
      {
        key: 'pericias',
        title: 'Perícias',
        icon: 'build',
      },
      {
        key: 'itens',
        title: 'Itens',
        icon: 'work',
      },
    ],
  }

  componentWillMount() {
    doc(attrFire).subscribe(snapshot => {
      const atributos = snapshot.data().atributos
      this.props.onUpdateAtributos({atributos})
      this.props.loadingAtributos(false)
    })

    doc(periciaFire).subscribe(snapshot => {
      const desordenado = snapshot.data().pericias
      const pericias = desordenado.sort((a,b) => a.label < b.label ? -1 : a.label > b.label ? 1 : 0)
      this.props.onUpdatePericias({pericias})
      this.props.loadingPericias(false)
    })

    doc(itemFire).subscribe(snapshot => {
      const armazens = snapshot.data().armazem
      this.props.onUpdateItens({armazens})
      this.props.loadingItens(false)
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
      onUpdateAtributos: atributos => dispatch(updateAtributos(atributos)),
      onUpdatePericias: pericias => dispatch(updatePericias(pericias)),
      onUpdateItens: itens => dispatch(updateItens(itens)),
      loadingAtributos: loading => dispatch(loadingAtributos(loading)),
      loadingPericias: loading => dispatch(loadingPericias(loading)),
      loadingItens: loading => dispatch(loadingItens(loading)),
  }
}

export default connect(null, mapDispatchToProps)(BottomNavigationMenu)