<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <form @submit.prevent="isSubmit">
                    <h4><strong>회원 등록</strong></h4>
                    <div class="input-wrap">
                        <label class="label">식별코드</label>
                        <InputText type="text" placeholder="placeholder" :disabled="true"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">가입경로</label>
                        <InputText type="text" placeholder="placeholder" :disabled="true" value="k"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">아이디</label>
                        <InputText type="text" required placeholder="placeholder" @change="onChangeIsValue('mb_id', $event)"></InputText>
                        <Button label="중복체크" class="ml-2 md" :disabled="formData?.mb_id ? false : true" @click="duplicateId" />
                    </div>
                    <div class="input-wrap">
                        <label class="label">이름</label>
                        <InputText type="text" required placeholder="first name" @change="onChangeIsValue('mb_name', $event)"></InputText>
                        <InputText type="text" class="ml-2" required placeholder="last name" @change="onChangeIsValue('mb_name_last', $event)"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">패스워드</label>
                        <InputText type="password" required placeholder="placeholder" @change="onChangeIsValue('mb_pw', $event)"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">연락처</label>
                        <Dropdown :filter="true" v-model="listboxValue" :options="listboxValues" optionLabel="name" required placeholder="Select" @change="onChangeIsValue('mb_nation', $event)" />
                        <InputText type="text" class="ml-3 wd-sm" required placeholder="placeholder" :value="listboxValue?.code ? '+' + listboxValue?.code : ''" readonly></InputText>
                        <InputText type="text" class="ml-3" required placeholder="placeholder" @change="onChangeIsValue('mb_cell', $event)"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">이메일</label>
                        <InputText type="text" required placeholder="placeholder" @change="onChangeIsValue('mb_email', $event)"></InputText>
                    </div>
                    <div class="input-wrap">
                        <label class="label">성별</label>
                        <RadioButton id="option1" name="option" value="m" v-model="formData.mb_gender" />
                        <label for="option1">male</label>
                        <RadioButton id="option2" name="option" value="f" v-model="formData.mb_gender" />
                        <label for="option2">female</label>
                        <RadioButton id="option3" name="option" value="x" v-model="formData.mb_gender" />
                        <label for="option3">Prefer not to say</label>
                    </div>
                    <div class="input-wrap">
                        <label class="label">생년월일</label>
                        <Calendar :showIcon="true" :yearNavigator="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                    </div>
                    <!-- <div class="input-wrap">
                        <label class="label">회원등급</label>
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" @change="onChangeIsValue('mb_id', $event)" />
                    </div> -->
                    <div class="btn-wrap">
                        <Button label="등록" class="lg" type="submit" />
                    </div>
                    <!-- {{ formData }} -->
                    <!-- {{ calendarValue }} -->
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import countryList from '../../static/json/country.json';
import { _dateFormatYmd } from '@/js/common.js';

export default {
    data() {
        return {
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
            }
        };
    },
    components: {},
    created() {},
    computed: {
        ...mapState(['MENU_LIST', 'BRAND_LIST', 'DUPLICATE_ID'])
    },
    mounted() {},
    methods: {
        ...mapActions(['ACTION_MEMBER_ADD', 'ACTION_DUPLICATE_ID']),
        onChangeIsValue(param, v) {
            console.log(param, v);
            if (param === 'mb_id') {
                this.mb_id = v?.target?.value;
            }
            this.formData[param] = v?.target?.value;
        },
        isSubmit() {
            console.log('??');

            this.formData.type = 'C';
            this.formData.mb_nation = this.listboxValue?.code;
            this.formData.mb_birth = this.calendarValue ? _dateFormatYmd(this.calendarValue) : null;
            this.ACTION_MEMBER_ADD(this.formData);
        },
        duplicateId() {
            const params = {
                mode: 'duplicateId',
                mb_id: this.mb_id
            };
            this.ACTION_DUPLICATE_ID(params);
        }
    }
};
</script>


<style>
</style>