import { Header } from '../sections/Header'
import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { WorkshopDetails } from '../sections/WorkshopDetails'
import { WhatIsIncluded } from '../sections/WhatIsIncluded'
import { Schedule } from '../sections/Schedule'
import { Registration } from '../sections/Registration'
import { Footer } from '../sections/Footer'

export function LandingPage() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <About />
        <WorkshopDetails />
        <WhatIsIncluded />
        <Schedule />
        <Registration />
      </main>
      <Footer />
    </>
  )
}
