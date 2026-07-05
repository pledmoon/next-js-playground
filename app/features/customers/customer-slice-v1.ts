/**
 * Types
 */
// initial state
type CustomerState = {
  fullName: string
  nationalId: string
  createdAt: string
}

// set of actions
type CreateCustomerAction = {
  type: 'customer/createCustomer'
  payload: CustomerState
}

type UpdateNameAction = {
  type: 'customer/updateName'
  payload: string
}

type CustomerAction = CreateCustomerAction | UpdateNameAction

/**
 * Initial State
 */
const initialStateCustomer = {
  fullName: '',
  nationalId: '',
  createdAt: '',
}

/**
 * Reducers must be pure functions, without API calls
 * For an unrecognized action, it should return the state unmodified (to be compatible with `combineReducers`)
 * If the given state is undefined, it should return an initial state that is not undefined.
 */
export const customerReducer = (
  state: CustomerState = initialStateCustomer,
  action: CustomerAction,
) => {
  switch (action.type) {
    case 'customer/createCustomer':
      return { ...state, ...action.payload }

    case 'customer/updateName':
      return { ...state, fullName: action.payload }

    default:
      return state
  }
}

/**
 * Actions creators - это соглашение, работать можно и без них,
 * это функции, возвращающие actions
 * для каждого action, создаем свой action creator
 * возвращает action, а action это объект
 */
export function createCustomer(fullName: string, nationalId: string): CreateCustomerAction {
  return {
    type: 'customer/createCustomer',
    payload: {
      fullName,
      nationalId,
      createdAt: new Date().toISOString(),
    },
  }
}

export function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  } as const
}
