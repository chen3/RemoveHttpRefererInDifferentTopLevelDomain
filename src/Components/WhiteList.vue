<template>
    <div>
        <v-layout :row="true">
            <v-flex :xs12="true">
                <v-list>
                    <list-item v-for="item in items" :key="item.toString()" :request-item="item" @delete="handleDelete"/>
                </v-list>
            </v-flex>
        </v-layout>
        <v-fab-transition>
            <v-btn :fab="true" :bottom="true" :right="true" color="pink" :dark="true" :fixed="true" @click="dialog = true">
                <v-icon>add</v-icon>
            </v-btn>
        </v-fab-transition>
        <add-item-dialog v-model="dialog" max-width="500px" @add="handleAddItem"/>
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import ListItem from "./ListItem.vue";
import AddItemDialog from "./AddItemDialog.vue";
import { MainDomainWhiteList } from "../RemoveReferer/MainDomainWhiteList";
import * as Collections from 'typescript-collections';
import { RequestItem } from "../RemoveReferer/RequestItem";

@Component({
    components: { ListItem, AddItemDialog }
})
export default class extends Vue {

    public items: RequestItem[] = [];
    public dialog: boolean = false;

    private list!: MainDomainWhiteList;

    public async mounted() {
        this.list = await MainDomainWhiteList.loadWithAutoReload();
        this.items = this.list.getWhiteListArray();
        this.list.dataChanged.attach((data: Collections.Set<RequestItem>) => {
            this.items = data.toArray();
        });
    }

    private handleAddItem(item: RequestItem) {
        this.list.add(item);
    }

    private handleDelete(item: RequestItem) {
        this.list.remove(item);
    }
}
</script>

