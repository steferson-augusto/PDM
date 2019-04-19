import { createStore, combineReducers } from 'redux'
import atributoReducer from './reducers/atributo'
import loadingReducer from './reducers/loading'

const reducers = combineReducers({
    atributos: atributoReducer,
    loading: loadingReducer
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig