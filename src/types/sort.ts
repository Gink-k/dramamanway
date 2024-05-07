export type Order = 'asc' | 'desc';
export type Sort<T = string> = { by: T; order: Order };
