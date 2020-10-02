import { configConstants, loginConstants } from '../constant';
/**
 * loginReducer
 *
 * @subpackage             loginReducer
 * @category               Reducers
 * @DateOfCreation         06 dec 2018
 * @ShortDescription       This is responsible for all state related to login
 */
const initialState = {
  authenticated   : false,
  sendingRequest  : false,
  submitted       : false,
  successMsg      : false,
  errorMsg        : false,
  error           : false,
  serverDown      : false,
  userInfo        : '',
}
export function loginReducer(state = initialState, action) {console.log("action",action)
    switch (action.type) {
      
         // Login 
        case loginConstants.LOGIN_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
              userInfo         : ''
          };
        case loginConstants.LOGIN_SUCCESS:
          return  { 
              ...state,
              authenticated  : true,
              submitted      : false,
              errorMsg       : false,
              userInfo       : action.result
          };
        case loginConstants.LOGIN_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              submitted      : false,
              error          : true,
              errorMsg       : "Check email or password.",
              userInfo       : {}
           };

         // registration 
        case loginConstants.REGISTRATION_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
          };
        case loginConstants.REGISTRATION_SUCCESS:
          return  { 
              ...state,
              successMsg     : action.result,
              submitted      : false,
              errorMsg       : false
          };
        case loginConstants.REGISTRATION_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              submitted      : false,
              errorMsg       : action.error
           };

        // FORGOT_PASSWORD 
        case loginConstants.FORGOT_PASSWORD_REQUEST:
          return {
              ...state,
              errorMsg         : false,
              submitted        : true,
              authenticated    : false,
          };
        case loginConstants.FORGOT_PASSWORD_SUCCESS:
          return  { 
              ...state,
              successMsg     : action.result,
              submitted      : false,
              errorMsg       : false
          };
        case loginConstants.FORGOT_PASSWORD_FAILURE:
          return {
              ...state, 
              authenticated  : false,
              successMsg     : false,
              errorMsg       : action.error
           };
        
        case loginConstants.LOGIN_UPDATE_STATE:
          return {
            ...state,
            errorMsg      : false,
            submitted      : false,
          };
        case configConstants.SERVER_DOWN:
          return {
            ...state,
            serverDown: true
          }
        default:
            return state
    }
}

