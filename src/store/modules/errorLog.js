const state = {
  logs: [{
    err: {
      message: 'Cannot read properties of undefined (reading "total")',
      stack: 'TypeError:Cannot read properties of undifine(reading "total") at .........'
    },
    info: 'Operation Fail',
    url: 'https://github.com'
  }, {
    err: {
      message: 'Uncaught(in promise) TypeError: Fail to fetch',
      stack: 'Uncaught(in promise) TypeError: Fail to fetch'
    },
    info: 'ERR_NETWORK',
    url: 'https://github.com/Oct072021/warehouse-management-system'
  }]
}

const mutations = {
  ADD_ERROR_LOG: (state, log) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: (state) => {
    state.logs.splice(0)
  }
}

const actions = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
