<template>
    <v-dialog v-model="dialogVisibled" v-bind="$props" :persistent="true" @keydown="$emit('keydown', $event)">
        <v-card>
            <v-card-title>
                <span class="headline">添加</span>
            </v-card-title>
            <v-card-text>
                <v-text-field label="原始主域名" v-model="originMainDomain" :autofocus="true" />
                <v-text-field label="请求主域名" v-model="requestMainDomain"/>
                <p class="grey--text">请输入类似于baidu.com、google.com等主域名.</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" @click="dialogVisibled = false">取消</v-btn>
                <v-btn flat color="primary" @click="dialogVisibled = false">添加</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit, Model, Watch } from "vue-property-decorator";
import { RequestItem } from "../RemoveReferer/RequestItem";
import { MainDomain } from "../Domain/MainDomain";

@Component
export default class AddItemDialog extends Vue {
    @Prop(Boolean)
    public disabled!: boolean;
    @Prop({ default: "none", type: [String, Number] })
    public maxWidth!: string | number;
    // @Prop([String, Number])
    // maxWidth: string | number = "none";
    @Prop({ default: "auto", type: [String, Number] })
    public width!: string | number;
    // @Prop([String, Number])
    // width: string | number = "auto";
    @Prop(Boolean)
    public scrollable!: boolean;

    @Model("visible", { type: Boolean }) 
    public visibled!: boolean;

    private get dialogVisibled() {
        return this.visibled;
    }

    private set dialogVisibled(newValue: boolean) {
        if (newValue !== this.dialogVisibled) {
            this.$emit("visible", newValue);
        }
    }

    private originMainDomain: string = "";
    private requestMainDomain: string = "";
    
}
</script>
