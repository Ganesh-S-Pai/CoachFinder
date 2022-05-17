import RequestsGetters from "./RequestsGetters";
import RequestsMutations from "./RequestsMutations";
import RequestsActions from "./RequestsActions";

export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },
    getters: RequestsGetters,
    mutations: RequestsMutations,
    actions: RequestsActions
}