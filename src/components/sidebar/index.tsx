import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  sideOpen: boolean;
  setSideOpen: (sideOpen: boolean) => void;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  sideOpen,
  setSideOpen,
  toggleSidebar,
}) => {
  /**
   * Sidebar
   */

  const router = useRouter();
  const pathname = usePathname();
  const [isOpenTrade, setIsOpenTrade] = useState(false);
  const [adminInfo, setAdminInfo] = useState<any | null>(null);

  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const accessPermissions = decodedToken?.permissions;

  const enabledViewUser =
    accessPermissions?.length && accessPermissions.includes("READ_ADMIN");
  const enabledViewRole =
    accessPermissions?.length && accessPermissions.includes("READ_ROLE");

  //@ts-ignore
  const enabledViewAttribute =
    accessPermissions?.length && accessPermissions.includes("READ_ATTRIBUTE");
  //@ts-ignore
  const enabledViewCategory =
    accessPermissions?.length && accessPermissions.includes("READ_CATEGORY");
  // @ts-ignore
  const enabledViewComponentCategory =
    accessPermissions?.length &&
    accessPermissions.includes("READ_COMPONENT_CATEGORY");

  const showUserManagement = enabledViewUser || enabledViewRole;

  const showProduct =
    enabledViewAttribute || enabledViewCategory || enabledViewComponentCategory;

  // @ts-ignore
  const superAdmin = accessPermissions?.length > 15;

  const toggleDropdown = () => {
    setIsOpenTrade(!isOpenTrade);
  };

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  };

  useEffect(() => {
    if (decodedToken) {
      setAdminInfo(decodedToken);
    }
  }, [decodedToken]);

  return (
    <div
      className={`text-default bg-white  flex flex-col h-full pb-5 transition-all duration-300 ${
        sideOpen ? "w-72" : "w-20"
      }`}
      style={
        sideOpen
          ? {
              flex: "0 0 auto",
              width: "280px",
              height: "100%",
            }
          : {}
      }
    >
      <div className="flex-grow">
        <div
          className={` p-6 flex  ${
            sideOpen ? "justify-end" : "justify-center"
          }  `}
        >
          <button type="button" onClick={toggleSidebar}>
            <Image
              src={
                sideOpen
                  ? "/icons/chevron-left-double.svg"
                  : "/icons/chevron-right-double.svg"
              }
              alt="Toggle Sidebar"
              width={23}
              height={23}
            />
          </button>
        </div>
        {sideOpen && (
          <div className="p-6 w-full">
            <Image src="/icons/Logo.svg" alt="Logo" width={148} height={30} />
          </div>
        )}
        <div className="w-full">
          <nav className="mt-4">
            <ul className="space-y-2 px-2 items-center">
              {/* Dashboard */}
              {superAdmin && (
                <>
                  {sideOpen ? (
                    <Link
                      href={"/management"}
                      className={`link ${
                        pathname === "/dashboard" ? "active" : ""
                      }`}
                    >
                      <li
                        className={`flex items-center px-3 py-2 gap-3 font-normal hover:bg-hover-sidebar text-sm rounded-sm 
                          ${
                            pathname === "/dashboard" ? "bg-hover-sidebar" : ""
                          } 
                          ${sideOpen ? " cursor-pointer " : "justify-center"} `}
                      >
                        <Image
                          src="/icons/userManagement/home-line.svg"
                          alt="Home-Line"
                          width={24}
                          height={24}
                        />
                        {sideOpen && <span>Dashboard</span>}
                        {pathname === "/dashboard" && (
                          <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                            {" "}
                          </span>
                        )}
                      </li>
                    </Link>
                  ) : (
                    <li className="flex items-center px-3 py-2 gap-3 font-normal hover:bg-hover-sidebar text-sm rounded-sm justify-center">
                      <Image
                        src="/icons/userManagement/home-line.svg"
                        alt="Home-Line"
                        width={24}
                        height={24}
                      />
                    </li>
                  )}
                </>
              )}

              <div className="pt-1" />
              {/* Orders */}

              {superAdmin && (
                <>
                  {sideOpen ? (
                    <Link
                      href={"/management"}
                      className={`link ${
                        pathname === "/orders" ? "active" : ""
                      }`}
                    >
                      <li
                        className={`flex items-center px-3 py-2 hover:bg-hover-sidebar font-normal text-sm rounded-sm 
                          ${pathname === "/orders" ? "bg-hover-sidebar" : ""} 
                          ${
                            sideOpen
                              ? "gap-3  cursor-pointer"
                              : "justify-center"
                          } 
                          `}
                      >
                        <Image
                          src="/icons/userManagement/bar-chart-square.svg"
                          alt="Bar-Chart-Square"
                          width={24}
                          height={24}
                        />
                        {sideOpen && <span className="">Orders</span>}
                        {sideOpen && <div className="ml-auto" />}
                      </li>
                    </Link>
                  ) : (
                    <li className="flex items-center px-3 py-2 hover:bg-hover-sidebar font-normal text-sm rounded-sm justify-center ">
                      <Image
                        src="/icons/userManagement/bar-chart-square.svg"
                        alt="Bar-Chart-Square"
                        width={24}
                        height={24}
                      />
                    </li>
                  )}
                </>
              )}

              <div className="pt-1" />
              {/* Products */}
              {showProduct && (
                <>
                  {sideOpen ? (
                    <li>
                      <div
                        className={`px-3 py-2 flex flex-row items-center hover:bg-hover-sidebar cursor-pointer
                      ${sideOpen ? "justify-between  " : "justify-center"} `}
                        aria-controls="dropdown-trading"
                        onClick={toggleDropdown}
                      >
                        <div className="flex flex-row gap-3">
                          <Image
                            src="/icons/userManagement/layers-three.svg"
                            alt="Layers_three"
                            width={24}
                            height={24}
                          />
                          {sideOpen && (
                            <span className="font-normal text-sm">
                              Product Management
                            </span>
                          )}
                        </div>
                        {sideOpen && (
                          <>
                            {!isOpenTrade ? (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M13.334 6.0406L8.14715 11.2274L2.96027 6.0406L3.66737 5.33349L8.14715 9.81322L12.6269 5.3335L13.334 6.0406Z"
                                  fill="#2B2A28"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M2.66602 10.6264L7.85285 5.43956L13.0397 10.6264L12.3326 11.3335L7.85285 6.85377L3.37312 11.3335L2.66602 10.6264Z"
                                  fill="#2B2A28"
                                />
                              </svg>
                            )}
                          </>
                        )}
                      </div>
                      {sideOpen && (
                        <ul
                          id="dropdown-trading"
                          className={`space-y-1 pl-8 ${
                            isOpenTrade && sideOpen ? "" : "hidden"
                          }`}
                        >
                          <Link
                            href={
                              "/product-management/list?itemType=mainProducts"
                            }
                          >
                            <li
                              className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-sm
                          ${
                            pathname === "/product-management/list"
                              ? "bg-hover-sidebar"
                              : ""
                          } 
                          `}
                            >
                              Product list
                            </li>
                          </Link>
                          <Link href={"/product-management/settings"}>
                            <li
                              className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-sm
                          ${
                            pathname === "/product-management/settings"
                              ? "bg-hover-sidebar"
                              : ""
                          } 
                          `}
                            >
                              Product settings
                            </li>
                          </Link>

                          <Link href={"/product-management/components"}>
                            <li
                              className={`py-2 px-4 hover:bg-hover-sidebar cursor-pointer font-normal text-sm
                          ${
                            pathname === "/product-management/components"
                              ? "bg-hover-sidebar"
                              : ""
                          } 
                          `}
                            >
                              Components
                            </li>
                          </Link>
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li className="flex items-center px-3 py-2 hover:bg-hover-sidebar font-normal text-sm rounded-sm justify-center">
                      <Image
                        src="/icons/userManagement/layers-three.svg"
                        alt="Layers_three"
                        width={24}
                        height={24}
                      />
                    </li>
                  )}
                </>
              )}

              <div className="pt-1" />
              {/* Customers */}

              {superAdmin && (
                <>
                  {sideOpen ? (
                    <Link
                      href={"/management"}
                      className={`link ${
                        pathname === "/dashboard" ? "active" : ""
                      }`}
                    >
                      <li
                        className={`flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm 
                          ${
                            pathname === "/dashboard" ? "bg-hover-sidebar" : ""
                          } 
                          ${sideOpen ? "cursor-pointer" : "justify-center"} 
                          `}
                      >
                        <Image
                          src="/icons/userManagement/users.svg"
                          alt="Users"
                          width={24}
                          height={24}
                        />

                        {sideOpen && <span className="">Customers</span>}
                        {pathname === "/dashboard" && (
                          <span className="flex w-1.5 h-1.5 bg-orange rounded-full">
                            {" "}
                          </span>
                        )}
                      </li>
                    </Link>
                  ) : (
                    <li className="flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm justify-center ">
                      <Image
                        src="/icons/userManagement/users.svg"
                        alt="Users"
                        width={24}
                        height={24}
                      />
                    </li>
                  )}
                </>
              )}

              <div className="pt-1" />
              {/* Inventory */}
              {superAdmin && (
                <>
                  {sideOpen ? (
                    <Link
                      href={"/management"}
                      className={`link ${
                        pathname === "/inventory" ? "active" : ""
                      }`}
                    >
                      <li
                        className={`flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm 
                          ${
                            pathname === "/inventory" ? "bg-hover-sidebar" : ""
                          } 
                          ${sideOpen ? "cursor-pointer  " : "justify-center"} 
                  `}
                      >
                        <Image
                          src="/icons/userManagement/cube.svg"
                          alt="Cube"
                          width={24}
                          height={24}
                        />

                        {sideOpen && <span className="">Inventory</span>}
                      </li>
                    </Link>
                  ) : (
                    <li className="flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm justify-center ">
                      <Image
                        src="/icons/userManagement/cube.svg"
                        alt="Cube"
                        width={24}
                        height={24}
                      />
                    </li>
                  )}
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <div className="mt-auto" />
      <div className="space-y-2 px-2">
        {/* User Management */}
        {showUserManagement && (
          <>
            {sideOpen ? (
              <Link
                href={"/management"}
                className={`link ${pathname === "/management" ? "active" : ""}`}
              >
                <li
                  className={`flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm 
                    ${pathname === "/management" ? "bg-hover-sidebar" : ""} 
                    ${sideOpen ? "cursor-pointer" : "justify-center"} `}
                >
                  <Image
                    src="/icons/userManagement/users-plus.svg"
                    alt="Users-Plus"
                    width={24}
                    height={24}
                  />
                  {sideOpen && <span className="">User Management</span>}
                </li>
              </Link>
            ) : (
              <li className="flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm justify-center ">
                <Image
                  src="/icons/userManagement/users-plus.svg"
                  alt="Users-Plus"
                  width={24}
                  height={24}
                />
              </li>
            )}
          </>
        )}

        <div className="pt-1" />

        <>
          {sideOpen ? (
            <Link
              href={"/management"}
              className={`link ${pathname === "/setting" ? "active" : ""}`}
            >
              <li
                className={`flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm 
                  ${pathname === "/setting" ? "bg-hover-sidebar" : ""} 
                  ${sideOpen ? "cursor-pointer" : "justify-center"} `}
              >
                <Image
                  src="/icons/userManagement/settings.svg"
                  alt="Settings"
                  width={24}
                  height={24}
                />

                {sideOpen && <span className="">Settings</span>}
              </li>
            </Link>
          ) : (
            <li className="flex items-center px-3 py-2 gap-3 hover:bg-hover-sidebar font-normal text-sm rounded-sm justify-center ">
              <Image
                src="/icons/userManagement/settings.svg"
                alt="Settings"
                width={24}
                height={24}
              />
            </li>
          )}
        </>

        <div className=""></div>
      </div>

      <div
        className={`mt-auto flex items-center px-3 py-4 
         ${sideOpen ? "" : "justify-center"}
        `}
      >
        <div className={`flex items-center gap-3 `}>
          <Image
            src="/icons/userManagement/avatar-user.svg"
            alt="Avatar-User"
            width={40}
            height={40}
            className="rounded-full"
          />
          {sideOpen && (
            <div className="flex flex-col">
              <span className="text-base font-normal w-40 overflow-hidden whitespace-nowrap truncate">
                {adminInfo?.full_name}
              </span>
              <span className="text-xs text-gray-500">{adminInfo?.email}</span>
            </div>
          )}
        </div>
        {sideOpen && (
          <button className="ml-auto p-2" onClick={handleLogOut}>
            <Image
              src="/icons/userManagement/log-out.svg"
              alt="Log-Out"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
