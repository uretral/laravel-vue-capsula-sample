<template>
  <input type="text" v-model="manageItem.input_value"
         style="width: 110px; text-indent: 10px;"
         @change="filter()" autocomplete="off"
         v-mask="manageItem.input_mask"
  >
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";

@Component
export default class InputText extends Mixins(cellInputMixin) {}
</script>
