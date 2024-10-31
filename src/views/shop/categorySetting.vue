<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>Category</strong></h4>
                <!-- <div class="search-wrap grid">
                    <div class="left">
                        <label class="label">분류 검색</label>
                        <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />

                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <IconField iconPosition="left">
                                    <InputText type="text" placeholder="Search" />
                                    <InputIcon class="pi pi-search" />
                                </IconField>
                            </div>
                        </div>
                    </div>

                    <div class="right">
                        <Button label="Search" class="mr-2" />
                        <Button label="Reset" />
                    </div>
                </div> -->

                <div class="table-top">
                    <div class="left"></div>
                    <div class="right">
                        <!-- <Button label="등록" severity="secondary" @click="categoryModal = true" /> -->
                        <Dialog header="분류명 추가" v-model:visible="categoryModal" :modal="true" class="modal-sm">
                            <div class="input-wrap">
                                <label class="label">분류명</label>
                                <InputText type="text" placeholder="placeholder"></InputText>
                            </div>
                            <div class="btn-wrap">
                                <!-- <Button label="Add" /> -->
                            </div>
                        </Dialog>
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th></th>
                            <th>분류코드</th>
                            <th>분류명</th>
                            <th>상품 수</th>
                            <th>판매가능</th>
                            <!-- <th>이벤트여부</th> -->
                            <!-- <th></th> -->
                        </tr>
                        <template v-for="(v, i) in MENU_LIST.DEPTH1" :key="i">
                            <tr>
                                <td>
                                    <button type="button" class="btn btn-fold">
                                        <i class="pi pi-angle-right isActive"></i>
                                    </button>
                                </td>
                                <td>{{ v?.menu_code }}</td>
                                <td class="text-left">{{ v?.menu_en }}</td>
                                <td>{{ v?.total_cnt }}</td>
                                <td>{{ v?.use_yn }}</td>
                                <!-- <td><Button outlined label="추가" @click="categoryModal = true" /></td> -->
                            </tr>
                            <template v-if="v?.child?.length > 0">
                                <tr v-for="(x, j) in v?.child" :key="j" class="fold isActive">
                                    <td>
                                        <!-- <button type="button" class="btn btn-fold">
                                            <i class="pi pi-angle-right isActive"></i>
                                        </button> -->
                                    </td>
                                    <td>{{ x?.menu_code }}</td>
                                    <td class="text-left depth">{{ x?.menu_en }}</td>
                                    <td>{{ x?.total_cnt }}</td>
                                    <td>{{ x?.use_yn }}</td>
                                    <!-- <td></td> -->
                                </tr>
                            </template>
                            <!-- <tr class="fold isActive">
                            <td></td>
                            <td>A0001</td>
                            <td class="text-left depth">Food</td>
                            <td>5</td>
                            <td>Y</td>
                            <td>Y</td>
                            <td></td>
                        </tr> -->
                        </template>
                        <!-- <tr v-for="item in 5" :key="item">
                            <td>
                                <button type="button" class="btn btn-fold">
                                    <i class="pi pi-angle-right"></i>
                                </button>
                            </td>
                            <td>A0001</td>
                            <td class="text-left">Food</td>
                            <td>5</td>
                            <td>Y</td>
                            <td>Y</td>
                            <td><Button outlined label="추가" @click="categoryModal = true" /></td>
                        </tr> -->
                    </table>
                </div>
                <!-- <div class="p-paginator p-component mt-2">
                    <button class="p-paginator-first p-paginator-element p-link p-disabled" type="button" disabled="">
                        <i class="pi pi-angle-left"></i>
                    </button>
                    <button class="p-paginator-prev p-paginator-element p-link p-disabled" type="button" disabled="">
                        <i class="pi pi-angle-double-left"></i>
                    </button>
                    <span class="p-paginator-pages" data-pc-section="pages">
                        <button class="p-paginator-page p-paginator-element p-link p-highlight" type="button">1</button>
                        <button class="p-paginator-page p-paginator-element p-link" type="button">2</button>
                    </span>
                    <button class="p-paginator-first p-paginator-element p-link" type="button">
                        <i class="pi pi-angle-right"></i>
                    </button>
                    <button class="p-paginator-prev p-paginator-element p-link" type="button">
                        <i class="pi pi-angle-double-right"></i>
                    </button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
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
            categoryModal: false
        };
    },
    computed: {
        ...mapState(['MENU_LIST'])
    },
    created() {},
    mounted() {
        let param = { mode: 'category' };
        this.ACTION_MENU_LIST(param);
    },
    methods: {
        ...mapActions(['ACTION_MENU_LIST'])
    }
};
</script>


<style>
</style>