<template>
    <div>
        <v-layout :row="true">
            <v-flex :xs12="true">
                <v-list>
                    <item v-for="item in items" :key="item.toString()" :request-item="item"/>
                </v-list>
            </v-flex>
        </v-layout>
        <v-fab-transition>
            <v-btn :fab="true" :bottom="true" :right="true" color="pink" :dark="true" :fixed="true" @click="dialog = true">
                <v-icon>add</v-icon>
            </v-btn>
        </v-fab-transition>
        <add-item-dialog v-model="dialog" max-width="500px"/>
        <!-- <v-dialog v-model="dialog">
            <v-card>
                <v-card-text>
                    <v-text-field label="File name"></v-text-field>
                    <small class="grey--text">* This doesn't actually save.</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" @click="dialog = false">Submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from 'vue-class-component';
import Item from "./Item.vue";
import AddItemDialog from "./AddItemDialog.vue";
import { MainDomainWhiteList } from "../RemoveReferer/MainDomainWhiteList";
import * as Collections from 'typescript-collections';
import { RequestItem } from "../RemoveReferer/RequestItem";
// import { MainDomain } from "../Domain/MainDomain";

@Component({
    components: { Item, AddItemDialog }
})
export default class extends Vue {

    // items: RequestItem[] = [new RequestItem(MainDomain.parse("baidu.com"), MainDomain.parse("bilibili.com"))];
    public items: RequestItem[] = [];
    public dialog: boolean = false;

    public async mounted() {
        const list: MainDomainWhiteList = await MainDomainWhiteList.loadWithAutoReload();
        this.items = list.getWhiteListArray();
        list.dataChanged.attach((data: Collections.Set<RequestItem>) => {
            this.items = data.toArray();
        });
    }
}
</script>

