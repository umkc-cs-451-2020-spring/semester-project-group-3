// add all actions here for cleanliness

const POST_NOTIFICATION_SETTINGS_FAILURE   = "POST_NOTIFICATION_SETTINGS_FAILURE";
const POST_NOTIFICATION_SETTINGS_SUCCESS   = "POST_NOTIFICATION_SETTINGS_SUCCESS";
const DELETE_NOTIFICATION_SETTINGS_FAILURE = "DELETE_NOTIFICATION_SETTINGS_FAILURE";
const POST_NOTIFICATION_SETTINGS_BEGIN     = "POST_NOTIFICATION_SETTINGS_BEGIN";
const DELETE_NOTIFICATION_SETTINGS_SUCCESS = "DELETE_NOTIFICATION_SETTINGS_SUCCESS";
const DELETE_NOTIFICATION_SETTINGS_BEGIN   = "DELETE_NOTIFICATION_SETTINGS_BEGIN";
const UPDATE_NOTIFICATION_SETTINGS_FAILURE = "UPDATE_NOTIFICATION_SETTINGS_FAILURE";
const UPDATE_NOTIFICATION_SETTINGS_BEGIN   = "UPDATE_NOTIFICATION_SETTINGS_BEGIN";
const UPDATE_NOTIFICATION_SETTINGS_SUCCESS = "UPDATE_NOTIFICATION_SETTINGS_SUCCESS";
const FETCH_NOTIFICATION_SETTINGS_FAILURE  = "FETCH_NOTIFICATION_SETTINGS_FAILURE";
const FETCH_NOTIFICATION_SETTINGS_SUCCESS  = "FETCH_NOTIFICATION_SETTINGS_SUCCESS";
const FETCH_NOTIFICATION_SETTINGS_BEGIN    = "FETCH_NOTIFICATION_SETTINGS_BEGIN";
const TRANSACTION_TYPE                     = 'TRANSACTION_TYPE';
const ADD_TRANSACTION                      = 'ADD_TRANSACTION';
const FORGOT_PASS                          = "FORGOT_PASS";
const NO_REMEMBER                          = "NO_REMEMBER";
const REMEMBER_ME                          = "REMEMBER_ME";
const SIGNUP                               = "SIGNUP";
const LOGIN_FAILURE                        = "LOGIN_FAILURE";
const LOGOUT                               = "LOGOUT";
const LOGIN_BEGIN                          = "LOGIN_BEGIN";
const FETCH_NOTIFICATIONS_FAILURE          = "FETCH_NOTIFICATIONS_FAILURE";
const FETCH_NOTIFICATIONS_BEGIN            = "FETCH_NOTIFICATIONS_BEGIN";
const FETCH_TRANSACTIONS_FAILURE           = "FETCH_TRANSACTIONS_FAILURE";
const FETCH_NOTIFICATIONS_SUCCESS          = "FETCH_NOTIFICATIONS_SUCCESS";
const FETCH_TRANSACTIONS_SUCCESS           = "FETCH_TRANSACTIONS_SUCCESS";
const FETCH_TRANSACTIONS_BEGIN             = "FETCH_TRANSACTIONS_BEGIN";
const SET_CURRENT_USER                     = "SET_CURRENT_USER";
const RENDER_APP                           = "RENDER_APP";
const RENDER_NOTIFICATION                  = "RENDER_NOTIFICATION";
const RENDER_TRANSACTION                   = "RENDER_TRANSACTION";
const RENDER_DASHBOARD                     = "RENDER_DASHBOARD";


export default {
  RENDER_DASHBOARD,
  RENDER_TRANSACTION,
  RENDER_NOTIFICATION,
  RENDER_APP,
  SET_CURRENT_USER,
  FETCH_TRANSACTIONS_BEGIN,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_NOTIFICATIONS_BEGIN,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  LOGIN_BEGIN,
  LOGIN_FAILURE,
  LOGOUT,
  SIGNUP,
  REMEMBER_ME,
  NO_REMEMBER,
  ADD_TRANSACTION,
  TRANSACTION_TYPE,
  FETCH_NOTIFICATION_SETTINGS_SUCCESS,
  FETCH_NOTIFICATION_SETTINGS_BEGIN,
  FETCH_NOTIFICATION_SETTINGS_FAILURE,
  UPDATE_NOTIFICATION_SETTINGS_BEGIN,
  UPDATE_NOTIFICATION_SETTINGS_SUCCESS,
  UPDATE_NOTIFICATION_SETTINGS_FAILURE,
  POST_NOTIFICATION_SETTINGS_BEGIN,
  POST_NOTIFICATION_SETTINGS_SUCCESS,
  POST_NOTIFICATION_SETTINGS_FAILURE,
  DELETE_NOTIFICATION_SETTINGS_BEGIN,
  DELETE_NOTIFICATION_SETTINGS_SUCCESS,
  DELETE_NOTIFICATION_SETTINGS_FAILURE,
  FORGOT_PASS
};
