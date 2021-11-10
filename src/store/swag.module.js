import {
  ADD_ITEM_TO_CART,
  CLEAR_CART, MERCH_ITEM,
  MERCHANDISE,
  REMOVE_ITEM_FROM_CART, SELECT_SHIRT_SIZE
} from "./mutations";
import {GET_MERCH_ITEM, MERCH_INVOICE} from "src/store/actions";
import {StoreItem} from "src/inventory";

const state = {
  cart: [],
  merchandise: [],
  merchItem: null
}

const getters = {
  merchandise: state => state.merchandise,
  merchItem: state => state.merchItem,
  cart: state => state.cart,
  cartTotalPrice: state =>
    state.cart.map(c => c.price * c.quantity).reduce((a, t) => a + t, 0)
  ,
  cartQuantity: state => state.cart.map(c => c.quantity).reduce((a, b) => a + b, 0)
}

const actions = {
  [MERCH_INVOICE]({ rootGetters }, invoice) {
    rootGetters.websocket._send({WsMerchandiseInvoiceRequest: null, invoice})
  }
}

const mutations = {
  [ADD_ITEM_TO_CART](state, item) {
    let cart = state.cart.slice()
    if (item.isShirt) {
      cart = cart.concat({...item, quantity: 1})
    } else {
      const idx = cart.findIndex(i => i.title === item.title)
      if (idx !== -1)
        cart[idx] = Object.assign(cart[idx], {
          quantity: cart[idx].quantity + 1
        })
      else cart = cart.concat({...item, quantity: 1})

    }
    state.cart = cart
  },
  [CLEAR_CART](state) { state.cart = [] },
  [MERCH_ITEM](state, merchItem) { state.merchItem = merchItem },
  [SELECT_SHIRT_SIZE](state, {size, idx}) {
    state.merchandise = state.merchandise.map((m, i) => {
      if (idx === i) return {...m, size}
      return m
    })
  },
  [MERCHANDISE](state, merchandise) { state.merchandise = merchandise.map(m => new StoreItem(m)) },
  [REMOVE_ITEM_FROM_CART](state, item) { state.cart =  state.cart.filter(i => i.title !== item.title) },
}

export const swagModule = {
  state,
  getters,
  mutations,
  actions
}
