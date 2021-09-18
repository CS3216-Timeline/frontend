import moment from "moment";

export const convertUTCtoYYYYMMDDHHMM = (timestamp) => {
  return moment
    .utc(timestamp)
    .local()
    .format("YYYY-MM-DD HH:mm A")
}
