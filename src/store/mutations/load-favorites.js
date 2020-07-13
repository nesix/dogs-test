import ls from '../../ls'

export default store => {

    store.favorites = ls('_favDogs') || []

    ls.on('_favDogs', favorites => {
        store.favorites = favorites || []
    })

}