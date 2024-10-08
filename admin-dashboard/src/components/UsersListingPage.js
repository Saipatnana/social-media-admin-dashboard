import React, { useContext, useState, useEffect } from "react";
import { users as initialUsers } from "../data/dummyData";
import KPIBox from "./KPIBox";
import Pagination from "./Pagination";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UsersListingPage = () => {
  const { setUsersCount } = useContext(AuthContext);
  const navgate = useNavigate()
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ username: "", name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    if (!isLogin) {
      navgate("/");
      console.log("sai");
    }
  } );
  
  useEffect(() => {
    setUsersCount(users.length);
  }, [users, setUsersCount]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalUsers = users.length;
  const activeUsers = 24; // Placeholder for users active in the last 24 hours

  const handleAddUser = () => {
    if (newUser.username !== "" && newUser.name !== "" && newUser.email !== "") {
      const userId = users.length + 1; // Example: increment user ID
      setUsers([...users, { user_id: userId, ...newUser }]);
      setNewUser({ username: "", name: "", email: "" }); // Reset form
      toast.success("New User Added");
      setUsersCount(users.length + 1); // Update count after adding a new user
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const handleBanUser = (userId) => {
    setUsers(users.filter((user) => user.user_id !== userId));
    setUsersCount(users.length - 1); // Update count after banning a user
  };

  const handleEditUser = (userId) => {
    const user = users.find((user) => user.user_id === userId);
    if (user) {
      setNewUser(user); // Set the selected user in the form to edit
      handleBanUser(userId); // Remove user temporarily while editing
    }
  };

  return (
    <div className="p-6 pl-3 w-[100%] md:w-full">
      <h2 className="text-2xl font-bold mb-4">Users Listing</h2>
      <div className="flex flex-col md:flex-row mb-2">
        <KPIBox title="Total Users" value={totalUsers} />
        <KPIBox title="Active in Last 24 Hours" value={activeUsers} />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          className="border rounded p-2 mr-2 mb-2"
        />
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="border rounded p-2 mr-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={handleAddUser}
          className="bg-green-500 text-white py-1 px-3 mt-2 rounded hover:bg-green-400"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">User ID</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.user_id} className="hover:bg-gray-100">
                <td className="p-2 border">{user.user_id}</td>
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.name}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border flex items-center justify-center">
                  <button
                    onClick={() => handleBanUser(user.user_id)}
                    className="bg-red-500 text-white py-1 px-3 mr-5 rounded hover:bg-red-400"
                  >
                    Ban
                  </button>
                  <button
                    onClick={() => handleEditUser(user.user_id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-400"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsPerPage={usersPerPage}
        totalItems={totalUsers}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default UsersListingPage;
