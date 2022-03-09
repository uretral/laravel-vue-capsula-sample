<template>
  <div>
    InputCheckbox
  </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";

@Component
export default class InputCheckbox extends Mixins(cellInputMixin) {}
</script>
