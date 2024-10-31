<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="grid">
                    <div class="col-8">
                        <form @submit.prevent="onSubmit">
                            <h4><strong>환물안내</strong></h4>
                            <vue-editor v-model="addData.content"></vue-editor>
                            <div class="btn-wrap">
                                <Button type="submit" label="등록" class="lg" />
                            </div>
                        </form>
                    </div>
                    <div class="col-4">
                        <h4><strong>개정이력</strong></h4>
                        <div class="table-wrap">
                            <table class="table">
                                <tr>
                                    <th>등록일</th>
                                    <th>작성자</th>
                                    <th></th>
                                </tr>
                                <tr v-for="(v, i) in TERM_LIST?.list" :key="i">
                                    <td>{{ onLoadDateDot(v?.c_datetime) }}</td>
                                    <td>{{ v?.mb_name }}</td>
                                    <td><Button :label="i === 0 ? '적용중' : '적용하기'" @click="addData.content = v?.content" /></td>
                                </tr>
                                <tr v-show="TERM_LIST?.list?.length === 0">
                                    <td colspan="3">No Data</td>
                                </tr>
                            </table>
                            <!-- <div class="table-nodata">개정이력이 없습니다</div> -->
                            <div v-show="TERM_LIST?.list?.length > 0" class="p-paginator p-component mt-2">
                                <button class="p-paginator-prev p-paginator-element p-link" type="button" :class="{ 'p-disabled': TERM_LIST?.pageNow === 1 }" :disabled="TERM_LIST?.pageNow === 1 ? true : false" @click="onClickPageNation(1)">
                                    <i class="pi pi-angle-double-left"></i>
                                </button>
                                <button
                                    class="p-paginator-first p-paginator-element p-link"
                                    :class="{ 'p-disabled': TERM_LIST?.pageNow === 1 }"
                                    :disabled="TERM_LIST?.pageNow === 1 ? true : false"
                                    type="button"
                                    @click="onClickPageNation(TERM_LIST?.pageNow - 1)"
                                >
                                    <i class="pi pi-angle-left"></i>
                                </button>
                                <span class="p-paginator-pages" data-pc-section="pages">
                                    <!-- pageNow -->
                                    <button v-for="(v, i) in TERM_LIST?.page" :key="i" :class="{ 'p-highlight': TERM_LIST?.pageNow === i + 1 }" class="p-paginator-page p-paginator-element p-link" type="button" @click="onClickPageNation(i + 1)">
                                        {{ i + 1 }}
                                    </button>
                                </span>
                                <button
                                    class="p-paginator-first p-paginator-element p-link"
                                    type="button"
                                    :class="{ 'p-disabled': TERM_LIST?.pageNow === TERM_LIST?.page }"
                                    :disabled="TERM_LIST?.pageNow === TERM_LIST?.page ? true : false"
                                    @click="onClickPageNation(TERM_LIST?.pageNow + 1)"
                                >
                                    <i class="pi pi-angle-right"></i>
                                </button>
                                <button
                                    class="p-paginator-prev p-paginator-element p-link"
                                    type="button"
                                    :class="{ 'p-disabled': TERM_LIST?.pageNow === TERM_LIST?.page }"
                                    :disabled="TERM_LIST?.pageNow === TERM_LIST?.page ? true : false"
                                    @click="onClickPageNation(TERM_LIST?.page)"
                                >
                                    <i class="pi pi-angle-double-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { _isUser, _dateFormatYmdDot } from '@/js/common.js';
import { mapState, mapActions, mapMutations } from 'vuex';
import { VueEditor } from 'vue3-editor';
export default {
    data() {
        return {
            formData: {
                idnt_code: _isUser(),
                type: 'refund',
                mode: 'list'
            },
            addData: {
                idnt_code: _isUser(),
                type: 'refund',
                mode: 'add',
                content: ''
            }
        };
    },
    computed: {
        ...mapState(['TERM_LIST'])
    },
    components: { VueEditor },
    created() {},
    mounted() {
        this.ACTION_TERM_LIST(this.formData);
    },
    methods: {
        ...mapActions(['ACTION_TERM_LIST', 'ACTION_TERM_ADD']),
        onSubmit() {
            this.ACTION_TERM_ADD(this.addData);
        },
        onLoadDateDot(v) {
            return v ? _dateFormatYmdDot(v) : '';
        },
        onClickPageNation(p, n) {
            const params = {
                type: 'refund',
                mode: 'list',
                page: p
            };

            if (this.$route.query?.t) {
                params[this.$route.query?.t] = this.$route.query?.q;
            }

            this.ACTION_TERM_LIST(params);
        }
    }
};
</script>


<style>
</style>