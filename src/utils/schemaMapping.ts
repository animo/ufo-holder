import { convertToHumanFriendlyName } from './attribute'

/**
 * This function maps display names to their remapped value.
 * @param uglyName the ugly name you want to beautify
 * @returns Beautified name or the original ugly name
 */
export const schemaToFriendlyName = (uglyName: string) => convertToHumanFriendlyName(uglyName)
