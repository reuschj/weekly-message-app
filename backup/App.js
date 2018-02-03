import React from 'react'
import Hello from './Hello'
import ChangeState from '../containers/ChangeState'
import DisplayState from '../containers/DisplayState'

// Import actions
import {
    setUserType,
    changeStatus,
    goHome,
    setArea,
    setYrwk,
    editToggle,
    editOn,
    editOff,
    loadData
} from '../actions'
import { UserTypes, StatusTypes } from '../constants/stateTypes'
const { viewer, contributor, reviewer } = UserTypes
const { draft, review, published } = StatusTypes

const App = () => (
    <div>
        <Hello name="Weekly Message" />
        <h2>Start editing to see some magic happen {'\u2728'}</h2>
        <DisplayState type={'userType'} />
        <div>
            <ChangeState action={setUserType} type={viewer} />
            <ChangeState action={setUserType} type={contributor} />
            <ChangeState action={setUserType} type={reviewer} />
        </div>
        <DisplayState type={'editable'} />
        <div>
            <ChangeState action={editToggle} type={null} name="Toggle" />
        </div>
        <DisplayState type={'area'} />
        <div>
            <ChangeState action={setArea} type={'Area 01'} />
            <ChangeState action={setArea} type={'Area 02'} />
            <ChangeState action={setArea} type={'Area 03'} />
        </div>
        <DisplayState type={'yrwk'} />
        <div>
            <ChangeState action={setYrwk} type={'Week 01 - 2018'} />
            <ChangeState action={setYrwk} type={'Week 02 - 2018'} />
            <ChangeState action={setYrwk} type={'Week 03 - 2018'} />
        </div>
        <DisplayState type={'status'} />
        <div>
            <ChangeState action={changeStatus} type={draft} />
            <ChangeState action={changeStatus} type={review} />
            <ChangeState action={changeStatus} type={published} />
        </div>
        <DisplayState type={'data'} />
    </div>
)

export default App
