import React, { useEffect } from 'react'
import Promotion from '../../Components/Promotion/Promotion'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'


function ProductPage(props) {
    useEffect(() => {
        try {
            let data = JSON.parse(localStorage.getItem("employee"))
            if (data === null) {
                props.history.push('/login')
            }
        } catch (error) {
            console.log(error)
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar />
                    <Promotion />
                    {/* style ={{marginLeft: 220}} */}
                </div>
            </div>
        </div>
    )
}

export default ProductPage
