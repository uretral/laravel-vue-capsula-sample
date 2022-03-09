import {Module, Mutation, VuexModule, Action, MutationAction} from "vuex-module-decorators";
import ax from "axios";
import {IManageBlock, ISettingsInit, ISideMenu, IUser, IUsersRoles} from "../../types/settings";

import {emitResponseLoad, emitResponseSave} from "../../mixins/vuex/vuex.mixin";

const baseUrl = '/admin/vuex/settings'

const axios = ax.create({
    baseURL: '/admin/vuex/settings'
});


@Module({
    namespaced: true
})

export default class StoreSettings extends VuexModule {

    public server: string = process.env.NODE_ENV === 'production' ? '' : 'http://stage-0.thecapsula.loc'

    public ttest: string = ''

    @Mutation setTtest(payload: string) {
        this.ttest = payload
    }

    public namespace: string = ''

    @Mutation setNamespace(payload: string) {
        this.namespace = payload
    }

    public user!: IUser

    @Mutation setUser(payload: IUser) {
        this.user = payload
    }

    public fakeRole = 0

    @Mutation setFakeRole(payload: number) {
        this.fakeRole = payload
    }

    public roles: IUsersRoles[] = []

    @Mutation setRoles(payload: IUsersRoles[]) {
        this.roles = payload
    }

    public manageBlocks: IManageBlock[] = []

    @Mutation setManageBlocks(payload) {
        this.manageBlocks = payload
    }

    public listings = {} /*{access: number, lists: {}}*/
    @Mutation setListings(payload){
        if(payload.access){
            this.listings[payload.access] = payload.lists.map(i => {
                return {
                    id: i,
                    name: i
                }
            })
        }

    }

    public selects = {}
    @Mutation setSelects(payload){
        this.selects[payload.name] = payload.list
    }

    public obList = {}

    @Mutation setObList(payload) {
        if (payload.id)
            this.obList[payload.id] = payload.data
    }

    public sideMenu!: ISideMenu[]

    @Mutation setSideMenu(payload: ISideMenu[]) {
        this.sideMenu = payload
    }

    @Action({commit: 'setSideMenu'})
    async fetchSideMenu() {
        const response = await axios.post('', {func: 'sideMenu'})
        return response.data;
    }

    public image!: string

    @Mutation setImage(payload: string) {
        this.image = payload
    }

    @Action({commit: 'setImage'})
    async uploadImage(payload: { image: string, path: string, filename: string }) {
        const response = await axios.post('', {
            func: 'uploadImage',
            image: payload.image,
            path: payload.path,
            filename: payload.filename
        })
        return response.data;
    }

    public usersByRoles = []

    @Mutation setUsersByRoles(payload: []) {
        this.usersByRoles = payload
    }

    @Action({commit: 'setUsersByRoles'})
    async fetchUsersByRoles() {
        const response = await axios.post('', {
            func: 'usersByRoles'
        })
        return response.data;
    }


    // manage blocks

    @MutationAction({mutate: ['manageBlocks']})
    async updateOrCreateManageBlock(payload) {
        return await emitResponseSave({
            url: baseUrl,
            payload: {
                func: 'manageBlock',
                manageBlock: payload
            }
        })
    }

    @MutationAction({mutate: ['manageBlocks']})
    async updateOrCreateManageBlockItems(payload) {

        return await emitResponseSave({
            url: baseUrl,
            payload: {
                func: 'manageBlockItems',
                manageBlockItem: payload
            }
        })
    }

    @MutationAction({mutate: ['manageBlocks']})
    async updateOrCreateManageBlockList(payload) {

        return await emitResponseSave({
            url: baseUrl,
            payload: {
                func: 'manageBlockLists',
                manageBlockList: payload
            }
        })
    }


    //*** @MutationActions

    @MutationAction({mutate: ['manageBlocks', 'namespace']})
    async init(payload: ISettingsInit) {
        return await emitResponseLoad({
            url: baseUrl,
            payload: {
                func: 'init',
                namespace: payload.namespace,
                role: payload.role,
            }
        }, false)
    }

}
