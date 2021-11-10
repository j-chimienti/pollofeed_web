<template>
  <q-page>
    <div class="row">
      <div id="content" class="q-px-2">
        <div class="row flex justify-between align-items-center mx-1 p-2">
          <img :src="pollofeed_logo" alt="Feed" width="100%" style="max-width: 300px">
          <q-btn id="toggleSidebarButton" v-on:click="toggleSidebar" color="green">
            <i class="fa fa-shopping-basket"></i>
            {{cartQuantity}}
          </q-btn>
        </div>
        <div class="row flex">
            <q-card class="pointer q-ma-md" v-for="(item, idx) in merchandise" :key="item.title" v-on:click="item.isShirt ? null : ADD_ITEM_TO_CART(item)">
              <img class="card-img-top" :src="item.image" alt="" v-on:click="item.isShirt ? ADD_ITEM_TO_CART(item) : null" width="90%">
              <q-card-section>
                <div class="text-h5">{{item.title}}</div>
                <div v-if="item.isShirt">
                  <q-select
                            @update:model-value="e => changeSize(e, idx)"
                            :model-value="item.size"
                            :options="shirtSizeOptions"/>
                  <q-btn @click="ADD_ITEM_TO_CART(item)" color="green" label="add"/>
                </div>
              </q-card-section>
              <q-card-actions>
                <h5 class="text-center">{{moneyFormat(item.price)}}</h5>
              </q-card-actions>
            </q-card>
        </div>
      </div>
      <div id="sidebar">
        <div class="row q-mx-3 flex justify-center align-items-center" style="height: 50px">
          <q-btn v-on:click="emptyCart"  v-if="cart.length" icon="trash"> Empty cart </q-btn>
        </div>
        <div>
          <q-btn v-on:click="toggleSidebar" icon="close"/>
          <q-markup-table>
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
              <td class="align-middle px-0">
                <q-btn icon="delete" v-on:click="REMOVE_ITEM_FROM_CART(item)" >

                </q-btn>
              </td>
              <td class="align-middle text-right">
                {{item.quantity}}
              </td>
              <td class="align-middle text-right">{{moneyFormat(item.price)}}</td>
            </tr>
            </tbody>
          </q-markup-table>
          <q-markup-table>
            <tbody>
            <tr>
              <td>Total</td>
              <td colspan="3" class="text-right font-weight-bolder">
                {{moneyFormat(cartTotalPrice)}}
              </td>
            </tr>
            </tbody>
          </q-markup-table>
          <q-btn @click="shippingFormVisible = true"
                 color="green"
                 :disable="!cart.length"
                 label="Checkout"
                 class="full-width"
                 icon="cart"
                 />
        </div>
        <div>
          <q-img :src="LOGO" fit="cover"/>
        </div>
      </div>
    </div>
    <q-dialog v-model="shippingFormVisible">
      <ShippingForm/>
    </q-dialog>
    <InvoiceModal/>
  </q-page>
</template>

<script>
import ShippingForm from "../components/ShippingForm";
import LOGO from "../assets/img/PF/pollofeed_logo.png"
import pollofeed_logo from "../assets/img/PF/pollofeed_logo.png"
import {moneyFormat} from "../services/moneyUtils";
import {mapGetters, mapMutations} from "vuex";
import {
  ADD_ITEM_TO_CART,
  CLEAR_CART,
  REMOVE_ITEM_FROM_CART,
  SELECT_SHIRT_SIZE
} from "../store/mutations";
import InvoiceModal from "components/InvoiceModal";

export default {
  name: "Swag",
  components: {InvoiceModal, ShippingForm},

  computed: {
    ...mapGetters(['cartTotalPrice', 'cart', 'merchandise', 'cartQuantity'])
  },
  mounted() {
    if (window.innerWidth <= 576) {
      document.getElementById("content").classList.remove("active")
      document.getElementById("sidebar").classList.remove("active")
    }

  },
  methods: {
    changeSize(e, idx) {
      this.SELECT_SHIRT_SIZE({size: e, idx})
    },
    moneyFormat,
    ...mapMutations([REMOVE_ITEM_FROM_CART, ADD_ITEM_TO_CART, CLEAR_CART, SELECT_SHIRT_SIZE]),
    clearQuantities() {
      this.items = this.items.map(i => ({...i, quantity: 1}))
    },
    toggleSidebar() {
      document.getElementById("content").classList.toggle("active")
      document.getElementById("sidebar").classList.toggle("active")
    },


    emptyCart() {
      this.clearQuantities()
    },

  },
  data: function() {
    return {
      pollofeed_logo,
      shirtSizeOptions: ['s', 'm', 'l', 'xl'],
      LOGO,
      shippingFormVisible: false,
      isPaid: window.location.search.includes("paid"),
    };
  }
}
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";
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
  background: $dark_marine_blue;
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
