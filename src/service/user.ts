import router from '@/router'
import { AuthLogin, PostAuthLogin, PostAuthSendCode } from '../service/auth'
import { ElMessage } from 'element-plus'
import {defineStore, StoreDefinition} from 'pinia'
// import "vue-router/dist/vue-router";

export let userStore: StoreDefinition<"user", {
    userInfo: {
        userNum: string;
        birthdate: string;
        gender: string;
        ipLocation: string;
        signature: string;
        userAvatar: string;
        type: string;
        userId: number;
        phone: string;
        school: string;
        createTime: string;
        location: string;
        email: string;
        username: string
    };
    token: string
}, {
    isLogin(): boolean;
    logout(): void;
    codeLogin(email: string, code: string): Promise<void>;
    postCode(email: string): Promise<void>;
    login(userInfo: any): Promise<void>
}>;
const defineStore = defineStore;
userStore = defineStore('user',
    {
    state: () => ({
        token: localStorage.getItem('token') || '',
        userInfo: {
            userId: 0,
            username: '',
            type: '',
            userAvatar: '',
            email: '',
            phone: '',
            userNum: '',
            ipLocation: '',
            gender: '',
            birthdate: '',
            school: '',
            location: '',
            signature: '',
            createTime: ''
        }
    }),
        methods:{
            handle(){
                this.$router.push('../components/modify')
            }
        },

    actions: {
        // 设置用户信息, 调用登录接口
        async login(userInfo: any) {
            try {
                const data = await AuthLogin(userInfo)
                const {token, ...userData} = data.data

                // 存储到 state
                this.userInfo = Object.assign(this.userInfo, userData)

                // 存储到 localStorage
                localStorage.setItem('token', token)
                this.token = token
                ElMessage({
                    message: data.msg,
                    type: 'success'
                })
                window.location.reload()
            } catch (e: any) {
                ElMessage({
                    message: e || '登录失败',
                    type: 'error'
                })
            }
        },
        //判断是否登录
        isLogin() {
            return this.token !== ''
        },
        logout() {
            // 清空用户信息为空对象
            this.userInfo = {} as any
            this.token = ''
            // 清空本地存储
            localStorage.clear()
            window.location.reload()
        },

        async postCode(email: string) {
            const data = await PostAuthSendCode(email)
            console.log(data)
        },
        async codeLogin(email: string, code: string) {
            const data = await PostAuthLogin(email, code)
            console.log(data)
        }
    },
    persist: {
        enabled: true,
        strategies: [
            {
                key: 'pinia-state',
                paths: ['userInfo'],
                storage: localStorage
            }
        ]
    }
});
