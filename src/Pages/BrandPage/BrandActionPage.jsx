import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import isEmpty from "validator/lib/isEmpty"
import isemail from "validator/lib/isEmail"
import { actAddBrandRequest, actUpdateBrandRequest } from '../../actions/brand'
import { getTokenEmployee } from './../../actions/getNV'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export const BrandActionPage = ({ match, onUpdateBrand, history, onAddBrand }) => {

    const [checkAdd, setcheckAdd] = useState(true)
    // const [order, setOrder] = useState(null)
    const [Brand, setBrand] = useState({
        // brandId: '',
        brandName: '',
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
        // if (isEmpty(Brand.brandId)) {
        //     msg.brandId = "Trường này không được để trống"
        // } else if (Brand.length > 10) {
        //     msg.brandId = "Mã nhân viên không được dài hơn 10 kí tự"
        // } else if (hasWhiteSpace(Brand.brandId.trim())) {
        //     msg.brandId = "Trường này không được có khoảng trống"
        // }

        if (isEmpty(Brand.brandName)) {
            msg.brandName = "Trường này không được để trống"
        }

        if (isEmpty(Brand.address)) {
            msg.address = "Trường này không được để trống"
        }

        if (isEmpty(Brand.email)) {
            msg.email = "Trường này không được để trống"
        } else if (!isemail(Brand.email)) {
            msg.email = "Trường này phải là email"
        }

        if (isEmpty(Brand.phoneNumber)) {
            msg.phoneNumber = "Trường này không được để trống"
        } else if (Brand.phoneNumber.length !== 10) {
            msg.phoneNumber = "Số điện thoại cần đúng 10 chữ số"
        }else if (hasWhiteSpace(Brand.phoneNumber)) {
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
                let data = await callApi(`brand/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                    return res.data
                });
                setBrand(data)
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
            // console.log(JSON.stringify(Brand))
            if (checkAdd === true) {
                let res = await onAddBrand(Brand)
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
                let res = await onUpdateBrand(Brand)
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
                                {checkAdd ? "THÊM HÃNG" : "SỬA HÃNG"}
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã Hãng (<small className="text-danger">*</small>)</label>
                                <input id="brandId" value={Brand.brandId}
                                    onChange={e => setBrand({ ...Brand, brandId: e.target.value })}
                                    placeholder="Mã hãng" className="form-control input-md" type="text"
                                    readOnly={checkAdd ? false : true} />
                                <small className="form-text text-danger">{validationMsg.brandId}</small>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="brandName">Tên hãng(<small className="text-danger">*</small>)</label>
                                <input id="brandName" value={Brand.brandName}
                                    onChange={e => setBrand({ ...Brand, brandName: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Tên hãng" />
                                <small className="form-text text-danger">{validationMsg.brandName}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="brandName">Địa chỉ(<small className="text-danger">*</small>)</label>
                                <input id="brandName" value={Brand.address}
                                    className="form-control input-md" type="text"
                                    onChange={e => setBrand({ ...Brand, address: e.target.value })}
                                    placeholder="Địa chỉ"
                                />
                                <small className="form-text text-danger">{validationMsg.address}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="brandName">Số điện thoại(<small className="text-danger">*</small>)</label>
                                <input id="brandName" value={Brand.phoneNumber}
                                    className="form-control input-md" type="text"
                                    onChange={e => setBrand({ ...Brand, phoneNumber: e.target.value })}
                                    placeholder="Số điện thoại"
                                />
                                <small className="form-text text-danger">{validationMsg.phoneNumber}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="brandName">email(<small className="text-danger">*</small>)</label>
                                <input id="brandName" value={Brand.email}
                                    className="form-control input-md" type="text"
                                    onChange={e => setBrand({ ...Brand, email: e.target.value })}
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
        onAddBrand: (Brand) => {
            return dispatch(actAddBrandRequest(Brand))
        },
        onUpdateBrand: (Brand) => {
            return dispatch(actUpdateBrandRequest(Brand))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandActionPage)
