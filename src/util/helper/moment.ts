import moment from "moment";

export const getUnixTimeStamp = () => {
   return moment().unix();
}

export const unixToDate = (timestamp: number) => {
   return moment.unix(timestamp).toDate();
}


