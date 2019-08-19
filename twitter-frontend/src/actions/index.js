export const RECV_VALUE = "REC_VALUE"

export function receiveValue(value) {
    return {
        type: RECV_VALUE,
        value: value
    }
}