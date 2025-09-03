import { Button } from "../ui/button";

interface ColorButtonProps {
  bgColor: string;
  // setColor: (color: string) => void;
}

function ColorButton({ bgColor }: ColorButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`size-8 ${bgColor} rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer hover:${bgColor}`}
      //   onclick="selectColor('#000000')"
    ></Button>
  );
}

export default ColorButton;
