<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>직원 목록</strong></h4>
                <div class="search-wrap grid">
                    <div class="left">
                        <label class="label">직원 검색</label>
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
                </div>

                <div class="table-top">
                    <div class="left">Total 10</div>
                    <div class="right">
                        <!-- <Button label="숨김해제" severity="secondary" class="mr-2" /> -->
                        <Button label="등록" severity="secondary" @click="router.push('/shop/employee/add')" />
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>식별코드</th>
                            <th>관리등급</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>연락처</th>
                            <th>이메일</th>
                            <th>성별</th>
                            <th>생년월일</th>
                        </tr>
                        <tr v-for="item in 5" :key="item">
                            <td>A0001</td>
                            <td>상품관리</td>
                            <td>aa****</td>
                            <td>aa****</td>
                            <td>aa****</td>
                            <td>aa****@gmail.com</td>
                            <td>Female</td>
                            <td>1999.11.11</td>
                        </tr>
                    </table>
                </div>
                <div class="p-paginator p-component mt-2">
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            dropdownValues: ref([
                { name: 'select1', code: '1' },
                { name: 'select2', code: '2' },
                { name: 'select3', code: '3' }
            ]),
            dropdownValue: ref(null),
            router: useRouter()
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {}
};
</script>


<style>
</style>