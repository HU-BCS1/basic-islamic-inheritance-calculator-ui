import React from 'react'
import Card from '../Card/Card'
import './Input.css'
import T from '../translation-en.json'

const Input = ({ heirs, dispatch }) => { 
  const handleCountChange = (heir, count) => {
    dispatch({ type: 'change_count', heir, count })
  }

  return (
    <Card className="Input">
      <table>
        <thead>
          <tr>
            <th>Heir type</th>
            <th>No. of heirs</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(heirs).map((name, i) => (
            <tr key={name}>
              <td>{T[name]}</td>
              <td>
                <select
                  value={heirs[name]}
                  onChange={evt => handleCountChange(name, evt.target.value)}
                >
                  {
                    maxCount(name) > 1 ? (
                      range(maxCount(name) + 1).map((count, i) => <option key={i}>{count}</option>)
                    ) : (
                        <>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </>
                      )
                  }
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
 }

export default Input

const range = end => [...Array(end).keys()]

const maxCount = heir => {
  switch(heir) {
    case 'father':
    case 'mother':
    case 'husband':
      return 1
    case 'wife':
      return 4
    default:
      return 20
  }
}
