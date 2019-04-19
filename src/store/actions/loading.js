import { LOAD_ATRIBUTOS } from './actionTypes'

export const loadingAtributos = load => {
    return {
        type: LOAD_ATRIBUTOS,
        payload: load
    }
}
