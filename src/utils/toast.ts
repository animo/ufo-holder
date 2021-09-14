import type { IToastProps } from 'native-base'

import { Toast } from 'native-base'

export const toast = (props: IToastProps) => Toast.show(props) as void
