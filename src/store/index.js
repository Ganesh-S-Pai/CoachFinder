import { createStore } from 'vuex';

import CoachesModule from './Coaches/CoachIndex.js';
import RequestsModule from './Requests/RequestsIndex.js';
import AuthModule from './Auth/AuthIndex.js';

const store = createStore({
    modules: {
        coach: CoachesModule,
        request: RequestsModule,
        auth: AuthModule,
    },
    
});

export default store;