<template>
  <span class="h-tag">{{strValue}}</span>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Vue} from 'vue-property-decorator'
import cellViewsMixin from "../../../../../mixins/layout/cellViewsMixin";

    @Component
    export default class ViewDefault extends Mixins(cellViewsMixin) {

    }
</script>
