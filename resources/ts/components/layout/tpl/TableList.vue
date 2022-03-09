<template>

  <super>

    <div>

      <div class="h-table h-table-stripe">
        <div class="h-table-header" style="padding-right: 15px;">
          <table class="h-table-header-table">
            <tr v-if="titleRow">
              <!-- First Header Row-->

              <th class="text-center checkbox" v-if="selectRows">
                <div content="Дата"><span class="h-tag h-icon-check"></span></div>
              </th>

              <levelFirst v-for="(manageItem,key) in manageBlocks[currentIndex].items" :item="manageItem"
                          :key="manageItem.id">

                <slot name="thead-title-before"></slot>


                <th :class="manageItem.position">
                  <div>
                    <span>{{ manageItem.title }}</span>

                    <span v-if="manageItem.sortable"> &nbsp;
                  <a href="javascript:" class="h-icon-top"
                     :class="callbackObject.orderBy === manageItem.key && callbackObject.orderDirection === 'asc' ? 'red-color' : 'gray-color'"
                     @click="sortAsc(manageItem)"/>
                  <a href="javascript:" class="h-icon-down"
                     :class="callbackObject.orderBy === manageItem.key &&  callbackObject.orderDirection === 'desc' ? 'red-color' : 'gray-color'"
                     @click="sortDesc(manageItem)"/> </span>

                  </div>
                </th>

                <slot name="thead-title-after"></slot>


              </levelFirst>

              <th class="text-center manager">
                <div content="Теги"><span>Управление</span></div>
              </th>

            </tr>
            <!-- Filter Header Row-->

            <tr class="table-filters">

              <th class="text-center checkbox" v-if="selectRows">
                <Checkbox v-model="selectAll" @change="selectAllRows()"/> <!--   -->
              </th>

              <slot name="thead-filter-before"></slot>

              <levelFirst v-for="(manageItem,key) in manageBlocks[currentIndex].items" :item="manageItem"
                          :key="manageItem.id">

                <th :class="manageItem.position">

                  <CellInputs :type="manageItem.input_type" :manageItem="manageItem"
                              v-if="manageItem.input_type" :lists="lists"/>

                </th>

              </levelFirst>

              <slot name="thead-filter-after"></slot>

              <th class="text-center manager">
                <div content="Теги">
                  <Button size="s" icon="h-icon-search" @click="clearFilter()">Очистить</Button>
                </div>
              </th>

            </tr>

          </table>
          <div class="h-table-fixed-cover" style="width: 15px;"></div>
        </div>
        <!-- Body-->
        <div class="h-table-container">
          <div class="relative">
            <div class="h-table-body" style="height: calc(100vh - 210px)">
              <table class="h-table-body-table" style="">
                <tbody class="h-table-tbody">


                <tr v-for="item in items">

                  <td class="text-center checkbox">
                    <Checkbox :checked="rowSelected(item)" @change="selectRow(item)"/>
                  </td>

                  <levelFirst v-for="(manageItem,key) in manageBlocks[currentIndex].items" :item="manageItem"
                              :key="manageItem.id">
                    <slot name="tbody-before"></slot>

                    <td :class="manageItem.position">

                      <CellViews :type="manageItem.view_type" :manage="manageItem" :item="item"
                                 v-if="manageItem.view_type"/>

                    </td>

                    <slot name="tbody-after"></slot>

                  </levelFirst>

                  <td class="text-center manager">

                    <Button icon="h-icon-edit" :text="true" size="xs" @click="$emit('table-row-edit', item)"/>

                    <Poptip content="Вы уверены? ;)" @confirm="$emit('table-row-delete', item)"
                            v-if="getCurrentUser(2)">
                      <Button icon="h-icon-trash" :text="true" size="xs"></Button>
                    </Poptip>

                  </td>
                </tr>


                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="h-table-items">
          <div></div>
        </div>
      </div>
      <HFooter class="bg-gray-color" v-if="pagination">
        <Pagination v-model="pagination" align="right" @change="paginate"></Pagination>
      </HFooter>
    </div>
  </super>


</template>

<script lang="ts">
import {Component, Emit, Mixins, Prop, Vue, Watch} from 'vue-property-decorator'
import {IFormItem, IManageBlock, IPagination, ITablePaginate} from "../../../types/settings";
import {ILeadPaginate} from "../../../types/lead";
import ViewTag from "./elements/ViewTag.vue";
import manageMixin from "../../../mixins/settings/manageMixin";
import {eventBus} from "../../../bus";
import CellViews from "../form/tableItems/CellViews.vue";
import CellInputs from "../form/tableItems/CellInputs.vue";
import cellInputMixin from "../../../mixins/layout/cellInputMixin";

@Component({
  components: {CellInputs, CellViews, ViewTag}
})
export default class TableList extends Mixins(manageMixin) {

  @Prop({default: true}) titleRow
  @Prop({default: true}) filterRow
  @Prop({default: false}) selectRows


  emitCallbackObject() {
    this.$emit('table-filter-changed', this.callbackObject)
  }

  get items() {
    if (this.mainData.hasOwnProperty('current_page') && this.mainData.hasOwnProperty('data')) {
      this.pagination = {
        page: this.mainData.current_page,
        size: this.mainData.per_page,
        total: this.mainData.total,
      }
      this.callbackObject['page'] = this.pagination.page
      this.callbackObject['per_page'] = this.pagination.size
      return this.mainData.data
    } else {
      return this.mainData
    }
  }

  public callbackObject = {
    orderBy: 'created_at',
    orderDirection: 'desc',
  }

  public pagination: IPagination = {}

  paginate() {
    this.callbackObject['page'] = this.pagination.page
    this.callbackObject['per_page'] = this.pagination.size
    this.emitCallbackObject()
  }


  sortAsc(manageItem) {
    this.callbackObject['orderBy'] = manageItem.key
    this.callbackObject['orderDirection'] = 'asc'
    this.emitCallbackObject()
  }

  sortDesc(manageItem) {
    this.callbackObject['orderBy'] = manageItem.key
    this.callbackObject['orderDirection'] = 'desc'
    this.emitCallbackObject()
  }


  /*checkboxes select rows*/
  public selectAll = false;

  public rowsSelected: string[] = []

  @Watch('rowsSelected') onLeadsSelectedChange(n, o) {
    this.selectAll = !!this.rowsSelected.length

    this.$emit('table-rows-selected', this.rowsSelected)

  }

  selectRow(row) {

    let index = this.rowsSelected.findIndex(i => this.lodash.isEqual(i, row))
    index === -1
        ? this.rowsSelected.push(row)
        : this.rowsSelected.splice(index, 1)
  }

  rowSelected(row) {
    return this.rowsSelected.findIndex(i => this.lodash.isEqual(i, row)) !== -1
  }

  selectAllRows() {

    if (this.rowsSelected.length) {
      this.rowsSelected = []
    } else {
      this.mainData.data?.forEach((i) => {
        this.rowsSelected.push(i)
      })
    }
  }

  /* EOF checkboxes select rows*/


  /* filters */
  clearFilter() {

    this.callbackObject = {
      orderBy: 'created_at',
      orderDirection: 'desc',
    }

    this.manageBlocks[this.currentIndex].items.forEach(i => {

      if (i.hasOwnProperty(i.key)) {
        delete i[i.key]
      }

      i.input_value = ''

    })

    this.rowsSelected = []
    this.emitCallbackObject()

  }

  filterTable() {
    console.log('manageBlocks[currentIndex].items', this.manageBlocks[this.currentIndex].items);

    this.manageBlocks[this.currentIndex].items.map(item => {
      if (item['input_value']) {
        this.callbackObject[item['filter']] = item['input_value']
      } else {
        delete this.callbackObject[item['filter']]
      }
    })

    this.emitCallbackObject()
  }

  /* EOF filters */

  created() {
    eventBus.$on('input-filter', () => {
      this.filterTable()
    })
  }


}
</script>
