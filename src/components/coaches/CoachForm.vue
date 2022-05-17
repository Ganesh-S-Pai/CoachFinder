<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First Name</label
      ><input
        id="firstname"
        type="text"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name cannot be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last Name</label
      ><input
        id="lastname"
        type="text"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">First Last cannot be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label
      ><textarea
        id="description"
        rows="5"
        type="text"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      />
      <p v-if="!description.isValid">Description cannot be empty!</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Rate</label
      ><input
        id="rate"
        type="number"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate must be greater than 0!</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          id="frontend"
          value="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        /><label for="frontend">Frontend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="backend"
          value="backend"
          v-model="areas.val"
        /><label for="backend">Backend</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="career"
          value="career"
          v-model="areas.val"
        /><label for="career">Career</label>
      </div>
      <p v-if="!areas.isValid">Atlease one Area must be selected!</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again!</p>
    <BaseButton>Register</BaseButton>
    <!-- <BaseButton @click="resetForm">Clear</BaseButton> -->
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstName: { val: '', isValid: true },
      lastName: { val: '', isValid: true },
      description: { val: '', isValid: true },
      rate: { val: null, isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    /* resetForm() {
      this.firstName = { val: '', isValid: true };
      this.lastName = { val: '', isValid: true };
      this.description = { val: '', isValid: true };
      this.rate = { val: null, isValid: true };
      this.areas = { val: [], isValid: true };
      this.formIsValid = true;
    }, */
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.firstName.val === '') {
        this.firstName.isValid = false;
        this.formIsValid = false;
      } else {
        this.firstName.isValid = true;
      }
      if (this.lastName.val === '') {
        this.lastName.isValid = false;
        this.formIsValid = false;
      } else {
        this.lastName.isValid = true;
      }
      if (this.description.val === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      } else {
        this.description.isValid = true;
      }
      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      } else {
        this.rate.isValid = true;
      }
      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      } else {
        this.areas.isValid = true;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

p {
  font-weight: bold;
}
</style>
