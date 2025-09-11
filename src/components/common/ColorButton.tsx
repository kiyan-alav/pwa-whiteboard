import { useStrokeStore } from "@/local-stores/providers/stroke-store-provider";
import { Button } from "../ui/button";

interface ColorButtonProps {
  bgColor: string;
}

function ColorButton({ bgColor }: ColorButtonProps) {
  const setColor = useStrokeStore((s) => s.setColor);
  const color = useStrokeStore((s) => s.color);

  const isActive = color === bgColor;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`size-8 rounded-full border-2 cursor-pointer transition-all 
        ${
          isActive
            ? "border-primary ring-2 ring-primary dark:ring-primary dark:border-primary"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}
      style={{
        backgroundColor: bgColor,
      }}
      onClick={() => setColor(bgColor)}
    ></Button>
  );
}

export default ColorButton;
