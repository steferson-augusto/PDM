import { LOAD_ATRIBUTOS } from '../actions/actionTypes'

const initialState = {
    atributos: true,
    pericias: false,
    itens: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ATRIBUTOS:
        console.log(action.payload)
            return {
                ...state,
                atributos: action.payload
            }
        default:
            return state
    }
}

export default reducer