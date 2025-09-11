import { useSocket } from "@/hooks/useSocket";
import { useStrokeStore } from "@/local-stores/providers/stroke-store-provider";
import { BrushCleaning } from "lucide-react";
import { Button } from "../ui/button";
import BrushButton from "./BrushButton";
import ColorButton from "./ColorButton";

function LeftToolbar() {
  const setTool = useStrokeStore((s) => s.setTool);
  const tool = useStrokeStore((s) => s.tool);

  const socket = useSocket();

  const handleClearBoard = () => {
    socket?.emit("clear-board");
  };

  return (
    <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4 shadow-sm">
      {/* Drawing Tools */}
      <div className="space-y-2">
        <Button
          onClick={() => setTool("pen")}
          variant="default"
          size="icon"
          className={`size-10 rounded-lg flex items-center justify-center transition-colors
    ${
      tool === "pen"
        ? "bg-primary text-white dark:bg-primary dark:text-gray-900"
        : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </Button>
        <Button
          onClick={() => setTool("eraser")}
          variant="default"
          size="icon"
          className={`size-10 rounded-lg flex items-center justify-center transition-colors
    ${
      tool === "eraser"
        ? "bg-primary text-white dark:bg-primary dark:text-gray-900"
        : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2L3 9l4 4h6l4-4-7-7zM8.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button
          onClick={handleClearBoard}
          variant="default"
          size="icon"
          className="size-10 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        >
          <BrushCleaning />
        </Button>
      </div>

      {/* Color Picker */}
      <div className="flex flex-col items-center gap-2">
        <ColorButton bgColor="#000" />
        <ColorButton bgColor="#ef4444" />
        <ColorButton bgColor="#3b82f6" />
        <ColorButton bgColor="#22c55e" />
        <ColorButton bgColor="#eab308" />
        <ColorButton bgColor="#fff" />
      </div>

      {/* Brush Size */}
      <div className="flex flex-col items-center gap-2">
        <BrushButton brushSize="size-2" sizeValue={4} />
        <BrushButton brushSize="size-3" sizeValue={6} />
        <BrushButton brushSize="size-4" sizeValue={8} />
        <BrushButton brushSize="size-5" sizeValue={10} />
      </div>
    </div>
  );
}

export default LeftToolbar;
