//  Permission Type

export interface PermissionType {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

export interface TransformedDataType {
  title: string;
  info: PermissionType[];
}
