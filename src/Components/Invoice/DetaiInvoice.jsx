import React from 'react';
import ReactDOM from 'react-dom';
import NumberFormat from 'react-number-format';
import { formatDate } from './../../utils/formatDate';


const Modal = ({ isShowing, hide, item }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className="modal fade bd-example-modal-lg"
      // nhớ phải thêm sự kiện onblur để ẩn k nó sẽ k xóa Portal cũ làm hiện lại Modal cũ chứ k hiện modal mới click
      tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" onBlur={hide}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="text-left logo p-2 px-5"></div>
                  <div className="invoice p-5">
                    <h5>Hoá đơn</h5>
                    <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <td>
                              <div className="py-2"> <span className="d-block text-muted">Ngày đặt</span> <span>{formatDate(new Date(item.dateCreated))}</span> </div>
                            </td>
                            <td>
                              <div className="py-2"> <span className="d-block text-muted">Mã hóa đơn</span> <span>{item.MA_HOADON}</span> </div>
                            </td>
                            <td>
                              <div className="py-2"> <span className="d-block text-muted">Hình thức thành toán</span> <span><img src="https://img.icons8.com/color/48/000000/mastercard.png" width="20" alt="" /></span> </div>
                            </td>
                            <td>
                              <div className="py-2"> <span className="d-block text-muted">Mã số thuế</span> <span>{item.taxCode}</span> </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style={{ marginLeft: 10 }}>Địa chỉ :&nbsp;&nbsp; {item.address}</p>
                    </div>
                    <div className="product border-bottom table-responsive">
                      <table className="table table-borderless">
                        <tbody>
                          {item.detailOrderList.map((ct, index) => {
                            return <tr key={index}>
                              <td width="60%"> <span className="font-weight-bold">{ct.productName}</span>
                                <div className="product-qty"> <span className="d-block">Số lượng:&nbsp;{ct.quantity}</span> <span>Origin:&nbsp;{ct.origin}</span> </div>
                              </td>
                              <td width="20%">
                                <div className="text-right">
                                  <span className="font-weight-bold">
                                    <NumberFormat displayType={'text'} value={ct.price} suffix={'đ'} thousandSeparator={true} />
                                  </span>
                                </div>
                              </td>
                            </tr>

                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="row d-flex justify-content-end">
                      <div className="col-md-5">
                        <table className="table table-borderless">
                          <tbody className="totals">
                            <tr className="border-bottom">
                              <td>
                                <div className="text-left"> <span className="font-weight-bold">Tổng cộng</span> </div>
                              </td>
                              <td>
                                <div className="text-right">
                                  <span className="font-weight-bold">
                                    <NumberFormat value={item.totalPrice} displayType={'text'} suffix={'đ'} thousandSeparator={true} />
                                  </span>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between footer p-3"> <span>Need Help? visit our <a href="/#"> help center</a></span> <span>{formatDate(new Date(item.dateCreated))}</span> </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;