export function StoreItem({price, image, title, quantity = 1, id}) {
  this.price = price
  this.title = title
  this.id = id
  this.image = getImage({image, id})
  this.isShirt = title.toLowerCase().includes("shirt")
  this.size = "m"
}

const logoShirt = require("assets/img/PF/PF_tee_02.jpg")
const coasterImg = require("assets/img/PF/BY_-_PF_coaster.jpg")
const stickerImg = require("assets/img/PF/PF_sticker.jpg")

function getImage({image, id}) {
  if (id === "LOGO_SHIRT") return logoShirt
  else if (id === "COASTER") return coasterImg
  else if (id === "STICKER") return stickerImg
  else return image;
}
