import { REAL_SHADOW_CLASS_NAME } from "./consts";
import { ShadowProps } from "./types";
import {
    dataPhiName,
    dataFromHourName,
    dataToHourName,
    dataDistanceName,
    dataColorName,
    //
    defaultStringPhi,
    defaultStringFromHour,
    defaultStringToHour,
    defaultStringColor,
} from "./datanames";

const constraintHour = (hn: number, x0: number, x1: number): number => {
    if (hn < x0) {
        return x0;
    }

    if (hn > x1) {
        return x1;
    }

    return hn / (x1 - x0);
};

const applyShadow = (date: Date, el: HTMLElement, props: ShadowProps) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    let hn = (hours + minutes / 60) / 24;

    hn = constraintHour(hn, props.fromHour / 24, props.toHour / 24);

    const dx = -props.distance * Math.cos(Math.PI * hn);
    const dy = -props.distance * Math.sin(Math.PI * hn);

    el.style.setProperty("--shadow-dx", Math.floor(dx).toString() + "px");
    el.style.setProperty("--shadow-dy", Math.floor(dy).toString() + "px");

    el.style.setProperty("--shadow-blur", "0");
    el.style.setProperty("--shadow-color", props.color);

    console.log(dx, dy);

    // el.style.boxShadow = "";
};

const calculateShadows = (date: Date) => {
    const elements = document.getElementsByClassName(REAL_SHADOW_CLASS_NAME);

    // 0 - 00:00, 1 - 23:59

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;

        const phi: number = Number(el.getAttribute(dataPhiName) || defaultStringPhi);
        const fromHour: number = Number(el.getAttribute(dataFromHourName) || defaultStringFromHour);
        const toHour: number = Number(el.getAttribute(dataToHourName) || defaultStringToHour);
        const distance: number = Number(el.getAttribute(dataDistanceName) || defaultStringToHour);
        const color: string = el.getAttribute(dataColorName) || defaultStringColor;

        const props: ShadowProps = { phi, fromHour, toHour, distance, color };

        applyShadow(date, el, props);
        // const k = el.dataset.key;
    }
};

export const dayTicker = (intervalSeconds: number) => {
    setTimeout(() => {
        calculateShadows(new Date());
        dayTicker(intervalSeconds);
    }, intervalSeconds);
};
