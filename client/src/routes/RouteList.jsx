import { lazy } from "react";

// Lazy-loaded components
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const OnlineOrders = lazy(() => import("@/pages/Online-Orders/OnlineOrders"));
const OnlineOrderItems = lazy(() =>
  import("@/pages/Online-Orders/OnlineOrderItems")
);
const PurchaseOrder = lazy(() =>
  import("@/pages/Purchase-Order/PurchaseOrder")
);
const PrintPurchaseOrder = lazy(() =>
  import("@/pages/Purchase-Order/PrintPurchaseOrder")
);
const Quotation = lazy(() => import("@/pages/Quotations/Quotation"));
const PrintQuotation = lazy(() => import("@/pages/Quotations/PrintQuotation"));
const PurchaseItems = lazy(() => import("@/pages/GRN/PurchaseItems"));
const SettleGRNs = lazy(() => import("@/pages/GRN/SettleGRNs"));
const GRNItems = lazy(() => import("@/pages/GRN/GRNItems"));
const GRNDetails = lazy(() => import("@/pages/GRN/GRNDetails"));
const AddEditItems = lazy(() => import("@/pages/Item-Stock/AddEditItems"));
const AddEditCategory = lazy(() =>
  import("@/pages/Item-Stock/AddEditCategory")
);
const ItemDetails = lazy(() => import("@/pages/Item-Stock/ItemDetails"));
const ItemTracking = lazy(() => import("@/pages/Item-Stock/ItemTracking"));

// Route configuration
const RouteList = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    isProtected: true, // Mark as protected route
  },
  {
    path: "/online-orders",
    element: <OnlineOrders />,
    isProtected: true,
  },
  {
    path: "/online-orders-items",
    element: <OnlineOrderItems />,
    isProtected: true,
  },
  {
    path: "/purchase-order",
    element: <PurchaseOrder />,
    isProtected: true,
  },
  {
    path: "/print-purchase-order",
    element: <PrintPurchaseOrder />,
    isProtected: true,
  },
  {
    path: "/quotation",
    element: <Quotation />,
    isProtected: true,
  },
  {
    path: "/print-quotation",
    element: <PrintQuotation />,
    isProtected: true,
  },
  {
    path: "/purchase-items",
    element: <PurchaseItems />,
    isProtected: true,
  },
  {
    path: "/settle-grn",
    element: <SettleGRNs />,
    isProtected: true,
  },
  {
    path: "/grn-items",
    element: <GRNItems />,
    isProtected: true,
  },
  {
    path: "/grn-details",
    element: <GRNDetails />,
    isProtected: true,
  },
  {
    path: "/add-edit-items",
    element: <AddEditItems />,
    isProtected: true,
  },
  {
    path: "/add-edit-category",
    element: <AddEditCategory />,
    isProtected: true,
  },
  {
    path: "/item-details",
    element: <ItemDetails />,
    isProtected: true,
  },
  {
    path: "/item-tracking",
    element: <ItemTracking />,
    isProtected: true,
  },
];

export default RouteList;
