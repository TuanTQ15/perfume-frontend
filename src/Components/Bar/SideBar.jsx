import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import "./../../assets/css/sb-admin-2.min.css"

function SideBar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" >
            {/* style={{position : 'fixed'}} */}
            {/* <!-- Sidebar - Brand --> */}
            <Link to="/" className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Ecommerce<sup>TM</sup></div>
            </Link>

            {/* <!-- Divider --> */}
            {/* <hr className="sidebar-divider my-0" /> */}
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">
                Sản phẩm
            </div>

            {/* <!-- Nav Item - Dashboard --> */}
            <li className="nav-item">
             
                <Link to="/" className="nav-link" >
                    <i className="fas fa-list"></i>
                    <span>Sản phẩm</span>
                </Link>
            </li>
            {/* <li className="nav-item">
                <Link to="/product" className="nav-link" >
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Nước hoa</span>
                </Link>
            </li> */}

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Nhân Sự
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/employee">
                    <i className="fas fa-user-cog"></i>
                    <span>Nhân viên</span>
                </Link>
                <Link className="nav-link" to="/user">
                    <i className="fas fa-users"></i>
                    <span>Người dùng</span>
                </Link>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Đối tác
            </div>
            <li className="nav-item">
                <Link className="nav-link" to="/brand">
                    <i className="fas fa-building"></i>
                    <span>Hãng</span>
                </Link>
                <div className="nav-item">
                    <a href="/#" className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages2"
                        aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-shipping-fast"></i>
                        <span>Đơn vị VC</span>
                    </a>
                    <div id="collapsePages2" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Đơn vị VC:</h6>
                            <Link className="collapse-item" to="/shippingCompany">Công ty VC</Link>
                            <Link className="collapse-item" to="/shipper">Nhân viên giao hàng</Link>
                            {/* <div className="collapse-divider"></div>
                        <h6 className="collapse-header">Other Pages:</h6> */}
                        </div>
                    </div>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Nhập hàng
            </div>

            <li className="nav-item">
                <Link className="nav-link" to="/orderSupply">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Đơn đặt hàng từ hãng</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/receipt">
                    <i className="fas fa-receipt"></i>
                    <span>Phiếu nhập hàng</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Xuất hàng
            </div>

            <li className="nav-item">
                <Link className="nav-link" to="/order">
                    <i className="fas fa-scroll"></i>
                    <span>Phiếu đặt của người dùng</span>
                </Link>
            </li>

            


            <li className="nav-item">
                <Link className="nav-link" to="/invoice">
                    <i className="fas fa-file-invoice"></i>
                    <span>Hóa đơn</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/promotion">
                    <i className="fas fa-percent"></i>
                    <span>Khuyến mãi</span>
                </Link>
            </li>

            {/* <li className="nav-item">
                <Link className="nav-link" to="/returnOrder">
                    <i className="fas fa-undo-alt"></i>
                    <span>Trả hàng</span>
                </Link>
            </li> */}

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider" />

            {/* <!-- Heading --> */}
            <div className="sidebar-heading">
                Thống kê
            </div>


            <li className="nav-item">
                <a href="/#" className="nav-link collapsed" data-toggle="collapse" data-target="#collapsePages"
                    aria-expanded="true" aria-controls="collapsePages">
                    <i className="fas fa-chart-bar"></i>
                    <span>Biểu đồ thông kê</span>
                </a>
                <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <h6 className="collapse-header">Thống kê:</h6>
                        <Link className="collapse-item" to="/revenue">Thống kê doanh thu</Link>
                        <Link className="collapse-item" to="/profit">Thống kê lợi nhuận</Link>
                    </div>
                </div>
            </li>

            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />

            {/* <!-- Sidebar Toggler (Sidebar) --> */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>


        </ul>

    )
}

export default memo(SideBar)
