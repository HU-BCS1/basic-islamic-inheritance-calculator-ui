import React from 'react'
import T from '../translation-en.json'

import './Solution.css'

const toPercentage = fr => {
  return fr.mul(100).valueOf()
}

const Solution = ({ results }) => { 
  return (
    <div className="Solution">
      <p className="Solution-header">Solution</p>
      <table>
        <thead>
          <tr>
            <th>Heir type</th>
            <th>Share Type</th>
            <th>Share Fraction</th>
            <th>Share Percentage</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={`${r.name}-${r.type}`}>
              <td>{T[r.name]}</td>
              <td>{r.type}</td>
              <td>{r.share.toFraction()}</td>
              <td>{toPercentage(r.share).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!results.length && <p>No heir is selected</p>}
    </div>
  )
 }

 export default Solution