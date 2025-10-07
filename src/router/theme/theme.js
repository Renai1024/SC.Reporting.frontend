
import { useDark } from '@vueuse/core'
import { useRoute } from 'vue-router'

export function useRouteTheme() {
    const route = useRoute()
    const isDark = useDark()

    // 需要亮色模式的路由配置
    const lightModeRoutes = [
        '/report/mes/inspection_record'
    ]

    const setThemeByRoute = (path = null) => {
        const currentPath = path || route.path
        const shouldUseLight = lightModeRoutes.some(route =>
            currentPath.startsWith(route)
        )

        isDark.value = !shouldUseLight
    }

    // 监听路由变化
    watch(() => route.path, (newPath) => {
        setThemeByRoute(newPath)
    }, { immediate: true })

    return {
        setThemeByRoute
    }
}