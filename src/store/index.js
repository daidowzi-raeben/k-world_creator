import { createStore } from 'vuex'
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();


// Create a new store instance.
const store = createStore({
    state() {
        return {
            LOADING: false,
            DUPLICATE_ID: true,
            TEST: {},
            MENU_LIST: {
                DEPTH1: [],
                DEPTH2: [],
            },
            BRAND_LIST: [],
            MEMBER: {
                LIST: []
            },
            TERM_LIST: {
                list: []
            },
            ORDERS: {
                LIST: {}
            },
            GOODS: {
                DATA: {},
                LIST: {},
                COLOR: [],
                THUMB: {
                    T: [],
                    D: [],
                    O: [],
                },
                OPTIONS: {
                    cnt: 0,
                    img: [],
                },
                TERM: {
                    delivery: {},
                    as: {},
                    exchange: {},
                    refund: {},
                },
                DETAIL: {}
            },
            BASE: '',
            BANNER: {
                LIST: [],
                DETAIL: {}
            },
            REQUEST: {
                LIST: [],
                DETAIL: {}
            },
            REVIEW: {
                LIST: [],
                DETAIL: {}
            },
            CONTENT: {
                LIST: [],
                DETAIL: {}
            },
            FAQ: {
                LIST: [],
                DETAIL: {}
            },
            POINT: {
                LIST: [],
                DETAIL: {}
            }
        }
    },
    mutations: {
        MUTATION_OPTIONS_DATA(state, payload) {
            state.GOODS.DATA = payload
        },
        MUTATION_OPTIONS_LIST(state, payload) {
            state.GOODS.OPTIONS = payload
        },
        MUTATION_THUMB_O(state, payload) {
            state.GOODS.THUMB.O.push(payload)
        },
        MUTATION_THUMB_D(state, payload) {
            state.GOODS.THUMB.D.push(payload)
        },
        MUTATION_THUMB_T(state, payload) {
            state.GOODS.THUMB.T.push(payload)
        },
        MUTATION_MENU_LIST(state, payload) {
            console.log('payload', payload)
            state.MENU_LIST.DEPTH1 = payload?.data
        },
        MUTATION_LOADING(state, payload) {
            state.LOADING = payload
        },
        MUTATION_MENU_LIST2(state, payload) {
            console.log('payload', payload)
            state.MENU_LIST.DEPTH2 = payload?.data
        },
        MUTATION_BRAND_LIST(state, payload) {
            console.log('payload', payload)
            state.BRAND_LIST = payload
        },
        MUTATION_MEMBER_LIST(state, payload) {
            console.log('payload', payload)
            state.MEMBER.LIST = payload
        },
        MUTATION_TERM_LIST(state, payload) {
            console.log('payload', payload)
            state.TERM_LIST = payload
        },
        MUTATION_TERM_GOODS(state, payload) {
            console.log('payload', payload)
            state.GOODS.TERM = payload
        },
        MUTATION_COLOR_LIST(state, payload) {
            console.log('payload', payload)
            state.GOODS.COLOR = payload
            state.GOODS.COLOR.forEach((v, i) => {
                state.GOODS.COLOR[i]['check'] = false
                state.GOODS.COLOR[i]['color'] = state.GOODS.COLOR[i].color_code
            });
        },
        MUTATION_GOODS_LIST(state, payload) {
            console.log('payload', payload)
            state.GOODS.LIST = payload
        },
        MUTATION_ORDER_LIST(state, payload) {
            console.log('payload', payload)
            state.ORDERS.LIST = payload
        },
        MUTATION_BASE(state, payload) {
            console.log('payload', payload)
            state.BASE = payload
        },
        MUTATION_BANNER_LIST(state, payload) {
            console.log('payload', payload)
            state.BANNER.LIST = payload
        },
        MUTATION_REQUEST_LIST(state, payload) {
            console.log('payload', payload)
            state.REQUEST.LIST = payload
        },
        MUTATION_REQUEST_DETAIL(state, payload) {
            console.log('payload', payload)
            state.REQUEST.DETAIL = payload
        },
        MUTATION_REVIEW_LIST(state, payload) {
            console.log('payload', payload)
            state.REVIEW.LIST = payload
        },
        MUTATION_REVIEW_DETAIL(state, payload) {
            console.log('payload', payload)
            state.REVIEW.DETAIL = payload
        },
        MUTATION_CONTENT_LIST(state, payload) {
            console.log('payload', payload)
            state.CONTENT.LIST = payload
        },
        MUTATION_CONTENT_DETAIL(state, payload) {
            console.log('payload', payload)
            state.CONTENT.DETAIL = payload
        },
        MUTATION_POINT_LIST(state, payload) {
            console.log('payload', payload)
            state.POINT.LIST = payload
        },
        MUTATION_POINT_DETAIL(state, payload) {
            console.log('payload', payload)
            state.POINT.DETAIL = payload
        },
        MUTATION_FAQ_LIST(state, payload) {
            console.log('payload', payload)
            state.FAQ.LIST = payload
        },
        MUTATION_FAQ_DETAIL(state, payload) {
            console.log('payload', payload)
            state.FAQ.DETAIL = payload
        },
        MUTATION_BANNER_DETAIL(state, payload) {
            console.log('payload', payload)
            state.BANNER.DETAIL = payload
        },
        MUTATION_GOODS_DETAIL(state, payload) {
            console.log('payload', payload)
            state.GOODS.DETAIL = payload
        },
        MUTATION_DUPLICATE_ID(state, payload) {
            console.log('payload', payload)
            state.DUPLICATE_ID = payload
            if (payload?.result === 'FALSE') {
                alert('사용할 수 없는 아이디 입니다.')
            } else {
                alert('사용 가능한 아이디 입니다.')
            }
        },

    },
    actions: {
        ACTION_MENU_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/cate.php`, params)
                .then(function (response) {
                    console.log(response?.data);
                    if (params?.parentCode) {
                        commit('MUTATION_MENU_LIST2', response?.data)
                    } else {
                        commit('MUTATION_MENU_LIST', response?.data)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_BRAND_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/goods.php`, params)
                .then(function (response) {
                    console.log(response?.data);
                    commit('MUTATION_BRAND_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_MEMBER_ADD({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/login.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('등록되었습니다.')
                    // router.push('/user/list');
                    location.href = '/user/list'
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_MEMBER_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/member.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_MEMBER_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_TERM_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/term.php`, params)
                .then(function (response) {
                    console.log(response)
                    // alert('등록되었습니다.')
                    commit('MUTATION_TERM_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_TERM_ADD({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/term.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('등록되었습니다.')
                    commit('MUTATION_TERM_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_TERM_GOODS({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/term.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_TERM_GOODS', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_COLOR_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/goods.php`, params)
                .then(function (response) {
                    console.log(response?.data);
                    commit('MUTATION_COLOR_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_GOODS_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/goods.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_GOODS_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_GOODS_INSERT({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/goods.php`, params)
                .then(function (response) {
                    console.log(response)
                    // commit('MUTATION_GOODS_LIST', response?.data)
                    alert('등록되었습니다.')
                    location.href = '/shop/productad'
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_ORDER_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/order.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_ORDER_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_DUPLICATE_ID({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/login.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_DUPLICATE_ID', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_BANNER_ADD({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/event.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('등록되었습니다.')
                    // router.push('/user/list');
                    location.href = '/event/list'
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_BANNER_USE({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/event.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('success')

                    axios
                        .post(`${import.meta.env.VITE_API_URL}/event.php`, { mode: 'list' })
                        .then(function (response) {
                            console.log(response)
                            commit('MUTATION_BANNER_LIST', response?.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_CONTENT_USE({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/content.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('success')

                    axios
                        .post(`${import.meta.env.VITE_API_URL}/content.php`, { mode: 'listAdmin' })
                        .then(function (response) {
                            console.log(response)
                            commit('MUTATION_CONTENT_LIST', response?.data)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_FAQ_ADD({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/request.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('success')
                    location.href = '/shop/faq'

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_BANNER_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/event.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_BANNER_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_BANNER_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/event.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_BANNER_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_GOODS_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/goods.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_GOODS_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_REQUEST_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/request.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_REQUEST_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_REQUEST_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/request.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_REQUEST_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_REQUEST_ADD({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/request.php`, params)
                .then(function (response) {
                    console.log(response)
                    alert('등록되었습니다.')
                    // router.push('/user/list');
                    location.href = '/shop/qa'
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_REVIEW_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/review.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_REVIEW_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_REVIEW_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/review.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_REVIEW_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_CONTENT_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/content.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_CONTENT_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_CONTENT_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/content.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_CONTENT_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_POINT_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/member.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_POINT_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_FAQ_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/request.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_FAQ_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        ACTION_FAQ_LIST({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/request.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_FAQ_LIST', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        ACTION_POINT_DETAIL({ commit }, params) {
            axios
                .post(`${import.meta.env.VITE_API_URL}/member.php`, params)
                .then(function (response) {
                    console.log(response)
                    commit('MUTATION_POINT_DETAIL', response?.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    },
})


export default store
// const app = createApp({ /* your root component */ })

// Install the store instance as a plugin
// app.use(store)