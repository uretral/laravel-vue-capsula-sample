<template>
  <component :is="component"  v-if="component" :manageItem="manageItem" :lists="lists"></component>
</template>

<script>

export default {
  props: ['type', 'manageItem','lists'],
  data() {
    return {
      component: null,
    }
  },
  computed: {
    loader() {
      if (!this.type) {
        return null
      }
      return () => import(`./cellInputs/${this.type}`)
    },
  },
  mounted() {
    this.loader().then(() => {
          this.component = () => this.loader()
        }).catch(() => {
          this.component = () => import('./cellInputs/InputDefault.vue')
        })
  },
}
</script>
