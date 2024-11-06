<script setup>
import { ref } from 'vue';

const displayConfirmation = ref(false);
const displayConfirmation2 = ref(false);
const inputNumberValue = ref(null);

const openConfirmation = () => {
    displayConfirmation.value = true;
};
const closeConfirmation = () => {
    displayConfirmation.value = false;
};
const openConfirmation2 = () => {
    displayConfirmation2.value = true;
};
const closeConfirmation2 = () => {
    displayConfirmation2.value = false;
};
</script>


<template>
    <div class="grid">
        <div class="col-12 xl:col-6">
            <div class="card">
                <h4>Amount Available for Settlement</h4>
                <h1 class="flex justify-content-end align-items-center mt-2 mb-0">
                    <strong>100.00</strong> <h5 class="ml-2">$</h5>
                </h1>
                <span class="flex justify-content-end align-items-center mb-4">01/01/2024 - 02/01/2024</span>
                <div class="flex justify-content-end">
                    <InputNumber v-model="inputNumberValue" showButtons mode="decimal" min="0" style="width:calc(100% - 170px)"></InputNumber>
                    <Button label="Request Settlement" @click="openConfirmation" class="ml-2" />
                    <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '50vw' }" :modal="true">
                        <div class="card p-3 mb-3">
                            정산안내 관련 텍스트
                        </div>
                        <div class="card p-3">
                            <h5>My Bank Information</h5>
                            <div class="flex mt-4">
                                <label style="width:130px">Payee's Name</label>
                                <strong>Lee</strong>
                            </div>
                            <div class="flex mt-3">
                                <label style="width:130px">Bank Name</label>
                                <strong>KB bank</strong>
                            </div>
                            <div class="flex mt-3">
                                <label style="width:130px">Account Number</label>
                                <strong>1234-5678-9000000</strong>
                            </div>
                        </div>
                        <template #footer>
                            <Button label="No" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" severity="warning" />
                            <Button label="Yes" icon="pi pi-check" @click="closeConfirmation" class="p-button-text" autofocus />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h4>My Bank Information</h4>
                <div class="flex mt-5">
                    <label style="width:130px">Payee's Name</label>
                    <strong>Lee</strong>
                </div>
                <div class="flex mt-3">
                    <label style="width:130px">Bank Name</label>
                    <strong>KB bank</strong>
                </div>
                <div class="flex mt-3">
                    <label style="width:130px">Account Number</label>
                    <strong>1234-5678-9000000</strong>
                </div>
                <div class="flex justify-content-end">
                    <Button label="modify" @click="openConfirmation2" class="ml-2" severity="secondary" />
                    <Dialog header="Confirmation" v-model:visible="displayConfirmation2" :style="{ width: '500px' }" :modal="true">
                        <div class="flex align-items-center mt-2">
                            <label style="width:130px">Payee's Name</label>
                            <InputText type="text" value="Lee" style="width:calc(100% - 130px)"></InputText>
                        </div>
                        <div class="flex align-items-center mt-3">
                            <label style="width:130px">Bank Name</label>
                            <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" style="width:calc(100% - 130px)" />
                        </div>
                        <div class="flex align-items-center mt-3">
                            <label style="width:130px">Account Number</label>
                            <InputText type="text" value="1234-5678-9000000" style="width:calc(100% - 130px)"></InputText>
                        </div>
                        <template #footer>
                            <Button label="cancel" icon="pi pi-times" @click="closeConfirmation2" class="p-button-text" severity="warning" />
                            <Button label="modify" icon="pi pi-check" @click="closeConfirmation2" class="p-button-text" autofocus />
                        </template>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
    <div class="card">정상 안내 관련 텍스트</div>
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