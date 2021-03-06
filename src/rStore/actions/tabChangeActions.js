import types from "../constants/action-types";
// Put the actions functions here.

export function renderDashboard() {
  return { type: types.RENDER_DASHBOARD}
};
export function renderTransaction() {
  return { type: types.RENDER_TRANSACTION}
};
export function renderNotification() {
  return { type: types.RENDER_NOTIFICATION}
};
export function renderApp() {
  return { type: types.RENDER_APP}
};
export function renderLogin() {
  return { type: types.LOGOUT}
}
export function renderSignUp() {
  return { type: types.SIGNUP}
}
export function renderForgotPass() {
  return { type: types.FORGOT_PASS}
}
export function renderAddTransactionForm() {
  return { type: types.ADD_TRANSACTION}
}