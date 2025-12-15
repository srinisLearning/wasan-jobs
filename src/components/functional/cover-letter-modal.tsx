import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CoverLetterModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: string;
}

function CoverLetterModal({
  open,
  setOpen,
  title,
  content,
}: CoverLetterModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-5">
          <p className="whitespace-pre-wrap text-sm">{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CoverLetterModal;