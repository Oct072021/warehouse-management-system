const state = {
  aliveComp: 'tab-pane'
}

const mutations = {
  REMOVE_ALIVE: state => {
    state.aliveComp = ' '
  },
  SET_ALIVE: state => {
    state.aliveComp = 'tab-pane'
  }
}

const actions = {
  removeAlive({ commit }) {
    commit('REMOVE_ALIVE')
  },
  setAlive({ commit }) {
    commit('SET_ALIVE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
