<template>
    <div class="action_container">
        <button class="new_action ios-add" type="button" @click="modal11 = true">
            <Icon type="ios-add"/>
            <span>新建</span>
        </button>
        <Modal
                v-model="modal11"
                width="416px"
                title="新建动作"
                @on-ok="ok"
                @on-cancel="cancel">
            <div class="action"><span class="action_name">动作名称</span>
                <input placeholder="请输入动作名称"/>
            </div>
            <div class="action"><span class="action_name">关联活动</span>
                <Select v-model="model1" style="width:296px;">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
            <div class="action"><span class="action_name">生效时间</span>
                <DatePicker type="daterange" placement="bottom-end" placeholder="请选择" style="width: 296px"></DatePicker>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: "newAction",
        data() {
            return {
                modal11: false,
                cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: ''
            }
        },
        methods: {
            ok() {
                this.$Message.info("Clicked ok");
            },
            cancel() {
                this.$Message.info("Clicked cancel");
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "@/assets/style/components/filterBox.scss";
</style>
<style>
    .action .ivu-select {
        border: 1px solid #f2f2f2;
        border-radius: 4px;
    }
</style>


