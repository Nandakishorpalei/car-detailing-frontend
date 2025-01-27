import React from 'react'
import { Header } from '../../UI-Components/Header/Header'
import { usePageTitle } from '../../Hooks/usePageTitle';

export const About = () => {
    usePageTitle("About");
  return (
    <div>
      <Header title="About" />
      <div className="flex flex-col gap-6 p-12 h-[calc(100vh-65px)] w-screen px-[15%] sm:px-[4%]">
        Hello from about
      </div>
    </div>
  )
}
