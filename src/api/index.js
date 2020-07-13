import axios from 'axios'

const baseURL = 'https://dog.ceo/api'

export default ({url}) => axios({
    method: 'GET',
    baseURL,
    url
}).then(response => {
    const {status, data} = response;
    if (200 !== status) throw response;
    const {status: responseStatus, message} = data || {}
    if ('success' !== responseStatus) throw message;
    return message
})