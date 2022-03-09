// export interface ISideMenu {
//     id: number
//     sort: number
//     active: number
//     title: string
//     parent: number
//     icon: string
//     h_icon: string
//     page: string
//     children: ISideMenu[]
//     route_name: string
//     user_rights: string
// }

import {ILead} from "./lead";

export interface ISideMenu {
    title: string
    key: string
    icon: string
    path: string
    href: string
    children: ISideMenu[]
}

export interface IUser {
    id: number
    name: string
    role_id: number
    role_name: string
}

export interface IUsersRoles {
    id: number
    name: string
    slug: string
}

export interface IUsersPermissions {
    id: number
    name: string
    slug: string
}

export interface IPagination {
    page?: number,
    size?: number,
    total?: number
}

export interface IUsersByRoles {
    stylist: IUser[]
}

export interface IEmitResponse {
    url: string
    payload: any
}

export interface ISettingsInit {
    namespace: any
    role?: number
}

export interface IManageBlock {
    id: number
    namespace: string
    slug: string
    title: string
    type: string
    roles: number[]
    items: IManageBlockItem[]
    tooltip: string
    sort: number
    edit: number[]
    delete: number[]
}

export interface IManageBlockItem {
    id?: number
    block_id: number
    key: string
    sort: number
    title: string
    input_type: string,
    input_value: any,
    input_mask?: string,
    input_disabled?: boolean,
    input_rules: IFormItemRules,
    input_list?: { id: any, name: string }[]
    input_list_null_option?: boolean
    tooltip?: string
    roles: number[]
    position?: string
    view_class: ? string
    view_type: ? string
    sortable?: boolean
    listing: string
    list_items: IListItem[]

}

export interface IFormItem {
    id?: number
    key: string
    sort?: number
    listing?: number
    title: string
    input_type: string,
    input_value: any,
    input_mask?: string,
    input_disabled?: boolean,
    input_rules?: IFormItemRules,
    input_list?: { id: any, name: string }[]
    input_list_null_option?: boolean
    tooltip?: string
    legend?: string

}

export interface IFormRules {
    required: string[]
    rules: {}
}

export interface IFormItemRules {
    required?: boolean
    int?: boolean
    number?: boolean
    url?: boolean
    email?: boolean
    tel?: boolean
    mobile?: boolean
    textarea?: {
        maxLen: number,
        minLen: number
    },
    custom?: any
}

export interface IListItem {
    id?: number
    block_id: number
    item_id?: number
    key: string
    list_item_id: number
    roles: number[]
}

export interface IPermissionsFieldsData {
    namespace: string
    items
}

export interface ITablePaginate {
    current_page?: number
    data?: any[]
    first_page_url?: string
    from?: number
    last_page?: number
    last_page_url?: string
    next_page_url?: string
    path?: string
    per_page?: number
    prev_page_url?: string
    to?: number
    total?: number
}
