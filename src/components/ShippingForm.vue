<template>
  <q-card class="q-pa-md q-ma-md">
    <h4 class="q-mb-3">Delivery address</h4>
    <q-form @submit.prevent="submit">
          <q-input v-model="purchaseForm.firstName" label="first name" :rules="nameRules"/>
          <q-input label="last name" required v-model="purchaseForm.lastName" :rules="nameRules"/>
        <q-input label="address" placeholder="1234 Main St" required v-model="purchaseForm.address" :rules="nameRules"/>
        <q-input label="address2" placeholder="Apartment or suite" v-model="purchaseForm.address2"/>
          <q-select label="country" required v-model="purchaseForm.country" :options="countries" />
          <q-select label="state" required v-model="purchaseForm.state" :options="states">
          </q-select>
          <q-input label="zip" required v-model="purchaseForm.zip"/>
        <q-input label="city" v-model="purchaseForm.city"/>
        <q-input type="email"  label="email" placeholder="you@@example.com" required v-model="purchaseForm.email"/>
      <div class="row q-my-md justify-center">
        <q-btn color="primary" unelevated type="submit" :loading="loadingInvoice">
              Purchase {{moneyFormat(cartTotalPrice)}}
        </q-btn>
      </div>
    </q-form>
  </q-card>
</template>

<script>
import {country_arr, s_a} from "../countries";
import {moneyFormat} from "../services/moneyUtils";
import {mapActions, mapGetters} from "vuex";
import {MERCH_INVOICE} from "src/store/actions";

const testForm = {
  firstName: "test",
  lastName: "test",
  address: "1234 main street",
  address2: "",
  zip: "90235",
  state: "California",
  country: "USA",
  city: "Los Angeles",
  email: "jchimien@gmail.com"
}
const blankForm = {
  firstName: "",
  lastName: "",
  address: "",
  address2: "",
  zip: "",
  state: "",
  country: "USA",
  city: "",
  email: "",
}
export default {
  name: "ShippingForm",
  computed: {
    ...mapGetters(['cartTotalPrice', 'cart'])
  },
  data() {
    const usaIndex = country_arr.findIndex(c => c === "USA")
    const states = s_a[usaIndex + 1].split("|") || []
    return {
      loadingInvoice: false,
    countries: country_arr,
    states: states,
    nameRules: [
      val => (val && val.length > 0) || 'Please type something'
    ],
    purchaseForm: blankForm
    // purchaseForm: testForm
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
    ...mapActions([MERCH_INVOICE]),
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
        cart: this.cart.slice().map(c => {
          if (!c.isShirt) {
            return {
              ...c,
              size: null
            }
          }
          return c
        })
      }
      this.loadingInvoice = true
      this.MERCH_INVOICE(swagInvoice).then(() => {
        setTimeout(() => {
          this.loadingInvoice = false
        }, 3000)
      })
    },
  }
}
</script>

<style scoped>

</style>
