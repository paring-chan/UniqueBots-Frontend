import {createStore} from "redux";
import {connect} from "react-redux";

const initialState = {
    user: null
}

const action = (state = initialState, action) => {
    switch (action.type) {
        case '@@UNIQUE/USER':
            return {...state, user: action.payload}
        default:
            return state
    }
}


const store = createStore(action)

export default store

export const connectStore = (component) => connect(state => state, dispatch => ({
    setUser: (user) => dispatch({type: '@@UNIQUE/USER', payload: user})
}))(component)
