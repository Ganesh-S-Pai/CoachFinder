<template>
  <button v-if="!link" :class="mode" @click="$emit('click')" :type="type">
    <slot></slot>
  </button>
  <router-link v-if="link" :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: '/',
    },
    mode: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false
    }
  },
};
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover {
  background-color: #270041;
  border-color: #270041;
}

button:active {
  background-color: #270041;
  border-color: #270041;
  /* transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  box-shadow: 0px 1px 0px 0px; */
  padding: 0.72rem 1.47rem;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
