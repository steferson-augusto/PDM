import { armazens as itemFire } from '../../services/firebase'
import { UPDATE_ITENS, FIRE_ITENS } from '../actions/actionTypes'

const initialState = {
    armazens: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ITENS:
            return {
                ...state,
                armazens: action.payload.armazens,
            }
        case FIRE_ITENS:
            itemFire.update({
                armazens: action.payload
            })
            return state
        default:
            return state
    }
}

export default reducer