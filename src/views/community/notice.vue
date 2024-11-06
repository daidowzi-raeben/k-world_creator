<script setup>
import { ref } from 'vue';

const display = ref(false);

const open = () => {
    display.value = true;
};

const close = () => {
    display.value = false;
};
</script>


<template>
    <div class="grid">
        <div class="col-12 xl:col-6">
            <div class="card">
                <h4>Notice</h4>

                <div class="table-top">
                    <div class="left">
                        <!-- Total {{ FAQ.LIST?.data.length }} -->
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>No</th>
                            <th>title</th>
                            <th>upload date</th>
                        </tr>
                        <tr v-for="i in 5" :key="i">
                            <td>{{ i }}</td>
                            <td style="min-width:200px">
                                <Button label="notice title" severity="secondary" text @click="open" />
                                <Dialog header="notice title" v-model:visible="display" :style="{ width: '50vw' }" :modal="true">
                                    <div>
                                        notice content
                                    </div>
                                    <template #footer>
                                        <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
                                    </template>
                                </Dialog>
                            </td>
                            <td>2024-01-01</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h4>Alarm</h4>

                <div class="table-top">
                    <div class="left">
                        <!-- Total {{ FAQ.LIST?.data.length }} -->
                    </div>
                </div>
                <div class="card p-2">
                    <Accordion :activeIndex="0">
                        <template v-for="(v, i) in FAQ.LIST?.data" :key="i">
                            <AccordionTab :header="v?.title">
                                <p class="line-height-3 m-0">
                                    {{ v?.content }}
                                </p>
                            </AccordionTab>
                        </template>
                    </Accordion>
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
        ...mapState(['FAQ'])
    },
    created() {},
    mounted() {
        this.ACTION_FAQ_LIST({ mode: 'faq' });
    },
    methods: {
        ...mapActions(['ACTION_FAQ_LIST', 'ACTION_FAQ_USE']),
        onClickUseYn(v, i) {
            const param = {
                mode: 'isUse',
                use_yn: v === 'Y' ? 'N' : 'Y',
                idx: i
            };

            this.ACTION_FAQ_USE(param);
        },
        onClickLocation() {
            location.href = '/shop/faq/add';
        }
    }
};
</script>


<style>
</style>