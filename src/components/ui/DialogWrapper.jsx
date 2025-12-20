import { cn } from "@/lib/utils";
import {
  DialogContent,
  DialogHeader,
  Dialog as DialogRoot,
  DialogTitle,
} from "./Dialog";

/**
 * DialogWrapper - A convenient wrapper around Radix UI Dialog
 * that provides a simpler API with open/onClose/title/size props
 */
export function Dialog({
  open,
  onClose,
  title,
  size = "md",
  children,
  className,
}) {
  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    full: "sm:max-w-full",
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && onClose) {
          onClose();
        }
      }}
    >
      <DialogContent className={cn(sizeClasses[size], className)}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </DialogRoot>
  );
}

export default Dialog;
