import { Button } from "../ui/button";

interface BrushButtonProps {
  brushSize: string;
  //   setBrushSize: (size: number) => void;
}

function BrushButton({ brushSize }: BrushButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${brushSize} bg-gray-800 dark:bg-gray-300 rounded-full mx-auto cursor-pointer hover:bg-current`}
      //   onclick="setBrushSize(2)"
    ></Button>
  );
}

export default BrushButton;
