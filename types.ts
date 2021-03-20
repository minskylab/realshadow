export interface ShadowProps {
    phi: number;
    fromHour: number;
    toHour: number;
    distance: number;
    blurRadius: number;
    color: string;
    kind: ShadowKind;
}

export type ShadowKind = "text" | "box" | "both" | "drop";
