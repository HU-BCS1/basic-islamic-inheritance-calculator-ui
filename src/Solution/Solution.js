import React from 'react'
import Card from '../Card/Card'
import './Solution.css'
import T from '../translation-en.json'

const toPercentage = fr => {
  return fr.mul(100).valueOf()
}

const Solution = ({ results }) => { 
  return (
    <div className="Solution">
      <p className="Solution-header">Solution</p>
      <Card>
        <table>
          <thead>
            <tr>
              <th>Heir type</th>
              <th>Share Fraction</th>
              <th>Share Percentage</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r.name}>
                <td>{T[r.name]}</td>
                <td>{r.share.toFraction()}</td>
                <td>{toPercentage(r.share).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {!results.length && <p>No heir is selected</p>}
    </div>
  )
 }

 export default Solution