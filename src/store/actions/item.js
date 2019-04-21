import { UPDATE_ITENS, FIRE_ITENS } from './actionTypes'

export const update = itens => {
    return {
        type: UPDATE_ITENS,
        payload: itens
    }
}

export const fire = itens => {
    return {
        type: FIRE_ITENS,
        payload: itens
    }
}