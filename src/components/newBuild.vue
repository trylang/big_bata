<template>
    <div>
        <input class="new_action" @click="modal11 = true" type="button" value="+ 新建">
    <Modal
        v-model="modal11"
        title="数据详情下载筛选"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>时间选择
            <!-- <Checkbox v-model="single">当日累计</Checkbox>
            <Checkbox v-model="single">当周累计</Checkbox>
            <Checkbox v-model="single">当月累计</Checkbox> -->
        </p>
        <p>条件筛选</p>
        <p>指标维度
        </p>
    </Modal>
    </div>
</template>
<script>
export default {
    name: "newBuild",
    data() {
        return {
            modal11: false
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
.new_action {
  width: 72px;
  height: 24px;
  background: rgba(57, 111, 255, 1);
  border-radius: 12px;
  border: 0;
  outline: 0;
  color: #ffffff;
  cursor: pointer;
}
</style>


