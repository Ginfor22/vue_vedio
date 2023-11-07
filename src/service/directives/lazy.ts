import {useIntersectionObserver} from '@vueuse/core'
export const lazy = {
  mounted(el: any, binding: any) {
    const {stop} = useIntersectionObserver(
        el,
        ([{isIntersecting}]) => {
          if (isIntersecting) {
            el.src = binding.value
            // 停止监听
            stop()
          }
        }
    )
  }
}
