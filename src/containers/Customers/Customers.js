import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaHouseDamage, FaPhoneAlt, FaUserAlt } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Sidebar, Input, Button, Modal } from '../../components'
import * as actions from '../../store/actions'
import './Customers.css'

const Customers = () => {
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [loader, setLoader] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [data, setData] = useState([])
  const history = useHistory()
  const dispatch = useDispatch()
  const action = bindActionCreators(actions, dispatch)

  useEffect(() => {
    setLoader(true)
    action.getCustomer().then((res) => {
      setLoader(false)
      setData(res)
    }).catch(err => {
      setLoader(false)
      console.log("🚀 ~ file: Customers.js ~ line 47 ~ action.getCustomer ~ err", err)
    })
  }, [])

  const modalOpen = () => {
    setOpenModal(!openModal)
  }

  const submit = () => {
    const numberReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
    if (name === '' || phone === '' || address === '') {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, [3000])
      setErrorMessage("Check Input Fields")
    }
    else if (numberReg.test(phone) === false) {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, [3000])
      setErrorMessage("Invalid Number")
    }
    else {
      setLoading(true)
      action.addCustomer(name, phone, address).then(() => {
        setLoading(false)
        setName("")
        setPhone("")
        setAddress("")
        setOpenModal(false)
        action.getCustomer().then((res) => {
          setData(res)
        })
      }).catch((err) => {
        console.log("🚀 ~ file: Customers.js ~ line 48 ~ action.addCustomer ~ err", err)
      })
    }
  }

  return (
    <div style={{ display: 'flex', margin: 10 }}>
      <div className="sidebar" style={{ width: "30%" }}>
        <Sidebar />
      </div>
      <div className="container-fluid">
        <div>
          <Input placeholder="Search Customer" Component={<FaUserAlt size="25" color="var(--bg)" />} />
        </div>
        <div className="d-flex justify-content-end mt-2 mb-3">
          <Button onClick={() => modalOpen()} paddingLeftIcon={5} paddingRight={10} paddingTop={5} paddingBotttom={5} paddingLeft={10} borderRadius={30} children="Add new customer" Component={<GoPlus size="25" color="white" />} />
        </div>
        {loader ? <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <div class="spinner-border text-dark"></div>
        </div> : data.length === 0 ?
          <>
            <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
              <h1>No Data Avaliable</h1>
            </div>
          </> :
          <div className="table-responsive">
            <table className="table-borderless gfg">
              <thead>
                <tr className="table_header">
                  <th className="table_th" style={{ width: '20%' }} scope="col">Id </th>
                  <th className="table_th" style={{ width: '20%' }} scope="col">Name </th>
                  <th className="table_th" style={{ width: '20%' }} scope="col">Phone</th>
                  <th className="table_th" style={{ width: '20%' }} scope="col">Address </th>
                  <th className="table_th" style={{ width: '10%' }} scope="col"></th>
                  <th className="table_th" style={{ width: 300 }} scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.map((i, j) => {
                  return (
                    <tr key={j} className="body_tr">
                      <td className="td__border">
                        <div className="row_containner1">
                          <span className="status_text">
                            {j + 1}
                          </span>
                        </div>
                      </td>
                      <td className="td__border">
                        <div className="row_containner2">
                          {i?.name}
                        </div>
                      </td>
                      <td className="td__border">
                        <div className="row_containner3">
                          {i?.phone}
                        </div>
                      </td>
                      <td className="td__border">
                        <div className="row_containner4">
                          {i?.address}
                        </div>
                      </td>
                      <td className="td__border">
                        <div className="row_containner3">
                        </div>
                      </td>
                      <td className="td__border">
                        <div className="row_containner5">
                          <Button children="View now" onClick={() => history.push(`customerDetails/${i?.userId}`, i)} paddingLeft={15} paddingRight={15} paddingTop={5} paddingBotttom={5} fontSize={12} borderRadius={20} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        }
      </div>

      <Modal
        error={error}
        errorMessage={errorMessage}
        value1={name} onChangeValue1={setName} value2={phone} onChangeValue2={setPhone} onChangeValue3={setAddress} value3={address}
        onClick={submit}
        loading={loading}
        title="Add New Customer" placeholder1="Name" placeholder2="Phone" placeholder3="Address" icon3={<FaHouseDamage size="25" color="var(--bg)" />} icon2={<FaPhoneAlt size="25" color="var(--bg)" />} icon1={<FaUserAlt size="25" color="var(--bg)" />} openModal={openModal} setOpenModal={setOpenModal} />
    </div>

  )
}

export default Customers
