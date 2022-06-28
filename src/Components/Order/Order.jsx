import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import "./Order.css"
import OrderPage from './OrderPage'

export const Order = () => {
    const itemRef = useRef([])
    const lineRef = useRef()
    const [status, setStatus] = useState(0)
    var history = useHistory()

    useEffect(() => {
        console.log(itemRef);
        lineRef.current.style.left = itemRef.current[0].offsetLeft + "px";
        lineRef.current.style.width = itemRef.current[0].offsetWidth + "px";
    }, [])

    function handleClick(e) {
        var ele = e.target // lấy ra element để so sanh có có phải là element khi click vô element con hay k
        //nếu click trúng element con thì trả về element cha
        if (e.target.className !== "tab-item" && e.target.className !== "tab-item active") {
            ele = e.target.parentElement
        }
        if (ele.className !== "tab-item active") {
            itemRef.current.forEach((tab, index) => {
                if (tab !== ele) {
                    tab.className = "tab-item"
                } else {
                    tab.className = "tab-item active"
                    setStatus(index)
                    lineRef.current.style.left = tab.offsetLeft + "px";
                    lineRef.current.style.width = tab.offsetWidth + "px";
                }
            })
        }
    }

    return (
        <div>
            <h2 className="text-center" style={{marginTop: 30}}>PHIẾU ĐẶT CỦA KHÁCH HÀNG</h2>
            <div className="tabs d-flex justify-content-center">
                <div className="tab-item active" ref={el => itemRef.current[0] = el} onClick={e => handleClick(e)}>
                    <i className="tab-icon fas fa-hourglass-half"></i>
                    Chờ xét duyệt
                </div>
                <div className="tab-item" ref={el => itemRef.current[1] = el} onClick={e => handleClick(e)}>
                    <i className="tab-icon fas fa-truck"></i>
                    Đang giao hàng
                </div>
                <div className="tab-item" ref={el => itemRef.current[2] = el} onClick={e => handleClick(e)}>
                    <i className="tab-icon fas fa-check-circle"></i>
                    Đã giao hàng thành công
                </div>
                <div className="tab-item" ref={el => itemRef.current[3] = el} onClick={e => handleClick(e)}>
                    <i className="tab-icon fas fa-window-close"></i>
                    Bị hủy
                </div>
                <div className="line" ref={lineRef} ></div>
            </div>
            <div className="tab-content" style={{minHeight: 550}}>
                <OrderPage status={status} history={history}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
