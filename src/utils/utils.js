import wepy from 'wepy'

const request  = (url,method = 'GET',data = {})=>{
  wx.showLoading({title: '加载中...',mask: true});
  let token = wx.getStorageSync('token');
  return wepy.request({
    url: url,
    method: method,
    data: data,
    header: {
      Accept : 'application/vnd.houzz.v1+json',
      Authorization : `Bearer ${token}`,
    }
  }).catch(res=>{
    wx.showToast({title:"请求服务器数据异常",icon:'none'})
  });
}
const toast = (title,success)=>{
  wx.showToast({
    title: title,
    icon: success?'success':'none'
  })
}
//验证是否是手机号码
const vailPhone = (number)=> {
  let flag = false;
  let myreg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  if (number.length != 11) {
    flag = flag;
  }else if (!myreg.test(number)) {
    flag = flag;
  }else{
    flag = true;
  }
  return flag;
}
// 支付API
const weChatPay = (res)=>{
    return new Promise ((resolve,reject)=>{
        wx.requestPayment({
            timeStamp: res.data.message.timestamp,
            nonceStr: res.data.message.nonceStr,
            package: res.data.message.package,
            signType: 'MD5',
            paySign: res.data.message.paySign,
            success:(res)=> {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
module.exports = {
    request,
    toast,
    vailPhone,
    weChatPay
}