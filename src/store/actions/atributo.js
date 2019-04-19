import { UPDATE_ATRIBUTOS, FIRE_ATRIBUTOS } from './actionTypes'

export const update = atributos => {
    return {
        type: UPDATE_ATRIBUTOS,
        payload: atributos
    }
}

export const fire = atributos => {
    return {
        type: FIRE_ATRIBUTOS,
        payload: atributos
    }
}