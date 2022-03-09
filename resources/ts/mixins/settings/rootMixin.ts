import {Component, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {
    IManageBlock,
    ISettingsInit,
    IUser,
    IUsersRoles
} from "../../types/settings";
import {eventBus} from "../../bus";

const StoreSettings = namespace('StoreSettings')

@Component
export default class rootMixin extends Vue {

/*
    @StoreSettings.State('user') user!: IUser
    @StoreSettings.Mutation('setNamespace') setNamespace!: (payload: string) => void
    @StoreSettings.Action('init') init!: (payload: ISettingsInit) => void
    @StoreSettings.Mutation('setFakeRole') setFakeRole!: (payload: number) => void
    @StoreSettings.State('manageBlocks') manageBlocks!: IManageBlock[]

    public blocks!: IManageBlock[]

    makeNamespace() {
        return this.$vnode.tag?.split('-').pop() ?? ''
    }



    async initialize() {
        if (this.$parent.$attrs && this.$parent.$attrs.hasOwnProperty('settings')) {
            await this.setNamespace(this.makeNamespace())
            await this.init({ // <== 'manageBlocks','namespace'
                namespace: this.makeNamespace(),
                role: this.user.role_id
            })
        }
    }

    /!**
     * Возвращает обьект с доступами к конкретному блоку по id или slug
     * @param idOrSlug
     *!/
    manage(idOrSlug: number | string) {
        return typeof idOrSlug === "number"
            ? this.manageBlocks.find(i => i.id === idOrSlug)
            : this.manageBlocks.find(i => i.slug === idOrSlug)
    }


    async mounted() {
        // await this.setFakeRole(0)
        await this.initialize()

        // this.setBlocks();
    }
*/

}
