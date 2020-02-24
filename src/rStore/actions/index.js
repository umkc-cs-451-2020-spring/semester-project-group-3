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
export function renderLogin() {
  return { type: types.RENDER_LOGIN}
};
