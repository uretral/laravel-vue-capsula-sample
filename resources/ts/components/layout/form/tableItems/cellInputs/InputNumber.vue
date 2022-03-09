<template>
  <input type="text" v-model.number="manageItem.input_value"
         style="width: 110px; text-indent: 10px;"
         @change="filter()" autocomplete="off"
  >
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";

@Component
export default class InputNumber extends Mixins(cellInputMixin) {}
</script>
