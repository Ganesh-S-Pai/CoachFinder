<template>
  <section>
    <div v-if="isLoading">
      <BaseCard>
        <BaseSpinner />
      </BaseCard>
    </div>
    <section v-else-if="selectedCoach && !isLoading">
      <section>
        <BaseCard>
          <h2>{{ fullName }}</h2>
          <h3>${{ rate }}/hour</h3>
        </BaseCard>
      </section>
      <section>
        <BaseCard>
          <header>
            <h2>Interested? reach out now!</h2>
            <BaseButton link :to="contactLink">Contact</BaseButton>
          </header>
          <router-view></router-view>
        </BaseCard>
      </section>
      <section>
        <BaseCard>
          <BaseBadge
            v-for="area in areas"
            :key="area"
            :type="area"
            :title="area"
          >
          </BaseBadge>
          <p>{{ description }}</p>
        </BaseCard>
      </section>
    </section>
    <section v-else>
      <BaseCard
        >No coach with id {{ coachId }} found...
        <p>
          Maybe check all our <router-link to="/coaches">Coaches</router-link>?
        </p>
      </BaseCard>
    </section>
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoach: null,
      isLoading: false,
      error: false,
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
    getCoaches() {
      this.selectedCoach = this.$store.getters['coach/getCoaches'].find(
        (coach) => coach.id == this.id
      );
    },
  },
  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    contactLink() {
      let contactPath = '';
      if (!this.$route.path.includes('/contact')) {
        contactPath = this.$route.path + '/contact';
      } else {
        contactPath = this.$route.path;
      }
      return contactPath;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    rate() {
      return this.selectedCoach.hourlyRate;
    },
    description() {
      return this.selectedCoach.description;
    },
    coachId() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getCoaches();
  },
  beforeMount() {
    if (this.selectedCoach == null) {
      this.loadCoaches().then(() => {
        this.getCoaches();
      });
    }
  },
};
</script>
