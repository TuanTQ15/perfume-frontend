import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty';
import SideBar from '../../Components/Bar/SideBar';
import TopBar from '../../Components/Bar/TopBar';
import callApi from '../../utils/apiCaller';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import ReactDatePicker from 'react-datepicker';
import { actFetchEmployeesRequest } from '../../actions/employee';
import { actAddPromotionRequest, actDeleteDetailPromotionReq, actUpdatePromotionRequest } from '../../actions/promotion';
import { getTokenEmployee } from './../../actions/getNV'
import { v4 as uuidv4 } from 'uuid'

const MySwal = withReactContent(Swal)

export const PromotionActionPage = ({ match, onFetchEmployee, onAddPromotion, history, onUpdatePromotion, onDelDetailPromotion }) => {
  //state check kiểm tra là thêm hay sửa
  const [checkAdd, setcheckAdd] = useState(true)
  const [disable, setDisable] = useState(true)
  const [validationMsg, setvalidationMsg] = useState('')
  const [validationMsgCT_DDH, setvalidationMsgCT_DDH] = useState([])
  const [value, setValue] = useState({
    promotionId: '',
    promotionName: '',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),

    description: "",
    detailPromotionList: [
      {
        id: uuidv4(),
        promotionId: null,
        productId: "",
        dateCreated: new Date(),
        percentDiscount: "",
        checkForAdd: true,
      }
    ]
  })
  // const [Va, setVa] = useState(initialState)

  useEffect(() => {
    (async () => {
      await onFetchEmployee()
      if (match === undefined) {
        setcheckAdd(true)
      } else {
        setcheckAdd(false)
        var receiptDetail = await callApi(`promotion/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
          return res.data
        });
        setValue(() => {
          var object = {
            ...receiptDetail,
            startDate: receiptDetail.startDate,
            endDate: receiptDetail.endDate
          }

          object.detailPromotionList.forEach((ele, index) => {
            ele.id = index
          })
          return object
        })
        // console.log(receiptDetail.detailPromotionList)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAddDetailDDH(e) {
    setValue({
      ...value,
      detailPromotionList: [
        ...value.detailPromotionList,
        {
          id: uuidv4(),
          promotionId: null,
          productId: "",
          dateCreated: new Date(),
          percentDiscount: "",
          checkForAdd: true
        }
      ]
    })
  }

  const validateAll = () => {
    const msg = {}
    var msgCTKM = []

    setvalidationMsgCT_DDH([])

    // if (isEmpty(value.promotionId)) {
    //   msg.promotionId = "Trường này không được để trống"
    // } else if (value.promotionId.length > 10) {
    //   msg.promotionId = "Mã đơn đặt không được dài hơn 10 kí tự"
    // }

    if (isEmpty(value.promotionName)) {
      msg.promotionName = "Trường này không được để trống"
    }


    if (value.startDate >= value.endDate) {
      msg.endDate = "Ngày kết thúc phải sau ngày bắt đầu"
    }

    value.detailPromotionList.forEach(element => {
      const validateDetailPromotion = {}

      if (isEmpty(element.productId.toString())) {
        validateDetailPromotion.productId = "Trường này không được để trống"
      } else if (element.productId.length > 10) {
        validateDetailPromotion.productId = "Mã sản phẩm phải ít hơn 10 kí tự"
      }

      if (isEmpty(element.percentDiscount.toString())) {
        validateDetailPromotion.percentDiscount = "Trường này không được để trống"
      } else if (element.percentDiscount <= 0) {
        validateDetailPromotion.percentDiscount = "Phần trăm khuyến mãi phải lớn hơn 0"
      }
      validateDetailPromotion.id = element.id

      if (Object.keys(validateDetailPromotion).length > 1) {
        msgCTKM.push(validateDetailPromotion)
      }
    })

    setvalidationMsg(msg)
    setvalidationMsgCT_DDH(msgCTKM)
    if (Object.keys(msg).length > 0 || msgCTKM.length > 0) return false
    return true
  }

  async function handleDeleteCT_DDH(ct) {
    // console.log(ct.promotionId, ct.productId)
    if (checkAdd || ct.checkForAdd) {// xử lí trường hợp xóa các CTKM khi thêm KM hoặc khi sửa KM nhưng thêm mới
      let index = value.detailPromotionList.findIndex(sp => sp.id === ct.id)// đây chỉ là phần xóa ở giao diện
      value.detailPromotionList.splice(index, 1)
      setValue({ ...value })
    } else {
      let res = await onDelDetailPromotion(ct.promotionId, ct.productId)
      if (res.result) {
        MySwal.fire({
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        })
        let index = value.detailPromotionList.findIndex(sp => sp.id === ct.id)
        value.detailPromotionList.splice(index, 1)

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

  function handleChangeCTKM(e, id) {

    var CT_Update = value.detailPromotionList.find(CT_DDH => CT_DDH.id === id)

    if (e.target.name === "productId") CT_Update.productId = parseInt(e.target.value)
    else CT_Update.percentDiscount = parseFloat(e.target.value)
    setValue({
      ...value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const uniqueValues = new Set(value.detailPromotionList.map(v => v.productId));
    if (uniqueValues.size < value.detailPromotionList.length) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Trong 1 đợt khuyến mãi không thể có dòng sản phẩm trùng nhau"
      })
      return
    }

    const isValid = validateAll()
    //validate
    if (isValid) {
      if (checkAdd) {
        if (value.detailPromotionList.length === 0) {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Đợt khuyến mãi cần ít nhất có 1 chi tiết khuyến mãi"
          })
          return
        }
        onAddPromotion(value, history)
      }
      else {
        // console.log(JSON.stringify(value));
        onUpdatePromotion(value, history)
      }
    }
    // console.log(value);
  }
  async function checkForDelete (productId)  {
  
    return await callApi(`promotion/check_delete/${productId}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
      console.log(res)
      if (res != null) {
        if (!res.data.result) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }

    });
  }
  checkForDelete(3).then(data => {
    setDisable(data)
  }).catch(err => {
    setDisable(true)
  });

  return (

    <div id="wrapper" >
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar history={history} />
          <div className="container" >

            <div className="py-3 mb-20" >
              <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                {checkAdd ? "Thêm đợt khuyến mãi" : "Sửa đợt khuyến mãi"}
              </h3>
            </div>
            <form onSubmit={e => handleSubmit(e)} style={{ marginBottom: 200 }}>

              <div className="form-group">
                <label className=" control-label" htmlFor="promotionName">Tên khuyến mãi(<small className="text-danger">*</small>)</label>
                <input id="promotionName" onChange={e => setValue({ ...value, promotionName: e.target.value })} value={value.promotionName} name="promotionName" placeholder="Tên khuyến mãi" className="form-control input-md" required="" type="text" />
                <small className="form-text text-danger">{validationMsg.promotionName}</small>
              </div>

              <div className="form-group">
                <label value={value.startDate} className=" control-label" htmlFor="XUATXU">Ngày bắt đầu(<small className="text-danger">*</small>)</label>
                <ReactDatePicker
                  selected={new Date(value.startDate)}
                  name="NGAYDB"
                  className="form-control"
                  onChange={date => setValue({ ...value, startDate: date })} //only when value has changed
                />
                <small className="form-text text-danger">{validationMsg.startDate}</small>
              </div>
              <div className="form-group">
                <label value={value.endDate} className=" control-label" htmlFor="XUATXU">Ngày kết thúc(<small className="text-danger">*</small>)</label>
                <ReactDatePicker
                  selected={new Date(value.endDate)}
                  name="endDate"
                  className="form-control"
                  onChange={date => setValue({ ...value, endDate: date })}
                />
                <small className="form-text text-danger">{validationMsg.endDate}</small>
              </div>
              {/* Mô tả */}
              <div className="form-group">
                <label value={value.description} className=" control-label" htmlFor="description">Mô Tả</label>
                <textarea onChange={e => setValue({ ...value, description: e.target.value })} value={value.description} className="form-control" id="description" name="description"></textarea>
              </div>



              <div className="form-group" >
                <label htmlFor="exampleFormControlSelect1">Các Chi tiết khuyến mãi</label>
                <button onClick={e => handleAddDetailDDH(e)}
                  hidden={checkAdd ? false : true}
                  type="button" className="btn btn-info d-flex" >
                  <i className="fas fa-plus-square"></i>&nbsp;Thêm
                </button>
                <div className="row" style={{ marginTop: 10 }}>
                  <div className="col"><label htmlFor="exampleFormControlSelect1">Mã dòng Sản phẩm(<small className="text-danger">*</small>)</label></div>
                  <div className="col"> <label htmlFor="exampleFormControlSelect1">Phần trăm khuyến mãi(<small className="text-danger">*</small>)</label></div>
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">Action</label>
                  </div>
                </div>

                {
                  value.detailPromotionList.map((ct, id) => {
                    let index = validationMsgCT_DDH.findIndex(x => x.id === ct.id)
                  
                    return <div key={id} className="row" style={{ marginBottom: 15 }}>
                      <div className="col">
                        <input type="number"
                          value={ct.productId}
                          onChange={e => handleChangeCTKM(e, ct.id)}
                          name="productId"
                          className="form-control" placeholder="Mã dòng sản phẩm"
                          disabled={checkAdd ? false : (ct.checkForAdd === true ? false : true)} />
                        <small className="form-text text-danger">
                          {index === -1 ? "" : validationMsgCT_DDH[index].productId}
                        </small>
                      </div>
                      <div className="col">
                        <input type="number"
                          value={ct.percentDiscount}
                          onChange={e => handleChangeCTKM(e, ct.id)}
                          name="SOLUONG"
                          className="form-control" placeholder="Phần trăm khuyến mãi" />

                        <small className="form-text text-danger">

                          {index === -1 ? "" : validationMsgCT_DDH[index].percentDiscount}
                        </small>


                      </div>

                      <div className="col">
                        <button onClick={() => handleDeleteCT_DDH(ct)}
                          disabled={false}
                          type="button" className="btn btn-danger">
                          <i className="fas fa-trash-alt"></i>&nbsp;Xóa
                        </button>
                      </div>
                    </div>
                  })
                }
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}


const mapStateToProps = (state) => ({
  employee: state.employee
})

const mapDispatchToProps = (dispatch) => {
  return ({
    onFetchEmployee: () => {
      dispatch(actFetchEmployeesRequest())
    },
    onAddPromotion: (promotion, history) => {
      dispatch(actAddPromotionRequest(promotion, history))
    },
    onUpdatePromotion: (promotion, history) => {
      dispatch(actUpdatePromotionRequest(promotion, history))
    },
    onDelDetailPromotion: (promotionId, productId) => {
      return dispatch(actDeleteDetailPromotionReq(promotionId, productId))
    }
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(PromotionActionPage)




