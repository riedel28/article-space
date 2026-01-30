import { createTheme, DEFAULT_THEME, Select, TextInput, Chip, Modal } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 7 },
  fontFamily: `IBM Plex Sans, ${DEFAULT_THEME.fontFamily}`,
  defaultRadius: 'md',
  colors: {
    // Primary brand color - cyan/blue palette
    brand: [
      '#e5f3ff',
      '#cde2ff',
      '#9ac2ff',
      '#64a0ff',
      '#3884fe',
      '#1d72fe',
      '#0063ff',
      '#0058e4',
      '#004ecd',
      '#0043b5'
    ],
    // Success/save color - green palette
    success: [
      '#e6f9ed', // 0
      '#c8f1d8', // 1
      '#a3e9c0', // 2
      '#7ee0a8', // 3
      '#62de85', // 4
      '#4ad96f', // 5
      '#38c75e', // 6
      '#2ba84c', // 7
      '#1f8a3b', // 8
      '#146b2a' // 9
    ],
    // Error/cancel color - red palette
    error: [
      '#ffe5e5', // 0
      '#ffb3b3', // 1
      '#ff8080', // 2
      '#ff7777', // 3
      '#ff4d4d', // 4
      '#ff1a1a', // 5
      '#e60000', // 6
      '#d95757', // 7
      '#b30000', // 8
      '#800000' // 9
    ],
    // Neutral/hint color - gray palette
    hint: [
      '#f5f7f8', // 0
      '#e8eced', // 1
      '#d5dbdd', // 2
      '#c1cacd', // 3
      '#adbcc0', // 4
      '#99aab0', // 5
      '#8599a0', // 6
      '#74a2b2', // 7
      '#5a7c87', // 8
      '#3d5459' // 9
    ]
  },
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          label: {
            marginBottom: 4
          }
        }
      }
    }),
    Select: Select.extend({
      defaultProps: {
        styles: {
          label: {
            marginBottom: 4
          }
        }
      }
    }),
    Chip: Chip.extend({
      defaultProps: {
        styles: {
          checkIcon: {
            stroke: 1.8
          } as any
        }
      }
    }),
    Modal: Modal.extend({
      defaultProps: {
        styles: {
          header: {
            alignItems: 'flex-start'
          }
        }
      }
    })
  }
});
