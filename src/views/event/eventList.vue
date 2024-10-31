<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>Event Banner</strong></h4>
                <!-- <div class="search-wrap grid">
                    <div class="left">
                        <label class="label">후기 검색</label>
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                        <Dropdown v-model="dropdownValue2" :options="dropdownValues2" optionLabel="name" placeholder="Select" />

                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <IconField iconPosition="left">
                                    <InputText type="text" placeholder="Search" />
                                    <InputIcon class="pi pi-search" />
                                </IconField>
                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <Button label="Search" class="mr-2" />
                        <Button label="Reset" />
                    </div>
                </div> -->

                <div class="table-top">
                    <div class="left">Total {{ BANNER.LIST?.total }}</div>
                    <div class="right">
                        <Button label="Add" severity="secondary" @click="router.push('/event/add')" />
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>image</th>
                            <th>location</th>
                            <th>item code</th>
                            <th>item name</th>
                            <th>sort</th>
                            <th>use</th>
                        </tr>
                        <tr v-for="(v, i) in BANNER.LIST?.data" :key="i">
                            <td class="text-left" @click="router.push('/event/add?code=' + v?.idx)">
                                <img :src="v?.img_url" width="150" />
                            </td>
                            <td v-if="v?.event_page === 'K'">search banner</td>
                            <td v-if="v?.event_page === 'P'">main popup banner</td>
                            <td v-if="v?.event_page === 'M'">main visual banner</td>
                            <td v-if="v?.event_page === 'S'">category page banner</td>
                            <td v-if="v?.event_page === 'C'">content main banner</td>
                            <td v-if="v?.event_page === 'W'">content weekly ranking banner</td>
                            <td>{{ v?.goods_code }}</td>
                            <td style="text-align: left">{{ v?.goods_name }}</td>
                            <td style="text-align: center">{{ v?.sort }}</td>
                            <td><Button :class="{ 'p-button-danger': v?.use_yn === 'N' }" :label="v?.use_yn === 'Y' ? 'enbled' : 'disabled'" outlined @click="onClickUseYn(v?.use_yn, v?.idx)" /></td>
                        </tr>
                    </table>
                </div>
                <div v-if="BANNER.LIST?.data?.length > 0" class="p-paginator p-component mt-2">
                    <button class="p-paginator-prev p-paginator-element p-link" type="button" :class="{ 'p-disabled': BANNER.LIST?.pageNow === 1 }" :disabled="BANNER.LIST?.pageNow === 1 ? true : false" @click="onClickPageNation(1)">
                        <i class="pi pi-angle-double-left"></i>
                    </button>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        :class="{ 'p-disabled': BANNER.LIST?.pageNow === 1 }"
                        :disabled="BANNER.LIST?.pageNow === 1 ? true : false"
                        type="button"
                        @click="onClickPageNation(BANNER.LIST?.pageNow - 1)"
                    >
                        <i class="pi pi-angle-left"></i>
                    </button>
                    <span class="p-paginator-pages" data-pc-section="pages">
                        <!-- pageNow -->
                        <button v-for="(v, i) in BANNER.LIST?.page" :key="i" :class="{ 'p-highlight': BANNER.LIST?.pageNow === i + 1 }" class="p-paginator-page p-paginator-element p-link" type="button" @click="onClickPageNation(i + 1)">
                            {{ i + 1 }}
                        </button>
                    </span>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': BANNER.LIST?.pageNow === BANNER.LIST?.page }"
                        :disabled="BANNER.LIST?.pageNow === BANNER.LIST?.page ? true : false"
                        @click="onClickPageNation(BANNER.LIST?.pageNow + 1)"
                    >
                        <i class="pi pi-angle-right"></i>
                    </button>
                    <button
                        class="p-paginator-prev p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': BANNER.LIST?.pageNow === BANNER.LIST?.page }"
                        :disabled="BANNER.LIST?.pageNow === BANNER.LIST?.page ? true : false"
                        @click="onClickPageNation(BANNER.LIST?.page)"
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
        ...mapState(['BANNER'])
    },
    created() {},
    mounted() {
        this.ACTION_BANNER_LIST({ mode: 'list' });
    },
    methods: {
        ...mapActions(['ACTION_BANNER_LIST', 'ACTION_BANNER_USE']),
        onClickUseYn(v, i) {
            const param = {
                mode: 'isUse',
                use_yn: v === 'Y' ? 'N' : 'Y',
                idx: i
            };

            this.ACTION_BANNER_USE(param);
        }
    }
};
</script>


<style>
</style>