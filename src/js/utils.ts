export function fit(x: number, a0: number, b0: number, a1: number, b1: number): number {
	const t = (x - a0) / (b0 - a0)
	return a1 + (b1 - a1) * t
}

export function mod(n: number, m: number): number {
	return ((n % m) + m) % m
}

export function diff(a: number, b: number): number {
	return Math.abs(a - b)
}