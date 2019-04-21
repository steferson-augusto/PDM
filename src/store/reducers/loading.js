import { LOAD_ATRIBUTOS, LOAD_PERICIAS, LOAD_ITENS } from '../actions/actionTypes'

const initialState = {
    atributos: true,
    pericias: true,
    itens: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ATRIBUTOS:
            return {
                ...state,
                atributos: action.payload
            }
        case LOAD_PERICIAS:
            return {
                ...state,
                pericias: action.payload
            }
        case LOAD_ITENS:
            return {
                ...state,
                itens: action.payload
            }
        default:
            return state
    }
}

export default reducer