import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserBoxProps {
  imgFallBack: string;
  name: string;
  status: 0 | 1;
  profileColor: string;
}

function UserBox({ imgFallBack, name, profileColor, status }: UserBoxProps) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
      <Avatar
        className={`size-8 rounded-full flex items-center justify-center text-sm text-white font-medium`}
      >
        <AvatarImage src="" />
        <AvatarFallback className={`${profileColor}`}>{imgFallBack}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {name}
        </div>
        {!Boolean(status) ? (
          <div className="text-xs text-red-500 flex items-center">
            <div className="size-2 bg-red-500 rounded-full mr-1"></div>
            Offline
          </div>
        ) : (
          <div className="text-xs text-green-500 flex items-center">
            <div className="size-2 bg-green-500 rounded-full mr-1"></div>
            Online
          </div>
        )}
      </div>
    </div>
  );
}

export default UserBox;
