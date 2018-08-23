<template>
    <div class="ticketsTop">
        <header>
            <h4>{{title}}</h4>
            <div class="icon-ticket">
                <img v-if="_index<3" src="@/assets/TOP10.png" alt="">
                <img v-else src="@/assets/TAIL10.png" alt="">
            </div>
            <p><span class="btn-left" :class="[toggleName == 'sum' ? 'actived' : '']"
                     @click="handleChange('sum')">总量</span>
                <span class="btn-right" :class="[toggleName == 'average' ? 'actived' : '']"
                      @click="handleChange('average')">日均</span></p>
        </header>
        <div class="content">
            <div v-if="toggleName == 'sum'">
                <p v-for="(item, index) in list" :key="index">
                    <strong>{{item.shop_name}}&nbsp;&nbsp;</strong>
                    <span>{{item.main_info}}</span>
                    <Progress v-if="index=3" :percent="item.r_sum | percent" hide-info/>
                    <Progress v-else :percent="item.r_sum | percent" status="wrong" hide-info/>
                    <i v-if="_index == 0 || _index == 3">{{item.v_sum}}</i>
                    <i v-else>{{item.v_sum}}（{{item.r_sum | percent}}%）</i>
                </p>
            </div>

            <div v-if="toggleName == 'average'">
                <p v-for="(item, index) in list" :key="index">
                    <strong>{{item.shop_name}}&nbsp;&nbsp;</strong>
                    <span>{{item.main_info}}</span>
                    <Progress v-if="index<3" :percent="item.r_avg | percent" hide-info/>
                    <Progress v-else :percent="item.r_avg | percent" status="wrong" hide-info/>
                    <i v-if="_index == 0 || _index == 3">{{item.v_avg.toFixed(0)}}</i>
                    <i v-else>{{item.v_avg.toFixed(0)}}（{{item.r_avg | percent}}%）</i>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {sort} from "@/utils/filter.js";

    export default {
        name: "ticketsTop",
        data() {
            return {
                toggleName: "sum"
            };
        },
        props: {
            _index: {
                type: Number
            },
            title: {
                type: String
            },
            progress: {
                type: Array,
                required: true
            }
        },
        computed: {
            list() {
                return sort(this.progress, "seq", "asc");
            }
        },
        filters: {
            percent: function (value) {
                if (!value) return;
                return Number((value * 100).toFixed(3));
            }
        },
        methods: {
            handleChange(e) {
                this.toggleName = e;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/style/public.scss";

    .ticketsTop {
        width: 353px;
        padding: 2rem 1rem;
        border: 1px solid $color-border;
        box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04);
        header {
            display: flex;
            align-items: flex-end;
            margin-bottom: 34px;
            h4 {
                flex: 1;
                width: 33px;
                height: 19px;
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(42, 57, 98, 1);
                line-height: 19px;
                padding-right: 5px;
                position: relative;
                top: 2px;
            }
            .icon-ticket {
                line-height: 10px;
                padding-right: 115px;
            }

            p {
                flex: 2;
                float: left;
                span {
                    display: inline-block;
                    cursor: pointer;
                    width: 2.75rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    text-align: center;
                }
                .btn-left {
                    color: $color-primary;
                    border: 1px solid $color-primary;
                    border-top-left-radius: 0.8rem;
                    border-bottom-left-radius: 0.8rem;
                }
                .btn-right {
                    color: $color-primary;
                    border: 1px solid $color-primary;
                    border-top-right-radius: 0.8rem;
                    border-bottom-right-radius: 0.8rem;
                }
                .actived {
                    background: $color-primary;
                    color: #fff;
                }
            }
        }
    }

    .content p {
        width: 326px;
    }

    .content i {
        font-style: normal;
        float: right;
    }
</style>

