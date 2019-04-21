import { createStore, combineReducers } from 'redux'
import atributoReducer from './reducers/atributo'
import periciaReducer from './reducers/pericia'
import itemReducer from './reducers/item'
import loadingReducer from './reducers/loading'

const reducers = combineReducers({
    atributos: atributoReducer,
    pericias: periciaReducer,
    itens: itemReducer,
    loading: loadingReducer
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig