import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import sideBarContent from "@/components/navigation/sideBarContent";

const Sidebar = () => {
  const location = useLocation();

  const initialModuleStates = useMemo(() => {
    return sideBarContent.reduce((acc, item) => {
      if (item.title) acc[item.title] = false;
      return acc;
    }, {});
  }, sideBarContent);

  const pathToModule = useMemo(() => {
    const pathMap = {};
    sideBarContent.forEach((item) => {
      if (item.sub_items) {
        item.sub_items.forEach((sub_item) => {
          pathMap[sub_item.link] = item.title;
        });
      }
    });
    return pathMap;
  }, [sideBarContent]);

  const [moduleStates, setModuleStates] = useState(initialModuleStates);

  const getParentModule = (pathname) => {
    for (const [path, module] of Object.entries(pathToModule)) {
      if (pathname.startsWith(path)) return module;
    }
    return null;
  };

  const toggleDropdown = (moduleName) => {
    setModuleStates((prevState) => ({
      ...Object.fromEntries(Object.keys(prevState).map((key) => [key, false])),
      [moduleName]: !prevState[moduleName],
    }));
  };

  useEffect(() => {
    const parentModule = getParentModule(location.pathname);
    if (parentModule) {
      setModuleStates((prevState) => ({
        ...Object.fromEntries(
          Object.keys(prevState).map((key) => [key, false])
        ),
        [parentModule]: true,
      }));
    }
  }, [location]);

  const getNavLinkClass = (isActive) =>
    `flex items-center px-2 py-2 rounded-md text-gray-500 font-semibold hover:bg-gray-200 transition-all ease-in-out duration-300 ${
      isActive ? "bg-max-light-blue text-secondary-blue" : ""
    }`;

  const renderSidebar = useMemo(
    () =>
      sideBarContent.map((item) =>
        item.sub_items ? (
          <div key={item.id}>
            <button
              aria-expanded={moduleStates[item.title]}
              aria-controls={`submenu-${item.id}`}
              title={item.name}
              onClick={() => toggleDropdown(item.title)}
              className="flex items-center justify-between w-full px-2 py-2 rounded-md text-gray-500 hover:bg-gray-200 font-semibold transition-all ease-in-out duration-200 cursor-pointer"
            >
              <div className="flex items-center">
                {/* <MdHome className="h-5 w-5 mr-2" /> */}
                {item.icon}
                <span className="max-w-52 truncate">{item.name}</span>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform duration-200 ${
                  moduleStates[item.title] ? "rotate-180" : ""
                }`}
              />
            </button>

            {item.sub_items.map((sub_item) => (
              <div
                id={`submenu-${item.id}`}
                key={sub_item.id}
                title={sub_item.name}
                className={`overflow-hidden transition-all duration-300 ml-4 ease-in-out my-1 ${
                  moduleStates[item.title] ? "block" : "hidden"
                }`}
              >
                <NavLink
                  to={sub_item.link}
                  className={({ isActive }) => getNavLinkClass(isActive)}
                >
                  <span className="max-w-52 truncate">{sub_item.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
        ) : (
          <NavLink
            key={item.id}
            to={item.link}
            title={item.name}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            {/* <MdHome className="h-5 w-5 mr-2" /> */}
            {item.icon}
            <span className="max-w-52 truncate">{item.name}</span>
          </NavLink>
        )
      ),
    //can add getNavLinkClass as a dependency but may need to use it with useMemo instead
    [moduleStates]
  );

  return (
    <div className="flex flex-col w-72 min-h-screen">
      <nav className="flex-1 px-2 py-4 space-y-1.5">{renderSidebar}</nav>
    </div>
  );
};

export default Sidebar;
