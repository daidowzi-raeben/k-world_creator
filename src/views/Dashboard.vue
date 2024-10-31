<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import { mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
const { isDarkTheme } = useLayout();

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

mainPostData();

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">{{ mainData?.today }} 판매 수량</span>
                        <div class="text-900 font-medium text-xl">
                            {{ mainData?.sell }}
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ Number(mainData?.sell) - Number(mainData?.sellY) }} new </span>
                <span class="text-500">전날 대비</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">{{ mainData?.today }} 회원가입 수</span>
                        <div class="text-900 font-medium text-xl">
                            {{ mainData?.members }}
                        </div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-map-marker text-orange-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ Number(mainData?.members) - Number(mainData?.membersY) }} new</span>
                <span class="text-500">전날 대비</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">1:1 Inquiry</span>
                        <div class="text-900 font-medium text-xl">{{ Number(mainData?.request) }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ Number(mainData?.request) - Number(mainData?.requestY) }} </span>
                <span class="text-500">답변 완료</span>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-3">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3">Content</span>
                        <div class="text-900 font-medium text-xl">{{ mainData?.content_cnt }} Upload</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">{{ mainData?.content_cnt_today }} </span>
                <span class="text-500">Today</span>
            </div>
        </div>

        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>{{ mainData?.today }} 판매순위</h5>
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
                    <Column field="goods_name" header="Name" :sortable="true" style="width: 35%"></Column>
                    <Column field="goods_amt" header="Price" :sortable="true" style="width: 10%; text-align: right">
                        <template #body="slotProps">
                            {{ rankData[slotProps.index]?.goods_amt }}
                        </template>
                    </Column>
                    <Column style="width: 15%">
                        <template #header> View </template>
                        <template #body>
                            <Button icon="pi pi-search" type="button" class="p-button-text"></Button>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="card">
                <div class="flex justify-content-between align-items-center mb-5">
                    <h5>베스트 상품평</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                        <Menu ref="menu2" :popup="true" :model="items"></Menu>
                    </div>
                </div>
                <ul class="list-none p-0 m-0">
                    <li v-for="(v, i) in bestRivew" :key="i" class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div>
                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">{{ v?.goods_name }}</span>
                            <div class="mt-1 text-600">{{ v?.content }}</div>
                        </div>
                        <div class="mt-2 md:mt-0 flex align-items-center ml-3">
                            <Rating v-model="v.rate" readonly />
                            <span class="ml-2">{{ v?.rate }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col-12 xl:col-6">
            <div class="card">
                <h5>Sales Overview</h5>
                <Chart type="line" :data="lineData" :options="lineOptions" />
            </div>
            <div class="card">
                <div class="flex align-items-center justify-content-between mb-4">
                    <h5>인기검색어</h5>
                    <div>
                        <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu1.toggle($event)"></Button>
                        <Menu ref="menu1" :popup="true" :model="items"></Menu>
                    </div>
                </div>

                <span class="block text-600 font-medium mb-3">TODAY</span>
                <ul class="p-0 mx-0 mt-0 mb-4 list-none">
                    <li class="align-items-center py-2 border-bottom-1 surface-border">
                        <div v-for="(v, i) in str" :key="i" class="flex">
                            <div style="padding: 5px; width: 30px">{{ i + 1 }}</div>
                            <div style="padding: 5px" :style="i === 0 ? 'font-weight:bold' : ''">{{ v }}</div>
                        </div>
                    </li>
                </ul>

                <!-- <span class="block text-600 font-medium mb-3">YESTERDAY</span>
                <ul class="p-0 m-0 list-none">
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-dollar text-xl text-blue-500"></i>
                        </div>
                        <span class="text-900 line-height-3"
                            >Keyser Wick
                            <span class="text-700">has purchased a black jacket for <span class="text-blue-500">59$</span></span>
                        </span>
                    </li>
                    <li class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div class="w-3rem h-3rem flex align-items-center justify-content-center bg-pink-100 border-circle mr-3 flex-shrink-0">
                            <i class="pi pi-question text-xl text-pink-500"></i>
                        </div>
                        <span class="text-900 line-height-3"
                            >Jane Davis
                            <span class="text-700">has posted a new questions about your product.</span>
                        </span>
                    </li>
                </ul> -->
            </div>
        </div>
    </div>
</template>
