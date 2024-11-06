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
        <div class="col-12">
            <div class="card">
                <h4>Inquiry</h4>
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
                            <label class="label mr-3">Period Search</label>
                            <Calendar :showIcon="true" :yearNavigator="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                            <span class="between ml-2 mr-2">~</span>
                            <Calendar :showIcon="true" :yearNavigator="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
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
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>No</th>
                            <th>category</th>
                            <th>title</th>
                            <th>upload date</th>
                            <th>state</th>
                        </tr>
                        <tr v-for="i in 5" :key="i">
                            <td>{{ i }}</td>
                            <td>category</td>
                            <td style="min-width:200px">
                                <Button label="inquiry title" severity="secondary" text @click="open" />
                                <Dialog header="inquiry title" v-model:visible="display" :style="{ width: '50vw' }" :modal="true">
                                    <div>
                                        inquiry content
                                    </div>
                                    <template #footer>
                                        <Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined" />
                                    </template>
                                </Dialog>
                            </td>
                            <td>2024-01-01</td>
                            <td>waiting</td>
                        </tr>
                    </table>
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