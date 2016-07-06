import React from 'react'
import { Link } from 'react-router'

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/logout">Log Out</Link>
    </div>
  )
}

export default Dashboard
