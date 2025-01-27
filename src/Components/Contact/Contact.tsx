import React from 'react'
import { Header } from '../../UI-Components/Header/Header'

export const Contact = () => {
  return (
    <div>
    <Header title="Contact" />
    <div className="flex flex-col gap-6 p-12 h-[calc(100vh-65px)] sm:h-[calc(100vh-90px)] w-screen px-[15%] sm:px-[4%]">
      Hello from contact
    </div>
  </div>
  )
}

