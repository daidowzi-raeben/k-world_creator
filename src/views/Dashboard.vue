<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
const { isDarkTheme } = useLayout();

const { layoutConfig } = useLayout();
let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const pieData = ref(null);
const pieOptions = ref(null);

const products = ref(null);
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'yesterday',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'today',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);
const lineOptions = ref(null);
const mainData = ref(null);
const rankData = ref(null);
const bestRivew = ref(null);
const requestList = ref(null);
const requestListY = ref(null);
const str = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};
const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};
const ratingValue = ref(4);
const mainPostData = async () => {
    try {
        // const response = await axios.post('/api/main.php', {
        const response = await axios.post('https://k-world365.com/kworld/main.php', {
            mode: 'main'
        });
        // 201: created
        // if (response.status == 201) {
        console.log(response.data?.data);
        mainData.value = response.data?.data;
        rankData.value = response.data?.data?.rank;
        bestRivew.value = response.data?.data?.bestRivew;
        requestList.value = response.data?.data?.requestList;
        requestListY.value = response.data?.data?.requestListY;
        str.value = response.data?.data?.str;
        // }
    } catch (e) {
        console.log(`${e.name}(${e.code}): ${e.message})`);
    }
};

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

const setChart = () => {
    pieData.value = {
        labels: ['A', 'B', 'C'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    pieOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
}

mainPostData();

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
        
        setColorOptions();
        setChart();
    },
    { immediate: true },
);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card pt-0 pb-3">
                <Button label="Daily" class="mr-3 mt-3" />
                <Button label="Weekly" outlined class="mr-3 mt-3" />
                <Button label="Monthly" outlined class="mr-3 mt-3" />
                <Button label="Annual" outlined class="mr-3 mt-3" />
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Import</span>
                        <div class="text-900 font-medium text-xl">
                            {{ mainData?.sell }}$
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-red-500 font-medium">{{ Number(mainData?.sell) - Number(mainData?.sellY) }}$ less than</span>
                <span class="text-500"> since last a day</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Sale</span>
                        <div class="text-900 font-medium text-xl">
                            {{ mainData?.members }}
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ Number(mainData?.members) - Number(mainData?.membersY) }} more than</span>
                <span class="text-500"> since last a day</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Views</span>
                        <div class="text-900 font-medium text-xl">{{ Number(mainData?.request) }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-eye text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ Number(mainData?.request) - Number(mainData?.requestY) }} more than</span>
                <span class="text-500"> since last a day</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Likes</span>
                        <div class="text-900 font-medium text-xl">{{ mainData?.content_cnt }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-pink-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-heart text-pink-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ mainData?.content_cnt_today }} more than</span>
                <span class="text-500"> since last a day</span>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Top-selling category</h5>
                <div class="card flex flex-column align-items-center">
                    <Chart type="doughnut" :data="pieData" :options="pieOptions"></Chart>
                </div>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Most sold Hashtags</h5>

                <div class="grid align-items-center">
                    <div class="col-12 xl:col-7 xl:ml-5 pt-5 pb-0">
                        <vue-word-cloud
                            style="height: 343px; width: 100%;"
                            :words="[['romance', 15], ['Excellent', 10], ['horror', 3], ['fantasy', 7], ['adventure', 3]]"
                            :color="([, weight]) => weight > 10 ? 'DeepPink' : weight > 5 ? 'RoyalBlue' : 'Indigo'"
                            font-family="Inter var"
                            font-weight="600"
                        />
                    </div>
                    <div class="col-12 xl:col-3 xl:ml-5 pb-0">
                        <ul class="p-0 m-0 list-none">
                            <li class="align-items-center py-2 surface-border">
                                <div v-for="(v, i) in str" :key="i" class="flex">
                                    <div style="padding: 5px; width: 30px">{{ i + 1 }}</div>
                                    <div style="padding: 5px" :style="i === 0 ? 'font-weight:bold' : ''">{{ v }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>High-grossing videos</h5>
                <DataTable :value="rankData" responsiveLayout="scroll">
                    <Column style="width: 10%">
                        <template #header> Rank </template>
                        <template #body="slotProps"
                            ><div class="text-center">{{ slotProps.index + 1 }}</div></template
                        >
                    </Column>
                    <Column style="width: 15%">
                        <template #header> Image </template>
                        <template #body="slotProps">
                            <img :src="rankData[slotProps.index]?.img_url" :alt="slotProps?.img_url" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #header> Product </template>
                        <template #body="slotProps">
                            <img :src="rankData[slotProps.index]?.img_url" :alt="slotProps?.img_url" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column field="goods_name" header="Name" style="width: 50%; min-width:200px"></Column>
                    <Column field="goods_amt" header="Price" style="width: 10%; text-align: right">
                        <template #body="slotProps">
                            {{ rankData[slotProps.index]?.goods_amt }}$
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="col-12 xl:col-6 mb-5">
            <div class="card">
                <h5>Top-selling videos</h5>
                <DataTable :value="rankData" responsiveLayout="scroll">
                    <Column style="width: 10%">
                        <template #header> Rank </template>
                        <template #body="slotProps"
                            ><div class="text-center">{{ slotProps.index + 1 }}</div></template
                        >
                    </Column>
                    <Column style="width: 15%">
                        <template #header> Image </template>
                        <template #body="slotProps">
                            <img :src="rankData[slotProps.index]?.img_url" :alt="slotProps?.img_url" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #header> Product </template>
                        <template #body="slotProps">
                            <img :src="rankData[slotProps.index]?.img_url" :alt="slotProps?.img_url" width="50" class="shadow-2" />
                        </template>
                    </Column>
                    <Column field="goods_name" header="Name" style="width: 50%; min-width:200px"></Column>
                    <Column field="goods_amt" header="Price" style="width: 10%; text-align: right">
                        <template #body="slotProps">
                            {{ rankData[slotProps.index]?.goods_amt }}$
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<script>
import VueWordCloud from 'vuewordcloud';

export default {
    components: {
        [VueWordCloud.name]: VueWordCloud,
    },
    mounted() {
    },
    methods: {
    },
    data() {
    return {
    };
    },
};
</script>
