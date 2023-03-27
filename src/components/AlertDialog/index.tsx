import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useColorMode
} from '@chakra-ui/react';

interface CustomAlertDialogProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  isConfirmation?: boolean;
}

export default function CustomAlertDialog({
  title = 'Confirmação',
  message,
  isOpen,
  onClose,
  isConfirmation = true
}: CustomAlertDialogProps) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const cancelRef = useRef<HTMLDivElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent bg={isDark ? 'gray.800' : 'gray.50'}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody fontWeight="semibold">{message}</AlertDialogBody>
          {isConfirmation ? (
            <AlertDialogFooter>
              <Button bgColor={isDark ? 'gray.600' : 'gray.100'} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                bgColor="red.500"
                color="white"
                _hover={{ bgColor: 'red.600' }}
                onClick={onClose}
                ml={3}
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          ) : (
            <AlertDialogFooter>
              <Button bgColor={isDark ? 'gray.600' : 'gray.100'} onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          )}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
