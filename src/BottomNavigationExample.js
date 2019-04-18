/* @flow */

import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Atributos from './Atributos'
import Itens from './Itens'
import Pericias from './Pericias'

export default class ButtomNavigationExample extends React.Component {
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
  };

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
    
    );
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
  },
  item: {
    height: Dimensions.get('window').width / 2,
    width: '50%',
    padding: 4,
  },
  photo: {
    flex: 1,
    resizeMode: 'cover',
  },
});
