import {
    REAL_SHADOW_CLASS_NAME,
    defaultStringPhi,
    defaultStringFromHour,
    defaultStringToHour,
    defaultStringColor,
    defaultStringBlurRadius,
} from "./consts";
import {
    dataPhiName,
    dataFromHourName,
    dataToHourName,
    dataDistanceName,
    dataColorName,
    dataBlurRadius,
} from "./datanames";
import { ShadowProps } from "./types";

const constraintHour = (hn: number, x0: number, x1: number): [number, boolean] => {
    if (hn < x0) {
        return [x0, true];
    }

    if (hn > x1) {
        return [x1, true];
    }

    return [hn / (x1 - x0), false];
};

const applyShadow = (date: Date, el: HTMLElement, props: ShadowProps) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 0 - 00:00, 1 - 23:59
    const h = (hours + minutes / 60) / 24;
    const [hn, outOfConstraint] = constraintHour(h, props.fromHour / 24, props.toHour / 24);

    const dx = -props.distance * Math.sin(Math.PI * hn);
    const dy = -props.distance * Math.cos(Math.PI * hn);

    // el.style.setProperty("--shadow-dx", Math.floor(dx).toString() + "px");
    // el.style.setProperty("--shadow-dy", Math.floor(dy).toString() + "px");

    // el.style.setProperty("--shadow-blur", "0");
    // el.style.setProperty("--shadow-color", props.color);

    console.log(hn, dx, dy);

    if (outOfConstraint) {
        el.style.boxShadow = ``;
    } else {
        el.style.boxShadow = `${Math.floor(dx)}px ${Math.floor(dy)}px ${props.blurRadius}px ${props.color}`;
    }
    // : var(--shadow-dx) var(--shadow-dy) var(--shadow-blur) var(--shadow-color);

    // el.style.boxShadow = "";
};

const calculateShadows = (date: Date) => {
    const elements = document.getElementsByClassName(REAL_SHADOW_CLASS_NAME);

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;

        const phi: number = Number(el.getAttribute(dataPhiName) || defaultStringPhi);
        const fromHour: number = Number(el.getAttribute(dataFromHourName) || defaultStringFromHour);
        const toHour: number = Number(el.getAttribute(dataToHourName) || defaultStringToHour);
        const distance: number = Number(el.getAttribute(dataDistanceName) || defaultStringToHour);
        const color: string = el.getAttribute(dataColorName) || defaultStringColor;
        const blurRadius: number = Number(el.getAttribute(dataBlurRadius) || defaultStringBlurRadius);

        const props: ShadowProps = { phi, fromHour, toHour, distance, color, blurRadius };

        applyShadow(date, el, props);
        // const k = el.dataset.key;
    }
};

let hour: number = 0;

export const dayTicker = (intervalSeconds: number) => {
    setTimeout(() => {
        // const now = new Date();
        const now = new Date(`2021-03-17T${hour < 10 ? "0" + hour.toString() : hour.toString()}:00:00-05:00`);
        console.log(now);
        calculateShadows(now);
        dayTicker(intervalSeconds);
        hour++;
        if (hour === 24) {
            hour = 0;
        }
    }, intervalSeconds);
};
