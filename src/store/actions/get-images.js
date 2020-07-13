import api from '../../api'

export default (_, breed) =>
    api({
        url: breed
            ? '/breed/'+String(breed)+'/images/random/20'
            : '/breeds/image/random/20'
    })