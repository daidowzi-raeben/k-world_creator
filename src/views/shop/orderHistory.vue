<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>주문내역</strong></h4>
                <div class="search-wrap grid">
                    <div class="left">
                        <label class="label">주문 검색</label>
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />

                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <IconField iconPosition="left">
                                    <InputText type="text" placeholder="Search" />
                                    <InputIcon class="pi pi-search" />
                                </IconField>
                            </div>
                        </div>

                        <label class="label">기간 검색</label>
                        <Dropdown v-model="dropdownValue2" :options="dropdownValues2" optionLabel="name" placeholder="Select" />
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                        <span>~</span>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue2" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                    </div>

                    <div class="right">
                        <Button label="Search" class="mr-2" />
                        <Button label="Reset" />
                    </div>
                </div>

                <TabMenu :model="nestedRouteItems" />

                <div class="table-top mt-4">
                    <div class="left">Total {{ ORDERS.LIST?.total }}</div>
                    <div class="right">
                        <!-- <Button label="숨김해제" severity="secondary" class="mr-2" /> -->
                        <Button label="수기등록" severity="secondary" />
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <!-- <th>
                                <div class="field-checkbox mb-0">
                                    <Checkbox id="checkOption1" name="option" value="all" v-model="checkboxValue" />
                                </div>
                            </th> -->
                            <th>번호</th>
                            <th>주문일시</th>
                            <th>주문번호</th>
                            <th>주문자</th>
                            <th>주문상품</th>
                            <th>총 배송비</th>
                            <th>총 주문금액</th>
                            <th>결제방법</th>
                            <th>결제상태</th>
                            <th>배송상태</th>
                        </tr>
                        <tr v-for="(v, i) in ORDERS.LIST?.data" :key="i">
                            <td>{{ i + 1 + nowPage }}</td>
                            <td>{{ v?.c_datetime }}</td>
                            <td>{{ v?.order_code }}</td>
                            <td>{{ v?.o_name }}</td>
                            <td>{{ v?.goods_name }} {{ Number(v?.cnt) - 1 < 1 ? '' : '외' + Number(Number(v?.cnt) - 1) + '개' }}<br />{{ v?.option_title }}</td>
                            <td>{{ v?.amt_ship_cost }}</td>
                            <td>{{ numberFloor(v?.amount) }}</td>
                            <td>{{ v?.payment }}</td>
                            <td>{{ v?.status }}</td>
                            <td>배송상태</td>
                        </tr>
                    </table>
                    <div v-if="ORDERS.LIST?.data?.length === 0" class="table-nodata">검색된 주문이 없습니다.</div>
                </div>
                <div v-if="ORDERS.LIST?.data?.length > 0" class="p-paginator p-component mt-2">
                    <button class="p-paginator-prev p-paginator-element p-link" type="button" :class="{ 'p-disabled': ORDERS.LIST?.pageNow === 1 }" :disabled="ORDERS.LIST?.pageNow === 1 ? true : false" @click="onClickPageNation(1)">
                        <i class="pi pi-angle-double-left"></i>
                    </button>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        :class="{ 'p-disabled': ORDERS.LIST?.pageNow === 1 }"
                        :disabled="ORDERS.LIST?.pageNow === 1 ? true : false"
                        type="button"
                        @click="onClickPageNation(ORDERS.LIST?.pageNow - 1)"
                    >
                        <i class="pi pi-angle-left"></i>
                    </button>
                    <span class="p-paginator-pages" data-pc-section="pages">
                        <!-- pageNow -->
                        <template v-for="i in 10" :key="i">
                            <button
                                v-if="ORDERS.LIST?.page >= i + ORDERS.LIST?.pageNow - 1"
                                :class="{ 'p-highlight': ORDERS.LIST?.pageNow === i + ORDERS.LIST?.pageNow - 1 }"
                                class="p-paginator-page p-paginator-element p-link"
                                type="button"
                                @click="onClickPageNation(i + ORDERS.LIST?.pageNow - 1)"
                            >
                                {{ i + ORDERS.LIST?.pageNow - 1 }}
                            </button>
                        </template>
                    </span>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': ORDERS.LIST?.pageNow === ORDERS.LIST?.page }"
                        :disabled="ORDERS.LIST?.pageNow === ORDERS.LIST?.page ? true : false"
                        @click="onClickPageNation(ORDERS.LIST?.pageNow + 1)"
                    >
                        <i class="pi pi-angle-right"></i>
                    </button>
                    <button
                        class="p-paginator-prev p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': ORDERS.LIST?.pageNow === ORDERS.LIST?.page }"
                        :disabled="ORDERS.LIST?.pageNow === ORDERS.LIST?.page ? true : false"
                        @click="onClickPageNation(ORDERS.LIST?.page)"
                    >
                        <i class="pi pi-angle-double-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            nowPage: 0,
            dropdownValues: ref([
                { name: 'select1', code: '1' },
                { name: 'select2', code: '2' },
                { name: 'select3', code: '3' }
            ]),
            dropdownValue: ref(null),
            dropdownValues2: ref([{ name: '주문일', code: '1' }]),
            dropdownValue2: ref(null),
            calendarValue: ref(null),
            calendarValue2: ref(null),
            nestedRouteItems: ref([
                {
                    label: '전체'
                },
                {
                    label: '입금대기'
                },
                {
                    label: '결제완료'
                },
                {
                    label: '상품준비중'
                },
                {
                    label: '배송중'
                },
                {
                    label: '배송완료'
                },
                {
                    label: '구매확정'
                }
            ]),
            checkboxValue: ref([])
        };
    },
    computed: {
        ...mapState(['ORDERS'])
    },
    components: {},
    created() {},
    mounted() {
        const mode = {
            mode: 'listAdmin'
        };
        this.ACTION_ORDER_LIST(mode);
    },
    methods: {
        ...mapActions(['ACTION_ORDER_LIST']),
        async onClickPageNation(p, n) {
            const params = {
                mode: 'listAdmin',
                page: p
            };

            if (this.$route.query?.t) {
                params[this.$route.query?.t] = this.$route.query?.q;
            }

            await this.ACTION_ORDER_LIST(params);
            this.nowPage = (p - 1) * 10;
        },
        numberFloor(v) {
            // console.log(v);
            if (v) return Number(v).toFixed(2);
        }
    }
};
</script>


<style>
</style>