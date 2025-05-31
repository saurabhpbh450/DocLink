import React from 'react'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import HealthTips from '../components/HealthTips'
import Hero from '../components/Hero'


const Home = () => {
  return (
    <div>
      <Hero />
      <TopDoctors />
      <SpecialityMenu />
      <HealthTips />
    </div>
  )
}

export default Home