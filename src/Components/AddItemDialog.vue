<template>
    <v-dialog v-model="dialogVisibled" v-bind="$props" :persistent="true" @keydown="$emit('keydown', $event)">
        <v-card>
            <v-card-title>
                <span class="headline">添加</span>
            </v-card-title>
            <v-card-text>
                <v-text-field label="原始主域名" v-model="originMainDomain" :required="true" 
                    :rules="[mainDomainRule]" :validate-on-blur="true" placeholder="google.com"
                    :autofocus="true"/>
                <v-text-field label="请求主域名" v-model="requestMainDomain" :required="true"
                    :rules="[mainDomainRule]" :validate-on-blur="true" placeholder="bilibili.com"/>
                <p class="grey--text">请输入类似于baidu.com、google.com等主域名.</p>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn flat color="primary" @click="dialogVisibled = false">取消</v-btn>
                <v-btn flat color="primary" @click="add">添加</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog max-width="700px" v-model="messageDialogVisible">
            <v-card>
                <v-card-text>
                    <span>{{message}}</span>
                </v-card-text>
            </v-card>
        </v-dialog>
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

    @Model("update:visibled", { type: Boolean }) 
    public visibled!: boolean;

    private get dialogVisibled() {
        return this.visibled;
    }

    private set dialogVisibled(newValue: boolean) {
        if (newValue !== this.dialogVisibled) {
            this.$emit("update:visibled", newValue);
        }
    }

    private originMainDomain: string = "";
    private requestMainDomain: string = "";

    private mainDomainRule(value: string)  {
        if (value.length === 0) {
            return "必填项";
        }
        if (!MainDomain.isValidDomain(value)) {
            return "不是合格的域名字符串";
        }
        if (value.split(".").length !== 2) {
            return "该字符串不是主域名";
        }
        return true;
    };
    
    private message: string = "";
    private messageDialogVisible: boolean = false;

    private showMessage(message: string) {
        this.message = message;
        this.messageDialogVisible = true;
    }

    private add() {
        try {
            const originMainDomain: MainDomain = MainDomain.parse(this.originMainDomain);
            const requestMainDomain: MainDomain = MainDomain.parse(this.requestMainDomain);
            const requestItem = new RequestItem(originMainDomain, requestMainDomain);
            
            this.dialogVisibled = false;
            this.originMainDomain = "";
            this.requestMainDomain = "";
            this.$emit("add", requestItem);
        }
        catch (exception) {
            this.showMessage(exception);
        }
    }

}
</script>
