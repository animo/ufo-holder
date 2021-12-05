// Converts any string with special casing to a human friendly name
export const convertToHumanFriendlyName = (attribute: string) =>
  attribute
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/-|_| /g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

// Converts date to "Aug 21, 2021"
export const convertDate = (date: Date, months: Record<number, string>, days: Record<number, string>, short = true) => {
  const dayNum = `0${date.getDate()}`.slice(-2)
  const day = days[date.getDay()]
  const month = short ? months[date.getMonth()].substr(0, 3) : months[date.getMonth()]
  const year = date.getFullYear()
  return `${day}, ${dayNum} ${month} ${year}`
}

// Converts >= to "Greater than or equal to"
export const convertComparisonOperator = (operator: string, operators: Record<string, string>) => operators[operator]

/* eslint-disable no-bitwise */
// Converts a string to an HSL color
export const convertToHslColor = (str: string, s = '50%', l = '40%') => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const h = hash % 360
  return `hsl(${h},${s},${l})`
}
