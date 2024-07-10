"use client"
import { PieChart, BarChart } from './Charts'
import Layout from './Layout'
const Dashboard = () => {
  return (
    <div className='flex'>
    <div className="flex-1 bg-gray-100 p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-red-600">Dashboard</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold text-black">Active Users</h2>
          <p className="text-2xl text-green-400 font-bold">3000</p>
          <p className="text-sm text-red-600 uppercase font-bold">Today</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold text-black">Guest User</h2>
          <p className="text-2xl text-green-400 font-bold">15000</p>
          <p className="text-sm">Today</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold text-black">Country List</h2>
          <p className="text-2xl text-green-400 font-bold">70</p>
        </div>
        <h2 className="text-lg  text-black uppercase font-bold">Subscriptions</h2>
        <div className=" col-span-3">
          
          <div className="grid grid-cols-6 gap-4 text-black">
            <div className=" bg-white p-4 shadow rounded ">
              <p className='font-bold'> Total Subscriptions</p>
              <p>309</p>
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Half Yearly</p>
             <p>123</p>
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Monthly</p>
              <p>247</p>
             
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Yearly</p>
              <p>87</p>
             
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Expired</p>
             <p>51</p>
            </div>
            <div className='bg-white p-4 shadow rounded'>
              <p className='font-bold'>Trial</p>
              <p>80</p>
            
            </div>
          </div>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold text-black">Most Used Server</h2>
          <PieChart />
        </div>
        <div className="bg-white p-4 shadow rounded col-span-2">
          <h2 className="text-lg font-semibold text-black">Active Users by Country</h2>
          <BarChart />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard
