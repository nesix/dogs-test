import api from '../../api'

export default ({state: {breeds}, commit}) => new Promise((resolve, rejects) => {

    if (breeds.length) resolve(breeds);
    else {

        api({url: '/breeds/list/all'}).then(breeds => {

            breeds = Object.entries(breeds).map(([id]) => {
                const letter = id.substr(0, 1).toUpperCase();
                return {
                    id,
                    letter,
                    name: letter + id.substr(1),
                }
            })

            breeds.sort((a, b) => a.name > b.name ? 1 : -1)

            const groups = {}
            breeds.forEach(breed => {
                groups[breed.letter] = groups[breed.letter] || []
                groups[breed.letter].push(breed)
            })

            commit('setBreeds', groups)
            resolve(breeds)

        }).catch(rejects)

    }

})

