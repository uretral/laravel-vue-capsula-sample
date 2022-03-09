<template>
  <div class="h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">Управление блоками ({{fakeRole}}): </span>
      <Button color="primary" size="s" :icon-circle="true" icon="h-icon-plus" style="margin-left: 12px;"
              @click="eBus('manage-block-open')"/>
      <span class="h-panel-right" v-font="16"><i class="icon-unlock"/></span>
    </div>
    <div class="h-panel-bar" :class="{selectedPanelBar: fakeRole}">
      <Select :datas="roles" keyName="id" titleName="name" v-model="fakeRole"
              placeholder="Выберите группу" @change="createSectionsObj()"></Select>
    </div>
    <Collapse accordion>
      <CollapseItem v-for="item in manageBlocks" :title="`${item.title} (${item.id})`" :key="'block'+item.id" class="relative">
        <i v-if="item.tooltip" class="h-icon-help-solid " v-tooltip placement="left" :content="item.tooltip"/>
        <table class="manage-table">
          <!--Добавление блока-->
          <thead>

          <tr>
            <th><Checkbox v-model="item.roles.includes(fakeRole)" @change="changeBlockRoles(item)"/></th><!-- sections[item.id]  -->
            <th>Отображать блок</th>
            <th><i class="icon-shuffle"></i></th>
            <th><Button size="xs" icon="h-icon-edit" noBorder @click="eBus('manage-block-edit', item )"/></th>
            <th></th>
          </tr>

          </thead>
          <!--отображение и добавление полей-->
          <tbody>

          <tr v-for="itemItem in item.items" :key="'block-item'+itemItem.key">
            <td>

              <Checkbox v-model="itemItem.roles.includes(fakeRole)"  @change="changeBlockItemRoles(itemItem)"/>

            </td>
            <td>
              {{ itemItem.title }}
              <Button v-if="itemItem.listing" icon="h-icon-menu" size="xs"
                      @click="editManageBlockItemList(itemItem)" noBorder/>
            </td>
            <td>
              <input type="number" class="compact" v-model.number="itemItem.sort"
                     @focusout="updateOrCreateManageBlockItems(itemItem)"/>
            </td>
            <td>
              <Button size="xs" icon="h-icon-edit" noBorder @click="editManageBlockItem(itemItem)"></Button>
            </td>
            <td>
              <Poptip content="Это удалит поле для всех пользователей, Вы уверены?" @confirm="confirmDelete()">
                <Button  size="xs" icon="h-icon-trash" noBorder></Button>
              </Poptip>
            </td>
          </tr>
          </tbody>
          <!--Добавление поля-->
          <tfoot>
          <tr>
            <th>
              <Button size="xs" icon="h-icon-plus" noBorder @click="addManageBlockItem(item)"></Button>
            </th>
            <th>Добавить поле</th>
            <th></th>
            <th>
            </th>
            <th>
            </th>
          </tr>
          </tfoot>
          <!---->
        </table>
      </CollapseItem>

    </Collapse>


    <ManageBlock/>
    <ManageBlockItem/>
    <ManageBlockItemList/>


  </div>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {IFormItem, IManageBlock, IUser, IUsersRoles} from "../../types/settings";
import ManageBlock from "./ManageBlock.vue";
import {eventBus} from "../../bus";
import ManageBlockItem from "./ManageBlockItem.vue";
import manageMixin from "../../mixins/settings/manageMixin";
import ManageBlockItemList from "./ManageBlockItemList.vue";

const StoreSettings = namespace('StoreSettings')
@Component({
  components: {ManageBlockItemList, ManageBlockItem, ManageBlock}
})
export default class FieldsManagement extends Mixins(manageMixin) {


  @StoreSettings.State('manageBlocks') manageBlocks!: IManageBlock[]


  public sections = {}


  eBus(event, payload = null) {
    eventBus.$emit(event, payload)
  }

  createSectionsObj() {
    this.manageBlocks.map(i => this.sections[i.id] = i.roles?.includes(this.fakeRole))
  }


  async mounted() {
    this.createSectionsObj()
  }

}
</script>
