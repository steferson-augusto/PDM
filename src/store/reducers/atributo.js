import { atributos as attrFire } from '../../services/firebase'
import { UPDATE_ATRIBUTOS, FIRE_ATRIBUTOS } from '../actions/actionTypes'

const initialState = {
    atributos: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ATRIBUTOS:
            return {
                ...state,
                atributos: action.payload.atributos,
            }
        case FIRE_ATRIBUTOS:
            attrFire.update({
                atributos: action.payload
            })
            return state
        default:
            return state
    }
}

export default reducer