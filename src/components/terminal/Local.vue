<template>
  <div id="terminal" style="margin: 30px 0 0 0"></div>
</template>

<script>
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
var term = new Terminal({
  cursorBlink: true, // 光标闪烁
  cursorStyle: "block", // 光标样式  null | 'block' | 'underline' | 'bar'
  scrollback: 800, //回滚
  tabStopWidth: 8, //制表宽度
  screenKeys: true,
});
var socket;

export default {
  data() {
    return {
      path: "ws://127.0.0.1:8080/ws",
      socket: "",
    };
  },
  // 初始化页面后执行
  mounted() {
    // 创建实例
    term.open(document.getElementById("terminal"));

    // 换行并输入起始符“$”
    term.prompt = () => {
      term.write("\r\n$ ");
    };

    //ondta方法是terminal获取输入数据的方法，因此要在这里给后台发送数据
    term.onData(function (data) {
      //键盘输入时的回调函数
      term.write(data);
      socket.send(data);
    });

    this.init();
  },
  methods: {
    init: function () {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        socket = this.socket;
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open: function () {
      console.log("socket连接成功");
    },
    error: function () {
      console.log("连接错误");
    },
    getMessage: function (msg) {
      console.log(msg.data);
      term.write(msg.data);
    },
    send: function () {
      this.socket.send(params);
    },
    close: function () {
      console.log("socket已经关闭");
    },
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close;
  },
};
</script>