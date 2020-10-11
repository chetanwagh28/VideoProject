/**
 * configConstants
 *
 * @subpackage             Config Constants
 * @category               Constants
 * @DateOfCreation         06 Dec 2018
 * @ShortDescription       This is responsible for Config Constants action names
 */
export const configConstants = {
    
    // API_BASE_PATH       : 'http://localhost:3000/api/v1/',
    // API_BASE_PATH_Slash : 'http://localhost:3000/api/v1',
    API_BASE_PATH       : 'http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100',
    API_BASE_PATH_Slash : 'http://ec2-13-234-225-190.ap-south-1.compute.amazonaws.com:3100',

    SUCCESS_CODE        :  200,
    ERROR_CODE          :  400,
    EXCEPTION_CODE      :  400,
    UNAUTHENTICATE_CODE :  401,
    LOGIN_TOKEN         : 'token',
    USER_ID             : 'user_id',
    USER_INFO           : 'user_info',
    AUTHENTICATE        : 'authenticate',
    USER_FULL_INFO      : 'info',
    SERVER_DOWN         : 'SERVER_DOWN'
};
