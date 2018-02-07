import React from 'react'
import ReactDOM from 'react-dom'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// Import components
import App from './components/App'
// Import reducers
import rootReducer from './reducers'
// Import actions
import { setUserType, changeStatus, goHome, setArea, setYrwk, editToggle, editOn, editOff, loadData } from './actions'
import { UserTypes, StatusTypes } from './constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

// Create the store
const store = createStore(rootReducer)

// Log the initial state
console.log(store.getState())

// Log all changes to the state
const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
})

// Actions
// store.dispatch(setUserType(contributor))
// store.dispatch(changeStatus(draft))
// store.dispatch(setArea("Area 01"))
// store.dispatch(setYrwk("Week 01 - 2018"))
// store.dispatch(loadData(StatusTypes))
// store.dispatch(editToggle())
// store.dispatch(editToggle())

// unsubscribe()

//Call to run the app
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
