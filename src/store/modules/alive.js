const state = {
  aliveArr: ['tab-pane']
}

const mutations = {
  RESET: () => {
    state.aliveArr = []
    state.aliveArr = ['tab-pane']
    console.log(state.aliveArr)
  }
}

const actions = {
  reset({ commit }) {
    commit('RESET')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
