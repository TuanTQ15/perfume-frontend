import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actDeletePromotionRequest } from '../../actions/promotion';
import { formatDate } from '../../utils/formatDate';

export const PromotionItem = ({ item, onDeletePromotion }) => {

    function deletePromotion(promotionId) {
        onDeletePromotion(promotionId)
    }
    return (
        <tr>
            <td>{item.promotionId}</td>
            <td>{item.promotionName}</td>
            <td>{formatDate(new Date(item.startDate))}</td>
            <td>{formatDate(new Date(item.endDate))}</td>
            <td>{item.employeeId}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => deletePromotion(item.promotionId)}>Xóa</button>
                {new Date(item.endDate) < new Date() ? "" : 
                <Link to={`/editPromotion/${item.promotionId}`} >
                    <button  type="button" className="btn btn-info" >Sửa</button>
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
