import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

interface CustomAlertDialogProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomAlertDialog({
  title = 'Confirmação',
  message,
  isOpen,
  onClose
}: CustomAlertDialogProps) {
  const cancelRef = useRef<HTMLDivElement>(null);

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent bg="gray.800">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>
          <AlertDialogBody>{message}</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="whiteAlpha" onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={onClose} ml={3}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
