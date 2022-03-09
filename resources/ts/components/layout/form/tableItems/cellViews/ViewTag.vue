<template>
  <span class="h-tag" :class="manage.view_class">{{strValue}}</span>
</template>

<script lang="ts">
import {Component, Mixins, Prop, Vue} from 'vue-property-decorator'
import cellViewsMixin from "../../../../../mixins/layout/cellViewsMixin";

    @Component
    export default class ViewTag extends Mixins(cellViewsMixin) {}
</script>
