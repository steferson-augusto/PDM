import { UPDATE_PERICIAS, FIRE_PERICIAS } from './actionTypes'

export const update = pericias => {
    return {
        type: UPDATE_PERICIAS,
        payload: pericias
    }
}

export const fire = pericias => {
    return {
        type: FIRE_PERICIAS,
        payload: pericias
    }
}