import { Platform } from 'react-native';

const A11y = {
  label: (text) => Platform.select({
    web: { 'aria-label': text },
    default: { accessibilityLabel: text }
  }),

  role: (type) => Platform.select({
    web: { role: type },
    default: { accessibilityRole: type }
  }),

}

export default A11y
