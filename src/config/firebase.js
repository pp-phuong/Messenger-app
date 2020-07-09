import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCOuoiz851hL60ZFOV5hkEd-JMKB0fN314',
  authDomain: 'chat-sgroup.firebaseapp.com',
  databaseURL: 'https://chat-sgroup.firebaseio.com',
  projectId: 'chat-sgroup',
  storageBucket: 'chat-sgroup.appspot.com',
  messagingSenderId: '673192200825',
  appId: '1:673192200825:web:3091a172f324169884a2a8',
  measurementId: 'G-1P9WB7EPTT',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
