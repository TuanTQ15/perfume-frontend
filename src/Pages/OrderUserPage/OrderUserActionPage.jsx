import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import ReactDatePicker from 'react-datepicker'
import { getNV, getTokenEmployee } from './../../actions/getNV'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useHistory } from 'react-router'
import { actUpdateNgayGiaoReq } from '../../actions/order'

const MySwal = withReactContent(Swal)

export const OrderUserActionPage = ({ match, handleUpdateOrder }) => {
    var history = useHistory()
    const [value, setValue] = useState({
        ID_PHIEUDAT: '',
        HOTEN: '',
        DIACHI: '',
        SODIENTHOAI: '',
        NGAYDAT: new Date(),
        NGAYGIAO: new Date(),
        GHICHU: ""
    })

    const [validationMsg, setvalidationMsg] = useState('')

    // function hasWhiteSpace(s) {
    //     return s.indexOf(' ') >= 0;
    // }

    const validateAll = () => {
        const msg = {}
        const ngaygiao = value.NGAYDAT.setDate(value.NGAYDAT.getDate() + 1)
        if (ngaygiao > value.NGAYGIAO) {
            msg.NGAYGIAO = "Ngày giao dự kiến phải chọn sau ngày đặt ít nhất 1 ngày"
        }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    }

    useEffect(() => {
        (async () => {
            var data = await callApi(`OrderUser/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                return res.data
            });
            var nv = getNV(history);
            if (data !== undefined && nv != null) {
                setValue({
                    ...data,
                    NGAYDAT: new Date(data.NGAYDAT),
                    NGAYGIAO: new Date(data.NGAYGIAO),
                    MA_NV: nv.actort
                })
            }
        })()


        //eslint-disable-next-line
    }, [])


    async function handleSubmit(e) {
        e.preventDefault()
        const isValid = validateAll()
        //validate

        if (isValid) {
            // console.log(JSON.stringify(value))

            let res = await handleUpdateOrder(value)
            if (res.result === 1) {
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
                                Sửa ngày giao của phiếu đặt
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">ID Phiếu đặt </label>
                                <input id="ID_PHIEUDAT" value={value.ID_PHIEUDAT}
                                    onChange={e => setValue({ ...value, ID_PHIEUDAT: e.target.value })}
                                    placeholder="ID Phiếu đặt" className="form-control input-md" type="text"
                                    readOnly />
                                <small className="form-text text-danger">{validationMsg.ID_PHIEUDAT}</small>
                            </div>
                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Họ và tên(<small className="text-danger">*</small>)</label>
                                <input id="HOTEN" value={value.HOTEN}
                                    onChange={e => setValue({ ...value, HOTEN: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên"
                                    readOnly />
                                <small className="form-text text-danger">{validationMsg.HOTEN}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Họ và tên</label>
                                <input id="HOTEN" value={value.DIACHI}
                                    onChange={e => setValue({ ...value, DIACHI: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên"
                                    readOnly />

                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Họ và tên</label>
                                <input id="HOTEN" value={value.SODIENTHOAI}
                                    onChange={e => setValue({ ...value, SODIENTHOAI: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên" readOnly />
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="NVGH">Ngày đặt</label>
                                <ReactDatePicker
                                    selected={value.NGAYDAT}
                                    className="form-control" readOnly
                                />
                                <small className="form-text text-danger">{validationMsg.NGAYSINH}</small>
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="NVGH">Ngày giao</label>
                                <ReactDatePicker
                                    selected={value.NGAYGIAO}
                                    className="form-control"
                                    showTimeSelect
                                    onChange={date => setValue({ ...value, NGAYGIAO: new Date(date) })} //only when value has changed
                                />
                                <small className="form-text text-danger">{validationMsg.NGAYGIAO}</small>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="HOTEN">Họ và tên</label>
                                <input id="HOTEN" value={value.GHICHU}
                                    onChange={e => setValue({ ...value, GHICHU: e.target.value })}
                                    className="form-control input-md" type="text"
                                    placeholder="Họ và tên" readOnly />
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
        handleUpdateOrder: order => {
            return dispatch(actUpdateNgayGiaoReq(order))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderUserActionPage)
