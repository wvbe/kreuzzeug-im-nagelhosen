(this["webpackJsonpkreuzzeug-im-nagelhosen"]=this["webpackJsonpkreuzzeug-im-nagelhosen"]||[]).push([[0],{105:function(t,n,e){"use strict";e.r(n);var i=e(30),r=e(1),o=e.n(r),a=e(41),c=e.n(a),s=e(45),l=e(15),u=e(8),h=e(3),d=e(4),f=function(){function t(n,e,i){Object(h.a)(this,t),this.terrain=void 0,this.entities=void 0,this.seed=void 0,this.seed=n,this.terrain=e,this.entities=i}return Object(d.a)(t,[{key:"play",value:function(){var t=this.entities.map((function(t){return t.play()}));return function(){return t.forEach((function(t){return t()}))}}}]),t}(),b=e(16),j=e.n(b),v=e(7),p=e(29),g=e(62),O=e(9),x=new(function(){function t(n,e){Object(h.a)(this,t),this.degrees=void 0,this.tileSize=void 0,this._cos=void 0,this._sin=void 0,this._tan=void 0,this.degrees=n,this.tileSize=e;var i=n*(Math.PI/180);this._cos=Math.cos(i),this._sin=Math.sin(i),this._tan=Math.tan(i)}return Object(d.a)(t,[{key:"toPixels",value:function(t,n,e){var i=(t+n)*this._cos,r=(t-n)*this._sin,o=this.tileSize;return[i*this.tileSize,r*this.tileSize-o*e]}},{key:"toCoords",value:function(t,n){var e=this._tan*t+n;return[((n-e)/-this._sin-e)/this.tileSize,e/this.tileSize,0]}}]),t}())(30,32);function m(t,n){var e=n.x-t.x;if(e)return-e;var i=t.y-n.y;if(i)return-i;var r=n.z-t.z;return r?-r:0}var y,k=e(2),w=function(t){var n=t.path,e=t.stroke,i=void 0===e?"black":e,r=t.strokeWidth,o=void 0===r?0:r,a=n.map((function(t){return x.toPixels.apply(x,Object(O.a)(t))})).map((function(t){return t.map((function(t){return t+0}))}));return Object(k.jsx)(k.Fragment,{children:a.reduce((function(t,n,e,r){return e?t.concat([Object(k.jsx)("line",{x1:n[0],y1:n[1],x2:r[e-1][0],y2:r[e-1][1],stroke:i,strokeWidth:String(o)},e)]):t}),[])})},M=function(t){var n=t.size,e=void 0===n?4:n,i=[[[-1*e,0,0],[e,0,0]],[[0,-1*e,0],[0,e,0]],[[0,0,-1*e],[0,0,e]]];return Object(k.jsx)(k.Fragment,{children:i.map((function(t,n){return Object(k.jsx)(w,{path:t,stroke:"rgba(0,0,0)",strokeWidth:.5},n)}))})},z=function(t){var n=t.x,e=void 0===n?0:n,i=t.y,o=void 0===i?0:i,a=t.z,c=void 0===a?0:a,s=t.children,l=t.crosshairSize,u=void 0===l?0:l,h=Object(r.useMemo)((function(){return x.toPixels(e,o,c)}),[e,o,c]);return Object(k.jsxs)("svg",{x:h[0],y:h[1],overflow:"visible",children:[u?Object(k.jsx)(M,{size:u}):null,s]})},P=function(t){var n=t.moveTo,e=t.moveSpeed,i=t.onRest,o=t.children,a=t.crosshairSize,c=void 0===a?0:a,s=t.onClick,l=Object(r.useMemo)((function(){return x.toPixels(n.x,n.y,n.z)}),[n]),u=Object(v.a)(l,2),h=u[0],d=u[1],f=Object(r.useMemo)((function(){return[h,d]}),[]),b=Object(v.a)(f,2),j=b[0],O=b[1],m=Object(p.useSpring)({to:{x:h,y:d},config:{duration:e},from:{x:j,y:O},onRest:i});return Object(k.jsxs)(g.animated.svg,{x:m.x,y:m.y,overflow:"visible",onClick:s,children:[c?Object(k.jsx)(M,{size:c}):null,o]})},S=e(33),C=e(10),T=e.p+"static/media/nebula-282c34.dda754f6.png",W={};W.white=j()("#fff"),W.terrain=j()("#282c34"),W.highlightedTerrain=W.terrain.lighten(1);var E=Object(i.b)(y||(y=Object(C.a)(["\n\t:root {\n\t\t/*\n\t\t\tTerrain with nothing special about it:\n\t\t*/\n\t\t--color-terrain-normal-fill: ",";\n\t\t--color-terrain-highlight-outer-stroke: ",";\n\t\t--color-terrain-highlight-inner-stroke: ",";\n\n\t\t/*\n\t\t\tTerrain that is being hovered over with the mouse\n\t\t*/\n\t\t--color-terrain-highlight-fill: ",";\n\t\t--color-terrain-highlight-outer-stroke: ",";\n\t\t--color-terrain-highlight-inner-stroke: ",";\n\t}\n\n\tbody {\n\t\tbackground: #282c34 url(",");\n\t}\n\n\tp {\n\t\tmargin: 0;\n\t}\n"])),W.terrain.toString(),W.terrain.darken(.3).saturate(.3).toString(),W.terrain.lighten(.4).desaturate(.8).toString(),W.terrain.lighten(1).toString(),j()("#fff").toString(),W.terrain.mix(W.white,.3).toString(),T),_=["size","fill","strokeLinecap","stroke","strokeWidth","innerStroke","innerStrokeWidth"];function L(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return t.map((function(t){return x.toPixels.apply(x,Object(O.a)(t))})).map((function(t){return t.map((function(t){return t+n}))}))}var N,I,F,$,D,R=x.toPixels(1,0,1).map((function(t){return t+0})),A=L([[1,1,0],[1,1,1],[0,1,1],[0,0,1],[0,0,0],[1,0,0]]),G=L([[0,0,0],[0,0,1],[1,0,1],[1,0,0]]),q=L([[1,0,0],[1,1,0],[1,1,1],[1,0,1]]),J=L([[0,0,1],[1,0,1],[1,1,1],[0,1,1]]),B=function(t){var n=t.size,e=void 0===n?1:n,i=t.fill,r=void 0===i?W.terrain:i,o=t.strokeLinecap,a=void 0===o?"round":o,c=t.stroke,s=void 0===c?r.darken(.3).saturate(.3):c,u=t.strokeWidth,h=void 0===u?1:u,d=t.innerStroke,f=void 0===d?r.lighten(.4).desaturate(.8):d,b=t.innerStrokeWidth,j=void 0===b?h:b,v=Object(S.a)(t,_),p=f&&f.string(),g=s&&s.string(),O={};return(v.onClick||v.onContextMenu)&&(O.cursor="pointer"),Object(k.jsxs)("g",Object(l.a)(Object(l.a)({},v),{},{style:O,children:[r&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("polygon",{points:G.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),fill:r.string(),strokeWidth:0},"xz"),Object(k.jsx)("polygon",{points:J.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),fill:r.lighten(.2).string(),strokeWidth:0},"xy"),Object(k.jsx)("polygon",{points:q.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),fill:r.darken(.2).string(),strokeWidth:0},"yz")]}),f&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("line",{x1:R[0]*e,y1:R[1]*e,x2:A[3][0]*e,y2:A[3][1]*e,stroke:p,strokeWidth:j,strokeLinecap:a},"x-bar"),Object(k.jsx)("line",{x1:R[0]*e,y1:R[1]*e,x2:A[1][0]*e,y2:A[1][1]*e,stroke:p,strokeWidth:j,strokeLinecap:a},"y-bar"),Object(k.jsx)("line",{x1:R[0]*e,y1:R[1]*e,x2:A[5][0]*e,y2:A[5][1]*e,stroke:p,strokeWidth:j,strokeLinecap:a},"z-bar")]}),Object(k.jsx)("polygon",{points:A.map((function(t){return t.map((function(t){return t*e})).join(",")})).join(" "),stroke:g,fill:"transparent",strokeWidth:h,strokeLinecap:a},"outline")]}))},H=e(12),U=["zoom"],X=1/Math.pow(2,.5);function V(t){return Math.round(t)}var Y,K,Q,Z,tt,nt,et=H.a.div(N||(N=Object(C.a)(["\n\tposition: absolute;\n\tleft: 50%;\n\ttop: 50%;\n\twidth: 0;\n\theight: 0;\n\ttransition: transform 5s;\n\t> * {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t}\n"]))),it=function(t){var n=t.overlay,e=t.center,i=void 0===e?{x:0,y:0,z:0}:e,o=t.zoom,a=void 0===o?1:o,c=t.children,s=Object(r.useMemo)((function(){return x.toPixels(i.x,i.y,i.z).map((function(t,n){return V(-t)+(n?0:.5)}))}),[i]),l=Object(v.a)(s,2),u=l[0],h=l[1],d={transform:"translate(\n\t\t\t\t".concat(u*a,"px,\n\t\t\t\t").concat(h*a,"px\n\t\t\t)")};return Object(k.jsxs)(et,{style:d,children:[Object(k.jsx)(rt,{zoom:a,children:c}),n]})},rt=function(t){var n=t.zoom,e=void 0===n?1:n,i=Object(S.a)(t,U);return Object(k.jsx)("svg",Object(l.a)({width:"1px",height:"1px",overflow:"visible",shapeRendering:"geometricPrecision",viewBox:[0,0,1/e,1/e].join(" ")},i))},ot=H.a.div(I||(I=Object(C.a)(["\n\t--scale-val: ",";\n\n\tposition: absolute;\n\ttransform-origin: top left;\n\ttransform: scale(var(--scale-val));\n"])),(function(t){var n=t.zoom;return void 0===n?1:n})),at=Object(H.a)(ot)(F||(F=Object(C.a)(["\n\ttransform: skewY(-","deg)\n\t\tscale(calc("," * var(--scale-val)), var(--scale-val));\n"])),x.degrees,X),ct=Object(H.a)(ot)($||($=Object(C.a)(["\n\ttransform: rotate(-","deg) skewX(","deg)\n\t\tscale(\n\t\t\tcalc("," * var(--scale-val)),\n\t\t\tcalc("," * var(--scale-val))\n\t\t);\n"])),x.degrees,x.degrees,Math.sqrt(X),X),st=Object(H.a)(ot)(D||(D=Object(C.a)(["\n\ttransform: skewY(","deg)\n\t\tscale(calc("," * var(--scale-val)), var(--scale-val));\n"])),x.degrees,X),lt=function(t){var n=t.location,e=t.zoom,i=void 0===e?1:e,r=t.axis,o=t.width,a=t.height,c=t.children,s=n.x,l=n.y,u=n.z,h=x.toPixels(s,l,u).map((function(t){return V(t*i)})),d=Object(v.a)(h,2),f=d[0],b=d[1],j=x.toPixels(0,o,a).map((function(t){return V(t*i)})),p=Object(v.a)(j,1)[0],g="y"===r?at:"x"===r?st:"z"===r?ct:ot;return Object(k.jsx)(g,{zoom:i,style:{left:V(f),top:V(b),width:V(r?p/X:p)+"px",height:Math.abs(a*x.tileSize/("z"===r?X:1))+"px"},children:c})},ut=H.a.div(Y||(Y=Object(C.a)(["\n\tposition: relative;\n\theight: ",";\n\tbackground-image: linear-gradient(\n\t\t45deg,\n\t\trgba(255, 255, 255, 0.02) 25%,\n\t\trgba(0, 0, 0, 0.02) 25%,\n\t\trgba(0, 0, 0, 0.02) 50%,\n\t\trgba(255, 255, 255, 0.02) 50%,\n\t\trgba(255, 255, 255, 0.02) 75%,\n\t\trgba(0, 0, 0, 0.02) 75%,\n\t\trgba(0, 0, 0, 0.02) 100%\n\t);\n\tbackground-size: 56.57px 56.57px;\n\tmargin-bottom: 1em;\n"])),(function(t){var n=t.height;return"".concat(void 0===n?180:n,"px")})),ht=function(){return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(ut,{children:Object(k.jsxs)(it,{zoom:1,center:{x:.5,y:.5,z:.5},children:[Object(k.jsx)(z,{x:-2,y:-2,z:0,children:Object(k.jsx)(B,{})}),Object(k.jsx)(z,{x:0,y:0,z:0,children:Object(k.jsx)(B,{innerStroke:j()("#630a0a7d"),fill:j()("#960202")})}),Object(k.jsx)(z,{x:2,y:2,z:0,children:Object(k.jsx)(B,{fill:j()("#ffffff7f"),onClick:function(){return window.alert("Clicky click!")}})})]})}),Object(k.jsx)(ut,{children:Object(k.jsxs)(it,{center:{x:1,y:0,z:.5},children:[Object(k.jsx)(z,{x:0,y:0,z:0,children:Object(k.jsx)(B,{})}),Object(k.jsx)(z,{x:1,y:0,z:0,children:Object(k.jsx)(B,{})}),Object(k.jsx)(z,{x:2,y:0,z:0,children:Object(k.jsx)(B,{})}),Object(k.jsx)(z,{x:2,y:-1,z:0,children:Object(k.jsx)(B,{})})]})})]})},dt=function(){function t(){Object(h.a)(this,t),this.listeners=[]}return Object(d.a)(t,[{key:"on",value:function(t){var n=this;return this.listeners.push(t),function(){n.listeners.splice(n.listeners.indexOf(t))}}},{key:"emit",value:function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];this.listeners.forEach((function(t){return t.apply(void 0,n)}))}},{key:"clear",value:function(){this.listeners=[]}}]),t}(),ft=H.a.div(K||(K=Object(C.a)(["\n\twidth: 0;\n\theight: 0;\n\tborder-left: 6px solid transparent;\n\tborder-right: 6px solid transparent;\n\tborder-top: 6px solid rgba(255, 255, 255, 0.5);\n\ttransform: translate(calc(-50% + 0px), -6px);\n"]))),bt=H.a.div(Q||(Q=Object(C.a)(["\n\tposition: absolute;\n\tbottom: 100%;\n\tleft: 50%;\n\tbackdrop-filter: blur(2px);\n\ttransform: translate(-50%, -6px);\n"]))),jt=H.a.div(Z||(Z=Object(C.a)(["\n\tborder: 1px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 3px;\n\toverflow: hidden;\n"]))),vt=H.a.button(tt||(tt=Object(C.a)(["\n\tborder: none;\n\tdisplay: block;\n\twidth: 100%;\n\tbox-sizing: border-box;\n\n\t// Same as HorizontalLinkListItem\n\tpadding: 0.5em 1em;\n\twhite-space: nowrap;\n\ttransition: background-color 0.5s;\n\tcolor: white;\n\tbackground-color: transparent;\n\t&:hover {\n\t\tbackground-color: rgba(255, 255, 255, 0.5);\n\t\tcursor: pointer;\n\t}\n"]))),pt=H.a.button(nt||(nt=Object(C.a)(["\n\tborder: none;\n\tdisplay: block;\n\twidth: 100%;\n\tbox-sizing: border-box;\n\n\t// Same as HorizontalLinkListItem\n\tpadding: 0.5em 1em;\n\twhite-space: nowrap;\n\ttransition: background-color 0.5s;\n\tcolor: white;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n"]))),gt=function(){function t(){Object(h.a)(this,t),this.state=!1,this.$changed=new dt}return Object(d.a)(t,[{key:"open",value:function(t,n){this.state={location:t,contents:n},this.$changed.emit(this.state)}},{key:"isOpen",value:function(){return!!this.state}},{key:"close",value:function(){this.state=!1,this.$changed.emit(this.state)}}]),t}(),Ot=function(t){var n=t.zoom,e=void 0===n?1:n,i=yt().contextMenu,o=Object(r.useState)(null===i||void 0===i?void 0:i.state),a=Object(v.a)(o,2),c=a[0],s=a[1];return Object(r.useEffect)((function(){if(!i)throw new Error("Shit.");return i.$changed.on(s)}),[i]),c?Object(k.jsxs)(lt,{location:c.location,width:0,height:0,zoom:e,children:[Object(k.jsx)(bt,{children:Object(k.jsx)(jt,{children:c.contents})}),Object(k.jsx)(ft,{})]}):null},xt=function t(n){Object(h.a)(this,t),this.contextMenu=new gt,this.scene=void 0,this.scene=n},mt=Object(r.createContext)(null),yt=function(){var t=Object(r.useContext)(mt);if(!t)throw new Error("Game context does not exist");return t},kt=e(5),wt=e(6),Mt=function(){function t(n){Object(h.a)(this,t),this.scoreFunction=void 0,this.content=[],this.content=[],this.scoreFunction=n}return Object(d.a)(t,[{key:"push",value:function(t){this.content.push(t),this.sinkDown(this.content.length-1)}},{key:"pop",value:function(){var t=this.content[0],n=this.content.pop();return n?(this.content.length>0&&(this.content[0]=n,this.bubbleUp(0)),t):t}},{key:"remove",value:function(t){var n=this.content.indexOf(t),e=this.content.pop();e&&n!==this.content.length-1&&(this.content[n]=e,this.scoreFunction(e)<this.scoreFunction(t)?this.sinkDown(n):this.bubbleUp(n))}},{key:"size",value:function(){return this.content.length}},{key:"rescoreElement",value:function(t){this.sinkDown(this.content.indexOf(t))}},{key:"sinkDown",value:function(t){for(var n=this.content[t];t>0;){var e=(t+1>>1)-1,i=this.content[e];if(!(this.scoreFunction(n)<this.scoreFunction(i)))break;this.content[e]=n,this.content[t]=i,t=e}}},{key:"bubbleUp",value:function(t){for(var n=this.content.length,e=this.content[t],i=this.scoreFunction(e);;){var r=t+1<<1,o=r-1,a=null,c=void 0;if(o<n){var s=this.content[o];(c=this.scoreFunction(s))<i&&(a=o)}if(r<n){var l=this.content[r];this.scoreFunction(l)<(null===a?i:c)&&(a=r)}if(null===a)break;this.content[t]=this.content[a],this.content[a]=e,t=a}}}]),t}(),zt=function(t,n){var e=Math.sqrt(2),i=Math.abs(n.x-t.x),r=Math.abs(n.y-t.y);return 1*(i+r)+(e-2)*Math.min(i,r)};var Pt=function(){function t(n,e){var i=this;Object(h.a)(this,t),this.terrain=void 0,this.options=void 0,this.cache=void 0,this.heap=void 0,this.heuristic=void 0,this.terrain=n,this.options=e,this.cache=new Map,this.heap=new Mt((function(t){var n=i.cache.get(t);if(!n)throw new Error("This is weird");return n.f})),this.heuristic=zt}return Object(d.a)(t,[{key:"find",value:function(t,n){var e=t,i={coordinate:e,h:this.heuristic(t,n),g:0,f:0,parent:null,closed:!0,visited:!0};for(this.cache.set(t,i),this.heap.push(t);this.heap.size()>0;){var r=this.heap.pop(),o=this.cache.get(r);if(!o)throw new Error("Somehow opening a node that has no heuristic data");if(r.equals(n))return this.tracePath(o);o.closed=!0;for(var a=this.terrain.getNeighborTiles(r),c=0,s=a.length;c<s;++c){var l,u=a[c],h=this.cache.get(u);if(!(null===(l=h)||void 0===l?void 0:l.closed)&&u.isLand()){var d=o.g+(this.terrain,1),f=!!h;if(!f||h&&d<h.g){var b=this.heuristic(u,n);h={coordinate:u,h:b,g:d,f:d+b,parent:o,closed:!0,visited:!0},this.cache.set(u,h),this.options.closest&&(h.h<i.h||h.h===i.h&&h.g<i.g)&&(e=u,i=h),f?this.heap.rescoreElement(u):this.heap.push(u)}}}}return this.options.closest?this.tracePath(i):(console.warn("-- No path --"),[])}},{key:"tracePath",value:function(t){for(var n=t,e=[];n.parent;)e.unshift(n),n=n.parent;return e.map((function(t){return t.coordinate}))}}]),t}(),St="\n\tPaul, Paolo, Pablo, Pavel, Pasha, Pau, Paulo, Pol, Pavlo, Paavo, Pali, Pal, Paulin, Pava, P\xe5vel, Paulino, Pawel,\n\tPaavali, Pauel, Pavlos, Pavlusha, Poul, Pusha, Pashenka, Pavl\xedk, Poll, P\xf3l, Pavlousek, Pawelek, P\xe5l, Pavilcek, P\xe1l\n".replace(/\t|\n/g,"").split(",").map((function(t){return t.trim()})),Ct="\n\tMia, Mare, Miriam, Mary, Mara, Molly, Maren, Mariah, Marisol, Maria, Moira, Polly, Marie, Mariana, Marilyn, Malia,\n\tMari, Manon, Marissa, Mariam, Marion, Ria, Mariella, Milou, Mitzi, Marielle, Maribel, Maura, Mamie, Maureen, Mariel,\n\tMarisa, Maryam, Mairi, Malou, Marietta, Maija, Maire, Maritza, Maricela, Marya, Marika, Isamar, My, Mariska, Maryse,\n\tMariela, Maira, Marita, Mariette,\n".replace(/\t|\n/g,"").split(",").map((function(t){return t.trim()}));var Tt=function(){},Wt=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(t,i){var r;Object(h.a)(this,e),(r=n.call(this,t,i)).$startedWalking=new dt,r.$stoppedWalking=new dt,r.$startedWalkStep=new dt,r.$stoppedWalkStep=new dt,r.passport=void 0,r.Component=function(){return Object(k.jsx)("circle",{cx:0,cy:0,r:"5",fill:"white"})};var o=Math.random()<.5;return r.passport={firstName:o?Ct[Math.floor(Math.random()*Ct.length)]:St[Math.floor(Math.random()*St.length)]},r.$stoppedWalkStep.on((function(t){r.location=t})),r}return Object(d.a)(e,[{key:"walkTo",value:function(t){var n=this;if(!this.location.terrain)throw new Error('Entity "'.concat(this.id,'" is trying to path in a detached coordinate'));var e=new Pt(this.location.terrain,{closest:!0}).find(this.location,t);if(!e.length)return console.warn("Path was zero steps long, finishing early.",this),void this.$stoppedWalking.emit();var i=this.$stoppedWalkStep.on((function(){var t=e.shift();t?n.doPathStep(t):(n.$stoppedWalking.emit(),i())}));this.doPathStep(e.shift())}},{key:"doPathStep",value:function(t){t.hasNaN(),this.$startedWalkStep.emit(t)}},{key:"label",get:function(){return this.passport.firstName}}]),e}(function(){function t(n,e){Object(h.a)(this,t),this.id=void 0,this.Component=function(){return null},this.location=void 0,this.job=void 0,this.id=n,this.location=e}return Object(d.a)(t,[{key:"label",get:function(){throw new Error("".concat(this.constructor.name," ").concat(this.id))}},{key:"play",value:function(){var t;return(null===(t=this.job)||void 0===t?void 0:t.start())||Tt}},{key:"doJob",value:function(t){this.job=t}}]),t}()),Et=function(t){var n=t.entity,e=t.onClick,i=Object(r.useState)({destination:n.location,duration:0}),o=Object(v.a)(i,2),a=o[0],c=a.destination,s=a.duration,l=o[1];!function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],e=Object(r.useCallback)((function(){var n=t();return function(){return n.forEach((function(t){return t()}))}}),n);Object(r.useEffect)(e,[e])}((function(){return[n.$startedWalkStep.on((function(t){return l({destination:t,duration:500*n.location.euclideanDistanceTo(t)})}))]}),[n.$startedWalkStep]);var u=Object(r.useCallback)((function(){return n.$stoppedWalkStep.emit(c)}),[n.$stoppedWalkStep,c]);return Object(k.jsx)(P,{moveTo:c,moveSpeed:s,onRest:u,onClick:e,children:Object(k.jsx)(n.Component,{})})},_t=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(){return Object(h.a)(this,e),n.apply(this,arguments)}return Object(d.a)(e,[{key:"label",get:function(){return"".concat(this.passport.firstName)}}]),e}(Wt),Lt=function(){function t(n,e,i){Object(h.a)(this,t),this.x=void 0,this.y=void 0,this.z=void 0,this.x=n,this.y=e,this.z=i}return Object(d.a)(t,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y&&this.z===t.z}},{key:"transform",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return this.x+=t,this.y+=n,this.z+=e,this}},{key:"hasNaN",value:function(){return isNaN(this.x)||isNaN(this.y)||isNaN(this.z)}},{key:"manhattanDistanceTo",value:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}},{key:"euclideanDistanceTo",value:function(t){var n=Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2));return Math.sqrt(Math.pow(n,2)+Math.pow(this.z-t.z,2))}},{key:"toString",value:function(){return[this.x,this.y,this.z].join(",")}}],[{key:"clone",value:function(n){return new t(n.x,n.y,n.z)}}]),t}(),Nt=.25,It=new Lt(-.125,-.125,-.0625),Ft=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(){var t;Object(h.a)(this,e);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=n.call.apply(n,[this].concat(r))).Component=function(){return Object(k.jsx)(z,Object(l.a)(Object(l.a)({},It),{},{children:Object(k.jsx)(B,{size:Nt,fill:j()("#227d5e"),stroke:j()("#227d5e").mix(j()("#000"),.3),innerStroke:j()("#227d5e").mix(j()("#fff"),.3)})}))},t}return Object(d.a)(e,[{key:"label",get:function(){return"Guardsman ".concat(this.passport.firstName)}}]),e}(Wt),$t=e(63),Dt=e.n($t),Rt=function(){function t(){Object(h.a)(this,t)}return Object(d.a)(t,null,[{key:"float",value:function(){for(var t=arguments.length,n=new Array(t),e=0;e<t;e++)n[e]=arguments[e];return Dt()(n.join("/")).double()}},{key:"arrayItem",value:function(t){for(var n=arguments.length,e=new Array(n>1?n-1:0),i=1;i<n;i++)e[i-1]=arguments[i];var r=Math.floor(this.float.apply(this,e)*t.length);return t[r]}}]),t}(),At=function(){function t(n){Object(h.a)(this,t),this.entity=void 0,this.entity=n}return Object(d.a)(t,[{key:"label",get:function(){throw new Error("Not implemented for ".concat(this.constructor.name))}},{key:"start",value:function(){throw new Error("Not implemented for ".concat(this.constructor.name))}}]),t}(),Gt=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(){var t;Object(h.a)(this,e);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=n.call.apply(n,[this].concat(r))).walkMinWait=2e3,t.walkMaxWait=1e4,t.walkChanceOnRoll=.3,t.walkMaxDistance=7,t}return Object(d.a)(e,[{key:"label",get:function(){return"Loitering"}},{key:"start",value:function(){var t=this,n=0,e=function e(){return setTimeout((function(){var i,r;if(Math.random()>t.walkChanceOnRoll)e();else{n++;var o=(null===(i=t.entity.location)||void 0===i||null===(r=i.terrain)||void 0===r?void 0:r.selectClosestTiles(t.entity.location,t.walkMaxDistance))||[];t.entity.walkTo(Rt.arrayItem(o,t.entity.id,"roam-destination",n))}}),t.walkMinWait+Rt.float(t.entity.id,"roam-delay",n)*(t.walkMaxWait-t.walkMinWait))},i=[this.entity.$stoppedWalking.on(e)];return e(),function(){return i.forEach((function(t){return t()}))}}}]),e}(At),qt=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(t,i){var r;if(Object(h.a)(this,e),(r=n.call(this,t)).waypoints=void 0,r.waypointIndex=void 0,i.length<2)throw new Error("A patrol must have at least 2 waypoints");return r.waypoints=i,r.waypointIndex=0,r}return Object(d.a)(e,[{key:"label",get:function(){return"Patrolling between ".concat(this.waypoints.length," waypoints")}},{key:"start",value:function(){var t=this,n=[this.entity.$stoppedWalking.on((function(){setTimeout((function(){t.waypointIndex+=1;var n=t.waypoints[t.waypointIndex%t.waypoints.length];t.entity.walkTo(n)}),3e3)}))];return this.entity.walkTo(this.waypoints[0]),function(){n.forEach((function(t){return t()}))}}}]),e}(At);function Jt(t,n){return Array.from(new Array(t)).map((function(t,e){return n(e)}))}function Bt(t,n){var e=n.tiles.filter((function(t){return t.isLand()}));return[].concat(Object(O.a)(Jt(5,(function(n){var i=t+"-guard-"+n,r=Rt.arrayItem(e,i,"start"),o=new Ft(i,r),a=function(t,n){var e,i=n.location,r=null===(e=i.terrain)||void 0===e?void 0:e.getIslands().find((function(t){return t.includes(i)}));if(!r)throw new Error("Got falsy start from none of the islands");return new qt(n,[].concat(Object(O.a)(Jt(2+Math.floor(4*Rt.float(n.id,"job","waypoint_amount")),(function(t){return Rt.arrayItem(r,n.id,"job","waypoint",t)}))),[i]))}(0,o);return o.doJob(a),o}))),Object(O.a)(Jt(10,(function(n){var i=t+"-person-"+n,r=Rt.arrayItem(e,i,"start"),o=new _t(i,r);return o.doJob(new Gt(o)),o}))))}var Ht,Ut,Xt,Vt,Yt,Kt=e(43),Qt=e(25),Zt=e(64),tn=e.n(Zt),nn=e(65),en=e.n(nn),rn=["tile"],on=function(t){var n=t.tile,e=Object(S.a)(t,rn),i=Object(r.useMemo)((function(){if(!n.outlinePoints||n.outlinePoints.length<3)throw new Error("Not a polygon");return[].concat(Object(O.a)(n.outlinePoints),[n.outlinePoints[0]]).map((function(t){return x.toPixels(t.x,t.y,t.z).join(",")})).join(" ")}),[n]),o=Object(r.useMemo)((function(){return n.isLand()}),[n]);return Object(k.jsx)("g",{className:"dual-mesh-tile",children:Object(k.jsx)("polyline",Object(l.a)({fill:o?"var(--color-terrain-normal-fill)":"transparent",stroke:o?"rgba(0,0,0)":"rgba(0,0,0,0.1)",points:i},e))})},an=function(t){var n=t.terrain,e=t.onTileClick,i=t.onTileContextMenu,o=Object(r.useMemo)((function(){return n.getTilesInRenderOrder().map((function(t){return Object(k.jsx)(on,{tile:t,onClick:e?function(n){n.preventDefault(),n.stopPropagation(),e(n,t)}:e,onContextMenu:i?function(n){n.preventDefault(),i(n,t)}:i},t.toString())}))}),[n,e,i]);return Object(k.jsx)("g",{className:"dual-mesh-terrain",children:o})},cn=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(){var t;Object(h.a)(this,e);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=n.call.apply(n,[this].concat(r))).terrain=void 0,t}return Object(d.a)(e,[{key:"equals",value:function(t){return this===t||t&&this.x===t.x&&this.y===t.y}},{key:"isLand",value:function(){return this.z>=0}},{key:"toString",value:function(){return"("+[this.x,this.y].map((function(t){return t.toFixed(2)})).join(",")+")"}}],[{key:"clone",value:function(t){var n=new e(t.x,t.y,t.z);return n.terrain=t.terrain,n}}]),e}(Lt),sn=function(){function t(n){Object(h.a)(this,t),this._tilesInRenderOrder=null,this.tiles=[],this.islands=new Map,this.Component=function(){throw new Error("Not implemented")},this.tiles=n}return Object(d.a)(t,[{key:"selectContiguousTiles",value:function(t){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(t){return t.isLand()},e=[],i=[],r=[t];r.length;){var o=r.shift();e.push(o);var a=this.getNeighborTiles(o).filter((function(t){return!i.includes(t)}));i.splice.apply(i,[0,0,o].concat(Object(O.a)(a))),r.splice.apply(r,[0,0].concat(Object(O.a)(a.filter(n))))}return e}},{key:"selectClosestTiles",value:function(t,n){return this.selectContiguousTiles(t,(function(e){return e.isLand()&&t.euclideanDistanceTo(e)<=n}))}},{key:"getIslands",value:function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(t){return t.isLand()},e=this.islands.get(n);if(e)return e;for(var i=this.tiles.slice(),r=[],o=function(){var e=i.shift();if(!n(e))return"continue";var o=t.selectContiguousTiles(e,n);i=i.filter((function(t){return!o.includes(t)})),r.push(o)};i.length;)o();return this.islands.set(n,r),r}},{key:"getTilesInRenderOrder",value:function(){return this._tilesInRenderOrder||(this._tilesInRenderOrder=this.tiles.slice().sort(m)),this._tilesInRenderOrder}}],[{key:"generateRandom",value:function(t,n){throw new Error("Not implemented")}}]),t}(),ln=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(){var t;Object(h.a)(this,e);for(var i=arguments.length,r=new Array(i),o=0;o<i;o++)r[o]=arguments[o];return(t=n.call.apply(n,[this].concat(r))).neighbors=void 0,t.outlinePoints=void 0,t.isGhost=void 0,t._isLand=void 0,t}return Object(d.a)(e,[{key:"isLand",value:function(){return void 0===this._isLand&&(this._isLand=this.z>=0&&!function t(n,e){var i;return!!n.isGhost||!(e<=0)&&(--e,(null===(i=n.neighbors)||void 0===i?void 0:i.some((function(n){return t(n,e)})))||!1)}(this,1)),this._isLand}}]),e}(cn),un=function(t){Object(kt.a)(e,t);var n=Object(wt.a)(e);function e(t,i){var r;return Object(h.a)(this,e),(r=n.call(this,t)).mesh=void 0,r.Component=function(t){return o.a.createElement(an,Object(l.a)({terrain:Object(Qt.a)(r)},t))},r.mesh=i,r.tiles.forEach((function(t,n){t.terrain=Object(Qt.a)(r)})),r}return Object(d.a)(e,[{key:"getClosestToXy",value:function(t,n){var e=new Lt(t,n,0),i=this.tiles.reduce((function(t,n){var i=e.euclideanDistanceTo(n);return i<t.distance?{distance:i,tile:n}:t}),{distance:1/0}).tile;if(!i)throw new Error("No tiles, "+this.tiles.length);return i}},{key:"getNeighborTiles",value:function(t){return t.neighbors||[]}}]),e}(sn);function hn(t,n){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,i=new en.a({shape:[n,n],minDistance:1/e},Math.random),r=new tn.a({boundarySpacing:1});r.points.forEach((function(t){return i.addPoint(t)})),r.points=i.fill().map((function(t){return[].concat(Object(O.a)(t),[0])}));var o=r.create();return new un(r.points.map((function(t,n){return Object(Kt.a)(ln,Object(O.a)(t))})).map((function(t,n){var e=o.r_circulate_t([],n);return t.outlinePoints=e.map((function(n){return new Lt(o.t_x(n),o.t_y(n),t.z)})),t.isGhost=e.some((function(t){return o.t_ghost(t)})),t})).map((function(t,n,e){return t.neighbors=o.r_circulate_r([],n).map((function(t){return e[t]})).filter(Boolean),t})).filter(Boolean),o)}var dn,fn=H.a.div(Ht||(Ht=Object(C.a)(["\n\tbackdrop-filter: blur(2px);\n"]))),bn=H.a.div(Ut||(Ut=Object(C.a)(["\n\tborder: 1px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 3px;\n\tpadding: 1em;\n\tdisplay: flex;\n\tflex-direction: row;\n"]))),jn=H.a.div(Xt||(Xt=Object(C.a)(["\n\tborder: 1px solid rgba(255, 255, 255, 0.5);\n\tborder-radius: 50%;\n\twidth: 64px;\n\theight: 64px;\n\tjustify-content: center;\n\talign-items: center;\n\tdisplay: flex;\n\tmargin-right: 1em;\n"]))),vn=H.a.nav(Vt||(Vt=Object(C.a)(["\n\tdisplay: flex;\n\tflex-direction: row;\n\tfont-size: 60%;\n\ttext-transform: uppercase;\n"]))),pn=H.a.a(Yt||(Yt=Object(C.a)(["\n\tflex: 0 0 auto;\n\tbackground-color: rgba(255, 255, 255, 0.1);\n\tmargin-right: 3px;\n\n\t// Same as ContextMenuItem\n\tpadding: 0.125em 0.5em;\n\twhite-space: nowrap;\n\ttransition: background-color 0.5s;\n\tcolor: white;\n\t/* background-color: transparent; */\n\t/* background-color: rgba(255, 255, 255, 0.05); */\n\t&:hover {\n\t\tbackground-color: rgba(255, 255, 255, 0.5);\n\t\tcursor: pointer;\n\t}\n"]))),gn=function(t){var n=t.entity;return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("p",{children:Object(k.jsx)("b",{children:n.label})}),Object(k.jsx)("p",{children:(null===n||void 0===n?void 0:n.job)?n.job.label:"Jobless"}),Object(k.jsxs)(vn,{style:{marginTop:"1em"},children:[Object(k.jsx)(pn,{onClick:function(){console.group("Selected entity"),console.log(n),console.groupEnd()},children:"LOG"}),Object(k.jsx)(pn,{onClick:function(){console.warn("Following entity not implemented yet",n)},children:"FOLLOW"})]})]})},On=function(t){var n=t.entity,e=t.zoom,i=void 0===e?4:e;return Object(k.jsx)(fn,{children:Object(k.jsxs)(bn,{children:[Object(k.jsx)(jn,{children:n&&Object(k.jsx)("svg",{width:"1",height:"1",overflow:"visible",shapeRendering:"geometricPrecision",viewBox:[0,0,1/i,1/i].join(" "),children:Object(k.jsx)(n.Component,{})})}),Object(k.jsx)("div",{children:n?Object(k.jsx)(gn,{entity:n}):null})]})})},xn=H.a.section(dn||(dn=Object(C.a)(["\n\tposition: absolute;\n\tbottom: 2em;\n\tleft: 2em;\n\n\tfont-family: sans-serif;\n\tcolor: white;\n\n\ta {\n\t\tcolor: inherit;\n\t}\n"])));function mn(t){return"".concat(~~(t%3600/60),"\u2032 ").concat(t%60,"\u2033")}var yn=function(t){var n=t.game,e=t.initialViewportCenter,i=n.scene,o=n.contextMenu,a=Object(r.useState)(e),c=Object(v.a)(a,2),s=c[0],l=c[1],u=Object(r.useState)(void 0),h=Object(v.a)(u,2),d=h[0],f=h[1],b=Object(r.useMemo)((function(){return Object(k.jsx)(i.terrain.Component,{onTileClick:function(t,n){var e,i;o.open(n,Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(vt,{onClick:function(){return l(n)},children:"Center camera"}),Object(k.jsx)(vt,{onClick:function(){console.group("Tile ".concat(n)),console.log(n),console.groupEnd()},children:"Show in console"}),Object(k.jsx)(pt,{children:(e=n.x,i=n.y,"40\xb0 ".concat(mn(1e3-e)," N 79\xb0 ").concat(mn(700-i)," W"))})]}))},onTileContextMenu:function(t,n){l(n)}})}),[i,o]),j=Object(r.useMemo)((function(){return i.entities.filter((function(t){return t instanceof Wt})).map((function(t){return Object(k.jsx)(Et,{entity:t,onClick:function(n){n.preventDefault(),f(t)}},t.id)}))}),[i.entities]);return Object(r.useEffect)((function(){var t=function(){o.close()};return window.addEventListener("click",t),function(){return window.removeEventListener("click",t)}}),[o]),Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(it,{center:s,zoom:1,overlay:Object(k.jsx)(Ot,{zoom:1}),children:[Object(k.jsx)("g",{id:"scene__terrain",children:b}),Object(k.jsx)("g",{id:"scene__entities",children:j})]}),Object(k.jsxs)(xn,{children:[Object(k.jsx)(On,{entity:d}),Object(k.jsxs)("p",{style:{fontSize:"0.8em",opacity:"0.5"},children:[Object(k.jsx)("a",{href:"https://github.com/wvbe/kreuzzeug-im-nagelhosen",target:"_blank",rel:"noreferrer",children:"GitHub"}),"    ","Seed: ",i.seed]})]})]})};function kn(){var t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:String(Date.now()),e=48,i=.8;if(window.game)t=window.game;else{var r=hn(n,e,i),o=Bt(n,r),a=new f(n,r,o);t=new xt(a),window.game=t}var c=t.scene.terrain.getClosestToXy(Math.floor(e/2),Math.floor(e/2));return{game:t,initialViewportCenter:c}}function wn(){var t=Object(r.useMemo)(kn,[]);return Object(r.useEffect)((function(){return t.game.scene.play()}),[t.game.scene]),Object(k.jsx)(mt.Provider,{value:t.game,children:Object(k.jsx)(yn,Object(l.a)({},t))})}function Mn(){return Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)("ul",{children:Object(k.jsx)("li",{children:Object(k.jsx)(s.b,{to:"/tests",children:"Tests"})})}),Object(k.jsx)(u.a,{exact:!0,path:"/tests",component:ht})]})}var zn=function(){return Object(k.jsxs)(u.c,{children:[Object(k.jsx)(u.a,{exact:!0,path:"/",component:wn}),Object(k.jsx)(u.a,{component:Mn})]})};c.a.render(Object(k.jsxs)(o.a.StrictMode,{children:[Object(k.jsx)(i.a,{styles:E}),Object(k.jsx)(s.a,{hashType:"slash",children:Object(k.jsx)(zn,{})})]}),document.getElementById("root"))},90:function(t,n){}},[[105,1,2]]]);
//# sourceMappingURL=main.8b4a8ba6.chunk.js.map