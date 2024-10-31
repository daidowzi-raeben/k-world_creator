<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <form @submit.prevent="isSubmit">
                    <h4><strong>Event Registration</strong></h4>
                    <div class="input-wrap">
                        <label class="label">location</label>
                        <RadioButton id="option1" name="option" value="P" v-model="params.event_page" />
                        <label for="option1">main popup banner</label>
                        <RadioButton id="option2" name="option" value="M" v-model="params.event_page" />
                        <label for="option2">main visual banner</label>
                        <RadioButton id="option3" name="option" value="S" v-model="params.event_page" />
                        <label for="option3">category page banner</label>
                        <RadioButton id="option3" name="option" value="C" v-model="params.event_page" />
                        <label for="option3">content main banner</label>
                        <RadioButton id="option3" name="option" value="W" v-model="params.event_page" />
                        <label for="option3">content weekly ranking banner</label>
                        <RadioButton id="option3" name="option" value="K" v-model="params.event_page" />
                        <label for="option3">search banner</label>
                    </div>
                    <div class="input-wrap">
                        <label class="label">category</label>
                        <select size="5" v-model="params.cate_code" class="scroll-box" :disabled="params.event_page !== 'S'">
                            <option class="btn" v-for="(v, i) in MENU_LIST.DEPTH1" :key="i" :value="v?.menu_code" @click="onClickCategory(2, v?.menu_code)">
                                {{ v?.menu_en }}
                            </option>
                        </select>
                        <!-- <select size="5" v-model="params.cate2" class="scroll-box">
                            <option class="btn" v-for="(v, i) in MENU_LIST.DEPTH2" :key="i" :value="v?.idx">
                                {{ v?.menu_en }}
                            </option>
                        </select> -->
                    </div>
                    <div class="input-wrap">
                        <label class="label">item link</label>
                        <InputText type="text" :disabled="true" :value="params.goods_name"></InputText>
                        <Button label="Search" class="ml-2" @click="onClickBrandLoad(null)" />
                        <Dialog header="브랜드 검색" v-model:visible="searchModal" :modal="true" class="modal-md">
                            <div class="input-wrap">
                                <IconField iconPosition="left">
                                    <InputText type="text" v-model="search.brand" @keyup.enter="onClickBrandLoad(search.brand)" />
                                    <InputIcon class="pi pi-search" />
                                </IconField>
                                <Button label="Search" class="ml-2" :disabled="search.brand ? false : true" @click="onClickBrandLoad(search.brand)" />
                            </div>
                            <div class="table-wrap scroll mt-4">
                                <table class="table">
                                    <tr>
                                        <th class="text-left">code</th>
                                        <th class="text-left">item name</th>
                                    </tr>
                                    <tr v-for="(v, i) in GOODS.LIST?.data" :key="i">
                                        <td class="text-left">
                                            {{ v?.goods_code }}
                                        </td>

                                        <td class="text-left">
                                            <button
                                                class="btn"
                                                @click="
                                                    () => {
                                                        params.goods_name = v?.goods_name;
                                                        params.goods_code = v?.goods_code;
                                                        searchModal = false;
                                                    }
                                                "
                                            >
                                                {{ v?.goods_name }}
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </Dialog>
                    </div>
                    <div class="input-wrap">
                        <label class="label">sort</label>
                        <InputText type="text" v-model="params.sort"></InputText>
                        <div style="margin-left: 10px">숫자가 적을수록 먼저 노출됩니다.</div>
                    </div>
                    <div class="input-wrap">
                        <label class="label">Image</label>
                        <InputText type="file" id="baanerImg" placeholder="placeholder" @change="onChangeEventBanner($event)"></InputText>
                    </div>
                    <div class="input-wrap">
                        <img v-if="params.img" :src="params.img" width="400" />
                    </div>

                    <div class="btn-wrap">
                        <Button label="submit" class="lg" type="submit" />
                    </div>
                    <!-- {{ formData }} -->
                    <!-- {{ calendarValue }} -->
                </form>
            </div>
        </div>
        {{ base64Img }}
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import countryList from '../../static/json/country.json';
import { _dateFormatYmd, _base64toFile } from '@/js/common.js';

export default {
    data() {
        return {
            search: {
                brand: ''
            },
            searchModal: false,
            isSubmitMbId: false,
            dropdownValues: ref([
                { name: '권한없음', code: '1' },
                { name: '권한1', code: '2' }
            ]),
            dropdownValue: ref(null),
            radioValue: ref(null),
            calendarValue: ref(null),
            listboxValue: '',
            listboxValues: countryList,
            mb_id: '',
            formData: {
                mb_gender: 'm',
                mode: 'signUp',
                platform: 'k',
                agree_sms: 'Y',
                agree_email: 'Y'
            },
            params: {
                mode: 'add',
                event_page: 'P',
                cate_code: '',
                goods_code: '',
                goods_name: '',
                img: '',
                isEdit: '',
                sort: 1
            },
            base64Img: null
        };
    },
    watch: {
        'BANNER.DETAIL': {
            handler(value) {
                // Fetch data about the movie
                this.params = value?.data;
                this.params.img = value.data.img_url;
                this.params.isEdit = 'Y';
                this.params.mode = 'add';
            }
        }
    },
    components: {},
    created() {},
    computed: {
        ...mapState(['MENU_LIST', 'BRAND_LIST', 'DUPLICATE_ID', 'GOODS', 'BANNER'])
    },
    mounted() {
        // 1뎁스 카테고리 출력
        this.onClickCategory(1);
        if (this.$route?.query?.code) {
            this.ACTION_BANNER_DETAIL({ mode: 'detail', idx: this.$route?.query?.code });
        }
    },
    methods: {
        ...mapActions(['ACTION_BANNER_DETAIL', 'ACTION_BANNER_ADD', 'ACTION_DUPLICATE_ID', 'ACTION_MENU_LIST', 'ACTION_GOODS_LIST']),
        ...mapMutations(['MUTATION_BASE']),
        onChangeEventBanner(v) {
            const fileReader = new FileReader(); // File 을 읽기 위한 FileReader 객체 생성
            fileReader.readAsDataURL(v.target.files[0]); // Blob -> base64 data로 변환

            // 파일 읽기가 완료되었을 때 실행되는 이벤트 핸들러
            fileReader.onload = (e) => {
                let base64data = fileReader.result;
                this.params.img = base64data;
            };
        },
        onChangeIsValue(param, v) {
            console.log(param, v);
            if (param === 'mb_id') {
                this.mb_id = v?.target?.value;
            }
            this.formData[param] = v?.target?.value;
        },
        isSubmit() {
            // this.params.img = this.onChangeEventBanner;
            this.ACTION_BANNER_ADD(this.params);
        },
        duplicateId() {
            const params = {
                mode: 'duplicateId',
                mb_id: this.mb_id
            };
            this.ACTION_DUPLICATE_ID(params);
        },
        onClickCategory(depth, parentCode) {
            this.params.cate_code = parentCode;
            let param = { mode: 'depth', depth: depth };
            if (parentCode) param = { mode: 'depth', depth: depth, parentCode: parentCode };
            if (depth === 1) this.ACTION_MENU_LIST(param);
        },
        async onClickBrandLoad(brand) {
            console.log('brand', brand);
            let params = { mode: 'brand' };
            if (brand) await this.ACTION_GOODS_LIST({ mode: 'list', str: brand });

            this.searchModal = true;
        }
    }
};
</script>


<style>
</style>