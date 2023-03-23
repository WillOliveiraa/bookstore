import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

import {
  Box,
  Button,
  Icon,
  SimpleGrid,
  Text,
  theme,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';

import LayoutPage from '../components/LayoutPage';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2023-03-08T00:00:00.000Z',
      '2023-03-09T00:00:00.000Z',
      '2023-03-10T00:00:00.000Z',
      '2023-03-11T00:00:00.000Z',
      '2023-03-12T00:00:00.000Z',
      '2023-03-13T00:00:00.000Z',
      '2023-03-14T00:00:00.000Z'
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
};

const series = [{ name: 'series1', data: [31, 120, 10, 28, 61, 18, 109] }];

export default function Dashboard() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('primary.light', 'primary.dark');
  const isDark = colorMode === 'dark';

  function CustomChart(title: string) {
    return (
      <Box p={['6', '8']} bg={isDark ? 'gray.800' : 'gray.50'} borderRadius={8} pb="4">
        <Text fontSize="lg" mb="4" fontWeight="semibold">
          {title}
        </Text>
        <Chart type="area" height={160} options={options} series={series} />
      </Box>
    );
  }

  return (
    <LayoutPage>
      <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start">
        {CustomChart('Inscritos da semana')}
        {CustomChart('Taxa de Abertura')}
        <Box>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? (
              <Icon as={RiSunLine} />
            ) : (
              <Icon as={RiMoonFill} color="icon" />
            )}
          </Button>
          <Box
            bg={bg}
            w="100%"
            p={4}
            display="flex"
            mt="4"
            alignItems="center"
            cursor="pointer"
            borderLeft="6px solid"
            borderColor="secondary"
            borderRadius="5px"
            boxShadow="dark-lg"
          >
            <Text variant="primary" fontSize="24px" fontWeight="bold" mr="1.5rem">
              Chakra-UI Color mode in Next.Js
            </Text>
            <Button variant="primary">😀 open</Button>
          </Box>
        </Box>
      </SimpleGrid>
    </LayoutPage>
  );
}
