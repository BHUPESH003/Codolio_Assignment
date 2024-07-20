import { atom } from 'jotai';

export type Theme = 'light' | 'dark';

export const themeAtom = atom<Theme>('light');

export const transactionAtom = atom<any[]>([]);
