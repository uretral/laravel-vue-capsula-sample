<template>
  <DatePicker v-else-if="manage.view_type === 'DatePicker'" class="date"
              :value="strValue" :readonly="true" :disabled="true"/>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import cellViewsMixin from "../../../../../mixins/layout/cellViewsMixin";

    @Component
    export default class ViewDatePicker extends Mixins(cellViewsMixin) {}
</script>
