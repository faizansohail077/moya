import firebase from '../../../config/database/firebase'

export const login = (email, password) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                const userId = firebase.auth().currentUser.uid
                await firebase.firestore().collection(`Users`).doc(userId).set({
                    email: firebase.auth().currentUser.email,
                    userId: userId
                })
                resolve()
            } catch (error) {
                reject(error.message)
            }
        })
    }
}

export const logout = () => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const logout = await firebase.auth().signOut()
                resolve(logout)
            } catch (error) {
                reject(error)
            }
        })
    }
}