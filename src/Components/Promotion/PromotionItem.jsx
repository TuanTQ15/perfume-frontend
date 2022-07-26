import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actDeletePromotionRequest } from '../../actions/promotion';
import { formatDate } from '../../utils/formatDate';
import callApi from '../../utils/apiCaller';
import { getTokenEmployee } from './../../actions/getNV'
export const PromotionItem = ({ item, onDeletePromotion }) => {

    function deletePromotion(promotionId) {
        onDeletePromotion(promotionId)
    }
    const [disable, setDisable] = useState(true)
    const checkForDelete = async (promotionId) => {
        return await callApi(`promotion/${promotionId}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res != null) {
                if (new Date(item.endDate) < new Date() || res.data.detailPromotionList.length != 0) {
                    return true
                } else {
                    return false
                }
            }else{
                return true
            }
           
        });


    }


    checkForDelete(item.promotionId).then(data => {
        setDisable(data)
    }).catch(err => {
        setDisable(true)
    });
    
    return (
        <tr>
            <td>{item.promotionId}</td>
            <td>{item.promotionName}</td>
            <td>{formatDate(new Date(item.startDate))}</td>
            <td>{formatDate(new Date(item.endDate))}</td>
            <td>{item.employeeId}</td>
            <td>
                <button disabled={disable}
                    type="button" className="btn btn-danger" onClick={() => deletePromotion(item.promotionId)}>Xóa</button>
                {
                    <Link to={`/editPromotion/${item.promotionId}`} >
                        <button type="button" className="btn btn-info"
                            disabled={new Date(item.endDate) < new Date() ? true : false}>Sửa</button>
                    </Link>}
                {/* <Link to={`/editPromotion/${item.promotionId}`} >
                    <button hidden={ ? true : false} type="button" className="btn btn-info" >Sửa</button>
                </Link> */}
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        onDeletePromotion: (promotionId) => {
            dispatch(actDeletePromotionRequest(promotionId))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(PromotionItem)
