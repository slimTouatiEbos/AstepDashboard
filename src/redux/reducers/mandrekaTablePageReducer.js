const initialState = {
  sidebarShow: true,
  mandrekaTablePage: 1,
}

export const mandrekaTablePage = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}
