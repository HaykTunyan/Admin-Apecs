"use client";

import NoUserComponent from "@/containers/management/noUser";
import React, {
  Fragment,
  useEffect,
  useState,
  FC,
  useLayoutEffect,
  useCallback,
} from "react";
import { getPermisionAPI } from "@/service/permisions/permisionAPI";
import TableUser from "@/containers/management/tableUser";
import NoRoleComponent from "@/containers/management/noRole";
import { useSearchParams } from "next/navigation";
import TableRole from "@/containers/management/tableRole";
import { getUserAPI } from "@/service/user/userAPI";
import { getRoleAPI } from "@/service/role/roleAPI";
import { getAdminTypes } from "@/hooks/userTypes";
import { getRoleTypes } from "@/hooks/roleTypes";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { decodeAndSaveToken } from "@/utils/decodeToken";
import { setPermissions } from "@/store/slices/permissionSlice";

interface TabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  count?: any;
}

interface TabsComponentProps {
  initialUserList: any;
}

const TabsComponent: FC<TabsComponentProps> = ({ initialUserList }) => {
  /**
   *   @description Tabs Component.
   */

  const staticPage = 0;
  const staticSize = 10;
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const decodedToken = useSelector(
    (state: RootState) => state.token.decodedToken
  );

  const [activeTab, setActiveTab] = useState(0);
  const [userList, setUserList] = useState<any | null>(initialUserList);
  const [newUserList, setNewUserList] = useState<any | null>(initialUserList);
  const [roleList, setRoleList] = useState<any | null | []>([]);
  const [newRoleList, setNewRoleList] = useState<any | null | []>([]);
  const [permissionList, setPermissionList] = useState<any | null | []>([]);

  // User Table State
  const [sortType, setSortType] = useState<"ASC" | "DESC">("ASC");
  const [orderBy, setOrderBy] = useState<string>("");
  const [isDeleteItem, setIsDeleteItem] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<string>("");
  const [userOffset, setUserOffset] = useState<number>(staticPage);
  const [userLimit, setUserLimit] = useState<number>(staticSize);

  // Role Table State
  const [sortRoleType, setSortRoleType] = useState<"ASC" | "DESC">("ASC");
  const [orderByRole, setOrderByRole] = useState<string>("name");
  const [searchRole, setSearchRole] = useState<string>("");

  // const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>("");

  // Tabs List
  const tabs: TabItem[] = [
    { label: "Users", content: <div></div>, count: userList?.count },
    { label: "Roles", content: <div></div>, count: roleList?.count },
  ];

  const tabsRole: TabItem[] = [
    { label: "User", disabled: true, content: <div></div>, count: null },
    { label: "Roles", content: <div></div>, count: roleList?.count },
  ];

  const tabsUser: TabItem[] = [
    { label: "User", content: <div></div>, count: userList?.count },
    { label: "Roles", disabled: true, content: <div></div>, count: null },
  ];

  // User Get
  useLayoutEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const params: getAdminTypes = {
          limit: 50,
          offset: 0,
        };

        const response = await getUserAPI(params);
        setUserList(response);
      } catch (err) {
        setError("Failed to fetch admins");
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (activeTab !== undefined || isDeleteItem) {
      fetchAdmins();
    }
    // fetchAdmins();
  }, [activeTab, isDeleteItem]);

  // Get User Information
  useEffect(() => {
    const getUsers = async () => {
      try {
        // setLoading(true);
        const params: getAdminTypes = {
          limit: userLimit ? userLimit : 50,
          offset: userOffset ? userOffset : 0,
          orderBy: orderBy ? orderBy : "username",
          sort: sortType,
          q: searchUser ? searchUser : "",
        };
        const response = await getUserAPI(params);
        setNewUserList(response);
      } catch (err) {
        setError("Failed to fetch admins");
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };
    setUserLimit(10);
    getUsers();
  }, [
    activeTab,
    isDeleteItem,
    userOffset,
    userLimit,
    sortType,
    orderBy,
    searchUser,
  ]);

  // Role Get Information
  useLayoutEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoading(true);
        const params: getRoleTypes = {
          limit: 50,
          offset: 0,
          // orderBy: orderByRole ? orderByRole : "",
          // sort: sortRoleType,
          // q: '',
        };
        const response = await getRoleAPI(params);
        setRoleList(response);
      } catch (err) {
        setError("Failed to fetch admins");
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [activeTab, isDeleteItem]);

  // Get Role Information
  useEffect(() => {
    const getRoles = async () => {
      try {
        // setLoading(true);
        const params: getRoleTypes = {
          limit: 50,
          offset: 0,
          orderBy: orderByRole ? orderByRole : "",
          sort: sortRoleType,
          q: searchRole,
        };
        const response = await getRoleAPI(params);
        setNewRoleList(response);
      } catch (err) {
        setError("Failed to fetch admins");
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
    }
    if (error) {
    }
    getRoles();
  }, [activeTab, isDeleteItem, searchRole, orderByRole, sortRoleType]);

  useEffect(() => {
    const tab = searchParams.get("activeTab");
    if (tab !== null) {
      setActiveTab(Number(tab));
    }
  }, [searchParams]);

  useEffect(() => {
    if (userToken) {
      decodeAndSaveToken(userToken, dispatch);
    }
  }, [userToken, dispatch, router]);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setUserToken(token);
    }
  }, []);

  const fetchPermisions = useCallback(async () => {
    try {
      const response = await getPermisionAPI();
      const list = response?.rows || [];
      if (list) {
        setPermissionList(list);
      }
    } catch (err) {}
  }, []);

  useEffect(() => {
    fetchPermisions();
  }, [fetchPermisions]);

  function generateCategories(
    permissionListCategory: any[]
  ): Record<string, string[]> {
    return permissionListCategory.reduce((acc, permission) => {
      // const categoryPrefix = permission.name.split("_")[1];

      const firstUnderscoreIndex = permission.name.indexOf("_");
      const categoryPrefix =
        firstUnderscoreIndex !== -1
          ? permission.name.substring(firstUnderscoreIndex + 1)
          : "";

      // const categoryPrefix = permission.name.split("_", 2)[1];
      const actionType = permission.name;

      if (categoryPrefix) {
        if (acc[categoryPrefix]) {
          acc[categoryPrefix].push(actionType);
        } else {
          acc[categoryPrefix] = [actionType];
        }
      }

      return acc;
    }, {} as Record<string, string[]>);
  }

  function transformData(
    data: any[],
    categories: Record<string, string[]>
  ): Array<{
    title: string;
    info: Array<{
      id: string;
      type: string;
      description: string;
      checked: boolean;
      name: string;
    }>;
  }> {
    const customSortOrder = ["View", "Add", "Edit", "Delete"];

    const nameMap = {
      READ: "View",
      CREATE: "Add",
      UPDATE: "Edit",
      DELETE: "Delete",
    };

    const result = [];

    for (const [category, types] of Object.entries(categories)) {
      const info = data
        .filter((item) => types.includes(item.name))
        .map((item) => ({
          id: item.id,
          type: item.name,
          description: item.description,
          checked: false,
          // @ts-ignore
          name: nameMap[item.name.split("_")[0]] || item.name,
        }));

      info.sort(
        (a, b) =>
          customSortOrder.indexOf(a.name) - customSortOrder.indexOf(b.name)
      );

      result.push({ title: category, info });
    }

    return result;
  }

  useEffect(() => {
    if (decodedToken) {
      const userPermissions = decodedToken.permissions;

      const filteredList = permissionList.filter(
        (permission: { name: string }) =>
          userPermissions.includes(permission.name)
      );

      const categories = generateCategories(
        filteredList.length ? filteredList : permissionList
      );

      const transformedData = transformData(
        filteredList.length ? filteredList : permissionList,
        categories
      );

      dispatch(setPermissions(transformedData));
    }
  }, [permissionList, decodedToken, dispatch]);

  const accessPermissions = decodedToken?.permissions;
  const addminList = userList?.rows;
  const userInformation = newUserList?.rows;
  const countUser = newUserList?.count;
  const roleData = roleList?.rows;
  const roleInformation = newRoleList?.rows;

  const handleSortByUser = (column: string) => {
    if (orderBy === column) {
      const newSortType = sortType === "ASC" ? "DESC" : "ASC";
      if (sortType === "ASC") {
        setSortType(newSortType);
      } else {
        setSortType(newSortType);
      }
    } else {
      setSortType("ASC");
    }
    setOrderBy(column);
  };

  const handleSortByRole = (column: string) => {
    if (orderByRole === column) {
      const newSortType = sortRoleType === "ASC" ? "DESC" : "ASC";
      setSortRoleType(newSortType);
    } else {
      setSortRoleType("ASC");
    }

    setOrderByRole(column);
  };

  const toGoUserPage = (page: number) => {
    if (page >= 0 && page < staticSize) {
      setUserOffset(page);
    }
  };

  const enabledViewUser =
    accessPermissions?.length && accessPermissions.includes("READ_ADMIN");
  const enabledViewRole =
    accessPermissions?.length && accessPermissions.includes("READ_ROLE");

  useLayoutEffect(() => {
    if (!enabledViewUser) {
      router.push("/management?activeTab=1");
    }
    if (!enabledViewRole && !enabledViewUser) {
      router.push("/product-management/settings?filter=categories");
    }
  }, [accessPermissions]);

  const tabsShow =
    enabledViewUser && enabledViewRole
      ? tabs
      : !enabledViewUser && enabledViewRole
      ? tabsRole
      : enabledViewUser && !enabledViewRole
      ? tabsUser
      : tabs;

  return (
    <div>
      <div className="text-sm font-medium text-center text-grey-light border-b border-utility-gray-200 ">
        <ul className="flex flex-wrap -mb-px">
          {tabsShow.map((tab, index) => (
            <li key={index} className="me-2">
              {!tab.disabled ? (
                <button
                  onClick={() => setActiveTab(index)}
                  className={`inline-block p-4 border-b-2 rounded-t-lg ${
                    activeTab === index
                      ? "text-brand-secondary border-brand-secondary"
                      : "border-transparent"
                  }`}
                  aria-current={activeTab === index ? "page" : undefined}
                >
                  <div className="flex flex-row items-center gap-1">
                    <span>{tab.label}</span>

                    {tab.count === null ? (
                      <></>
                    ) : (
                      <span
                        className={`border border-utility-gray-200 rounded-full w-[30px] h-6 ${
                          activeTab === index
                            ? "bg-utility-brand-50"
                            : "bg-utility-gray"
                        }`}
                      >
                        {tab?.count ? tab?.count : 0}
                      </span>
                    )}
                  </div>
                </button>
              ) : (
                <span className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">
                  {tab.label}
                </span>
              )}
            </li>
          ))}
          {/* {tabs.map((tab, index) => (
            <li key={index} className="me-2">
              <button
                onClick={() => handleTabClick(index)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === index
                    ? "text-brand-secondary border-brand-secondary"
                    : "border-transparent"
                }`}
                aria-current={activeTab === index ? "page" : undefined}
              >
                <div className="flex flex-row items-center gap-1">
                  <span>{tab.label}</span>
                  <span className={`border border-utility-gray-200 rounded-full w-[30px] h-6 ${
                      activeTab === index ? "bg-utility-brand-50" : "bg-utility-gray"
                    }`}>
                    {tab.count}
                  </span>
                </div>
              </button>
            </li>
          ))} */}
        </ul>
      </div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="loader spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
            <p className="mt-4 text-gray-600" aria-live="polite">
              Loading...
            </p>
          </div>
        </div>
      ) : (
        <div className="">
          {tabs[activeTab].label === "Users" && (
            <Fragment>
              {addminList?.length ? (
                <div className="pt-8">
                  <TableUser
                    dataList={userInformation ? userInformation : addminList}
                    sortType={sortType}
                    countUser={countUser}
                    setSorting={handleSortByUser}
                    itemDelete={setIsDeleteItem}
                    isItem={isDeleteItem}
                    userValue={searchUser}
                    setUserValue={setSearchUser}
                    toGoButton={toGoUserPage}
                    setUserOffset={setUserOffset}
                    userLimit={userLimit}
                    permission={accessPermissions}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full pt-64">
                  <div className="">
                    <NoUserComponent permission={accessPermissions} />
                  </div>
                </div>
              )}
            </Fragment>
          )}

          {tabs[activeTab].label === "Roles" && (
            <Fragment>
              {roleData?.length ? (
                <div className="pt-8">
                  <TableRole
                    dataList={roleInformation ? roleInformation : roleData}
                    sortType={sortRoleType}
                    userValue={searchRole}
                    setSorting={handleSortByRole}
                    itemDelete={setIsDeleteItem}
                    setUserValue={setSearchRole}
                    isItem={isDeleteItem}
                    permission={accessPermissions}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full pt-64">
                  <div className="">
                    <NoRoleComponent permission={accessPermissions} />
                  </div>
                </div>
              )}
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const initialUserList = await getUserAPI({ limit: 50, offset: 0 });
    return { props: { initialUserList } };
  } catch (error) {
    return { props: { initialUserList: null } };
  }
};

export default TabsComponent;
