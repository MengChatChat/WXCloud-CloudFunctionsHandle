const cloud = require('wx-server-sdk')
const got = require('got')

let appid = '';
let secret = '';

let msgCheckUrl = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' 
let tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+secret

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let tokenResponse = await got(tokenUrl)
  let token = JSON.parse(tokenResponse.body).access_token;
  let checkResponse = await got(msgCheckUrl + token,{
    body:JSON.stringify({
      content: event.text
    })
  });
  return checkResponse.body
}