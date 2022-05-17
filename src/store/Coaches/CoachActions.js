export default {
  async RegisterCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://coachfinder-9f5d0-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData),
        headers: { 'content-Type': 'application/json' },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to insert...');
        throw error;
    }

    context.commit('RegisterCoach', {
      ...coachData,
      id: userId,
    });
  },
  async loadCoaches(context, payload) {
    if(!context.getters.shouldUpdate && !payload.forceRefresh) return;

    const response = await fetch(
      `https://coachfinder-9f5d0-default-rtdb.firebaseio.com/coaches.json`
    );

    const responseData = await response.json();

    if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to fetch...');
        throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimeStamp');
  },
};
