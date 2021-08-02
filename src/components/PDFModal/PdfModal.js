import React from 'react'
import Modal from 'react-modal';
import { ImCross, ImDroplet } from 'react-icons/im'
import Input from '../Input/Input';
import { BiCalendar } from 'react-icons/bi';
import Button from '../Button/Button';
import './PdfModal.css'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: 1000,
        maxHeight: 700,
        width: '90%',
        height: '90%',
        transform: 'translate(-50%, -50%)',
    },
};


const PdfModal = ({ setOpenModal, openModal, title }) => {

    const data = [
        { id: 1, Date: "12/12/2021 Friday", Bottles: '5', Price: `Rs 120`, Total: "Rs 600", Status: "Paid" },
        { id: 2, Date: "12/12/2021 Friday", Bottles: '15', Price: `Rs 120`, Total: "Rs 600", Status: "Paid" },
        { id: 3, Date: "12/12/2021 Friday", Bottles: '35', Price: `Rs 120`, Total: "Rs 600", Status: "Paid" },

    ]

    function closeModal() {
        setOpenModal(false);
    }
    return (
        <div>
            <Modal
                ariaHideApp={false}
                isOpen={openModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <span style={{ fontSize: 22, fontWeight: 'bold', color: 'gray', paddingLeft: 10 }}>
                            {title}
                        </span>
                    </div>
                    <div>
                        <ImCross cursor="pointer" onClick={closeModal} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <Input placeholder="Date" Component={<BiCalendar size="25" color="var(--bg)" />} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <Button children="Generate" paddingLeft={13} paddingRight={13} paddingTop={10} paddingBotttom={10} fontSize={22} />
                    </div>
                </div>
                <div className="row mt-20">
                    <div className="col customerDetails__topLeftHeading">
                        <ImDroplet size="36" color={"var(--bg)"} />
                        <span>
                            Moya
                        </span>
                    </div>
                    <div className="col d-flex justify-content-end" style={{ fontWeight: 'bold', color: "var(--bg)", fontSize: 32 }}>Invoice</div>
                </div>

                <div className="row mt-20">
                    <div className="col">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 ">
                                <div style={{ fontWeight: 'bold' }}>Supplier</div>
                                <div className="span">MINIRAL BUBBLES</div>
                                <div className="span" >+92 324 2103067</div>
                                <div className="span" >Shop # 122 Jamshed road</div>
                                <div className="span" >karachi</div>

                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                <div style={{ fontWeight: 'bold' }}>Customer</div>
                                <div className="span" >Ghous Ahmed </div>
                                <div className="span" >+92 324 2103067 </div>
                                <div className="span" >House # 122 Jamshed road </div>
                                <div className="span" >karachi </div>

                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 d-flex flex-column align-items-md-start align-items-sm-start align-items-xs-start  align-items-lg-end   ">
                                <div style={{ fontWeight: 'bold' }}>Invoice No</div>
                                <div >001</div>
                                <div style={{ fontWeight: 'bold' }}>Invoice Date</div>
                                <div >07/07/2021</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-responsive">
                    <table style={{ width: '100%' }} class="table-borderless gfg">
                        <thead>
                            <tr className="table_header">
                                <td className="table_th table_heading" >Bottles </td>
                                <td className="table_th table_heading" >Date </td>
                                <td className="table_th table_heading" >Rate</td>
                                <td className="table_th table_heading2"  >Amount</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((i) => {
                                return (
                                    <tr className="body_tr">
                                        <td className="td__border">
                                            <div className="row_containne2">
                                                <span className="status_text">
                                                    {i?.Bottles}

                                                </span>
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containne1">
                                                {i?.Date}
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containner3">
                                                {i?.Price}
                                            </div>
                                        </td>
                                        <td className="td__border">
                                            <div className="row_containne4">
                                                {i?.Total}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="row mt-10">
                    <div className="col"></div>
                    <div className="col">
                        <div className="row ">
                            <div className="col d-flex flex-column align-items-lg-end align-items-md-start  align-items-sm-start">
                                <div>Total</div>
                                <div>Discount</div>
                                <div>Net Amount</div>

                            </div>
                            <div className="col d-flex flex-column align-items-lg-end align-items-md-start align-items-sm-start ">
                                <div>Rs 420</div>
                                <div>Rs 0</div>
                                <div>Rs 420</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <Button children="Print" paddingLeft={10} paddingRight={10} paddingTop={10} paddingBotttom={10} />
                </div>
            </Modal>
        </div>
    )
}

export default PdfModal
