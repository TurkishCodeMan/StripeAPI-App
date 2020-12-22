<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-4 col-xl-1 mt-5 pt-5">
          <div class="card text-center">
            <img
              src="../assets/computer.png"
              style="margin-left: 5rem"
              class="p-2"
              alt=""
              width="200"
            />
            <h3 :class="result=='Payment Succesfully'?'text-success':'text-danger'">{{result}}</h3>

            <div class="card-body pr-5">
              <h4 class="text-white">Samsung Computer</h4>
              <p>
                <em class="text-white"
                  >intel i7 processor and samsung ssd in your dream laptop</em
                >
              </p>
              <div ref="card"></div>

              <button
                v-if="!loading"
                @click="pay"
                class="btn btn-outline-warning btn-block"
              >
                Buy
              </button>
              <button
                v-if="loading"
                @click="cancel"
                class="btn btn-outline-danger btn-block"
              >
                Cancel
              </button>
            </div>
          </div>

          <div id="card-element"></div>
          <button
            v-if="loading"
            @click="purchaseNow"
            class="btn btn-primary-outline-info mt-1"
          >
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import CardWidget from "../CardWidget";
export default {
  data() {
    return {
      loading: false,
      pk_key:
        "pk_test_51HyDsuDpwWIdmBWCK2c60jlxmzCoVZviv5Xesj595Yizv7aSwCNC704jlwmWEVjnkqGR5rrzlg3NtBw5dWmPDtq100KFmbD5Fq",
      stripe: "",
      widget: new CardWidget(),
      result: "",
    };
  },
  methods: {
    pay() {
      this.loading = true;
      this.widget.mounte();
    },
    cancel() {
      this.result = "";
      this.loading = false;
      this.widget.destroy();
    },

    async purchaseNow() {
      this.result = await this.widget.purchaseNow();
    },
  },

  async mounted() {
    this.stripe = await loadStripe(this.pk_key);
    this.widget = new CardWidget(this.stripe);
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
  height: 50rem;
  background-color: #007acc;

  .card {
    text-align: center;
    width: 25rem !important;
    background: transparent;
    border: none;
  }
}

/**
 * The CSS shown here will not be introduced in the Quickstart guide, but shows
 * how you can use CSS to style your Element's container.
 */
.StripeElement {
  box-sizing: border-box;

  height: 40px;
  width:24rem;
  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>>

