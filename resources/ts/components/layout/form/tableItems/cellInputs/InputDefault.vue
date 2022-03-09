<template>
  <div>
    input default
  </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from 'vue-property-decorator'
import cellInputMixin from "../../../../../mixins/layout/cellInputMixin";

@Component
export default class InputDefault extends Mixins(cellInputMixin) {

}
</script>
