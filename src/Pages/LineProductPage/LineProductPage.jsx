import React, { useEffect } from 'react'
import LineProductList from '../../Components/LineProduct/LineProductList'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
// import callApiForPaypalGetToken from '../../utils/apiCallerGettoken'

function LineProductPage(props) {
    useEffect(() => {
        // (async () => {
        //     let res = await callApiForPaypalGetToken("v1/oauth2/token")
        //     console.log(res)
        // })()
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
                    <LineProductList />
                    {/* style ={{marginLeft: 220}} */}
                </div>
            </div>
        </div>
    )
}

export default LineProductPage
