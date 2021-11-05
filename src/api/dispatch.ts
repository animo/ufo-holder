const BASE_URL = ''
const ENDPOINTS = {
  respondToSilentNotification: '',
}

// Travel time is in seconds and will only be send when the respodner has the correct credentials
export const sendResponseToSilentnotification = (body: { hasCredentials: boolean; travelTime: number }) => {
  // eslint-disable-next-line no-console
  console.log(body)

  //void fetch(`${BASE_URL}${ENDPOINTS.respondToSilentNotification}`, {
  //method: 'POST',
  //body: JSON.stringify({
  //hasCredentials: body.hasCredentials,
  //travelTime: body.hasCredentials ? body.travelTime : null,
  //}),
  //})
}
