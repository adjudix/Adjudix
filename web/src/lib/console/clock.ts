// The current time, for server-rendered console screens. Kept out of the
// component bodies, which React expects to be pure.
export const now = () => Date.now();
export const daysAgo = (days: number) => new Date(now() - days * 86_400_000);
