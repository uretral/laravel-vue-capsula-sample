import {Component, Mixins, Model, ModelSync, Prop, PropSync, Vue, Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

const StoreSettings = namespace('StoreSettings')
import {eventBus} from "../../bus";
import {IFormItem, IManageBlock, IManageBlockItem, ITablePaginate, IUser, IUsersRoles} from "../../types/settings";

@Component
({
    data() {
        return {
            blocks: 'dsdsdsd'
        }
    },
    provide() {
        return {blocks: this}
    },
    components: {
        super: {
            inject: ['blocks'],
            template: '<transition  name="fade" v-if="blocks.manageBlocks.find(i => i.id == blocks.access).roles.includes(blocks.fakeRole)"><slot></slot></transition>',
            /*  v-if="blocks.manageBlocks.find(i => i.id == blocks.access).roles.includes(blocks.fakeRole)"  */

        },
        levelFirst: {
            inject: ['blocks'],
            template: '<transition  name="fade" v-if="this.$attrs.item.roles.includes(blocks.fakeRole)"><slot></slot></transition>',
            /*  v-html="this.$attrs.item.roles.includes(blocks.fakeRole)" */
        }

    }
})
export default class manageMixin extends Vue {
    /* access - любой блок нуждающийся в управлении
    * id указанный в таблице manage_blocks
    *  */
    @Prop() access!: number
    /* manage - */
    public manage = {}
    public permit: boolean = false
    public currentBlock: number = 0
    public superAccess = true
    public currentIndex!: number
    public obj!: any
    public objLists = {}

    /* standart components objects*/
    @Prop() mainData!: ITablePaginate
    @Prop() lists


    @StoreSettings.State('user') user!: IUser
    @StoreSettings.State('roles') roles!: IUsersRoles[]
    @StoreSettings.Mutation('setFakeRole') setFakeRole!: (payload: number) => void
    @StoreSettings.State('manageBlocks') manageBlocks!: IManageBlock[]
    @StoreSettings.Action('updateOrCreateManageBlock') updateOrCreateManageBlock!: (payload) => void
    @StoreSettings.Action('updateOrCreateManageBlockItems') updateOrCreateManageBlockItems!: (payload) => void
    @StoreSettings.Mutation('setListings') setListings!: (payload: {access: number, lists: string[]}) => void

    @StoreSettings.State('selects') selects!: {}
    @StoreSettings.Mutation('setSelects') setSelects!: (payload) => void


    @StoreSettings.Mutation('setObList') setObList!: (payload) => void

    @Watch('permit') onPermitChanged(n, o) {
        console.log('permit', n, o);
    }


    get fakeRole() {
        return this.$store.state.StoreSettings.fakeRole
    }

    set fakeRole(payload) {
        this.setFakeRole(payload)
    }

    get namespace() {
        return this.$store.state.StoreSettings.namespace
    }

    get obList() {
        return this.$store.state.StoreSettings.obList
    }

    set obList(payload) {
        this.setObList(payload)
    }


    public open: boolean = false
    public editItem:number = 0


    async changeBlockRoles(item: IManageBlock) {
        this.currentBlock = item.id
        let roleIndex = item.roles.indexOf(this.fakeRole)

        roleIndex !== -1
            ? item.roles.splice(roleIndex, 1)
            : item.roles.push(this.fakeRole)

        await this.updateOrCreateManageBlock(item)
    }

    editManageBlockItem(item: IManageBlockItem) {
        eventBus.$emit('manage-block-item-edit', item)
    }

    addManageBlockItem(item: IManageBlock) {
        eventBus.$emit('manage-block-item-open', item)
    }

    editManageBlockItemList(itemItem:IManageBlockItem) {
        eventBus.$emit('manage-block-item-list',itemItem)
    }


    obDataSet() {
        this.setObList({
            id: this.access,
            // @ts-ignore
            data: this.mainData && this.mainData.hasOwnProperty('current_page') ? this.mainData.data[0] : this.mainData
        })
    }


    getCurrentUser(role){
        return this.fakeRole === role || this.user.role_id === role
    }

    makeSelectLists(access){
        return this.$store.state.StoreSettings.listings[access] ?? {}
    }

    allowEdit(){}
    allowDelete(){}




    /***********************************************/

    /*    // Управляет доступом к полям
        accessItem(item: IManageBlockItem) {
            let currentRole = this.fakeRole > 0 ? this.fakeRole : this.user.role_id;
            return item.roles.indexOf(currentRole) !== -1
        }*/


    async submit(payload) {
        if (payload.valid.result) {
            await this.updateOrCreateManageBlock(payload.data)
        }
        this.open = false
    }

    async submitItem(payload) {
        if (payload.valid.result) {
            await this.updateOrCreateManageBlockItems(payload.data)
            this.open = false
        }

    }

    putInputValue(payload: {
        obj: IFormItem[]
        key: string
        value: any
    }) {
        let elem = payload.obj.find(i => i.key === payload.key)
        if (elem !== undefined) {
            elem.input_value = payload.value
        }
    }

    putInputList(payload: {
        obj: IFormItem[]
        key: string
        value: any
    }) {
        let elem = payload.obj.find(i => i.key === payload.key)
        if (elem !== undefined) {
            elem.input_list = payload.value
        }
    }


    async changeBlockItemRoles(item: IManageBlockItem) {
        let roleIndex = item.roles.indexOf(this.fakeRole)


        roleIndex !== -1
            ? item.roles.splice(roleIndex, 1)
            : item.roles.push(this.fakeRole)

        console.log('itemitemitemitem',item);

        await this.updateOrCreateManageBlockItems(item)
    }


    definePermissions() {
        let block = this.manageBlocks.find(i => i.id === this.access)
        if (block) {
            this.manage = block
            this.permit = block.roles.indexOf(this.access) !== -1
        } else {
            // return false
        }

    }
    //
    updated() {
        this.obDataSet()

        if(this.access){
            Object.keys(this.lists).map(i => {
                if(this.lists[i]) {
                    this.setSelects({
                        name: i,
                        list: this.lists[i]
                    })
                }
            })
        }


    }
    mounted(){

    }
    created() {

        this.definePermissions()
        this.fakeRole = this.user.role_id
        // @ts-ignore
        this.currentIndex = this.manageBlocks.findIndex(i => i.id === this.access)
        if(this.lists && Object.keys(this.lists).length) {
            this.setListings({
                lists: Object.keys(this.lists),
                access:this.access
            })

        }

    }

}
