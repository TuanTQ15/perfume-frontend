import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actFetchEmployeesRequest } from '../../actions/employee'
import NavigationSwitchPage from '../Navigation/NavigationSwitchPage'
import EmployeeItem from './EmployeeItem'

export const ProductList = ({ employee, onFetchEmployee }) => {

    const [pages, setpages] = useState(1)
    const [filter, setfilter] = useState("")


    function filterProduct(list, value) {
        if (value === null || value === undefined) return list
        else {
            list = list.filter(params => {
                // params.MA_NV.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
                return params.fullName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
            })
            return list
        }
    }

    useEffect(() => {
        // phải dung asyn vì nó sẽ fetch ra lise line product k kịp dẫn tới lấy state cũ 
        //vì state mới chưa kịp thay đổi do dang trong thời gian fetch
        async function fectchProduct() {
            await onFetchEmployee()
        }
        fectchProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    employee = filterProduct(employee, filter)

    var productList = employee.map((linepro, index) => {
        if (index >= (pages - 1) * 10 && index < pages * 10) {
            return <EmployeeItem item={linepro} key={index} />
        }
        return null
    })

    console.log(employee)
    return (
        <div className="container-fluid">

            {/* <!-- Page Heading --> */}
            <h1 className="h3 mb-2 text-gray-800">Nhân viên</h1>



            {/* <!-- DataTales Example --> */}
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Dữ liệu bảng</h6>
                    <div className="row">
                        <div className="col-xl-12 d-flex justify-content-end" >
                            <Link to="/addEmployee">
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
                                    <span className="px-2">Nhân viên</span>
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
                                    <th className="col-md-1">Mã NV</th>
                                    <th className="col-md-2">Họ và tên</th>
                                    <th className="col-md-2">Ngày sinh</th>
                                    <th className="col-md-2">Địa chỉ</th>
                                    <th className="col-md-1">Số điện thoại</th>
                                    <th className="col-md-3">Email</th>
                                    <th className="col-md-1">Action</th>
                                </tr>
                            </thead>
                            <tfoot>
                                <tr>
                                    <th className="col-md-1">Mã NV</th>
                                    <th className="col-md-2">Họ và tên</th>
                                    <th className="col-md-2">Ngày sinh</th>
                                    <th className="col-md-2">Địa chỉ</th>
                                    <th className="col-md-1">Số điện thoại</th>
                                    <th className="col-md-3">Email</th>
                                    <th className="col-md-1">Action</th>
                                </tr>
                            </tfoot>
                            <tbody>
                                {productList}
                            </tbody>
                        </table>
                        <NavigationSwitchPage entries={employee.length} onReceivePage={p => setpages(p)} />
                    </div>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    employee: state.employee
})

const mapDispatchToProps = (dispatch) => {
    return ({
        onFetchEmployee: () => {
            dispatch(actFetchEmployeesRequest())
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
