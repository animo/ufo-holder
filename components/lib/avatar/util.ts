export const getInitials = (name: string) => {
  const parts = name.split(/[ -]/)
  let initials = parts.map((p) => p.charAt(0)).join('')

  if (initials.length > 2 && initials.search(/[A-Z]/) !== -1) {
    initials = initials.replace(/[a-z]+/g, '')
  }
  initials = initials.substr(0, 2).toUpperCase()
  return initials
}
