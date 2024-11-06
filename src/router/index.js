import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/setting/ip',
                    name: 'ipsetting',
                    component: () => import('@/views/setting/ipSetting.vue')
                },
                {
                    path: '/setting/terms',
                    name: 'termssetting',
                    component: () => import('@/views/setting/termsSetting.vue')
                },
                {
                    path: '/setting/menu',
                    name: 'menusetting',
                    component: () => import('@/views/setting/menuSetting.vue')
                },
                {
                    path: '/setting/private',
                    name: 'privatesetting',
                    component: () => import('@/views/setting/privateSetting.vue')
                },
                {
                    path: '/setting/service',
                    name: 'servicesetting',
                    component: () => import('@/views/setting/serviceSetting.vue')
                },
                {
                    path: '/user/approval',
                    name: 'userapproval',
                    component: () => import('@/views/user/userApproval.vue')
                },
                {
                    path: '/user/list',
                    name: 'userlist',
                    component: () => import('@/views/user/userList.vue')
                },
                {
                    path: '/user/add',
                    name: 'useradd',
                    component: () => import('@/views/user/userAdd.vue')
                },
                {
                    path: '/user/visit',
                    name: 'visitortotal',
                    component: () => import('@/views/user/visitorTotal.vue')
                },
                {
                    path: '/seller/list',
                    name: 'sellerlist',
                    component: () => import('@/views/seller/sellerList.vue')
                },
                {
                    path: '/seller/add',
                    name: 'sellerAdd',
                    component: () => import('@/views/seller/sellerAdd.vue')
                },
                {
                    path: '/user/pointList',
                    name: 'pointList',
                    component: () => import('@/views/user/pointList.vue')
                },
                {
                    path: '/event/list',
                    name: 'eventlist',
                    component: () => import('@/views/event/eventList.vue')
                },
                {
                    path: '/event/add',
                    name: 'eventAdd',
                    component: () => import('@/views/event/eventAdd.vue')
                },
                {
                    path: '/shop/setting',
                    name: 'shopsetting',
                    component: () => import('@/views/shop/shopSetting.vue')
                },
                {
                    path: '/shop/order',
                    name: 'orderhistory',
                    component: () => import('@/views/shop/orderHistory.vue')
                },
                {
                    path: '/shop/employee',
                    name: 'employeelist',
                    component: () => import('@/views/shop/employeeList.vue')
                },
                {
                    path: '/shop/employee/add',
                    name: 'employeeadd',
                    component: () => import('@/views/shop/employeeAdd.vue')
                },
                {
                    path: '/shop/category',
                    name: 'categorysetting',
                    component: () => import('@/views/shop/categorySetting.vue')
                },
                {
                    path: '/shop/category/add',
                    name: 'categorysettingadd',
                    component: () => import('@/views/shop/categorySettingAdd.vue')
                },
                {
                    path: '/shop/productad',
                    name: 'productadmin',
                    component: () => import('@/views/shop/productAdmin.vue')
                },
                {
                    path: '/shop/product/add',
                    name: 'productadd',
                    component: () => import('@/views/shop/productAdd.vue')
                },
                {
                    path: '/shop/review',
                    name: 'productreview',
                    component: () => import('@/views/shop/productReview.vue')
                },
                {
                    path: '/shop/review/detail',
                    name: 'productreviewdetail',
                    component: () => import('@/views/shop/productReviewDetail.vue')
                },
                {
                    path: '/shop/faq/add',
                    name: 'productFaqdetail',
                    component: () => import('@/views/shop/productFaqDetail.vue')
                },
                {
                    path: '/shop/qa',
                    name: 'productqa',
                    component: () => import('@/views/shop/productQa.vue')
                },
                {
                    path: '/shop/productqa/detail',
                    name: 'productqadetail',
                    component: () => import('@/views/shop/productQaDetail.vue')
                },
                {
                    path: '/shop/inventory',
                    name: 'productinventory',
                    component: () => import('@/views/shop/productInventory.vue')
                },
                {
                    path: '/shop/type',
                    name: 'producttype',
                    component: () => import('@/views/shop/productType.vue')
                },
                {
                    path: '/shop/delivery',
                    name: 'deliveryadmin',
                    component: () => import('@/views/shop/deliveryAdmin.vue')
                },
                {
                    path: '/shop/incomplete',
                    name: 'incompleteorder',
                    component: () => import('@/views/shop/incompleteOrder.vue')
                },
                {
                    path: '/sale/calculate',
                    name: 'salecalculate',
                    component: () => import('@/views/sale/saleCalculate.vue')
                },
                {
                    path: '/sale/ranking',
                    name: 'saleranking',
                    component: () => import('@/views/sale/saleRanking.vue')
                },
                {
                    path: '/sale/order',
                    name: 'saleorder',
                    component: () => import('@/views/sale/saleOrder.vue')
                },
                {
                    path: '/policy/delivery',
                    name: 'deliverypolicy',
                    component: () => import('@/views/policy/deliveryPolicy.vue')
                },
                {
                    path: '/policy/as',
                    name: 'aspolicy',
                    component: () => import('@/views/policy/asPolicy.vue')
                },
                {
                    path: '/policy/refund',
                    name: 'refundpolicy',
                    component: () => import('@/views/policy/refundPolicy.vue')
                },
                {
                    path: '/policy/exchange',
                    name: 'exchangepolicy',
                    component: () => import('@/views/policy/exchangePolicy.vue')
                },
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },
                {
                    path: '/uikit/input',
                    name: 'input',
                    component: () => import('@/views/uikit/Input.vue')
                },
                {
                    path: '/uikit/floatlabel',
                    name: 'floatlabel',
                    component: () => import('@/views/uikit/FloatLabel.vue')
                },
                {
                    path: '/uikit/invalidstate',
                    name: 'invalidstate',
                    component: () => import('@/views/uikit/InvalidState.vue')
                },
                {
                    path: '/uikit/button',
                    name: 'button',
                    component: () => import('@/views/uikit/Button.vue')
                },
                {
                    path: '/uikit/table',
                    name: 'table',
                    component: () => import('@/views/uikit/Table.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
                {
                    path: '/uikit/tree',
                    name: 'tree',
                    component: () => import('@/views/uikit/Tree.vue')
                },
                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/Panels.vue')
                },

                {
                    path: '/uikit/overlay',
                    name: 'overlay',
                    component: () => import('@/views/uikit/Overlay.vue')
                },
                {
                    path: '/uikit/media',
                    name: 'media',
                    component: () => import('@/views/uikit/Media.vue')
                },
                {
                    path: '/uikit/menu',
                    component: () => import('@/views/uikit/Menu.vue'),
                    children: [
                        {
                            path: '/uikit/menu',
                            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
                        },
                        {
                            path: '/uikit/menu/seat',
                            component: () => import('@/views/uikit/menu/SeatDemo.vue')
                        },
                        {
                            path: '/uikit/menu/payment',
                            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
                        },
                        {
                            path: '/uikit/menu/confirmation',
                            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
                        }
                    ]
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/File.vue')
                },
                {
                    path: '/uikit/charts',
                    name: 'charts',
                    component: () => import('@/views/uikit/Chart.vue')
                },
                {
                    path: '/uikit/misc',
                    name: 'misc',
                    component: () => import('@/views/uikit/Misc.vue')
                },
                {
                    path: '/blocks',
                    name: 'blocks',
                    component: () => import('@/views/utilities/Blocks.vue')
                },
                {
                    path: '/utilities/icons',
                    name: 'icons',
                    component: () => import('@/views/utilities/Icons.vue')
                },
                {
                    path: '/pages/timeline',
                    name: 'timeline',
                    component: () => import('@/views/pages/Timeline.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                {
                    path: '/pages/crud',
                    name: 'crud',
                    component: () => import('@/views/pages/Crud.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/utilities/Documentation.vue')
                },
                {
                    path: '/content/recommended',
                    name: 'contentRecommended',
                    component: () => import('@/views/content/contentRecommended.vue')
                },
                {
                    path: '/content/list',
                    name: 'contentList',
                    component: () => import('@/views/content/contentList.vue')
                },
                {
                    path: '/settlement/application',
                    name: 'settlementApplication',
                    component: () => import('@/views/settlement/application.vue')
                },
                {
                    path: '/settlement/history',
                    name: 'settlementHistory',
                    component: () => import('@/views/settlement/history.vue')
                },
                {
                    path: '/community/faq',
                    name: 'communityFaq',
                    component: () => import('@/views/community/faq.vue')
                },
                {
                    path: '/community/inquiry',
                    name: 'communityInquiry',
                    component: () => import('@/views/community/inquiry.vue')
                },
                {
                    path: '/community/notice',
                    name: 'communityNotice',
                    component: () => import('@/views/community/notice.vue')
                },
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/login',
            name: 'signIn',
            component: () => import('@/views/signIn.vue')
        },
        {
            path: '/test',
            name: 'test',
            component: () => import('@/views/test.vue')
        },
    ]
});

export default router;
