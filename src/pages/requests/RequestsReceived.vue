<template>
  <section>
    <BaseDialog title="An error occurred!" :show="!!error" @close="handleError">
      {{ error }}
    </BaseDialog>
    <section>
      <BaseCard>
        <header>
          <h2>Requests Received</h2>
        </header>
        <div v-if="isLoading"><BaseSpinner /></div>
        <ul v-else-if="hasRequests">
          <RequestItem
            v-for="request in receivedRequests"
            :key="request.id"
            :email="request.userEmail"
            :message="request.message"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </BaseCard>
    </section>
  </section>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  components: {
    RequestItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('request/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something went wrong...';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
  computed: {
    receivedRequests() {
      return this.$store.getters['request/requests'];
    },
    hasRequests() {
      return this.$store.getters['request/hasRequests'];
    },
  },
  created() {
    this.loadRequests();
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
