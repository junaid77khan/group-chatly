import { HomeIcon, BookOpenIcon, UserGroupIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold text-red-600 mb-6">TESLA</div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
            <HomeIcon className="h-6 w-6" />
            <span>Reports</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
            <BookOpenIcon className="h-6 w-6" />
            <span>Library</span>
          </li>
          <li className="flex items-center space-x-3 text-gray-700 hover:text-red-600">
            <UserGroupIcon className="h-6 w-6" />
            <span>Activities</span>
          </li>
        </ul>
      </div>
      <div className="text-gray-500">
        <p>Sam Wheeler</p>
        <p>samwheeler@gmail.com</p>
      </div>
    </div>
  );
};

export default Sidebar;
