import Api from '@/services/Api'

export default {
  index () {
    return Api().get('songs')
  },
  show (songId) {
    return Api().get(`songs/${songId}`)
  },
  post (song) {
    return Api().post('song', song)
  },
  put (song) {
    return Api().put(`songs/${song._id}`,song)
  }
}
