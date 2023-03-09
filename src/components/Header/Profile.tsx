import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Willian Oliveira</Text>
          <Text color="gray.300" fontSize="small">
            will@teste.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="Willian Oliveira" src="https://github.com/WillOliveiraa.png" />
    </Flex>
  );
}
