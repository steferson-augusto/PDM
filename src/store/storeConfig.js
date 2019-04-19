import { createStore, combineReducers } from 'redux'
import atributoReducer from './reducers/atributo'

const reducers = combineReducers({
    atributos: atributoReducer
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig