<template>
  <div v-if="swagInvoices && activeInvoice">
    <router-link to="/" class="nav-link"><span>back</span></router-link>
    <div>
      <button class="btn btn-danger" @click="markShipped">Mark Shipped!</button>
    </div>
    <div class="d-flex justify-content-around p-2">
      <div><span>Order</span>
        <a :href="invoiceHref"></a>
      </div>
      <h2><span>Total </span>
        <span class="text-monospace">{{moneyFormat(activeInvoiceTotal)}}</span></h2> </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <h4>Information</h4>
        <table class="table">
          <tbody>
          <tr v-for="item in activeInvoice.items" :key="item.id">
            <td colspan="2">
              <img :src="getImage(item.id)" style="width: 200px;" />
            </td>
            <td colspan="2">
              <h5>({{item.quantity}}) {{item.id}}
                <span v-if="isShirt(item)" class="text-monospace text-uppercase">{{ item.size }}</span>
              </h5></td>
            <td class="text-right text-monospace">
              <h5>{{item.price}}</h5></td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-md-6">
        <h4>Buyer Information</h4>
        <table class="table">
          <tbody>
          <tr>
            <td>name</td>
            <td>{{buyer.name}}</td>
          </tr>
          <tr>
            <td>email</td>
            <td>{{buyer.email}}</td>
          </tr>
          <tr>
            <td>address</td>
            <td>{{ buyer.address1 }}</td>
          </tr>
          </tbody>
          <tr>
            <td>locality</td>
            <td>{{buyer.locality}}</td>
          </tr>
          <tr>
            <td>region</td>
            <td>{{ buyer.region }}</td>
          </tr>
          <tr>
            <td>postalCode</td>
            <td>{{buyer.postalCode}}</td>
          </tr>
          <tr>
            <td>country
            <td>{{buyer.country}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6"></div>
      <div class="col-12 col-md-6">
        <textarea class="form-control text-dark" style="max-width: 300px;" rows="13" v-model="buyerTextArea">
        </textarea>
      </div>
    </div>
  </div>
  <div v-else-if="swagInvoices && !activeInvoice">
    <p>Not found</p>
  </div>
  <SplashScreen v-else/>
</template>

<script>
import {moneyFormat} from "@/services/moneyUtils";
import {mapGetters} from "vuex";
import {MARK_SHIPPED} from "@/admin/store/actions";
import SplashScreen from "components/SplashScreen";

const LOGO_SHIRT_IMG = require("../assets/img/PF/PF_tee_02.jpg")
const COASTER_IMG = require("../assets/img/PF/BY_-_PF_coaster.jpg")
const STICKER_IMG = "https://i.imgur.com/YliiAen.png"

const inventoryToImages = {
  LOGO_SHIRT: LOGO_SHIRT_IMG,
  COASTER: COASTER_IMG,
  STICKER: STICKER_IMG
}

export default {
  name: "SwagInvoice",
  components: {SplashScreen},
  methods: {
    moneyFormat,
    markShipped() {
      this.$store.dispatch(MARK_SHIPPED, this.invoiceId)
    },
    getImage(id) {
      return inventoryToImages[id]
    },
    isShirt(item) {
      return item.id.toLowerCase().includes("shirt")
    }
  },
  computed: {

    invoiceId() { return this.$route.params.id },
    ...mapGetters(['swagInvoices']),
    activeInvoice() { return this.swagInvoices.find(i => i.id === this.invoiceId) },
    activeInvoiceTotal() { return this.activeInvoice.items.map(i => i.price * i.quantity).reduce((a, b) => a + b, 0) },
    buyer() { return this.activeInvoice.buyer },
    buyerTextArea() {
      const {email, name, address1, address2 = "", state = "", region = "", zip = "", city = "", country = "", postalCode = "", locality = ""} = this.buyer
      return [email, name,address1, address2, locality, region, state, zip, city, postalCode, country].filter(i => i !== "").join("\n")
    },
    invoiceHref() { return `https://btcpal.online/invoice?id=${this.activeInvoice.id}`}
  }
}
</script>

<style scoped>

* {
  color: white;
}

</style>
