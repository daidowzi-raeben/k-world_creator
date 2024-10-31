<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>1:1 Inquiry</strong></h4>
                <div class="input-wrap">
                    <label class="label">idnt id</label>
                    <InputText type="text" placeholder="placeholder" :value="REQUEST.DETAIL?.data?.idnt_code" :disabled="true"></InputText>
                </div>
                <div class="input-wrap">
                    <label class="label">name </label>
                    <InputText type="text" placeholder="placeholder" :value="REQUEST.DETAIL?.data?.mb_name" :disabled="true"></InputText>
                </div>
                <div class="input-wrap">
                    <label class="label">titme</label>
                    <InputText type="text" placeholder="placeholder" :disabled="true" :value="REQUEST.DETAIL?.data?.request_title"></InputText>
                </div>
                <div class="input-wrap">
                    <label class="label">question</label>
                    <Textarea inputId="textarea" rows="3" cols="60" :disabled="true" :value="REQUEST.DETAIL?.data?.content" :autoResize="true"></Textarea>
                </div>
                <div class="input-wrap">
                    <label class="label">image</label>
                    <img v-for="(v, i) in REQUEST.DETAIL?.data?.img" :key="i" :src="v?.img_url" width="400" style="margin: 10px" />
                </div>
                <div class="input-wrap">
                    <label class="label">response</label>
                    <Textarea inputId="textarea" rows="3" cols="60" :autoResize="true" v-model="answer"></Textarea>
                </div>

                <div class="btn-wrap">
                    <Button label="목록" severity="secondary" class="lg" @click="router.push('/shop/qa')" />
                    <Button label="확인" class="lg" @click="isSubmit" />
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
            router: useRouter(),
            answer: ''
        };
    },
    components: {},
    computed: {
        ...mapState(['REQUEST'])
    },
    watch: {
        'REQUEST.DETAIL': {
            handler(v) {
                setTimeout(() => {
                    console.log(v?.data);
                    if (v?.data?.idx) {
                        this.answer = v?.data?.answer;
                    }
                }, 100);
            },
            deep: true,
            immediate: true
        }
    },
    created() {},
    mounted() {
        this.ACTION_REQUEST_DETAIL({ mode: 'detail', idx: this.$route?.query?.code });
    },
    methods: {
        ...mapActions(['ACTION_REQUEST_DETAIL', 'ACTION_REQUEST_USE', 'ACTION_REQUEST_ADD']),
        isSubmit() {
            const params = {
                mode: 'answerAdd',
                idx: this.REQUEST.DETAIL?.data?.idx,
                answer: this.answer
            };
            this.ACTION_REQUEST_ADD(params);
        }
    }
};
</script>


<style>
</style>