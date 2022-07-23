import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import isEmpty from "validator/lib/isEmpty"
import isemail from "validator/lib/isEmail"
import ReactDatePicker from 'react-datepicker'
import { actAddShipperRequest, actUpdateShipperRequest } from './../../actions/shipper'
import { getTokenEmployee } from './../../actions/getNV'
import { actFetchShippingCompanyReq } from './../../actions/shippingCompany'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const ShipperActionPage = ({ match, onUpdateShipper, history, onAddShipper, shippingCompany, onFetchShippingCompany }) => {

    const [checkAdd, setcheckAdd] = useState(true)
    // const [order, setOrder] = useState(null)
    const [shipper, setShipper] = useState({
        // shipperId: '',
        fullName: '',
        dateOfBirth: new Date(),
        phoneNumber: '',
        email: '',
        shippingCompanyId: ""
    })

    const [validationMsg, setvalidationMsg] = useState('')

    // function hasWhiteSpace(s) {
    //     return s.indexOf(' ') >= 0;
    // }

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const validateAll = () => {
        const msg = {}
        // if (isEmpty(shipper.shipperId)) {
        //     msg.shipperId = "Trường này không được để trống"
        // } else if (shipper.length > 10) {
        //     msg.shipperId = "Mã Nhân viên giao hàng không được dài hơn 10 kí tự"
        // }

        if (isEmpty(shipper.fullName)) {
            msg.fullName = "Trường này không được để trống"
        }


        if (getAge(shipper.dateOfBirth) < 18) {
            msg.dateOfBirth = "Nhân viên cần trên 18 tuổi"
        }
        if(isEmpty(shipper.phoneNumber)){
            msg.phoneNumber="Số điện thoại không được để trống"
        }
        if (isEmpty(shipper.email)) {
            msg.email = "Trường này không được để trống"
        } else if (!isemail(shipper.email)) {
            msg.email = "Trường này phải là email"
        }


        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    useEffect(() => {
        (async () => {
            await onFetchShippingCompany()
            if (match.params.id === undefined) {
                setcheckAdd(true)
            } else {
                var data = await callApi(`shipper/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                    return res.data
                });
                setShipper({
                    ...data,
                    dateOfBirth: new Date(data.dateOfBirth)
                })  
                setcheckAdd(false)
            }
        })()
        
        
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (shippingCompany.length > 0) {
          setShipper({
            ...shipper,
            shippingCompanyId: shippingCompany[0].shippingCompanyId
          })
        }// eslint-disable-next-line react-hooks/exhaustive-deps
      }, [shippingCompany])


    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateAll()
        //validate
        console.log(shipper)

        if (isValid) {
            // console.log(JSON.stringify(Shipper))
            if (checkAdd === true) {

                let res = await onAddShipper(shipper)
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

                let res = await onUpdateShipper(shipper, history)
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
                                {checkAdd ? "THÊM NHÂN VIÊN GIAO HANG" : "SỬA NHÂN VIÊN GIAO HÀNG"}
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã Nhân viên giao hàng (<small className="text-danger">*</small>)</label>
                                <input id="shipperId" value={shipper.shipperId}
                                    onChange={e => setShipper({ ...shipper, shipperId: e.target.value })}
                                    placeholder="Mã Nhân viên giao hàng" className="form-control input-md" type="text"
                                    readOnly={checkAdd ? false : true} />
                                <small className="form-text text-danger">{validationMsg.shipperId}</small>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Họ và tên(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={shipper.fullName}
                                    onChange={e => setShipper({ ...shipper, fullName: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên" />
                                <small className="form-text text-danger">{validationMsg.fullName}</small>
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="NVGH">Ngày sinh(<small className="text-danger">*</small>)</label>
                                <ReactDatePicker
                                    selected={shipper.dateOfBirth}
                                    className="form-control"
                                    onChange={date => setShipper({ ...shipper, dateOfBirth: date })} //only when value has changed
                                />
                                <small className="form-text text-danger">{validationMsg.dateOfBirth}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Số điện thoại(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={shipper.phoneNumber}
                                    className="form-control input-md" type="number"
                                    onChange={e => setShipper({ ...shipper, phoneNumber: e.target.value })}
                                    placeholder="Số điện thoại"
                                />
                                <small className="form-text text-danger">{validationMsg.phoneNumber}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">email(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={shipper.email}
                                    className="form-control input-md" type="text"
                                    onChange={e => setShipper({ ...shipper, email: e.target.value })}
                                    placeholder="email"
                                />
                                <small className="form-text text-danger">{validationMsg.email}</small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlSelect1">Nhân viên giao hàng(<small className="text-danger">*</small>)</label>
                                <select className="form-control" id="exampleFormControlSelect1" onChange={e => setShipper({ ...shipper, shippingCompanyId: e.target.value })}
                                    value={shipper.shippingCompanyId}>
                                    {shippingCompany.map((sp, index) => {
                                        return <option key={index} defaultValue={shipper.shippingCompanyId === sp.shippingCompanyId ? "defaultValue" : ''}
                                            value={sp.shippingCompanyId}>{sp.name} - {sp.shippingCompanyId}</option>
                                    })}
                                </select>
                                <small className="form-text text-danger">{validationMsg.shippingCompanyId}</small>
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
    shippingCompany: state.shippingCompany
})

const mapDispatchToProps = dispatch => {
    return ({
        onFetchShippingCompany: () => {
            dispatch(actFetchShippingCompanyReq())
        },
        onAddShipper: (Shipper, history) => {
            return dispatch(actAddShipperRequest(Shipper, history))
        },
        onUpdateShipper: (Shipper, history) => {
            return dispatch(actUpdateShipperRequest(Shipper, history))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipperActionPage)
