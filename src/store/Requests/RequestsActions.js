export default {
  async addRequest(context, payload) {
    const newReq = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://coachfinder-9f5d0-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newReq),
        headers: { 'content-Type': 'application/json' },
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Unable to post message to coach'
      );
      throw error;
    }

    newReq.id = responseData.name;
    newReq.coachId = payload.coachId;

    context.commit('addRequest', newReq);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://coachfinder-9f5d0-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Unable to fetch messages!'
      );
      throw error;
    }

    const requests = [];
    for(let key in responseData) {
        const request = {
            id : key,
            coachId: coachId,
            userEmail : responseData[key].userEmail,
            message : responseData[key].message
        };

        requests.push(request);
    }
    context.commit('setRequests', requests);
  },
};
