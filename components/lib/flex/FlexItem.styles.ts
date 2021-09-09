import { StyleSheet } from 'react-native'

const { base } = StyleSheet.create({
  base: {
    flexShrink: 1,
  },
})

const flexGrowVal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export type FlexGrowKey = `grow${FlexGrowVal}`
export type FlexGrowVal = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type FlexGrow = Record<FlexGrowKey | 'none', { flexGrow: FlexGrowVal }>

const grow = StyleSheet.create(
  flexGrowVal.reduce(
    (acc, val) => ({
      ...acc,
      [`grow${val}`]: {
        flexGrow: val,
      },
    }),
    {
      none: {
        flexGrow: 0,
      },
    }
  )
) as unknown as FlexGrow

export const styles = {
  base,
  grow,
}
