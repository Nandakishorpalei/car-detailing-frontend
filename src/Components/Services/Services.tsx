import React from 'react'
import { Header } from '../../UI-Components/Header/Header'
import { OurServicesSection } from '../Home/OurServicesSection'

export const Services = () => {
  return (
    <div>
      <Header title="Services" />
      <OurServicesSection isInsideServices />
    </div>
  )
}

