import axios from 'axios'; 
import { configConstants } from '../constant';

/**
 * login
 *
 * @subpackage             login
 * @category               Service
 * @DateOfCreation         08 Jan 2019
 * @ShortDescription       This is responsible for calling API
 */
export const loginService = {
    login,
    registration,
    doctorRegistration,
    forgotPassword
};



/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function login(data) {
    // console.log('-----',configConstants.API_BASE_PATH +  'patient-login')
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/login'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function registration(data) {
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/patient-signup'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function doctorRegistration(data) {
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/auth/doctor-signup'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}

/**
* @DateOfCreation        09 June 2019
* @ShortDescription      This function is responsible to call login api
* @param                 JSON jsonObj
* @return                Response JSON jsonObj
*/
function forgotPassword(data) {
    return axios({
        method  : 'post',
        data    : data,
        url     : configConstants.API_BASE_PATH +  '/passwords/create'
    })
    .then(response => {
        return response;
    })
    .catch(response => {
        return response;
    });
}
