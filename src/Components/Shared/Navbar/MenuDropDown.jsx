import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth/useAuth";
import { FaUser } from "react-icons/fa";
import HostModal from "../../Dashboard/Modal/HostRequestModal";
import useRole from "../../../Hooks/useRole/useRole";
import { becomeHost } from "../../../Api/UsersApi";
import toast from "react-hot-toast";
const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalHandler = async () => {
    try {
      const data = await becomeHost(user?.email);
      console.log(data);
      if (data.modifiedCount > 0) {
        toast.success("Success!, Please wait for admin confirmation.");
      } else {
        toast.success("Please!, Wait for admin approval");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsModalOpen(false);
    }
  };
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        {/* Become A Host btn */}
        <div className="hidden md:block">
          {(!user || !role || role === "guest") && (
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!user}
              className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
            >
              Host your home
            </button>
          )}
        </div>
        {/* Dropdown btn */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 md:py-1 md:px-2 border-[1px] border-blue-800 hover:bg-blue-800 hover:text-white flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {/* Avatar */}
            {user ? (
              <>
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL}
                  alt="profile"
                  height="30"
                  width="30"
                />
              </>
            ) : (
              <>
                <FaUser />
              </>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 hover:bg-blue-800 hover:text-white hover:rounded-xl transition font-semibold"
                >
                  Dashboard
                </Link>

                <div
                  onClick={logOut}
                  className="px-4 py-3 hover:bg-blue-800 hover:text-white hover:rounded-xl transition font-semibold"
                >
                  Logout
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-blue-800 hover:text-white hover:rounded-xl transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-blue-800 hover:text-white hover:rounded-xl transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <HostModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      />
    </div>
  );
};

export default MenuDropdown;
