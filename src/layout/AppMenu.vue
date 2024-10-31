<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: '대시보드', to: '/' }]
    },
    {
        label: 'Setting',
        items: [
            { label: '회원가입 약관 설정', to: '/setting/terms' },
            { label: '서비스 이용약관 설정', to: '/setting/service' },
            { label: '개인정보처리방침 설정', to: '/setting/private' }
            // { label: '접근차단IP 설정', to: '/setting/ip' },
            // { label: '메뉴 설정', to: '/setting/menu' }
        ]
    },
    {
        label: 'User',
        items: [
            { label: 'User List', to: '/user/list' },
            { label: 'Creator List', to: '/seller/list' }
            // { label: '포인트내역', to: '/user/pointList' }
            // { label: '회원승인', to: '/user/approval' },
            // { label: '접속자 집계', to: '/user/visit' }
        ]
    },
    // {
    //     label: 'Creator',
    //     items: [
    //         // { label: '판매자 등록', to: '/seller/register' }
    //     ]
    // },
    {
        label: 'Event',
        items: [{ label: 'Event List', to: '/event/list' }]
    },
    {
        label: 'Shop',
        items: [
            // { label: '쇼핑몰 설정', to: '/shop/setting' },
            { label: '주문내역', to: '/shop/order' },
            // { label: '직원관리', to: '/shop/employee' },
            { label: '분류관리', to: '/shop/category' },
            { label: '상품관리', to: '/shop/productad' },
            { label: '1:1 Inquiry', to: '/shop/qa' },
            { label: '상품후기', to: '/shop/review' },
            { label: 'FAQ', to: '/shop/faq' }

            // { label: '상품재고관리', to: '/shop/inventory' },
            // { label: '상품유형관리', to: '/shop/type' },
            // { label: '추가배송비관리', to: '/shop/delivery' },
            // { label: '미완료주문', to: '/shop/incomplete' }
        ]
    },
    {
        label: 'Content',
        items: [{ label: 'Content', to: '/content/list' }]
    },
    {
        label: 'Policy',
        items: [
            { label: '배송안내', to: '/policy/delivery' },
            { label: 'AS안내', to: '/policy/as' },
            { label: '환불안내', to: '/policy/refund' },
            { label: '교환안내', to: '/policy/exchange' }
        ]
    },
    {
        label: 'Sale',
        items: [
            { label: '매출정산', to: '/sale/calculate' },
            { label: '상품판매순위', to: '/sale/ranking' }
            // { label: '주문내역출력', to: '/sale/order' }
        ]
    }
    // {
    //     label: 'UI Components',
    //     items: [
    //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
    //         { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
    //         { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
    //         { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
    //         { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
    //         { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
    //         { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
    //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
    //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
    //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
    //         { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
    //         { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
    //         { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
    //         { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
    //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
    //         { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
    //     ]
    // },
    // {
    //     label: 'Prime Blocks',
    //     items: [
    //         { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
    //         { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://www.primefaces.org/primeblocks-vue', target: '_blank' }
    //     ]
    // },
    // {
    //     label: 'Utilities',
    //     items: [
    //         { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
    //         { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://www.primefaces.org/primeflex/', target: '_blank' }
    //     ]
    // },
    // {
    //     label: 'Pages',
    //     icon: 'pi pi-fw pi-briefcase',
    //     to: '/pages',
    //     items: [
    //         {
    //             label: 'Landing',
    //             icon: 'pi pi-fw pi-globe',
    //             to: '/landing'
    //         },
    //         {
    //             label: 'Auth',
    //             icon: 'pi pi-fw pi-user',
    //             items: [
    //                 {
    //                     label: 'Login',
    //                     icon: 'pi pi-fw pi-sign-in',
    //                     to: '/auth/login'
    //                 },
    //                 {
    //                     label: 'Error',
    //                     icon: 'pi pi-fw pi-times-circle',
    //                     to: '/auth/error'
    //                 },
    //                 {
    //                     label: 'Access Denied',
    //                     icon: 'pi pi-fw pi-lock',
    //                     to: '/auth/access'
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Crud',
    //             icon: 'pi pi-fw pi-pencil',
    //             to: '/pages/crud'
    //         },
    //         {
    //             label: 'Timeline',
    //             icon: 'pi pi-fw pi-calendar',
    //             to: '/pages/timeline'
    //         },
    //         {
    //             label: 'Not Found',
    //             icon: 'pi pi-fw pi-exclamation-circle',
    //             to: '/pages/notfound'
    //         },
    //         {
    //             label: 'Empty',
    //             icon: 'pi pi-fw pi-circle-off',
    //             to: '/pages/empty'
    //         }
    //     ]
    // },
    // {
    //     label: 'Hierarchy',
    //     items: [
    //         {
    //             label: 'Submenu 1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 1.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 1.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Submenu 2',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 2.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 2.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         {
    //             label: 'Documentation',
    //             icon: 'pi pi-fw pi-question',
    //             to: '/documentation'
    //         },
    //         {
    //             label: 'Figma',
    //             url: 'https://www.dropbox.com/scl/fi/bhfwymnk8wu0g5530ceas/sakai-2023.fig?rlkey=u0c8n6xgn44db9t4zkd1brr3l&dl=0',
    //             icon: 'pi pi-fw pi-pencil',
    //             target: '_blank'
    //         },
    //         {
    //             label: 'View Source',
    //             icon: 'pi pi-fw pi-search',
    //             url: 'https://github.com/primefaces/sakai-vue',
    //             target: '_blank'
    //         },
    //         {
    //             label: 'Nuxt Version',
    //             url: 'https://github.com/primefaces/sakai-nuxt',
    //             icon: 'pi pi-fw pi-star'
    //         }
    //     ]
    // }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
