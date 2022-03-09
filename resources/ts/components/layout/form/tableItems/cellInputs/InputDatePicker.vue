<template>
  <DatePicker class="date" v-model="manageItem.input_value" @change="filter()"/>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";

@Component
export default class InputDatePicker extends Mixins(cellInputMixin) {}
</script>
