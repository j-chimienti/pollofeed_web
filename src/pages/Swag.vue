<template>
  <q-container>
    <div class="row wrapper">
      <div id="content" class="px-2">
        <div v-if="isPaid" class="row d-flex justify-content-center mt-3">
          <div class="alert alert-success">Thank you for the order!</div>
        </div>
        <div class="row d-flex justify-content-between align-items-center mx-1 p-2">
          <router-link to="/">
            <i class="fa fa-home fa-2x"></i>
          </router-link>
          <img :src="pollofeed_logo" alt="Feed" width="100%" style="max-width: 300px">
          <button id="toggleSidebarButton" v-on:click="toggleSidebar" class="btn btn-lg btn-success float-right">
            <i class="fa fa-shopping-basket"></i>
            <span>{{cartItems()}}</span>
          </button>
        </div>
        <div class="card-deck my-3">
          <div class="card pointer" v-for="(item, idx) in items" :key="item.title" v-on:click="item.isShirt ? null : ADD_ITEM_TO_CART(item, idx)">
            <img class="card-img-top" :src="item.image" alt="" v-on:click="item.isShirt ? ADD_ITEM_TO_CART(item, idx) : null" width="90%">
            <div class="card-body p-3">
              <h3>{{item.title}}</h3>
              <div v-if="item.isShirt">
                <select class="custom-select" v-model="item.size">
                  <option>s</option>
                  <option>m</option>
                  <option>l</option>
                  <option>xl</option>
                  <option>2 xl</option>
                </select>
                <button v-on:click="addToCart(item, idx)" class="btn btn-sm btn-success my-1">
                  add
                </button>
              </div>
            </div>
            <div class="card-footer">
              <h5 class="text-center">{{moneyFormat(item.price)}}</h5>
            </div>
          </div>
        </div>
      </div>
      <div id="sidebar" style="background-color: var(--dark_marine_blue);">
        <div class="row mx-3 d-flex justify-content-center align-items-center" style="height: 50px">
          <button v-on:click="emptyCart" class="btn btn-danger" v-if="cart.length"> Empty cart <i class="fa fa-trash"></i> </button>
        </div>
        <div>
          <button v-on:click="toggleSidebar" class="btn btn-sm text-white float-right mr-3 mb-2"> <i class="fa fa-2x fa-close"></i></button>
          <table class="table mt-0 mb-0 bg-light">
            <thead>
            <tr>
              <th>Product</th>
              <th colspan="3" class="text-right">Quantity</th>
              <th class="text-right">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr data-id="stickers" v-for="(item, idx) in cart" :key="item.title + idx">
              <td class="align-middle pr-0"><img :src="item.image" width="50" alt=""></td>
              <td class="align-middle pr-0 pl-2">
                <b>{{item.title}}</b>
                <span v-if="item.isShirt" class="text-uppercase ml-2">{{item.size}}</span>
              </td>
              <td class="align-middle px-0"> <a class="btn btn-link" v-on:click="REMOVE_ITEM_FROM_CART(idx)">
                <i class="fa fa-trash text-muted"></i></a>
              </td>
              <td class="align-middle text-right">
                {{item.quantity}}
              </td>
              <td class="align-middle text-right">{{moneyFormat(item.price)}}</td>
            </tr>
            </tbody>
          </table>
          <table class="table bg-light">
            <tbody>
            <tr>
              <td>Total</td>
              <td colspan="3" class="text-right font-weight-bolder">
                {{moneyFormat(cartTotalPrice)}}
              </td>
            </tr>
            </tbody>
          </table>
          <q-btn v-q-modal.shippingModal
                    :disabled="!cart.length"
          >Confirm</q-btn>
        </div>
        <div>
          <img :src="LOGO" alt="" width="200" class="mt-3 mx-auto d-block">
        </div>
      </div>
    </div>
    <q-modal id="shippingModal" title="Shipping" header-bg-variant="dark" body-bg-variant="dark" hide-footer>
      <ShippingForm/>
    </q-modal>
  </q-container>
</template>

<script>
import {storeItems} from "../inventory";
import ShippingForm from "../components/ShippingForm";
import LOGO from "../assets/img/PF/pollofeed_logo.png"
import pollofeed_logo from "../assets/img/PF/pollofeed_logo.png"
import {moneyFormat} from "../services/moneyUtils";
import {mapGetters, mapMutations} from "vuex";
import {ADD_ITEM_TO_CART, CLEAR_CART, REMOVE_ITEM_FROM_CART} from "../store/mutations";


export default {
  name: "Swag",
  components: {ShippingForm},

  computed: {
    ...mapGetters(['cartTotalPrice', 'cart'])
  },
  mounted() {
    if (window.innerWidth <= 576) {
      document.getElementById("content").classList.remove("active")
      document.getElementById("sidebar").classList.remove("active")
    }

  },
  methods: {
    moneyFormat,
    ...mapMutations([REMOVE_ITEM_FROM_CART, ADD_ITEM_TO_CART, CLEAR_CART]),
    clearQuantities() {
      this.items = this.items.map(i => ({...i, quantity: 1}))
    },
    toggleSidebar() {
      document.getElementById("content").classList.toggle("active")
      document.getElementById("sidebar").classList.toggle("active")
    },

    cartItems() {
      return this.cart.map(i => i.quantity).reduce((a, t) => a + t, 0)
    },

    emptyCart() {
      this.clearQuantities()
    },

  },
  data: function() {
    return {
      pollofeed_logo,
      LOGO,
      isPaid: window.location.search.includes("paid"),
      items: storeItems,

    };
  }
}
</script>

<style scoped>
#content {
  width: calc(100% - 400px);
  min-height: 100vh;
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
}

#sidebar {
  width: 400px;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 999;
  transition: all 0.3s;

}

.card {
  color: black;
}
.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.wrapper {
  display: flex;
  width: 100%;
  min-height: 100vh;
}
#content.active {
  width: 100%;
}
#sidebar.active {
  margin-right: -400px;
}

@media (max-width: 768px) {
  #sidebar {
    margin-right: -400px;
  }
  #sidebar.active {
    margin-right: 0;
  }
  #content {
    width: 100%;
  }
  #content.active {
    width: calc(100% - 400px);
  }
  #sidebarCollapse span {
    display: none;
  }
}

@media (max-width: 575px) {
  #sidebar {
    width: 100%;
    margin-right: -575px;
  }
  #content.active {
    width: 100%;
  }
  .card-img-top {
    height: 200px;
  }
}


</style>
