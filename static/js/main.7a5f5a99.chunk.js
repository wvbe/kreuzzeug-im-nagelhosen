(this["webpackJsonpkreuzzeug-im-nagelhosen"]=this["webpackJsonpkreuzzeug-im-nagelhosen"]||[]).push([[0],{77:function(t,n,e){"use strict";e.r(n);var i=e(26),r=e(1),o=e.n(r),a=e(37),s=e.n(a),c=e(41),h=e(6),u=e(21),l=e.n(u),d=e(5),f=e(25),j=e(53),v=e(11);var b=function(t,n){var e=t*(Math.PI/180),i=Math.cos(e),r=Math.sin(e),o=Math.tan(e),a=n;return{degrees:t,radians:t*(Math.PI/180),tileSize:n,toPixels:function(t,e,o){return[(t+e)*i*n,(t-e)*r*n-a*o]},toCoords:function(t,e){var i=o*t+e;return[((e-i)/-r-i)/n,i/n]}}}(30,32);function p(t,n){var e=n.x-t.x;if(e)return-e;var i=t.y-n.y;if(i)return-i;var r=n.z-t.z;return r?-r:0}var g,x=e(2),O=function(t){var n=t.path,e=t.stroke,i=void 0===e?"black":e,r=t.strokeWidth,o=void 0===r?0:r,a=n.map((function(t){return b.toPixels.apply(b,Object(v.a)(t))})).map((function(t){return t.map((function(t){return t+0}))}));return Object(x.jsx)(x.Fragment,{children:a.reduce((function(t,n,e,r){return e?t.concat([Object(x.jsx)("line",{x1:n[0],y1:n[1],x2:r[e-1][0],y2:r[e-1][1],stroke:i,strokeWidth:String(o)},e)]):t}),[])})},y=function(t){var n=t.size,e=void 0===n?4:n,i=[[[-1*e,0,0],[e,0,0]],[[0,-1*e,0],[0,e,0]],[[0,0,-1*e],[0,0,e]]];return Object(x.jsx)(x.Fragment,{children:i.map((function(t,n){return Object(x.jsx)(O,{path:t,stroke:"rgba(0,0,0)",strokeWidth:.5},n)}))})},m=function(t){var n=t.x,e=void 0===n?0:n,i=t.y,o=void 0===i?0:i,a=t.z,s=void 0===a?0:a,c=t.children,h=t.crosshairSize,u=void 0===h?0:h,l=Object(r.useMemo)((function(){return b.toPixels(e,o,s)}),[e,o,s]);return Object(x.jsxs)("svg",{x:l[0],y:l[1],overflow:"visible",children:[u?Object(x.jsx)(y,{size:u}):null,c]})},k=function(t){var n=t.moveTo,e=t.moveSpeed,i=t.onRest,o=t.children,a=t.crosshairSize,s=void 0===a?0:a,c=t.onClick,h=Object(r.useMemo)((function(){return b.toPixels(n.x,n.y,n.z)}),[n]),u=Object(d.a)(h,2),l=u[0],v=u[1],p=Object(r.useMemo)((function(){return[l,v]}),[]),g=Object(d.a)(p,2),O=g[0],m=g[1],k=Object(f.useSpring)({to:{x:l,y:v},config:{duration:e},from:{x:O,y:m},onRest:i});return Object(x.jsxs)(j.animated.svg,{x:k.x,y:k.y,overflow:"visible",onClick:c,children:[s?Object(x.jsx)(y,{size:s}):null,o]})},w=e(20),z=e(29),M=e(13),S=e.p+"static/media/nebula-282c34.dda754f6.png",E={};E.white=l()("#fff"),E.terrain=l()("#282c34"),E.highlightedTerrain=E.terrain.lighten(1);var C=Object(i.b)(g||(g=Object(M.a)(["\n\t:root {\n\t\t/*\n\t\t\tTerrain with nothing special about it:\n\t\t*/\n\t\t--color-terrain-normal-fill: ",";\n\t\t--color-terrain-highlight-outer-stroke: ",";\n\t\t--color-terrain-highlight-inner-stroke: ",";\n\n\t\t/*\n\t\t\tTerrain that is being hovered over with the mouse\n\t\t*/\n\t\t--color-terrain-highlight-fill: ",";\n\t\t--color-terrain-highlight-outer-stroke: ",";\n\t\t--color-terrain-highlight-inner-stroke: ",";\n\t}\n\n\tbody {\n\t\tbackground: #282c34 url(",");\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t}\n"])),E.terrain.toString(),E.terrain.darken(.3).saturate(.3).toString(),E.terrain.lighten(.4).desaturate(.8).toString(),E.terrain.lighten(1).toString(),l()("#fff").toString(),E.terrain.mix(E.white,.3).toString(),S),W=["size","fill","strokeLinecap","stroke","strokeWidth","innerStroke","innerStrokeWidth"];function I(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.map((function(t){return b.toPixels.apply(b,Object(v.a)(t))})).map((function(t){return t.map((function(t){return t+n}))}))}var F,T,P,N,A,R=b.toPixels(1,0,1).map((function(t){return t+0})),q=I([[1,1,0],[1,1,1],[0,1,1],[0,0,1],[0,0,0],[1,0,0]]),D=I([[0,0,0],[0,0,1],[1,0,1],[1,0,0]]),L=I([[1,0,0],[1,1,0],[1,1,1],[1,0,1]]),H=I([[0,0,1],[1,0,1],[1,1,1],[0,1,1]]),X=function(t){var n=t.size,e=void 0===n?1:n,i=t.fill,r=void 0===i?E.terrain:i,o=t.strokeLinecap,a=void 0===o?"round":o,s=t.stroke,c=void 0===s?r.darken(.3).saturate(.3):s,h=t.strokeWidth,u=void 0===h?1:h,l=t.innerStroke,d=void 0===l?r.lighten(.4).desaturate(.8):l,f=t.innerStrokeWidth,j=void 0===f?u:f,v=Object(z.a)(t,W),b=d&&d.string(),p=c&&c.string(),g={};return(v.onClick||v.onContextMenu)&&(g.cursor="pointer"),Object(x.jsxs)("g",Object(w.a)(Object(w.a)({},v),{},{style:g,children:[r&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("polygon",{points:D.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),fill:r.string(),strokeWidth:0},"xz"),Object(x.jsx)("polygon",{points:H.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),fill:r.lighten(.2).string(),strokeWidth:0},"xy"),Object(x.jsx)("polygon",{points:L.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),fill:r.darken(.2).string(),strokeWidth:0},"yz")]}),d&&Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("line",{x1:R[0]*e,y1:R[1]*e,x2:q[3][0]*e,y2:q[3][1]*e,stroke:b,strokeWidth:j,strokeLinecap:a},"x-bar"),Object(x.jsx)("line",{x1:R[0]*e,y1:R[1]*e,x2:q[1][0]*e,y2:q[1][1]*e,stroke:b,strokeWidth:j,strokeLinecap:a},"y-bar"),Object(x.jsx)("line",{x1:R[0]*e,y1:R[1]*e,x2:q[5][0]*e,y2:q[5][1]*e,stroke:b,strokeWidth:j,strokeLinecap:a},"z-bar")]}),Object(x.jsx)("polygon",{points:q.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),stroke:p,fill:"transparent",strokeWidth:u,strokeLinecap:a},"outline")]}))},J=e(17),B=["zoom"],U=1/Math.pow(2,.5);function Y(t){return Math.round(t)}var G,K=J.a.div(F||(F=Object(M.a)(["\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\twidth: 0;\n\theight: 0;\n\ttransition: transform 5s;\n\t> * {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t}\n"]))),Q=function(t){var n=t.overlay,e=t.center,i=void 0===e?{x:0,y:0,z:0}:e,o=t.zoom,a=void 0===o?1:o,s=t.children,c=Object(r.useMemo)((function(){return b.toPixels(i.x,i.y,i.z).map((function(t,n){return Y(-t)+(n?0:.5)}))}),[i]),h=Object(d.a)(c,2),u=h[0],l=h[1],f={transform:"translate(\n\t\t\t\t".concat(u*a,"px,\n\t\t\t\t").concat(l*a,"px\n\t\t\t)")};return Object(x.jsxs)(K,{style:f,children:[Object(x.jsx)(V,{zoom:a,children:s}),n]})},V=function(t){var n=t.zoom,e=void 0===n?1:n,i=Object(z.a)(t,B);return Object(x.jsx)("svg",Object(w.a)({width:"1px",height:"1px",overflow:"visible",shapeRendering:"geometricPrecision",viewBox:[0,0,1/e,1/e].join(" ")},i))},Z=J.a.div(T||(T=Object(M.a)(["\n\t--scale-val: ",";\n\n\tposition: absolute;\n\ttransform-origin: top left;\n\ttransform: scale(var(--scale-val));\n"])),(function(t){var n=t.zoom;return void 0===n?1:n})),$=(Object(J.a)(Z)(P||(P=Object(M.a)(["\n\ttransform: skewY(-","deg)\n\t\tscale(calc("," * var(--scale-val)), var(--scale-val));\n"])),b.degrees,U),Object(J.a)(Z)(N||(N=Object(M.a)(["\n\ttransform: rotate(-","deg) skewX(","deg)\n\t\tscale(\n\t\t\tcalc("," * var(--scale-val)),\n\t\t\tcalc("," * var(--scale-val))\n\t\t);\n"])),b.degrees,b.degrees,Math.sqrt(U),U),Object(J.a)(Z)(A||(A=Object(M.a)(["\n\ttransform: skewY(","deg)\n\t\tscale(calc("," * var(--scale-val)), var(--scale-val));\n"])),b.degrees,U),J.a.div(G||(G=Object(M.a)(["\n\tposition: relative;\n\theight: ",";\n\tbackground-image: linear-gradient(\n\t\t45deg,\n\t\trgba(255, 255, 255, 0.02) 25%,\n\t\trgba(0, 0, 0, 0.02) 25%,\n\t\trgba(0, 0, 0, 0.02) 50%,\n\t\trgba(255, 255, 255, 0.02) 50%,\n\t\trgba(255, 255, 255, 0.02) 75%,\n\t\trgba(0, 0, 0, 0.02) 75%,\n\t\trgba(0, 0, 0, 0.02) 100%\n\t);\n\tbackground-size: 56.57px 56.57px;\n\tmargin-bottom: 1em;\n"])),(function(t){var n=t.height;return"".concat(void 0===n?180:n,"px")}))),_=function(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)($,{children:Object(x.jsxs)(Q,{zoom:1,center:{x:.5,y:.5,z:.5},children:[Object(x.jsx)(m,{x:-2,y:-2,z:0,children:Object(x.jsx)(X,{})}),Object(x.jsx)(m,{x:0,y:0,z:0,children:Object(x.jsx)(X,{innerStroke:l()("#630a0a7d"),fill:l()("#960202")})}),Object(x.jsx)(m,{x:2,y:2,z:0,children:Object(x.jsx)(X,{fill:l()("#ffffff7f"),onClick:function(){return window.alert("Clicky click!")}})})]})}),Object(x.jsx)($,{children:Object(x.jsxs)(Q,{center:{x:1,y:0,z:.5},children:[Object(x.jsx)(m,{x:0,y:0,z:0,children:Object(x.jsx)(X,{})}),Object(x.jsx)(m,{x:1,y:0,z:0,children:Object(x.jsx)(X,{})}),Object(x.jsx)(m,{x:2,y:0,z:0,children:Object(x.jsx)(X,{})}),Object(x.jsx)(m,{x:2,y:-1,z:0,children:Object(x.jsx)(X,{})})]})})]})},tt=e(3),nt=e(4),et=e(8),it=e(9),rt=function(){function t(n,e,i){Object(tt.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.x=n,this.y=e,this.z=i}return Object(nt.a)(t,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"transform",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.x+=t,this.y+=n,this.z+=e,this}},{key:"hasNaN",value:function(){return isNaN(this.x)||isNaN(this.y)||isNaN(this.z)}},{key:"manhattanDistanceTo",value:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}},{key:"euclideanDistanceTo",value:function(t){var n=Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2));return Math.sqrt(Math.pow(n,2)+Math.pow(this.z-t.z,2))}},{key:"toString",value:function(){return[this.x,this.y,this.z].join(",")}}],[{key:"clone",value:function(n){return new t(n.x,n.y,n.z)}}]),t}(),ot=function(){function t(n){Object(tt.a)(this,t),this.scoreFunction=void 0,this.content=[],this.content=[],this.scoreFunction=n}return Object(nt.a)(t,[{key:"push",value:function(t){this.content.push(t),this.sinkDown(this.content.length-1)}},{key:"pop",value:function(){var t=this.content[0],n=this.content.pop();return n?(this.content.length>0&&(this.content[0]=n,this.bubbleUp(0)),t):t}},{key:"remove",value:function(t){var n=this.content.indexOf(t),e=this.content.pop();e&&n!==this.content.length-1&&(this.content[n]=e,this.scoreFunction(e)<this.scoreFunction(t)?this.sinkDown(n):this.bubbleUp(n))}},{key:"size",value:function(){return this.content.length}},{key:"rescoreElement",value:function(t){this.sinkDown(this.content.indexOf(t))}},{key:"sinkDown",value:function(t){for(var n=this.content[t];t>0;){var e=(t+1>>1)-1,i=this.content[e];if(!(this.scoreFunction(n)<this.scoreFunction(i)))break;this.content[e]=n,this.content[t]=i,t=e}}},{key:"bubbleUp",value:function(t){for(var n=this.content.length,e=this.content[t],i=this.scoreFunction(e);;){var r=t+1<<1,o=r-1,a=null,s=void 0;if(o<n){var c=this.content[o];(s=this.scoreFunction(c))<i&&(a=o)}if(r<n){var h=this.content[r];this.scoreFunction(h)<(null===a?i:s)&&(a=r)}if(null===a)break;this.content[t]=this.content[a],this.content[a]=e,t=a}}}]),t}(),at=function(t,n){return Math.abs(n.x-t.x)+Math.abs(n.y-t.y)};var st=function(){function t(n,e){var i=this;Object(tt.a)(this,t),this.terrain=void 0,this.options=void 0,this.cache=void 0,this.heap=void 0,this.heuristic=void 0,this.terrain=n,this.options=e,this.cache=new Map,this.heap=new ot((function(t){var n=i.cache.get(t);if(!n)throw new Error("This is weird");return n.f})),this.heuristic=at}return Object(nt.a)(t,[{key:"find",value:function(t,n){var e=t,i={coordinate:e,h:this.heuristic(t,n),g:0,f:0,parent:null,closed:!0,visited:!0};for(this.cache.set(t,i),this.heap.push(t);this.heap.size()>0;){var r=this.heap.pop(),o=this.cache.get(r);if(!o)throw new Error("Somehow opening a node that has no heuristic data");if(r===n)return this.tracePath(o);o.closed=!0;for(var a=this.terrain.getNeighbors(r),s=0,c=a.length;s<c;++s){var h,u=a[s],l=this.cache.get(u);if(!(null===(h=l)||void 0===h?void 0:h.closed)&&u.canWalkHere()){var d=o.g+(this.terrain,1),f=!!l;if(!f||l&&d<l.g){var j=this.heuristic(u,n);l={coordinate:u,h:j,g:d,f:d+j,parent:o,closed:!0,visited:!0},this.cache.set(u,l),this.options.closest&&(l.h<i.h||l.h===i.h&&l.g<i.g)&&(e=u,i=l),f?this.heap.rescoreElement(u):this.heap.push(u)}}}}return this.options.closest?this.tracePath(i):[]}},{key:"tracePath",value:function(t){for(var n=t,e=[];n.parent;)e.unshift(n),n=n.parent;return e.map((function(t){return t.coordinate}))}}]),t}(),ct=function(){function t(){Object(tt.a)(this,t),this.listeners=[]}return Object(nt.a)(t,[{key:"on",value:function(t){var n=this;return this.listeners.push(t),function(){n.listeners.splice(n.listeners.indexOf(t))}}},{key:"emit",value:function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];this.listeners.forEach((function(t){return t.apply(void 0,n)}))}},{key:"clear",value:function(){this.listeners=[]}}]),t}(),ht=function(){},ut=function(){function t(n,e){var i=this;Object(tt.a)(this,t),this.id=void 0,this.pathStart=new ct,this.pathEnd=new ct,this.pathStepStart=new ct,this.pathStepEnd=new ct,this.Component=function(){return null},this.location=void 0,this.job=void 0,this.id=n,this.location=e,this.pathStepEnd.on((function(t){i.location=t}))}return Object(nt.a)(t,[{key:"label",get:function(){throw new Error("Not implemented for ".concat(this.constructor.name))}},{key:"play",value:function(){var t;return(null===(t=this.job)||void 0===t?void 0:t.start())||ht}},{key:"doJob",value:function(t){this.job=t}},{key:"walkTo",value:function(t){var n=this;if(!this.location.terrain)throw new Error('Entity "'.concat(this.id,'" is trying to path in a detached coordinate'));var e=new st(this.location.terrain,{closest:!0}).find(this.location,t);if(e.length){var i=this.pathStepEnd.on((function(){var t=e.shift();t?n.doPathStep(t):(i(),n.pathEnd.emit())}));this.doPathStep(e.shift())}}},{key:"doPathStep",value:function(t){t.hasNaN(),this.pathStepStart.emit(t)}}]),t}(),lt=function(t){var n=t.entity,e=t.onClick,i=Object(r.useState)({destination:n.location,duration:0}),o=Object(d.a)(i,2),a=o[0],s=a.destination,c=a.duration,h=o[1];!function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],e=Object(r.useCallback)((function(){var n=t();return function(){return n.forEach((function(t){return t()}))}}),n);Object(r.useEffect)(e,[e])}((function(){return[n.pathStepStart.on((function(t){return h({destination:t,duration:200*n.location.euclideanDistanceTo(t)})}))]}),[n.pathStepStart]);var u=Object(r.useCallback)((function(){return n.pathStepEnd.emit(s)}),[n.pathStepEnd,s]);return Object(x.jsx)(k,{moveTo:s,moveSpeed:c,onRest:u,onClick:e,children:Object(x.jsx)(n.Component,{})})},dt=.25,ft=new rt(-.125,-.125,0),jt=function(t){Object(et.a)(e,t);var n=Object(it.a)(e);function e(){var t;Object(tt.a)(this,e);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=n.call.apply(n,[this].concat(r))).Component=function(){return Object(x.jsx)(m,Object(w.a)(Object(w.a)({},ft),{},{children:Object(x.jsx)(X,{size:dt,fill:l()("#227d5e")})}))},t}return Object(nt.a)(e,[{key:"label",get:function(){return"Guardsman ".concat(this.id)}}]),e}(ut),vt=function(t){Object(et.a)(e,t);var n=Object(it.a)(e);function e(t,i){var r;if(Object(tt.a)(this,e),(r=n.call(this,t)).waypoints=void 0,r.waypointIndex=void 0,i.length<2)throw new Error("A patrol must have at least 2 waypoints");return r.waypoints=i,r.waypointIndex=0,r}return Object(nt.a)(e,[{key:"label",get:function(){return"Patrolling between ".concat(this.waypoints.length," waypoints")}},{key:"start",value:function(){var t=this,n=[this.entity.pathEnd.on((function(){t.waypointIndex=(t.waypointIndex+1)%t.waypoints.length,setTimeout((function(){return t.entity.walkTo(t.waypoints[t.waypointIndex])}),3e3+5e3*Math.random())}))];return this.entity.walkTo(this.waypoints[0]),function(){return n.forEach((function(t){return t()}))}}}]),e}(function(){function t(n){Object(tt.a)(this,t),this.entity=void 0,this.entity=n}return Object(nt.a)(t,[{key:"label",get:function(){throw new Error("Not implemented for ".concat(this.constructor.name))}},{key:"start",value:function(){throw new Error("Not implemented for ".concat(this.constructor.name))}}]),t}()),bt=["fill","stroke","strokeWidth","zoom"],pt=[[1,0,0],[1,1,0],[0,1,0],[0,0,0]].map((function(t){return b.toPixels.apply(b,Object(v.a)(t))})).map((function(t){return t.map((function(t){return t+1}))})),gt=function(t){var n=t.fill,e=void 0===n?E.terrain:n,i=t.stroke,r=void 0===i?e.darken(.3).saturate(.3):i,o=t.strokeWidth,a=void 0===o?1:o,s=t.zoom,c=void 0===s?1:s,h=Object(z.a)(t,bt);return Object(x.jsx)("polygon",Object(w.a)({points:pt.map((function(t){return t.map((function(t){return t*c})).join(",")})).join(" "),stroke:r.string(),fill:e.string(),strokeWidth:a},h))},xt=function(t){Object(et.a)(e,t);var n=Object(it.a)(e);function e(){var t;Object(tt.a)(this,e);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=n.call.apply(n,[this].concat(r))).terrain=void 0,t}return Object(nt.a)(e,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y}},{key:"canWalkHere",value:function(){return this.z>0}}],[{key:"clone",value:function(t){return new e(t.x,t.y,t.z)}}]),e}(rt),Ot=function(t){var n=t.terrainCoordinate,e=t.onClick,i=Object(r.useState)(!1),o=Object(d.a)(i,2),a=o[0],s=o[1],c=rt.clone(n).transform(-.5,-.5,n.z<0?-n.z-.5:-1);return Object(x.jsx)(m,{x:c.x,y:c.y,z:c.z,children:n.z>0?Object(x.jsx)(X,{fill:a?E.highlightedTerrain:E.terrain,stroke:a?E.white:void 0,innerStroke:a?E.highlightedTerrain.mix(E.white,.6):void 0,onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)},onClick:e}):Object(x.jsx)(gt,{fill:(a?E.highlightedTerrain:E.terrain).opaquer(-.5),stroke:a?E.white:void 0,onMouseEnter:function(){return s(!0)},onMouseLeave:function(){return s(!1)},onClick:e})},c.toString())},yt=Symbol();function mt(t){var n=t.filter((function(t){return"number"===typeof t}));return n.reduce((function(t,n){return t+n}),0)/n.length}var kt,wt,zt,Mt=function(){function t(n){Object(tt.a)(this,t),this.size=void 0,this.max=void 0,this.map=void 0;var e=Math.ceil(Math.log(n)/Math.log(2));this.size=Math.pow(2,e)+1,this.max=this.size-1,this.map=new Float32Array(this.size*this.size)}return Object(nt.a)(t,[{key:"generate",value:function(t){this.set(0,0,this.max),this.set(this.max,0,this.max/2),this.set(this.max,this.max,0),this.set(0,this.max,this.max/2),this.divide(this.max,t)}},{key:"get",value:function(t,n){return t<0||t>this.max||n<0||n>this.max?yt:this.map[t+this.size*n]}},{key:"set",value:function(t,n,e){this.map[t+this.size*n]=e}},{key:"divide",value:function(t,n){var e,i,r=t/2,o=n*t;if(!(r<1)){for(i=r;i<this.max;i+=t)for(e=r;e<this.max;e+=t)this.square(e,i,r,Math.random()*o*2-o);for(i=0;i<=this.max;i+=r)for(e=(i+r)%t;e<=this.max;e+=t)this.diamond(e,i,r,Math.random()*o*2-o);this.divide(t/2,n)}}},{key:"square",value:function(t,n,e,i){var r=mt([this.get(t-e,n-e),this.get(t+e,n-e),this.get(t+e,n+e),this.get(t-e,n+e)]);this.set(t,n,r+i)}},{key:"diamond",value:function(t,n,e,i){var r=mt([this.get(t,n-e),this.get(t+e,n),this.get(t,n+e),this.get(t-e,n)]);this.set(t,n,r+i)}}]),t}(),St=function(){function t(n){var e=this;Object(tt.a)(this,t),this.coordinates=void 0,this.coordinatesInRenderOrder=null,this.size=void 0,this.coordinates=n,this.coordinates.forEach((function(t){return t.terrain=e})),this.size=Math.sqrt(this.coordinates.length)}return Object(nt.a)(t,[{key:"getIndexForXy",value:function(t,n){return this.size*n+t}},{key:"getIslandOfCoordinate",value:function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t.canWalkHere()},e=[],i=[],r=[t];r.length;){var o=r.shift();e.push(o);var a=this.getNeighbors(o).filter((function(t){return!i.includes(t)}));i.splice.apply(i,[0,0,o].concat(Object(v.a)(a))),r.splice.apply(r,[0,0].concat(Object(v.a)(a.filter(n))))}return e}},{key:"getIslands",value:function(){for(var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){return t.canWalkHere()},e=this.coordinates.slice(),i=[],r=function(){var r=e.shift();if(!n(r))return"continue";var o=t.getIslandOfCoordinate(r,n);e=e.filter((function(t){return!o.includes(t)})),i.push(o)};e.length;)r();return i}},{key:"getAtXy",value:function(t,n){if(!(t<0||t>this.size-1||n<0||n>this.size-1))return this.coordinates[this.getIndexForXy(t,n)]}},{key:"getNeighbors",value:function(t){var n=this;return[[-1,0],[1,0],[0,-1],[0,1]].map((function(e){var i=Object(d.a)(e,2),r=i[0],o=i[1];return n.getAtXy(t.x+r,t.y+o)})).filter(Boolean)}},{key:"getCoordinatesInRenderOrder",value:function(){return this.coordinatesInRenderOrder||(this.coordinatesInRenderOrder=this.coordinates.slice().sort(p)),this.coordinatesInRenderOrder}}],[{key:"generateRandom",value:function(n){var e=new Mt(n);e.generate(1);var i=n,r=n,o=Array.from(new Array(i*r)).map((function(t,r){var o=r%i,a=Math.floor(r/i),s=e.get(o,a);if(s===yt)throw new Error("Out of bounds @ ".concat(o,", ").concat(a));return[o,a,2*s/n]})),a=o.map((function(t){return t[2]})).sort(),s=a[Math.floor(.25*a.length)];return new t(o.map((function(t){var n=Object(d.a)(t,3),e=n[0],i=n[1],r=n[2];return new xt(e,i,r-s)})))}}]),t}(),Et=function(){function t(n,e){Object(tt.a)(this,t),this.terrain=void 0,this.entities=void 0,this.terrain=n,this.entities=e}return Object(nt.a)(t,[{key:"play",value:function(){var t=this.entities.map((function(t){return t.play()}));return function(){return t.forEach((function(t){return t()}))}}}],[{key:"generateRandom",value:function(n){var e=St.generateRandom(n),i=e.coordinates.filter((function(t){return t.canWalkHere()})),r=e.getIslands();return new t(e,Array.from(new Array(10)).map((function(t,n){var e=i[Math.floor(Math.random()*i.length)],o=r.find((function(t){return t.includes(e)}));if(!o)throw new Error;var a=new jt("guard-"+n,e);return a.doJob(new vt(a,Array.from(new Array(2+Math.floor(4*Math.random()))).map((function(){return o[Math.floor(Math.random()*o.length)]})))),a})))}}]),t}(),Ct=J.a.div(kt||(kt=Object(M.a)(["\n\tposition: absolute;\n\tbottom: 2em;\n\tleft: 2em;\n\tbackdrop-filter: blur(2px);\n"]))),Wt=J.a.div(wt||(wt=Object(M.a)(["\n\tborder: 1px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 3px;\n\tpadding: 1em;\n\n\tfont-family: sans-serif;\n\tcolor: white;\n\tdisplay: flex;\n\tflex-direction: row;\n"]))),It=J.a.div(zt||(zt=Object(M.a)(["\n\tborder: 1px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 50%;\n\twidth: 64px;\n\theight: 64px;\n\tjustify-content: center;\n\talign-items: center;\n\tdisplay: flex;\n\tmargin-right: 1em;\n"]))),Ft=function(t){var n=t.entity;return Object(x.jsx)(Ct,{children:Object(x.jsxs)(Wt,{children:[Object(x.jsx)(It,{children:Object(x.jsx)("p",{children:"T"})}),Object(x.jsxs)("div",{children:[Object(x.jsx)("p",{children:"Heyyoo"}),n?Object(x.jsx)("p",{children:Object(x.jsx)("b",{children:n.label})}):Object(x.jsx)("p",{children:"Not anything selected"}),(null===n||void 0===n?void 0:n.job)?Object(x.jsx)("p",{children:n.job.label}):Object(x.jsx)("p",{children:"Jobless"})]})]})})},Tt=function(){var t=Object(r.useMemo)((function(){var t=Et.generateRandom(40);return window.scene=t,t}),[]),n=Object(r.useMemo)((function(){return t.terrain.getCoordinatesInRenderOrder().map((function(t){return Object(x.jsx)(Ot,{terrainCoordinate:t,onClick:function(n){n.preventDefault(),a(t)}},t.toString())}))}),[t.terrain]),e=Object(r.useState)(t.terrain.getAtXy(Math.floor(20),Math.floor(20))),i=Object(d.a)(e,2),o=i[0],a=i[1],s=Object(r.useState)(void 0),c=Object(d.a)(s,2),h=c[0],u=c[1],l=Object(r.useMemo)((function(){return t.entities.map((function(t){return Object(x.jsx)(lt,{entity:t,onClick:function(n){n.preventDefault(),u(t)}},t.id)}))}),[t.entities]);return Object(r.useEffect)((function(){return t.play()}),[t]),Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(Q,{center:o,zoom:1,children:[Object(x.jsx)("g",{id:"scene-terrain",children:n}),Object(x.jsx)("g",{id:"scene-entities",children:l})]}),Object(x.jsx)(Ft,{entity:h})]})};function Pt(){return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("ul",{children:Object(x.jsx)("li",{children:Object(x.jsx)(c.b,{to:"/tests",children:"Tests"})})}),Object(x.jsx)(h.a,{exact:!0,path:"/tests",component:_})]})}var Nt=function(){return Object(x.jsxs)(h.c,{children:[Object(x.jsx)(h.a,{exact:!0,path:"/",component:Tt}),Object(x.jsx)(h.a,{component:Pt})]})};s.a.render(Object(x.jsxs)(o.a.StrictMode,{children:[Object(x.jsx)(i.a,{styles:C}),Object(x.jsx)(c.a,{hashType:"slash",children:Object(x.jsx)(Nt,{})})]}),document.getElementById("root"))}},[[77,1,2]]]);
//# sourceMappingURL=main.7a5f5a99.chunk.js.map