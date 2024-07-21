import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

import './App.css'

const App = () => {
  const [Password, setPassword] = useState("")
  const [Length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)

  const PasswordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^~&*()_+|}{[]:><?/,."

    for (let i = 0; i < Length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [Length, setPassword, numberAllowed, charAllowed])

  const copyPassword = useCallback(() => {
    PasswordRef.current?.select()
    // PasswordRef.current?.setSelectionRange(0, 3)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed, charAllowed, PasswordGenerator])


  return (
    <>
      <div className='container'>
        <div className='main_container'>
          <h2>PassWord Generator</h2>
          <input
            className='passInput'
            type="text"
            readOnly
            value={Password}
            ref={PasswordRef}
          />
          <button className='btn' onClick={copyPassword}>Copy</button>
        </div>

        <div className='main1_container'>
          <input
            type="range"
            id='lengthInput'
            min={6}
            max={15}
            value={Length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="lengthInput">Length : {Length}</label>
        </div>

        <div className="main1_container">
          <input
            type="checkbox"
            checked={numberAllowed}
            id='numberInput'
            onChange={() => setnumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Number</label>

          <input
            type="checkbox"
            id='charInput'
            checked={charAllowed}
            onChange={() => setcharAllowed((prev) => !prev)}
          />
          <label htmlFor="charInput">Character</label>
        </div>
      </div>
    </>
  )
}

export default App