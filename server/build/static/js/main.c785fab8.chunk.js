(this["webpackJsonpmerge-app"]=this["webpackJsonpmerge-app"]||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);var i=n(1),s=n.n(i),r=n(3),c=n.n(r),l=(n(12),n(4)),a=n(5),u=n(7),o=n(6),b=(n(13),n(0)),j=function(t){Object(u.a)(n,t);var e=Object(o.a)(n);function n(){var t;Object(l.a)(this,n);for(var i=arguments.length,s=new Array(i),r=0;r<i;r++)s[r]=arguments[r];return(t=e.call.apply(e,[this].concat(s))).state={values:null,submitted:!1,splitValues:[],splitting:!1,merging:!1},t.onValueChanged=function(e){var n=e.target.value.replace(" ","").split(",").filter((function(t){return!isNaN(parseInt(t))}));t.setState({values:n})},t.onValueSubmit=function(e){t.setState({submitted:!0,splitValues:[t.state.values],splitting:!0,merging:!1})},t.onNextStep=function(e){if(t.state.splitting){var n=t.state.splitValues,i=[],s=!0;n.forEach((function(t){var e=Math.ceil(t.length/2),n=t.splice(0,e);n.length>0&&(s=1===n.length&&s,i.push(n));var r=t.splice(-e);r.length>0&&(s=1===r.length&&s,i.push(r))})),t.setState({splitValues:i,splitting:!s,merging:s})}else{var r=t.state.splitValues.reduce((function(t,e,n,i){return n%2===0&&t.push(i.slice(n,n+2)),t}),[]);console.log(r);var c=[];r.forEach((function(e){e.length>1?(e[0].forEach((function(n){t.insertLoc(n,e[1])})),c.push(e[1])):c.push(e[0])})),console.log(c),t.setState({splitValues:c})}},t.insertLoc=function(t,e){return e.splice(this.findInsertLoc(t,e)+1,0,t),e},t.findInsertLoc=function(t,e){for(var n=0;n<e.length;n++)if(parseInt(e[n])>parseInt(t))return n-1;return e.length},t.valueField=function(){if(!t.state.submitted)return Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{type:"text",pattern:"^(?:\\d+,\\s?)*\\d+$",size:"100",onChange:t.onValueChanged}),Object(b.jsx)("button",{onClick:t.onValueSubmit,children:"Submit"})]})},t.controlField=function(){return t.state.submitted?Object(b.jsx)("button",{onClick:t.onNextStep,children:"Next Step"}):void 0},t.sortTable=function(){if(null!==t.state.values)return Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{children:t.tableData()})})},t.tableData=function(){return Object(b.jsx)("tr",{children:t.state.values.map((function(t,e){return Object(b.jsx)("td",{children:t},e)}))})},t.splitData=function(){return Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{children:Object(b.jsx)("tr",{children:t.state.splitValues.map((function(t,e){return Object(b.jsx)("td",{children:Object(b.jsx)("table",{className:"parent",children:Object(b.jsx)("tbody",{children:t.map((function(t,e){return Object(b.jsx)("td",{children:t})}))})})})}))})})})},t}return Object(a.a)(n,[{key:"render",value:function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)("h1",{children:"Merge Sort Demo"}),this.valueField(),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("div",{children:this.sortTable()}),Object(b.jsx)("br",{}),Object(b.jsx)("br",{}),Object(b.jsx)("div",{children:this.controlField()}),Object(b.jsx)("br",{}),Object(b.jsx)("div",{children:this.splitData()})]})}}]),n}(i.Component),h=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(e){var n=e.getCLS,i=e.getFID,s=e.getFCP,r=e.getLCP,c=e.getTTFB;n(t),i(t),s(t),r(t),c(t)}))};c.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(j,{})}),document.getElementById("root")),h()}},[[15,1,2]]]);
//# sourceMappingURL=main.c785fab8.chunk.js.map