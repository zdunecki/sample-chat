(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,n){e.exports=n(74)},45:function(e,t,n){},46:function(e,t,n){},71:function(e,t){},74:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n.n(a),r=n(37),c=n.n(r),o=(n(45),n(46),n(9)),i=n(15),u=n(23),l=n(1),m=n.n(l),d=n(2),h=n(10),v=n(11),f=n(13),p=n(12),g=n(14),E=n(38),b=n.n(E),C=Object({NODE_ENV:"production",PUBLIC_URL:""}).API_URL||"http://localhost:5500",k=function(){var e=Object(d.a)(m.a.mark(function e(t){var n;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.json();case 2:if(n=e.sent,!(t.status>=400&&t.status<500)){e.next=5;break}throw n;case 5:return e.abrupt("return",n);case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),w={GET:function(){var e=Object(d.a)(m.a.mark(function e(t,n){var a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(C).concat(t),Object.assign({},n,{method:"GET"}));case 3:return a=e.sent,e.next=6,k(a);case 6:return e.abrupt("return",e.sent);case 9:throw e.prev=9,e.t0=e.catch(0),e.t0;case 12:case"end":return e.stop()}},e,this,[[0,9]])}));return function(t,n){return e.apply(this,arguments)}}(),POST:function(){var e=Object(d.a)(m.a.mark(function e(t,n,a){var s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(C).concat(t),Object.assign({},a,{method:"POST",body:JSON.stringify(n)}));case 3:return s=e.sent,e.next=6,k(s);case 6:return e.abrupt("return",e.sent);case 9:throw e.prev=9,e.t0=e.catch(0),e.t0;case 12:case"end":return e.stop()}},e,this,[[0,9]])}));return function(t,n,a){return e.apply(this,arguments)}}(),UPDATE:function(){var e=Object(d.a)(m.a.mark(function e(t,n,a){var s;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(C).concat(t),Object.assign({},a,{method:"UPDATE",body:JSON.stringify(n)}));case 3:return s=e.sent,e.next=6,k(s);case 6:return e.abrupt("return",e.sent);case 9:throw e.prev=9,e.t0=e.catch(0),e.t0;case 12:case"end":return e.stop()}},e,this,[[0,9]])}));return function(t,n,a){return e.apply(this,arguments)}}(),DELETE:function(){var e=Object(d.a)(m.a.mark(function e(t,n){var a;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(C).concat(t),Object.assign({},n,{method:"DELETE"}));case 3:return a=e.sent,e.next=6,k(a);case 6:return e.abrupt("return",e.sent);case 9:throw e.prev=9,e.t0=e.catch(0),e.t0;case 12:case"end":return e.stop()}},e,this,[[0,9]])}));return function(t,n){return e.apply(this,arguments)}}()},N={Public:{Chat:{connect:function(){return b()(C,{path:"/sockets"})}},Message:{getChannelLatest:function(){var e=Object(d.a)(m.a.mark(function e(t){return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w.GET("/messages/".concat(t,"/latest?isChannel=true"));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}}},O=function(e,t){return e.reduce(function(e,n){return e[n[t]]=n,e},{})},M=s.a.createContext(),j={ChannelMessage:"channel-message",PrivateMessage:"private-message",Join:"join",Connected:"connected",BroadcastConnection:"broadcast-connection",ChangeNickname:"change-nickname",NicknameChanged:"nickname-changed",CreateChannel:"create-channel",ChannelCreated:"channel-created",Disconnected:"disconnected"},y=function(e){function t(){var e,n;Object(h.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(f.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).socket=null,n.state={user:null,activeConservation:{id:null,isChannel:!1},channels:[],users:[],usersMap:{},messages:{},getMessages:function(){var e=Object(d.a)(m.a.mark(function e(t){return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n.setState({messages:n.newMessages(t,[])});case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),changeNickname:function(e){n.socket.emit(j.ChangeNickname,{userId:n.state.user.id,nickname:e}),n.setState({user:Object(u.a)({},n.state.user,{nickname:e})})},changeActiveConservation:function(){var e=Object(d.a)(m.a.mark(function e(t,a){var s,r;return m.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(s=!n.state.messages[t],e.prev=1,!s||!a){e.next=7;break}return e.next=5,N.Public.Message.getChannelLatest(t);case 5:r=e.sent,n.setState({messages:n.newMessages(t,r)});case 7:n.socket.emit(j.Join,{channelId:t}),n.setState({activeConservation:{id:t,isChannel:a||!1}}),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0),alert("Something went wrong during changing conservation");case 15:case"end":return e.stop()}},e,this,[[1,11]])}));return function(t,n){return e.apply(this,arguments)}}(),sendChannelMessage:function(e){var t=e.content,a=e.conservationId;n.socket.emit(j.ChannelMessage,{senderId:n.state.user.id,conservationId:a,content:t})},sendPrivateMessage:function(e){var t=e.to,a=e.content,s=e.conservationId;n.socket.emit(j.PrivateMessage,{to:t,from:n.state.user.id,conservationId:s,content:a})},createChannel:function(e){n.socket.emit(j.CreateChannel,{ownerId:n.state.user.id,name:e})}},n.newMessages=function(e,t){return Object(u.a)({},n.state.messages,Object(o.a)({},e,[].concat(Object(i.a)(n.state.messages[e]||[]),Object(i.a)(t))))},n}return Object(g.a)(t,e),Object(v.a)(t,[{key:"componentDidMount",value:function(){var e=this;try{var t=N.Public.Chat.connect();this.socket=t,t.on("connected",function(n){var a={id:n.user.id,nickname:n.user.nickname};e.setState({user:a,activeConservation:{id:n.user.id,isChannel:!1}}),e.state.getMessages(n.user.id),t.emit(j.Join,{id:n.user.id})}),t.on(j.BroadcastConnection,function(t){e.setState({users:t.users,usersMap:O(t.users,"id"),channels:t.channels})}),this.socket.on(j.NicknameChanged,function(t){var n=e.state.users.map(function(e){return e.id===t.user.id?t.user:e});e.setState({users:n,usersMap:O(n,"id")})}),this.socket.on(j.ChannelCreated,function(t){e.setState({channels:[].concat(Object(i.a)(e.state.channels),[t.channel])})}),this.socket.on(j.ChannelMessage,function(t){var n=e.state.messages[t.message.conservationId];e.setState({messages:e.newMessages(t.message.conservationId,[{conservationId:t.message.conservationId,isChannel:t.message.isChannel,senderId:t.message.senderId,content:t.message.content,createdAt:t.message.createdAt,showTimestamp:I(n,t.message)}])}),e.props.scrollBottom()}),this.socket.on(j.PrivateMessage,function(t){t.message.to===e.state.user.id?e.setState({messages:e.newMessages(t.message.from,[{content:t.message.content,senderId:t.message.from,createdAt:t.message.createdAt}])}):e.setState({messages:e.newMessages(t.message.to,[{content:t.message.content,senderId:t.message.from,createdAt:t.message.createdAt}])}),e.props.scrollBottom()}),this.socket.on("disconnected",function(t){var n=e.state.users.filter(function(e){return e.id!==t.userId});e.setState({users:n,usersMap:O(n,"id")})})}catch(n){console.error(n),alert("Cannot connect with chat")}}},{key:"render",value:function(){return s.a.createElement(M.Provider,{value:this.state},this.props.children)}}]),t}(a.Component),I=function(e,t){if(!e.length)return!0;var n=e.length;return function(e,t){var n=Math.abs(e-t);return Math.floor(n/1e3/60)}(new Date(e[n-1].createdAt),new Date(t.createdAt))>=10},x=M.Consumer,S=function(e){var t=e.data,n=e.isChannel;return s.a.createElement(x,null,function(e){return e.user&&s.a.createElement("div",{className:"conversation-list-item ".concat(e.activeConservation.id===t.id?"conversation-list-item--active":""),onClick:function(){return e.changeActiveConservation(t.id,n)}},s.a.createElement("img",{className:"conversation-photo",src:t.avatar}),s.a.createElement("div",{className:"conversation-info"},n?s.a.createElement("h1",{className:"conversation-title"},"#",t.name):s.a.createElement("h1",{className:"conversation-title"},t.id===e.user.id?"".concat(t.nickname," (me)"):t.nickname),s.a.createElement("p",{className:"conversation-snippet"},t.text)))})},A=function(e){var t=e.leftItems,n=e.middleItems,a=e.rightItems;return s.a.createElement("div",{className:"toolbar"},s.a.createElement("div",{className:"left-items"},t),s.a.createElement("div",{className:"middle-items"},n),s.a.createElement("div",{className:"right-items"},a))},P=function(){return s.a.createElement(x,null,function(e){return s.a.createElement("div",{className:"conversation-list"},s.a.createElement(A,{middleItems:s.a.createElement("span",null,"Channels and users")}),e.channels.map(function(e){return s.a.createElement(S,{key:e.id,data:e,isChannel:!0})}),e.users.map(function(e){return s.a.createElement(S,{key:e.id,data:e})}),s.a.createElement("div",{className:"compose-nickname"},s.a.createElement("div",{className:"compose-nickname-wrapper"},s.a.createElement("label",null,"Your nickname"),s.a.createElement("input",{type:"text",value:e.user?e.user.nickname:"",className:"compose-nickname-input",placeholder:"Change nickname",onChange:function(t){return e.changeNickname(t.target.value)}}))))})},D=function(){return s.a.createElement(x,null,function(e){return s.a.createElement("div",{className:"compose"},s.a.createElement("input",{type:"text",className:"compose-input",placeholder:"Type a message",onKeyPress:function(t){"Enter"===t.key&&(e.activeConservation.isChannel?e.sendChannelMessage({content:t.target.value,conservationId:e.activeConservation.id}):e.sendPrivateMessage({to:e.activeConservation.id,content:t.target.value,conservationId:e.activeConservation.id}),t.target.value="")}}))})},T=n(39),L=function(e){var t,n=e.messageFrom,a=e.data,r=e.isMine,c=e.startsSequence,o=e.endsSequence,i=e.showTimestamp;return s.a.createElement("div",{className:["message","".concat(r?"mine":""),"".concat(c?"start":""),"".concat(o?"end":"")].join(" ")},i&&s.a.createElement("div",{className:"timestamp"},[[(t=new Date(a.createdAt)).getFullYear(),"-"],[t.getMonth()+1,"-"],[t.getDate()," "],[t.getHours(),":"],[t.getMinutes(),""]].map(function(e){var t,n=Object(T.a)(e,2),a=n[0],s=n[1];return"".concat((t=a,t<10?"0".concat(t):t)).concat(s)}).join("")),s.a.createElement("div",{className:"bubble-container"},s.a.createElement("div",{className:"bubble-message-container"},s.a.createElement("span",{className:"message-from"},n),s.a.createElement("div",{className:"bubble"},a.content))))},B=s.a.createContext(),J=function(e){function t(){var e,n;Object(h.a)(this,t);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(n=Object(f.a)(this,(e=Object(p.a)(t)).call.apply(e,[this].concat(s)))).messageListDOM=null,n.state={messageListRef:function(e){return n.messageListDOM=e},scrollBottom:function(){n.messageListDOM.scrollIntoView({behavior:"smooth"})}},n}return Object(g.a)(t,e),Object(v.a)(t,[{key:"render",value:function(){return s.a.createElement(B.Provider,{value:this.state},this.props.children)}}]),t}(a.Component),U=B.Consumer,F=function(){var e=null;return s.a.createElement(x,null,function(t){return s.a.createElement("div",{className:"message-list"},s.a.createElement(A,{rightItems:s.a.createElement(a.Fragment,null,s.a.createElement("div",null,s.a.createElement("input",{ref:function(t){return e=t},type:"text",className:"new-channel-input",placeholder:"Type a channel name"}),s.a.createElement("button",{className:"new-channel-button",onClick:function(){t.createChannel(e.value),e.value=""}},"New channel")))}),s.a.createElement("div",{className:"message-list-container"},(t.messages[t.activeConservation.id]||[]).map(function(e,n){return s.a.createElement(L,{key:n,isMine:e.senderId===t.user.id,messageFrom:R(t,e),showTimestamp:e.showTimestamp||0===n,data:e})})),s.a.createElement(U,null,function(e){return s.a.createElement("div",{style:{float:"left",clear:"both"},ref:e.messageListRef})}),s.a.createElement(D,null))})},R=function(e,t){var n=e.usersMap[t.senderId];return n?n.nickname:"Deleted user"},G=function(){return s.a.createElement("div",{className:"messenger"},s.a.createElement("div",{className:"scrollable sidebar"},s.a.createElement(P,null)),s.a.createElement("div",{className:"scrollable content"},s.a.createElement(F,null)))},_=function(){return s.a.createElement("div",{className:"App"},s.a.createElement(J,null,s.a.createElement(U,null,function(e){return s.a.createElement(y,{scrollBottom:e.scrollBottom},s.a.createElement(G,null))})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[40,1,2]]]);
//# sourceMappingURL=main.345fa2b0.chunk.js.map