<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>point list</strong></h4>
                <form @submit.prevent="onSubmitSearch">
                    <div class="search-wrap grid">
                        <div class="left">
                            <label class="label">회원 검색</label>
                            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />

                            <div class="grid formgrid">
                                <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                    <IconField iconPosition="left">
                                        <InputText type="text" required placeholder="Search" v-model="searchStr" />
                                        <InputIcon class="pi pi-search" />
                                    </IconField>
                                </div>
                            </div>
                        </div>

                        <div class="right">
                            <Button label="Search" type="submit" class="mr-2" />
                            <Button label="Reset" @click="onClickResetSearch" />
                        </div>
                    </div>
                </form>

                <div class="table-top">
                    <div class="left">Total {{ POINT.LIST?.total }}</div>
                    <div class="right">
                        <!-- <Button label="숨김해제" severity="secondary" class="mr-2" /> -->
                        <Button label="등록" severity="secondary" @click="router.push('/user/add')" />
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>식별코드</th>
                            <th>가입경로</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>이메일</th>
                            <th>성별</th>
                            <th>생년월일</th>
                            <th>판매수</th>
                        </tr>
                        <tr v-for="(v, i) in POINT.LIST?.data" :key="i">
                            <td>{{ v?.idnt_code }}</td>
                            <td>{{ onLoadPlatform(v?.platform) }}</td>
                            <td>{{ v?.mb_id }}</td>
                            <td>{{ v?.mb_name }}</td>
                            <td>{{ v?.mb_nation }} {{ v?.mb_cell }}</td>
                            <td>{{ v?.mb_email }}</td>
                            <td>{{ onLoadGender(v?.mb_gender) }}</td>
                            <td>{{ onLoadDateDot(v?.mb_birth) }}</td>
                            <td>{{ v?.b_cnt }}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="POINT.LIST?.list?.length > 0" class="p-paginator p-component mt-2">
                    <button class="p-paginator-prev p-paginator-element p-link" type="button" :class="{ 'p-disabled': POINT.LIST?.pageNow === 1 }" :disabled="POINT.LIST?.pageNow === 1 ? true : false" @click="onClickPageNation(1)">
                        <i class="pi pi-angle-double-left"></i>
                    </button>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        :class="{ 'p-disabled': POINT.LIST?.pageNow === 1 }"
                        :disabled="POINT.LIST?.pageNow === 1 ? true : false"
                        type="button"
                        @click="onClickPageNation(POINT.LIST?.pageNow - 1)"
                    >
                        <i class="pi pi-angle-left"></i>
                    </button>
                    <span class="p-paginator-pages" data-pc-section="pages">
                        <!-- pageNow -->
                        <button v-for="(v, i) in POINT.LIST?.page" :key="i" :class="{ 'p-highlight': POINT.LIST?.pageNow === i + 1 }" class="p-paginator-page p-paginator-element p-link" type="button" @click="onClickPageNation(i + 1)">
                            {{ i + 1 }}
                        </button>
                    </span>
                    <button
                        class="p-paginator-first p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': POINT.LIST?.pageNow === POINT.LIST?.page }"
                        :disabled="POINT.LIST?.pageNow === POINT.LIST?.page ? true : false"
                        @click="onClickPageNation(POINT.LIST?.pageNow + 1)"
                    >
                        <i class="pi pi-angle-right"></i>
                    </button>
                    <button
                        class="p-paginator-prev p-paginator-element p-link"
                        type="button"
                        :class="{ 'p-disabled': POINT.LIST?.pageNow === POINT.LIST?.page }"
                        :disabled="POINT.LIST?.pageNow === POINT.LIST?.page ? true : false"
                        @click="onClickPageNation(POINT.LIST?.page)"
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
import { _dateFormatYmdDot } from '@/js/common.js';
export default {
    data() {
        return {
            dropdownValues: ref([
                { name: 'id', code: 'mb_id' },
                { name: 'name', code: 'mb_name' },
                { name: 'code', code: 'idnt_code' },
                { name: 'email', code: 'mb_email' },
                { name: 'cell phone', code: 'mb_cell' }
            ]),
            dropdownValue: { name: 'id', code: 'mb_id' },
            router: useRouter(),
            searchStr: ''
        };
    },
    computed: {
        ...mapState(['POINT'])
    },
    components: {},
    created() {},
    mounted() {
        this.ACTION_POINT_LIST({ mode: 'pointListAdmin', type: 'C' });
    },
    methods: {
        ...mapActions(['ACTION_POINT_LIST']),
        onLoadGender(v) {
            if (v === 'm') return 'male';
            if (v === 'f') return 'female';
            if (v === 'x') return 'Prefer not to say';
        },
        onLoadPlatform(v) {
            if (v === 'g') return 'google';
            if (v === 'a') return 'apple';
            if (v === 'k') return 'kworld';
        },
        onLoadDateDot(v) {
            return v ? _dateFormatYmdDot(v) : '';
        },
        onClickPageNation(p, n) {
            const params = {
                mode: 'pointListAdmin',
                page: p,
                type: 'C'
            };

            if (this.$route.query?.t) {
                params[this.$route.query?.t] = this.$route.query?.q;
            }

            this.ACTION_POINT_LIST(params);
        },
        onSubmitSearch() {
            const params = {
                mode: 'pointListAdmin',
                type: 'C'
            };
            params[this.dropdownValue.code] = this.searchStr;

            this.ACTION_POINT_LIST(params);
            this.router.push(`/user/pointList?t=${this.dropdownValue.code}&q=${this.searchStr}`);
            // this.onClickPageNation(1);
        },
        onClickResetSearch() {
            this.router.push(`/user/pointList`);
            this.searchStr = '';
            this.dropdownValue = { name: 'id', code: 'mb_id' };
            this.ACTION_POINT_LIST({ mode: 'pointListAdmin', type: 'C' });
        }
    }
};
</script>


<style>
</style>