import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const textStyle = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: any) => ({
      color: mode('text.dark', 'text.light')(props)
    })
  },
  defaultProps: {}
};

const buttonStyle = {
  baseStyle: {},
  sizes: {},
  variants: {
    primary: (props: any) => ({
      color: mode('text.light', 'icon')(props),
      bg: mode('primary.dark', 'secondary')(props)
    })
  },
  defaultProps: {}
};

export const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  // styles: {
  //   global: {
  //     body: {
  //       bg: 'gray.900',
  //       color: 'gray.50'
  //     }
  //   }
  // },
  fonts: {
    heading: 'Lato',
    body: 'Lato'
  },
  colors: {
    primary: {
      dark: '#003100',
      light: '#e6f6e6'
    },
    secondary: { '500': '#008ffb', '700': '#007bd7' },
    text: {
      dark: '#000',
      light: '#fff'
    },
    icon: '#ffd700',
    primaryColor: {
      '200': '#D53F8C',
      '500': '#D53F8C',
      '700': '#97266D'
    },
    brand: {
      50: '#44337A',
      100: '#B794F4',
      500: '#B794F4'
    },
    gray: {
      '50': '#EEEEF2',
      '100': '#D1D2DC',
      '200': '#B3B5C6',
      '300': '#9699B0',
      '400': '#797D9A',
      '500': '#616480',
      '600': '#4B4D63',
      '700': '#353646',
      '800': '#1F2029',
      '900': '#181B23'
    },
    components: {
      textStyle,
      buttonStyle
    }
  }
});
