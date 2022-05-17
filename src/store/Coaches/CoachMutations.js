export default {
    RegisterCoach(state, coachData) {
        state.coaches.unshift(coachData);
    },
    setCoaches(state, payload) {
        state.coaches = payload;
    },
    setFetchTimeStamp(state) {
        state.lastFetch = new Date().getTime();
    }
};