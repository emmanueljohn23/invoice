import './myInvoice.css'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getuser, deleteuser} from '../../api/invoice'
import searchIcon from '../../assets/icons/search.png'
import deleteIcon from '../../assets/icons/Delete.svg'
import ExportImage from '../../assets/icons/export.svg'

const MyInvoice = () => {
  const [invoiceValue, setInvoiceVal] = useState([
    {
      date: '',
      balance: '',
      billForm: '',
      id: '',
      amount: [
        {
          item: "",
          quantity: "",
          rate: "",
          amount: ""
        }
      ],
      discount: '',
      tax: '',
      shipping: '',
      amountpaid: '',
      billTo:'',
      dueDate:''
    },
  ])

  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    getuser()
      .then((res) => {
        setInvoiceVal(res)
      })
      .catch((err) => console.log(err))

  })

  const deleteBillForm = (e) => {
    let billId = e.target.id
    deleteuser(billId)
    navigate('/myInvoice')
    console.log(e.target.id)
  }

  const showBillForm = (e) => {
    let d = e.target.id
    let edit = invoiceValue[d]
    
    console.log(edit)

    navigate('/', { state: edit })
  }

  const myNewInvoice = () => {
    navigate('/')
  }
  return (
    <>
      <div className="div_sec2">
        <h1>My Invoices</h1>
        <p className="invoice_para">
          We automatically save any invoices that you draft to your devices.
        </p>
        <input className="invoice_input"></input>
        <span className="span-img">
          <img className="search-icon" src={searchIcon} alt="search"></img>
        </span>
        <div className="btn-div">
          {invoiceValue.map((value, i) => {
            return (
              <button
                key={value.i}
                onClick={showBillForm}
                id={i}
                className="invoice_button"
              >
                <span
                  className="del-icon-span"
                  id={value.id}
                  onClick={deleteBillForm}
                >
                  <img
                    className="invoice-del-icon"
                    id={value.id}
                    onClick={deleteBillForm}
                    src={deleteIcon}
                    alt="delete"
                  ></img>
                </span>
                <h1 id={value.id} className="invoice_h1">
                  {'$' + value.balance}
                </h1>
                <p id={value.id} className="invoice_para2">
                  {value.billForm}
                </p>
                <span id={value.id} className="invoice_span">
                  {value.date}
                </span>
              </button>
            )
          })}
        </div>
        <div className="invoicebtn-div">
          <img className="export-icon" src={ExportImage} alt="export"></img>
          <button className="invoice-btn1">EXPORT INVOICE</button>
          <button className="invoice-btn2" onClick={myNewInvoice}>NEW INVOICE</button>
        </div>
      </div>
    </>
  )
}

export default MyInvoice
