<template>
  <footer>
    <h2>CoachFinder</h2>
    <br /><br />
    <p>copyrights {{ year }}</p>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  height: 3rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  margin-top: 300px;
}
h2 {
    color: white;
}
p {
    color: white;
}
</style>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
