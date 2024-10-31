<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>Content list</strong></h4>
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
                    <div class="left">Total {{ CONTENT.LIST?.total }}</div>
                    <div class="right">
                        <!-- <Button label="Add" severity="secondary" @click="router.push('/event/add')" /> -->
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>thumb</th>
                            <th>item code</th>
                            <th>item name</th>
                            <th>title</th>
                            <th>like</th>
                            <th>view</th>
                            <th>name</th>
                            <th>link</th>
                            <th>use</th>
                        </tr>
                        <tr v-for="(v, i) in CONTENT.LIST?.data" :key="i">
                            <td class="text-left" @click="router.push('/event/add?code=' + v?.idx)">
                                <img :src="v?.youtube_thumb" width="150" onerror="this.style='display:none';" />
                            </td>
                            <td>{{ v?.goods_code }}</td>
                            <td style="text-align: left">{{ v?.goods_name }}</td>
                            <td style="text-align: left">{{ v?.youtube_title }}</td>
                            <td>
                                {{ v?.view }} <br />
                                ({{ v?.youtube_view }})
                            </td>
                            <td>
                                {{ v?.view }} <br />
                                ({{ v?.youtube_like }})
                            </td>
                            <td style="text-align: left">{{ v?.mb_name }}</td>

                            <td>
                                <Button label="go" outlined @click="onClickGotoUrl(v?.youtube_url)" />
                            </td>
                            <td><Button :class="{ 'p-button-danger': v?.auth_yn === 'N' }" :label="v?.auth_yn === 'Y' ? 'enbled' : 'disabled'" outlined @click="onClickUseYn(v?.auth_yn, v?.idx)" /></td>
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