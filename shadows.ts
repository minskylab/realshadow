import {
    defaultStringPhi,
    defaultStringFromHour,
    defaultStringToHour,
    defaultStringColor,
    defaultStringBlurRadius,
    defaultStringShadowKind,
} from "./constants";

import {
    dataPhiName,
    dataFromHourName,
    dataToHourName,
    dataDistanceName,
    dataColorName,
    dataBlurRadiusName,
    dataShadowKind,
    dataForcedHourName,
} from "./datanames";
import { ShadowKind, ShadowProps } from "./types";

const constraintHour = (hn: number, x0: number, x1: number): [number, boolean] => {
    if (hn < x0) {
        return [x0, true];
    }

    if (hn > x1) {
        return [x1, true];
    }

    return [hn / (x1 - x0), false];
};

const applyBaseStyle = (el: HTMLElement) => {
    el.style.transition = "box-shadow 1s, text-shadow 1s, filter 1s";
};

const applyShadows = (date: Date, el: HTMLElement, props: ShadowProps) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // 0 - 00:00, 1 - 23:59
    const h = (hours + minutes / 60) / 24;
    const [hn, outOfConstraint] = constraintHour(h, props.fromHour / 24, props.toHour / 24);

    const dx = -props.distance * Math.sin(Math.PI * hn) * 0.75;
    const dy = -props.distance * Math.cos(Math.PI * hn);

    if (outOfConstraint) {
        el.style.boxShadow = ``;
        el.style.textShadow = ``;
        return;
    }

    switch (props.kind) {
        case "box":
            el.style.boxShadow = `${dx}px ${dy}px ${props.blurRadius}px ${props.color}`;
            break;
        case "text":
            el.style.textShadow = `${dx}px ${dy}px ${props.blurRadius}px ${props.color}`;
            break;
        case "drop":
            el.style.filter = `drop-shadow(${dx}px ${dy}px ${props.blurRadius}px ${props.color})`;
            break;
        case "both":
            el.style.boxShadow = `${dx}px ${dy}px ${props.blurRadius}px ${props.color}`;
            el.style.textShadow = `${dx}px ${dy}px ${props.blurRadius}px ${props.color}`;
            break;
        default:
            break;
    }
};

const calculateShadows = (date: Date) => {
    // const elements = document.getElementsByClassName(REAL_SHADOW_CLASS_NAME);
    const elements = document.querySelectorAll("[data-rs-kind]");

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;

        const phi: number = Number(el.getAttribute(dataPhiName) || defaultStringPhi);
        const fromHour: number = Number(el.getAttribute(dataFromHourName) || defaultStringFromHour);
        const toHour: number = Number(el.getAttribute(dataToHourName) || defaultStringToHour);
        const distance: number = Number(el.getAttribute(dataDistanceName) || defaultStringToHour);
        const color: string = el.getAttribute(dataColorName) || defaultStringColor;
        const blurRadius: number = Number(el.getAttribute(dataBlurRadiusName) || defaultStringBlurRadius);

        // const forcedCurrentHour: number = Number(el.getAttribute(dataForcedHourName) || defaultStringBlurRadius);

        let kindString: string = el.getAttribute(dataShadowKind) || defaultStringShadowKind;

        if (kindString !== "box" && kindString !== "text" && kindString !== "both" && kindString !== "drop") {
            kindString = defaultStringShadowKind;
        }

        const kind: ShadowKind = kindString as ShadowKind;

        const props: ShadowProps = { phi, fromHour, toHour, distance, color, blurRadius, kind };

        const forcedHour = el.getAttribute(dataForcedHourName);

        let h: number, m: number;

        if (forcedHour && forcedHour !== "") {
            const parts = forcedHour.split(":");
            if (parts.length > 1) {
                h = Number(parts[0]);
                m = Number(parts[1]);
            } else {
                h = Number(parts[0]);
                m = 0;
            }
        }

        if (h >= 0 && h < 24 && m >= 0 && m < 60) {
            date.setHours(h, m);
        }

        applyBaseStyle(el);
        applyShadows(date, el, props);
        // const k = el.dataset.key;
    }
};

const updateTick = () => {
    const now = new Date();
    calculateShadows(now);
};

export const startTicker = (intervalSeconds: number) => {
    setInterval(updateTick, intervalSeconds);
};
