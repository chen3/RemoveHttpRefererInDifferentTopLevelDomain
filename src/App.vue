<template>
    <v-app id="app">
        <v-navigation-drawer :app="true" v-model="drawer" :temporary="true">
            <v-list :dense="true">
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon>mdi-playlist-check</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>白名单</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer> 
        <v-toolbar color="indigo" :dark="true" :fixed="true" :app="true">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>白名单</v-toolbar-title>
        </v-toolbar>
        <v-content>

        </v-content>
    </v-app>
</template>
<script lang="ts">
import Vue from 'vue'
import "@mdi/font"
export default Vue.extend({
    data: () => ({
        drawer: null
    })
})
</script>

