const baseurl = "http://172.23.15.102:8080/v1"
const api = {
  loginurl: baseurl +'/userinfo',
  uploadurl: baseurl + '/upload',
  repairflurl: baseurl +'/repaircategories',
  bxrecurl: baseurl +'/inquireinfo',
  repairtime: baseurl +'/repairtime'
}
module.exports = api;