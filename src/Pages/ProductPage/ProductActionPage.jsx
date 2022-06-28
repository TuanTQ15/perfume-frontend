import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import { actAddProductRequest, actUpdateProductRequest } from '../../actions/product'
import "./../../assets/css/sb-admin-2.min.css";
import { getTokenEmployee } from './../../actions/getNV'

export const ProductActionPage = (props) => {
    const [checkAdd, setcheckAdd] = useState(true)

    const [MA_SP, setMA_SP] = useState("")
    const [DUNGTICH, setDUNGTICH] = useState("")
    const [GIA, setGIA] = useState("")
    const [SOLUONGTON, setSOLUONGTON] = useState("")
    const [MA_DSP, setMA_DSP] = useState("")

    useEffect(() => {
        async function fetchAPI() {
            if (props.match === undefined) {
                setcheckAdd(true)
            } else {
                setcheckAdd(false)
                let detailProduct = await callApi(`/Perfume/${props.match.params.id.trim()}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                    return res.data
                });
                setMA_SP(detailProduct.MA_SP)
                setDUNGTICH(detailProduct.DUNGTICH)
                setGIA(detailProduct.GIA)
                setSOLUONGTON(detailProduct.SOLUONGTON)
                setMA_DSP(detailProduct.MA_DSP)
            }
        }
        fetchAPI()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleSubmit(e) {
        e.preventDefault()
        var sp = {
            MA_SP,
            DUNGTICH,
            GIA,
            SOLUONGTON,
            MA_DSP
        }
        if (checkAdd === true) {
            props.onAddProduct(sp, props.history)
        }
        else {
            props.onUpdateProduct(sp, props.history)
        }
    }

    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar history={props.history} />
                    <div className="container" >
                        {/* style ={{marginLeft: 220}} */}

                        <div className="py-3 mb-20" >
                            <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                                {checkAdd ? "Thêm sản phẩm" : "Sửa sản phẩm"}
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã sản phẩm(<small className="text-danger">*</small>)</label>
                                <div className="">
                                    <input id="MA_SP" onChange={checkAdd ? e => setMA_SP(e.target.value) : null} readOnly={checkAdd ? '' : 'readOnly'} value={MA_SP} name="MA_SP" placeholder="Mã sản phẩm" className="form-control input-md" required="" type="text" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className=" control-label" htmlFor="DUNGTICH">Dung tích(<small className="text-danger">*</small>)</label>
                                <div className="">
                                    <input id="DUNGTICH" onChange={e => setDUNGTICH(e.target.value)} value={DUNGTICH} name="DUNGTICH" placeholder="Dung tích" className="form-control input-md" required="" type="number" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="DUNGTICH">Giá(<small className="text-danger">*</small>)</label>
                                <div className="">
                                    <input id="GIA" onChange={e => setGIA(e.target.value)} value={GIA} name="GIA" pattern="^\d{1,3}(,\d{3})*(\.\d+)\$?$" data-type="currency" placeholder="Giá" className="form-control input-md" required="" type="number" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className=" control-label" htmlFor="DUNGTICH">Số lượng tồn(<small className="text-danger">*</small>)</label>
                                <div className="">
                                    <input id="SOLUONGTON" onChange={e => setSOLUONGTON(e.target.value)} value={SOLUONGTON} name="SOLUONGTON" placeholder="Số lượng tồn" className="form-control input-md" required="" type="number" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã Dòng sản phẩm(<small className="text-danger">*</small>)</label>
                                <div className="">
                                    <input id="MA_DSP" onChange={e => setMA_DSP(e.target.value)} value={MA_DSP} name="MA_DSP" placeholder="Mã Dòng sản phẩm" className="form-control input-md" required="" type="text" />
                                </div>
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
        onAddProduct: (product, history) => {
            dispatch(actAddProductRequest(product, history))
        },
        onUpdateProduct: (product, history) => {
            dispatch(actUpdateProductRequest(product, history))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage)
