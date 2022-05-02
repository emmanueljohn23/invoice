import axios from 'axios'

export async function getuser() {
  let user
  await axios
    .get(`http://localhost:3006/invoices`)
    .then((res) => {
      user = res.data
      // console.log(user)
    })
    .catch((err) => {
      // console.log(err)
    })
  return user
}

export function postData(payload = {}) {
  let user
  axios
    .post(`http://localhost:3006/invoices`, payload)
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      // console.log(err)
    })
}

export async function deleteuser(payload = {}) {
  let id = payload
  await axios
    .delete(`http://localhost:3006/invoices/${id}`)
    .then((res) => {
      id = res.data
      // console.log(user)
    })
    .catch((err) => {
      // console.log(err)
    })
  return id
}

export async function PutBillUser(payload) {
  let id = payload.id
  let order
  await axios
    .put(`http://localhost:3006/invoices/${id}`, payload)
    .then((res) => {
      order = res.data
      console.log(order)
    })

    .catch((err) => console.log(err))

  return order
}
