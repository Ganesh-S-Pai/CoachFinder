<template>
  <section>
    <BaseCard>
      <h2>Register as a Coach now!</h2>
      <div v-if="isLoading"><BaseSpinner /></div>
      <CoachForm @save-data="saveData" v-else-if="!isCoach&&!isLoading" />
      <p v-else>You are already a coach!</p>
    </BaseCard>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      isCoach: false,
      isLoading: false,
      isError: false
    }
  },
  methods: {
    async loadCoaches(force = false) {
      this.isLoading = true;
      try {
          await this.$store.dispatch('coach/loadCoaches', {
            forceRefresh: force,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong...';
      }
      this.isLoading = false;
    },
    saveData(data) {
      this.$store.dispatch('coach/RegisterCoach', data);
      this.$router.replace('/coaches');
    },
    checkCoach() {
      this.isCoach = this.$store.getters['coach/isCoach'];
    },
  },
  created() {
    this.loadCoaches().then(() => {
      this.checkCoach();
    }
    );
  }
};
</script>
