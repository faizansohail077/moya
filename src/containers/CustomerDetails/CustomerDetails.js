import React, { useState } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { BiCalendar } from 'react-icons/bi'
import { FaHouseDamage, FaPhoneAlt, FaPrint, FaRegEdit, FaUserAlt } from 'react-icons/fa'
import { IoIosPricetag } from 'react-icons/io'
import { Button, Modal, PdfModal, Sidebar } from '../../components'
import './CustomerDetails.css'
import { ImDroplet } from 'react-icons/im'
import Table from './component/Table'
import { useParams } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions'
import { useEffect } from 'react'

const CustomerDetails = () => {
  const { id } = useParams()
  const userId = id
  const dispatch = useDispatch()
  const action = bindActionCreators(actions, dispatch)

  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openPdfModal, setOpenPdfModal] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [bottles, setBottles] = useState(0)
  const [price, setPrice] = useState(0)
  const [total, setTotal] = useState(0)
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [entryData, setEntryData] = useState(false)


  useEffect(() => {
    setDataLoading(true)
    action.getCustomerById(userId).then((res) => {
      setDataLoading(false)
      setName(res?.name)
      setPhone(res?.phone)
      setAddress(res?.address)
    }).catch((err) => {
      setDataLoading(false)
    })
  }, [])



  const editModal = () => {
    setOpenEditModal(!openEditModal)
  }

  const modalOpen = () => {
    setOpenModal(!openModal)
  }
  const pdfModalOpen = () => {
    setOpenPdfModal(!openPdfModal)
  }

  const editCustomer = () => {
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
      action.editCustomer(userId, name, phone, address).then(() => {
        setLoading(false)
        setName("")
        setPhone("")
        setAddress("")
        action.getCustomerById(userId).then((res) => {
          setName(res?.name)
          setPhone(res?.phone)
          setAddress(res?.address)
        })
        setOpenEditModal(false)
      }).catch((err) => {
        console.log("🚀 ~ file: Customers.js ~ line 48 ~ action.addCustomer ~ err", err)
      })
    }
  }

  const addEntry = () => {
    const numberReg = /^[0-9]*$/
    if (numberReg.test(bottles) === false || numberReg.test(price) === false || numberReg.test(total) === false || date === "") {
      setError(true)
      setErrorMessage("Input Fields can only be numbers")
      setTimeout(() => {
        setError(false)
      }, [3000])
    }
    else {
      setLoading(true)
      action.addEntry(userId, bottles, price, total, date).then(() => {
        setLoading(false)
        setOpenModal(false)
        setEntryData(true)
        setBottles(0)
        setPrice(0)
        setTotal(0)
      }).catch((err) => {
        setLoading(false)
        console.log("🚀 ~ file: CustomerDetails.js ~ line 90 ~ action.addEntry ~ err", err)
      })
    }
  }

  return (

    <div style={{ display: 'flex', margin: 10 }}>
      <div className="sidebar" style={{ width: "30%" }}>
        <Sidebar />
      </div>
      <div style={{ margin: 10 }} className="container-fluid">
        {dataLoading ? <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <div class="spinner-border text-dark"></div>
        </div> :
          <div className="customerDetails__top">
            <div className="row">
              <div className="col customerDetails__topLeftHeading">{name}</div>
              <div className="col d-flex justify-content-end "><FaRegEdit size="25" color="var(--bg)" cursor="pointer" onClick={editModal} /></div>
            </div>

            <div className="row mt-20">
              <div className="col">
                <div className="row">
                  <div className="col-lg-3 col-md-12 ">
                    <div className="span_1">Phone</div>
                    <div className="span_2">{phone}</div>
                  </div>

                  <div className="col-lg-3 col-md-12">
                    <div className="span_1">Address</div>
                    <div className="span_2">{address}
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12 d-flex flex-column align-items-md-start align-items-sm-start align-items-lg-end mt-1 ">
                    <div>
                      <Button onClick={() => modalOpen()} paddingLeftIcon={10} Component={<BsFillPlusCircleFill size="20" color="white" />} borderRadius={100} paddingLeft={20} paddingRight={20} paddingTop={5} paddingBotttom={5} children="Add Entry" />
                    </div>
                    <div className="mt-1">
                      <Button onClick={() => pdfModalOpen()} paddingLeftIcon={10} Component={<FaPrint size="20" color="white" />} borderRadius={100} paddingLeft={20} paddingRight={20} paddingTop={5} paddingBotttom={5} children="Generate Invoice" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        <div className="row" >

          <div className="col-lg-4 col-md-6 col-sm-6  col-xs-12">
            <div className="startDate">
              <BiCalendar size="25" color="var(--bg)" />
              <input placeholder="Start Date" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <div className="EndDate">
              <BiCalendar size="25" color="var(--bg)" />
              <input placeholder="End Date" />
            </div>
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <Button children="View Now" paddingLeft={10} paddingRight={10} paddingTop={10} paddingBotttom={10} />
          </div>
        </div>
        <Table entryData={entryData} userId={userId} />
      </div>

      <Modal
        error={error}
        errorMessage={errorMessage}
        value1={name} onChangeValue1={setName} value2={phone} onChangeValue2={setPhone} onChangeValue3={setAddress} value3={address}
        onClick={editCustomer}
        loading={loading}
        title="Edit Customer"
        placeholder1="Name"
        placeholder2="Phone"
        placeholder3="Address"
        icon3={<FaHouseDamage size="25" color="var(--bg)" />}
        icon2={<FaPhoneAlt size="25" color="var(--bg)" />}
        icon1={<FaUserAlt size="25" color="var(--bg)" />}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal} />

      <Modal loading={loading} error={error} errorMessage={errorMessage} type="Date" value4={date} onChangeValue4={setDate} value2={price} onChangeValue2={setPrice} value3={total} onChangeValue3={setTotal} value5={bottles} onChangeValue5={setBottles} onClick={addEntry} title="Add Entry" icon5={<ImDroplet size="25" color="var(--bg)" />} icon2={<IoIosPricetag size="25" color="var(--bg)" />} icon3={<IoIosPricetag size="25" color="var(--bg)" />} icon4={<BiCalendar size="25" color="var(--bg)" />} input openModal={openModal} setOpenModal={setOpenModal} placeholder4="Date" placeholder5="Bottle" placeholder2="Price" placeholder3="Total" />
      <PdfModal openModal={openPdfModal} setOpenModal={setOpenPdfModal} title="Generate Invoice" />

    </div>
  )
}
export default CustomerDetails