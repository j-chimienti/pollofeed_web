<template>
  <div class="col-md-12">
    <h4 class="mb-3">Delivery address</h4>
    <q-form novalidate @submit.prevent="submit">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName">First name</label>
          <q-form-input v-model="purchaseForm.firstName" id="firstName" required/>
          <q-form-invalid-feedback> Valid first name is required. </q-form-invalid-feedback>
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName">Last name</label>
          <q-form-input id="lastName" required v-model="purchaseForm.lastName"/>
          <q-form-invalid-feedback> Valid last name is required. </q-form-invalid-feedback>
        </div>
      </div>
      <div class="mb-3">
        <label for="address">Address</label>
        <q-form-input id="address" placeholder="1234 Main St" required v-model="purchaseForm.address"/>
        <q-form-invalid-feedback> Please enter your shipping address. </q-form-invalid-feedback>
      </div>
      <div class="mb-3">
        <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
        <q-form-input id="address2" placeholder="Apartment or suite" v-model="purchaseForm.address2"/>
      </div>
      <div class="row">
        <div class="col-md-5 mb-3">
          <label for="country">Country</label>
          <select class="custom-select d-block w-100" id="country" required v-model="purchaseForm.country">
            <option value="">Select Country</option>
            <option v-for="country in countries" :key="country">{{country}}</option>
          </select>
          <q-form-invalid-feedback> Please select a valid country. </q-form-invalid-feedback>
        </div>
        <div class="col-md-4 mb-3">
          <label for="state">State</label>
          <select class="custom-select d-block w-100" id="state" required v-model="purchaseForm.state">
            <option value="">Select State...</option>
            <option v-for="state in states" :key="state">{{state}}</option>
          </select>
          <q-form-invalid-feedback> Please provide a valid state. </q-form-invalid-feedback>
        </div>
        <div class="col-md-3 mb-3">
          <label for="zip">Zip</label>
          <q-form-input id="zip" required v-model="purchaseForm.zip"/>
          <q-form-invalid-feedback> Zip code required. </q-form-invalid-feedback>
        </div>
      </div>
      <div class="mb-3">
        <label for="city">City</label>
        <q-form-input id="city" v-model="purchaseForm.city"/>
        <q-form-invalid-feedback> Please enter a valid city. </q-form-invalid-feedback>
      </div>
      <div class="mb-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="you@@example.com" required v-model="purchaseForm.email">
        <q-form-invalid-feedback> Please enter a valid email address for shipping updates. </q-form-invalid-feedback>
      </div>
          <kbd id="command"></kbd>
          <q-btn color="primary" block type="submit">
            <q-spinner small v-if="loadingBtcpayserverInvoice">
            </q-spinner>
            <span v-else>
              Purchase {{moneyFormat(cartTotalPrice)}}
            </span>
          </q-btn>
    </q-form>
  </div>
</template>

<script>
import {country_arr, s_a} from "../countries";
import {BTCPAYSERVER_INVOICE_REQUEST} from "../store/actions";
import {moneyFormat} from "../services/moneyUtils";
import {mapGetters} from "vuex";

export default {
  name: "ShippingForm",
  computed: {
    ...mapGetters(['cartTotalPrice', 'cart', 'loadingBtcpayserverInvoice'])
  },
  data() { return {
    countries: country_arr,
    states: [],
    purchaseForm: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      state: "",
      country: "",
      city: "",
      email: ""
    }
  }},
  watch: {
    'purchaseForm.country': function(newVal) {
      const found = this.countries.find(c => c === newVal)
      if (found) {
        const idx = this.countries.findIndex(c => c === newVal)
        this.states = s_a[idx + 1].split("|")
      }
      else console.log("Country not found")
    }
  },
  methods: {
    moneyFormat,
    submit() {
      const {
        firstName,
        lastName,
        address
      } = this.purchaseForm
      const buyer = Object.assign({}, this.purchaseForm, {
        address1: address,
        name: firstName + " " + lastName
      })
      const swagInvoice = {
        buyer,
        cart: this.cart.map(c => {
          if (!c.isShirt) {
            delete c.size;
          }
          return c
        })
      }
      this.$store.dispatch(BTCPAYSERVER_INVOICE_REQUEST, swagInvoice)
    },
  }
}
</script>

<style scoped>

</style>
