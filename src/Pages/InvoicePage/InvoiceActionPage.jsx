import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actFetchshipperReq } from '../../actions/shipper'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import { actAddInvoiceRequest } from '../../actions/invoice'
import isEmpty from "validator/lib/isEmpty"
import { getTokenEmployee } from '../../actions/getNV'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const InvoiceActionPage = ({ match, onFetchShipper, shipper, history, onAddInvoice }) => {

    const [order, setOrder] = useState(null)
    const [invoice, setInvoice] = useState({
        orderId: '',
        dateCreated: new Date(),
        taxCode: '',
        // employeeId: '',
        shipperId: '',
        total: ''
    })

    const [validationMsg, setvalidationMsg] = useState('')

    const validateAll = () => {
        const msg = {}
        // if (isEmpty(invoice.invoiceId)) {
        //     msg.invoiceId = "Trường này không được để trống"
        // } else if (invoice.length > 10) {
        //     msg.invoiceId = "Mã hóa đơn không được dài hơn 10 kí tự"
        // }

        if (isEmpty(invoice.taxCode)) {
            msg.taxCode = "Trường này không được để trống"
        }
        // if (isEmpty(invoice.shipperId)) {
        //     msg.taxCode = "Trường này không được để trống"
        // }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }


    useEffect(() => {
        (async () => {
            await callApi(`order/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                setOrder(res.data)
            });
            await onFetchShipper()
        })()

        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (order != null) {
            setInvoice({
                ...invoice,
                orderId: parseInt(match.params.id),
                totalPrice: order.detailOrderList.reduce((total, CTPD) => total + CTPD.quantity * CTPD.price, 0),
                // employeeId: getNV(history).actort
            })
        }// eslint-disable-next-line
    }, [order])

    //tách 2 useeffect do k await đợi kết quả đc code hơi ngu chưa fix đc
    useEffect(() => {
        if (shipper.length !== 0) {
            setInvoice({
                ...invoice,
                shipperId: shipper[0].shipperId
            })
        }// eslint-disable-next-line
    }, [shipper])


    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateAll()
        //validate
        // console.log(invoice)
        
        if (isValid){
            // console.log(JSON.stringify(invoice))
            let res = await onAddInvoice(invoice,history)
            if (res.result) {
                MySwal.fire({
                    icon: 'success',
                    title: res.message,
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push("/order")
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.message
                })
            }
        }
    }

    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar history={history} />
                    <div className="container" >
                        {/* style ={{marginLeft: 220}} */}

                        <div className="py-3 mb-20" >
                            <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                                TẠO HÓA ĐƠN
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã hóa đơn(<small className="text-danger">*</small>)</label>
                                <input id="invoiceId" value={invoice.invoiceId} onChange={e => setInvoice({ ...invoice, invoiceId: e.target.value })} placeholder="Mã hóa đơn" className="form-control input-md" type="text" />
                                <small className="form-text text-danger">{validationMsg.invoiceId}</small>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="orderId">Mã Phiếu Đặt(<small className="text-danger">*</small>)</label>
                                <input id="orderId" value={invoice.orderId} className="form-control input-md" readOnly type="text" />
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã số thuế(<small className="text-danger">*</small>)</label>
                                <input id="invoiceId" value={invoice.taxCode} onChange={e => setInvoice({ ...invoice, taxCode: e.target.value })} placeholder="Mã hóa đơn" className="form-control input-md" type="number" />
                                <small className="form-text text-danger">{validationMsg.taxCode}</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Nhân viên priceo hàng(<small className="text-danger">*</small>)</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={e => setInvoice({ ...invoice, shipperId: e.target.value })}
                                    value={invoice.shipperId}>
                                    {shipper.map((sp, index) => {
                                        return <option key={index} value={sp.shipperId}>{sp.fullName} - {sp.shipperId}</option>
                                    })}
                                </select>
                                <small className="form-text text-danger">{validationMsg.shipperId}</small>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    shipper: state.shipper
})

const mapDispatchToProps = dispatch => {
    return ({
        onFetchShipper: () => {
            dispatch(actFetchshipperReq())
        },
        onAddInvoice: (invoice,history) => {
            return dispatch(actAddInvoiceRequest(invoice,history))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceActionPage)
