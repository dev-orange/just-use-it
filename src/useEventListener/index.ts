import { useEffect, useRef } from 'react';
import { getTargetElement } from '../utils/domTarget';
import { MaybeRef } from '../utils/types';

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any;
  removeEventListener(event: Events, fn?: any, options?: any): any;
}

export interface GeneralEventListener<E = Event> {
  (evt: E): void;
}

export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  eventName: E,
  listener: (ev: WindowEventMap[E]) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  eventName: E,
  listener: (ev: DocumentEventMap[E]) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<E extends keyof ElementEventMap>(
  target: Element,
  eventName: E,
  listener: (ev: ElementEventMap[E]) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<E extends keyof HTMLElementEventMap>(
  target: HTMLElementEventMap,
  eventName: E,
  listener: (ev: HTMLElementEventMap[E]) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): void;
export function useEventListener<EventType = Event>(
  target: MaybeRef<EventTarget>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): void;

export function useEventListener(target: any, eventName: any, listener: any, options: any) {
  const storedListener = useRef(listener);

  useEffect(() => {
    storedListener.current = listener;
  }, [listener]);

  useEffect(() => {
    const element = getTargetElement(target, window);

    if (!element || !element?.addEventListener) return;

    const eventListener = (event: any) => storedListener.current(event);

    element.addEventListener(eventName, eventListener, options);

    return () => {
      element.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, target, options]);
}
