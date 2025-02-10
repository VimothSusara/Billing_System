import { useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { ChevronDownIcon } from "@heroicons/react/24/outline";

import { MdHome, MdShoppingBag, MdAddShoppingCart } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaScroll } from "react-icons/fa";
import { HiSquare3Stack3D } from "react-icons/hi2";

const sideBarContent = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdHome className="h-5 w-5 mr-2"/>,
  },
  {
    id: 2,
    name: "Online Order Management",
    title: "orders",
    icon: <MdShoppingBag className="h-5 w-5 mr-2" />,
    sub_items: [
      {
        id: 1,
        name: "Online Orders",
        link: "/online-orders",
      },
      {
        id: 2,
        name: "Order Items",
        link: "/online-orders-items",
      },
    ],
  },
  {
    id: 3,
    name: "Purchase Order Management",
    title: "purchaseOrders",
    icon: <BiSolidPurchaseTag className="h-5 w-5 mr-2" />,
    sub_items: [
      {
        id: 1,
        name: "Generate Purchase Order",
        link: "/purchase-order",
      },
      {
        id: 2,
        name: "Print Purchase Order",
        link: "/print-purchase-order",
      },
    ],
  },
  {
    id: 4,
    name: "Quotation Management",
    title: "quotations",
    icon: <FaScroll className="h-5 w-5 mr-2" />,
    sub_items: [
      {
        id: 1,
        name: "Generate Quotation",
        link: "/quotation",
      },
      {
        id: 2,
        name: "Print Quotation",
        link: "/print-quotation",
      },
    ],
  },
  {
    id: 5,
    name: "GRN Management",
    title: "grn",
    icon: <MdAddShoppingCart className="h-5 w-5 mr-2" />,
    sub_items: [
      {
        id: 1,
        name: "Purchase Items",
        link: "/purchase-items",
      },
      {
        id: 2,
        name: "Settle GRNs",
        link: "/settle-grn",
      },
      {
        id: 3,
        name: "GRN Items",
        link: "/grn-items",
      },
      {
        id: 4,
        name: "GRN Details",
        link: "/grn-details",
      },
    ],
  },
  {
    id: 6,
    name: "Item & Stock Management",
    title: "items",
    icon: <HiSquare3Stack3D className="h-5 w-5 mr-2" />,
    sub_items: [
      {
        id: 1,
        name: "Add & Edit Items",
        link: "/add-edit-items",
      },
      {
        id: 2,
        name: "Add & Edit Category",
        link: "/add-edit-category",
      },
      {
        id: 3,
        name: "Item Details",
        link: "/item-details",
      },
      {
        id: 4,
        name: "Item Tracking",
        link: "/item-tracking",
      },
    ],
  },
];

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
  }, [location, pathToModule]);

  const getNavLinkClass = (isActive) =>
    `flex items-center px-2 py-2 rounded-md text-secondary-blue font-semibold hover:bg-secondary-blue hover:text-white transition-all ease-in-out duration-300 ${
      isActive ? "bg-secondary-blue text-white" : ""
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
              className="flex items-center justify-between w-full px-2 py-2 rounded-md text-secondary-blue font-semibold hover:bg-secondary-blue hover:text-white transition-all ease-in-out duration-200 cursor-pointer"
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
                className={`overflow-hidden transition-all duration-300 ease-in-out my-1 ${
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
