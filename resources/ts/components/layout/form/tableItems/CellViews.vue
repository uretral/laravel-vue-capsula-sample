<template>
  <component :is="component" :item="item" :manage="manage" v-if="component"/>
</template>

<script>

export default {
  props: ['item', 'type', 'manage'],
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
      return () => import(`./cellViews/${this.type}`)
    },
  },
  mounted() {
    this.loader()
        .then(() => {
          this.component = () => this.loader()
        })
        .catch(() => {
          this.component = () => import('./cellViews/ViewDefault.vue')
        })
  },
}
</script>
