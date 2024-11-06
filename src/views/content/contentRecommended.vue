<script setup>
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService';

const display = ref(false);
const products = ref(null);
const checkboxValue = ref([]);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const open = () => {
    display.value = true;
};

const close = () => {
    display.value = false;
};
</script>


<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4>Algorithm-recommended products</h4>
                <div class="card p-3 flex align-items-center">
                    <button type="button" class="btn flex align-items-center justify-content-center bg-blue-100 border-round mr-3" style="width: 2.5rem; height: 2.5rem" @click="open">
                        <i class="pi pi-filter text-blue-500 text-xl"></i>
                    </button>
                    <Dialog header="Filter" v-model:visible="display" :style="{ width: '30vw' }" :modal="true">
                        <div>
                            <div class="field-checkbox mb-0">
                                <Checkbox id="checkOption1" name="option" value="K-FOOD" v-model="checkboxValue" />
                                <label for="checkOption1" class="mr-3">K-FOOD</label>
                                <Checkbox id="checkOption2" name="option" value="Chicago" v-model="checkboxValue" />
                                <label for="checkOption2">NOODLE</label>
                            </div>
                        </div>
                        <template #footer>
                            <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
                        </template>
                    </Dialog>
                    <span class="mr-2">#K-FOOD</span>
                    <span class="mr-2">#NOODLE</span>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>번호</th>
                            <th>상품코드</th>
                            <th>이미지</th>
                            <th>상품명</th>
                            <th>판매가</th>
                            <th>재고</th>
                            <th>Hashtag</th>
                        </tr>
                        <tr v-for="(v, i) in GOODS.LIST?.data" :key="i">
                            <td>{{ i + 1 + nowPage }}</td>
                            <td>{{ v?.goods_code }}</td>
                            <td>
                                <div v-for="(z, x) in v?.img_list" :key="x">
                                    <img v-if="z?.img_code === 'T'" class="thumb-img sm" :src="z?.img_url" />
                                </div>
                            </td>
                            <td class="text-left">
                                <span class="text-grey">{{ v?.depth1_name }} &gt; {{ v?.depth2_name }}</span
                                ><br />
                                [{{ v?.brand_name }}] {{ v?.goods_name }}
                            </td>
                            <td>${{ v?.goods_amt }}</td>
                            <td>{{ v?.goods_inven }}</td>
                            <td>#food #noodle</td>
                        </tr>
                    </table>
                </div>
                <div v-if="GOODS.LIST?.data?.length > 0" class="p-paginator p-component mt-2">
                    <button class="p-paginator-prev p-paginator-element p-link" type="button" :class="{ 'p-disabled': GOODS.LIST?.pageNow === 1 }" :disabled="GOODS.LIST?.pageNow === 1 ? true : false" @click="onClickPageNation(1)">
                        <i class="pi pi-angle-double-left"></i>
                    </button>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        :class="{ 'p-disabled': GOODS.LIST?.pageNow === 1 }"
                        :disabled="GOODS.LIST?.pageNow === 1 ? true : false"
                        type="button"
                        @click="onClickPageNation(GOODS.LIST?.pageNow - 1)"
                    >
                        <i class="pi pi-angle-left"></i>
                    </button>
                    <span class="p-paginator-pages" data-pc-section="pages">
                        <!-- pageNow -->
                        <template v-for="i in 10" :key="i">
                            <button
                                v-if="GOODS.LIST?.page >= i + GOODS.LIST?.pageNow - 1"
                                :class="{ 'p-highlight': GOODS.LIST?.pageNow === i + GOODS.LIST?.pageNow - 1 }"
                                class="p-paginator-page p-paginator-element p-link"
                                type="button"
                                @click="onClickPageNation(i + GOODS.LIST?.pageNow - 1)"
                            >
                                {{ i + GOODS.LIST?.pageNow - 1 }}
                            </button>
                        </template>
                    </span>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': GOODS.LIST?.pageNow === GOODS.LIST?.page }"
                        :disabled="GOODS.LIST?.pageNow === GOODS.LIST?.page ? true : false"
                        @click="onClickPageNation(GOODS.LIST?.pageNow + 1)"
                    >
                        <i class="pi pi-angle-right"></i>
                    </button>
                    <button
                        class="p-paginator-prev p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': GOODS.LIST?.pageNow === GOODS.LIST?.page }"
                        :disabled="GOODS.LIST?.pageNow === GOODS.LIST?.page ? true : false"
                        @click="onClickPageNation(GOODS.LIST?.page)"
                    >
                        <i class="pi pi-angle-double-right"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h4><strong>Products similar to my items for sale</strong></h4>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h4><strong>Trending products</strong></h4>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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
            calendarValue: '',
            calendarValue2: '',
            router: useRouter()
        };
    },
    computed: {
        ...mapState(['GOODS'])
    },
    components: {},
    created() {},
    mounted() {
        this.ACTION_GOODS_LIST({ mode: 'list' });
    },
    methods: {
        ...mapActions(['ACTION_GOODS_LIST']),
        async onClickPageNation(p, n) {
            const params = {
                mode: 'list',
                page: p
            };

            if (this.$route.query?.t) {
                params[this.$route.query?.t] = this.$route.query?.q;
            }

            await this.ACTION_GOODS_LIST(params);
            this.nowPage = (p - 1) * 10;
        },
        onSubmitSearch() {
            const params = {
                mode: 'list',
                cate: '5790757'
            };
            params[this.dropdownValue.code] = this.searchStr;

            this.ACTION_MEMBER_LIST(params);
            this.router.push(`/shop/productad?t=${this.dropdownValue.code}&q=${this.searchStr}`);
            // this.onClickPageNation(1);
        },
        onClickResetSearch() {
            this.router.push(`/shop/productad`);
            this.searchStr = '';
            this.dropdownValue = { name: 'id', code: 'mb_id' };
            this.ACTION_MEMBER_LIST({ mode: 'list' });
        }
    }
};
</script>


<style>
</style>