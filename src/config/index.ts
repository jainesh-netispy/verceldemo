const isProduction = process.env.NODE_ENV === 'production'
const isDevelopment = !isProduction

const CONFIG = {
  isProduction,
  isDevelopment,
  baseURL: '/',
  title: 'My Boiler',
  http: {
    baseURL: 'http://localhost:3333/api',
  },
  github: {
    clientId: isProduction ? '789d87c19dd5ed1dc42e' : '489b39e1f91d934128c8',
    callbackURL: `/api/passport/github/callback`,
    repositoryUrl: 'https://github.com/xjh22222228/tomato-work',
    bug: 'https://github.com/xjh22222228/tomato-work/issues',
  },
}

export default CONFIG
