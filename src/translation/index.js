//@ts-check
import React, { createContext, useContext } from 'react'

import en from './translation-en.json'
import ar from './translation-ar.json'

const translate = lang => key => lang === 'en' ? en[key] : ar[key]

const TranslationContext = createContext(undefined)

export const TranslationProvider = ({ children, lang = 'en' }) => {
  return (
    <TranslationContext.Provider value={translate(lang)}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if(context === undefined) {
    throw Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
