import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import isEmpty from "validator/lib/isEmpty"
import isemail from "validator/lib/isEmail"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getTokenEmployee } from './../../actions/getNV'
import { actAddShippingCompanyRequest, actUpdateShippingCompanyRequest } from './../../actions/shippingCompany'

const MySwal = withReactContent(Swal)


export const ShippingCompanyActionPage = ({ match, onUpdateShippingCompany, history, onAddShippingCompany }) => {

    const [checkAdd, setcheckAdd] = useState(true)
    // const [order, setOrder] = useState(null)
    const [ShippingCompany, setShippingCompany] = useState({
        shippingCompanyId: '',
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
    })

    const [validationMsg, setvalidationMsg] = useState('')

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    const validateAll = () => {
        const msg = {}
        // if (isEmpty(ShippingCompany.shippingCompanyId)) {
        //     msg.shippingCompanyId = "Trường này không được để trống"
        // } else if (ShippingCompany.length > 10) {
        //     msg.shippingCompanyId = "Mã nhân viên không được dài hơn 10 kí tự"
        // } else if (hasWhiteSpace(ShippingCompany.shippingCompanyId.trim())) {
        //     msg.shippingCompanyId = "Trường này không được có khoảng trống"
        // }

        if (isEmpty(ShippingCompany.name)) {
            msg.name = "Trường này không được để trống"
        }

        if (isEmpty(ShippingCompany.address)) {
            msg.address = "Trường này không được để trống"
        }

        // console.log(isemail(ShippingCompany.email.trim()));
        if (isEmpty(ShippingCompany.email)) {
            msg.email = "Trường này không được để trống"
        } else if (!isemail(ShippingCompany.email.trim())) {
            msg.email = "Trường này phải là email"
        }

        if (isEmpty(ShippingCompany.phoneNumber)) {
            msg.phoneNumber = "Trường này không được để trống"
        } else if (ShippingCompany.phoneNumber.length !== 10) {
            msg.phoneNumber = "Số điện thoại cần đúng 10 chữ số"
        }else if (hasWhiteSpace(ShippingCompany.phoneNumber)) {
            msg.phoneNumber = "Trường này không được có khoảng trống"
        }


        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    useEffect(() => {
        (async () => {
            if (match.params.id === undefined) {
                setcheckAdd(true)
            } else {
                let data = await callApi(`sc/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                    // console.log(res.data);
                    return res.data
                });
                setShippingCompany(data)
                setcheckAdd(false)
            }

        })()

        //eslint-disable-next-line
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateAll()
        //validate

        if (isValid) {
            // console.log(JSON.stringify(ShippingCompany))
            if (checkAdd === true) {
                let res = await onAddShippingCompany(ShippingCompany)
                if (res.result) {
                    //tb
                    MySwal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.goBack()
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message
                    })
                }
            } else {
                let res = await onUpdateShippingCompany(ShippingCompany)
                if (res.result) {
                    MySwal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.goBack()
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message
                    })
                }
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
                                {checkAdd ? "THÊM CÔNG TY VẬN CHUYỂN" : "SỬA CÔNG TY VẬN CHUYỂN"}
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã Công ty vận chuyển (<small className="text-danger">*</small>)</label>
                                <input id="shippingCompanyId" value={ShippingCompany.shippingCompanyId}
                                    onChange={e => setShippingCompany({ ...ShippingCompany, shippingCompanyId: e.target.value })}
                                    placeholder="Mã Công ty vận chuyển" className="form-control input-md" type="text"
                                    readOnly={checkAdd ? false : true} />
                                <small className="form-text text-danger">{validationMsg.shippingCompanyId}</small>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="name">Tên Công ty vận chuyển(<small className="text-danger">*</small>)</label>
                                <input id="name" value={ShippingCompany.name}
                                    onChange={e => setShippingCompany({ ...ShippingCompany, name: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Tên Công ty vận chuyển" />
                                <small className="form-text text-danger">{validationMsg.name}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="address">Địa chỉ(<small className="text-danger">*</small>)</label>
                                <input id="address" value={ShippingCompany.address}
                                    className="form-control input-md" type="text"
                                    onChange={e => setShippingCompany({ ...ShippingCompany, address: e.target.value })}
                                    placeholder="Địa chỉ"
                                />
                                <small className="form-text text-danger">{validationMsg.address}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="TEN">Số điện thoại(<small className="text-danger">*</small>)</label>
                                <input id="TEN" value={ShippingCompany.phoneNumber}
                                    className="form-control input-md" type="text"
                                    onChange={e => setShippingCompany({ ...ShippingCompany, phoneNumber: e.target.value })}
                                    placeholder="Số điện thoại"
                                />
                                <small className="form-text text-danger">{validationMsg.phoneNumber}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="TEN">email(<small className="text-danger">*</small>)</label>
                                <input id="TEN" value={ShippingCompany.email}
                                    className="form-control input-md" type="text"
                                    onChange={e => setShippingCompany({ ...ShippingCompany, email: e.target.value })}
                                    placeholder="email"
                                />
                                <small className="form-text text-danger">{validationMsg.email}</small>
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

})

const mapDispatchToProps = dispatch => {
    return ({
        onAddShippingCompany: (ShippingCompany) => {
            return dispatch(actAddShippingCompanyRequest(ShippingCompany))
        },
        onUpdateShippingCompany: (ShippingCompany) => {
            return dispatch(actUpdateShippingCompanyRequest(ShippingCompany))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingCompanyActionPage)
