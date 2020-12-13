import {createStore} from "redux";
import {connect} from "react-redux";

const initialState = {
    experiments: {
        isDeveloper: false,
        switches: {}
    }
}

const action = (state = initialState, action) => {
    switch (action.type) {
        case '@@UNIQUE/EXPERIMENT':
            localStorage.setItem('_experiments', JSON.stringify({
                ...state.experiments.switches,
                ...action.payload
            }))
            return {
                ...state, experiments: {
                    ...state.experiments,
                    switches: {
                        ...state.experiments.switches,
                        ...action.payload
                    }
                }
            }
        case '@@INIT':
            if (localStorage.getItem('_experiments')) state.experiments.switches = JSON.parse(localStorage.getItem('_experiments'))
            else localStorage.setItem('_experiments', '{}')
            return state
        case '@@UNIQUE/SET_DEV':
            return {...state, experiments: {...state.experiments, isDeveloper: Boolean(action.payload)}}
        default:
            return state
    }
}


const store = createStore(action,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store

export default store

export const connectStore = (component) => connect(state => state, dispatch => ({
    setExperiments: (experiment) => dispatch({type: '@@UNIQUE/EXPERIMENT', payload: experiment})
}))(component)
