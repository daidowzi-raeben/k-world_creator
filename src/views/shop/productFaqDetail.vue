<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>FAQ</strong></h4>
                <div class="input-wrap">
                    <label class="label">title</label>
                    <InputText type="text" placeholder="placeholder" v-model="title"></InputText>
                </div>
                <div class="input-wrap">
                    <label class="label">content</label>
                    <Textarea inputId="textarea" rows="3" cols="60" :autoResize="true" v-model="content"></Textarea>
                </div>

                <div class="btn-wrap">
                    <Button label="목록" severity="secondary" class="lg" @click="router.push('/shop/faq')" />
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
            content: '',
            title: ''
        };
    },
    components: {},
    computed: {
        ...mapState(['FAQ'])
    },
    watch: {
        'FAQ.DETAIL': {
            handler(v) {
                setTimeout(() => {
                    console.log(v?.data);
                    if (v?.data?.idx) {
                        this.content = v?.data?.content;
                        this.title = v?.data?.title;
                    }
                    console.log('==============');
                }, 100);
            },
            deep: true,
            immediate: true
        }
    },
    created() {},
    mounted() {
        if (this.$route?.query?.code) {
            this.ACTION_FAQ_DETAIL({ mode: 'faqDetail', idx: this.$route?.query?.code });
        } else {
            this.MUTATION_FAQ_DETAIL({});
        }
    },
    methods: {
        ...mapActions(['ACTION_FAQ_DETAIL', 'ACTION_FAQ_USE', 'ACTION_FAQ_ADD']),
        ...mapMutations(['MUTATION_FAQ_DETAIL']),
        isSubmit() {
            const params = {
                mode: 'faqAdd',
                idx: this.FAQ.DETAIL?.data?.idx,
                content: this.content,
                title: this.title
            };
            this.ACTION_FAQ_ADD(params);
        }
    }
};
</script>


<style>
</style>