import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import { actAddemployeeRequest, actUpdateemployeeRequest } from '../../actions/employee'
import isEmpty from "validator/lib/isEmpty"
import isemail from "validator/lib/isEmail"
import ReactDatePicker from 'react-datepicker'
import { getTokenEmployee } from './../../actions/getNV'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const EmployeeActionPage = ({ match, onUpdateEmployee, history, onAddemployee }) => {

    const [checkAdd, setcheckAdd] = useState(true)
    // const [order, setOrder] = useState(null)
    const [employee, setemployee] = useState({
        // id: '',
        fullName: '',
        dateOfBirth: new Date(),
        address: '',
        phoneNumber: '',
        email: '',
        password: '',
        role : "ROLE_ADMIN"
    })

    const [validationMsg, setvalidationMsg] = useState('')

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

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
        // if (isEmpty(employee.id)) {
        //     msg.id = "Trường này không được để trống"
        // } else if (employee.length > 10) {
        //     msg.id = "Mã nhân viên không được dài hơn 10 kí tự"
        // }

        if (isEmpty(employee.fullName)) {
            msg.fullName = "Trường này không được để trống"
        }

        if (isEmpty(employee.address)) {
            msg.address = "Trường này không được để trống"
        }

        if (getAge(employee.dateOfBirth) < 18) {
            msg.dateOfBirth = "Nhân viên cần trên 18 tuổi"
        }
        if(isEmpty(employee.phoneNumber)){
            msg.phoneNumber="Số điện thoại không được để trống"
        }
        if (isEmpty(employee.email)) {
            msg.email = "Trường này không được để trống"
        } else if (!isemail(employee.email)) {
            msg.email = "Trường này phải là email"
        }

        if (isEmpty(employee.password)) {
            msg.password = "Trường này không được để trống"
        } else if (employee.password.length < 6) {
            msg.password = "passwordWord phải dài hơn 6 kí tự"
        } else if (hasWhiteSpace(employee.password)) {
            msg.password = "passwordWord không được chứa khoảng trống"
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
                await callApi(`employee/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                    console.log(res.data);
                    // setemployee(res.data)
                    setemployee({
                        ...res.data,
                        dateOfBirth: new Date(res.data.dateOfBirth)
                    })
                });
                setcheckAdd(false)
            }

        })()

        //eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     if (employee != null) {
    //         console.log(employee)
    //         setemployee({
    //             ...employee,
    //             dateOfBirth : new Date(employee.dateOfBirth)
    //         })
    //     }// eslint-disable-next-line
    // }, [employee])



    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateAll()
        //validate
        // console.log(employee)

        if (isValid) {
            console.log(JSON.stringify(employee))
            if (checkAdd === true) {
                let res = await onAddemployee(employee, history)
                if (res.result) {
                    MySwal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.goBack()
                    // dispatch(actUpdateLineemployee(lineemployee));
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.message
                    })
                }
            } else {

                let res =  await onUpdateEmployee(employee, history)
                if (res.result) {
                    MySwal.fire({
                        icon: 'success',
                        title: res.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.goBack()
                    // dispatch(actUpdateLineemployee(lineemployee));
                } else {
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
                                {checkAdd ? "THÊM NHÂN VIÊN" : "SỬA NHÂN VIÊN"}
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã Nhân viên (<small className="text-danger">*</small>)</label>
                                <input id="id" value={employee.id}
                                    onChange={e => setemployee({ ...employee, id: e.target.value })}
                                    placeholder="Mã nhân viên" className="form-control input-md" type="text"
                                    readOnly={checkAdd ? false : true} />
                                <small className="form-text text-danger">{validationMsg.id}</small>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Họ và tên(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={employee.fullName}
                                    onChange={e => setemployee({ ...employee, fullName: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên" />
                                <small className="form-text text-danger">{validationMsg.fullName}</small>
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="NVGH">Ngày sinh(<small className="text-danger">*</small>)</label>
                                <ReactDatePicker
                                    selected={employee.dateOfBirth}
                                    // onSelect={handleDateSelect} //when day is clicked
                                    className="form-control"
                                    onChange={date => setemployee({ ...employee, dateOfBirth: date })} //only when value has changed
                                />
                                <small className="form-text text-danger">{validationMsg.dateOfBirth}</small>
                            </div>


                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Địa chỉ(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={employee.address}
                                    className="form-control input-md" type="text"
                                    onChange={e => setemployee({ ...employee, address: e.target.value })}
                                    placeholder="Địa chỉ"
                                />
                                <small className="form-text text-danger">{validationMsg.address}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Số điện thoại(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={employee.phoneNumber}
                                    className="form-control input-md" type="number"
                                    onChange={e => setemployee({ ...employee, phoneNumber: e.target.value })}
                                    placeholder="Số điện thoại"
                                />
                                <small className="form-text text-danger">{validationMsg.phoneNumber}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Email(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={employee.email}
                                    className="form-control input-md" type="text"
                                    onChange={e => setemployee({ ...employee, email: e.target.value })}
                                    placeholder="email"
                                />
                                <small className="form-text text-danger">{validationMsg.email}</small>
                            </div>

                            {/* {checkAdd ? <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Mật khẩu(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={employee.password}
                                    className="form-control input-md" type="passwordword"
                                    onChange={e => setemployee({ ...employee, password: e.target.value })}
                                    placeholder="Mật khẩu"
                                />
                                <small className="form-text text-danger">{validationMsg.password}</small>
                            </div> : ""} */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="fullName">Mật khẩu(<small className="text-danger">*</small>)</label>
                                <input id="fullName" value={employee.password}
                                    className="form-control input-md" type="password"
                                    onChange={e => setemployee({ ...employee, password: e.target.value })}
                                    placeholder="Mật khẩu"
                                />
                                <small className="form-text text-danger">{validationMsg.password}</small>
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
        onAddemployee: (employee, history) => {
            return dispatch(actAddemployeeRequest(employee, history))
        },
        onUpdateEmployee: (employee, history) => {
            return dispatch(actUpdateemployeeRequest(employee, history))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeActionPage)
