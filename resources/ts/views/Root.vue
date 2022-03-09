<template>
  <router-view></router-view>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import {namespace} from "vuex-class";
    import {IUser, IUsersRoles} from "../types/settings";
    const StoreSettings = namespace('StoreSettings')
    @Component
    export default class Root extends Vue {
      @StoreSettings.Mutation('setUser') setUser!: (payload: IUser) => void
      @StoreSettings.Mutation('setRoles') setRoles!: (payload: IUsersRoles) => void
      @StoreSettings.Mutation('setNamespace') setNamespace!: (payload: string) => void
      @StoreSettings.Mutation('setManageBlocks') setManageBlocks!: (payload) => void

      // async mounted

      async created() {

        if (this.$attrs.hasOwnProperty('settings') && this.$attrs.settings.hasOwnProperty('user')) {
           this.setUser(this.$attrs.settings['user'])
        }
        if (this.$attrs.hasOwnProperty('settings') && this.$attrs.settings.hasOwnProperty('roles')) {
           this.setRoles(this.$attrs.settings['roles'])
        }
        if (this.$attrs.hasOwnProperty('settings') && this.$attrs.settings.hasOwnProperty('namespace')) {
          this.setNamespace(this.$attrs.settings['namespace'])
        }
        if (this.$attrs.hasOwnProperty('settings') && this.$attrs.settings.hasOwnProperty('manage')) {
          this.setManageBlocks(this.$attrs.settings['manage'])
        }

      }
    }
</script>
