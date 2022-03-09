<template>
  <Modal v-model="open" type="drawer-left">
    <div class="h-panel manage-form" v-if="open">
      <div class="h-panel-bar">
        <span class="h-panel-title">Редактировать список</span>
        <span class="h-panel-right"><Button color="primary" icon="h-icon-inbox">Сохранить</Button></span>
      </div>
      <div class="h-panel-body">

        <div class="scroll" style="height: calc(100vh - 120px); overflow-y: auto">
          <Row
              v-if="selectList" v-for="(listItem,key) in selectList"
              :key="'selectList_'+key"
              class="checkbox-vertical-listing"
              :class="manageListItem(listItem) ? 'active' : ''"
          >

            <Cell width="22">
              <a href="javascript:" class="dark-color" @click="manageListItemChangeRole(listItem)">
                {{ listItem.name }}
              </a>
            </Cell>
          </Row>
        </div>

      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import {Component, Mixins, Watch} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import QuickForm from "../layout/form/QuickForm.vue";
import manageMixin from "../../mixins/settings/manageMixin";
import {eventBus} from "../../bus";
import {IListItem, IManageBlockItem} from "../../types/settings";
import serviceMixin from "../../mixins/settings/serviceMixin";

const StoreSettings = namespace('StoreSettings')
@Component({
  components: {QuickForm}
})
export default class ManageBlockItemList extends Mixins(manageMixin, serviceMixin) {


  @StoreSettings.Action('updateOrCreateManageBlockList') updateOrCreateManageBlockList!: (payload: IListItem) => void

  public item!: IManageBlockItem

  public selectList
  public checkboxes: number[] = []

  get manageList() {
    let block = this.manageBlocks.find(i => i.id === this.item.block_id)
    if (block) {
      let blockItem = block.items.find(i => i.id === this.item.id)
      return blockItem?.list_items
    }
    return []
  }

  manageListItem(listItem) {
    let item = this.manageList?.find(i => i.list_item_id === listItem.id)
    if (item) {
      return item && item.roles && item.roles.includes(this.fakeRole)
    } else {
      return false
    }

  }

  async manageListItemChangeRole(listItem: IListItem) {

    let item = this.manageList?.find(i => i.list_item_id === listItem.id)
    let roles = [this.fakeRole]
    if (item) {
      let index = item.roles.indexOf(this.fakeRole)
      index !== -1 ? item.roles.splice(index, 1) : item.roles.push(this.fakeRole)
      roles = item.roles
    }

    await this.updateOrCreateManageBlockList({
      block_id: this.item.block_id,
      item_id: this.item.id,
      key: this.item.listing,
      list_item_id: listItem.id,
      roles: roles
    })

    eventBus.$emit('manage-block-item-list-changed')
  }

  initBlockItemList(itemItem: IManageBlockItem) {
    this.item = itemItem
    if (itemItem.listing) {
      this.selectList = this.selects[itemItem.listing]
      this.open = true
    } else {
      this.notice('warn', 'Прикрепите список к элементу раздела')
    }
  }


  created() {
    eventBus.$on('manage-block-item-list', (itemItem: IManageBlockItem) => {
      this.selectList = this.selects[itemItem.listing]
      this.initBlockItemList(itemItem)
    })
  }


}
</script>

