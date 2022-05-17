<template>
  <section>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      {{ error }}
    </BaseDialog>
    <BaseDialog :show="isLoading" title="Authenticating..." fixed>
      <BaseSpinner />
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <p v-if="!formIsValid" class="error">
          Please enter a valid email and password! (atleast 6 characters)
        </p>
        <BaseButton> {{ submitBtnCaption }} </BaseButton>
        <BaseButton type="button" mode="flat" @click="switchMode">
          {{ switchBtnCaption }}
        </BaseButton>
      </form>
    </BaseCard>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email == '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        return (this.formIsValid = false);
      }

      this.isLoading = true;

      const authPayload = {
        email: this.email,
        password: this.password,
        mode: this.mode,
      };
      try {
        await this.$store.dispatch('authenticate', authPayload);
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed: Try again later!';
      }

      this.isLoading = false;
    },
    switchMode() {
      if (this.mode == 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    submitBtnCaption() {
      if (this.mode == 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchBtnCaption() {
      if (this.mode == 'login') {
        return '... want to Signup?';
      } else {
        return 'Maybe, Login?';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.error {
  color: red;
}
</style>
