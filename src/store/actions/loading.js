import { LOAD_ATRIBUTOS, LOAD_PERICIAS } from './actionTypes'

export const loadingAtributos = load => {
    return {
        type: LOAD_ATRIBUTOS,
        payload: load
    }
}

export const loadingPericias = load => {
    return {
        type: LOAD_PERICIAS,
        payload: load
    }
}