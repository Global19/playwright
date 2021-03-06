/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Protocol } from './protocol';
import { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';
import { Readable } from 'stream';
import { Serializable, EvaluationArgument, PageFunction, PageFunctionOn, SmartHandle, ElementHandleForTag, BindingSource } from './structs';

type PageWaitForSelectorOptionsNotHidden = PageWaitForSelectorOptions & {
  state: 'visible'|'attached';
};
type ElementHandleWaitForSelectorOptionsNotHidden = ElementHandleWaitForSelectorOptions & {
  state: 'visible'|'attached';
};

export interface Page {
  evaluate<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<R>;
  evaluate<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<R>;

  evaluateHandle<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<SmartHandle<R>>;
  evaluateHandle<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<SmartHandle<R>>;

  $<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K> | null>;
  $(selector: string): Promise<ElementHandle<SVGElement | HTMLElement> | null>;

  $$<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K>[]>;
  $$(selector: string): Promise<ElementHandle<SVGElement | HTMLElement>[]>;

  $eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], Arg, R>, arg: Arg): Promise<R>;
  $eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, Arg, R>, arg: Arg): Promise<R>;
  $eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], void, R>, arg?: any): Promise<R>;
  $eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, void, R>, arg?: any): Promise<R>;

  $$eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], Arg, R>, arg: Arg): Promise<R>;
  $$eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], Arg, R>, arg: Arg): Promise<R>;
  $$eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], void, R>, arg?: any): Promise<R>;
  $$eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], void, R>, arg?: any): Promise<R>;

  waitForFunction<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg, options?: PageWaitForFunctionOptions): Promise<SmartHandle<R>>;
  waitForFunction<R>(pageFunction: PageFunction<void, R>, arg?: any, options?: PageWaitForFunctionOptions): Promise<SmartHandle<R>>;

  waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options?: PageWaitForSelectorOptionsNotHidden): Promise<ElementHandleForTag<K>>;
  waitForSelector(selector: string, options?: PageWaitForSelectorOptionsNotHidden): Promise<ElementHandle<SVGElement | HTMLElement>>;
  waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options: PageWaitForSelectorOptions): Promise<ElementHandleForTag<K> | null>;
  waitForSelector(selector: string, options: PageWaitForSelectorOptions): Promise<null|ElementHandle<SVGElement | HTMLElement>>;

  exposeBinding(name: string, playwrightBinding: (source: BindingSource, arg: JSHandle) => any, options: { handle: true }): Promise<void>;
  exposeBinding(name: string, playwrightBinding: (source: BindingSource, ...args: any[]) => any, options?: { handle?: boolean }): Promise<void>;
}

export interface Frame {
  evaluate<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<R>;
  evaluate<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<R>;

  evaluateHandle<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<SmartHandle<R>>;
  evaluateHandle<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<SmartHandle<R>>;

  $<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K> | null>;
  $(selector: string): Promise<ElementHandle<SVGElement | HTMLElement> | null>;

  $$<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K>[]>;
  $$(selector: string): Promise<ElementHandle<SVGElement | HTMLElement>[]>;

  $eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], Arg, R>, arg: Arg): Promise<R>;
  $eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, Arg, R>, arg: Arg): Promise<R>;
  $eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], void, R>, arg?: any): Promise<R>;
  $eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, void, R>, arg?: any): Promise<R>;

  $$eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], Arg, R>, arg: Arg): Promise<R>;
  $$eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], Arg, R>, arg: Arg): Promise<R>;
  $$eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], void, R>, arg?: any): Promise<R>;
  $$eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], void, R>, arg?: any): Promise<R>;

  waitForFunction<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg, options?: PageWaitForFunctionOptions): Promise<SmartHandle<R>>;
  waitForFunction<R>(pageFunction: PageFunction<void, R>, arg?: any, options?: PageWaitForFunctionOptions): Promise<SmartHandle<R>>;

  waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options?: PageWaitForSelectorOptionsNotHidden): Promise<ElementHandleForTag<K>>;
  waitForSelector(selector: string, options?: PageWaitForSelectorOptionsNotHidden): Promise<ElementHandle<SVGElement | HTMLElement>>;
  waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options: PageWaitForSelectorOptions): Promise<ElementHandleForTag<K> | null>;
  waitForSelector(selector: string, options: PageWaitForSelectorOptions): Promise<null|ElementHandle<SVGElement | HTMLElement>>;
}

export interface BrowserContext {
  exposeBinding(name: string, playwrightBinding: (source: BindingSource, arg: JSHandle) => any, options: { handle: true }): Promise<void>;
  exposeBinding(name: string, playwrightBinding: (source: BindingSource, ...args: any[]) => any, options?: { handle?: boolean }): Promise<void>;
}

export interface Worker {
  evaluate<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<R>;
  evaluate<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<R>;

  evaluateHandle<R, Arg>(pageFunction: PageFunction<Arg, R>, arg: Arg): Promise<SmartHandle<R>>;
  evaluateHandle<R>(pageFunction: PageFunction<void, R>, arg?: any): Promise<SmartHandle<R>>;
}

export interface JSHandle<T = any> {
  evaluate<R, Arg, O extends T = T>(pageFunction: PageFunctionOn<O, Arg, R>, arg: Arg): Promise<R>;
  evaluate<R, O extends T = T>(pageFunction: PageFunctionOn<O, void, R>, arg?: any): Promise<R>;

  evaluateHandle<R, Arg, O extends T = T>(pageFunction: PageFunctionOn<O, Arg, R>, arg: Arg): Promise<SmartHandle<R>>;
  evaluateHandle<R, O extends T = T>(pageFunction: PageFunctionOn<O, void, R>, arg?: any): Promise<SmartHandle<R>>;

  jsonValue(): Promise<T>;
  asElement(): T extends Node ? ElementHandle<T> : null;
}

export interface ElementHandle<T=Node> extends JSHandle<T> {
  $<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K> | null>;
  $(selector: string): Promise<ElementHandle<SVGElement | HTMLElement> | null>;

  $$<K extends keyof HTMLElementTagNameMap>(selector: K): Promise<ElementHandleForTag<K>[]>;
  $$(selector: string): Promise<ElementHandle<SVGElement | HTMLElement>[]>;

  $eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], Arg, R>, arg: Arg): Promise<R>;
  $eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, Arg, R>, arg: Arg): Promise<R>;
  $eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K], void, R>, arg?: any): Promise<R>;
  $eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E, void, R>, arg?: any): Promise<R>;

  $$eval<K extends keyof HTMLElementTagNameMap, R, Arg>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], Arg, R>, arg: Arg): Promise<R>;
  $$eval<R, Arg, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], Arg, R>, arg: Arg): Promise<R>;
  $$eval<K extends keyof HTMLElementTagNameMap, R>(selector: K, pageFunction: PageFunctionOn<HTMLElementTagNameMap[K][], void, R>, arg?: any): Promise<R>;
  $$eval<R, E extends SVGElement | HTMLElement = SVGElement | HTMLElement>(selector: string, pageFunction: PageFunctionOn<E[], void, R>, arg?: any): Promise<R>;

  waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options?: ElementHandleWaitForSelectorOptionsNotHidden): Promise<ElementHandleForTag<K>>;
  waitForSelector(selector: string, options?: ElementHandleWaitForSelectorOptionsNotHidden): Promise<ElementHandle<SVGElement | HTMLElement>>;
  waitForSelector<K extends keyof HTMLElementTagNameMap>(selector: K, options: ElementHandleWaitForSelectorOptions): Promise<ElementHandleForTag<K> | null>;
  waitForSelector(selector: string, options: ElementHandleWaitForSelectorOptions): Promise<null|ElementHandle<SVGElement | HTMLElement>>;
}

export interface BrowserType<Browser> {

}

export interface ChromiumBrowser extends Browser {
  contexts(): Array<ChromiumBrowserContext>;
  newContext(options?: BrowserContextOptions): Promise<ChromiumBrowserContext>;
}

export interface CDPSession {
  on: <T extends keyof Protocol.Events | symbol>(event: T, listener: (payload: T extends symbol ? any : Protocol.Events[T extends keyof Protocol.Events ? T : never]) => void) => this;
  addListener: <T extends keyof Protocol.Events | symbol>(event: T, listener: (payload: T extends symbol ? any : Protocol.Events[T extends keyof Protocol.Events ? T : never]) => void) => this;
  off: <T extends keyof Protocol.Events | symbol>(event: T, listener: (payload: T extends symbol ? any : Protocol.Events[T extends keyof Protocol.Events ? T : never]) => void) => this;
  removeListener: <T extends keyof Protocol.Events | symbol>(event: T, listener: (payload: T extends symbol ? any : Protocol.Events[T extends keyof Protocol.Events ? T : never]) => void) => this;
  once: <T extends keyof Protocol.Events | symbol>(event: T, listener: (payload: T extends symbol ? any : Protocol.Events[T extends keyof Protocol.Events ? T : never]) => void) => this;
  send<T extends keyof Protocol.CommandParameters>(
    method: T,
    params?: Protocol.CommandParameters[T]
  ): Promise<Protocol.CommandReturnValues[T]>;
}

type DeviceDescriptor = {
  viewport: ViewportSize;
  userAgent: string;
  deviceScaleFactor: number;
  isMobile: boolean;
  hasTouch: boolean;
  defaultBrowserType: 'chromium' | 'firefox' | 'webkit';
};

export namespace errors {

class TimeoutError extends Error {}

}

export interface Accessibility {
  snapshot(options?: {
    /**
     * Prune uninteresting nodes from the tree. Defaults to `true`.
     */
    interestingOnly?: boolean;

    /**
     * The root DOM element for the snapshot. Defaults to the whole page.
     */
    root?: ElementHandle;
  }): Promise<null|AccessibilityNode>;
}

type AccessibilityNode = {
  role: string;
  name: string;
  value?: string|number;
  description?: string;
  keyshortcuts?: string;
  roledescription?: string;
  valuetext?: string;
  disabled?: boolean;
  expanded?: boolean;
  focused?: boolean;
  modal?: boolean;
  multiline?: boolean;
  multiselectable?: boolean;
  readonly?: boolean;
  required?: boolean;
  selected?: boolean;
  checked?: boolean|"mixed";
  pressed?: boolean|"mixed";
  level?: number;
  valuemin?: number;
  valuemax?: number;
  autocomplete?: string;
  haspopup?: string;
  invalid?: string;
  orientation?: string;
  children?: AccessibilityNode[];
}

export const selectors: Selectors;
export const devices: Devices & DeviceDescriptor[];

export interface ElectronApplication {
  evaluate<R, Arg>(pageFunction: PageFunctionOn<typeof import('electron'), Arg, R>, arg: Arg): Promise<R>;
  evaluate<R>(pageFunction: PageFunctionOn<typeof import('electron'), void, R>, arg?: any): Promise<R>;

  evaluateHandle<R, Arg>(pageFunction: PageFunctionOn<typeof import('electron'), Arg, R>, arg: Arg): Promise<SmartHandle<R>>;
  evaluateHandle<R>(pageFunction: PageFunctionOn<typeof import('electron'), void, R>, arg?: any): Promise<SmartHandle<R>>;
}

// This is required to not export everything by default. See https://github.com/Microsoft/TypeScript/issues/19545#issuecomment-340490459
export {};
