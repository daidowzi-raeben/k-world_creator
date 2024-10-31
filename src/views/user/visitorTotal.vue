<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4><strong>접속자 집계</strong></h4>
                <div class="search-wrap grid">
                    <div class="left">
                        <label class="label">기간별 검색</label>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                        <span>~</span>
                        <Calendar :showIcon="true" :showButtonBar="true" v-model="calendarValue2" dateFormat="yy/mm/dd" placeholder="yyyy/mm/dd"></Calendar>
                    </div>

                    <div class="right">
                        <Button label="Search" class="mr-2" />
                        <Button label="Reset" />
                    </div>
                </div>

                <div class="table-top">
                    <div class="left">Total 10</div>
                    <div class="right">
                    </div>
                </div>
                <div class="table-wrap">
                    <table class="table">
                        <tr>
                            <th>IP</th>
                            <th>접속경로</th>
                            <th>브라우저</th>
                            <th>OS</th>
                            <th>일시</th>
                        </tr>
                        <tr v-for="item in 5" :key="item">
                            <td>116.♡.208.243</td>
                            <td class="text-left">https://www.npmjs.com/package/vue3-quill</td>
                            <td>Chrome</td>
                            <td>Mozilla</td>
                            <td>2022.11.11 11:11:11</td>
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
            { name: 'select3', code: '3' },
        ]),
        dropdownValue: ref(null),
        router: useRouter(),
        calendarValue: '',
        calendarValue2: '',
    };
  },
  components: {},
  created(){},
  mounted() {
    
  },
  methods: {
  },
};
</script>


<style>

</style>