import Cookies from 'js-cookie'

const keyGen = (key) => `AlicePlayer__${key}`

export default {
  set: (key, value) => {
    Cookies.set(keyGen(key), value, { expires: 7 })
  },
  get: (key) => {
    return Cookies.get(keyGen(key))
  },
  remove: (key) => {
    Cookies.remove(keyGen(key))
  },
}
