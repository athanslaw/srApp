import { SAVE_USER } from '../constants';

export function saveUser(user) {
    return {
        type: SAVE_USER,
        payload: user
    }
}