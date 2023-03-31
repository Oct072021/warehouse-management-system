/**
 * time stamp + setTimeOut
 *
 * @param {Function} fn
 * @param {Number} delay
 *
 * @returns {Function}
 */
export function throttle(fn, delay) {
  let timer = null
  let startTime = Date.now()
  return function() {
    const currentTime = Date.now()
    const remaining = delay - (currentTime - startTime)
    const _this = this
    const args = arguments
    clearTimeout(timer)
    if (remaining <= 0) {
      // first click must work
      fn.apply(_this, args)
      startTime = Date.now()
    } else {
      // last click must work
      timer = setTimeout(() => fn.apply(_this, args), remaining)
    }
  }
}
/**
 * setTimeOut
 *
 * @param {Function} fn
 * @param {Number} delay
 *
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timeout = null
  return function() {
    const _this = this
    const args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(_this, args), delay)
  }
}
