<template>
    <div>
        <Icon @click="modal1 = true" class="export" type="md-download" />
    <Modal
        v-model="modal1"
        title="数据详情下载筛选"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>时间选择
           <CheckboxGroup v-model="fruit">
            <Checkbox label="当日累计"></Checkbox>
            <Checkbox label="当周累计"></Checkbox>
            <Checkbox label="当月累计"></Checkbox>
           </CheckboxGroup>
        </p>
        <p>条件筛选</p>
        <p>指标维度
            <!-- <Dropdown>
                <a href="javascript:void(0)">
                    下拉菜单
                <Icon type="ios-arrow-down"></Icon>
            </a>
                <DropdownMenu slot="list">
                    <DropdownItem>驴打滚</DropdownItem>
                    <DropdownItem>炸酱面</DropdownItem>
                    <DropdownItem disabled>豆汁儿</DropdownItem>
                    <DropdownItem>冰糖葫芦</DropdownItem>
                    <DropdownItem divided>北京烤鸭</DropdownItem>
                </DropdownMenu>
            </Dropdown> -->
        </p>
    </Modal>
    </div>
</template>
<script>
export default {
    name: "downloadBounced",
    data() {
        return {
            modal1: false,
            fruit: ['当日累计', '当周累计', '当月累计']
        };
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
.export {
  margin-top: -0.5rem;
  cursor: pointer;
  font-size: 24px;
  float: right;
}
</style>
<style>
.ivu-modal-content {
  width: 640px;
  height: 436px;
  margin-left: -3rem;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
