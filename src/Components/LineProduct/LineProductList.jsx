import React, { useState, useEffect } from 'react'
import "./../../assets/css/sb-admin-2.min.css"
import { connect } from 'react-redux'
import LineProductItem from './LineProductItem'
import NavigationSwitchPage from './../Navigation/NavigationSwitchPage'
import { actFetchLineProductsRequest } from './../../actions/index'
import { Link } from 'react-router-dom'
import { actFetchProductsRequest } from '../../actions/product'
// import callApiForPaypal from '../../utils/apiCallerPaypal'
// import NumberFormat from 'react-number-format'
// import { DetailLineProduct } from './DetailLineProduct'=


const LineProductList = ({ products, onFetchProduct, lineProduct, onFetchLineProduct }) => {
    const [filter, setfilter] = useState("")
    const [pages, setpages] = useState(1)

    function filterLineProductByName(list, value) {
        value = value.trim()
        if (value === null || value === undefined || value === "") return list
        else {
            list = list.filter(params => {
                return params.productName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) !== -1
                //params.productId.indexOf(value.toLowerCase()) !== -1 ||
            })
            return list
        }
    }
    lineProduct = filterLineProductByName(lineProduct, filter)

    // return params.productId.toLowerCase().indexOf(value.toLowerCase()) !== -1 || 
    // params.TEN.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").indexOf(value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g)) !== -1;

    var lineProductList = lineProduct.map((linepro, index) => {
        if (index >= (pages - 1) * 10 && index < pages * 10) {
            return <LineProductItem item={linepro} key={index} />//product={products}

        }
        return null
    })

    useEffect(() => {
        // phải dung asyn vì nó sẽ fetch ra lise line product k kịp dẫn tới lấy state cũ 
        //vì state mới chưa kịp thay đổi do dang trong thời gian fetch
        async function fectchLinepro() {
            await onFetchLineProduct()
            // await onFetchProduct()

        }
        fectchLinepro()
        // console.log(process.env.REACT_APP_CLIENT_ID);
        // console.log(process.env.REACT_APP_SECRET);



        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])




    return (
        <div className="container-fluid">

            {/* <!-- Page Heading --> */}
            <h1 className="h3 mb-2 text-gray-800">Dòng sản phẩm</h1>

            {/* <!-- DataTales Example --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Dữ liệu bảng</h6>
                    <div className="row">
                        <div className="col-xl-12 d-flex justify-content-end" >
                            <Link to="/addlineproduct">
                                <button type="button" className="btn btn-success " style={{ marginRight: 25, marginBottom: 5 }}>Thêm</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6" >
                            <div className="dataTables_length" id="dataTable_length">
                                <label className="d-flex flex-row" >
                                    <span className="px-2">Hiện</span>
                                    <span>
                                        <select name="dataTable_length" aria-controls="dataTable" className="custom-select custom-select-sm form-control form-control-sm">
                                            <option value="10">10</option>
                                            {/* <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option> */}
                                        </select>
                                    </span>
                                    <span className="px-2">dòng sản phẩm</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="container">
                                <div id="dataTable_filter" className="dataTables_filter">
                                    <label className="d-flex flex-row">
                                        <div className="px-2">Search:</div>
                                        <input type="search" className="form-control form-control-sm" aria-controls="dataTable" placeholder="" onChange={(e) => setfilter(e.target.value)} />
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th className="col-md-1">Mã SP</th>
                                    <th className="col-md-4">Tên</th>
                                    <th className="col-sm-1">Số lượng tồn</th>
                                    <th className="col-md-1">Giá</th>
                                    <th className="col-md-2">Danh mục</th>
                                    <th className="col-md-1">Hãng</th>
                                    <th className="col-md-1">Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th className="col-md-1">Mã SP</th>
                                    <th className="col-md-4">Tên</th>
                                    <th className="col-sm-1">Số lượng tồn</th>
                                    <th className="col-md-1">Giá</th>
                                    <th className="col-md-2">Danh mục</th>
                                    <th className="col-md-1">Hãng</th>
                                    <th className="col-md-1">Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {lineProductList}
                            </tbody>
                        </table>
                        <NavigationSwitchPage entries={lineProduct.length} onReceivePage={p => setpages(p)} />
                    </div>
                </div>
            </div>
        </div >
    )
}



const mapStateToProps = (state) => ({
    lineProduct: state.lineproduct,
    products: state.products
})

const mapDispatchToProps = (dispatch) => {
    return ({
        onFetchLineProduct: () => {
            dispatch(actFetchLineProductsRequest())
        }, onFetchProduct: () => {
            dispatch(actFetchProductsRequest())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LineProductList)
