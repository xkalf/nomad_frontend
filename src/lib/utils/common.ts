export function throttleAlpha(cb: (...args: unknown[]) => Promise<void> | void, delay = 1000) {
	let shouldWait = false
	let waitingArgs: unknown[] | null = null

	const timeOutFunc = () => {
		if (waitingArgs === null) {
			shouldWait = false
		} else {
			cb(...waitingArgs)
			waitingArgs = null
			setTimeout(timeOutFunc, delay)
		}
	}

	return (...args: unknown[]) => {
		if (shouldWait) {
			waitingArgs = args
			return
		}

		cb(...args)
		shouldWait = true

		setTimeout(timeOutFunc, delay)
	}
}

type ThrottleFunc<T extends (...args: unknown[]) => unknown> = (func: T, delay: number) => T

export const throttleBeta: ThrottleFunc<any> = (cb, delay = 1000) => {
	let shouldWait = false
	let waitingArgs: unknown[] | null = null

	const timeOutFunc = () => {
		if (waitingArgs === null) {
			shouldWait = false
		} else {
			cb(...waitingArgs)
			waitingArgs = null
			setTimeout(timeOutFunc, delay)
		}
	}

	return (...args: unknown[]) => {
		if (shouldWait) {
			waitingArgs = args
			return
		}

		cb(...args)
		shouldWait = true

		setTimeout(timeOutFunc, delay)
	}
}
