<template>
    <v-card>
        <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title 
                    v-text="requestItem.originMainDomain.toString() 
                            + ' ---> ' + requestItem.requestMainDomain.toString()"/>
            </v-list-tile-content>
            <v-list-tile-action>
                <v-btn :icon="true" @click="$emit('delete', requestItem)">
                    <v-icon color="red">delete</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
    </v-card>
</template>
<script lang="ts">
import { RequestItem } from "../RemoveReferer/RequestItem";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
    @Prop({type: RequestItem, required: true})
    public requestItem!: RequestItem;
}
</script>

