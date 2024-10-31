import { Link } from "react-router-dom";
import { logo } from "../../../assets/images";

const AdminHeader = () => {
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img src={logo} className="w-full" alt="logo" />
        </Link>
      </div>
      <div className="flex items-center border border-black">
        <div className="flex items-center mr-4">
          <img
            src="https://lh3.googleusercontent.com/ogw/AF2bZyh9vvXzJaz8iwsryqHhDuO9nGk3hT9Jb4sshtAEwnz_fF0=s32-c-mo"
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
