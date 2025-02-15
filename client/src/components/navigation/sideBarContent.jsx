import { MdHome, MdShoppingBag, MdAddShoppingCart } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaScroll } from "react-icons/fa";
import { HiSquare3Stack3D } from "react-icons/hi2";

const sideBarContent = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: <MdHome className="h-5 w-5 mr-2" />,
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

export default sideBarContent;
