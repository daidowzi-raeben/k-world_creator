<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>분류관리</strong></h4>
                <div class="input-wrap">
                    <label class="label">분류코드</label>
                    <InputText type="text" placeholder="placeholder" :disabled="true"></InputText>
                </div>
                <div class="input-wrap">
                    <label class="label">분류명</label>
                    <InputText type="text" placeholder="placeholder"></InputText>
                </div>
                <div class="input-wrap">
                    <label class="label">판매가능</label>
                    <RadioButton id="option1" name="option" value="Yes" v-model="radioValue" />
                    <label for="option1">Yes</label>
                    <RadioButton id="option2" name="option" value="No" v-model="radioValue" />
                    <label for="option2">No</label>
                </div>
                <div class="input-wrap">
                    <label class="label">이벤트</label>
                    <RadioButton id="option3" name="option2" value="Yes" v-model="radioValue2" />
                    <label for="option3">Yes</label>
                    <RadioButton id="option4" name="option2" value="No" v-model="radioValue2" />
                    <label for="option4">No</label>
                </div>
                <div class="input-wrap">
                    <label class="label">연결방식</label>
                    <Dropdown v-model="dropdownValue" :options="dropdownValues" optionLabel="name" placeholder="Select" />
                </div>
                <template v-if="dropdownValue.code==='1'">
                    <div class="input-wrap">
                        <label class="label">상품연결</label>
                        <div class="grid formgrid">
                            <div class="col-12 mb-2 lg:col-6 lg:mb-0">
                                <IconField iconPosition="left">
                                    <InputText type="text" placeholder="Search" />
                                    <InputIcon class="pi pi-search" />
                                </IconField>
                            </div>
                        </div>
                        <Button label="Search" class="ml-2" />
                    </div>
                    <div class="input-wrap col-12 xl:col-8">
                        <label class="label"></label>
                        <div class="table-wrap mt-2">
                            <table class="table sm">
                                <tr>
                                    <th>상품코드</th>
                                    <th>분류</th>
                                    <th>상품명</th>
                                    <th>가격</th>
                                </tr>
                                <tr>
                                    <td>코드</td>
                                    <td>분류</td>
                                    <td>상품명</td>
                                    <td>가격</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </template>
                <template v-else-if="dropdownValue.code==='2'">
                    <div class="input-wrap">
                        <label class="label">링크연결</label>
                        <InputText type="text" placeholder="placeholder"></InputText>
                    </div>
                </template>
                <div class="input-wrap">
                    <label class="label">배너이미지</label>
                    <FileUpload name="demo[]" accept="image/*" :maxFileSize="1000000" @uploader="onUpload" customUpload />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';

export default {
    data() {
    return {
        dropdownValues: ref([
            { name: '상품연결', code: '1' },
            { name: '링크연결', code: '2' },
        ]),
        dropdownValue: ref({ name: '상품연결', code: '1' }),
        radioValue: ref(null),
        radioValue2: ref(null),
        toast: useToast(),
    };
  },
  components: {},
  created(){},
  mounted() {
    
  },
  methods: {
     onUpload: () => {
        this.toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }
  },
};
</script>


<style>

</style>