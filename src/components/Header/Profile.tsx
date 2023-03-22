import { Avatar, Box, Flex } from '@chakra-ui/react';

import TextView from '../TextView';

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
          {name && <TextView fontWeight="semibold">{name}</TextView>}
          {email && (
            <TextView color="gray.300" fontSize="small">
              {email}
            </TextView>
          )}
        </Box>
      )}
      <Avatar size="md" name={name ?? 'avatar'} src={avatarUrl} />
    </Flex>
  );
}
