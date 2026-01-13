import React from 'react'
import TotalDialsToday from '../components/TotalDialsToday'
import { AgentsTable } from '../components/AgentsTable'

const Selective = () => {
  return (
    <div className="flex flex-col gap-4 items-center h-[calc(100vh-6rem)]">
    <div className="w-full max-w-7xl">
      <TotalDialsToday />
    </div>

    <div className="w-full max-w-7xl h-full ">
      <AgentsTable />
    </div>
  </div>
  )
}

export default Selective