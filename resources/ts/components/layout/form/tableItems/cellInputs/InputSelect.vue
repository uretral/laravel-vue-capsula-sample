<template>
  <Select v-if="selectList" keyName="id" titleName="name" :datas="selectList" :null-option="false"/>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Watch} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";
import {eventBus} from "../../../../../bus";

@Component
export default class InputSelect extends Mixins(cellInputMixin) {

  @Prop() lists

  public selectList: {}[] = []

  makeList() {

    this.manageItem.list_items.forEach((i) => {
      if (i.key === this.manageItem.listing && i.roles.includes(this.fakeRole)) {
        let LI = this.lists[this.manageItem.listing].find(listItem => listItem.id === i.list_item_id)
        // @ts-ignore
        if(this.selectList.findIndex(i => i.id === LI.id) === -1){
          this.selectList.push(LI)
        }
      }

    })

  }

  @Watch('lists') onListChanged(v, o) {
    this.makeList()
  }

  @Watch('fakeRole') onFakeRoleChanged(v, o) {
    this.makeList()
  }

  mounted() {
    eventBus.$on('manage-block-item-list-changed', () => {
      this.makeList()
    })
  }
}
</script>
