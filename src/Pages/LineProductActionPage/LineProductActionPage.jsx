import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'validator/lib/isEmpty';
import SideBar from '../../Components/Bar/SideBar';
import TopBar from '../../Components/Bar/TopBar';
import callApi from '../../utils/apiCaller';
import { actFetchBrandsRequest } from './../../actions/brand'
import { actAddLineProductRequest, actDeleteProductRequest, actUpdateLineProductRequest } from './../../actions/index'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getTokenEmployee } from './../../actions/getNV'
import NumberFormat from 'react-number-format';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MySwal = withReactContent(Swal)

export const LineProductActionPage = ({ category, brand, match, onFetchBrand, onAddLineProduct,
  history, onUpdateLineProduct, onDeleteProduct }) => {
  //state check kiểm tra là thêm hay sửa
  const [checkAdd, setcheckAdd] = useState(true)
  const [detail, setDetail] = useState("")

  const [validationMsg, setvalidationMsg] = useState('')
  const [value, setValue] = useState({
    // productId: '',
    productName: '',
    sex: 1,
    origin: "",
    image: "",
    brandId: "",
    categoryId: "",
    description: "",
    quantityInStock: "",
    price: "",
    capacity: 0,
    checkForAdd: true
  })

  useEffect(() => {
    (async () => {
      await onFetchBrand()

      if (match === undefined) {
        setcheckAdd(true)
      } else {
        setcheckAdd(false)
        var detail = await callApi(`product/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
          return res.data
        });

        setDetail(detail)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (detail !== "") {
      setValue({
        productId: detail.productId,
        productName: detail.productName,
        sex: detail.sex,
        origin: detail.origin,
        image: detail.image,
        brandId: detail.brandId,
        categoryId: detail.categoryId,
        description: detail.description,
        quantityInStock: detail.quantityInStock,
        price: detail.price,
        capacity: detail.capacity
      })
    }
  }, [detail])

  useEffect(() => {
    if (brand.length > 0) {
      setValue({
        ...value,
        brandId: brand[0].brandId
      })
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand])

  useEffect(() => {
    if (category.length > 0) {
      setValue({
        ...value,
        categoryId: category[0].categoryId
      })
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])


  const validateAll = () => {
    const msg = {}

    // if (isEmpty(value.productId)) {
    //   msg.productId = "Trường này không được để trống"
    // } else if (value.productId.length > 10) {
    //   msg.productId = "Mã đơn đặt không được dài hơn 10 kí tự"
    // }

    if (isEmpty(value.productName)) {
      msg.productName = "Trường này không được để trống"
    }

    if (isEmpty(value.sex.toString())) {
      msg.sex = "Trường này không được để trống"
    }

    if (isEmpty(value.origin)) {
      msg.origin = "Trường này không được để trống"
    }

    if (isEmpty(value.image)) {
      msg.image = "Trường này không được để trống"
    }

    if (isEmpty(value.quantityInStock.toString())) {
      msg.quantityInStock = "Trường này không được để trống"
    } else if (value.quantityInStock < 0) {
      msg.quantityInStock = "Số lượng không thể là số âm"
    }
    if (isEmpty(value.price.toString())) {
      msg.price = "Trường này không được để trống"
    } else if (value.price <= 0) {
      msg.price = "Giá phải lớn hơn 0"
    }


    setvalidationMsg(msg)
    if (Object.keys(msg).length > 0) return false
    return true
  }

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  async function handleSubmit(e) {
    e.preventDefault()
    const isValid = validateAll()
    console.log(value);
    //validate
    if (isValid) {

      // setValue({
      //   ...value,
      //   price: parseInt(value.price.replace(/,/g,""))
      // })
      // console.log(value);
      // let res = await onAddLineProduct(value)
      // console.log(res);
      if (checkAdd) {
        let res = await onAddLineProduct(value)
        if (res&&res.result) {
          MySwal.fire({
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
          history.goBack()
          // dispatch(actAddLineProduct(res.data));
        }
        else {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res?res.message:"Thêm sản phẩm thất bại"
          })
        }
      }
      else {
        let res = await onUpdateLineProduct(value, history)
        if (res&&res.result) {
          MySwal.fire({
            icon: 'success',
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          })
          history.goBack()
          // dispatch(actAddLineProduct(res.data));
        }
        else {
          MySwal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res?res.message:"Cập nhật thông tin sản phẩm thất bại"
          })
        }
      }
    }
  }

  return (

    <div id="wrapper" >
      <SideBar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <TopBar history={history} />
          <div className="container" >
            {/* style ={{marginLeft: 220}} */}

            <div className="py-3 mb-20" >
              <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                {checkAdd ? "Thêm sản phẩm" : "Sửa sản phẩm"}
              </h3>
            </div>


            <form onSubmit={e => handleSubmit(e)} style={{ marginBottom: 200 }}>

              {/* Tên */}
              <div className="form-group">
                <label className=" control-label" htmlFor="productName">Tên(<small className="text-danger">*</small>)</label>
                <input id="productName" onChange={e => setValue({ ...value, productName: e.target.value })} value={value.productName} name="productName" placeholder="Tên sản phẩm" className="form-control input-md" required="" type="text" />
                <small className="form-text text-danger">{validationMsg.productName}</small>
              </div>



              <div className="form-group">
                <label className=" control-label" htmlFor="TEN">Giới tính(<small className="text-danger">*</small>)</label>
                <select value={value.sex} onChange={e => setValue({ ...value, sex: parseInt(e.target.value) })}
                  className="form-control" aria-label="Default select example" name="brandId">
                  <option value={1} defaultValue={value.sex === 1 ? "defaultValue" : ""}>Nam</option>
                  <option value={2} defaultValue={value.sex === 2 ? "defaultValue" : ""}>Nữ</option>
                  <option value={3} defaultValue={value.sex === 3 ? "defaultValue" : ""}>Unisex</option>
                </select>
                <small className="form-text text-danger">{validationMsg.brand}</small>
              </div>
              <div className="form-group">
                <label value={value.capacity} className=" control-label" htmlFor="price">Dung tích(<small className="text-danger">*</small>)</label>
                <NumberFormat id="price" onChange={e => setValue({ ...value, capacity: e.target.value })} value={value.capacity} name="capacity" placeholder="Dung tích" className="form-control" required="" thousandSeparator={true} />
                <small className="form-text text-danger">{validationMsg.capacity}</small>
              </div>
              {/* hãng */}
              <div className="form-group">
                <label className=" control-label" htmlFor="brand">Hãng(<small className="text-danger">*</small>)</label>
                <select value={value.brandId} onChange={e => setValue({ ...value, brandId: parseInt(e.target.value) })}
                  className="form-control" aria-label="Default select example" name="brandId">
                  {
                    brand.map((bra, index) => {
                      return <option value={bra.brandId} defaultValue={bra.brandId === value.brandId ? "defaultValue" : ""} key={index}>{bra.brandName}</option>
                    })
                  }
                </select>
                <small className="form-text text-danger">{validationMsg.brand}</small>
              </div>



              {/* Giá */}
              <div className="form-group">
                <label value={value.price} className=" control-label" htmlFor="price">Giá(<small className="text-danger">*</small>)</label>
                <NumberFormat id="price" onChange={e => setValue({ ...value, price: e.target.value })} value={value.price} name="price" placeholder="Giá" className="form-control" required="" thousandSeparator={true} />
                <small className="form-text text-danger">{validationMsg.price}</small>
              </div>

              <div className="form-group">
                <label value={value.quantityInStock} className=" control-label" htmlFor="quantityInStock">Số lượng tồn(<small className="text-danger">*</small>)</label>
                <input id="quantityInStock" onChange={e => setValue({ ...value, quantityInStock: e.target.value })} value={value.quantityInStock} name="price" placeholder="Số lượng tồn" className="form-control" required="" type="number" />
                <small className="form-text text-danger">{validationMsg.quantityInStock}</small>
              </div>

              {/* Xuất xứ */}
              <div className="form-group">
                <label value={value.origin} className=" control-label" htmlFor="origin">Xuất xứ(<small className="text-danger">*</small>)</label>
                <input id="origin" onChange={e => setValue({ ...value, origin: e.target.value })} value={value.origin} name="origin" placeholder="Xuất xứ" className="form-control" required="" type="text" />
                <small className="form-text text-danger">{validationMsg.origin}</small>
              </div>
              {/* Mô tả */}
              <div className="form-group">
                <label value={value.description} className=" control-label" htmlFor="description">Mô Tả</label>
                <textarea onChange={e => setValue({ ...value, description: e.target.value })} value={value.description} className="form-control" id="description" name="description"></textarea>
                {/* <CKEditor
                  editor={ClassicEditor}
                  data={value.description}
                  className="form-control" id="description" name="description"
                  onChange={(e, editor) => setValue({ ...value, description: editor.getData()})}
                /> */}
              </div>
              {/* hình ảnh */}
              <div className="form-group">
                <label className=" control-label" htmlFor="image">Hình ảnh(<small className="text-danger">*</small>)</label>
                {/* <FileBase type="file" multiple={false} onDone={({base64}) => setimage({image, selectedFile: base64})}/> */}
                <input id="image" onChange={async (e) => setValue({ ...value, image: await toBase64(e.target.files[0]) })}
                  name="image" className="form-control-file" type="file" />
                <small className="form-text text-danger">{validationMsg.image}</small>
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
  brand: state.brand,
  detail: state.detail,
  category: state.category
})

const mapDispatchToProps = (dispatch) => {
  return ({
    onFetchBrand: () => {
      dispatch(actFetchBrandsRequest())
    },
    onAddLineProduct: (line_product) => {
      return dispatch(actAddLineProductRequest(line_product))
    },
    onUpdateLineProduct: (line_product, history) => {
      return dispatch(actUpdateLineProductRequest(line_product, history))
    },
    onDeleteProduct: (MA_SP) => {
      return dispatch(actDeleteProductRequest(MA_SP))// xoá sản phẩm khi thêm hoặc sửa 1 dòng sản phẩm
    }
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(LineProductActionPage)


