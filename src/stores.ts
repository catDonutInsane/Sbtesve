import { writable } from 'svelte/store';
import type { RateType,ResultType } from './types';
export const input1 = writable<string>('');
export const input2 = writable<string>('');
export const rate1 = writable<RateType>('RUB');
export const rate2 = writable<RateType>('RUB');
export const data = writable<ResultType>({ "rates": {}});
export const data2 = writable<ResultType>({ "rates": {}});