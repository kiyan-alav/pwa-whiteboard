"use client";
import UserBox from "@/components/common/UserBox";
import { useUsers } from "@/server-stores/features/users/user.queries";

function Users() {
  const { data: users, isLoading } = useUsers();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex-1 p-4 space-y-3">
      {users &&
        users.map((user) => (
          <UserBox
            imgFallBack={`${user.firstName[0]}${user.lastName[0]}`}
            name={`${user.firstName || ""} ${user.lastName || ""}`}
            profileColor={user.profileColor}
            status={user.isOnline ? 1 : 0}
            key={user._id}
          />
        ))}
    </div>
  );
}

export default Users;
