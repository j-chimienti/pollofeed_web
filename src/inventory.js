export function StoreItem({price, image, title, quantity = 1, id}) {
  this.price = price
  this.title = title
  this.id = id
  this.image = image
  this.quantity = quantity
  this.isShirt = title.toLowerCase().includes("shirt")
  this.size = "m"
}



// eslint-disable-next-line no-unused-vars
const exampleInvoice = {"success":true,"invoice":{"id":"zAWNO_6_EvBbDCyxU4W8Z","msatoshi":1000,"description":"Feed Chickens @ pollofeed.com","rhash":"55bdaae051c01044a785efa667fc17c7c489d11d044b3f432f1e2e08a0d69b4a",
  "payreq":"lnbc10n1p05wgpcpp52k764cz3cqgyffu9a7nx0lqhclzgn5gaq39n7se0rchq3gxknd9qdp0gejk2epqgd5xjcmtv4h8xgzqypcx7mrvdanx2ety9e3k7mgxqzjccqp2sp5cjq2hyvy6uykwfs5m4xcny4yp7y6s7zkr23vdayt0kns74t3743qrzjqty36649r255qcytf9akhm4ukxhvqklrc3msfd5zkwyfgfr8njjfqzy095qqrjsqqqqqqqqqqqqq86qqrc9qy9qsqmas3l64hrph6jgzm27euxw0dawczvnsg9sw6xvj2tut948npmwtzq6g5f5q98dgnvqy7fj42tf3ms284gthmlchnfyw40hzg3dfgexgpa8hd9c","expires_at":"2020-08-27T06:03:44Z","created_at":"2020-08-27T06:53:44Z","status":"unpaid","pay_index":-1,"metadata":{"feedTimes":1}}}

const LOGO_SHIRT_IMG = require("./assets/img/PF/PF_tee_02.jpg")
const COASTER_IMG = require("./assets/img/PF/BY_-_PF_coaster.jpg")
const STICKER_IMG = "https://i.imgur.com/YliiAen.png"

export const inventory = [
  {"id":"LOGO_SHIRT","price":24,"title":"logo unisex tshirt","image": LOGO_SHIRT_IMG,"quantity":1}
  ,{"id":"COASTER","price":1.5,"title":"4\" coaster","image":COASTER_IMG,"quantity":1}
  ,{"id":"STICKER","price":1.5,"title":"3\" sticker","image":STICKER_IMG,"quantity":1}]



export const storeItems = inventory.map(s => new StoreItem(s))