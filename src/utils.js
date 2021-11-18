import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"


dayjs.extend(duration)
dayjs.extend(relativeTime)

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function getFirstLetterOfUserName(userName) {
  return userName.charAt(0).toUpperCase()
}

export function timeDifference(posted) {
  return dayjs.duration(dayjs(posted).diff(dayjs())).humanize(true)
}