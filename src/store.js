import {createStore} from "redux";
import {connect} from "react-redux";

const initialState = {
    user: null
}

const action = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}


const store = createStore(action)

export default store

export const connectStore = (component) => connect(state => state)(component)
