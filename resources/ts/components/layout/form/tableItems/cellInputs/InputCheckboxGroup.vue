<template>
  <div>
    InputCheckboxGroup
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";

@Component
export default class InputCheckboxGroup extends Mixins(cellInputMixin) {}
</script>
