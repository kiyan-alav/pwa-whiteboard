import { Button } from "../ui/button";
import BrushButton from "./BrushButton";
import ColorButton from "./ColorButton";

function LeftToolbar() {
  return (
    <div className="w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center py-4 space-y-4 shadow-sm">
      {/* Drawing Tools */}
      <div className="space-y-2">
        <Button
          variant="default"
          size="icon"
          className="size-10 rounded-lg bg-primary text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </Button>
        <Button
          variant="default"
          size="icon"
          className="size-10 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2L3 9l4 4h6l4-4-7-7zM8.5 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>

      {/* Color Picker */}
      <div className="flex flex-col items-center gap-2">
        <ColorButton bgColor="bg-black" />
        <ColorButton bgColor="bg-red-500" />
        <ColorButton bgColor="bg-blue-500" />
        <ColorButton bgColor="bg-green-500" />
        <ColorButton bgColor="bg-yellow-500" />
        <ColorButton bgColor="bg-white" />
      </div>

      {/* Brush Size */}
      <div className="flex flex-col items-center gap-2">
        <BrushButton brushSize="size-2" />
        <BrushButton brushSize="size-3" />
        <BrushButton brushSize="size-4" />
        <BrushButton brushSize="size-5" />
      </div>

      {/* Undo/Redo */}
      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="default"
          size="icon"
          className="size-10 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300 cursor-pointer"
          //   onclick="undo()"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
        <Button
          variant="default"
          size="icon"
          className="size-10 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors text-gray-700 dark:text-gray-300 cursor-pointer"
          //   onclick="redo()"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}

export default LeftToolbar;
