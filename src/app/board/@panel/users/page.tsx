"use client";
import UserBox from "@/components/common/UserBox";
import { useUsers } from "@/server-stores/features/users/user.queries";

function Users() {
  const { data } = useUsers();

  console.log(data);

  return (
    <div className="flex-1 p-4 space-y-3">
      <UserBox
        imgFallBack="A"
        name="Alex Chen"
        profileColor="bg-blue-500"
        status={1}
      />
      <UserBox
        imgFallBack="S"
        name=" Sarah Wilson"
        profileColor="bg-green-500"
        status={0}
      />
      <UserBox
        imgFallBack="Y"
        name="You"
        profileColor="bg-purple-500"
        status={1}
      />
    </div>
  );
}

export default Users;
