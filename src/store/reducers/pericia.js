import { pericias as periciaFire } from '../../services/firebase'
import { UPDATE_PERICIAS, FIRE_PERICIAS } from '../actions/actionTypes'

const initialState = {
    pericias: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PERICIAS:
            return {
                ...state,
                pericias: action.payload.pericias,
            }
        case FIRE_PERICIAS:
            periciaFire.update({
                pericias: action.payload
            })
            return state
        default:
            return state
    }
}

export default reducer