import * as firebase from 'firebase'
import 'firebase/firestore'

//lembrar de mudar: não upar no git
const firebaseConfig = {
    apiKey: "AIzaSyBYoHHL6DhAN7OSH52woVhrUuHBzUY_cyc",
    authDomain: "rpgdemesa.firebaseapp.com",
    databaseURL: "https://rpgdemesa.firebaseio.com",
    storageBucket: "rpgdemesa.appspot.com",
    projectId: "rpgdemesa",
}

try {
    firebase.initializeApp(firebaseConfig)
} catch (e) {
    console.log('App reloaded, so firebase did not re-initialize')
}

export default firebase

export const atributos = firebase.firestore().collection("atributos").doc('7dQjDsjbqoxwF5XfCY2w')
export const pericias = firebase.firestore().collection("pericias").doc('qKWDr9q3ia8I2MqxOUR9')