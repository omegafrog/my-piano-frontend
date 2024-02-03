// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyAlIAbvOkxQNg1fzdHyjonk1p23ByFrArc",
  authDomain: "mypiano-b2528.firebaseapp.com",
  projectId: "mypiano-b2528",
  storageBucket: "mypiano-b2528.appspot.com",
  messagingSenderId: "277345047709",
  appId: "1:277345047709:web:22db586da39dd0a9707074",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
    );
    // Customize notification here

    self.registration.showNotification(payload);
    });
