import {
    Dimensions,
    Alert,
    Platform, StatusBar
} from 'react-native';


const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height, width } = Dimensions.get('window');

export const isIPhoneX = () => Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS
    ? width === X_WIDTH && height === X_HEIGHT || width === XSMAX_WIDTH && height === XSMAX_HEIGHT
    : false;

export const StatusBarHeight = Platform.select({
    ios: isIPhoneX() ? 40 : 20,
    android: StatusBar.currentHeight,
    default: 0
})

export function isIOS(){
    return Platform.OS == 'ios' ? true : false;
}

const Constants = {

    BUTTON_IN : "In",
    BUTTON_OUT : "Out",
    BUTTON_TRANSFER : "Transfer",
    BUTTON_STARTLUNCH : "Start Lunch",
    BUTTON_ENDLUNCH : "End Lunch",
    BUTTON_STARTBREAK : "Start Break",
    BUTTON_ENDBREAK : "End Break",

    USER_SERVER : 'treeringClockServer',
    USER_COMPANY_CODE : 'companyCode',
    USER_EMAIL : 'email',
    CURRENT_USER : 'currentUser',

    TimeTypePayableWorked : 1,
    TimeTypePayableNotWorked : 2,
    TimeTypeNotPayable : 4,

    WINDOW_WIDTH :  Dimensions.get('window').width,
    WINDOW_HEIGHT : Dimensions.get('window').height,
    CELL_WIDTH : ( Dimensions.get('window').width - 50 ) / 3 ,
    
    Months : ['Jan', 'Feb','Mar','Apr', 'May','Jun','Jul','Org','Sep','Oct','Nov','Dec'],
    Days : ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],

    ucfirst: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    lcfirst: (string) => {
        return string.charAt(0).toLowerCase() + string.slice(1);
    },

    emptyString: (str) => {
        if (str != null) {
            str.replace(' ', '');
        }
        return str == "" || str == null;
    },

    numberToFix2 : (val)=>{        
        let number = parseFloat(val);
        if(!number){
            return null;
        }
        return number.toFixed(2)    
    },
    
    getDateStr:(date)=>{

        console.log('getDateStr function: ', typeof date, date);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let mins = date.getMinutes();
        if(month < 10){
            month = '0'+month
        }
        if(day < 10){
            day = '0'+day
        }
        if(hour < 10){
            hour = '0'+hour
        }
        if(mins < 10){
            mins = '0'+mins
        }
        // console.log('getDateStr function result: ', typeof date, date);
        return year+'-'+month+'-'+day;
    },
    
    getTimeStr:(date)=>{
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let mins = date.getMinutes();

        if(month < 10){
            month = '0'+month
        }
        if(day < 10){
            day = '0'+day
        }
        if(hour < 10){
            hour = '0'+hour
        }
        if(mins < 10){
            mins = '0'+mins
        }

        return hour+':'+mins+':00';
    },

     shortString : (value, len =30)=>{
        try{
            if( value.length > len){
                let res =  value.substr(0,len) + ' ...'
                return res
            }
            return value
    
        }catch( ex ){
            
            return null
        }        
    },

    getUserRoles : (index = null)=>{
        if( !global.curUser ){
            return null
        }
        
        let roles = global.curUser.roles
        if ( roles && roles.length > 0){
            
            return index == null ? roles : roles[index];
        }
        return null;
    },

    isCustomer : ()=>{
        let role = Constants.getUserRoles(0);
        if( role ){
            return role.slug == 'customer'
        }else{
            return null
        }
    
    },
    
    isDriver:()=>{
        let role = Constants.getUserRoles(0);
        if( role ){
            return role.slug == 'driver'
        }else{
            return null
        }
    },

    getDateTimeStr: (dateTimeObj, showSeconds = false)=>{
        // console.log('getDateTimeStr in function params: ', dateTimeObj)
        let h = dateTimeObj.getHours();
        let m = dateTimeObj.getMinutes();
        let s = dateTimeObj.getSeconds();
        h = h < 10 ? '0'+h : h;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;

        if( showSeconds == true ){
            return Constants.getDateStr(dateTimeObj) + ' ' + h + ':' + m + ':' + s;
        }else{
            return Constants.getDateStr(dateTimeObj) + ' ' + h + ':' + m ;
        }
    },

    

    style:{
        defaultShadow:{
            elevation: 5,                
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.2,
        }
    },
    

    orange: "#E98123",
    placeholderColor: '#fff8',
    fbColor: '#475993',
    googleColor: '#dd4b39',
    menuInactiveColor: '#4D4D4D',
    backWhite: '#E7F6FB',
    white: '#FFFFFF',
    lightBlue: '#64C7D1',
    green: '#C9FBBF', // 119F3B
    black:'#000',
    titleColor: '#707070',
    grayColor: '#a9a9a9',
    redColor: '#FB6B92',
    blueColor: '#309dfe',
    purpleColor:'#6733BB',
    opacityPurpleColor:'#6733BBBB',
    opacityBlack:'#00000099',
    transparent : '#FFFFFF00',
    LocationTaskName : 'location_back',
    
    yellow:'#F5B024',

    darkGold: '#BE8C22',
    lightGold: '#D5BD7E',

    checkoutBackLight: '#977725',
    checkoutBackDark : '#543A05',
    greyWhite: '#AFAFAF',
    darkWhite: '#9a9a9a',
    // backColor: '#F2F2F2'
    backColor: '#000000',
    secondBack: '#282C34'

}

export default Constants;


export const UserRole = {
    Model: 2,
    Designer: 3
}
