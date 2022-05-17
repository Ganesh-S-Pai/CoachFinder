<template>
  <section>
    <BaseDialog :show="!!error" title="An error occurred!" @close="handleError">
      {{ error }}
    </BaseDialog>
    <section>
      <CoachFilter @change-filter="setFilters"></CoachFilter>
    </section>
    <section>
      <BaseCard>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)"
            >Refresh</BaseButton
          >
          <BaseButton link to="/register" v-if="isLoggedIn && !isCoach && !isLoading"
            >Register as a Coach</BaseButton
          >
          <BaseButton link to="/auth?redirect=register" v-if="!isLoggedIn && !isLoading">Login to register as a Coach</BaseButton>
        </div>
        <div v-if="isLoading"><BaseSpinner /></div>
        <ul v-else-if="hasCoaches && filteredCoaches.length > 0">
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></CoachItem>
        </ul>
        <h3 v-else-if="!filteredCoaches.length > 0">
          No matching coaches found.
        </h3>
        <h3 v-else>No coaches found.</h3>
      </BaseCard>
    </section>
  </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
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
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coach/getCoaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coach/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coach/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    }
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
