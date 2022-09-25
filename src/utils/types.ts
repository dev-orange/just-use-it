import {RefObject} from "react";

/**
 * Any function
 */
export type Fn = () => void

/**
 * Maybe it's a ref, or a plain value
 *
 * ```ts
 * type MaybeRef<T> = T | RefObject<T>
 * ```
 */
export type MaybeRef<T> = T | RefObject<T>