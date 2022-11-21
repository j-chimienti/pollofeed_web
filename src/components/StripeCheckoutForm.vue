<template>
  <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="(v) => (loading = v)"
    />
    <q-btn @click="submit">Pay now!</q-btn>
  </div>
</template>

<script>
import { StripeCheckout } from "@vue-stripe/vue-stripe"
export default {
  components: {
    StripeCheckout,
  },
  data() {
    // todo: tie success url to client
    this.publishableKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY
    const successURL = process.env.VUE_APP_STRIPE_REDIRECT_URL_SUCCESS
    const cancelURL = process.env.VUE_APP_STRIPE_REDIRECT_URL_FAILURE
    console.log(this.publishableKey)
    return {
      loading: false,
      lineItems: [
        {
          price: "price_1M6gLPAi4RcydX01pR2n4srF", // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL,
      cancelURL,
    }
  },
  methods: {
    submit() {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout()
    },
  },
}
</script>
