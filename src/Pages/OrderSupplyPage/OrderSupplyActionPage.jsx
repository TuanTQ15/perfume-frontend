import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import "./../../assets/css/sb-admin-2.min.css";
import { actFetchBrandsRequest } from '../../actions/brand'
import isEmpty from "validator/lib/isEmpty"
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "react-datepicker/dist/react-datepicker.css";
import { actAddOrderSupplyRequest, actDeleteDetailOrderSupplyRequest, actUpdateOrderSupplyRequest } from '../../actions/orderSupply'
import { getNV, getTokenEmployee } from '../../actions/getNV'
import { v4 as uuidv4 } from 'uuid'
import NumberFormat from 'react-number-format'

const MySwal = withReactContent(Swal)


export const ProductActionPage = ({ match, brand, onAddOrderSupply, onUpdateOrderSupply, history, onFetchBrand, onDeteleDetail }) => {
  const [checkAdd, setcheckAdd] = useState(true)

  const [detail, setDetail] = useState(null)
  const [validationMsg, setvalidationMsg] = useState('')
  const [validationMsgdetailOSList, setvalidationMsgdetailOSList] = useState([])
  const [value, setValue] = useState({
    orderSupplyId: '',
    bookingDate: new Date(),
    receivedDate: new Date(),
    status: "",
    brandId: "",
    // MA_NV: "",
    detailOSList: [
      {
        id: uuidv4(),
        productId: "",
        quantity: "",
        price: "",
        checkForAdd: true
      }
    ]
  })
  const validateAll = () => {
    const msg = {}
    const msgdetailOSList = []
    // if (isEmpty(value.orderSupplyId)) {
    //   msg.orderSupplyId = "Trường này không được để trống"
    // } else if (value.orderSupplyId.length > 10) {
    //   msg.orderSupplyId = "Mã đơn đặt không được dài hơn 10 kí tự"
    // }

    if (value.receivedDate - value.bookingDate < 0) {
      msg.receivedDate = "Ngày nhận hàng phải trước hoặc bằng ngày hiện tại"
    }

    value.detailOSList.forEach((element) => {
      const validateDetailPromotion = {}
      validateDetailPromotion.id = element.id

      if (isEmpty(element.productId.toString())) {
        validateDetailPromotion.productId = "Trường này không được để trống"
      } else if (element.productId.length > 10) {
        validateDetailPromotion.productId = "Mã sản phẩm phải ít hơn 10 kí tự"
      }

      if (isEmpty(element.quantity.toString())) {
        validateDetailPromotion.quantity = "Trường này không được để trống"
      } else if (element.quantity <= 0) {
        validateDetailPromotion.quantity = "Số lượng phải lớn hơn 0"
      }

      if (isEmpty(element.price.toString())) {
        validateDetailPromotion.price = "Trường này không được để trống"
      } else if (element.price <= 0) {
        validateDetailPromotion.price = "Giá phải lớn hơn 0"
      }
      if (Object.keys(validateDetailPromotion).length > 1) {
        msgdetailOSList.push(validateDetailPromotion)
      }
    });

    setvalidationMsg(msg)
    setvalidationMsgdetailOSList(msgdetailOSList)
    if (Object.keys(msg).length > 0 || msgdetailOSList.length > 0) return false
    return true
  }

  useEffect(() => {
    async function fetchAPI() {
      await onFetchBrand()
      if (match === undefined) {
        setcheckAdd(true)
        setValue({
          ...value,
          status: 0,
          MA_NV: getNV(history).actort
        })
      } else {
        setcheckAdd(false)
        var orderSupplyDetail = await callApi(`os/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
          return res.data
        });
        // setDetail(orderSupplyDetail)
        setDetail(()=>{
          let object = orderSupplyDetail
          //truyền thêm field id để validation
          object.detailOSList.forEach((ele,index)=>{
            ele.id = index
          })
          return object
        })
        // console.log(orderSupplyDetail)
        // setValue(orderSupplyDetail)
        // console.log(value)
      }
    }
    fetchAPI()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (detail != null) {
      setValue({
        ...detail,
        receivedDate: new Date(detail.receivedDate)
      })
      // detailOSList có thêm field id để validate và đc thêm sẵn trong api
    }// eslint-disable-next-line
  }, [detail])

  useEffect(() => {
    if (brand.length !== 0) {
      setValue({
        ...value,
        brandId: brand[0].brandId
      })
    }// eslint-disable-next-line
  }, [brand])
  function handleChangedetailOSList(e, id) {
    var CT_Update = value.detailOSList.find(detailOSList => detailOSList.id === id)

    if (e.target.name === "productId") CT_Update.productId = e.target.value
    else if (e.target.name === "quantity") CT_Update.quantity = e.target.value
    else CT_Update.price = e.target.value
    setValue({
      ...value
    })
  }

  async function handleDeletedetailOSList(ct) {
    // console.log(ct);
    if (checkAdd === true || ct.checkForAdd) {// xử lí trường hợp xóa các CTKM khi thêm KM hoặc khi sửa KM nhưng thêm mới
      let index = value.detailOSList.findIndex(ctdh => ctdh.id === ct.id)
      value.detailOSList.splice(index, 1)
      setValue({ ...value })
    } else {
      let res = await onDeteleDetail(ct.orderSupplyId, ct.productId)
      if (res.result) {
        MySwal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        let index = value.detailOSList.findIndex(ctdh => ctdh.id === ct.id)
        value.detailOSList.splice(index, 1)
        setValue({ ...value })
      }
      else {// xử lí trường hợp xóa các CTKM khi Sửa KM
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.message
        })
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const uniqueValues = new Set(value.detailOSList.map(v => v.productId));
    if (uniqueValues.size < value.detailOSList.length) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Mã sản phẩm không được trùng nhau"
      })
      return
    }
    value.detailOSList.forEach(sp => {
      if (typeof sp.price != 'number') {
        let price = parseInt(sp.price.replaceAll(/,/g, ""))
        sp.price = price
      }
    })
    console.log(value);

    const isValid = validateAll()
    //validate
    console.log();
    if (isValid) {
      if (checkAdd) {
        if (value.detailOSList.length === 0) {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Đơn đặt hàng cần ít nhất 1 chi tiết ĐĐH"
          })
          return
        }
        let res = await onAddOrderSupply(value, history)
        if (res.result) {
          MySwal.fire({
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500
          })
          // dispatch(actAddLineorderSupply(res.data));
          history.goBack()
      }
      else {
          MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.message
          })
      }
      }
      else {
        let res = await onUpdateOrderSupply(value, history, false)
        if (res.result) {
          MySwal.fire({
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
          history.goBack()
        }
        else {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message
          })
        }
      }
    }

  }
  function handleAddDetailDDH(e) {
    setValue({
      ...value,
      detailOSList: [
        ...value.detailOSList,
        {
          id: uuidv4(),
          productId: "",
          quantity: "",
          price: "",
          checkForAdd: true
        }
      ]
    })
  }

  return (
    <div id="wrapper">
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar history={history} />
          <div className="container" >
            {/* style ={{marginLeft: 220}} */}

            <div className="py-3 mb-20" >
              <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                {checkAdd ? "Thêm đơn đặt hàng từ hãng" : "Sửa đơn đặt hàng từ hãng"}
              </h3>
            </div>

            <form onSubmit={e => handleSubmit(e)}>
              {/* <div className="form-group">
                <label className="control-label" htmlFor="MA_DSP">Mã Đơn đặt hàng(<small className="text-danger">*</small>)</label>
                <input id="orderSupplyId" onChange={checkAdd ? e => setValue({ ...value, orderSupplyId: e.target.value }) : null} readOnly={checkAdd ? '' : 'readOnly'}
                  value={value.orderSupplyId} name="productId" placeholder="Mã Đơn đặt hàng" className="form-control input-md" required="" type="text" />
                <small className="form-text text-danger">{validationMsg.orderSupplyId}</small>
              </div> */}



              <div className="form-group">
                <label className=" control-label" htmlFor="NVGH">Ngày nhận hàng(<small className="text-danger">*</small>)</label>
                <DatePicker
                  selected={value.receivedDate}
                  dateFormat={"dd-MM-yyyy"}
                  className="form-control"
                  // onSelect={handleDateSelect} //when day is clicked
                  onChange={date => setValue({ ...value, receivedDate: date })} //only when value has changed
                />
                <small className="form-text text-danger">{validationMsg.receivedDate}</small>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">Hãng(<small className="text-danger">*</small>)</label>
                <select className="form-control" id="exampleFormControlSelect1"
                  disabled={checkAdd ? false : true}
                  onChange={e => setValue({ ...value, brandId: e.target.value })}
                  value={value.brandId}>
                  {brand.map((bra, index) => {
                    return <option key={index} value={bra.brandId}>{bra.brandName} - {bra.brandId}</option>
                  })}
                </select>
                {/* <small className="form-text text-danger">{validationMsg.MA_NVGH}</small> */}
              </div>



              <hr />
              <h5>Các chi tiết đơn đặt hàng</h5>
              <button onClick={e => handleAddDetailDDH(e)} type="button" className="btn btn-info d-flex" style={{ marginBottom: 10 }}>
                <i className="fas fa-plus-square"></i>&nbsp;Thêm
              </button>
              <div className="row">
                <div className="col"><label htmlFor="exampleFormControlSelect1">Mã Sản phẩm(<small className="text-danger">*</small>)</label></div>
                <div className="col"> <label htmlFor="exampleFormControlSelect1">Số lương(<small className="text-danger">*</small>)</label></div>
                <div className="col"><label htmlFor="exampleFormControlSelect1">Giá(<small className="text-danger">*</small>)</label> </div>
                <div className="col"><label htmlFor="exampleFormControlSelect1">Action</label> </div>
              </div>

              {value.detailOSList.map((ct) => {
                let index = validationMsgdetailOSList.findIndex(x => x.id === ct.id)

                return <div key={ct.id} className="row" style={{ marginBottom: 15 }}>
                  <div className="col">
                    <input type="text"
                      value={ct.productId}
                      onChange={e => handleChangedetailOSList(e, ct.id)}
                      name="productId"
                      disabled={checkAdd ? false : (ct.checkForAdd === true ? false : true)}
                      className="form-control" placeholder="Mã sản phẩm" />
                    {/* <small className="form-text text-danger">{validationMsgdetailOSList[ct.id] === undefined ? "" : validationMsgdetailOSList[ct.id].productId}</small> */}
                    <small className="form-text text-danger">
                      {index === -1 ? "" : validationMsgdetailOSList[index].productId}
                    </small>
                  </div>
                  <div className="col">
                    <input type="number"
                      value={ct.quantity}
                      onChange={e => handleChangedetailOSList(e, ct.id)}
                      name="quantity"
                      className="form-control" placeholder="Số lượng" />
                    <small className="form-text text-danger">
                      {index === -1 ? "" : validationMsgdetailOSList[index].quantity}
                    </small>
                    {/* <small className="form-text text-danger">{validationMsgdetailOSList[ct.id] === undefined ? "" : validationMsgdetailOSList[ct.id].quantity}</small> */}
                  </div>
                  <div className="col">
                    {/* <input type="number"
                      value={ct.price}
                      onChange={e => handleChangedetailOSList(e, ct.id)}
                      name="price"
                      className="form-control" placeholder="Giá" /> */}
                    <NumberFormat value={ct.price}
                      thousandSeparator={true}
                      onChange={e => handleChangedetailOSList(e, ct.id)}
                      name="price"
                      className="form-control" placeholder="Giá" />
                    <small className="form-text text-danger">
                      {index === -1 ? "" : validationMsgdetailOSList[index].price}
                    </small>
                    {/* <small className="form-text text-danger">{validationMsgdetailOSList[ct.id] === undefined ? "" : validationMsgdetailOSList[ct.id].price}</small> */}
                  </div>
                  <div className="col">
                    <div className="">
                      <button onClick={() => handleDeletedetailOSList(ct)} type="button" className="btn btn-danger"><i className="fas fa-trash-alt"></i>&nbsp;Xóa</button>
                    </div>
                  </div>
                </div>
              })}
              {/* </div> */}



              <button type="submit" className="btn btn-primary">Submit</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  brand: state.brand
})

const mapDispatchToProps = dispatch => {
  return ({
    onAddOrderSupply: (order, history) => {
      return dispatch(actAddOrderSupplyRequest(order, history))
    },
    onUpdateOrderSupply: (order, history, updateStatus) => {
      return dispatch(actUpdateOrderSupplyRequest(order, history, updateStatus))
    },
    onFetchBrand: () => {
      dispatch(actFetchBrandsRequest())
    },
    onDeteleDetail: (orderSupplyId, productId) => {
      return dispatch(actDeleteDetailOrderSupplyRequest(orderSupplyId, productId))
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage)
