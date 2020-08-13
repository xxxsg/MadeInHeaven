//app.js

var app = getApp();

App({
  /**
   * 数据
   */
  appData: {
    userIsLogin: null, //此数据用来记录用户是否登陆，登陆了即为用户Id
    userPageChange: false,//更改用户数据的flag
    userPageLoginChange: false,//更改用户的flag
    userPageExit: false,//用户退出flag
    billDeal: null,
    token: null,
    SocketTask: null,//websocket
    socketIsOpen: false,//websockcet是否正在打开
    //心跳
    timeout: 20000,//心跳的延迟
    timeoutObj: null,
    serverTimeoutObj: null,
    //重连
    reconnetLimit: 0,
    reconnetTimer: null,
    reconnetLock: false,
    //账单
    bill:null,
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },

  /**
   * 心跳连接
   */
  reset: function () {
    clearTimeout(this.appData.timeoutObj);
    clearTimeout(this.appData.serverTimeoutObj);
    return this;
  },

  start: function () {
    this.appData.timeoutObj = setTimeout(() => {
      console.log("发送ping", JSON.stringify({ head: "heartRequest", value: "ping" }));
      this.appData.SocketTask.send({
        data: JSON.stringify({
          head: "heartRequest",
          value: "ping"
        })
      })
      this.appData.serverTimeoutObj = setTimeout(() => {
        console.log("超时")
        this.appData.SocketTask.close();
      }, this.appData.timeout);
    }, this.appData.timeout);
  },

  /**
   * 连接socket
   */
  linkWebSocket: function(){
    console.log("连接")
    var that = this;
    that.appData.SocketTask = wx.connectSocket({
      url: 'wss://madeinheavon-repo-madeinheaven.app.secoder.net/messageServer',
      header: {
        'content-type': 'application/json'
      },
      protocols: [that.appData.token],
      success: function (res) { console.log("request socket success") },
      fail: function (res) { console.log("request socket failed") },
      complete: function (res) { },
    })
  },

  /**
   * 重连
   */
  reconnetWebSocket: function(){
    if(this.appData.reconnetLock)return;
    this.appData.reconnetLock = true;
    clearTimeout(this.appData.reconnetTimer)
    /** 每五秒 重连十次 */
    if (this.appData.reconnetLimit < 10) {
      this.appData.reconnetTimer = setTimeout(() => {
        this.webSocket();
        this.appData.reconnetLock = false;
      }, 5000);
      this.appData.reconnetLimit = this.appData.reconnetLimit + 1;
    }else{
      console.log("重连失败")
      this.appData.socketIsOpen = false;
      that.appData.userPageExit = true;
    }
  },

  /** 
   * socket配置文件
   */
  webSocket: function () {
    var that = this;
    this.linkWebSocket();
    /** 打开以后soketIsOpen设置为true */
    that.appData.SocketTask.onOpen(res => {
      console.log("onOpen" , res)
      that.appData.socketIsOpen = true;
      that.appData.reconnetLimit = 0
      //心跳重连
      that.reset().start();
    })
    /** 监听关闭信息 */
    that.appData.SocketTask.onClose(res => {
      console.log("onclose", res)
      that.reset();
      if (that.appData.socketIsOpen == true){
        //重连      
        that.reconnetWebSocket();
      }else{
        console.log("真关")
      }
    })
    /** 监听错误信息 */
    that.appData.SocketTask.onError(res => {
      console.log("onError",res)
      if (that.appData.socketIsOpen == true) {
        //重连      
        that.reconnetWebSocket();
      } else {
        console.log("真关")
        that.appData.userPageExit = true;
      }
    })
    /** 接收到信息 */
    that.appData.SocketTask.onMessage(res => {
      console.log("onMessage", res)
      try {
        var messageData = JSON.parse(res.data);
        if (messageData.head == "dealConfirm") {//bill come
          that.reciveMessage(messageData)
        } else if (messageData.head == "heartResponse" && messageData.value == "pong") {
          /**收到的是心跳函数 */
          that.reset().start();
        }
      } catch (e) {
        console.log("message is not a json");
        return;
      }
    })
  },

  /**
   * 接收到提示信息
   */
  reciveMessage: function (res) {
    var that = this;
    //账单赋值
    that.appData.bill = res;
    wx.switchTab({
      url: '/store-pages/recive-bill/recive-bill',
    })
  },

  /**
   * 关闭socket,socketIsOpen设置为false
   */
  closeSocket: function(){
    var that = this;
    console.log("主动关闭soket")
    if (that.appData.socketIsOpen){
      that.appData.SocketTask.close()
    }
    that.appData.socketIsOpen = false;
  },

  /**
   * 发送信息
   */
  sendMessage: function (res, id) {
    var that = this;
    this.appData.SocketTask.send({
      data: JSON.stringify({
        id: id,
        head: "dealResponse",
        value: res
      })
    })
  },
})
