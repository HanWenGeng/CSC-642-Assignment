<template>
  <div class="container form-container bg-info bg-opacity-10">
    <h1 class="text-center mb-5">Verification page</h1>

    <section class="mb-4 form-section">
      <h4 class="fw-bold">Personal Information</h4>
      <div class="mb-3">
        <div class="form-label mb-0">Name:</div>
        <p>{{ this.form.lastName }} {{ this.form.firstName }}</p>
      </div>
      <div class="mb-3">
        <div class="form-label mb-0">Preferred Title:</div>
        <p>{{ getTitle }}</p>
      </div>
      <div class="mb-3">
        <div class="form-label mb-0">Height:</div>
        <p>{{ getHeight }}</p>
      </div>
      <div class="mb-3">
        <div class="form-label mb-0">Phone Number:</div>
        <p class="mb-0">{{ this.form.phone }}</p>
      </div>

      <div>
        <div class="form-label mb-0">Address:</div>
          <p class="mb-0">{{ this.form.address.Address1 }}</p>
          <p class="mb-0" v-if="this.form.address.Address2">
            {{ this.form.address.Address2 }}
          </p>
          <p class="mb-3">
            {{ this.form.address.city }}, {{ this.form.address.state }}
            {{ this.form.address.zip }}
          </p>
        </div>
        <GMapMap v-if="mapCenter.lat && mapCenter.lng" map-type-id="roadmap" v-bind:zoom="15" v-bind:center="mapCenter">
          <GMapMarker v-bind:position="mapCenter" v-bind:clickable="true" v-bind:draggable="true"/>
        </GMapMap>
    </section>

    <section class="mb-4 form-section">
      <h4 class="fw-bold">Services</h4>
      <div class="form-label mb-0">All services you require:</div>
      <ul v-if="getServices.length > 0">
        <li v-for="service in getServices" v-bind:key="service.name">
          {{ service.value }}
        </li>
      </ul>
      <p v-else>No services selected.</p>

      <div class="form-label mb-0">Monthly Budget:</div>
      <p class="mb-0">{{ getBudget }}</p>
    </section>

    <section class="mb-5 form-section">
      <h4 class="fw-bold">Contact Information</h4>
      <p class="form-label mb-0">Email Address:</p>
      <p class="mb-0">{{ this.form.email }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Result",
  data() {
    return {
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
        captcha: false,
      },
      titles: [
        {
          name: "none",
          value: "None",
        },
        {
          name: "student",
          value: "Student",
        },
        {
          name: "professor",
          value: "Professor",
        },
        {
          name: "staff",
          value: "Staff",
        },
        {
          name: "retired",
          value: "Retired",
        },
      ],
      services: [
        {
          name: "email",
          value: "Email",
        },
        {
          name: "phone",
          value: "Phone",
        },
        {
          name: "facebook",
          value: "Facebook",
        },
        {
          name: "twitter",
          value: "Twitter",
        },
        {
          name: "surface",
          value: "Surface mail",
        },
        {
          name: "personal",
          value: "Personal visit",
        },
      ],
      budgets: [
        {
          name: "<50",
          value: "Less than $50",
        },
        {
          name: "50-100",
          value: "Between $50 and $100",
        },
        {
          name: ">100",
          value: "Above $100",
        },
      ],
      mapCenter: {
        lat: null,
        lng: null,
      },
    };
  },
  computed: {
    getTitle() {
      return this.titles.find(
        (title) => title.name === this.form.title
      )?.value;
    },
    getServices() {
      return this.services.filter((service) =>
        this.form.services.includes(service.name)
      );
    },
    getBudget() {
      let budget = this.budgets.find(
        (budget) => budget.name === this.form.budget
      );
      return budget ? budget.value : "No budget selected.";
    },
    getHeight() {
      let { feet, inches } = this.form.height;
      return feet > 0 || inches > 0
        ? `${feet}' ${inches}''`
        : "No height entered.";
    },
  },
  async mounted() {
    this.form = JSON.parse(localStorage.getItem("form"));
    let { Address1, Address2, city, state, zip } =
      this.form.address;

    let query = `${Address1},${Address2},${city},${state},${zip}`;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=AIzaSyC4Dwl-tqT4jJ8F8FxIw0ALr9yxxoXI0MI`
    );
    const data = await response.json();

    let { lat, lng } = data.results[0].geometry.location;
    this.mapCenter = {
      lat: lat,
      lng: lng,
    };
  },
};
</script>

<style scoped>
/deep/ .vue-map-container {
  height: 20rem;
}
</style>
