export default {
  required(value) {
    if (value === undefined || value === null) return false
    let stringValue = '' + value
    return stringValue.length > 0
  },
  minLength(value, parameter) {
    if (typeof value !== 'string') return false
    return value.length >= parameter
  },
  isNumber(value) {
    return typeof value === 'number' && !isNaN(value)
  },
  greaterThen(value, parameter) {
    if (typeof value !== 'number' || isNaN(value)) return false
    return value > parameter
  }
}