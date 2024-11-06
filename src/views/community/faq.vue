<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4>FAQ</h4>
                <div class="search-wrap grid pt-0 pb-3">
                    <div class="left">
                        <div class="flex align-items-center mt-3">
                            <label class="label mr-3">Title Search</label>
                            <IconField iconPosition="left">
                                <InputText type="text" placeholder="Search" />
                                <InputIcon class="pi pi-search" />
                            </IconField>
                        </div>
                        <div class="flex align-items-center mt-3">
                            <label class="label mr-3">Category Search</label>
                            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                        </div>
                    </div>

                    <div class="right mt-3">
                        <Button label="Search" class="mr-2" />
                        <Button label="Reset" severity="secondary" />
                    </div>
                </div>

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