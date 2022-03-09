<template>
  <MainFrame :title="$route.meta.title">
    <template v-slot:headerLeft>

        <template v-if="leadsSelected.length">

          <Button size="s">
            <Select :datas="leadStates" keyName="id" titleName="name" placeholder="Статус"
                    :null-option="false" :no-border="true" :equal-width="false" class="select-group"></Select>
          </Button>

          <Button icon="h-icon-inbox">Логсис</Button>

          <Button icon="h-icon-inbox">Возвраты Логсис</Button>
        </template>

    </template>



    <TableList
        :mainData="leads"
        :lists="{
          leadStates: leadStates,
          leadTags: leadTags
        }"
        :access="1"
        :selectRows="true"
        @table-filter-changed="fetchLeads"
        @table-row-edit="editLead"
        @table-row-delete="deleteLead"
        @table-rows-selected="selectedLeads"

    ></TableList>

  </MainFrame>
</template>

<script lang="ts">
import {Component, Mixins, Vue, Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import MainFrame from "../../components/layout/MainFrame.vue";
import TableList from "../../components/layout/tpl/TableList.vue";
import {ILead, ILeadPaginate, ILeadTag, ILedState} from "../../types/lead";


import FieldsManagement from "../../components/settings/FieldsManagement.vue";
import rootMixin from "../../mixins/settings/rootMixin";
import serviceMixin from "../../mixins/settings/serviceMixin";
import manageMixin from "../../mixins/settings/manageMixin";
import TeTest from "../../components/layout/tpl/TeTest.vue";

const StoreLead = namespace('StoreLead')
@Component({
  components: {TeTest, FieldsManagement, MainFrame, TableList}
})
export default class LeadList extends Mixins(serviceMixin) {

  public leadsSelected = []


  @StoreLead.State('leads') leads!: ILeadPaginate
  @StoreLead.State('leadStates') leadStates!: ILedState[]
  @StoreLead.State('leadTags') leadTags!: ILeadTag[]

  @StoreLead.Action('initList') initList!: (payload) => void
  @StoreLead.Action('fetchLeads') fetchLeads!: (payload) => void


  editLead(row:ILead){
    this.$router.push({name: 'admin.lead.item', params: {uuid: row.uuid} })
  }
  deleteLead(row:ILead){
    console.log('row',row);
  }

  selectedLeads(rows){
    this.leadsSelected = rows
  }

  async created() {
    await this.initList({per_page: 50})
  }

}
</script>

