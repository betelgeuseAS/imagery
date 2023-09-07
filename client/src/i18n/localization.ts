import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        // Authentication
        welcome: 'Welcome to Imagery! 👋',
        sigh_in_label: 'Please sign-in to your account and start the adventure',
        remember_me: 'Remember Me',
        forgot_password: 'Forgot Password',
        new_on_platform: 'New on our platform',
        create_account: 'Create an account',
        login: 'Login',

        // Forms
        email: 'Email',
        password: 'Password',

        // Other
        or: 'or'
      }
    },
    ua: {
      translations: {
        // Authentication
        welcome: 'Ласкаво просимо до Imagery! 👋',
        sigh_in_label: 'Будь ласка, увійдіть до свого облікового запису та розпочніть пригоду',
        remember_me: "Запам'ятати мене",
        forgot_password: 'Забули пароль',
        new_on_platform: 'Вперше на нашій платформі',
        create_account: 'Створити профіль',
        login: 'Увійти',

        // Forms
        email: 'Електронна пошта',
        password: 'Пароль',

        // Other
        or: 'або'
      }
    }
  },

  fallbackLng: 'en',
  // debug: true,

  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false,

  interpolation: {
    escapeValue: false
  }
})

export default i18n
