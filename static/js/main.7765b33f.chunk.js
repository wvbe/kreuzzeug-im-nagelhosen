(this["webpackJsonpcra-template-tb-app"]=this["webpackJsonpcra-template-tb-app"]||[]).push([[0],{62:function(t,n,e){},63:function(t,n,e){"use strict";e.r(n);var r=e(10),o=e(1),i=e.n(o),a=e(34),c=e.n(a),s=e(25),l=e(13),u=e(48),d=e(11),j=e(6),b=e(17),h=e(19),f=e.n(h);var p=function(t,n){var e=t*(Math.PI/180),r=Math.cos(e),o=Math.sin(e),i=Math.tan(e),a=(Math.sqrt(Math.pow(r,2)+Math.pow(o,2)),n);return{degrees:t,radians:t*(Math.PI/180),tileSize:n,toPixels:function(t,e,i){return[(t+e)*r*n,(t-e)*o*n-a*i]},toCoords:function(t,e){var r=i*t+e;return[((e-r)/-o-r)/n,r/n]}}}(30,24);function v(t,n){var e=n.x-t.x;if(e)return-e;var r=t.y-n.y;if(r)return-r;var o=n.z-t.z;return o?-o:0}var x,O,m,g,y,k=e(12),z=e(2),w=function(t){var n=t.path,e=t.stroke,r=void 0===e?"black":e,o=t.strokeWidth,i=void 0===o?0:o,a=n.map((function(t){return p.toPixels.apply(p,Object(k.a)(t))})).map((function(t){return t.map((function(t){return t+0}))}));return Object(z.jsx)(z.Fragment,{children:a.reduce((function(t,n,e,o){return e?t.concat([Object(z.jsx)("line",{x1:n[0],y1:n[1],x2:o[e-1][0],y2:o[e-1][1],stroke:r,strokeWidth:String(i)},e)]):t}),[])})},M=function(t){var n=t.size,e=void 0===n?4:n,r=[[[-1*e,0,0],[e,0,0]],[[0,-1*e,0],[0,e,0]],[[0,0,-1*e],[0,0,e]]];return Object(z.jsx)(z.Fragment,{children:r.map((function(t,n){return Object(z.jsx)(w,{path:t,stroke:"rgba(0,0,0)",strokeWidth:.5},n)}))})},S=function(t){var n=t.x,e=void 0===n?0:n,r=t.y,i=void 0===r?0:r,a=t.z,c=void 0===a?0:a,s=t.children,l=t.crosshairSize,u=void 0===l?0:l,d=Object(o.useMemo)((function(){return p.toPixels(e,i,c)}),[e,i,c]);return Object(z.jsxs)("svg",{x:d[0],y:d[1],overflow:"visible",children:[u?Object(z.jsx)(M,{size:u}):null,s]})},W=e(38),P=["overlay","center","zoom","children"],C=["zoom"],F=.8;function L(t){return Math.round(t)}var A=Object(l.a)(W.animated.div)(x||(x=Object(r.a)(["\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\twidth: 0;\n\theight: 0;\n\tborder-radius: 50%;\n\t> * {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t}\n"]))),D=function(t){var n=t.overlay,e=t.center,r=t.zoom,i=void 0===r?1:r,a=t.children,c=(Object(b.a)(t,P),Object(o.useMemo)((function(){return p.toPixels(e.x,e.y,e.z).map((function(t,n){return L(-t)+(n?0:.5)}))}),[e])),s=Object(j.a)(c,2),l=s[0],u=s[1],d=Object(W.useSpring)({config:W.config.molasses,to:{transform:"translate(\n\t\t\t\t".concat(l*i,"px,\n\t\t\t\t").concat(u*i,"px\n\t\t\t)")}});return Object(z.jsxs)(A,{style:d,children:[Object(z.jsx)(I,{zoom:i,children:a}),n]})},I=function(t){var n=t.zoom,e=void 0===n?1:n,r=Object(b.a)(t,C);return Object(z.jsx)("svg",Object(d.a)({width:"1px",height:"1px",overflow:"visible",shapeRendering:"geometricPrecision",viewBox:[0,0,1/e,1/e].join(" "),style:{cursor:"pointer"}},r))},B=l.a.div(O||(O=Object(r.a)(["\n\t--scale-val: ",";\n\n\tposition: absolute;\n\ttransform-origin: top left;\n\ttransform: scale(var(--scale-val));\n"])),(function(t){var n=t.zoom;return void 0===n?1:n})),q=Object(l.a)(B)(m||(m=Object(r.a)(["\n\ttransform: skewY(-","deg)\n\t\tscale(\n\t\t\tcalc("," * var(--scale-val)),\n\t\t\tvar(--scale-val)\n\t\t);\n"])),p.degrees,F),J=Object(l.a)(B)(g||(g=Object(r.a)(["\n\ttransform: rotate(-","deg)\n\t\tskewX(","deg)\n\t\tscale(\n\t\t\tcalc("," * var(--scale-val)),\n\t\t\tcalc("," * var(--scale-val))\n\t\t);\n"])),p.degrees,p.degrees,Math.sqrt(F),F),N=Object(l.a)(B)(y||(y=Object(r.a)(["\n\ttransform: skewY(","deg)\n\t\tscale(\n\t\t\tcalc("," * var(--scale-val)),\n\t\t\tvar(--scale-val)\n\t\t);\n"])),p.degrees,F),T=function(t){var n=t.location,e=t.zoom,r=void 0===e?1:e,o=t.axis,i=t.width,a=t.height,c=t.children,s=n.x,l=n.y,u=n.z,d=p.toPixels(s,l,u).map((function(t){return L(t*r)})),b=Object(j.a)(d,2),h=b[0],f=b[1],v=p.toPixels(0,i,a).map((function(t){return L(t*r)})),x=Object(j.a)(v,1)[0],O="y"===o?q:"x"===o?N:"z"===o?J:B;return Object(z.jsx)(O,{zoom:r,style:{left:L(h),top:L(f),width:L(o?x/F:x)+"px",height:L(o?x/F:x)+"px"},children:c})},E=e(3),H=e(7),R=function(){function t(n,e,r){Object(E.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.x=n,this.y=e,this.z=r}return Object(H.a)(t,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"transform",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.x+=t,this.y+=n,this.z+=e,this}},{key:"manhattanDistanceTo",value:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}},{key:"toString",value:function(){return[this.x,this.y,this.z].join(",")}}],[{key:"clone",value:function(n){return new t(n.x,n.y,n.z)}}]),t}(),U=["fill","strokeLinecap","stroke","strokeWidth","innerStroke","innerStrokeWidth"];function Y(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.map((function(t){return p.toPixels.apply(p,Object(k.a)(t))})).map((function(t){return t.map((function(t){return t+n}))}))}var X,G,K,Q,V,Z,$=p.toPixels(1,0,1).map((function(t){return t+0})),_=Y([[1,1,0],[1,1,1],[0,1,1],[0,0,1],[0,0,0],[1,0,0]]),tt=Y([[0,0,0],[0,0,1],[1,0,1],[1,0,0]]),nt=Y([[1,0,0],[1,1,0],[1,1,1],[1,0,1]]),et=Y([[0,0,1],[1,0,1],[1,1,1],[0,1,1]]),rt=function(t){var n=t.fill,e=void 0===n?f()("#282c34"):n,r=t.strokeLinecap,o=void 0===r?"round":r,i=t.stroke,a=void 0===i?e.darken(.3).saturate(.3):i,c=t.strokeWidth,s=void 0===c?1:c,l=t.innerStroke,u=void 0===l?e.lighten(.4).desaturate(.8):l,j=t.innerStrokeWidth,h=void 0===j?s:j,p=Object(b.a)(t,U),v=u&&u.string(),x=a&&a.string();return Object(z.jsxs)("g",Object(d.a)(Object(d.a)({},p),{},{children:[e&&Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("polygon",{points:tt.map((function(t){return t.join(",")})).join(" "),fill:e.string(),strokeWidth:0},"xz"),Object(z.jsx)("polygon",{points:et.map((function(t){return t.join(",")})).join(" "),fill:e.lighten(.2).string(),strokeWidth:0},"xy"),Object(z.jsx)("polygon",{points:nt.map((function(t){return t.join(",")})).join(" "),fill:e.darken(.2).string(),strokeWidth:0},"yz")]}),u&&Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)("line",{x1:$[0],y1:$[1],x2:_[3][0],y2:_[3][1],stroke:v,strokeWidth:h,strokeLinecap:o},"x-bar"),Object(z.jsx)("line",{x1:$[0],y1:$[1],x2:_[1][0],y2:_[1][1],stroke:v,strokeWidth:h,strokeLinecap:o},"y-bar"),Object(z.jsx)("line",{x1:$[0],y1:$[1],x2:_[5][0],y2:_[5][1],stroke:v,strokeWidth:h,strokeLinecap:o},"z-bar")]}),Object(z.jsx)("polygon",{points:_.map((function(t){return t.join(",")})).join(" "),stroke:x,fill:"transparent",strokeWidth:s,strokeLinecap:o},"outline")]}))},ot=["fill","stroke","strokeWidth","zoom"],it=[[1,0,0],[1,1,0],[0,1,0],[0,0,0]].map((function(t){return p.toPixels.apply(p,Object(k.a)(t))})).map((function(t){return t.map((function(t){return t+1}))})),at=function(t){var n=t.fill,e=void 0===n?f()("#282c34"):n,r=t.stroke,o=void 0===r?e.darken(.3).saturate(.3):r,i=t.strokeWidth,a=void 0===i?1:i,c=t.zoom,s=void 0===c?1:c,l=Object(b.a)(t,ot);return Object(z.jsx)("polygon",Object(d.a)({points:it.map((function(t){return t.map((function(t){return t*s})).join(",")})).join(" "),stroke:o.string(),fill:e.string(),strokeWidth:a},l))},ct=l.a.section(X||(X=Object(r.a)(["\n\tposition: absolute;\n\tbottom: 0;\n\tleft: 0;\n"]))),st=function(t){t.children;return Object(z.jsx)(ct,{children:Object(z.jsx)("p",{children:"Heyyoo"})})},lt=l.a.div(G||(G=Object(r.a)(["\n\twidth: 0;\n\theight: 0;\n\tborder-left: 6px solid transparent;\n\tborder-right: 6px solid transparent;\n\tborder-top: 6px solid rgba(255, 255, 255, 0.5);\n\ttransform: translate(calc(-50% + 0px), -6px);\n"]))),ut=l.a.div(K||(K=Object(r.a)(["\n\tposition: absolute;\n\tbottom: 100%;\n\tleft: 50%;\n\tbackdrop-filter: blur(2px);\n\ttransform: translate(-50%, -6px);\n"]))),dt=l.a.div(Q||(Q=Object(r.a)(["\n\tborder: 1px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 3px;\n"]))),jt=l.a.button(V||(V=Object(r.a)(["\n\tborder: none;\n\tdisplay: block;\n\twidth: 100%;\n\tbox-sizing: border-box;\n\tpadding: 0.5em 1em;\n\twhite-space: nowrap;\n\ttransition: background-color 0.5s;\n\tcolor: white;\n\tbackground-color: transparent;\n\t/* background-color: rgba(255, 255, 255, 0.05); */\n\t&:hover {\n\t\tbackground-color: rgba(255, 255, 255, 0.5);\n\t\tcursor: pointer;\n\t}\n"]))),bt=function(t){var n=t.children;return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsx)(ut,{children:Object(z.jsx)(dt,{children:n})}),Object(z.jsx)(lt,{})]})},ht=e(8),ft=e(9),pt=function(t){Object(ht.a)(e,t);var n=Object(ft.a)(e);function e(){var t;Object(E.a)(this,e);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(t=n.call.apply(n,[this].concat(o))).Component=function(){return Object(z.jsx)(S,Object(d.a)(Object(d.a)({},R.clone(t.location).transform(-.25,-.25,0)),{},{children:Object(z.jsx)(at,{zoom:.5})}))},t}return e}((function t(n,e){Object(E.a)(this,t),this.id=void 0,this.location=void 0,this.Component=function(){return null},this.id=n,this.location=e})),vt=function(t){Object(ht.a)(e,t);var n=Object(ft.a)(e);function e(t,r){var o;return Object(E.a)(this,e),(o=n.call(this)).terrain=Array.from(new Array(t*r)).map((function(n,e){return new R(e%t,Math.floor(e/t),.3*Math.random())})),o.entities=Array.from(new Array(100)).map((function(n,e){var i={x:Math.floor(Math.random()*t),y:Math.floor(Math.random()*r)},a=i.y*t+i.x;return new pt("entity-"+e,R.clone(Object(d.a)(Object(d.a)({},i),{},{z:o.terrain[a].z})))})),o}return e}((function t(){Object(E.a)(this,t),this.terrain=[],this.entities=[]})),xt=["coordinate"],Ot=function(t){var n=t.topic,e=t.close;return n?Object(z.jsx)(bt,{children:Object(z.jsx)(jt,{onClick:function(){e(),window.alert(JSON.stringify(n,null,"    "))},children:"Show coordinates"})}):null},mt=function(t){var n=t.coordinate,e=Object(b.a)(t,xt),r=Object(o.useState)(!1),i=Object(j.a)(r,2),a=i[0],c=i[1],s=R.clone(n).transform(-.5,-.5,-1);return Object(z.jsx)(S,{x:s.x,y:s.y,z:s.z,children:Object(z.jsx)(rt,Object(d.a)(Object(d.a)({},e),{},{fill:a?f()("#282c34").lighten(1):void 0,stroke:a?f()("#fff"):void 0,innerStroke:a?f()("#ccd1dd"):void 0,onMouseEnter:function(){return c(!0)},onMouseLeave:function(){return c(!1)}}))},s.toString())},gt=function(t){Object(u.a)(t);var n=Object(o.useMemo)((function(){return new vt(25,25)}),[]),e=Object(o.useState)(new R(12,12,.5)),r=Object(j.a)(e,2),i=r[0],a=r[1],c=Object(o.useState)(void 0),s=Object(j.a)(c,2),l=s[0],d=s[1],b=Object(o.useMemo)((function(){return n.terrain.slice().sort(v).map((function(t){return Object(z.jsx)(mt,{coordinate:t,onClick:function(n){n.preventDefault(),d(void 0),a(t)},onContextMenu:function(n){n.preventDefault(),d(t)}},t.toString())}))}),[n.terrain]),h=Object(o.useMemo)((function(){return n.entities.slice().sort((function(t,n){return v(t.location,n.location)})).map((function(t){var n=t.Component;return Object(z.jsx)(n,{},t.id)}))}),[n.entities,n.entities.length]),f=Object(o.useMemo)((function(){return l?Object(z.jsx)(T,{location:l,width:0,height:0,zoom:1,children:Object(z.jsx)(Ot,{topic:l,close:function(){return d(void 0)}})}):void 0}),[l,1]);return Object(z.jsxs)(z.Fragment,{children:[Object(z.jsxs)(D,{center:i,zoom:1,overlay:f,children:[Object(z.jsx)("g",{id:"scene-terrain",children:b}),Object(z.jsx)("g",{id:"scene-entities",children:h})]}),Object(z.jsx)(st,{})]})},yt=(e(62),e(28));l.a.div(Z||(Z=Object(r.a)(["\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n\twidth: 10px;\n\theight: 10px;\n\tborder-top: 1px solid red;\n\tborder-left: 1px solid blue;\n\tz-index: 9999;\n"])));var kt,zt=function(){return Object(yt.b)(yt.a,{children:Object(yt.b)(gt,{})})},wt=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,64)).then((function(n){var e=n.getCLS,r=n.getFID,o=n.getFCP,i=n.getLCP,a=n.getTTFB;e(t),r(t),o(t),i(t),a(t)}))},Mt=Object(s.b)(kt||(kt=Object(r.a)(["\n\tbody {\n\t\tmargin: 0;\n\t\tfont-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',\n\t\t\t'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',\n\t\t\t'Helvetica Neue', sans-serif;\n\t\t-webkit-font-smoothing: antialiased;\n\t\t-moz-osx-font-smoothing: grayscale;\n\t}\n\n\tcode {\n\t\tfont-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n\t\t\tmonospace;\n\t}\n"])));c.a.render(Object(z.jsxs)(i.a.StrictMode,{children:[Object(z.jsx)(s.a,{styles:Mt}),Object(z.jsx)(zt,{})]}),document.getElementById("root")),wt(console.log)}},[[63,1,2]]]);
//# sourceMappingURL=main.7765b33f.chunk.js.map