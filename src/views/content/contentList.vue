<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4>My content</h4>
                <div class="search-wrap grid pt-0 pb-3">
                    <div class="left">
                        <div class="flex align-items-center mt-3">
                            <label class="label mr-3">Title Search</label>
                            <IconField iconPosition="left">
                                <InputText type="text" placeholder="Search" />
                                <InputIcon class="pi pi-search" />
                            </IconField>
                        </div>
                        <div class="flex align-items-center mt-3">
                            <label class="label mr-3">Period Search</label>
                            <Calendar :showIcon="true" :yearNavigator="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                            <span class="between ml-2 mr-2">~</span>
                            <Calendar :showIcon="true" :yearNavigator="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                        </div>
                        <div class="flex align-items-center mt-3">
                            <label class="label mr-3">Category Search</label>
                            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                        </div>
                    </div>

                    <div class="right mt-3">
                        <Button label="Search" class="mr-2" />
                        <Button label="Reset" severity="secondary" />
                    </div>
                </div>

                <div class="table-top">
                    <div class="left">Total {{ CONTENT.LIST?.total }}</div>
                    <div class="right">
                        <Dropdown v-model="dropdownValue2" :options="dropdownValues2" optionLabel="name" placeholder="Sort by" />
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>thumb</th>
                            <th>item name</th>
                            <th>title</th>
                            <th>upload date</th>
                            <th>category</th>
                            <th>like</th>
                            <th>view</th>
                            <th>link</th>
                        </tr>
                        <tr v-for="(v, i) in CONTENT.LIST?.data" :key="i">
                            <td @click="router.push('/event/add?code=' + v?.idx)">
                                <img :src="v?.youtube_thumb" width="150" onerror="this.style='display:none';" />
                            </td>
                            <td style="text-align: left; min-width: 200px">{{ v?.goods_name }}</td>
                            <td style="text-align: left; min-width: 200px">{{ v?.youtube_title }}</td>
                            <td>업로드 날짜</td>
                            <td>카테고리</td>
                            <td>
                                {{ v?.view }} <br />
                                ({{ v?.youtube_view }})
                            </td>
                            <td>
                                {{ v?.view }} <br />
                                ({{ v?.youtube_like }})
                            </td>
                            <td>
                                <Button label="go" outlined @click="onClickGotoUrl(v?.youtube_url)" />
                            </td>
                        </tr>
                    </table>
                </div>
                <div v-if="CONTENT.LIST?.data?.length > 0" class="p-paginator p-component mt-2">
                    <button class="p-paginator-prev p-paginator-element p-link" type="button" :class="{ 'p-disabled': CONTENT.LIST?.pageNow === 1 }" :disabled="CONTENT.LIST?.pageNow === 1 ? true : false" @click="onClickPageNation(1)">
                        <i class="pi pi-angle-double-left"></i>
                    </button>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        :class="{ 'p-disabled': CONTENT.LIST?.pageNow === 1 }"
                        :disabled="CONTENT.LIST?.pageNow === 1 ? true : false"
                        type="button"
                        @click="onClickPageNation(CONTENT.LIST?.pageNow - 1)"
                    >
                        <i class="pi pi-angle-left"></i>
                    </button>
                    <span class="p-paginator-pages" data-pc-section="pages">
                        <!-- pageNow -->
                        <button v-for="(v, i) in CONTENT.LIST?.page" :key="i" :class="{ 'p-highlight': CONTENT.LIST?.pageNow === i + 1 }" class="p-paginator-page p-paginator-element p-link" type="button" @click="onClickPageNation(i + 1)">
                            {{ i + 1 }}
                        </button>
                    </span>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': CONTENT.LIST?.pageNow === CONTENT.LIST?.page }"
                        :disabled="CONTENT.LIST?.pageNow === CONTENT.LIST?.page ? true : false"
                        @click="onClickPageNation(CONTENT.LIST?.pageNow + 1)"
                    >
                        <i class="pi pi-angle-right"></i>
                    </button>
                    <button
                        class="p-paginator-prev p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': CONTENT.LIST?.pageNow === CONTENT.LIST?.page }"
                        :disabled="CONTENT.LIST?.pageNow === CONTENT.LIST?.page ? true : false"
                        @click="onClickPageNation(CONTENT.LIST?.page)"
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
import { useRouter } from 'vue-router';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {
            dropdownValues: ref([
                { name: 'select1', code: '1' },
                { name: 'select2', code: '2' },
                { name: 'select3', code: '3' }
            ]),
            dropdownValue: ref(null),
            dropdownValues2: ref([
                { name: 'select1', code: '1' },
                { name: 'select2', code: '2' },
                { name: 'select3', code: '3' }
            ]),
            dropdownValue2: ref(null),
            router: useRouter(),
            checkboxValue: ref([]),
            ratingValue: ref(4)
        };
    },
    components: {},
    computed: {
        ...mapState(['CONTENT'])
    },
    created() {},
    mounted() {
        this.ACTION_CONTENT_LIST({ mode: 'listAdmin' });
    },
    methods: {
        ...mapActions(['ACTION_CONTENT_LIST', 'ACTION_CONTENT_USE']),
        onClickPageNation(p, n) {
            const params = {
                mode: 'list',
                page: p
            };

            if (this.$route.query?.t) {
                params[this.$route.query?.t] = this.$route.query?.q;
            }

            this.ACTION_CONTENT_LIST(params);
        },
        onClickGotoUrl(v) {
            window.open(v);
        },
        onClickUseYn(v, i) {
            const param = {
                mode: 'isUse',
                use_yn: v === 'Y' ? 'N' : 'Y',
                idx: i
            };

            this.ACTION_CONTENT_USE(param);
        }
    }
};
</script>


<style>
</style>