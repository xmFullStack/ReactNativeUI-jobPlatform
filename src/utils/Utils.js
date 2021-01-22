import Constants from "./Constants";
import moment from "moment";

import {    
    Alert,  
  } from "react-native";

import AsyncStorage from '@react-native-community/async-storage';
import RestAPI from "./RestAPI";

const Utils = {

    shuffle: (arr) => {
        let endIndex = arr.length - 1
        let res = arr.map(x => x);

        for (let i = 0; i <= endIndex; i += 2) {

            const newIndex = Math.round(Math.random() * endIndex)
            let temp = res[i]
            res[i] = res[newIndex]
            res[newIndex] = temp
        }
        return res;
    },
    getBase64Png: (src) => {
        return 'data:image/png;base64,' + src
    },
    ValidateEmail: (inputText) => {
        var mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
        if (inputText.match(mailformat)) {
            return true;
        }
        else {
            return false;
        }
    },

    getLocaleTime: () => {
        let date = new Date();
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },
    toLocalDateTime: (timestamp) => {
        let date = new Date(timestamp)
        // let date = Date.parse();
        let res = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        console.log('Type of date parsed', typeof (date), date.toLocaleTimeString())
        return res;
    },

    CheckTimeDiff: (dateTime1, dateTime2, unit = 'seconds') => {
        console.log('dateTime1, dateTime2, unit > ', dateTime1, dateTime2, unit,typeof dateTime1,typeof dateTime2,)
        let dt1 = Constants.getDateStr(dateTime1) + ' ' + Constants.getTimeStr(dateTime1);
        let moment1 = moment(dt1, 'YYYY-MM-DD HH:mm:ss');

        let dt2 = Constants.getDateStr(dateTime2) + ' ' + Constants.getTimeStr(dateTime2);
        let moment2 = moment(dt2, 'YYYY-MM-DD HH:mm:ss');

        let diff = moment2.diff(moment1, unit);
        console.log(dateTime1, dateTime2, ' **** DIFF', diff)
        return diff;
    },

    GetHumanDateTimeFormat:(timeStr)=>{

        try{
            return  moment(timeStr, 'YYYY-MM-DD HH:mm:ss').startOf('hour').fromNow();  
        }catch(ex){
            console.log('Exception: ', ex)
            return 'NaN'
        }
      
    },

    timeStrAdded: (timeFullStr, valueAdded, unit = 'minutes') => {
        let mObj = moment(timeFullStr, 'YYYY-MM-DD HH:mm:ss').add(valueAdded, unit);
        return mObj.format('YYYY-MM-DD HH:mm:00');
    },

    timeDateFullStr: (time_str) => {
        try {
            return moment(time_str, 'YYYY-MM-DD HH:mm:ss', true).format('HH:mm,  D MMM YYYY')
        } catch (e) {
            return time_str;
        }
    },

    genRandPwd: () => {
        return Math.random().toString(36).slice(-8);
    },
    isHttp:(uri)=>{
        let prefix = uri.substr(0, "http".length);
        return prefix.toLowerCase() === "http"
    },

    isEmptyString:(val)=>{
        return !val || val === '' || val==="" ;
    },

    isEmptyStringTrim:(val)=>{
        let str = val.toString().trim();

        return !str || str === '' || str==="" ;
    },

     componentToHex : (c) => {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      },
      
      rgbToHex : (r, g, b)=> {
        return "#" + Utils.componentToHex(r) +  Utils.componentToHex(g) +  Utils.componentToHex(b);
      },

      hexToRgb: (hex)=> {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      },

    GetFontColor : (hexString)=>{
        let backColor = Utils.hexToRgb(hexString);
        let d = 0;

        // Counting the perceptive luminance - human eye favors green color... 
        let luminance = ( 0.299 * backColor.r + 0.587 * backColor.g + 0.114 * backColor.b)/255;

        if (luminance > 0.5)
        d = 0; // bright colors - black font
        else
        d = 255; // dark colors - white font
        let res = "rgba("+d+", "+d+", "+d+", 1)"
        console.warn(res)
        return res
    },

    saveCurUser : async(user)=>{
        if(user == null) {
            await AsyncStorage.removeItem('curUser');
            return 
        }
        try{
            let str = JSON.stringify(user);
            await AsyncStorage.setItem('curUser', str)
        }catch(ex){
            console.log(ex)
        }        
    },

    getCurUser : async()=>{
        try{
            let str = await AsyncStorage.getItem('curUser'); 
            console.log('local stored user data : ', str)           
            return JSON.parse(str)
        }catch(ex){
            console.log(ex)
            return null;
        }
    },

    getFileName : (fileUri)=>{
        const list = fileUri.split('/');
        const len = list.length
        if(len > 0){
            return list[len-1]
        }else{
            return fileUri
        }

    }

}

export default Utils;

