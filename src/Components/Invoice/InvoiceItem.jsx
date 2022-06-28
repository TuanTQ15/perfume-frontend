import React from 'react'
import NumberFormat from 'react-number-format'
import { formatDate } from '../../utils/formatDate';
import useModal from '../ToggleModal/useModal';
import DetaiInvoice from './DetaiInvoice'

export const InvoiceItem = ({ item }) => {

    const { isShowing, toggle } = useModal();

    return (
        <tr>
            <td>{item.invoiceId}</td>
            <td>{formatDate(new Date(item.dateCreated))}</td>
            <td> <NumberFormat value={item.total} displayType={'text'} thousandSeparator={true} suffix={"đ"} /></td>
            <td>{item.taxCode}</td>
            <td>{item.orderId}</td>
            <td>{item.employeeId}</td>
            <td>{item.shipperId}</td>
            <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={toggle}>
                    <i className="fas fa-info-circle"></i>&nbsp;Info
                </button>
            </td>
            <DetaiInvoice item={item} isShowing={isShowing} hide={toggle} />
        </tr>
    )
}

export default InvoiceItem