import {ADD_ITEM_TO_CART, CLEAR_CART, REMOVE_ITEM_FROM_CART} from "./mutations";

const state = {
  cart: []
}

const getters = {
  cart: state => state.cart,
  cartTotalPrice: state =>
    state.cart.map(c => c.price * c.quantity).reduce((a, t) => a + t, 0)
  ,
}


const mutations = {
  [ADD_ITEM_TO_CART](state, item) {
    let cart = state.cart.slice()
    if (item.isShirt) {
      cart = cart.concat(item)
    } else {
      const idx = cart.findIndex(i => i.title === item.title)
      if (idx !== -1)
        cart[idx] = Object.assign(cart[idx], {
          quantity: cart[idx].quantity + 1
        })
      else cart = cart.concat(item)

    }
    state.cart = cart
  },
  [CLEAR_CART](state) { state.cart = [] },
  [REMOVE_ITEM_FROM_CART](state, index) { state.cart =  state.cart.splice(index, 1) },
}

export const swagModule = {
  state,
  getters,
  mutations,
}
