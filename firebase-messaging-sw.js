// Импортируем Firebase SDK старого формата (compat), так как он идеален для Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Инициализируем приложение внутри сервис-воркера
firebase.initializeApp({
    apiKey: "AIzaSyA_nMOvRvO0mMjxt9nhmM_7fMdtM832pX4",
    authDomain: "messenger-ion.firebaseapp.com",
    projectId: "messenger-ion",
    storageBucket: "messenger-ion.firebasestorage.app",
    messagingSenderId: "904598269438",
    appId: "1:904598269438:web:d6990731a5d09ce5e6e4af"
});

const messaging = firebase.messaging();

// Ловим уведомления, когда вкладка/браузер закрыты или свернуты
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Получено фоновое уведомление: ', payload);
    
    const notificationTitle = payload.notification?.title || "Новое сообщение в Ion";
    const notificationOptions = {
        body: payload.notification?.body || "У вас новое уведомление.",
        icon: 'https://raw.githubusercontent.com/LumoCreator/Ion/refs/heads/main/LOGO.svg', // Сюда можно поставить ссылку на иконку Ion Messenger
        badge: 'https://via.placeholder.com/128'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
