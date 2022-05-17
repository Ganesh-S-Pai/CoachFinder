import CoachMutations from './CoachMutations';
import CoachActions from './CoachActions';
import CoachGetters from './CoachGetters';

export default {
    namespaced: true,
    state() {
        return {
            lastFetch: null,
            coaches: []
        }
    },
    mutations: CoachMutations,
    getters: CoachGetters,
    actions: CoachActions
}