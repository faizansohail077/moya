import React from 'react'
import { Card, Sidebar } from '../../components'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div style={{ display: 'flex',margin:10 }}>
      <div className="sidebar" style={{ width: "30%" }}>
        <Sidebar />
      </div>
      <div className="container-fluid">
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <Card />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <Card />
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <Card />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
