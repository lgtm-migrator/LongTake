import { Loader as _Loader } from './loader';
import { Animate as _Animate } from './animate';
import { LongTake as _LongTake } from './longtake';
import { Sprite as _Sprite, TextSprite as _TextSprite, ImageSprite as _ImageSprite } from './sprite';
export declare type Sprite = _Sprite;
export declare type Loader = _Loader;
export declare type Animate = _Animate;
export declare type LongTake = _LongTake;
export declare type TextSprite = _TextSprite;
export declare type ImageSprite = _ImageSprite;
export declare const helper: {
    arc: number;
    rarc: number;
    ifEmpty<T>(data: T | undefined, def: T): T;
    sinByRad(deg: number): number;
    cosByRad(deg: number): number;
    getVector(deg: number, distance: number): {
        x: number;
        y: number;
    };
    randInt(min: number, max: number): number;
    getAngle(x: number, y: number, ax: number, ay: number): number;
    getRotationPosition(px: number, py: number, x: number, y: number, angle: number): {
        x: number;
        y: number;
    };
    getVisibility(): "xs" | "sm" | "md" | "lg" | "xl";
    getRandomColor(): string;
    twoPointDistance(x: number, y: number, x2: number, y2: number): number;
    imageResize(image: HTMLImageElement, scale: number): Promise<HTMLImageElement>;
};
export declare const renderPack: {
    insetShadow(sprite: _Sprite, options?: Partial<{
        blur: number;
        color: string;
        spread: number;
    }>): void;
    feather(sprite: _Sprite, options?: Partial<{
        radius: number;
        strength: number;
    }>): void;
    blur(sprite: _Sprite, options?: Partial<{
        radius: number;
    }>): void;
    colorTo: (sprite: _Sprite, options?: Partial<{
        color: string;
        alpha: number;
    }>) => void;
    fillRoundRect: (sprite: _Sprite, options?: Partial<{
        round: number;
        color: string;
    }>) => void;
};
export declare const Sprite: typeof _Sprite;
export declare const Loader: typeof _Loader;
export declare const Animate: typeof _Animate;
export declare const LongTake: typeof _LongTake;
export declare const TextSprite: typeof _TextSprite;
export declare const ImageSprite: typeof _ImageSprite;
export default LongTake;
