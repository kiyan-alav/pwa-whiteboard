import { useStrokeStore } from "@/local-stores/providers/stroke-store-provider";
import { Button } from "../ui/button";

interface BrushButtonProps {
  brushSize: string;
  sizeValue: number;
}

function BrushButton({ brushSize, sizeValue }: BrushButtonProps) {
  const setSize = useStrokeStore((s) => s.setSize);
  const size = useStrokeStore((s) => s.size);

  const isActive = size === sizeValue;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`${brushSize} rounded-full mx-auto cursor-pointer transition-all 
        ${
          isActive
            ? "ring-2 ring-primary scale-110 bg-primary/80 dark:bg-primary/70"
            : "bg-gray-800 dark:bg-gray-300 hover:bg-gray-600 dark:hover:bg-gray-400 hover:scale-105"
        }`}
      onClick={() => setSize(sizeValue)}
    ></Button>
  );
}

export default BrushButton;
