import React from 'react'
import { FaPhoneAlt, FaUserAlt } from 'react-icons/fa'
import { ImHome } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import { Button, Input, Sidebar } from '../../components'
import { ImageUploader } from './ImageUploader/ImageUploader'
import './Profile.css'

const Profile = () => {
  return (
    <div style={{ display: 'flex', margin: 10 }}>
      <div className="sidebar" style={{ width: "30%" }}>
        <Sidebar />
      </div>
      <div className="container-fluid">
        <ImageUploader />
        <div className="row mt-20">
          <div className="col-lg-6">
            <Input placeholder="Name" Component={<FaUserAlt size={24} color={"var(--bg)"} />} />
          </div>
          <div className="col-lg-6">
            <Input placeholder="Phone" Component={<FaPhoneAlt size={24} color={"var(--bg)"} />} />
          </div>
        </div>

        <div className="row mt-10">
          <div className="col-lg-6">
            <Input placeholder="Email" Component={<MdEmail size={24} color={"var(--bg)"} />} />
          </div>
          <div className="col-lg-6">
            <Input placeholder="Address" Component={<ImHome size={24} color={"var(--bg)"} />}/>
          </div>
        </div>

        <div className="mt-10">
          <Button children="Save" paddingLeft={10} paddingRight={10} paddingTop={10} paddingBotttom={10} fontSize={20} />
        </div>
      </div>
    </div>
  )
}

export default Profile
