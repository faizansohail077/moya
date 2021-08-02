import firebase from 'firebase/app'

export const addCustomer = (name, phone, address) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = firebase.auth().currentUser.uid
                let docId = firebase.firestore().collection(`Users`).doc().id

                await firebase.firestore().collection(`Users/${userId}/customers`).doc(docId).set({
                    name: name,
                    phone: phone,
                    address: address,
                    userId: docId
                })
                resolve()
            } catch (err) {
                console.log("🚀 ~ file: index.js ~ line 18 ~ returnnewPromise ~ err", err)
                reject()
            }
        })
    }
}

export const getCustomer = () => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                let Data = []
                const userId = firebase.auth().currentUser.uid
                const getData = await firebase.firestore().collection(`Users/${userId}/customers`).get()
                getData.docs.forEach((doc) => {
                    if (getData.size === getData.docs.length) {
                        Data.push(doc.data())
                    }
                })
                resolve(Data)
            } catch (err) {
                console.log("🚀 ~ file: index.js ~ line 18 ~ returnnewPromis e ~ err", err)
                reject()
            }
        })
    }
}

export const getCustomerById = (id) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = firebase.auth().currentUser.uid
                const getData = await firebase.firestore().collection(`Users/${userId}/customers`).doc(id).get()
                resolve(getData.data())
            } catch (err) {
                console.log("🚀 ~ file: index.js ~ line 18 ~ returnnewPromis e ~ err", err)
                reject()
            }
        })
    }
}

export const editCustomer = (docId, name, phone, address) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = firebase.auth().currentUser.uid
                await firebase.firestore().collection(`Users/${userId}/customers`).doc(docId).update({
                    name: name,
                    phone: phone,
                    address: address
                })
                resolve()
            } catch (err) {
                console.log("🚀 ~ file: index.js ~ line 55 ~ returnnewPromise ~ err", err)
                reject()
            }
        })
    }
}

export const addEntry = (customerId, bottles, price, total, date) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const userId = firebase.auth().currentUser.uid
                const docId = firebase.firestore().collection("Entires").doc().id
                await firebase.firestore().collection(`Users/${userId}/customers/${customerId}/Entries`).doc(docId).set({
                    user_id: customerId,
                    bottles: bottles,
                    price: price,
                    total: total,
                    date: date,
                    docId: docId,
                    status: 'paid'
                })
                resolve()
            } catch (err) {
                reject()
                console.log("🚀 ~ file: index.js ~ line 75 ~ returnnewPromise ~ err", err)
            }
        })
    }
}

export const getEntry = (customerId) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                let Data = []
                const currentuserId = firebase.auth().currentUser.uid
                const getData = await firebase.firestore().collection(`Users/${currentuserId}/customers/${customerId}/Entries`).where("user_id", "==", customerId).get()
                if (getData.docs.length === 0) {
                    resolve(Data)
                } else {
                    getData.docs.forEach((doc) => {
                        if (getData.size === getData.docs.length) {
                            Data.push(doc.data())
                            resolve(Data)
                        }
                    })
                }
            } catch (err) {
                reject(err)
            }
        })
    }
}

export const editEntry = (customerId, docId, date, bottles, price, total, status) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const currentuserId = firebase.auth().currentUser.uid
                await firebase.firestore().collection(`Users/${currentuserId}/customers/${customerId}/Entries`).doc(docId).update({
                    date: date,
                    bottles: bottles,
                    price: price,
                    total: total,
                    status: status
                })
                resolve()
            } catch (err) {
                console.log("🚀 ~ file: index.js ~ line 135 ~ returnnewPromise ~ err", err)
                reject()
            }
        })
    }
}

export const deleteEntry = (customerId, docId) => {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            try {
                const currentuserId = firebase.auth().currentUser.uid
                await firebase.firestore().collection(`Users/${currentuserId}/customers/${customerId}/Entries`).doc(docId).delete()
                resolve()
            } catch (err) {
                console.log("🚀 ~ file: index.js ~ line 149 ~ returnnewPromise ~ err", err)
                reject()
            }
        })
    }
}

