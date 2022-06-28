import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import { actAddUserRequest, actUpdateUserRequest } from '../../actions/user'
import isEmpty from "validator/lib/isEmpty"
import isEmail from "validator/lib/isEmail"
import ReactDatePicker from 'react-datepicker'
import { getTokenEmployee } from './../../actions/getNV'

export const UserActionPage = ({ match, onUpdateUser, history, onAddUser }) => {

    const [checkAdd, setcheckAdd] = useState(true)
    // const [order, setOrder] = useState(null)
    const [User, setUser] = useState({
        MA_KH: '',
        HOTEN: '',
        NGAYSINH: new Date(),
        DIACHI: '',
        SODIENTHOAI: '',
        EMAIL: '',
        PASS: ''
    })

    const [validationMsg, setvalidationMsg] = useState('')

    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }

    // function getAge(dateString) {
    //     var today = new Date();
    //     var birthDate = new Date(dateString);
    //     var age = today.getFullYear() - birthDate.getFullYear();
    //     var m = today.getMonth() - birthDate.getMonth();
    //     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }
    //     return age;
    // }

    const validateAll = () => {
        const msg = {}
        if (isEmpty(User.MA_KH)) {
            msg.MA_KH = "Trường này không được để trống"
        } else if (User.length > 10) {
            msg.MA_KH = "Mã khách hàng không được dài hơn 10 kí tự"
        }

        if (isEmpty(User.HOTEN)) {
            msg.HOTEN = "Trường này không được để trống"
        }

        if (isEmpty(User.DIACHI)) {
            msg.DIACHI = "Trường này không được để trống"
        }

        // if (getAge(User.NGAYSINH) < 18) {
        //     msg.NGAYSINH = "Khách hàng cần trên 18 tuổi"
        // }

        if (isEmpty(User.EMAIL)) {
            msg.EMAIL = "Trường này không được để trống"
        } else if (!isEmail(User.EMAIL)) {
            msg.EMAIL = "Trường này phải là email"
        }

        if (isEmpty(User.PASS)) {
            msg.PASS = "Trường này không được để trống"
        } else if (User.PASS.length < 6) {
            msg.PASS = "PassWord phải dài hơn 6 kí tự"
        } else if (hasWhiteSpace(User.PASS)) {
            msg.PASS = "PassWord không được chứa khoảng trống"
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
                await callApi(`User/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                    // setUser(res.data)
                    setUser({
                        ...res.data,
                        NGAYSINH: new Date(res.data.NGAYSINH)
                    })
                });
                setcheckAdd(false)
            }

        })()

        //eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     if (User != null) {
    //         console.log(User)
    //         setUser({
    //             ...User,
    //             NGAYSINH : new Date(User.NGAYSINH)
    //         })
    //     }// eslint-disable-next-line
    // }, [User])



    function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateAll()
        //validate
        console.log(User)

        if (isValid) {
            // console.log(JSON.stringify(User))
            if (checkAdd === true) {
                onAddUser(User, history)
            } else {
                onUpdateUser(User, history)
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
                                {checkAdd ? "THÊM khách hàng" : "SỬA KHÁCH HÀNG"}
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Chứng minh thư (<small className="text-danger">*</small>)</label>
                                <input id="MA_KH" value={User.MA_KH}
                                    onChange={e => setUser({ ...User, MA_KH: e.target.value })}
                                    placeholder="Mã khách hàng" className="form-control input-md" type="text"
                                    readOnly={checkAdd ? false : true} />
                                <small className="form-text text-danger">{validationMsg.MA_KH}</small>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Họ và tên(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={User.HOTEN}
                                    onChange={e => setUser({ ...User, HOTEN: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên" />
                                <small className="form-text text-danger">{validationMsg.HOTEN}</small>
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="NVGH">Ngày sinh(<small className="text-danger">*</small>)</label>
                                <ReactDatePicker
                                    selected={User.NGAYSINH}
                                    // onSelect={handleDateSelect} //when day is clicked
                                    className="form-control"
                                    dateFormat="dd/MM/yyyy"
                                    onChange={date => setUser({ ...User, NGAYSINH: date })} //only when value has changed
                                />
                                <small className="form-text text-danger">{validationMsg.NGAYSINH}</small>
                            </div>


                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Địa chỉ(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={User.DIACHI}
                                    className="form-control input-md" type="text"
                                    onChange={e => setUser({ ...User, DIACHI: e.target.value })}
                                    placeholder="Địa chỉ"
                                />
                                <small className="form-text text-danger">{validationMsg.DIACHI}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Số điện thoại(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={User.SODIENTHOAI}
                                    className="form-control input-md" type="number"
                                    onChange={e => setUser({ ...User, SODIENTHOAI: e.target.value })}
                                    placeholder="Số điện thoại"
                                />
                                <small className="form-text text-danger">{validationMsg.SODIENTHOAI}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Email(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={User.EMAIL}
                                    className="form-control input-md" type="text"
                                    onChange={e => setUser({ ...User, EMAIL: e.target.value })}
                                    placeholder="Email"
                                />
                                <small className="form-text text-danger">{validationMsg.EMAIL}</small>
                            </div>

                            {/* {checkAdd ? <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Mật khẩu(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={User.PASS}
                                    className="form-control input-md" type="password"
                                    onChange={e => setUser({ ...User, PASS: e.target.value })}
                                    placeholder="Mật khẩu"
                                />
                                <small className="form-text text-danger">{validationMsg.PASS}</small>
                            </div> : ""} */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Mật khẩu(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={User.PASS}
                                    className="form-control input-md" type="password"
                                    onChange={e => setUser({ ...User, PASS: e.target.value })}
                                    placeholder="Mật khẩu"
                                />
                                <small className="form-text text-danger">{validationMsg.PASS}</small>
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
        onAddUser: (User, history) => {
            dispatch(actAddUserRequest(User, history))
        },
        onUpdateUser: (User, history) => {
            dispatch(actUpdateUserRequest(User, history))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActionPage)
