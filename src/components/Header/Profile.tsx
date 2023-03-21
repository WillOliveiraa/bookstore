import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export function Profile({
  showProfileData = true,
  name,
  email,
  avatarUrl = 'https://github.com/WillOliveiraa.png'
}: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          {name && <Text>{name}</Text>}
          {email && (
            <Text color="gray.300" fontSize="small">
              {email}
            </Text>
          )}
        </Box>
      )}
      <Avatar size="md" name={name ?? 'avatar'} src={avatarUrl} />
    </Flex>
  );
}
