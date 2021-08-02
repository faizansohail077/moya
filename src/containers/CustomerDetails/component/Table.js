import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { ImCross, ImDroplet } from "react-icons/im";
import { IoIosPricetag } from "react-icons/io";
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, EditModal, Input } from "../../../components";
import * as actions from '../../../store/actions'
import './Table.css'
import { useParams } from "react-router-dom";



function Table({ userId }) {

    const [data, setData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [bottles, setBottles] = useState(0)
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const [date, setDate] = useState("")
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [docId, setDocId] = useState("")
    const { id } = useParams()

    const dispatch = useDispatch()
    const action = bindActionCreators(actions, dispatch)

    const modalOpen = (date, bottles, price, total, status, docId) => {
        setOpenModal(!openModal)
        setDate(date)
        setBottles(bottles)
        setPrice(price)
        setTotal(total)
        setStatus(status)
        setDocId(docId)
    }

    useEffect(() => {
        action.getEntry(userId).then((res) => {
            setData(res)
        })
    }, [])

    const editEntry = () => {
        const numberReg = /^[0-9]*$/
        if (numberReg.test(bottles) === false || numberReg.test(price) === false || numberReg.test(total) === false) {
            setError(true)
            setErrorMessage("Input Fields can only be numbers")
            setTimeout(() => {
                setError(false)
            }, [3000])
        }
        else if (date === "" || status === "" || bottles === "" || price === "" || total === "") {
            setError(true)
            setErrorMessage("Invalid Input fields")
            setTimeout(() => {
                setError(false)
            }, [3000])
        }
        else {
            setLoading(true)
            action.editEntry(id, docId, date, bottles, price, total, status).then(() => {
                setLoading(false)
                setOpenModal(false)
                action.getEntry(userId).then((res) => {
                    setData(res)
                })
            }).catch((err) => {
                setLoading(false)
                console.log("🚀 ~ file: CustomerDetails.js ~ line 90 ~ action.addEntry ~ err", err)
            })
        }
    }

    const deleteEntry = (docId) => {
        action.deleteEntry(id, docId)
            .then(() => {
                action.getEntry(userId).then((res) => {
                    setData(res)
                }).catch((err) => {
                    console.log("🚀 ~ file: Table.js ~ line 84 ~ action.getEntry ~ err", err)
                })
            }).catch((err) => {
                console.log("🚀 ~ file: Table.js ~ line 84 ~ action.getEntry ~ err", err)
            })
    }

    return (
        <>
            {data?.length === 0 ? <div className="mt-20" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <h1>No Data Avaliable</h1>
            </div> :
                <div className="table-responsive">
                    <table class="table-borderless gfg">
                        <thead>
                            <tr className="table_header">
                                <td className="table_th table_heading" style={{ width: 100 }}>Date </td>
                                <td className="table_th table_heading" style={{ width: 200 }}>Bottle </td>
                                <td className="table_th table_heading" style={{ width: 200 }}>Price</td>
                                <td className="table_th table_heading" style={{ width: 200 }}>Total </td>
                                <td className="table_th table_heading" style={{ width: 200 }}>Status</td>
                                <td className="table_th table_heading" style={{ width: 200 }}></td>
                                <td className="table_th table_heading" style={{ width: 200 }}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((i) => {
                                return (
                                    <tr key={i?.id} className="body_tr">
                                        <td className="td__border">
                                            <div className="row_containne1">
                                                <span className="status_text">
                                                    {i?.date}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containne2">
                                                {i?.bottles}
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containner3">
                                                {i?.price}
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containner4">
                                                {i?.total}
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containner3">
                                                {i?.status}
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containner5">
                                                <FaRegEdit
                                                    cursor="pointer"
                                                    onClick={() => modalOpen(i?.date, i?.bottles, i?.price, i?.total, i?.status, i?.docId)}
                                                    size="25" color="var(--bg)"
                                                />
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containner5">
                                                <MdDelete
                                                    cursor="pointer"
                                                    onClick={() => deleteEntry(i?.docId)}
                                                    size="25" color="var(--bg)"

                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
            <EditModal setOpenModal={setOpenModal} openModal={openModal} >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: 22, fontWeight: 'bold', color: 'gray', paddingLeft: 10 }}>
                            Edit Fileds
                        </span>
                    </div>
                    <div>
                        <ImCross cursor="pointer" onClick={() => setOpenModal(false)} />
                    </div>
                </div>
                <div className="mt-10">
                    {error && error ? <>
                        <div class="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    </> : null}
                </div>
                <div className="mt-10">
                    <Input Component={<BiCalendar size="25" color="var(--bg)" />} value={date} onChange={setDate} type="date" placeholder="Date" />
                    <Input Component={<ImDroplet size="25" color="var(--bg)" />} value={bottles} onChange={setBottles} placeholder="bottles" />
                    <Input Component={<IoIosPricetag size="25" color="var(--bg)" />} value={price} onChange={setPrice} placeholder="price" />
                    <Input Component={<IoIosPricetag size="25" color="var(--bg)" />} value={total} onChange={setTotal} placeholder="total" />
                    <Input Component={<HiOutlineStatusOnline size="25" color="var(--bg)" />} value={status} onChange={setStatus} placeholder="status" />
                </div>
                <div className="mt-10">
                    <Button onClick={editEntry} loader={loading} children="Edit" paddingLeft={10} paddingRight={10} paddingTop={10} paddingBotttom={10} fontSize={18} />
                </div>
            </EditModal>
        </>
    );
}
export default Table