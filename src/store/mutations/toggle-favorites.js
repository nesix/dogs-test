import ls from '../../ls'

export default (store, image) => {

    const index = store.favorites.indexOf(image);
    if (-1 === index) {

        // add
        store.favorites.push(image)

    } else {

        // remove
        store.favorites.splice(index, 1)

    }
    ls('_favDogs', store.favorites)

}