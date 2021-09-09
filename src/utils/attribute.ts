export const convertToHumanFriendlyName = (attribute: string) =>
  attribute
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/-|_| /g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
