import {Module, Mutation, VuexModule, Action, MutationAction} from "vuex-module-decorators";

const baseUrl = '/admin/vuex/payment'

import {emitResponseLoad} from "../../../mixins/vuex/vuex.mixin";
import {IPayment} from "../../../types/payment";

@Module({
    namespaced: true
})

export default class StorePayment extends VuexModule {

    public server: string = process.env.NODE_ENV === 'production' ? '' : 'http://stage-0.thecapsula.loc'

    public payments: IPayment[] = []


    @MutationAction({mutate:['payments']}) async initPayments() {
        return await emitResponseLoad({
            url: baseUrl,
            payload: {
                func:'initPayments'
            }
        });
    }

}
