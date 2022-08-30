import { COUNTER_CHANGE, SAVE_USER } from '../constants';

const initialState = {
    count: 0,
    user: null
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case COUNTER_CHANGE:
            return {
                ...state,
                count: action.payload
            };
        case SAVE_USER: return {
            ...state,
            user: action.payload
        }
        default:
            return state;
    }
}
export default userReducer;
