import { AsyncStorage } from 'react-native';
import { configConstants } from '../constant';

/**
 * utilityHelper
 *
 * @subpackage             utilityHelper
 * @category               Helper
 * @DateOfCreation         08 Jan 2019
 * @ShortDescription       This is responsible for exporting all utility functions
 */

export const utilityHelper = {
    setItem,
    doLogout,
    langExists
};


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible set the login access token and user info to cookies 
* @return                String
*/
async function setItem(key, value) {
    AsyncStorage.setItem(key, value);
    return true;
}


/**
* @DateOfCreation        08 Jan 2019
* @ShortDescription      This function is responsible remove all cookies
* @return                Boolean
*/

async function doLogout(){
    AsyncStorage.removeItem(configConstants.LOGIN_TOKEN);
    AsyncStorage.removeItem(configConstants.USER_ID);
    AsyncStorage.removeItem(configConstants.USER_FULL_INFO);
    AsyncStorage.removeItem(configConstants.AUTHENTICATE);
    return true;
}

/**
* @DateOfCreation        17 July 2020
* @ShortDescription      This function is responsible remove all cookies
* @return                Boolean
*/

function langExists(lg){
	var arr = [
      { lg: 'en', name: 'English' }, 
      { lg: 'hi', name: 'Hindi'}, 
      { lg: 'mr', name: 'Marathi' },
      { lg: 'te', name: 'Telugu' },
      { lg: 'bn', name: 'Bengali' },
      { lg: 'pa', name: 'Punjabi' }
    ];
    
	let obj = arr.find(o => o.lg === lg);
	return obj.name
}