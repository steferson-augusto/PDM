import { LOAD_ATRIBUTOS, LOAD_PERICIAS, LOAD_ITENS } from './actionTypes'

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

export const loadingItens = load => {
    return {
        type: LOAD_ITENS,
        payload: load
    }
}