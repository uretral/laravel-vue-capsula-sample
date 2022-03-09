<template>
  <MainFrame>


    <TableList :access="4" :table-data="payments"/>


  </MainFrame>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import MainFrame from "../../components/layout/MainFrame.vue";
import {IPayment} from "../../types/payment";
import TableList from "../../components/layout/tpl/TableList.vue";
import TeTest from "../../components/layout/tpl/TeTest.vue";

const StorePayment = namespace('StorePayment')
@Component({
  components: {TeTest, TableList, MainFrame}
})
export default class PaymentList extends Vue {

  @StorePayment.State('payments') payments!: IPayment[]

  @StorePayment.Action('initPayments') initPayments!: () => void

  mounted() {
    this.initPayments()
  }

}
</script>
