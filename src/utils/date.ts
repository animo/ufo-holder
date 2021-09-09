// This is based on DD-MM-YYYY
export const formatToDDMMYYYY = (date: Date) => {
  const day = `0${date.getDate()}`.slice(-2)
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export const formatToDate = (date: Date, months: Record<number, string>, short = true) => {
  const day = `0${date.getDate()}`.slice(-2)
  const month = short ? months[date.getMonth()].substr(0, 3) : months[date.getMonth()]
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}
