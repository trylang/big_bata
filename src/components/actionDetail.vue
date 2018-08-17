<template>
    <div class="download_container">
        <Icon @click="modal1 = true" class="export iconfont icon-icon-xiazai"/>
        <Modal
                v-model="modal1"
                width="604px"
                title="数据详情下载筛选"
                @on-ok="ok"
                @on-cancel="cancel">
            <div class="accumulative_total">
                <span class="time_chance">时间选择</span>
                <DatePicker type="daterange" placement="bottom-end" placeholder="请选择"
                            style="width: 296px;margin-left: 2rem;"></DatePicker>
            </div>
            <div class="filtrate">
                <span class="filtrate_s">条件筛选</span>
                <span class="filtrate_m">
                <span v-for="(item,index) of info" :key="index">
                    <span>{{item.name}}：</span>   
                    <Select style="width:100px">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </span>
                </span>
            </div>
            <div class="dimension">
                <p style="float:left">指标维度</p>
                <div class="check_all " style="padding-bottom:6px;margin-bottom:6px;">
                    <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全选
                    </Checkbox>
                </div>
                <CheckboxGroup style="margin-left:3rem" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                    <Checkbox label="客流1"></Checkbox>
                    <Checkbox label="客流2"></Checkbox>
                    <Checkbox label="客流3"></Checkbox>
                    <Checkbox label="客流1"></Checkbox>
                    <Checkbox label="客流2"></Checkbox>
                    <Checkbox label="客流3"></Checkbox>
                    <Checkbox label="客流1"></Checkbox>
                    <Checkbox label="客流2"></Checkbox>
                    <Checkbox label="客流1"></Checkbox>
                    <Checkbox label="客流2"></Checkbox>
                </CheckboxGroup>
            </div>
        </Modal>
    </div>
</template>
<script>
    export default {
        name: "actionDetail",
        data() {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['客流1', '客流2'],
                modal1: false,
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
                info: [
                    {name: '建筑物'},
                    {name: '楼层'},
                    {name: '业态'},
                    {name: '店铺'}
                ]
            };
        },
        methods: {
            ok() {
                this.$Message.info("Clicked ok");
            },
            cancel() {
                this.$Message.info("Clicked cancel");
            },
            handleCheckAll() {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['客流'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange(data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    };
</script>
<style lang="scss" scoped>
</style>
