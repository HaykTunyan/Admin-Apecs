import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfoItem {
  id: string;
  type: string;
  description: string;
  checked: boolean;
  name: string;
}

interface PermissionCategory {
  title: string;
  info: InfoItem[];
}

interface PermissionsState {
  categories: PermissionCategory[];
}

const initialState: PermissionsState = {
  categories: []
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action: PayloadAction<PermissionCategory[]>) => {
      state.categories = action.payload;
    },
    togglePermissionChecked: (state, action: PayloadAction<{ categoryTitle: string; permissionId: string }>) => {
      const { categoryTitle, permissionId } = action.payload;
      const category = state.categories.find(cat => cat.title === categoryTitle);
      if (category) {
        const permission = category.info.find(perm => perm.id === permissionId);
        if (permission) {
          permission.checked = !permission.checked;
        }
      }
    },
    updatePermission: (state, action: PayloadAction<{ categoryTitle: string; permission: InfoItem }>) => {
      const { categoryTitle, permission } = action.payload;
      const category = state.categories.find(cat => cat.title === categoryTitle);
      if (category) {
        const index = category.info.findIndex(perm => perm.id === permission.id);
        if (index !== -1) {
          category.info[index] = permission;
        }
      }
    },
    addPermissionCategory: (state, action: PayloadAction<PermissionCategory>) => {
      state.categories.push(action.payload);
    }
  }
});

export const { setPermissions, togglePermissionChecked, updatePermission, addPermissionCategory } = permissionsSlice.actions;
export default permissionsSlice.reducer;
