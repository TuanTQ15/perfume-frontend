import React from 'react'
import { formatDate } from '../../utils/formatDate'
import useModal from '../ToggleModal/useModal';
import ModalDetailReceipt from './ModalDetailReceipt';

export const ReceiptItem = ({ item }) => {
    const { isShowing, toggle } = useModal();

    return (
        <tr>
            <td>{item.receiptId}</td>
            <td>{formatDate(new Date(item.createdDate))}</td>
            <td>{item.employeeId}</td>
            <td>{item.orderSupplyId}</td>
            <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={toggle}>
                    <i className="fas fa-info-circle"></i>&nbsp;Info
                </button>
            </td>
            <ModalDetailReceipt item={item} isShowing={isShowing} hide={toggle} />
        </tr>
    )
}

export default ReceiptItem
