import React from 'react'
import Card from '../Card/Card'
import useMedia from 'react-use/lib/useMedia'
import './Input.css'
import T from '../translation-en.json'

const Input = ({ heirs, dispatch }) => { 
  const isWide = useMedia('(min-width: 780px)')
  const handleCountChange = (heir, count) => {
    dispatch({ type: 'change_count', heir, count })
  }
  const heirNames = Object.keys(heirs)
  const twoColumnHeirNames = zip(
    heirNames.slice(0, heirNames.length/2),
    heirNames.slice((heirNames.length/2))
  )

  return (
    <Card className="Input">
      {isWide ? (
        <table>
          <thead>
            <tr>
              <th>Heir type</th>
              <th>No. of heirs</th>
              <th>Heir type</th>
              <th>No. of heirs</th>
            </tr>
          </thead>
          <tbody>
            {twoColumnHeirNames.map(([name1, name2], i) =>
              <tr key={i}>
                <InputRows name={name1} heirs={heirs} onCountChange={handleCountChange} />
                <InputRows name={name2} heirs={heirs} onCountChange={handleCountChange} />
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Heir type</th>
              <th>No. of heirs</th>
            </tr>
          </thead>
          <tbody>
            {heirNames.map((name, i) =>
              <tr key={i}>
                <InputRows name={name} heirs={heirs} onCountChange={handleCountChange} />
              </tr>
            )}
          </tbody>
        </table>

      )}
    </Card>
  )
 }

export default Input

const InputRows = ({ name, heirs, onCountChange }) => ( 
  <>
    <td>{T[name]}</td>
    <td>
      <select
        value={heirs[name]}
        onChange={evt => onCountChange(name, evt.target.value)}
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
  </>
)

const range = end => [...Array(end).keys()]

const zip = (a, b) => a.map((e, i) => [e, b[i]])

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
