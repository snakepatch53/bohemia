import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function asset(path: string) {
    return `/storage/${path}`;
}

// Función para reproducir el sonido
const playSound = () => {
    const audio = new Audio('/mp3/notification.mp3');
    audio.play();
};

// Función para mostrar la notificación
export function showNotification({ title, body }: any) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body,
            icon: '/img/icon.png',
        });

        notification.onclick = () => {
            window.focus();
        };

        playSound();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                showNotification({});
            }
        });
    }
}

export function detectOrderChanges(orders, newOrders) {
    if (orders == null) return [];
    return newOrders.filter((order) => {
        return orders.find((o) => o.id === order.id) === undefined;
    });
}

export function notificateNewOrders(newOrders) {
    if (newOrders.length > 0) {
        newOrders.forEach((order) => {
            showNotification({
                title: 'Nuevo pedido',
                body: `${order.client?.name} pidio: '${order.song?.artist} - ${order.song?.title}'`,
            });
        });
    }
}
