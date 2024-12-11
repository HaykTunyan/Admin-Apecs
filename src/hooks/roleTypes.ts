// Role Types.

export interface getRoleTypes {
    limit?: number;
    offset?: number;
    orderBy?: string;
    sort?: string;
    q?: string;
};

export interface getRoleItemTypes {
    id: string;
};

export interface permistionRoleType {
    id: string;
} 

export interface createRoleTypes {
   name: string;
   description: string;
   permissions: permistionRoleType[]
};

export interface updateRoleTypes {
    id: string;
};

export interface deleteRoleTypes {
    id: string;
}
