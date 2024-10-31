<script>
import axios from 'axios';
import { mapState, mapActions, mapMutations } from 'vuex';
import store from './store';
axios.interceptors.request.use(
    function (config) {
        store.commit('MUTATION_LOADING', true);
        console.log('요청 전');
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
    function (response) {
        console.log('요청 후', store);
        store.commit('MUTATION_LOADING', false);
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default {
    computed: {
        ...mapState(['LOADING'])
    },
    mounted() {
        // this.ACTION_KCC_LOGIN({ password: '123456', usrId: 'REST_KWOLD' });
    },
    methods: {
        ...mapMutations(['MUTATION_LOADING'])
        // ...mapActions(['ACTION_KCC_LOGIN'])
    }
};
</script>

<template>
    <div>
        <div v-if="LOADING">
            <div style="position: fixed; width: 100%; height: 100%; background: #000; z-index: 9999; opacity: 0.7"></div>
            <img src="/src/static/loading.webp" style="margin-left: -50px; margin-top: -50px; position: absolute; z-index: 9999; left: 50%; top: 50%; width: 100px; height: 100px" />
        </div>
        <router-view />
    </div>
</template>

<style scoped></style>
