import styles from './styles.module.scss';
import { ErrorIcon, WarningIcon, WellDoneIcon } from './icons';
import { ReactNode } from 'react';

export const NOTIFICATION_ANCHOR = 'notification-anchor';

export const NOTIFICATION_ANCHOR_PROP = {
    'data-anchor': NOTIFICATION_ANCHOR,
};

type Anchor = string | HTMLElement;

type NotificationType = 'success' | 'warning' | 'error';

const DEFAULT_ANCHOR_SELECTOR = `*[data-anchor=${NOTIFICATION_ANCHOR}]`;

const ICONS_INFO = {
    success: WellDoneIcon,
    error: ErrorIcon,
    warning: WarningIcon,
};

let notificationsTops: number[] = [];

const createNotification = (type: NotificationType, description: ReactNode) => {
    const notification = document.createElement('div');
    const icon = ICONS_INFO[type];

    notification.innerHTML = `${icon}<p>${description}</p>`;
    notification.classList.add(styles.notificationOpen);
    return notification;
};

const alignNotification = (notification: HTMLElement, rawAnchor: Anchor) => {
    const alignAnchor =
        typeof rawAnchor === 'object'
            ? rawAnchor
            : document.body.querySelector(rawAnchor);
    const alignAnchorRect = (
        alignAnchor || document.body
    ).getBoundingClientRect();

    if (alignAnchorRect) {
        const left = alignAnchorRect.left + alignAnchorRect.width / 2;

        notification.style.left = `${left}px`;
    }
};

const computeTopOfNewNotification = (newNotificationRect: DOMRect) => {
    const gap = 20; // 20px gap
    const lastNotificationTop =
        notificationsTops[notificationsTops.length - 1] ||
        newNotificationRect.top;

    return lastNotificationTop - newNotificationRect.height - gap;
};

const removeNotification = (
    notification: HTMLElement,
    notificationTop: number
) => {
    notification.style.top = '100%';
    notificationsTops = notificationsTops.filter(
        (savedTop) => savedTop !== notificationTop
    );
    setTimeout(() => notification.remove(), 500); // 0.5s animation
};

const Notice = {
    open(
        type: NotificationType,
        description: ReactNode,
        duration = 5000,
        alignAnchor: Anchor = DEFAULT_ANCHOR_SELECTOR
    ) {
        const notification = createNotification(type, description);

        alignNotification(notification, alignAnchor);
        document.body.append(notification);
        setTimeout(() => {
            const top = computeTopOfNewNotification(
                notification.getBoundingClientRect()
            );

            notification.style.top = `${top}px`;
            notificationsTops.push(top);
            setTimeout(removeNotification, duration, notification, top);
        });
    },

    success(description: ReactNode, duration = 5000, alignAnchor?: Anchor) {
        this.open('success', description, duration, alignAnchor);
    },

    warn(description: ReactNode, duration = 5000, alignAnchor?: Anchor) {
        this.open('warning', description, duration, alignAnchor);
    },

    error(description: ReactNode, duration = 5000, alignAnchor?: Anchor) {
        this.open('error', description, duration, alignAnchor);
    },

    notImpl(duration = 5000, alignAnchor?: Anchor) {
        this.open('warning', 'Ещё не реализовано', duration, alignAnchor);
    },
};

export default Notice;
