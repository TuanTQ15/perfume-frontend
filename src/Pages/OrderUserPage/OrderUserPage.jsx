import React from 'react'
import TopBar from "./../../Components/Bar/TopBar"
import SideBar from "./../../Components/Bar/SideBar"
import Order from '../../Components/Order/Order'

function OrderUserPage() {
    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar />
                    <Order />
                    {/* style ={{marginLeft: 220}} */}
                </div>
            </div>
        </div>
    )
}

export default OrderUserPage
