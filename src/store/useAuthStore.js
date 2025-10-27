// src/store/useAuthStore.js
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
        
          const { data } = await api.post('/api/auth/login', { emailOrUserName, password })
          set({ token: data.token, user: data.user })
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))

          //دیتا رو برمیگردونه برای پیام خوش امدگویی 
          return data
 
      },

      register: async (userName, email, password) => {
        set({ loading: true })
    
          const { data } = await api.post('/api/auth/register', { userName, email, password })
          set({ token: data.token, user: data.user })
          return data

      },

      logout: () => {
        set({ token: null, user: null })
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      },
    }),
    // مربوط به میدلور پرسیست هست
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    }
  )
)




export default useAuthStore
