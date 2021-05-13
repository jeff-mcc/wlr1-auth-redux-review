import {createStore,combineReducers} from 'redux'
import authReducer from './authReducer'

const rootReducer = combineReducers({
    authReducer: authReducer
})

export default createStore(rootReducer)