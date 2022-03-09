<template>

  <ul class="h-menu h-menu-dark main-left-menu "
      :class="siderCollapsed ? 'h-menu-mode-vertical h-menu-size-collapse' : 'h-menu-mode-normal'">
    <li class="h-menu-li cap" :class="{'h-menu-li-opened' : itemOpened.key === item.key && !siderCollapsed}" v-for="item in items">
      <a class="h-menu-show" :class="{'h-menu-li-selected cap': $route.name.includes(item.key)}" @click="showItem(item)"
         :href="item.path">
        <span class="h-menu-show-icon"><i :class="item.icon"></i></span>
        <span class="h-menu-show-desc">{{ item.title }}</span>
        <span v-if="item.hasOwnProperty('children') && item.children.length && !siderCollapsed" class="h-menu-show-expand"><i class="h-icon-angle-down"></i></span>
      </a>

      <div  class="h-tooltip cap-tooltip" v-if="!item.hasOwnProperty('children') || !item.children.length">
        <div class="h-tooltip-arrow placement-right"></div>
        <div class="h-tooltip-inner cap">
          <div class="h-tooltip-inner-content cap">{{ item.title }}</div>
        </div>
      </div>

      <ul class="h-menu-ul" v-if="item.hasOwnProperty('children') && item.children.length">


        <li class="h-menu-li cap h-menu-li-opened" v-for="child in item.children" @click="showItem(item)">
          <a class="h-menu-show last" @click.stop="retFalse()"
             :href="child.hasOwnProperty('children') && child.children.length ? 'javascript:' : child.path"
             :class="{'h-menu-li-selected cap': $route.name.includes(child.key)}">
            <span class="h-menu-show-icon"><i :class="child.icon"></i></span>
            <span class="h-menu-show-dcesc">{{ child.title }}</span>
            <span v-if="child.hasOwnProperty('children') && child.children.length && !siderCollapsed" class="h-menu-show-expand subchild"><i class="h-icon-angle-down"></i></span>
          </a>
          <ul class="h-menu-ul" v-if="child.hasOwnProperty('children') && child.children.length">


            <li class="h-menu-li cap" v-for="subChild in child.children" @click="showItem(child)">
              <a class="h-menu-show last" @click.stop="$router.push({name:subChild.key})"
                 :class="{'h-menu-li-selected cap': $route.name.includes(subChild.key)}">
                <span class="h-menu-show-icon"><i :class="subChild.icon"></i></span>
                <span class="h-menu-show-dcesc">{{ subChild.title }}</span>
<!--                :href="subChild.hasOwnProperty('children') && subChild.children.length ? 'javascript:' : subChild.path"-->
              </a>
            </li>

          </ul>
        </li>

      </ul>
    </li>

  </ul>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'
import {namespace} from 'vuex-class'
import {ISideMenu} from "../../../types/settings";

const ex = namespace('Example')

@Component
export default class AsideMenu extends Vue {

  @Prop() items !: ISideMenu[]
  @Prop() siderCollapsed !: boolean

  public itemOpened = {
    key: '',
    state: false
  }

  showItem(item: ISideMenu) {
    if (this.siderCollapsed || !item.hasOwnProperty('children') || !item.children.length ) {return false}
    console.log(item);
    this.itemOpened = this.itemOpened.key == item.key
        ? {key: '', state: false}
        : {key: item.key, state: true}
  }
  retFalse() {
    return false
  }

}
</script>
