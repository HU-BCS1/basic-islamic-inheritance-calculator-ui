//@ts-check
import React, { useState, useReducer, useMemo } from 'react';
import Solution from '../Solution/Solution'
import Input from '../Input/Input'
import { defaultHeirs, calculate } from 'islamic-inheritance-calculator'

import Fab from '@material/react-fab'
import Button from '@material/react-button'
import Modal from 'react-modal'

import '@material/react-button/dist/button.css'
import '@material/react-fab/dist/fab.css'
import './App.css';
import './Modal.css';

Modal.setAppElement('#root')

const App = () => {
  const [heirs, dispatch] = useHeirInput()
  const results = useMemo(() => calculate(heirs), [heirs])
  const [solutionModalIsOpen, setSolutionModalIsOpen] = useState(false)

  return (
    <>
      <header className="App-header">
        <p className="App-name">Islamic Inheritance Calculator</p>
      </header>
      <main className="App-main">
        <Input heirs={heirs} dispatch={dispatch} />
        <Fab
          onClick={() => setSolutionModalIsOpen(true)}
          className="App-calculate-button"
          textLabel="calculate"
        />
        <Modal
          isOpen={solutionModalIsOpen}
          className="App-modal"
          overlayClassName="App-overlay"
        >
          <Solution results={results} />
          <Button
            unelevated
            className="App-close-modal-button"
            onClick={() => setSolutionModalIsOpen(false)}>
            close
          </Button>
        </Modal>
      </main>
    </>
  );
}

export default App;

const useHeirInput = () => {
  const initialState = defaultHeirs
  const reducer = (state, action) => {
    switch(action.type) {
      case 'change_count':
        if(action.count > 0) {
          if(action.heir === 'husband') {
            return { ...state, wife: 0, [action.heir]: action.count }
          }
          if(action.heir === 'wife') {
            return { ...state, husband: 0, [action.heir]: action.count }
          }
        }
        return { ...state, [action.heir]: action.count }
      case 'reset':
        return initialState
      default:
        throw Error('unknown action type')
    }
  }
  return useReducer(reducer, initialState)
}