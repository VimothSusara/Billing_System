import { NavLink, useLocation } from "react-router-dom";
import sideBarContent from "@/components/navigation/sideBarContent";

const findBreadCrumbPath = (items, currentPath, parents = []) => {
  for (const item of items) {
    if (item.link == currentPath) {
      return [...parents, { name: item.name, link: item.link }];
    }

    if (item.sub_items) {
      const found = findBreadCrumbPath(item.sub_items, currentPath, [
        ...parents,
        { name: item.name, link: item.link },
      ]);
      if (found) return found;
    }
  }
  return null;
};

const BreadCrumb = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const breadCrumbItems = findBreadCrumbPath(sideBarContent, currentPath) || [];

  return (
    <div className="flex items-center text-gray-500 text-sm">
      {breadCrumbItems.map((item, index) => (
        <div key={index}>
          {index !== 0 && <span className="mx-1">/</span>}
          <NavLink to={item.link}>{item.name}</NavLink>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
