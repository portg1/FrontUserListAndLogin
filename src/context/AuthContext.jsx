// store/useAuthStore.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axios'

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      loading: false,

      login: async (emailOrUserName, password) => {
        set({ loading: true })
        try {
          const { data } = await api.post('/api/auth/login', { emailOrUserName, password })
          set({ token: data.token, user: data.user })
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
          return data
        } catch (err) {
          console.error('Login failed:', err)
          throw err.response?.data?.message || 'Login failed'
        } finally {
          set({ loading: false })
        }
      },

      register: async (userName, email, password) => {
        set({ loading: true })
        try {
          const { data } = await api.post('/api/auth/register', { userName, email, password })
          set({ token: data.token, user: data.user })
          api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
          return data
        } catch (err) {
          console.error('Register failed:', err)
          throw err.response?.data?.message || 'Register failed'
        } finally {
          set({ loading: false })
        }
      },

      logout: () => {
        set({ token: null, user: null })
        delete api.defaults.headers.common['Authorization']
      },
    }),
    {
      name: 'auth-storage', // کلید localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // فقط اینا ذخیره می‌شن
    }
  )
)

// 🔄 افزودن interceptor برای logout در صورت 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const logout = useAuthStore.getState().logout
      logout()
    }
    return Promise.reject(err)
  }
)

// ⬇️ تنظیم توکن هنگام mount اولیه (در صورت موجود بودن در localStorage)
const { token } = useAuthStore.getState()
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default useAuthStore
