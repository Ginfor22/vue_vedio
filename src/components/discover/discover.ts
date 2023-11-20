import { getCategoriesVideoList } from './discover_api.ts'
import { defineStore } from 'pinia'

export const discoverStore = defineStore('discover', {
    state: () => ({
        categoriesList: []
    }),

    actions: {
        // 获取分类视频列表
        async getCategoriesList(
            currentPage: any,
            pageSize: any,
            categoriesName: any
        ) {
            const data = await getCategoriesVideoList(
                currentPage,
                pageSize,
                categoriesName
            )

            this.categoriesList = data.data
        }
    },
    persist: {
        enabled: true
    }
})
