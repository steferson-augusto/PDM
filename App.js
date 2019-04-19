/* @flow */

import { KeepAwake } from 'expo'
import * as React from 'react'
import { Provider } from 'react-redux'
import { StatusBar, I18nManager, AsyncStorage } from 'react-native'
import { Provider as PaperProvider, DarkTheme, DefaultTheme } from 'react-native-paper'
import createReactContext from 'create-react-context'

import ButtomNavigationExample from './src/BottomNavigationExample'
import storeComfig from './src/store/storeConfig'

const store = storeComfig()
const PreferencesContext = createReactContext();

export default class PaperExample extends React.Component {
  state = {
    theme: DefaultTheme,
    rtl: I18nManager.isRTL,
  }

  async componentDidMount() {
    StatusBar.setBarStyle('light-content')

    try {
      const prefString = await AsyncStorage.getItem('preferences');
      const preferences = JSON.parse(prefString);

      if (preferences) {
        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState(state => ({
          theme: preferences.theme === 'dark' ? DarkTheme : DefaultTheme,
          rtl:
            typeof preferences.rtl === 'boolean' ? preferences.rtl : state.rtl,
        }));
      }
    } catch (e) {
      // ignore error
    }
  }

  async componentWillMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={this.state.theme}>
          <PreferencesContext.Provider
            value={{
              theme: this._toggleTheme,
              rtl: this._toggleRTL,
              isRTL: this.state.rtl,
              isDarkTheme: this.state.theme === DarkTheme,
            }}
          >
            <ButtomNavigationExample
              persistenceKey={
                process.env.NODE_ENV !== 'production'
                  ? 'NavigationStateDEV'
                  : null
              }
            />
          </PreferencesContext.Provider>
          <KeepAwake />
        </PaperProvider>
      </Provider>
    )
  }
}
