import moment from "moment";

export const formatDate = {
  fromFirebase(rawDate: string) {
    return moment(rawDate).format("YYYY/MM/DD");
  },
  toFirebase(rawDate: Date) {
    return moment(rawDate).format("YYYY-MM-DD");
  },
};
