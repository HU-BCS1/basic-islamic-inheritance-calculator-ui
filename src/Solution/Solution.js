import React from 'react'

import { useTranslation } from '../translation'

import './Solution.css'

const toPercentage = fr => {
  return fr.mul(100).valueOf()
}

const Solution = ({ results }) => { 
  const t = useTranslation()

  return (
    <div className="Solution" dir={t('lang') === 'ar' ? 'rtl' : 'ltr'}>
      <p className="Solution-header">{t('solution')}</p>
      <table>
        <thead>
          <tr>
            <th>{t('heir_type')}</th>
            <th>{t('share_type')}</th>
            <th>{t('share_fraction')}</th>
            <th>{t('share_percentage')}</th>
          </tr>
        </thead>
        <tbody>
          {results.map(r => (
            <tr key={`${r.name}-${r.type}`}>
              <td>{t(r.name)}</td>
              <td>{t(r.type)}</td>
              <td>{r.share.toFraction()}</td>
              <td>{toPercentage(r.share).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!results.length && <p>{t('no_heir_selected')}</p>}
    </div>
  )
 }

 export default Solution