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
    
    // Обработка данных (на случай если твой сервер шлет кастомные поля в "data")
    const senderName = payload.data?.senderName || "Неизвестный";
    const msgType = payload.data?.type || "text";
    
    let bodyText = "У вас новое уведомление.";
    
    // Проверяем тип сообщения и форматируем текст
    if (msgType === 'text') {
        bodyText = payload.data?.text || payload.notification?.body || "Новое текстовое сообщение";
    } else if (msgType === 'image') {
        bodyText = "📷 Картинка";
    } else if (msgType === 'audio') {
        bodyText = "🎤 Голосовое сообщение";
    } else {
        // Запасной вариант, если пришел стандартный push-объект
        bodyText = payload.notification?.body || "Новое сообщение";
    }

    const notificationTitle = payload.notification?.title || `Новое сообщение от ${senderName}`;
    
    const notificationOptions = {
        body: bodyText,
        // Обязательно загрузи PNG-версию логотипа на GitHub, SVG здесь не работают!
        icon: 'https://raw.githubusercontent.com/LumoCreator/Ion/refs/heads/main/LOGO.png',
        badge: 'https://raw.githubusercontent.com/LumoCreator/Ion/refs/heads/main/LOGO.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
