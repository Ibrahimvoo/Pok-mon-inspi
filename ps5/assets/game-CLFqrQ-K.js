import{h as R,s as Wc,i as Ht,I as Bf,a as Il,g as Ln,$ as Dl,P as Hf,d as Xc,n as Ti,r as Vf,b as Ha,c as ms,e as wh,f as Gf,o as Wf,j as Mn,t as Xf,k as qf,l as $f}from"./index-Bj3knS7y.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qc="169",Yf=0,Ul=1,jf=2,Eh=1,Ah=2,Gn=3,fi=0,kt=1,en=2,ui=0,us=1,Nl=2,Fl=3,kl=4,Kf=5,Ei=100,Jf=101,Zf=102,Qf=103,ed=104,td=200,nd=201,id=202,sd=203,Va=204,Ga=205,rd=206,od=207,ad=208,cd=209,ld=210,ud=211,hd=212,fd=213,dd=214,Wa=0,Xa=1,qa=2,gs=3,$a=4,Ya=5,ja=6,Ka=7,$c=0,pd=1,md=2,$n=0,gd=1,vd=2,_d=3,xd=4,yd=5,Md=6,Sd=7,Th=300,vs=301,_s=302,Ja=303,Za=304,To=306,Qa=1e3,Ri=1001,ec=1002,Vt=1003,bd=1004,Sr=1005,bn=1006,Vo=1007,Ci=1008,jn=1009,Rh=1010,Ch=1011,ar=1012,Yc=1013,Pi=1014,In=1015,gr=1016,jc=1017,Kc=1018,xs=1020,Ph=35902,Lh=1021,Ih=1022,pn=1023,Dh=1024,Uh=1025,hs=1026,ys=1027,Jc=1028,Zc=1029,Nh=1030,Qc=1031,el=1033,ro=33776,oo=33777,ao=33778,co=33779,tc=35840,nc=35841,ic=35842,sc=35843,rc=36196,oc=37492,ac=37496,cc=37808,lc=37809,uc=37810,hc=37811,fc=37812,dc=37813,pc=37814,mc=37815,gc=37816,vc=37817,_c=37818,xc=37819,yc=37820,Mc=37821,lo=36492,Sc=36494,bc=36495,Fh=36283,wc=36284,Ec=36285,Ac=36286,wd=3200,Ed=3201,tl=0,Ad=1,ci="",fn="srgb",di="srgb-linear",nl="display-p3",Ro="display-p3-linear",go="linear",vt="srgb",vo="rec709",_o="p3",zi=7680,Ol=519,Td=512,Rd=513,Cd=514,kh=515,Pd=516,Ld=517,Id=518,Dd=519,zl=35044,Bl=35048,Hl="300 es",qn=2e3,xo=2001;class ws{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Go=Math.PI/180,Tc=180/Math.PI;function Es(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Ut(n,e,t){return Math.max(e,Math.min(t,n))}function Ud(n,e){return(n%e+e)%e}function Wo(n,e,t){return(1-t)*n+t*e}function Cs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class Me{constructor(e=0,t=0){Me.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,i,s,r,o,a,l,u){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,u)}set(e,t,i,s,r,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=s,c[2]=a,c[3]=t,c[4]=r,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],p=i[7],m=i[2],d=i[5],h=i[8],v=s[0],f=s[3],g=s[6],x=s[1],y=s[4],M=s[7],w=s[2],b=s[5],_=s[8];return r[0]=o*v+a*x+l*w,r[3]=o*f+a*y+l*b,r[6]=o*g+a*M+l*_,r[1]=u*v+c*x+p*w,r[4]=u*f+c*y+p*b,r[7]=u*g+c*M+p*_,r[2]=m*v+d*x+h*w,r[5]=m*f+d*y+h*b,r[8]=m*g+d*M+h*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return t*o*c-t*a*u-i*r*c+i*a*l+s*r*u-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],p=c*o-a*u,m=a*l-c*r,d=u*r-o*l,h=t*p+i*m+s*d;if(h===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/h;return e[0]=p*v,e[1]=(s*u-c*i)*v,e[2]=(a*i-s*o)*v,e[3]=m*v,e[4]=(c*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=d*v,e[7]=(i*l-u*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),u=Math.sin(r);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-s*u,s*l,-s*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xo.makeScale(e,t)),this}rotate(e){return this.premultiply(Xo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xo=new Je;function Oh(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function yo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Nd(){const n=yo("canvas");return n.style.display="block",n}const Vl={};function uo(n){n in Vl||(Vl[n]=!0,console.warn(n))}function Fd(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function kd(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Od(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Gl=new Je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Wl=new Je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ps={[di]:{transfer:go,primaries:vo,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[fn]:{transfer:vt,primaries:vo,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ro]:{transfer:go,primaries:_o,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Wl),fromReference:n=>n.applyMatrix3(Gl)},[nl]:{transfer:vt,primaries:_o,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Wl),fromReference:n=>n.applyMatrix3(Gl).convertLinearToSRGB()}},zd=new Set([di,Ro]),at={enabled:!0,_workingColorSpace:di,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!zd.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Ps[e].toReference,s=Ps[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Ps[n].primaries},getTransfer:function(n){return n===ci?go:Ps[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Ps[e].luminanceCoefficients)}};function fs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Bi;class Bd{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Bi===void 0&&(Bi=yo("canvas")),Bi.width=e.width,Bi.height=e.height;const i=Bi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=fs(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fs(t[i]/255)*255):t[i]=fs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hd=0;class zh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hd++}),this.uuid=Es(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push($o(s[o].image)):r.push($o(s[o]))}else r=$o(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function $o(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Bd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vd=0;class Ot extends ws{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=Ri,s=Ri,r=bn,o=Ci,a=pn,l=jn,u=Ot.DEFAULT_ANISOTROPY,c=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=Es(),this.name="",this.source=new zh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Me(0,0),this.repeat=new Me(1,1),this.center=new Me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Th)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Qa:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case ec:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Qa:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case ec:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Th;Ot.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,s=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,u=l[0],c=l[4],p=l[8],m=l[1],d=l[5],h=l[9],v=l[2],f=l[6],g=l[10];if(Math.abs(c-m)<.01&&Math.abs(p-v)<.01&&Math.abs(h-f)<.01){if(Math.abs(c+m)<.1&&Math.abs(p+v)<.1&&Math.abs(h+f)<.1&&Math.abs(u+d+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(u+1)/2,M=(d+1)/2,w=(g+1)/2,b=(c+m)/4,_=(p+v)/4,T=(h+f)/4;return y>M&&y>w?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=b/i,r=_/i):M>w?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=T/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=_/r,s=T/r),this.set(i,s,r,t),this}let x=Math.sqrt((f-h)*(f-h)+(p-v)*(p-v)+(m-c)*(m-c));return Math.abs(x)<.001&&(x=1),this.x=(f-h)/x,this.y=(p-v)/x,this.z=(m-c)/x,this.w=Math.acos((u+d+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gd extends ws{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ot(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Li extends Gd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Bh extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wd extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pi{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],u=i[s+1],c=i[s+2],p=i[s+3];const m=r[o+0],d=r[o+1],h=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=p;return}if(a===1){e[t+0]=m,e[t+1]=d,e[t+2]=h,e[t+3]=v;return}if(p!==v||l!==m||u!==d||c!==h){let f=1-a;const g=l*m+u*d+c*h+p*v,x=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){const w=Math.sqrt(y),b=Math.atan2(w,g*x);f=Math.sin(f*b)/w,a=Math.sin(a*b)/w}const M=a*x;if(l=l*f+m*M,u=u*f+d*M,c=c*f+h*M,p=p*f+v*M,f===1-a){const w=1/Math.sqrt(l*l+u*u+c*c+p*p);l*=w,u*=w,c*=w,p*=w}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],u=i[s+2],c=i[s+3],p=r[o],m=r[o+1],d=r[o+2],h=r[o+3];return e[t]=a*h+c*p+l*d-u*m,e[t+1]=l*h+c*m+u*p-a*d,e[t+2]=u*h+c*d+a*m-l*p,e[t+3]=c*h-a*p-l*m-u*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(s/2),p=a(r/2),m=l(i/2),d=l(s/2),h=l(r/2);switch(o){case"XYZ":this._x=m*c*p+u*d*h,this._y=u*d*p-m*c*h,this._z=u*c*h+m*d*p,this._w=u*c*p-m*d*h;break;case"YXZ":this._x=m*c*p+u*d*h,this._y=u*d*p-m*c*h,this._z=u*c*h-m*d*p,this._w=u*c*p+m*d*h;break;case"ZXY":this._x=m*c*p-u*d*h,this._y=u*d*p+m*c*h,this._z=u*c*h+m*d*p,this._w=u*c*p-m*d*h;break;case"ZYX":this._x=m*c*p-u*d*h,this._y=u*d*p+m*c*h,this._z=u*c*h-m*d*p,this._w=u*c*p+m*d*h;break;case"YZX":this._x=m*c*p+u*d*h,this._y=u*d*p+m*c*h,this._z=u*c*h-m*d*p,this._w=u*c*p-m*d*h;break;case"XZY":this._x=m*c*p-u*d*h,this._y=u*d*p-m*c*h,this._z=u*c*h+m*d*p,this._w=u*c*p+m*d*h;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],u=t[2],c=t[6],p=t[10],m=i+a+p;if(m>0){const d=.5/Math.sqrt(m+1);this._w=.25/d,this._x=(c-l)*d,this._y=(r-u)*d,this._z=(o-s)*d}else if(i>a&&i>p){const d=2*Math.sqrt(1+i-a-p);this._w=(c-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+u)/d}else if(a>p){const d=2*Math.sqrt(1+a-i-p);this._w=(r-u)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+c)/d}else{const d=2*Math.sqrt(1+p-i-a);this._w=(o-s)/d,this._x=(r+u)/d,this._y=(l+c)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+o*a+s*u-r*l,this._y=s*c+o*l+r*a-i*u,this._z=r*c+o*u+i*l-s*a,this._w=o*c-i*a-s*l-r*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*i+t*this._x,this._y=d*s+t*this._y,this._z=d*r+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),p=Math.sin((1-t)*c)/u,m=Math.sin(t*c)/u;return this._w=o*p+this._w*m,this._x=i*p+this._x*m,this._y=s*p+this._y*m,this._z=r*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*s-a*i),c=2*(a*t-r*s),p=2*(r*i-o*t);return this.x=t+l*u+o*p-a*c,this.y=i+l*c+a*u-r*p,this.z=s+l*p+r*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Yo.copy(this).projectOnVector(e),this.sub(Yo)}reflect(e){return this.sub(Yo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yo=new F,Xl=new pi;class Fi{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),br.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),br.copy(i.boundingBox)),br.applyMatrix4(e.matrixWorld),this.union(br)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ls),wr.subVectors(this.max,Ls),Hi.subVectors(e.a,Ls),Vi.subVectors(e.b,Ls),Gi.subVectors(e.c,Ls),Qn.subVectors(Vi,Hi),ei.subVectors(Gi,Vi),gi.subVectors(Hi,Gi);let t=[0,-Qn.z,Qn.y,0,-ei.z,ei.y,0,-gi.z,gi.y,Qn.z,0,-Qn.x,ei.z,0,-ei.x,gi.z,0,-gi.x,-Qn.y,Qn.x,0,-ei.y,ei.x,0,-gi.y,gi.x,0];return!jo(t,Hi,Vi,Gi,wr)||(t=[1,0,0,0,1,0,0,0,1],!jo(t,Hi,Vi,Gi,wr))?!1:(Er.crossVectors(Qn,ei),t=[Er.x,Er.y,Er.z],jo(t,Hi,Vi,Gi,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new F,new F,new F,new F,new F,new F,new F,new F],vn=new F,br=new Fi,Hi=new F,Vi=new F,Gi=new F,Qn=new F,ei=new F,gi=new F,Ls=new F,wr=new F,Er=new F,vi=new F;function jo(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){vi.fromArray(n,r);const a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),l=e.dot(vi),u=t.dot(vi),c=i.dot(vi);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const Xd=new Fi,Is=new F,Ko=new F;class vr{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Xd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Is.subVectors(e,this.center);const t=Is.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Is,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ko.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Is.copy(e.center).add(Ko)),this.expandByPoint(Is.copy(e.center).sub(Ko))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const On=new F,Jo=new F,Ar=new F,ti=new F,Zo=new F,Tr=new F,Qo=new F;class qd{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Jo.copy(e).add(t).multiplyScalar(.5),Ar.copy(t).sub(e).normalize(),ti.copy(this.origin).sub(Jo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Ar),a=ti.dot(this.direction),l=-ti.dot(Ar),u=ti.lengthSq(),c=Math.abs(1-o*o);let p,m,d,h;if(c>0)if(p=o*l-a,m=o*a-l,h=r*c,p>=0)if(m>=-h)if(m<=h){const v=1/c;p*=v,m*=v,d=p*(p+o*m+2*a)+m*(o*p+m+2*l)+u}else m=r,p=Math.max(0,-(o*m+a)),d=-p*p+m*(m+2*l)+u;else m=-r,p=Math.max(0,-(o*m+a)),d=-p*p+m*(m+2*l)+u;else m<=-h?(p=Math.max(0,-(-o*r+a)),m=p>0?-r:Math.min(Math.max(-r,-l),r),d=-p*p+m*(m+2*l)+u):m<=h?(p=0,m=Math.min(Math.max(-r,-l),r),d=m*(m+2*l)+u):(p=Math.max(0,-(o*r+a)),m=p>0?r:Math.min(Math.max(-r,-l),r),d=-p*p+m*(m+2*l)+u);else m=o>0?-r:r,p=Math.max(0,-(o*m+a)),d=-p*p+m*(m+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Jo).addScaledVector(Ar,m),d}intersectSphere(e,t){On.subVectors(e.center,this.origin);const i=On.dot(this.direction),s=On.dot(On)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,p=1/this.direction.z,m=this.origin;return u>=0?(i=(e.min.x-m.x)*u,s=(e.max.x-m.x)*u):(i=(e.max.x-m.x)*u,s=(e.min.x-m.x)*u),c>=0?(r=(e.min.y-m.y)*c,o=(e.max.y-m.y)*c):(r=(e.max.y-m.y)*c,o=(e.min.y-m.y)*c),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(e.min.z-m.z)*p,l=(e.max.z-m.z)*p):(a=(e.max.z-m.z)*p,l=(e.min.z-m.z)*p),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,s,r){Zo.subVectors(t,e),Tr.subVectors(i,e),Qo.crossVectors(Zo,Tr);let o=this.direction.dot(Qo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ti.subVectors(this.origin,e);const l=a*this.direction.dot(Tr.crossVectors(ti,Tr));if(l<0)return null;const u=a*this.direction.dot(Zo.cross(ti));if(u<0||l+u>o)return null;const c=-a*ti.dot(Qo);return c<0?null:this.at(c/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,s,r,o,a,l,u,c,p,m,d,h,v,f){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,u,c,p,m,d,h,v,f)}set(e,t,i,s,r,o,a,l,u,c,p,m,d,h,v,f){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=u,g[6]=c,g[10]=p,g[14]=m,g[3]=d,g[7]=h,g[11]=v,g[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Wi.setFromMatrixColumn(e,0).length(),r=1/Wi.setFromMatrixColumn(e,1).length(),o=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),u=Math.sin(s),c=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const m=o*c,d=o*p,h=a*c,v=a*p;t[0]=l*c,t[4]=-l*p,t[8]=u,t[1]=d+h*u,t[5]=m-v*u,t[9]=-a*l,t[2]=v-m*u,t[6]=h+d*u,t[10]=o*l}else if(e.order==="YXZ"){const m=l*c,d=l*p,h=u*c,v=u*p;t[0]=m+v*a,t[4]=h*a-d,t[8]=o*u,t[1]=o*p,t[5]=o*c,t[9]=-a,t[2]=d*a-h,t[6]=v+m*a,t[10]=o*l}else if(e.order==="ZXY"){const m=l*c,d=l*p,h=u*c,v=u*p;t[0]=m-v*a,t[4]=-o*p,t[8]=h+d*a,t[1]=d+h*a,t[5]=o*c,t[9]=v-m*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const m=o*c,d=o*p,h=a*c,v=a*p;t[0]=l*c,t[4]=h*u-d,t[8]=m*u+v,t[1]=l*p,t[5]=v*u+m,t[9]=d*u-h,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const m=o*l,d=o*u,h=a*l,v=a*u;t[0]=l*c,t[4]=v-m*p,t[8]=h*p+d,t[1]=p,t[5]=o*c,t[9]=-a*c,t[2]=-u*c,t[6]=d*p+h,t[10]=m-v*p}else if(e.order==="XZY"){const m=o*l,d=o*u,h=a*l,v=a*u;t[0]=l*c,t[4]=-p,t[8]=u*c,t[1]=m*p+v,t[5]=o*c,t[9]=d*p-h,t[2]=h*p-d,t[6]=a*c,t[10]=v*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($d,e,Yd)}lookAt(e,t,i){const s=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),ni.crossVectors(i,Zt),ni.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),ni.crossVectors(i,Zt)),ni.normalize(),Rr.crossVectors(Zt,ni),s[0]=ni.x,s[4]=Rr.x,s[8]=Zt.x,s[1]=ni.y,s[5]=Rr.y,s[9]=Zt.y,s[2]=ni.z,s[6]=Rr.z,s[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],p=i[5],m=i[9],d=i[13],h=i[2],v=i[6],f=i[10],g=i[14],x=i[3],y=i[7],M=i[11],w=i[15],b=s[0],_=s[4],T=s[8],D=s[12],S=s[1],E=s[5],k=s[9],B=s[13],G=s[2],O=s[6],I=s[10],X=s[14],U=s[3],re=s[7],ce=s[11],he=s[15];return r[0]=o*b+a*S+l*G+u*U,r[4]=o*_+a*E+l*O+u*re,r[8]=o*T+a*k+l*I+u*ce,r[12]=o*D+a*B+l*X+u*he,r[1]=c*b+p*S+m*G+d*U,r[5]=c*_+p*E+m*O+d*re,r[9]=c*T+p*k+m*I+d*ce,r[13]=c*D+p*B+m*X+d*he,r[2]=h*b+v*S+f*G+g*U,r[6]=h*_+v*E+f*O+g*re,r[10]=h*T+v*k+f*I+g*ce,r[14]=h*D+v*B+f*X+g*he,r[3]=x*b+y*S+M*G+w*U,r[7]=x*_+y*E+M*O+w*re,r[11]=x*T+y*k+M*I+w*ce,r[15]=x*D+y*B+M*X+w*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],p=e[6],m=e[10],d=e[14],h=e[3],v=e[7],f=e[11],g=e[15];return h*(+r*l*p-s*u*p-r*a*m+i*u*m+s*a*d-i*l*d)+v*(+t*l*d-t*u*m+r*o*m-s*o*d+s*u*c-r*l*c)+f*(+t*u*p-t*a*d-r*o*p+i*o*d+r*a*c-i*u*c)+g*(-s*a*c-t*l*p+t*a*m+s*o*p-i*o*m+i*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],p=e[9],m=e[10],d=e[11],h=e[12],v=e[13],f=e[14],g=e[15],x=p*f*u-v*m*u+v*l*d-a*f*d-p*l*g+a*m*g,y=h*m*u-c*f*u-h*l*d+o*f*d+c*l*g-o*m*g,M=c*v*u-h*p*u+h*a*d-o*v*d-c*a*g+o*p*g,w=h*p*l-c*v*l-h*a*m+o*v*m+c*a*f-o*p*f,b=t*x+i*y+s*M+r*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/b;return e[0]=x*_,e[1]=(v*m*r-p*f*r-v*s*d+i*f*d+p*s*g-i*m*g)*_,e[2]=(a*f*r-v*l*r+v*s*u-i*f*u-a*s*g+i*l*g)*_,e[3]=(p*l*r-a*m*r-p*s*u+i*m*u+a*s*d-i*l*d)*_,e[4]=y*_,e[5]=(c*f*r-h*m*r+h*s*d-t*f*d-c*s*g+t*m*g)*_,e[6]=(h*l*r-o*f*r-h*s*u+t*f*u+o*s*g-t*l*g)*_,e[7]=(o*m*r-c*l*r+c*s*u-t*m*u-o*s*d+t*l*d)*_,e[8]=M*_,e[9]=(h*p*r-c*v*r-h*i*d+t*v*d+c*i*g-t*p*g)*_,e[10]=(o*v*r-h*a*r+h*i*u-t*v*u-o*i*g+t*a*g)*_,e[11]=(c*a*r-o*p*r-c*i*u+t*p*u+o*i*d-t*a*d)*_,e[12]=w*_,e[13]=(c*v*s-h*p*s+h*i*m-t*v*m-c*i*f+t*p*f)*_,e[14]=(h*a*s-o*v*s-h*i*l+t*v*l+o*i*f-t*a*f)*_,e[15]=(o*p*s-c*a*s+c*i*l-t*p*l-o*i*m+t*a*m)*_,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,u=r*o,c=r*a;return this.set(u*o+i,u*a-s*l,u*l+s*a,0,u*a+s*l,c*a+i,c*l-s*o,0,u*l-s*a,c*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,u=r+r,c=o+o,p=a+a,m=r*u,d=r*c,h=r*p,v=o*c,f=o*p,g=a*p,x=l*u,y=l*c,M=l*p,w=i.x,b=i.y,_=i.z;return s[0]=(1-(v+g))*w,s[1]=(d+M)*w,s[2]=(h-y)*w,s[3]=0,s[4]=(d-M)*b,s[5]=(1-(m+g))*b,s[6]=(f+x)*b,s[7]=0,s[8]=(h+y)*_,s[9]=(f-x)*_,s[10]=(1-(m+v))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Wi.set(s[0],s[1],s[2]).length();const o=Wi.set(s[4],s[5],s[6]).length(),a=Wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);const u=1/r,c=1/o,p=1/a;return _n.elements[0]*=u,_n.elements[1]*=u,_n.elements[2]*=u,_n.elements[4]*=c,_n.elements[5]*=c,_n.elements[6]*=c,_n.elements[8]*=p,_n.elements[9]*=p,_n.elements[10]*=p,t.setFromRotationMatrix(_n),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=qn){const l=this.elements,u=2*r/(t-e),c=2*r/(i-s),p=(t+e)/(t-e),m=(i+s)/(i-s);let d,h;if(a===qn)d=-(o+r)/(o-r),h=-2*o*r/(o-r);else if(a===xo)d=-o/(o-r),h=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=c,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=h,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=qn){const l=this.elements,u=1/(t-e),c=1/(i-s),p=1/(o-r),m=(t+e)*u,d=(i+s)*c;let h,v;if(a===qn)h=(o+r)*p,v=-2*p;else if(a===xo)h=r*p,v=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-m,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=v,l[14]=-h,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Wi=new F,_n=new ct,$d=new F(0,0,0),Yd=new F(1,1,1),ni=new F,Rr=new F,Zt=new F,ql=new ct,$l=new pi;class on{constructor(e=0,t=0,i=0,s=on.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],u=s[5],c=s[9],p=s[2],m=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(Ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(m,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ut(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,u),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ql.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ql,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $l.setFromEuler(this),this.setFromQuaternion($l,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class Hh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jd=0;const Yl=new F,Xi=new pi,zn=new ct,Cr=new F,Ds=new F,Kd=new F,Jd=new pi,jl=new F(1,0,0),Kl=new F(0,1,0),Jl=new F(0,0,1),Zl={type:"added"},Zd={type:"removed"},qi={type:"childadded",child:null},ea={type:"childremoved",child:null};class At extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=Es(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new F,t=new on,i=new pi,s=new F(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new Je}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.multiply(Xi),this}rotateOnWorldAxis(e,t){return Xi.setFromAxisAngle(e,t),this.quaternion.premultiply(Xi),this}rotateX(e){return this.rotateOnAxis(jl,e)}rotateY(e){return this.rotateOnAxis(Kl,e)}rotateZ(e){return this.rotateOnAxis(Jl,e)}translateOnAxis(e,t){return Yl.copy(e).applyQuaternion(this.quaternion),this.position.add(Yl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jl,e)}translateY(e){return this.translateOnAxis(Kl,e)}translateZ(e){return this.translateOnAxis(Jl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Cr.copy(e):Cr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Ds,Cr,this.up):zn.lookAt(Cr,Ds,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),Xi.setFromRotationMatrix(zn),this.quaternion.premultiply(Xi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Zl),qi.child=e,this.dispatchEvent(qi),qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zd),ea.child=e,this.dispatchEvent(ea),ea.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Zl),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,e,Kd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,Jd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const p=l[u];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),p=o(e.shapes),m=o(e.skeletons),d=o(e.animations),h=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),p.length>0&&(i.shapes=p),m.length>0&&(i.skeletons=m),d.length>0&&(i.animations=d),h.length>0&&(i.nodes=h)}return i.object=s,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}At.DEFAULT_UP=new F(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new F,Bn=new F,ta=new F,Hn=new F,$i=new F,Yi=new F,Ql=new F,na=new F,ia=new F,sa=new F,ra=new St,oa=new St,aa=new St;class wn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){xn.subVectors(s,t),Bn.subVectors(i,t),ta.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(Bn),l=xn.dot(ta),u=Bn.dot(Bn),c=Bn.dot(ta),p=o*u-a*a;if(p===0)return r.set(0,0,0),null;const m=1/p,d=(u*l-a*c)*m,h=(o*c-a*l)*m;return r.set(1-d-h,h,d)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return ra.setScalar(0),oa.setScalar(0),aa.setScalar(0),ra.fromBufferAttribute(e,t),oa.fromBufferAttribute(e,i),aa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(ra,r.x),o.addScaledVector(oa,r.y),o.addScaledVector(aa,r.z),o}static isFrontFacing(e,t,i,s){return xn.subVectors(i,t),Bn.subVectors(e,t),xn.cross(Bn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),xn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return wn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;$i.subVectors(s,i),Yi.subVectors(r,i),na.subVectors(e,i);const l=$i.dot(na),u=Yi.dot(na);if(l<=0&&u<=0)return t.copy(i);ia.subVectors(e,s);const c=$i.dot(ia),p=Yi.dot(ia);if(c>=0&&p<=c)return t.copy(s);const m=l*p-c*u;if(m<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(i).addScaledVector($i,o);sa.subVectors(e,r);const d=$i.dot(sa),h=Yi.dot(sa);if(h>=0&&d<=h)return t.copy(r);const v=d*u-l*h;if(v<=0&&u>=0&&h<=0)return a=u/(u-h),t.copy(i).addScaledVector(Yi,a);const f=c*h-d*p;if(f<=0&&p-c>=0&&d-h>=0)return Ql.subVectors(r,s),a=(p-c)/(p-c+(d-h)),t.copy(s).addScaledVector(Ql,a);const g=1/(f+v+m);return o=v*g,a=m*g,t.copy(i).addScaledVector($i,o).addScaledVector(Yi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function ca(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ge{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=Ud(e,1),t=Ut(t,0,1),i=Ut(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ca(o,r,e+1/3),this.g=ca(o,r,e),this.b=ca(o,r,e-1/3)}return at.toWorkingColorSpace(this,s),this}setStyle(e,t=fn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){const i=Vh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fs(e.r),this.g=fs(e.g),this.b=fs(e.b),this}copyLinearToSRGB(e){return this.r=qo(e.r),this.g=qo(e.g),this.b=qo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return at.fromWorkingColorSpace(Ft.copy(this),e),Math.round(Ut(Ft.r*255,0,255))*65536+Math.round(Ut(Ft.g*255,0,255))*256+Math.round(Ut(Ft.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Ft.copy(this),t);const i=Ft.r,s=Ft.g,r=Ft.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const p=o-a;switch(u=c<=.5?p/(o+a):p/(2-o-a),o){case i:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-i)/p+2;break;case r:l=(i-s)/p+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=fn){at.fromWorkingColorSpace(Ft.copy(this),e);const t=Ft.r,i=Ft.g,s=Ft.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ii),this.setHSL(ii.h+e,ii.s+t,ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ii),e.getHSL(Pr);const i=Wo(ii.h,Pr.h,t),s=Wo(ii.s,Pr.s,t),r=Wo(ii.l,Pr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new Ge;Ge.NAMES=Vh;let Qd=0;class As extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=Es(),this.name="",this.type="Material",this.blending=us,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=Ga,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ge(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==us&&(i.blending=this.blending),this.side!==fi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Va&&(i.blendSrc=this.blendSrc),this.blendDst!==Ga&&(i.blendDst=this.blendDst),this.blendEquation!==Ei&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ol&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class tn extends As{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=$c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new F,Lr=new Me;class rn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=zl,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Cs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Cs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Cs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Cs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Cs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),s=Xt(s,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==zl&&(e.usage=this.usage),e}}class Gh extends rn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Wh extends rn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Qe extends rn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let ep=0;const ln=new ct,la=new At,ji=new F,Qt=new Fi,Us=new Fi,Pt=new F;class Ct extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=Es(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Oh(e)?Wh:Gh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,i){return ln.makeTranslation(e,t,i),this.applyMatrix4(ln),this}scale(e,t,i){return ln.makeScale(e,t,i),this.applyMatrix4(ln),this}lookAt(e){return la.lookAt(e),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(Qt.min,Us.min),Qt.expandByPoint(Pt),Pt.addVectors(Qt.max,Us.max),Qt.expandByPoint(Pt)):(Qt.expandByPoint(Us.min),Qt.expandByPoint(Us.max))}Qt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)Pt.fromBufferAttribute(a,u),l&&(ji.fromBufferAttribute(e,u),Pt.add(ji)),s=Math.max(s,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let T=0;T<i.count;T++)a[T]=new F,l[T]=new F;const u=new F,c=new F,p=new F,m=new Me,d=new Me,h=new Me,v=new F,f=new F;function g(T,D,S){u.fromBufferAttribute(i,T),c.fromBufferAttribute(i,D),p.fromBufferAttribute(i,S),m.fromBufferAttribute(r,T),d.fromBufferAttribute(r,D),h.fromBufferAttribute(r,S),c.sub(u),p.sub(u),d.sub(m),h.sub(m);const E=1/(d.x*h.y-h.x*d.y);isFinite(E)&&(v.copy(c).multiplyScalar(h.y).addScaledVector(p,-d.y).multiplyScalar(E),f.copy(p).multiplyScalar(d.x).addScaledVector(c,-h.x).multiplyScalar(E),a[T].add(v),a[D].add(v),a[S].add(v),l[T].add(f),l[D].add(f),l[S].add(f))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let T=0,D=x.length;T<D;++T){const S=x[T],E=S.start,k=S.count;for(let B=E,G=E+k;B<G;B+=3)g(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const y=new F,M=new F,w=new F,b=new F;function _(T){w.fromBufferAttribute(s,T),b.copy(w);const D=a[T];y.copy(D),y.sub(w.multiplyScalar(w.dot(D))).normalize(),M.crossVectors(b,D);const E=M.dot(l[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,E)}for(let T=0,D=x.length;T<D;++T){const S=x[T],E=S.start,k=S.count;for(let B=E,G=E+k;B<G;B+=3)_(e.getX(B+0)),_(e.getX(B+1)),_(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let m=0,d=i.count;m<d;m++)i.setXYZ(m,0,0,0);const s=new F,r=new F,o=new F,a=new F,l=new F,u=new F,c=new F,p=new F;if(e)for(let m=0,d=e.count;m<d;m+=3){const h=e.getX(m+0),v=e.getX(m+1),f=e.getX(m+2);s.fromBufferAttribute(t,h),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,f),c.subVectors(o,r),p.subVectors(s,r),c.cross(p),a.fromBufferAttribute(i,h),l.fromBufferAttribute(i,v),u.fromBufferAttribute(i,f),a.add(c),l.add(c),u.add(c),i.setXYZ(h,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(f,u.x,u.y,u.z)}else for(let m=0,d=t.count;m<d;m+=3)s.fromBufferAttribute(t,m+0),r.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),c.subVectors(o,r),p.subVectors(s,r),c.cross(p),i.setXYZ(m+0,c.x,c.y,c.z),i.setXYZ(m+1,c.x,c.y,c.z),i.setXYZ(m+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,p=a.normalized,m=new u.constructor(l.length*c);let d=0,h=0;for(let v=0,f=l.length;v<f;v++){a.isInterleavedBufferAttribute?d=l[v]*a.data.stride+a.offset:d=l[v]*c;for(let g=0;g<c;g++)m[h++]=u[d++]}return new rn(m,c,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],u=e(l,i);t.setAttribute(a,u)}const r=this.morphAttributes;for(const a in r){const l=[],u=r[a];for(let c=0,p=u.length;c<p;c++){const m=u[c],d=e(m,i);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let p=0,m=u.length;p<m;p++){const d=u[p];c.push(d.toJSON(e.data))}c.length>0&&(s[l]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const u in s){const c=s[u];this.setAttribute(u,c.clone(t))}const r=e.morphAttributes;for(const u in r){const c=[],p=r[u];for(let m=0,d=p.length;m<d;m++)c.push(p[m].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const p=o[u];this.addGroup(p.start,p.count,p.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eu=new ct,_i=new qd,Ir=new vr,tu=new F,Dr=new F,Ur=new F,Nr=new F,ua=new F,Fr=new F,nu=new F,kr=new F;class pt extends At{constructor(e=new Ct,t=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Fr.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const c=a[l],p=r[l];c!==0&&(ua.fromBufferAttribute(p,e),o?Fr.addScaledVector(ua,c):Fr.addScaledVector(ua.sub(t),c))}t.add(Fr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ir.copy(i.boundingSphere),Ir.applyMatrix4(r),_i.copy(e.ray).recast(e.near),!(Ir.containsPoint(_i.origin)===!1&&(_i.intersectSphere(Ir,tu)===null||_i.origin.distanceToSquared(tu)>(e.far-e.near)**2))&&(eu.copy(r).invert(),_i.copy(e.ray).applyMatrix4(eu),!(i.boundingBox!==null&&_i.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_i)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,u=r.attributes.uv,c=r.attributes.uv1,p=r.attributes.normal,m=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let h=0,v=m.length;h<v;h++){const f=m[h],g=o[f.materialIndex],x=Math.max(f.start,d.start),y=Math.min(a.count,Math.min(f.start+f.count,d.start+d.count));for(let M=x,w=y;M<w;M+=3){const b=a.getX(M),_=a.getX(M+1),T=a.getX(M+2);s=Or(this,g,e,i,u,c,p,b,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const h=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let f=h,g=v;f<g;f+=3){const x=a.getX(f),y=a.getX(f+1),M=a.getX(f+2);s=Or(this,o,e,i,u,c,p,x,y,M),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let h=0,v=m.length;h<v;h++){const f=m[h],g=o[f.materialIndex],x=Math.max(f.start,d.start),y=Math.min(l.count,Math.min(f.start+f.count,d.start+d.count));for(let M=x,w=y;M<w;M+=3){const b=M,_=M+1,T=M+2;s=Or(this,g,e,i,u,c,p,b,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const h=Math.max(0,d.start),v=Math.min(l.count,d.start+d.count);for(let f=h,g=v;f<g;f+=3){const x=f,y=f+1,M=f+2;s=Or(this,o,e,i,u,c,p,x,y,M),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function tp(n,e,t,i,s,r,o,a){let l;if(e.side===kt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===fi,a),l===null)return null;kr.copy(a),kr.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(kr);return u<t.near||u>t.far?null:{distance:u,point:kr.clone(),object:n}}function Or(n,e,t,i,s,r,o,a,l,u){n.getVertexPosition(a,Dr),n.getVertexPosition(l,Ur),n.getVertexPosition(u,Nr);const c=tp(n,e,t,i,Dr,Ur,Nr,nu);if(c){const p=new F;wn.getBarycoord(nu,Dr,Ur,Nr,p),s&&(c.uv=wn.getInterpolatedAttribute(s,a,l,u,p,new Me)),r&&(c.uv1=wn.getInterpolatedAttribute(r,a,l,u,p,new Me)),o&&(c.normal=wn.getInterpolatedAttribute(o,a,l,u,p,new F),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const m={a,b:l,c:u,normal:new F,materialIndex:0};wn.getNormal(Dr,Ur,Nr,m.normal),c.face=m,c.barycoord=p}return c}class mn extends Ct{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],u=[],c=[],p=[];let m=0,d=0;h("z","y","x",-1,-1,i,t,e,o,r,0),h("z","y","x",1,-1,i,t,-e,o,r,1),h("x","z","y",1,1,e,i,t,s,o,2),h("x","z","y",1,-1,e,i,-t,s,o,3),h("x","y","z",1,-1,e,t,i,s,r,4),h("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Qe(u,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(p,2));function h(v,f,g,x,y,M,w,b,_,T,D){const S=M/_,E=w/T,k=M/2,B=w/2,G=b/2,O=_+1,I=T+1;let X=0,U=0;const re=new F;for(let ce=0;ce<I;ce++){const he=ce*E-B;for(let ee=0;ee<O;ee++){const ve=ee*S-k;re[v]=ve*x,re[f]=he*y,re[g]=G,u.push(re.x,re.y,re.z),re[v]=0,re[f]=0,re[g]=b>0?1:-1,c.push(re.x,re.y,re.z),p.push(ee/_),p.push(1-ce/T),X+=1}}for(let ce=0;ce<T;ce++)for(let he=0;he<_;he++){const ee=m+he+O*ce,ve=m+he+O*(ce+1),K=m+(he+1)+O*(ce+1),j=m+(he+1)+O*ce;l.push(ee,ve,j),l.push(ve,K,j),U+=6}a.addGroup(d,U,D),d+=U,m+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ms(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=Ms(n[t]);for(const s in i)e[s]=i[s]}return e}function np(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Xh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const ip={clone:Ms,merge:zt};var sp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends As{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sp,this.fragmentShader=rp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ms(e.uniforms),this.uniformsGroups=np(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class qh extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=qn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const si=new F,iu=new Me,su=new Me;class dn extends qh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Tc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Tc*2*Math.atan(Math.tan(Go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,iu,su),t.subVectors(su,iu)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Go*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/u,s*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ki=-90,Ji=1;class op extends At{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn(Ki,Ji,e,t);s.layers=this.layers,this.add(s);const r=new dn(Ki,Ji,e,t);r.layers=this.layers,this.add(r);const o=new dn(Ki,Ji,e,t);o.layers=this.layers,this.add(o);const a=new dn(Ki,Ji,e,t);a.layers=this.layers,this.add(a);const l=new dn(Ki,Ji,e,t);l.layers=this.layers,this.add(l);const u=new dn(Ki,Ji,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const u of t)this.remove(u);if(e===qn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,u,c]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),h=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,u),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,c),e.setRenderTarget(p,m,d),e.xr.enabled=h,i.texture.needsPMREMUpdate=!0}}class $h extends Ot{constructor(e,t,i,s,r,o,a,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:vs,super(e,t,i,s,r,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ap extends Li{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new $h(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new mn(5,5,5),r=new Tn({name:"CubemapFromEquirect",uniforms:Ms(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:kt,blending:ui});r.uniforms.tEquirect.value=t;const o=new pt(s,r),a=t.minFilter;return t.minFilter===Ci&&(t.minFilter=bn),new op(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const ha=new F,cp=new F,lp=new Je;class bi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ha.subVectors(i,t).cross(cp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ha),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||lp.getNormalMatrix(e),s=this.coplanarPoint(ha).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new vr,zr=new F;class il{constructor(e=new bi,t=new bi,i=new bi,s=new bi,r=new bi,o=new bi){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=qn){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],u=s[4],c=s[5],p=s[6],m=s[7],d=s[8],h=s[9],v=s[10],f=s[11],g=s[12],x=s[13],y=s[14],M=s[15];if(i[0].setComponents(l-r,m-u,f-d,M-g).normalize(),i[1].setComponents(l+r,m+u,f+d,M+g).normalize(),i[2].setComponents(l+o,m+c,f+h,M+x).normalize(),i[3].setComponents(l-o,m-c,f-h,M-x).normalize(),i[4].setComponents(l-a,m-p,f-v,M-y).normalize(),t===qn)i[5].setComponents(l+a,m+p,f+v,M+y).normalize();else if(t===xo)i[5].setComponents(a,p,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(e){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(e.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(zr.x=s.normal.x>0?e.max.x:e.min.x,zr.y=s.normal.y>0?e.max.y:e.min.y,zr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yh(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function up(n){const e=new WeakMap;function t(a,l){const u=a.array,c=a.usage,p=u.byteLength,m=n.createBuffer();n.bindBuffer(l,m),n.bufferData(l,u,c),a.onUploadCallback();let d;if(u instanceof Float32Array)d=n.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?d=n.HALF_FLOAT:d=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)d=n.SHORT;else if(u instanceof Uint32Array)d=n.UNSIGNED_INT;else if(u instanceof Int32Array)d=n.INT;else if(u instanceof Int8Array)d=n.BYTE;else if(u instanceof Uint8Array)d=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)d=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:d,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:p}}function i(a,l,u){const c=l.array,p=l.updateRanges;if(n.bindBuffer(u,a),p.length===0)n.bufferSubData(u,0,c);else{p.sort((d,h)=>d.start-h.start);let m=0;for(let d=1;d<p.length;d++){const h=p[m],v=p[d];v.start<=h.start+h.count+1?h.count=Math.max(h.count,v.start+v.count-h.start):(++m,p[m]=v)}p.length=m+1;for(let d=0,h=p.length;d<h;d++){const v=p[d];n.bufferSubData(u,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,t(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:s,remove:r,update:o}}class Ii extends Ct{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),u=a+1,c=l+1,p=e/a,m=t/l,d=[],h=[],v=[],f=[];for(let g=0;g<c;g++){const x=g*m-o;for(let y=0;y<u;y++){const M=y*p-r;h.push(M,-x,0),v.push(0,0,1),f.push(y/a),f.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<a;x++){const y=x+u*g,M=x+u*(g+1),w=x+1+u*(g+1),b=x+1+u*g;d.push(y,M,b),d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new Qe(h,3)),this.setAttribute("normal",new Qe(v,3)),this.setAttribute("uv",new Qe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ii(e.width,e.height,e.widthSegments,e.heightSegments)}}var hp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fp=`#ifdef USE_ALPHAHASH
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
#endif`,dp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vp=`#ifdef USE_AOMAP
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
#endif`,_p=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xp=`#ifdef USE_BATCHING
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
#endif`,yp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,wp=`#ifdef USE_IRIDESCENCE
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
#endif`,Ep=`#ifdef USE_BUMPMAP
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
#endif`,Ap=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Pp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Dp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Up=`#define PI 3.141592653589793
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
} // validated`,Np=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fp=`vec3 transformedNormal = objectNormal;
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
#endif`,kp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Op=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$p=`#ifdef USE_ENVMAP
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
#endif`,Yp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zp=`#ifdef USE_GRADIENTMAP
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
}`,Qp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,em=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nm=`uniform bool receiveShadow;
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
#endif`,im=`#ifdef USE_ENVMAP
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
#endif`,sm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,om=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,am=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cm=`PhysicalMaterial material;
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
#endif`,lm=`struct PhysicalMaterial {
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
}`,um=`
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
#endif`,hm=`#if defined( RE_IndirectDiffuse )
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
#endif`,fm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,dm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_m=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ym=`#if defined( USE_POINTS_UV )
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
#endif`,Mm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Em=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Am=`#ifdef USE_MORPHTARGETS
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
#endif`,Tm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Cm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Im=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dm=`#ifdef USE_NORMALMAP
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
#endif`,Um=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Nm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,km=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Om=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Bm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Xm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
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
#endif`,$m=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ym=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jm=`float getShadowMask() {
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
}`,Km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jm=`#ifdef USE_SKINNING
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
#endif`,Zm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qm=`#ifdef USE_SKINNING
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
#endif`,e0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,t0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,n0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,i0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,s0=`#ifdef USE_TRANSMISSION
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
#endif`,r0=`#ifdef USE_TRANSMISSION
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
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,l0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const u0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,h0=`uniform sampler2D t2D;
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
}`,f0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g0=`#include <common>
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
}`,v0=`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_0=`#define DISTANCE
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
}`,x0=`#define DISTANCE
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
}`,y0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,M0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S0=`uniform float scale;
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
}`,b0=`uniform vec3 diffuse;
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
}`,w0=`#include <common>
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
}`,E0=`uniform vec3 diffuse;
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
}`,A0=`#define LAMBERT
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
}`,T0=`#define LAMBERT
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
}`,R0=`#define MATCAP
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
}`,C0=`#define MATCAP
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
}`,P0=`#define NORMAL
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
}`,L0=`#define NORMAL
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
}`,I0=`#define PHONG
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
}`,D0=`#define PHONG
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
}`,U0=`#define STANDARD
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
}`,N0=`#define STANDARD
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
}`,F0=`#define TOON
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
}`,k0=`#define TOON
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
}`,O0=`uniform float size;
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
}`,z0=`uniform vec3 diffuse;
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
}`,B0=`#include <common>
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
}`,H0=`uniform vec3 color;
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
}`,V0=`uniform float rotation;
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
}`,G0=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:hp,alphahash_pars_fragment:fp,alphamap_fragment:dp,alphamap_pars_fragment:pp,alphatest_fragment:mp,alphatest_pars_fragment:gp,aomap_fragment:vp,aomap_pars_fragment:_p,batching_pars_vertex:xp,batching_vertex:yp,begin_vertex:Mp,beginnormal_vertex:Sp,bsdfs:bp,iridescence_fragment:wp,bumpmap_pars_fragment:Ep,clipping_planes_fragment:Ap,clipping_planes_pars_fragment:Tp,clipping_planes_pars_vertex:Rp,clipping_planes_vertex:Cp,color_fragment:Pp,color_pars_fragment:Lp,color_pars_vertex:Ip,color_vertex:Dp,common:Up,cube_uv_reflection_fragment:Np,defaultnormal_vertex:Fp,displacementmap_pars_vertex:kp,displacementmap_vertex:Op,emissivemap_fragment:zp,emissivemap_pars_fragment:Bp,colorspace_fragment:Hp,colorspace_pars_fragment:Vp,envmap_fragment:Gp,envmap_common_pars_fragment:Wp,envmap_pars_fragment:Xp,envmap_pars_vertex:qp,envmap_physical_pars_fragment:im,envmap_vertex:$p,fog_vertex:Yp,fog_pars_vertex:jp,fog_fragment:Kp,fog_pars_fragment:Jp,gradientmap_pars_fragment:Zp,lightmap_pars_fragment:Qp,lights_lambert_fragment:em,lights_lambert_pars_fragment:tm,lights_pars_begin:nm,lights_toon_fragment:sm,lights_toon_pars_fragment:rm,lights_phong_fragment:om,lights_phong_pars_fragment:am,lights_physical_fragment:cm,lights_physical_pars_fragment:lm,lights_fragment_begin:um,lights_fragment_maps:hm,lights_fragment_end:fm,logdepthbuf_fragment:dm,logdepthbuf_pars_fragment:pm,logdepthbuf_pars_vertex:mm,logdepthbuf_vertex:gm,map_fragment:vm,map_pars_fragment:_m,map_particle_fragment:xm,map_particle_pars_fragment:ym,metalnessmap_fragment:Mm,metalnessmap_pars_fragment:Sm,morphinstance_vertex:bm,morphcolor_vertex:wm,morphnormal_vertex:Em,morphtarget_pars_vertex:Am,morphtarget_vertex:Tm,normal_fragment_begin:Rm,normal_fragment_maps:Cm,normal_pars_fragment:Pm,normal_pars_vertex:Lm,normal_vertex:Im,normalmap_pars_fragment:Dm,clearcoat_normal_fragment_begin:Um,clearcoat_normal_fragment_maps:Nm,clearcoat_pars_fragment:Fm,iridescence_pars_fragment:km,opaque_fragment:Om,packing:zm,premultiplied_alpha_fragment:Bm,project_vertex:Hm,dithering_fragment:Vm,dithering_pars_fragment:Gm,roughnessmap_fragment:Wm,roughnessmap_pars_fragment:Xm,shadowmap_pars_fragment:qm,shadowmap_pars_vertex:$m,shadowmap_vertex:Ym,shadowmask_pars_fragment:jm,skinbase_vertex:Km,skinning_pars_vertex:Jm,skinning_vertex:Zm,skinnormal_vertex:Qm,specularmap_fragment:e0,specularmap_pars_fragment:t0,tonemapping_fragment:n0,tonemapping_pars_fragment:i0,transmission_fragment:s0,transmission_pars_fragment:r0,uv_pars_fragment:o0,uv_pars_vertex:a0,uv_vertex:c0,worldpos_vertex:l0,background_vert:u0,background_frag:h0,backgroundCube_vert:f0,backgroundCube_frag:d0,cube_vert:p0,cube_frag:m0,depth_vert:g0,depth_frag:v0,distanceRGBA_vert:_0,distanceRGBA_frag:x0,equirect_vert:y0,equirect_frag:M0,linedashed_vert:S0,linedashed_frag:b0,meshbasic_vert:w0,meshbasic_frag:E0,meshlambert_vert:A0,meshlambert_frag:T0,meshmatcap_vert:R0,meshmatcap_frag:C0,meshnormal_vert:P0,meshnormal_frag:L0,meshphong_vert:I0,meshphong_frag:D0,meshphysical_vert:U0,meshphysical_frag:N0,meshtoon_vert:F0,meshtoon_frag:k0,points_vert:O0,points_frag:z0,shadow_vert:B0,shadow_frag:H0,sprite_vert:V0,sprite_frag:G0},ge={common:{diffuse:{value:new Ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new Me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new Ge(16777215)},opacity:{value:1},center:{value:new Me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},Cn={basic:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new Ge(0)},specular:{value:new Ge(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:zt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new Ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:zt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new Ge(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:zt([ge.points,ge.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:zt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:zt([ge.common,ge.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:zt([ge.sprite,ge.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:zt([ge.common,ge.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:zt([ge.lights,ge.fog,{color:{value:new Ge(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Cn.physical={uniforms:zt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new Me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new Ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new Me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new Ge(0)},specularColor:{value:new Ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new Me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Br={r:0,b:0,g:0},yi=new on,W0=new ct;function X0(n,e,t,i,s,r,o){const a=new Ge(0);let l=r===!0?0:1,u,c,p=null,m=0,d=null;function h(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function v(x){let y=!1;const M=h(x);M===null?g(a,l):M&&M.isColor&&(g(M,1),y=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(x,y){const M=h(y);M&&(M.isCubeTexture||M.mapping===To)?(c===void 0&&(c=new pt(new mn(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:Ms(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),yi.copy(y.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(W0.makeRotationFromEuler(yi)),c.material.toneMapped=at.getTransfer(M.colorSpace)!==vt,(p!==M||m!==M.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,p=M,m=M.version,d=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(u===void 0&&(u=new pt(new Ii(2,2),new Tn({name:"BackgroundMaterial",uniforms:Ms(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=M,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=at.getTransfer(M.colorSpace)!==vt,M.matrixAutoUpdate===!0&&M.updateMatrix(),u.material.uniforms.uvTransform.value.copy(M.matrix),(p!==M||m!==M.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,p=M,m=M.version,d=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null))}function g(x,y){x.getRGB(Br,Xh(n)),i.buffers.color.setClear(Br.r,Br.g,Br.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,g(a,l)},render:v,addToRenderList:f}}function q0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=m(null);let r=s,o=!1;function a(S,E,k,B,G){let O=!1;const I=p(B,k,E);r!==I&&(r=I,u(r.object)),O=d(S,B,k,G),O&&h(S,B,k,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,M(S,E,k,B),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function u(S){return n.bindVertexArray(S)}function c(S){return n.deleteVertexArray(S)}function p(S,E,k){const B=k.wireframe===!0;let G=i[S.id];G===void 0&&(G={},i[S.id]=G);let O=G[E.id];O===void 0&&(O={},G[E.id]=O);let I=O[B];return I===void 0&&(I=m(l()),O[B]=I),I}function m(S){const E=[],k=[],B=[];for(let G=0;G<t;G++)E[G]=0,k[G]=0,B[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:k,attributeDivisors:B,object:S,attributes:{},index:null}}function d(S,E,k,B){const G=r.attributes,O=E.attributes;let I=0;const X=k.getAttributes();for(const U in X)if(X[U].location>=0){const ce=G[U];let he=O[U];if(he===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(he=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(he=S.instanceColor)),ce===void 0||ce.attribute!==he||he&&ce.data!==he.data)return!0;I++}return r.attributesNum!==I||r.index!==B}function h(S,E,k,B){const G={},O=E.attributes;let I=0;const X=k.getAttributes();for(const U in X)if(X[U].location>=0){let ce=O[U];ce===void 0&&(U==="instanceMatrix"&&S.instanceMatrix&&(ce=S.instanceMatrix),U==="instanceColor"&&S.instanceColor&&(ce=S.instanceColor));const he={};he.attribute=ce,ce&&ce.data&&(he.data=ce.data),G[U]=he,I++}r.attributes=G,r.attributesNum=I,r.index=B}function v(){const S=r.newAttributes;for(let E=0,k=S.length;E<k;E++)S[E]=0}function f(S){g(S,0)}function g(S,E){const k=r.newAttributes,B=r.enabledAttributes,G=r.attributeDivisors;k[S]=1,B[S]===0&&(n.enableVertexAttribArray(S),B[S]=1),G[S]!==E&&(n.vertexAttribDivisor(S,E),G[S]=E)}function x(){const S=r.newAttributes,E=r.enabledAttributes;for(let k=0,B=E.length;k<B;k++)E[k]!==S[k]&&(n.disableVertexAttribArray(k),E[k]=0)}function y(S,E,k,B,G,O,I){I===!0?n.vertexAttribIPointer(S,E,k,G,O):n.vertexAttribPointer(S,E,k,B,G,O)}function M(S,E,k,B){v();const G=B.attributes,O=k.getAttributes(),I=E.defaultAttributeValues;for(const X in O){const U=O[X];if(U.location>=0){let re=G[X];if(re===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(re=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(re=S.instanceColor)),re!==void 0){const ce=re.normalized,he=re.itemSize,ee=e.get(re);if(ee===void 0)continue;const ve=ee.buffer,K=ee.type,j=ee.bytesPerElement,me=K===n.INT||K===n.UNSIGNED_INT||re.gpuType===Yc;if(re.isInterleavedBufferAttribute){const fe=re.data,W=fe.stride,Q=re.offset;if(fe.isInstancedInterleavedBuffer){for(let ie=0;ie<U.locationSize;ie++)g(U.location+ie,fe.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ie=0;ie<U.locationSize;ie++)f(U.location+ie);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let ie=0;ie<U.locationSize;ie++)y(U.location+ie,he/U.locationSize,K,ce,W*j,(Q+he/U.locationSize*ie)*j,me)}else{if(re.isInstancedBufferAttribute){for(let fe=0;fe<U.locationSize;fe++)g(U.location+fe,re.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let fe=0;fe<U.locationSize;fe++)f(U.location+fe);n.bindBuffer(n.ARRAY_BUFFER,ve);for(let fe=0;fe<U.locationSize;fe++)y(U.location+fe,he/U.locationSize,K,ce,he*j,he/U.locationSize*fe*j,me)}}else if(I!==void 0){const ce=I[X];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(U.location,ce);break;case 3:n.vertexAttrib3fv(U.location,ce);break;case 4:n.vertexAttrib4fv(U.location,ce);break;default:n.vertexAttrib1fv(U.location,ce)}}}}x()}function w(){T();for(const S in i){const E=i[S];for(const k in E){const B=E[k];for(const G in B)c(B[G].object),delete B[G];delete E[k]}delete i[S]}}function b(S){if(i[S.id]===void 0)return;const E=i[S.id];for(const k in E){const B=E[k];for(const G in B)c(B[G].object),delete B[G];delete E[k]}delete i[S.id]}function _(S){for(const E in i){const k=i[E];if(k[S.id]===void 0)continue;const B=k[S.id];for(const G in B)c(B[G].object),delete B[G];delete k[S.id]}}function T(){D(),o=!0,r!==s&&(r=s,u(r.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:D,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:_,initAttributes:v,enableAttribute:f,disableUnusedAttributes:x}}function $0(n,e,t){let i;function s(u){i=u}function r(u,c){n.drawArrays(i,u,c),t.update(c,i,1)}function o(u,c,p){p!==0&&(n.drawArraysInstanced(i,u,c,p),t.update(c,i,p))}function a(u,c,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,p);let d=0;for(let h=0;h<p;h++)d+=c[h];t.update(d,i,1)}function l(u,c,p,m){if(p===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let h=0;h<u.length;h++)o(u[h],c[h],m[h]);else{d.multiDrawArraysInstancedWEBGL(i,u,0,c,0,m,0,p);let h=0;for(let v=0;v<p;v++)h+=c[v];for(let v=0;v<m.length;v++)t.update(h,i,m[v])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Y0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==pn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){const T=_===gr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==jn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&_!==In&&!T)}function l(_){if(_==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const p=t.logarithmicDepthBuffer===!0,m=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(m===!0){const _=e.get("EXT_clip_control");_.clipControlEXT(_.LOWER_LEFT_EXT,_.ZERO_TO_ONE_EXT)}const d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=h>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:p,reverseDepthBuffer:m,maxTextures:d,maxVertexTextures:h,maxTextureSize:v,maxCubemapSize:f,maxAttributes:g,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:w,maxSamples:b}}function j0(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new bi,a=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const d=p.length!==0||m||i!==0||s;return s=m,i=p.length,d},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,m){t=c(p,m,0)},this.setState=function(p,m,d){const h=p.clippingPlanes,v=p.clipIntersection,f=p.clipShadows,g=n.get(p);if(!s||h===null||h.length===0||r&&!f)r?c(null):u();else{const x=r?0:i,y=x*4;let M=g.clippingState||null;l.value=M,M=c(h,m,y,d);for(let w=0;w!==y;++w)M[w]=t[w];g.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(p,m,d,h){const v=p!==null?p.length:0;let f=null;if(v!==0){if(f=l.value,h!==!0||f===null){const g=d+v*4,x=m.matrixWorldInverse;a.getNormalMatrix(x),(f===null||f.length<g)&&(f=new Float32Array(g));for(let y=0,M=d;y!==v;++y,M+=4)o.copy(p[y]).applyMatrix4(x,a),o.normal.toArray(f,M),f[M+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,f}}function K0(n){let e=new WeakMap;function t(o,a){return a===Ja?o.mapping=vs:a===Za&&(o.mapping=_s),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ja||a===Za)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new ap(l.height);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",s),t(u.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class jh extends qh{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,o=r+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const os=4,ru=[.125,.215,.35,.446,.526,.582],Ai=20,fa=new jh,ou=new Ge;let da=null,pa=0,ma=0,ga=!1;const wi=(1+Math.sqrt(5))/2,Zi=1/wi,au=[new F(-wi,Zi,0),new F(wi,Zi,0),new F(-Zi,0,wi),new F(Zi,0,wi),new F(0,wi,-Zi),new F(0,wi,Zi),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class cu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){da=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(da,pa,ma),this._renderer.xr.enabled=ga,e.scissorTest=!1,Hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vs||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),da=this._renderer.getRenderTarget(),pa=this._renderer.getActiveCubeFace(),ma=this._renderer.getActiveMipmapLevel(),ga=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:bn,minFilter:bn,generateMipmaps:!1,type:gr,format:pn,colorSpace:di,depthBuffer:!1},s=lu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lu(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=J0(r)),this._blurMaterial=Z0(r,e,t)}return s}_compileMaterial(e){const t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,fa)}_sceneToCubeUV(e,t,i,s){const a=new dn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,p=c.autoClear,m=c.toneMapping;c.getClearColor(ou),c.toneMapping=$n,c.autoClear=!1;const d=new tn({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),h=new pt(new mn,d);let v=!1;const f=e.background;f?f.isColor&&(d.color.copy(f),e.background=null,v=!0):(d.color.copy(ou),v=!0);for(let g=0;g<6;g++){const x=g%3;x===0?(a.up.set(0,l[g],0),a.lookAt(u[g],0,0)):x===1?(a.up.set(0,0,l[g]),a.lookAt(0,u[g],0)):(a.up.set(0,l[g],0),a.lookAt(0,0,u[g]));const y=this._cubeSize;Hr(s,x*y,g>2?y:0,y,y),c.setRenderTarget(s),v&&c.render(h,a),c.render(e,a)}h.geometry.dispose(),h.material.dispose(),c.toneMapping=m,c.autoClear=p,e.background=f}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===vs||e.mapping===_s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uu());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new pt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Hr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,fa)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=au[(s-r-1)%au.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,p=new pt(this._lodPlanes[s],u),m=u.uniforms,d=this._sizeLods[i]-1,h=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Ai-1),v=r/h,f=isFinite(r)?1+Math.floor(c*v):Ai;f>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${Ai}`);const g=[];let x=0;for(let _=0;_<Ai;++_){const T=_/v,D=Math.exp(-T*T/2);g.push(D),_===0?x+=D:_<f&&(x+=2*D)}for(let _=0;_<g.length;_++)g[_]=g[_]/x;m.envMap.value=e.texture,m.samples.value=f,m.weights.value=g,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:y}=this;m.dTheta.value=h,m.mipInt.value=y-i;const M=this._sizeLods[s],w=3*M*(s>y-os?s-y+os:0),b=4*(this._cubeSize-M);Hr(t,w,b,3*M,2*M),l.setRenderTarget(t),l.render(p,fa)}}function J0(n){const e=[],t=[],i=[];let s=n;const r=n-os+1+ru.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-os?l=ru[o-n+os-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),c=-u,p=1+u,m=[c,c,p,c,p,p,c,c,p,p,c,p],d=6,h=6,v=3,f=2,g=1,x=new Float32Array(v*h*d),y=new Float32Array(f*h*d),M=new Float32Array(g*h*d);for(let b=0;b<d;b++){const _=b%3*2/3-1,T=b>2?0:-1,D=[_,T,0,_+2/3,T,0,_+2/3,T+1,0,_,T,0,_+2/3,T+1,0,_,T+1,0];x.set(D,v*h*b),y.set(m,f*h*b);const S=[b,b,b,b,b,b];M.set(S,g*h*b)}const w=new Ct;w.setAttribute("position",new rn(x,v)),w.setAttribute("uv",new rn(y,f)),w.setAttribute("faceIndex",new rn(M,g)),e.push(w),s>os&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function lu(n,e,t){const i=new Li(n,e,t);return i.texture.mapping=To,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Hr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Z0(n,e,t){const i=new Float32Array(Ai),s=new F(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sl(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function uu(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sl(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function hu(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function sl(){return`

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
	`}function Q0(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===Ja||l===Za,c=l===vs||l===_s;if(u||c){let p=e.get(a);const m=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return t===null&&(t=new cu(n)),p=u?t.fromEquirectangular(a,p):t.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,e.set(a,p),p.texture;if(p!==void 0)return p.texture;{const d=a.image;return u&&d&&d.height>0||c&&d&&s(d)?(t===null&&(t=new cu(n)),p=u?t.fromEquirectangular(a):t.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,e.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function r(a){const l=a.target;l.removeEventListener("dispose",r);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function eg(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&uo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function tg(n,e,t,i){const s={},r=new WeakMap;function o(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const h in m.attributes)e.remove(m.attributes[h]);for(const h in m.morphAttributes){const v=m.morphAttributes[h];for(let f=0,g=v.length;f<g;f++)e.remove(v[f])}m.removeEventListener("dispose",o),delete s[m.id];const d=r.get(m);d&&(e.remove(d),r.delete(m)),i.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function a(p,m){return s[m.id]===!0||(m.addEventListener("dispose",o),s[m.id]=!0,t.memory.geometries++),m}function l(p){const m=p.attributes;for(const h in m)e.update(m[h],n.ARRAY_BUFFER);const d=p.morphAttributes;for(const h in d){const v=d[h];for(let f=0,g=v.length;f<g;f++)e.update(v[f],n.ARRAY_BUFFER)}}function u(p){const m=[],d=p.index,h=p.attributes.position;let v=0;if(d!==null){const x=d.array;v=d.version;for(let y=0,M=x.length;y<M;y+=3){const w=x[y+0],b=x[y+1],_=x[y+2];m.push(w,b,b,_,_,w)}}else if(h!==void 0){const x=h.array;v=h.version;for(let y=0,M=x.length/3-1;y<M;y+=3){const w=y+0,b=y+1,_=y+2;m.push(w,b,b,_,_,w)}}else return;const f=new(Oh(m)?Wh:Gh)(m,1);f.version=v;const g=r.get(p);g&&e.remove(g),r.set(p,f)}function c(p){const m=r.get(p);if(m){const d=p.index;d!==null&&m.version<d.version&&u(p)}else u(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:c}}function ng(n,e,t){let i;function s(m){i=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function l(m,d){n.drawElements(i,d,r,m*o),t.update(d,i,1)}function u(m,d,h){h!==0&&(n.drawElementsInstanced(i,d,r,m*o,h),t.update(d,i,h))}function c(m,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,m,0,h);let f=0;for(let g=0;g<h;g++)f+=d[g];t.update(f,i,1)}function p(m,d,h,v){if(h===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<m.length;g++)u(m[g]/o,d[g],v[g]);else{f.multiDrawElementsInstancedWEBGL(i,d,0,r,m,0,v,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x];for(let x=0;x<v.length;x++)t.update(g,i,v[x])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=p}function ig(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function sg(n,e,t){const i=new WeakMap,s=new St;function r(o,a,l){const u=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=c!==void 0?c.length:0;let m=i.get(a);if(m===void 0||m.count!==p){let D=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",D)};m!==void 0&&m.texture.dispose();const d=a.morphAttributes.position!==void 0,h=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,f=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;d===!0&&(y=1),h===!0&&(y=2),v===!0&&(y=3);let M=a.attributes.position.count*y,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const b=new Float32Array(M*w*4*p),_=new Bh(b,M,w,p);_.type=In,_.needsUpdate=!0;const T=y*4;for(let S=0;S<p;S++){const E=f[S],k=g[S],B=x[S],G=M*w*4*S;for(let O=0;O<E.count;O++){const I=O*T;d===!0&&(s.fromBufferAttribute(E,O),b[G+I+0]=s.x,b[G+I+1]=s.y,b[G+I+2]=s.z,b[G+I+3]=0),h===!0&&(s.fromBufferAttribute(k,O),b[G+I+4]=s.x,b[G+I+5]=s.y,b[G+I+6]=s.z,b[G+I+7]=0),v===!0&&(s.fromBufferAttribute(B,O),b[G+I+8]=s.x,b[G+I+9]=s.y,b[G+I+10]=s.z,b[G+I+11]=B.itemSize===4?s.w:1)}}m={count:p,texture:_,size:new Me(M,w)},i.set(a,m),a.addEventListener("dispose",D)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let d=0;for(let v=0;v<u.length;v++)d+=u[v];const h=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(n,"morphTargetBaseInfluence",h),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}return{update:r}}function rg(n,e,t,i){let s=new WeakMap;function r(l){const u=i.render.frame,c=l.geometry,p=e.get(l,c);if(s.get(p)!==u&&(e.update(p),s.set(p,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return p}function o(){s=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:r,dispose:o}}class Kh extends Ot{constructor(e,t,i,s,r,o,a,l,u,c=hs){if(c!==hs&&c!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===hs&&(i=Pi),i===void 0&&c===ys&&(i=xs),super(null,s,r,o,a,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Vt,this.minFilter=l!==void 0?l:Vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Jh=new Ot,fu=new Kh(1,1),Zh=new Bh,Qh=new Wd,ef=new $h,du=[],pu=[],mu=new Float32Array(16),gu=new Float32Array(9),vu=new Float32Array(4);function Ts(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=du[s];if(r===void 0&&(r=new Float32Array(s),du[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Co(n,e){let t=pu[e];t===void 0&&(t=new Int32Array(e),pu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function og(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function cg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function ug(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;vu.set(i),n.uniformMatrix2fv(this.addr,!1,vu),Rt(t,i)}}function hg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;gu.set(i),n.uniformMatrix3fv(this.addr,!1,gu),Rt(t,i)}}function fg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;mu.set(i),n.uniformMatrix4fv(this.addr,!1,mu),Rt(t,i)}}function dg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function pg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function mg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function vg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function _g(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function xg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function Mg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(fu.compareFunction=kh,r=fu):r=Jh,t.setTexture2D(e||r,s)}function Sg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Qh,s)}function bg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||ef,s)}function wg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Zh,s)}function Eg(n){switch(n){case 5126:return og;case 35664:return ag;case 35665:return cg;case 35666:return lg;case 35674:return ug;case 35675:return hg;case 35676:return fg;case 5124:case 35670:return dg;case 35667:case 35671:return pg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return vg;case 36294:return _g;case 36295:return xg;case 36296:return yg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return Sg;case 35680:case 36300:case 36308:case 36293:return bg;case 36289:case 36303:case 36311:case 36292:return wg}}function Ag(n,e){n.uniform1fv(this.addr,e)}function Tg(n,e){const t=Ts(e,this.size,2);n.uniform2fv(this.addr,t)}function Rg(n,e){const t=Ts(e,this.size,3);n.uniform3fv(this.addr,t)}function Cg(n,e){const t=Ts(e,this.size,4);n.uniform4fv(this.addr,t)}function Pg(n,e){const t=Ts(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Lg(n,e){const t=Ts(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Ig(n,e){const t=Ts(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Dg(n,e){n.uniform1iv(this.addr,e)}function Ug(n,e){n.uniform2iv(this.addr,e)}function Ng(n,e){n.uniform3iv(this.addr,e)}function Fg(n,e){n.uniform4iv(this.addr,e)}function kg(n,e){n.uniform1uiv(this.addr,e)}function Og(n,e){n.uniform2uiv(this.addr,e)}function zg(n,e){n.uniform3uiv(this.addr,e)}function Bg(n,e){n.uniform4uiv(this.addr,e)}function Hg(n,e,t){const i=this.cache,s=e.length,r=Co(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Jh,r[o])}function Vg(n,e,t){const i=this.cache,s=e.length,r=Co(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Qh,r[o])}function Gg(n,e,t){const i=this.cache,s=e.length,r=Co(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||ef,r[o])}function Wg(n,e,t){const i=this.cache,s=e.length,r=Co(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Zh,r[o])}function Xg(n){switch(n){case 5126:return Ag;case 35664:return Tg;case 35665:return Rg;case 35666:return Cg;case 35674:return Pg;case 35675:return Lg;case 35676:return Ig;case 5124:case 35670:return Dg;case 35667:case 35671:return Ug;case 35668:case 35672:return Ng;case 35669:case 35673:return Fg;case 5125:return kg;case 36294:return Og;case 36295:return zg;case 36296:return Bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Hg;case 35679:case 36299:case 36307:return Vg;case 35680:case 36300:case 36308:case 36293:return Gg;case 36289:case 36303:case 36311:case 36292:return Wg}}class qg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Eg(t.type)}}class $g{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Xg(t.type)}}class Yg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const va=/(\w+)(\])?(\[|\.)?/g;function _u(n,e){n.seq.push(e),n.map[e.id]=e}function jg(n,e,t){const i=n.name,s=i.length;for(va.lastIndex=0;;){const r=va.exec(i),o=va.lastIndex;let a=r[1];const l=r[2]==="]",u=r[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===s){_u(t,u===void 0?new qg(a,n,e):new $g(a,n,e));break}else{let p=t.map[a];p===void 0&&(p=new Yg(a),_u(t,p)),t=p}}}class ho{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);jg(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function xu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Kg=37297;let Jg=0;function Zg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Qg(n){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(n);let i;switch(e===t?i="":e===_o&&t===vo?i="LinearDisplayP3ToLinearSRGB":e===vo&&t===_o&&(i="LinearSRGBToLinearDisplayP3"),n){case di:case Ro:return[i,"LinearTransferOETF"];case fn:case nl:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function yu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Zg(n.getShaderSource(e),o)}else return s}function ev(n,e){const t=Qg(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function tv(n,e){let t;switch(e){case gd:t="Linear";break;case vd:t="Reinhard";break;case _d:t="Cineon";break;case xd:t="ACESFilmic";break;case Md:t="AgX";break;case Sd:t="Neutral";break;case yd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Vr=new F;function nv(){at.getLuminanceCoefficients(Vr);const n=Vr.x.toFixed(4),e=Vr.y.toFixed(4),t=Vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function iv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function sv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function rv(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ks(n){return n!==""}function Mu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Su(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ov=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rc(n){return n.replace(ov,cv)}const av=new Map;function cv(n,e){let t=Ke[e];if(t===void 0){const i=av.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Rc(t)}const lv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bu(n){return n.replace(lv,uv)}function uv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function wu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function hv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Eh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ah?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function fv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case vs:case _s:e="ENVMAP_TYPE_CUBE";break;case To:e="ENVMAP_TYPE_CUBE_UV";break}return e}function dv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case _s:e="ENVMAP_MODE_REFRACTION";break}return e}function pv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case $c:e="ENVMAP_BLENDING_MULTIPLY";break;case pd:e="ENVMAP_BLENDING_MIX";break;case md:e="ENVMAP_BLENDING_ADD";break}return e}function mv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function gv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=hv(t),u=fv(t),c=dv(t),p=pv(t),m=mv(t),d=iv(t),h=sv(r),v=s.createProgram();let f,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ks).join(`
`),f.length>0&&(f+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ks).join(`
`),g.length>0&&(g+=`
`)):(f=[wu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),g=[wu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?Ke.tonemapping_pars_fragment:"",t.toneMapping!==$n?tv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,ev("linearToOutputTexel",t.outputColorSpace),nv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Rc(o),o=Mu(o,t),o=Su(o,t),a=Rc(a),a=Mu(a,t),a=Su(a,t),o=bu(o),a=bu(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,g=["#define varying in",t.glslVersion===Hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=x+f+o,M=x+g+a,w=xu(s,s.VERTEX_SHADER,y),b=xu(s,s.FRAGMENT_SHADER,M);s.attachShader(v,w),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function _(E){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),B=s.getShaderInfoLog(w).trim(),G=s.getShaderInfoLog(b).trim();let O=!0,I=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,w,b);else{const X=yu(s,w,"vertex"),U=yu(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+k+`
`+X+`
`+U)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(B===""||G==="")&&(I=!1);I&&(E.diagnostics={runnable:O,programLog:k,vertexShader:{log:B,prefix:f},fragmentShader:{log:G,prefix:g}})}s.deleteShader(w),s.deleteShader(b),T=new ho(s,v),D=rv(s,v)}let T;this.getUniforms=function(){return T===void 0&&_(this),T};let D;this.getAttributes=function(){return D===void 0&&_(this),D};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,Kg)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=b,this}let vv=0;class _v{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new xv(e),t.set(e,i)),i}}class xv{constructor(e){this.id=vv++,this.code=e,this.usedTimes=0}}function yv(n,e,t,i,s,r,o){const a=new Hh,l=new _v,u=new Set,c=[],p=s.logarithmicDepthBuffer,m=s.reverseDepthBuffer,d=s.vertexTextures;let h=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(S){return u.add(S),S===0?"uv":`uv${S}`}function g(S,E,k,B,G){const O=B.fog,I=G.geometry,X=S.isMeshStandardMaterial?B.environment:null,U=(S.isMeshStandardMaterial?t:e).get(S.envMap||X),re=U&&U.mapping===To?U.image.height:null,ce=v[S.type];S.precision!==null&&(h=s.getMaxPrecision(S.precision),h!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const he=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,ee=he!==void 0?he.length:0;let ve=0;I.morphAttributes.position!==void 0&&(ve=1),I.morphAttributes.normal!==void 0&&(ve=2),I.morphAttributes.color!==void 0&&(ve=3);let K,j,me,fe;if(ce){const Wt=Cn[ce];K=Wt.vertexShader,j=Wt.fragmentShader}else K=S.vertexShader,j=S.fragmentShader,l.update(S),me=l.getVertexShaderID(S),fe=l.getFragmentShaderID(S);const W=n.getRenderTarget(),Q=G.isInstancedMesh===!0,ie=G.isBatchedMesh===!0,N=!!S.map,q=!!S.matcap,L=!!U,de=!!S.aoMap,pe=!!S.lightMap,Te=!!S.bumpMap,ne=!!S.normalMap,Ce=!!S.displacementMap,Se=!!S.emissiveMap,P=!!S.metalnessMap,A=!!S.roughnessMap,$=S.anisotropy>0,se=S.clearcoat>0,ae=S.dispersion>0,Z=S.iridescence>0,Re=S.sheen>0,_e=S.transmission>0,be=$&&!!S.anisotropyMap,ze=se&&!!S.clearcoatMap,le=se&&!!S.clearcoatNormalMap,we=se&&!!S.clearcoatRoughnessMap,He=Z&&!!S.iridescenceMap,qe=Z&&!!S.iridescenceThicknessMap,Pe=Re&&!!S.sheenColorMap,et=Re&&!!S.sheenRoughnessMap,$e=!!S.specularMap,ft=!!S.specularColorMap,z=!!S.specularIntensityMap,Ee=_e&&!!S.transmissionMap,te=_e&&!!S.thicknessMap,oe=!!S.gradientMap,xe=!!S.alphaMap,Ae=S.alphaTest>0,nt=!!S.alphaHash,wt=!!S.extensions;let Gt=$n;S.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(Gt=n.toneMapping);const it={shaderID:ce,shaderType:S.type,shaderName:S.name,vertexShader:K,fragmentShader:j,defines:S.defines,customVertexShaderID:me,customFragmentShaderID:fe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:ie,batchingColor:ie&&G._colorsTexture!==null,instancing:Q,instancingColor:Q&&G.instanceColor!==null,instancingMorph:Q&&G.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:W===null?n.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:di,alphaToCoverage:!!S.alphaToCoverage,map:N,matcap:q,envMap:L,envMapMode:L&&U.mapping,envMapCubeUVHeight:re,aoMap:de,lightMap:pe,bumpMap:Te,normalMap:ne,displacementMap:d&&Ce,emissiveMap:Se,normalMapObjectSpace:ne&&S.normalMapType===Ad,normalMapTangentSpace:ne&&S.normalMapType===tl,metalnessMap:P,roughnessMap:A,anisotropy:$,anisotropyMap:be,clearcoat:se,clearcoatMap:ze,clearcoatNormalMap:le,clearcoatRoughnessMap:we,dispersion:ae,iridescence:Z,iridescenceMap:He,iridescenceThicknessMap:qe,sheen:Re,sheenColorMap:Pe,sheenRoughnessMap:et,specularMap:$e,specularColorMap:ft,specularIntensityMap:z,transmission:_e,transmissionMap:Ee,thicknessMap:te,gradientMap:oe,opaque:S.transparent===!1&&S.blending===us&&S.alphaToCoverage===!1,alphaMap:xe,alphaTest:Ae,alphaHash:nt,combine:S.combine,mapUv:N&&f(S.map.channel),aoMapUv:de&&f(S.aoMap.channel),lightMapUv:pe&&f(S.lightMap.channel),bumpMapUv:Te&&f(S.bumpMap.channel),normalMapUv:ne&&f(S.normalMap.channel),displacementMapUv:Ce&&f(S.displacementMap.channel),emissiveMapUv:Se&&f(S.emissiveMap.channel),metalnessMapUv:P&&f(S.metalnessMap.channel),roughnessMapUv:A&&f(S.roughnessMap.channel),anisotropyMapUv:be&&f(S.anisotropyMap.channel),clearcoatMapUv:ze&&f(S.clearcoatMap.channel),clearcoatNormalMapUv:le&&f(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&f(S.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&f(S.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&f(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&f(S.sheenColorMap.channel),sheenRoughnessMapUv:et&&f(S.sheenRoughnessMap.channel),specularMapUv:$e&&f(S.specularMap.channel),specularColorMapUv:ft&&f(S.specularColorMap.channel),specularIntensityMapUv:z&&f(S.specularIntensityMap.channel),transmissionMapUv:Ee&&f(S.transmissionMap.channel),thicknessMapUv:te&&f(S.thicknessMap.channel),alphaMapUv:xe&&f(S.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ne||$),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!I.attributes.uv&&(N||xe),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:m,skinning:G.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ve,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:Gt,decodeVideoTexture:N&&S.map.isVideoTexture===!0&&at.getTransfer(S.map.colorSpace)===vt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===en,flipSided:S.side===kt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:wt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&S.extensions.multiDraw===!0||ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return it.vertexUv1s=u.has(1),it.vertexUv2s=u.has(2),it.vertexUv3s=u.has(3),u.clear(),it}function x(S){const E=[];if(S.shaderID?E.push(S.shaderID):(E.push(S.customVertexShaderID),E.push(S.customFragmentShaderID)),S.defines!==void 0)for(const k in S.defines)E.push(k),E.push(S.defines[k]);return S.isRawShaderMaterial===!1&&(y(E,S),M(E,S),E.push(n.outputColorSpace)),E.push(S.customProgramCacheKey),E.join()}function y(S,E){S.push(E.precision),S.push(E.outputColorSpace),S.push(E.envMapMode),S.push(E.envMapCubeUVHeight),S.push(E.mapUv),S.push(E.alphaMapUv),S.push(E.lightMapUv),S.push(E.aoMapUv),S.push(E.bumpMapUv),S.push(E.normalMapUv),S.push(E.displacementMapUv),S.push(E.emissiveMapUv),S.push(E.metalnessMapUv),S.push(E.roughnessMapUv),S.push(E.anisotropyMapUv),S.push(E.clearcoatMapUv),S.push(E.clearcoatNormalMapUv),S.push(E.clearcoatRoughnessMapUv),S.push(E.iridescenceMapUv),S.push(E.iridescenceThicknessMapUv),S.push(E.sheenColorMapUv),S.push(E.sheenRoughnessMapUv),S.push(E.specularMapUv),S.push(E.specularColorMapUv),S.push(E.specularIntensityMapUv),S.push(E.transmissionMapUv),S.push(E.thicknessMapUv),S.push(E.combine),S.push(E.fogExp2),S.push(E.sizeAttenuation),S.push(E.morphTargetsCount),S.push(E.morphAttributeCount),S.push(E.numDirLights),S.push(E.numPointLights),S.push(E.numSpotLights),S.push(E.numSpotLightMaps),S.push(E.numHemiLights),S.push(E.numRectAreaLights),S.push(E.numDirLightShadows),S.push(E.numPointLightShadows),S.push(E.numSpotLightShadows),S.push(E.numSpotLightShadowsWithMaps),S.push(E.numLightProbes),S.push(E.shadowMapType),S.push(E.toneMapping),S.push(E.numClippingPlanes),S.push(E.numClipIntersection),S.push(E.depthPacking)}function M(S,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reverseDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.alphaToCoverage&&a.enable(20),S.push(a.mask)}function w(S){const E=v[S.type];let k;if(E){const B=Cn[E];k=ip.clone(B.uniforms)}else k=S.uniforms;return k}function b(S,E){let k;for(let B=0,G=c.length;B<G;B++){const O=c[B];if(O.cacheKey===E){k=O,++k.usedTimes;break}}return k===void 0&&(k=new gv(n,E,S,r),c.push(k)),k}function _(S){if(--S.usedTimes===0){const E=c.indexOf(S);c[E]=c[c.length-1],c.pop(),S.destroy()}}function T(S){l.remove(S)}function D(){l.dispose()}return{getParameters:g,getProgramCacheKey:x,getUniforms:w,acquireProgram:b,releaseProgram:_,releaseShaderCache:T,programs:c,dispose:D}}function Mv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function Sv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Eu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Au(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(p,m,d,h,v,f){let g=n[e];return g===void 0?(g={id:p.id,object:p,geometry:m,material:d,groupOrder:h,renderOrder:p.renderOrder,z:v,group:f},n[e]=g):(g.id=p.id,g.object=p,g.geometry=m,g.material=d,g.groupOrder=h,g.renderOrder=p.renderOrder,g.z=v,g.group=f),e++,g}function a(p,m,d,h,v,f){const g=o(p,m,d,h,v,f);d.transmission>0?i.push(g):d.transparent===!0?s.push(g):t.push(g)}function l(p,m,d,h,v,f){const g=o(p,m,d,h,v,f);d.transmission>0?i.unshift(g):d.transparent===!0?s.unshift(g):t.unshift(g)}function u(p,m){t.length>1&&t.sort(p||Sv),i.length>1&&i.sort(m||Eu),s.length>1&&s.sort(m||Eu)}function c(){for(let p=e,m=n.length;p<m;p++){const d=n[p];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:c,sort:u}}function bv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Au,n.set(i,[o])):s>=r.length?(o=new Au,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function wv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ge};break;case"SpotLight":t={position:new F,direction:new F,color:new Ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ge,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ge,groundColor:new Ge};break;case"RectAreaLight":t={color:new Ge,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function Ev(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Me,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Av=0;function Tv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Rv(n){const e=new wv,t=Ev(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new F);const s=new F,r=new ct,o=new ct;function a(u){let c=0,p=0,m=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let d=0,h=0,v=0,f=0,g=0,x=0,y=0,M=0,w=0,b=0,_=0;u.sort(Tv);for(let D=0,S=u.length;D<S;D++){const E=u[D],k=E.color,B=E.intensity,G=E.distance,O=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)c+=k.r*B,p+=k.g*B,m+=k.b*B;else if(E.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(E.sh.coefficients[I],B);_++}else if(E.isDirectionalLight){const I=e.get(E);if(I.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const X=E.shadow,U=t.get(E);U.shadowIntensity=X.intensity,U.shadowBias=X.bias,U.shadowNormalBias=X.normalBias,U.shadowRadius=X.radius,U.shadowMapSize=X.mapSize,i.directionalShadow[d]=U,i.directionalShadowMap[d]=O,i.directionalShadowMatrix[d]=E.shadow.matrix,x++}i.directional[d]=I,d++}else if(E.isSpotLight){const I=e.get(E);I.position.setFromMatrixPosition(E.matrixWorld),I.color.copy(k).multiplyScalar(B),I.distance=G,I.coneCos=Math.cos(E.angle),I.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),I.decay=E.decay,i.spot[v]=I;const X=E.shadow;if(E.map&&(i.spotLightMap[w]=E.map,w++,X.updateMatrices(E),E.castShadow&&b++),i.spotLightMatrix[v]=X.matrix,E.castShadow){const U=t.get(E);U.shadowIntensity=X.intensity,U.shadowBias=X.bias,U.shadowNormalBias=X.normalBias,U.shadowRadius=X.radius,U.shadowMapSize=X.mapSize,i.spotShadow[v]=U,i.spotShadowMap[v]=O,M++}v++}else if(E.isRectAreaLight){const I=e.get(E);I.color.copy(k).multiplyScalar(B),I.halfWidth.set(E.width*.5,0,0),I.halfHeight.set(0,E.height*.5,0),i.rectArea[f]=I,f++}else if(E.isPointLight){const I=e.get(E);if(I.color.copy(E.color).multiplyScalar(E.intensity),I.distance=E.distance,I.decay=E.decay,E.castShadow){const X=E.shadow,U=t.get(E);U.shadowIntensity=X.intensity,U.shadowBias=X.bias,U.shadowNormalBias=X.normalBias,U.shadowRadius=X.radius,U.shadowMapSize=X.mapSize,U.shadowCameraNear=X.camera.near,U.shadowCameraFar=X.camera.far,i.pointShadow[h]=U,i.pointShadowMap[h]=O,i.pointShadowMatrix[h]=E.shadow.matrix,y++}i.point[h]=I,h++}else if(E.isHemisphereLight){const I=e.get(E);I.skyColor.copy(E.color).multiplyScalar(B),I.groundColor.copy(E.groundColor).multiplyScalar(B),i.hemi[g]=I,g++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=p,i.ambient[2]=m;const T=i.hash;(T.directionalLength!==d||T.pointLength!==h||T.spotLength!==v||T.rectAreaLength!==f||T.hemiLength!==g||T.numDirectionalShadows!==x||T.numPointShadows!==y||T.numSpotShadows!==M||T.numSpotMaps!==w||T.numLightProbes!==_)&&(i.directional.length=d,i.spot.length=v,i.rectArea.length=f,i.point.length=h,i.hemi.length=g,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=M+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=_,T.directionalLength=d,T.pointLength=h,T.spotLength=v,T.rectAreaLength=f,T.hemiLength=g,T.numDirectionalShadows=x,T.numPointShadows=y,T.numSpotShadows=M,T.numSpotMaps=w,T.numLightProbes=_,i.version=Av++)}function l(u,c){let p=0,m=0,d=0,h=0,v=0;const f=c.matrixWorldInverse;for(let g=0,x=u.length;g<x;g++){const y=u[g];if(y.isDirectionalLight){const M=i.directional[p];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),p++}else if(y.isSpotLight){const M=i.spot[d];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),d++}else if(y.isRectAreaLight){const M=i.rectArea[h];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(f),o.identity(),r.copy(y.matrixWorld),r.premultiply(f),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),h++}else if(y.isPointLight){const M=i.point[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(f),m++}else if(y.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(f),v++}}}return{setup:a,setupView:l,state:i}}function Tu(n){const e=new Rv(n),t=[],i=[];function s(c){u.camera=c,t.length=0,i.length=0}function r(c){t.push(c)}function o(c){i.push(c)}function a(){e.setup(t)}function l(c){e.setupView(t,c)}const u={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Cv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Tu(n),e.set(s,[a])):r>=o.length?(a=new Tu(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Pv extends As{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Lv extends As{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dv=`uniform sampler2D shadow_pass;
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
}`;function Uv(n,e,t){let i=new il;const s=new Me,r=new Me,o=new St,a=new Pv({depthPacking:Ed}),l=new Lv,u={},c=t.maxTextureSize,p={[fi]:kt,[kt]:fi,[en]:en},m=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Me},radius:{value:4}},vertexShader:Iv,fragmentShader:Dv}),d=m.clone();d.defines.HORIZONTAL_PASS=1;const h=new Ct;h.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new pt(h,m),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eh;let g=this.type;this.render=function(b,_,T){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||b.length===0)return;const D=n.getRenderTarget(),S=n.getActiveCubeFace(),E=n.getActiveMipmapLevel(),k=n.state;k.setBlending(ui),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const B=g!==Gn&&this.type===Gn,G=g===Gn&&this.type!==Gn;for(let O=0,I=b.length;O<I;O++){const X=b[O],U=X.shadow;if(U===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(U.autoUpdate===!1&&U.needsUpdate===!1)continue;s.copy(U.mapSize);const re=U.getFrameExtents();if(s.multiply(re),r.copy(U.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/re.x),s.x=r.x*re.x,U.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/re.y),s.y=r.y*re.y,U.mapSize.y=r.y)),U.map===null||B===!0||G===!0){const he=this.type!==Gn?{minFilter:Vt,magFilter:Vt}:{};U.map!==null&&U.map.dispose(),U.map=new Li(s.x,s.y,he),U.map.texture.name=X.name+".shadowMap",U.camera.updateProjectionMatrix()}n.setRenderTarget(U.map),n.clear();const ce=U.getViewportCount();for(let he=0;he<ce;he++){const ee=U.getViewport(he);o.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),k.viewport(o),U.updateMatrices(X,he),i=U.getFrustum(),M(_,T,U.camera,X,this.type)}U.isPointLightShadow!==!0&&this.type===Gn&&x(U,T),U.needsUpdate=!1}g=this.type,f.needsUpdate=!1,n.setRenderTarget(D,S,E)};function x(b,_){const T=e.update(v);m.defines.VSM_SAMPLES!==b.blurSamples&&(m.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,m.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Li(s.x,s.y)),m.uniforms.shadow_pass.value=b.map.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(_,null,T,m,v,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(_,null,T,d,v,null)}function y(b,_,T,D){let S=null;const E=T.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(E!==void 0)S=E;else if(S=T.isPointLight===!0?l:a,n.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0){const k=S.uuid,B=_.uuid;let G=u[k];G===void 0&&(G={},u[k]=G);let O=G[B];O===void 0&&(O=S.clone(),G[B]=O,_.addEventListener("dispose",w)),S=O}if(S.visible=_.visible,S.wireframe=_.wireframe,D===Gn?S.side=_.shadowSide!==null?_.shadowSide:_.side:S.side=_.shadowSide!==null?_.shadowSide:p[_.side],S.alphaMap=_.alphaMap,S.alphaTest=_.alphaTest,S.map=_.map,S.clipShadows=_.clipShadows,S.clippingPlanes=_.clippingPlanes,S.clipIntersection=_.clipIntersection,S.displacementMap=_.displacementMap,S.displacementScale=_.displacementScale,S.displacementBias=_.displacementBias,S.wireframeLinewidth=_.wireframeLinewidth,S.linewidth=_.linewidth,T.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=n.properties.get(S);k.light=T}return S}function M(b,_,T,D,S){if(b.visible===!1)return;if(b.layers.test(_.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Gn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,b.matrixWorld);const B=e.update(b),G=b.material;if(Array.isArray(G)){const O=B.groups;for(let I=0,X=O.length;I<X;I++){const U=O[I],re=G[U.materialIndex];if(re&&re.visible){const ce=y(b,re,D,S);b.onBeforeShadow(n,b,_,T,B,ce,U),n.renderBufferDirect(T,null,B,ce,b,U),b.onAfterShadow(n,b,_,T,B,ce,U)}}}else if(G.visible){const O=y(b,G,D,S);b.onBeforeShadow(n,b,_,T,B,O,null),n.renderBufferDirect(T,null,B,O,b,null),b.onAfterShadow(n,b,_,T,B,O,null)}}const k=b.children;for(let B=0,G=k.length;B<G;B++)M(k[B],_,T,D,S)}function w(b){b.target.removeEventListener("dispose",w);for(const T in u){const D=u[T],S=b.target.uuid;S in D&&(D[S].dispose(),delete D[S])}}}const Nv={[Wa]:Xa,[qa]:ja,[$a]:Ka,[gs]:Ya,[Xa]:Wa,[ja]:qa,[Ka]:$a,[Ya]:gs};function Fv(n){function e(){let z=!1;const Ee=new St;let te=null;const oe=new St(0,0,0,0);return{setMask:function(xe){te!==xe&&!z&&(n.colorMask(xe,xe,xe,xe),te=xe)},setLocked:function(xe){z=xe},setClear:function(xe,Ae,nt,wt,Gt){Gt===!0&&(xe*=wt,Ae*=wt,nt*=wt),Ee.set(xe,Ae,nt,wt),oe.equals(Ee)===!1&&(n.clearColor(xe,Ae,nt,wt),oe.copy(Ee))},reset:function(){z=!1,te=null,oe.set(-1,0,0,0)}}}function t(){let z=!1,Ee=!1,te=null,oe=null,xe=null;return{setReversed:function(Ae){Ee=Ae},setTest:function(Ae){Ae?me(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(Ae){te!==Ae&&!z&&(n.depthMask(Ae),te=Ae)},setFunc:function(Ae){if(Ee&&(Ae=Nv[Ae]),oe!==Ae){switch(Ae){case Wa:n.depthFunc(n.NEVER);break;case Xa:n.depthFunc(n.ALWAYS);break;case qa:n.depthFunc(n.LESS);break;case gs:n.depthFunc(n.LEQUAL);break;case $a:n.depthFunc(n.EQUAL);break;case Ya:n.depthFunc(n.GEQUAL);break;case ja:n.depthFunc(n.GREATER);break;case Ka:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}oe=Ae}},setLocked:function(Ae){z=Ae},setClear:function(Ae){xe!==Ae&&(n.clearDepth(Ae),xe=Ae)},reset:function(){z=!1,te=null,oe=null,xe=null}}}function i(){let z=!1,Ee=null,te=null,oe=null,xe=null,Ae=null,nt=null,wt=null,Gt=null;return{setTest:function(it){z||(it?me(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(it){Ee!==it&&!z&&(n.stencilMask(it),Ee=it)},setFunc:function(it,Wt,Fn){(te!==it||oe!==Wt||xe!==Fn)&&(n.stencilFunc(it,Wt,Fn),te=it,oe=Wt,xe=Fn)},setOp:function(it,Wt,Fn){(Ae!==it||nt!==Wt||wt!==Fn)&&(n.stencilOp(it,Wt,Fn),Ae=it,nt=Wt,wt=Fn)},setLocked:function(it){z=it},setClear:function(it){Gt!==it&&(n.clearStencil(it),Gt=it)},reset:function(){z=!1,Ee=null,te=null,oe=null,xe=null,Ae=null,nt=null,wt=null,Gt=null}}}const s=new e,r=new t,o=new i,a=new WeakMap,l=new WeakMap;let u={},c={},p=new WeakMap,m=[],d=null,h=!1,v=null,f=null,g=null,x=null,y=null,M=null,w=null,b=new Ge(0,0,0),_=0,T=!1,D=null,S=null,E=null,k=null,B=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,I=0;const X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(X)[1]),O=I>=1):X.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),O=I>=2);let U=null,re={};const ce=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),ee=new St().fromArray(ce),ve=new St().fromArray(he);function K(z,Ee,te,oe){const xe=new Uint8Array(4),Ae=n.createTexture();n.bindTexture(z,Ae),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let nt=0;nt<te;nt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(Ee,0,n.RGBA,1,1,oe,0,n.RGBA,n.UNSIGNED_BYTE,xe):n.texImage2D(Ee+nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,xe);return Ae}const j={};j[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),me(n.DEPTH_TEST),r.setFunc(gs),pe(!1),Te(Ul),me(n.CULL_FACE),L(ui);function me(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function fe(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function W(z,Ee){return c[z]!==Ee?(n.bindFramebuffer(z,Ee),c[z]=Ee,z===n.DRAW_FRAMEBUFFER&&(c[n.FRAMEBUFFER]=Ee),z===n.FRAMEBUFFER&&(c[n.DRAW_FRAMEBUFFER]=Ee),!0):!1}function Q(z,Ee){let te=m,oe=!1;if(z){te=p.get(Ee),te===void 0&&(te=[],p.set(Ee,te));const xe=z.textures;if(te.length!==xe.length||te[0]!==n.COLOR_ATTACHMENT0){for(let Ae=0,nt=xe.length;Ae<nt;Ae++)te[Ae]=n.COLOR_ATTACHMENT0+Ae;te.length=xe.length,oe=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,oe=!0);oe&&n.drawBuffers(te)}function ie(z){return d!==z?(n.useProgram(z),d=z,!0):!1}const N={[Ei]:n.FUNC_ADD,[Jf]:n.FUNC_SUBTRACT,[Zf]:n.FUNC_REVERSE_SUBTRACT};N[Qf]=n.MIN,N[ed]=n.MAX;const q={[td]:n.ZERO,[nd]:n.ONE,[id]:n.SRC_COLOR,[Va]:n.SRC_ALPHA,[ld]:n.SRC_ALPHA_SATURATE,[ad]:n.DST_COLOR,[rd]:n.DST_ALPHA,[sd]:n.ONE_MINUS_SRC_COLOR,[Ga]:n.ONE_MINUS_SRC_ALPHA,[cd]:n.ONE_MINUS_DST_COLOR,[od]:n.ONE_MINUS_DST_ALPHA,[ud]:n.CONSTANT_COLOR,[hd]:n.ONE_MINUS_CONSTANT_COLOR,[fd]:n.CONSTANT_ALPHA,[dd]:n.ONE_MINUS_CONSTANT_ALPHA};function L(z,Ee,te,oe,xe,Ae,nt,wt,Gt,it){if(z===ui){h===!0&&(fe(n.BLEND),h=!1);return}if(h===!1&&(me(n.BLEND),h=!0),z!==Kf){if(z!==v||it!==T){if((f!==Ei||y!==Ei)&&(n.blendEquation(n.FUNC_ADD),f=Ei,y=Ei),it)switch(z){case us:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nl:n.blendFunc(n.ONE,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case us:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Nl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Fl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}g=null,x=null,M=null,w=null,b.set(0,0,0),_=0,v=z,T=it}return}xe=xe||Ee,Ae=Ae||te,nt=nt||oe,(Ee!==f||xe!==y)&&(n.blendEquationSeparate(N[Ee],N[xe]),f=Ee,y=xe),(te!==g||oe!==x||Ae!==M||nt!==w)&&(n.blendFuncSeparate(q[te],q[oe],q[Ae],q[nt]),g=te,x=oe,M=Ae,w=nt),(wt.equals(b)===!1||Gt!==_)&&(n.blendColor(wt.r,wt.g,wt.b,Gt),b.copy(wt),_=Gt),v=z,T=!1}function de(z,Ee){z.side===en?fe(n.CULL_FACE):me(n.CULL_FACE);let te=z.side===kt;Ee&&(te=!te),pe(te),z.blending===us&&z.transparent===!1?L(ui):L(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),r.setFunc(z.depthFunc),r.setTest(z.depthTest),r.setMask(z.depthWrite),s.setMask(z.colorWrite);const oe=z.stencilWrite;o.setTest(oe),oe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Ce(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?me(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function pe(z){D!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),D=z)}function Te(z){z!==Yf?(me(n.CULL_FACE),z!==S&&(z===Ul?n.cullFace(n.BACK):z===jf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),S=z}function ne(z){z!==E&&(O&&n.lineWidth(z),E=z)}function Ce(z,Ee,te){z?(me(n.POLYGON_OFFSET_FILL),(k!==Ee||B!==te)&&(n.polygonOffset(Ee,te),k=Ee,B=te)):fe(n.POLYGON_OFFSET_FILL)}function Se(z){z?me(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)}function P(z){z===void 0&&(z=n.TEXTURE0+G-1),U!==z&&(n.activeTexture(z),U=z)}function A(z,Ee,te){te===void 0&&(U===null?te=n.TEXTURE0+G-1:te=U);let oe=re[te];oe===void 0&&(oe={type:void 0,texture:void 0},re[te]=oe),(oe.type!==z||oe.texture!==Ee)&&(U!==te&&(n.activeTexture(te),U=te),n.bindTexture(z,Ee||j[z]),oe.type=z,oe.texture=Ee)}function $(){const z=re[U];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function se(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ae(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Re(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function _e(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function be(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ze(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function le(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function He(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function qe(z){ee.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),ee.copy(z))}function Pe(z){ve.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),ve.copy(z))}function et(z,Ee){let te=l.get(Ee);te===void 0&&(te=new WeakMap,l.set(Ee,te));let oe=te.get(z);oe===void 0&&(oe=n.getUniformBlockIndex(Ee,z.name),te.set(z,oe))}function $e(z,Ee){const oe=l.get(Ee).get(z);a.get(Ee)!==oe&&(n.uniformBlockBinding(Ee,oe,z.__bindingPointIndex),a.set(Ee,oe))}function ft(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},U=null,re={},c={},p=new WeakMap,m=[],d=null,h=!1,v=null,f=null,g=null,x=null,y=null,M=null,w=null,b=new Ge(0,0,0),_=0,T=!1,D=null,S=null,E=null,k=null,B=null,ee.set(0,0,n.canvas.width,n.canvas.height),ve.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:me,disable:fe,bindFramebuffer:W,drawBuffers:Q,useProgram:ie,setBlending:L,setMaterial:de,setFlipSided:pe,setCullFace:Te,setLineWidth:ne,setPolygonOffset:Ce,setScissorTest:Se,activeTexture:P,bindTexture:A,unbindTexture:$,compressedTexImage2D:se,compressedTexImage3D:ae,texImage2D:we,texImage3D:He,updateUBOMapping:et,uniformBlockBinding:$e,texStorage2D:ze,texStorage3D:le,texSubImage2D:Z,texSubImage3D:Re,compressedTexSubImage2D:_e,compressedTexSubImage3D:be,scissor:qe,viewport:Pe,reset:ft}}function Ru(n,e,t,i){const s=kv(i);switch(t){case Lh:return n*e;case Dh:return n*e;case Uh:return n*e*2;case Jc:return n*e/s.components*s.byteLength;case Zc:return n*e/s.components*s.byteLength;case Nh:return n*e*2/s.components*s.byteLength;case Qc:return n*e*2/s.components*s.byteLength;case Ih:return n*e*3/s.components*s.byteLength;case pn:return n*e*4/s.components*s.byteLength;case el:return n*e*4/s.components*s.byteLength;case ro:case oo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ao:case co:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case nc:case sc:return Math.max(n,16)*Math.max(e,8)/4;case tc:case ic:return Math.max(n,8)*Math.max(e,8)/2;case rc:case oc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ac:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case cc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case uc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case hc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case fc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case dc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case pc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case mc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case gc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case vc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case _c:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case yc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Mc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case lo:case Sc:case bc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Fh:case wc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ec:case Ac:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kv(n){switch(n){case jn:case Rh:return{byteLength:1,components:1};case ar:case Ch:case gr:return{byteLength:2,components:1};case jc:case Kc:return{byteLength:2,components:4};case Pi:case Yc:case In:return{byteLength:4,components:1};case Ph:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Ov(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Me,c=new WeakMap;let p;const m=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(P,A){return d?new OffscreenCanvas(P,A):yo("canvas")}function v(P,A,$){let se=1;const ae=Se(P);if((ae.width>$||ae.height>$)&&(se=$/Math.max(ae.width,ae.height)),se<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(se*ae.width),Re=Math.floor(se*ae.height);p===void 0&&(p=h(Z,Re));const _e=A?h(Z,Re):p;return _e.width=Z,_e.height=Re,_e.getContext("2d").drawImage(P,0,0,Z,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Z+"x"+Re+")."),_e}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function f(P){return P.generateMipmaps&&P.minFilter!==Vt&&P.minFilter!==bn}function g(P){n.generateMipmap(P)}function x(P,A,$,se,ae=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=A;if(A===n.RED&&($===n.FLOAT&&(Z=n.R32F),$===n.HALF_FLOAT&&(Z=n.R16F),$===n.UNSIGNED_BYTE&&(Z=n.R8)),A===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(Z=n.R8UI),$===n.UNSIGNED_SHORT&&(Z=n.R16UI),$===n.UNSIGNED_INT&&(Z=n.R32UI),$===n.BYTE&&(Z=n.R8I),$===n.SHORT&&(Z=n.R16I),$===n.INT&&(Z=n.R32I)),A===n.RG&&($===n.FLOAT&&(Z=n.RG32F),$===n.HALF_FLOAT&&(Z=n.RG16F),$===n.UNSIGNED_BYTE&&(Z=n.RG8)),A===n.RG_INTEGER&&($===n.UNSIGNED_BYTE&&(Z=n.RG8UI),$===n.UNSIGNED_SHORT&&(Z=n.RG16UI),$===n.UNSIGNED_INT&&(Z=n.RG32UI),$===n.BYTE&&(Z=n.RG8I),$===n.SHORT&&(Z=n.RG16I),$===n.INT&&(Z=n.RG32I)),A===n.RGB_INTEGER&&($===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),$===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),$===n.UNSIGNED_INT&&(Z=n.RGB32UI),$===n.BYTE&&(Z=n.RGB8I),$===n.SHORT&&(Z=n.RGB16I),$===n.INT&&(Z=n.RGB32I)),A===n.RGBA_INTEGER&&($===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),$===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),$===n.UNSIGNED_INT&&(Z=n.RGBA32UI),$===n.BYTE&&(Z=n.RGBA8I),$===n.SHORT&&(Z=n.RGBA16I),$===n.INT&&(Z=n.RGBA32I)),A===n.RGB&&$===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),A===n.RGBA){const Re=ae?go:at.getTransfer(se);$===n.FLOAT&&(Z=n.RGBA32F),$===n.HALF_FLOAT&&(Z=n.RGBA16F),$===n.UNSIGNED_BYTE&&(Z=Re===vt?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(P,A){let $;return P?A===null||A===Pi||A===xs?$=n.DEPTH24_STENCIL8:A===In?$=n.DEPTH32F_STENCIL8:A===ar&&($=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Pi||A===xs?$=n.DEPTH_COMPONENT24:A===In?$=n.DEPTH_COMPONENT32F:A===ar&&($=n.DEPTH_COMPONENT16),$}function M(P,A){return f(P)===!0||P.isFramebufferTexture&&P.minFilter!==Vt&&P.minFilter!==bn?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function w(P){const A=P.target;A.removeEventListener("dispose",w),_(A),A.isVideoTexture&&c.delete(A)}function b(P){const A=P.target;A.removeEventListener("dispose",b),D(A)}function _(P){const A=i.get(P);if(A.__webglInit===void 0)return;const $=P.source,se=m.get($);if(se){const ae=se[A.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&T(P),Object.keys(se).length===0&&m.delete($)}i.remove(P)}function T(P){const A=i.get(P);n.deleteTexture(A.__webglTexture);const $=P.source,se=m.get($);delete se[A.__cacheKey],o.memory.textures--}function D(P){const A=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(A.__webglFramebuffer[se]))for(let ae=0;ae<A.__webglFramebuffer[se].length;ae++)n.deleteFramebuffer(A.__webglFramebuffer[se][ae]);else n.deleteFramebuffer(A.__webglFramebuffer[se]);A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer[se])}else{if(Array.isArray(A.__webglFramebuffer))for(let se=0;se<A.__webglFramebuffer.length;se++)n.deleteFramebuffer(A.__webglFramebuffer[se]);else n.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&n.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&n.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let se=0;se<A.__webglColorRenderbuffer.length;se++)A.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(A.__webglColorRenderbuffer[se]);A.__webglDepthRenderbuffer&&n.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const $=P.textures;for(let se=0,ae=$.length;se<ae;se++){const Z=i.get($[se]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove($[se])}i.remove(P)}let S=0;function E(){S=0}function k(){const P=S;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),S+=1,P}function B(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function G(P,A){const $=i.get(P);if(P.isVideoTexture&&ne(P),P.isRenderTargetTexture===!1&&P.version>0&&$.__version!==P.version){const se=P.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ve($,P,A);return}}t.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+A)}function O(P,A){const $=i.get(P);if(P.version>0&&$.__version!==P.version){ve($,P,A);return}t.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+A)}function I(P,A){const $=i.get(P);if(P.version>0&&$.__version!==P.version){ve($,P,A);return}t.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+A)}function X(P,A){const $=i.get(P);if(P.version>0&&$.__version!==P.version){K($,P,A);return}t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+A)}const U={[Qa]:n.REPEAT,[Ri]:n.CLAMP_TO_EDGE,[ec]:n.MIRRORED_REPEAT},re={[Vt]:n.NEAREST,[bd]:n.NEAREST_MIPMAP_NEAREST,[Sr]:n.NEAREST_MIPMAP_LINEAR,[bn]:n.LINEAR,[Vo]:n.LINEAR_MIPMAP_NEAREST,[Ci]:n.LINEAR_MIPMAP_LINEAR},ce={[Td]:n.NEVER,[Dd]:n.ALWAYS,[Rd]:n.LESS,[kh]:n.LEQUAL,[Cd]:n.EQUAL,[Id]:n.GEQUAL,[Pd]:n.GREATER,[Ld]:n.NOTEQUAL};function he(P,A){if(A.type===In&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===bn||A.magFilter===Vo||A.magFilter===Sr||A.magFilter===Ci||A.minFilter===bn||A.minFilter===Vo||A.minFilter===Sr||A.minFilter===Ci)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,U[A.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,U[A.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,U[A.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,re[A.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,re[A.minFilter]),A.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,ce[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Vt||A.minFilter!==Sr&&A.minFilter!==Ci||A.type===In&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function ee(P,A){let $=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",w));const se=A.source;let ae=m.get(se);ae===void 0&&(ae={},m.set(se,ae));const Z=B(A);if(Z!==P.__cacheKey){ae[Z]===void 0&&(ae[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,$=!0),ae[Z].usedTimes++;const Re=ae[P.__cacheKey];Re!==void 0&&(ae[P.__cacheKey].usedTimes--,Re.usedTimes===0&&T(A)),P.__cacheKey=Z,P.__webglTexture=ae[Z].texture}return $}function ve(P,A,$){let se=n.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),A.isData3DTexture&&(se=n.TEXTURE_3D);const ae=ee(P,A),Z=A.source;t.bindTexture(se,P.__webglTexture,n.TEXTURE0+$);const Re=i.get(Z);if(Z.version!==Re.__version||ae===!0){t.activeTexture(n.TEXTURE0+$);const _e=at.getPrimaries(at.workingColorSpace),be=A.colorSpace===ci?null:at.getPrimaries(A.colorSpace),ze=A.colorSpace===ci||_e===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let le=v(A.image,!1,s.maxTextureSize);le=Ce(A,le);const we=r.convert(A.format,A.colorSpace),He=r.convert(A.type);let qe=x(A.internalFormat,we,He,A.colorSpace,A.isVideoTexture);he(se,A);let Pe;const et=A.mipmaps,$e=A.isVideoTexture!==!0,ft=Re.__version===void 0||ae===!0,z=Z.dataReady,Ee=M(A,le);if(A.isDepthTexture)qe=y(A.format===ys,A.type),ft&&($e?t.texStorage2D(n.TEXTURE_2D,1,qe,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,qe,le.width,le.height,0,we,He,null));else if(A.isDataTexture)if(et.length>0){$e&&ft&&t.texStorage2D(n.TEXTURE_2D,Ee,qe,et[0].width,et[0].height);for(let te=0,oe=et.length;te<oe;te++)Pe=et[te],$e?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,Pe.width,Pe.height,we,He,Pe.data):t.texImage2D(n.TEXTURE_2D,te,qe,Pe.width,Pe.height,0,we,He,Pe.data);A.generateMipmaps=!1}else $e?(ft&&t.texStorage2D(n.TEXTURE_2D,Ee,qe,le.width,le.height),z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le.width,le.height,we,He,le.data)):t.texImage2D(n.TEXTURE_2D,0,qe,le.width,le.height,0,we,He,le.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){$e&&ft&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,qe,et[0].width,et[0].height,le.depth);for(let te=0,oe=et.length;te<oe;te++)if(Pe=et[te],A.format!==pn)if(we!==null)if($e){if(z)if(A.layerUpdates.size>0){const xe=Ru(Pe.width,Pe.height,A.format,A.type);for(const Ae of A.layerUpdates){const nt=Pe.data.subarray(Ae*xe/Pe.data.BYTES_PER_ELEMENT,(Ae+1)*xe/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,Ae,Pe.width,Pe.height,1,we,nt,0,0)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,Pe.width,Pe.height,le.depth,we,Pe.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,qe,Pe.width,Pe.height,le.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,Pe.width,Pe.height,le.depth,we,He,Pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,qe,Pe.width,Pe.height,le.depth,0,we,He,Pe.data)}else{$e&&ft&&t.texStorage2D(n.TEXTURE_2D,Ee,qe,et[0].width,et[0].height);for(let te=0,oe=et.length;te<oe;te++)Pe=et[te],A.format!==pn?we!==null?$e?z&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,Pe.width,Pe.height,we,Pe.data):t.compressedTexImage2D(n.TEXTURE_2D,te,qe,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,Pe.width,Pe.height,we,He,Pe.data):t.texImage2D(n.TEXTURE_2D,te,qe,Pe.width,Pe.height,0,we,He,Pe.data)}else if(A.isDataArrayTexture)if($e){if(ft&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,qe,le.width,le.height,le.depth),z)if(A.layerUpdates.size>0){const te=Ru(le.width,le.height,A.format,A.type);for(const oe of A.layerUpdates){const xe=le.data.subarray(oe*te/le.data.BYTES_PER_ELEMENT,(oe+1)*te/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,oe,le.width,le.height,1,we,He,xe)}A.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,we,He,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,qe,le.width,le.height,le.depth,0,we,He,le.data);else if(A.isData3DTexture)$e?(ft&&t.texStorage3D(n.TEXTURE_3D,Ee,qe,le.width,le.height,le.depth),z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,we,He,le.data)):t.texImage3D(n.TEXTURE_3D,0,qe,le.width,le.height,le.depth,0,we,He,le.data);else if(A.isFramebufferTexture){if(ft)if($e)t.texStorage2D(n.TEXTURE_2D,Ee,qe,le.width,le.height);else{let te=le.width,oe=le.height;for(let xe=0;xe<Ee;xe++)t.texImage2D(n.TEXTURE_2D,xe,qe,te,oe,0,we,He,null),te>>=1,oe>>=1}}else if(et.length>0){if($e&&ft){const te=Se(et[0]);t.texStorage2D(n.TEXTURE_2D,Ee,qe,te.width,te.height)}for(let te=0,oe=et.length;te<oe;te++)Pe=et[te],$e?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,we,He,Pe):t.texImage2D(n.TEXTURE_2D,te,qe,we,He,Pe);A.generateMipmaps=!1}else if($e){if(ft){const te=Se(le);t.texStorage2D(n.TEXTURE_2D,Ee,qe,te.width,te.height)}z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,He,le)}else t.texImage2D(n.TEXTURE_2D,0,qe,we,He,le);f(A)&&g(se),Re.__version=Z.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function K(P,A,$){if(A.image.length!==6)return;const se=ee(P,A),ae=A.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+$);const Z=i.get(ae);if(ae.version!==Z.__version||se===!0){t.activeTexture(n.TEXTURE0+$);const Re=at.getPrimaries(at.workingColorSpace),_e=A.colorSpace===ci?null:at.getPrimaries(A.colorSpace),be=A.colorSpace===ci||Re===_e?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,A.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,A.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const ze=A.isCompressedTexture||A.image[0].isCompressedTexture,le=A.image[0]&&A.image[0].isDataTexture,we=[];for(let oe=0;oe<6;oe++)!ze&&!le?we[oe]=v(A.image[oe],!0,s.maxCubemapSize):we[oe]=le?A.image[oe].image:A.image[oe],we[oe]=Ce(A,we[oe]);const He=we[0],qe=r.convert(A.format,A.colorSpace),Pe=r.convert(A.type),et=x(A.internalFormat,qe,Pe,A.colorSpace),$e=A.isVideoTexture!==!0,ft=Z.__version===void 0||se===!0,z=ae.dataReady;let Ee=M(A,He);he(n.TEXTURE_CUBE_MAP,A);let te;if(ze){$e&&ft&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,et,He.width,He.height);for(let oe=0;oe<6;oe++){te=we[oe].mipmaps;for(let xe=0;xe<te.length;xe++){const Ae=te[xe];A.format!==pn?qe!==null?$e?z&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe,0,0,Ae.width,Ae.height,qe,Ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe,et,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe,0,0,Ae.width,Ae.height,qe,Pe,Ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe,et,Ae.width,Ae.height,0,qe,Pe,Ae.data)}}}else{if(te=A.mipmaps,$e&&ft){te.length>0&&Ee++;const oe=Se(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,et,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(le){$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,we[oe].width,we[oe].height,qe,Pe,we[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,et,we[oe].width,we[oe].height,0,qe,Pe,we[oe].data);for(let xe=0;xe<te.length;xe++){const nt=te[xe].image[oe].image;$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe+1,0,0,nt.width,nt.height,qe,Pe,nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe+1,et,nt.width,nt.height,0,qe,Pe,nt.data)}}else{$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,qe,Pe,we[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,et,qe,Pe,we[oe]);for(let xe=0;xe<te.length;xe++){const Ae=te[xe];$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe+1,0,0,qe,Pe,Ae.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,xe+1,et,qe,Pe,Ae.image[oe])}}}f(A)&&g(n.TEXTURE_CUBE_MAP),Z.__version=ae.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function j(P,A,$,se,ae,Z){const Re=r.convert($.format,$.colorSpace),_e=r.convert($.type),be=x($.internalFormat,Re,_e,$.colorSpace);if(!i.get(A).__hasExternalTextures){const le=Math.max(1,A.width>>Z),we=Math.max(1,A.height>>Z);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,Z,be,le,we,A.depth,0,Re,_e,null):t.texImage2D(ae,Z,be,le,we,0,Re,_e,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Te(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,ae,i.get($).__webglTexture,0,pe(A)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,ae,i.get($).__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function me(P,A,$){if(n.bindRenderbuffer(n.RENDERBUFFER,P),A.depthBuffer){const se=A.depthTexture,ae=se&&se.isDepthTexture?se.type:null,Z=y(A.stencilBuffer,ae),Re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=pe(A);Te(A)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e,Z,A.width,A.height):$?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e,Z,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,Z,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Re,n.RENDERBUFFER,P)}else{const se=A.textures;for(let ae=0;ae<se.length;ae++){const Z=se[ae],Re=r.convert(Z.format,Z.colorSpace),_e=r.convert(Z.type),be=x(Z.internalFormat,Re,_e,Z.colorSpace),ze=pe(A);$&&Te(A)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ze,be,A.width,A.height):Te(A)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ze,be,A.width,A.height):n.renderbufferStorage(n.RENDERBUFFER,be,A.width,A.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),G(A.depthTexture,0);const se=i.get(A.depthTexture).__webglTexture,ae=pe(A);if(A.depthTexture.format===hs)Te(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(A.depthTexture.format===ys)Te(A)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function W(P){const A=i.get(P),$=P.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==P.depthTexture){const se=P.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),se){const ae=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,se.removeEventListener("dispose",ae)};se.addEventListener("dispose",ae),A.__depthDisposeCallback=ae}A.__boundDepthTexture=se}if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");fe(A.__webglFramebuffer,P)}else if($){A.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer[se]),A.__webglDepthbuffer[se]===void 0)A.__webglDepthbuffer[se]=n.createRenderbuffer(),me(A.__webglDepthbuffer[se],P,!1);else{const ae=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=A.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=n.createRenderbuffer(),me(A.__webglDepthbuffer,P,!1);else{const se=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=A.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,ae)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Q(P,A,$){const se=i.get(P);A!==void 0&&j(se.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&W(P)}function ie(P){const A=P.texture,$=i.get(P),se=i.get(A);P.addEventListener("dispose",b);const ae=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Re=ae.length>1;if(Re||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=A.version,o.memory.textures++),Z){$.__webglFramebuffer=[];for(let _e=0;_e<6;_e++)if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer[_e]=[];for(let be=0;be<A.mipmaps.length;be++)$.__webglFramebuffer[_e][be]=n.createFramebuffer()}else $.__webglFramebuffer[_e]=n.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){$.__webglFramebuffer=[];for(let _e=0;_e<A.mipmaps.length;_e++)$.__webglFramebuffer[_e]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(Re)for(let _e=0,be=ae.length;_e<be;_e++){const ze=i.get(ae[_e]);ze.__webglTexture===void 0&&(ze.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Te(P)===!1){$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let _e=0;_e<ae.length;_e++){const be=ae[_e];$.__webglColorRenderbuffer[_e]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[_e]);const ze=r.convert(be.format,be.colorSpace),le=r.convert(be.type),we=x(be.internalFormat,ze,le,be.colorSpace,P.isXRRenderTarget===!0),He=pe(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,He,we,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+_e,n.RENDERBUFFER,$.__webglColorRenderbuffer[_e])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),me($.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),he(n.TEXTURE_CUBE_MAP,A);for(let _e=0;_e<6;_e++)if(A.mipmaps&&A.mipmaps.length>0)for(let be=0;be<A.mipmaps.length;be++)j($.__webglFramebuffer[_e][be],P,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,be);else j($.__webglFramebuffer[_e],P,A,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0);f(A)&&g(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let _e=0,be=ae.length;_e<be;_e++){const ze=ae[_e],le=i.get(ze);t.bindTexture(n.TEXTURE_2D,le.__webglTexture),he(n.TEXTURE_2D,ze),j($.__webglFramebuffer,P,ze,n.COLOR_ATTACHMENT0+_e,n.TEXTURE_2D,0),f(ze)&&g(n.TEXTURE_2D)}t.unbindTexture()}else{let _e=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(_e=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(_e,se.__webglTexture),he(_e,A),A.mipmaps&&A.mipmaps.length>0)for(let be=0;be<A.mipmaps.length;be++)j($.__webglFramebuffer[be],P,A,n.COLOR_ATTACHMENT0,_e,be);else j($.__webglFramebuffer,P,A,n.COLOR_ATTACHMENT0,_e,0);f(A)&&g(_e),t.unbindTexture()}P.depthBuffer&&W(P)}function N(P){const A=P.textures;for(let $=0,se=A.length;$<se;$++){const ae=A[$];if(f(ae)){const Z=P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Re=i.get(ae).__webglTexture;t.bindTexture(Z,Re),g(Z),t.unbindTexture()}}}const q=[],L=[];function de(P){if(P.samples>0){if(Te(P)===!1){const A=P.textures,$=P.width,se=P.height;let ae=n.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Re=i.get(P),_e=A.length>1;if(_e)for(let be=0;be<A.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let be=0;be<A.length;be++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),_e){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ze=i.get(A[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ze,0)}n.blitFramebuffer(0,0,$,se,0,0,$,se,ae,n.NEAREST),l===!0&&(q.length=0,L.length=0,q.push(n.COLOR_ATTACHMENT0+be),P.depthBuffer&&P.resolveDepthBuffer===!1&&(q.push(Z),L.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,L)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,q))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),_e)for(let be=0;be<A.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ze=i.get(A[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const A=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[A])}}}function pe(P){return Math.min(s.maxSamples,P.samples)}function Te(P){const A=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function ne(P){const A=o.render.frame;c.get(P)!==A&&(c.set(P,A),P.update())}function Ce(P,A){const $=P.colorSpace,se=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||$!==di&&$!==ci&&(at.getTransfer($)===vt?(se!==pn||ae!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),A}function Se(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(u.width=P.naturalWidth||P.width,u.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(u.width=P.displayWidth,u.height=P.displayHeight):(u.width=P.width,u.height=P.height),u}this.allocateTextureUnit=k,this.resetTextureUnits=E,this.setTexture2D=G,this.setTexture2DArray=O,this.setTexture3D=I,this.setTextureCube=X,this.rebindTextures=Q,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=de,this.setupDepthRenderbuffer=W,this.setupFrameBufferTexture=j,this.useMultisampledRTT=Te}function zv(n,e){function t(i,s=ci){let r;const o=at.getTransfer(s);if(i===jn)return n.UNSIGNED_BYTE;if(i===jc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Kc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ph)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Rh)return n.BYTE;if(i===Ch)return n.SHORT;if(i===ar)return n.UNSIGNED_SHORT;if(i===Yc)return n.INT;if(i===Pi)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===gr)return n.HALF_FLOAT;if(i===Lh)return n.ALPHA;if(i===Ih)return n.RGB;if(i===pn)return n.RGBA;if(i===Dh)return n.LUMINANCE;if(i===Uh)return n.LUMINANCE_ALPHA;if(i===hs)return n.DEPTH_COMPONENT;if(i===ys)return n.DEPTH_STENCIL;if(i===Jc)return n.RED;if(i===Zc)return n.RED_INTEGER;if(i===Nh)return n.RG;if(i===Qc)return n.RG_INTEGER;if(i===el)return n.RGBA_INTEGER;if(i===ro||i===oo||i===ao||i===co)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ro)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ro)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===oo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tc||i===nc||i===ic||i===sc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ic)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===rc||i===oc||i===ac)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===rc||i===oc)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ac)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===cc||i===lc||i===uc||i===hc||i===fc||i===dc||i===pc||i===mc||i===gc||i===vc||i===_c||i===xc||i===yc||i===Mc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===cc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===uc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===dc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===pc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_c)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lo||i===Sc||i===bc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===lo)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Sc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Fh||i===wc||i===Ec||i===Ac)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===lo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===wc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ec)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ac)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Bv extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class dt extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hv={type:"move"};class _a{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const v of e.hand.values()){const f=t.getJointPose(v,i),g=this._getHandJoint(u,v);f!==null&&(g.matrix.fromArray(f.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=f.radius),g.visible=f!==null}const c=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],m=c.position.distanceTo(p.position),d=.02,h=.005;u.inputState.pinching&&m>d+h?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&m<=d-h&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new dt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Vv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gv=`
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

}`;class Wv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Ot,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Tn({vertexShader:Vv,fragmentShader:Gv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new Ii(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Xv extends ws{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,u=null,c=null,p=null,m=null,d=null,h=null;const v=new Wv,f=t.getContextAttributes();let g=null,x=null;const y=[],M=[],w=new Me;let b=null;const _=new dn;_.layers.enable(1),_.viewport=new St;const T=new dn;T.layers.enable(2),T.viewport=new St;const D=[_,T],S=new Bv;S.layers.enable(1),S.layers.enable(2);let E=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let j=y[K];return j===void 0&&(j=new _a,y[K]=j),j.getTargetRaySpace()},this.getControllerGrip=function(K){let j=y[K];return j===void 0&&(j=new _a,y[K]=j),j.getGripSpace()},this.getHand=function(K){let j=y[K];return j===void 0&&(j=new _a,y[K]=j),j.getHandSpace()};function B(K){const j=M.indexOf(K.inputSource);if(j===-1)return;const me=y[j];me!==void 0&&(me.update(K.inputSource,K.frame,u||o),me.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",O);for(let K=0;K<y.length;K++){const j=M[K];j!==null&&(M[K]=null,y[K].disconnect(j))}E=null,k=null,v.reset(),e.setRenderTarget(g),d=null,m=null,p=null,s=null,x=null,ve.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(K){u=K},this.getBaseLayer=function(){return m!==null?m:d},this.getBinding=function(){return p},this.getFrame=function(){return h},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",G),s.addEventListener("inputsourceschange",O),f.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(w),s.renderState.layers===void 0){const j={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),x=new Li(d.framebufferWidth,d.framebufferHeight,{format:pn,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let j=null,me=null,fe=null;f.depth&&(fe=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=f.stencil?ys:hs,me=f.stencil?xs:Pi);const W={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};p=new XRWebGLBinding(s,t),m=p.createProjectionLayer(W),s.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),x=new Li(m.textureWidth,m.textureHeight,{format:pn,type:jn,depthTexture:new Kh(m.textureWidth,m.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await s.requestReferenceSpace(a),ve.setContext(s),ve.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function O(K){for(let j=0;j<K.removed.length;j++){const me=K.removed[j],fe=M.indexOf(me);fe>=0&&(M[fe]=null,y[fe].disconnect(me))}for(let j=0;j<K.added.length;j++){const me=K.added[j];let fe=M.indexOf(me);if(fe===-1){for(let Q=0;Q<y.length;Q++)if(Q>=M.length){M.push(me),fe=Q;break}else if(M[Q]===null){M[Q]=me,fe=Q;break}if(fe===-1)break}const W=y[fe];W&&W.connect(me)}}const I=new F,X=new F;function U(K,j,me){I.setFromMatrixPosition(j.matrixWorld),X.setFromMatrixPosition(me.matrixWorld);const fe=I.distanceTo(X),W=j.projectionMatrix.elements,Q=me.projectionMatrix.elements,ie=W[14]/(W[10]-1),N=W[14]/(W[10]+1),q=(W[9]+1)/W[5],L=(W[9]-1)/W[5],de=(W[8]-1)/W[0],pe=(Q[8]+1)/Q[0],Te=ie*de,ne=ie*pe,Ce=fe/(-de+pe),Se=Ce*-de;if(j.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Se),K.translateZ(Ce),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),W[10]===-1)K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const P=ie+Ce,A=N+Ce,$=Te-Se,se=ne+(fe-Se),ae=q*N/A*P,Z=L*N/A*P;K.projectionMatrix.makePerspective($,se,ae,Z,P,A),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function re(K,j){j===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(j.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let j=K.near,me=K.far;v.texture!==null&&(v.depthNear>0&&(j=v.depthNear),v.depthFar>0&&(me=v.depthFar)),S.near=T.near=_.near=j,S.far=T.far=_.far=me,(E!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),E=S.near,k=S.far);const fe=K.parent,W=S.cameras;re(S,fe);for(let Q=0;Q<W.length;Q++)re(W[Q],fe);W.length===2?U(S,_,T):S.projectionMatrix.copy(_.projectionMatrix),ce(K,S,fe)};function ce(K,j,me){me===null?K.matrix.copy(j.matrixWorld):(K.matrix.copy(me.matrixWorld),K.matrix.invert(),K.matrix.multiply(j.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Tc*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(m===null&&d===null))return l},this.setFoveation=function(K){l=K,m!==null&&(m.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let he=null;function ee(K,j){if(c=j.getViewerPose(u||o),h=j,c!==null){const me=c.views;d!==null&&(e.setRenderTargetFramebuffer(x,d.framebuffer),e.setRenderTarget(x));let fe=!1;me.length!==S.cameras.length&&(S.cameras.length=0,fe=!0);for(let Q=0;Q<me.length;Q++){const ie=me[Q];let N=null;if(d!==null)N=d.getViewport(ie);else{const L=p.getViewSubImage(m,ie);N=L.viewport,Q===0&&(e.setRenderTargetTextures(x,L.colorTexture,m.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(x))}let q=D[Q];q===void 0&&(q=new dn,q.layers.enable(Q),q.viewport=new St,D[Q]=q),q.matrix.fromArray(ie.transform.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale),q.projectionMatrix.fromArray(ie.projectionMatrix),q.projectionMatrixInverse.copy(q.projectionMatrix).invert(),q.viewport.set(N.x,N.y,N.width,N.height),Q===0&&(S.matrix.copy(q.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),fe===!0&&S.cameras.push(q)}const W=s.enabledFeatures;if(W&&W.includes("depth-sensing")){const Q=p.getDepthInformation(me[0]);Q&&Q.isValid&&Q.texture&&v.init(e,Q,s.renderState)}}for(let me=0;me<y.length;me++){const fe=M[me],W=y[me];fe!==null&&W!==void 0&&W.update(fe,j,u||o)}he&&he(K,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),h=null}const ve=new Yh;ve.setAnimationLoop(ee),this.setAnimationLoop=function(K){he=K},this.dispose=function(){}}}const Mi=new on,qv=new ct;function $v(n,e){function t(f,g){f.matrixAutoUpdate===!0&&f.updateMatrix(),g.value.copy(f.matrix)}function i(f,g){g.color.getRGB(f.fogColor.value,Xh(n)),g.isFog?(f.fogNear.value=g.near,f.fogFar.value=g.far):g.isFogExp2&&(f.fogDensity.value=g.density)}function s(f,g,x,y,M){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(f,g):g.isMeshToonMaterial?(r(f,g),p(f,g)):g.isMeshPhongMaterial?(r(f,g),c(f,g)):g.isMeshStandardMaterial?(r(f,g),m(f,g),g.isMeshPhysicalMaterial&&d(f,g,M)):g.isMeshMatcapMaterial?(r(f,g),h(f,g)):g.isMeshDepthMaterial?r(f,g):g.isMeshDistanceMaterial?(r(f,g),v(f,g)):g.isMeshNormalMaterial?r(f,g):g.isLineBasicMaterial?(o(f,g),g.isLineDashedMaterial&&a(f,g)):g.isPointsMaterial?l(f,g,x,y):g.isSpriteMaterial?u(f,g):g.isShadowMaterial?(f.color.value.copy(g.color),f.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(f,g){f.opacity.value=g.opacity,g.color&&f.diffuse.value.copy(g.color),g.emissive&&f.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(f.map.value=g.map,t(g.map,f.mapTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,t(g.alphaMap,f.alphaMapTransform)),g.bumpMap&&(f.bumpMap.value=g.bumpMap,t(g.bumpMap,f.bumpMapTransform),f.bumpScale.value=g.bumpScale,g.side===kt&&(f.bumpScale.value*=-1)),g.normalMap&&(f.normalMap.value=g.normalMap,t(g.normalMap,f.normalMapTransform),f.normalScale.value.copy(g.normalScale),g.side===kt&&f.normalScale.value.negate()),g.displacementMap&&(f.displacementMap.value=g.displacementMap,t(g.displacementMap,f.displacementMapTransform),f.displacementScale.value=g.displacementScale,f.displacementBias.value=g.displacementBias),g.emissiveMap&&(f.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,f.emissiveMapTransform)),g.specularMap&&(f.specularMap.value=g.specularMap,t(g.specularMap,f.specularMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest);const x=e.get(g),y=x.envMap,M=x.envMapRotation;y&&(f.envMap.value=y,Mi.copy(M),Mi.x*=-1,Mi.y*=-1,Mi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Mi.y*=-1,Mi.z*=-1),f.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler(Mi)),f.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=g.reflectivity,f.ior.value=g.ior,f.refractionRatio.value=g.refractionRatio),g.lightMap&&(f.lightMap.value=g.lightMap,f.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,f.lightMapTransform)),g.aoMap&&(f.aoMap.value=g.aoMap,f.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,f.aoMapTransform))}function o(f,g){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,g.map&&(f.map.value=g.map,t(g.map,f.mapTransform))}function a(f,g){f.dashSize.value=g.dashSize,f.totalSize.value=g.dashSize+g.gapSize,f.scale.value=g.scale}function l(f,g,x,y){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,f.size.value=g.size*x,f.scale.value=y*.5,g.map&&(f.map.value=g.map,t(g.map,f.uvTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,t(g.alphaMap,f.alphaMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest)}function u(f,g){f.diffuse.value.copy(g.color),f.opacity.value=g.opacity,f.rotation.value=g.rotation,g.map&&(f.map.value=g.map,t(g.map,f.mapTransform)),g.alphaMap&&(f.alphaMap.value=g.alphaMap,t(g.alphaMap,f.alphaMapTransform)),g.alphaTest>0&&(f.alphaTest.value=g.alphaTest)}function c(f,g){f.specular.value.copy(g.specular),f.shininess.value=Math.max(g.shininess,1e-4)}function p(f,g){g.gradientMap&&(f.gradientMap.value=g.gradientMap)}function m(f,g){f.metalness.value=g.metalness,g.metalnessMap&&(f.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,f.metalnessMapTransform)),f.roughness.value=g.roughness,g.roughnessMap&&(f.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,f.roughnessMapTransform)),g.envMap&&(f.envMapIntensity.value=g.envMapIntensity)}function d(f,g,x){f.ior.value=g.ior,g.sheen>0&&(f.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),f.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(f.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,f.sheenColorMapTransform)),g.sheenRoughnessMap&&(f.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,f.sheenRoughnessMapTransform))),g.clearcoat>0&&(f.clearcoat.value=g.clearcoat,f.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(f.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,f.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(f.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===kt&&f.clearcoatNormalScale.value.negate())),g.dispersion>0&&(f.dispersion.value=g.dispersion),g.iridescence>0&&(f.iridescence.value=g.iridescence,f.iridescenceIOR.value=g.iridescenceIOR,f.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(f.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,f.iridescenceMapTransform)),g.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),g.transmission>0&&(f.transmission.value=g.transmission,f.transmissionSamplerMap.value=x.texture,f.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(f.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,f.transmissionMapTransform)),f.thickness.value=g.thickness,g.thicknessMap&&(f.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=g.attenuationDistance,f.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(f.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(f.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=g.specularIntensity,f.specularColor.value.copy(g.specularColor),g.specularColorMap&&(f.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,f.specularColorMapTransform)),g.specularIntensityMap&&(f.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,f.specularIntensityMapTransform))}function h(f,g){g.matcap&&(f.matcap.value=g.matcap)}function v(f,g){const x=e.get(g).light;f.referencePosition.value.setFromMatrixPosition(x.matrixWorld),f.nearDistance.value=x.shadow.camera.near,f.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Yv(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const M=y.program;i.uniformBlockBinding(x,M)}function u(x,y){let M=s[x.id];M===void 0&&(h(x),M=c(x),s[x.id]=M,x.addEventListener("dispose",f));const w=y.program;i.updateUBOMapping(x,w);const b=e.render.frame;r[x.id]!==b&&(m(x),r[x.id]=b)}function c(x){const y=p();x.__bindingPointIndex=y;const M=n.createBuffer(),w=x.__size,b=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,w,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,M),M}function p(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(x){const y=s[x.id],M=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let b=0,_=M.length;b<_;b++){const T=Array.isArray(M[b])?M[b]:[M[b]];for(let D=0,S=T.length;D<S;D++){const E=T[D];if(d(E,b,D,w)===!0){const k=E.__offset,B=Array.isArray(E.value)?E.value:[E.value];let G=0;for(let O=0;O<B.length;O++){const I=B[O],X=v(I);typeof I=="number"||typeof I=="boolean"?(E.__data[0]=I,n.bufferSubData(n.UNIFORM_BUFFER,k+G,E.__data)):I.isMatrix3?(E.__data[0]=I.elements[0],E.__data[1]=I.elements[1],E.__data[2]=I.elements[2],E.__data[3]=0,E.__data[4]=I.elements[3],E.__data[5]=I.elements[4],E.__data[6]=I.elements[5],E.__data[7]=0,E.__data[8]=I.elements[6],E.__data[9]=I.elements[7],E.__data[10]=I.elements[8],E.__data[11]=0):(I.toArray(E.__data,G),G+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,E.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(x,y,M,w){const b=x.value,_=y+"_"+M;if(w[_]===void 0)return typeof b=="number"||typeof b=="boolean"?w[_]=b:w[_]=b.clone(),!0;{const T=w[_];if(typeof b=="number"||typeof b=="boolean"){if(T!==b)return w[_]=b,!0}else if(T.equals(b)===!1)return T.copy(b),!0}return!1}function h(x){const y=x.uniforms;let M=0;const w=16;for(let _=0,T=y.length;_<T;_++){const D=Array.isArray(y[_])?y[_]:[y[_]];for(let S=0,E=D.length;S<E;S++){const k=D[S],B=Array.isArray(k.value)?k.value:[k.value];for(let G=0,O=B.length;G<O;G++){const I=B[G],X=v(I),U=M%w,re=U%X.boundary,ce=U+re;M+=re,ce!==0&&w-ce<X.storage&&(M+=w-ce),k.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=X.storage}}}const b=M%w;return b>0&&(M+=w-b),x.__size=M,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function f(x){const y=x.target;y.removeEventListener("dispose",f);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function g(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:u,dispose:g}}class jv{constructor(e={}){const{canvas:t=Nd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const d=new Uint32Array(4),h=new Int32Array(4);let v=null,f=null;const g=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fn,this.toneMapping=$n,this.toneMappingExposure=1;const y=this;let M=!1,w=0,b=0,_=null,T=-1,D=null;const S=new St,E=new St;let k=null;const B=new Ge(0);let G=0,O=t.width,I=t.height,X=1,U=null,re=null;const ce=new St(0,0,O,I),he=new St(0,0,O,I);let ee=!1;const ve=new il;let K=!1,j=!1;const me=new ct,fe=new ct,W=new F,Q=new St,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let N=!1;function q(){return _===null?X:1}let L=i;function de(C,H){return t.getContext(C,H)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${qc}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),L===null){const H="webgl2";if(L=de(H,C),L===null)throw de(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let pe,Te,ne,Ce,Se,P,A,$,se,ae,Z,Re,_e,be,ze,le,we,He,qe,Pe,et,$e,ft,z;function Ee(){pe=new eg(L),pe.init(),$e=new zv(L,pe),Te=new Y0(L,pe,e,$e),ne=new Fv(L),Te.reverseDepthBuffer&&ne.buffers.depth.setReversed(!0),Ce=new ig(L),Se=new Mv,P=new Ov(L,pe,ne,Se,Te,$e,Ce),A=new K0(y),$=new Q0(y),se=new up(L),ft=new q0(L,se),ae=new tg(L,se,Ce,ft),Z=new rg(L,ae,se,Ce),qe=new sg(L,Te,P),le=new j0(Se),Re=new yv(y,A,$,pe,Te,ft,le),_e=new $v(y,Se),be=new bv,ze=new Cv(pe),He=new X0(y,A,$,ne,Z,m,l),we=new Uv(y,Z,Te),z=new Yv(L,Ce,Te,ne),Pe=new $0(L,pe,Ce),et=new ng(L,pe,Ce),Ce.programs=Re.programs,y.capabilities=Te,y.extensions=pe,y.properties=Se,y.renderLists=be,y.shadowMap=we,y.state=ne,y.info=Ce}Ee();const te=new Xv(y,L);this.xr=te,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const C=pe.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=pe.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(C){C!==void 0&&(X=C,this.setSize(O,I,!1))},this.getSize=function(C){return C.set(O,I)},this.setSize=function(C,H,Y=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,I=H,t.width=Math.floor(C*X),t.height=Math.floor(H*X),Y===!0&&(t.style.width=C+"px",t.style.height=H+"px"),this.setViewport(0,0,C,H)},this.getDrawingBufferSize=function(C){return C.set(O*X,I*X).floor()},this.setDrawingBufferSize=function(C,H,Y){O=C,I=H,X=Y,t.width=Math.floor(C*Y),t.height=Math.floor(H*Y),this.setViewport(0,0,C,H)},this.getCurrentViewport=function(C){return C.copy(S)},this.getViewport=function(C){return C.copy(ce)},this.setViewport=function(C,H,Y,J){C.isVector4?ce.set(C.x,C.y,C.z,C.w):ce.set(C,H,Y,J),ne.viewport(S.copy(ce).multiplyScalar(X).round())},this.getScissor=function(C){return C.copy(he)},this.setScissor=function(C,H,Y,J){C.isVector4?he.set(C.x,C.y,C.z,C.w):he.set(C,H,Y,J),ne.scissor(E.copy(he).multiplyScalar(X).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(C){ne.setScissorTest(ee=C)},this.setOpaqueSort=function(C){U=C},this.setTransparentSort=function(C){re=C},this.getClearColor=function(C){return C.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor.apply(He,arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha.apply(He,arguments)},this.clear=function(C=!0,H=!0,Y=!0){let J=0;if(C){let V=!1;if(_!==null){const ue=_.texture.format;V=ue===el||ue===Qc||ue===Zc}if(V){const ue=_.texture.type,ye=ue===jn||ue===Pi||ue===ar||ue===xs||ue===jc||ue===Kc,Le=He.getClearColor(),De=He.getClearAlpha(),We=Le.r,Xe=Le.g,Fe=Le.b;ye?(d[0]=We,d[1]=Xe,d[2]=Fe,d[3]=De,L.clearBufferuiv(L.COLOR,0,d)):(h[0]=We,h[1]=Xe,h[2]=Fe,h[3]=De,L.clearBufferiv(L.COLOR,0,h))}else J|=L.COLOR_BUFFER_BIT}H&&(J|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Y&&(J|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),be.dispose(),ze.dispose(),Se.dispose(),A.dispose(),$.dispose(),Z.dispose(),ft.dispose(),z.dispose(),Re.dispose(),te.dispose(),te.removeEventListener("sessionstart",wl),te.removeEventListener("sessionend",El),mi.stop()};function oe(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=Ce.autoReset,H=we.enabled,Y=we.autoUpdate,J=we.needsUpdate,V=we.type;Ee(),Ce.autoReset=C,we.enabled=H,we.autoUpdate=Y,we.needsUpdate=J,we.type=V}function Ae(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function nt(C){const H=C.target;H.removeEventListener("dispose",nt),wt(H)}function wt(C){Gt(C),Se.remove(C)}function Gt(C){const H=Se.get(C).programs;H!==void 0&&(H.forEach(function(Y){Re.releaseProgram(Y)}),C.isShaderMaterial&&Re.releaseShaderCache(C))}this.renderBufferDirect=function(C,H,Y,J,V,ue){H===null&&(H=ie);const ye=V.isMesh&&V.matrixWorld.determinant()<0,Le=Ff(C,H,Y,J,V);ne.setMaterial(J,ye);let De=Y.index,We=1;if(J.wireframe===!0){if(De=ae.getWireframeAttribute(Y),De===void 0)return;We=2}const Xe=Y.drawRange,Fe=Y.attributes.position;let lt=Xe.start*We,mt=(Xe.start+Xe.count)*We;ue!==null&&(lt=Math.max(lt,ue.start*We),mt=Math.min(mt,(ue.start+ue.count)*We)),De!==null?(lt=Math.max(lt,0),mt=Math.min(mt,De.count)):Fe!=null&&(lt=Math.max(lt,0),mt=Math.min(mt,Fe.count));const yt=mt-lt;if(yt<0||yt===1/0)return;ft.setup(V,J,Le,Y,De);let Kt,rt=Pe;if(De!==null&&(Kt=se.get(De),rt=et,rt.setIndex(Kt)),V.isMesh)J.wireframe===!0?(ne.setLineWidth(J.wireframeLinewidth*q()),rt.setMode(L.LINES)):rt.setMode(L.TRIANGLES);else if(V.isLine){let ke=J.linewidth;ke===void 0&&(ke=1),ne.setLineWidth(ke*q()),V.isLineSegments?rt.setMode(L.LINES):V.isLineLoop?rt.setMode(L.LINE_LOOP):rt.setMode(L.LINE_STRIP)}else V.isPoints?rt.setMode(L.POINTS):V.isSprite&&rt.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)rt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(pe.get("WEBGL_multi_draw"))rt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const ke=V._multiDrawStarts,Dt=V._multiDrawCounts,ot=V._multiDrawCount,gn=De?se.get(De).bytesPerElement:1,Oi=Se.get(J).currentProgram.getUniforms();for(let Jt=0;Jt<ot;Jt++)Oi.setValue(L,"_gl_DrawID",Jt),rt.render(ke[Jt]/gn,Dt[Jt])}else if(V.isInstancedMesh)rt.renderInstances(lt,yt,V.count);else if(Y.isInstancedBufferGeometry){const ke=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Dt=Math.min(Y.instanceCount,ke);rt.renderInstances(lt,yt,Dt)}else rt.render(lt,yt)};function it(C,H,Y){C.transparent===!0&&C.side===en&&C.forceSinglePass===!1?(C.side=kt,C.needsUpdate=!0,Mr(C,H,Y),C.side=fi,C.needsUpdate=!0,Mr(C,H,Y),C.side=en):Mr(C,H,Y)}this.compile=function(C,H,Y=null){Y===null&&(Y=C),f=ze.get(Y),f.init(H),x.push(f),Y.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(f.pushLight(V),V.castShadow&&f.pushShadow(V))}),C!==Y&&C.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(f.pushLight(V),V.castShadow&&f.pushShadow(V))}),f.setupLights();const J=new Set;return C.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ue=V.material;if(ue)if(Array.isArray(ue))for(let ye=0;ye<ue.length;ye++){const Le=ue[ye];it(Le,Y,V),J.add(Le)}else it(ue,Y,V),J.add(ue)}),x.pop(),f=null,J},this.compileAsync=function(C,H,Y=null){const J=this.compile(C,H,Y);return new Promise(V=>{function ue(){if(J.forEach(function(ye){Se.get(ye).currentProgram.isReady()&&J.delete(ye)}),J.size===0){V(C);return}setTimeout(ue,10)}pe.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Wt=null;function Fn(C){Wt&&Wt(C)}function wl(){mi.stop()}function El(){mi.start()}const mi=new Yh;mi.setAnimationLoop(Fn),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(C){Wt=C,te.setAnimationLoop(C),C===null?mi.stop():mi.start()},te.addEventListener("sessionstart",wl),te.addEventListener("sessionend",El),this.render=function(C,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(H),H=te.getCamera()),C.isScene===!0&&C.onBeforeRender(y,C,H,_),f=ze.get(C,x.length),f.init(H),x.push(f),fe.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ve.setFromProjectionMatrix(fe),j=this.localClippingEnabled,K=le.init(this.clippingPlanes,j),v=be.get(C,g.length),v.init(),g.push(v),te.enabled===!0&&te.isPresenting===!0){const ue=y.xr.getDepthSensingMesh();ue!==null&&Oo(ue,H,-1/0,y.sortObjects)}Oo(C,H,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(U,re),N=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,N&&He.addToRenderList(v,C),this.info.render.frame++,K===!0&&le.beginShadows();const Y=f.state.shadowsArray;we.render(Y,C,H),K===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=v.opaque,V=v.transmissive;if(f.setupLights(),H.isArrayCamera){const ue=H.cameras;if(V.length>0)for(let ye=0,Le=ue.length;ye<Le;ye++){const De=ue[ye];Tl(J,V,C,De)}N&&He.render(C);for(let ye=0,Le=ue.length;ye<Le;ye++){const De=ue[ye];Al(v,C,De,De.viewport)}}else V.length>0&&Tl(J,V,C,H),N&&He.render(C),Al(v,C,H);_!==null&&(P.updateMultisampleRenderTarget(_),P.updateRenderTargetMipmap(_)),C.isScene===!0&&C.onAfterRender(y,C,H),ft.resetDefaultState(),T=-1,D=null,x.pop(),x.length>0?(f=x[x.length-1],K===!0&&le.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,g.pop(),g.length>0?v=g[g.length-1]:v=null};function Oo(C,H,Y,J){if(C.visible===!1)return;if(C.layers.test(H.layers)){if(C.isGroup)Y=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(H);else if(C.isLight)f.pushLight(C),C.castShadow&&f.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||ve.intersectsSprite(C)){J&&Q.setFromMatrixPosition(C.matrixWorld).applyMatrix4(fe);const ye=Z.update(C),Le=C.material;Le.visible&&v.push(C,ye,Le,Y,Q.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||ve.intersectsObject(C))){const ye=Z.update(C),Le=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Q.copy(C.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),Q.copy(ye.boundingSphere.center)),Q.applyMatrix4(C.matrixWorld).applyMatrix4(fe)),Array.isArray(Le)){const De=ye.groups;for(let We=0,Xe=De.length;We<Xe;We++){const Fe=De[We],lt=Le[Fe.materialIndex];lt&&lt.visible&&v.push(C,ye,lt,Y,Q.z,Fe)}}else Le.visible&&v.push(C,ye,Le,Y,Q.z,null)}}const ue=C.children;for(let ye=0,Le=ue.length;ye<Le;ye++)Oo(ue[ye],H,Y,J)}function Al(C,H,Y,J){const V=C.opaque,ue=C.transmissive,ye=C.transparent;f.setupLightsView(Y),K===!0&&le.setGlobalState(y.clippingPlanes,Y),J&&ne.viewport(S.copy(J)),V.length>0&&yr(V,H,Y),ue.length>0&&yr(ue,H,Y),ye.length>0&&yr(ye,H,Y),ne.buffers.depth.setTest(!0),ne.buffers.depth.setMask(!0),ne.buffers.color.setMask(!0),ne.setPolygonOffset(!1)}function Tl(C,H,Y,J){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[J.id]===void 0&&(f.state.transmissionRenderTarget[J.id]=new Li(1,1,{generateMipmaps:!0,type:pe.has("EXT_color_buffer_half_float")||pe.has("EXT_color_buffer_float")?gr:jn,minFilter:Ci,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const ue=f.state.transmissionRenderTarget[J.id],ye=J.viewport||S;ue.setSize(ye.z,ye.w);const Le=y.getRenderTarget();y.setRenderTarget(ue),y.getClearColor(B),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),N&&He.render(Y);const De=y.toneMapping;y.toneMapping=$n;const We=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),f.setupLightsView(J),K===!0&&le.setGlobalState(y.clippingPlanes,J),yr(C,Y,J),P.updateMultisampleRenderTarget(ue),P.updateRenderTargetMipmap(ue),pe.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Fe=0,lt=H.length;Fe<lt;Fe++){const mt=H[Fe],yt=mt.object,Kt=mt.geometry,rt=mt.material,ke=mt.group;if(rt.side===en&&yt.layers.test(J.layers)){const Dt=rt.side;rt.side=kt,rt.needsUpdate=!0,Rl(yt,Y,J,Kt,rt,ke),rt.side=Dt,rt.needsUpdate=!0,Xe=!0}}Xe===!0&&(P.updateMultisampleRenderTarget(ue),P.updateRenderTargetMipmap(ue))}y.setRenderTarget(Le),y.setClearColor(B,G),We!==void 0&&(J.viewport=We),y.toneMapping=De}function yr(C,H,Y){const J=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ue=C.length;V<ue;V++){const ye=C[V],Le=ye.object,De=ye.geometry,We=J===null?ye.material:J,Xe=ye.group;Le.layers.test(Y.layers)&&Rl(Le,H,Y,De,We,Xe)}}function Rl(C,H,Y,J,V,ue){C.onBeforeRender(y,H,Y,J,V,ue),C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),V.onBeforeRender(y,H,Y,J,C,ue),V.transparent===!0&&V.side===en&&V.forceSinglePass===!1?(V.side=kt,V.needsUpdate=!0,y.renderBufferDirect(Y,H,J,V,C,ue),V.side=fi,V.needsUpdate=!0,y.renderBufferDirect(Y,H,J,V,C,ue),V.side=en):y.renderBufferDirect(Y,H,J,V,C,ue),C.onAfterRender(y,H,Y,J,V,ue)}function Mr(C,H,Y){H.isScene!==!0&&(H=ie);const J=Se.get(C),V=f.state.lights,ue=f.state.shadowsArray,ye=V.state.version,Le=Re.getParameters(C,V.state,ue,H,Y),De=Re.getProgramCacheKey(Le);let We=J.programs;J.environment=C.isMeshStandardMaterial?H.environment:null,J.fog=H.fog,J.envMap=(C.isMeshStandardMaterial?$:A).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?H.environmentRotation:C.envMapRotation,We===void 0&&(C.addEventListener("dispose",nt),We=new Map,J.programs=We);let Xe=We.get(De);if(Xe!==void 0){if(J.currentProgram===Xe&&J.lightsStateVersion===ye)return Pl(C,Le),Xe}else Le.uniforms=Re.getUniforms(C),C.onBeforeCompile(Le,y),Xe=Re.acquireProgram(Le,De),We.set(De,Xe),J.uniforms=Le.uniforms;const Fe=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Fe.clippingPlanes=le.uniform),Pl(C,Le),J.needsLights=Of(C),J.lightsStateVersion=ye,J.needsLights&&(Fe.ambientLightColor.value=V.state.ambient,Fe.lightProbe.value=V.state.probe,Fe.directionalLights.value=V.state.directional,Fe.directionalLightShadows.value=V.state.directionalShadow,Fe.spotLights.value=V.state.spot,Fe.spotLightShadows.value=V.state.spotShadow,Fe.rectAreaLights.value=V.state.rectArea,Fe.ltc_1.value=V.state.rectAreaLTC1,Fe.ltc_2.value=V.state.rectAreaLTC2,Fe.pointLights.value=V.state.point,Fe.pointLightShadows.value=V.state.pointShadow,Fe.hemisphereLights.value=V.state.hemi,Fe.directionalShadowMap.value=V.state.directionalShadowMap,Fe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Fe.spotShadowMap.value=V.state.spotShadowMap,Fe.spotLightMatrix.value=V.state.spotLightMatrix,Fe.spotLightMap.value=V.state.spotLightMap,Fe.pointShadowMap.value=V.state.pointShadowMap,Fe.pointShadowMatrix.value=V.state.pointShadowMatrix),J.currentProgram=Xe,J.uniformsList=null,Xe}function Cl(C){if(C.uniformsList===null){const H=C.currentProgram.getUniforms();C.uniformsList=ho.seqWithValue(H.seq,C.uniforms)}return C.uniformsList}function Pl(C,H){const Y=Se.get(C);Y.outputColorSpace=H.outputColorSpace,Y.batching=H.batching,Y.batchingColor=H.batchingColor,Y.instancing=H.instancing,Y.instancingColor=H.instancingColor,Y.instancingMorph=H.instancingMorph,Y.skinning=H.skinning,Y.morphTargets=H.morphTargets,Y.morphNormals=H.morphNormals,Y.morphColors=H.morphColors,Y.morphTargetsCount=H.morphTargetsCount,Y.numClippingPlanes=H.numClippingPlanes,Y.numIntersection=H.numClipIntersection,Y.vertexAlphas=H.vertexAlphas,Y.vertexTangents=H.vertexTangents,Y.toneMapping=H.toneMapping}function Ff(C,H,Y,J,V){H.isScene!==!0&&(H=ie),P.resetTextureUnits();const ue=H.fog,ye=J.isMeshStandardMaterial?H.environment:null,Le=_===null?y.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:di,De=(J.isMeshStandardMaterial?$:A).get(J.envMap||ye),We=J.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Xe=!!Y.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Fe=!!Y.morphAttributes.position,lt=!!Y.morphAttributes.normal,mt=!!Y.morphAttributes.color;let yt=$n;J.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(yt=y.toneMapping);const Kt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,rt=Kt!==void 0?Kt.length:0,ke=Se.get(J),Dt=f.state.lights;if(K===!0&&(j===!0||C!==D)){const cn=C===D&&J.id===T;le.setState(J,C,cn)}let ot=!1;J.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Dt.state.version||ke.outputColorSpace!==Le||V.isBatchedMesh&&ke.batching===!1||!V.isBatchedMesh&&ke.batching===!0||V.isBatchedMesh&&ke.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ke.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ke.instancing===!1||!V.isInstancedMesh&&ke.instancing===!0||V.isSkinnedMesh&&ke.skinning===!1||!V.isSkinnedMesh&&ke.skinning===!0||V.isInstancedMesh&&ke.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ke.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ke.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ke.instancingMorph===!1&&V.morphTexture!==null||ke.envMap!==De||J.fog===!0&&ke.fog!==ue||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==le.numPlanes||ke.numIntersection!==le.numIntersection)||ke.vertexAlphas!==We||ke.vertexTangents!==Xe||ke.morphTargets!==Fe||ke.morphNormals!==lt||ke.morphColors!==mt||ke.toneMapping!==yt||ke.morphTargetsCount!==rt)&&(ot=!0):(ot=!0,ke.__version=J.version);let gn=ke.currentProgram;ot===!0&&(gn=Mr(J,H,V));let Oi=!1,Jt=!1,zo=!1;const bt=gn.getUniforms(),Zn=ke.uniforms;if(ne.useProgram(gn.program)&&(Oi=!0,Jt=!0,zo=!0),J.id!==T&&(T=J.id,Jt=!0),Oi||D!==C){Te.reverseDepthBuffer?(me.copy(C.projectionMatrix),kd(me),Od(me),bt.setValue(L,"projectionMatrix",me)):bt.setValue(L,"projectionMatrix",C.projectionMatrix),bt.setValue(L,"viewMatrix",C.matrixWorldInverse);const cn=bt.map.cameraPosition;cn!==void 0&&cn.setValue(L,W.setFromMatrixPosition(C.matrixWorld)),Te.logarithmicDepthBuffer&&bt.setValue(L,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&bt.setValue(L,"isOrthographic",C.isOrthographicCamera===!0),D!==C&&(D=C,Jt=!0,zo=!0)}if(V.isSkinnedMesh){bt.setOptional(L,V,"bindMatrix"),bt.setOptional(L,V,"bindMatrixInverse");const cn=V.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),bt.setValue(L,"boneTexture",cn.boneTexture,P))}V.isBatchedMesh&&(bt.setOptional(L,V,"batchingTexture"),bt.setValue(L,"batchingTexture",V._matricesTexture,P),bt.setOptional(L,V,"batchingIdTexture"),bt.setValue(L,"batchingIdTexture",V._indirectTexture,P),bt.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&bt.setValue(L,"batchingColorTexture",V._colorsTexture,P));const Bo=Y.morphAttributes;if((Bo.position!==void 0||Bo.normal!==void 0||Bo.color!==void 0)&&qe.update(V,Y,gn),(Jt||ke.receiveShadow!==V.receiveShadow)&&(ke.receiveShadow=V.receiveShadow,bt.setValue(L,"receiveShadow",V.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Zn.envMap.value=De,Zn.flipEnvMap.value=De.isCubeTexture&&De.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&H.environment!==null&&(Zn.envMapIntensity.value=H.environmentIntensity),Jt&&(bt.setValue(L,"toneMappingExposure",y.toneMappingExposure),ke.needsLights&&kf(Zn,zo),ue&&J.fog===!0&&_e.refreshFogUniforms(Zn,ue),_e.refreshMaterialUniforms(Zn,J,X,I,f.state.transmissionRenderTarget[C.id]),ho.upload(L,Cl(ke),Zn,P)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ho.upload(L,Cl(ke),Zn,P),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&bt.setValue(L,"center",V.center),bt.setValue(L,"modelViewMatrix",V.modelViewMatrix),bt.setValue(L,"normalMatrix",V.normalMatrix),bt.setValue(L,"modelMatrix",V.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const cn=J.uniformsGroups;for(let Ho=0,zf=cn.length;Ho<zf;Ho++){const Ll=cn[Ho];z.update(Ll,gn),z.bind(Ll,gn)}}return gn}function kf(C,H){C.ambientLightColor.needsUpdate=H,C.lightProbe.needsUpdate=H,C.directionalLights.needsUpdate=H,C.directionalLightShadows.needsUpdate=H,C.pointLights.needsUpdate=H,C.pointLightShadows.needsUpdate=H,C.spotLights.needsUpdate=H,C.spotLightShadows.needsUpdate=H,C.rectAreaLights.needsUpdate=H,C.hemisphereLights.needsUpdate=H}function Of(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(C,H,Y){Se.get(C.texture).__webglTexture=H,Se.get(C.depthTexture).__webglTexture=Y;const J=Se.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Y===void 0,J.__autoAllocateDepthBuffer||pe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,H){const Y=Se.get(C);Y.__webglFramebuffer=H,Y.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(C,H=0,Y=0){_=C,w=H,b=Y;let J=!0,V=null,ue=!1,ye=!1;if(C){const De=Se.get(C);if(De.__useDefaultFramebuffer!==void 0)ne.bindFramebuffer(L.FRAMEBUFFER,null),J=!1;else if(De.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(De.__hasExternalTextures)P.rebindTextures(C,Se.get(C.texture).__webglTexture,Se.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Fe=C.depthTexture;if(De.__boundDepthTexture!==Fe){if(Fe!==null&&Se.has(Fe)&&(C.width!==Fe.image.width||C.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const We=C.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(ye=!0);const Xe=Se.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Xe[H])?V=Xe[H][Y]:V=Xe[H],ue=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?V=Se.get(C).__webglMultisampledFramebuffer:Array.isArray(Xe)?V=Xe[Y]:V=Xe,S.copy(C.viewport),E.copy(C.scissor),k=C.scissorTest}else S.copy(ce).multiplyScalar(X).floor(),E.copy(he).multiplyScalar(X).floor(),k=ee;if(ne.bindFramebuffer(L.FRAMEBUFFER,V)&&J&&ne.drawBuffers(C,V),ne.viewport(S),ne.scissor(E),ne.setScissorTest(k),ue){const De=Se.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+H,De.__webglTexture,Y)}else if(ye){const De=Se.get(C.texture),We=H||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,De.__webglTexture,Y||0,We)}T=-1},this.readRenderTargetPixels=function(C,H,Y,J,V,ue,ye){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Le=Le[ye]),Le){ne.bindFramebuffer(L.FRAMEBUFFER,Le);try{const De=C.texture,We=De.format,Xe=De.type;if(!Te.textureFormatReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Te.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=C.width-J&&Y>=0&&Y<=C.height-V&&L.readPixels(H,Y,J,V,$e.convert(We),$e.convert(Xe),ue)}finally{const De=_!==null?Se.get(_).__webglFramebuffer:null;ne.bindFramebuffer(L.FRAMEBUFFER,De)}}},this.readRenderTargetPixelsAsync=async function(C,H,Y,J,V,ue,ye){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ye!==void 0&&(Le=Le[ye]),Le){const De=C.texture,We=De.format,Xe=De.type;if(!Te.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Te.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=C.width-J&&Y>=0&&Y<=C.height-V){ne.bindFramebuffer(L.FRAMEBUFFER,Le);const Fe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.bufferData(L.PIXEL_PACK_BUFFER,ue.byteLength,L.STREAM_READ),L.readPixels(H,Y,J,V,$e.convert(We),$e.convert(Xe),0);const lt=_!==null?Se.get(_).__webglFramebuffer:null;ne.bindFramebuffer(L.FRAMEBUFFER,lt);const mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Fd(L,mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ue),L.deleteBuffer(Fe),L.deleteSync(mt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,H=null,Y=0){C.isTexture!==!0&&(uo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,C=arguments[1]);const J=Math.pow(2,-Y),V=Math.floor(C.image.width*J),ue=Math.floor(C.image.height*J),ye=H!==null?H.x:0,Le=H!==null?H.y:0;P.setTexture2D(C,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,ye,Le,V,ue),ne.unbindTexture()},this.copyTextureToTexture=function(C,H,Y=null,J=null,V=0){C.isTexture!==!0&&(uo("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],H=arguments[2],V=arguments[3]||0,Y=null);let ue,ye,Le,De,We,Xe;Y!==null?(ue=Y.max.x-Y.min.x,ye=Y.max.y-Y.min.y,Le=Y.min.x,De=Y.min.y):(ue=C.image.width,ye=C.image.height,Le=0,De=0),J!==null?(We=J.x,Xe=J.y):(We=0,Xe=0);const Fe=$e.convert(H.format),lt=$e.convert(H.type);P.setTexture2D(H,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const mt=L.getParameter(L.UNPACK_ROW_LENGTH),yt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Kt=L.getParameter(L.UNPACK_SKIP_PIXELS),rt=L.getParameter(L.UNPACK_SKIP_ROWS),ke=L.getParameter(L.UNPACK_SKIP_IMAGES),Dt=C.isCompressedTexture?C.mipmaps[V]:C.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,Dt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Dt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Le),L.pixelStorei(L.UNPACK_SKIP_ROWS,De),C.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,V,We,Xe,ue,ye,Fe,lt,Dt.data):C.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,V,We,Xe,Dt.width,Dt.height,Fe,Dt.data):L.texSubImage2D(L.TEXTURE_2D,V,We,Xe,ue,ye,Fe,lt,Dt),L.pixelStorei(L.UNPACK_ROW_LENGTH,mt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Kt),L.pixelStorei(L.UNPACK_SKIP_ROWS,rt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ke),V===0&&H.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),ne.unbindTexture()},this.copyTextureToTexture3D=function(C,H,Y=null,J=null,V=0){C.isTexture!==!0&&(uo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,J=arguments[1]||null,C=arguments[2],H=arguments[3],V=arguments[4]||0);let ue,ye,Le,De,We,Xe,Fe,lt,mt;const yt=C.isCompressedTexture?C.mipmaps[V]:C.image;Y!==null?(ue=Y.max.x-Y.min.x,ye=Y.max.y-Y.min.y,Le=Y.max.z-Y.min.z,De=Y.min.x,We=Y.min.y,Xe=Y.min.z):(ue=yt.width,ye=yt.height,Le=yt.depth,De=0,We=0,Xe=0),J!==null?(Fe=J.x,lt=J.y,mt=J.z):(Fe=0,lt=0,mt=0);const Kt=$e.convert(H.format),rt=$e.convert(H.type);let ke;if(H.isData3DTexture)P.setTexture3D(H,0),ke=L.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)P.setTexture2DArray(H,0),ke=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const Dt=L.getParameter(L.UNPACK_ROW_LENGTH),ot=L.getParameter(L.UNPACK_IMAGE_HEIGHT),gn=L.getParameter(L.UNPACK_SKIP_PIXELS),Oi=L.getParameter(L.UNPACK_SKIP_ROWS),Jt=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,yt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,De),L.pixelStorei(L.UNPACK_SKIP_ROWS,We),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Xe),C.isDataTexture||C.isData3DTexture?L.texSubImage3D(ke,V,Fe,lt,mt,ue,ye,Le,Kt,rt,yt.data):H.isCompressedArrayTexture?L.compressedTexSubImage3D(ke,V,Fe,lt,mt,ue,ye,Le,Kt,yt.data):L.texSubImage3D(ke,V,Fe,lt,mt,ue,ye,Le,Kt,rt,yt),L.pixelStorei(L.UNPACK_ROW_LENGTH,Dt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ot),L.pixelStorei(L.UNPACK_SKIP_PIXELS,gn),L.pixelStorei(L.UNPACK_SKIP_ROWS,Oi),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Jt),V===0&&H.generateMipmaps&&L.generateMipmap(ke),ne.unbindTexture()},this.initRenderTarget=function(C){Se.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),ne.unbindTexture()},this.resetState=function(){w=0,b=0,_=null,ne.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===nl?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Ro?"display-p3":"srgb"}}class rl{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ge(e),this.near=t,this.far=i}clone(){return new rl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Kv extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tf extends Ot{constructor(e=null,t=1,i=1,s,r,o,a,l,u=Vt,c=Vt,p,m){super(null,o,a,l,u,c,s,r,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cc extends rn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qi=new ct,Cu=new ct,Gr=[],Pu=new Fi,Jv=new ct,Ns=new pt,Fs=new vr;class Po extends pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Cc(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Jv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Qi),Pu.copy(e.boundingBox).applyMatrix4(Qi),this.boundingBox.union(Pu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Qi),Fs.copy(e.boundingSphere).applyMatrix4(Qi),this.boundingSphere.union(Fs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ns.geometry=this.geometry,Ns.material=this.material,Ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fs.copy(this.boundingSphere),Fs.applyMatrix4(i),e.ray.intersectsSphere(Fs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Qi),Cu.multiplyMatrices(i,Qi),Ns.matrixWorld=Cu,Ns.raycast(e,Gr);for(let o=0,a=Gr.length;o<a;o++){const l=Gr[o];l.instanceId=r,l.object=this,t.push(l)}Gr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Cc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new tf(new Float32Array(s*this.count),s,this.count,Jc,In));const r=this.morphTexture.source.data.data;let o=0;for(let u=0;u<i.length;u++)o+=i[u];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Zv extends Ot{constructor(e,t,i,s,r,o,a,l,u){super(e,t,i,s,r,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,u;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),u=i[s]-o,u<0)a=s+1;else if(u>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const c=i[s],m=i[s+1]-c,d=(o-c)/m;return(s+d)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Me:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new F,s=[],r=[],o=[],a=new F,l=new ct;for(let d=0;d<=e;d++){const h=d/e;s[d]=this.getTangentAt(h,new F)}r[0]=new F,o[0]=new F;let u=Number.MAX_VALUE;const c=Math.abs(s[0].x),p=Math.abs(s[0].y),m=Math.abs(s[0].z);c<=u&&(u=c,i.set(1,0,0)),p<=u&&(u=p,i.set(0,1,0)),m<=u&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let d=1;d<=e;d++){if(r[d]=r[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(s[d-1],s[d]),a.length()>Number.EPSILON){a.normalize();const h=Math.acos(Ut(s[d-1].dot(s[d]),-1,1));r[d].applyMatrix4(l.makeRotationAxis(a,h))}o[d].crossVectors(s[d],r[d])}if(t===!0){let d=Math.acos(Ut(r[0].dot(r[e]),-1,1));d/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(d=-d);for(let h=1;h<=e;h++)r[h].applyMatrix4(l.makeRotationAxis(s[h],d*h)),o[h].crossVectors(s[h],r[h])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ol extends Nn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Me){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),u=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=l-this.aX,d=u-this.aY;l=m*c-d*p+this.aX,u=m*p+d*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Qv extends ol{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function al(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,u){s(o,a,u*(a-r),u*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,u,c,p){let m=(o-r)/u-(a-r)/(u+c)+(a-o)/c,d=(a-o)/c-(l-o)/(c+p)+(l-a)/p;m*=c,d*=c,s(o,a,m,d)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const Wr=new F,xa=new al,ya=new al,Ma=new al;class e_ extends Nn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new F){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let u,c;this.closed||a>0?u=s[(a-1)%r]:(Wr.subVectors(s[0],s[1]).add(s[0]),u=Wr);const p=s[a%r],m=s[(a+1)%r];if(this.closed||a+2<r?c=s[(a+2)%r]:(Wr.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=Wr),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let h=Math.pow(u.distanceToSquared(p),d),v=Math.pow(p.distanceToSquared(m),d),f=Math.pow(m.distanceToSquared(c),d);v<1e-4&&(v=1),h<1e-4&&(h=v),f<1e-4&&(f=v),xa.initNonuniformCatmullRom(u.x,p.x,m.x,c.x,h,v,f),ya.initNonuniformCatmullRom(u.y,p.y,m.y,c.y,h,v,f),Ma.initNonuniformCatmullRom(u.z,p.z,m.z,c.z,h,v,f)}else this.curveType==="catmullrom"&&(xa.initCatmullRom(u.x,p.x,m.x,c.x,this.tension),ya.initCatmullRom(u.y,p.y,m.y,c.y,this.tension),Ma.initCatmullRom(u.z,p.z,m.z,c.z,this.tension));return i.set(xa.calc(l),ya.calc(l),Ma.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new F().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Lu(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function t_(n,e){const t=1-n;return t*t*e}function n_(n,e){return 2*(1-n)*n*e}function i_(n,e){return n*n*e}function Qs(n,e,t,i){return t_(n,e)+n_(n,t)+i_(n,i)}function s_(n,e){const t=1-n;return t*t*t*e}function r_(n,e){const t=1-n;return 3*t*t*n*e}function o_(n,e){return 3*(1-n)*n*n*e}function a_(n,e){return n*n*n*e}function er(n,e,t,i,s){return s_(n,e)+r_(n,t)+o_(n,i)+a_(n,s)}class nf extends Nn{constructor(e=new Me,t=new Me,i=new Me,s=new Me){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Me){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(er(e,s.x,r.x,o.x,a.x),er(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class c_ extends Nn{constructor(e=new F,t=new F,i=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new F){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(er(e,s.x,r.x,o.x,a.x),er(e,s.y,r.y,o.y,a.y),er(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class sf extends Nn{constructor(e=new Me,t=new Me){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Me){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Me){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class l_ extends Nn{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rf extends Nn{constructor(e=new Me,t=new Me,i=new Me){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Me){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Qs(e,s.x,r.x,o.x),Qs(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class u_ extends Nn{constructor(e=new F,t=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new F){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Qs(e,s.x,r.x,o.x),Qs(e,s.y,r.y,o.y),Qs(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class of extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Me){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],u=s[o],c=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return i.set(Lu(a,l.x,u.x,c.x,p.x),Lu(a,l.y,u.y,c.y,p.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Me().fromArray(s))}return this}}var Iu=Object.freeze({__proto__:null,ArcCurve:Qv,CatmullRomCurve3:e_,CubicBezierCurve:nf,CubicBezierCurve3:c_,EllipseCurve:ol,LineCurve:sf,LineCurve3:l_,QuadraticBezierCurve:rf,QuadraticBezierCurve3:u_,SplineCurve:of});class h_ extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Iu[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),u=l===0?0:1-o/l;return a.getPointAt(u,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let u=0;u<l.length;u++){const c=l[u];i&&i.equals(c)||(t.push(c),i=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Iu[s.type]().fromJSON(s))}return this}}class Pc extends h_{constructor(e){super(),this.type="Path",this.currentPoint=new Me,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new sf(this.currentPoint.clone(),new Me(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new rf(this.currentPoint.clone(),new Me(e,t),new Me(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){const a=new nf(this.currentPoint.clone(),new Me(e,t),new Me(i,s),new Me(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new of(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){const u=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+u,t+c,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){const u=new ol(e,t,i,s,r,o,a,l);if(this.curves.length>0){const p=u.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(u);const c=u.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Lo extends Ct{constructor(e=[new Me(0,-.5),new Me(.5,0),new Me(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Ut(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],u=[],c=1/t,p=new F,m=new Me,d=new F,h=new F,v=new F;let f=0,g=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:f=e[x+1].x-e[x].x,g=e[x+1].y-e[x].y,d.x=g*1,d.y=-f,d.z=g*0,v.copy(d),d.normalize(),l.push(d.x,d.y,d.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:f=e[x+1].x-e[x].x,g=e[x+1].y-e[x].y,d.x=g*1,d.y=-f,d.z=g*0,h.copy(d),d.x+=v.x,d.y+=v.y,d.z+=v.z,d.normalize(),l.push(d.x,d.y,d.z),v.copy(h)}for(let x=0;x<=t;x++){const y=i+x*c*s,M=Math.sin(y),w=Math.cos(y);for(let b=0;b<=e.length-1;b++){p.x=e[b].x*M,p.y=e[b].y,p.z=e[b].x*w,o.push(p.x,p.y,p.z),m.x=x/t,m.y=b/(e.length-1),a.push(m.x,m.y);const _=l[3*b+0]*M,T=l[3*b+1],D=l[3*b+0]*w;u.push(_,T,D)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const M=y+x*e.length,w=M,b=M+e.length,_=M+e.length+1,T=M+1;r.push(w,b,T),r.push(_,T,b)}this.setIndex(r),this.setAttribute("position",new Qe(o,3)),this.setAttribute("uv",new Qe(a,2)),this.setAttribute("normal",new Qe(u,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.points,e.segments,e.phiStart,e.phiLength)}}class cl extends Lo{constructor(e=1,t=1,i=4,s=8){const r=new Pc;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new cl(e.radius,e.length,e.capSegments,e.radialSegments)}}class Io extends Ct{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],u=new F,c=new Me;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,m=3;p<=t;p++,m+=3){const d=i+p/t*s;u.x=e*Math.cos(d),u.y=e*Math.sin(d),o.push(u.x,u.y,u.z),a.push(0,0,1),c.x=(o[m]/e+1)/2,c.y=(o[m+1]/e+1)/2,l.push(c.x,c.y)}for(let p=1;p<=t;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(a,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class It extends Ct{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const c=[],p=[],m=[],d=[];let h=0;const v=[],f=i/2;let g=0;x(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(c),this.setAttribute("position",new Qe(p,3)),this.setAttribute("normal",new Qe(m,3)),this.setAttribute("uv",new Qe(d,2));function x(){const M=new F,w=new F;let b=0;const _=(t-e)/i;for(let T=0;T<=r;T++){const D=[],S=T/r,E=S*(t-e)+e;for(let k=0;k<=s;k++){const B=k/s,G=B*l+a,O=Math.sin(G),I=Math.cos(G);w.x=E*O,w.y=-S*i+f,w.z=E*I,p.push(w.x,w.y,w.z),M.set(O,_,I).normalize(),m.push(M.x,M.y,M.z),d.push(B,1-S),D.push(h++)}v.push(D)}for(let T=0;T<s;T++)for(let D=0;D<r;D++){const S=v[D][T],E=v[D+1][T],k=v[D+1][T+1],B=v[D][T+1];e>0&&(c.push(S,E,B),b+=3),t>0&&(c.push(E,k,B),b+=3)}u.addGroup(g,b,0),g+=b}function y(M){const w=h,b=new Me,_=new F;let T=0;const D=M===!0?e:t,S=M===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,f*S,0),m.push(0,S,0),d.push(.5,.5),h++;const E=h;for(let k=0;k<=s;k++){const G=k/s*l+a,O=Math.cos(G),I=Math.sin(G);_.x=D*I,_.y=f*S,_.z=D*O,p.push(_.x,_.y,_.z),m.push(0,S,0),b.x=O*.5+.5,b.y=I*.5*S+.5,d.push(b.x,b.y),h++}for(let k=0;k<s;k++){const B=w+k,G=E+k;M===!0?c.push(G,G+1,B):c.push(G+1,G,B),T+=3}u.addGroup(g,T,M===!0?1:2),g+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bt extends It{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Bt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends Ct{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),u(i),c(),this.setAttribute("position",new Qe(r,3)),this.setAttribute("normal",new Qe(r.slice(),3)),this.setAttribute("uv",new Qe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const y=new F,M=new F,w=new F;for(let b=0;b<t.length;b+=3)d(t[b+0],y),d(t[b+1],M),d(t[b+2],w),l(y,M,w,x)}function l(x,y,M,w){const b=w+1,_=[];for(let T=0;T<=b;T++){_[T]=[];const D=x.clone().lerp(M,T/b),S=y.clone().lerp(M,T/b),E=b-T;for(let k=0;k<=E;k++)k===0&&T===b?_[T][k]=D:_[T][k]=D.clone().lerp(S,k/E)}for(let T=0;T<b;T++)for(let D=0;D<2*(b-T)-1;D++){const S=Math.floor(D/2);D%2===0?(m(_[T][S+1]),m(_[T+1][S]),m(_[T][S])):(m(_[T][S+1]),m(_[T+1][S+1]),m(_[T+1][S]))}}function u(x){const y=new F;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(x),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function c(){const x=new F;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];const M=f(x)/2/Math.PI+.5,w=g(x)/Math.PI+.5;o.push(M,1-w)}h(),p()}function p(){for(let x=0;x<o.length;x+=6){const y=o[x+0],M=o[x+2],w=o[x+4],b=Math.max(y,M,w),_=Math.min(y,M,w);b>.9&&_<.1&&(y<.2&&(o[x+0]+=1),M<.2&&(o[x+2]+=1),w<.2&&(o[x+4]+=1))}}function m(x){r.push(x.x,x.y,x.z)}function d(x,y){const M=x*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function h(){const x=new F,y=new F,M=new F,w=new F,b=new Me,_=new Me,T=new Me;for(let D=0,S=0;D<r.length;D+=9,S+=6){x.set(r[D+0],r[D+1],r[D+2]),y.set(r[D+3],r[D+4],r[D+5]),M.set(r[D+6],r[D+7],r[D+8]),b.set(o[S+0],o[S+1]),_.set(o[S+2],o[S+3]),T.set(o[S+4],o[S+5]),w.copy(x).add(y).add(M).divideScalar(3);const E=f(w);v(b,S+0,x,E),v(_,S+2,y,E),v(T,S+4,M,E)}}function v(x,y,M,w){w<0&&x.x===1&&(o[y]=x.x-1),M.x===0&&M.z===0&&(o[y]=w/2/Math.PI+.5)}function f(x){return Math.atan2(x.z,-x.x)}function g(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _r(e.vertices,e.indices,e.radius,e.details)}}class ds extends _r{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ds(e.radius,e.detail)}}class ll extends Pc{constructor(e){super(e),this.uuid=Es(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new Pc().fromJSON(s))}return this}}const f_={triangulate:function(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=af(n,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,u,c,p,m,d;if(i&&(r=v_(n,e,r,t)),n.length>80*t){a=u=n[0],l=c=n[1];for(let h=t;h<s;h+=t)p=n[h],m=n[h+1],p<a&&(a=p),m<l&&(l=m),p>u&&(u=p),m>c&&(c=m);d=Math.max(u-a,c-l),d=d!==0?32767/d:0}return cr(r,o,t,a,l,d,0),o}};function af(n,e,t,i,s){let r,o;if(s===R_(n,e,t,i)>0)for(r=e;r<t;r+=i)o=Du(r,n[r],n[r+1],o);else for(r=t-i;r>=e;r-=i)o=Du(r,n[r],n[r+1],o);return o&&Do(o,o.next)&&(ur(o),o=o.next),o}function Di(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Do(t,t.next)||xt(t.prev,t,t.next)===0)){if(ur(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function cr(n,e,t,i,s,r,o){if(!n)return;!o&&r&&S_(n,i,s,r);let a=n,l,u;for(;n.prev!==n.next;){if(l=n.prev,u=n.next,r?p_(n,i,s,r):d_(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(u.i/t|0),ur(n),n=u.next,a=u.next;continue}if(n=u,n===a){o?o===1?(n=m_(Di(n),e,t),cr(n,e,t,i,s,r,2)):o===2&&g_(n,e,t,i,s,r):cr(Di(n),e,t,i,s,r,1);break}}}function d_(n){const e=n.prev,t=n,i=n.next;if(xt(e,t,i)>=0)return!1;const s=e.x,r=t.x,o=i.x,a=e.y,l=t.y,u=i.y,c=s<r?s<o?s:o:r<o?r:o,p=a<l?a<u?a:u:l<u?l:u,m=s>r?s>o?s:o:r>o?r:o,d=a>l?a>u?a:u:l>u?l:u;let h=i.next;for(;h!==e;){if(h.x>=c&&h.x<=m&&h.y>=p&&h.y<=d&&as(s,a,r,l,o,u,h.x,h.y)&&xt(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function p_(n,e,t,i){const s=n.prev,r=n,o=n.next;if(xt(s,r,o)>=0)return!1;const a=s.x,l=r.x,u=o.x,c=s.y,p=r.y,m=o.y,d=a<l?a<u?a:u:l<u?l:u,h=c<p?c<m?c:m:p<m?p:m,v=a>l?a>u?a:u:l>u?l:u,f=c>p?c>m?c:m:p>m?p:m,g=Lc(d,h,e,t,i),x=Lc(v,f,e,t,i);let y=n.prevZ,M=n.nextZ;for(;y&&y.z>=g&&M&&M.z<=x;){if(y.x>=d&&y.x<=v&&y.y>=h&&y.y<=f&&y!==s&&y!==o&&as(a,c,l,p,u,m,y.x,y.y)&&xt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=d&&M.x<=v&&M.y>=h&&M.y<=f&&M!==s&&M!==o&&as(a,c,l,p,u,m,M.x,M.y)&&xt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=g;){if(y.x>=d&&y.x<=v&&y.y>=h&&y.y<=f&&y!==s&&y!==o&&as(a,c,l,p,u,m,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=x;){if(M.x>=d&&M.x<=v&&M.y>=h&&M.y<=f&&M!==s&&M!==o&&as(a,c,l,p,u,m,M.x,M.y)&&xt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function m_(n,e,t){let i=n;do{const s=i.prev,r=i.next.next;!Do(s,r)&&cf(s,i,i.next,r)&&lr(s,r)&&lr(r,s)&&(e.push(s.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),ur(i),ur(i.next),i=n=r),i=i.next}while(i!==n);return Di(i)}function g_(n,e,t,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&E_(o,a)){let l=lf(o,a);o=Di(o,o.next),l=Di(l,l.next),cr(o,e,t,i,s,r,0),cr(l,e,t,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function v_(n,e,t,i){const s=[];let r,o,a,l,u;for(r=0,o=e.length;r<o;r++)a=e[r]*i,l=r<o-1?e[r+1]*i:n.length,u=af(n,a,l,i,!1),u===u.next&&(u.steiner=!0),s.push(w_(u));for(s.sort(__),r=0;r<s.length;r++)t=x_(s[r],t);return t}function __(n,e){return n.x-e.x}function x_(n,e){const t=y_(n,e);if(!t)return e;const i=lf(t,n);return Di(i,i.next),Di(t,t.next)}function y_(n,e){let t=e,i=-1/0,s;const r=n.x,o=n.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const m=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(m<=r&&m>i&&(i=m,s=t.x<t.next.x?t:t.next,m===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,l=s.x,u=s.y;let c=1/0,p;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&as(o<u?r:i,o,l,u,o<u?i:r,o,t.x,t.y)&&(p=Math.abs(o-t.y)/(r-t.x),lr(t,n)&&(p<c||p===c&&(t.x>s.x||t.x===s.x&&M_(s,t)))&&(s=t,c=p)),t=t.next;while(t!==a);return s}function M_(n,e){return xt(n.prev,n,e.prev)<0&&xt(e.next,n,n.next)<0}function S_(n,e,t,i){let s=n;do s.z===0&&(s.z=Lc(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,b_(s)}function b_(n){let e,t,i,s,r,o,a,l,u=1;do{for(t=n,n=null,r=null,o=0;t;){for(o++,i=t,a=0,e=0;e<u&&(a++,i=i.nextZ,!!i);e++);for(l=u;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(s=t,t=t.nextZ,a--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;t=i}r.nextZ=null,u*=2}while(o>1);return n}function Lc(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function w_(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function as(n,e,t,i,s,r,o,a){return(s-o)*(e-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(i-a)}function E_(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!A_(n,e)&&(lr(n,e)&&lr(e,n)&&T_(n,e)&&(xt(n.prev,n,e.prev)||xt(n,e.prev,e))||Do(n,e)&&xt(n.prev,n,n.next)>0&&xt(e.prev,e,e.next)>0)}function xt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Do(n,e){return n.x===e.x&&n.y===e.y}function cf(n,e,t,i){const s=qr(xt(n,e,t)),r=qr(xt(n,e,i)),o=qr(xt(t,i,n)),a=qr(xt(t,i,e));return!!(s!==r&&o!==a||s===0&&Xr(n,t,e)||r===0&&Xr(n,i,e)||o===0&&Xr(t,n,i)||a===0&&Xr(t,e,i))}function Xr(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function qr(n){return n>0?1:n<0?-1:0}function A_(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&cf(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function lr(n,e){return xt(n.prev,n,n.next)<0?xt(n,e,n.next)>=0&&xt(n,n.prev,e)>=0:xt(n,e,n.prev)<0||xt(n,n.next,e)<0}function T_(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function lf(n,e){const t=new Ic(n.i,n.x,n.y),i=new Ic(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Du(n,e,t,i){const s=new Ic(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ur(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ic(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function R_(n,e,t,i){let s=0;for(let r=e,o=t-i;r<t;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class tr{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return tr.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];Uu(e),Nu(i,e);let o=e.length;t.forEach(Uu);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Nu(i,t[l]);const a=f_.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Uu(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Nu(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class An extends _r{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new An(e.radius,e.detail)}}class Uo extends _r{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Uo(e.radius,e.detail)}}class xr extends Ct{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],u=[],c=[];let p=e;const m=(t-e)/s,d=new F,h=new Me;for(let v=0;v<=s;v++){for(let f=0;f<=i;f++){const g=r+f/i*o;d.x=p*Math.cos(g),d.y=p*Math.sin(g),l.push(d.x,d.y,d.z),u.push(0,0,1),h.x=(d.x/t+1)/2,h.y=(d.y/t+1)/2,c.push(h.x,h.y)}p+=m}for(let v=0;v<s;v++){const f=v*(i+1);for(let g=0;g<i;g++){const x=g+f,y=x,M=x+i+1,w=x+i+2,b=x+1;a.push(y,M,b),a.push(M,w,b)}}this.setIndex(a),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(u,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class No extends Ct{constructor(e=new ll([new Me(0,.5),new Me(-.5,-.5),new Me(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)u(e);else for(let c=0;c<e.length;c++)u(e[c]),this.addGroup(a,l,c),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Qe(s,3)),this.setAttribute("normal",new Qe(r,3)),this.setAttribute("uv",new Qe(o,2));function u(c){const p=s.length/3,m=c.extractPoints(t);let d=m.shape;const h=m.holes;tr.isClockWise(d)===!1&&(d=d.reverse());for(let f=0,g=h.length;f<g;f++){const x=h[f];tr.isClockWise(x)===!0&&(h[f]=x.reverse())}const v=tr.triangulateShape(d,h);for(let f=0,g=h.length;f<g;f++){const x=h[f];d=d.concat(x)}for(let f=0,g=d.length;f<g;f++){const x=d[f];s.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let f=0,g=v.length;f<g;f++){const x=v[f],y=x[0]+p,M=x[1]+p,w=x[2]+p;i.push(y,M,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return C_(t,e)}static fromJSON(e,t){const i=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];i.push(o)}return new No(i,e.curveSegments)}}function C_(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class Rs extends Ct{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let u=0;const c=[],p=new F,m=new F,d=[],h=[],v=[],f=[];for(let g=0;g<=i;g++){const x=[],y=g/i;let M=0;g===0&&o===0?M=.5/t:g===i&&l===Math.PI&&(M=-.5/t);for(let w=0;w<=t;w++){const b=w/t;p.x=-e*Math.cos(s+b*r)*Math.sin(o+y*a),p.y=e*Math.cos(o+y*a),p.z=e*Math.sin(s+b*r)*Math.sin(o+y*a),h.push(p.x,p.y,p.z),m.copy(p).normalize(),v.push(m.x,m.y,m.z),f.push(b+M,1-y),x.push(u++)}c.push(x)}for(let g=0;g<i;g++)for(let x=0;x<t;x++){const y=c[g][x+1],M=c[g][x],w=c[g+1][x],b=c[g+1][x+1];(g!==0||o>0)&&d.push(y,M,b),(g!==i-1||l<Math.PI)&&d.push(M,w,b)}this.setIndex(d),this.setAttribute("position",new Qe(h,3)),this.setAttribute("normal",new Qe(v,3)),this.setAttribute("uv",new Qe(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class hi extends Ct{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],u=[],c=new F,p=new F,m=new F;for(let d=0;d<=i;d++)for(let h=0;h<=s;h++){const v=h/s*r,f=d/i*Math.PI*2;p.x=(e+t*Math.cos(f))*Math.cos(v),p.y=(e+t*Math.cos(f))*Math.sin(v),p.z=t*Math.sin(f),a.push(p.x,p.y,p.z),c.x=e*Math.cos(v),c.y=e*Math.sin(v),m.subVectors(p,c).normalize(),l.push(m.x,m.y,m.z),u.push(h/s),u.push(d/i)}for(let d=1;d<=i;d++)for(let h=1;h<=s;h++){const v=(s+1)*d+h-1,f=(s+1)*(d-1)+h-1,g=(s+1)*(d-1)+h,x=(s+1)*d+h;o.push(v,f,x),o.push(f,g,x)}this.setIndex(o),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class P_ extends As{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ge(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class hr extends As{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new Me(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=$c,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class uf extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ge(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class L_ extends uf{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ge(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Sa=new ct,Fu=new F,ku=new F;class I_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Me(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new Me(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Fu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Fu),ku.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ku),t.updateMatrixWorld(),Sa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Sa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Sa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class D_ extends I_{constructor(){super(new jh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class U_ extends uf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new D_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qc);const Lt=.5,$r=n=>n*n*(3-2*n),es=["canyon","mesa","beach"];function N_(n){const e=n.segs,t=e.reduce((v,f)=>v+f.len,0),i=Math.ceil(t/Lt)+1,s={n:i,length:(i-1)*Lt,def:n,x:new Float32Array(i),y:new Float32Array(i),z:new Float32Array(i),a:new Float32Array(i),w:new Float32Array(i),flow:new Float32Array(i),k:new Float32Array(i),h:new Float32Array(i),lf:new Uint8Array(i),lt:new Uint8Array(i),lk:new Float32Array(i),rf:new Uint8Array(i),rt:new Uint8Array(i),rk:new Float32Array(i)};let r=n.start?.x||0,o=n.start?.z||0,a=n.start?.y||0,l=n.start?.a||0,u=e[0].w,c=e[0].flow??3,p=e[0].h??7,m=es.indexOf(e[0].L||"canyon"),d=es.indexOf(e[0].R||"canyon"),h=0;for(const v of e){const f=es.indexOf(v.L||es[m]),g=es.indexOf(v.R||es[d]),x=v.w??u,y=v.flow??c,M=v.h??p,w=v.dy||0,b=(v.turn||0)*Math.PI/180,_=Math.round(v.len/Lt),T=a,D=l;for(let S=0;S<_&&h<i;S++){const E=S/_,k=$r(E),B=Math.min(1,S*Lt/Math.min(12,v.len));s.x[h]=r,s.y[h]=a,s.z[h]=o,s.a[h]=l,s.w[h]=u+(x-u)*k,s.flow[h]=c+(y-c)*k,s.h[h]=p+(M-p)*k,s.k[h]=b/v.len,s.lf[h]=m,s.lt[h]=f,s.lk[h]=$r(B),s.rf[h]=d,s.rt[h]=g,s.rk[h]=$r(B);const G=l+s.k[h]*Lt/2;r+=Math.sin(G)*Lt,o-=Math.cos(G)*Lt,l=D+b*(S+1)/_,a=T+w*$r((S+1)/_),h++}u=x,c=y,p=M,m=f,d=g}for(;h<i;h++)s.x[h]=r,s.y[h]=a,s.z[h]=o,s.a[h]=l,s.w[h]=u,s.flow[h]=c,s.h[h]=p,s.lf[h]=s.lt[h]=m,s.rf[h]=s.rt[h]=d,s.lk[h]=s.rk[h]=1;return s.at=(v,f={})=>F_(s,v,f),s.project=(v,f,g)=>k_(s,v,f,g),s.world=(v,f,g={})=>(s.at(v,g),g.wx=g.x+g.nx*f,g.wz=g.z+g.nz*f,g),s}function F_(n,e,t={}){const i=Math.max(0,Math.min(n.n-1.0001,e/Lt)),s=Math.floor(i),r=i-s,o=l=>l[s]+(l[s+1]-l[s])*r;t.s=e,t.x=o(n.x),t.y=o(n.y),t.z=o(n.z),t.w=o(n.w),t.flow=o(n.flow),t.h=o(n.h),t.k=n.k[s];const a=n.a[s]+(n.a[s+1]-n.a[s])*r;return t.a=a,t.tx=Math.sin(a),t.tz=-Math.cos(a),t.nx=t.tz,t.nz=-t.tx,t.slope=(n.y[s+1]-n.y[s])/Lt,t}function k_(n,e,t,i){let s=0,r=n.n-2,o=-1,a=1/0;if(i!=null&&i>=0){const _=Math.round(i/Lt);s=Math.max(0,_-60),r=Math.min(n.n-2,_+60)}const l=i!=null?1:4;for(let _=s;_<=r;_+=l){const T=e-n.x[_],D=t-n.z[_],S=T*T+D*D;S<a&&(a=S,o=_)}if(l>1){const _=o;for(let T=Math.max(0,_-4);T<=Math.min(n.n-2,_+4);T++){const D=e-n.x[T],S=t-n.z[T],E=D*D+S*S;E<a&&(a=E,o=T)}}let u=o;const c=n.x[u],p=n.z[u];let m=n.x[u+1],d=n.z[u+1],h=m-c,v=d-p,f=((e-c)*h+(t-p)*v)/(h*h+v*v);if(f<0&&u>0){u--;const _=n.x[u],T=n.z[u];h=c-_,v=p-T,f=((e-_)*h+(t-T)*v)/(h*h+v*v)}f=Math.max(u===0?-20:0,Math.min(1,f));const g=(u+f)*Lt,x=n.a[u],y=-Math.cos(x),M=-Math.sin(x),w=n.x[u]+(n.x[u+1]-n.x[u])*Math.max(0,f),b=n.z[u]+(n.z[u+1]-n.z[u])*Math.max(0,f);return{s:g,d:(e-w)*y+(t-b)*M}}function O_(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Ct;let u=0;for(let c=0;c<n.length;++c){const p=n[c];let m=0;if(t!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const d in p.attributes){if(!i.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+d+'" attribute exists among all geometries, or in none of them.'),null;r[d]===void 0&&(r[d]=[]),r[d].push(p.attributes[d]),m++}if(m!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const d in p.morphAttributes){if(!s.has(d))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;o[d]===void 0&&(o[d]=[]),o[d].push(p.morphAttributes[d])}if(e){let d;if(t)d=p.index.count;else if(p.attributes.position!==void 0)d=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,d,c),u+=d}}if(t){let c=0;const p=[];for(let m=0;m<n.length;++m){const d=n[m].index;for(let h=0;h<d.count;++h)p.push(d.getX(h)+c);c+=n[m].attributes.position.count}l.setIndex(p)}for(const c in r){const p=Ou(r[c]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,p)}for(const c in o){const p=o[c][0].length;if(p===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let m=0;m<p;++m){const d=[];for(let v=0;v<o[c].length;++v)d.push(o[c][v][m]);const h=Ou(d);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(h)}}return l}function Ou(n){let e,t,i,s=-1,r=0;for(let u=0;u<n.length;++u){const c=n[u];if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=c.itemSize),t!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=c.normalized),i!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*t}const o=new e(r),a=new rn(o,t,i);let l=0;for(let u=0;u<n.length;++u){const c=n[u];if(c.isInterleavedBufferAttribute){const p=l/t;for(let m=0,d=c.count;m<d;m++)for(let h=0;h<t;h++){const v=c.getComponent(m,h);a.setComponent(m+p,h,v)}}else o.set(c.array,l);l+=c.count*t}return s!==void 0&&(a.gpuType=s),a}let ri;function z_(){if(ri)return ri;const n=new Uint8Array([120,120,120,255,196,196,196,255,255,255,255,255]);return ri=new tf(n,3,1,pn),ri.minFilter=ri.magFilter=Vt,ri.generateMipmaps=!1,ri.needsUpdate=!0,ri}const ps=new Map;function Dc(n,e={}){const t="toon"+n+JSON.stringify(e);return ps.has(t)||ps.set(t,new P_({color:n,gradientMap:z_(),...e})),ps.get(t)}const Un=()=>Dc("#ffffff",{vertexColors:!0});function hf(n,e={}){const t="flat"+n+JSON.stringify(e);return ps.has(t)||ps.set(t,new hr({color:n,flatShading:!0,...e})),ps.get(t)}const nr=()=>hf("#ffffff",{vertexColors:!0}),ba=new Map;function B_(n=.028,e="#2b2230"){const t=n+e;if(ba.has(t))return ba.get(t);const i=new tn({color:e,side:kt});return i.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`vec3 transformed = position + normal * ${n.toFixed(4)};`)},i.customProgramCacheKey=()=>"ink"+t,ba.set(t,i),i}function _t(n,e,t){const i=new pt(n.geometry,B_(e,t));return i.name="ink",i.castShadow=!1,i.receiveShadow=!1,n.add(i),i}const li=new Ge;function Ue(n,e){li.set(e);const t=n.attributes.position.count,i=new Float32Array(t*3);for(let s=0;s<t;s++)i[s*3]=li.r,i[s*3+1]=li.g,i[s*3+2]=li.b;return n.setAttribute("color",new rn(i,3)),n}const zu=new ct,Bu=new pi,Hu=new on,H_=new F,Vu=new F;function Oe(n,e,t,i=1){return e=e||[0,0,0],t=t||[0,0,0],Hu.set(t[0],t[1],t[2]),Bu.setFromEuler(Hu),Vu.set(...Array.isArray(i)?i:[i,i,i]),zu.compose(H_.set(e[0],e[1],e[2]),Bu,Vu),n.applyMatrix4(zu),n}function je(n){const e=n.map(r=>{const o=(r.index,r);for(const a of Object.keys(o.attributes))["position","normal","color"].includes(a)||o.deleteAttribute(a);return o.attributes.color||Ue(o,"#ffffff"),o}),i=e.every(r=>r.index)?e:e.map(r=>r.index?r.toNonIndexed():r),s=O_(i,!1);return i.forEach(r=>r.dispose()),s}const Ie=(n,e,t,i,s,r=16)=>Oe(Ue(new Rs(n,r,Math.max(8,r*.75|0)),e),t,i,s),Ne=(n,e,t,i,s,r,o,a=14)=>Oe(Ue(new It(n,e,t,a),i),s,r,o),nn=(n,e,t,i,s,r,o=12)=>Oe(Ue(new Bt(n,e,o),t),i,s,r),ht=(n,e,t,i,s,r,o)=>Oe(Ue(new mn(n,e,t),i),s,r,o),ks=(n,e,t,i,s,r,o=10)=>Oe(Ue(new cl(n,e,4,o),t),i,s,r),ir=(n,e,t,i,s,r,o=Math.PI*2)=>Oe(Ue(new hi(n,e,8,20,o),t),i,s,r);function tt(n,e,{cast:t=!0,receive:i=!1}={}){const s=new pt(n,e);return s.castShadow=t,s.receiveShadow=i,s}function st(n,e){return li.set(n),e>0?li.lerp(new Ge("#ffffff"),e):li.multiplyScalar(1+e),"#"+li.getHexString()}function V_(n,{w:e=1024,h:t=256,font:i="Luckiest Guy",size:s=150,fill:r="#ffd23f",stroke:o="#1e4f8a",bg:a=null,sw:l=26}={}){const u=document.createElement("canvas");u.width=e,u.height=t;const c=u.getContext("2d");a&&(c.fillStyle=a,c.fillRect(0,0,e,t)),c.font=`${s}px "${i}", "Arial Black", sans-serif`,c.textAlign="center",c.textBaseline="middle",c.lineJoin="round",c.lineWidth=l,c.strokeStyle=o;const p=t/2+s*.08;c.strokeText(n,e/2,p),c.fillStyle=r,c.fillText(n,e/2,p);const m=new Zv(u);return m.colorSpace=fn,m.anisotropy=4,m}let fo=1;const Ye=()=>(fo=fo*16807%2147483647,(fo-1)/2147483646),Mt=n=>{const e=Math.sin(n*127.1+311.7)*43758.5453;return e-Math.floor(e)},wa=n=>{const e=Math.floor(n),t=n-e,i=t*t*(3-2*t);return Mt(e)*(1-i)+Mt(e+1)*i};function Gu(n,e){const t=[[0,-1.4],[0,.5],[.85,.62],[.9,.8],[3,.86]];return n===1?[...t,[3.3,-1.2],[3.8,-9],[4.7,-28],[5.6,-60],[6.2,-95]]:n===2?[...t,[5,1.15],[8.5,1.8],[13,2.4],[40,e],[42,e-45]]:[...t,[3.4,e*.38],[3.9,e*.72],[4.4,e],[40,e+1],[42,e-45]]}const Yr=new Ge;function Wu(n,e,t,i,s,r){n.push(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2]),Yr.set(r);for(let o=0;o<3;o++)e.push(Yr.r,Yr.g,Yr.b)}function G_(n,e){const t=new Ct;return t.setAttribute("position",new Qe(n,3)),t.setAttribute("color",new Qe(e,3)),t.computeVertexNormals(),t}function W_(n,e){const t=[];for(let s=0;s<n.n;s+=2){const r=n.a[s],o=-Math.cos(r)*e,a=-Math.sin(r)*e;let l=0,u=0;for(let f=Math.max(0,s-24);f<=Math.min(n.n-1,s+24);f+=4)l+=n.k[f],u++;const c=l/u,m=(e>0&&c<0||e<0&&c>0)&&Math.abs(c)>1e-4?Math.max(4.5,.8/Math.abs(c)-n.w[s]):1e9,d=e>0?n.lf[s]:n.rf[s],h=e>0?n.lt[s]:n.rt[s],v=e>0?n.lk[s]:n.rk[s];t.push({cx:n.x[s],cz:n.z[s],y:n.y[s],ox:o,oz:a,w:n.w[s],f:d,t:h,k:v,H:n.h[s],s:s*Lt,maxOff:m})}return t}function Xu(n,e){const t=e?n.n-1:0,i=n.a[t],s=Math.sin(i)*(e?1:-1),r=-Math.cos(i)*(e?1:-1),o=-Math.cos(i),a=-Math.sin(i),l=[],u=e?n.lt[t]:n.lf[t];for(let c=0;c<=24;c++){const p=c/24*Math.PI,m=Math.cos(p),d=Math.sin(p),h=o*m+s*d,v=a*m+r*d;l.push({cx:n.x[t],cz:n.z[t],y:n.y[t],ox:h,oz:v,w:n.w[t],f:u,t:u,k:1,H:n.h[t],s:e?n.length+c:-c,maxOff:1e9,cap:!0})}return l}function Ea(n,e,t,i){let s=null;for(const r of n){const o=Gu(r.f,r.H),a=Gu(r.t,r.H),l=r.k<.5?r.f:r.t,u=o.map((c,p)=>{let m=c[0]+(a[p][0]-c[0])*r.k,d=c[1]+(a[p][1]-c[1])*r.k;return p>=5&&p<=7&&(m+=(wa(r.s*.23+p*7)-.5)*.9,d+=(wa(r.s*.17+p*3.1)-.5)*(l===1?3:1.2)),p>=8&&(d+=(wa(r.s*.05+p)-.5)*2.2),m=Math.min(m,r.maxOff+(p>=8?p-8:0)*.4),[r.cx+r.ox*(r.w+m),r.y+d,r.cz+r.oz*(r.w+m)]});if(s)for(let c=0;c<u.length-1;c++){const p=s.pts[c],m=s.pts[c+1],d=u[c+1],h=u[c],v=X_(l,c,r.s,e);Wu(t,i,p,m,d,v),Wu(t,i,p,d,h,v)}s={pts:u}}}function X_(n,e,t,i){if(e<=1)return i.wall;if(e<=3)return e===3?i.ledge:st(i.ledge,-.04);const s=Mt(Math.floor(t/2.5)*13+e);return n===1?e===4?i.wall:st(e%2?i.wall:i.ledge,-.05-s*.08-(e-4)*.05):n===2?e===4?i.sand:e<=6?st(i.sand,(s-.5)*.06):e===7?st(i.top,(s-.5)*.05):i.cliff[3]:e===7?st(i.top,(s-.5)*.05):e===8?i.cliff[3]:st(i.cliff[(e+Math.floor(t/7))%3],(s-.5)*.07)}const q_=`
attribute float aTau; attribute float aRapid;
varying vec2 vUv; varying float vTau; varying float vRapid; varying float vFog;
void main(){ vUv = uv; vTau = aTau; vRapid = aRapid;
  vec4 mv = modelViewMatrix * vec4(position,1.); vFog = -mv.z; gl_Position = projectionMatrix * mv; }`,$_=`
uniform float uTime; uniform vec3 uDeep, uEdge, uFoam, uFogColor; uniform float uFogNear, uFogFar;
varying vec2 vUv; varying float vTau; varying float vRapid; varying float vFog;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  float a = abs(vUv.x);
  vec3 col = mix(uDeep, uEdge, smoothstep(.2, 1.05, a));
  // streaks advected with the current: coordinate = travel time - t
  float tt = vTau - uTime;
  vec2 p = vec2(vUv.x * 4.5 + n2(vec2(tt * .9, vUv.x * 2.)) * .8, tt * 1.6);
  float s1 = n2(p * vec2(1., .55));
  float streak = smoothstep(.74 - vRapid * .18, .765 - vRapid * .18, s1) * (1. - smoothstep(.775, .80, s1));
  float spark = step(.955 - vRapid * .08, n2(vec2(vUv.x * 22., tt * 11.)));
  col = mix(col, uFoam, clamp(streak * .5 + spark * .35 + vRapid * .1, 0., 1.));
  // foam against the walls
  float edge = smoothstep(.84, .97, a + .035 * sin(vTau * 6. + uTime * 4. + vUv.x * 3.));
  col = mix(col, uFoam, edge * .95);
  float fog = smoothstep(uFogNear, uFogFar, vFog);
  gl_FragColor = vec4(mix(col, uFogColor, fog), 1.);
  #include <colorspace_fragment>
}`;function Y_(n,e){const i=[],s=[],r=[],o=[],a=[];let l=0;const u=[];for(let h=0;h<n.n;h+=2)h>0&&(l+=Lt*2/Math.max(.4,n.flow[h])),u.push({i:h,tau:l});for(const h of u){const v=h.i,f=n.a[v],g=-Math.cos(f),x=-Math.sin(f),y=n.w[v]+.05,M=v<n.n-2?(n.y[v+2]-n.y[v])/(2*Lt):0;for(let w=0;w<=8;w++){const b=w/8*2-1;i.push(n.x[v]+g*b*y,n.y[v],n.z[v]+x*b*y),s.push(b,v*Lt),r.push(h.tau*.35),o.push(Math.min(1,Math.max(0,(n.flow[v]-2.5)/3)+Math.max(0,-M)*3))}}const c=9;for(let h=0;h<u.length-1;h++)for(let v=0;v<8;v++){const f=h*c+v,g=f+1,x=f+c,y=x+1;a.push(f,x,g,g,x,y)}for(const h of[0,1]){const v=h?n.n-1:0,f=n.a[v],g=Math.sin(f)*(h?1:-1),x=-Math.cos(f)*(h?1:-1),y=-Math.cos(f),M=-Math.sin(f),w=n.w[v]+.05,b=i.length/3,_=h?u[u.length-1].tau*.35:0;i.push(n.x[v],n.y[v],n.z[v]),s.push(0,v*Lt),r.push(_),o.push(0);for(let T=0;T<=24;T++){const D=T/24*Math.PI,S=y*Math.cos(D)+g*Math.sin(D),E=M*Math.cos(D)+x*Math.sin(D);i.push(n.x[v]+S*w,n.y[v],n.z[v]+E*w),s.push(1,v*Lt),r.push(_),o.push(0),T&&a.push(b,b+T,b+T+1)}}const p=new Ct;p.setAttribute("position",new Qe(i,3)),p.setAttribute("uv",new Qe(s,2)),p.setAttribute("aTau",new Qe(r,1)),p.setAttribute("aRapid",new Qe(o,1)),p.setIndex(a),p.computeBoundingSphere();const m=new Tn({vertexShader:q_,fragmentShader:$_,side:en,uniforms:{uTime:{value:0},uDeep:{value:new Ge(e.water)},uEdge:{value:new Ge(e.waterEdge)},uFoam:{value:new Ge(e.foam)},uFogColor:{value:new Ge(e.fog)},uFogNear:{value:e.fogNear},uFogFar:{value:e.fogFar}}}),d=new pt(p,m);return d.receiveShadow=!1,d.renderOrder=-1,d}function qu(n,e,t,i=10){const s=[],r=[],o=new F(0,1,0),a=new F,l=new F,u=new F;n.forEach((p,m)=>{const d=n[Math.min(n.length-1,m+1)],h=n[Math.max(0,m-1)];a.set(d[0]-h[0],d[1]-h[1],d[2]-h[2]).normalize(),l.crossVectors(a,o).normalize(),u.crossVectors(l,a).normalize();for(let v=0;v<i;v++){const f=v/i*Math.PI*2,g=Math.cos(f)*e,x=Math.sin(f)*e;s.push(p[0]+l.x*g+u.x*x,p[1]+l.y*g+u.y*x,p[2]+l.z*g+u.z*x)}});for(let p=0;p<n.length-1;p++)for(let m=0;m<i;m++){const d=p*i+m,h=p*i+(m+1)%i,v=d+i,f=h+i;r.push(d,h,v,h,f,v)}const c=new Ct;return c.setAttribute("position",new Qe(s,3)),c.setIndex(r),c.computeVertexNormals(),Ue(c,t)}function Uc(n,e){const t=n.leaf,i=n.trunk,s=[];if(e===0)s.push(Ne(.22,.34,3.2,i,[0,1.6,0],[0,0,.06],1,7)),[[0,3.8,0,1.6],[1.1,3.3,.3,1.15],[-1,3.4,-.2,1.2],[.2,4.6,-.3,1.15],[-.3,3.2,1,1]].forEach(([r,o,a,l],u)=>s.push(Oe(Ue(new An(l,0),t[u%3]),[r,o,a],[u,u*2,0])));else if(e===1)s.push(Ne(.2,.3,4.2,i,[0,2.1,0],0,1,7)),s.push(Oe(Ue(new It(2.2,2.6,.9,9),t[0]),[0,4.3,0]),Oe(Ue(new It(1.6,2.1,.8,9),t[1]),[.2,5,.1]),Oe(Ue(new It(.9,1.4,.7,9),t[2]),[-.1,5.6,0]));else if(e===2){for(let r=0;r<6;r++)s.push(Ne(.17-r*.012,.19-r*.012,.9,r%2?i:st(i,.12),[r*r*.025,.45+r*.85,0],[0,0,-r*.05],1,7));for(let r=0;r<7;r++){const o=r/7*Math.PI*2;s.push(Oe(Ue(new Bt(.42,2.6,4),t[r%2]),[.62+Math.cos(o)*1.2,4.95,Math.sin(o)*1.2],[0,-o,-Math.PI/2-.38],[.25,1,1]))}s.push(Ie(.3,"#6b4a2a",[.62,5.1,0],0,1,6))}else if(e===3)for(let r=0;r<5;r++){const o=(Mt(r*3.1)-.5)*1.4,a=(Mt(r*7.7)-.5)*1.4,l=3.5+Mt(r)*3;s.push(Ne(.09,.1,l,n.rail,[o,l/2,a],[0,0,(Mt(r*2)-.5)*.12],1,6));for(let u=1;u<l;u+=1.1)s.push(Ne(.11,.11,.08,n.railRing,[o+u/l*(Mt(r*2)-.5)*-.2,u,a],0,1,6));s.push(Oe(Ue(new Bt(.25,.9,3),t[r%3]),[o+.3,l-.3,a],[0,0,-1],[1,1,.3]))}else if(e===4)for(let r=0;r<6;r++){const o=(Mt(r*5.3)-.5)*1.2,a=(Mt(r*9.1)-.5)*1.2,l=1.4+Mt(r*1.3)*1.2;s.push(Ne(.03,.04,l,t[1],[o,l/2-.2,a],0,1,5)),r%2===0?s.push(Ne(.08,.08,.4,"#8b5a34",[o,l-.1,a],0,1,6)):s.push(Oe(Ue(new Bt(.12,1.2,3),t[0]),[o+.15,.4,a],[0,0,-.5],[1,1,.3]))}else if(e===5)for(let r=0;r<5;r++)s.push(Oe(Ue(new Bt(.12,.7,3),t[r%3]),[(Mt(r)-.5)*.6,.3,(Mt(r*4)-.5)*.6],[(Mt(r*2)-.5)*.7,0,(Mt(r*3)-.5)*.7]));else if(e===6){s.push(Oe(Ue(new An(.6,0),t[0]),[0,.4,0],0,[1,.7,1]));for(let r=0;r<6;r++){const o=r/6*Math.PI*2;s.push(Ie(.14,r%2?"#ff7fb6":"#ffb3d4",[Math.cos(o)*.45,.62,Math.sin(o)*.45],0,1,6))}}else if(e===7)s.push(Ne(.18,.26,1.6,i,[0,.8,0],0,1,6)),[[2.2,2.6,1.9],[1.75,2.2,3.1],[1.25,1.9,4.2],[.75,1.5,5.2]].forEach(([r,o,a],l)=>{s.push(Oe(Ue(new Bt(r,o,7),t[l%3]),[0,a,0],[0,l*.4,0])),s.push(Oe(Ue(new Bt(r*.82,o*.4,7),"#ffffff"),[0,a+o*.34,0],[0,l*.4,0]))});else if(e===8){s.push(Oe(Ue(new It(.28,.5,3.4,7),i),[0,1.6,0],[.12,0,.1])),s.push(Oe(Ue(new It(.14,.22,2.2,6),i),[.7,3.4,0],[0,0,-.8]),Oe(Ue(new It(.12,.2,2,6),i),[-.6,3.5,.3],[.3,0,.9])),[[0,4.3,0,1.5],[1.4,4,.2,1.1],[-1.3,4.1,.3,1.1]].forEach(([r,o,a,l],u)=>s.push(Oe(Ue(new An(l,0),t[u%3]),[r,o,a],0,[1,.6,1])));for(let r=0;r<5;r++)s.push(Oe(Ue(new Bt(.16,1.4,4),st(t[1],.15)),[(Mt(r)-.5)*2.6,3.2,(Mt(r*3)-.5)*1.6],[Math.PI,0,0]))}else if(e===9){const r=n.mush||"#c0479a";s.push(Ne(.28,.4,2.2,"#f3e6d2",[0,1.1,0],0,1,8)),s.push(Oe(Ue(new Rs(1.5,12,8,0,Math.PI*2,0,Math.PI/2),r),[0,2.1,0],0,[1,.7,1]));for(let o=0;o<6;o++){const a=o/6*Math.PI*2;s.push(Ie(.2,"#fff3e0",[Math.cos(a)*.9,2.75,Math.sin(a)*.9],0,[1,.4,1],6))}}else if(e===10)for(let r=0;r<5;r++){const o=(Mt(r*2.3)-.5)*1.6,a=(Mt(r*5.9)-.5)*1.6,l=1+Mt(r)*2.2;s.push(Oe(Ue(new Uo(.45,0),r%2?"#bdeeff":"#e6f9ff"),[o,l*.6,a],[(Mt(r)-.5)*.5,r,(Mt(r*7)-.5)*.5],[.7,l,.7]))}return je(s)}function $u(n,e){const t=[];return e===0?t.push(Oe(Ue(new ds(1,0),n.rock),[0,0,0],[.3,.5,.1],[1,.8,1.1])):e===1?(t.push(Oe(Ue(new mn(1.6,3.4,1.4),n.rock),[0,1.2,0],[.08,.3,.1])),t.push(Oe(Ue(new mn(1.3,2.6,1.2),st(n.rock,.08)),[1.1,.9,.3],[-.1,.6,-.12])),t.push(Oe(Ue(new mn(1.1,1.8,1),st(n.rock,-.06)),[-.9,.5,.4],[.15,-.3,.1]))):t.push(Oe(Ue(new An(1,0),st(n.rock,.05)),[0,0,0],[0,.7,0],[1.3,.6,1])),je(t)}function jr(n,e,t,{cast:i=!0}={}){const s=new Po(n,e,Math.max(1,t.length)),r=new At;return t.forEach((o,a)=>{r.position.set(o[0],o[1],o[2]),r.rotation.set(0,o[3]||0,0),r.scale.setScalar(o[4]||1),r.updateMatrix(),s.setMatrixAt(a,r.matrix)}),s.count=t.length,s.castShadow=i,s.receiveShadow=!1,s.computeBoundingSphere(),s}function ff(n,e,{color:t="#2f8fd8",pole:i="#86c540",ring:s="#5f9c2a"}={}){const r=new dt,o=je([Ne(.26,.3,6.6,i,[0,3.3,0],0,1,8),...[1,2.2,3.4,4.6,5.8].map(p=>Ne(.32,.32,.12,s,[0,p,0],0,1,8)),Ne(.36,.36,.3,"#f7a43a",[0,6.6,0],0,1,8)]);for(const p of[-1,1]){const m=tt(o,Un());m.position.x=p*e/2,_t(m,.04),r.add(m)}const a=tt(je([Ne(.24,.24,e+.6,i,[0,0,0],[0,0,Math.PI/2],1,8),...[-.3,0,.3].map(p=>Ne(.29,.29,.1,s,[p*e,0,0],[0,0,Math.PI/2],1,8))]),Un());a.position.y=6.1,_t(a,.04),r.add(a);const l=Math.min(e*.78,n.length*.62+1.6),u=tt(je([ht(l+.4,1.9,.26,"#b5703a",[0,0,0]),ht(l,1.5,.3,t,[0,0,0])]),Un());u.position.y=6.1,u.rotation.x=-.08,_t(u,.04),r.add(u);const c=V_(n,{w:1024,h:256,size:Math.min(170,1700/n.length),fill:"#ffd23f",stroke:"#173b6b",sw:30});for(const p of[1,-1]){const m=new pt(new Ii(l*.98,l*.98/4),new tn({map:c,transparent:!0}));m.position.set(0,6.12,p*.2),m.rotation.set(-.08,p<0?Math.PI:0,0,"YXZ"),r.add(m)}return r}function j_(n,e){const t=e.theme;fo=7+e.id.length*31;const i=new dt;i.name="world";const s=[],r=[];for(const O of[1,-1]){const I=W_(n,O);I.side=O,Ea(I,t,s,r)}const o=Xu(n,!1),a=Xu(n,!0);o.side=1,Ea(o,t,s,r),a.side=1,Ea(a,t,s,r);const l=new pt(G_(s,r),hf("#ffffff",{vertexColors:!0,side:en}));l.receiveShadow=!0,l.name="terrain",i.add(l);const u=Y_(n,t);i.add(u);const c=[],p=[];for(const O of[1,-1]){const I=[];for(let X=0;X<n.n;X+=2){const U=n.a[X],re=-Math.cos(U)*O,ce=-Math.sin(U)*O,he=n.w[X]+.42;I.push([n.x[X]+re*he,n.y[X]+.78,n.z[X]+ce*he]),X%5===0&&c.push([I[I.length-1],n.a[X]])}p.push(qu(I,.4,t.rail,10))}for(const O of[0,1]){const I=O?n.n-1:0,X=n.a[I],U=Math.sin(X)*(O?1:-1),re=-Math.cos(X)*(O?1:-1),ce=-Math.cos(X),he=-Math.sin(X),ee=n.w[I]+.42,ve=[];for(let K=0;K<=24;K++){const j=K/24*Math.PI;ve.push([n.x[I]+(ce*Math.cos(j)+U*Math.sin(j))*ee,n.y[I]+.78,n.z[I]+(he*Math.cos(j)+re*Math.sin(j))*ee])}p.push(qu(ve,.4,t.rail,10))}const m=new pt(je(p),Un());m.castShadow=!0,m.receiveShadow=!0,i.add(m);const d=Oe(Ue(new hi(.42,.07,6,12),t.railRing),0,[0,0,0]),h=new Po(je([d]),Un(),c.length),v=new At;c.forEach(([O,I],X)=>{v.position.set(O[0],O[1],O[2]),v.rotation.set(0,-I,0),v.updateMatrix(),h.setMatrixAt(X,v.matrix)}),i.add(h);const f=(O,I,X)=>{for(let U=0;U<n.n;U+=6){const re=O-n.x[U],ce=I-n.z[U];if(re*re+ce*ce<(n.w[U]+X)**2)return!0}return!1},g={tree0:[],tree1:[],palm:[],bamboo:[],reeds:[],grass:[],bush:[],rock0:[],rock1:[],rock2:[]},x={};for(let O=2;O<n.length-2;O+=2.5){n.at(O,x);for(const I of[1,-1]){const X=Math.round(O/Lt),U=(I>0?n.lk[X]:n.rk[X])<.5?I>0?n.lf[X]:n.rf[X]:I>0?n.lt[X]:n.rt[X],re=Ye(),ce=x.nx*I,he=x.nz*I,ee=(ve,K,j,me=1,fe=4)=>{const W=x.x+ce*(x.w+K),Q=x.z+he*(x.w+K);f(W,Q,fe)||ve.push([W,x.y+j,Q,Ye()*6.28,me])};U===0?(re<.3&&ee(Ye()<.55?g.tree0:g.tree1,6+Ye()*16,x.h+.9,.8+Ye()*.6,6),Ye()<.35&&ee(g.grass,5+Ye()*20,x.h+1,1+Ye(),5),Ye()<.06&&ee(g.rock2,7+Ye()*12,x.h+.9,.8+Ye(),6),Ye()<.07&&ee(g.bamboo,2+Ye()*.6,.85,.8+Ye()*.3,1.6)):U===1?re<.08?ee(g.bamboo,2.2+Ye()*.4,.85,.7+Ye()*.3,1.6):re<.2?ee(g.bush,2.3,.86,.8+Ye()*.4,1.6):re<.3&&ee(g.grass,2+Ye(),.86,1,1.6):(re<.22&&ee(g.palm,6+Ye()*10,1.6,.9+Ye()*.3,5),Ye()<.25&&ee(g.bamboo,3.5+Ye()*6,1.3,.9,3),Ye()<.3&&ee(g.grass,4+Ye()*14,1.6,1.2,4),Ye()<.3&&ee(g.reeds,-.7,0,.9+Ye()*.4,-1),Ye()<.08&&ee(g.rock1,5+Ye()*6,1,1+Ye()*.5,4),Ye()<.2&&ee(g.tree0,12+Ye()*18,x.h,1+Ye()*.4,8))}}const y={tree0:0,tree1:1,palm:2,bamboo:3,reeds:4,grass:5,bush:6,...t.flora},M={...t,leaf:Array(3).fill(t.bush||"#6fb84a")},w=nr(),b=(O,I,X=!0)=>{I.length&&i.add(jr(O,w,I,{cast:X}))};for(const[O,I]of[["tree0",!0],["tree1",!0],["palm",!0],["bamboo",!0],["reeds",!1],["grass",!1],["bush",!1]])y[O]==null||!g[O].length||b(Uc(y[O]===6?M:t,y[O]),g[O],I);b($u(t,2),g.rock2),b($u(t,1),g.rock1);const _=[],T=(O,I,X)=>{n.at(O,x);const U=ff(I,x.w*2+2.2,{pole:t.rail,ring:t.railRing});U.position.set(x.x,x.y,x.z),U.rotation.y=-x.a+Math.PI,U.userData={s:O,kind:X},i.add(U),_.push(U);const re=jr(Uc(y.bush===6?M:t,y.bush??6),w,[-1,1].map(ce=>[x.x+x.nx*ce*(x.w+1.4),x.y+.86,x.z+x.nz*ce*(x.w+1.4),0,1.1]),{cast:!1});return i.add(re),U};T(e.start,"DÉPART","start"),e.checkpoints.forEach((O,I)=>T(O,"CHECKPOINT","cp"+(I+1))),T(e.finish,"ARRIVÉE","finish");const D=[],S=[],E=(Math.min(...n.x)+Math.max(...n.x))/2,k=(Math.min(...n.z)+Math.max(...n.z))/2;for(let O=0;O<26;O++){const I=Ye()*Math.PI*2,X=230+Ye()*260;D.push([E+Math.cos(I)*X,-40+Ye()*50,k+Math.sin(I)*X,Ye()*6,14+Ye()*24])}const B=je([Oe(Ue(new It(1,.8,3,9),t.far),[0,0,0]),Oe(Ue(new It(1.02,1.02,.25,9),t.farTop||t.grass),[0,1.55,0]),Oe(Ue(new Bt(.8,1.6,9),st(t.far,-.12)),[0,-2.3,0],[Math.PI,0,0])]);i.add(jr(B,nr(),D,{cast:!1}));for(let O=0;O<40;O++){const I=Ye()*Math.PI*2,X=120+Ye()*420;S.push([E+Math.cos(I)*X,35+Ye()*70,k+Math.sin(I)*X,Ye()*6,6+Ye()*10])}const G=je([[0,0,0,1],[1.1,-.2,.2,.75],[-1.1,-.25,-.1,.7],[.4,.35,-.3,.7],[-.5,.1,.5,.6]].map(([O,I,X,U])=>Oe(Ue(new An(U,1),"#ffffff"),[O,I,X],0,[1,.7,1])));return i.add(jr(G,new hr({vertexColors:!0,flatShading:!0,emissive:t.cloud||"#e8f4ff",emissiveIntensity:.55}),S,{cast:!1})),{root:i,water:u,signs:_,theme:t,update(O){u.material.uniforms.uTime.value=O}}}function K_(n){const e=new Rs(1200,24,12),t=new Tn({side:kt,depthWrite:!1,fog:!1,uniforms:{top:{value:new Ge(n.sky[0])},bottom:{value:new Ge(n.sky[1])}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 top, bottom; varying vec3 vP; void main(){ float k = smoothstep(-.15, .55, vP.y); gl_FragColor = vec4(mix(bottom, top, k), 1.);
#include <colorspace_fragment>
}`}),i=new pt(e,t);return i.renderOrder=-10,i.frustumCulled=!1,i}function J_(n,{quality:e="high"}={}){const t=e==="low"||/iPhone|Android/.test(navigator.userAgent),i=/[?&]pflow/.test(location.search),s=new jv({canvas:n,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});s.outputColorSpace=fn,s.toneMapping=$n,s.shadowMap.enabled=!i,s.shadowMap.type=Ah;const r=new Kv,o=new dn(55,16/9,.3,1500),a=new L_("#e6f6ff","#f2c3a0",1.55),l=new U_("#fff4e2",1.75);l.castShadow=!0;const u=t?1024:2048;l.shadow.mapSize.set(u,u),Object.assign(l.shadow.camera,{left:-26,right:26,top:26,bottom:-26,near:1,far:140}),l.shadow.bias=-6e-4,l.shadow.normalBias=.04,r.add(a,l,l.target);const c=new F(.45,.85,.35).normalize();let p=null;const m={renderer:s,scene:r,camera:o,sun:l,hemi:a,taps:new Set,pixelRatio:i?.3:Math.min(devicePixelRatio||1,t?1.5:2),setTheme(d){p&&r.remove(p),p=K_(d),r.add(p),r.fog=new rl(d.fog,d.fogNear,d.fogFar),r.background=new Ge(d.sky[1]);const h={sky:"#e6f6ff",ground:"#f2c3a0",sun:"#fff4e2",hemiI:1.55,sunI:1.75,...d.light};a.color.set(h.sky),a.groundColor.set(h.ground),a.intensity=h.hemiI,l.color.set(h.sun),l.intensity=h.sunI},focus(d,h,v){l.position.set(d+c.x*60,h+c.y*60,v+c.z*60),l.target.position.set(d,h,v),p&&p.position.set(o.position.x,0,o.position.z)},resize(d,h){s.setPixelRatio(m.pixelRatio),s.setSize(d,h,!1),o.aspect=d/Math.max(1,h),o.fov=o.aspect<1.2?68:55,o.updateProjectionMatrix()},render(){s.render(r,o);for(const d of m.taps)d(s.domElement)},dispose(){r.traverse(d=>{d.geometry&&d.geometry.dispose();const h=d.material;h&&(Array.isArray(h)?h:[h]).forEach(v=>{v.map?.dispose(),v.dispose()})}),s.dispose(),s.forceContextLoss?.()}};return m}const fr=Math.PI*2,cs=(n,e,t)=>Math.max(e,Math.min(t,n)),Ui=n=>n*n*(3-2*n),Fo=(n,e)=>((e+(n.phase||0)*n.period)%n.period+n.period)%n.period/n.period;function Mo(n,e){const t=Fo(n,e);return t<.5?0:t<.6?Ui((t-.5)/.1):t<.75?1:1-Ui((t-.75)/.25)}function ul(n,e){const t=Fo(n,e),i=n.up??4.6,s=.55;if(t<.55)return i;if(t<.62){const r=(t-.55)/.07;return i-(i-s)*r*r}return t<.74?s:s+(i-s)*Ui((t-.74)/.26)}const df=(n,e)=>(n.phase||0)*fr+e*n.speed;function pf(n,e){const t=Fo(n,e);return t<.62?0:t<.7?Ui((t-.62)/.08):t<.86?1:1-Ui((t-.86)/.14)}function mf(n,e){const t=Fo(n,e);return t<.7?0:t<.76?Ui((t-.7)/.06):t<.84?1:1-Ui((t-.84)/.16)}const ls=(n,e)=>(n.d||0)+(n.amp||0)*Math.sin(fr*e/(n.period||4)+(n.phase||0)*fr),Yu=1.7,Z_=-.3;function Q_(n,e,t,i=[]){i.length=0;const s=n.side*(e+1.3),r=n.len??7.2,o=n.hub??3.4,a=n.arms??4,l=df(n,t);for(let u=0;u<a;u++){const c=l+u*fr/a,p=Math.cos(c),m=Math.sin(c);if(m>=0||o+r*m>Yu)continue;const d=cs((Yu-o)/(r*m),0,1),h=cs((Z_-o)/(r*m),0,1);h<=d||i.push([s+d*r*p,s+h*r*p])}return i}const ju=[];function ex(n,e,t,i,s){const r=e.s-n.s;switch(n.type){case"spikes":{if(e.s<n.s-t*.6||e.s>n.s1+t*.6)return null;const o=s.w-(n.inset??.7),a=n.side*e.d+t-o;return a>0?{n:[0,-n.side],depth:a,hit:!0}:null}case"rock":case"post":case"mine":case"saw":case"croc":{if(Math.abs(r)>t+n.r+1)return null;const o=n.type==="rock"||n.type==="post"?n.d:ls(n,i),a=e.d-o,l=Math.hypot(r,a),u=t+n.r-l;if(u<=0)return null;const c=l>1e-4?1/l:0,p=n.type==="mine"||n.type==="saw"||n.type==="croc"&&mf(n,i)>.6;return{n:l>1e-4?[r*c,a*c]:[-1,0],depth:u,hit:p,kick:n.type==="croc"&&p?3:0}}case"turnstile":{const o=n.len??4,a=n.r??.45;if(Math.abs(r)>o+t+a)return null;const l=(n.phase||0)*fr+i*(n.speed??1),u=Math.cos(l),c=Math.sin(l),p=e.d-(n.d||0),m=cs(r*u+p*c,-o,o),d=r-m*u,h=p-m*c,v=Math.hypot(d,h);if(v>=t+a){const f=Math.hypot(r,p),g=p+(p<0?-.8:.8),x=Math.hypot(r,g);return f<t+.6?{n:[r/x,g/x],depth:t+.6-f,hit:!1}:null}return{n:v>1e-4?[d/v,h/v]:[1,0],depth:t+a-v,hit:!0,kick:2}}case"log":{const o=(n.len??4.5)/2,a=n.r??.5;if(Math.abs(r)>o+t+a)return null;const l=ls(n,i),u=cs(r,-o,o),c=r-u,p=e.d-l,m=Math.hypot(c,p);return m>=t+a?null:{n:m>1e-4?[c/m,p/m]:[0,1],depth:t+a-m,hit:!1}}case"jaws":{const o=(n.thick??1.3)/2;if(Math.abs(r)>o+t)return null;const a=Mo(n,i),l=s.w*(1-a)+.05;let u=null;for(const c of[1,-1]){const p=cs(r,-o,o),m=c>0?Math.max(e.d,l):Math.min(e.d,-l),d=r-p,h=e.d-m,v=Math.hypot(d,h),f=Math.abs(r)<=o&&c*e.d>=l;if(!f&&v>=t)continue;const g=f?t+c*e.d-l:t-v,x=f?[0,-c]:[d/v,h/v];(!u||g>u.depth)&&(u={n:x,depth:g,hit:!1})}return u&&a>.35&&Math.abs(r)<o+t*.5&&2*l<2*t*.9&&Mo(n,i+.05)>=a&&(u.crush=!0),u}case"bar":{const o=ul(n,i),a=n.r??.55;return o>2.1||Math.abs(r)>t+a?null:{n:[r>=0?1:-1,0],depth:t+a-Math.abs(r),hit:!0,kick:3}}case"mill":{if(Math.abs(r)>t+1.2)return null;Q_(n,s.w,i,ju);const o=n.r??.5;for(const[a,l]of ju){const u=Math.min(a,l),c=Math.max(a,l),p=cs(e.d,u,c),m=Math.hypot(r,e.d-p);if(m<t+o)return{n:m>1e-4?[r/m,(e.d-p)/m]:[1,0],depth:t+o-m,hit:!0,kick:2}}return null}}return null}function tx(n,e,t,i,s){const r=e.s-n.s;if(n.type==="whirl"){const o=e.d-n.d,a=Math.hypot(r,o);if(a>n.r)return!1;const l=(1-a/n.r)*(n.strength??3);return i.s+=-o/(a||1)*l*n.dir-r/(a||1)*l*.25,i.d+=r/(a||1)*l*n.dir-o/(a||1)*l*.25,i.spin+=l*.45*n.dir,!0}if(n.type==="geyser"){const o=pf(n,s),a=e.d-n.d,l=Math.hypot(r,a),u=(n.r??1.8)+t;if(o<=0||l>u)return!1;const c=o*(1-l/u)*(n.power??14);return i.s+=(l>.01?r/l:1)*c,i.d+=(l>.01?a/l:0)*c,i.spin+=o*2.5*(a>=0?1:-1),!0}return n.type==="boost"?r<0||r>n.len||Math.abs(e.d-n.d)>n.w/2+t*.4?!1:(i.s+=n.power??5,!0):!1}const ai=2.2,sr=3,Aa=5.6,Ku=5.2,Ju=.32,nx=2.6,ix=1.6,ut={},ts={};class sx{constructor(e,t){this.track=e,this.course=t,this.cps=[t.spawn,...t.checkpoints],this.hz=t.hazards.slice().sort((i,s)=>i.s-s.s),this.st={x:0,z:0,y:0,vx:0,vz:0,yaw:0,w:0,air:sr,inv:0,pop:-1,cp:0,s:0,d:0,deaths:0,finished:!1,time:0,bump:0,lastHit:null},this.respawn(0)}respawn(e=this.st.cp){const t=this.st,i=this.track,s=this.cps[e]+(e===0?0:3);i.at(s,ut),Object.assign(t,{x:ut.x,z:ut.z,y:ut.y,vx:ut.tx*ut.flow*.5,vz:ut.tz*ut.flow*.5,yaw:ut.a,w:0,air:sr,inv:1.2,pop:-1,cp:e,s,d:0})}get popped(){return this.st.pop>=0}step(e,t,i,s=[]){const r=this.st,o=this.track;if(r.finished)return r.vx*=.9,r.vz*=.9,r.x+=r.vx*e,r.z+=r.vz*e,s;if(r.time+=e,r.pop>=0)return r.pop+=e,r.pop>=nx&&(this.respawn(),s.push({k:"respawn",cp:r.cp})),s;r.inv=Math.max(0,r.inv-e),r.bump=Math.max(0,r.bump-e);const a=o.project(r.x,r.z,r.s);r.s=a.s,r.d=a.d,o.at(Math.max(0,a.s),ut);let l=0,u=0;for(const y of i){const M=r.yaw+y.a,w=Math.cos(M),b=Math.sin(M);y.f&&(l-=w*Aa,u-=b*Aa),y.sp>0&&(r.vx-=w*Ku*y.sp,r.vz-=b*Ku*y.sp,r.w+=(Math.random()-.5)*.6)}const c=Math.hypot(l,u),p=Aa*1.7;c>p&&(l*=p/c,u*=p/c);const m={s:0,d:0,spin:0};for(const y of this.hz){if(y.s-a.s>14)break;a.s-y.s>30||tx(y,a,ai,m,t)}const d=ut.flow+m.s,h=ut.tx*d+ut.nx*m.d,v=ut.tz*d+ut.nz*m.d,f=1-Math.exp(-.85*e);r.vx+=(h-r.vx)*f+l*e,r.vz+=(v-r.vz)*f+u*e,r.w+=m.spin*e,r.w*=Math.exp(-.9*e),ut.slope<-.02&&(r.vx+=ut.tx*-ut.slope*9*e,r.vz+=ut.tz*-ut.slope*9*e),r.x+=r.vx*e,r.z+=r.vz*e,r.yaw+=r.w*e;const g=o.project(r.x,r.z,r.s);if(o.at(Math.max(0,g.s),ut),g.s<0){const y=r.x-ut.x,M=r.z-ut.z,w=Math.hypot(y,M),b=w+ai-ut.w;b>0&&this.contact(y/w,M/w,b,s)}else{const y=Math.abs(g.d)+ai-ut.w;if(y>0){const M=Math.sign(g.d)||1;this.contact(ut.nx*M,ut.nz*M,y,s)}}g.s=Math.max(g.s,-50);for(const y of this.hz){if(y.s-g.s>12)break;if(g.s-(y.s1??y.s)>12)continue;o.at(y.type==="spikes"?rx(g.s,y):y.s,ts);const M=ex(y,g,ai,t,ts);if(!M)continue;const w=ts.tx*M.n[0]+ts.nx*M.n[1],b=ts.tz*M.n[0]+ts.nz*M.n[1];if(M.crush)return this.burst(s,"crush",y,g,t),s;if(this.contact(-w,-b,M.depth,s,M.kick),M.hit&&r.inv<=0&&(r.air--,r.inv=ix,r.lastHit=y.type,r.w+=(Math.random()<.5?-1:1)*(2+Math.random()*2),r.vx+=w*4.5,r.vz+=b*4.5,s.push({k:"hit",air:r.air,x:r.x-w*ai,z:r.z-b*ai,cause:y.type,...this.origin(y,g,t),depth:Kr(M.depth)}),r.air<=0))return this.burst(s,y.type,y,g,t),s}r.s=g.s,r.d=g.d,r.y=ut.y;const x=this.cps[r.cp+1];return x!=null&&r.s>=x&&(r.cp++,s.push({k:"cp",i:r.cp})),r.s>=this.course.finish&&(r.finished=!0,s.push({k:"finish",time:r.time,deaths:r.deaths})),Number.isFinite(r.x+r.z+r.vx+r.vz+r.yaw+r.w)||(this.respawn(),s.push({k:"respawn",cp:r.cp})),s}contact(e,t,i,s,r=0){const o=this.st;o.x-=e*i,o.z-=t*i;const a=o.vx*e+o.vz*t;a>0&&(o.vx-=(1+Ju)*a*e,o.vz-=(1+Ju)*a*t,a>1.6&&o.bump<=0&&(s.push({k:"bump",v:a}),o.bump=.25)),r&&(o.vx-=e*r,o.vz-=t*r);const l=e*2.2,u=t*2.2,c=-t,p=e,d=-((o.vx+o.w*u)*c+(o.vz-o.w*l)*p)*.22;o.vx+=c*d*.5,o.vz+=p*d*.5,o.w+=(u*c-l*p)*d*2/4.84}burst(e,t,i=null,s=null,r=null){const o=this.st;o.pop=0,o.air=0,o.deaths++,o.vx=o.vz=0,o.w=0,e.push({k:"pop",x:o.x,z:o.z,cause:t,deaths:o.deaths,...i?this.origin(i,s,r):{}})}origin(e,t,i){return{id:this.course.hazards.indexOf(e),s:Kr(t.s),d:Kr(t.d),t:Kr(i)}}giveUp(e=[]){return this.st.pop<0&&!this.st.finished&&this.burst(e,"reset"),e}pack(){const e=this.st,t=i=>Math.round(i*1e3)/1e3;return[t(e.x),t(e.z),t(e.y),t(e.yaw),t(e.vx),t(e.vz),t(e.w),e.air,t(e.pop),e.cp,t(e.s),e.deaths,e.finished?1:0,t(e.time),t(e.inv)]}}function Zu(n,e={}){return[e.x,e.z,e.y,e.yaw,e.vx,e.vz,e.w,e.air,e.pop,e.cp,e.s,e.deaths,e.finished,e.time,e.inv]=n,e.finished=!!e.finished,e}const rx=(n,e)=>Math.max(e.s,Math.min(e.s1,n)),Kr=n=>Math.round(n*100)/100;let gf="#b24fc8",vf="#c97be0",rs="#fbf7f2";function ox(){const n=new dt,e=new dt;n.add(e);const t=ai-.25,i=tt(je([Oe(Ue(new hi(t,.44,14,40),"#f7dcb8"),[0,.35,0],[Math.PI/2,0,0]),Oe(Ue(new hi(t,.46,8,40,Math.PI*2),"#8fe0d6"),[0,.2,0],[Math.PI/2,0,0],[1,1,.55])]),Un());_t(i,.035),e.add(i);const s=[Ne(t-.1,t-.1,.16,"#9fd273",[0,.38,0],0,1,32)];for(let a=-2;a<=2;a++){const l=a*.62,u=Math.sqrt(Math.max(0,(t-.14)**2-l*l));s.push(ht(.05,.02,u*2,"#6f9f4b",[l+.31,.47,0]))}for(let a=0;a<4;a++){const l=a*Math.PI/2+Math.PI/4,u=Math.cos(l),c=Math.sin(l);s.push(Oe(Ue(new hi(.3,.09,6,12,Math.PI),"#c8423a"),[u*t,.72,c*t],[0,-l+Math.PI/2,0])),s.push(ht(.5,.3,.25,"#f2a33a",[u*(t+.5),.05,c*(t+.5)],[0,-l,0]))}const r=tt(je(s),Un());r.receiveShadow=!0,_t(r,.03),e.add(r);let o=0;return{root:n,body:e,tube:i,setState(a,l,u){const c=a>=3?1:a===2?.92:.8;if(i.scale.set(1,1,c+Math.sin(u*30)*(a<3?.012:0)),l>=0){o=l;const p=l<.12?1+l*3:Math.max(0,1.36-(l-.12)*6);e.scale.setScalar(p),e.visible=p>.01}else o&&(o=0,e.scale.setScalar(1),e.visible=!0)}}}function Jr(n,e=.45,t=2.6,i=[[0,1],[1,0],[-1,0],[0,-1]]){const s=[Ne(e,e,n,gf,[0,0,0],[0,0,Math.PI/2],1,12)];for(let o=-n/2+.4;o<n/2;o+=1.4)s.push(Ne(e+.04,e+.04,.18,vf,[o,0,0],[0,0,Math.PI/2],1,12));const r=Math.max(2,Math.round(n*t/i.length));for(let o=0;o<r;o++){const a=-n/2+(o+.5)*n/r;i.forEach(([l,u],c)=>{const p=c%2*.5*n/r,m=Ue(new Bt(.16,.55,8),rs);m.translate(0,e+.2,0),m.rotateX(Math.atan2(u,l)),m.translate(a+p-(p?n/r/4:0),0,0),s.push(m)})}return je(s)}function ax(n,e){const t=e.theme;gf=t.trap||"#b24fc8",vf=t.trapHi||"#c97be0",rs=t.spike||"#fbf7f2";const i=t.mine||"#d2463c",s=t.rail||"#86c540",r=t.railRing||"#5f9c2a",o=t.tower||"#f39bb0",a=new dt,l=[],u={},c={},p=Un(),m=(d,h=.035)=>(h&&_t(d,h),a.add(d),d);for(const d of e.hazards)if(n.at(d.s,u),d.type==="spikes"){const h=[];for(let v=d.s;v<d.s1-.1;v+=4){const f=Math.min(d.s1,v+4),g=f-v,x=Jr(g+.3,.42,2.4,[[.3,-1],[-.25,-1],[1,-.6],[-.9,-.5]].map(([w,b])=>{const _=Math.hypot(w,b);return[w/_,b/_]}));n.at((v+f)/2,c);const y=d.side*(c.w-.2),M=new ct().compose(new F(c.x+c.nx*y,c.y+.35,c.z+c.nz*y),new pi().setFromEuler(new on(0,-c.a+Math.PI/2+(d.side>0?Math.PI:0),0)),new F(1,1,1));x.applyMatrix4(M),h.push(x)}m(tt(je(h),p))}else if(d.type==="rock"||d.type==="post"){const h=t.rock||"#8d8f99",v=d.type==="post"?je([Ne(d.r,d.r*1.1,4,s,[0,1.5,0],0,1,10)]):je([Oe(Ue(new ds(1,0),h),[0,.3,0],[.4,d.s,.2],[1,1.3,1]),Oe(Ue(new ds(.7,0),st(h,.1)),[.5,1.1,.2],[.1,d.s*2,.5]),Oe(Ue(new An(.55,0),st(h,-.08)),[-.55,.9,-.3],[.6,0,.3]),...t.snowRocks?[Oe(Ue(new ds(.75,0),"#ffffff"),[0,1.25,0],[.4,d.s,.2],[1,.45,1.05])]:[]]),f=tt(v,d.type==="post"?p:new hr({vertexColors:!0,flatShading:!0}));n.world(d.s,d.d,c),f.position.set(c.wx,c.y,c.wz),f.scale.setScalar(d.r*(d.type==="rock"?1.15:1)),m(f,d.type==="post"?.03:0)}else if(d.type==="mine"){const h=je([Ie(1,i,[0,0,0],0,[1,.78,1],18),Ne(1.02,1.02,.22,"#fbf7f2",[0,-.02,0],0,1,18),...Array.from({length:10},(f,g)=>{const x=g/10*Math.PI*2,y=g%2?.25:.9,M=Ue(new Bt(.2,.55,8),rs);return M.translate(0,1.05,0),M.rotateZ(-y),M.rotateY(x),M}),nn(.22,.6,rs,[0,1.05,0],0,1,8)]),v=m(tt(h,p));v.scale.setScalar(d.r*.95),l.push(f=>{n.world(d.s,ls(d,f),c),v.position.set(c.wx,c.y+.15+Math.sin(f*2.4+d.s)*.12,c.wz),v.rotation.y=f*.6})}else if(d.type==="saw"){const h=[Ne(1,1,.16,"#c3c9d4",[0,0,0],0,1,28),Ne(.32,.32,.3,"#d2463c",[0,.05,0],0,1,14)];for(let f=0;f<16;f++){const g=f/16*Math.PI*2;h.push(Oe(Ue(new Bt(.16,.42,4),rs),[Math.cos(g)*1.12,0,Math.sin(g)*1.12],[0,-g,-Math.PI/2-.4]))}const v=m(tt(je(h),p));v.scale.setScalar(d.r/1.12),l.push(f=>{n.world(d.s,ls(d,f),c),v.position.set(c.wx,c.y+.55,c.wz),v.rotation.y=-f*7,v.rotation.z=Math.sin(f*3)*.08})}else if(d.type==="jaws"){const h=u.w,v=h+1.2,f=d.thick??1.3,g=()=>{const M=[ht(v,3.2,f,"#6f7685",[v/2,1.2,0]),ht(v+.1,.25,f+.1,"#565c69",[v/2,2.85,0])];for(let w=0;w<Math.floor(v/.9);w++)for(let b=0;b<3;b++)for(const _ of[1,-1])M.push(ht(.32,.32,.12,rs,[.5+w*.9,.3+b*.9,_*(f/2+.03)]));return je(M)},x=[1,-1].map(M=>{const w=new dt,b=tt(g(),p);return _t(b,.04),w.add(b),a.add(w),{g:w,side:M}}),y=je([ht(v+.5,4,f+.6,"#7b8292",[0,1.5,0]),ht(v+.7,.45,f+.8,"#f7a43a",[0,3.6,0]),ht(v*.7,7,f*.8,"#6a7180",[v*.1,-4,0]),...[-1,1].map(M=>ht(.5,.5,.1,"#ffd23f",[-(v+.5)/2+.6,2.6,M*(f+.62)/2]))]);for(const M of[1,-1]){const w=m(tt(y,p));n.world(d.s,M*(h+.1+(v+.5)/2),c),w.position.set(c.wx,c.y-.3,c.wz),w.rotation.y=M>0?Math.PI-c.a:-c.a}l.push(M=>{const w=Mo(d,M),b=h*(1-w);for(const{g:_,side:T}of x)n.world(d.s,T*(b+.02),c),_.position.set(c.wx,c.y-.4,c.wz),_.rotation.y=T>0?Math.PI-c.a:-c.a})}else if(d.type==="bar"){const h=u.w,v=new dt,f=tt(Jr(h*2+1,.45,2.4,[[-1,0],[-.7,.7],[-.7,-.7],[0,1],[0,-1]]),p);_t(f,.035),v.add(f),a.add(v);for(const g of[1,-1]){const x=m(tt(je([Ne(.35,.45,6.4,s,[0,3.2,0],0,1,8),Ne(.5,.5,.4,"#f7a43a",[0,6.4,0],0,1,8),...[1.4,2.8,4.2].map(y=>Ne(.42,.42,.1,r,[0,y,0],0,1,8))]),p));n.world(d.s,g*(h+1.1),c),x.position.set(c.wx,c.y,c.wz)}v.rotation.y=Math.PI-u.a,l.push(g=>{v.position.set(u.x,u.y+ul(d,g)+.2,u.z)})}else if(d.type==="mill"){const h=u.w,v=d.len??7.2,f=d.hub??3.4,g=d.arms??4,x=m(tt(je([Ne(.7,1,f+1.2,o,[0,(f-1.2)/2,0],0,1,10),Ne(.9,.9,.4,"#f7a43a",[0,-1,0],0,1,10),nn(1,1.4,"#e8605a",[0,f+.3,0],0,1,10)]),p));n.world(d.s,d.side*(h+1.3),c),x.position.set(c.wx-c.tx*1.2,c.y,c.wz-c.tz*1.2);const y=new dt,M=[];for(let _=0;_<g;_++){const T=Jr(v,.4,2.2,[[0,1],[0,-1],[1,0],[-1,0]]);T.translate(v/2,0,0),T.rotateZ(_*Math.PI*2/g),M.push(T)}M.push(Ne(.65,.65,.9,"#f7a43a",[0,0,0],[Math.PI/2,0,0],1,12));const w=tt(je(M),p);_t(w,.035),y.add(w),a.add(y),y.position.set(c.wx,c.y+f,c.wz);const b=new ct().makeBasis(new F(c.nx,0,c.nz),new F(0,1,0),new F(c.tx,0,c.tz));y.quaternion.setFromRotationMatrix(b),l.push(_=>{w.rotation.z=df(d,_)})}else if(d.type==="whirl"){const h=new dt,v=new tn({color:"#ffffff",transparent:!0,opacity:.55,depthWrite:!1});for(let f=0;f<3;f++){const g=new pt(new xr(d.r*(.25+f*.25),d.r*(.25+f*.25)+.18,40,1,0,Math.PI*1.3),v);g.rotation.x=-Math.PI/2,g.position.y=.05+f*.01,g.userData.k=f,h.add(g)}n.world(d.s,d.d,c),h.position.set(c.wx,c.y,c.wz),a.add(h),l.push(f=>h.children.forEach(g=>{g.rotation.z=f*(2.4-g.userData.k*.5)*d.dir}))}else if(d.type==="geyser"){const h=d.r??1.8,v=new tn({color:"#ffffff",transparent:!0,opacity:.4,depthWrite:!1}),f=new pt(new Io(h,28).rotateX(-Math.PI/2),v),g=new hr({color:t.foam||"#ffffff",emissive:"#bfefff",emissiveIntensity:.35,transparent:!0,opacity:.85}),x=new pt(je([Ne(h*.55,h*.8,1,"#ffffff",[0,.5,0],0,1,14),...[0,1,2,3,4].map(M=>Ie(h*.42,"#ffffff",[Math.cos(M*1.3)*h*.35,1.02,Math.sin(M*1.3)*h*.35],0,1,8))]),g);n.world(d.s,d.d,c);const y=new dt;y.position.set(c.wx,c.y+.05,c.wz),y.add(f,x),a.add(y),l.push(M=>{const w=pf(d,M),b=((M/d.period+(d.phase||0))%1+1)%1,_=b>.45&&b<.62?.5+.5*Math.sin(M*30):0;v.opacity=.25+_*.35+w*.4,f.scale.setScalar(1+_*.08+w*.25),x.visible=w>.01,x.scale.set(1+Math.sin(M*20)*.04,Math.max(.01,w*7.5),1+Math.cos(M*23)*.04)})}else if(d.type==="croc"){const h=t.croc||"#5e9e3e",v="#e7e29a",f=new dt,g=tt(je([ht(1.1,.32,2.2,h,[0,-.05,.9]),ht(.9,.1,1.9,v,[0,.12,.9]),...[-1,1].flatMap(w=>[0,1,2,3].map(b=>nn(.07,.22,"#ffffff",[w*.42,.25,.3+b*.45],0,1,6)))]),p),x=new dt;x.position.set(0,.12,-.1);const y=tt(je([ht(1.15,.4,2.3,h,[0,.2,1]),...[-1,1].map(w=>Ie(.22,h,[w*.32,.5,.05],0,1,10)),...[-1,1].map(w=>Ie(.13,"#fff7c2",[w*.32,.62,.1],0,1,8)),...[-1,1].map(w=>ht(.04,.16,.05,"#1d1d26",[w*.32,.64,.2])),...[-1,1].map(w=>Ie(.05,"#2a3b20",[w*.2,.42,2.1],0,1,6)),...[-1,1].flatMap(w=>[0,1,2,3].map(b=>nn(.07,.22,"#ffffff",[w*.44,-.02,.4+b*.45],[Math.PI,0,0],1,6)))]),p);_t(g,.03),_t(y,.03),x.add(y),f.add(g,x);const M=tt(je([0,1,2].map(w=>Ie(.4,h,[0,-.15,-1-w*.9],0,[1.2,.5,1],8))),p);f.add(M),f.scale.setScalar(d.r/1.1),a.add(f),l.push(w=>{n.world(d.s,ls(d,w),c),f.position.set(c.wx,c.y+.1+Math.sin(w*1.7+d.s)*.05,c.wz),f.rotation.y=-c.a,x.rotation.x=-(1-mf(d,w))*.75})}else if(d.type==="turnstile"){const h=d.len??4,v=Jr(h*2,.45,2.4,[[1,0],[0,1],[0,-1],[.7,.7],[.7,-.7]]),f=tt(v,p);_t(f,.035);const g=tt(je([Ne(.55,.6,2.4,s,[0,.6,0],0,1,10),Ne(.7,.7,.3,"#f7a43a",[0,1.9,0],0,1,10)]),p);_t(g,.035),n.world(d.s,d.d||0,c);const x=new dt;x.position.set(c.wx,c.y+.35,c.wz),x.add(f),a.add(x),g.position.set(c.wx,c.y,c.wz),a.add(g);const y=c.a;l.push(M=>{const w=(d.phase||0)*Math.PI*2+M*(d.speed??1),b=Math.cos(w)*Math.sin(y)+Math.sin(w)*-Math.cos(y),_=Math.cos(w)*-Math.cos(y)+Math.sin(w)*-Math.sin(y);x.rotation.y=Math.atan2(-_,b)})}else if(d.type==="log"){const h=d.len??4.5,v=d.r??.5,f=tt(je([Ne(v,v,h,"#8a5a34",[0,0,0],[Math.PI/2,0,0],1,10),...[-1,1].map(g=>Ne(v*.82,v*.82,.04,"#d9b07a",[0,0,g*h/2],[Math.PI/2,0,0],1,10)),...[-.25,.15].map(g=>Ne(v+.03,v+.03,.12,"#6e4527",[0,0,g*h],[Math.PI/2,0,0],1,10)),Ie(.22,"#6fb84a",[.1,v,.6],0,[1.3,.5,1],6)]),p);_t(f,.03),a.add(f),l.push(g=>{n.world(d.s,ls(d,g),c),f.position.set(c.wx,c.y+.12,c.wz),f.rotation.set(Math.sin(g*1.3+d.s)*.05,-c.a,Math.sin(g*2.1)*.2)})}else if(d.type==="boost"){const h=new dt,v=new tn({color:"#ffd23f"}),f=new ll;f.moveTo(-1,0),f.lineTo(0,.9),f.lineTo(1,0),f.lineTo(.6,0),f.lineTo(0,.55),f.lineTo(-.6,0);const g=new No(f);g.rotateX(-Math.PI/2);const x=[];for(let y=0;y<4;y++){const M=new pt(g,v);M.scale.setScalar(d.w*.45),h.add(M),x.push(M)}a.add(h),l.push(y=>x.forEach((M,w)=>{const b=(y*.8+w/4)%1,_=d.s+b*d.len;n.world(_,d.d,c),M.position.set(c.wx,c.y+.06,c.wz),M.rotation.y=-c.a,M.scale.setScalar(d.w*.45*Math.sin(b*Math.PI))}))}return{root:a,update(d){for(const h of l)h(d)}}}const Rn=new ct,Os=new pi,Ta=new on,zs=new F,Bs=new F,Js=new Ge;class Hs{constructor(e,t,i,{alpha:s=!1}={}){this.max=i,this.items=[],this.free=[],this.mesh=new Po(e,t,i),this.mesh.instanceMatrix.setUsage(Bl),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.setColorAt(0,Js.set("#ffffff")),s&&(this.alpha=new Cc(new Float32Array(i),1),this.alpha.setUsage(Bl),e.setAttribute("aAlpha",this.alpha),t.transparent=!0,t.depthWrite=!1,t.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("void main() {",`attribute float aAlpha; varying float vAlpha;
void main() { vAlpha = aAlpha;`),r.fragmentShader=r.fragmentShader.replace("void main() {",`varying float vAlpha;
void main() {`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
gl_FragColor.a *= vAlpha;`)}),this.mesh.count=0}spawn(e){return this.items.length>=this.max&&this.items.shift(),this.items.push(e),e}flush(e){const t=this.mesh;let i=0;for(const s of this.items)e(s,i),i++;t.count=i,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0),this.alpha&&(this.alpha.needsUpdate=!0)}}function cx(n){const e=new Hs(new An(1,1),Dc("#ffffff"),420),t=new Hs(new xr(.82,1,32).rotateX(-Math.PI/2),new tn({color:"#ffffff"}),90,{alpha:!0}),i=new Hs(new An(1,0),Dc("#ffffff"),260),s=new Hs(new mn(1,.12,.6),new tn({color:"#ffffff",side:en}),360),r=new Hs(new Uo(1,0),new tn({color:"#ffffff"}),60),o=new pt(new Io(1,32).rotateX(-Math.PI/2),new tn({color:"#0b3a66",transparent:!0,opacity:.22,depthWrite:!1}));for(const u of[e,t,i,s,r])n.add(u.mesh);const a=()=>Math.random(),l={puff(u,c,p,m=1){const d=Math.round(2+m*2);for(let h=0;h<d;h++){const v=(2.4+a()*2.4)*Math.sqrt(m);e.spawn({x:u.x+(a()-.5)*.3,y:u.y+(a()-.5)*.3,z:u.z+(a()-.5)*.3,vx:c.x*v+(a()-.5)*1.4,vy:.6+a()*1.2,vz:c.z*v+(a()-.5)*1.4,age:0,life:.9+a()*.6+m*.25,s0:.18+a()*.12,s1:(.36+a()*.3)*(.75+m*.35),c:p[Math.floor(a()*p.length)],rot:a()*6})}},ring(u,c,p,m=2.6,d=1.6,h=.75){t.spawn({x:u,y:c+.04,z:p,age:0,life:d,s0:m*.55,s1:m*1.45,a:h})},splash(u,c,p,m=18,d=1){for(let h=0;h<m;h++){const v=a()*Math.PI*2,f=(1.5+a()*3)*d;i.spawn({x:u,y:c+.1,z:p,vx:Math.cos(v)*f,vy:(3+a()*4)*d,vz:Math.sin(v)*f,age:0,life:1.5,s:.08+a()*.14,c:a()<.3?"#d7f3ff":"#ffffff"})}l.ring(u,c,p,2.2,1.2,.9)},confetti(u,c,p,m=80,d=4){const h=["#ff5d8f","#ffd23f","#46b8f0","#7cc94a","#b46fd6","#ff8a3d"];for(let v=0;v<m;v++)s.spawn({x:u+(a()-.5)*d,y:c+a()*2,z:p+(a()-.5)*d,vx:(a()-.5)*6,vy:5+a()*7,vz:(a()-.5)*6,age:0,life:3+a()*1.5,s:.16+a()*.1,c:h[v%h.length],rx:a()*6,ry:a()*6,sx:(a()-.5)*14,sy:(a()-.5)*14})},stars(u,c,p,m=8){for(let d=0;d<m;d++){const h=d/m*Math.PI*2;r.spawn({x:u,y:c,z:p,vx:Math.cos(h)*3,vy:2+a()*2,vz:Math.sin(h)*3,age:0,life:.8,s:.18,c:d%2?"#ffd23f":"#ffffff"})}},shadow:o,update(u){e.flush((c,p)=>{c.age+=u;const m=Math.exp(-2.2*u);c.vx*=m,c.vz*=m,c.vy=c.vy*m+.35*u,c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u;const d=c.age/c.life,h=d<.18?d/.18:1,v=d>.7?1-(d-.7)/.3:1,f=(c.s0+(c.s1-c.s0)*Math.min(1,d*2.2))*h*Math.max(0,v);Rn.compose(zs.set(c.x,c.y,c.z),Os.setFromEuler(Ta.set(c.rot,c.rot*.7,0)),Bs.set(f,f*.9,f)),e.mesh.setMatrixAt(p,Rn),e.mesh.setColorAt(p,Js.set(c.c))}),e.items=e.items.filter(c=>c.age<c.life),t.flush((c,p)=>{c.age+=u;const m=c.age/c.life,d=c.s0+(c.s1-c.s0)*(1-(1-m)*(1-m));Rn.compose(zs.set(c.x,c.y,c.z),Os.identity(),Bs.set(d,1,d)),t.mesh.setMatrixAt(p,Rn),t.alpha.setX(p,c.a*(1-m))}),t.items=t.items.filter(c=>c.age<c.life),i.flush((c,p)=>{c.age+=u,c.vy-=16*u,c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u;const m=c.s*Math.max(0,1-c.age/c.life);Rn.compose(zs.set(c.x,c.y,c.z),Os.identity(),Bs.set(m,m,m)),i.mesh.setMatrixAt(p,Rn),i.mesh.setColorAt(p,Js.set(c.c))}),i.items=i.items.filter(c=>c.age<c.life&&c.y>-3),s.flush((c,p)=>{c.age+=u,c.vy-=9*u;const m=Math.exp(-1.6*u);c.vx*=m,c.vz*=m,c.vy=Math.max(c.vy,-2.4),c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u,c.rx+=c.sx*u,c.ry+=c.sy*u;const d=c.s*Math.min(1,(c.life-c.age)*2);Rn.compose(zs.set(c.x,c.y,c.z),Os.setFromEuler(Ta.set(c.rx,c.ry,0)),Bs.set(d,d,d)),s.mesh.setMatrixAt(p,Rn),s.mesh.setColorAt(p,Js.set(c.c))}),s.items=s.items.filter(c=>c.age<c.life),r.flush((c,p)=>{c.age+=u,c.vy-=6*u,c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u;const m=c.s*(1-c.age/c.life);Rn.compose(zs.set(c.x,c.y,c.z),Os.setFromEuler(Ta.set(c.age*8,c.age*5,0)),Bs.set(m,m*1.6,m)),r.mesh.setMatrixAt(p,Rn),r.mesh.setColorAt(p,Js.set(c.c))}),r.items=r.items.filter(c=>c.age<c.life)},clear(){for(const u of[e,t,i,s,r])u.items.length=0},dispose(){for(const u of[e,t,i,s,r])u.mesh.removeFromParent(),u.mesh.geometry.dispose(),u.mesh.dispose();o.removeFromParent()}};return l}const Ni=[{id:"hippo",name:"Bobo",kind:"Hippopotame",main:"#9d8fc4",belly:"#c9bfe6"},{id:"capy",name:"Capi",kind:"Capybara",main:"#e0975a",belly:"#f2bf8a"},{id:"frog",name:"Gloup",kind:"Grenouille",main:"#7cc94a",belly:"#e4f08a"},{id:"walrus",name:"Morso",kind:"Morse",main:"#5d8fd0",belly:"#a9c8ef"},{id:"bear",name:"Nono",kind:"Ours",main:"#6e5a52",belly:"#b89a84",lvl:2},{id:"pig",name:"Groin",kind:"Cochon",main:"#f39bb0",belly:"#ffd0da",lvl:4}],hl=["#9d8fc4","#e0975a","#7cc94a","#5d8fd0","#6e5a52","#f39bb0","#f2c94c","#e8605a","#4fc6b8","#8a8f9c","#b46fd6","#f4f1ea"],_f=[{id:"none",name:"Aucun"},{id:"cap",name:"Casquette"},{id:"party",name:"Chapeau de fête"},{id:"flower",name:"Fleur"},{id:"bucket",name:"Bob de pêcheur",lvl:2},{id:"crown",name:"Couronne",lvl:3},{id:"viking",name:"Casque viking",lvl:5},{id:"propeller",name:"Casquette à hélice",lvl:6},{id:"chef",name:"Toque",lvl:7},{id:"bow",name:"Nœud",lvl:1}],xf=[{id:"none",name:"Aucun"},{id:"shades",name:"Lunettes de soleil"},{id:"bowtie",name:"Nœud papillon",lvl:2},{id:"scarf",name:"Écharpe",lvl:3}],So=[{id:"green",name:"Classique",c:["#c4ef3f","#e2fb7a"]},{id:"pink",name:"Barbe à papa",c:["#ff8fd0","#ffc3e8"]},{id:"blue",name:"Menthe glaciale",c:["#7ad8ff","#c4f0ff"],lvl:2},{id:"violet",name:"Myrtille",c:["#b28bff","#d9c6ff"],lvl:3},{id:"gold",name:"Or",c:["#ffd23f","#fff09a"],lvl:6},{id:"rainbow",name:"Arc-en-ciel",c:["#ff6b6b","#ffd23f","#6be36b","#6bc8ff","#c08bff"],lvl:8}],Kn=[{id:"wave",name:"Coucou",icon:"👋"},{id:"laugh",name:"Rire",icon:"😂"},{id:"dance",name:"Danse",icon:"🕺"},{id:"cheer",name:"Hourra",icon:"🎉"},{id:"angry",name:"Grrr",icon:"😤",lvl:2},{id:"love",name:"Bisou",icon:"😘",lvl:4}],fl=(n=0)=>({species:Ni[n%4].id,color:Ni[n%4].main,hat:["none","cap","party","flower"][n%4],extra:"none",gas:"green"}),dr=n=>Ni.find(e=>e.id===n)||Ni[0];function Qu(n){const e=new Set;return n.map(t=>{let i=t.look||fl(0);const s=r=>r.species+r.color;if(e.has(s(i))){const r=hl.find(o=>!e.has(i.species+o)&&o!==i.color);r&&(i={...i,color:r})}return e.add(s(i)),{...t,look:i}})}const pr=n=>So.find(e=>e.id===n)||So[0],Wn="#fbfbf7",ns="#2a2230",Ra="#f28aa0";function lx(n,e,t){const i=[],s=st(e,-.25),r=(o,a,l,u=.12,c=!0)=>{for(const p of[-1,1])i.push(Ie(u,Wn,[p*o,a,l]),Ie(u*.55,ns,[p*o,a+.005,l+u*.72]),Ie(u*.18,Wn,[p*o+.025,a+.04,l+u*1.05],0,1,6)),c&&i.push(ux(u*1.08,e,[p*o,a+.012,l]))};switch(n){case"hippo":i.push(Ie(.4,e,[0,.28,.02],0,[1.1,.92,1])),i.push(Ie(.3,e,[0,.12,.33],0,[1.32,.86,1]));for(const o of[-1,1])i.push(Ie(.05,s,[o*.12,.27,.6],0,[1,.7,1],8),Ie(.085,e,[o*.28,.62,-.02],0,[1,1.25,.6],10),Ie(.045,Ra,[o*.28,.63,.02],0,[1,1.2,.5],8));i.push(ht(.085,.1,.05,Wn,[-.09,-.05,.6]),ht(.085,.1,.05,Wn,[.09,-.05,.6])),r(.17,.44,.3);break;case"capy":i.push(Ie(.38,e,[0,.3,0],0,[1,.95,1.05])),i.push(Ie(.28,e,[0,.2,.34],0,[.95,.82,1.2])),i.push(Ie(.12,ns,[0,.3,.64],0,[1.3,.6,.55],10));for(const o of[-1,1])i.push(Ie(.075,s,[o*.24,.6,-.08],0,[1,1,.6],8));r(.2,.44,.24,.1);break;case"frog":i.push(Ie(.42,e,[0,.24,.04],0,[1.22,.78,1])),i.push(Ie(.3,t,[0,.1,.16],0,[1.15,.5,1]));for(const o of[-1,1])i.push(Ie(.17,e,[o*.21,.5,.16])),i.push(Ie(.07,Ra,[o*.3,.17,.36],0,[1,.6,.5],8));i.push(ir(.2,.022,ns,[0,.12,.34],[Math.PI/2+.25,0,Math.PI],[1.25,1,1],Math.PI)),r(.21,.55,.25,.13);break;case"walrus":i.push(Ie(.4,e,[0,.28,.02],0,[1.08,.95,1]));for(const o of[-1,1]){i.push(Ie(.17,t,[o*.11,.14,.36],0,[1,.85,.9])),i.push(nn(.045,.32,Wn,[o*.1,-.08,.44],[Math.PI+.12,0,-o*.1],1,8));for(let a=0;a<3;a++)i.push(Ie(.018,ns,[o*(.08+a*.05),.16-a*.025,.5],0,1,6))}i.push(Ie(.075,Ra,[0,.25,.48],0,[1.2,.9,1],10)),r(.16,.45,.3,.11);break;case"bear":i.push(Ie(.4,e,[0,.3,.02],0,[1.06,.95,1])),i.push(Ie(.2,t,[0,.15,.32],0,[1.15,.85,1])),i.push(Ie(.075,ns,[0,.24,.5],0,[1.3,.9,1],10));for(const o of[-1,1])i.push(Ie(.13,e,[o*.3,.6,-.02],0,[1,1,.55]),Ie(.075,t,[o*.3,.6,.04],0,[1,1,.4],10));r(.16,.42,.3,.1);break;case"pig":i.push(Ie(.4,e,[0,.28,.02],0,[1.08,.95,1])),i.push(Ne(.15,.16,.14,st(e,.15),[0,.2,.4],[Math.PI/2,0,0]));for(const o of[-1,1])i.push(Ie(.035,ns,[o*.055,.2,.48],0,[1,1.3,.6],8)),i.push(nn(.12,.2,e,[o*.25,.62,0],[.5,0,-o*.5],[1,1,.5]));r(.17,.43,.3,.1);break}return i}function ux(n,e,t){const i=new Rs(n,14,8,0,Math.PI*2,0,Math.PI*.42);return i.rotateX(.62),i.translate(t[0],t[1],t[2]),Ue(i,e)}function hx(n){const e=[];switch(n){case"cap":e.push(Ie(.3,"#e8463c",[0,0,0],0,[1,.55,1]),Ne(.22,.24,.03,"#e8463c",[0,-.01,.26],0,[1,1,1.2]),Ie(.05,Wn,[0,.16,0],0,1,8));break;case"party":e.push(nn(.18,.48,"#46b8f0",[0,.2,0]),ir(.18,.03,"#ffd23f",[0,-.03,0],[Math.PI/2,0,0]),Ie(.07,"#ff5d8f",[0,.46,0],0,1,10));for(let t=0;t<3;t++)e.push(ir(.15-t*.045,.022,"#ff5d8f",[0,.06+t*.12,0],[Math.PI/2,0,0]));break;case"flower":for(let t=0;t<6;t++){const i=t/6*Math.PI*2;e.push(Ie(.09,"#ffffff",[Math.cos(i)*.11,.02,Math.sin(i)*.11],0,[1,.45,1],10))}e.push(Ie(.07,"#ffcf3f",[0,.05,0],0,[1,.6,1],10));break;case"bucket":e.push(Ne(.22,.27,.2,"#e9d9a6",[0,.06,0]),Ne(.4,.4,.03,"#d9c48c",[0,-.04,0]),Ne(.225,.225,.05,"#5d8a4a",[0,.02,0]));break;case"crown":e.push(Ne(.24,.22,.16,"#f6c33b",[0,.04,0],0,1,16));for(let t=0;t<6;t++){const i=t/6*Math.PI*2;e.push(nn(.06,.16,"#f6c33b",[Math.cos(i)*.2,.2,Math.sin(i)*.2],0,1,8),Ie(.035,t%2?"#e8463c":"#46b8f0",[Math.cos(i)*.23,.06,Math.sin(i)*.23],0,1,8))}break;case"viking":e.push(Ie(.31,"#a7adb8",[0,-.02,0],0,[1,.7,1]),ir(.3,.035,"#8a6a42",[0,-.04,0],[Math.PI/2,0,0]));for(const t of[-1,1])e.push(nn(.07,.3,"#fff3d6",[t*.33,.12,0],[0,0,-t*.9],1,10));break;case"propeller":e.push(Ie(.3,"#4aa3f0",[0,0,0],0,[1,.55,1]),Ne(.22,.24,.03,"#ffd23f",[0,-.01,.26],0,[1,1,1.2]),Ne(.02,.02,.14,"#888",[0,.2,0],0,1,6));break;case"chef":e.push(Ne(.22,.22,.22,Wn,[0,.08,0]));for(let t=0;t<5;t++){const i=t/5*Math.PI*2;e.push(Ie(.13,Wn,[Math.cos(i)*.12,.26,Math.sin(i)*.12]))}e.push(Ie(.14,Wn,[0,.32,0]));break;case"bow":for(const t of[-1,1])e.push(nn(.1,.2,"#ff5d8f",[t*.1,0,0],[0,0,t*Math.PI/2],[1,1,.6],10));e.push(Ie(.06,"#e8467a",[0,0,0],0,1,10));break}return e}function fx(n,e){const t=[];if(n==="shades"){const i=e==="frog"?.55:.44,s=e==="frog"?.4:.42,r=e==="frog"?.21:.17;for(const o of[-1,1])t.push(ht(.2,.12,.04,"#1d1d26",[o*r,i,s],[0,o*.15,0]));t.push(ht(.16,.03,.03,"#1d1d26",[0,i+.03,s+.02]))}return t}let Ca=new Map;function Vs(n,e){return Ca.has(n)||Ca.set(n,je(e())),Ca.get(n)}function Nc(n){const e=dr(n.species).id,t=n.color||dr(e).main,i=st(t,.38),s=Un(),r=new dt;r.name="pouf";const o=new dt;r.add(o);const a=tt(Vs(`body:${t}:${n.extra}`,()=>{const w=[[0,.02],[.3,.03],[.48,.12],[.58,.28],[.61,.45],[.58,.62],[.5,.8],[.38,.95],[.22,1.05],[0,1.08]].map(([T,D])=>new Me(T,D)),b=new Lo(w,20);b.scale(1,1,.94);const _=[b,Ie(.42,i,[0,.48,.26],0,[1,1.15,.55]),Ie(.31,t,[-.17,.42,-.36],0,[1,1,.9]),Ie(.31,t,[.17,.42,-.36],0,[1,1,.9]),Ie(.09,st(t,-.1),[0,.34,-.62],0,[1,1,1],8)];return Ue(b,t),n.extra==="bowtie"&&_.push(nn(.09,.16,"#e8463c",[-.08,.98,.3],[0,0,Math.PI/2],[1,1,.6],8),nn(.09,.16,"#e8463c",[.08,.98,.3],[0,0,-Math.PI/2],[1,1,.6],8),Ie(.05,"#c4302a",[0,.98,.33],0,1,8)),n.extra==="scarf"&&_.push(ir(.33,.09,"#e8463c",[0,.96,0],[Math.PI/2,0,0],[1,1,.9]),ks(.07,.25,"#e8463c",[.18,.8,.3],[.3,0,.2])),_}),s);_t(a,.03),o.add(a);const l=new dt;l.position.set(0,.98,.04),o.add(l);const u=tt(Vs(`head:${e}:${t}:${n.extra}`,()=>[...lx(e,t,i),...fx(n.extra,e)]),s);_t(u,.026),l.add(u);let c=null;if(n.hat&&n.hat!=="none"){const w=tt(Vs("hat:"+n.hat,()=>hx(n.hat)),s);_t(w,.02);const b=e==="frog"?.58:.66;w.position.set(0,n.hat==="flower"||n.hat==="bow"?b-.02:b,0),(n.hat==="flower"||n.hat==="bow")&&(w.position.x=.2,w.rotation.z=-.4),l.add(w),n.hat==="propeller"&&(c=tt(Vs("prop",()=>[ht(.5,.015,.07,"#e8463c",[0,0,0]),ht(.07,.015,.5,"#ffd23f",[0,0,0])]),s),c.position.set(0,.28,0),w.add(c))}const p=(w,b,_,T,D)=>{const S=new dt;S.position.set(_,T,D);const E=tt(Vs(w,b),s);return _t(E,.022),S.add(E),o.add(S),S},m=p("arm:"+t,()=>[ks(.1,.3,t,[0,-.2,0]),Ie(.12,st(t,.12),[0,-.42,.02])],.5,.78,.1),d=p("arm:"+t,()=>[ks(.1,.3,t,[0,-.2,0]),Ie(.12,st(t,.12),[0,-.42,.02])],-.5,.78,.1),h=p("leg:"+t,()=>[ks(.13,.1,t,[0,-.08,0]),Ie(.16,st(t,-.08),[0,-.17,.06],0,[1,.55,1.3])],.25,.2,0),v=p("leg:"+t,()=>[ks(.13,.1,t,[0,-.08,0]),Ie(.16,st(t,-.08),[0,-.17,.06],0,[1,.55,1.3])],-.25,.2,0);o.position.y=.2;let f=Math.random()*10,g=0,x=0,y=null;const M={root:r,look:n,head:l,hips:o,butt(w=new F){return w.set(0,.62,-.72).applyMatrix4(o.matrixWorld)},emote(w){y=w,x=0},update(w,b={}){f+=w;const _=b.run||0,T=Math.abs(_),D=b.mode||"stand";g=b.puff?Math.min(1,g+w*6):Math.max(0,g-w*4),y&&(x+=w,(x>2.6||T>.3&&x>.4||b.puff)&&(y=null));let S=.2,E=0,k=0,B=0,G=1,O=1,I=-1.15,X=-1.15,U=.25,re=-.25,ce=0,he=0,ee=0,ve=0;if(D==="raft"||D==="stand"||D==="menu"){const K=Math.sin(f*2.2)*.02;if(O=1+K,G=1-K*.6,D!=="raft"&&(I=X=-.25,U=.35,re=-.35),T>.05){const j=f*14;S+=Math.abs(Math.sin(j))*.09*T,k=Math.sin(j)*.08*T,ce=Math.sin(j)*.7*T,he=-ce,B=-_*.5}if(g>0){const j=Math.sin(f*38)*.06*g;O-=.1*g-j,G+=.07*g+j*.5,E+=.28*g,ee=-.15*g}if(b.big>0&&(O-=b.big*.35,G+=b.big*.25,E+=b.big*.4),y){const j=Math.min(1,x*5)*Math.min(1,(2.6-x)*4);y==="wave"&&(X=-2.9*j+X*(1-j),re=(-.4+Math.sin(f*12)*.45)*j,ve=.15*j),y==="laugh"&&(E=-.25*j,ee=-.4*j,O+=Math.sin(f*30)*.05*j,k=Math.sin(f*15)*.06*j),y==="dance"&&(k=Math.sin(f*8)*.3*j,S+=Math.abs(Math.sin(f*8))*.15*j,I=-2.6*j*(.5+.5*Math.sin(f*8)),X=-2.6*j*(.5-.5*Math.sin(f*8)),B=Math.sin(f*4)*.5*j),y==="cheer"&&(I=X=-2.9*j,U=.5*j,re=-.5*j,S+=Math.abs(Math.sin(f*9))*.25*j),y==="angry"&&(E=.2*j,O+=Math.sin(f*40)*.03*j,U=1.2*j,re=-1.2*j,I=X=-.6*j,ee=.2*j),y==="love"&&(I=X=-1.9*j,U=-.3*j,re=.3*j,ve=Math.sin(f*3)*.2*j,B=Math.sin(f*3)*.2*j)}}else D==="air"?(I=-2.5,X=-2.5,U=.7,re=-.7,ce=.9,he=.5,E=-.1,ee=-.15,b.big>0&&(O-=b.big*.25,G+=b.big*.2)):D==="stun"?(k=Math.sin(f*14)*.35,E=.25,ve=Math.sin(f*9)*.4,I=-1.8,X=-.4,U=1.1,re=-1.1,ce=Math.sin(f*16)*.6,he=-ce):D==="fly"?(I=-2.8+Math.sin(f*25)*.5,X=-2.8-Math.sin(f*25)*.5,U=1,re=-1,ce=Math.sin(f*20),he=-ce,ee=-.3):D==="swim"&&(E=.9,S=.05,I=-2.2+Math.sin(f*7)*1.2,X=-2.2-Math.sin(f*7)*1.2,U=.8,re=-.8,ce=Math.sin(f*9)*.5,he=-ce,ee=-.8);o.position.y=S,o.rotation.set(E,B,k),o.scale.set(G,O,G),l.rotation.set(ee,0,ve),m.rotation.set(I,0,U),d.rotation.set(X,0,re),h.rotation.x=ce,v.rotation.x=he,c&&(c.rotation.y+=w*(12+T*20))},dispose(){r.removeFromParent()}};return M.update(0),M}const Zr=1.58,dx=.3,oi=new F,un=new F,px=(n,e,t)=>n+Math.atan2(Math.sin(e-n),Math.cos(e-n))*t;function mx(n,e){const t=R("div.pf-tags");e.append(t);let i=null,s=null,r=null,o=null,a=null,l=null;const u=new Map,c={mode:"orbit",yaw:0,user:0,pos:new F,look:new F,shake:0,t:0,focusId:null,intro:0},p={x:0,z:0,y:0,yaw:0,air:3,pop:-1,s:0,inv:0},m={},d={get track(){return a},get course(){return l},get fx(){return o},get raft(){return r},rs:p,crew:u,cam:c,load(h){if(l?.id!==h.id){d.unload(),l=h,a=N_(h),n.setTheme(h.theme),i=j_(a,h),n.scene.add(i.root),s=ax(a,h),n.scene.add(s.root),r=ox(),n.scene.add(r.root),o=cx(n.scene),n.scene.add(o.shadow),d.placeAt(h.spawn);for(const v of u.values())r.body.add(v.char.root)}},unload(){if(l){for(const h of u.values())h.char.root.removeFromParent();o.dispose();for(const h of[i.root,s.root,r.root])h.removeFromParent(),h.traverse(v=>{v.geometry&&!v.geometry.userData.shared&&v.geometry.dispose()});l=null}},placeAt(h,v=0){a.world(h,v,m),Object.assign(p,{x:m.wx,z:m.wz,y:m.y,yaw:m.a,air:3,pop:-1,s:h,inv:0}),c.yaw=m.a,c.pos.set(m.wx-m.tx*10,m.y+6,m.wz-m.tz*10)},setCrew(h,v){const f=new Set(h.map(g=>g.id));for(const[g,x]of u)f.has(g)||(x.char.dispose(),x.tag.remove(),x.bubble.remove(),u.delete(g));for(const g of h){let x=u.get(g.id);const y=JSON.stringify(g.look);x&&x.key!==y&&(x.char.dispose(),x.char=Nc(g.look),r?.body.add(x.char.root),x.key=y),x||(x={char:Nc(g.look),key:y,a:(g.seat??u.size)*Math.PI/2+Math.PI/2,tag:R("div.pf-tag"),bubble:R("div.pf-bubble"),puff:!1,puffT:0,big:0,run:0,mode:"raft",fly:null},t.append(x.tag,x.bubble),r?.body.add(x.char.root),u.set(g.id,x)),x.name=g.name,x.me=g.id===v,x.look=g.look,x.tag.textContent=g.name,x.tag.classList.toggle("me",x.me)}},seatAngle(h){return u.get(h)?.a??0},emote(h,v){const f=u.get(h);if(!f)return;f.char.emote(v);const g=Kn.find(x=>x.id===v);f.bubble.textContent=g?.icon||"",f.bubble.classList.remove("show"),f.bubble.offsetWidth,f.bubble.classList.add("show")},puffFrom(h,v=1){const f=u.get(h);if(!f||!o)return;const g=p.yaw+f.a,x=un.set(Math.cos(g),0,Math.sin(g));f.char.root.updateMatrixWorld(!0),o.puff(f.char.butt(oi),x,pr(f.look.gas).c,v),v>1.5&&(f.big=1)},throwCrew(){for(const h of u.values()){const v=p.yaw+h.a+(Math.random()-.5)*.8,f=4+Math.random()*3;h.fly={x:p.x+Math.cos(v)*Zr,y:p.y+1,z:p.z+Math.sin(v)*Zr,vx:Math.cos(v)*f,vy:8+Math.random()*3,vz:Math.sin(v)*f,spin:(Math.random()-.5)*14,swim:!1},n.scene.add(h.char.root)}},boardCrew(){for(const h of u.values())h.fly=null,r.body.add(h.char.root),h.char.root.rotation.set(0,0,0)},update(h,v){if(c.t+=h,!l)return;i.update(v),s.update(v);const f=Math.sin(c.t*2.1)*.06;r.root.position.set(p.x,p.y+f,p.z),r.root.rotation.y=-p.yaw;let g=0,x=0;for(const M of u.values())if(M.puff&&!M.fly){const w=M.a;g-=Math.cos(w),x-=Math.sin(w)}r.body.rotation.x+=(x*.07+Math.sin(c.t*1.3)*.025-r.body.rotation.x)*Math.min(1,h*4),r.body.rotation.z+=(-g*.07+Math.cos(c.t*1.1)*.025-r.body.rotation.z)*Math.min(1,h*4),r.setState(p.air,p.pop,c.t),r.body.visible=p.pop<0||p.pop<.4,p.inv>0&&p.pop<0&&(r.body.visible=Math.floor(c.t*12)%2===0||p.inv<.2),o.shadow.position.set(p.x,p.y+.03,p.z),o.shadow.scale.setScalar(ai*1.15),o.shadow.visible=p.pop<0;for(const[M,w]of u){const b=w.char;if(b.root.visible=c.mode!=="closeup"||M===c.focusId,w.fly){const _=w.fly;if(_.swim)_.y+=(a.at(Math.max(0,a.project(_.x,_.z,p.s).s),m).y-.55-_.y)*Math.min(1,h*5),Math.random()<h*2&&o.ring(_.x,_.y+.5,_.z,1.4,1,.6);else{_.vy-=18*h,_.x+=_.vx*h,_.y+=_.vy*h,_.z+=_.vz*h,b.root.rotation.x+=_.spin*h,b.root.rotation.z+=_.spin*.6*h;const T=a.at(Math.max(0,a.project(_.x,_.z,p.s).s),m).y;_.y<T&&_.vy<0&&(_.swim=!0,_.y=T,o.splash(_.x,T,_.z,14,.8),b.root.rotation.set(0,Math.random()*6,0))}b.root.position.set(_.x,_.y,_.z),b.update(h,{mode:_.swim?"swim":"fly"})}else b.root.position.set(Math.cos(w.a)*Zr,dx,Math.sin(w.a)*Zr),b.root.rotation.set(0,-w.a-Math.PI/2,0),w.big=Math.max(0,w.big-h*3),b.update(h,{mode:w.mode,run:w.run,puff:w.puff,big:w.big})}o.update(h);const y=n.camera;if(c.mode==="follow"){a.at(Math.min(a.length,Math.max(0,p.s)+7),m),c.yaw=px(c.yaw,m.a,Math.min(1,h*1.6));const M=c.yaw+c.user,w=Math.sin(M),b=-Math.cos(M),_=11.5,T=6.8;let D=p.x-w*_,S=p.z-b*_,E=p.y+T;if(c.intro>0){const k=c.intro*c.intro*(3-2*c.intro);D-=w*9*k,S-=b*9*k,E+=16*k}c.pos.lerp(oi.set(D,E,S),Math.min(1,h*(c.intro>0?3:5))),c.look.lerp(un.set(p.x+w*4,p.y+1.2,p.z+b*4),Math.min(1,h*6))}else if(c.mode==="orbit"){const M=c.t*.12+c.user;c.pos.lerp(oi.set(p.x+Math.cos(M)*10,p.y+4.6,p.z+Math.sin(M)*10),Math.min(1,h*2)),c.look.lerp(un.set(p.x,p.y+1.3,p.z),Math.min(1,h*3))}else if(c.mode==="closeup"){const M=u.get(c.focusId);if(M){M.char.root.updateMatrixWorld(!0);const w=M.char.root.getWorldPosition(un),b=p.yaw+M.a,_=Math.cos(b),T=Math.sin(b),D=Math.sin(c.t*.4)*.35,S=w.x-_*3.1+T*D,E=w.z-T*3.1-_*D;c.pos.lerp(oi.set(S,w.y+1.25,E),Math.min(1,h*3)),c.look.lerp(un.set(w.x-T*.9,w.y+.85,w.z+_*.9),Math.min(1,h*4))}}else if(c.mode==="finish"){const M=c.t*.35;c.pos.lerp(oi.set(p.x+Math.cos(M)*8,p.y+3.6,p.z+Math.sin(M)*8),Math.min(1,h*2)),c.look.lerp(un.set(p.x,p.y+1,p.z),Math.min(1,h*3))}y.position.copy(c.pos),Wc.settings.reduceMotion&&(c.shake=0),c.shake>0&&(c.shake=Math.max(0,c.shake-h*2.5),y.position.x+=(Math.random()-.5)*c.shake*.5,y.position.y+=(Math.random()-.5)*c.shake*.5),y.lookAt(c.look),n.focus(p.x,p.y,p.z)},updateTags(h,v){const f=n.camera;for(const g of u.values()){g.char.head.getWorldPosition(oi),oi.y+=.95,un.copy(oi).project(f);const x=un.z<1&&Math.abs(un.x)<1.1&&Math.abs(un.y)<1.1&&!(g.fly?.swim&&p.pop<0),y=(un.x*.5+.5)*h,M=(-un.y*.5+.5)*v,w=`translate(${y.toFixed(1)}px, ${M.toFixed(1)}px)`;g.tag.style.transform=w+" translate(-50%, -100%)",g.tag.style.opacity=x?1:0,g.bubble.style.transform=w+" translate(-50%, -190%)"}},showTags(h){t.classList.toggle("hidden",!h)},setVisible(h){for(const v of[i?.root,s?.root,r?.root,o?.shadow])v&&(v.visible=h);t.classList.toggle("hidden",!h)},dispose(){d.unload();for(const h of u.values())h.char.dispose();u.clear(),t.remove()}};return d}const Pa=.2;function gx(n,e){const t=new Set;let i=0,s=!1,r=0,o=0,a=null,l=!1,u=!1,c={mx:0,my:0,puff:!1,look:0};const p={};let m=!1;const d=ee=>{if(!m||ee.metaKey||ee.ctrlKey||ee.altKey)return;const ve=ee.target?.tagName;if(!(ve==="INPUT"||ve==="TEXTAREA"))if(ee.type==="keydown"){if(!ee.repeat){(ee.code==="ShiftLeft"||ee.code==="ShiftRight"||ee.code==="KeyE")&&r++,ee.code==="Space"&&o++;const K=/^Digit([1-6])$/.exec(ee.code);K&&(a=Kn[+K[1]-1]?.id||null)}t.add(ee.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(ee.code)&&ee.preventDefault()}else t.delete(ee.code)},h=()=>{t.clear(),s=!1},v=ee=>{if(!(!m||ee.pointerType==="touch")&&(ee.button===0&&(s=!0,o++),ee.button===2&&r++,!u&&Ht.device==="mouse"&&e.requestPointerLock&&!Bf))try{e.requestPointerLock()?.catch?.(()=>{})}catch{}},f=ee=>{ee.button===0&&(s=!1),ee.button},g=ee=>{u&&(i+=ee.movementX||0)},x=()=>{u=document.pointerLockElement===e};addEventListener("keydown",d),addEventListener("keyup",d),addEventListener("blur",h),e.addEventListener("pointerdown",v),addEventListener("pointerup",f),addEventListener("mousemove",g),document.addEventListener("pointerlockchange",x);const y=(ee,ve)=>{try{ee.setPointerCapture(ve)}catch{}},M=R("i"),w=R("div.pf-stick",M),b=R("button.pf-tbtn.puff",{type:"button"},R("b","POUF")),_=R("button.pf-tbtn.super",{type:"button"},R("b","SUPER")),T=R("button.pf-tbtn.emo",{type:"button"},"😀"),D=R("div.pf-emorow.hidden",Kn.slice(0,4).map(ee=>R("button.pf-tbtn.mini",{type:"button",onclick:()=>{a=ee.id,D.classList.add("hidden")}},ee.icon))),S=R("button.pf-tbtn.pause",{type:"button","aria-label":"Pause",onclick:()=>{l=!0}},R("span","❚❚")),E=R("div.pf-touch",w,b,_,T,D,S);n.append(E);let k=null,B=0,G=0,O=null,I=0;w.addEventListener("pointerdown",ee=>{k=ee.pointerId;const ve=w.getBoundingClientRect();B=ve.left+ve.width/2,G=ve.top+ve.height/2,y(w,ee.pointerId),X(ee),ee.preventDefault()});const X=ee=>{if(ee.pointerId!==k)return;const ve=w.offsetWidth*.42;let K=(ee.clientX-B)/ve,j=(ee.clientY-G)/ve;const me=Math.hypot(K,j);me>1&&(K/=me,j/=me),c.mx=K,c.my=j,M.style.transform=`translate(${K*ve}px, ${j*ve}px)`};w.addEventListener("pointermove",X);const U=ee=>{ee.pointerId===k&&(k=null,c.mx=c.my=0,M.style.transform="")};w.addEventListener("pointerup",U),w.addEventListener("pointercancel",U),b.addEventListener("pointerdown",ee=>{c.puff=!0,o++,y(b,ee.pointerId),ee.preventDefault()});for(const ee of["pointerup","pointercancel","lostpointercapture"])b.addEventListener(ee,()=>{c.puff=!1});_.addEventListener("pointerdown",ee=>{r++,ee.preventDefault()}),T.addEventListener("click",()=>D.classList.toggle("hidden")),e.addEventListener("pointerdown",ee=>{ee.pointerType!=="touch"||!m||(O=ee.pointerId,I=ee.clientX)}),e.addEventListener("pointermove",ee=>{ee.pointerId===O&&(c.look+=ee.clientX-I,I=ee.clientX)});const re=ee=>{ee.pointerId===O&&(O=null)};e.addEventListener("pointerup",re),e.addEventListener("pointercancel",re);const ce=ee=>Math.abs(ee)<Pa?0:(ee-Math.sign(ee)*Pa)/(1-Pa);return{get locked(){return u},setPlaying(ee){m=ee,E.classList.toggle("on",ee),ee||(t.clear(),s=!1,c.puff=!1,c.mx=c.my=0,D.classList.add("hidden"),u&&document.exitPointerLock?.())},poll(ee){let ve=0,K=0,j=0,me=!1,fe=!1,W=r,Q=o,ie=a,N=l;r=0,o=0,a=null,l=!1,(t.has("KeyA")||t.has("ArrowLeft"))&&(ve-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(ve+=1),(t.has("KeyW")||t.has("ArrowUp"))&&(K-=1),(t.has("KeyS")||t.has("ArrowDown"))&&(K+=1),(t.has("Space")||s)&&(me=!0),t.has("KeyR")&&(fe=!0),j+=i*.0032,i=0,(c.mx||c.my)&&(ve=c.mx,K=c.my),c.puff&&(me=!0),j+=c.look*.006,c.look=0;for(const L of Ht.pads()){if(!L?.connected||L.mapping!=="standard"&&L.buttons.length<12)continue;const de=P=>!!(L.buttons[P]&&(L.buttons[P].pressed||L.buttons[P].value>.5)),pe=ce(L.axes[0]||0),Te=ce(L.axes[1]||0);Math.abs(pe)+Math.abs(Te)>Math.abs(ve)+Math.abs(K)&&(ve=pe,K=Te),de(14)&&(ve=-1),de(15)&&(ve=1),j+=ce(L.axes[2]||0)*ee*2.6,(de(0)||de(7))&&(me=!0);const ne=p[L.index]||{},Ce=P=>de(P)&&!ne[P];(Ce(2)||Ce(5))&&W++,(Ce(0)||Ce(7))&&Q++,de(3)&&(fe=!0),Ce(12)&&(ie="wave"),Ce(13)&&(ie="laugh"),Ce(1)&&(ie="cheer"),Ce(4)&&(ie="dance");const Se={};for(const P of[0,1,2,3,4,5,7,12,13])Se[P]=de(P);p[L.index]=Se}const q=Math.hypot(ve,K);return q>1&&(ve/=q,K/=q),{mx:ve,my:K,look:j,puff:me,jump:Q,sup:W,emote:ie,respawn:fe,pause:N}},dispose(){removeEventListener("keydown",d),removeEventListener("keyup",d),removeEventListener("blur",h),e.removeEventListener("pointerdown",v),removeEventListener("pointerup",f),removeEventListener("mousemove",g),document.removeEventListener("pointerlockchange",x),u&&document.exitPointerLock?.(),E.remove()}}}let Be=null,Xn,Ss,Yn,bo,Gs=null,La=0,rr=0,is=0,yf=112,Fc=!1;const Sn=Math.random;function Zs(){if(Be)return!0;if(Il.init(),Be=Il.ctx,!Be)return!1;Xn=Be.createGain(),Xn.gain.value=.9;const n=Be.createDynamicsCompressor();n.threshold.value=-16,n.ratio.value=4,Xn.connect(n),n.connect(Be.destination),Ss=Be.createGain(),Ss.connect(Xn),Yn=Be.createGain(),Yn.gain.value=0,Yn.connect(Xn);const e=Be.sampleRate*2;bo=Be.createBuffer(1,e,Be.sampleRate);const t=bo.getChannelData(0);for(let i=0;i<e;i++)t[i]=Sn()*2-1;return kc(),!0}function kc(){if(!Be)return;const n=Wc.settings;Ss.gain.setTargetAtTime(n.sfx?n.sfxVol*1.1:0,Be.currentTime,.05),Yn.gain.setTargetAtTime(Fc&&n.music?n.musicVol*.75:0,Be.currentTime,.3)}const qt=()=>Zs()&&Be.state==="running",$t=()=>Be.currentTime;function ki(n,e,t,i,s){n.gain.setValueAtTime(1e-4,e),n.gain.linearRampToValueAtTime(s,e+t),n.gain.exponentialRampToValueAtTime(1e-4,e+t+i)}function gt(n,e,t,i,s,{f2:r,dest:o=Ss,a=.005,pan:l=0}={}){const u=Be.createOscillator(),c=Be.createGain();return u.type=n,u.frequency.setValueAtTime(e,t),r&&u.frequency.exponentialRampToValueAtTime(r,t+i),ki(c,t,a,i,s),u.connect(c),dl(c,o,l),u.start(t),u.stop(t+a+i+.05),u}function yn(n,e,t,{type:i="lowpass",f:s=1200,f2:r,q:o=1,dest:a=Ss,a:l=.005,pan:u=0}={}){const c=Be.createBufferSource();c.buffer=bo,c.loop=!0;const p=Be.createBiquadFilter();p.type=i,p.frequency.setValueAtTime(s,n),p.Q.value=o,r&&p.frequency.exponentialRampToValueAtTime(r,n+e);const m=Be.createGain();ki(m,n,l,e,t),c.connect(p),p.connect(m),dl(m,a,u),c.start(n,Sn()*1.5),c.stop(n+l+e+.05)}function dl(n,e,t){if(t&&Be.createStereoPanner){const i=Be.createStereoPanner();i.pan.value=Math.max(-1,Math.min(1,t)),n.connect(i),i.connect(e)}else n.connect(e)}const Ve={init:Zs,applySettings:kc,puff(n=1,{pitch:e=1,pan:t=0,vol:i=1}={}){if(!qt())return;const s=$t()+.005,r=.12+n*.2+Sn()*.08,o=(55+Sn()*40)*e*(n<.7?1.8:1),a=Be.createOscillator(),l=Be.createOscillator(),u=Be.createGain(),c=Be.createGain(),p=Be.createBiquadFilter();a.type="sawtooth",a.frequency.setValueAtTime(o*1.25,s),a.frequency.exponentialRampToValueAtTime(o*(.7+Sn()*.3),s+r),l.type="square",l.frequency.setValueAtTime(18+Sn()*22,s),l.frequency.linearRampToValueAtTime(10+Sn()*10,s+r);const m=Be.createGain();m.gain.value=.6,u.gain.value=.4,l.connect(u),u.connect(m.gain),p.type="lowpass",p.frequency.setValueAtTime(650+n*300,s),p.Q.value=3,ki(c,s,.015,r,.32*i*Math.min(1.4,.5+n*.5)),a.connect(p),p.connect(m),m.connect(c),dl(c,Ss,t),a.start(s),l.start(s),a.stop(s+r+.1),l.stop(s+r+.1),yn(s,r*.9,.06*i*n,{type:"bandpass",f:380,f2:220,q:.8,pan:t})},sputter(){if(!qt())return;const n=$t();for(let e=0;e<3;e++)gt("square",90+Sn()*30,n+e*.07,.05,.06,{f2:60})},bigPuff(n=0){if(!qt())return;Ve.puff(2,{pitch:.8,pan:n});const e=$t();yn(e,.7,.18,{f:900,f2:200,pan:n}),gt("sine",120,e,.4,.25,{f2:45,pan:n})},splash(n=1,e=0){if(!qt())return;const t=$t();yn(t,.5,.22*n,{f:2600,f2:500,pan:e}),yn(t+.05,.35,.1*n,{type:"highpass",f:3e3,pan:e}),gt("sine",300,t,.15,.08*n,{f2:90,pan:e})},bump(n=1){if(!qt())return;const e=$t();gt("sine",160,e,.22,.3*Math.min(1,n/4),{f2:60}),yn(e,.15,.08*Math.min(1,n/4),{f:600})},hit(){if(!qt())return;const n=$t();gt("triangle",620,n,.5,.22,{f2:140}),gt("sine",300,n+.02,.35,.15,{f2:90}),yn(n+.05,1.1,.08,{type:"highpass",f:5e3,f2:2500})},pop(){if(!qt())return;const n=$t();yn(n,.25,.55,{f:4e3,f2:300,a:.002}),gt("sine",180,n,.3,.5,{f2:40,a:.002}),gt("square",900,n+.08,.5,.06,{f2:120});for(let e=0;e<4;e++)Ve.splash(.6,(Sn()-.5)*1.4)},checkpoint(){if(!qt())return;const n=$t();[72,76,79,84].forEach((t,i)=>{const s=440*2**((t-69)/12);gt("triangle",s,n+i*.09,.35,.16),gt("sine",s*2,n+i*.09,.25,.05)}),yn(n+.3,.6,.05,{type:"highpass",f:6e3})},beep(n=!1){if(!qt())return;const e=$t(),t=n?1046:523;gt("square",t,e,n?.5:.18,.1),gt("sine",t*2,e,n?.5:.15,.08)},fanfare(){if(!qt())return;const n=$t(),e=[[60,0],[64,.12],[67,.24],[72,.36],[67,.55],[72,.7],[76,.82]];e.forEach(([t,i],s)=>{const r=440*2**((t-69)/12);gt("square",r,n+i,s===e.length-1?.9:.16,.07),gt("triangle",r,n+i,s===e.length-1?1:.2,.14)});for(let t=0;t<6;t++)yn(n+.8+t*.08,.2,.05,{type:"highpass",f:5e3+Sn()*3e3})},slam(n=1,e=0){if(!qt()||n<.03)return;const t=$t();yn(t,.2,.3*n,{type:"bandpass",f:900,q:2,pan:e}),gt("square",70,t,.25,.15*n,{f2:40,pan:e}),gt("triangle",1800,t,.3,.04*n,{f2:1700,pan:e})},whoosh(n=1,e=0){!qt()||n<.03||yn($t(),.5,.1*n,{type:"bandpass",f:400,f2:1400,q:1.5,pan:e,a:.2})},emote(n){if(!qt())return;const e=$t();if(n==="laugh")for(let t=0;t<4;t++)gt("triangle",520-t*30,e+t*.11,.08,.1,{f2:380});else n==="cheer"?[0,.1,.2].forEach((t,i)=>gt("triangle",660*(1+i*.25),e+t,.18,.1)):n==="angry"?gt("sawtooth",140,e,.4,.08,{f2:90}):n==="love"?(gt("sine",880,e,.12,.1,{f2:1320}),gt("sine",1320,e+.14,.2,.08,{f2:990})):gt("triangle",700,e,.15,.1,{f2:900})},ui(n="move"){if(!qt())return;const e=$t();n==="ok"?(gt("triangle",880,e,.12,.1),gt("triangle",1320,e+.05,.15,.08)):gt("triangle",1200,e,.05,.05)},music(n,{fast:e=!1}={}){Zs()&&(n=!1,Fc=n,yf=e?124:104,kc(),clearInterval(La),n&&(rr=Math.max(rr,Be.currentTime+.1),La=setInterval(yx,60)))},stop(){clearInterval(La),Fc=!1,Be&&Yn.gain.setTargetAtTime(0,Be.currentTime,.2)},shareTrack(){if(!Zs()||!Be.createMediaStreamDestination)return null;Gs||(Gs=Be.createMediaStreamDestination());try{Xn.connect(Gs)}catch{return null}return Gs.stream.getAudioTracks()[0]||null},unshare(){if(Gs)try{Xn.disconnect(Gs)}catch{}},async peak(n=400){if(!Zs())return 0;const e=Be.createAnalyser();e.fftSize=2048,Xn.connect(e);const t=new Float32Array(e.fftSize);let i=0;const s=performance.now()+n;for(;performance.now()<s;){e.getFloatTimeDomainData(t);for(const r of t)i=Math.max(i,Math.abs(r));await new Promise(r=>setTimeout(r,20))}return Xn.disconnect(e),i}},vx=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]],_x=[48,43,45,41],xx=[76,null,79,76,74,null,72,null,74,76,null,72,69,null,67,null];function yx(){if(!Be||Be.state!=="running")return;const n=60/yf/2;for(;rr<Be.currentTime+.25;){const e=Math.floor(is/8)%4,t=is%8,i=rr,s=o=>440*2**((o-69)/12);(t%2===1||t===0)&&vx[e].forEach((o,a)=>Mx(s(o+12),i+a*.012,.22,t===0?.05:.035)),(t===0||t===3||t===4||t===6)&&Sx(s(_x[e]+(t===6?7:0)),i,n*1.6);const r=xx[(is+Math.floor(is/32)%2*8)%16];r&&Math.floor(is/32)%4!==3&&bx(s(r),i),wx(i,t%2?.02:.035),rr+=n,is++}}function Mx(n,e,t,i){const s=Be.createOscillator(),r=Be.createGain(),o=Be.createBiquadFilter();s.type="triangle",s.frequency.value=n,o.type="lowpass",o.frequency.setValueAtTime(3e3,e),o.frequency.exponentialRampToValueAtTime(600,e+t),ki(r,e,.003,t,i),s.connect(o),o.connect(r),r.connect(Yn),s.start(e),s.stop(e+t+.05)}function Sx(n,e,t){const i=Be.createOscillator(),s=Be.createGain();i.type="sine",i.frequency.value=n,ki(s,e,.01,t,.16),i.connect(s),s.connect(Yn),i.start(e),i.stop(e+t+.05)}function bx(n,e){const t=Be.createOscillator(),i=Be.createOscillator(),s=Be.createGain();t.type="sine",i.type="sine",t.frequency.value=n,i.frequency.value=n*4,ki(s,e,.002,.35,.07);const r=Be.createGain();r.gain.value=.25,t.connect(s),i.connect(r),r.connect(s),s.connect(Yn),t.start(e),i.start(e),t.stop(e+.4),i.stop(e+.4)}function wx(n,e){const t=Be.createBufferSource();t.buffer=bo;const i=Be.createBiquadFilter();i.type="highpass",i.frequency.value=7e3;const s=Be.createGain();ki(s,n,.004,.05,e),t.connect(i),i.connect(s),s.connect(Yn),t.start(n,Sn()),t.stop(n+.08)}const Qr={clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#fff"/><path d="M12 6.5V12l3.6 2.2" stroke="#33465c" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',pop:'<svg viewBox="0 0 24 24"><path d="M12 2.5l2 5.2 5.4-2-2.5 5 4.6 3-5.5.8.6 5.6L12 16.4 7.4 20l.6-5.6-5.5-.8 4.6-3-2.5-5 5.4 2z" fill="#fff"/></svg>',raft:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#f7dcb8" stroke="#2b2230" stroke-width="1.6"/><circle cx="12" cy="12" r="5.6" fill="#9fd273" stroke="#2b2230" stroke-width="1.2"/></svg>',flag:'<svg viewBox="0 0 24 24"><path d="M5 21V3" stroke="#fff" stroke-width="2"/><path d="M6 4h12l-3 4 3 4H6z" fill="#fff"/><path d="M6 4h3v4H6zM12 4h3v4h-3zM9 8h3v4H9zM15 8h3l-1 2 1 2h-3z" fill="#2b2230"/></svg>'},En=n=>{n=Math.max(0,n);const e=Math.floor(n/60),t=n-e*60;return`${String(e).padStart(2,"0")}:${t.toFixed(2).padStart(5,"0")}`},Ex=["ps","xbox","nintendo","generic"];function Mf(n,e,{mode:t="raft"}={}){const i=t==="race"?e.finishZ:e.finish||1,s=t==="survival"?[]:e.checkpoints.map(I=>R("i.tick",{style:{left:(typeof I=="number"?I:I.p[2])/i*100+"%"}})),r=R("b.marker"),o=R("span.fill"),a=R("div.pf-prog",R("div.line",o,...s,r),R("span.flag",{html:Qr.flag})),l=[R("i"),R("i"),R("i")],u=R("div.pf-air",R("span.ic",{html:Qr.raft}),R("div.segs",l)),c=R("span"),p=R("div.pf-pill.timer",R("span.ic",{html:Qr.clock}),c),m=R("span","0"),d=R("div.pf-pill.pops",R("span.ic",{html:Qr.pop}),m),h=R("i"),v=R("div.pf-gas",R("div.bar",h),R("small",t==="raft"?"GAZ":"POUF")),f=R("i.hold"),g=R("div.pf-key"),x=R("div.pf-key",f),y=R("div.pf-keys",g,x),M=R("div.pf-banner"),w=R("div.pf-sub"),b=R("div.pf-toast"),_=R("div.pf-net"),T=R("span"),D=R("div.pf-pill.rank",T),S=R(`div.pf-hud.hidden.mode-${t}`,a,u,p,d,D,v,y,M,w,b,_);n.append(S);let E=0,k=0,B="";function G(){const I=Ht.device;if(I===B)return;B=I;const X=Ex.includes(I);g.replaceChildren(X?Ln("options"):R("span.gl.key","Échap"),R("span","PAUSE")),x.replaceChildren(f,X?Ln("triangle"):R("span.gl.key","R"),R("span","RÉAPPARAÎTRE")),x.classList.toggle("hidden",t==="survival"),y.classList.toggle("hidden",I==="touch")}const O={el:S,show(I){S.classList.toggle("hidden",!I),G()},rank(I){T.textContent!==I&&(T.textContent=I,D.classList.remove("bump"),D.offsetWidth,D.classList.add("bump"))},progress(I,X){const U=Math.max(0,Math.min(1,I/i));r.style.left=U*100+"%",o.style.width=U*100+"%",s.forEach((re,ce)=>re.classList.toggle("done",ce<X))},air(I,X){l.forEach((U,re)=>U.classList.toggle("on",re<I)),u.classList.toggle("low",I<=1),X&&(u.classList.remove("flash"),u.offsetWidth,u.classList.add("flash"))},time(I){c.textContent=En(I)},pops(I){m.textContent!==String(I)&&(m.textContent=I,d.classList.remove("bump"),d.offsetWidth,d.classList.add("bump"))},gas(I,X,U){h.style.width=(I*100).toFixed(1)+"%",h.style.background=X,v.classList.toggle("empty",!!U)},hold(I){f.style.setProperty("--k",I),x.classList.toggle("holding",I>0)},banner(I,{kind:X="",ms:U=1400,subText:re=""}={}){M.textContent=I,M.className="pf-banner show "+X,w.textContent=re,w.classList.toggle("show",!!re),E=U/1e3},toast(I,X=2600){b.textContent=I,b.classList.add("show"),k=X/1e3},net(I){_.textContent=I||""},update(I){G(),E>0&&(E-=I)<=0&&(M.classList.remove("show"),w.classList.remove("show")),k>0&&(k-=I)<=0&&b.classList.remove("show")},dispose(){S.remove()}};return O.air(3),O.time(0),O}const Ax=60,or=[],Tx={spikes:"Rondin à piques",rock:"Rocher",post:"Poteau",mine:"Mine",saw:"Scie",croc:"Crocodile",turnstile:"Tourniquet à piques",log:"Tronc",jaws:"Mâchoires",crush:"Mâchoires (écrasement)",bar:"Barre-marteau",mill:"Moulin",reset:"Retour au checkpoint demandé",sweeper:"Barre tournante",hammer:"Marteau",bumper:"Bumper"},Rx=n=>Tx[n]||n||"inconnu",Sf=typeof location<"u"&&/[?&]pfdebug/.test(location.search);Sf&&typeof window<"u"&&(window.__poufDamage=or);function bf(n){const e={wall:Date.now(),...n,entity:`${Rx(n.cause)}${n.id>=0?` n°${n.id+1}`:""}`};return or.unshift(e),or.length=Math.min(or.length,Ax),Sf&&console.info("[Pouf Party] dégât",JSON.stringify(e)),e}const Ia=3,Da=1/60,Cx=1/20,Px=1/20,Ua=.12,Lx=4.3,eh=.8,Ix=.42,Dx=.34,th=.3,nh=.9,hn=n=>Math.atan2(Math.sin(n),Math.cos(n)),Oc=n=>Math.PI/2+n*Math.PI/2,Ws=n=>Math.round(n*1e3)/1e3;function Ux(n,{course:e,roster:t,host:i,meId:s,spectator:r=!1}){const{arena:o,lobby:a}=n;o.load(e),o.setCrew(t,s),o.placeAt(e.spawn),o.boardCrew();const l=new Map;t.forEach(W=>{const Q=o.crew.get(W.id);Q&&(Q.a=Oc(W.seat)),l.set(W.id,{id:W.id,a:Oc(W.seat),puff:!1,sp:0,spSeen:0,spUsed:0,em:"",es:0,esSeen:0,gu:0,guSeen:0,puffTime:0,supers:0,emotes:0,fxT:0,sndT:0})});const u=r?null:l.get(s),c=i?new sx(o.track,e):null,p=Mf(n.overlay,e);p.show(!0),o.cam.mode="follow",o.cam.user=0,o.cam.intro=1,o.showTags(!0),n.input.setPlaying(!0);const m=new ll;m.moveTo(-.35,0),m.lineTo(.35,0),m.lineTo(.35,2.2),m.lineTo(.85,2.2),m.lineTo(0,3.3),m.lineTo(-.85,2.2),m.lineTo(-.35,2.2);const d=new No(m);d.rotateX(Math.PI/2);const h=new pt(d,new tn({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1,side:en}));h.renderOrder=2,n.stage.scene.add(h);let v=0,f=0,g=0,x=0,y=-1,M=!1,w="count",b=4,_=0,T=0,D=1,S=0,E=0,k=!1,B=0;const G=[],O=[];let I=!1,X=performance.now();const U={x:0,z:0,y:0,yaw:0,air:sr,pop:-1,cp:0,s:e.spawn,deaths:0,finished:!1,time:0,inv:0},re=new Map;c&&Object.assign(U,c.st),p.progress(U.s,0),p.pops(0),p.air(sr),r&&p.banner("Vous regardez la partie",{subText:"Vous rejoindrez la prochaine épreuve",ms:4e3}),Ve.music(!0,{fast:!0});function ce(W){const Q=o.rs;if((W.k==="hit"||W.k==="pop")&&bf({event:W.k,cause:W.cause,id:W.id??-1,course:e.id,t:W.t??null,pos:{s:W.s??null,d:W.d??null,x:Math.round(W.x*100)/100,z:Math.round(W.z*100)/100},air:W.k==="hit"?W.air:0,from:i?"simulation (hôte)":"reçu de l’hôte"}),W.k==="hit")Ve.hit(),o.fx.stars(W.x,Q.y+1,W.z,10),p.air(W.air,!0),p.toast(["Aïe !","Ouille !","Ça pique !"][Math.floor(Math.random()*3)],1200),o.cam.shake=.8,Ht.rumble(.7,.5,220);else if(W.k==="pop")Ve.pop(),o.throwCrew(),o.fx.splash(W.x,Q.y,W.z,40,1.6),o.fx.stars(W.x,Q.y+1.2,W.z,14),p.air(0,!0),p.pops(W.deaths),p.banner(W.cause==="reset"?"PLOUF !":"POUF ! La bouée a éclaté",{kind:"bad",ms:2200,subText:"Retour au dernier checkpoint…"}),o.cam.shake=1.4,Ht.rumble(1,1,420);else if(W.k==="respawn")o.boardCrew(),Ve.splash(1),setTimeout(()=>o.fx.splash(o.rs.x,o.rs.y,o.rs.z,26,1.1),30),p.air(sr),p.banner("C’est reparti !",{ms:1200}),D=1;else if(W.k==="cp"){Ve.checkpoint();const ie=e.checkpoints[W.i-1],N=o.track.at(ie);o.fx.confetti(N.x,N.y+6,N.z,90,N.w*1.6),p.banner("CHECKPOINT !",{kind:"good",ms:1600,subText:`${W.i} / ${e.checkpoints.length}`}),Ht.rumble(.4,.3,140)}else if(W.k==="finish"){Ve.fanfare(),w="finish";const ie=o.track.at(e.finish);for(let N=0;N<3;N++)setTimeout(()=>o.fx.confetti(ie.x,ie.y+6,ie.z,120,ie.w*1.8),N*450);p.banner("ARRIVÉE !",{kind:"good",ms:4200,subText:`Temps ${he(W.time)} · ${W.deaths} éclatement${W.deaths>1?"s":""}`}),o.cam.mode="finish";for(const N of l.keys())setTimeout(()=>o.emote(N,"cheer"),300+Math.random()*600);n.input.setPlaying(!1)}else W.k==="bump"&&(Ve.bump(W.v),W.v>3&&(o.cam.shake=Math.max(o.cam.shake,.35)))}const he=W=>`${Math.floor(W/60)}:${(W%60).toFixed(2).padStart(5,"0")}`;function ee(W,Q=v){W.length&&(W.forEach(ce),a.broadcast({t:"ev",at:Ws(Q),e:W}),W.some(ie=>ie.k==="finish")&&(y=Q))}function ve(W,Q){const ie=o.crew.get(s),N=U.pop<0&&!U.finished&&w!=="finish";o.cam.user=hn(o.cam.user+Q.look);let q=0;const L=Math.hypot(Q.mx,Q.my);if(N&&L>.3){const pe=o.cam.yaw+o.cam.user,Te=Math.sin(pe),ne=-Math.cos(pe),Ce=Math.cos(pe),Se=Math.sin(pe),P=Ce*Q.mx-Te*Q.my,A=Se*Q.mx-ne*Q.my,$=n.settings.aim!=="seat",se=hn(($?Math.atan2(-A,-P):Math.atan2(A,P))-U.yaw),ae=[...l.values()].filter(ze=>ze!==u&&o.crew.has(ze.id)),Z=Math.PI*2,Re=ze=>{const le=hn(se-u.a)*ze;return le>=0?le:le+Z},_e=(ze,le)=>(hn(ze.a-u.a)*le%Z+Z)%Z,be=ze=>ae.some(le=>{const we=_e(le,ze);return we>.01&&we<Re(ze)+eh*.5});if(Re(1)>.03&&Re(-1)>.03){let ze=Re(1)<=Re(-1)?1:-1;be(ze)&&!be(-ze)&&(ze=-ze);const le=hn(u.a+ze*Math.min(Re(ze),Lx*W*Math.min(1,L*1.2)));ae.some(He=>Math.abs(hn(le-He.a))<eh&&Math.abs(hn(le-He.a))<Math.abs(hn(u.a-He.a)))||(u.a=le,q=ze)}B=1}ie&&(ie.run+=(q-ie.run)*Math.min(1,W*10),ie.a=u.a),E=Math.max(0,E-W);const de=Q.puff&&N&&w==="run";de&&D>.02?(u.puff=!0,D=Math.max(0,D-Ix*W),S=.35,k=!1):(de&&D<=.02&&!k&&(k=!0,Ve.sputter()),u.puff=!1,S-=W,S<=0&&(D=Math.min(1,D+Dx*W)),Q.puff||(k=!1)),Q.sup&&N&&w==="run"&&(D>=th&&E<=0?(D-=th,E=1,u.sp++,S=.5,i&&u.supers++):E<=0&&Ve.sputter()),Q.emote&&N&&(u.em=Q.emote,u.es++,i&&u.emotes++),Q.respawn&&N&&w==="run"?(_+=W,_>=nh&&(_=0,u.gu++)):_=0,p.hold(_/nh),Q.pause&&n.openPause(),p.gas(D,pr(ie?.look?.gas).c[0],k),u.puff&&(B=1)}function K(W){const Q=U.pop>=0;for(const ie of l.values()){const N=o.crew.get(ie.id);if(!N)continue;N.puff=ie.puff&&!Q,ie!==u&&(N.a=ie.a);const q=ie===u,L=0;N.puff?(ie.fxT-=W,ie.sndT-=W,ie.fxT<=0&&(o.puffFrom(ie.id,1),ie.fxT=.085),ie.sndT<=0&&(Ve.puff(ie.sndT<-1?1.2:.7,{vol:q?1:.55,pitch:.9+ie.id.length%5*.08,pan:L}),ie.sndT=.2+Math.random()*.1)):(ie.fxT=0,ie.sndT=Math.min(ie.sndT,-1.1)),ie.sp>ie.spSeen&&((ie.spSeen||ie.sp-ie.spSeen<3)&&(o.puffFrom(ie.id,2.6),Ve.bigPuff(),q&&(o.cam.shake=Math.max(o.cam.shake,.6),Ht.rumble(.9,.6,260))),ie.spSeen=ie.sp),ie.es>ie.esSeen&&(ie.esSeen=ie.es,ie.em&&(o.emote(ie.id,ie.em),Ve.emote(ie.em))),i&&ie.puff&&!Q&&(ie.puffTime+=W)}}function j(){const W=o.rs;for(const Q of e.hazards){if(Q.type!=="jaws"&&Q.type!=="bar")continue;const ie=Math.abs(Q.s-W.s);if(ie>45)continue;const N=Q.type==="jaws"?Mo(Q,fe.viewT)>=1:ul(Q,fe.viewT)<.6;N&&!re.get(Q)&&Ve.slam(Math.max(0,1-ie/45)),re.set(Q,N)}}function me(W){if(!G.length)return;for(;G.length>2&&G[1].at<=W;)G.shift();const Q=G[0],ie=G[1]||G[0],N=ie.at>Q.at?Math.max(0,Math.min(1.5,(W-Q.at)/(ie.at-Q.at))):0,q=Zu(Q.r,{}),L=Zu(ie.r,{});U.x=q.x+(L.x-q.x)*N,U.z=q.z+(L.z-q.z)*N,U.y=q.y+(L.y-q.y)*N,U.yaw=q.yaw+hn(L.yaw-q.yaw)*N,U.s=q.s+(L.s-q.s)*N,Object.assign(U,{air:L.air,pop:L.pop,cp:L.cp,deaths:L.deaths,finished:L.finished,time:q.time+(L.time-q.time)*Math.min(1,N),inv:L.inv});const de=new Map(Q.p.map(Te=>[Te[0],Te])),pe=ie.p;for(const Te of pe){const ne=l.get(Te[0]);if(!ne||ne===u)continue;const Ce=de.get(Te[0])||Te;ne.a=Ce[1]+hn(Te[1]-Ce[1])*Math.min(1,N),ne.puff=!!Te[2],ne.sp=Te[3],Te[5]>ne.es&&(ne.em=Te[4],ne.es=Te[5]),!ne.spSeen&&ne.sp&&(ne.spSeen=ne.sp),!ne.esSeen&&ne.es&&(ne.esSeen=ne.es)}}const fe={kind:"raft",roster:t,get t(){return v},get finished(){return U.finished},riders:l,sim:c,hud:p,get viewT(){return i?Math.max(0,v-f):Math.max(0,v-Ua)},debug:()=>({buf:G.length,t:v,clockSet:I,snapAge:performance.now()-X,phase:w,view:{...U}}),onMsg(W){if(i){if(W.t==="inp"){const Q=l.get(W.from);if(!Q)return;Number.isFinite(W.a)&&(Q.a=hn(W.a)),Q.puff=!!W.f,W.sp>Q.sp&&W.sp-Q.sp<20&&(Q.supers+=W.sp-Q.sp,Q.sp=W.sp),W.es>Q.es&&(Q.es=W.es,Q.em=Kn.some(ie=>ie.id===W.em)?W.em:"",Q.emotes++),W.gu>Q.gu&&(Q.gu=W.gu)}return}if(W.t==="snap"){X=performance.now();const Q=Math.min(.25,(a.rtt||80)/2e3);if(!Number.isFinite(W.at))return;!I||Math.abs(W.at+Q-v)>.5?(v=W.at+Q,I=!0):v+=(W.at+Q-v)*.1,(!G.length||W.at>G[G.length-1].at)&&G.push(W),G.length>30&&G.shift()}else if(W.t==="ev")for(const Q of W.e)O.push({at:W.at,e:Q})},removeRider(W){const Q=o.crew.get(W);if(Q){Q.char.root.updateMatrixWorld(!0);const ie=Q.char.root.getWorldPosition(new F);o.fx.splash(ie.x,o.rs.y,ie.z,16,.8),Q.char.dispose(),Q.tag.remove(),Q.bubble.remove(),o.crew.delete(W)}l.delete(W)},update(W,Q){Q||(v+=W);const ie=n.input.poll(W);if(Q&&(ie.mx=ie.my=0,ie.puff=!1,ie.sup=0,ie.respawn=!1),w==="count"){o.cam.intro=Math.max(0,1-v/(Ia-.4));const N=Math.ceil(Ia-v);N!==b&&N>=1&&N<=3&&(b=N,p.banner(String(N),{kind:"count",ms:900}),Ve.beep()),v>=Ia&&(w="run",o.cam.intro=0,p.banner("POUF !",{kind:"go",ms:900}),Ve.beep(!0))}if(u?ve(W,ie):(o.cam.user=hn(o.cam.user+ie.look),ie.pause&&n.openPause()),i){if(w!=="count"&&!Q)for(f=Math.min(f+W,.25);f>=Da;){f-=Da;const N=v-f,q=[],L=[];for(const de of l.values()){if(!o.crew.has(de.id))continue;const pe=de.sp-de.spUsed;de.spUsed=de.sp,q.push({a:de.a,f:de.puff,sp:pe}),de.gu>de.guSeen&&(de.guSeen=de.gu,c.giveUp(L))}c.step(Da,N,q,L),ee(L,N)}if(Object.assign(U,c.st),g-=W,g<=0&&a.online&&(g=Cx,a.broadcast({t:"snap",at:Ws(v),r:c.pack(),p:[...l.values()].map(N=>[N.id,Ws(N.a),N.puff?1:0,N.sp,N.em,N.es])})),y>=0&&v-y>4.5&&!M){M=!0;const N=n.decorate?n.decorate(fe.summary()):fe.summary();a.broadcast({t:"end",summary:N}),n.onEnd(N);return}}else{for(me(v-Ua);O.length&&O[0].at<=v-Ua;)ce(O.shift().e);x-=W,x<=0&&u&&(x=Px,a.toHost({t:"inp",a:Ws(u.a),f:u.puff?1:0,sp:u.sp,em:u.em,es:u.es,gu:u.gu}));const N=performance.now()-X;p.net(I&&N>1500&&!U.finished?"Connexion à l’hôte instable…":"")}if(Object.assign(o.rs,{x:U.x,z:U.z,y:U.y,yaw:U.yaw,air:U.pop>=0?0:U.air,pop:U.pop,s:U.s,inv:U.inv}),K(W),j(),T-=W,T<=0&&U.pop<0&&(T=.28,o.fx.ring(U.x,U.y,U.z,3.1,1.8,.6)),B=Math.max(0,B-W*2.5),u&&o.crew.has(s)){const N=U.yaw+u.a+Math.PI;h.position.set(U.x+Math.cos(N)*2.4,U.y+.08,U.z+Math.sin(N)*2.4),h.rotation.y=-N+Math.PI/2,h.material.opacity=B*.75*(U.pop<0?1:0),h.material.color.set(pr(o.crew.get(s).look.gas).c[0])}p.progress(U.s,U.cp),p.time(U.time),p.pops(U.deaths),U.pop<0&&!U.finished&&p.air(U.air),p.update(W)},summary(){return{course:e.id,time:Ws(c.st.time),deaths:c.st.deaths,finished:c.st.finished,cps:c.st.cp,riders:[...l.values()].filter(W=>o.crew.has(W.id)).map(W=>({id:W.id,name:o.crew.get(W.id)?.name||"Joueur",look:o.crew.get(W.id)?.look,puff:Math.round(W.puffTime*10)/10,supers:W.supers,emotes:W.emotes}))}},dispose(){p.dispose(),h.removeFromParent(),d.dispose(),h.material.dispose(),n.input.setPlaying(!1),Ve.music(!0)}};return fe}const bs=Math.PI*2,wo=(n,e,t)=>Math.max(e,Math.min(t,n)),ih=(n,e)=>{const t=((e/(n.period||4)+(n.phase||0))%1+1)%1;return .5-.5*Math.cos(t*bs)},sn=.45,Pn=1.5,sh=7.2,rh=42,Nx=16,Fx=30,kx=11.2,Ox=10,oh=7;function mr(n,e,t={}){const[i,s,r]=n.p;if(t.x=i,t.y=s,t.z=r,t.vx=0,t.vy=0,t.vz=0,t.yaw=n.yaw||0,t.w=0,n.move){const o=ih(n,e),a=ih(n,e+.02);t.x+=n.move[0]*o,t.y+=n.move[1]*o,t.z+=n.move[2]*o,t.vx=n.move[0]*(a-o)/.02,t.vy=n.move[1]*(a-o)/.02,t.vz=n.move[2]*(a-o)/.02}return n.spin&&(t.w=n.spin,t.yaw+=n.spin*e+(n.phase||0)*bs),t}function wf(n,e){if(!n.sink)return 0;const t=(((e-(n.sink.start||0))/n.sink.period+(n.sink.phase||0))%1+1)%1;if(e<(n.sink.start||0))return 0;const i=n.sink.on??.5;return t<i?0:t<i+.08?(t-i)/.08*6:t<.92?6:(1-(t-.92)/.08)*6}function zx(n,e){if(!n.sink||e<(n.sink.start||0))return 0;const t=(((e-(n.sink.start||0))/n.sink.period+(n.sink.phase||0))%1+1)%1,i=n.sink.on??.5;return t>i-.12&&t<i?1:0}const zc=(n,e)=>(n.amp??1.1)*Math.sin(bs*e/(n.period||3)+(n.phase||0)*bs),Ef=(n,e,t)=>(n.phase||0)*bs+e*n.speed*(1+(t?.accel||0)*e);function Bx(n,e,t,i,s,r=[],o=[]){const a=n.parts,l={};if(e.stun=Math.max(0,e.stun-s),e.coyote=Math.max(0,e.coyote-s),e.jumpLock=Math.max(0,e.jumpLock-s),e.gas=Math.min(1,e.gas+s*.35),e.ground>=0){const y=a[e.ground];if(mr(y,i,l),y.type==="disc"||y.type==="box"&&y.spin){const M=l.w*s,w=e.x-l.x,b=e.z-l.z,_=Math.cos(M),T=Math.sin(M);e.x=l.x+w*_+b*T,e.z=l.z-w*T+b*_,e.yaw+=M}e.x+=l.vx*s,e.z+=l.vz*s,l.vy&&(e.y+=l.vy*s),y.conveyor&&(e.x+=y.conveyor[0]*s,e.z+=y.conveyor[1]*s)}const u=e.stun>0?.15:1,c=Math.hypot(t.mx,t.mz),p=t.mx*sh,m=t.mz*sh,d=e.ground>=0&&a[e.ground].ice,h=(e.ground>=0?d?rh*.22:rh:Nx)*u*s,v=p-e.vx,f=m-e.vz,g=Math.hypot(v,f);if(g>0){const y=Math.min(1,h/g);e.vx+=v*y,e.vz+=f*y}if(c>.1&&e.stun<=0&&(e.yaw=Math.atan2(t.mx,t.mz)),t.jump&&e.stun<=0&&(e.ground>=0||e.coyote>0)&&e.jumpLock<=0)e.vy=kx,e.ground=-1,e.coyote=0,e.jumpLock=.2,o.push({k:"jump"});else if(t.puff&&e.stun<=0&&e.gas>=.5){e.gas-=.5,e.vy=Math.max(e.vy,Ox);const y=Math.sin(e.yaw),M=Math.cos(e.yaw);e.vx+=y*oh,e.vz+=M*oh,e.ground=-1,e.puffs++,o.push({k:"puff"})}e.vy-=Fx*s,e.vy=Math.max(e.vy,-40),e.x+=e.vx*s,e.y+=e.vy*s,e.z+=e.vz*s;const x=e.ground;e.ground=-1;for(let y=0;y<a.length;y++){const M=a[y];M.type==="box"||M.type==="disc"?Hx(M,y,e,i,l,o):M.type==="sweeper"?Vx(M,e,i,o,n,y):M.type==="hammer"?Gx(M,e,i,o,y):M.type==="bumper"&&Wx(M,e,i,l,o,y)}if(e.ground>=0?(e.coyote=.12,x<0&&e.vy<=0&&o.push({k:"land"})):x>=0&&(e.coyote=.12),e.ground>=0&&c<.1){const y=Math.exp((a[e.ground].ice?-.8:-10)*s);e.vx*=y,e.vz*=y}for(const y of r){const M=e.x-y.x,w=e.z-y.z,b=Math.hypot(M,w);if(b>0&&b<sn*2&&Math.abs(e.y-y.y)<Pn*.8){const _=(sn*2-b)/2;e.x+=M/b*_,e.z+=w/b*_,e.vx+=M/b*2.2,e.vz+=w/b*2.2}}return o}function ah(n,e,t){n.y=t,n.vy<0&&(n.vy=0),n.ground=e}function Hx(n,e,t,i,s,r){mr(n,i,s);const o=wf(n,i);if(o>=5.9)return;if(n.type==="disc"){const k=s.y+n.h/2-o,B=s.y-n.h/2-o,G=t.x-s.x,O=t.z-s.z,I=Math.hypot(G,O);if(t.y>k+.05||t.y+Pn<B)return;if(I<n.r&&t.y>k-.6&&t.vy<=.5){ah(t,e,k);return}if(I<n.r+sn&&I>0&&t.y+Pn>B+.05&&t.y<k-.05){const X=n.r+sn-I;t.x+=G/I*X,t.z+=O/I*X}return}const a=n.s[0]/2,l=n.s[1]/2,u=n.s[2]/2,c=s.y+l-o,p=s.y-l-o;if(t.y>c+.05||t.y+Pn<p)return;const m=Math.cos(s.yaw),d=Math.sin(s.yaw),h=t.x-s.x,v=t.z-s.z,f=h*m-v*d,g=h*d+v*m,x=Math.abs(f)<=a&&Math.abs(g)<=u;if(x&&t.y>c-.6&&t.vy<=.5){ah(t,e,c),n.bounce&&(t.vy=n.bounce,t.ground=-1,r.push({k:"boing"}));return}if(x&&t.vy>0&&t.y+Pn>p&&t.y<p){t.vy=0,t.y=p-Pn;return}if(t.y+Pn<=p+.05||t.y>=c-.05)return;const y=wo(f,-a,a),M=wo(g,-u,u);let w=f-y,b=g-M,_=Math.hypot(w,b);if(_>=sn)return;if(_<1e-5){const k=a-Math.abs(f),B=u-Math.abs(g);k<B?(w=Math.sign(f)||1,b=0,_=-k):(w=0,b=Math.sign(g)||1,_=-B)}else w/=_,b/=_;const T=sn-_,D=w*m+b*d,S=-w*d+b*m;t.x+=D*T,t.z+=S*T;const E=t.vx*D+t.vz*S;E<0&&(t.vx-=E*D,t.vz-=E*S),n.move&&(t.vx+=Math.max(0,s.vx*D+s.vz*S)*D,t.vz+=Math.max(0,s.vx*D+s.vz*S)*S)}function pl(n,e,t,i,s,r,o,a=-1,l=0){if(n.stun>.25)return;const u=Math.hypot(e,t)||1,c=p=>Math.round(p*100)/100;n.vx=e/u*i,n.vz=t/u*i,n.vy=Math.max(n.vy,s),n.ground=-1,n.stun=.7,r.push({k:"knock",kind:o,i:a,t:c(l),x:c(n.x),y:c(n.y),z:c(n.z)})}function Vx(n,e,t,i,s,r){const[o,a,l]=n.p,u=Ef(n,t,s),c=n.r??.4,p=n.arms??1;if(e.y>a+c||e.y+Pn<a-c||n.start!=null&&t<n.start)return;const m=n.half?bs/p:Math.PI/p;for(let d=0;d<p;d++){const h=u+d*m,v=Math.cos(h),f=Math.sin(h),g=n.half?0:-n.len,x=wo((e.x-o)*v+(e.z-l)*f,g,n.len),y=o+v*x,M=l+f*x,w=e.x-y,b=e.z-M;if(Math.hypot(w,b)<sn+c){const T=Math.sign(n.speed)||1,D=-f*T*Math.sign(x||1),S=v*T*Math.sign(x||1),E=Math.max(7,Math.abs(n.speed*x)*1.4);pl(e,D*.8+w*.2,S*.8+b*.2,E,6.5,i,"sweeper",r,t);return}}}function Gx(n,e,t,i,s){const[r,o,a]=n.p,l=zc(n,t),u=n.len??4,c=n.r??.9,p=n.axis==="x",m=r+(p?0:Math.sin(l)*u),d=a+(p?Math.sin(l)*u:0),h=o-Math.cos(l)*u,v=wo(h,e.y+sn,e.y+Pn-sn),f=e.x-m,g=v-h,x=e.z-d;if(Math.hypot(f,g,x)<sn+c){const M=Math.cos(l)*Math.sign(zc(n,t+.02)-l||1);pl(e,p?f*.3:M*3+f*.3,p?M*3+x*.3:x*.3,13,7,i,"hammer",s,t)}}function Wx(n,e,t,i,s,r){mr(n,t,i);const o=i.x,a=i.y,l=i.z,u=e.x-o,c=e.z-l,p=Math.hypot(u,c);e.y>a+n.h||e.y+Pn<a||p<n.r+sn&&p>0&&(e.x=o+u/p*(n.r+sn),e.z=l+c/p*(n.r+sn),pl(e,u,c,13,5,s,"bumper",r,t))}function ch(n,e){return Math.abs(e.x-n.p[0])<=n.s[0]/2&&Math.abs(e.z-n.p[2])<=n.s[2]/2&&e.y>=n.p[1]-1&&e.y<=n.p[1]+n.s[1]}function lh(n){return{x:n[0],y:n[1],z:n[2],vx:0,vy:0,vz:0,yaw:n[3]||0,ground:-1,coyote:0,stun:0,jumpLock:0,puffs:0,gas:1}}const Xx=`varying vec2 vW; varying float vFog;
void main(){ vec4 w = modelMatrix * vec4(position,1.); vW = w.xz; vec4 mv = viewMatrix * w; vFog = -mv.z; gl_Position = projectionMatrix * mv; }`,qx=`uniform float uTime; uniform vec3 uDeep, uFoam, uFogColor; uniform float uFogNear, uFogFar;
varying vec2 vW; varying float vFog;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float n2(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
void main(){
  vec2 p = vW * .18 + vec2(uTime * .05, uTime * .11);
  float s1 = n2(p + n2(p * .7 + uTime * .1));
  float streak = smoothstep(.72, .75, s1) * (1. - smoothstep(.77, .80, s1));
  float spark = step(.965, n2(vW * 1.6 + uTime * 1.3));
  vec3 col = mix(uDeep, uFoam, clamp(streak * .5 + spark * .35, 0., 1.));
  gl_FragColor = vec4(mix(col, uFogColor, smoothstep(uFogNear, uFogFar, vFog)), 1.);
  #include <colorspace_fragment>
}`;function $x(n){const e=n.c||"#fff1d6",t=st(e,-.18),[i,s,r]=n.s,o=[ht(i,s*.72,r,t,[0,-s*.14,0]),ht(i,s*.28,r,e,[0,s*.36,0])];for(const a of[-1,1])o.push(Oe(Ue(new It(.18,.18,r,8),st(e,.2)),[a*i/2,s/2,0],[Math.PI/2,0,0]));for(const a of[-1,1])o.push(Oe(Ue(new It(.18,.18,i,8),st(e,.2)),[0,s/2,a*r/2],[0,0,Math.PI/2]));if(n.ice)for(let a=-2;a<=2;a++)o.push(Oe(Ue(new mn(i*.15,.02,r*.5),"#ffffff"),[a*i/5,s/2+.015,a%2*r/6],[0,.5,0]));if(n.bounce)for(let a=0;a<3;a++)o.push(Ne(.5,.5,.12,"#ff5d8f",[(a-1)*1.4,s/2+.07,0],0,1,12));if(n.conveyor)for(let a=-2;a<=2;a++)o.push(ht(i*.8,.04,.25,st(e,-.3),[0,s/2+.02,a*r/6]));return je(o)}function Yx(n){const e=n.c||"#4fd1c5",t=[Ne(n.r,n.r*.92,n.h*.72,st(e,-.18),[0,-n.h*.14,0],0,1,36),Ne(n.r,n.r,n.h*.28,e,[0,n.h*.36,0],0,1,36)];if(n.spin)for(let i=0;i<6;i++)t.push(Oe(Ue(new mn(n.r*.9,.03,.3),st(e,.25)),[Math.cos(i/6*Math.PI*2)*n.r*.5,n.h/2+.01,Math.sin(i/6*Math.PI*2)*n.r*.5],[0,-i/6*Math.PI*2,0]));return t.push(Oe(Ue(new hi(n.r,.16,6,36),st(e,.2)),[0,n.h/2,0],[Math.PI/2,0,0])),je(t)}function jx(n){const e=n.theme,t=new dt,i=[],s=Un(),r={},o=new pt(new Ii(900,900).rotateX(-Math.PI/2),new Tn({vertexShader:Xx,fragmentShader:qx,uniforms:{uTime:{value:0},uDeep:{value:new Ge(e.water)},uFoam:{value:new Ge(e.foam)},uFogColor:{value:new Ge(e.fog)},uFogNear:{value:e.fogNear},uFogFar:{value:e.fogFar}}}));t.add(o);for(const f of n.parts)if(f.type==="box"||f.type==="disc"){const g=tt(f.type==="box"?$x(f):Yx(f),s,{receive:!0});_t(g,.05),t.add(g);const x=new pt(f.type==="disc"?new xr(f.r,f.r+.6,32).rotateX(-Math.PI/2):new Ii(f.s[0]+1.2,f.s[2]+1.2).rotateX(-Math.PI/2),new tn({color:"#ffffff",transparent:!0,opacity:.35,depthWrite:!1}));x.position.y=.03,t.add(x);const y=f.p[1]-(f.type==="disc"?f.h:f.s[1])/2;if(y>.2&&!f.move){const w=tt(je([Ne(.5,.65,y+1,st(f.c||"#fff1d6",-.3),[0,(y-1)/2,0],0,1,10)]),s);w.position.set(f.p[0],0,f.p[2]),t.add(w)}const M=w=>{mr(f,w,r);const b=wf(f,w),_=zx(f,w);g.position.set(r.x+(_?Math.sin(w*50)*.06:0),r.y-b,r.z),g.rotation.y=r.yaw,g.visible=b<5.9,x.position.set(r.x,.03,r.z),x.rotation.y=r.yaw,x.visible=r.y-b-(f.type==="disc"?f.h:f.s[1])/2<.4};M(0),(f.move||f.spin||f.sink)&&i.push(M)}else if(f.type==="sweeper"){const g=new dt,x=f.arms??1,y=f.half?Math.PI*2/x:Math.PI/x,M=[];for(let T=0;T<x;T++){const D=f.half?f.len:f.len*2,S=f.half?f.len/2:0,E=[Ne(f.r,f.r,D,f.c||"#b58cf0",[S,0,0],[0,0,Math.PI/2],1,12)];for(let B=f.half?.6:-f.len+.6;B<f.len;B+=1.2)E.push(Ne(f.r+.03,f.r+.03,.3,"#ffffff",[B,0,0],[0,0,Math.PI/2],1,12));E.push(Ie(f.r*1.6,"#ff5d8f",[f.len,0,0],0,1,10)),f.half||E.push(Ie(f.r*1.6,"#ff5d8f",[-f.len,0,0],0,1,10));const k=je(E);k.rotateY(-T*y),M.push(k)}const w=tt(je(M),s);_t(w,.04),g.add(w);const b=tt(je([Ne(.9,1.1,1.4,"#ffd23f",[0,0,0],0,1,14),nn(.9,.8,"#ff5d8f",[0,1.1,0],0,1,14)]),s);_t(b,.04),g.add(b),g.position.set(...f.p),t.add(g);const _=T=>{w.rotation.y=-Ef(f,T,n);const D=f.start==null||T>=f.start;w.position.y=D?0:Math.min(8,(f.start-T)*2)};_(0),i.push(_)}else if(f.type==="hammer"){new dt;const g=f.len??4,x=f.r??.9,y=f.c||"#ff8fb1",M=tt(je([ht(.5,.5,.5,"#5d6472",[0,0,0])]),s);M.position.set(...f.p),t.add(M);const w=new dt,b=tt(je([Ne(.1,.1,g,"#5d6472",[0,-g/2,0],0,1,6),Ne(x,x,x*2.4,y,[0,-g,0],[Math.PI/2,0,0],1,16),Ne(x*1.03,x*1.03,.3,"#ffffff",[0,-g,x*.7],[Math.PI/2,0,0],1,16),Ne(x*1.03,x*1.03,.3,"#ffffff",[0,-g,-x*.7],[Math.PI/2,0,0],1,16)]),s);_t(b,.04),w.add(b),w.position.set(...f.p),t.add(w);const _=T=>{const D=zc(f,T);f.axis==="x"?w.rotation.set(-D,0,0):w.rotation.set(0,0,D)};_(0),i.push(_)}else if(f.type==="gantry"){const[g,x,y]=f.p,M=f.len,w=f.w,b=[ht(.5,.5,M,"#7b8292",[0,0,0])];for(const T of[-1,1]){b.push(ht(w*2+.6,.5,.5,"#7b8292",[0,0,T*M/2]));for(const D of[-1,1])b.push(Ne(.25,.32,x+1,"#7b8292",[D*w,-x/2-.3,T*M/2],0,1,8),Ne(.36,.36,.3,"#f7a43a",[D*w,.35,T*M/2],0,1,8))}const _=tt(je(b),s);_t(_,.04),_.position.set(g,x+.25,y),t.add(_)}else if(f.type==="bumper"){const g=[Ne(f.r,f.r*1.05,f.h,f.c||"#ff9f43",[0,f.h/2,0],0,1,18)];for(let y=0;y<3;y++)g.push(Ne(f.r+.04,f.r+.04,.22,"#ffffff",[0,.4+y*.6,0],0,1,18));g.push(Ie(f.r*.9,"#ff5d8f",[0,f.h,0],0,[1,.45,1],14));const x=tt(je(g),s);_t(x,.04),x.position.set(...f.p),t.add(x),i.push(y=>{mr(f,y,r),x.position.set(r.x,r.y,r.z);const M=1+Math.sin(y*6+f.p[0])*.03;x.scale.set(M,1,M)})}const a=(f,g,x)=>{const y=ff(g,x/1.5,{pole:e.rail,ring:e.railRing});y.scale.setScalar(1.5),y.position.set(f.p[0],f.p[1]-1,f.p[2]),t.add(y)};n.checkpoints.forEach(f=>a(f,"CHECKPOINT",f.s[0]+1)),n.finish&&a({p:[n.finish.p[0],n.finish.p[1],n.finish.p[2]+n.finish.s[2]/2+.5]},"ARRIVÉE",n.finish.s[0]+1),n.kind==="race"&&a({p:[0,3,8.5]},"DÉPART",15);const l=(()=>{let f=99;return()=>((f=f*16807%2147483647)-1)/2147483646})(),u=[],c=[],p=[],m=[],d=n.kind==="race"?75:0,h=(f,g)=>n.kind==="race"?Math.abs(f)>26||g<-30||g>(n.finishZ||150)+30:Math.hypot(f,g)>34;for(let f=0;f<40&&u.length<14;f++){const g=l()*Math.PI*2,x=45+l()*60,y=Math.cos(g)*x,M=d+Math.sin(g)*x;h(y,M)&&u.push([y,-.4,M,l()*6,3+l()*4])}u.forEach(([f,g,x,,y])=>{l()<.8&&c.push([f+(l()-.5)*y,g+y*.55,x+(l()-.5)*y,l()*6,.9+l()*.4])});for(let f=0;f<22;f++){const g=l()*Math.PI*2,x=200+l()*240;p.push([Math.cos(g)*x,-30+l()*40,d+Math.sin(g)*x,l()*6,14+l()*22])}for(let f=0;f<30;f++){const g=l()*Math.PI*2,x=100+l()*350;m.push([Math.cos(g)*x,30+l()*60,d+Math.sin(g)*x,l()*6,6+l()*9])}const v=(f,g,x,y=!1)=>{const M=new Po(f,g,x.length),w=new At;return x.forEach((b,_)=>{w.position.set(b[0],b[1],b[2]),w.rotation.set(0,b[3],0),w.scale.setScalar(b[4]),w.updateMatrix(),M.setMatrixAt(_,w.matrix)}),M.castShadow=y,t.add(M),M};return v(je([Oe(Ue(new It(1,.7,1.1,9),e.sand),[0,0,0]),Oe(Ue(new It(.92,1,.25,9),e.grass),[0,.6,0])]),nr(),u),v(Uc(e,e.flora?.palm??2),nr(),c,!0),v(je([Oe(Ue(new It(1,.8,3,9),e.far),[0,0,0]),Oe(Ue(new It(1.02,1.02,.25,9),e.grass),[0,1.55,0]),Oe(Ue(new Bt(.8,1.6,9),st(e.far,-.12)),[0,-2.3,0],[Math.PI,0,0])]),nr(),p),v(je([[0,0,0,1],[1.1,-.2,.2,.75],[-1.1,-.25,-.1,.7],[.4,.35,-.3,.7]].map(([f,g,x,y])=>Oe(Ue(new An(y,1),"#ffffff"),[f,g,x],0,[1,.7,1]))),new hr({vertexColors:!0,flatShading:!0,emissive:"#e8f4ff",emissiveIntensity:.55}),m),{root:t,update(f){o.material.uniforms.uTime.value=f;for(const g of i)g(f)}}}const Yt=3,Na=1/60,uh=1/20,hh=.12,Kx=-1.2,fh=n=>Math.atan2(Math.sin(n),Math.cos(n)),jt=n=>Math.round(n*1e3)/1e3,Fa=n=>n===1?"1er":`${n}e`,Vn={ground:1,stun:2,swim:8,done:16};function Jx(n,{course:e,roster:t,host:i,meId:s,spectator:r=!1}){const{arena:o,lobby:a,stage:l}=n,u=e.kind==="race";o.setVisible(!1),l.setTheme(e.theme);const c=jx(e);l.scene.add(c.root);const p=o.fx,m=Mf(n.overlay,e,{mode:e.kind});m.show(!0),n.input.setPlaying(!0);const d=R("div.pf-tags");n.overlay.append(d);const h=new Map;t.forEach(N=>{const q=Nc(N.look);l.scene.add(q.root);const L=R(`div.pf-tag${N.id===s?".me":""}`,N.name),de=R("div.pf-bubble");d.append(L,de);const pe=e.spawn[N.seat%e.spawn.length];h.set(N.id,{id:N.id,name:N.name,look:N.look,seat:N.seat,char:q,tag:L,bubble:de,buf:[],x:pe[0],y:pe[1],z:pe[2],yaw:pe[3]||0,flags:Vn.ground,cp:0,fin:null,out:null,rank:0,puffs:0,emotes:0,last:0,run:0,big:0,es:0})});const v=r?null:h.get(s);let f=v?lh(e.spawn[v.seat%e.spawn.length]):null,g=0,x=0,y=0,M=0,w=0,b=0,_=0,T="count",D=4,S=0,E=-1,k=!1,B=-1,G=!1;const O={yaw:e.camYaw||0,user:0,pos:new F,look:new F,shake:0},I=e.spawn[0];O.pos.set(I[0],I[1]+14,I[2]-16),O.look.set(I[0],I[1],I[2]+6);const X=new F,U=new F;Ve.music(!0,{fast:!0}),r&&m.banner("Vous regardez la partie",{subText:"Vous rejoindrez la prochaine épreuve",ms:4e3});const re=()=>{if(g>0){const N=e.checkpoints[g-1],q=v.seat%4;return[N.p[0]+(q-1.5)*1.2,N.p[1],N.p[2],0]}return e.spawn[v.seat%e.spawn.length]};function ce(){const N=re();f=lh(N),f.gas=1,p.splash(N[0],N[1],N[2],12,.7),Ve.splash(.6)}function he(N){const q=h.get(N.id);if(q){if(N.k==="fin")q.fin=N.time,q.rank=N.rank,q===v?(Ve.fanfare(),m.banner(`${Fa(N.rank)} !`,{kind:"good",ms:3500,subText:`Temps ${ee(N.time)}`}),p.confetti(q.x,q.y+4,q.z,90,6)):(Ve.checkpoint(),m.toast(`${q.name} arrive ${Fa(N.rank)}`,2200));else if(N.k==="out")q.out=N.at,q.rank=N.rank,q===v?m.banner("TOMBÉ !",{kind:"bad",ms:2600,subText:`Vous avez tenu ${ee(N.at)}`}):m.toast(`${q.name} est tombé !`,2e3);else if(N.k==="em"){q.char.emote(N.em),Ve.emote(N.em);const L=Kn.find(de=>de.id===N.em);q.bubble.textContent=L?.icon||"",q.bubble.classList.remove("show"),q.bubble.offsetWidth,q.bubble.classList.add("show")}}}const ee=N=>`${Math.floor(N/60)}:${(N%60).toFixed(2).padStart(5,"0")}`;function ve(N){he(N),a.broadcast({t:"fev",e:N})}function K(N,q){const L=h.get(N);!L||L.fin!=null||L.out!=null||(S++,B<0&&(B=_),ve({k:"fin",id:N,rank:S,time:jt(q)}))}function j(N){const q=h.get(N);if(!q||q.out!=null||q.fin!=null)return;const L=[...h.values()].filter(de=>de.out==null).length;ve({k:"out",id:N,rank:L,at:jt(Math.max(0,_-Yt))})}function me(N,q){const L=[];if(x>0)return x-=N,x<=0&&u&&ce(),L;const de=[...h.values()].filter(Z=>Z!==v&&Z.out==null).map(Z=>({x:Z.x,y:Z.y,z:Z.z})),pe=Math.sin(O.yaw+O.user),Te=Math.cos(O.yaw+O.user),ne=-Te,Ce=pe;let Se=ne*q.mx-pe*q.my,P=Ce*q.mx-Te*q.my;const A=Math.hypot(Se,P);A>1&&(Se/=A,P/=A);const $=T==="count"||v.fin!=null||v.out!=null,se=!$&&q.jump>0;M=Math.min(M+N,.25);let ae=!0;for(;M>=Na;)M-=Na,Bx(e,f,$?{mx:0,mz:0,jump:!1,puff:!1}:{mx:Se,mz:P,jump:se&&ae,puff:q.sup>0&&ae},Math.max(0,_-M-Yt),Na,de,L),ae=!1;if(q.sup>0&&!L.some(Z=>Z.k==="puff")&&!$&&Ve.sputter(),f.y<Kx&&x<=0&&v.out==null&&(p.splash(f.x,0,f.z,26,1.2),Ve.splash(1),Ht.rumble(.6,.5,200),u?(x=1.1,m.toast("Plouf !",1e3)):(x=1e9,i?j(s):a.toHost({t:"fout"}))),u&&v.fin==null&&(e.checkpoints.forEach((Z,Re)=>{Re>=g&&ch(Z,f)&&(g=Re+1,Ve.checkpoint(),m.banner("CHECKPOINT !",{kind:"good",ms:1200}),p.confetti(Z.p[0],Z.p[1]+5,Z.p[2],60,Z.s[0]))}),ch(e.finish,f))){const Z=_-Yt;i?K(s,Z):(v.fin=Z,a.toHost({t:"ffin",time:jt(Z)}))}return u&&q.respawn&&v.fin==null&&x<=0&&T==="run"?(y+=N,y>.9&&(y=0,ce())):y=0,m.hold(y/.9),q.emote&&v.out==null&&(i?(v.emotes++,ve({k:"em",id:s,em:q.emote})):a.toHost({t:"fem",em:q.emote})),L}function fe(N){for(const q of N)q.k==="jump"?Ve.ui():q.k==="land"?p.ring(f.x,f.y+.05,f.z,1.2,.5,.5):q.k==="boing"?(Ve.emote("cheer"),p.stars(f.x,f.y+.3,f.z,6)):q.k==="puff"?(v.big=1,v.puffs++,W(v,1.6),Ve.bigPuff(),Ht.rumble(.6,.4,160)):q.k==="knock"&&(bf({event:"knock",cause:q.kind,id:q.i??-1,course:e.id,t:q.t,pos:{x:q.x,y:q.y,z:q.z},from:"cet appareil"}),Ve.hit(),p.stars(f.x,f.y+1.6,f.z,8),O.shake=.6,Ht.rumble(.8,.6,220))}function W(N,q){const L=X.set(-Math.sin(N.yaw),0,-Math.cos(N.yaw));N.char.root.updateMatrixWorld(!0),p.puff(N.char.butt(U),L,pr(N.look.gas).c,q)}function Q(N,q){const L=N.buf;if(!L.length)return;for(;L.length>2&&L[1].at<=q;)L.shift();const de=L[0],pe=L[1]||L[0],Te=pe.at>de.at?Math.max(0,Math.min(1.3,(q-de.at)/(pe.at-de.at))):0;N.x=de.x+(pe.x-de.x)*Te,N.y=de.y+(pe.y-de.y)*Te,N.z=de.z+(pe.z-de.z)*Te,N.yaw=de.yaw+fh(pe.yaw-de.yaw)*Math.min(1,Te),N.flags=pe.flags;const ne=N.puffs;N.puffs=pe.puffs,N.puffs>ne&&ne>=0&&(N.big=1,W(N,1.6),Ve.puff(1.4,{vol:.6}))}const ie={kind:"foot",riders:h,roster:t,get t(){return _},get finished(){return k},onMsg(N){if(i){const q=h.get(N.from);if(!q)return;if(N.t==="fs"&&Array.isArray(N.s)){const[L,de,pe,Te,ne,Ce,Se]=N.s;if(![L,de,pe,Te].every(Number.isFinite))return;q.buf.push({at:_,x:L,y:de,z:pe,yaw:Te,flags:ne,puffs:Se}),q.buf.length>30&&q.buf.shift(),q.cp=Ce|0,q.puffsHost=Se}else N.t==="ffin"?K(N.from,+N.time||Math.max(0,_-Yt)):N.t==="fout"?j(N.from):N.t==="fem"&&Kn.some(L=>L.id===N.em)&&(q.emotes++,ve({k:"em",id:N.from,em:N.em}));return}if(N.t==="fsnap"){if(!Number.isFinite(N.at))return;const q=Math.min(.25,(a.rtt||80)/2e3);!G||Math.abs(N.at+q-_)>.5?(_=N.at+q,G=!0):_+=(N.at+q-_)*.1;for(const[L,de,pe,Te,ne,Ce,Se,P]of N.pl){const A=h.get(L);!A||A===v||((!A.buf.length||N.at>A.buf[A.buf.length-1].at)&&A.buf.push({at:N.at,x:de,y:pe,z:Te,yaw:ne,flags:Ce,puffs:P}),A.buf.length>30&&A.buf.shift(),A.cp=Se)}}else N.t==="fev"&&he(N.e)},removeRider(N){const q=h.get(N);!q||q===v||(p.splash(q.x,Math.max(0,q.y),q.z,14,.8),q.char.dispose(),q.tag.remove(),q.bubble.remove(),h.delete(N))},update(N,q){q||(_+=N);const L=n.input.poll(N);if(q&&(L.mx=L.my=0,L.puff=!1,L.jump=0,L.sup=0,L.respawn=!1,L.emote=null),T==="count"){const ne=Math.ceil(Yt-_);ne!==D&&ne>=1&&ne<=3&&(D=ne,m.banner(String(ne),{kind:"count",ms:900}),Ve.beep()),_>=Yt&&(T="run",m.banner(u?"PARTEZ !":"TENEZ BON !",{kind:"go",ms:900}),Ve.beep(!0))}if(O.user=fh(O.user+L.look*(n.settings.camSpeed||1)),L.pause&&n.openPause(),v&&v.out==null?(fe(me(N,L)),v.x=f.x,v.y=f.y,v.z=f.z,v.yaw=f.yaw,v.flags=(f.ground>=0?Vn.ground:0)|(f.stun>0?Vn.stun:0)|(x>0?Vn.swim:0)|(v.fin!=null?Vn.done:0),m.gas(f.gas,pr(v.look.gas).c[0],f.gas<.5)):v&&(v.flags=Vn.swim),w-=N,w<=0&&(w=uh,v&&!i&&a.toHost({t:"fs",s:[jt(v.x),jt(v.y),jt(v.z),jt(v.yaw),v.flags,g,f?.puffs||0]})),i){for(const P of h.values())P!==v&&Q(P,_-hh);b-=N,b<=0&&a.online&&(b=uh,a.broadcast({t:"fsnap",at:jt(_),pl:[...h.values()].map(P=>[P.id,jt(P.x),jt(P.y),jt(P.z),jt(P.yaw),P.flags,P===v?g:P.cp,P===v?f?.puffs||0:P.puffsHost||0])}));const ne=[...h.values()],Ce=ne.filter(P=>P.out==null&&P.fin==null);if((u?Ce.length===0||B>=0&&_-B>40||_-Yt>(e.maxTime||300):Ce.length<=(ne.length>1?1:0)||_-Yt>(e.maxTime||150))&&E<0&&T==="run"&&(E=_,!u))for(const P of Ce)ve({k:"fin",id:P.id,rank:1,time:jt(_-Yt)});if(E>=0&&_-E>2.5&&!k){k=!0;const P=n.decorate?n.decorate(ie.summary()):ie.summary();a.broadcast({t:"end",summary:P}),n.onEnd(P);return}}else for(const ne of h.values())ne!==v&&Q(ne,_-hh);for(const ne of h.values()){const Ce=ne.char,Se=ne===v&&f?Math.min(1,Math.hypot(f.vx,f.vz)/7):Math.min(1,Math.hypot(ne.x-(ne.px??ne.x),ne.z-(ne.pz??ne.z))/Math.max(.001,N)/7);ne.px=ne.x,ne.pz=ne.z,ne.run+=(Se-ne.run)*Math.min(1,N*10),ne.big=Math.max(0,ne.big-N*3);const P=ne.flags,A=P&Vn.swim?"swim":P&Vn.stun?"stun":P&Vn.ground?"stand":"air";Ce.root.position.set(ne.x,A==="swim"?-.55:ne.y,ne.z),Ce.root.rotation.set(0,ne.yaw,0),Ce.root.visible=!(ne.out!=null&&A==="swim"&&_-Yt-ne.out>2),Ce.update(N,{mode:A,run:A==="stand"?ne.run:0,big:ne.big})}const de=v&&v.out==null?v:[...h.values()].find(ne=>ne.out==null&&ne.fin==null)||v||[...h.values()][0];if(de){const ne=O.yaw+O.user,Ce=Math.sin(ne),Se=Math.cos(ne),P=T==="count"?Math.max(0,1-_/(Yt-.3)):0,A=(u?10:11)+P*10,$=(u?6:7.5)+P*8;O.pos.lerp(X.set(de.x-Ce*A,Math.max(de.y,0)+$,de.z-Se*A),Math.min(1,N*5)),O.look.lerp(U.set(de.x+Ce*5,Math.max(de.y,0)+1,de.z+Se*5),Math.min(1,N*7))}const pe=l.camera;pe.position.copy(O.pos),Wc.settings.reduceMotion&&(O.shake=0),O.shake>0&&(O.shake=Math.max(0,O.shake-N*2.5),pe.position.x+=(Math.random()-.5)*O.shake*.4,pe.position.y+=(Math.random()-.5)*O.shake*.4),pe.lookAt(O.look),de&&l.focus(de.x,Math.max(0,de.y),de.z),c.update(Math.max(0,_-M-Yt)),p.update(N);const Te=Math.max(0,_-Yt);if(u){m.time(v?.fin??Te),m.progress(v?Math.max(0,v.z):0,g);const ne=[...h.values()].sort((Ce,Se)=>Ce.fin!=null!=(Se.fin!=null)?Ce.fin!=null?-1:1:Ce.fin!=null?Ce.rank-Se.rank:Se.z-Ce.z);v&&m.rank(`${Fa(ne.indexOf(v)+1)} / ${ne.length}`)}else{m.time(v?.out??Te);const ne=[...h.values()].filter(Ce=>Ce.out==null).length;m.rank(`${ne} en vie`)}m.update(N)},updateTags(N,q){for(const L of h.values()){L.char.head.getWorldPosition(X),X.y+=.95,U.copy(X).project(l.camera);const de=U.z<1&&Math.abs(U.x)<1.1&&Math.abs(U.y)<1.1&&L.char.root.visible,pe=`translate(${((U.x*.5+.5)*N).toFixed(1)}px, ${((-U.y*.5+.5)*q).toFixed(1)}px)`;L.tag.style.transform=pe+" translate(-50%, -100%)",L.tag.style.opacity=de?1:0,L.bubble.style.transform=pe+" translate(-50%, -190%)"}},debugTeleport(N,q,L){f&&Object.assign(f,{x:N,y:q,z:L,vx:0,vy:0,vz:0,ground:-1,stun:0}),x=0,O.user=0},summary(){const N=[...h.values()];return N.sort((q,L)=>(q.rank||99)-(L.rank||99)||L.z-q.z),{course:e.id,kind:e.kind,time:jt(Math.max(0,_-Yt)),finished:!0,riders:N.map((q,L)=>({id:q.id,name:q.name,look:q.look,rank:L+1,time:q.fin,out:q.out,puffs:q===v?f?.puffs||0:q.puffsHost||0,emotes:q.emotes,puff:0,supers:0}))}},dispose(){m.dispose(),d.remove();for(const N of h.values())N.char.dispose();c.root.removeFromParent(),c.root.traverse(N=>{N.geometry&&N.geometry.dispose()}),o.setVisible(!0),l.setTheme(o.course.theme),n.input.setPlaying(!1),Ve.music(!0)}};return ie}const Eo="ABCDEFGHJKMNPQRSTUVWXYZ23456789",Af=()=>Array.from({length:5},()=>Eo[Math.floor(Math.random()*Eo.length)]).join("");function dh(n){let e=2166136261;for(const i of String(n))e^=i.charCodeAt(0),e=Math.imul(e,16777619);let t="";for(let i=0;i<5;i++)t+=Eo[(e>>>0)%Eo.length],e=Math.imul(e^e>>>13,2654435761);return t}const po=n=>String(n||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5),eo=(n,e=24)=>typeof n=="string"&&n.length<=e?n:void 0;function ka(n={}){return{species:eo(n.species)||"hippo",color:/^#[0-9a-f]{6}$/i.test(n.color||"")?n.color:"#9d8fc4",hat:eo(n.hat)||"none",extra:eo(n.extra)||"none",gas:eo(n.gas)||"green"}}const ph="poufparty-v1-",Ao=4,Zx=8,Qx=1e3,e1=12e3,t1=12e3,n1=15e3,i1=4e4;function mh(){const n=new URLSearchParams(location.search).get("peerhost");if(!n)return{debug:0,config:{iceServers:Hf}};const[e,t]=n.split(":");return{debug:0,host:e,port:+t,path:"/",secure:!1}}function Xs(n){return{"peer-unavailable":"Aucune partie ouverte avec ce code.","unavailable-id":"Ce code est déjà pris.",network:"Connexion au service de mise en relation impossible. Vérifiez votre connexion Internet.","server-error":"Le service de mise en relation ne répond pas. Réessayez dans un instant.","browser-incompatible":"Ce navigateur ne permet pas le jeu en ligne.","socket-error":"Connexion au service de mise en relation impossible.","socket-closed":"Connexion au service de mise en relation perdue."}[n?.type]||n?.message||"La connexion a échoué."}function gh(n){return new Promise((e,t)=>{let i=!1;const s=n?new Dl(n,mh()):new Dl(mh()),r=setTimeout(()=>{if(!i){i=!0;try{s.destroy()}catch{}t({type:"network"})}},12e3);s.once("open",()=>{i||(i=!0,clearTimeout(r),e(s))}),s.once("error",o=>{if(!i){i=!0,clearTimeout(r);try{s.destroy()}catch{}t(o)}})})}class s1 extends EventTarget{constructor(e){super(),this.me=e,this.code=null,this.role="none",this.online=!1,this.members=[],this.peer=null,this.conns=new Map,this.hostConn=null,this.offset=0,this.bestRtt=1/0,this.closed=!1,this.lastHostMsg=0,this.timer=setInterval(()=>this.tick(),Qx)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}on(e,t){const i=s=>t(s.detail);return this.addEventListener(e,i),()=>this.removeEventListener(e,i)}get isHost(){return this.role==="host"||this.role==="local"}get hostNow(){return performance.now()+(this.isHost?0:this.offset)}get players(){return this.members.slice(0,Ao)}async host(e=Af()){this.reset(),this.code=e,this.members=[{...this.me,ready:!0,host:!0,joinedAt:Date.now(),online:!0}];try{if(this.peer=await gh(ph+e),this.closed){this.peer.destroy();return}this.role="host",this.online=!0,this.peer.on("connection",t=>this.accept(t)),this.peer.on("disconnected",()=>{!this.closed&&this.peer&&!this.peer.destroyed&&setTimeout(()=>{try{this.peer.reconnect()}catch{}},1500)}),this.peer.on("error",t=>{if(t?.type==="unavailable-id"&&this.role==="host"&&!this.closed){this.rejoin();return}(t?.type==="network"||t?.type==="server-error")&&this.emit("status",{online:!1,role:this.role,error:Xs(t)})})}catch(t){if(t?.type==="unavailable-id")throw t;this.role="local",this.online=!1,this.emit("status",{online:!1,role:"local",error:Xs(t)})}this.pushState(),this.emit("status",{online:this.online,role:this.role})}async join(e,{wait:t=i1}={}){if(e=po(e),e.length!==5)throw new Error("Le code de partie contient 5 caractères.");this.reset(),this.code=e;const i=Date.now()+t;try{this.peer=await gh();for(let s=0;;s++)try{await this.connect(e);break}catch(r){if(r?.type!=="peer-unavailable"||Date.now()>i||this.closed||this.code!==e||(s||this.emit("status",{online:!1,role:"none",waiting:!0}),await new Promise(o=>setTimeout(o,2500)),this.closed||this.code!==e))throw r;this.peer?.disconnected&&this.peer.reconnect()}}catch(s){throw this.code===e&&!this.closed&&this.reset(),new Error(Xs(s))}}async rejoin(){if(this.rejoining)return;this.rejoining=!0;const e=this.code;this.emit("status",{online:!1,role:"none",hostLost:!0,takenOver:!0});try{await this.claim(e,{wait:75e3}),this.emit("status",{online:this.online,role:this.role,reelected:!0})}catch(t){this.emit("status",{online:!1,role:"none",error:t.message||Xs(t),lost:!0})}finally{this.rejoining=!1}}async claim(e,{wait:t=6e4}={}){const i=Date.now()+t;for(;;){try{await this.host(e);return}catch(s){if(s?.type!=="unavailable-id")throw s}try{await this.join(e,{wait:0});return}catch(s){if(Date.now()>i||this.closed)throw s;await new Promise(r=>setTimeout(r,1200+Math.random()*800))}}}connect(e){return new Promise((t,i)=>{const s=this.peer.connect(ph+e,{reliable:!0,serialization:"json"});let r=!1;const o=l=>{r||(r=!0,i(l))},a=l=>{l?.type==="peer-unavailable"&&o(l)};this.peer.on("error",a),s.on("open",()=>{this.hostConn=s,this.role="guest",this.online=!0,this.lastHostMsg=performance.now(),s.send({t:"hello",user:this.me});for(let l=0;l<4;l++)setTimeout(()=>this.ping(),150+l*300)}),s.on("data",l=>{if(!(!l||typeof l.t!="string")){if(this.lastHostMsg=performance.now(),l.t==="welcome"){r=!0,this.peer?.off("error",a),this.members=l.members,this.emit("state",this.members),this.emit("status",{online:!0,role:"guest"}),t();return}if(l.t==="denied"){o({message:l.message});try{s.close()}catch{}return}this.guestHandle(l)}}),s.on("close",()=>{this.hostConn===s?this.hostLost():o({type:"peer-unavailable"})}),s.on("error",o),setTimeout(()=>o({type:"peer-unavailable"}),15e3)})}reset(){this.closed=!1,this.conns.forEach(e=>{try{e.conn.close()}catch{}}),this.conns.clear();try{this.hostConn?.close()}catch{}this.hostConn=null;try{this.peer?.destroy()}catch{}this.peer=null,this.role="none",this.online=!1,this.members=[],this.offset=0,this.bestRtt=1/0}leave(){this.role==="guest"&&this.toHost({t:"bye"}),this.role==="host"&&this.broadcast({t:"closing"});const e=this.peer,t=[...this.conns.values()],i=this.hostConn;this.peer=null,this.hostConn=null,this.conns=new Map,this.closed=!0,this.role="none",this.online=!1,this.members=[],setTimeout(()=>{t.forEach(s=>{try{s.conn.close()}catch{}});try{i?.close()}catch{}try{e?.destroy()}catch{}},250)}destroy(){this.leave(),clearInterval(this.timer)}accept(e){const t={conn:e,id:null,last:performance.now()};e.on("data",i=>{if(!(!i||typeof i.t!="string")){if(t.last=performance.now(),i.t==="hello"){const s=i.user||{},r=String(s.id||e.peer).slice(0,64);let o=this.members.find(l=>l.id===r);if(!o&&this.members.length>=Zx){e.send({t:"denied",message:"La partie est complète."});return}const a=[...this.conns.values()].find(l=>l.id===r&&l!==t);if(a){this.conns.delete(a.conn.peer);try{a.conn.close()}catch{}}t.id=r,this.conns.set(e.peer,t),o?(o.online=!0,clearTimeout(o.timer),o.timer=0,o.name=String(s.name||o.name).slice(0,16),o.look=ka(s.look)):(o={id:r,name:String(s.name||"Joueur").slice(0,16),look:ka(s.look),ready:!1,host:!1,joinedAt:Date.now(),online:!0},this.members.push(o)),e.send({t:"welcome",members:this.publicMembers()}),this.pushState(),this.emit("joined",o);return}if(t.id){if(i.t==="ping"){e.send({t:"pong",c:i.c,h:performance.now()});return}if(i.t==="bye"){this.drop(t.id,!0);return}if(i.t==="ready"){const s=this.members.find(r=>r.id===t.id);s&&(s.ready=!!i.v,this.pushState());return}if(i.t==="look"){const s=this.members.find(r=>r.id===t.id);s&&(s.look=ka(i.look),this.pushState());return}this.emit("msg",{...i,from:t.id})}}}),e.on("close",()=>{this.conns.get(e.peer)===t&&(this.conns.delete(e.peer),t.id&&this.drop(t.id,!1))})}drop(e,t){const i=this.members.find(s=>s.id===e);if(!(!i||i.host)){for(const[s,r]of this.conns)if(r.id===e){this.conns.delete(s);try{r.conn.close()}catch{}}if(t){this.members=this.members.filter(s=>s!==i),this.pushState(),this.emit("left",i);return}i.online=!1,this.pushState(),clearTimeout(i.timer),i.timer=setTimeout(()=>{i.online||(this.members=this.members.filter(s=>s!==i),this.pushState(),this.emit("left",i))},n1)}}publicMembers(){return this.members.map(({timer:e,...t})=>t)}pushState(){this.isHost&&this.broadcast({t:"members",members:this.publicMembers()}),this.emit("state",this.members)}setReady(e){if(this.isHost){const t=this.members[0];t&&(t.ready=!0);return}this.toHost({t:"ready",v:e})}setLook(e){if(this.me.look=e,this.isHost){const t=this.members.find(i=>i.id===this.me.id);t&&(t.look=e,this.pushState())}else this.toHost({t:"look",look:e})}broadcast(e,t){for(const i of this.conns.values())if(i.id&&i.id!==t&&i.conn.open)try{i.conn.send(e)}catch{}}sendTo(e,t){for(const i of this.conns.values())if(i.id===e&&i.conn.open)try{i.conn.send(t)}catch{}}toHost(e){if(this.hostConn?.open)try{return this.hostConn.send(e),!0}catch{}return!1}ping(){this.toHost({t:"ping",c:performance.now()})}guestHandle(e){if(e.t==="pong"){const t=performance.now(),i=t-e.c;(i<this.bestRtt*1.2||i<60)&&(this.bestRtt=Math.min(i,this.bestRtt*1.05+1),this.offset=e.h+i/2-t),this.rtt=i;return}if(e.t==="members"){this.members=e.members,this.emit("state",this.members);return}if(e.t==="closing"){this.hostLost(!0);return}this.emit("msg",e)}hostLost(e=!1){if(this.closed||this.role!=="guest")return;const t=this.code,i=this.members.filter(r=>!r.host&&r.online!==!1);this.hostConn=null,this.role="none",this.online=!1,this.emit("status",{online:!1,role:"none",hostLost:!0,closing:e});const s=Math.max(0,i.findIndex(r=>r.id===this.me.id));setTimeout(async()=>{if(!this.closed)try{try{this.peer?.destroy()}catch{}this.peer=null,await this.claim(t,{wait:75e3}),this.emit("status",{online:this.online,role:this.role,reelected:!0})}catch(r){this.emit("status",{online:!1,role:"none",error:r.message||Xs(r),lost:!0})}},400+s*1600)}tick(){if(this.closed)return;const e=performance.now();if(this.role==="guest"){if(this.ping(),e-this.lastHostMsg>e1){try{this.hostConn?.close()}catch{}this.hostLost()}}else if(this.role==="host"){for(const t of[...this.conns.values()])if(t.id&&e-t.last>t1){this.conns.delete(t.conn.peer);try{t.conn.close()}catch{}this.drop(t.id,!1)}if(this.peer?.disconnected&&!this.peer.destroyed)try{this.peer.reconnect()}catch{}}}}const ml={id:"lagon",name:"La Descente du Lagon Rose",short:"Lagon Rose",kind:"coop",players:"1-4",blurb:"Pilotez la bouée à coups de pouf à travers le canyon rose : mâchoires, mines, moulins et toboggan géant.",par:[150,210,300],segs:[{len:34,w:13,flow:.6,L:"beach",R:"beach",h:2.5},{len:14,w:5.6,flow:2.2,L:"canyon",R:"canyon",h:6},{len:26,turn:28,flow:2.8},{len:26,turn:-40,h:8},{len:22,turn:12},{len:20,w:6.2},{len:46,w:5.6,L:"mesa",R:"canyon",h:9},{len:20,turn:-30,w:8,flow:2.4},{len:50,turn:10,w:8.5,flow:2.2,L:"mesa",R:"mesa"},{len:20,w:6.5},{len:30,turn:45,w:6,L:"canyon",R:"mesa",h:8,flow:2.8},{len:30,turn:-50},{len:40,turn:15,dy:-9,w:5.2,flow:5,L:"canyon",R:"canyon",h:10},{len:18,w:9,flow:1.6},{len:50,turn:-20,w:6.5,flow:2.6,R:"mesa"},{len:50,turn:25,w:7.5,L:"mesa",R:"mesa"},{len:40,turn:-30,w:6,L:"canyon",R:"canyon",h:7},{len:30,turn:20,dy:-3,flow:3.5},{len:26,w:12,flow:.8,L:"beach",R:"beach",h:2.5}],spawn:12,start:44,checkpoints:[135,262,392,500],finish:575,hazards:[{type:"rock",s:8,d:-9,r:1.6},{type:"rock",s:22,d:8.5,r:1.4},{type:"rock",s:29,d:-7,r:1},{type:"spikes",s:58,s1:72,side:1},{type:"spikes",s:82,s1:96,side:-1},{type:"spikes",s:104,s1:116,side:1},{type:"rock",s:110,d:-2.6,r:.9},{type:"jaws",s:158,period:4.6,phase:0},{type:"jaws",s:176,period:4.6,phase:.45},{type:"mine",s:216,d:0,amp:4,period:5,r:.75},{type:"mine",s:226,d:-2,amp:3,period:4,phase:.3,r:.75},{type:"mine",s:236,d:2,amp:4,period:6,phase:.6,r:.75},{type:"mine",s:246,d:0,amp:5,period:4.5,phase:.1,r:.75},{type:"mine",s:254,d:-3,amp:2,period:3,phase:.5,r:.75},{type:"rock",s:272,d:0,r:1.5},{type:"spikes",s:280,s1:300,side:-1},{type:"mill",s:292,side:1,speed:.9},{type:"spikes",s:312,s1:334,side:1},{type:"mill",s:322,side:-1,speed:-.8,phase:.2},{type:"boost",s:339,d:0,len:9,w:3.2,power:4},{type:"spikes",s:346,s1:372,side:1,inset:.6},{type:"spikes",s:352,s1:376,side:-1,inset:.6},{type:"spikes",s:400,s1:440,side:-1},{type:"bar",s:408,period:3.8},{type:"whirl",s:418,d:-1.5,r:4.2,dir:1,strength:3},{type:"bar",s:430,period:3.4,phase:.5},{type:"saw",s:456,d:0,amp:4.4,period:5,r:1.3},{type:"saw",s:471,d:0,amp:4.4,period:4,phase:.5,r:1.3},{type:"saw",s:486,d:1,amp:4,period:3.6,phase:.25,r:1.3},{type:"spikes",s:505,s1:530,side:1},{type:"mill",s:520,side:-1,speed:1.1},{type:"jaws",s:545,period:4.2,phase:.2},{type:"mine",s:556,d:0,amp:3.2,period:3.5,r:.75},{type:"boost",s:560,d:0,len:8,w:3,power:3}],theme:{sky:["#7fc8f2","#e8f7ff"],fog:"#dcefff",fogNear:70,fogFar:260,water:"#4fb3ef",waterEdge:"#86d4fa",foam:"#ffffff",wall:"#ee9147",ledge:"#f7b169",rail:"#86c540",railRing:"#5f9c2a",cliff:["#ef8f7d","#e57a6c","#f4a28f","#e8857a"],top:"#f6bf98",sand:"#f8d4a3",grass:"#9fd25a",leaf:["#5fae3a","#79c447","#4e9a33"],trunk:"#8a5a3c",rock:"#8d8f99",far:"#f3b49a"}},gl={id:"glacier",name:"Les Rapides du Glacier",short:"Glacier",kind:"coop",players:"1-4",blurb:"Slalom entre les icebergs, geysers glacés, troncs à la dérive et un toboggan de glace vertigineux.",par:[130,185,280],segs:[{len:32,w:12,flow:.6,L:"beach",R:"beach",h:3},{len:14,w:6,flow:2.4,L:"canyon",R:"canyon",h:7},{len:32,turn:-25,flow:2.8},{len:30,turn:35},{len:26,w:7.5,flow:2.4,L:"mesa"},{len:30,turn:-15},{len:22,w:6.5},{len:40,w:6.2,turn:22,flow:3,R:"mesa"},{len:30,turn:-30},{len:52,dy:-12,w:5.6,flow:5.6,L:"canyon",R:"canyon",h:11},{len:22,w:10,flow:1.4},{len:40,turn:30,w:6.5,flow:2.8,L:"mesa",R:"canyon",h:8},{len:40,turn:-35,w:6},{len:18,w:7},{len:50,w:8,turn:10,flow:2.4,L:"mesa",R:"mesa"},{len:40,turn:-25,w:6,L:"canyon",R:"canyon",h:8},{len:18,w:6.5},{len:40,turn:20,dy:-4,flow:3.6},{len:28,w:12,flow:.8,L:"beach",R:"beach",h:3}],spawn:[0,.38],start:[1,.7],checkpoints:[[6,.5],[10,.6],[13,.5],[16,.5]],finish:[18,.5],hazards:[{type:"rock",at:[0,.2],d:-8,r:1.8},{type:"rock",at:[0,.7],d:8,r:1.5},{type:"rock",at:[2,.25],d:3.7,r:1.2},{type:"rock",at:[2,.55],d:-3.7,r:1.2},{type:"rock",at:[2,.85],d:3.6,r:1.1},{type:"rock",at:[3,.35],d:-3.6,r:1.1},{type:"spikes",at:[3,.55],to:[3,.95],side:1},{type:"geyser",at:[4,.3],d:-2,r:1.8,period:4.2},{type:"geyser",at:[4,.75],d:2.4,r:1.8,period:4.2,phase:.5},{type:"geyser",at:[5,.35],d:0,r:2,period:3.6,phase:.25},{type:"mine",at:[5,.6],d:0,amp:3.5,period:4.5,r:.8},{type:"geyser",at:[5,.85],d:-2.5,r:1.6,period:3.8,phase:.7},{type:"log",at:[7,.3],d:0,amp:3.6,period:6,len:4.5},{type:"log",at:[7,.7],d:0,amp:3.6,period:5,phase:.5,len:4},{type:"spikes",at:[8,.1],to:[8,.9],side:-1},{type:"log",at:[8,.4],d:1,amp:2.5,period:4,phase:.2,len:4},{type:"mine",at:[8,.8],d:0,amp:3.5,period:3.8,phase:.4,r:.8},{type:"boost",at:[9,.02],d:0,len:8,w:3,power:3},{type:"spikes",at:[9,.15],to:[9,.9],side:1,inset:.6},{type:"spikes",at:[9,.25],to:[9,.95],side:-1,inset:.6},{type:"mill",at:[11,.35],side:-1,speed:.85},{type:"spikes",at:[11,.55],to:[11,.95],side:1},{type:"mill",at:[11,.85],side:1,speed:-.9,phase:.3},{type:"jaws",at:[12,.3],period:4.4},{type:"jaws",at:[12,.75],period:4.4,phase:.5},{type:"geyser",at:[14,.2],d:2.5,r:1.8,period:4,phase:.1},{type:"mine",at:[14,.4],d:0,amp:4,period:5,r:.8},{type:"geyser",at:[14,.6],d:-2.5,r:1.8,period:4,phase:.6},{type:"mine",at:[14,.8],d:1,amp:4.5,period:4,phase:.3,r:.8},{type:"spikes",at:[15,.05],to:[15,.95],side:-1},{type:"bar",at:[15,.3],period:3.6},{type:"bar",at:[15,.7],period:3.2,phase:.4},{type:"log",at:[17,.25],d:0,amp:3,period:4.5,len:4},{type:"saw",at:[17,.55],d:0,amp:4,period:4.4,r:1.3},{type:"saw",at:[17,.85],d:0,amp:4,period:3.8,phase:.5,r:1.3}],theme:{sky:["#8fcdf5","#f2fbff"],fog:"#e3f3ff",fogNear:70,fogFar:260,water:"#2f9fd4",waterEdge:"#86d9f7",foam:"#ffffff",wall:"#7fb6d8",ledge:"#e3f4ff",rail:"#94d8f2",railRing:"#5aaed6",cliff:["#eef8ff","#d4ebf8","#f8fcff","#bcdcef"],top:"#ffffff",sand:"#eef8ff",grass:"#d9f1ff",leaf:["#2f7d5a","#3b9168","#286b4c"],trunk:"#7a5236",rock:"#a7bed3",far:"#d6ebfa",farTop:"#ffffff",snowRocks:!0,trap:"#3b78c9",trapHi:"#79abea",spike:"#f4fbff",mine:"#4a86d8",tower:"#b9e3f7",bush:"#bdeeff",flora:{tree0:7,tree1:7,palm:7,bamboo:10,reeds:null,grass:10,bush:10},light:{sky:"#eef8ff",ground:"#cfe3f2",sun:"#ffffff",hemiI:1.5,sunI:1.45}}},r1={id:"marais",name:"Le Marais au Crépuscule",short:"Marais",kind:"coop",players:"1-4",blurb:"Au coucher du soleil, les crocodiles claquent des dents entre les tourbillons et les mines toxiques.",par:[140,200,300],segs:[{len:30,w:12,flow:.6,L:"beach",R:"beach",h:3},{len:14,w:6.2,flow:2.2,L:"canyon",R:"beach",h:6},{len:36,turn:30,flow:2.4},{len:30,turn:-20,w:7},{len:30,turn:-25},{len:20,w:6.5},{len:46,w:8,turn:15,flow:2.2,L:"mesa",R:"beach"},{len:30,turn:-30,w:6.5,L:"canyon"},{len:20,w:7},{len:40,dy:-7,w:5.6,flow:4.6,L:"canyon",R:"canyon",h:9},{len:34,turn:40,w:7,flow:2.6,L:"mesa",R:"canyon"},{len:30,turn:-40},{len:18,w:6.5},{len:46,w:7.5,turn:10,flow:2.6,L:"beach",R:"mesa"},{len:40,turn:-25,w:6,L:"canyon",R:"canyon",h:8},{len:18,w:6.5},{len:36,turn:20,dy:-3,flow:3.4,L:"beach",R:"beach"},{len:28,w:12,flow:.8,h:3}],spawn:[0,.38],start:[1,.7],checkpoints:[[5,.5],[8,.5],[12,.5],[15,.5]],finish:[17,.5],hazards:[{type:"rock",at:[0,.25],d:-8.5,r:1.6},{type:"rock",at:[0,.75],d:8,r:1.4},{type:"croc",at:[2,.25],d:2.6,period:3.4,r:1.2},{type:"croc",at:[2,.55],d:-2.6,period:3.4,phase:.5,r:1.2},{type:"croc",at:[2,.85],d:2.2,period:3,phase:.2,r:1.2},{type:"whirl",at:[3,.5],d:0,r:4.6,dir:-1,strength:3.4},{type:"spikes",at:[3,.1],to:[3,.9],side:1},{type:"log",at:[4,.3],d:0,amp:3,period:5,len:4.5},{type:"log",at:[4,.75],d:0,amp:3,period:4.2,phase:.5,len:4},{type:"mine",at:[6,.2],d:0,amp:4,period:6,r:.75},{type:"mine",at:[6,.45],d:-1.5,amp:3.2,period:5,phase:.3,r:.75},{type:"mine",at:[6,.7],d:1.5,amp:3.5,period:5.5,phase:.6,r:.75},{type:"mine",at:[6,.92],d:0,amp:3.5,period:4.6,phase:.15,r:.75},{type:"croc",at:[7,.2],d:-2.8,period:3.8,r:1.1},{type:"croc",at:[7,.5],d:2.8,period:3.8,phase:.33,r:1.1},{type:"croc",at:[7,.8],d:-2.6,period:3.8,phase:.66,r:1.1},{type:"spikes",at:[7,.05],to:[7,.95],side:1},{type:"boost",at:[9,.02],d:0,len:8,w:3,power:3},{type:"spikes",at:[9,.15],to:[9,.9],side:-1,inset:.6},{type:"spikes",at:[9,.2],to:[9,.95],side:1,inset:.6},{type:"mill",at:[10,.3],side:1,speed:.9},{type:"whirl",at:[10,.6],d:1,r:4,dir:1,strength:3},{type:"mill",at:[10,.85],side:-1,speed:-.85,phase:.25},{type:"jaws",at:[11,.35],period:4.2},{type:"jaws",at:[11,.8],period:4.2,phase:.45},{type:"croc",at:[13,.2],d:0,amp:3,period:4,r:1.2},{type:"saw",at:[13,.45],d:0,amp:4.3,period:4.6,r:1.3},{type:"croc",at:[13,.7],d:0,amp:3.2,period:3.6,phase:.5,r:1.2},{type:"saw",at:[13,.92],d:0,amp:4,period:3.8,phase:.3,r:1.3},{type:"spikes",at:[14,.05],to:[14,.95],side:1},{type:"bar",at:[14,.3],period:3.4},{type:"bar",at:[14,.7],period:3,phase:.5},{type:"mine",at:[16,.2],d:0,amp:3.5,period:3.6,r:.8},{type:"croc",at:[16,.45],d:-2.4,period:2.8,r:1.2},{type:"jaws",at:[16,.7],period:4},{type:"mill",at:[16,.9],side:1,speed:1}],theme:{sky:["#f08a6e","#ffe2b8"],fog:"#ffd2a8",fogNear:60,fogFar:240,water:"#3a9c8a",waterEdge:"#7ccaa6",foam:"#eafff4",wall:"#8a6a4a",ledge:"#b0915f",rail:"#7a9e3a",railRing:"#557a24",cliff:["#916f92","#7b5d80","#a483a3","#6d5370"],top:"#6f9a4f",sand:"#c9a874",grass:"#7fae4a",leaf:["#4f8a3a","#6aa548","#3f7530"],trunk:"#5a3f2e",rock:"#6f6a7a",far:"#b98aa8",farTop:"#6f9a4f",trap:"#e08a2a",trapHi:"#f2b35a",spike:"#fff3d6",mine:"#8a4fd0",tower:"#c98a5a",bush:"#5f9a3e",mush:"#c0479a",croc:"#5e9e3e",cloud:"#ffd9c2",flora:{tree0:8,tree1:9,palm:8,bamboo:3,reeds:4,grass:5,bush:9},light:{sky:"#ffe4c8",ground:"#9a7a9a",sun:"#ffc48a",hemiI:1.35,sunI:1.7}}},o1={id:"cascades",name:"Les Cascades Turquoise",short:"Cascades",kind:"coop",players:"1-4",blurb:"Trois cascades vertigineuses dans la jungle, des tourniquets à piques et des crocodiles dans les bassins.",par:[150,210,310],segs:[{len:30,w:12,flow:.6,L:"beach",R:"beach",h:3},{len:14,w:6,flow:2.4,L:"canyon",R:"canyon",h:7},{len:30,turn:20,w:8,flow:2.8},{len:16,dy:-5,flow:5,w:5.8},{len:26,w:8.5,flow:1.6,turn:-20},{len:20,w:6.5},{len:40,turn:30,w:8,flow:2.8,L:"mesa"},{len:16,dy:-6,flow:5.5,w:5.6,L:"canyon",h:9},{len:26,w:9,flow:1.6},{len:20,w:6.5,turn:-20},{len:40,turn:-25,w:6.5,flow:2.8},{len:30,turn:30,R:"mesa"},{len:18,dy:-7,flow:6,w:5.6,R:"canyon",h:10},{len:24,w:9,flow:1.6},{len:40,turn:20,w:8,flow:3,R:"mesa"},{len:30,turn:-30,w:6.5},{len:18,w:6.5},{len:30,turn:10,dy:-3,w:8,flow:3.6,R:"canyon"},{len:28,w:12,flow:.8,L:"beach",R:"beach",h:3}],spawn:[0,.38],start:[1,.7],checkpoints:[[5,.3],[9,.5],[13,.75],[16,.5]],finish:[18,.5],hazards:[{type:"rock",at:[0,.25],d:-8.5,r:1.6},{type:"rock",at:[0,.75],d:8,r:1.4},{type:"turnstile",at:[2,.5],d:0,len:2.8,speed:.9},{type:"spikes",at:[3,.1],to:[3,.9],side:1,inset:.6},{type:"whirl",at:[4,.45],d:1.5,r:4.4,dir:-1,strength:3},{type:"rock",at:[4,.8],d:-4,r:1.3},{type:"turnstile",at:[6,.45],d:0,len:2.8,speed:-1,phase:.25},{type:"spikes",at:[6,.58],to:[6,.7],side:-1},{type:"turnstile",at:[6,.85],d:0,len:2.8,speed:1.1},{type:"spikes",at:[7,.1],to:[7,.9],side:1,inset:.6},{type:"spikes",at:[7,.2],to:[7,.95],side:-1,inset:.6},{type:"mine",at:[8,.35],d:0,amp:4.5,period:5,r:.8},{type:"mine",at:[8,.75],d:1,amp:4,period:4.2,phase:.5,r:.8},{type:"mill",at:[10,.3],side:1,speed:.9},{type:"jaws",at:[10,.75],period:4.4},{type:"croc",at:[11,.25],d:2.6,period:3.4,r:1.15},{type:"log",at:[11,.55],d:0,amp:3,period:4.8,len:4.2},{type:"croc",at:[11,.85],d:-2.6,period:3.4,phase:.5,r:1.15},{type:"boost",at:[12,.02],d:0,len:8,w:3,power:3},{type:"spikes",at:[12,.15],to:[12,.9],side:-1,inset:.6},{type:"turnstile",at:[14,.4],d:0,len:2.8,speed:1.2},{type:"spikes",at:[14,.5],to:[14,.95],side:1},{type:"saw",at:[15,.3],d:0,amp:4,period:4.8,r:1.3},{type:"saw",at:[15,.72],d:0,amp:4,period:4.2,phase:.5,r:1.3},{type:"turnstile",at:[17,.3],d:0,len:2.8,speed:-1.2},{type:"mine",at:[17,.7],d:0,amp:3.4,period:3.6,r:.8}],theme:{sky:["#5ec4f0","#e2f8ff"],fog:"#d6f2ff",fogNear:70,fogFar:260,water:"#1fb4c4",waterEdge:"#7fe6e8",foam:"#ffffff",wall:"#c98a4a",ledge:"#e2ab66",rail:"#86c540",railRing:"#5f9c2a",cliff:["#7fae5a","#6a9a4c","#90c068","#5d8a44"],top:"#7ab84c",sand:"#f0d49a",grass:"#86c540",leaf:["#3f9a3a","#5cb848","#2f7f2f"],trunk:"#7a5236",rock:"#8a8f80",far:"#9ccf7a",farTop:"#5f9c3a",croc:"#4f8f36",bush:"#4f9a3a",flora:{tree0:1,tree1:0,palm:2,bamboo:3,reeds:4,grass:5,bush:6}}},qs="#ff8fb1",Oa="#ffd23f",to="#4fd1c5",Si="#ff9f43",za="#b58cf0",no="#fff1d6",a1={id:"parcours",name:"Le Parcours Pétillant",short:"Parcours",kind:"race",players:"1-4",foot:!0,blurb:"Une course d’obstacles au-dessus du lagon : barres tournantes, plateformes mobiles, marteaux et bumpers. Le premier arrivé gagne !",par:[45,70,120],spawn:[[-4.5,2,3,0],[-1.5,2,3,0],[1.5,2,3,0],[4.5,2,3,0]],finishZ:150,parts:[{type:"box",p:[0,1,4],s:[16,2,10],c:no},{type:"box",p:[0,1,13],s:[10,2,8],c:qs},{type:"disc",p:[0,1,25],r:9,h:2,c:Oa},{type:"sweeper",p:[0,2.6,25],len:8.6,r:.45,speed:1.35,c:za},{type:"box",p:[0,1,37],s:[6,2,6],c:qs},{type:"box",p:[-5,1.5,44],s:[5,1,5],move:[10,0,0],period:4,c:to},{type:"box",p:[5,1.5,51],s:[5,1,5],move:[-10,0,0],period:4.4,phase:.3,c:Si},{type:"box",p:[0,.2,58],s:[5,1,5],move:[0,2.6,0],period:3.2,c:to},{type:"box",p:[0,1,66],s:[10,2,6],c:no},{type:"box",p:[0,1,79],s:[3.4,2,20],c:Oa},{type:"gantry",p:[0,9,79],len:18,w:6},{type:"hammer",p:[0,9,73],len:5.8,r:1,period:2.6,c:qs},{type:"hammer",p:[0,9,79],len:5.8,r:1,period:2.6,phase:.33,c:qs},{type:"hammer",p:[0,9,85],len:5.8,r:1,period:2.6,phase:.66,c:qs},{type:"box",p:[0,1,99],s:[16,2,18],c:no},{type:"bumper",p:[-4,2,94],r:1,h:2.2,c:Si},{type:"bumper",p:[3,2,96],r:1,h:2.2,c:Si},{type:"bumper",p:[-1,2,100],r:1.2,h:2.2,c:Si},{type:"bumper",p:[5,2,102],r:1,h:2.2,c:Si},{type:"bumper",p:[-5,2,104],r:1,h:2.2,c:Si},{type:"bumper",p:[1.5,2,105],r:.9,h:2.2,c:Si},{type:"sweeper",p:[0,2.6,99],len:7.5,r:.4,speed:-1,half:!0,arms:2,c:za},{type:"disc",p:[0,1.2,114],r:4,h:2,spin:.8,c:to},{type:"disc",p:[4,1.6,123],r:3.4,h:2,spin:-1,c:za},{type:"disc",p:[-2,2,132],r:3.4,h:2,spin:1.2,c:to},{type:"box",p:[0,1.6,139.5],s:[5,1.2,4],bounce:15,c:Oa},{type:"box",p:[0,3,149],s:[14,2,12],c:no}],checkpoints:[{p:[0,2,37],s:[6,4,6]},{p:[0,2,66],s:[10,4,6]},{p:[0,2,92],s:[16,4,4]},{p:[0,4,145],s:[14,4,4]}],finish:{p:[0,4,151],s:[14,4,4]},theme:ml.theme},Tf=[];for(let n=0;n<12;n++){const e=n/12*Math.PI*2,t=10;Tf.push({type:"box",p:[Math.cos(e)*t,1,Math.sin(e)*t],s:[5.4,2,4.4],yaw:-e+Math.PI/2,c:n%2?"#ffd23f":"#ff9f43",sink:{start:15,period:14,phase:n*5/12%1,on:.62}})}const c1={id:"tourbillon",name:"Le Grand Tourbillon",short:"Tourbillon",kind:"survival",players:"1-4",foot:!0,blurb:"Restez sur l’arène le plus longtemps possible : les barres accélèrent et le sol s’enfonce. Le dernier debout gagne !",par:[90,60,30],spawn:[[2.5,2,-2.5,0],[2.5,2,2.5,Math.PI],[-2.5,2,2.5,Math.PI],[-2.5,2,-2.5,0]],accel:.006,maxTime:150,parts:[{type:"disc",p:[0,1,0],r:7.4,h:2,c:"#4fd1c5"},...Tf,{type:"sweeper",p:[0,2.6,0],len:12.6,r:.45,speed:.85,phase:0,c:"#b58cf0"},{type:"sweeper",p:[0,3.35,0],len:12.6,r:.45,speed:-.55,half:!0,arms:1,start:30,c:"#ff5d8f"}],checkpoints:[],theme:ml.theme},$s="#eef8ff",Ys="#9fdcf5",io="#4a86d8",vh="#ff8fb1",l1="#b58cf0",_h="#ffd23f",u1={id:"glissade",name:"La Grande Glissade",short:"Glissade",kind:"race",players:"1-4",foot:!0,blurb:"Course sur la glace : ça glisse, ça tourne, ça repousse. Gardez l’équilibre jusqu’à l’arrivée !",par:[50,80,130],spawn:[[-4.5,2,3,0],[-1.5,2,3,0],[1.5,2,3,0],[4.5,2,3,0]],finishZ:154,parts:[{type:"box",p:[0,1,4],s:[16,2,10],c:$s},{type:"box",p:[0,1,15],s:[9,2,12],ice:!0,c:Ys},{type:"box",p:[0,1,28],s:[14,2,3],spin:.6,c:io},{type:"box",p:[0,1.01,28],s:[3,2,14],spin:.6,c:io},{type:"box",p:[0,1,40],s:[8,2,6],c:$s},{type:"box",p:[0,1,52],s:[6,2,14],conveyor:[0,-3],c:l1},{type:"gantry",p:[0,9,52],len:24,w:4.5},{type:"hammer",p:[0,9,48.5],len:5.8,r:.9,period:2.8,axis:"x",c:vh},{type:"hammer",p:[0,9,55.5],len:5.8,r:.9,period:2.8,phase:.5,axis:"x",c:vh},{type:"disc",p:[0,.4,65],r:3,h:2,move:[0,1.6,0],period:3,c:Ys},{type:"disc",p:[-2,.4,72],r:3,h:2,move:[0,1.6,0],period:3,phase:.33,c:Ys},{type:"disc",p:[1,.4,79],r:3,h:2,move:[0,1.6,0],period:3,phase:.66,c:Ys},{type:"box",p:[0,1,89],s:[10,2,6],c:$s},{type:"box",p:[0,1,104],s:[4.5,2,24],ice:!0,c:Ys},{type:"sweeper",p:[0,2.6,99],len:3.4,r:.4,speed:2,c:_h},{type:"sweeper",p:[0,2.6,109],len:3.4,r:.4,speed:-2.2,phase:.25,c:_h},{type:"box",p:[0,1,120],s:[10,2,6],c:$s},{type:"box",p:[-5,1.5,128],s:[5,1,5],move:[10,0,0],period:3.6,c:io},{type:"box",p:[5,1.5,135],s:[5,1,5],move:[-10,0,0],period:4,phase:.4,c:io},{type:"box",p:[0,1,148],s:[14,2,14],c:$s}],checkpoints:[{p:[0,2,40],s:[8,4,6]},{p:[0,2,89],s:[10,4,6]},{p:[0,2,120],s:[10,4,6]}],finish:{p:[0,2,152],s:[14,4,4]},theme:gl.theme},h1=[[1,1],[-1,1],[-1,-1],[1,-1]].map(([n,e],t)=>({type:"box",p:[n*9,1,e*9],s:[6,2,6],ice:!0,c:"#c4ecfb",sink:{start:22+t*8,period:40,on:.08}})),f1={id:"patinoire",name:"La Patinoire Folle",short:"Patinoire",kind:"survival",players:"1-4",foot:!0,blurb:"Une patinoire glissante, des bumpers qui foncent et des coins qui fondent : tenez le plus longtemps possible !",par:[100,70,35],spawn:[[3,2,-3,0],[3,2,3,Math.PI],[-3,2,3,Math.PI],[-3,2,-3,0]],accel:.004,maxTime:150,parts:[{type:"box",p:[0,1,0],s:[12,2,24],ice:!0,c:"#9fdcf5"},{type:"box",p:[0,1.005,0],s:[24,2,12],ice:!0,c:"#9fdcf5"},...h1,{type:"bumper",p:[-10,2,0],r:1.2,h:2.2,move:[20,0,0],period:7,c:"#ff9f43"},{type:"bumper",p:[0,2,-10],r:1.2,h:2.2,move:[0,0,20],period:8,phase:.5,c:"#ff9f43"},{type:"sweeper",p:[0,2.6,0],len:12,r:.45,speed:.7,half:!0,arms:2,start:12,c:"#b58cf0"}],checkpoints:[],theme:gl.theme};function d1(n){const e=[];let t=0;for(const r of n.segs)e.push(t),t+=r.len;const i=r=>Array.isArray(r)?e[r[0]]+r[1]*n.segs[r[0]].len:r,s={...n,spawn:i(n.spawn),start:i(n.start),finish:i(n.finish),checkpoints:n.checkpoints.map(i)};return s.hazards=n.hazards.map(({at:r,to:o,...a})=>({...a,s:r!=null?i(r):a.s,...o!=null?{s1:i(o)}:{}})),s}function p1(n){if(!n.par){const e=n.finish/575;n.par=[150,210,300].map(t=>Math.round(t*e/5)*5)}return n}const so=[ml,gl,r1,o1].map(d1).map(p1),vl=[so[0],a1,so[1],c1,so[2],u1,so[3],f1],Dn=Object.fromEntries(vl.map(n=>[n.id,n])),Bc=["lagon","parcours","glacier","tourbillon","marais","glissade"],xh="pouf.v1.",Hc="pouf.v1.board",_l=(n,e)=>{try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},Rf=(n,e)=>{try{localStorage.setItem(n,JSON.stringify(e))}catch{}},Ba=n=>160+n*90;function Jn(n){let e=1;for(;n>=Ba(e);)n-=Ba(e),e++;return{level:e,into:n,need:Ba(e)}}const js=120;function m1(n){const e=_l(xh+n.id,null)||{},t={id:n.id,name:n.psn||"Joueur",look:{...g1(n.id),...e.look||{}},xp:e.xp||0,coins:e.coins??50,bought:e.bought||[],stats:{runs:0,finishes:0,pops:0,puffSec:0,supers:0,cps:0,...e.stats||{}},best:e.best||{},settings:{aim:"push",invert:!1,camSpeed:1,...e.settings||{}},tutorial:!!e.tutorial};return t.save=()=>Rf(xh+n.id,{look:t.look,xp:t.xp,coins:t.coins,bought:t.bought,stats:t.stats,best:t.best,settings:t.settings,tutorial:t.tutorial}),t.level=()=>Jn(t.xp).level,t.owns=(i,s)=>!s.lvl||t.level()>=s.lvl||t.bought.includes(i+":"+s.id),t}function g1(n){const e=Math.abs(v1(n));return{...fl(e%4),hat:["none","cap","party","flower"][(e>>3)%4]}}const v1=n=>{let e=0;for(const t of String(n))e=e*31+t.charCodeAt(0)|0;return e},Cf={species:Ni,hat:_f,extra:xf,gas:So,emote:Kn,color:hl.map(n=>({id:n,name:n}))};function xl(n,e,t){if(n.kind==="survival"){const[r,o,a]=n.par;return e>=r?3:e>=o?2:e>=a?1:0}if(!t)return 0;const[i,s]=n.par;return e<=i?3:e<=s?2:1}function _1(n,e){const t=n.riders.find(r=>r.id===e);if(!t)return null;const i=n.kind==="survival",s=i?t.out??t.time??n.time:t.time;return{mine:t,value:s,finished:i?!0:t.time!=null,survival:i}}function x1(n,e,t){const i=Dn[e.course];if(i.foot)return y1(n,e,t,i);const s=e.riders.find(d=>d.id===t),r=xl(i,e.time,e.finished),o=Jn(n.xp).level;let a=40+e.cps*25+(e.finished?120:0)+r*40+(e.riders.length>1?30:0);e.finished&&e.deaths===0&&(a+=60);const l=Math.round(a/4);n.xp+=a,n.coins+=l;const u=n.stats;u.runs++,e.finished&&u.finishes++,u.pops+=e.deaths,u.cps+=e.cps,s&&(u.puffSec+=s.puff,u.supers+=s.supers);let c=!1;if(e.finished){const d=n.best[i.id];!d||e.time<d.time?(n.best[i.id]={time:e.time,deaths:e.deaths,stars:r,at:Date.now()},c=!0):r>d.stars&&(d.stars=r),Pf(i.id,{time:e.time,deaths:e.deaths,stars:r,names:e.riders.map(h=>h.name),at:Date.now()})}n.save();const p=Jn(n.xp).level,m=[];if(p>o)for(const[d,h]of Object.entries(Cf))for(const v of h)v.lvl&&v.lvl>o&&v.lvl<=p&&m.push({kind:d,...v});return{xp:a,coins:l,stars:r,record:c,levelUp:p>o?p:0,unlocked:m}}function y1(n,e,t,i){const s=_1(e,t),r=Jn(n.xp).level,o=e.riders.length,a=s.finished?xl(i,s.value,!0):0;let l=40+a*35+(s.finished?60:0)+(o>1?[90,55,30,15][s.mine.rank-1]||10:0);s.survival&&(l+=Math.round(s.value));const u=Math.round(l/4);n.xp+=l,n.coins+=u,n.stats.runs++,s.finished&&n.stats.finishes++,s.mine.rank===1&&o>1&&(n.stats.wins=(n.stats.wins||0)+1);let c=!1;if(s.finished&&s.value!=null){const d=n.best[i.id];!d||(s.survival?s.value>d.time:s.value<d.time)?(n.best[i.id]={time:s.value,deaths:0,stars:a,at:Date.now()},c=!0):a>d.stars&&(d.stars=a),Pf(i.id,{time:s.value,deaths:0,stars:a,names:[s.mine.name],at:Date.now()},s.survival)}n.save();const p=Jn(n.xp).level,m=[];if(p>r)for(const[d,h]of Object.entries(Cf))for(const v of h)v.lvl&&v.lvl>r&&v.lvl<=p&&m.push({kind:d,...v});return{xp:l,coins:u,stars:a,record:c,levelUp:p>r?p:0,unlocked:m,rank:s.mine.rank}}function M1(n){const e={},t=Dn[n.course];if(n.kind==="race"||n.kind==="survival")n.riders.forEach(i=>{e[i.id]=n.kind==="race"&&i.time==null?1:[10,7,5,3][i.rank-1]||2});else{const i=[1,4,6,8][xl(t,n.time,n.finished)],s=n.riders.slice().sort((r,o)=>o.puff-r.puff)[0];n.riders.forEach(r=>{e[r.id]=i+(r===s&&n.riders.length>1?2:0)})}return e}function S1(n){return _l(Hc,{})[n]||[]}function Pf(n,e,t=!1){const i=_l(Hc,{}),s=i[n]||[];s.some(r=>Math.abs(r.time-e.time)<.01&&r.names.join()===e.names.join())||s.push(e),s.sort((r,o)=>t?o.time-r.time:r.time-o.time),i[n]=s.slice(0,10),Rf(Hc,i)}const yl=["ps","xbox","nintendo","generic"],yh=["Orientez le stick vers où la bouée doit aller, puis faites POUF !","Trois coups de piques et la bouée éclate : retour au dernier checkpoint.","Le SUPER POUF coûte beaucoup de gaz mais sauve des situations désespérées.","Deux joueurs du même côté poussent ensemble : coordonnez-vous !","Les mâchoires se referment en rythme : comptez avant de passer.","Vos amis peuvent vous rejoindre à tout moment avec le code du salon."],b1=()=>yh[Math.floor(Math.random()*yh.length)];function Ml(n=!1){return R(`div.pf-logo${n?".small":""}`,R("span.l1","POUF"),R("span.l2","PARTY"),R("i.cloud"),R("i.cloud.c2"),R("i.cloud.c3"))}const Ze=(n,e,{primary:t=!1,cls:i="",ic:s=null,key:r=null,disabled:o=!1}={})=>R(`button.pf-btn${t?".primary":""}${i?"."+i:""}`,{f:!0,onok:()=>{Ve.ui("ok"),e()},"data-key":r,disabled:o},s&&R("span.icw",{html:Ha(s)}),R("span",n));function an(n,e,t,i={}){const r={root:R(`div.pf-${e}`,t),hints:i.hints||[["ok","Sélectionner"],["back","Retour"]],cls:e,...i};return r.back??(r.back=()=>n.close(r)),n.push(r)}function ss(n){for(const e of n.layers)e.refresh?.()}function Mh(n){const e=n.profile,t=Jn(e.xp),i=dr(n.me.look.species);return R("div.pf-card.me",R("div.pf-av",{style:{background:n.me.look.color}},i.name[0]),R("div",R("div.nm",n.me.name),R("div.lv",`Niveau ${t.level}`),R("div.xp",R("i",{style:{width:t.into/t.need*100+"%"}}))),R("div.coins",R("b","●"),e.coins))}function w1(n){const e=R("div.pf-list",Ze("Jouer",()=>n.enterLobby(),{primary:!0,ic:"play",key:"play"}),Ze("Rejoindre une partie",()=>R1(n),{ic:"userPlus",key:"join"}),Ze("Personnaliser",()=>Gc(n),{ic:"sparkle",key:"custom"}),Ze("Épreuves et records",()=>If(n),{ic:"trophy",key:"courses"}),Ze("Options",()=>Df(n),{ic:"settings",key:"options"}),Ze("Comment jouer",()=>bl(n),{ic:"info",key:"help"}),Ze("Quitter le jeu",()=>Vc(n),{ic:"power",key:"quit"})),t=R("div.pf-me-slot",{title:"Personnaliser mon personnage",onclick:()=>{Ti.top===i&&(Ve.ui("ok"),Gc(n))}},Mh(n)),i=an(n,"title",[R("div.pf-title-l",Ml(),R("div.pf-tag-line","La descente de rivière la plus gonflée du lagon !"),e),t],{back:()=>Vc(n),hints:[["ok","Sélectionner"],["back","Quitter"]]});return i.refresh=()=>t.replaceChildren(Mh(n)),i.onResume=()=>i.refresh(),n.state="title",n.syncCamera(),i}function Vc(n){ms("Quitter Pouf Party ?",n.lobby.members.length>1?"Vous quitterez la partie en cours et vos amis continueront sans vous.":"Vous retournerez à l’écran d’accueil de la console.","Quitter",()=>n.exit(),{danger:!0})}function Sh(n,e){return n.closeAll(),an(n,"connect",R("div.pf-panel.small",R("div.pf-spin",R("i"),R("i"),R("i")),R("p",e),Ze("Annuler",()=>n.leaveLobby(),{key:"cancel"})),{back:()=>n.leaveLobby()})}function bh(n,e,t){Xc({title:e,body:t,actions:[{label:"OK",primary:!0}]})}function E1(n){const{lobby:e}=n,t=R("div.pf-players"),i=R("div.pf-spect"),s=R("b"),r=R("span.st"),o=R("div.pf-course"),a=Ze("",()=>{if(e.isHost)n.canStart()?n.startMatch():(Ve.ui(),n.toast("Tout le monde n’est pas prêt","Attendez que vos amis appuient sur « Prêt »","error"));else{const p=e.members.find(m=>m.id===n.me.id);e.setReady(!p?.ready)}},{primary:!0,ic:"play",key:"start"});a.dataset.autofocus="";const l=Ze("Changer d’épreuve",()=>If(n,{pick:!0}),{ic:"grid",key:"course"}),u=Ze("",()=>n.setTourMode(!n.tourMode),{ic:"trophy",key:"mode"}),c=an(n,"lobby",[R("div.pf-lobby-top",Ml(!0),R("div.pf-code",R("span","CODE"),s),r),R("div.pf-lobby-l",R("div.pf-panel",R("h3","Joueurs"),t,i)),R("div.pf-lobby-r",R("div.pf-panel",R("h3","Épreuve"),o,R("div.pf-lobby-acts",l,u))),R("div.pf-lobby-b",a,Ze("Inviter des amis",()=>T1(n),{ic:"userPlus",key:"invite"}),Ze("Personnaliser",()=>Gc(n),{ic:"sparkle",key:"custom"}),Ze("Quitter le salon",()=>ms("Quitter le salon ?",e.isHost&&e.members.length>1?"Un autre joueur deviendra l’hôte.":"Vous retournerez au menu principal.","Quitter",()=>n.leaveLobby(),{danger:!0}),{ic:"close",key:"leave"}))],{back:()=>ms("Quitter le salon ?","Vous retournerez au menu principal.","Quitter",()=>n.leaveLobby(),{danger:!0}),hints:()=>[["ok","Sélectionner"],["back","Quitter le salon"]]});return c.refresh=()=>{s.textContent=e.code||"—",r.textContent=e.online?e.isHost?"Vous êtes l’hôte · en ligne":"Connecté à l’hôte":e.role==="local"?"Hors ligne · partie solo":"Reconnexion…",r.classList.toggle("off",!e.online);const p=e.members.length?e.members:[{...n.me,host:!0,ready:!0}];t.replaceChildren(...Array.from({length:Ao},(f,g)=>{const x=p[g];if(!x)return R("div.pf-player.empty",R("div.pf-av"),R("div.nm","Place libre"),R("div.badge","Invitez un ami"));const y=x.id===n.me.id?n.me.look:x.look;return R(`div.pf-player${x.id===n.me.id?".me":""}${x.online===!1?".away":""}`,R("div.pf-av",{style:{background:y?.color}},dr(y?.species).name[0]),R("div.nm",x.name,x.id===n.me.id?R("small"," (vous)"):null),R(`div.badge${x.host?".host":x.ready?".ready":""}`,x.online===!1?"Reconnexion…":x.host?"Hôte":x.ready?"Prêt":"Pas prêt"))}));const m=p.slice(Ao);i.replaceChildren(...m.length?[R("small",`Spectateurs : ${m.map(f=>f.name).join(", ")}`)]:[]);const d=n.course,h=n.profile.best[d.id];n.tourMode?o.replaceChildren(R("div.cn","Tournoi Pouf Party"),R("p",`${Bc.length} épreuves à la suite : chaque épreuve rapporte des points, le meilleur total gagne.`),R("ol.pf-tourlist",Bc.map(f=>R("li",Dn[f].name," ",R(`span.kind.${Dn[f].kind}`,Sl[Dn[f].kind]))))):o.replaceChildren(R("div.cn",d.name),R("p",d.blurb),A1(d),R("div.best",Lf(d,h))),l.classList.toggle("hidden",!e.isHost||n.tourMode),u.classList.toggle("hidden",!e.isHost),u.lastChild.textContent=n.tourMode?"Épreuve unique":"Mode tournoi";const v=e.members.find(f=>f.id===n.me.id);a.lastChild.textContent=e.isHost?e.members.length>1?"Lancer la partie":"Jouer en solo":v?.ready?"Prêt ! (annuler)":"Je suis prêt",a.classList.toggle("waiting",e.isHost&&!n.canStart()),Ti.top===c&&c.focused&&!c.focused.isConnected&&Ti.focusFirst(c),Vf()},c.onResume=()=>{n.state="lobby",n.syncCamera(),c.refresh()},n.state="lobby",n.syncCamera(),c.refresh(),c}const ko=n=>R("span.pf-stars",[1,2,3].map(e=>R(`i${e<=n?".on":""}`,"★"))),Sl={coop:"Coopération",race:"Course",survival:"Survie"},mo=n=>n===1?"1er":`${n}e`;function A1(n){return R("div.meta",R("span",Sl[n.kind]),R("span",`${n.players} joueurs`),n.kind==="survival"?R("span","Le dernier debout gagne"):R("span",`${n.checkpoints.length} checkpoints`))}function Lf(n,e,t="Record"){return e?[ko(e.stars),n.kind==="survival"?` ${t} : tenu ${En(e.time)}`:` ${t} : ${En(e.time)}`]:n.kind==="survival"?"Aucun record : tenez le plus longtemps possible":"Aucun record pour le moment"}function T1(n){const{lobby:e}=n,t=n.shareLink(),i=R("div.pf-friends"),s=async()=>{const a=`Viens jouer à Pouf Party avec moi ! Code ${e.code}`;try{if(navigator.share){await navigator.share({title:"Pouf Party",text:a,url:t});return}}catch(l){if(l?.name==="AbortError")return}try{await navigator.clipboard.writeText(t),n.toast("Lien copié",`Envoyez-le à vos amis · code ${e.code}`)}catch{Xc({title:`Code de la partie : ${e.code}`,body:R("div","Envoyez ce lien à vos amis :",R("div.salon-link",t)),actions:[{label:"OK",primary:!0}]})}},r=()=>{const a=(Mn.friends||[]).filter(l=>Mn.presenceOf(l.id).online);if(!Mn.available||!a.length){i.replaceChildren(R("p.dim",Mn.party?"Les membres de votre groupe arrivent automatiquement dans ce salon quand ils lancent Pouf Party.":"Partagez le code ou le lien : vos amis l’ouvrent sur leur console et arrivent directement ici."));return}i.replaceChildren(R("h4","Amis en ligne"),...a.map(l=>R("div.pf-friend",{f:!0,onok:async()=>{try{Mn.party||await Mn.createParty(),Mn.startGame("pouf-party"),await Mn.invite(l.id),n.toast("Invitation envoyée",l.psn);const u=n.partyCode();u&&e.isHost&&n.moveLobby(u)}catch(u){n.toast("Invitation impossible",u.message,"error")}}},R("div.pf-av",l.psn[0]),R("div.nm",l.psn),R("span.badge","Inviter"))))},o=an(n,"invite",R("div.pf-panel.mid",R("h2","Inviter des amis"),R("div.pf-bigcode",e.code||"—"),R("p.dim","Vos amis choisissent « Rejoindre une partie » dans Pouf Party et saisissent ce code, ou ouvrent le lien."),R("div.salon-link",t),R("div.row",Ze("Partager le lien",s,{primary:!0,ic:"userPlus",key:"share"}),Ze("Fermer",()=>n.close(o),{key:"close"})),i));return r(),o}function R1(n){const e=R("input.f-input.pf-codein",{type:"text",maxLength:6,autocapitalize:"characters",autocorrect:"off",spellcheck:!1,enterkeyhint:"go",placeholder:"EX : K7P2Q","aria-label":"Code de la partie"}),t=r=>{n.close(s),n.joinCode(r)};e.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),r.stopPropagation(),e.blur(),t(e.value))});const i=R("div.f-row",{f:!0,"data-autofocus":"",onok:()=>{yl.includes(Ht.device)?Wf({title:"Code de la partie (5) ou du salon (6)",maxLength:6,onDone:r=>t(r)}):e.focus()}},R("label.f-label","Code de la partie de votre ami"),e),s=an(n,"join",R("div.pf-panel.mid",R("h2","Rejoindre une partie"),R("p.dim","Le code à 5 caractères affiché dans la partie de votre ami, ou le code à 6 caractères de son salon. Fonctionne entre Safari et l’app de l’écran d’accueil."),i,R("div.row",Ze("Rejoindre",()=>t(e.value),{primary:!0,ic:"play",key:"go"}),Ze("Annuler",()=>n.close(s),{key:"cancel"}))));return s}function Gc(n){const e=n.profile,t={...n.me.look},i=R("div.pf-custom-head"),s=[],r=[["species","Personnage",Ni,d=>`${d.name} · ${d.kind}`],["color","Couleur",hl.map(d=>({id:d,name:d})),null],["hat","Chapeau",_f,d=>d.name],["extra","Accessoire",xf,d=>d.name],["gas","Gaz",So,d=>d.name]],o=()=>{n.setLook({...t}),a()},a=()=>{n.arena.cam.mode="closeup",n.arena.cam.focusId=n.me.id};for(const[d,h,v,f]of r){const g=R("div.val"),x=R("div.lock"),y=()=>Math.max(0,v.findIndex(T=>T.id===t[d]));let M=y();const w=()=>{const T=v[M],D=e.owns(d,T);g.replaceChildren(...[d==="color"?R("i.swatch",{style:{background:T.id}}):d==="gas"?R("i.swatch",{style:{background:`linear-gradient(90deg, ${T.c.join(",")})`}}):null,f?R("span",f(T)):null].filter(Boolean)),x.textContent=D?t[d]===T.id?"Équipé":"Appuyez pour équiper":`Niveau ${T.lvl} · ou ${js} pièces`,_.classList.toggle("locked",!D)},b=T=>{M=(M+T+v.length)%v.length;const D=v[M];e.owns(d,D)&&(t[d]=D.id,d==="species"&&(t.color=D.main),o(),l()),w(),Ve.ui()},_=R("div.pf-crow",{f:!0,onok:()=>{const T=v[M];if(e.owns(d,T)){t[d]=T.id,o(),l();return}if(e.coins<js){Ve.sputter(),n.toast("Pas assez de pièces",`Il faut ${js} pièces ou le niveau ${T.lvl}`,"error");return}ms("Débloquer cet objet ?",`${f?f(T):T.name} pour ${js} pièces (vous en avez ${e.coins}).`,"Débloquer",()=>{e.coins-=js,e.bought.push(d+":"+T.id),e.save(),t[d]=T.id,o(),l(),u(),Ve.fanfare()})}},R("div.lab",h),R("button.arr",{type:"button",onclick:T=>{T.stopPropagation(),b(-1)}},"‹"),g,R("button.arr",{type:"button",onclick:T=>{T.stopPropagation(),b(1)}},"›"),x);_.adjust=b,_.sync=()=>{M=y(),w()},s.push(_)}const l=()=>s.forEach(d=>d.sync()),u=()=>{const d=Jn(e.xp);i.replaceChildren(R("div",`Niveau ${d.level}`,R("small",` · ${d.into} / ${d.need} XP`)),R("div.coins",R("b","●"),`${e.coins} pièces`))};u(),l();const c=R("div.pf-emotes",Kn.map((d,h)=>R(`div.emo${e.level()>=(d.lvl||0)?"":".locked"}`,R("b",d.icon),R("span",d.name),R("small",e.level()>=(d.lvl||0)?`Touche ${h+1}`:`Niveau ${d.lvl}`)))),p=n.state,m=an(n,"custom",R("div.pf-panel.side",R("h2","Personnaliser"),i,...s,R("h4","Emotes"),c,Ze("Terminé",()=>m.back(),{primary:!0,key:"done"})),{hints:[["ok","Équiper / débloquer"],["back","Terminé"]],onAction:d=>wh(m,d),onEnter:a,onLeave:()=>{n.arena.cam.mode="orbit",n.state=p,n.syncCamera()}});return m}function If(n,{pick:e=!1}={}){const t=vl.map(s=>{const r=n.profile.best[s.id],o=S1(s.id).slice(0,5),a=s.kind==="survival"?`Objectif ★★★ : tenir ${En(s.par[0])}`:`Objectif ★★★ : ${En(s.par[0])}`;return R(`div.pf-ccard${n.course.id===s.id?".sel":""}`,{f:!0,onok:()=>{e&&n.lobby.isHost&&(n.setCourse(s),n.close(i))}},R("div.cn",s.name," ",R(`span.kind.${s.kind}`,Sl[s.kind])),R("p",s.blurb),R("div.meta",R("span",`${s.players} joueurs`),R("span",a)),R("div.best",Lf(s,r,"Votre record")),R("h4","Records de la console"),o.length?R("ol.pf-board",o.map(l=>R("li",R("b",En(l.time)),ko(l.stars),R("span",l.names.join(", ")),s.kind==="coop"?R("small",`${l.deaths} 💥`):null))):R("p.dim","Aucun record : soyez les premiers !"))}),i=an(n,"courses",R("div.pf-panel.wide",R("h2",e?"Choisir l’épreuve":"Épreuves et records"),R("div.pf-ccards",{"data-scroll":"y","data-row":""},t),Ze("Retour",()=>n.close(i),{key:"back"})));return i}function Df(n){const e=n.settings,t=(s,r,o,a,l)=>{const u=R("span"),c=()=>{u.textContent=(a.find(d=>d[0]===o())||a[0])[1]},p=d=>{let h=a.findIndex(v=>v[0]===o());h=(h+d+a.length)%a.length,l(a[h][0]),c(),n.profile.save(),Ve.ui()},m=R("div.set-item",{f:!0,onok:()=>p(1)},R("div.sl",R("div.st",s),R("div.sd",r)),R("div.sv.cycle",R("span.icw",{html:Ha("chevron","l")}),u,R("span.icw",{html:Ha("chevron")})));return m.adjust=p,c(),m},i=an(n,"options",R("div.pf-panel.mid.opts",R("h2","Options"),t("Visée","Ce que fait le stick pendant la descente",()=>e.aim,[["push","Pousser la bouée vers le stick"],["seat","Se placer vers le stick"]],s=>{e.aim=s}),t("Sensibilité de la caméra","Souris, stick droit et glisser",()=>e.camSpeed,[[.5,"Lente"],[1,"Normale"],[1.6,"Rapide"]],s=>{e.camSpeed=s}),Gf("Effets sonores","Poufs, plouf et compagnie","sfxVol",()=>Ve.applySettings()),Ze("Journal des dégâts",()=>P1(),{ic:"info",key:"damage"}),Ze("Retour",()=>n.close(i),{key:"back"})),{hints:[["ok","Changer"],["back","Retour"]],onAction:s=>wh(i,s)});return i}const C1={hit:"Coup sur la bouée",pop:"Bouée éclatée",knock:"Renversé"};function P1(){const n=i=>new Date(i).toLocaleTimeString("fr-FR"),e=i=>i?i.s!=null?`rivière ${i.s.toFixed(1)} m, écart ${i.d.toFixed(1)} m`:`x ${i.x} · y ${i.y} · z ${i.z}`:"",t=or.map(i=>R("div.trophy-item",R("div",R("div.tn",`${C1[i.event]||i.event} · ${i.entity}`),R("div.td",[i.course,e(i.pos),i.t!=null?`t = ${i.t.toFixed(2)} s`:"",i.event==="hit"?`air restant ${i.air}`:"",i.from].filter(Boolean).join(" · "))),R("div.tr",n(i.wall))));Xc({title:"Journal des dégâts",wide:!0,body:R("div.trophy-list",t.length?t:R("div","Aucun dégât depuis le lancement du jeu.")),actions:[{label:"Fermer",primary:!0,sound:"back"}]})}function bl(n,{first:e=!1}={}){if(n.course.foot)return I1(n,e);const t=yl.includes(Ht.device),s=Ht.device==="touch"?[["Joystick (à gauche)","Viser"],["POUF (maintenir)","Pousser la bouée"],["SUPER","Grosse poussée"],["😀","Emotes"],["Glisser l’écran","Tourner la caméra"]]:t?[[L1("Stick gauche"),"Viser"],[Ln("ok"),"Pouf (maintenir) · aussi R2"],[Ln("square"),"Super pouf · aussi R1"],["Stick droit","Caméra"],["Croix ↑ ↓, ○, L1","Emotes"],[Ln("triangle"),"Réapparaître (maintenir)"],[Ln("options"),"Pause"]]:[["ZQSD / WASD / flèches","Viser"],["Espace / clic gauche","Pouf (maintenir)"],["Maj / E / clic droit","Super pouf"],["Souris (cliquer pour la capturer)","Caméra"],["1 à 6","Emotes"],["R (maintenir)","Réapparaître"],["Échap","Pause"]],r=an(n,"help",R("div.pf-panel.mid",R("h2",e?"Avant de plonger…":"Comment jouer"),R("div.pf-rules",R("div",R("b","1"),"Chaque joueur se tient au bord de la bouée. Son POUF pousse la bouée à l’opposé."),R("div",R("b","2"),"Orientez le stick vers où vous voulez aller : votre personnage court de l’autre côté."),R("div",R("b","3"),"Évitez les piques, mâchoires, mines et moulins : au 3ᵉ coup, la bouée éclate et tout le monde repart du dernier checkpoint."),R("div",R("b","4"),"Le gaz se recharge quand vous ne poussez pas. Coopérez pour aller vite !")),R("div.pf-keys-table",s.map(([o,a])=>R("div",R("span.k",o),R("span",a)))),Ze(e?"C’est parti !":"Retour",()=>n.close(r),{primary:!0,key:"back"})),{onLeave:()=>{n.state==="match"&&n.resumeRun()}});return n.state==="match"&&n.input.setPlaying(!1),r}const L1=n=>R("span",n);function I1(n,e){const t=yl.includes(Ht.device),i=Ht.device==="touch",s=n.course.kind==="race",r=i?[["Joystick (à gauche)","Courir"],["POUF","Sauter"],["SUPER","Pouf en l’air (élan)"],["Glisser l’écran","Caméra"]]:t?[["Stick gauche","Courir"],[Ln("ok"),"Sauter"],[Ln("square"),"Pouf en l’air (élan)"],["Stick droit","Caméra"],...s?[[Ln("triangle"),"Revenir au checkpoint (maintenir)"]]:[],[Ln("options"),"Pause"]]:[["ZQSD / WASD / flèches","Courir"],["Espace / clic gauche","Sauter"],["Maj / E / clic droit","Pouf en l’air (élan)"],["Souris","Caméra"],...s?[["R (maintenir)","Revenir au checkpoint"]]:[],["Échap","Pause"]],o=an(n,"help",R("div.pf-panel.mid",R("h2",e?"À vos marques…":"Comment jouer"),R("div.pf-rules",s?[R("div",R("b","1"),"Courez jusqu’à l’arrivée : le premier arrivé gagne."),R("div",R("b","2"),"Sautez par-dessus les barres, évitez marteaux et bumpers, attendez les plateformes mobiles."),R("div",R("b","3"),"En l’air, un POUF vous donne un deuxième élan (il consomme la jauge)."),R("div",R("b","4"),"Tombé à l’eau ? Vous repartez du dernier checkpoint.")]:[R("div",R("b","1"),"Restez sur l’arène : tomber à l’eau vous élimine."),R("div",R("b","2"),"Sautez par-dessus la barre qui tourne de plus en plus vite."),R("div",R("b","3"),"Le sol s’enfonce par endroits : il tremble juste avant."),R("div",R("b","4"),"Le dernier debout gagne. En solo, tenez le plus longtemps possible !")]),R("div.pf-keys-table",r.map(([a,l])=>R("div",R("span.k",a),R("span",l)))),Ze(e?"C’est parti !":"Retour",()=>n.close(o),{primary:!0,key:"back"})),{onLeave:()=>{n.state==="match"&&n.resumeRun()}});return n.state==="match"&&n.input.setPlaying(!1),o}function D1(n){const e=n.lobby.isHost,t=an(n,"pause",R("div.pf-panel.small",R("h2","Pause"),n.paused?R("p.dim","La partie est en pause."):R("p.dim","La partie continue pour vos amis !"),R("div.pf-list",Ze("Reprendre",()=>t.back(),{primary:!0,ic:"play",key:"resume"}),Ze("Comment jouer",()=>bl(n),{ic:"info",key:"help"}),Ze("Options",()=>Df(n),{ic:"settings",key:"options"}),e?Ze(n.lobby.members.length>1?"Arrêter et revenir au salon":"Revenir au salon",()=>ms("Revenir au salon ?","La descente en cours sera abandonnée pour tout le monde.","Revenir au salon",()=>{n.lobby.broadcast({t:"abort"}),n.abortMatch()}),{ic:"party",key:"lobby"}):Ze("Quitter la partie",()=>ms("Quitter la partie ?","Vos amis continueront sans vous.","Quitter",()=>n.leaveLobby(),{danger:!0}),{ic:"close",key:"leave"}),Ze("Quitter le jeu",()=>Vc(n),{ic:"power",key:"quit"}))),{hints:[["ok","Sélectionner"],["back","Reprendre"]],back:()=>{n.close(t)},onAction:i=>{if(i==="options")return t.back(),!0},onLeave:()=>n.resumeRun()});return t}function U1(n){const e=n.summary,t=n.rewards,i=Dn[e.course];if(i.foot)return N1(n,e,t,i);const s=t?.stars??0,r=F1(e),o=R("div.pf-results-crew",e.riders.map(p=>R("div.pf-rrow",R("div.pf-av",{style:{background:p.look?.color}},dr(p.look?.species).name[0]),R("div.nm",p.name),R("div.ttl",r.get(p.id)||""),R("div.st",`${p.puff.toFixed(1)} s de pouf · ${p.supers} super`)))),a=Jn(n.profile.xp),l=t?R("div.pf-rewards",R("div.rw",R("b",`+${t.xp}`)," XP"),R("div.rw",R("b",`+${t.coins}`)," pièces"),R("div.lvl",`Niveau ${a.level}`,R("div.xp",R("i",{style:{width:a.into/a.need*100+"%"}}))),t.record?R("div.rec","Nouveau record personnel !"):null,t.levelUp?R("div.rec",`Niveau ${t.levelUp} atteint !`):null,t.unlocked.length?R("div.unl","Débloqué : ",t.unlocked.map(p=>p.name||p.id).join(", ")):null):R("p.dim","Vous regardiez cette descente : rejoignez la prochaine !"),u=n.lobby.isHost,c=an(n,"results",R("div.pf-panel.wide.results",R("div.pf-res-head",R("h2",e.finished?"ARRIVÉE !":"Partie terminée"),ko(s)),R("div.pf-res-big",R("div",R("small","Temps"),R("b",En(e.time))),R("div",R("small","Éclatements"),R("b",String(e.deaths))),R("div",R("small","Checkpoints"),R("b",`${e.cps}/${i.checkpoints.length}`))),o,l,Uf(n,e),R("div.row",e.tour?Nf(n,e):u?[Ze("Rejouer",()=>{n.close(c),n.startMatch()},{primary:!0,ic:"refresh",key:"again"}),Ze("Retour au salon",()=>{n.state="lobby",n.openBase()},{key:"lobby"})]:[Ze("Retour au salon",()=>{n.state="lobby",n.openBase()},{primary:!0,key:"lobby"}),R("span.dim","L’hôte choisit la suite…")])),{back:()=>{n.state="lobby",n.openBase()},hints:[["ok","Sélectionner"],["back","Salon"]]});for(let p=0;p<2;p++)setTimeout(()=>n.arena.fx.confetti(n.arena.rs.x,n.arena.rs.y+5,n.arena.rs.z,70,5),200+p*500);return c}function N1(n,e,t,i){const s=i.kind==="survival",r=e.riders.find(h=>h.id===n.me.id),o=r?e.riders.length>1?r.rank===1?"VICTOIRE !":`${mo(r.rank)} place`:s?"Bien tenu !":r.time!=null?"ARRIVÉE !":"Partie terminée":"Partie terminée",a=h=>s?`Tenu ${En(h.out??h.time??e.time)}`:h.time!=null?En(h.time):"Pas arrivé",l=R("div.pf-results-crew",e.riders.map(h=>R(`div.pf-rrow${h.rank===1?".first":""}`,R("div.rk",mo(h.rank)),R("div.nm",h.name,h.id===n.me.id?R("small"," (vous)"):null),R("div.ttl",h.rank===1&&e.riders.length>1?s?"Dernier debout":"Champion":""),R("div.st",`${a(h)} · ${h.puffs} pouf${h.puffs>1?"s":""}`)))),u=Jn(n.profile.xp),c=t?R("div.pf-rewards",R("div.rw",R("b",`+${t.xp}`)," XP"),R("div.rw",R("b",`+${t.coins}`)," pièces"),R("div.lvl",`Niveau ${u.level}`,R("div.xp",R("i",{style:{width:u.into/u.need*100+"%"}}))),t.record?R("div.rec","Nouveau record personnel !"):null,t.levelUp?R("div.rec",`Niveau ${t.levelUp} atteint !`):null,t.unlocked.length?R("div.unl","Débloqué : ",t.unlocked.map(h=>h.name||h.id).join(", ")):null):R("p.dim","Vous regardiez cette épreuve : rejoignez la prochaine !"),p=n.lobby.isHost,m=()=>{n.state="lobby",n.openBase()},d=an(n,"results",R("div.pf-panel.wide.results",R("div.pf-res-head",R("h2",o),ko(t?.stars??0)),R("div.pf-res-big",R("div",R("small","Votre temps"),R("b",r?s?En(r.out??r.time??e.time):r.time!=null?En(r.time):"—":"—")),R("div",R("small","Classement"),R("b",r?`${mo(r.rank)} / ${e.riders.length}`:"—")),R("div",R("small","Épreuve"),R("b",i.short))),l,c,Uf(n,e),R("div.row",e.tour?Nf(n,e):p?[Ze("Rejouer",()=>{n.close(d),n.startMatch()},{primary:!0,ic:"refresh",key:"again"}),Ze("Retour au salon",m,{key:"lobby"})]:[Ze("Retour au salon",m,{primary:!0,key:"lobby"}),R("span.dim","L’hôte choisit la suite…")])),{back:m,hints:[["ok","Sélectionner"],["back","Salon"]]});return d}function Uf(n,e){const t=e.tour;if(!t)return null;const i=Object.keys(t.pts).sort((r,o)=>t.pts[o]-t.pts[r]),s=t.i+1>=t.n;return R("div.pf-tour",R("h4",s?"Classement final du tournoi":`Tournoi · épreuve ${t.i+1} sur ${t.n}`),R("div.pf-tour-rows",i.map((r,o)=>R(`div.pf-tour-row${o===0?".lead":""}${r===n.me.id?".me":""}`,R("b",s&&o===0?"🏆":mo(o+1)),R("span.nm",t.names[r]||"Joueur"),R("span.plus",`+${t.round[r]||0}`),R("span.pts",`${t.pts[r]} pts`)))))}function Nf(n,e){const t=e.tour,i=t.i+1>=t.n;return n.lobby.isHost?[Ze(i?"Terminer le tournoi":"Épreuve suivante",()=>n.nextRound(),{primary:!0,ic:i?"check":"play",key:"next"}),Ze("Abandonner le tournoi",()=>{n.tour=null,n.state="lobby",n.openBase()},{key:"lobby"})]:[Ze("Retour au salon",()=>{n.tour=null,n.state="lobby",n.openBase()},{key:"lobby"}),R("span.dim",i?"Fin du tournoi !":"L’hôte lance l’épreuve suivante…")]}function F1(n){const e=new Map,t=n.riders;if(!t.length)return e;const i=a=>t.slice().sort((l,u)=>a(u)-a(l))[0],s=i(a=>a.puff);s.puff>0&&e.set(s.id,"Moteur principal");const r=i(a=>a.supers);r.supers>0&&!e.has(r.id)&&e.set(r.id,"Roi du super pouf");const o=i(a=>a.emotes);o.emotes>0&&!e.has(o.id)&&e.set(o.id,"Ambianceur");for(const a of t)e.has(a.id)||e.set(a.id,a.puff<3?"Touriste du lagon":"Équipier fiable");return e}const O1="pouf-party";async function z1({el:n,user:e,opts:t={},exit:i,trophy:s}){const r=R("div.pf-loading",Ml(),R("div.pf-spin",R("i"),R("i"),R("i")),R("div.pf-tip",b1()));n.append(r),await Promise.race([document.fonts?.load('80px "Luckiest Guy"'),new Promise(_=>setTimeout(_,2500))]).catch(()=>{});const o=R("canvas.pf-canvas"),a=R("div.pf-overlay");n.prepend(o),n.append(a);const l=J_(o,{}),u=mx(l,a),c=gx(a,o),p=m1(e),m={id:e.id,name:e.psn||"Joueur",look:p.look},d=new s1(m),h={el:n,overlay:a,stage:l,arena:u,input:c,lobby:d,profile:p,me:m,settings:p.settings,state:"title",course:vl[0],match:null,summary:null,rewards:null,paused:!1,menuT:0,alive:!0,attached:!1,get layers(){return Ti.layers.filter(_=>_.pf)},push(_){return _.root.classList.add("overlay","pf-layer","in"),_.shade=0,_.opaque=!0,_.pf=!0,document.getElementById("app").append(_.root),Ti.push(_),$f(),_},close(_,T=!1){_&&Ti.layers.includes(_)&&qf(_,{silent:T})},closeAll(){for(const _ of[...h.layers].reverse())h.close(_,!0)},openBase(){if(!(!h.attached||h.opening)){h.opening=!0;try{h.closeAll(),h.state==="title"?w1(h):h.state==="lobby"?E1(h):h.state==="results"&&U1(h)}finally{h.opening=!1}h.syncCamera()}},syncCamera(){h.state!=="match"&&(u.cam.mode=h.state==="customize"?"closeup":"orbit",u.showTags(h.state==="lobby"||h.state==="results"))},toast(_,T="",D="notify"){Xf({title:_,sub:T,icon:"gamepad",sound:D,log:!1})},showcase(){if(h.state==="title"||!d.members.length){const T=[0,1,2,3].map(S=>fl(S)).filter(S=>S.species!==m.look.species).slice(0,3),D=[m.look,...T];u.setCrew(D.map((S,E)=>({id:E?"npc"+E:m.id,name:E?Ni.find(k=>k.id===S.species).name:m.name,look:S,seat:E})),m.id)}else u.setCrew(Qu(d.players.map((T,D)=>({id:T.id,name:T.name,look:T.id===m.id?m.look:T.look,seat:D}))),m.id);let _=0;for(const T of u.crew.values())T.a=Oc(_++),T.mode="raft",T.puff=!1,T.run=0;u.boardCrew()},setLook(_){m.look=p.look=_,p.save(),d.setLook(_),h.showcase()},partyCode(){const _=Mn.party;return _&&_.members?.length>1?dh("pouf:"+_.id):null},async enterLobby({join:_=null,party:T=null}={}){h.state="lobby",Sh(h,_?`Connexion à la partie ${_}…`:"Création du salon…");try{_?await d.join(_):T?await d.claim(T):await d.host(Af())}catch(D){if(d.closed||!h.alive)return;h.state="title",h.openBase(),bh(h,"Impossible de rejoindre",D.message||"La connexion a échoué.");return}h.openBase(),h.showcase(),d.online||h.toast("Mode hors ligne","Partie solo : le jeu en ligne n’est pas disponible pour le moment","error")},leaveLobby(){d.leave(),h.state="title",h.openBase(),h.showcase()},setCourse(_){h.course=_,d.isHost&&d.broadcast({t:"lobby",course:_.id}),!_.foot&&u.course?.id!==_.id&&(u.load(_),h.showcase()),ss(h)},canStart(){return d.isHost&&d.players.filter(_=>_.online!==!1).every(_=>_.host||_.ready)},tourMode:!1,tour:null,setTourMode(_){h.tourMode=_,h.tour=null,d.isHost&&d.broadcast({t:"lobby",course:h.course.id,tour:_}),ss(h)},decorate(_){if(!h.tour)return _;const T=M1(_);for(const D of _.riders)h.tour.pts[D.id]=(h.tour.pts[D.id]||0)+(T[D.id]||0),h.tour.names[D.id]=D.name,h.tour.looks[D.id]=D.look;return _.tour={i:h.tour.i,n:h.tour.list.length,round:T,pts:{...h.tour.pts},names:{...h.tour.names},looks:{...h.tour.looks}},_},nextRound(){if(!(!d.isHost||!h.tour)){if(h.tour.i+1>=h.tour.list.length){h.tour=null,h.state="lobby",h.openBase();return}h.tour.i++,h.course=Dn[h.tour.list[h.tour.i]],h.startMatch()}},startMatch(){if(!d.isHost)return;h.tourMode&&!h.tour&&(h.tour={list:Bc.slice(),i:0,pts:{},names:{},looks:{}},h.course=Dn[h.tour.list[0]]);const _=Qu(d.players.filter(D=>D.online!==!1).slice(0,Ao).map((D,S)=>({id:D.id,name:D.name,look:D.id===m.id?m.look:D.look,seat:S})));d.members.forEach(D=>{D.host||(D.ready=!1)}),d.pushState();const T={t:"start",course:h.course.id,roster:_,tour:h.tour?{i:h.tour.i,n:h.tour.list.length}:null};d.broadcast(T),h.beginMatch(T,!0)},beginMatch(_,T){const D=Dn[_.course];if(!D)return;h.endMatch(),h.course=D,h.closeAll(),h.state="match",h.paused=!1;const S=!_.roster.some(k=>k.id===m.id);h.match=(D.foot?Jx:Ux)(h,{course:D,roster:_.roster,host:T,meId:m.id,spectator:S});const E=D.foot?"tutorialFoot":"tutorial";!p[E]&&!S&&(p[E]=!0,p.save(),bl(h,{first:!0}))},endMatch(){h.match&&(h.match.dispose(),h.match=null),h.paused=!1},onEnd(_){h.state==="match"&&(h.endMatch(),h.summary=_,h.rewards=_.riders.some(T=>T.id===m.id)?x1(p,_,m.id):null,h.checkTrophies(_),h.state="results",h.closeAll(),h.showcase(),h.openBase())},abortMatch(_){h.state!=="match"&&h.state!=="results"||(h.tour=null,h.endMatch(),h.state="lobby",h.closeAll(),h.showcase(),h.openBase(),_&&h.toast(_))},openPause(){h.state!=="match"||h.layers.length||(h.paused=d.members.length<=1,c.setPlaying(!1),D1(h))},resumeRun(){h.layers.length||(h.paused=!1,h.match&&!h.match.finished&&h.attached&&c.setPlaying(!0))},checkTrophies(_){const T=p.stats,D=_.riders.find(E=>E.id===m.id);if(_.kind==="race"||_.kind==="survival"){D&&D.rank===1&&_.riders.length>=2&&s?.(1),h.rewards?.stars===3&&s?.(4);return}const S=_.finished&&!!D;S&&s?.(0),S&&_.riders.length>=2&&s?.(1),S&&_.deaths===0&&s?.(2),T.supers>=50&&s?.(3),S&&h.rewards?.stars===3&&s?.(4)},async moveLobby(_){if(!(!d.isHost||d.code===_)){d.broadcast({t:"move",code:_}),await new Promise(T=>setTimeout(T,300));try{await d.claim(_)}catch(T){h.toast("Salon",T.message,"error")}h.showcase(),ss(h)}},shareLink(){return`${location.origin}${location.pathname}#pouf=${d.code}`},async joinCode(_){const T=String(_||"").toUpperCase().replace(/[^A-Z0-9]/g,"");if(T.length===6){Sh(h,`Connexion au salon ${T}…`);try{await Mn.joinSalon(T)}catch(S){h.state="title",h.openBase(),bh(h,"Impossible de rejoindre",S.message||"La connexion a échoué.");return}h.state==="match"&&h.endMatch(),d.role!=="none"&&d.leave(),await h.enterLobby({party:dh("pouf:"+T)});return}const D=po(T);h.state==="match"&&h.endMatch(),d.role!=="none"&&d.leave(),await h.enterLobby({join:D})},exit(){h.destroy(),i?.()},destroy(){h.alive&&(h.alive=!1,cancelAnimationFrame(f),h.endMatch(),h.closeAll(),d.destroy(),c.dispose(),u.dispose(),l.dispose(),Ve.stop(),x.disconnect(),n.replaceChildren())}};/[?&]pfdebug/.test(location.search)&&(window.__pouf=h,h.sound=Ve),d.on("msg",_=>{if(["snap","ev","inp","fs","fsnap","fev","ffin","fout","fem"].includes(_.t)){h.match?.onMsg(_);return}if(_.t==="start"&&!d.isHost){h.beginMatch(_,!1);return}if(_.t==="end"&&!d.isHost){h.onEnd(_.summary);return}if(_.t==="abort"&&!d.isHost){h.abortMatch("L’hôte a mis fin à la partie");return}if(_.t==="lobby"&&!d.isHost){const T=Dn[_.course];h.tourMode=!!_.tour,T&&(h.course=T,h.state!=="match"&&!T.foot&&(u.load(T),h.showcase())),ss(h);return}if(_.t==="move"&&!d.isHost){const T=po(_.code);setTimeout(()=>h.joinCode(T),900)}}),d.on("state",()=>{if(h.state==="match"&&h.match){const _=new Set(d.members.map(T=>T.id));for(const T of[...h.match.riders.keys()])_.has(T)||h.match.removeRider(T)}else(h.state==="lobby"||h.state==="results")&&h.showcase();ss(h)}),d.on("joined",_=>{d.isHost&&(d.sendTo(_.id,{t:"lobby",course:h.course.id,tour:h.tourMode}),h.state==="match"&&h.match&&d.sendTo(_.id,{t:"start",course:h.course.id,roster:h.match.roster.filter(T=>h.match.riders.has(T.id))}),Ve.ui("ok"),h.toast(`${_.name} a rejoint la partie`))}),d.on("left",_=>h.toast(`${_.name} a quitté la partie`,"",null)),d.on("status",_=>{_.waiting?h.toast("En attente de l’hôte…","Son application est peut-être en arrière-plan : nouvelle tentative pendant 40 s"):_.hostLost&&_.takenOver&&h.toast("Retour dans la partie","Un autre joueur a repris le salon pendant votre absence : vous le rejoignez"),_.hostLost?((h.state==="match"||h.state==="results")&&h.abortMatch(),_.takenOver||h.toast(_.closing?"L’hôte a fermé la partie":"L’hôte a quitté la partie","Recherche d’un nouvel hôte…","error")):_.reelected?(h.toast(d.isHost?"Vous êtes le nouvel hôte":"Nouvel hôte trouvé",`Code ${d.code}`),h.showcase()):_.lost&&(h.toast("Partie perdue",_.error,"error"),h.state!=="title"&&(h.endMatch(),h.state="title",h.openBase(),h.showcase())),ss(h)});const v=Mn.on("party",()=>{const _=h.partyCode();_&&d.isHost&&d.code!==_&&h.state==="lobby"&&h.moveLobby(_)});let f=0,g=performance.now();const x=new ResizeObserver(()=>{const _=n.getBoundingClientRect();_.width&&_.height&&l.resize(_.width,_.height)});x.observe(n);function y(_){f=requestAnimationFrame(y);const T=Math.min(.25,(_-g)/1e3);if(g=_,window.__pouf&&(window.__fps=(window.__fps||30)*.95+1/Math.max(.001,T)*.05),!h.alive)return;const D=h.match?.kind==="foot";if(h.match)h.match.update(T,h.paused||h.covered&&d.members.length<=1);else if(h.menuT+=T,Math.random()<T*.25&&u.crew.size){const S=[...u.crew.keys()];u.emote(S[Math.floor(Math.random()*S.length)],Kn[Math.floor(Math.random()*4)].id)}(!D||!h.match)&&u.update(T,h.match?h.match.viewT??h.match.t:h.menuT),h.attached&&n.isConnected&&(l.render(),D&&h.match?h.match.updateTags(n.clientWidth,n.clientHeight):u.updateTags(n.clientWidth,n.clientHeight))}const M={attach(){h.attached=!0;const _=n.getBoundingClientRect();_.width&&l.resize(_.width,_.height),h.match&&!h.layers.length&&c.setPlaying(!0),Ve.music(!0,{fast:!!h.match})},detach(){h.attached=!1,c.setPlaying(!1),h.closeAll(),h.state==="match"&&d.members.length<=1&&!h.match?.finished&&(h.paused=!0)},covered(_){h.covered=_,_&&c.setPlaying(!1)},resumed(){queueMicrotask(()=>{!h.alive||h.opening||h.layers.length||Ti.top?.pf||(h.state!=="match"?h.openBase():h.paused?(h.paused=!1,h.openPause()):h.match?.finished||c.setPlaying(!0))})},onAction(_,T){return _==="ps"?!1:h.state==="match"?((_==="options"||_==="back"&&T?.type==="keydown")&&h.openPause(),!0):(_==="back"&&h.openBase(),!0)},joinCode:_=>h.joinCode(_),shareSource(){const _=document.createElement("canvas"),T=_.getContext("2d");if(!_.captureStream||!T)throw new Error("Ce navigateur ne permet pas de partager la partie.");const D=k=>{const B=Math.max(2,Math.min(960,k.width)),G=Math.max(2,Math.round(B*k.height/Math.max(1,k.width)));(_.width!==B||_.height!==G)&&(_.width=B,_.height=G),T.drawImage(k,0,0,B,G)};l.taps.add(D);const S=_.captureStream(24),E=Ve.shareTrack();return{video:S.getVideoTracks()[0],audio:E,stop(){l.taps.delete(D),S.getTracks().forEach(k=>k.stop()),Ve.unshare()}}},destroy(){v(),h.destroy()},G:h};u.load(h.course),h.showcase();const w=n.getBoundingClientRect();l.resize(w.width||innerWidth,w.height||innerHeight),l.render(),f=requestAnimationFrame(y),r.classList.add("out"),setTimeout(()=>r.remove(),600),Ve.music(!0),M.attach();const b=h.partyCode();return t.join?h.enterLobby({join:po(t.join)}):b?h.enterLobby({party:b}):h.openBase(),M}export{O1 as GAME_ID,z1 as createGame};
