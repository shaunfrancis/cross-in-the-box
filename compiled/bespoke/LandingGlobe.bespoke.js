(()=>{var Ud=Object.create;var Nc=Object.defineProperty;var Fd=Object.getOwnPropertyDescriptor;var Nd=Object.getOwnPropertyNames;var Od=Object.getPrototypeOf,Bd=Object.prototype.hasOwnProperty;var zd=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var kd=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Nd(t))!Bd.call(i,s)&&s!==e&&Nc(i,s,{get:()=>t[s],enumerable:!(n=Fd(t,s))||n.enumerable});return i};var Oc=(i,t,e)=>(e=i!=null?Ud(Od(i)):{},kd(t||!i||!i.__esModule?Nc(e,"default",{value:i,enumerable:!0}):e,i));var dc=zd((hc,uc)=>{(function(i,t){typeof hc=="object"&&typeof uc<"u"?uc.exports=t():typeof define=="function"&&define.amd?define(t):(i=i||self).RBush=t()})(hc,function(){"use strict";function i(f,h,x,M,y){(function R(C,I,L,v,S){for(;v>L;){if(v-L>600){var P=v-L+1,F=I-L+1,B=Math.log(P),b=.5*Math.exp(2*B/3),T=.5*Math.sqrt(B*b*(P-b)/P)*(F-P/2<0?-1:1),w=Math.max(L,Math.floor(I-F*b/P+T)),z=Math.min(v,Math.floor(I+(P-F)*b/P+T));R(C,I,w,z,S)}var N=C[I],V=L,O=v;for(t(C,L,I),S(C[v],N)>0&&t(C,L,v);V<O;){for(t(C,V,O),V++,O--;S(C[V],N)<0;)V++;for(;S(C[O],N)>0;)O--}S(C[L],N)===0?t(C,L,O):t(C,++O,v),O<=I&&(L=O+1),I<=O&&(v=O-1)}})(f,h,x||0,M||f.length-1,y||e)}function t(f,h,x){var M=f[h];f[h]=f[x],f[x]=M}function e(f,h){return f<h?-1:f>h?1:0}var n=function(f){f===void 0&&(f=9),this._maxEntries=Math.max(4,f),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()};function s(f,h,x){if(!x)return h.indexOf(f);for(var M=0;M<h.length;M++)if(x(f,h[M]))return M;return-1}function r(f,h){o(f,0,f.children.length,h,f)}function o(f,h,x,M,y){y||(y=g(null)),y.minX=1/0,y.minY=1/0,y.maxX=-1/0,y.maxY=-1/0;for(var R=h;R<x;R++){var C=f.children[R];a(y,f.leaf?M(C):C)}return y}function a(f,h){return f.minX=Math.min(f.minX,h.minX),f.minY=Math.min(f.minY,h.minY),f.maxX=Math.max(f.maxX,h.maxX),f.maxY=Math.max(f.maxY,h.maxY),f}function c(f,h){return f.minX-h.minX}function l(f,h){return f.minY-h.minY}function d(f){return(f.maxX-f.minX)*(f.maxY-f.minY)}function u(f){return f.maxX-f.minX+(f.maxY-f.minY)}function p(f,h){return f.minX<=h.minX&&f.minY<=h.minY&&h.maxX<=f.maxX&&h.maxY<=f.maxY}function m(f,h){return h.minX<=f.maxX&&h.minY<=f.maxY&&h.maxX>=f.minX&&h.maxY>=f.minY}function g(f){return{children:f,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function _(f,h,x,M,y){for(var R=[h,x];R.length;)if(!((x=R.pop())-(h=R.pop())<=M)){var C=h+Math.ceil((x-h)/M/2)*M;i(f,C,h,x,y),R.push(h,C,C,x)}}return n.prototype.all=function(){return this._all(this.data,[])},n.prototype.search=function(f){var h=this.data,x=[];if(!m(f,h))return x;for(var M=this.toBBox,y=[];h;){for(var R=0;R<h.children.length;R++){var C=h.children[R],I=h.leaf?M(C):C;m(f,I)&&(h.leaf?x.push(C):p(f,I)?this._all(C,x):y.push(C))}h=y.pop()}return x},n.prototype.collides=function(f){var h=this.data;if(!m(f,h))return!1;for(var x=[];h;){for(var M=0;M<h.children.length;M++){var y=h.children[M],R=h.leaf?this.toBBox(y):y;if(m(f,R)){if(h.leaf||p(f,R))return!0;x.push(y)}}h=x.pop()}return!1},n.prototype.load=function(f){if(!f||!f.length)return this;if(f.length<this._minEntries){for(var h=0;h<f.length;h++)this.insert(f[h]);return this}var x=this._build(f.slice(),0,f.length-1,0);if(this.data.children.length)if(this.data.height===x.height)this._splitRoot(this.data,x);else{if(this.data.height<x.height){var M=this.data;this.data=x,x=M}this._insert(x,this.data.height-x.height-1,!0)}else this.data=x;return this},n.prototype.insert=function(f){return f&&this._insert(f,this.data.height-1),this},n.prototype.clear=function(){return this.data=g([]),this},n.prototype.remove=function(f,h){if(!f)return this;for(var x,M,y,R=this.data,C=this.toBBox(f),I=[],L=[];R||I.length;){if(R||(R=I.pop(),M=I[I.length-1],x=L.pop(),y=!0),R.leaf){var v=s(f,R.children,h);if(v!==-1)return R.children.splice(v,1),I.push(R),this._condense(I),this}y||R.leaf||!p(R,C)?M?(x++,R=M.children[x],y=!1):R=null:(I.push(R),L.push(x),x=0,M=R,R=R.children[0])}return this},n.prototype.toBBox=function(f){return f},n.prototype.compareMinX=function(f,h){return f.minX-h.minX},n.prototype.compareMinY=function(f,h){return f.minY-h.minY},n.prototype.toJSON=function(){return this.data},n.prototype.fromJSON=function(f){return this.data=f,this},n.prototype._all=function(f,h){for(var x=[];f;)f.leaf?h.push.apply(h,f.children):x.push.apply(x,f.children),f=x.pop();return h},n.prototype._build=function(f,h,x,M){var y,R=x-h+1,C=this._maxEntries;if(R<=C)return r(y=g(f.slice(h,x+1)),this.toBBox),y;M||(M=Math.ceil(Math.log(R)/Math.log(C)),C=Math.ceil(R/Math.pow(C,M-1))),(y=g([])).leaf=!1,y.height=M;var I=Math.ceil(R/C),L=I*Math.ceil(Math.sqrt(C));_(f,h,x,L,this.compareMinX);for(var v=h;v<=x;v+=L){var S=Math.min(v+L-1,x);_(f,v,S,I,this.compareMinY);for(var P=v;P<=S;P+=I){var F=Math.min(P+I-1,S);y.children.push(this._build(f,P,F,M-1))}}return r(y,this.toBBox),y},n.prototype._chooseSubtree=function(f,h,x,M){for(;M.push(h),!h.leaf&&M.length-1!==x;){for(var y=1/0,R=1/0,C=void 0,I=0;I<h.children.length;I++){var L=h.children[I],v=d(L),S=(P=f,F=L,(Math.max(F.maxX,P.maxX)-Math.min(F.minX,P.minX))*(Math.max(F.maxY,P.maxY)-Math.min(F.minY,P.minY))-v);S<R?(R=S,y=v<y?v:y,C=L):S===R&&v<y&&(y=v,C=L)}h=C||h.children[0]}var P,F;return h},n.prototype._insert=function(f,h,x){var M=x?f:this.toBBox(f),y=[],R=this._chooseSubtree(M,this.data,h,y);for(R.children.push(f),a(R,M);h>=0&&y[h].children.length>this._maxEntries;)this._split(y,h),h--;this._adjustParentBBoxes(M,y,h)},n.prototype._split=function(f,h){var x=f[h],M=x.children.length,y=this._minEntries;this._chooseSplitAxis(x,y,M);var R=this._chooseSplitIndex(x,y,M),C=g(x.children.splice(R,x.children.length-R));C.height=x.height,C.leaf=x.leaf,r(x,this.toBBox),r(C,this.toBBox),h?f[h-1].children.push(C):this._splitRoot(x,C)},n.prototype._splitRoot=function(f,h){this.data=g([f,h]),this.data.height=f.height+1,this.data.leaf=!1,r(this.data,this.toBBox)},n.prototype._chooseSplitIndex=function(f,h,x){for(var M,y,R,C,I,L,v,S=1/0,P=1/0,F=h;F<=x-h;F++){var B=o(f,0,F,this.toBBox),b=o(f,F,x,this.toBBox),T=(y=B,R=b,C=void 0,I=void 0,L=void 0,v=void 0,C=Math.max(y.minX,R.minX),I=Math.max(y.minY,R.minY),L=Math.min(y.maxX,R.maxX),v=Math.min(y.maxY,R.maxY),Math.max(0,L-C)*Math.max(0,v-I)),w=d(B)+d(b);T<S?(S=T,M=F,P=w<P?w:P):T===S&&w<P&&(P=w,M=F)}return M||x-h},n.prototype._chooseSplitAxis=function(f,h,x){var M=f.leaf?this.compareMinX:c,y=f.leaf?this.compareMinY:l;this._allDistMargin(f,h,x,M)<this._allDistMargin(f,h,x,y)&&f.children.sort(M)},n.prototype._allDistMargin=function(f,h,x,M){f.children.sort(M);for(var y=this.toBBox,R=o(f,0,h,y),C=o(f,x-h,x,y),I=u(R)+u(C),L=h;L<x-h;L++){var v=f.children[L];a(R,f.leaf?y(v):v),I+=u(R)}for(var S=x-h-1;S>=h;S--){var P=f.children[S];a(C,f.leaf?y(P):P),I+=u(C)}return I},n.prototype._adjustParentBBoxes=function(f,h,x){for(var M=x;M>=0;M--)a(h[M],f)},n.prototype._condense=function(f){for(var h=f.length-1,x=void 0;h>=0;h--)f[h].children.length===0?h>0?(x=f[h-1].children).splice(x.indexOf(f[h]),1):this.clear():r(f[h],this.toBBox)},n})});var fh=0,bl=1,ph=2;var El=1,mh=2,bn=3,zn=0,ze=1,En=2,Xn=0,bi=1,wl=2,Tl=3,Al=4,gh=5,si=100,_h=101,xh=102,vh=103,yh=104,Mh=200,Sh=201,bh=202,Eh=203,to=204,eo=205,wh=206,Th=207,Ah=208,Ch=209,Rh=210,Ph=211,Ih=212,Lh=213,Dh=214,Ao=0,Co=1,Ro=2,Ei=3,Po=4,Io=5,Lo=6,Do=7,Cl=0,Uh=1,Fh=2,qn=0,Nh=1,Oh=2,Bh=3,zh=4,kh=5,Vh=6,Hh=7;var Rl=300,Ri=301,Pi=302,Uo=303,Fo=304,ur=306,no=1e3,ii=1001,io=1002,ln=1003,Gh=1004;var dr=1005;var _n=1006,No=1007;var ai=1008;var vn=1009,Pl=1010,Il=1011,ps=1012,Oo=1013,li=1014,wn=1015,ms=1016,Bo=1017,zo=1018,gs=1020,Ll=35902,Dl=35899,Ul=1021,Fl=1022,cn=1023,is=1026,_s=1027,Nl=1028,ko=1029,Ol=1030,Vo=1031;var Ho=1033,fr=33776,pr=33777,mr=33778,gr=33779,Go=35840,Wo=35841,Xo=35842,qo=35843,Yo=36196,Zo=37492,Jo=37496,$o=37808,Ko=37809,Qo=37810,jo=37811,ta=37812,ea=37813,na=37814,ia=37815,sa=37816,ra=37817,oa=37818,aa=37819,la=37820,ca=37821,ha=36492,ua=36494,da=36495,fa=36283,pa=36284,ma=36285,ga=36286;var ks=2300,so=2301,jr=2302,ul=2400,dl=2401,fl=2402;var Wh=3200,Xh=3201;var Bl=0,qh=1,Yn="",tn="srgb",wi="srgb-linear",Vs="linear",re="srgb";var Si=7680;var pl=519,Yh=512,Zh=513,Jh=514,zl=515,$h=516,Kh=517,Qh=518,jh=519,ml=35044;var kl="300 es",gn=2e3,Hs=2001;var kn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ce=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bc=1234567,Bs=Math.PI/180,ss=180/Math.PI;function xs(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ce[i&255]+Ce[i>>8&255]+Ce[i>>16&255]+Ce[i>>24&255]+"-"+Ce[t&255]+Ce[t>>8&255]+"-"+Ce[t>>16&15|64]+Ce[t>>24&255]+"-"+Ce[e&63|128]+Ce[e>>8&255]+"-"+Ce[e>>16&255]+Ce[e>>24&255]+Ce[n&255]+Ce[n>>8&255]+Ce[n>>16&255]+Ce[n>>24&255]).toLowerCase()}function Yt(i,t,e){return Math.max(t,Math.min(e,i))}function Vl(i,t){return(i%t+t)%t}function Vd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Hd(i,t,e){return i!==t?(e-i)/(t-i):0}function zs(i,t,e){return(1-e)*i+e*t}function Gd(i,t,e,n){return zs(i,t,1-Math.exp(-e*n))}function Wd(i,t=1){return t-Math.abs(Vl(i,t*2)-t)}function Xd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function qd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Yd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Zd(i,t){return i+Math.random()*(t-i)}function Jd(i){return i*(.5-Math.random())}function $d(i){i!==void 0&&(Bc=i);let t=Bc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Kd(i){return i*Bs}function Qd(i){return i*ss}function jd(i){return(i&i-1)===0&&i!==0}function tf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ef(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function nf(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),d=o((t+n)/2),u=r((t-n)/2),p=o((t-n)/2),m=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*d,c*u,c*p,a*l);break;case"YZY":i.set(c*p,a*d,c*u,a*l);break;case"ZXZ":i.set(c*u,c*p,a*d,a*l);break;case"XZX":i.set(a*d,c*g,c*m,a*l);break;case"YXY":i.set(c*m,a*d,c*g,a*l);break;case"ZYZ":i.set(c*g,c*m,a*d,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function es(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Oe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var hn={DEG2RAD:Bs,RAD2DEG:ss,generateUUID:xs,clamp:Yt,euclideanModulo:Vl,mapLinear:Vd,inverseLerp:Hd,lerp:zs,damp:Gd,pingpong:Wd,smoothstep:Xd,smootherstep:qd,randInt:Yd,randFloat:Zd,randFloatSpread:Jd,seededRandom:$d,degToRad:Kd,radToDeg:Qd,isPowerOfTwo:jd,ceilPowerOfTwo:tf,floorPowerOfTwo:ef,setQuaternionFromProperEuler:nf,normalize:Oe,denormalize:es},Zt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Vn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],d=n[s+2],u=n[s+3],p=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u;return}if(a===1){t[e+0]=p,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==p||l!==m||d!==g){let f=1-a,h=c*p+l*m+d*g+u*_,x=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){let R=Math.sqrt(M),C=Math.atan2(R,h*x);f=Math.sin(f*C)/R,a=Math.sin(a*C)/R}let y=a*x;if(c=c*f+p*y,l=l*f+m*y,d=d*f+g*y,u=u*f+_*y,f===1-a){let R=1/Math.sqrt(c*c+l*l+d*d+u*u);c*=R,l*=R,d*=R,u*=R}}t[e]=c,t[e+1]=l,t[e+2]=d,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],c=n[s+1],l=n[s+2],d=n[s+3],u=r[o],p=r[o+1],m=r[o+2],g=r[o+3];return t[e]=a*g+d*u+c*m-l*p,t[e+1]=c*g+d*p+l*u-a*m,t[e+2]=l*g+d*m+a*p-c*u,t[e+3]=d*g-a*u-c*p-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),d=a(s/2),u=a(r/2),p=c(n/2),m=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=p*d*u+l*m*g,this._y=l*m*u-p*d*g,this._z=l*d*g+p*m*u,this._w=l*d*u-p*m*g;break;case"YXZ":this._x=p*d*u+l*m*g,this._y=l*m*u-p*d*g,this._z=l*d*g-p*m*u,this._w=l*d*u+p*m*g;break;case"ZXY":this._x=p*d*u-l*m*g,this._y=l*m*u+p*d*g,this._z=l*d*g+p*m*u,this._w=l*d*u-p*m*g;break;case"ZYX":this._x=p*d*u-l*m*g,this._y=l*m*u+p*d*g,this._z=l*d*g-p*m*u,this._w=l*d*u+p*m*g;break;case"YZX":this._x=p*d*u+l*m*g,this._y=l*m*u+p*d*g,this._z=l*d*g-p*m*u,this._w=l*d*u-p*m*g;break;case"XZY":this._x=p*d*u-l*m*g,this._y=l*m*u-p*d*g,this._z=l*d*g+p*m*u,this._w=l*d*u+p*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],d=e[6],u=e[10],p=n+a+u;if(p>0){let m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(d-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>u){let m=2*Math.sqrt(1+n-a-u);this._w=(d-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>u){let m=2*Math.sqrt(1+a-n-u);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+d)/m}else{let m=2*Math.sqrt(1+u-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,d=e._w;return this._x=n*d+o*a+s*l-r*c,this._y=s*d+o*c+r*a-n*l,this._z=r*d+o*l+n*c-s*a,this._w=o*d-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let m=1-e;return this._w=m*o+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),d=Math.atan2(l,a),u=Math.sin((1-e)*d)/l,p=Math.sin(e*d)/l;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},H=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(zc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(zc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),d=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*d,this.y=n+c*d+a*l-r*u,this.z=s+c*u+r*d-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ha.copy(this).projectOnVector(t),this.sub(Ha)}reflect(t){return this.sub(Ha.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ha=new H,zc=new Vn,Gt=class i{constructor(t,e,n,s,r,o,a,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){let d=this.elements;return d[0]=t,d[1]=s,d[2]=a,d[3]=e,d[4]=r,d[5]=c,d[6]=n,d[7]=o,d[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],d=n[4],u=n[7],p=n[2],m=n[5],g=n[8],_=s[0],f=s[3],h=s[6],x=s[1],M=s[4],y=s[7],R=s[2],C=s[5],I=s[8];return r[0]=o*_+a*x+c*R,r[3]=o*f+a*M+c*C,r[6]=o*h+a*y+c*I,r[1]=l*_+d*x+u*R,r[4]=l*f+d*M+u*C,r[7]=l*h+d*y+u*I,r[2]=p*_+m*x+g*R,r[5]=p*f+m*M+g*C,r[8]=p*h+m*y+g*I,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8];return e*o*d-e*a*l-n*r*d+n*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],u=d*o-a*l,p=a*c-d*r,m=l*r-o*c,g=e*u+n*p+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=u*_,t[1]=(s*l-d*n)*_,t[2]=(a*n-s*o)*_,t[3]=p*_,t[4]=(d*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=m*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ga.makeScale(t,e)),this}rotate(t){return this.premultiply(Ga.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ga.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ga=new Gt;function Hl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Gs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function tu(){let i=Gs("canvas");return i.style.display="block",i}var kc={};function rs(i){i in kc||(kc[i]=!0,console.warn(i))}function eu(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Vc=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Hc=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function sf(){let i={enabled:!0,workingColorSpace:wi,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===re&&(s.r=Bn(s.r),s.g=Bn(s.g),s.b=Bn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===re&&(s.r=ns(s.r),s.g=ns(s.g),s.b=ns(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yn?Vs:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return rs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return rs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[wi]:{primaries:t,whitePoint:n,transfer:Vs,toXYZ:Vc,fromXYZ:Hc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:t,whitePoint:n,transfer:re,toXYZ:Vc,fromXYZ:Hc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),i}var te=sf();function Bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ns(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Gi,ro=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Gi===void 0&&(Gi=Gs("canvas")),Gi.width=t.width,Gi.height=t.height;let s=Gi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Gi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Gs("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Bn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Bn(e[n]/255)*255):e[n]=Bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},rf=0,os=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=xs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Wa(s[o].image)):r.push(Wa(s[o]))}else r=Wa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ro.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var of=0,Xa=new H,en=class i extends kn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ii,s=ii,r=_n,o=ai,a=cn,c=vn,l=i.DEFAULT_ANISOTROPY,d=Yn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=xs(),this.name="",this.source=new os(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Xa).x}get height(){return this.source.getSize(Xa).y}get depth(){return this.source.getSize(Xa).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Rl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case no:t.x=t.x-Math.floor(t.x);break;case ii:t.x=t.x<0?0:1;break;case io:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case no:t.y=t.y-Math.floor(t.y);break;case ii:t.y=t.y<0?0:1;break;case io:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=Rl;en.DEFAULT_ANISOTROPY=1;var ve=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],d=c[4],u=c[8],p=c[1],m=c[5],g=c[9],_=c[2],f=c[6],h=c[10];if(Math.abs(d-p)<.01&&Math.abs(u-_)<.01&&Math.abs(g-f)<.01){if(Math.abs(d+p)<.1&&Math.abs(u+_)<.1&&Math.abs(g+f)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(l+1)/2,y=(m+1)/2,R=(h+1)/2,C=(d+p)/4,I=(u+_)/4,L=(g+f)/4;return M>y&&M>R?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=C/n,r=I/n):y>R?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=C/s,r=L/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=I/r,s=L/r),this.set(n,s,r,e),this}let x=Math.sqrt((f-g)*(f-g)+(u-_)*(u-_)+(p-d)*(p-d));return Math.abs(x)<.001&&(x=1),this.x=(f-g)/x,this.y=(u-_)/x,this.z=(p-d)/x,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},oo=class extends kn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);let s={width:t,height:e,depth:n.depth},r=new en(s);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){let e={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new os(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mn=class extends oo{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ws=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ao=class extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Pe=class{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(r,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ir.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ir.copy(n.boundingBox)),Ir.applyMatrix4(t.matrixWorld),this.union(Ir)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),Lr.subVectors(this.max,Ls),Wi.subVectors(t.a,Ls),Xi.subVectors(t.b,Ls),qi.subVectors(t.c,Ls),$n.subVectors(Xi,Wi),Kn.subVectors(qi,Xi),xi.subVectors(Wi,qi);let e=[0,-$n.z,$n.y,0,-Kn.z,Kn.y,0,-xi.z,xi.y,$n.z,0,-$n.x,Kn.z,0,-Kn.x,xi.z,0,-xi.x,-$n.y,$n.x,0,-Kn.y,Kn.x,0,-xi.y,xi.x,0];return!qa(e,Wi,Xi,qi,Lr)||(e=[1,0,0,0,1,0,0,0,1],!qa(e,Wi,Xi,qi,Lr))?!1:(Dr.crossVectors($n,Kn),e=[Dr.x,Dr.y,Dr.z],qa(e,Wi,Xi,qi,Lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ln=[new H,new H,new H,new H,new H,new H,new H,new H],dn=new H,Ir=new Pe,Wi=new H,Xi=new H,qi=new H,$n=new H,Kn=new H,xi=new H,Ls=new H,Lr=new H,Dr=new H,vi=new H;function qa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vi.fromArray(i,r);let a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),c=t.dot(vi),l=e.dot(vi),d=n.dot(vi);if(Math.max(-Math.max(c,l,d),Math.min(c,l,d))>a)return!1}return!0}var af=new Pe,Ds=new H,Ya=new H,Hn=class{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):af.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);let e=Ds.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ds,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ya.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(Ya)),this.expandByPoint(Ds.copy(t.center).sub(Ya))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Dn=new H,Za=new H,Ur=new H,Qn=new H,Ja=new H,Fr=new H,$a=new H,Gn=class{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Dn.copy(this.origin).addScaledVector(this.direction,e),Dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Za.copy(t).add(e).multiplyScalar(.5),Ur.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub(Za);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Ur),a=Qn.dot(this.direction),c=-Qn.dot(Ur),l=Qn.lengthSq(),d=Math.abs(1-o*o),u,p,m,g;if(d>0)if(u=o*c-a,p=o*a-c,g=r*d,u>=0)if(p>=-g)if(p<=g){let _=1/d;u*=_,p*=_,m=u*(u+o*p+2*a)+p*(o*u+p+2*c)+l}else p=r,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*c)+l;else p=-r,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*c)+l;else p<=-g?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+p*(p+2*c)+l):p<=g?(u=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+p*(p+2*c)+l);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),m=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Za).addScaledVector(Ur,p),m}intersectSphere(t,e){Dn.subVectors(t.center,this.origin);let n=Dn.dot(this.direction),s=Dn.dot(Dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c,l=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(t.min.x-p.x)*l,s=(t.max.x-p.x)*l):(n=(t.max.x-p.x)*l,s=(t.min.x-p.x)*l),d>=0?(r=(t.min.y-p.y)*d,o=(t.max.y-p.y)*d):(r=(t.max.y-p.y)*d,o=(t.min.y-p.y)*d),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-p.z)*u,c=(t.max.z-p.z)*u):(a=(t.max.z-p.z)*u,c=(t.min.z-p.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Dn)!==null}intersectTriangle(t,e,n,s,r){Ja.subVectors(e,t),Fr.subVectors(n,t),$a.crossVectors(Ja,Fr);let o=this.direction.dot($a),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Qn.subVectors(this.origin,t);let c=a*this.direction.dot(Fr.crossVectors(Qn,Fr));if(c<0)return null;let l=a*this.direction.dot(Ja.cross(Qn));if(l<0||c+l>o)return null;let d=-a*Qn.dot($a);return d<0?null:this.at(d/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ae=class i{constructor(t,e,n,s,r,o,a,c,l,d,u,p,m,g,_,f){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,d,u,p,m,g,_,f)}set(t,e,n,s,r,o,a,c,l,d,u,p,m,g,_,f){let h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=c,h[2]=l,h[6]=d,h[10]=u,h[14]=p,h[3]=m,h[7]=g,h[11]=_,h[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),o=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),d=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let p=o*d,m=o*u,g=a*d,_=a*u;e[0]=c*d,e[4]=-c*u,e[8]=l,e[1]=m+g*l,e[5]=p-_*l,e[9]=-a*c,e[2]=_-p*l,e[6]=g+m*l,e[10]=o*c}else if(t.order==="YXZ"){let p=c*d,m=c*u,g=l*d,_=l*u;e[0]=p+_*a,e[4]=g*a-m,e[8]=o*l,e[1]=o*u,e[5]=o*d,e[9]=-a,e[2]=m*a-g,e[6]=_+p*a,e[10]=o*c}else if(t.order==="ZXY"){let p=c*d,m=c*u,g=l*d,_=l*u;e[0]=p-_*a,e[4]=-o*u,e[8]=g+m*a,e[1]=m+g*a,e[5]=o*d,e[9]=_-p*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let p=o*d,m=o*u,g=a*d,_=a*u;e[0]=c*d,e[4]=g*l-m,e[8]=p*l+_,e[1]=c*u,e[5]=_*l+p,e[9]=m*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let p=o*c,m=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=_-p*u,e[8]=g*u+m,e[1]=u,e[5]=o*d,e[9]=-a*d,e[2]=-l*d,e[6]=m*u+g,e[10]=p-_*u}else if(t.order==="XZY"){let p=o*c,m=o*l,g=a*c,_=a*l;e[0]=c*d,e[4]=-u,e[8]=l*d,e[1]=p*u+_,e[5]=o*d,e[9]=m*u-g,e[2]=g*u-m,e[6]=a*d,e[10]=_*u+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(lf,t,cf)}lookAt(t,e,n){let s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),jn.crossVectors(n,Qe),jn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),jn.crossVectors(n,Qe)),jn.normalize(),Nr.crossVectors(Qe,jn),s[0]=jn.x,s[4]=Nr.x,s[8]=Qe.x,s[1]=jn.y,s[5]=Nr.y,s[9]=Qe.y,s[2]=jn.z,s[6]=Nr.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],d=n[1],u=n[5],p=n[9],m=n[13],g=n[2],_=n[6],f=n[10],h=n[14],x=n[3],M=n[7],y=n[11],R=n[15],C=s[0],I=s[4],L=s[8],v=s[12],S=s[1],P=s[5],F=s[9],B=s[13],b=s[2],T=s[6],w=s[10],z=s[14],N=s[3],V=s[7],O=s[11],Z=s[15];return r[0]=o*C+a*S+c*b+l*N,r[4]=o*I+a*P+c*T+l*V,r[8]=o*L+a*F+c*w+l*O,r[12]=o*v+a*B+c*z+l*Z,r[1]=d*C+u*S+p*b+m*N,r[5]=d*I+u*P+p*T+m*V,r[9]=d*L+u*F+p*w+m*O,r[13]=d*v+u*B+p*z+m*Z,r[2]=g*C+_*S+f*b+h*N,r[6]=g*I+_*P+f*T+h*V,r[10]=g*L+_*F+f*w+h*O,r[14]=g*v+_*B+f*z+h*Z,r[3]=x*C+M*S+y*b+R*N,r[7]=x*I+M*P+y*T+R*V,r[11]=x*L+M*F+y*w+R*O,r[15]=x*v+M*B+y*z+R*Z,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],d=t[2],u=t[6],p=t[10],m=t[14],g=t[3],_=t[7],f=t[11],h=t[15];return g*(+r*c*u-s*l*u-r*a*p+n*l*p+s*a*m-n*c*m)+_*(+e*c*m-e*l*p+r*o*p-s*o*m+s*l*d-r*c*d)+f*(+e*l*u-e*a*m-r*o*u+n*o*m+r*a*d-n*l*d)+h*(-s*a*d-e*c*u+e*a*p+s*o*u-n*o*p+n*c*d)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],d=t[8],u=t[9],p=t[10],m=t[11],g=t[12],_=t[13],f=t[14],h=t[15],x=u*f*l-_*p*l+_*c*m-a*f*m-u*c*h+a*p*h,M=g*p*l-d*f*l-g*c*m+o*f*m+d*c*h-o*p*h,y=d*_*l-g*u*l+g*a*m-o*_*m-d*a*h+o*u*h,R=g*u*c-d*_*c-g*a*p+o*_*p+d*a*f-o*u*f,C=e*x+n*M+s*y+r*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let I=1/C;return t[0]=x*I,t[1]=(_*p*r-u*f*r-_*s*m+n*f*m+u*s*h-n*p*h)*I,t[2]=(a*f*r-_*c*r+_*s*l-n*f*l-a*s*h+n*c*h)*I,t[3]=(u*c*r-a*p*r-u*s*l+n*p*l+a*s*m-n*c*m)*I,t[4]=M*I,t[5]=(d*f*r-g*p*r+g*s*m-e*f*m-d*s*h+e*p*h)*I,t[6]=(g*c*r-o*f*r-g*s*l+e*f*l+o*s*h-e*c*h)*I,t[7]=(o*p*r-d*c*r+d*s*l-e*p*l-o*s*m+e*c*m)*I,t[8]=y*I,t[9]=(g*u*r-d*_*r-g*n*m+e*_*m+d*n*h-e*u*h)*I,t[10]=(o*_*r-g*a*r+g*n*l-e*_*l-o*n*h+e*a*h)*I,t[11]=(d*a*r-o*u*r-d*n*l+e*u*l+o*n*m-e*a*m)*I,t[12]=R*I,t[13]=(d*_*s-g*u*s+g*n*p-e*_*p-d*n*f+e*u*f)*I,t[14]=(g*a*s-o*_*s-g*n*c+e*_*c+o*n*f-e*a*f)*I,t[15]=(o*u*s-d*a*s+d*n*c-e*u*c-o*n*p+e*a*p)*I,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,d=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,d*a+n,d*c-s*o,0,l*c-s*a,d*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,d=o+o,u=a+a,p=r*l,m=r*d,g=r*u,_=o*d,f=o*u,h=a*u,x=c*l,M=c*d,y=c*u,R=n.x,C=n.y,I=n.z;return s[0]=(1-(_+h))*R,s[1]=(m+y)*R,s[2]=(g-M)*R,s[3]=0,s[4]=(m-y)*C,s[5]=(1-(p+h))*C,s[6]=(f+x)*C,s[7]=0,s[8]=(g+M)*I,s[9]=(f-x)*I,s[10]=(1-(p+_))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Yi.set(s[0],s[1],s[2]).length(),o=Yi.set(s[4],s[5],s[6]).length(),a=Yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],fn.copy(this);let l=1/r,d=1/o,u=1/a;return fn.elements[0]*=l,fn.elements[1]*=l,fn.elements[2]*=l,fn.elements[4]*=d,fn.elements[5]*=d,fn.elements[6]*=d,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,e.setFromRotationMatrix(fn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=gn,c=!1){let l=this.elements,d=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),m=(n+s)/(n-s),g,_;if(c)g=r/(o-r),_=o*r/(o-r);else if(a===gn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Hs)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=gn,c=!1){let l=this.elements,d=2/(e-t),u=2/(n-s),p=-(e+t)/(e-t),m=-(n+s)/(n-s),g,_;if(c)g=1/(o-r),_=o/(o-r);else if(a===gn)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===Hs)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=d,l[4]=0,l[8]=0,l[12]=p,l[1]=0,l[5]=u,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Yi=new H,fn=new ae,lf=new H(0,0,0),cf=new H(1,1,1),jn=new H,Nr=new H,Qe=new H,Gc=new ae,Wc=new Vn,nn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],d=s[9],u=s[2],p=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Yt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-d,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Gc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Gc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};nn.DEFAULT_ORDER="XYZ";var as=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},hf=0,Xc=new H,Zi=new Vn,Un=new ae,Or=new H,Us=new H,uf=new H,df=new Vn,qc=new H(1,0,0),Yc=new H(0,1,0),Zc=new H(0,0,1),Jc={type:"added"},ff={type:"removed"},Ji={type:"childadded",child:null},Ka={type:"childremoved",child:null},Ie=class i extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hf++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new H,e=new nn,n=new Vn,s=new H(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new Gt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new as,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(qc,t)}rotateY(t){return this.rotateOnAxis(Yc,t)}rotateZ(t){return this.rotateOnAxis(Zc,t)}translateOnAxis(t,e){return Xc.copy(t).applyQuaternion(this.quaternion),this.position.add(Xc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(qc,t)}translateY(t){return this.translateOnAxis(Yc,t)}translateZ(t){return this.translateOnAxis(Zc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Or.copy(t):Or.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Us,Or,this.up):Un.lookAt(Or,Us,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(Un),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jc),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ff),Ka.child=t,this.dispatchEvent(Ka),Ka.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jc),Ji.child=t,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,t,uf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,df,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,d=c.length;l<d;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),d=o(t.images),u=o(t.shapes),p=o(t.skeletons),m=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let c=[];for(let l in a){let d=a[l];delete d.metadata,c.push(d)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ie.DEFAULT_UP=new H(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pn=new H,Fn=new H,Qa=new H,Nn=new H,$i=new H,Ki=new H,$c=new H,ja=new H,tl=new H,el=new H,nl=new ve,il=new ve,sl=new ve,ni=class i{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),pn.subVectors(t,e),s.cross(pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){pn.subVectors(s,e),Fn.subVectors(n,e),Qa.subVectors(t,e);let o=pn.dot(pn),a=pn.dot(Fn),c=pn.dot(Qa),l=Fn.dot(Fn),d=Fn.dot(Qa),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let p=1/u,m=(l*c-a*d)*p,g=(o*d-a*c)*p;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Nn)===null?!1:Nn.x>=0&&Nn.y>=0&&Nn.x+Nn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Nn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Nn.x),c.addScaledVector(o,Nn.y),c.addScaledVector(a,Nn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return nl.setScalar(0),il.setScalar(0),sl.setScalar(0),nl.fromBufferAttribute(t,e),il.fromBufferAttribute(t,n),sl.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(nl,r.x),o.addScaledVector(il,r.y),o.addScaledVector(sl,r.z),o}static isFrontFacing(t,e,n,s){return pn.subVectors(n,e),Fn.subVectors(t,e),pn.cross(Fn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),pn.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;$i.subVectors(s,n),Ki.subVectors(r,n),ja.subVectors(t,n);let c=$i.dot(ja),l=Ki.dot(ja);if(c<=0&&l<=0)return e.copy(n);tl.subVectors(t,s);let d=$i.dot(tl),u=Ki.dot(tl);if(d>=0&&u<=d)return e.copy(s);let p=c*u-d*l;if(p<=0&&c>=0&&d<=0)return o=c/(c-d),e.copy(n).addScaledVector($i,o);el.subVectors(t,r);let m=$i.dot(el),g=Ki.dot(el);if(g>=0&&m<=g)return e.copy(r);let _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ki,a);let f=d*g-m*u;if(f<=0&&u-d>=0&&m-g>=0)return $c.subVectors(r,s),a=(u-d)/(u-d+(m-g)),e.copy(s).addScaledVector($c,a);let h=1/(f+_+p);return o=_*h,a=p*h,e.copy(n).addScaledVector($i,o).addScaledVector(Ki,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},nu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},Br={h:0,s:0,l:0};function rl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=Vl(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=rl(o,r,t+1/3),this.g=rl(o,r,t),this.b=rl(o,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=tn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=tn){let n=nu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Bn(t.r),this.g=Bn(t.g),this.b=Bn(t.b),this}copyLinearToSRGB(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return te.workingToColorSpace(Re.copy(this),t),Math.round(Yt(Re.r*255,0,255))*65536+Math.round(Yt(Re.g*255,0,255))*256+Math.round(Yt(Re.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Re.copy(this),e);let n=Re.r,s=Re.g,r=Re.b,o=Math.max(n,s,r),a=Math.min(n,s,r),c,l,d=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=d<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=d,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=tn){te.workingToColorSpace(Re.copy(this),t);let e=Re.r,n=Re.g,s=Re.b;return t!==tn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(Br);let n=zs(ti.h,Br.h,e),s=zs(ti.s,Br.s,e),r=zs(ti.l,Br.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Re=new Kt;Kt.NAMES=nu;var pf=0,Wn=class extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:pf++}),this.uuid=xs(),this.name="",this.type="Material",this.blending=bi,this.side=zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=to,this.blendDst=eo,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ei,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==bi&&(n.blending=this.blending),this.side!==zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==to&&(n.blendSrc=this.blendSrc),this.blendDst!==eo&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ei&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Xs=class extends Wn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=Cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Se=new H,zr=new Zt,mf=0,Ae=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ml,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)zr.fromBufferAttribute(this,e),zr.applyMatrix3(t),this.setXY(e,zr.x,zr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Oe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=es(e,this.array)),e}setX(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=es(e,this.array)),e}setY(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=es(e,this.array)),e}setW(t,e){return this.normalized&&(e=Oe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Oe(e,this.array),n=Oe(n,this.array),s=Oe(s,this.array),r=Oe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ml&&(t.usage=this.usage),t}};var qs=class extends Ae{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Ys=class extends Ae{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Be=class extends Ae{constructor(t,e,n){super(new Float32Array(t),e,n)}},gf=0,an=new ae,ol=new Ie,Qi=new H,je=new Pe,Fs=new Pe,Te=new H,Sn=class i extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Hl(t)?Ys:qs)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return an.makeRotationFromQuaternion(t),this.applyMatrix4(an),this}rotateX(t){return an.makeRotationX(t),this.applyMatrix4(an),this}rotateY(t){return an.makeRotationY(t),this.applyMatrix4(an),this}rotateZ(t){return an.makeRotationZ(t),this.applyMatrix4(an),this}translate(t,e,n){return an.makeTranslation(t,e,n),this.applyMatrix4(an),this}scale(t,e,n){return an.makeScale(t,e,n),this.applyMatrix4(an),this}lookAt(t){return ol.lookAt(t),ol.updateMatrix(),this.applyMatrix4(ol.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Be(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Pe);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){let n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Fs.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(je.min,Fs.min),je.expandByPoint(Te),Te.addVectors(je.max,Fs.max),je.expandByPoint(Te)):(je.expandByPoint(Fs.min),je.expandByPoint(Fs.max))}je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,d=a.count;l<d;l++)Te.fromBufferAttribute(a,l),c&&(Qi.fromBufferAttribute(t,l),Te.add(Qi)),s=Math.max(s,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ae(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new H,c[L]=new H;let l=new H,d=new H,u=new H,p=new Zt,m=new Zt,g=new Zt,_=new H,f=new H;function h(L,v,S){l.fromBufferAttribute(n,L),d.fromBufferAttribute(n,v),u.fromBufferAttribute(n,S),p.fromBufferAttribute(r,L),m.fromBufferAttribute(r,v),g.fromBufferAttribute(r,S),d.sub(l),u.sub(l),m.sub(p),g.sub(p);let P=1/(m.x*g.y-g.x*m.y);isFinite(P)&&(_.copy(d).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(P),f.copy(u).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(P),a[L].add(_),a[v].add(_),a[S].add(_),c[L].add(f),c[v].add(f),c[S].add(f))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let L=0,v=x.length;L<v;++L){let S=x[L],P=S.start,F=S.count;for(let B=P,b=P+F;B<b;B+=3)h(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let M=new H,y=new H,R=new H,C=new H;function I(L){R.fromBufferAttribute(s,L),C.copy(R);let v=a[L];M.copy(v),M.sub(R.multiplyScalar(R.dot(v))).normalize(),y.crossVectors(C,v);let P=y.dot(c[L])<0?-1:1;o.setXYZW(L,M.x,M.y,M.z,P)}for(let L=0,v=x.length;L<v;++L){let S=x[L],P=S.start,F=S.count;for(let B=P,b=P+F;B<b;B+=3)I(t.getX(B+0)),I(t.getX(B+1)),I(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);let s=new H,r=new H,o=new H,a=new H,c=new H,l=new H,d=new H,u=new H;if(t)for(let p=0,m=t.count;p<m;p+=3){let g=t.getX(p+0),_=t.getX(p+1),f=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,f),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),a.add(d),c.add(d),l.add(d),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=e.count;p<m;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),d.subVectors(o,r),u.subVectors(s,r),d.cross(u),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,c){let l=a.array,d=a.itemSize,u=a.normalized,p=new l.constructor(c.length*d),m=0,g=0;for(let _=0,f=c.length;_<f;_++){a.isInterleavedBufferAttribute?m=c[_]*a.data.stride+a.offset:m=c[_]*d;for(let h=0;h<d;h++)p[g++]=l[m++]}return new Ae(p,d,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,n);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let d=0,u=l.length;d<u;d++){let p=l[d],m=t(p,n);c.push(m)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],d=[];for(let u=0,p=l.length;u<p;u++){let m=l[u];d.push(m.toJSON(t.data))}d.length>0&&(s[c]=d,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let l in s){let d=s[l];this.setAttribute(l,d.clone(e))}let r=t.morphAttributes;for(let l in r){let d=[],u=r[l];for(let p=0,m=u.length;p<m;p++)d.push(u[p].clone(e));this.morphAttributes[l]=d}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,d=o.length;l<d;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Kc=new ae,yi=new Gn,kr=new Hn,Qc=new H,Vr=new H,Hr=new H,Gr=new H,al=new H,Wr=new H,jc=new H,Xr=new H,Le=class extends Ie{constructor(t=new Sn,e=new Xs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Wr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let d=a[c],u=r[c];d!==0&&(al.fromBufferAttribute(u,t),o?Wr.addScaledVector(al,d):Wr.addScaledVector(al.sub(e),d))}e.add(Wr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),yi.copy(t.ray).recast(t.near),!(kr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(kr,Qc)===null||yi.origin.distanceToSquared(Qc)>(t.far-t.near)**2))&&(Kc.copy(r).invert(),yi.copy(t.ray).applyMatrix4(Kc),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,d=r.attributes.uv1,u=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){let f=p[g],h=o[f.materialIndex],x=Math.max(f.start,m.start),M=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let y=x,R=M;y<R;y+=3){let C=a.getX(y),I=a.getX(y+1),L=a.getX(y+2);s=qr(this,h,t,n,l,d,u,C,I,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let f=g,h=_;f<h;f+=3){let x=a.getX(f),M=a.getX(f+1),y=a.getX(f+2);s=qr(this,o,t,n,l,d,u,x,M,y),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=p.length;g<_;g++){let f=p[g],h=o[f.materialIndex],x=Math.max(f.start,m.start),M=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let y=x,R=M;y<R;y+=3){let C=y,I=y+1,L=y+2;s=qr(this,h,t,n,l,d,u,C,I,L),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let f=g,h=_;f<h;f+=3){let x=f,M=f+1,y=f+2;s=qr(this,o,t,n,l,d,u,x,M,y),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function _f(i,t,e,n,s,r,o,a){let c;if(t.side===ze?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===zn,a),c===null)return null;Xr.copy(a),Xr.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(Xr);return l<e.near||l>e.far?null:{distance:l,point:Xr.clone(),object:i}}function qr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Vr),i.getVertexPosition(c,Hr),i.getVertexPosition(l,Gr);let d=_f(i,t,e,n,Vr,Hr,Gr,jc);if(d){let u=new H;ni.getBarycoord(jc,Vr,Hr,Gr,u),s&&(d.uv=ni.getInterpolatedAttribute(s,a,c,l,u,new Zt)),r&&(d.uv1=ni.getInterpolatedAttribute(r,a,c,l,u,new Zt)),o&&(d.normal=ni.getInterpolatedAttribute(o,a,c,l,u,new H),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));let p={a,b:c,c:l,normal:new H,materialIndex:0};ni.getNormal(Vr,Hr,Gr,p.normal),d.face=p,d.barycoord=u}return d}var ls=class i extends Sn{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],d=[],u=[],p=0,m=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Be(l,3)),this.setAttribute("normal",new Be(d,3)),this.setAttribute("uv",new Be(u,2));function g(_,f,h,x,M,y,R,C,I,L,v){let S=y/I,P=R/L,F=y/2,B=R/2,b=C/2,T=I+1,w=L+1,z=0,N=0,V=new H;for(let O=0;O<w;O++){let Z=O*P-B;for(let rt=0;rt<T;rt++){let Q=rt*S-F;V[_]=Q*x,V[f]=Z*M,V[h]=b,l.push(V.x,V.y,V.z),V[_]=0,V[f]=0,V[h]=C>0?1:-1,d.push(V.x,V.y,V.z),u.push(rt/I),u.push(1-O/L),z+=1}}for(let O=0;O<L;O++)for(let Z=0;Z<I;Z++){let rt=p+Z+T*O,Q=p+Z+T*(O+1),et=p+(Z+1)+T*(O+1),nt=p+(Z+1)+T*O;c.push(rt,Q,nt),c.push(Q,et,nt),N+=6}a.addGroup(m,N,v),m+=N,p+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ii(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function De(i){let t={};for(let e=0;e<i.length;e++){let n=Ii(i[e]);for(let s in n)t[s]=n[s]}return t}function xf(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Gl(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}var iu={clone:Ii,merge:De},vf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,xn=class extends Wn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vf,this.fragmentShader=yf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ii(t.uniforms),this.uniformsGroups=xf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Zs=class extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=gn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ei=new H,th=new Zt,eh=new Zt,We=class extends Zs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ss*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ss*2*Math.atan(Math.tan(Bs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,th,eh),e.subVectors(eh,th)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},ji=-90,ts=1,lo=class extends Ie{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new We(ji,ts,t,e);s.layers=this.layers,this.add(s);let r=new We(ji,ts,t,e);r.layers=this.layers,this.add(r);let o=new We(ji,ts,t,e);o.layers=this.layers,this.add(o);let a=new We(ji,ts,t,e);a.layers=this.layers,this.add(a);let c=new We(ji,ts,t,e);c.layers=this.layers,this.add(c);let l=new We(ji,ts,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===gn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,d]=this.children,u=t.getRenderTarget(),p=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,d),t.setRenderTarget(u,p,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Js=class extends en{constructor(t=[],e=Ri,n,s,r,o,a,c,l,d){super(t,e,n,s,r,o,a,c,l,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},co=class extends Mn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Js(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ls(5,5,5),r=new xn({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ze,blending:Xn});r.uniforms.tEquirect.value=e;let o=new Le(s,r),a=e.minFilter;return e.minFilter===ai&&(e.minFilter=_n),new lo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},On=class extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}},Mf={type:"move"},cs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new On,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new On,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new On,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let _ of t.hand.values()){let f=e.getJointPose(_,n),h=this._getHandJoint(l,_);f!==null&&(h.matrix.fromArray(f.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=f.radius),h.visible=f!==null}let d=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=d.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&p>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&p<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Mf)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new On;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}};var $s=class extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var ll=new H,Sf=new H,bf=new Gt,mn=class{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ll.subVectors(n,e).cross(Sf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ll),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||bf.getNormalMatrix(t),s=this.coplanarPoint(ll).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Mi=new Hn,Ef=new Zt(.5,.5),Yr=new H,hs=class{constructor(t=new mn,e=new mn,n=new mn,s=new mn,r=new mn,o=new mn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],d=r[4],u=r[5],p=r[6],m=r[7],g=r[8],_=r[9],f=r[10],h=r[11],x=r[12],M=r[13],y=r[14],R=r[15];if(s[0].setComponents(l-o,m-d,h-g,R-x).normalize(),s[1].setComponents(l+o,m+d,h+g,R+x).normalize(),s[2].setComponents(l+a,m+u,h+_,R+M).normalize(),s[3].setComponents(l-a,m-u,h-_,R-M).normalize(),n)s[4].setComponents(c,p,f,y).normalize(),s[5].setComponents(l-c,m-p,h-f,R-y).normalize();else if(s[4].setComponents(l-c,m-p,h-f,R-y).normalize(),e===gn)s[5].setComponents(l+c,m+p,h+f,R+y).normalize();else if(e===Hs)s[5].setComponents(c,p,f,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(t){Mi.center.set(0,0,0);let e=Ef.distanceTo(t.center);return Mi.radius=.7071067811865476+e,Mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Yr.x=s.normal.x>0?t.max.x:t.min.x,Yr.y=s.normal.y>0?t.max.y:t.min.y,Yr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ho=class extends Wn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},uo=new H,fo=new H,nh=new ae,Ns=new Gn,Zr=new Hn,cl=new H,ih=new H,po=class extends Ie{constructor(t=new Sn,e=new ho){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)uo.fromBufferAttribute(e,s-1),fo.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=uo.distanceTo(fo);t.setAttribute("lineDistance",new Be(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,t.ray.intersectsSphere(Zr)===!1)return;nh.copy(s).invert(),Ns.copy(t.ray).applyMatrix4(nh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,d=n.index,p=n.attributes.position;if(d!==null){let m=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let _=m,f=g-1;_<f;_+=l){let h=d.getX(_),x=d.getX(_+1),M=Jr(this,t,Ns,c,h,x,_);M&&e.push(M)}if(this.isLineLoop){let _=d.getX(g-1),f=d.getX(m),h=Jr(this,t,Ns,c,_,f,g-1);h&&e.push(h)}}else{let m=Math.max(0,o.start),g=Math.min(p.count,o.start+o.count);for(let _=m,f=g-1;_<f;_+=l){let h=Jr(this,t,Ns,c,_,_+1,_);h&&e.push(h)}if(this.isLineLoop){let _=Jr(this,t,Ns,c,g-1,m,g-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Jr(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(uo.fromBufferAttribute(a,s),fo.fromBufferAttribute(a,r),e.distanceSqToSegment(uo,fo,cl,ih)>n)return;cl.applyMatrix4(i.matrixWorld);let l=t.ray.origin.distanceTo(cl);if(!(l<t.near||l>t.far))return{distance:l,point:ih.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}var sh=new H,rh=new H,Ks=class extends po{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)sh.fromBufferAttribute(e,s),rh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+sh.distanceTo(rh);t.setAttribute("lineDistance",new Be(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Qs=class extends en{constructor(t,e,n=li,s,r,o,a=ln,c=ln,l,d=is,u=1){if(d!==is&&d!==_s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let p={width:t,height:e,depth:u};super(p,s,r,o,a,c,d,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new os(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},js=class extends en{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}};function wf(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=su(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=Pf(i,t,r,e)),i.length>80*e){a=1/0,c=1/0;let d=-1/0,u=-1/0;for(let p=e;p<s;p+=e){let m=i[p],g=i[p+1];m<a&&(a=m),g<c&&(c=g),m>d&&(d=m),g>u&&(u=g)}l=Math.max(d-a,u-c),l=l!==0?32767/l:0}return tr(r,o,e,a,c,l,0),o}function su(i,t,e,n,s){let r;if(s===Vf(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=oh(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=oh(o/n|0,i[o],i[o+1],r);return r&&us(r,r.next)&&(nr(r),r=r.next),r}function Ti(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(us(e,e.next)||xe(e.prev,e,e.next)===0)){if(nr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function tr(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Ff(i,n,s,r);let a=i;for(;i.prev!==i.next;){let c=i.prev,l=i.next;if(r?Af(i,n,s,r):Tf(i)){t.push(c.i,i.i,l.i),nr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=Cf(Ti(i),t),tr(i,t,e,n,s,r,2)):o===2&&Rf(i,t,e,n,s,r):tr(Ti(i),t,e,n,s,r,1);break}}}function Tf(i){let t=i.prev,e=i,n=i.next;if(xe(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,d=Math.min(s,r,o),u=Math.min(a,c,l),p=Math.max(s,r,o),m=Math.max(a,c,l),g=n.next;for(;g!==t;){if(g.x>=d&&g.x<=p&&g.y>=u&&g.y<=m&&Os(s,a,r,c,o,l,g.x,g.y)&&xe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Af(i,t,e,n){let s=i.prev,r=i,o=i.next;if(xe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,d=s.y,u=r.y,p=o.y,m=Math.min(a,c,l),g=Math.min(d,u,p),_=Math.max(a,c,l),f=Math.max(d,u,p),h=gl(m,g,t,e,n),x=gl(_,f,t,e,n),M=i.prevZ,y=i.nextZ;for(;M&&M.z>=h&&y&&y.z<=x;){if(M.x>=m&&M.x<=_&&M.y>=g&&M.y<=f&&M!==s&&M!==o&&Os(a,d,c,u,l,p,M.x,M.y)&&xe(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=m&&y.x<=_&&y.y>=g&&y.y<=f&&y!==s&&y!==o&&Os(a,d,c,u,l,p,y.x,y.y)&&xe(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=h;){if(M.x>=m&&M.x<=_&&M.y>=g&&M.y<=f&&M!==s&&M!==o&&Os(a,d,c,u,l,p,M.x,M.y)&&xe(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=x;){if(y.x>=m&&y.x<=_&&y.y>=g&&y.y<=f&&y!==s&&y!==o&&Os(a,d,c,u,l,p,y.x,y.y)&&xe(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function Cf(i,t){let e=i;do{let n=e.prev,s=e.next.next;!us(n,s)&&ou(n,e,e.next,s)&&er(n,s)&&er(s,n)&&(t.push(n.i,e.i,s.i),nr(e),nr(e.next),e=i=s),e=e.next}while(e!==i);return Ti(e)}function Rf(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Bf(o,a)){let c=au(o,a);o=Ti(o,o.next),c=Ti(c,c.next),tr(o,t,e,n,s,r,0),tr(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Pf(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=su(i,a,c,n,!1);l===l.next&&(l.steiner=!0),s.push(Of(l))}s.sort(If);for(let r=0;r<s.length;r++)e=Lf(s[r],e);return e}function If(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function Lf(i,t){let e=Df(i,t);if(!e)return t;let n=au(e,i);return Ti(n,n.next),Ti(e,e.next)}function Df(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(us(i,e))return e;do{if(us(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let u=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=n&&u>r&&(r=u,o=e.x<e.next.x?e:e.next,u===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,c=o.x,l=o.y,d=1/0;e=o;do{if(n>=e.x&&e.x>=c&&n!==e.x&&ru(s<l?n:r,s,c,l,s<l?r:n,s,e.x,e.y)){let u=Math.abs(s-e.y)/(n-e.x);er(e,i)&&(u<d||u===d&&(e.x>o.x||e.x===o.x&&Uf(o,e)))&&(o=e,d=u)}e=e.next}while(e!==a);return o}function Uf(i,t){return xe(i.prev,i,t.prev)<0&&xe(t.next,i,i.next)<0}function Ff(i,t,e,n){let s=i;do s.z===0&&(s.z=gl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Nf(s)}function Nf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let l=0;l<e&&(a++,o=o.nextZ,!!o);l++);let c=e;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function gl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Of(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ru(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Os(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&ru(i,t,e,n,s,r,o,a)}function Bf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!zf(i,t)&&(er(i,t)&&er(t,i)&&kf(i,t)&&(xe(i.prev,i,t.prev)||xe(i,t.prev,t))||us(i,t)&&xe(i.prev,i,i.next)>0&&xe(t.prev,t,t.next)>0)}function xe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function us(i,t){return i.x===t.x&&i.y===t.y}function ou(i,t,e,n){let s=Kr(xe(i,t,e)),r=Kr(xe(i,t,n)),o=Kr(xe(e,n,i)),a=Kr(xe(e,n,t));return!!(s!==r&&o!==a||s===0&&$r(i,e,t)||r===0&&$r(i,n,t)||o===0&&$r(e,i,n)||a===0&&$r(e,t,n))}function $r(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Kr(i){return i>0?1:i<0?-1:0}function zf(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ou(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function er(i,t){return xe(i.prev,i,i.next)<0?xe(i,t,i.next)>=0&&xe(i,i.prev,t)>=0:xe(i,t,i.prev)<0||xe(i,i.next,t)<0}function kf(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function au(i,t){let e=_l(i.i,i.x,i.y),n=_l(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function oh(i,t,e,n){let s=_l(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function nr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function _l(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Vf(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var xl=class{static triangulate(t,e,n=2){return wf(t,e,n)}},ir=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];ah(t),lh(n,t);let o=t.length;e.forEach(ah);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,lh(n,e[c]);let a=xl.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function ah(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function lh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var sr=class i extends Sn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,d=c+1,u=t/a,p=e/c,m=[],g=[],_=[],f=[];for(let h=0;h<d;h++){let x=h*p-o;for(let M=0;M<l;M++){let y=M*u-r;g.push(y,-x,0),_.push(0,0,1),f.push(M/a),f.push(1-h/c)}}for(let h=0;h<c;h++)for(let x=0;x<a;x++){let M=x+l*h,y=x+l*(h+1),R=x+1+l*(h+1),C=x+1+l*h;m.push(M,y,C),m.push(y,R,C)}this.setIndex(m),this.setAttribute("position",new Be(g,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var rr=class i extends Sn{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,d=[],u=new H,p=new H,m=[],g=[],_=[],f=[];for(let h=0;h<=n;h++){let x=[],M=h/n,y=0;h===0&&o===0?y=.5/e:h===n&&c===Math.PI&&(y=-.5/e);for(let R=0;R<=e;R++){let C=R/e;u.x=-t*Math.cos(s+C*r)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(s+C*r)*Math.sin(o+M*a),g.push(u.x,u.y,u.z),p.copy(u).normalize(),_.push(p.x,p.y,p.z),f.push(C+y,1-M),x.push(l++)}d.push(x)}for(let h=0;h<n;h++)for(let x=0;x<e;x++){let M=d[h][x+1],y=d[h][x],R=d[h+1][x],C=d[h+1][x+1];(h!==0||o>0)&&m.push(M,y,C),(h!==n-1||c<Math.PI)&&m.push(y,R,C)}this.setIndex(m),this.setAttribute("position",new Be(g,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ds=class extends Wn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bl,this.normalScale=new Zt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var mo=class extends Wn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},go=class extends Wn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Qr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function Hf(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ai=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},_o=class extends Ai{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ul,endingEnd:ul}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case dl:r=t,a=2*e-n;break;case fl:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case dl:o=t,c=2*n-e;break;case fl:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}let l=(n-e)*.5,d=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*d,this._offsetNext=o*d}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,d=this._offsetPrev,u=this._offsetNext,p=this._weightPrev,m=this._weightNext,g=(n-e)/(s-e),_=g*g,f=_*g,h=-p*f+2*p*_-p*g,x=(1+p)*f+(-1.5-2*p)*_+(-.5+p)*g+1,M=(-1-m)*f+(1.5+m)*_+.5*g,y=m*f-m*_;for(let R=0;R!==a;++R)r[R]=h*o[d+R]+x*o[l+R]+M*o[c+R]+y*o[u+R];return r}},xo=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,d=(n-e)/(s-e),u=1-d;for(let p=0;p!==a;++p)r[p]=o[l+p]*u+o[c+p]*d;return r}},vo=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},sn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Qr(e,this.TimeBufferType),this.values=Qr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Qr(t.times,Array),values:Qr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new vo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new xo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new _o(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ks:e=this.InterpolantFactoryMethodDiscrete;break;case so:e=this.InterpolantFactoryMethodLinear;break;case jr:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ks;case this.InterpolantFactoryMethodLinear:return so;case this.InterpolantFactoryMethodSmooth:return jr}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&Hf(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===jr,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],d=t[a+1];if(l!==d&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*n,p=u-n,m=u+n;for(let g=0;g!==n;++g){let _=e[u+g];if(_!==e[p+g]||_!==e[m+g]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*n,p=o*n;for(let m=0;m!==n;++m)e[p+m]=e[u+m]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};sn.prototype.ValueTypeName="";sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=so;var ri=class extends sn{constructor(t,e,n){super(t,e,n)}};ri.prototype.ValueTypeName="bool";ri.prototype.ValueBufferType=Array;ri.prototype.DefaultInterpolation=ks;ri.prototype.InterpolantFactoryMethodLinear=void 0;ri.prototype.InterpolantFactoryMethodSmooth=void 0;var yo=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}};yo.prototype.ValueTypeName="color";var Mo=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}};Mo.prototype.ValueTypeName="number";var So=class extends Ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e),l=t*a;for(let d=l+a;l!==d;l+=4)Vn.slerpFlat(r,0,o,l-a,o,l,c);return r}},or=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new So(this.times,this.values,this.getValueSize(),t)}};or.prototype.ValueTypeName="quaternion";or.prototype.InterpolantFactoryMethodSmooth=void 0;var oi=class extends sn{constructor(t,e,n){super(t,e,n)}};oi.prototype.ValueTypeName="string";oi.prototype.ValueBufferType=Array;oi.prototype.DefaultInterpolation=ks;oi.prototype.InterpolantFactoryMethodLinear=void 0;oi.prototype.InterpolantFactoryMethodSmooth=void 0;var bo=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}};bo.prototype.ValueTypeName="vector";var Eo=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.abortController=new AbortController,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return c?c(d):d},this.setURLModifier=function(d){return c=d,this},this.addHandler=function(d,u){return l.push(d,u),this},this.removeHandler=function(d){let u=l.indexOf(d);return u!==-1&&l.splice(u,2),this},this.getHandler=function(d){for(let u=0,p=l.length;u<p;u+=2){let m=l[u],g=l[u+1];if(m.global&&(m.lastIndex=0),m.test(d))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},lu=new Eo,wo=class{constructor(t){this.manager=t!==void 0?t:lu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};wo.DEFAULT_MATERIAL_NAME="__DEFAULT";var ar=class extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var hl=new ae,ch=new H,hh=new H,vl=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Zt(512,512),this.mapType=vn,this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hs,this._frameExtents=new Zt(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;ch.setFromMatrixPosition(t.matrixWorld),e.position.copy(ch),hh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hh),e.updateMatrixWorld(),hl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(hl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Ci=class extends Zs{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=d*this.view.offsetY,c=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yl=class extends vl{constructor(){super(new Ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},lr=class extends ar{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new yl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},cr=class extends ar{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var To=class extends We{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}};var Wl="\\[\\]\\.:\\/",Gf=new RegExp("["+Wl+"]","g"),Xl="[^"+Wl+"]",Wf="[^"+Wl.replace("\\.","")+"]",Xf=/((?:WC+[\/:])*)/.source.replace("WC",Xl),qf=/(WCOD+)?/.source.replace("WCOD",Wf),Yf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xl),Zf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xl),Jf=new RegExp("^"+Xf+qf+Yf+Zf+"$"),$f=["material","materials","bones","map"],Ml=class{constructor(t,e,n){let s=n||ue.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ue=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Gf,"")}static parseTrackName(t){let e=Jf.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);$f.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let d=0;d<t.length;d++)if(t[d].name===l){l=d;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ue.Composite=Ml;ue.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ue.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ue.prototype.GetterByBindingType=[ue.prototype._getValue_direct,ue.prototype._getValue_array,ue.prototype._getValue_arrayElement,ue.prototype._getValue_toArray];ue.prototype.SetterByBindingTypeAndVersioning=[[ue.prototype._setValue_direct,ue.prototype._setValue_direct_setNeedsUpdate,ue.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_array,ue.prototype._setValue_array_setNeedsUpdate,ue.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_arrayElement,ue.prototype._setValue_arrayElement_setNeedsUpdate,ue.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ue.prototype._setValue_fromArray,ue.prototype._setValue_fromArray_setNeedsUpdate,ue.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ax=new Float32Array(1);var uh=new ae,hr=class{constructor(t,e,n=0,s=1/0){this.ray=new Gn(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new as,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return uh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uh),this}intersectObject(t,e=!0,n=[]){return Sl(t,this,n,e),n.sort(dh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Sl(t[s],this,n,e);return n.sort(dh),n}};function dh(i,t){return i.distance-t.distance}function Sl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Sl(r[o],t,e,!0)}}var fs=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Yt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Yt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};function ql(i,t,e,n){let s=Kf(n);switch(e){case Ul:return i*t;case Nl:return i*t/s.components*s.byteLength;case ko:return i*t/s.components*s.byteLength;case Ol:return i*t*2/s.components*s.byteLength;case Vo:return i*t*2/s.components*s.byteLength;case Fl:return i*t*3/s.components*s.byteLength;case cn:return i*t*4/s.components*s.byteLength;case Ho:return i*t*4/s.components*s.byteLength;case fr:case pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case mr:case gr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Wo:case qo:return Math.max(i,16)*Math.max(t,8)/4;case Go:case Xo:return Math.max(i,8)*Math.max(t,8)/2;case Yo:case Zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case $o:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ko:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case jo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ta:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ea:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case na:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ia:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case sa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ra:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case oa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case aa:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case la:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ca:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ha:case ua:case da:return Math.ceil(i/4)*Math.ceil(t/4)*16;case fa:case pa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ma:case ga:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Kf(i){switch(i){case vn:case Pl:return{byteLength:1,components:1};case ps:case Il:case ms:return{byteLength:2,components:1};case Bo:case zo:return{byteLength:2,components:4};case li:case Oo:case wn:return{byteLength:4,components:1};case Ll:case Dl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function Lu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function jf(i){let t=new WeakMap;function e(a,c){let l=a.array,d=a.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,d),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let d=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,d);else{u.sort((m,g)=>m.start-g.start);let p=0;for(let m=1;m<u.length;m++){let g=u[p],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++p,u[p]=_)}u.length=p+1;for(let m=0,g=u.length;m<g;m++){let _=u[m];i.bufferSubData(l,_.start*d.BYTES_PER_ELEMENT,d,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let d=t.get(a);(!d||d.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var tp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ep=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,np=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ip=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,op=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ap=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,cp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,up=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,fp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,pp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,yp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,bp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,wp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Tp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ip=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Lp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Up=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Gp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Wp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Kp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Qp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,jp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,em=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,im=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,om=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,am=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,um=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,fm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,gm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_m=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,xm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ym=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,wm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Tm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Am=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Cm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Rm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Im=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Lm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Nm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,km=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Vm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Xm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ym=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Zm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,jm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ng=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,og=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ag=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,lg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,cg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,pg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_g=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Mg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Eg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ig=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Lg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:tp,alphahash_pars_fragment:ep,alphamap_fragment:np,alphamap_pars_fragment:ip,alphatest_fragment:sp,alphatest_pars_fragment:rp,aomap_fragment:op,aomap_pars_fragment:ap,batching_pars_vertex:lp,batching_vertex:cp,begin_vertex:hp,beginnormal_vertex:up,bsdfs:dp,iridescence_fragment:fp,bumpmap_pars_fragment:pp,clipping_planes_fragment:mp,clipping_planes_pars_fragment:gp,clipping_planes_pars_vertex:_p,clipping_planes_vertex:xp,color_fragment:vp,color_pars_fragment:yp,color_pars_vertex:Mp,color_vertex:Sp,common:bp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:wp,displacementmap_pars_vertex:Tp,displacementmap_vertex:Ap,emissivemap_fragment:Cp,emissivemap_pars_fragment:Rp,colorspace_fragment:Pp,colorspace_pars_fragment:Ip,envmap_fragment:Lp,envmap_common_pars_fragment:Dp,envmap_pars_fragment:Up,envmap_pars_vertex:Fp,envmap_physical_pars_fragment:qp,envmap_vertex:Np,fog_vertex:Op,fog_pars_vertex:Bp,fog_fragment:zp,fog_pars_fragment:kp,gradientmap_pars_fragment:Vp,lightmap_pars_fragment:Hp,lights_lambert_fragment:Gp,lights_lambert_pars_fragment:Wp,lights_pars_begin:Xp,lights_toon_fragment:Yp,lights_toon_pars_fragment:Zp,lights_phong_fragment:Jp,lights_phong_pars_fragment:$p,lights_physical_fragment:Kp,lights_physical_pars_fragment:Qp,lights_fragment_begin:jp,lights_fragment_maps:tm,lights_fragment_end:em,logdepthbuf_fragment:nm,logdepthbuf_pars_fragment:im,logdepthbuf_pars_vertex:sm,logdepthbuf_vertex:rm,map_fragment:om,map_pars_fragment:am,map_particle_fragment:lm,map_particle_pars_fragment:cm,metalnessmap_fragment:hm,metalnessmap_pars_fragment:um,morphinstance_vertex:dm,morphcolor_vertex:fm,morphnormal_vertex:pm,morphtarget_pars_vertex:mm,morphtarget_vertex:gm,normal_fragment_begin:_m,normal_fragment_maps:xm,normal_pars_fragment:vm,normal_pars_vertex:ym,normal_vertex:Mm,normalmap_pars_fragment:Sm,clearcoat_normal_fragment_begin:bm,clearcoat_normal_fragment_maps:Em,clearcoat_pars_fragment:wm,iridescence_pars_fragment:Tm,opaque_fragment:Am,packing:Cm,premultiplied_alpha_fragment:Rm,project_vertex:Pm,dithering_fragment:Im,dithering_pars_fragment:Lm,roughnessmap_fragment:Dm,roughnessmap_pars_fragment:Um,shadowmap_pars_fragment:Fm,shadowmap_pars_vertex:Nm,shadowmap_vertex:Om,shadowmask_pars_fragment:Bm,skinbase_vertex:zm,skinning_pars_vertex:km,skinning_vertex:Vm,skinnormal_vertex:Hm,specularmap_fragment:Gm,specularmap_pars_fragment:Wm,tonemapping_fragment:Xm,tonemapping_pars_fragment:qm,transmission_fragment:Ym,transmission_pars_fragment:Zm,uv_pars_fragment:Jm,uv_pars_vertex:$m,uv_vertex:Km,worldpos_vertex:Qm,background_vert:jm,background_frag:tg,backgroundCube_vert:eg,backgroundCube_frag:ng,cube_vert:ig,cube_frag:sg,depth_vert:rg,depth_frag:og,distanceRGBA_vert:ag,distanceRGBA_frag:lg,equirect_vert:cg,equirect_frag:hg,linedashed_vert:ug,linedashed_frag:dg,meshbasic_vert:fg,meshbasic_frag:pg,meshlambert_vert:mg,meshlambert_frag:gg,meshmatcap_vert:_g,meshmatcap_frag:xg,meshnormal_vert:vg,meshnormal_frag:yg,meshphong_vert:Mg,meshphong_frag:Sg,meshphysical_vert:bg,meshphysical_frag:Eg,meshtoon_vert:wg,meshtoon_frag:Tg,points_vert:Ag,points_frag:Cg,shadow_vert:Rg,shadow_frag:Pg,sprite_vert:Ig,sprite_frag:Lg},xt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},Tn={basic:{uniforms:De([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:De([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:De([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:De([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:De([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:De([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:De([xt.points,xt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:De([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:De([xt.common,xt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:De([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:De([xt.sprite,xt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:De([xt.common,xt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:De([xt.lights,xt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Tn.physical={uniforms:De([Tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new Zt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};var _a={r:0,b:0,g:0},Li=new nn,Dg=new ae;function Ug(i,t,e,n,s,r,o){let a=new Kt(0),c=r===!0?0:1,l,d,u=null,p=0,m=null;function g(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?e:t).get(y)),y}function _(M){let y=!1,R=g(M);R===null?h(a,c):R&&R.isColor&&(h(R,1),y=!0);let C=i.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(M,y){let R=g(y);R&&(R.isCubeTexture||R.mapping===ur)?(d===void 0&&(d=new Le(new ls(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:Ii(Tn.backgroundCube.uniforms),vertexShader:Tn.backgroundCube.vertexShader,fragmentShader:Tn.backgroundCube.fragmentShader,side:ze,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(C,I,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),Li.copy(y.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),d.material.uniforms.envMap.value=R,d.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(Li)),d.material.toneMapped=te.getTransfer(R.colorSpace)!==re,(u!==R||p!==R.version||m!==i.toneMapping)&&(d.material.needsUpdate=!0,u=R,p=R.version,m=i.toneMapping),d.layers.enableAll(),M.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(l===void 0&&(l=new Le(new sr(2,2),new xn({name:"BackgroundMaterial",uniforms:Ii(Tn.background.uniforms),vertexShader:Tn.background.vertexShader,fragmentShader:Tn.background.fragmentShader,side:zn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=R,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=te.getTransfer(R.colorSpace)!==re,R.matrixAutoUpdate===!0&&R.updateMatrix(),l.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||p!==R.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=R,p=R.version,m=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function h(M,y){M.getRGB(_a,Gl(i)),n.buffers.color.setClear(_a.r,_a.g,_a.b,y,o)}function x(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),c=y,h(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(M){c=M,h(a,c)},render:_,addToRenderList:f,dispose:x}}function Fg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null),r=s,o=!1;function a(S,P,F,B,b){let T=!1,w=u(B,F,P);r!==w&&(r=w,l(r.object)),T=m(S,B,F,b),T&&g(S,B,F,b),b!==null&&t.update(b,i.ELEMENT_ARRAY_BUFFER),(T||o)&&(o=!1,y(S,P,F,B),b!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(b).buffer))}function c(){return i.createVertexArray()}function l(S){return i.bindVertexArray(S)}function d(S){return i.deleteVertexArray(S)}function u(S,P,F){let B=F.wireframe===!0,b=n[S.id];b===void 0&&(b={},n[S.id]=b);let T=b[P.id];T===void 0&&(T={},b[P.id]=T);let w=T[B];return w===void 0&&(w=p(c()),T[B]=w),w}function p(S){let P=[],F=[],B=[];for(let b=0;b<e;b++)P[b]=0,F[b]=0,B[b]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:F,attributeDivisors:B,object:S,attributes:{},index:null}}function m(S,P,F,B){let b=r.attributes,T=P.attributes,w=0,z=F.getAttributes();for(let N in z)if(z[N].location>=0){let O=b[N],Z=T[N];if(Z===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(Z=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(Z=S.instanceColor)),O===void 0||O.attribute!==Z||Z&&O.data!==Z.data)return!0;w++}return r.attributesNum!==w||r.index!==B}function g(S,P,F,B){let b={},T=P.attributes,w=0,z=F.getAttributes();for(let N in z)if(z[N].location>=0){let O=T[N];O===void 0&&(N==="instanceMatrix"&&S.instanceMatrix&&(O=S.instanceMatrix),N==="instanceColor"&&S.instanceColor&&(O=S.instanceColor));let Z={};Z.attribute=O,O&&O.data&&(Z.data=O.data),b[N]=Z,w++}r.attributes=b,r.attributesNum=w,r.index=B}function _(){let S=r.newAttributes;for(let P=0,F=S.length;P<F;P++)S[P]=0}function f(S){h(S,0)}function h(S,P){let F=r.newAttributes,B=r.enabledAttributes,b=r.attributeDivisors;F[S]=1,B[S]===0&&(i.enableVertexAttribArray(S),B[S]=1),b[S]!==P&&(i.vertexAttribDivisor(S,P),b[S]=P)}function x(){let S=r.newAttributes,P=r.enabledAttributes;for(let F=0,B=P.length;F<B;F++)P[F]!==S[F]&&(i.disableVertexAttribArray(F),P[F]=0)}function M(S,P,F,B,b,T,w){w===!0?i.vertexAttribIPointer(S,P,F,b,T):i.vertexAttribPointer(S,P,F,B,b,T)}function y(S,P,F,B){_();let b=B.attributes,T=F.getAttributes(),w=P.defaultAttributeValues;for(let z in T){let N=T[z];if(N.location>=0){let V=b[z];if(V===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(V=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(V=S.instanceColor)),V!==void 0){let O=V.normalized,Z=V.itemSize,rt=t.get(V);if(rt===void 0)continue;let Q=rt.buffer,et=rt.type,nt=rt.bytesPerElement,q=et===i.INT||et===i.UNSIGNED_INT||V.gpuType===Oo;if(V.isInterleavedBufferAttribute){let X=V.data,ot=X.stride,ft=V.offset;if(X.isInstancedInterleavedBuffer){for(let lt=0;lt<N.locationSize;lt++)h(N.location+lt,X.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let lt=0;lt<N.locationSize;lt++)f(N.location+lt);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let lt=0;lt<N.locationSize;lt++)M(N.location+lt,Z/N.locationSize,et,O,ot*nt,(ft+Z/N.locationSize*lt)*nt,q)}else{if(V.isInstancedBufferAttribute){for(let X=0;X<N.locationSize;X++)h(N.location+X,V.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let X=0;X<N.locationSize;X++)f(N.location+X);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let X=0;X<N.locationSize;X++)M(N.location+X,Z/N.locationSize,et,O,Z*nt,Z/N.locationSize*X*nt,q)}}else if(w!==void 0){let O=w[z];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(N.location,O);break;case 3:i.vertexAttrib3fv(N.location,O);break;case 4:i.vertexAttrib4fv(N.location,O);break;default:i.vertexAttrib1fv(N.location,O)}}}}x()}function R(){L();for(let S in n){let P=n[S];for(let F in P){let B=P[F];for(let b in B)d(B[b].object),delete B[b];delete P[F]}delete n[S]}}function C(S){if(n[S.id]===void 0)return;let P=n[S.id];for(let F in P){let B=P[F];for(let b in B)d(B[b].object),delete B[b];delete P[F]}delete n[S.id]}function I(S){for(let P in n){let F=n[P];if(F[S.id]===void 0)continue;let B=F[S.id];for(let b in B)d(B[b].object),delete B[b];delete F[S.id]}}function L(){v(),o=!0,r!==s&&(r=s,l(r.object))}function v(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:v,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:I,initAttributes:_,enableAttribute:f,disableUnusedAttributes:x}}function Ng(i,t,e){let n;function s(l){n=l}function r(l,d){i.drawArrays(n,l,d),e.update(d,n,1)}function o(l,d,u){u!==0&&(i.drawArraysInstanced(n,l,d,u),e.update(d,n,u))}function a(l,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,d,0,u);let m=0;for(let g=0;g<u;g++)m+=d[g];e.update(m,n,1)}function c(l,d,u,p){if(u===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)o(l[g],d[g],p[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,d,0,p,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_]*p[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Og(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let I=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==cn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){let L=I===ms&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==vn&&n.convert(I)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==wn&&!L)}function c(I){if(I==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",d=c(l);d!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",d,"instead."),l=d);let u=e.logarithmicDepthBuffer===!0,p=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:f,maxAttributes:h,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:y,vertexTextures:R,maxSamples:C}}function Bg(i){let t=this,e=null,n=0,s=!1,r=!1,o=new mn,a=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){let m=u.length!==0||p||n!==0||s;return s=p,n=u.length,m},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){e=d(u,p,0)},this.setState=function(u,p,m){let g=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,h=i.get(u);if(!s||g===null||g.length===0||r&&!f)r?d(null):l();else{let x=r?0:n,M=x*4,y=h.clippingState||null;c.value=y,y=d(g,p,M,m);for(let R=0;R!==M;++R)y[R]=e[R];h.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function d(u,p,m,g){let _=u!==null?u.length:0,f=null;if(_!==0){if(f=c.value,g!==!0||f===null){let h=m+_*4,x=p.matrixWorldInverse;a.getNormalMatrix(x),(f===null||f.length<h)&&(f=new Float32Array(h));for(let M=0,y=m;M!==_;++M,y+=4)o.copy(u[M]).applyMatrix4(x,a),o.normal.toArray(f,y),f[y+3]=o.constant}c.value=f,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,f}}function zg(i){let t=new WeakMap;function e(o,a){return a===Uo?o.mapping=Ri:a===Fo&&(o.mapping=Pi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Uo||a===Fo)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new co(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var ys=4,cu=[.125,.215,.35,.446,.526,.582],Fi=20,Yl=new Ci,hu=new Kt,Zl=null,Jl=0,$l=0,Kl=!1,Ui=(1+Math.sqrt(5))/2,vs=1/Ui,uu=[new H(-Ui,vs,0),new H(Ui,vs,0),new H(-vs,0,Ui),new H(vs,0,Ui),new H(0,Ui,-vs),new H(0,Ui,vs),new H(-1,1,-1),new H(1,1,-1),new H(-1,1,1),new H(1,1,1)],kg=new H,ya=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=kg}=r;Zl=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),$l=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=pu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Zl,Jl,$l),this._renderer.xr.enabled=Kl,t.scissorTest=!1,xa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ri||t.mapping===Pi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Zl=this._renderer.getRenderTarget(),Jl=this._renderer.getActiveCubeFace(),$l=this._renderer.getActiveMipmapLevel(),Kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:ms,format:cn,colorSpace:wi,depthBuffer:!1},s=du(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=du(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Vg(r)),this._blurMaterial=Hg(r,t,e)}return s}_compileMaterial(t){let e=new Le(this._lodPlanes[0],t);this._renderer.compile(e,Yl)}_sceneToCubeUV(t,e,n,s,r){let c=new We(90,1,e,n),l=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,m=u.toneMapping;u.getClearColor(hu),u.toneMapping=qn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));let _=new Xs({name:"PMREM.Background",side:ze,depthWrite:!1,depthTest:!1}),f=new Le(new ls,_),h=!1,x=t.background;x?x.isColor&&(_.color.copy(x),t.background=null,h=!0):(_.color.copy(hu),h=!0);for(let M=0;M<6;M++){let y=M%3;y===0?(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+d[M],r.y,r.z)):y===1?(c.up.set(0,0,l[M]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+d[M],r.z)):(c.up.set(0,l[M],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+d[M]));let R=this._cubeSize;xa(s,y*R,M>2?R:0,R,R),u.setRenderTarget(s),h&&u.render(f,c),u.render(t,c)}f.geometry.dispose(),f.material.dispose(),u.toneMapping=m,u.autoClear=p,t.background=x}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Ri||t.mapping===Pi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=pu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fu());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Le(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;xa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Yl)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=uu[(s-r-1)%uu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let d=3,u=new Le(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Fi-1),_=r/g,f=isFinite(r)?1+Math.floor(d*_):Fi;f>Fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Fi}`);let h=[],x=0;for(let I=0;I<Fi;++I){let L=I/_,v=Math.exp(-L*L/2);h.push(v),I===0?x+=v:I<f&&(x+=2*v)}for(let I=0;I<h.length;I++)h[I]=h[I]/x;p.envMap.value=t.texture,p.samples.value=f,p.weights.value=h,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);let{_lodMax:M}=this;p.dTheta.value=g,p.mipInt.value=M-n;let y=this._sizeLods[s],R=3*y*(s>M-ys?s-M+ys:0),C=4*(this._cubeSize-y);xa(e,R,C,3*y,2*y),c.setRenderTarget(e),c.render(u,Yl)}};function Vg(i){let t=[],e=[],n=[],s=i,r=i-ys+1+cu.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ys?c=cu[o-i+ys-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),d=-l,u=1+l,p=[d,d,u,d,u,u,d,d,u,u,d,u],m=6,g=6,_=3,f=2,h=1,x=new Float32Array(_*g*m),M=new Float32Array(f*g*m),y=new Float32Array(h*g*m);for(let C=0;C<m;C++){let I=C%3*2/3-1,L=C>2?0:-1,v=[I,L,0,I+2/3,L,0,I+2/3,L+1,0,I,L,0,I+2/3,L+1,0,I,L+1,0];x.set(v,_*g*C),M.set(p,f*g*C);let S=[C,C,C,C,C,C];y.set(S,h*g*C)}let R=new Sn;R.setAttribute("position",new Ae(x,_)),R.setAttribute("uv",new Ae(M,f)),R.setAttribute("faceIndex",new Ae(y,h)),t.push(R),s>ys&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function du(i,t,e){let n=new Mn(i,t,e);return n.texture.mapping=ur,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Hg(i,t,e){let n=new Float32Array(Fi),s=new H(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function fu(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function pu(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function ac(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Gg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Uo||c===Fo,d=c===Ri||c===Pi;if(l||d){let u=t.get(a),p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new ya(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{let m=a.image;return l&&m&&m.height>0||d&&m&&s(m)?(e===null&&(e=new ya(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0,l=6;for(let d=0;d<l;d++)a[d]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Wg(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&rs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Xg(i,t,e,n){let s={},r=new WeakMap;function o(u){let p=u.target;p.index!==null&&t.remove(p.index);for(let g in p.attributes)t.remove(p.attributes[g]);p.removeEventListener("dispose",o),delete s[p.id];let m=r.get(p);m&&(t.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function c(u){let p=u.attributes;for(let m in p)t.update(p[m],i.ARRAY_BUFFER)}function l(u){let p=[],m=u.index,g=u.attributes.position,_=0;if(m!==null){let x=m.array;_=m.version;for(let M=0,y=x.length;M<y;M+=3){let R=x[M+0],C=x[M+1],I=x[M+2];p.push(R,C,C,I,I,R)}}else if(g!==void 0){let x=g.array;_=g.version;for(let M=0,y=x.length/3-1;M<y;M+=3){let R=M+0,C=M+1,I=M+2;p.push(R,C,C,I,I,R)}}else return;let f=new(Hl(p)?Ys:qs)(p,1);f.version=_;let h=r.get(u);h&&t.remove(h),r.set(u,f)}function d(u){let p=r.get(u);if(p){let m=u.index;m!==null&&p.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:d}}function qg(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,m){i.drawElements(n,m,r,p*o),e.update(m,n,1)}function l(p,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,p*o,g),e.update(m,n,g))}function d(p,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,g);let f=0;for(let h=0;h<g;h++)f+=m[h];e.update(f,n,1)}function u(p,m,g,_){if(g===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let h=0;h<p.length;h++)l(p[h]/o,m[h],_[h]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,_,0,g);let h=0;for(let x=0;x<g;x++)h+=m[x]*_[x];e.update(h,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=d,this.renderMultiDrawInstances=u}function Yg(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Zg(i,t,e){let n=new WeakMap,s=new ve;function r(o,a,c){let l=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=d!==void 0?d.length:0,p=n.get(a);if(p===void 0||p.count!==u){let v=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",v)};p!==void 0&&p.texture.dispose();let m=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],x=a.morphAttributes.color||[],M=0;m===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let y=a.attributes.position.count*M,R=1;y>t.maxTextureSize&&(R=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let C=new Float32Array(y*R*4*u),I=new Ws(C,y,R,u);I.type=wn,I.needsUpdate=!0;let L=M*4;for(let S=0;S<u;S++){let P=f[S],F=h[S],B=x[S],b=y*R*4*S;for(let T=0;T<P.count;T++){let w=T*L;m===!0&&(s.fromBufferAttribute(P,T),C[b+w+0]=s.x,C[b+w+1]=s.y,C[b+w+2]=s.z,C[b+w+3]=0),g===!0&&(s.fromBufferAttribute(F,T),C[b+w+4]=s.x,C[b+w+5]=s.y,C[b+w+6]=s.z,C[b+w+7]=0),_===!0&&(s.fromBufferAttribute(B,T),C[b+w+8]=s.x,C[b+w+9]=s.y,C[b+w+10]=s.z,C[b+w+11]=B.itemSize===4?s.w:1)}}p={count:u,texture:I,size:new Zt(y,R)},n.set(a,p),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let m=0;for(let _=0;_<l.length;_++)m+=l[_];let g=a.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function Jg(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,d=c.geometry,u=t.get(c,d);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Du=new en,mu=new Qs(1,1),Uu=new Ws,Fu=new ao,Nu=new Js,gu=[],_u=[],xu=new Float32Array(16),vu=new Float32Array(9),yu=new Float32Array(4);function Ss(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=gu[s];if(r===void 0&&(r=new Float32Array(s),gu[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Sa(i,t){let e=_u[t];e===void 0&&(e=new Int32Array(t),_u[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function $g(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Kg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Qg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function jg(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function t0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;yu.set(n),i.uniformMatrix2fv(this.addr,!1,yu),Ee(e,n)}}function e0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;vu.set(n),i.uniformMatrix3fv(this.addr,!1,vu),Ee(e,n)}}function n0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;xu.set(n),i.uniformMatrix4fv(this.addr,!1,xu),Ee(e,n)}}function i0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function s0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function r0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function o0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function a0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function l0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function c0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function h0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function u0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(mu.compareFunction=zl,r=mu):r=Du,e.setTexture2D(t||r,s)}function d0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Fu,s)}function f0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Nu,s)}function p0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Uu,s)}function m0(i){switch(i){case 5126:return $g;case 35664:return Kg;case 35665:return Qg;case 35666:return jg;case 35674:return t0;case 35675:return e0;case 35676:return n0;case 5124:case 35670:return i0;case 35667:case 35671:return s0;case 35668:case 35672:return r0;case 35669:case 35673:return o0;case 5125:return a0;case 36294:return l0;case 36295:return c0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return d0;case 35680:case 36300:case 36308:case 36293:return f0;case 36289:case 36303:case 36311:case 36292:return p0}}function g0(i,t){i.uniform1fv(this.addr,t)}function _0(i,t){let e=Ss(t,this.size,2);i.uniform2fv(this.addr,e)}function x0(i,t){let e=Ss(t,this.size,3);i.uniform3fv(this.addr,e)}function v0(i,t){let e=Ss(t,this.size,4);i.uniform4fv(this.addr,e)}function y0(i,t){let e=Ss(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function M0(i,t){let e=Ss(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function S0(i,t){let e=Ss(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function b0(i,t){i.uniform1iv(this.addr,t)}function E0(i,t){i.uniform2iv(this.addr,t)}function w0(i,t){i.uniform3iv(this.addr,t)}function T0(i,t){i.uniform4iv(this.addr,t)}function A0(i,t){i.uniform1uiv(this.addr,t)}function C0(i,t){i.uniform2uiv(this.addr,t)}function R0(i,t){i.uniform3uiv(this.addr,t)}function P0(i,t){i.uniform4uiv(this.addr,t)}function I0(i,t,e){let n=this.cache,s=t.length,r=Sa(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Du,r[o])}function L0(i,t,e){let n=this.cache,s=t.length,r=Sa(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Fu,r[o])}function D0(i,t,e){let n=this.cache,s=t.length,r=Sa(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Nu,r[o])}function U0(i,t,e){let n=this.cache,s=t.length,r=Sa(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Uu,r[o])}function F0(i){switch(i){case 5126:return g0;case 35664:return _0;case 35665:return x0;case 35666:return v0;case 35674:return y0;case 35675:return M0;case 35676:return S0;case 5124:case 35670:return b0;case 35667:case 35671:return E0;case 35668:case 35672:return w0;case 35669:case 35673:return T0;case 5125:return A0;case 36294:return C0;case 36295:return R0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return U0}}var jl=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=m0(e.type)}},tc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=F0(e.type)}},ec=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Ql=/(\w+)(\])?(\[|\.)?/g;function Mu(i,t){i.seq.push(t),i.map[t.id]=t}function N0(i,t,e){let n=i.name,s=n.length;for(Ql.lastIndex=0;;){let r=Ql.exec(n),o=Ql.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Mu(e,l===void 0?new jl(a,i,t):new tc(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new ec(a),Mu(e,u)),e=u}}}var Ms=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);N0(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function Su(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var O0=37297,B0=0;function z0(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var bu=new Gt;function k0(i){te._getMatrix(bu,te.workingColorSpace,i);let t=`mat3( ${bu.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Vs:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Eu(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+z0(i.getShaderSource(t),a)}else return r}function V0(i,t){let e=k0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function H0(i,t){let e;switch(t){case Nh:e="Linear";break;case Oh:e="Reinhard";break;case Bh:e="Cineon";break;case zh:e="ACESFilmic";break;case Vh:e="AgX";break;case Hh:e="Neutral";break;case kh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var va=new H;function G0(){te.getLuminanceCoefficients(va);let i=va.x.toFixed(4),t=va.y.toFixed(4),e=va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(_r).join(`
`)}function X0(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function q0(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function _r(i){return i!==""}function wu(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tu(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function nc(i){return i.replace(Y0,J0)}var Z0=new Map;function J0(i,t){let e=qt[t];if(e===void 0){let n=Z0.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return nc(e)}var $0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Au(i){return i.replace($0,K0)}function K0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cu(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Q0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===El?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===mh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===bn&&(t="SHADOWMAP_TYPE_VSM"),t}function j0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ri:case Pi:t="ENVMAP_TYPE_CUBE";break;case ur:t="ENVMAP_TYPE_CUBE_UV";break}return t}function t_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Pi:t="ENVMAP_MODE_REFRACTION";break}return t}function e_(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Cl:t="ENVMAP_BLENDING_MULTIPLY";break;case Uh:t="ENVMAP_BLENDING_MIX";break;case Fh:t="ENVMAP_BLENDING_ADD";break}return t}function n_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function i_(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Q0(e),l=j0(e),d=t_(e),u=e_(e),p=n_(e),m=W0(e),g=X0(r),_=s.createProgram(),f,h,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_r).join(`
`),f.length>0&&(f+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(_r).join(`
`),h.length>0&&(h+=`
`)):(f=[Cu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(_r).join(`
`),h=[Cu(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+d:"",e.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?qt.tonemapping_pars_fragment:"",e.toneMapping!==qn?H0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,V0("linearToOutputTexel",e.outputColorSpace),G0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(_r).join(`
`)),o=nc(o),o=wu(o,e),o=Tu(o,e),a=nc(a),a=wu(a,e),a=Tu(a,e),o=Au(o),a=Au(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,h=["#define varying in",e.glslVersion===kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let M=x+f+o,y=x+h+a,R=Su(s,s.VERTEX_SHADER,M),C=Su(s,s.FRAGMENT_SHADER,y);s.attachShader(_,R),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function I(P){if(i.debug.checkShaderErrors){let F=s.getProgramInfoLog(_)||"",B=s.getShaderInfoLog(R)||"",b=s.getShaderInfoLog(C)||"",T=F.trim(),w=B.trim(),z=b.trim(),N=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(N=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,C);else{let O=Eu(s,R,"vertex"),Z=Eu(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+T+`
`+O+`
`+Z)}else T!==""?console.warn("THREE.WebGLProgram: Program Info Log:",T):(w===""||z==="")&&(V=!1);V&&(P.diagnostics={runnable:N,programLog:T,vertexShader:{log:w,prefix:f},fragmentShader:{log:z,prefix:h}})}s.deleteShader(R),s.deleteShader(C),L=new Ms(s,_),v=q0(s,_)}let L;this.getUniforms=function(){return L===void 0&&I(this),L};let v;this.getAttributes=function(){return v===void 0&&I(this),v};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(_,O0)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=B0++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=C,this}var s_=0,ic=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new sc(t),e.set(t,n)),n}},sc=class{constructor(t){this.id=s_++,this.code=t,this.usedTimes=0}};function r_(i,t,e,n,s,r,o){let a=new as,c=new ic,l=new Set,d=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures,m=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return l.add(v),v===0?"uv":`uv${v}`}function f(v,S,P,F,B){let b=F.fog,T=B.geometry,w=v.isMeshStandardMaterial?F.environment:null,z=(v.isMeshStandardMaterial?e:t).get(v.envMap||w),N=z&&z.mapping===ur?z.image.height:null,V=g[v.type];v.precision!==null&&(m=s.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));let O=T.morphAttributes.position||T.morphAttributes.normal||T.morphAttributes.color,Z=O!==void 0?O.length:0,rt=0;T.morphAttributes.position!==void 0&&(rt=1),T.morphAttributes.normal!==void 0&&(rt=2),T.morphAttributes.color!==void 0&&(rt=3);let Q,et,nt,q;if(V){let ne=Tn[V];Q=ne.vertexShader,et=ne.fragmentShader}else Q=v.vertexShader,et=v.fragmentShader,c.update(v),nt=c.getVertexShaderID(v),q=c.getFragmentShaderID(v);let X=i.getRenderTarget(),ot=i.state.buffers.depth.getReversed(),ft=B.isInstancedMesh===!0,lt=B.isBatchedMesh===!0,Mt=!!v.map,Dt=!!v.matcap,U=!!z,Jt=!!v.aoMap,Bt=!!v.lightMap,Et=!!v.bumpMap,gt=!!v.normalMap,de=!!v.displacementMap,Rt=!!v.emissiveMap,Xt=!!v.metalnessMap,we=!!v.roughnessMap,Me=v.anisotropy>0,D=v.clearcoat>0,E=v.dispersion>0,Y=v.iridescence>0,j=v.sheen>0,at=v.transmission>0,K=Me&&!!v.anisotropyMap,Ut=D&&!!v.clearcoatMap,pt=D&&!!v.clearcoatNormalMap,Pt=D&&!!v.clearcoatRoughnessMap,It=Y&&!!v.iridescenceMap,ut=Y&&!!v.iridescenceThicknessMap,St=j&&!!v.sheenColorMap,kt=j&&!!v.sheenRoughnessMap,Lt=!!v.specularMap,vt=!!v.specularColorMap,Wt=!!v.specularIntensityMap,k=at&&!!v.transmissionMap,dt=at&&!!v.thicknessMap,mt=!!v.gradientMap,Tt=!!v.alphaMap,ct=v.alphaTest>0,tt=!!v.alphaHash,Ct=!!v.extensions,Ht=qn;v.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Ht=i.toneMapping);let ce={shaderID:V,shaderType:v.type,shaderName:v.name,vertexShader:Q,fragmentShader:et,defines:v.defines,customVertexShaderID:nt,customFragmentShaderID:q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:lt,batchingColor:lt&&B._colorsTexture!==null,instancing:ft,instancingColor:ft&&B.instanceColor!==null,instancingMorph:ft&&B.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:X===null?i.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:wi,alphaToCoverage:!!v.alphaToCoverage,map:Mt,matcap:Dt,envMap:U,envMapMode:U&&z.mapping,envMapCubeUVHeight:N,aoMap:Jt,lightMap:Bt,bumpMap:Et,normalMap:gt,displacementMap:p&&de,emissiveMap:Rt,normalMapObjectSpace:gt&&v.normalMapType===qh,normalMapTangentSpace:gt&&v.normalMapType===Bl,metalnessMap:Xt,roughnessMap:we,anisotropy:Me,anisotropyMap:K,clearcoat:D,clearcoatMap:Ut,clearcoatNormalMap:pt,clearcoatRoughnessMap:Pt,dispersion:E,iridescence:Y,iridescenceMap:It,iridescenceThicknessMap:ut,sheen:j,sheenColorMap:St,sheenRoughnessMap:kt,specularMap:Lt,specularColorMap:vt,specularIntensityMap:Wt,transmission:at,transmissionMap:k,thicknessMap:dt,gradientMap:mt,opaque:v.transparent===!1&&v.blending===bi&&v.alphaToCoverage===!1,alphaMap:Tt,alphaTest:ct,alphaHash:tt,combine:v.combine,mapUv:Mt&&_(v.map.channel),aoMapUv:Jt&&_(v.aoMap.channel),lightMapUv:Bt&&_(v.lightMap.channel),bumpMapUv:Et&&_(v.bumpMap.channel),normalMapUv:gt&&_(v.normalMap.channel),displacementMapUv:de&&_(v.displacementMap.channel),emissiveMapUv:Rt&&_(v.emissiveMap.channel),metalnessMapUv:Xt&&_(v.metalnessMap.channel),roughnessMapUv:we&&_(v.roughnessMap.channel),anisotropyMapUv:K&&_(v.anisotropyMap.channel),clearcoatMapUv:Ut&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:pt&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ut&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:St&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:kt&&_(v.sheenRoughnessMap.channel),specularMapUv:Lt&&_(v.specularMap.channel),specularColorMapUv:vt&&_(v.specularColorMap.channel),specularIntensityMapUv:Wt&&_(v.specularIntensityMap.channel),transmissionMapUv:k&&_(v.transmissionMap.channel),thicknessMapUv:dt&&_(v.thicknessMap.channel),alphaMapUv:Tt&&_(v.alphaMap.channel),vertexTangents:!!T.attributes.tangent&&(gt||Me),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!T.attributes.color&&T.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!T.attributes.uv&&(Mt||Tt),fog:!!b,useFog:v.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:v.flatShading===!0&&v.wireframe===!1,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ot,skinning:B.isSkinnedMesh===!0,morphTargets:T.morphAttributes.position!==void 0,morphNormals:T.morphAttributes.normal!==void 0,morphColors:T.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:rt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ht,decodeVideoTexture:Mt&&v.map.isVideoTexture===!0&&te.getTransfer(v.map.colorSpace)===re,decodeVideoTextureEmissive:Rt&&v.emissiveMap.isVideoTexture===!0&&te.getTransfer(v.emissiveMap.colorSpace)===re,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===En,flipSided:v.side===ze,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ct&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&v.extensions.multiDraw===!0||lt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ce.vertexUv1s=l.has(1),ce.vertexUv2s=l.has(2),ce.vertexUv3s=l.has(3),l.clear(),ce}function h(v){let S=[];if(v.shaderID?S.push(v.shaderID):(S.push(v.customVertexShaderID),S.push(v.customFragmentShaderID)),v.defines!==void 0)for(let P in v.defines)S.push(P),S.push(v.defines[P]);return v.isRawShaderMaterial===!1&&(x(S,v),M(S,v),S.push(i.outputColorSpace)),S.push(v.customProgramCacheKey),S.join()}function x(v,S){v.push(S.precision),v.push(S.outputColorSpace),v.push(S.envMapMode),v.push(S.envMapCubeUVHeight),v.push(S.mapUv),v.push(S.alphaMapUv),v.push(S.lightMapUv),v.push(S.aoMapUv),v.push(S.bumpMapUv),v.push(S.normalMapUv),v.push(S.displacementMapUv),v.push(S.emissiveMapUv),v.push(S.metalnessMapUv),v.push(S.roughnessMapUv),v.push(S.anisotropyMapUv),v.push(S.clearcoatMapUv),v.push(S.clearcoatNormalMapUv),v.push(S.clearcoatRoughnessMapUv),v.push(S.iridescenceMapUv),v.push(S.iridescenceThicknessMapUv),v.push(S.sheenColorMapUv),v.push(S.sheenRoughnessMapUv),v.push(S.specularMapUv),v.push(S.specularColorMapUv),v.push(S.specularIntensityMapUv),v.push(S.transmissionMapUv),v.push(S.thicknessMapUv),v.push(S.combine),v.push(S.fogExp2),v.push(S.sizeAttenuation),v.push(S.morphTargetsCount),v.push(S.morphAttributeCount),v.push(S.numDirLights),v.push(S.numPointLights),v.push(S.numSpotLights),v.push(S.numSpotLightMaps),v.push(S.numHemiLights),v.push(S.numRectAreaLights),v.push(S.numDirLightShadows),v.push(S.numPointLightShadows),v.push(S.numSpotLightShadows),v.push(S.numSpotLightShadowsWithMaps),v.push(S.numLightProbes),v.push(S.shadowMapType),v.push(S.toneMapping),v.push(S.numClippingPlanes),v.push(S.numClipIntersection),v.push(S.depthPacking)}function M(v,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),v.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),v.push(a.mask)}function y(v){let S=g[v.type],P;if(S){let F=Tn[S];P=iu.clone(F.uniforms)}else P=v.uniforms;return P}function R(v,S){let P;for(let F=0,B=d.length;F<B;F++){let b=d[F];if(b.cacheKey===S){P=b,++P.usedTimes;break}}return P===void 0&&(P=new i_(i,S,v,r),d.push(P)),P}function C(v){if(--v.usedTimes===0){let S=d.indexOf(v);d[S]=d[d.length-1],d.pop(),v.destroy()}}function I(v){c.remove(v)}function L(){c.dispose()}return{getParameters:f,getProgramCacheKey:h,getUniforms:y,acquireProgram:R,releaseProgram:C,releaseShaderCache:I,programs:d,dispose:L}}function o_(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function a_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Ru(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Pu(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,p,m,g,_,f){let h=i[t];return h===void 0?(h={id:u.id,object:u,geometry:p,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:f},i[t]=h):(h.id=u.id,h.object=u,h.geometry=p,h.material=m,h.groupOrder=g,h.renderOrder=u.renderOrder,h.z=_,h.group=f),t++,h}function a(u,p,m,g,_,f){let h=o(u,p,m,g,_,f);m.transmission>0?n.push(h):m.transparent===!0?s.push(h):e.push(h)}function c(u,p,m,g,_,f){let h=o(u,p,m,g,_,f);m.transmission>0?n.unshift(h):m.transparent===!0?s.unshift(h):e.unshift(h)}function l(u,p){e.length>1&&e.sort(u||a_),n.length>1&&n.sort(p||Ru),s.length>1&&s.sort(p||Ru)}function d(){for(let u=t,p=i.length;u<p;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:d,sort:l}}function l_(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Pu,i.set(n,[o])):s>=r.length?(o=new Pu,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function c_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new Kt};break;case"SpotLight":e={position:new H,direction:new H,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[t.id]=e,e}}}function h_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var u_=0;function d_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function f_(i){let t=new c_,e=h_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new H);let s=new H,r=new ae,o=new ae;function a(l){let d=0,u=0,p=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let m=0,g=0,_=0,f=0,h=0,x=0,M=0,y=0,R=0,C=0,I=0;l.sort(d_);for(let v=0,S=l.length;v<S;v++){let P=l[v],F=P.color,B=P.intensity,b=P.distance,T=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=F.r*B,u+=F.g*B,p+=F.b*B;else if(P.isLightProbe){for(let w=0;w<9;w++)n.probe[w].addScaledVector(P.sh.coefficients[w],B);I++}else if(P.isDirectionalLight){let w=t.get(P);if(w.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let z=P.shadow,N=e.get(P);N.shadowIntensity=z.intensity,N.shadowBias=z.bias,N.shadowNormalBias=z.normalBias,N.shadowRadius=z.radius,N.shadowMapSize=z.mapSize,n.directionalShadow[m]=N,n.directionalShadowMap[m]=T,n.directionalShadowMatrix[m]=P.shadow.matrix,x++}n.directional[m]=w,m++}else if(P.isSpotLight){let w=t.get(P);w.position.setFromMatrixPosition(P.matrixWorld),w.color.copy(F).multiplyScalar(B),w.distance=b,w.coneCos=Math.cos(P.angle),w.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),w.decay=P.decay,n.spot[_]=w;let z=P.shadow;if(P.map&&(n.spotLightMap[R]=P.map,R++,z.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[_]=z.matrix,P.castShadow){let N=e.get(P);N.shadowIntensity=z.intensity,N.shadowBias=z.bias,N.shadowNormalBias=z.normalBias,N.shadowRadius=z.radius,N.shadowMapSize=z.mapSize,n.spotShadow[_]=N,n.spotShadowMap[_]=T,y++}_++}else if(P.isRectAreaLight){let w=t.get(P);w.color.copy(F).multiplyScalar(B),w.halfWidth.set(P.width*.5,0,0),w.halfHeight.set(0,P.height*.5,0),n.rectArea[f]=w,f++}else if(P.isPointLight){let w=t.get(P);if(w.color.copy(P.color).multiplyScalar(P.intensity),w.distance=P.distance,w.decay=P.decay,P.castShadow){let z=P.shadow,N=e.get(P);N.shadowIntensity=z.intensity,N.shadowBias=z.bias,N.shadowNormalBias=z.normalBias,N.shadowRadius=z.radius,N.shadowMapSize=z.mapSize,N.shadowCameraNear=z.camera.near,N.shadowCameraFar=z.camera.far,n.pointShadow[g]=N,n.pointShadowMap[g]=T,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=w,g++}else if(P.isHemisphereLight){let w=t.get(P);w.skyColor.copy(P.color).multiplyScalar(B),w.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[h]=w,h++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xt.LTC_FLOAT_1,n.rectAreaLTC2=xt.LTC_FLOAT_2):(n.rectAreaLTC1=xt.LTC_HALF_1,n.rectAreaLTC2=xt.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=p;let L=n.hash;(L.directionalLength!==m||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==f||L.hemiLength!==h||L.numDirectionalShadows!==x||L.numPointShadows!==M||L.numSpotShadows!==y||L.numSpotMaps!==R||L.numLightProbes!==I)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=f,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=y+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=I,L.directionalLength=m,L.pointLength=g,L.spotLength=_,L.rectAreaLength=f,L.hemiLength=h,L.numDirectionalShadows=x,L.numPointShadows=M,L.numSpotShadows=y,L.numSpotMaps=R,L.numLightProbes=I,n.version=u_++)}function c(l,d){let u=0,p=0,m=0,g=0,_=0,f=d.matrixWorldInverse;for(let h=0,x=l.length;h<x;h++){let M=l[h];if(M.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),u++}else if(M.isSpotLight){let y=n.spot[m];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(f),y.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(f),m++}else if(M.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(f),o.identity(),r.copy(M.matrixWorld),r.premultiply(f),o.extractRotation(r),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){let y=n.point[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){let y=n.hemi[_];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(f),_++}}}return{setup:a,setupView:c,state:n}}function Iu(i){let t=new f_(i),e=[],n=[];function s(d){l.camera=d,e.length=0,n.length=0}function r(d){e.push(d)}function o(d){n.push(d)}function a(){t.setup(e)}function c(d){t.setupView(e,d)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function p_(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Iu(i),t.set(s,[a])):r>=o.length?(a=new Iu(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function __(i,t,e){let n=new hs,s=new Zt,r=new Zt,o=new ve,a=new mo({depthPacking:Xh}),c=new go,l={},d=e.maxTextureSize,u={[zn]:ze,[ze]:zn,[En]:En},p=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let g=new Sn;g.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Le(g,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=El;let h=this.type;this.render=function(C,I,L){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||C.length===0)return;let v=i.getRenderTarget(),S=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Xn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let B=h!==bn&&this.type===bn,b=h===bn&&this.type!==bn;for(let T=0,w=C.length;T<w;T++){let z=C[T],N=z.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);let V=N.getFrameExtents();if(s.multiply(V),r.copy(N.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/V.x),s.x=r.x*V.x,N.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/V.y),s.y=r.y*V.y,N.mapSize.y=r.y)),N.map===null||B===!0||b===!0){let Z=this.type!==bn?{minFilter:ln,magFilter:ln}:{};N.map!==null&&N.map.dispose(),N.map=new Mn(s.x,s.y,Z),N.map.texture.name=z.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();let O=N.getViewportCount();for(let Z=0;Z<O;Z++){let rt=N.getViewport(Z);o.set(r.x*rt.x,r.y*rt.y,r.x*rt.z,r.y*rt.w),F.viewport(o),N.updateMatrices(z,Z),n=N.getFrustum(),y(I,L,N.camera,z,this.type)}N.isPointLightShadow!==!0&&this.type===bn&&x(N,L),N.needsUpdate=!1}h=this.type,f.needsUpdate=!1,i.setRenderTarget(v,S,P)};function x(C,I){let L=t.update(_);p.defines.VSM_SAMPLES!==C.blurSamples&&(p.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new Mn(s.x,s.y)),p.uniforms.shadow_pass.value=C.map.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(I,null,L,p,_,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(I,null,L,m,_,null)}function M(C,I,L,v){let S=null,P=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)S=P;else if(S=L.isPointLight===!0?c:a,i.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){let F=S.uuid,B=I.uuid,b=l[F];b===void 0&&(b={},l[F]=b);let T=b[B];T===void 0&&(T=S.clone(),b[B]=T,I.addEventListener("dispose",R)),S=T}if(S.visible=I.visible,S.wireframe=I.wireframe,v===bn?S.side=I.shadowSide!==null?I.shadowSide:I.side:S.side=I.shadowSide!==null?I.shadowSide:u[I.side],S.alphaMap=I.alphaMap,S.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,S.map=I.map,S.clipShadows=I.clipShadows,S.clippingPlanes=I.clippingPlanes,S.clipIntersection=I.clipIntersection,S.displacementMap=I.displacementMap,S.displacementScale=I.displacementScale,S.displacementBias=I.displacementBias,S.wireframeLinewidth=I.wireframeLinewidth,S.linewidth=I.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let F=i.properties.get(S);F.light=L}return S}function y(C,I,L,v,S){if(C.visible===!1)return;if(C.layers.test(I.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===bn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);let B=t.update(C),b=C.material;if(Array.isArray(b)){let T=B.groups;for(let w=0,z=T.length;w<z;w++){let N=T[w],V=b[N.materialIndex];if(V&&V.visible){let O=M(C,V,v,S);C.onBeforeShadow(i,C,I,L,B,O,N),i.renderBufferDirect(L,null,B,O,C,N),C.onAfterShadow(i,C,I,L,B,O,N)}}}else if(b.visible){let T=M(C,b,v,S);C.onBeforeShadow(i,C,I,L,B,T,null),i.renderBufferDirect(L,null,B,T,C,null),C.onAfterShadow(i,C,I,L,B,T,null)}}let F=C.children;for(let B=0,b=F.length;B<b;B++)y(F[B],I,L,v,S)}function R(C){C.target.removeEventListener("dispose",R);for(let L in l){let v=l[L],S=C.target.uuid;S in v&&(v[S].dispose(),delete v[S])}}}var x_={[Ao]:Co,[Ro]:Lo,[Po]:Do,[Ei]:Io,[Co]:Ao,[Lo]:Ro,[Do]:Po,[Io]:Ei};function v_(i,t){function e(){let k=!1,dt=new ve,mt=null,Tt=new ve(0,0,0,0);return{setMask:function(ct){mt!==ct&&!k&&(i.colorMask(ct,ct,ct,ct),mt=ct)},setLocked:function(ct){k=ct},setClear:function(ct,tt,Ct,Ht,ce){ce===!0&&(ct*=Ht,tt*=Ht,Ct*=Ht),dt.set(ct,tt,Ct,Ht),Tt.equals(dt)===!1&&(i.clearColor(ct,tt,Ct,Ht),Tt.copy(dt))},reset:function(){k=!1,mt=null,Tt.set(-1,0,0,0)}}}function n(){let k=!1,dt=!1,mt=null,Tt=null,ct=null;return{setReversed:function(tt){if(dt!==tt){let Ct=t.get("EXT_clip_control");tt?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT),dt=tt;let Ht=ct;ct=null,this.setClear(Ht)}},getReversed:function(){return dt},setTest:function(tt){tt?X(i.DEPTH_TEST):ot(i.DEPTH_TEST)},setMask:function(tt){mt!==tt&&!k&&(i.depthMask(tt),mt=tt)},setFunc:function(tt){if(dt&&(tt=x_[tt]),Tt!==tt){switch(tt){case Ao:i.depthFunc(i.NEVER);break;case Co:i.depthFunc(i.ALWAYS);break;case Ro:i.depthFunc(i.LESS);break;case Ei:i.depthFunc(i.LEQUAL);break;case Po:i.depthFunc(i.EQUAL);break;case Io:i.depthFunc(i.GEQUAL);break;case Lo:i.depthFunc(i.GREATER);break;case Do:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Tt=tt}},setLocked:function(tt){k=tt},setClear:function(tt){ct!==tt&&(dt&&(tt=1-tt),i.clearDepth(tt),ct=tt)},reset:function(){k=!1,mt=null,Tt=null,ct=null,dt=!1}}}function s(){let k=!1,dt=null,mt=null,Tt=null,ct=null,tt=null,Ct=null,Ht=null,ce=null;return{setTest:function(ne){k||(ne?X(i.STENCIL_TEST):ot(i.STENCIL_TEST))},setMask:function(ne){dt!==ne&&!k&&(i.stencilMask(ne),dt=ne)},setFunc:function(ne,In,yn){(mt!==ne||Tt!==In||ct!==yn)&&(i.stencilFunc(ne,In,yn),mt=ne,Tt=In,ct=yn)},setOp:function(ne,In,yn){(tt!==ne||Ct!==In||Ht!==yn)&&(i.stencilOp(ne,In,yn),tt=ne,Ct=In,Ht=yn)},setLocked:function(ne){k=ne},setClear:function(ne){ce!==ne&&(i.clearStencil(ne),ce=ne)},reset:function(){k=!1,dt=null,mt=null,Tt=null,ct=null,tt=null,Ct=null,Ht=null,ce=null}}}let r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap,d={},u={},p=new WeakMap,m=[],g=null,_=!1,f=null,h=null,x=null,M=null,y=null,R=null,C=null,I=new Kt(0,0,0),L=0,v=!1,S=null,P=null,F=null,B=null,b=null,T=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),w=!1,z=0,N=i.getParameter(i.VERSION);N.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(N)[1]),w=z>=1):N.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),w=z>=2);let V=null,O={},Z=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),Q=new ve().fromArray(Z),et=new ve().fromArray(rt);function nt(k,dt,mt,Tt){let ct=new Uint8Array(4),tt=i.createTexture();i.bindTexture(k,tt),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ct=0;Ct<mt;Ct++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,Tt,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(dt+Ct,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return tt}let q={};q[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),q[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),q[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),q[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),X(i.DEPTH_TEST),o.setFunc(Ei),Et(!1),gt(bl),X(i.CULL_FACE),Jt(Xn);function X(k){d[k]!==!0&&(i.enable(k),d[k]=!0)}function ot(k){d[k]!==!1&&(i.disable(k),d[k]=!1)}function ft(k,dt){return u[k]!==dt?(i.bindFramebuffer(k,dt),u[k]=dt,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=dt),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function lt(k,dt){let mt=m,Tt=!1;if(k){mt=p.get(dt),mt===void 0&&(mt=[],p.set(dt,mt));let ct=k.textures;if(mt.length!==ct.length||mt[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,Ct=ct.length;tt<Ct;tt++)mt[tt]=i.COLOR_ATTACHMENT0+tt;mt.length=ct.length,Tt=!0}}else mt[0]!==i.BACK&&(mt[0]=i.BACK,Tt=!0);Tt&&i.drawBuffers(mt)}function Mt(k){return g!==k?(i.useProgram(k),g=k,!0):!1}let Dt={[si]:i.FUNC_ADD,[_h]:i.FUNC_SUBTRACT,[xh]:i.FUNC_REVERSE_SUBTRACT};Dt[vh]=i.MIN,Dt[yh]=i.MAX;let U={[Mh]:i.ZERO,[Sh]:i.ONE,[bh]:i.SRC_COLOR,[to]:i.SRC_ALPHA,[Rh]:i.SRC_ALPHA_SATURATE,[Ah]:i.DST_COLOR,[wh]:i.DST_ALPHA,[Eh]:i.ONE_MINUS_SRC_COLOR,[eo]:i.ONE_MINUS_SRC_ALPHA,[Ch]:i.ONE_MINUS_DST_COLOR,[Th]:i.ONE_MINUS_DST_ALPHA,[Ph]:i.CONSTANT_COLOR,[Ih]:i.ONE_MINUS_CONSTANT_COLOR,[Lh]:i.CONSTANT_ALPHA,[Dh]:i.ONE_MINUS_CONSTANT_ALPHA};function Jt(k,dt,mt,Tt,ct,tt,Ct,Ht,ce,ne){if(k===Xn){_===!0&&(ot(i.BLEND),_=!1);return}if(_===!1&&(X(i.BLEND),_=!0),k!==gh){if(k!==f||ne!==v){if((h!==si||y!==si)&&(i.blendEquation(i.FUNC_ADD),h=si,y=si),ne)switch(k){case bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wl:i.blendFunc(i.ONE,i.ONE);break;case Tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Al:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case wl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Tl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Al:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}x=null,M=null,R=null,C=null,I.set(0,0,0),L=0,f=k,v=ne}return}ct=ct||dt,tt=tt||mt,Ct=Ct||Tt,(dt!==h||ct!==y)&&(i.blendEquationSeparate(Dt[dt],Dt[ct]),h=dt,y=ct),(mt!==x||Tt!==M||tt!==R||Ct!==C)&&(i.blendFuncSeparate(U[mt],U[Tt],U[tt],U[Ct]),x=mt,M=Tt,R=tt,C=Ct),(Ht.equals(I)===!1||ce!==L)&&(i.blendColor(Ht.r,Ht.g,Ht.b,ce),I.copy(Ht),L=ce),f=k,v=!1}function Bt(k,dt){k.side===En?ot(i.CULL_FACE):X(i.CULL_FACE);let mt=k.side===ze;dt&&(mt=!mt),Et(mt),k.blending===bi&&k.transparent===!1?Jt(Xn):Jt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),o.setFunc(k.depthFunc),o.setTest(k.depthTest),o.setMask(k.depthWrite),r.setMask(k.colorWrite);let Tt=k.stencilWrite;a.setTest(Tt),Tt&&(a.setMask(k.stencilWriteMask),a.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),a.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Rt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?X(i.SAMPLE_ALPHA_TO_COVERAGE):ot(i.SAMPLE_ALPHA_TO_COVERAGE)}function Et(k){S!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),S=k)}function gt(k){k!==fh?(X(i.CULL_FACE),k!==P&&(k===bl?i.cullFace(i.BACK):k===ph?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ot(i.CULL_FACE),P=k}function de(k){k!==F&&(w&&i.lineWidth(k),F=k)}function Rt(k,dt,mt){k?(X(i.POLYGON_OFFSET_FILL),(B!==dt||b!==mt)&&(i.polygonOffset(dt,mt),B=dt,b=mt)):ot(i.POLYGON_OFFSET_FILL)}function Xt(k){k?X(i.SCISSOR_TEST):ot(i.SCISSOR_TEST)}function we(k){k===void 0&&(k=i.TEXTURE0+T-1),V!==k&&(i.activeTexture(k),V=k)}function Me(k,dt,mt){mt===void 0&&(V===null?mt=i.TEXTURE0+T-1:mt=V);let Tt=O[mt];Tt===void 0&&(Tt={type:void 0,texture:void 0},O[mt]=Tt),(Tt.type!==k||Tt.texture!==dt)&&(V!==mt&&(i.activeTexture(mt),V=mt),i.bindTexture(k,dt||q[k]),Tt.type=k,Tt.texture=dt)}function D(){let k=O[V];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function E(){try{i.compressedTexImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Y(){try{i.compressedTexImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function j(){try{i.texSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function at(){try{i.texSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ut(){try{i.compressedTexSubImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function pt(){try{i.texStorage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pt(){try{i.texStorage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function It(){try{i.texImage2D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ut(){try{i.texImage3D(...arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(k){Q.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),Q.copy(k))}function kt(k){et.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),et.copy(k))}function Lt(k,dt){let mt=l.get(dt);mt===void 0&&(mt=new WeakMap,l.set(dt,mt));let Tt=mt.get(k);Tt===void 0&&(Tt=i.getUniformBlockIndex(dt,k.name),mt.set(k,Tt))}function vt(k,dt){let Tt=l.get(dt).get(k);c.get(dt)!==Tt&&(i.uniformBlockBinding(dt,Tt,k.__bindingPointIndex),c.set(dt,Tt))}function Wt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},V=null,O={},u={},p=new WeakMap,m=[],g=null,_=!1,f=null,h=null,x=null,M=null,y=null,R=null,C=null,I=new Kt(0,0,0),L=0,v=!1,S=null,P=null,F=null,B=null,b=null,Q.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:X,disable:ot,bindFramebuffer:ft,drawBuffers:lt,useProgram:Mt,setBlending:Jt,setMaterial:Bt,setFlipSided:Et,setCullFace:gt,setLineWidth:de,setPolygonOffset:Rt,setScissorTest:Xt,activeTexture:we,bindTexture:Me,unbindTexture:D,compressedTexImage2D:E,compressedTexImage3D:Y,texImage2D:It,texImage3D:ut,updateUBOMapping:Lt,uniformBlockBinding:vt,texStorage2D:pt,texStorage3D:Pt,texSubImage2D:j,texSubImage3D:at,compressedTexSubImage2D:K,compressedTexSubImage3D:Ut,scissor:St,viewport:kt,reset:Wt}}function y_(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Zt,d=new WeakMap,u,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(D,E){return m?new OffscreenCanvas(D,E):Gs("canvas")}function _(D,E,Y){let j=1,at=Me(D);if((at.width>Y||at.height>Y)&&(j=Y/Math.max(at.width,at.height)),j<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){let K=Math.floor(j*at.width),Ut=Math.floor(j*at.height);u===void 0&&(u=g(K,Ut));let pt=E?g(K,Ut):u;return pt.width=K,pt.height=Ut,pt.getContext("2d").drawImage(D,0,0,K,Ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+at.width+"x"+at.height+") to ("+K+"x"+Ut+")."),pt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+at.width+"x"+at.height+")."),D;return D}function f(D){return D.generateMipmaps}function h(D){i.generateMipmap(D)}function x(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(D,E,Y,j,at=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let K=E;if(E===i.RED&&(Y===i.FLOAT&&(K=i.R32F),Y===i.HALF_FLOAT&&(K=i.R16F),Y===i.UNSIGNED_BYTE&&(K=i.R8)),E===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(K=i.R8UI),Y===i.UNSIGNED_SHORT&&(K=i.R16UI),Y===i.UNSIGNED_INT&&(K=i.R32UI),Y===i.BYTE&&(K=i.R8I),Y===i.SHORT&&(K=i.R16I),Y===i.INT&&(K=i.R32I)),E===i.RG&&(Y===i.FLOAT&&(K=i.RG32F),Y===i.HALF_FLOAT&&(K=i.RG16F),Y===i.UNSIGNED_BYTE&&(K=i.RG8)),E===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(K=i.RG8UI),Y===i.UNSIGNED_SHORT&&(K=i.RG16UI),Y===i.UNSIGNED_INT&&(K=i.RG32UI),Y===i.BYTE&&(K=i.RG8I),Y===i.SHORT&&(K=i.RG16I),Y===i.INT&&(K=i.RG32I)),E===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(K=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(K=i.RGB16UI),Y===i.UNSIGNED_INT&&(K=i.RGB32UI),Y===i.BYTE&&(K=i.RGB8I),Y===i.SHORT&&(K=i.RGB16I),Y===i.INT&&(K=i.RGB32I)),E===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),Y===i.UNSIGNED_INT&&(K=i.RGBA32UI),Y===i.BYTE&&(K=i.RGBA8I),Y===i.SHORT&&(K=i.RGBA16I),Y===i.INT&&(K=i.RGBA32I)),E===i.RGB&&(Y===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),E===i.RGBA){let Ut=at?Vs:te.getTransfer(j);Y===i.FLOAT&&(K=i.RGBA32F),Y===i.HALF_FLOAT&&(K=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(K=Ut===re?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function y(D,E){let Y;return D?E===null||E===li||E===gs?Y=i.DEPTH24_STENCIL8:E===wn?Y=i.DEPTH32F_STENCIL8:E===ps&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===li||E===gs?Y=i.DEPTH_COMPONENT24:E===wn?Y=i.DEPTH_COMPONENT32F:E===ps&&(Y=i.DEPTH_COMPONENT16),Y}function R(D,E){return f(D)===!0||D.isFramebufferTexture&&D.minFilter!==ln&&D.minFilter!==_n?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function C(D){let E=D.target;E.removeEventListener("dispose",C),L(E),E.isVideoTexture&&d.delete(E)}function I(D){let E=D.target;E.removeEventListener("dispose",I),S(E)}function L(D){let E=n.get(D);if(E.__webglInit===void 0)return;let Y=D.source,j=p.get(Y);if(j){let at=j[E.__cacheKey];at.usedTimes--,at.usedTimes===0&&v(D),Object.keys(j).length===0&&p.delete(Y)}n.remove(D)}function v(D){let E=n.get(D);i.deleteTexture(E.__webglTexture);let Y=D.source,j=p.get(Y);delete j[E.__cacheKey],o.memory.textures--}function S(D){let E=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(E.__webglFramebuffer[j]))for(let at=0;at<E.__webglFramebuffer[j].length;at++)i.deleteFramebuffer(E.__webglFramebuffer[j][at]);else i.deleteFramebuffer(E.__webglFramebuffer[j]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[j])}else{if(Array.isArray(E.__webglFramebuffer))for(let j=0;j<E.__webglFramebuffer.length;j++)i.deleteFramebuffer(E.__webglFramebuffer[j]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let j=0;j<E.__webglColorRenderbuffer.length;j++)E.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[j]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}let Y=D.textures;for(let j=0,at=Y.length;j<at;j++){let K=n.get(Y[j]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(Y[j])}n.remove(D)}let P=0;function F(){P=0}function B(){let D=P;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),P+=1,D}function b(D){let E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function T(D,E){let Y=n.get(D);if(D.isVideoTexture&&Xt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&Y.__version!==D.version){let j=D.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(Y,D,E);return}}else D.isExternalTexture&&(Y.__webglTexture=D.sourceTexture?D.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+E)}function w(D,E){let Y=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){q(Y,D,E);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+E)}function z(D,E){let Y=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){q(Y,D,E);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+E)}function N(D,E){let Y=n.get(D);if(D.version>0&&Y.__version!==D.version){X(Y,D,E);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+E)}let V={[no]:i.REPEAT,[ii]:i.CLAMP_TO_EDGE,[io]:i.MIRRORED_REPEAT},O={[ln]:i.NEAREST,[Gh]:i.NEAREST_MIPMAP_NEAREST,[dr]:i.NEAREST_MIPMAP_LINEAR,[_n]:i.LINEAR,[No]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},Z={[Yh]:i.NEVER,[jh]:i.ALWAYS,[Zh]:i.LESS,[zl]:i.LEQUAL,[Jh]:i.EQUAL,[Qh]:i.GEQUAL,[$h]:i.GREATER,[Kh]:i.NOTEQUAL};function rt(D,E){if(E.type===wn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===_n||E.magFilter===No||E.magFilter===dr||E.magFilter===ai||E.minFilter===_n||E.minFilter===No||E.minFilter===dr||E.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,V[E.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,V[E.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,V[E.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,O[E.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,O[E.minFilter]),E.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ln||E.minFilter!==dr&&E.minFilter!==ai||E.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){let Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Q(D,E){let Y=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",C));let j=E.source,at=p.get(j);at===void 0&&(at={},p.set(j,at));let K=b(E);if(K!==D.__cacheKey){at[K]===void 0&&(at[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),at[K].usedTimes++;let Ut=at[D.__cacheKey];Ut!==void 0&&(at[D.__cacheKey].usedTimes--,Ut.usedTimes===0&&v(E)),D.__cacheKey=K,D.__webglTexture=at[K].texture}return Y}function et(D,E,Y){return Math.floor(Math.floor(D/Y)/E)}function nt(D,E,Y,j){let K=D.updateRanges;if(K.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,E.width,E.height,Y,j,E.data);else{K.sort((ut,St)=>ut.start-St.start);let Ut=0;for(let ut=1;ut<K.length;ut++){let St=K[Ut],kt=K[ut],Lt=St.start+St.count,vt=et(kt.start,E.width,4),Wt=et(St.start,E.width,4);kt.start<=Lt+1&&vt===Wt&&et(kt.start+kt.count-1,E.width,4)===vt?St.count=Math.max(St.count,kt.start+kt.count-St.start):(++Ut,K[Ut]=kt)}K.length=Ut+1;let pt=i.getParameter(i.UNPACK_ROW_LENGTH),Pt=i.getParameter(i.UNPACK_SKIP_PIXELS),It=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,E.width);for(let ut=0,St=K.length;ut<St;ut++){let kt=K[ut],Lt=Math.floor(kt.start/4),vt=Math.ceil(kt.count/4),Wt=Lt%E.width,k=Math.floor(Lt/E.width),dt=vt,mt=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Wt),i.pixelStorei(i.UNPACK_SKIP_ROWS,k),e.texSubImage2D(i.TEXTURE_2D,0,Wt,k,dt,mt,Y,j,E.data)}D.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,pt),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Pt),i.pixelStorei(i.UNPACK_SKIP_ROWS,It)}}function q(D,E,Y){let j=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(j=i.TEXTURE_3D);let at=Q(D,E),K=E.source;e.bindTexture(j,D.__webglTexture,i.TEXTURE0+Y);let Ut=n.get(K);if(K.version!==Ut.__version||at===!0){e.activeTexture(i.TEXTURE0+Y);let pt=te.getPrimaries(te.workingColorSpace),Pt=E.colorSpace===Yn?null:te.getPrimaries(E.colorSpace),It=E.colorSpace===Yn||pt===Pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let ut=_(E.image,!1,s.maxTextureSize);ut=we(E,ut);let St=r.convert(E.format,E.colorSpace),kt=r.convert(E.type),Lt=M(E.internalFormat,St,kt,E.colorSpace,E.isVideoTexture);rt(j,E);let vt,Wt=E.mipmaps,k=E.isVideoTexture!==!0,dt=Ut.__version===void 0||at===!0,mt=K.dataReady,Tt=R(E,ut);if(E.isDepthTexture)Lt=y(E.format===_s,E.type),dt&&(k?e.texStorage2D(i.TEXTURE_2D,1,Lt,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Lt,ut.width,ut.height,0,St,kt,null));else if(E.isDataTexture)if(Wt.length>0){k&&dt&&e.texStorage2D(i.TEXTURE_2D,Tt,Lt,Wt[0].width,Wt[0].height);for(let ct=0,tt=Wt.length;ct<tt;ct++)vt=Wt[ct],k?mt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,St,kt,vt.data):e.texImage2D(i.TEXTURE_2D,ct,Lt,vt.width,vt.height,0,St,kt,vt.data);E.generateMipmaps=!1}else k?(dt&&e.texStorage2D(i.TEXTURE_2D,Tt,Lt,ut.width,ut.height),mt&&nt(E,ut,St,kt)):e.texImage2D(i.TEXTURE_2D,0,Lt,ut.width,ut.height,0,St,kt,ut.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){k&&dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Tt,Lt,Wt[0].width,Wt[0].height,ut.depth);for(let ct=0,tt=Wt.length;ct<tt;ct++)if(vt=Wt[ct],E.format!==cn)if(St!==null)if(k){if(mt)if(E.layerUpdates.size>0){let Ct=ql(vt.width,vt.height,E.format,E.type);for(let Ht of E.layerUpdates){let ce=vt.data.subarray(Ht*Ct/vt.data.BYTES_PER_ELEMENT,(Ht+1)*Ct/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,Ht,vt.width,vt.height,1,St,ce)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,vt.width,vt.height,ut.depth,St,vt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,Lt,vt.width,vt.height,ut.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else k?mt&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,vt.width,vt.height,ut.depth,St,kt,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,Lt,vt.width,vt.height,ut.depth,0,St,kt,vt.data)}else{k&&dt&&e.texStorage2D(i.TEXTURE_2D,Tt,Lt,Wt[0].width,Wt[0].height);for(let ct=0,tt=Wt.length;ct<tt;ct++)vt=Wt[ct],E.format!==cn?St!==null?k?mt&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,St,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,Lt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):k?mt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,vt.width,vt.height,St,kt,vt.data):e.texImage2D(i.TEXTURE_2D,ct,Lt,vt.width,vt.height,0,St,kt,vt.data)}else if(E.isDataArrayTexture)if(k){if(dt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Tt,Lt,ut.width,ut.height,ut.depth),mt)if(E.layerUpdates.size>0){let ct=ql(ut.width,ut.height,E.format,E.type);for(let tt of E.layerUpdates){let Ct=ut.data.subarray(tt*ct/ut.data.BYTES_PER_ELEMENT,(tt+1)*ct/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,tt,ut.width,ut.height,1,St,kt,Ct)}E.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,St,kt,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Lt,ut.width,ut.height,ut.depth,0,St,kt,ut.data);else if(E.isData3DTexture)k?(dt&&e.texStorage3D(i.TEXTURE_3D,Tt,Lt,ut.width,ut.height,ut.depth),mt&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,St,kt,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Lt,ut.width,ut.height,ut.depth,0,St,kt,ut.data);else if(E.isFramebufferTexture){if(dt)if(k)e.texStorage2D(i.TEXTURE_2D,Tt,Lt,ut.width,ut.height);else{let ct=ut.width,tt=ut.height;for(let Ct=0;Ct<Tt;Ct++)e.texImage2D(i.TEXTURE_2D,Ct,Lt,ct,tt,0,St,kt,null),ct>>=1,tt>>=1}}else if(Wt.length>0){if(k&&dt){let ct=Me(Wt[0]);e.texStorage2D(i.TEXTURE_2D,Tt,Lt,ct.width,ct.height)}for(let ct=0,tt=Wt.length;ct<tt;ct++)vt=Wt[ct],k?mt&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,St,kt,vt):e.texImage2D(i.TEXTURE_2D,ct,Lt,St,kt,vt);E.generateMipmaps=!1}else if(k){if(dt){let ct=Me(ut);e.texStorage2D(i.TEXTURE_2D,Tt,Lt,ct.width,ct.height)}mt&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,St,kt,ut)}else e.texImage2D(i.TEXTURE_2D,0,Lt,St,kt,ut);f(E)&&h(j),Ut.__version=K.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function X(D,E,Y){if(E.image.length!==6)return;let j=Q(D,E),at=E.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+Y);let K=n.get(at);if(at.version!==K.__version||j===!0){e.activeTexture(i.TEXTURE0+Y);let Ut=te.getPrimaries(te.workingColorSpace),pt=E.colorSpace===Yn?null:te.getPrimaries(E.colorSpace),Pt=E.colorSpace===Yn||Ut===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let It=E.isCompressedTexture||E.image[0].isCompressedTexture,ut=E.image[0]&&E.image[0].isDataTexture,St=[];for(let tt=0;tt<6;tt++)!It&&!ut?St[tt]=_(E.image[tt],!0,s.maxCubemapSize):St[tt]=ut?E.image[tt].image:E.image[tt],St[tt]=we(E,St[tt]);let kt=St[0],Lt=r.convert(E.format,E.colorSpace),vt=r.convert(E.type),Wt=M(E.internalFormat,Lt,vt,E.colorSpace),k=E.isVideoTexture!==!0,dt=K.__version===void 0||j===!0,mt=at.dataReady,Tt=R(E,kt);rt(i.TEXTURE_CUBE_MAP,E);let ct;if(It){k&&dt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,Wt,kt.width,kt.height);for(let tt=0;tt<6;tt++){ct=St[tt].mipmaps;for(let Ct=0;Ct<ct.length;Ct++){let Ht=ct[Ct];E.format!==cn?Lt!==null?k?mt&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,Ht.width,Ht.height,Lt,Ht.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,Wt,Ht.width,Ht.height,0,Ht.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,0,0,Ht.width,Ht.height,Lt,vt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct,Wt,Ht.width,Ht.height,0,Lt,vt,Ht.data)}}}else{if(ct=E.mipmaps,k&&dt){ct.length>0&&Tt++;let tt=Me(St[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Tt,Wt,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(ut){k?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,St[tt].width,St[tt].height,Lt,vt,St[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Wt,St[tt].width,St[tt].height,0,Lt,vt,St[tt].data);for(let Ct=0;Ct<ct.length;Ct++){let ce=ct[Ct].image[tt].image;k?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,ce.width,ce.height,Lt,vt,ce.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,Wt,ce.width,ce.height,0,Lt,vt,ce.data)}}else{k?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Lt,vt,St[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Wt,Lt,vt,St[tt]);for(let Ct=0;Ct<ct.length;Ct++){let Ht=ct[Ct];k?mt&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,0,0,Lt,vt,Ht.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,Ct+1,Wt,Lt,vt,Ht.image[tt])}}}f(E)&&h(i.TEXTURE_CUBE_MAP),K.__version=at.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function ot(D,E,Y,j,at,K){let Ut=r.convert(Y.format,Y.colorSpace),pt=r.convert(Y.type),Pt=M(Y.internalFormat,Ut,pt,Y.colorSpace),It=n.get(E),ut=n.get(Y);if(ut.__renderTarget=E,!It.__hasExternalTextures){let St=Math.max(1,E.width>>K),kt=Math.max(1,E.height>>K);at===i.TEXTURE_3D||at===i.TEXTURE_2D_ARRAY?e.texImage3D(at,K,Pt,St,kt,E.depth,0,Ut,pt,null):e.texImage2D(at,K,Pt,St,kt,0,Ut,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),Rt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,at,ut.__webglTexture,0,de(E)):(at===i.TEXTURE_2D||at>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,at,ut.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(D,E,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,D),E.depthBuffer){let j=E.depthTexture,at=j&&j.isDepthTexture?j.type:null,K=y(E.stencilBuffer,at),Ut=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=de(E);Rt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,K,E.width,E.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,K,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,K,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ut,i.RENDERBUFFER,D)}else{let j=E.textures;for(let at=0;at<j.length;at++){let K=j[at],Ut=r.convert(K.format,K.colorSpace),pt=r.convert(K.type),Pt=M(K.internalFormat,Ut,pt,K.colorSpace),It=de(E);Y&&Rt(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,Pt,E.width,E.height):Rt(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,Pt,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,Pt,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function lt(D,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let j=n.get(E.depthTexture);j.__renderTarget=E,(!j.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),T(E.depthTexture,0);let at=j.__webglTexture,K=de(E);if(E.depthTexture.format===is)Rt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,at,0);else if(E.depthTexture.format===_s)Rt(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function Mt(D){let E=n.get(D),Y=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){let j=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),j){let at=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,j.removeEventListener("dispose",at)};j.addEventListener("dispose",at),E.__depthDisposeCallback=at}E.__boundDepthTexture=j}if(D.depthTexture&&!E.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");let j=D.texture.mipmaps;j&&j.length>0?lt(E.__webglFramebuffer[0],D):lt(E.__webglFramebuffer,D)}else if(Y){E.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[j]),E.__webglDepthbuffer[j]===void 0)E.__webglDepthbuffer[j]=i.createRenderbuffer(),ft(E.__webglDepthbuffer[j],D,!1);else{let at=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[j];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,K)}}else{let j=D.texture.mipmaps;if(j&&j.length>0?e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ft(E.__webglDepthbuffer,D,!1);else{let at=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,at,i.RENDERBUFFER,K)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(D,E,Y){let j=n.get(D);E!==void 0&&ot(j.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Mt(D)}function U(D){let E=D.texture,Y=n.get(D),j=n.get(E);D.addEventListener("dispose",I);let at=D.textures,K=D.isWebGLCubeRenderTarget===!0,Ut=at.length>1;if(Ut||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=E.version,o.memory.textures++),K){Y.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer[pt]=[];for(let Pt=0;Pt<E.mipmaps.length;Pt++)Y.__webglFramebuffer[pt][Pt]=i.createFramebuffer()}else Y.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer=[];for(let pt=0;pt<E.mipmaps.length;pt++)Y.__webglFramebuffer[pt]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Ut)for(let pt=0,Pt=at.length;pt<Pt;pt++){let It=n.get(at[pt]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&Rt(D)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let pt=0;pt<at.length;pt++){let Pt=at[pt];Y.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[pt]);let It=r.convert(Pt.format,Pt.colorSpace),ut=r.convert(Pt.type),St=M(Pt.internalFormat,It,ut,Pt.colorSpace,D.isXRRenderTarget===!0),kt=de(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,kt,St,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,Y.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),ft(Y.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),rt(i.TEXTURE_CUBE_MAP,E);for(let pt=0;pt<6;pt++)if(E.mipmaps&&E.mipmaps.length>0)for(let Pt=0;Pt<E.mipmaps.length;Pt++)ot(Y.__webglFramebuffer[pt][Pt],D,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Pt);else ot(Y.__webglFramebuffer[pt],D,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);f(E)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ut){for(let pt=0,Pt=at.length;pt<Pt;pt++){let It=at[pt],ut=n.get(It),St=i.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(St=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(St,ut.__webglTexture),rt(St,It),ot(Y.__webglFramebuffer,D,It,i.COLOR_ATTACHMENT0+pt,St,0),f(It)&&h(St)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(pt=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,j.__webglTexture),rt(pt,E),E.mipmaps&&E.mipmaps.length>0)for(let Pt=0;Pt<E.mipmaps.length;Pt++)ot(Y.__webglFramebuffer[Pt],D,E,i.COLOR_ATTACHMENT0,pt,Pt);else ot(Y.__webglFramebuffer,D,E,i.COLOR_ATTACHMENT0,pt,0);f(E)&&h(pt),e.unbindTexture()}D.depthBuffer&&Mt(D)}function Jt(D){let E=D.textures;for(let Y=0,j=E.length;Y<j;Y++){let at=E[Y];if(f(at)){let K=x(D),Ut=n.get(at).__webglTexture;e.bindTexture(K,Ut),h(K),e.unbindTexture()}}}let Bt=[],Et=[];function gt(D){if(D.samples>0){if(Rt(D)===!1){let E=D.textures,Y=D.width,j=D.height,at=i.COLOR_BUFFER_BIT,K=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ut=n.get(D),pt=E.length>1;if(pt)for(let It=0;It<E.length;It++)e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer);let Pt=D.texture.mipmaps;Pt&&Pt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let It=0;It<E.length;It++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(at|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(at|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[It]);let ut=n.get(E[It]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,Y,j,0,0,Y,j,at,i.NEAREST),c===!0&&(Bt.length=0,Et.length=0,Bt.push(i.COLOR_ATTACHMENT0+It),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Bt.push(K),Et.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Et)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Bt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let It=0;It<E.length;It++){e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,Ut.__webglColorRenderbuffer[It]);let ut=n.get(E[It]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,ut,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ut.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){let E=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function de(D){return Math.min(s.maxSamples,D.samples)}function Rt(D){let E=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Xt(D){let E=o.render.frame;d.get(D)!==E&&(d.set(D,E),D.update())}function we(D,E){let Y=D.colorSpace,j=D.format,at=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||Y!==wi&&Y!==Yn&&(te.getTransfer(Y)===re?(j!==cn||at!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),E}function Me(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=T,this.setTexture2DArray=w,this.setTexture3D=z,this.setTextureCube=N,this.rebindTextures=Dt,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Jt,this.updateMultisampleRenderTarget=gt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=ot,this.useMultisampledRTT=Rt}function M_(i,t){function e(n,s=Yn){let r,o=te.getTransfer(s);if(n===vn)return i.UNSIGNED_BYTE;if(n===Bo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===zo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ll)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Pl)return i.BYTE;if(n===Il)return i.SHORT;if(n===ps)return i.UNSIGNED_SHORT;if(n===Oo)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===ms)return i.HALF_FLOAT;if(n===Ul)return i.ALPHA;if(n===Fl)return i.RGB;if(n===cn)return i.RGBA;if(n===is)return i.DEPTH_COMPONENT;if(n===_s)return i.DEPTH_STENCIL;if(n===Nl)return i.RED;if(n===ko)return i.RED_INTEGER;if(n===Ol)return i.RG;if(n===Vo)return i.RG_INTEGER;if(n===Ho)return i.RGBA_INTEGER;if(n===fr||n===pr||n===mr||n===gr)if(o===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Go||n===Wo||n===Xo||n===qo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Go)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===qo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Yo||n===Zo||n===Jo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Yo||n===Zo)return o===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Jo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===$o||n===Ko||n===Qo||n===jo||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===oa||n===aa||n===la||n===ca)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===$o)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ko)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jo)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ta)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ea)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===na)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ia)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ra)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===aa)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===la)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ca)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ha||n===ua||n===da)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ha)return o===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ua)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===da)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fa||n===pa||n===ma||n===ga)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===pa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ma)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var S_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,b_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,rc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new js(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new xn({vertexShader:S_,fragmentShader:b_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Le(new sr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},oc=class extends kn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,d=null,u=null,p=null,m=null,g=null,_=typeof XRWebGLBinding<"u",f=new rc,h={},x=e.getContextAttributes(),M=null,y=null,R=[],C=[],I=new Zt,L=null,v=new We;v.viewport=new ve;let S=new We;S.viewport=new ve;let P=[v,S],F=new To,B=null,b=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let X=R[q];return X===void 0&&(X=new cs,R[q]=X),X.getTargetRaySpace()},this.getControllerGrip=function(q){let X=R[q];return X===void 0&&(X=new cs,R[q]=X),X.getGripSpace()},this.getHand=function(q){let X=R[q];return X===void 0&&(X=new cs,R[q]=X),X.getHandSpace()};function T(q){let X=C.indexOf(q.inputSource);if(X===-1)return;let ot=R[X];ot!==void 0&&(ot.update(q.inputSource,q.frame,l||o),ot.dispatchEvent({type:q.type,data:q.inputSource}))}function w(){s.removeEventListener("select",T),s.removeEventListener("selectstart",T),s.removeEventListener("selectend",T),s.removeEventListener("squeeze",T),s.removeEventListener("squeezestart",T),s.removeEventListener("squeezeend",T),s.removeEventListener("end",w),s.removeEventListener("inputsourceschange",z);for(let q=0;q<R.length;q++){let X=C[q];X!==null&&(C[q]=null,R[q].disconnect(X))}B=null,b=null,f.reset();for(let q in h)delete h[q];t.setRenderTarget(M),m=null,p=null,u=null,s=null,y=null,nt.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(M=t.getRenderTarget(),s.addEventListener("select",T),s.addEventListener("selectstart",T),s.addEventListener("selectend",T),s.addEventListener("squeeze",T),s.addEventListener("squeezestart",T),s.addEventListener("squeezeend",T),s.addEventListener("end",w),s.addEventListener("inputsourceschange",z),x.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(I),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ot=null,ft=null,lt=null;x.depth&&(lt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=x.stencil?_s:is,ft=x.stencil?gs:li);let Mt={colorFormat:e.RGBA8,depthFormat:lt,scaleFactor:r};u=this.getBinding(),p=u.createProjectionLayer(Mt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),y=new Mn(p.textureWidth,p.textureHeight,{format:cn,type:vn,depthTexture:new Qs(p.textureWidth,p.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}else{let ot={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new Mn(m.framebufferWidth,m.framebufferHeight,{format:cn,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),nt.setContext(s),nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function z(q){for(let X=0;X<q.removed.length;X++){let ot=q.removed[X],ft=C.indexOf(ot);ft>=0&&(C[ft]=null,R[ft].disconnect(ot))}for(let X=0;X<q.added.length;X++){let ot=q.added[X],ft=C.indexOf(ot);if(ft===-1){for(let Mt=0;Mt<R.length;Mt++)if(Mt>=C.length){C.push(ot),ft=Mt;break}else if(C[Mt]===null){C[Mt]=ot,ft=Mt;break}if(ft===-1)break}let lt=R[ft];lt&&lt.connect(ot)}}let N=new H,V=new H;function O(q,X,ot){N.setFromMatrixPosition(X.matrixWorld),V.setFromMatrixPosition(ot.matrixWorld);let ft=N.distanceTo(V),lt=X.projectionMatrix.elements,Mt=ot.projectionMatrix.elements,Dt=lt[14]/(lt[10]-1),U=lt[14]/(lt[10]+1),Jt=(lt[9]+1)/lt[5],Bt=(lt[9]-1)/lt[5],Et=(lt[8]-1)/lt[0],gt=(Mt[8]+1)/Mt[0],de=Dt*Et,Rt=Dt*gt,Xt=ft/(-Et+gt),we=Xt*-Et;if(X.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(we),q.translateZ(Xt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),lt[10]===-1)q.projectionMatrix.copy(X.projectionMatrix),q.projectionMatrixInverse.copy(X.projectionMatrixInverse);else{let Me=Dt+Xt,D=U+Xt,E=de-we,Y=Rt+(ft-we),j=Jt*U/D*Me,at=Bt*U/D*Me;q.projectionMatrix.makePerspective(E,Y,j,at,Me,D),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Z(q,X){X===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(X.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let X=q.near,ot=q.far;f.texture!==null&&(f.depthNear>0&&(X=f.depthNear),f.depthFar>0&&(ot=f.depthFar)),F.near=S.near=v.near=X,F.far=S.far=v.far=ot,(B!==F.near||b!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),B=F.near,b=F.far),F.layers.mask=q.layers.mask|6,v.layers.mask=F.layers.mask&3,S.layers.mask=F.layers.mask&5;let ft=q.parent,lt=F.cameras;Z(F,ft);for(let Mt=0;Mt<lt.length;Mt++)Z(lt[Mt],ft);lt.length===2?O(F,v,S):F.projectionMatrix.copy(v.projectionMatrix),rt(q,F,ft)};function rt(q,X,ot){ot===null?q.matrix.copy(X.matrixWorld):(q.matrix.copy(ot.matrixWorld),q.matrix.invert(),q.matrix.multiply(X.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(X.projectionMatrix),q.projectionMatrixInverse.copy(X.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=ss*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(q){c=q,p!==null&&(p.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(F)},this.getCameraTexture=function(q){return h[q]};let Q=null;function et(q,X){if(d=X.getViewerPose(l||o),g=X,d!==null){let ot=d.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let ft=!1;ot.length!==F.cameras.length&&(F.cameras.length=0,ft=!0);for(let U=0;U<ot.length;U++){let Jt=ot[U],Bt=null;if(m!==null)Bt=m.getViewport(Jt);else{let gt=u.getViewSubImage(p,Jt);Bt=gt.viewport,U===0&&(t.setRenderTargetTextures(y,gt.colorTexture,gt.depthStencilTexture),t.setRenderTarget(y))}let Et=P[U];Et===void 0&&(Et=new We,Et.layers.enable(U),Et.viewport=new ve,P[U]=Et),Et.matrix.fromArray(Jt.transform.matrix),Et.matrix.decompose(Et.position,Et.quaternion,Et.scale),Et.projectionMatrix.fromArray(Jt.projectionMatrix),Et.projectionMatrixInverse.copy(Et.projectionMatrix).invert(),Et.viewport.set(Bt.x,Bt.y,Bt.width,Bt.height),U===0&&(F.matrix.copy(Et.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),ft===!0&&F.cameras.push(Et)}let lt=s.enabledFeatures;if(lt&&lt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let U=u.getDepthInformation(ot[0]);U&&U.isValid&&U.texture&&f.init(U,s.renderState)}if(lt&&lt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let U=0;U<ot.length;U++){let Jt=ot[U].camera;if(Jt){let Bt=h[Jt];Bt||(Bt=new js,h[Jt]=Bt);let Et=u.getCameraImage(Jt);Bt.sourceTexture=Et}}}}for(let ot=0;ot<R.length;ot++){let ft=C[ot],lt=R[ot];ft!==null&&lt!==void 0&&lt.update(ft,X,l||o)}Q&&Q(q,X),X.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:X}),g=null}let nt=new Lu;nt.setAnimationLoop(et),this.setAnimationLoop=function(q){Q=q},this.dispose=function(){}}},Di=new nn,E_=new ae;function w_(i,t){function e(f,h){f.matrixAutoUpdate===!0&&f.updateMatrix(),h.value.copy(f.matrix)}function n(f,h){h.color.getRGB(f.fogColor.value,Gl(i)),h.isFog?(f.fogNear.value=h.near,f.fogFar.value=h.far):h.isFogExp2&&(f.fogDensity.value=h.density)}function s(f,h,x,M,y){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(f,h):h.isMeshToonMaterial?(r(f,h),u(f,h)):h.isMeshPhongMaterial?(r(f,h),d(f,h)):h.isMeshStandardMaterial?(r(f,h),p(f,h),h.isMeshPhysicalMaterial&&m(f,h,y)):h.isMeshMatcapMaterial?(r(f,h),g(f,h)):h.isMeshDepthMaterial?r(f,h):h.isMeshDistanceMaterial?(r(f,h),_(f,h)):h.isMeshNormalMaterial?r(f,h):h.isLineBasicMaterial?(o(f,h),h.isLineDashedMaterial&&a(f,h)):h.isPointsMaterial?c(f,h,x,M):h.isSpriteMaterial?l(f,h):h.isShadowMaterial?(f.color.value.copy(h.color),f.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(f,h){f.opacity.value=h.opacity,h.color&&f.diffuse.value.copy(h.color),h.emissive&&f.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(f.map.value=h.map,e(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.bumpMap&&(f.bumpMap.value=h.bumpMap,e(h.bumpMap,f.bumpMapTransform),f.bumpScale.value=h.bumpScale,h.side===ze&&(f.bumpScale.value*=-1)),h.normalMap&&(f.normalMap.value=h.normalMap,e(h.normalMap,f.normalMapTransform),f.normalScale.value.copy(h.normalScale),h.side===ze&&f.normalScale.value.negate()),h.displacementMap&&(f.displacementMap.value=h.displacementMap,e(h.displacementMap,f.displacementMapTransform),f.displacementScale.value=h.displacementScale,f.displacementBias.value=h.displacementBias),h.emissiveMap&&(f.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,f.emissiveMapTransform)),h.specularMap&&(f.specularMap.value=h.specularMap,e(h.specularMap,f.specularMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest);let x=t.get(h),M=x.envMap,y=x.envMapRotation;M&&(f.envMap.value=M,Di.copy(y),Di.x*=-1,Di.y*=-1,Di.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Di.y*=-1,Di.z*=-1),f.envMapRotation.value.setFromMatrix4(E_.makeRotationFromEuler(Di)),f.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=h.reflectivity,f.ior.value=h.ior,f.refractionRatio.value=h.refractionRatio),h.lightMap&&(f.lightMap.value=h.lightMap,f.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,f.lightMapTransform)),h.aoMap&&(f.aoMap.value=h.aoMap,f.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,f.aoMapTransform))}function o(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,h.map&&(f.map.value=h.map,e(h.map,f.mapTransform))}function a(f,h){f.dashSize.value=h.dashSize,f.totalSize.value=h.dashSize+h.gapSize,f.scale.value=h.scale}function c(f,h,x,M){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.size.value=h.size*x,f.scale.value=M*.5,h.map&&(f.map.value=h.map,e(h.map,f.uvTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function l(f,h){f.diffuse.value.copy(h.color),f.opacity.value=h.opacity,f.rotation.value=h.rotation,h.map&&(f.map.value=h.map,e(h.map,f.mapTransform)),h.alphaMap&&(f.alphaMap.value=h.alphaMap,e(h.alphaMap,f.alphaMapTransform)),h.alphaTest>0&&(f.alphaTest.value=h.alphaTest)}function d(f,h){f.specular.value.copy(h.specular),f.shininess.value=Math.max(h.shininess,1e-4)}function u(f,h){h.gradientMap&&(f.gradientMap.value=h.gradientMap)}function p(f,h){f.metalness.value=h.metalness,h.metalnessMap&&(f.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,f.metalnessMapTransform)),f.roughness.value=h.roughness,h.roughnessMap&&(f.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,f.roughnessMapTransform)),h.envMap&&(f.envMapIntensity.value=h.envMapIntensity)}function m(f,h,x){f.ior.value=h.ior,h.sheen>0&&(f.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),f.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(f.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,f.sheenColorMapTransform)),h.sheenRoughnessMap&&(f.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,f.sheenRoughnessMapTransform))),h.clearcoat>0&&(f.clearcoat.value=h.clearcoat,f.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(f.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,f.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(f.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===ze&&f.clearcoatNormalScale.value.negate())),h.dispersion>0&&(f.dispersion.value=h.dispersion),h.iridescence>0&&(f.iridescence.value=h.iridescence,f.iridescenceIOR.value=h.iridescenceIOR,f.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(f.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,f.iridescenceMapTransform)),h.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),h.transmission>0&&(f.transmission.value=h.transmission,f.transmissionSamplerMap.value=x.texture,f.transmissionSamplerSize.value.set(x.width,x.height),h.transmissionMap&&(f.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,f.transmissionMapTransform)),f.thickness.value=h.thickness,h.thicknessMap&&(f.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=h.attenuationDistance,f.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(f.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(f.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=h.specularIntensity,f.specularColor.value.copy(h.specularColor),h.specularColorMap&&(f.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,f.specularColorMapTransform)),h.specularIntensityMap&&(f.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,f.specularIntensityMapTransform))}function g(f,h){h.matcap&&(f.matcap.value=h.matcap)}function _(f,h){let x=t.get(h).light;f.referencePosition.value.setFromMatrixPosition(x.matrixWorld),f.nearDistance.value=x.shadow.camera.near,f.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function T_(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,M){let y=M.program;n.uniformBlockBinding(x,y)}function l(x,M){let y=s[x.id];y===void 0&&(g(x),y=d(x),s[x.id]=y,x.addEventListener("dispose",f));let R=M.program;n.updateUBOMapping(x,R);let C=t.render.frame;r[x.id]!==C&&(p(x),r[x.id]=C)}function d(x){let M=u();x.__bindingPointIndex=M;let y=i.createBuffer(),R=x.__size,C=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,y),y}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(x){let M=s[x.id],y=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let C=0,I=y.length;C<I;C++){let L=Array.isArray(y[C])?y[C]:[y[C]];for(let v=0,S=L.length;v<S;v++){let P=L[v];if(m(P,C,v,R)===!0){let F=P.__offset,B=Array.isArray(P.value)?P.value:[P.value],b=0;for(let T=0;T<B.length;T++){let w=B[T],z=_(w);typeof w=="number"||typeof w=="boolean"?(P.__data[0]=w,i.bufferSubData(i.UNIFORM_BUFFER,F+b,P.__data)):w.isMatrix3?(P.__data[0]=w.elements[0],P.__data[1]=w.elements[1],P.__data[2]=w.elements[2],P.__data[3]=0,P.__data[4]=w.elements[3],P.__data[5]=w.elements[4],P.__data[6]=w.elements[5],P.__data[7]=0,P.__data[8]=w.elements[6],P.__data[9]=w.elements[7],P.__data[10]=w.elements[8],P.__data[11]=0):(w.toArray(P.__data,b),b+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,P.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(x,M,y,R){let C=x.value,I=M+"_"+y;if(R[I]===void 0)return typeof C=="number"||typeof C=="boolean"?R[I]=C:R[I]=C.clone(),!0;{let L=R[I];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return R[I]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(x){let M=x.uniforms,y=0,R=16;for(let I=0,L=M.length;I<L;I++){let v=Array.isArray(M[I])?M[I]:[M[I]];for(let S=0,P=v.length;S<P;S++){let F=v[S],B=Array.isArray(F.value)?F.value:[F.value];for(let b=0,T=B.length;b<T;b++){let w=B[b],z=_(w),N=y%R,V=N%z.boundary,O=N+V;y+=V,O!==0&&R-O<z.storage&&(y+=R-O),F.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=z.storage}}}let C=y%R;return C>0&&(y+=R-C),x.__size=y,x.__cache={},this}function _(x){let M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function f(x){let M=x.target;M.removeEventListener("dispose",f);let y=o.indexOf(M.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function h(){for(let x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:c,update:l,dispose:h}}var Ma=class{constructor(t={}){let{canvas:e=tu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let g=new Uint32Array(4),_=new Int32Array(4),f=null,h=null,x=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,R=!1;this._outputColorSpace=tn;let C=0,I=0,L=null,v=-1,S=null,P=new ve,F=new ve,B=null,b=new Kt(0),T=0,w=e.width,z=e.height,N=1,V=null,O=null,Z=new ve(0,0,w,z),rt=new ve(0,0,w,z),Q=!1,et=new hs,nt=!1,q=!1,X=new ae,ot=new H,ft=new ve,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Mt=!1;function Dt(){return L===null?N:1}let U=n;function Jt(A,G){return e.getContext(A,G)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"180"}`),e.addEventListener("webglcontextlost",mt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",ct,!1),U===null){let G="webgl2";if(U=Jt(G,A),U===null)throw Jt(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let Bt,Et,gt,de,Rt,Xt,we,Me,D,E,Y,j,at,K,Ut,pt,Pt,It,ut,St,kt,Lt,vt,Wt;function k(){Bt=new Wg(U),Bt.init(),Lt=new M_(U,Bt),Et=new Og(U,Bt,t,Lt),gt=new v_(U,Bt),Et.reversedDepthBuffer&&p&&gt.buffers.depth.setReversed(!0),de=new Yg(U),Rt=new o_,Xt=new y_(U,Bt,gt,Rt,Et,Lt,de),we=new zg(y),Me=new Gg(y),D=new jf(U),vt=new Fg(U,D),E=new Xg(U,D,de,vt),Y=new Jg(U,E,D,de),ut=new Zg(U,Et,Xt),pt=new Bg(Rt),j=new r_(y,we,Me,Bt,Et,vt,pt),at=new w_(y,Rt),K=new l_,Ut=new p_(Bt),It=new Ug(y,we,Me,gt,Y,m,c),Pt=new __(y,Y,Et),Wt=new T_(U,de,Et,gt),St=new Ng(U,Bt,de),kt=new qg(U,Bt,de),de.programs=j.programs,y.capabilities=Et,y.extensions=Bt,y.properties=Rt,y.renderLists=K,y.shadowMap=Pt,y.state=gt,y.info=de}k();let dt=new oc(y,U);this.xr=dt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let A=Bt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Bt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(A){A!==void 0&&(N=A,this.setSize(w,z,!1))},this.getSize=function(A){return A.set(w,z)},this.setSize=function(A,G,J=!0){if(dt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}w=A,z=G,e.width=Math.floor(A*N),e.height=Math.floor(G*N),J===!0&&(e.style.width=A+"px",e.style.height=G+"px"),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(w*N,z*N).floor()},this.setDrawingBufferSize=function(A,G,J){w=A,z=G,N=J,e.width=Math.floor(A*J),e.height=Math.floor(G*J),this.setViewport(0,0,A,G)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(Z)},this.setViewport=function(A,G,J,$){A.isVector4?Z.set(A.x,A.y,A.z,A.w):Z.set(A,G,J,$),gt.viewport(P.copy(Z).multiplyScalar(N).round())},this.getScissor=function(A){return A.copy(rt)},this.setScissor=function(A,G,J,$){A.isVector4?rt.set(A.x,A.y,A.z,A.w):rt.set(A,G,J,$),gt.scissor(F.copy(rt).multiplyScalar(N).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(A){gt.setScissorTest(Q=A)},this.setOpaqueSort=function(A){V=A},this.setTransparentSort=function(A){O=A},this.getClearColor=function(A){return A.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,J=!0){let $=0;if(A){let W=!1;if(L!==null){let ht=L.texture.format;W=ht===Ho||ht===Vo||ht===ko}if(W){let ht=L.texture.type,yt=ht===vn||ht===li||ht===ps||ht===gs||ht===Bo||ht===zo,At=It.getClearColor(),wt=It.getClearAlpha(),zt=At.r,Vt=At.g,Nt=At.b;yt?(g[0]=zt,g[1]=Vt,g[2]=Nt,g[3]=wt,U.clearBufferuiv(U.COLOR,0,g)):(_[0]=zt,_[1]=Vt,_[2]=Nt,_[3]=wt,U.clearBufferiv(U.COLOR,0,_))}else $|=U.COLOR_BUFFER_BIT}G&&($|=U.DEPTH_BUFFER_BIT),J&&($|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",mt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),It.dispose(),K.dispose(),Ut.dispose(),Rt.dispose(),we.dispose(),Me.dispose(),Y.dispose(),vt.dispose(),Wt.dispose(),j.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",yn),dt.removeEventListener("sessionend",Pc),gi.stop()};function mt(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;let A=de.autoReset,G=Pt.enabled,J=Pt.autoUpdate,$=Pt.needsUpdate,W=Pt.type;k(),de.autoReset=A,Pt.enabled=G,Pt.autoUpdate=J,Pt.needsUpdate=$,Pt.type=W}function ct(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function tt(A){let G=A.target;G.removeEventListener("dispose",tt),Ct(G)}function Ct(A){Ht(A),Rt.remove(A)}function Ht(A){let G=Rt.get(A).programs;G!==void 0&&(G.forEach(function(J){j.releaseProgram(J)}),A.isShaderMaterial&&j.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,J,$,W,ht){G===null&&(G=lt);let yt=W.isMesh&&W.matrixWorld.determinant()<0,At=Cd(A,G,J,$,W);gt.setMaterial($,yt);let wt=J.index,zt=1;if($.wireframe===!0){if(wt=E.getWireframeAttribute(J),wt===void 0)return;zt=2}let Vt=J.drawRange,Nt=J.attributes.position,$t=Vt.start*zt,oe=(Vt.start+Vt.count)*zt;ht!==null&&($t=Math.max($t,ht.start*zt),oe=Math.min(oe,(ht.start+ht.count)*zt)),wt!==null?($t=Math.max($t,0),oe=Math.min(oe,wt.count)):Nt!=null&&($t=Math.max($t,0),oe=Math.min(oe,Nt.count));let ye=oe-$t;if(ye<0||ye===1/0)return;vt.setup(W,$,At,J,wt);let he,le=St;if(wt!==null&&(he=D.get(wt),le=kt,le.setIndex(he)),W.isMesh)$.wireframe===!0?(gt.setLineWidth($.wireframeLinewidth*Dt()),le.setMode(U.LINES)):le.setMode(U.TRIANGLES);else if(W.isLine){let Ot=$.linewidth;Ot===void 0&&(Ot=1),gt.setLineWidth(Ot*Dt()),W.isLineSegments?le.setMode(U.LINES):W.isLineLoop?le.setMode(U.LINE_LOOP):le.setMode(U.LINE_STRIP)}else W.isPoints?le.setMode(U.POINTS):W.isSprite&&le.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)rs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))le.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Ot=W._multiDrawStarts,ge=W._multiDrawCounts,ee=W._multiDrawCount,$e=wt?D.get(wt).bytesPerElement:1,Hi=Rt.get($).currentProgram.getUniforms();for(let Ke=0;Ke<ee;Ke++)Hi.setValue(U,"_gl_DrawID",Ke),le.render(Ot[Ke]/$e,ge[Ke])}else if(W.isInstancedMesh)le.renderInstances($t,ye,W.count);else if(J.isInstancedBufferGeometry){let Ot=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,ge=Math.min(J.instanceCount,Ot);le.renderInstances($t,ye,ge)}else le.render($t,ye)};function ce(A,G,J){A.transparent===!0&&A.side===En&&A.forceSinglePass===!1?(A.side=ze,A.needsUpdate=!0,Pr(A,G,J),A.side=zn,A.needsUpdate=!0,Pr(A,G,J),A.side=En):Pr(A,G,J)}this.compile=function(A,G,J=null){J===null&&(J=A),h=Ut.get(J),h.init(G),M.push(h),J.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(h.pushLight(W),W.castShadow&&h.pushShadow(W))}),A!==J&&A.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(h.pushLight(W),W.castShadow&&h.pushShadow(W))}),h.setupLights();let $=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let ht=W.material;if(ht)if(Array.isArray(ht))for(let yt=0;yt<ht.length;yt++){let At=ht[yt];ce(At,J,W),$.add(At)}else ce(ht,J,W),$.add(ht)}),h=M.pop(),$},this.compileAsync=function(A,G,J=null){let $=this.compile(A,G,J);return new Promise(W=>{function ht(){if($.forEach(function(yt){Rt.get(yt).currentProgram.isReady()&&$.delete(yt)}),$.size===0){W(A);return}setTimeout(ht,10)}Bt.get("KHR_parallel_shader_compile")!==null?ht():setTimeout(ht,10)})};let ne=null;function In(A){ne&&ne(A)}function yn(){gi.stop()}function Pc(){gi.start()}let gi=new Lu;gi.setAnimationLoop(In),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(A){ne=A,dt.setAnimationLoop(A),A===null?gi.stop():gi.start()},dt.addEventListener("sessionstart",yn),dt.addEventListener("sessionend",Pc),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(G),G=dt.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,G,L),h=Ut.get(A,M.length),h.init(G),M.push(h),X.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),et.setFromProjectionMatrix(X,gn,G.reversedDepth),q=this.localClippingEnabled,nt=pt.init(this.clippingPlanes,q),f=K.get(A,x.length),f.init(),x.push(f),dt.enabled===!0&&dt.isPresenting===!0){let ht=y.xr.getDepthSensingMesh();ht!==null&&ka(ht,G,-1/0,y.sortObjects)}ka(A,G,0,y.sortObjects),f.finish(),y.sortObjects===!0&&f.sort(V,O),Mt=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,Mt&&It.addToRenderList(f,A),this.info.render.frame++,nt===!0&&pt.beginShadows();let J=h.state.shadowsArray;Pt.render(J,A,G),nt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();let $=f.opaque,W=f.transmissive;if(h.setupLights(),G.isArrayCamera){let ht=G.cameras;if(W.length>0)for(let yt=0,At=ht.length;yt<At;yt++){let wt=ht[yt];Lc($,W,A,wt)}Mt&&It.render(A);for(let yt=0,At=ht.length;yt<At;yt++){let wt=ht[yt];Ic(f,A,wt,wt.viewport)}}else W.length>0&&Lc($,W,A,G),Mt&&It.render(A),Ic(f,A,G);L!==null&&I===0&&(Xt.updateMultisampleRenderTarget(L),Xt.updateRenderTargetMipmap(L)),A.isScene===!0&&A.onAfterRender(y,A,G),vt.resetDefaultState(),v=-1,S=null,M.pop(),M.length>0?(h=M[M.length-1],nt===!0&&pt.setGlobalState(y.clippingPlanes,h.state.camera)):h=null,x.pop(),x.length>0?f=x[x.length-1]:f=null};function ka(A,G,J,$){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)J=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLight)h.pushLight(A),A.castShadow&&h.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||et.intersectsSprite(A)){$&&ft.setFromMatrixPosition(A.matrixWorld).applyMatrix4(X);let yt=Y.update(A),At=A.material;At.visible&&f.push(A,yt,At,J,ft.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||et.intersectsObject(A))){let yt=Y.update(A),At=A.material;if($&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),ft.copy(A.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),ft.copy(yt.boundingSphere.center)),ft.applyMatrix4(A.matrixWorld).applyMatrix4(X)),Array.isArray(At)){let wt=yt.groups;for(let zt=0,Vt=wt.length;zt<Vt;zt++){let Nt=wt[zt],$t=At[Nt.materialIndex];$t&&$t.visible&&f.push(A,yt,$t,J,ft.z,Nt)}}else At.visible&&f.push(A,yt,At,J,ft.z,null)}}let ht=A.children;for(let yt=0,At=ht.length;yt<At;yt++)ka(ht[yt],G,J,$)}function Ic(A,G,J,$){let W=A.opaque,ht=A.transmissive,yt=A.transparent;h.setupLightsView(J),nt===!0&&pt.setGlobalState(y.clippingPlanes,J),$&&gt.viewport(P.copy($)),W.length>0&&Rr(W,G,J),ht.length>0&&Rr(ht,G,J),yt.length>0&&Rr(yt,G,J),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function Lc(A,G,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[$.id]===void 0&&(h.state.transmissionRenderTarget[$.id]=new Mn(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?ms:vn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));let ht=h.state.transmissionRenderTarget[$.id],yt=$.viewport||P;ht.setSize(yt.z*y.transmissionResolutionScale,yt.w*y.transmissionResolutionScale);let At=y.getRenderTarget(),wt=y.getActiveCubeFace(),zt=y.getActiveMipmapLevel();y.setRenderTarget(ht),y.getClearColor(b),T=y.getClearAlpha(),T<1&&y.setClearColor(16777215,.5),y.clear(),Mt&&It.render(J);let Vt=y.toneMapping;y.toneMapping=qn;let Nt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),h.setupLightsView($),nt===!0&&pt.setGlobalState(y.clippingPlanes,$),Rr(A,J,$),Xt.updateMultisampleRenderTarget(ht),Xt.updateRenderTargetMipmap(ht),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let oe=0,ye=G.length;oe<ye;oe++){let he=G[oe],le=he.object,Ot=he.geometry,ge=he.material,ee=he.group;if(ge.side===En&&le.layers.test($.layers)){let $e=ge.side;ge.side=ze,ge.needsUpdate=!0,Dc(le,J,$,Ot,ge,ee),ge.side=$e,ge.needsUpdate=!0,$t=!0}}$t===!0&&(Xt.updateMultisampleRenderTarget(ht),Xt.updateRenderTargetMipmap(ht))}y.setRenderTarget(At,wt,zt),y.setClearColor(b,T),Nt!==void 0&&($.viewport=Nt),y.toneMapping=Vt}function Rr(A,G,J){let $=G.isScene===!0?G.overrideMaterial:null;for(let W=0,ht=A.length;W<ht;W++){let yt=A[W],At=yt.object,wt=yt.geometry,zt=yt.group,Vt=yt.material;Vt.allowOverride===!0&&$!==null&&(Vt=$),At.layers.test(J.layers)&&Dc(At,G,J,wt,Vt,zt)}}function Dc(A,G,J,$,W,ht){A.onBeforeRender(y,G,J,$,W,ht),A.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(y,G,J,$,A,ht),W.transparent===!0&&W.side===En&&W.forceSinglePass===!1?(W.side=ze,W.needsUpdate=!0,y.renderBufferDirect(J,G,$,W,A,ht),W.side=zn,W.needsUpdate=!0,y.renderBufferDirect(J,G,$,W,A,ht),W.side=En):y.renderBufferDirect(J,G,$,W,A,ht),A.onAfterRender(y,G,J,$,W,ht)}function Pr(A,G,J){G.isScene!==!0&&(G=lt);let $=Rt.get(A),W=h.state.lights,ht=h.state.shadowsArray,yt=W.state.version,At=j.getParameters(A,W.state,ht,G,J),wt=j.getProgramCacheKey(At),zt=$.programs;$.environment=A.isMeshStandardMaterial?G.environment:null,$.fog=G.fog,$.envMap=(A.isMeshStandardMaterial?Me:we).get(A.envMap||$.environment),$.envMapRotation=$.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,zt===void 0&&(A.addEventListener("dispose",tt),zt=new Map,$.programs=zt);let Vt=zt.get(wt);if(Vt!==void 0){if($.currentProgram===Vt&&$.lightsStateVersion===yt)return Fc(A,At),Vt}else At.uniforms=j.getUniforms(A),A.onBeforeCompile(At,y),Vt=j.acquireProgram(At,wt),zt.set(wt,Vt),$.uniforms=At.uniforms;let Nt=$.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Nt.clippingPlanes=pt.uniform),Fc(A,At),$.needsLights=Pd(A),$.lightsStateVersion=yt,$.needsLights&&(Nt.ambientLightColor.value=W.state.ambient,Nt.lightProbe.value=W.state.probe,Nt.directionalLights.value=W.state.directional,Nt.directionalLightShadows.value=W.state.directionalShadow,Nt.spotLights.value=W.state.spot,Nt.spotLightShadows.value=W.state.spotShadow,Nt.rectAreaLights.value=W.state.rectArea,Nt.ltc_1.value=W.state.rectAreaLTC1,Nt.ltc_2.value=W.state.rectAreaLTC2,Nt.pointLights.value=W.state.point,Nt.pointLightShadows.value=W.state.pointShadow,Nt.hemisphereLights.value=W.state.hemi,Nt.directionalShadowMap.value=W.state.directionalShadowMap,Nt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Nt.spotShadowMap.value=W.state.spotShadowMap,Nt.spotLightMatrix.value=W.state.spotLightMatrix,Nt.spotLightMap.value=W.state.spotLightMap,Nt.pointShadowMap.value=W.state.pointShadowMap,Nt.pointShadowMatrix.value=W.state.pointShadowMatrix),$.currentProgram=Vt,$.uniformsList=null,Vt}function Uc(A){if(A.uniformsList===null){let G=A.currentProgram.getUniforms();A.uniformsList=Ms.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Fc(A,G){let J=Rt.get(A);J.outputColorSpace=G.outputColorSpace,J.batching=G.batching,J.batchingColor=G.batchingColor,J.instancing=G.instancing,J.instancingColor=G.instancingColor,J.instancingMorph=G.instancingMorph,J.skinning=G.skinning,J.morphTargets=G.morphTargets,J.morphNormals=G.morphNormals,J.morphColors=G.morphColors,J.morphTargetsCount=G.morphTargetsCount,J.numClippingPlanes=G.numClippingPlanes,J.numIntersection=G.numClipIntersection,J.vertexAlphas=G.vertexAlphas,J.vertexTangents=G.vertexTangents,J.toneMapping=G.toneMapping}function Cd(A,G,J,$,W){G.isScene!==!0&&(G=lt),Xt.resetTextureUnits();let ht=G.fog,yt=$.isMeshStandardMaterial?G.environment:null,At=L===null?y.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:wi,wt=($.isMeshStandardMaterial?Me:we).get($.envMap||yt),zt=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Vt=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Nt=!!J.morphAttributes.position,$t=!!J.morphAttributes.normal,oe=!!J.morphAttributes.color,ye=qn;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ye=y.toneMapping);let he=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,le=he!==void 0?he.length:0,Ot=Rt.get($),ge=h.state.lights;if(nt===!0&&(q===!0||A!==S)){let Ne=A===S&&$.id===v;pt.setState($,A,Ne)}let ee=!1;$.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==ge.state.version||Ot.outputColorSpace!==At||W.isBatchedMesh&&Ot.batching===!1||!W.isBatchedMesh&&Ot.batching===!0||W.isBatchedMesh&&Ot.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Ot.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Ot.instancing===!1||!W.isInstancedMesh&&Ot.instancing===!0||W.isSkinnedMesh&&Ot.skinning===!1||!W.isSkinnedMesh&&Ot.skinning===!0||W.isInstancedMesh&&Ot.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Ot.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Ot.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Ot.instancingMorph===!1&&W.morphTexture!==null||Ot.envMap!==wt||$.fog===!0&&Ot.fog!==ht||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==pt.numPlanes||Ot.numIntersection!==pt.numIntersection)||Ot.vertexAlphas!==zt||Ot.vertexTangents!==Vt||Ot.morphTargets!==Nt||Ot.morphNormals!==$t||Ot.morphColors!==oe||Ot.toneMapping!==ye||Ot.morphTargetsCount!==le)&&(ee=!0):(ee=!0,Ot.__version=$.version);let $e=Ot.currentProgram;ee===!0&&($e=Pr($,G,W));let Hi=!1,Ke=!1,Is=!1,_e=$e.getUniforms(),rn=Ot.uniforms;if(gt.useProgram($e.program)&&(Hi=!0,Ke=!0,Is=!0),$.id!==v&&(v=$.id,Ke=!0),Hi||S!==A){gt.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),_e.setValue(U,"projectionMatrix",A.projectionMatrix),_e.setValue(U,"viewMatrix",A.matrixWorldInverse);let Ge=_e.map.cameraPosition;Ge!==void 0&&Ge.setValue(U,ot.setFromMatrixPosition(A.matrixWorld)),Et.logarithmicDepthBuffer&&_e.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&_e.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,Ke=!0,Is=!0)}if(W.isSkinnedMesh){_e.setOptional(U,W,"bindMatrix"),_e.setOptional(U,W,"bindMatrixInverse");let Ne=W.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),_e.setValue(U,"boneTexture",Ne.boneTexture,Xt))}W.isBatchedMesh&&(_e.setOptional(U,W,"batchingTexture"),_e.setValue(U,"batchingTexture",W._matricesTexture,Xt),_e.setOptional(U,W,"batchingIdTexture"),_e.setValue(U,"batchingIdTexture",W._indirectTexture,Xt),_e.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&_e.setValue(U,"batchingColorTexture",W._colorsTexture,Xt));let on=J.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&ut.update(W,J,$e),(Ke||Ot.receiveShadow!==W.receiveShadow)&&(Ot.receiveShadow=W.receiveShadow,_e.setValue(U,"receiveShadow",W.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(rn.envMap.value=wt,rn.flipEnvMap.value=wt.isCubeTexture&&wt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&G.environment!==null&&(rn.envMapIntensity.value=G.environmentIntensity),Ke&&(_e.setValue(U,"toneMappingExposure",y.toneMappingExposure),Ot.needsLights&&Rd(rn,Is),ht&&$.fog===!0&&at.refreshFogUniforms(rn,ht),at.refreshMaterialUniforms(rn,$,N,z,h.state.transmissionRenderTarget[A.id]),Ms.upload(U,Uc(Ot),rn,Xt)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Ms.upload(U,Uc(Ot),rn,Xt),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&_e.setValue(U,"center",W.center),_e.setValue(U,"modelViewMatrix",W.modelViewMatrix),_e.setValue(U,"normalMatrix",W.normalMatrix),_e.setValue(U,"modelMatrix",W.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){let Ne=$.uniformsGroups;for(let Ge=0,Va=Ne.length;Ge<Va;Ge++){let _i=Ne[Ge];Wt.update(_i,$e),Wt.bind(_i,$e)}}return $e}function Rd(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function Pd(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(A,G,J){let $=Rt.get(A);$.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Rt.get(A.texture).__webglTexture=G,Rt.get(A.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:J,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){let J=Rt.get(A);J.__webglFramebuffer=G,J.__useDefaultFramebuffer=G===void 0};let Id=U.createFramebuffer();this.setRenderTarget=function(A,G=0,J=0){L=A,C=G,I=J;let $=!0,W=null,ht=!1,yt=!1;if(A){let wt=Rt.get(A);if(wt.__useDefaultFramebuffer!==void 0)gt.bindFramebuffer(U.FRAMEBUFFER,null),$=!1;else if(wt.__webglFramebuffer===void 0)Xt.setupRenderTarget(A);else if(wt.__hasExternalTextures)Xt.rebindTextures(A,Rt.get(A.texture).__webglTexture,Rt.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Nt=A.depthTexture;if(wt.__boundDepthTexture!==Nt){if(Nt!==null&&Rt.has(Nt)&&(A.width!==Nt.image.width||A.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Xt.setupDepthRenderbuffer(A)}}let zt=A.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(yt=!0);let Vt=Rt.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[G])?W=Vt[G][J]:W=Vt[G],ht=!0):A.samples>0&&Xt.useMultisampledRTT(A)===!1?W=Rt.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?W=Vt[J]:W=Vt,P.copy(A.viewport),F.copy(A.scissor),B=A.scissorTest}else P.copy(Z).multiplyScalar(N).floor(),F.copy(rt).multiplyScalar(N).floor(),B=Q;if(J!==0&&(W=Id),gt.bindFramebuffer(U.FRAMEBUFFER,W)&&$&&gt.drawBuffers(A,W),gt.viewport(P),gt.scissor(F),gt.setScissorTest(B),ht){let wt=Rt.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+G,wt.__webglTexture,J)}else if(yt){let wt=G;for(let zt=0;zt<A.textures.length;zt++){let Vt=Rt.get(A.textures[zt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+zt,Vt.__webglTexture,J,wt)}}else if(A!==null&&J!==0){let wt=Rt.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,wt.__webglTexture,J)}v=-1},this.readRenderTargetPixels=function(A,G,J,$,W,ht,yt,At=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Rt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&yt!==void 0&&(wt=wt[yt]),wt){gt.bindFramebuffer(U.FRAMEBUFFER,wt);try{let zt=A.textures[At],Vt=zt.format,Nt=zt.type;if(!Et.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Et.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-$&&J>=0&&J<=A.height-W&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+At),U.readPixels(G,J,$,W,Lt.convert(Vt),Lt.convert(Nt),ht))}finally{let zt=L!==null?Rt.get(L).__webglFramebuffer:null;gt.bindFramebuffer(U.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(A,G,J,$,W,ht,yt,At=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Rt.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&yt!==void 0&&(wt=wt[yt]),wt)if(G>=0&&G<=A.width-$&&J>=0&&J<=A.height-W){gt.bindFramebuffer(U.FRAMEBUFFER,wt);let zt=A.textures[At],Vt=zt.format,Nt=zt.type;if(!Et.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Et.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let $t=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,$t),U.bufferData(U.PIXEL_PACK_BUFFER,ht.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+At),U.readPixels(G,J,$,W,Lt.convert(Vt),Lt.convert(Nt),0);let oe=L!==null?Rt.get(L).__webglFramebuffer:null;gt.bindFramebuffer(U.FRAMEBUFFER,oe);let ye=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await eu(U,ye,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,$t),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ht),U.deleteBuffer($t),U.deleteSync(ye),ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,J=0){let $=Math.pow(2,-J),W=Math.floor(A.image.width*$),ht=Math.floor(A.image.height*$),yt=G!==null?G.x:0,At=G!==null?G.y:0;Xt.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,yt,At,W,ht),gt.unbindTexture()};let Ld=U.createFramebuffer(),Dd=U.createFramebuffer();this.copyTextureToTexture=function(A,G,J=null,$=null,W=0,ht=null){ht===null&&(W!==0?(rs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ht=W,W=0):ht=0);let yt,At,wt,zt,Vt,Nt,$t,oe,ye,he=A.isCompressedTexture?A.mipmaps[ht]:A.image;if(J!==null)yt=J.max.x-J.min.x,At=J.max.y-J.min.y,wt=J.isBox3?J.max.z-J.min.z:1,zt=J.min.x,Vt=J.min.y,Nt=J.isBox3?J.min.z:0;else{let on=Math.pow(2,-W);yt=Math.floor(he.width*on),At=Math.floor(he.height*on),A.isDataArrayTexture?wt=he.depth:A.isData3DTexture?wt=Math.floor(he.depth*on):wt=1,zt=0,Vt=0,Nt=0}$!==null?($t=$.x,oe=$.y,ye=$.z):($t=0,oe=0,ye=0);let le=Lt.convert(G.format),Ot=Lt.convert(G.type),ge;G.isData3DTexture?(Xt.setTexture3D(G,0),ge=U.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(Xt.setTexture2DArray(G,0),ge=U.TEXTURE_2D_ARRAY):(Xt.setTexture2D(G,0),ge=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,G.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,G.unpackAlignment);let ee=U.getParameter(U.UNPACK_ROW_LENGTH),$e=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Hi=U.getParameter(U.UNPACK_SKIP_PIXELS),Ke=U.getParameter(U.UNPACK_SKIP_ROWS),Is=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,he.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,he.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,zt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Vt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Nt);let _e=A.isDataArrayTexture||A.isData3DTexture,rn=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){let on=Rt.get(A),Ne=Rt.get(G),Ge=Rt.get(on.__renderTarget),Va=Rt.get(Ne.__renderTarget);gt.bindFramebuffer(U.READ_FRAMEBUFFER,Ge.__webglFramebuffer),gt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Va.__webglFramebuffer);for(let _i=0;_i<wt;_i++)_e&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Rt.get(A).__webglTexture,W,Nt+_i),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Rt.get(G).__webglTexture,ht,ye+_i)),U.blitFramebuffer(zt,Vt,yt,At,$t,oe,yt,At,U.DEPTH_BUFFER_BIT,U.NEAREST);gt.bindFramebuffer(U.READ_FRAMEBUFFER,null),gt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||Rt.has(A)){let on=Rt.get(A),Ne=Rt.get(G);gt.bindFramebuffer(U.READ_FRAMEBUFFER,Ld),gt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Dd);for(let Ge=0;Ge<wt;Ge++)_e?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,on.__webglTexture,W,Nt+Ge):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,on.__webglTexture,W),rn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ne.__webglTexture,ht,ye+Ge):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ne.__webglTexture,ht),W!==0?U.blitFramebuffer(zt,Vt,yt,At,$t,oe,yt,At,U.COLOR_BUFFER_BIT,U.NEAREST):rn?U.copyTexSubImage3D(ge,ht,$t,oe,ye+Ge,zt,Vt,yt,At):U.copyTexSubImage2D(ge,ht,$t,oe,zt,Vt,yt,At);gt.bindFramebuffer(U.READ_FRAMEBUFFER,null),gt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else rn?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(ge,ht,$t,oe,ye,yt,At,wt,le,Ot,he.data):G.isCompressedArrayTexture?U.compressedTexSubImage3D(ge,ht,$t,oe,ye,yt,At,wt,le,he.data):U.texSubImage3D(ge,ht,$t,oe,ye,yt,At,wt,le,Ot,he):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ht,$t,oe,yt,At,le,Ot,he.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ht,$t,oe,he.width,he.height,le,he.data):U.texSubImage2D(U.TEXTURE_2D,ht,$t,oe,yt,At,le,Ot,he);U.pixelStorei(U.UNPACK_ROW_LENGTH,ee),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,$e),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Hi),U.pixelStorei(U.UNPACK_SKIP_ROWS,Ke),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Is),ht===0&&G.generateMipmaps&&U.generateMipmap(ge),gt.unbindTexture()},this.initRenderTarget=function(A){Rt.get(A).__webglFramebuffer===void 0&&Xt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Xt.setTextureCube(A,0):A.isData3DTexture?Xt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Xt.setTexture2DArray(A,0):Xt.setTexture2D(A,0),gt.unbindTexture()},this.resetState=function(){C=0,I=0,L=null,gt.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}};function Bu(i){for(let t=0;t<i.length-1;t++){let e=(t+1)%i.length,n=i[t],s=i[e];n[0]===s[0]&&n[1]===s[1]&&(i.splice(e,1),t--)}return i}function Ni(i){return i?.length??null}function zu(i){let t={...i};switch(delete t.type,delete t.bbox,i.type){case"Point":case"MultiPoint":case"LineString":case"MultiLineString":case"Polygon":case"MultiPolygon":delete t.coordinates;break;case"GeometryCollection":delete t.geometries;break;case"Feature":delete t.id,delete t.properties,delete t.geometry;break;case"FeatureCollection":delete t.features;break}return t}function ba(i,t){switch(t(i),i.type){case"GeometryCollection":case"FeatureCollection":i.data.forEach(e=>ba(e,t));break;case"Feature":ba(i.data,t);break}}function Ea(i,t,e="grid"){let n=[];for(let s=0,r=i.length;s<r-1;s++){let o=(s+1)%r,a=i[s],c=i[o],l=c[0]-a[0],d=c[1]-a[1],u;if(e==="grid"){let g=Math.sqrt(l**2+d**2);u=Math.ceil(g/t)}else{let g=(a[1]+c[1])/2,_=t,f=t/Math.sin(Math.PI/2+hn.DEG2RAD*g),h=Math.abs(d/_),x=Math.abs(l/f);u=Math.ceil(Math.max(x,h))}n.push(a);let[p,m]=a;for(let g=1;g<u;g++)n.push([p+l*g/u,m+d*g/u])}return n.push(i[i.length-1]),n}function A_(i){let t=i.length,e=0;for(let n=t-1,s=0;s<t;n=s++)e+=i[n][0]*i[s][1]-i[s][0]*i[n][1];return e*.5}function lc(i){return A_(i)<0}function Ou(i,t,e){let n=0;for(let s=0,r=i.length;s<r;s++){let o=(s+1)%r,a=i[s],c=i[o],l=a[0]-t,d=a[1]-e,u=c[0]-t,p=c[1]-e,m=Math.sqrt(l**2+d**2),g=Math.sqrt(u**2+p**2);l/=m,d/=m,u/=g,p/=g,n+=Math.atan2(l*p-d*u,l*u+d*p)}return Math.abs(n)}function ku(i,t,e){let[n,...s]=i;if(!(Ou(n,t,e)>3.14))return!1;for(let o=0,a=s.length;o<a;o++)if(Ou(s[o],t,e)>3.14)return!1;return!0}function Vu(i){if(i){if(i.length===4){let t=new Pe;return t.min.set(i[0],i[1],0),t.max.set(i[2],i[3],0),t}else if(i.length===6){let t=new Pe;return t.min.set(i[0],i[1],i[2]),t.max.set(i[3],i[4],i[5]),t}}else return null}var ci=new H,cc=new Pe;function wa(i,t){cc.makeEmpty();for(let e=0,n=i.length;e<n;e+=3)ci.x=i[e+0],ci.y=i[e+1],ci.z=i[e+2],cc.expandByPoint(ci);cc.getCenter(t)}function Ta(i,t){for(let e=0,n=i.length;e<n;e+=3){let s=i[e+0],r=i[e+1],o=i[e+2];t.getCartographicToPosition(r*hn.DEG2RAD,s*hn.DEG2RAD,o,ci),i[e+0]=ci.x,i[e+1]=ci.y,i[e+2]=ci.z}}function Aa(i,t,e,n){for(let s=0,r=i.length;s<r;s+=3)i[s+0]+=t,i[s+1]+=e,i[s+2]+=n}var Hu=new H;function Ca(i,t={}){let{flat:e=!1,offset:n=0,ellipsoid:s=null,resolution:r=null,altitudeScale:o=1,groups:a=null}=t;r!==null&&(i=i.map(m=>Ea(m,r)));let c=0;i.forEach(m=>{let g=m.length-1;c+=g*2});let l=0,d=new Array(c*3),u=[];i.forEach(m=>{let g=m.length,_=g-1;for(let f=0;f<_;f++){let h=(f+1)%g,x=m[f],M=m[h];d[l+0]=x[0],d[l+1]=x[1],d[l+2]=(e?0:x[2]||0)*o+n,d[l+3]=M[0],d[l+4]=M[1],d[l+5]=(e?0:M[2]||0)*o+n,l+=6}u.push(_*2)}),s&&Ta(d,s);let p=new Ks;if(wa(d,p.position),Hu.copy(p.position).multiplyScalar(-1),Aa(d,...Hu),p.geometry.setAttribute("position",new Ae(new Float32Array(d),3,!1)),a){let m=[...a],g=0,_=0;for(;m.length;){let f=m.shift()||0,h=0;for(;f!==0;)h+=u.shift()||0,f--;p.geometry.addGroup(g,h,_),_++,g+=h}}return p}var Ue=63710088e-1,HM={centimeters:Ue*100,centimetres:Ue*100,degrees:360/(2*Math.PI),feet:Ue*3.28084,inches:Ue*39.37,kilometers:Ue/1e3,kilometres:Ue/1e3,meters:Ue,metres:Ue,miles:Ue/1609.344,millimeters:Ue*1e3,millimetres:Ue*1e3,nauticalmiles:Ue/1852,radians:1,yards:Ue*1.0936};function Ra(i,t,e={}){let n={type:"Feature"};return(e.id===0||e.id)&&(n.id=e.id),e.bbox&&(n.bbox=e.bbox),n.properties=t||{},n.geometry=i,n}function xr(i,t,e={}){for(let s of i){if(s.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");if(s[s.length-1].length!==s[0].length)throw new Error("First and last Position are not equivalent.");for(let r=0;r<s[s.length-1].length;r++)if(s[s.length-1][r]!==s[0][r])throw new Error("First and last Position are not equivalent.")}return Ra({type:"Polygon",coordinates:i},t,e)}function vr(i,t={}){let e={type:"FeatureCollection"};return t.id&&(e.id=t.id),t.bbox&&(e.bbox=t.bbox),e.features=i,e}function Gu(i,t){if(i.type==="Feature")t(i,0);else if(i.type==="FeatureCollection")for(var e=0;e<i.features.length&&t(i.features[e],e)!==!1;e++);}function Wu(i,t){var e,n,s,r,o,a,c,l,d,u,p=0,m=i.type==="FeatureCollection",g=i.type==="Feature",_=m?i.features.length:1;for(e=0;e<_;e++){for(a=m?i.features[e].geometry:g?i.geometry:i,l=m?i.features[e].properties:g?i.properties:{},d=m?i.features[e].bbox:g?i.bbox:void 0,u=m?i.features[e].id:g?i.id:void 0,c=a?a.type==="GeometryCollection":!1,o=c?a.geometries.length:1,s=0;s<o;s++){if(r=c?a.geometries[s]:a,r===null){if(t(null,p,l,d,u)===!1)return!1;continue}switch(r.type){case"Point":case"LineString":case"MultiPoint":case"Polygon":case"MultiLineString":case"MultiPolygon":{if(t(r,p,l,d,u)===!1)return!1;break}case"GeometryCollection":{for(n=0;n<r.geometries.length;n++)if(t(r.geometries[n],p,l,d,u)===!1)return!1;break}default:throw new Error("Unknown Geometry Type")}}p++}}function Xu(i,t,e){var n=e;return Wu(i,function(s,r,o,a,c){r===0&&e===void 0?n=s:n=t(n,s,r,o,a,c)}),n}function qu(i,t){Wu(i,function(e,n,s,r,o){var a=e===null?null:e.type;switch(a){case null:case"Point":case"LineString":case"Polygon":return t(Ra(e,s,{bbox:r,id:o}),n,0)===!1?!1:void 0}var c;switch(a){case"MultiPoint":c="Point";break;case"MultiLineString":c="LineString";break;case"MultiPolygon":c="Polygon";break}for(var l=0;l<e.coordinates.length;l++){var d=e.coordinates[l],u={type:c,coordinates:d};if(t(Ra(u,s),n,l)===!1)return!1}})}var rd=Oc(dc(),1);function Ju(i){return Xu(i,(t,e)=>t+C_(e),0)}function C_(i){let t=0,e;switch(i.type){case"Polygon":return Yu(i.coordinates);case"MultiPolygon":for(e=0;e<i.coordinates.length;e++)t+=Yu(i.coordinates[e]);return t;case"Point":case"MultiPoint":case"LineString":case"MultiLineString":return 0}return 0}function Yu(i){let t=0;if(i&&i.length>0){t+=Math.abs(Zu(i[0]));for(let e=1;e<i.length;e++)t-=Math.abs(Zu(i[e]))}return t}var R_=Ue*Ue/2,fc=Math.PI/180;function Zu(i){let t=i.length-1;if(t<=2)return 0;let e=0,n=0;for(;n<t;){let s=i[n],r=i[n+1===t?0:n+1],o=i[n+2>=t?(n+2)%t:n+2],a=s[0]*fc,c=r[1]*fc,l=o[0]*fc;e+=(l-a)*Math.sin(c),n++}return e*R_}var Qt=11102230246251565e-32,_t=134217729,bs=(3+8*Qt)*Qt;function fe(i,t,e,n,s){let r,o,a,c,l=t[0],d=n[0],u=0,p=0;d>l==d>-l?(r=l,l=t[++u]):(r=d,d=n[++p]);let m=0;if(u<i&&p<e)for(d>l==d>-l?(o=l+r,a=r-(o-l),l=t[++u]):(o=d+r,a=r-(o-d),d=n[++p]),r=o,a!==0&&(s[m++]=a);u<i&&p<e;)d>l==d>-l?(o=r+l,c=o-r,a=r-(o-c)+(l-c),l=t[++u]):(o=r+d,c=o-r,a=r-(o-c)+(d-c),d=n[++p]),r=o,a!==0&&(s[m++]=a);for(;u<i;)o=r+l,c=o-r,a=r-(o-c)+(l-c),l=t[++u],r=o,a!==0&&(s[m++]=a);for(;p<e;)o=r+d,c=o-r,a=r-(o-c)+(d-c),d=n[++p],r=o,a!==0&&(s[m++]=a);return(r!==0||m===0)&&(s[m++]=r),m}function Xe(i,t,e,n,s,r,o,a){return fe(fe(i,t,e,n,o),o,s,r,a)}function it(i,t,e,n){let s,r,o,a,c,l,d,u,p,m,g;d=_t*e,m=d-(d-e),g=e-m;let _=t[0];s=_*e,d=_t*_,u=d-(d-_),p=_-u,o=p*g-(s-u*m-p*m-u*g);let f=0;o!==0&&(n[f++]=o);for(let h=1;h<i;h++)_=t[h],a=_*e,d=_t*_,u=d-(d-_),p=_-u,c=p*g-(a-u*m-p*m-u*g),r=s+c,l=r-s,o=s-(r-l)+(c-l),o!==0&&(n[f++]=o),s=a+r,o=r-(s-a),o!==0&&(n[f++]=o);return(s!==0||f===0)&&(n[f++]=s),f}function Es(i,t){let e=t[0];for(let n=1;n<i;n++)e+=t[n];return e}function st(i){return new Float64Array(i)}var P_=(3+16*Qt)*Qt,I_=(2+12*Qt)*Qt,L_=(9+64*Qt)*Qt*Qt,ws=st(4),$u=st(8),Ku=st(12),Qu=st(16),ke=st(4);function D_(i,t,e,n,s,r,o){let a,c,l,d,u,p,m,g,_,f,h,x,M,y,R,C,I,L,v=i-s,S=e-s,P=t-r,F=n-r;y=v*F,p=_t*v,m=p-(p-v),g=v-m,p=_t*F,_=p-(p-F),f=F-_,R=g*f-(y-m*_-g*_-m*f),C=P*S,p=_t*P,m=p-(p-P),g=P-m,p=_t*S,_=p-(p-S),f=S-_,I=g*f-(C-m*_-g*_-m*f),h=R-I,u=R-h,ws[0]=R-(h+u)+(u-I),x=y+h,u=x-y,M=y-(x-u)+(h-u),h=M-C,u=M-h,ws[1]=M-(h+u)+(u-C),L=x+h,u=L-x,ws[2]=x-(L-u)+(h-u),ws[3]=L;let B=Es(4,ws),b=I_*o;if(B>=b||-B>=b||(u=i-v,a=i-(v+u)+(u-s),u=e-S,l=e-(S+u)+(u-s),u=t-P,c=t-(P+u)+(u-r),u=n-F,d=n-(F+u)+(u-r),a===0&&c===0&&l===0&&d===0)||(b=L_*o+bs*Math.abs(B),B+=v*d+F*a-(P*l+S*c),B>=b||-B>=b))return B;y=a*F,p=_t*a,m=p-(p-a),g=a-m,p=_t*F,_=p-(p-F),f=F-_,R=g*f-(y-m*_-g*_-m*f),C=c*S,p=_t*c,m=p-(p-c),g=c-m,p=_t*S,_=p-(p-S),f=S-_,I=g*f-(C-m*_-g*_-m*f),h=R-I,u=R-h,ke[0]=R-(h+u)+(u-I),x=y+h,u=x-y,M=y-(x-u)+(h-u),h=M-C,u=M-h,ke[1]=M-(h+u)+(u-C),L=x+h,u=L-x,ke[2]=x-(L-u)+(h-u),ke[3]=L;let T=fe(4,ws,4,ke,$u);y=v*d,p=_t*v,m=p-(p-v),g=v-m,p=_t*d,_=p-(p-d),f=d-_,R=g*f-(y-m*_-g*_-m*f),C=P*l,p=_t*P,m=p-(p-P),g=P-m,p=_t*l,_=p-(p-l),f=l-_,I=g*f-(C-m*_-g*_-m*f),h=R-I,u=R-h,ke[0]=R-(h+u)+(u-I),x=y+h,u=x-y,M=y-(x-u)+(h-u),h=M-C,u=M-h,ke[1]=M-(h+u)+(u-C),L=x+h,u=L-x,ke[2]=x-(L-u)+(h-u),ke[3]=L;let w=fe(T,$u,4,ke,Ku);y=a*d,p=_t*a,m=p-(p-a),g=a-m,p=_t*d,_=p-(p-d),f=d-_,R=g*f-(y-m*_-g*_-m*f),C=c*l,p=_t*c,m=p-(p-c),g=c-m,p=_t*l,_=p-(p-l),f=l-_,I=g*f-(C-m*_-g*_-m*f),h=R-I,u=R-h,ke[0]=R-(h+u)+(u-I),x=y+h,u=x-y,M=y-(x-u)+(h-u),h=M-C,u=M-h,ke[1]=M-(h+u)+(u-C),L=x+h,u=L-x,ke[2]=x-(L-u)+(h-u),ke[3]=L;let z=fe(w,Ku,4,ke,Qu);return Qu[z-1]}function qe(i,t,e,n,s,r){let o=(t-r)*(e-s),a=(i-s)*(n-r),c=o-a,l=Math.abs(o+a);return Math.abs(c)>=P_*l?c:-D_(i,t,e,n,s,r,l)}var nS=(7+56*Qt)*Qt,iS=(3+28*Qt)*Qt,sS=(26+288*Qt)*Qt*Qt,rS=st(4),oS=st(4),aS=st(4),lS=st(4),cS=st(4),hS=st(4),uS=st(4),dS=st(4),fS=st(4),pS=st(8),mS=st(8),gS=st(8),_S=st(4),xS=st(8),vS=st(8),yS=st(8),MS=st(12),SS=st(192),bS=st(192);var U_=(10+96*Qt)*Qt,F_=(4+48*Qt)*Qt,N_=(44+576*Qt)*Qt*Qt,hi=st(4),ui=st(4),di=st(4),An=st(4),Cn=st(4),Rn=st(4),Ve=st(4),He=st(4),pc=st(8),mc=st(8),gc=st(8),_c=st(8),xc=st(8),vc=st(8),Pa=st(8),Ia=st(8),La=st(8),Oi=st(4),Bi=st(4),zi=st(4),bt=st(8),Ft=st(16),ie=st(16),se=st(16),jt=st(32),fi=st(32),pe=st(48),Ye=st(64),Ts=st(1152),yc=st(1152);function me(i,t,e){i=fe(i,Ts,t,e,yc);let n=Ts;return Ts=yc,yc=n,i}function O_(i,t,e,n,s,r,o,a,c){let l,d,u,p,m,g,_,f,h,x,M,y,R,C,I,L,v,S,P,F,B,b,T,w,z,N,V,O,Z,rt,Q,et,nt,q,X,ot=i-o,ft=e-o,lt=s-o,Mt=t-a,Dt=n-a,U=r-a;Q=ft*U,T=_t*ft,w=T-(T-ft),z=ft-w,T=_t*U,N=T-(T-U),V=U-N,et=z*V-(Q-w*N-z*N-w*V),nt=lt*Dt,T=_t*lt,w=T-(T-lt),z=lt-w,T=_t*Dt,N=T-(T-Dt),V=Dt-N,q=z*V-(nt-w*N-z*N-w*V),O=et-q,b=et-O,hi[0]=et-(O+b)+(b-q),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt-nt,b=rt-O,hi[1]=rt-(O+b)+(b-nt),X=Z+O,b=X-Z,hi[2]=Z-(X-b)+(O-b),hi[3]=X,Q=lt*Mt,T=_t*lt,w=T-(T-lt),z=lt-w,T=_t*Mt,N=T-(T-Mt),V=Mt-N,et=z*V-(Q-w*N-z*N-w*V),nt=ot*U,T=_t*ot,w=T-(T-ot),z=ot-w,T=_t*U,N=T-(T-U),V=U-N,q=z*V-(nt-w*N-z*N-w*V),O=et-q,b=et-O,ui[0]=et-(O+b)+(b-q),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt-nt,b=rt-O,ui[1]=rt-(O+b)+(b-nt),X=Z+O,b=X-Z,ui[2]=Z-(X-b)+(O-b),ui[3]=X,Q=ot*Dt,T=_t*ot,w=T-(T-ot),z=ot-w,T=_t*Dt,N=T-(T-Dt),V=Dt-N,et=z*V-(Q-w*N-z*N-w*V),nt=ft*Mt,T=_t*ft,w=T-(T-ft),z=ft-w,T=_t*Mt,N=T-(T-Mt),V=Mt-N,q=z*V-(nt-w*N-z*N-w*V),O=et-q,b=et-O,di[0]=et-(O+b)+(b-q),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt-nt,b=rt-O,di[1]=rt-(O+b)+(b-nt),X=Z+O,b=X-Z,di[2]=Z-(X-b)+(O-b),di[3]=X,l=fe(fe(fe(it(it(4,hi,ot,bt),bt,ot,Ft),Ft,it(it(4,hi,Mt,bt),bt,Mt,ie),ie,jt),jt,fe(it(it(4,ui,ft,bt),bt,ft,Ft),Ft,it(it(4,ui,Dt,bt),bt,Dt,ie),ie,fi),fi,Ye),Ye,fe(it(it(4,di,lt,bt),bt,lt,Ft),Ft,it(it(4,di,U,bt),bt,U,ie),ie,jt),jt,Ts);let Jt=Es(l,Ts),Bt=F_*c;if(Jt>=Bt||-Jt>=Bt||(b=i-ot,d=i-(ot+b)+(b-o),b=t-Mt,m=t-(Mt+b)+(b-a),b=e-ft,u=e-(ft+b)+(b-o),b=n-Dt,g=n-(Dt+b)+(b-a),b=s-lt,p=s-(lt+b)+(b-o),b=r-U,_=r-(U+b)+(b-a),d===0&&u===0&&p===0&&m===0&&g===0&&_===0)||(Bt=N_*c+bs*Math.abs(Jt),Jt+=(ot*ot+Mt*Mt)*(ft*_+U*u-(Dt*p+lt*g))+2*(ot*d+Mt*m)*(ft*U-Dt*lt)+((ft*ft+Dt*Dt)*(lt*m+Mt*p-(U*d+ot*_))+2*(ft*u+Dt*g)*(lt*Mt-U*ot))+((lt*lt+U*U)*(ot*g+Dt*d-(Mt*u+ft*m))+2*(lt*p+U*_)*(ot*Dt-Mt*ft)),Jt>=Bt||-Jt>=Bt))return Jt;if((u!==0||g!==0||p!==0||_!==0)&&(Q=ot*ot,T=_t*ot,w=T-(T-ot),z=ot-w,et=z*z-(Q-w*w-(w+w)*z),nt=Mt*Mt,T=_t*Mt,w=T-(T-Mt),z=Mt-w,q=z*z-(nt-w*w-(w+w)*z),O=et+q,b=O-et,An[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,An[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,An[2]=Z-(X-b)+(O-b),An[3]=X),(p!==0||_!==0||d!==0||m!==0)&&(Q=ft*ft,T=_t*ft,w=T-(T-ft),z=ft-w,et=z*z-(Q-w*w-(w+w)*z),nt=Dt*Dt,T=_t*Dt,w=T-(T-Dt),z=Dt-w,q=z*z-(nt-w*w-(w+w)*z),O=et+q,b=O-et,Cn[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,Cn[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,Cn[2]=Z-(X-b)+(O-b),Cn[3]=X),(d!==0||m!==0||u!==0||g!==0)&&(Q=lt*lt,T=_t*lt,w=T-(T-lt),z=lt-w,et=z*z-(Q-w*w-(w+w)*z),nt=U*U,T=_t*U,w=T-(T-U),z=U-w,q=z*z-(nt-w*w-(w+w)*z),O=et+q,b=O-et,Rn[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,Rn[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,Rn[2]=Z-(X-b)+(O-b),Rn[3]=X),d!==0&&(f=it(4,hi,d,pc),l=me(l,Xe(it(f,pc,2*ot,Ft),Ft,it(it(4,Rn,d,bt),bt,Dt,ie),ie,it(it(4,Cn,d,bt),bt,-U,se),se,jt,pe),pe)),m!==0&&(h=it(4,hi,m,mc),l=me(l,Xe(it(h,mc,2*Mt,Ft),Ft,it(it(4,Cn,m,bt),bt,lt,ie),ie,it(it(4,Rn,m,bt),bt,-ft,se),se,jt,pe),pe)),u!==0&&(x=it(4,ui,u,gc),l=me(l,Xe(it(x,gc,2*ft,Ft),Ft,it(it(4,An,u,bt),bt,U,ie),ie,it(it(4,Rn,u,bt),bt,-Mt,se),se,jt,pe),pe)),g!==0&&(M=it(4,ui,g,_c),l=me(l,Xe(it(M,_c,2*Dt,Ft),Ft,it(it(4,Rn,g,bt),bt,ot,ie),ie,it(it(4,An,g,bt),bt,-lt,se),se,jt,pe),pe)),p!==0&&(y=it(4,di,p,xc),l=me(l,Xe(it(y,xc,2*lt,Ft),Ft,it(it(4,Cn,p,bt),bt,Mt,ie),ie,it(it(4,An,p,bt),bt,-Dt,se),se,jt,pe),pe)),_!==0&&(R=it(4,di,_,vc),l=me(l,Xe(it(R,vc,2*U,Ft),Ft,it(it(4,An,_,bt),bt,ft,ie),ie,it(it(4,Cn,_,bt),bt,-ot,se),se,jt,pe),pe)),d!==0||m!==0){if(u!==0||g!==0||p!==0||_!==0?(Q=u*U,T=_t*u,w=T-(T-u),z=u-w,T=_t*U,N=T-(T-U),V=U-N,et=z*V-(Q-w*N-z*N-w*V),nt=ft*_,T=_t*ft,w=T-(T-ft),z=ft-w,T=_t*_,N=T-(T-_),V=_-N,q=z*V-(nt-w*N-z*N-w*V),O=et+q,b=O-et,Ve[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,Ve[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,Ve[2]=Z-(X-b)+(O-b),Ve[3]=X,Q=p*-Dt,T=_t*p,w=T-(T-p),z=p-w,T=_t*-Dt,N=T-(T- -Dt),V=-Dt-N,et=z*V-(Q-w*N-z*N-w*V),nt=lt*-g,T=_t*lt,w=T-(T-lt),z=lt-w,T=_t*-g,N=T-(T- -g),V=-g-N,q=z*V-(nt-w*N-z*N-w*V),O=et+q,b=O-et,He[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,He[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,He[2]=Z-(X-b)+(O-b),He[3]=X,I=fe(4,Ve,4,He,Ia),Q=u*_,T=_t*u,w=T-(T-u),z=u-w,T=_t*_,N=T-(T-_),V=_-N,et=z*V-(Q-w*N-z*N-w*V),nt=p*g,T=_t*p,w=T-(T-p),z=p-w,T=_t*g,N=T-(T-g),V=g-N,q=z*V-(nt-w*N-z*N-w*V),O=et-q,b=et-O,Bi[0]=et-(O+b)+(b-q),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt-nt,b=rt-O,Bi[1]=rt-(O+b)+(b-nt),X=Z+O,b=X-Z,Bi[2]=Z-(X-b)+(O-b),Bi[3]=X,S=4):(Ia[0]=0,I=1,Bi[0]=0,S=1),d!==0){let Et=it(I,Ia,d,se);l=me(l,fe(it(f,pc,d,Ft),Ft,it(Et,se,2*ot,jt),jt,pe),pe);let gt=it(S,Bi,d,bt);l=me(l,Xe(it(gt,bt,2*ot,Ft),Ft,it(gt,bt,d,ie),ie,it(Et,se,d,jt),jt,fi,Ye),Ye),g!==0&&(l=me(l,it(it(4,Rn,d,bt),bt,g,Ft),Ft)),_!==0&&(l=me(l,it(it(4,Cn,-d,bt),bt,_,Ft),Ft))}if(m!==0){let Et=it(I,Ia,m,se);l=me(l,fe(it(h,mc,m,Ft),Ft,it(Et,se,2*Mt,jt),jt,pe),pe);let gt=it(S,Bi,m,bt);l=me(l,Xe(it(gt,bt,2*Mt,Ft),Ft,it(gt,bt,m,ie),ie,it(Et,se,m,jt),jt,fi,Ye),Ye)}}if(u!==0||g!==0){if(p!==0||_!==0||d!==0||m!==0?(Q=p*Mt,T=_t*p,w=T-(T-p),z=p-w,T=_t*Mt,N=T-(T-Mt),V=Mt-N,et=z*V-(Q-w*N-z*N-w*V),nt=lt*m,T=_t*lt,w=T-(T-lt),z=lt-w,T=_t*m,N=T-(T-m),V=m-N,q=z*V-(nt-w*N-z*N-w*V),O=et+q,b=O-et,Ve[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,Ve[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,Ve[2]=Z-(X-b)+(O-b),Ve[3]=X,F=-U,B=-_,Q=d*F,T=_t*d,w=T-(T-d),z=d-w,T=_t*F,N=T-(T-F),V=F-N,et=z*V-(Q-w*N-z*N-w*V),nt=ot*B,T=_t*ot,w=T-(T-ot),z=ot-w,T=_t*B,N=T-(T-B),V=B-N,q=z*V-(nt-w*N-z*N-w*V),O=et+q,b=O-et,He[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,He[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,He[2]=Z-(X-b)+(O-b),He[3]=X,L=fe(4,Ve,4,He,La),Q=p*m,T=_t*p,w=T-(T-p),z=p-w,T=_t*m,N=T-(T-m),V=m-N,et=z*V-(Q-w*N-z*N-w*V),nt=d*_,T=_t*d,w=T-(T-d),z=d-w,T=_t*_,N=T-(T-_),V=_-N,q=z*V-(nt-w*N-z*N-w*V),O=et-q,b=et-O,zi[0]=et-(O+b)+(b-q),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt-nt,b=rt-O,zi[1]=rt-(O+b)+(b-nt),X=Z+O,b=X-Z,zi[2]=Z-(X-b)+(O-b),zi[3]=X,P=4):(La[0]=0,L=1,zi[0]=0,P=1),u!==0){let Et=it(L,La,u,se);l=me(l,fe(it(x,gc,u,Ft),Ft,it(Et,se,2*ft,jt),jt,pe),pe);let gt=it(P,zi,u,bt);l=me(l,Xe(it(gt,bt,2*ft,Ft),Ft,it(gt,bt,u,ie),ie,it(Et,se,u,jt),jt,fi,Ye),Ye),_!==0&&(l=me(l,it(it(4,An,u,bt),bt,_,Ft),Ft)),m!==0&&(l=me(l,it(it(4,Rn,-u,bt),bt,m,Ft),Ft))}if(g!==0){let Et=it(L,La,g,se);l=me(l,fe(it(M,_c,g,Ft),Ft,it(Et,se,2*Dt,jt),jt,pe),pe);let gt=it(P,zi,g,bt);l=me(l,Xe(it(gt,bt,2*Dt,Ft),Ft,it(gt,bt,g,ie),ie,it(Et,se,g,jt),jt,fi,Ye),Ye)}}if(p!==0||_!==0){if(d!==0||m!==0||u!==0||g!==0?(Q=d*Dt,T=_t*d,w=T-(T-d),z=d-w,T=_t*Dt,N=T-(T-Dt),V=Dt-N,et=z*V-(Q-w*N-z*N-w*V),nt=ot*g,T=_t*ot,w=T-(T-ot),z=ot-w,T=_t*g,N=T-(T-g),V=g-N,q=z*V-(nt-w*N-z*N-w*V),O=et+q,b=O-et,Ve[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,Ve[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,Ve[2]=Z-(X-b)+(O-b),Ve[3]=X,F=-Mt,B=-m,Q=u*F,T=_t*u,w=T-(T-u),z=u-w,T=_t*F,N=T-(T-F),V=F-N,et=z*V-(Q-w*N-z*N-w*V),nt=ft*B,T=_t*ft,w=T-(T-ft),z=ft-w,T=_t*B,N=T-(T-B),V=B-N,q=z*V-(nt-w*N-z*N-w*V),O=et+q,b=O-et,He[0]=et-(O-b)+(q-b),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt+nt,b=O-rt,He[1]=rt-(O-b)+(nt-b),X=Z+O,b=X-Z,He[2]=Z-(X-b)+(O-b),He[3]=X,C=fe(4,Ve,4,He,Pa),Q=d*g,T=_t*d,w=T-(T-d),z=d-w,T=_t*g,N=T-(T-g),V=g-N,et=z*V-(Q-w*N-z*N-w*V),nt=u*m,T=_t*u,w=T-(T-u),z=u-w,T=_t*m,N=T-(T-m),V=m-N,q=z*V-(nt-w*N-z*N-w*V),O=et-q,b=et-O,Oi[0]=et-(O+b)+(b-q),Z=Q+O,b=Z-Q,rt=Q-(Z-b)+(O-b),O=rt-nt,b=rt-O,Oi[1]=rt-(O+b)+(b-nt),X=Z+O,b=X-Z,Oi[2]=Z-(X-b)+(O-b),Oi[3]=X,v=4):(Pa[0]=0,C=1,Oi[0]=0,v=1),p!==0){let Et=it(C,Pa,p,se);l=me(l,fe(it(y,xc,p,Ft),Ft,it(Et,se,2*lt,jt),jt,pe),pe);let gt=it(v,Oi,p,bt);l=me(l,Xe(it(gt,bt,2*lt,Ft),Ft,it(gt,bt,p,ie),ie,it(Et,se,p,jt),jt,fi,Ye),Ye),m!==0&&(l=me(l,it(it(4,Cn,p,bt),bt,m,Ft),Ft)),g!==0&&(l=me(l,it(it(4,An,-p,bt),bt,g,Ft),Ft))}if(_!==0){let Et=it(C,Pa,_,se);l=me(l,fe(it(R,vc,_,Ft),Ft,it(Et,se,2*U,jt),jt,pe),pe);let gt=it(v,Oi,_,bt);l=me(l,Xe(it(gt,bt,2*U,Ft),Ft,it(gt,bt,_,ie),ie,it(Et,se,_,jt),jt,fi,Ye),Ye)}}return Ts[l-1]}function Mc(i,t,e,n,s,r,o,a){let c=i-o,l=e-o,d=s-o,u=t-a,p=n-a,m=r-a,g=l*m,_=d*p,f=c*c+u*u,h=d*u,x=c*m,M=l*l+p*p,y=c*p,R=l*u,C=d*d+m*m,I=f*(g-_)+M*(h-x)+C*(y-R),L=(Math.abs(g)+Math.abs(_))*f+(Math.abs(h)+Math.abs(x))*M+(Math.abs(y)+Math.abs(R))*C,v=U_*L;return I>v||-I>v?I:O_(i,t,e,n,s,r,o,a,L)}var RS=(16+224*Qt)*Qt,PS=(5+72*Qt)*Qt,IS=(71+1408*Qt)*Qt*Qt,LS=st(4),DS=st(4),US=st(4),FS=st(4),NS=st(4),OS=st(4),BS=st(4),zS=st(4),kS=st(4),VS=st(4),HS=st(24),GS=st(24),WS=st(24),XS=st(24),qS=st(24),YS=st(24),ZS=st(24),JS=st(24),$S=st(24),KS=st(24),QS=st(1152),jS=st(1152),tb=st(1152),eb=st(1152),nb=st(1152),ib=st(2304),sb=st(2304),rb=st(3456),ob=st(5760),ab=st(8),lb=st(8),cb=st(8),hb=st(16),ub=st(24),db=st(48),fb=st(48),pb=st(96),mb=st(192),gb=st(384),_b=st(384),xb=st(384),vb=st(768);var yb=st(96),Mb=st(96),Sb=st(96),bb=st(1152);function ju(i,t){var e,n,s=0,r,o,a,c,l,d,u,p=i[0],m=i[1],g=t.length;for(e=0;e<g;e++){n=0;var _=t[e],f=_.length-1;if(d=_[0],d[0]!==_[f][0]&&d[1]!==_[f][1])throw new Error("First and last coordinates in a ring must be the same");for(o=d[0]-p,a=d[1]-m,n;n<f;n++){if(u=_[n+1],c=u[0]-p,l=u[1]-m,a===0&&l===0){if(c<=0&&o>=0||o<=0&&c>=0)return 0}else if(l>=0&&a<=0||l<=0&&a>=0){if(r=qe(o,c,a,l,0,0),r===0)return 0;(r>0&&l>0&&a<=0||r<0&&l<=0&&a>0)&&s++}d=u,a=l,o=c}}return s%2!==0}function td(i){if(!i)throw new Error("coord is required");if(!Array.isArray(i)){if(i.type==="Feature"&&i.geometry!==null&&i.geometry.type==="Point")return[...i.geometry.coordinates];if(i.type==="Point")return[...i.coordinates]}if(Array.isArray(i)&&i.length>=2&&!Array.isArray(i[0])&&!Array.isArray(i[1]))return[...i];throw new Error("coord must be GeoJSON Point or an Array of numbers")}function ed(i){return i.type==="Feature"?i.geometry:i}function nd(i,t,e={}){if(!i)throw new Error("point is required");if(!t)throw new Error("polygon is required");let n=td(i),s=ed(t),r=s.type,o=t.bbox,a=s.coordinates;if(o&&B_(n,o)===!1)return!1;r==="Polygon"&&(a=[a]);let c=!1;for(var l=0;l<a.length;++l){let d=ju(n,a[l]);if(d===0)return!e.ignoreBoundary;d&&(c=!0)}return c}function B_(i,t){return t[0]<=i[0]&&t[1]<=i[1]&&t[2]>=i[0]&&t[3]>=i[1]}var od=Oc(dc(),1);function z_(i,t,e){if(i.geometry.type!=="Polygon")throw new Error("The input feature must be a Polygon");e===void 0&&(e=1);var n=i.geometry.coordinates,s=[],r={};if(e){for(var o=[],a=0;a<n.length;a++)for(var c=0;c<n[a].length-1;c++)o.push(f(a,c));var l=new rd.default;l.load(o)}for(var d=0;d<n.length;d++)for(var u=0;u<n[d].length-1;u++)if(e){var p=l.search(f(d,u));p.forEach(function(h){var x=h.ring,M=h.edge;_(d,u,x,M)})}else for(var m=0;m<n.length;m++)for(var g=0;g<n[m].length-1;g++)_(d,u,m,g);return t||(s={type:"Feature",geometry:{type:"MultiPoint",coordinates:s}}),s;function _(h,x,M,y){var R=n[h][x],C=n[h][x+1],I=n[M][y],L=n[M][y+1],v=k_(R,C,I,L);if(v!==null){var S,P;if(C[0]!==R[0]?S=(v[0]-R[0])/(C[0]-R[0]):S=(v[1]-R[1])/(C[1]-R[1]),L[0]!==I[0]?P=(v[0]-I[0])/(L[0]-I[0]):P=(v[1]-I[1])/(L[1]-I[1]),!(S>=1||S<=0||P>=1||P<=0)){var F=v,B=!r[F];B&&(r[F]=!0),t?s.push(t(v,h,x,R,C,S,M,y,I,L,P,B)):s.push(v)}}}function f(h,x){var M=n[h][x],y=n[h][x+1],R,C,I,L;return M[0]<y[0]?(R=M[0],C=y[0]):(R=y[0],C=M[0]),M[1]<y[1]?(I=M[1],L=y[1]):(I=y[1],L=M[1]),{minX:R,minY:I,maxX:C,maxY:L,ring:h,edge:x}}}function k_(i,t,e,n){if(yr(i,e)||yr(i,n)||yr(t,e)||yr(n,e))return null;var s=i[0],r=i[1],o=t[0],a=t[1],c=e[0],l=e[1],d=n[0],u=n[1],p=(s-o)*(l-u)-(r-a)*(c-d);if(p===0)return null;var m=((s*a-r*o)*(c-d)-(s-o)*(c*u-l*d))/p,g=((s*a-r*o)*(l-u)-(r-a)*(c*u-l*d))/p;return[m,g]}function yr(i,t){if(!i||!t||i.length!==t.length)return!1;for(var e=0,n=i.length;e<n;e++)if(i[e]instanceof Array&&t[e]instanceof Array){if(!yr(i[e],t[e]))return!1}else if(i[e]!==t[e])return!1;return!0}function V_(i){if(i.type!="Feature")throw new Error("The input must a geojson object of type Feature");if(i.geometry===void 0||i.geometry==null)throw new Error("The input must a geojson object with a non-empty geometry");if(i.geometry.type!="Polygon")throw new Error("The input must be a geojson Polygon");for(var t=i.geometry.coordinates.length,e=[],x=0;x<t;x++){var n=i.geometry.coordinates[x];Mr(n[0],n[n.length-1])||n.push(n[0]);for(var s=0;s<n.length-1;s++)e.push(n[s])}if(!G_(e))throw new Error("The input polygon may not have duplicate vertices (except for the first and last vertex of each ring)");var r=e.length,o=z_(i,function(et,nt,q,X,ot,ft,lt,Mt,Dt,U,Jt,Bt){return[et,nt,q,X,ot,ft,lt,Mt,Dt,U,Jt,Bt]}),a=o.length;if(a==0){for(var I=[],x=0;x<t;x++)I.push(xr([i.geometry.coordinates[x]],{parent:-1,winding:H_(i.geometry.coordinates[x])}));var V=vr(I);return O(),Z(),V}for(var c=[],l=[],x=0;x<t;x++){c.push([]);for(var s=0;s<i.geometry.coordinates[x].length-1;s++)c[x].push([new id(i.geometry.coordinates[x][As(s+1,i.geometry.coordinates[x].length-1)],1,[x,s],[x,As(s+1,i.geometry.coordinates[x].length-1)],void 0)]),l.push(new sd(i.geometry.coordinates[x][s],[x,As(s-1,i.geometry.coordinates[x].length-1)],[x,s],void 0,void 0,!1,!0))}for(var x=0;x<a;x++)c[o[x][1]][o[x][2]].push(new id(o[x][0],o[x][5],[o[x][1],o[x][2]],[o[x][6],o[x][7]],void 0)),o[x][11]&&l.push(new sd(o[x][0],[o[x][1],o[x][2]],[o[x][6],o[x][7]],void 0,void 0,!0,!0));for(var d=l.length,x=0;x<c.length;x++)for(var s=0;s<c[x].length;s++)c[x][s].sort(function(nt,q){return nt.param<q.param?-1:1});for(var u=[],x=0;x<d;x++)u.push({minX:l[x].coord[0],minY:l[x].coord[1],maxX:l[x].coord[0],maxY:l[x].coord[1],index:x});var p=new od.default;p.load(u);for(var x=0;x<c.length;x++)for(var s=0;s<c[x].length;s++)for(var m=0;m<c[x][s].length;m++){var g;m==c[x][s].length-1?g=c[x][As(s+1,i.geometry.coordinates[x].length-1)][0].coord:g=c[x][s][m+1].coord;var _=p.search({minX:g[0],minY:g[1],maxX:g[0],maxY:g[1]})[0];c[x][s][m].nxtIsectAlongEdgeIn=_.index}for(var x=0;x<c.length;x++)for(var s=0;s<c[x].length;s++)for(var m=0;m<c[x][s].length;m++){var g=c[x][s][m].coord,_=p.search({minX:g[0],minY:g[1],maxX:g[0],maxY:g[1]})[0],f=_.index;f<r?l[f].nxtIsectAlongRingAndEdge2=c[x][s][m].nxtIsectAlongEdgeIn:Mr(l[f].ringAndEdge1,c[x][s][m].ringAndEdgeIn)?l[f].nxtIsectAlongRingAndEdge1=c[x][s][m].nxtIsectAlongEdgeIn:l[f].nxtIsectAlongRingAndEdge2=c[x][s][m].nxtIsectAlongEdgeIn}for(var h=[],x=0,s=0;s<t;s++){for(var M=x,m=0;m<i.geometry.coordinates[s].length-1;m++)l[x].coord[0]<l[M].coord[0]&&(M=x),x++;for(var y=l[M].nxtIsectAlongRingAndEdge2,m=0;m<l.length;m++)if(l[m].nxtIsectAlongRingAndEdge1==M||l[m].nxtIsectAlongRingAndEdge2==M){var R=m;break}var C=Da([l[R].coord,l[M].coord,l[y].coord],!0)?1:-1;h.push({isect:M,parent:-1,winding:C})}h.sort(function(Q,et){return l[Q.isect].coord>l[et.isect].coord?-1:1});for(var I=[];h.length>0;){var L=h.pop(),v=L.isect,S=L.parent,P=L.winding,F=I.length,B=[l[v].coord],b=v;if(l[v].ringAndEdge1Walkable)var T=l[v].ringAndEdge1,w=l[v].nxtIsectAlongRingAndEdge1;else var T=l[v].ringAndEdge2,w=l[v].nxtIsectAlongRingAndEdge2;for(;!Mr(l[v].coord,l[w].coord);){B.push(l[w].coord);for(var z=void 0,x=0;x<h.length;x++)if(h[x].isect==w){z=x;break}if(z!=null&&h.splice(z,1),Mr(T,l[w].ringAndEdge1)){if(T=l[w].ringAndEdge2,l[w].ringAndEdge2Walkable=!1,l[w].ringAndEdge1Walkable){var N={isect:w};Da([l[b].coord,l[w].coord,l[l[w].nxtIsectAlongRingAndEdge2].coord],P==1)?(N.parent=S,N.winding=-P):(N.parent=F,N.winding=P),h.push(N)}b=w,w=l[w].nxtIsectAlongRingAndEdge2}else{if(T=l[w].ringAndEdge1,l[w].ringAndEdge1Walkable=!1,l[w].ringAndEdge2Walkable){var N={isect:w};Da([l[b].coord,l[w].coord,l[l[w].nxtIsectAlongRingAndEdge1].coord],P==1)?(N.parent=S,N.winding=-P):(N.parent=F,N.winding=P),h.push(N)}b=w,w=l[w].nxtIsectAlongRingAndEdge1}}B.push(l[w].coord),I.push(xr([B],{index:F,parent:S,winding:P,netWinding:void 0}))}var V=vr(I);O(),Z();function O(){for(var Q=[],et=0;et<V.features.length;et++)V.features[et].properties.parent==-1&&Q.push(et);if(Q.length>1)for(var et=0;et<Q.length;et++){for(var nt=-1,q=1/0,X=0;X<V.features.length;X++)Q[et]!=X&&nd(V.features[Q[et]].geometry.coordinates[0][0],V.features[X],{ignoreBoundary:!0})&&Ju(V.features[X])<q&&(nt=X);V.features[Q[et]].properties.parent=nt}}function Z(){for(var Q=0;Q<V.features.length;Q++)if(V.features[Q].properties.parent==-1){var et=V.features[Q].properties.winding;V.features[Q].properties.netWinding=et,rt(Q,et)}}function rt(Q,et){for(var nt=0;nt<V.features.length;nt++)if(V.features[nt].properties.parent==Q){var q=et+V.features[nt].properties.winding;V.features[nt].properties.netWinding=q,rt(nt,q)}}return V}var id=function(i,t,e,n,s){this.coord=i,this.param=t,this.ringAndEdgeIn=e,this.ringAndEdgeOut=n,this.nxtIsectAlongEdgeIn=s},sd=function(i,t,e,n,s,r,o){this.coord=i,this.ringAndEdge1=t,this.ringAndEdge2=e,this.nxtIsectAlongRingAndEdge1=n,this.nxtIsectAlongRingAndEdge2=s,this.ringAndEdge1Walkable=r,this.ringAndEdge2Walkable=o};function Da(i,t){if(typeof t>"u"&&(t=!0),i.length!=3)throw new Error("This function requires an array of three points [x,y]");var e=(i[1][0]-i[0][0])*(i[2][1]-i[0][1])-(i[1][1]-i[0][1])*(i[2][0]-i[0][0]);return e>=0==t}function H_(i){for(var t=0,e=0;e<i.length-1;e++)i[e][0]<i[t][0]&&(t=e);if(Da([i[As(t-1,i.length-1)],i[t],i[As(t+1,i.length-1)]],!0))var n=1;else var n=-1;return n}function Mr(i,t){if(!i||!t||i.length!=t.length)return!1;for(var e=0,n=i.length;e<n;e++)if(i[e]instanceof Array&&t[e]instanceof Array){if(!Mr(i[e],t[e]))return!1}else if(i[e]!=t[e])return!1;return!0}function As(i,t){return(i%t+t)%t}function G_(i){for(var t={},e=1,n=0,s=i.length;n<s;++n){if(Object.prototype.hasOwnProperty.call(t,i[n])){e=0;break}t[i[n]]=1}return e}function ad(i){var t=[];return qu(i,function(e){e.geometry.type==="Polygon"&&Gu(V_(e),function(n){t.push(xr(n.geometry.coordinates,e.properties))})}),vr(t)}var ld=new H,cd=new H,Cs=new H;function hd(i){return ad({type:"Polygon",coordinates:[i]}).features.flatMap(t=>t.geometry.type==="Multipolygon"?t.geometry.coordinates.flatMap(e=>e):t.geometry.coordinates)}function ud(i){let t=i[0][0].length;Sc(i,ld,cd),Cs.addVectors(ld,cd).multiplyScalar(.5),i.forEach(a=>a.forEach(c=>{c[0]-=Cs.x,c[1]-=Cs.y}));let[e,...n]=i,s=n.flatMap(a=>hd(a)),r=hd(e),o;return r.length===1?o=[[e,...n]]:o=r.map(a=>[a,...s.filter(c=>ku([a],...c[0]))]),o.forEach(a=>a.forEach(c=>c.forEach(l=>{l[0]+=Cs.x,l[1]+=Cs.y}))),o.length>1&&t>2&&o.forEach(a=>a.forEach(c=>c.forEach(l=>{l.length===2&&(l[2]=Cs.z)}))),o}function Sc(i,t,e){t.setScalar(1/0),e.setScalar(-1/0),i.forEach(n=>n.forEach(s=>{let[r,o,a=0]=s;t.x=Math.min(t.x,r),t.y=Math.min(t.y,o),t.z=Math.min(t.z,a),e.x=Math.max(e.x,r),e.y=Math.max(e.y,o),e.z=Math.max(e.z,a)}))}function dd(i){let[t,...e]=i;return lc(t)||t.reverse(),e.forEach(n=>{lc(n)&&n.reverse()}),i}function fd(i){return i.map(t=>Bu(t.slice())).filter(t=>t.length>3)}var pd=Math.pow(2,-52),Ua=new Uint32Array(512),br=class i{static from(t,e=Z_,n=J_){let s=t.length,r=new Float64Array(s*2);for(let o=0;o<s;o++){let a=t[o];r[2*o]=e(a),r[2*o+1]=n(a)}return new i(r)}constructor(t){let e=t.length>>1;if(e>0&&typeof t[0]!="number")throw new Error("Expected coords to contain numbers.");this.coords=t;let n=Math.max(2*e-5,0);this._triangles=new Uint32Array(n*3),this._halfedges=new Int32Array(n*3),this._hashSize=Math.ceil(Math.sqrt(e)),this._hullPrev=new Uint32Array(e),this._hullNext=new Uint32Array(e),this._hullTri=new Uint32Array(e),this._hullHash=new Int32Array(this._hashSize),this._ids=new Uint32Array(e),this._dists=new Float64Array(e),this.update()}update(){let{coords:t,_hullPrev:e,_hullNext:n,_hullTri:s,_hullHash:r}=this,o=t.length>>1,a=1/0,c=1/0,l=-1/0,d=-1/0;for(let v=0;v<o;v++){let S=t[2*v],P=t[2*v+1];S<a&&(a=S),P<c&&(c=P),S>l&&(l=S),P>d&&(d=P),this._ids[v]=v}let u=(a+l)/2,p=(c+d)/2,m,g,_;for(let v=0,S=1/0;v<o;v++){let P=bc(u,p,t[2*v],t[2*v+1]);P<S&&(m=v,S=P)}let f=t[2*m],h=t[2*m+1];for(let v=0,S=1/0;v<o;v++){if(v===m)continue;let P=bc(f,h,t[2*v],t[2*v+1]);P<S&&P>0&&(g=v,S=P)}let x=t[2*g],M=t[2*g+1],y=1/0;for(let v=0;v<o;v++){if(v===m||v===g)continue;let S=q_(f,h,x,M,t[2*v],t[2*v+1]);S<y&&(_=v,y=S)}let R=t[2*_],C=t[2*_+1];if(y===1/0){for(let P=0;P<o;P++)this._dists[P]=t[2*P]-t[0]||t[2*P+1]-t[1];Rs(this._ids,this._dists,0,o-1);let v=new Uint32Array(o),S=0;for(let P=0,F=-1/0;P<o;P++){let B=this._ids[P],b=this._dists[B];b>F&&(v[S++]=B,F=b)}this.hull=v.subarray(0,S),this.triangles=new Uint32Array(0),this.halfedges=new Uint32Array(0);return}if(qe(f,h,x,M,R,C)<0){let v=g,S=x,P=M;g=_,x=R,M=C,_=v,R=S,C=P}let I=Y_(f,h,x,M,R,C);this._cx=I.x,this._cy=I.y;for(let v=0;v<o;v++)this._dists[v]=bc(t[2*v],t[2*v+1],I.x,I.y);Rs(this._ids,this._dists,0,o-1),this._hullStart=m;let L=3;n[m]=e[_]=g,n[g]=e[m]=_,n[_]=e[g]=m,s[m]=0,s[g]=1,s[_]=2,r.fill(-1),r[this._hashKey(f,h)]=m,r[this._hashKey(x,M)]=g,r[this._hashKey(R,C)]=_,this.trianglesLen=0,this._addTriangle(m,g,_,-1,-1,-1);for(let v=0,S,P;v<this._ids.length;v++){let F=this._ids[v],B=t[2*F],b=t[2*F+1];if(v>0&&Math.abs(B-S)<=pd&&Math.abs(b-P)<=pd||(S=B,P=b,F===m||F===g||F===_))continue;let T=0;for(let O=0,Z=this._hashKey(B,b);O<this._hashSize&&(T=r[(Z+O)%this._hashSize],!(T!==-1&&T!==n[T]));O++);T=e[T];let w=T,z;for(;z=n[w],qe(B,b,t[2*w],t[2*w+1],t[2*z],t[2*z+1])>=0;)if(w=z,w===T){w=-1;break}if(w===-1)continue;let N=this._addTriangle(w,F,n[w],-1,-1,s[w]);s[F]=this._legalize(N+2),s[w]=N,L++;let V=n[w];for(;z=n[V],qe(B,b,t[2*V],t[2*V+1],t[2*z],t[2*z+1])<0;)N=this._addTriangle(V,F,z,s[F],-1,s[V]),s[F]=this._legalize(N+2),n[V]=V,L--,V=z;if(w===T)for(;z=e[w],qe(B,b,t[2*z],t[2*z+1],t[2*w],t[2*w+1])<0;)N=this._addTriangle(z,F,w,-1,s[w],s[z]),this._legalize(N+2),s[z]=N,n[w]=w,L--,w=z;this._hullStart=e[F]=w,n[w]=e[V]=F,n[F]=V,r[this._hashKey(B,b)]=F,r[this._hashKey(t[2*w],t[2*w+1])]=w}this.hull=new Uint32Array(L);for(let v=0,S=this._hullStart;v<L;v++)this.hull[v]=S,S=n[S];this.triangles=this._triangles.subarray(0,this.trianglesLen),this.halfedges=this._halfedges.subarray(0,this.trianglesLen)}_hashKey(t,e){return Math.floor(W_(t-this._cx,e-this._cy)*this._hashSize)%this._hashSize}_legalize(t){let{_triangles:e,_halfedges:n,coords:s}=this,r=0,o=0;for(;;){let a=n[t],c=t-t%3;if(o=c+(t+2)%3,a===-1){if(r===0)break;t=Ua[--r];continue}let l=a-a%3,d=c+(t+1)%3,u=l+(a+2)%3,p=e[o],m=e[t],g=e[d],_=e[u];if(X_(s[2*p],s[2*p+1],s[2*m],s[2*m+1],s[2*g],s[2*g+1],s[2*_],s[2*_+1])){e[t]=_,e[a]=p;let h=n[u];if(h===-1){let M=this._hullStart;do{if(this._hullTri[M]===u){this._hullTri[M]=t;break}M=this._hullPrev[M]}while(M!==this._hullStart)}this._link(t,h),this._link(a,n[o]),this._link(o,u);let x=l+(a+1)%3;r<Ua.length&&(Ua[r++]=x)}else{if(r===0)break;t=Ua[--r]}}return o}_link(t,e){this._halfedges[t]=e,e!==-1&&(this._halfedges[e]=t)}_addTriangle(t,e,n,s,r,o){let a=this.trianglesLen;return this._triangles[a]=t,this._triangles[a+1]=e,this._triangles[a+2]=n,this._link(a,s),this._link(a+1,r),this._link(a+2,o),this.trianglesLen+=3,a}};function W_(i,t){let e=i/(Math.abs(i)+Math.abs(t));return(t>0?3-e:1+e)/4}function bc(i,t,e,n){let s=i-e,r=t-n;return s*s+r*r}function X_(i,t,e,n,s,r,o,a){let c=i-o,l=t-a,d=e-o,u=n-a,p=s-o,m=r-a,g=c*c+l*l,_=d*d+u*u,f=p*p+m*m;return c*(u*f-_*m)-l*(d*f-_*p)+g*(d*m-u*p)<0}function q_(i,t,e,n,s,r){let o=e-i,a=n-t,c=s-i,l=r-t,d=o*o+a*a,u=c*c+l*l,p=.5/(o*l-a*c),m=(l*d-a*u)*p,g=(o*u-c*d)*p;return m*m+g*g}function Y_(i,t,e,n,s,r){let o=e-i,a=n-t,c=s-i,l=r-t,d=o*o+a*a,u=c*c+l*l,p=.5/(o*l-a*c),m=i+(l*d-a*u)*p,g=t+(o*u-c*d)*p;return{x:m,y:g}}function Rs(i,t,e,n){if(n-e<=20)for(let s=e+1;s<=n;s++){let r=i[s],o=t[r],a=s-1;for(;a>=e&&t[i[a]]>o;)i[a+1]=i[a--];i[a+1]=r}else{let s=e+n>>1,r=e+1,o=n;Sr(i,s,r),t[i[e]]>t[i[n]]&&Sr(i,e,n),t[i[r]]>t[i[n]]&&Sr(i,r,n),t[i[e]]>t[i[r]]&&Sr(i,e,r);let a=i[r],c=t[a];for(;;){do r++;while(t[i[r]]<c);do o--;while(t[i[o]]>c);if(o<r)break;Sr(i,r,o)}i[e+1]=i[o],i[o]=a,n-r+1>=o-e?(Rs(i,t,r,n),Rs(i,t,e,o-1)):(Rs(i,t,e,o-1),Rs(i,t,r,n))}}function Sr(i,t,e){let n=i[t];i[t]=i[e],i[e]=n}function Z_(i){return i[0]}function J_(i){return i[1]}var Ec=class{constructor(t,e){this.W=t,this.bs=e}add(t){let e=this.W,n=t/e|0,s=t%e;return this.bs[n]|=1<<s,this}delete(t){let e=this.W,n=t/e|0,s=t%e;return this.bs[n]&=~(1<<s),this}set(t,e){let n=this.W,s=t/n|0,r=t%n,o=1<<r;return this.bs[s]^=(-e^this.bs[s])&o,e}has(t){let e=this.W,n=t/e|0,s=t%e;return!!(this.bs[n]&1<<s)}forEach(t){let e=this.W,n=this.bs,s=n.length;for(let r=0;r<s;r++){let o=0;for(;n[r]&&o<e;)n[r]&1<<o&&t(r*e+o),o++}return this}},Fa=class extends Ec{constructor(t){let n=new Uint8Array(Math.ceil(t/8)).fill(0);super(8,n)}};function ki(i){return i%3===2?i-2:i+1}function Zn(i){return i%3===0?i+2:i-1}var Er=class{constructor(t,e){if(!t||typeof t!="object"||!t.triangles||!t.halfedges||!t.coords)throw new Error("Expected an object with Delaunator output");if(t.triangles.length%3||t.halfedges.length!==t.triangles.length||t.coords.length%2)throw new Error("Delaunator output appears inconsistent");if(t.triangles.length<3)throw new Error("No edges in triangulation");this.del=t;let n=2**32-1,s=t.coords.length>>1,r=t.triangles.length;this.vertMap=new Uint32Array(s).fill(n),this.flips=new Fa(r),this.consd=new Fa(r);for(let o=0;o<r;o++){let a=t.triangles[o];this.vertMap[a]===n&&this.updateVert(o)}e&&this.constrainAll(e)}constrainOne(t,e){let{triangles:n,halfedges:s}=this.del,r=this.vertMap,o=this.consd,a=r[t],c=a;do{let m=n[c],g=ki(c);if(m===e)return this.protect(c);let _=Zn(c),f=n[_];if(f===e)return this.protect(g),g;if(this.intersectSegments(t,e,f,m)){c=_;break}c=s[g]}while(c!==-1&&c!==a);let l=c,d=-1;for(;c!==-1;){let m=s[c],g=Zn(c),_=Zn(m),f=ki(m);if(m===-1)throw new Error("Constraining edge exited the hull");if(o.has(c))throw new Error("Edge intersects already constrained edge");if(this.isCollinear(t,e,n[c])||this.isCollinear(t,e,n[m]))throw new Error("Constraining edge intersects point");if(!this.intersectSegments(n[c],n[m],n[g],n[_])){if(d===-1&&(d=c),n[_]===e){if(c===d)throw new Error("Infinite loop: non-convex quadrilateral");c=d,d=-1;continue}if(this.intersectSegments(t,e,n[_],n[m]))c=_;else if(this.intersectSegments(t,e,n[f],n[_]))c=f;else if(d===c)throw new Error("Infinite loop: no further intersect after non-convex");continue}if(this.flipDiagonal(c),this.intersectSegments(t,e,n[g],n[_])&&(d===-1&&(d=g),d===g))throw new Error("Infinite loop: flipped diagonal still intersects");n[_]===e?(l=_,c=d,d=-1):this.intersectSegments(t,e,n[f],n[_])&&(c=f)}let u=this.flips;this.protect(l);do{var p=0;u.forEach(m=>{u.delete(m);let g=s[m];g!==-1&&(u.delete(g),this.isDelaunay(m)||(this.flipDiagonal(m),p++))})}while(p>0);return this.findEdge(t,e)}delaunify(t=!1){let e=this.del.halfedges,n=this.flips,s=this.consd,r=e.length;do{var o=0;for(let a=0;a<r;a++){if(s.has(a))continue;n.delete(a);let c=e[a];c!==-1&&(n.delete(c),this.isDelaunay(a)||(this.flipDiagonal(a),o++))}}while(t&&o>0);return this}constrainAll(t){let e=t.length;for(let n=0;n<e;n++){let s=t[n];this.constrainOne(s[0],s[1])}return this}isConstrained(t){return this.consd.has(t)}findEdge(t,e){let n=this.vertMap[e],{triangles:s,halfedges:r}=this.del,o=n,a=-1;do{if(s[o]===t)return o;a=ki(o),o=r[a]}while(o!==-1&&o!==n);return s[ki(a)]===t?-a:1/0}protect(t){let e=this.del.halfedges[t],n=this.flips,s=this.consd;return n.delete(t),s.add(t),e!==-1?(n.delete(e),s.add(e),e):-t}markFlip(t){let e=this.del.halfedges,n=this.flips;if(this.consd.has(t))return!1;let r=e[t];return r!==-1&&(n.add(t),n.add(r)),!0}flipDiagonal(t){let{triangles:e,halfedges:n}=this.del,s=this.flips,r=this.consd,o=n[t],a=Zn(t),c=ki(t),l=Zn(o),d=ki(o),u=n[a],p=n[l];if(r.has(t))throw new Error("Trying to flip a constrained edge");return e[t]=e[l],n[t]=p,s.set(t,s.has(l))||r.set(t,r.has(l)),p!==-1&&(n[p]=t),n[a]=l,e[o]=e[a],n[o]=u,s.set(o,s.has(a))||r.set(o,r.has(a)),u!==-1&&(n[u]=o),n[l]=a,this.markFlip(t),this.markFlip(c),this.markFlip(o),this.markFlip(d),s.add(a),r.delete(a),s.add(l),r.delete(l),this.updateVert(t),this.updateVert(c),this.updateVert(o),this.updateVert(d),a}isDelaunay(t){let{triangles:e,halfedges:n}=this.del,s=n[t];if(s===-1)return!0;let r=e[Zn(t)],o=e[t],a=e[ki(t)],c=e[Zn(s)];return!this.inCircle(r,o,a,c)}updateVert(t){let{triangles:e,halfedges:n}=this.del,s=this.vertMap,r=e[t],o=Zn(t),a=n[o];for(;a!==-1&&a!==t;)o=Zn(a),a=n[o];return s[r]=o,o}intersectSegments(t,e,n,s){let r=this.del.coords;return t===n||t===s||e===n||e===s?!1:md(r[t*2],r[t*2+1],r[e*2],r[e*2+1],r[n*2],r[n*2+1],r[s*2],r[s*2+1])}inCircle(t,e,n,s){let r=this.del.coords;return Mc(r[t*2],r[t*2+1],r[e*2],r[e*2+1],r[n*2],r[n*2+1],r[s*2],r[s*2+1])<0}isCollinear(t,e,n){let s=this.del.coords;return qe(s[t*2],s[t*2+1],s[e*2],s[e*2+1],s[n*2],s[n*2+1])===0}};Er.intersectSegments=md;function md(i,t,e,n,s,r,o,a){let c=qe(i,t,s,r,o,a),l=qe(e,n,s,r,o,a);if(c>0&&l>0||c<0&&l<0)return!1;let d=qe(s,r,i,t,e,n),u=qe(o,a,i,t,e,n);return d>0&&u>0||d<0&&u<0?!1:c===0&&l===0&&d===0&&u===0?!(Math.max(s,o)<Math.min(i,e)||Math.max(i,e)<Math.min(s,o)||Math.max(r,a)<Math.min(t,n)||Math.max(t,n)<Math.min(r,a)):!0}function wr(i,t,e=[]){return i.forEach((n,s)=>{let r=s+t,o=(s+1)%i.length+t;e.push([r,o])}),e}function $_(i,t){let[e,n]=t;for(let s=0,r=i.length;s<r;s+=3)for(let o=0;o<3;o++){let a=(o+1)%3,c=i[s+o],l=i[s+a];if(c===e&&l===n)return s/3}return-1}function gd(i,t,e=[]){let n=0,s=[];wr(i,n,s),n+=i.length,t.forEach(f=>{wr(f,n,s),n+=f.length});let r=[...i,...t.flatMap(f=>f),...e],o=r.map(f=>[f[0],f[1]]),a=br.from(o);new Er(a).constrainAll(s);let l=[],{triangles:d,halfedges:u}=a,p=$_(d,s[0]);if(p===-1)throw new Error;let m=new Set;s.forEach(([f,h])=>{m.add(`${f}_${h}`)});let g=new Set,_=[p];for(;_.length>0;){let f=_.pop();if(g.has(f))continue;g.add(f);let h=3*f;for(let x=0;x<3;x++){l.push(d[h+x]);let M=u[h+x];if(M===-1)continue;let y=~~(M/3);if(g.has(y))continue;let R=M-y*3,C=(R+1)%3,I=d[y*3+R],L=d[y*3+C];m.has(`${L}_${I}`)||_.push(y)}}return{indices:l,edges:s,points:r}}var Fe=new H,_d=new H,xd=new H,pi=new H,Ps=new H;function K_(i,t,e){for(let n=0,s=i.length;n<s;n++){let{minx:r,maxx:o,miny:a,maxy:c,slope:l,point:d}=i[n];if(t<r||t>o||e<a||e>c)continue;let u=t-d[0],p=e-d[1];if(l===p/u)return!0}return!1}function Q_(i,t,e="grid"){Sc(i,pi,Ps);let n=Math.sign(pi.x)*Math.ceil(Math.abs(pi.x/t))*t,s=Math.sign(pi.y)*Math.ceil(Math.abs(pi.y/t))*t,r=(Ps.z+pi.z)*.5,o=i[0][0].length;if(n>Ps.x&&s>Ps.y)return[];let a=i.flatMap(l=>{let d=[];for(let u=0,p=l.length;u<p;u++){let m=(u+1)%p,g=l[u],_=l[m],[f,h]=g,[x,M]=_,y=x-f,C=(M-h)/y,I=Math.min(f,x),L=Math.max(f,x),v=Math.min(h,M),S=Math.max(h,M);d.push({point:g,slope:C,minx:I,maxx:L,miny:v,maxy:S})}return d}),c=[];for(let l=s,d=Ps.y;l<d;l+=t){let u=e==="grid"?1:Math.sin(Math.PI/2+hn.DEG2RAD*l),p=t/u,m=Math.sign(pi.x)*Math.ceil(Math.abs(pi.x/p))*p;for(let g=m,_=Ps.x;g<_;g+=t/u)K_(a,g,l)||c.push(o===2?[g,l]:[g,l,r])}return c}function j_(i,t,e){Fe.fromArray(t,i),_d.fromArray(t,i+3).sub(Fe),xd.fromArray(t,i+6).sub(Fe),Fe.crossVectors(_d,xd).normalize(),Fe.toArray(e,i),Fe.toArray(e,i+3),Fe.toArray(e,i+6)}function wc(i,t={}){let{thickness:e=0,offset:n=0,flat:s=!1,ellipsoid:r=null,resolution:o=null,detectSelfIntersection:a=!0,altitudeScale:c=1,useEarcut:l=!1,groups:d=null}=t,u=i.map(L=>L.map(v=>v.map(S=>S.slice())));a&&(u=u.map(L=>fd(L)).filter(L=>L.length!==0).flatMap(L=>ud(L))),u=u.map(L=>dd(L));let p=u.map(L=>{let v=[];if(o!==null){let F=r?"ellipsoid":"grid";v=l?[]:Q_(L,o,F),L=L.map(B=>Ea(B,o,F))}L.forEach(F=>{F.pop()});let[S,...P]=L;if(l){let F=ir.triangulateShape(S.map(T=>new Zt(...T)),P.map(T=>T.map(w=>new Zt(...w)))).flatMap(T=>T).reverse(),B=0,b=[];return wr(S,B,b),B+=S.length,P.forEach(T=>{wr(T,B,b),B+=T.length}),{points:[...S,...P.flatMap(T=>T)],indices:F,edges:b}}else return gd(S,P,v)}),m=0,g=0,_=[],f=[];p.forEach(({indices:L,edges:v})=>{m+=L.length,g+=v.length*2*3,_.push(L.length),f.push(v.length*2*3)});let h=e===0?m:2*m+g,x=new Array(h*3),M=new Float32Array(h*3),y=0,R=m*3,C=m*2*3;if(p.forEach(({indices:L,points:v,edges:S})=>{let P=n,F=n+e;for(let b=0,T=L.length;b<T;b+=3)B(L[b+2],F,y+0),B(L[b+1],F,y+3),B(L[b+0],F,y+6),y+=9,e>0&&(B(L[b+0],P,R+0),B(L[b+1],P,R+3),B(L[b+2],P,R+6),R+=9);if(e>0)for(let b=0,T=S.length;b<T;b++){let w=S[b],z=w[0],N=w[1],V=z,O=N;B(z,P,C+0),B(V,F,C+3),B(N,P,C+6),C+=9,B(N,P,C+0),B(V,F,C+3),B(O,F,C+6),C+=9}function B(b,T,w){let z=v[b],N=s?0:z[2]||0;x[w+0]=z[0],x[w+1]=z[1],x[w+2]=N*c+T}}),r){let L=m*3;for(let v=0;v<m*3;v+=3){let S=x[v+0]*hn.DEG2RAD,P=x[v+1]*hn.DEG2RAD;if(r.getCartographicToNormal(P,S,Fe),M[v+0]=Fe.x,M[v+1]=Fe.y,M[v+2]=Fe.z,e>0){let B=v/3%3,b=2-B,T=-B+b,w=L+v+3*T;M[w+0]=-Fe.x,M[w+1]=-Fe.y,M[w+2]=-Fe.z}}Ta(x,r)}else for(let L=0;L<m*3;L+=3)M[L+0]=0,M[L+1]=0,M[L+2]=1,e>0&&(M[m*3+L+0]=0,M[m*3+L+1]=0,M[m*3+L+2]=-1);if(e>0)for(let L=m*2*3;L<M.length;L+=9)j_(L,x,M);let I=new Le;if(wa(x,I.position),Fe.copy(I.position).multiplyScalar(-1),Aa(x,...Fe),I.geometry.setAttribute("position",new Ae(new Float32Array(x),3,!1)),I.geometry.setAttribute("normal",new Ae(M,3,!1)),d){let L=0,v=0,S=[...d],P=[..._];for(;S.length;){let F=S.shift()||0,B=0;for(;F!==0;)B+=P.shift()||0,F--;I.geometry.addGroup(L,B,v),v++,L+=B}if(e>0){for(S=[...d],P=[..._];S.length;){let F=S.shift()||0,B=0;for(;F!==0;)B+=P.shift()||0,F--;I.geometry.addGroup(L,B,v),v++,L+=B}for(S=[...d],P=[...f];S.length;){let F=S.shift()||0,B=0;for(;F!==0;)B+=P.shift()||0,F--;I.geometry.addGroup(L,B,v),v++,L+=B}}}else e>0&&(I.geometry.addGroup(0,m,0),I.geometry.addGroup(m,m,1),I.geometry.addGroup(m*2,g,2));return I}function Jn(i){return{type:i.type,boundingBox:Vu(i.bbox),data:null,foreign:zu(i)}}function vd(i={}){return Ca(this.data,i)}function yd(i={}){return Ca(this.data.flatMap(t=>t),i)}function Md(i){return wc(this.data,i)}var Na=class{static getLineObject(t,e){let n=[],s=[];return t.forEach(r=>{if(/LineString/.test(r.type))n.push(...r.data),s.push(r.data.length);else if(/Polygon/.test(r.type)){let o=r.data.flatMap(a=>a);n.push(...o),s.push(o.length)}}),Ca(n,{...e,groups:[]})}static getMeshObject(t,e){let n=[],s=[];return t.forEach(r=>{if(/Polygon/.test(r.type)){let o=r.data;n.push(...o),s.push(o.length)}}),wc(n,{...e,groups:s})}constructor(){this.fetchOptions={}}loadAsync(t){return fetch(t).then(e=>e.json()).then(e=>this.parse(e))}parse(t){typeof t=="string"&&(t=JSON.parse(t));let e=this.parseObject(t),n=[],s=[];return ba(e,r=>{r.type!=="FeatureCollection"&&r.type!=="GeometryCollection"&&(r.type==="Feature"?n.push(r):(s.push(r),r.feature&&r.feature.geometries.push(r)))}),n.forEach(r=>{let{geometries:o}=r;r.points=o.filter(a=>/Point/.test(a.type)),r.lines=o.filter(a=>/Line/.test(a.type)),r.polygons=o.filter(a=>/Polygon/.test(a.type))}),{features:n,geometries:s,points:s.filter(r=>/Point/.test(r.type)),lines:s.filter(r=>/Line/.test(r.type)),polygons:s.filter(r=>/Polygon/.test(r.type))}}parseObject(t,e=null){switch(t.type){case"Point":return{...Jn(t),feature:e,data:[t.coordinates],dimension:Ni(t.coordinates)};case"MultiPoint":return{...Jn(t),feature:e,data:t.coordinates,dimension:Ni(t.coordinates[0])};case"LineString":return{...Jn(t),feature:e,data:[t.coordinates],dimension:Ni(t.coordinates[0]),getLineObject:vd};case"MultiLineString":return{...Jn(t),feature:e,data:t.coordinates,dimension:Ni(t.coordinates[0][0]),getLineObject:vd};case"Polygon":return{...Jn(t),feature:e,data:[t.coordinates],dimension:Ni(t.coordinates[0][0]),getLineObject:yd,getMeshObject:Md};case"MultiPolygon":return{...Jn(t),feature:e,data:t.coordinates,dimension:Ni(t.coordinates[0][0][0]),getLineObject:yd,getMeshObject:Md};case"GeometryCollection":return{...Jn(t),feature:e,data:t.geometries.map(n=>this.parseObject(n,e))};case"Feature":{let n={...Jn(t),id:t.id??null,properties:t.properties,geometries:[],data:null};return n.data=this.parseObject(t.geometry,n),n}case"FeatureCollection":return{...Jn(t),data:t.features.map(n=>this.parseObject(n))}}}};var Tc=6378137,gE=1/298.257223563,Sd=6356752314245179e-9;var yE=new fs,ME=new H;function tx(i){let{x:t,y:e,z:n}=i;i.x=n,i.y=t,i.z=e}function ex(i){return-i+Math.PI/2}var bd=new fs,mi=new H,Ze=new H,Ac=new H,un=new ae,Pn=new ae,Ed=new ae,Cc=new Hn,Je=new nn,wd=new H,Td=new H,Ad=new H,Vi=new H,Oa=new Gn,nx=1e-12,ix=.1,Tr=0,Rc=1,Ar=2,Ba=class{constructor(t=1,e=1,n=1){this.name="",this.radius=new H(t,e,n)}intersectRay(t,e){return un.makeScale(...this.radius).invert(),Cc.center.set(0,0,0),Cc.radius=1,Oa.copy(t).applyMatrix4(un),Oa.intersectSphere(Cc,e)?(un.makeScale(...this.radius),e.applyMatrix4(un),e):null}getEastNorthUpFrame(t,e,n,s){return n.isMatrix4&&(s=n,n=0,console.warn('Ellipsoid: The signature for "getEastNorthUpFrame" has changed.')),this.getEastNorthUpAxes(t,e,wd,Td,Ad),this.getCartographicToPosition(t,e,n,Vi),s.makeBasis(wd,Td,Ad).setPosition(Vi)}getOrientedEastNorthUpFrame(t,e,n,s,r,o,a){return this.getObjectFrame(t,e,n,s,r,o,a,Tr)}getObjectFrame(t,e,n,s,r,o,a,c=Ar){return this.getEastNorthUpFrame(t,e,n,un),Je.set(r,o,-s,"ZXY"),a.makeRotationFromEuler(Je).premultiply(un),c===Rc?(Je.set(Math.PI/2,0,0,"XYZ"),Pn.makeRotationFromEuler(Je),a.multiply(Pn)):c===Ar&&(Je.set(-Math.PI/2,0,Math.PI,"XYZ"),Pn.makeRotationFromEuler(Je),a.multiply(Pn)),a}getCartographicFromObjectFrame(t,e,n=Ar){return n===Rc?(Je.set(-Math.PI/2,0,0,"XYZ"),Pn.makeRotationFromEuler(Je).premultiply(t)):n===Ar?(Je.set(-Math.PI/2,0,Math.PI,"XYZ"),Pn.makeRotationFromEuler(Je).premultiply(t)):Pn.copy(t),Vi.setFromMatrixPosition(Pn),this.getPositionToCartographic(Vi,e),this.getEastNorthUpFrame(e.lat,e.lon,0,un).invert(),Pn.premultiply(un),Je.setFromRotationMatrix(Pn,"ZXY"),e.azimuth=-Je.z,e.elevation=Je.x,e.roll=Je.y,e}getEastNorthUpAxes(t,e,n,s,r,o=Vi){this.getCartographicToPosition(t,e,0,o),this.getCartographicToNormal(t,e,r),n.set(-o.y,o.x,0).normalize(),s.crossVectors(r,n).normalize()}getAzElRollFromRotationMatrix(t,e,n,s,r=Tr){return console.warn('Ellipsoid: "getAzElRollFromRotationMatrix" is deprecated. Use "getCartographicFromObjectFrame", instead.'),this.getCartographicToPosition(t,e,0,Vi),Ed.copy(n).setPosition(Vi),this.getCartographicFromObjectFrame(Ed,s,r),delete s.height,delete s.lat,delete s.lon,s}getRotationMatrixFromAzElRoll(t,e,n,s,r,o,a=Tr){return console.warn('Ellipsoid: "getRotationMatrixFromAzElRoll" function has been deprecated. Use "getObjectFrame", instead.'),this.getObjectFrame(t,e,0,n,s,r,o,a),o.setPosition(0,0,0),o}getFrame(t,e,n,s,r,o,a,c=Tr){return console.warn('Ellipsoid: "getFrame" function has been deprecated. Use "getObjectFrame", instead.'),this.getObjectFrame(t,e,o,n,s,r,a,c)}getCartographicToPosition(t,e,n,s){this.getCartographicToNormal(t,e,mi);let r=this.radius;Ze.copy(mi),Ze.x*=r.x**2,Ze.y*=r.y**2,Ze.z*=r.z**2;let o=Math.sqrt(mi.dot(Ze));return Ze.divideScalar(o),s.copy(Ze).addScaledVector(mi,n)}getPositionToCartographic(t,e){this.getPositionToSurfacePoint(t,Ze),this.getPositionToNormal(t,mi);let n=Ac.subVectors(t,Ze);return e.lon=Math.atan2(mi.y,mi.x),e.lat=Math.asin(mi.z),e.height=Math.sign(n.dot(t))*n.length(),e}getCartographicToNormal(t,e,n){return bd.set(1,ex(t),e),n.setFromSpherical(bd).normalize(),tx(n),n}getPositionToNormal(t,e){let n=this.radius;return e.copy(t),e.x/=n.x**2,e.y/=n.y**2,e.z/=n.z**2,e.normalize(),e}getPositionToSurfacePoint(t,e){let n=this.radius,s=1/n.x**2,r=1/n.y**2,o=1/n.z**2,a=t.x*t.x*s,c=t.y*t.y*r,l=t.z*t.z*o,d=a+c+l,u=Math.sqrt(1/d),p=Ze.copy(t).multiplyScalar(u);if(d<ix)return isFinite(u)?e.copy(p):null;let m=Ac.set(p.x*s*2,p.y*r*2,p.z*o*2),g=(1-u)*t.length()/(.5*m.length()),_=0,f,h,x,M,y,R,C,I,L,v,S;do{g-=_,x=1/(1+g*s),M=1/(1+g*r),y=1/(1+g*o),R=x*x,C=M*M,I=y*y,L=R*x,v=C*M,S=I*y,f=a*R+c*C+l*I-1,h=a*L*s+c*v*r+l*S*o;let P=-2*h;_=f/P}while(Math.abs(f)>nx);return e.set(t.x*x,t.y*M,t.z*y)}calculateHorizonDistance(t,e){let n=this.calculateEffectiveRadius(t);return Math.sqrt(2*n*e+e**2)}calculateEffectiveRadius(t){let e=this.radius.x,n=1-this.radius.z**2/e**2,s=t*hn.DEG2RAD,r=Math.sin(s)**2;return e/Math.sqrt(1-n*r)}getPositionElevation(t){this.getPositionToSurfacePoint(t,Ze);let e=Ac.subVectors(t,Ze);return Math.sign(e.dot(t))*e.length()}closestPointToRayEstimate(t,e){return this.intersectRay(t,e)?e:(un.makeScale(...this.radius).invert(),Oa.copy(t).applyMatrix4(un),Ze.set(0,0,0),Oa.closestPointToPoint(Ze,e).normalize(),un.makeScale(...this.radius),e.applyMatrix4(un))}copy(t){return this.radius.copy(t.radius),this}clone(){return new this.constructor().copy(this)}},Cr=new Ba(Tc,Tc,Sd);Cr.name="WGS84 Earth";var SE=new H,bE=new H,EE=new H,wE=new Gn;var sx=Math.PI,TE=sx/2,AE=new H,CE=new H,RE=new H,PE=new ae;var rx=[{code:"GB",name:"United Kingdom",color:16745937,href:"/uk"},{code:"FR",name:"France",color:16758098,href:"/france"},{code:"HU",name:"Hungary",color:16711680,href:"/hungary"},{code:"VA",name:"Vatican City",color:16766720,href:"/vatican-city"},{code:"CA",name:"Canada",color:376575,href:"/canada"},{code:"US",name:"United States",color:8509094,href:"/usa"}],za=new WeakMap;window.addEventListener("DOMContentLoaded",async()=>{let i=document.getElementById("LandingGlobe"),t=null;window.addEventListener("resize",e);function e(){let F={left:0,right:Math.min(1.5,Math.max(.75,window.innerWidth/1024*1.5)),top:Math.min(.75,.75*window.innerHeight/window.innerWidth),bottom:-.75},B={width:F.right-F.left,height:F.top-F.bottom},b=window.innerWidth,T=b*B.height/B.width;return t&&(t.left=F.left,t.right=F.right,t.top=F.top,t.bottom=F.bottom,t.updateProjectionMatrix()),n.setSize(b,T),i.style.minHeight=T-80+"px",F}let n=new Ma({antialias:!0});n.setPixelRatio(window.devicePixelRatio),n.setClearColor(16777215,0),i.appendChild(n.domElement);let s=e();t=new Ci(s.left,s.right,s.top,s.bottom),t.position.set(0,0,2),t.lookAt(0,0,0);let r=new $s,o=new On;r.add(o);let a=new lr(16579058,3);a.position.set(20,-20,5),r.add(a);let c=new cr(13953791,.5);r.add(c);let l=new Le(new rr(1,128,64),new ds({color:16777215,flatShading:!0,roughness:.75,metalness:.25})),d=Cr.radius;l.scale.set(d.x,d.z,d.y),l.renderOrder=1,za.set(l,{code:"SPHERE"}),o.add(l),l.rotation.x=-Math.PI/2;let u=new Pe;u.setFromObject(o),u.getCenter(o.position).multiplyScalar(-1);let p=new H;u.getSize(p),o.scale.setScalar(1.5/Math.max(...p)),o.position.multiplyScalar(o.scale.x);let m=new hr,g=new Zt,_=[0,0];window.addEventListener("pointermove",F=>{let B=n.domElement.getBoundingClientRect();g.x=(F.clientX-B.left)/B.width*2-1,g.y=-((F.clientY-B.top)/B.height)*2+1,_=[F.clientX,F.clientY]}),n.setAnimationLoop(f);function f(){o.rotation.z+=2e-4,C(),n.render(r,t)}let h=i.querySelector(".hover-popup"),x=null,M=0,y=!1,R=()=>{y=!0};window.addEventListener("mousedown",()=>{M=Date.now(),window.addEventListener("mousemove",R)}),window.addEventListener("mouseup",()=>{if(window.removeEventListener("mousemove",R),Date.now()-M>150&&y){y=!1;return}x&&(window.location.href=x.href)});function C(){m.setFromCamera(g,t);let F=m.intersectObjects(o.children).filter(b=>za.get(b.object)),B=null;if(F.length>0&&(B=za.get(F[0].object)),F.length==0||B.code==="SPHERE")n.domElement.classList.remove("pointer"),h.classList.add("hidden"),x=null;else{n.domElement.classList.add("pointer");let b=_,T=h.offsetWidth,w=h.offsetHeight,z=[0,0];if(b[0]+20+T>window.innerWidth&&(z[0]=-(T+40)),b[1]+20+w>window.innerHeight&&(z[1]=window.innerHeight-w-20-b[1]),h.style.left=b[0]+z[0]+20+"px",h.style.top=b[1]+z[1]+20+"px",B===x)return;x=B,h.innerHTML="<h2>"+B.name+"</h2>",h.classList.remove("hidden")}}let I,L,v=()=>{window.removeEventListener("mousemove",S),window.removeEventListener("mouseup",v)},S=F=>{let B=F.clientX-I,b=F.clientY-L;I=F.clientX,L=F.clientY,o.rotation.y+=B/1e3,o.rotation.x+=b/1e3};n.domElement.addEventListener("mousedown",F=>{I=F.clientX,L=F.clientY,window.addEventListener("mousemove",S),window.addEventListener("mouseup",v)}),(await new Na().loadAsync("/public/geojson/globe.geojson")).polygons.forEach(F=>{let B=2e4,b=11184810,T=rx.find(z=>z.code===F.feature.properties.ISO_A2_EH);T?(B=1e5,b=T.color):F.feature.properties.ISO_A2_EH==="AQ"&&(B=5e4);let w=F.getMeshObject({ellipsoid:Cr,resolution:2.5,thickness:B});w.material=new ds({color:b,roughness:.5}),o.add(w),T&&za.set(w,T)}),i.classList.remove("loading")});})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
