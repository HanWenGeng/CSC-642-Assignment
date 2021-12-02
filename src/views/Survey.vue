<template>
  <div class="container form-container bg-light bg-opacity-70">
    <h1 class="text-center">Data Survey Form</h1>
    <p class="form-text fw-bold mb-4">* Required to submit the form</p>

    <form class="g-3" v-on:submit.prevent="onSubmit" novalidate>
      <section class="row form-section mb-4">
        <h4 class="fw-bold">Personal Information</h4>
        <div class="col-sm-6 mb-3">
          <label class="form-label">Last Name *</label>
          <input class="form-control" type="text" v-model="form.lastName" placeholder="Enter your last name" required>
          <div v-if="v$.form.lastName.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.lastName.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-sm-6 mb-3">
          <label class="form-label">First Name *</label>
          <input class="form-control" type="text" v-model="form.firstName" placeholder="Enter your first name" required>
          <div v-if="v$.form.firstName.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.firstName.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-12 mb-3">
          <label class="form-label">Preferred Title *</label>
          <select class="form-select" v-model="form.title" required>
            <option disabled value="">Select your preferred title</option>
            <option value="none">None</option>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
            <option value="staff">Staff</option>
            <option value="retired">Retired</option>
          </select>
          <div v-if="v$.form.title.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.title.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <label class="form-label">Height</label>
        <div class="col-12 col-md-4 mb-3 mt-0">
          <div class="form-text">Feet</div>
          <input class="form-control" type="number" v-model="form.height.feet" placeholder="Feet">
          <div v-if="v$.form.height.feet.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.height.feet.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="col-12 col-md-4 mb-3 mt-0">
          <div class="form-text">Inches</div>
          <input class="form-control" type="number" v-model="form.height.inches" placeholder="Inches">
          <div v-if="v$.form.height.inches.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.height.inches.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-12 mb-3">
          <label class="form-label">Phone Number</label>
          <input class="form-control" type="tel" v-model="form.phone" placeholder="Enter your phone number(10 digit)">
          <div v-if="v$.form.phone.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.phone.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-12 mb-3">
          <label class="form-label">Address *</label>
          <input class="form-control" type="text" v-model="form.address.Address1" placeholder="Enter your address" required>
          <div v-if="v$.form.address.Address1.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.address.Address1.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-12 mb-3">
          <label class="form-label">Apartment, suite, etc.</label>
          <div class="col-md-6">
            <input class="form-control" type="text" v-model="form.address.Address2" placeholder="">
          </div>
          <div v-if="v$.form.address.Address2.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.address.Address2.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <label class="form-label">City *</label>
          <input class="form-control" type="text" v-model="form.address.city" placeholder="City Name" required>
          <div v-if="v$.form.address.city.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.address.city.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <label class="form-label">State/Province *</label>
          <select class="form-select" v-model="form.address.state" required>
            <option disabled value="">Select your state</option>
            <option v-for="state in states" v-bind:key="state" v-bind:value="state">
              {{ state }}
            </option>
          </select>
          <div v-if="v$.form.address.state.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.address.state.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>

        <div class="col-md-4 mb-3">
          <label class="form-label">Zip/Postal code *</label>
          <input class="form-control" type="text" v-model="form.address.zip" placeholder="ZIP" required>
          <div v-if="v$.form.address.zip.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.address.zip.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>
      </section>

      <section class="row form-section mb-4">
        <h4 class="fw-bold">Services</h4>
        <div class="mb-3">
          <label class="form-label">Check all services you require:</label>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.services" value="email">
            <label class="form-check-label">Email</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.services" value="phone">
            <label class="form-check-label">Phone</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.services" value="facebook">
            <label class="form-check-label">Facebook</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.services" value="twitter">   
            <label class="form-check-label">Twitter</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.services" value="surface"> 
            <label class="form-check-label">Surface mail</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="form.services" value="personal"> 
            <label class="form-check-label">Personal visit</label>
          </div>
        </div>

        <div>
          <label class="form-label">Monthly Budget</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="form.budget" value="<50">
            <label class="form-check-label">Less than $50</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="form.budget" value="50-100">
            <label class="form-check-label">Between $50 and $100</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" v-model="form.budget" value=">100">
            <label class="form-check-label">Above $100</label>
          </div>
        </div>
      </section>

      <section class="row form-section mb-4">
        <h4 class="fw-bold">Contact Information</h4>
        <div>
          <label class="form-label">Email *</label>
          <input class="form-control" type="email" v-model="form.email" placeholder="Enter your Email" required>
          <div v-if="v$.form.email.$error">
            <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.email.$errors">
              {{ error.$message }}
            </p>
          </div>
        </div>
      </section>

      <div class="mb-3">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="form.terms" required>
          <label class="form-check-label form-label mb-0">I have read and agree to the Terms & Conditions *</label>
        </div>
        <div v-if="v$.form.terms.$error">
          <p class="mb-0 invalid-message" v-bind:key="error.$uid" v-for="error in v$.form.terms.$errors">
            {{ error.$message }}
          </p>
        </div>
      </div>

      <div class="mb-4">
        <label class="form-label">CAPTCHA *</label>
        <div class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"></div>
        <p class="invalid-message" v-if="!form.captcha && v$.form.captcha.$dirty">CAPTCHA is required</p>
      </div>

      <div class="mb-5 text-left">
        <button class="btn btn-primary margin-auto" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  numeric,
  minLength,
  maxLength,
  minValue,
  maxValue,
  email,
  sameAs,
} from "@vuelidate/validators";

const onlyAlpha = (value) => {
  return /^[a-zA-Z ]*$/.test(value);
};

const AlphaNumeric = (value) => {
  return /^[a-zA-Z0-9 ]*$/.test(value);
};

export default {
  name: "Home",
  data() {
    return {
      v$: useVuelidate(),
      form: {
        lastName: "",
        firstName: "",
        title: "",
        height: {
          feet: 0,
          inches: 0,
        },
        phone: "",
        address: {
          Address1: "",
          Address2: "",
          city: "",
          state: "",
          zip: "",
        },
        services: [],
        budget: "",
        email: "",
        terms: false,
        captcha: "",
      },
      states: [
        'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
    };
  },
  validations() {
    return {
      form: {
        lastName: {
          required,
          maxLength: maxLength(40),
          onlyAlpha: helpers.withMessage(
            "Name must be alphabetical",
            onlyAlpha
          ),
        },
        firstName: {
          required,
          maxLength: maxLength(40),
          onlyAlpha: helpers.withMessage(
            "Name must be alphabetical",
            onlyAlpha
          ),
        },
        title: {
          required
        },
        height: {
          feet: {
            minValue: minValue(0),
            maxValue: maxValue(10),
          },
          inches: {
            minValue: minValue(0),
            maxValue: maxValue(11),
          },
        },
        phone: {
          numeric,
          minLength: minLength(10),
          maxLength: maxLength(10),
        },
        address: {
          Address1: {
            required,
            maxLength: maxLength(40),
            AlphaNumeric: helpers.withMessage(
              "Address must be alpha-numeric",
              AlphaNumeric
            ),
            
          },
          Address2: {
            maxLength: maxLength(40),
            AlphaNumeric: helpers.withMessage(
              "Address must be alpha-numeric",
              AlphaNumeric
            ),
          },
          city: {
            required,
            maxLength: maxLength(40),
            AlphaNumeric: helpers.withMessage(
              "City must be alphabetical",
              onlyAlpha
            ),
          },
          state: {
            required,
            maxLength: maxLength(40),
            AlphaNumeric: helpers.withMessage(
              "State must be alphabetical",
              onlyAlpha
            ),
          },
          zip: {
            required,
            numeric,
            minLength: minLength(5),
            maxLength: maxLength(5),
          },
        },
        email: {
          required,
          email,
        },
        terms: {
          required,
          sameAs: helpers.withMessage(
            "Not so fast, please indicate that you have read and agree to the Terms & Conditions",
            sameAs(true)
          ),
        },
        captcha: { 
          required 
        },
      },
    };
  },
  methods: {
    async onSubmit() {
      let response = window.grecaptcha.getResponse();
      if (response) {
        this.form.captcha = response;
      }
      await this.v$.$touch();
      if (!this.v$.$invalid) {
        localStorage.setItem("form", JSON.stringify(this.form));
        this.$router.push("verification");
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.invalid-message {
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
