<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>Review</strong></h4>
                <div class="input-wrap">
                    <label class="label">작성자</label>
                    {{ REVIEW.DETAIL.data?.mb_name }}
                </div>
                <div class="input-wrap">
                    <label class="label">상품명</label>
                    {{ REVIEW.DETAIL.data?.goods_name }}
                </div>
                <div class="input-wrap">
                    <label class="label">옵션명</label>
                    {{ REVIEW.DETAIL.data?.option_title }}
                </div>
                <div class="input-wrap">
                    <label class="label">평점</label>
                    <Rating v-model="rate" readonly />
                    <span class="ml-2">{{ rate }}</span>
                </div>
                <div class="input-wrap">
                    <label class="label">내용</label>
                    {{ REVIEW.DETAIL.data?.content }}
                </div>
                <div class="input-wrap">
                    <label class="label">image</label>
                    <img v-for="(v, i) in REVIEW.DETAIL?.data?.img_list" :key="i" :src="v?.img_url" width="400" style="margin: 10px" />
                </div>

                <div class="btn-wrap">
                    <Button label="목록" severity="secondary" class="lg" @click="router.push('/shop/review')" />
                </div>
            </div>
        </div>
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
            rate: 0,
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
                isEdit: ''
            },
            base64Img: null
        };
    },
    components: {},
    created() {},
    watch: {
        'REVIEW.DETAIL': {
            handler(value) {
                this.rate = value?.data.rate;
            }
        }
    },
    computed: {
        ...mapState(['MENU_LIST', 'BRAND_LIST', 'DUPLICATE_ID', 'GOODS', 'REVIEW'])
    },
    mounted() {
        // 1뎁스 카테고리 출력
        this.onClickCategory(1);
        if (this.$route?.query?.code) {
            this.ACTION_REVIEW_DETAIL({ mode: 'detail', idx: this.$route?.query?.code });
        }
    },
    methods: {
        ...mapActions(['ACTION_REVIEW_DETAIL', 'ACTION_REVIEW_ADD', 'ACTION_DUPLICATE_ID', 'ACTION_MENU_LIST', 'ACTION_GOODS_LIST']),
        ...mapMutations(['MUTATION_BASE']),
        onChangeEventREVIEW(v) {
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
            // this.params.img = this.onChangeEventREVIEW;
            this.ACTION_REVIEW_ADD(this.params);
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