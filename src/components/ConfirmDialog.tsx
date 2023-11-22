import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Flex,
} from "@radix-ui/themes";

interface ConfirmDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  actionButton: string;
  cancelButton: string;
  action: () => void;
  danger?: boolean;
}

function ConfirmDialog({
  children,
  title,
  description,
  actionButton,
  cancelButton,
  action,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <Flex
          gap="3"
          mt="6"
          justify={danger ? "between" : "start"}
          direction={danger ? "row-reverse" : "row"}
        >
          <AlertDialogAction>
            <Button
              variant={danger ? "outline" : "solid"}
              color={danger ? "ruby" : "violet"}
              onClick={action}
            >
              {actionButton}
            </Button>
          </AlertDialogAction>
          <AlertDialogCancel>
            <Button>{cancelButton}</Button>
          </AlertDialogCancel>
        </Flex>
      </AlertDialogContent>
    </AlertDialogRoot>
  );
}

export default ConfirmDialog;
