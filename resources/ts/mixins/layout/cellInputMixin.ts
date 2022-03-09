import {Component, Mixins, Prop, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'

const StoreSettings = namespace('StoreSettings')
import {eventBus} from "../../bus";

@Component
export default class cellInputMixin extends Vue {

    @Prop() manageItem
    @StoreSettings.State('fakeRole') fakeRole!:number

    filter(){
        eventBus.$emit('input-filter')
    }


}
