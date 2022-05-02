import './home.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import crossIcn from '../../assets/icons/cross.svg'
import downarrow from '../../assets/icons/downarrow.svg'
import BookMark from '../../assets/icons/bookmark.svg'
import Invoice from '../../assets/icons/invoice.svg'
import { useNavigate } from 'react-router-dom'
import { postData, PutBillUser } from '../../api/invoice'
import arrow from '../../assets/icons/arrow.svg'
import ReactToPdf from 'react-to-pdf'
import { useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import searchIcon from '../../assets/icons/search.png'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const Home = () => {
  const [image, setImage] = useState({ profilePic: null, ImageUploaded: false })
  const [isEdit, setIsEdit] = useState(false)
  const [currentInvoiceId, setCurrentInvoiceId] = useState(null)
  const location = useLocation()

  const navigation = useNavigate()

  const [discountInp, setDiscountInp] = useState(0)

  const [invoiceLi, setInvoiceLi] = useState('Invoice:')
  const [billToLi, setBillToLi] = useState('Bill To')
  const [shipToLi, setShipToLi] = useState('Ship To')
  const [dateLi, setDateLi] = useState('Date:')
  const [paymentTermsLi, setPaymentTermsLi] = useState('Payment Terms:')
  const [dueDateLi, setDueDateLi] = useState('Due Date:')
  const [poNumberLi, setPoNumberLi] = useState('PO Number:')
  const [notesLi, setNotesLi] = useState('Notes')
  const [termsLi, setTermsLi] = useState('Terms')
  const [subtotalLi, setSubtotalLi] = useState('Subtotal')
  const [discountPerLi, setDiscountPerLi] = useState()
  const [taxPerLi, setTaxPerLi] = useState()
  const [discountLi, setDiscountLi] = useState(`Discount(    )%`)
  const [taxLi, setTaxLi] = useState(`Tax(     )%`)
  const [shippingLi, setShippingLi] = useState('Shipping')
  const [totalLi, setTotalLi] = useState('Total')
  const [amountPaidLi, setAmountPaidLi] = useState('Amount Paid')
  const [balanceDueLi, setBalanceDueLi] = useState('Balance Due')
  const [balanceDueipt, setBalanceDueipt] = useState('')
  const [tableIteamLi, settableIteamLi] = useState('Item')
  const [tableQuantity, settableQuantity] = useState('Quantity')
  const [tableRate, settableRate] = useState('Rate')
  const [tableAmount, settableAmount] = useState('Amount')
  const [currency, setCurrency] = useState([
    { country: 'Japan', symbol: '(¥)' },
    { country: 'Saudi Arabia', symbol: '(﷼)' },
    { country: 'South Africa', symbol: '(R)' },
    { country: 'Taiwan', symbol: '(NT$)' },
    { country: 'United Kingdom', symbol: '(£)' },
    { country: 'United States Dollar', symbol: '($)' },
  ])
  const [optionVal, setOption] = useState([{ country: 'INR', symbol: '(₹)' }])
  const [CurrencySymbol, setSymbol] = useState('₹')

  const [invoiceNumInp, setInvoiceNumInp] = useState('')
  const [taxInp, setTaxInp] = useState(0)
  const [shippingInp, setShippingInp] = useState(0)
  const [amountPaidInp, setAmountPaidInp] = useState(0)
  const [dateInp, setDateInp] = useState('')
  const [paymentTermsInp, setPaymentTermsInp] = useState('')
  const [dueDateInp, setDueDateInp] = useState('Select Due Date')
  const [poNumberInp, setPoNumberInp] = useState('')

  const [ivformTxt, setIvformTxt] = useState('')
  const [billToTxt, setBillToTxt] = useState('')
  const [shipToTxt, setShipToTxt] = useState('')
  const [notesTxt, setNotesTxt] = useState(
    'Notes - any relevant information not already covered',
  )
  const [termsTxt, setTermsTxt] = useState(
    'Terms and conditions - late fees, payment methods, delivery schedule',
  )
  const [Downdisable, DownsetDisable] = useState(true)
  const [Calculationdisable, setCalculationDisable] = useState(true)
  const [taxdisable, setTaxDisable] = useState(true)
  const [shippingdisable, setShippingDisable] = useState(true)

  const imageFileHandler = (e) => {
    let file = e.target.files[0]
    let reader = new FileReader()
    let url = reader.readAsDataURL(file)

    reader.onloadend = function (e) {
      setImage({ ...image, profilePic: [reader.result], ImageUploaded: true })
    }
  }
  const handleCancel = () => {
    setImage({ profilePic: null, ImageUploaded: false })
  }

  const [itemList, setItemList] = useState([
    {
      item: '',
      quantity: 1,
      rate: 0,
      amount: (0).toFixed(2),
    },
  ])

  const addItemListHandler = (index) => {
    setItemList([
      ...itemList,
      {
        item: '',
        quantity: 1,
        rate: 0,
        amount: (0).toFixed(2),
      },
    ])
  }

  const [myInvoicee, setIn] = useState({
    date: '',
    billForm: '',
    balance: '',
  })

  useEffect(() => {
    if (location?.state) {
      setIvformTxt(location.state.billForm)
      setDateInp(location.state.date)
      setAmountPaidInp(location.state.amountpaid)
      setItemList([...location.state.amount])
      setShippingInp(location.state.shipping)
      setTaxPerLi(location.state.tax)
      setDiscountPerLi(location.state.discount)
      setCurrentInvoiceId(location.state.id)
      setDueDateInp(location.state.dueDate)
      setImage({ ...location.state.img })
      setBillToTxt(location.state.billTo)
      setIsEdit(true)
    }
  }, [location.state])

  const removeItemListHandler = (index) => {
    const list = [...itemList]
    list.splice(index, 1)
    setItemList(list)
  }

  const changeItemListHandler = (e, index) => {
    const { name, value } = e.target
    const list = [...itemList]
    list[index][name] = value
    setItemList(list)
  }

  const myInvoices = () => {
    navigation('/myInvoice')
  }

  const edit_invoice = () => {
    let myinvoice = {
      id: currentInvoiceId,
      date: dateInp,
      balance: (total - Number(amountPaidInp)).toFixed(2),
      billForm: ivformTxt,
      amount: itemList,
      discount: discountInp,
      tax: taxInp,
      shipping: shippingInp,
      amountpaid: amountPaidInp,
    }
    PutBillUser(myinvoice)
    navigation('/myInvoice')
  }

  const save_invoice = () => {
    let myinvoice = {
      date: dateInp,
      balance: (total - Number(amountPaidInp)).toFixed(2),
      billForm: ivformTxt,
      amount: itemList,
      discount: discountInp,
      tax: taxInp,
      shipping: shippingInp,
      amountpaid: amountPaidInp,
      billTo: billToTxt,
      dueDate: dueDateInp,
    }
    postData(myinvoice)
    console.log(myinvoice)
  }

  const ivFormCng = (e) => {
    setIvformTxt(e.target.value)
    if (ivformTxt == 0) {
      DownsetDisable(false)
    } else {
      DownsetDisable(Downdisable)
    }
  }

  let subtotal = itemList
    .reduce((total, it) => total + it.rate * it.quantity, 0)
    .toFixed(2)

  let total = (
    Number(subtotal) +
    Number(taxInp) +
    Number(shippingInp) -
    Number(discountInp)
  ).toFixed(2)

  const select_popup = () => {
    let y = document.getElementById('popup-div')
    y.style.display = 'block'
  }

  const popup_close = () => {
    let y = document.getElementById('popup-div')
    y.style.display = 'none'
  }

  const popup_value = (e) => {
    let id = e.target.id
    let optionValue = currency[id]
    setOption([
      {
        ...optionVal,
        country: optionValue.country,
        symbol: optionValue.symbol,
      },
    ])
    setSymbol(optionValue.symbol)
    let y = document.getElementById('popup-div')
    y.style.display = 'none'
  }

  const discountBtn = () => {
    setCalculationDisable(false)
  }

  const taxBtn = () => {
    setTaxDisable(false)
  }

  const shippingBtn = () => {
    setShippingDisable(false)
  }

  const delShippingInt = () => {
    setShippingDisable(true)
    setShippingInp(0)
  }
  const delTaxInt = () => {
    setTaxDisable(true)
    setTaxPerLi(0)
    setTaxInp(0)
  }
  const delDiscountInt = () => {
    setCalculationDisable(true)
    setDiscountPerLi(0)
    setDiscountInp(0)
  }
  const discountPerOnChg = (e) => {
    setDiscountPerLi(e.target.value)
    setDiscountInp((e.target.value * subtotal) / 100)
  }
  const taxPerOnChg = (e) => {
    setTaxPerLi(e.target.value)
    setTaxInp((e.target.value * subtotal) / 100)
  }

  const ref = React.createRef()
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [11, 12],
  }

  return (
    <>
      <div className="container">
        <div className="hme" ref={ref}>
          <div className="hme-wrap">
            <div className="hme-inv-pg">
              <div className="hme-top-sec">
                <div className="hme-side-div">
                  <div className="">
                    <div className="div_img">
                      {image.ImageUploaded ? (
                        <section>
                          <CancelOutlinedIcon
                            onClick={handleCancel}
                            style={{ position: 'absolute' }}
                          />
                          <img
                            src={image.profilePic}
                            alt=""
                            id="profilePic"
                            style={{
                              height: '170px',
                              width: '150px',
                              borderRadius: '5px',
                            }}
                          />
                        </section>
                      ) : (
                        <Button
                          className="logo-btn"
                          variant="text"
                          style={{ width: '200px' }}
                          onChange={imageFileHandler}
                        >
                          <span
                            style={{
                              width: '50px',
                              paddingLeft: '40px',
                              color: '#E9ECEF',
                            }}
                          >
                            Add Your Logo
                          </span>

                          <input
                            id="addProfilebtn"
                            style={{
                              opacity: '0',
                              position: 'relative',
                              right: '55px',
                              height: '150px',
                              width: '390px',
                              backgroundColor: 'red',
                            }}
                            type="file"
                            accept="image/*"
                            Button={'None'}
                            onChange={imageFileHandler}
                          />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="hme-w-txt-wrap">
                    <input
                      className="lbl-input"
                      placeholder=""
                      value="Bill from"
                    ></input>
                    <textarea
                      placeholder=""
                      value={ivformTxt}
                      onChange={ivFormCng}
                    />
                  </div>
                </div>

                <div className="hme-dp-ipt-wrap">
                  <input
                    className="lbl-input"
                    value={invoiceLi}
                    onChange={(e) => setInvoiceLi(e.target.value)}
                  />

                  <input
                    className="ipt-input ipt-invoice"
                    value={invoiceNumInp}
                    onChange={(e) => setInvoiceNumInp(e.target.value)}
                  />
                  <span className="inv-hash">
                    <span>#</span>
                  </span>
                  <input
                    className="lbl-input"
                    value={dateLi}
                    onChange={(e) => setDateLi(e.target.value)}
                  />

                  <input
                    className="ipt-input ipt-date"
                    type={'date'}
                    value={dateInp}
                    onChange={(e) => setDateInp(e.target.value)}
                  ></input>
                  <span className="arrow-icn-wrap">
                    <img className="arrow-icn" src={arrow} />
                  </span>
                  <input
                    className="lbl-input"
                    value={dueDateLi}
                    onChange={(e) => setDueDateLi(e.target.value)}
                  />
                  <input
                    className="ipt-input ipt-duedate"
                    type={'date'}
                    value={dueDateInp}
                    onChange={(e) => setDueDateInp(e.target.value)}
                  />
                  <span className="arrow-icn-wrap">
                    <img className="arrow-icn" src={arrow} />
                  </span>
                  <input
                    className="lbl-input"
                    value={paymentTermsLi}
                    onChange={(e) => setPaymentTermsLi(e.target.value)}
                  />
                  <input
                    className="ipt-input"
                    value={paymentTermsInp}
                    onChange={(e) => setPaymentTermsInp(e.target.value)}
                  />

                  <input
                    className="lbl-input"
                    value={poNumberLi}
                    onChange={(e) => setPoNumberLi(e.target.value)}
                  />
                  <input
                    className="ipt-input"
                    value={poNumberInp}
                    onChange={(e) => setPoNumberInp(e.target.value)}
                  />
                </div>
              </div>
              <div className="hme-bs-txt-wrap">
                <div className="hme-bs-cnt-wrap">
                  <input
                    className="lbl-input"
                    onChange={(e) => setBillToLi(e.target.value)}
                    value={billToLi}
                  />
                  <textarea
                    value={billToTxt}
                    onChange={(e) => setBillToTxt(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
                <div className="hme-bs-cnt-wrap">
                  <input
                    className="lbl-input"
                    onChange={(e) => setShipToLi(e.target.value)}
                    value={shipToLi}
                  />
                  <textarea
                    value={shipToTxt}
                    onChange={(e) => setShipToTxt(e.target.value)}
                    placeholder=""
                    required
                  />
                </div>
              </div>

              <div className="hme-sec-3">
                <div className="hme-item-hdr">
                  <input
                    placeholder=""
                    value={tableIteamLi}
                    onChange={(e) => settableIteamLi(e.target.value)}
                  ></input>
                  <input
                    placeholder=""
                    value={tableQuantity}
                    onChange={(e) => settableQuantity(e.target.value)}
                  ></input>
                  <input
                    placeholder=""
                    value={tableRate}
                    onChange={(e) => settableRate(e.target.value)}
                  ></input>
                  <input
                    placeholder=""
                    value={tableAmount}
                    onChange={(e) => settableAmount(e.target.value)}
                  ></input>
                </div>
                {itemList.map((it, i) => {
                  return (
                    <div key={i} className="hme-ipt-input-wrap">
                      <input
                        className="ipt-input ipt-item"
                        value={it.item}
                        name={'item'}
                        onChange={(e) => changeItemListHandler(e, i)}
                      />
                      <input
                        className="ipt-input ipt-quantity"
                        name={'quantity'}
                        value={it.quantity}
                        onChange={(e) => changeItemListHandler(e, i)}
                      />
                      <input
                        className="ipt-input ipt-rate"
                        value={it.rate}
                        name={'rate'}
                        onChange={(e) => changeItemListHandler(e, i)}
                      />
                      <input
                        className="ipt-input ipt-amount ipt-readonly"
                        readOnly
                        name={'amount'}
                        value={(it.amount = (it.quantity * it.rate).toFixed(2))}
                      />
                      <span style={{ position: 'relative', right: '150px' }}>
                        {CurrencySymbol}
                      </span>
                      {itemList.length > 1 && (
                        <button
                          className="item-cross-ibtn"
                          onClick={() => removeItemListHandler(i)}
                        >
                          <img src={crossIcn} alt="cross" />
                        </button>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="hme-sec-4">
                <div className="hme-nt-txt-wrap">
                  <button
                    className="hme-add-item-btn"
                    onClick={addItemListHandler}
                  >
                    + Add Item
                  </button>
                  <input
                    className="lbl-input"
                    name="notes-label-input"
                    onChange={(e) => setNotesLi(e.target.value)}
                    value={notesLi}
                  />
                  <textarea
                    placeholder=""
                    value={notesTxt}
                    onChange={(e) => setNotesTxt(e.target.value)}
                  />
                  <input
                    className="lbl-input"
                    name="terms-label-input"
                    onChange={(e) => setTermsLi(e.target.value)}
                    value={termsLi}
                  />
                  <textarea
                    placeholder=""
                    value={termsTxt}
                    onChange={(e) => setTermsTxt(e.target.value)}
                  />
                </div>
                <div className="hme-cal-ipt-wrap">
                  <input
                    className="lbl-input"
                    onChange={(e) => setSubtotalLi(e.target.value)}
                    value={subtotalLi}
                  />

                  <input
                    className="ipt-input ipt-readonly"
                    readOnly
                    type={'number'}
                    value={subtotal}
                  />
                  <span style={{ position: 'relative', right: '128px' }}>
                    {CurrencySymbol}
                  </span>
                  <span className="span_calc">
                    <span
                      style={{ display: Calculationdisable ? null : 'none' }}
                      onClick={discountBtn}
                    >
                      + Discount
                    </span>
                    <span
                      style={{ display: taxdisable ? null : 'none' }}
                      onClick={taxBtn}
                    >
                      + Tax
                    </span>
                    <span
                      style={{ display: shippingdisable ? null : 'none' }}
                      onClick={shippingBtn}
                    >
                      + Shipping
                    </span>
                  </span>
                  <input
                    id="discount-lab-inp"
                    className="lbl-input"
                    onChange={(e) => setDiscountLi(e.target.value)}
                    value={discountLi}
                    style={{ display: Calculationdisable ? 'none' : null }}
                  />
                  <input
                    className="ipt-input"
                    value={discountPerLi}
                    style={{
                      display: Calculationdisable ? 'none' : null,
                      width: '20px',
                      margin: '0px',
                      padding: '0px',
                      border: 'none',
                      color: 'blue',
                      position: 'relative',
                      right: '56px',
                      backgroundColor: 'transparent',
                    }}
                    onChange={discountPerOnChg}
                  />
                  <input
                    className="ipt-input"
                    type={'number'}
                    value={discountInp}
                    style={{ display: Calculationdisable ? 'none' : null }}
                  />
                  <img
                    onClick={delDiscountInt}
                    className="del-cal-icon"
                    src={crossIcn}
                    alt="cross"
                    style={{ display: Calculationdisable ? 'none' : null }}
                  />
                  <input
                    style={{ display: taxdisable ? 'none' : null }}
                    className="lbl-input"
                    onChange={(e) => setTaxLi(e.target.value)}
                    value={taxLi}
                  />
                  <input
                    className="ipt-input"
                    value={taxPerLi}
                    style={{
                      display: taxdisable ? 'none' : null,
                      width: '25px',
                      margin: '0px',
                      padding: '0px',
                      border: 'none',
                      color: 'blue',
                      position: 'relative',
                      right: '60px',
                      backgroundColor: 'transparent',
                    }}
                    onChange={taxPerOnChg}
                  />

                  <input
                    style={{ display: taxdisable ? 'none' : null }}
                    className="ipt-input"
                    type={'number'}
                    value={taxInp}
                  />
                  <img
                    onClick={delTaxInt}
                    className="del-cal-icon"
                    src={crossIcn}
                    alt="cross"
                    style={{ display: taxdisable ? 'none' : null }}
                  />
                  <input
                    style={{ display: shippingdisable ? 'none' : null }}
                    className="lbl-input"
                    onChange={(e) => setShippingLi(e.target.value)}
                    value={shippingLi}
                  />
                  <input
                    style={{ display: shippingdisable ? 'none' : null }}
                    className="ipt-input"
                    type={'number'}
                    value={shippingInp}
                    onChange={(e) => setShippingInp(e.target.value)}
                  />

                  <img
                    onClick={delShippingInt}
                    className="del-cal-icon"
                    src={crossIcn}
                    alt="cross"
                    style={{ display: shippingdisable ? 'none' : null }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      right: '140px',
                      display: shippingdisable ? 'none' : null,
                    }}
                  >
                    {CurrencySymbol}
                  </span>
                  <input
                    className="lbl-input"
                    onChange={(e) => setTotalLi(e.target.value)}
                    value={totalLi}
                  />
                  <input
                    className="ipt-input ipt-readonly"
                    readOnly
                    value={total}
                  />
                  <span style={{ position: 'relative', right: '128px' }}>
                    {CurrencySymbol}
                  </span>
                  <input
                    className="lbl-input"
                    onChange={(e) => setAmountPaidLi(e.target.value)}
                    value={amountPaidLi}
                  />
                  <input
                    className="ipt-input"
                    type={'number'}
                    style={{ textAlign: 'left' }}
                    value={amountPaidInp}
                    onChange={(e) => setAmountPaidInp(e.target.value)}
                  />
                  <input
                    className="lbl-input"
                    onChange={(e) => setBalanceDueLi(e.target.value)}
                    value={balanceDueLi}
                  />
                  <input
                    className="ipt-input ipt-readonly"
                    type={'number'}
                    value={(total - Number(amountPaidInp)).toFixed(2)}
                    readOnly
                  />
                  <span style={{ position: 'relative', right: '128px' }}>
                    {CurrencySymbol}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sideBar">
          <div className="sideBar_sec1">
            <input className="sideBar_currency" value="Currency:"></input>
            <select onClick={select_popup}>
              {optionVal.map((value, index) => (
                <option>
                  {value.country}
                  {value.symbol}
                </option>
              ))}
            </select>
            <div
              id="popup-div"
              style={{ display: 'none' }}
              className="popup-div"
            >
              <div className="popup-sec1">
                <h1 style={{ color: 'black' }}>Select Currency</h1>
                <button className="popup-close" onClick={popup_close}>
                  X
                </button>
              </div>
              <div className="popup-sec1-1">
                <input className="popup_input"></input>
                <span className="popup-img">
                  <img
                    className="popup-search-icon"
                    src={searchIcon}
                    alt="search"
                  ></img>
                </span>
              </div>
              <div className="popup_sec2">
                {currency.map((value, index) => (
                  <p onClick={popup_value} key={index} id={index}>
                    {value.country} {value.symbol}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="sideBar_sec2">
            <div className="sideBar_sec2_1">
              <ReactToPdf
                targetRef={ref}
                options={options}
                filename="div-blue.pdf"
              >
                {({ toPdf }) => (
                  <button
                    className={`SideBar_btn1 ${
                      Downdisable ? 'SideBar_btn11' : null
                    }`}
                    onClick={toPdf}
                  >
                    <img
                      src={downarrow}
                      className="side_bar_img1"
                      alt="downarrow"
                    ></img>
                    DOWNLOAD INVOICE
                  </button>
                )}
              </ReactToPdf>
            </div>
            <div className="sideBar_sec2_2">
              <button
                className="SideBar_btn2"
                onClick={isEdit ? edit_invoice : save_invoice}
              >
                <img
                  src={BookMark}
                  className="side_bar_img2"
                  alt="bookMark"
                ></img>
                SAVE INVOICE
              </button>
            </div>
            <div>
              <button className="SideBar_btn3" onClick={myInvoices}>
                <img
                  src={Invoice}
                  className="side_bar_img3"
                  alt="Invoice"
                ></img>
                My Invoices
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
