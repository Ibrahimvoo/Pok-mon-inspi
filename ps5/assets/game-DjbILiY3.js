import{h as R,s as zc,i as Ht,I as Lf,a as Al,g as Ln,$ as Tl,P as If,d as mh,n as rs,r as Uf,b as ka,c as ps,e as gh,f as Df,o as Nf,j as Rn,t as Ff,k as kf,l as Of}from"./index-q6LLji6e.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Bc="169",zf=0,Rl=1,Bf=2,vh=1,_h=2,Gn=3,hi=0,kt=1,en=2,li=0,ls=1,Cl=2,Pl=3,Ll=4,Hf=5,wi=100,Vf=101,Gf=102,Wf=103,Xf=104,qf=200,$f=201,Yf=202,jf=203,Oa=204,za=205,Kf=206,Jf=207,Zf=208,Qf=209,ed=210,td=211,nd=212,id=213,sd=214,Ba=0,Ha=1,Va=2,ms=3,Ga=4,Wa=5,Xa=6,qa=7,Hc=0,rd=1,od=2,qn=0,ad=1,cd=2,ld=3,ud=4,hd=5,fd=6,dd=7,xh=300,gs=301,vs=302,$a=303,Ya=304,wo=306,ja=1e3,Ti=1001,Ka=1002,Vt=1003,pd=1004,vr=1005,Sn=1006,zo=1007,Ri=1008,Yn=1009,yh=1010,Mh=1011,nr=1012,Vc=1013,Ci=1014,In=1015,hr=1016,Gc=1017,Wc=1018,_s=1020,Sh=35902,bh=1021,wh=1022,pn=1023,Eh=1024,Ah=1025,us=1026,xs=1027,Xc=1028,qc=1029,Th=1030,$c=1031,Yc=1033,to=33776,no=33777,io=33778,so=33779,Ja=35840,Za=35841,Qa=35842,ec=35843,tc=36196,nc=37492,ic=37496,sc=37808,rc=37809,oc=37810,ac=37811,cc=37812,lc=37813,uc=37814,hc=37815,fc=37816,dc=37817,pc=37818,mc=37819,gc=37820,vc=37821,ro=36492,_c=36494,xc=36495,Rh=36283,yc=36284,Mc=36285,Sc=36286,md=3200,gd=3201,jc=0,vd=1,ai="",fn="srgb",fi="srgb-linear",Kc="display-p3",Eo="display-p3-linear",fo="linear",vt="srgb",po="rec709",mo="p3",Oi=7680,Il=519,_d=512,xd=513,yd=514,Ch=515,Md=516,Sd=517,bd=518,wd=519,Ul=35044,Dl=35048,Nl="300 es",Xn=2e3,go=2001;class bs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Bo=Math.PI/180,bc=180/Math.PI;function ws(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Dt(n,e,t){return Math.max(e,Math.min(t,n))}function Ed(n,e){return(n%e+e)%e}function Ho(n,e,t){return(1-t)*n+t*e}function Rs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ye{constructor(e=0,t=0){ye.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Je{constructor(e,t,i,s,r,o,a,l,u){Je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,u)}set(e,t,i,s,r,o,a,l,u){const c=this.elements;return c[0]=e,c[1]=s,c[2]=a,c[3]=t,c[4]=r,c[5]=l,c[6]=i,c[7]=o,c[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],c=i[4],p=i[7],m=i[2],f=i[5],h=i[8],v=s[0],d=s[3],g=s[6],x=s[1],y=s[4],M=s[7],w=s[2],b=s[5],_=s[8];return r[0]=o*v+a*x+l*w,r[3]=o*d+a*y+l*b,r[6]=o*g+a*M+l*_,r[1]=u*v+c*x+p*w,r[4]=u*d+c*y+p*b,r[7]=u*g+c*M+p*_,r[2]=m*v+f*x+h*w,r[5]=m*d+f*y+h*b,r[8]=m*g+f*M+h*_,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8];return t*o*c-t*a*u-i*r*c+i*a*l+s*r*u-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],p=c*o-a*u,m=a*l-c*r,f=u*r-o*l,h=t*p+i*m+s*f;if(h===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/h;return e[0]=p*v,e[1]=(s*u-c*i)*v,e[2]=(a*i-s*o)*v,e[3]=m*v,e[4]=(c*t-s*l)*v,e[5]=(s*r-a*t)*v,e[6]=f*v,e[7]=(i*l-u*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),u=Math.sin(r);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-s*u,s*l,-s*(-u*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Vo.makeScale(e,t)),this}rotate(e){return this.premultiply(Vo.makeRotation(-e)),this}translate(e,t){return this.premultiply(Vo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Vo=new Je;function Ph(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function vo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ad(){const n=vo("canvas");return n.style.display="block",n}const Fl={};function oo(n){n in Fl||(Fl[n]=!0,console.warn(n))}function Td(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Rd(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Cd(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const kl=new Je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ol=new Je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Cs={[fi]:{transfer:fo,primaries:po,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n,fromReference:n=>n},[fn]:{transfer:vt,primaries:po,luminanceCoefficients:[.2126,.7152,.0722],toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Eo]:{transfer:fo,primaries:mo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.applyMatrix3(Ol),fromReference:n=>n.applyMatrix3(kl)},[Kc]:{transfer:vt,primaries:mo,luminanceCoefficients:[.2289,.6917,.0793],toReference:n=>n.convertSRGBToLinear().applyMatrix3(Ol),fromReference:n=>n.applyMatrix3(kl).convertLinearToSRGB()}},Pd=new Set([fi,Eo]),at={enabled:!0,_workingColorSpace:fi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Pd.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=Cs[e].toReference,s=Cs[t].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return Cs[n].primaries},getTransfer:function(n){return n===ai?fo:Cs[n].transfer},getLuminanceCoefficients:function(n,e=this._workingColorSpace){return n.fromArray(Cs[e].luminanceCoefficients)}};function hs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Go(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let zi;class Ld{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{zi===void 0&&(zi=vo("canvas")),zi.width=e.width,zi.height=e.height;const i=zi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=vo("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=hs(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(hs(t[i]/255)*255):t[i]=hs(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Id=0;class Lh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Id++}),this.uuid=ws(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Wo(s[o].image)):r.push(Wo(s[o]))}else r=Wo(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Wo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ld.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ud=0;class Ot extends bs{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=Ti,s=Ti,r=Sn,o=Ri,a=pn,l=Yn,u=Ot.DEFAULT_ANISOTROPY,c=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ud++}),this.uuid=ws(),this.name="",this.source=new Lh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ye(0,0),this.repeat=new ye(1,1),this.center=new ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ja:e.x=e.x-Math.floor(e.x);break;case Ti:e.x=e.x<0?0:1;break;case Ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ja:e.y=e.y-Math.floor(e.y);break;case Ti:e.y=e.y<0?0:1;break;case Ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=xh;Ot.DEFAULT_ANISOTROPY=1;class St{constructor(e=0,t=0,i=0,s=1){St.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,u=l[0],c=l[4],p=l[8],m=l[1],f=l[5],h=l[9],v=l[2],d=l[6],g=l[10];if(Math.abs(c-m)<.01&&Math.abs(p-v)<.01&&Math.abs(h-d)<.01){if(Math.abs(c+m)<.1&&Math.abs(p+v)<.1&&Math.abs(h+d)<.1&&Math.abs(u+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(u+1)/2,M=(f+1)/2,w=(g+1)/2,b=(c+m)/4,_=(p+v)/4,T=(h+d)/4;return y>M&&y>w?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=b/i,r=_/i):M>w?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=b/s,r=T/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=_/r,s=T/r),this.set(i,s,r,t),this}let x=Math.sqrt((d-h)*(d-h)+(p-v)*(p-v)+(m-c)*(m-c));return Math.abs(x)<.001&&(x=1),this.x=(d-h)/x,this.y=(p-v)/x,this.z=(m-c)/x,this.w=Math.acos((u+f+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Dd extends bs{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ot(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Lh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Pi extends Dd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ih extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Nd extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class di{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],u=i[s+1],c=i[s+2],p=i[s+3];const m=r[o+0],f=r[o+1],h=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=u,e[t+2]=c,e[t+3]=p;return}if(a===1){e[t+0]=m,e[t+1]=f,e[t+2]=h,e[t+3]=v;return}if(p!==v||l!==m||u!==f||c!==h){let d=1-a;const g=l*m+u*f+c*h+p*v,x=g>=0?1:-1,y=1-g*g;if(y>Number.EPSILON){const w=Math.sqrt(y),b=Math.atan2(w,g*x);d=Math.sin(d*b)/w,a=Math.sin(a*b)/w}const M=a*x;if(l=l*d+m*M,u=u*d+f*M,c=c*d+h*M,p=p*d+v*M,d===1-a){const w=1/Math.sqrt(l*l+u*u+c*c+p*p);l*=w,u*=w,c*=w,p*=w}}e[t]=l,e[t+1]=u,e[t+2]=c,e[t+3]=p}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],u=i[s+2],c=i[s+3],p=r[o],m=r[o+1],f=r[o+2],h=r[o+3];return e[t]=a*h+c*p+l*f-u*m,e[t+1]=l*h+c*m+u*p-a*f,e[t+2]=u*h+c*f+a*m-l*p,e[t+3]=c*h-a*p-l*m-u*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),c=a(s/2),p=a(r/2),m=l(i/2),f=l(s/2),h=l(r/2);switch(o){case"XYZ":this._x=m*c*p+u*f*h,this._y=u*f*p-m*c*h,this._z=u*c*h+m*f*p,this._w=u*c*p-m*f*h;break;case"YXZ":this._x=m*c*p+u*f*h,this._y=u*f*p-m*c*h,this._z=u*c*h-m*f*p,this._w=u*c*p+m*f*h;break;case"ZXY":this._x=m*c*p-u*f*h,this._y=u*f*p+m*c*h,this._z=u*c*h+m*f*p,this._w=u*c*p-m*f*h;break;case"ZYX":this._x=m*c*p-u*f*h,this._y=u*f*p+m*c*h,this._z=u*c*h-m*f*p,this._w=u*c*p+m*f*h;break;case"YZX":this._x=m*c*p+u*f*h,this._y=u*f*p+m*c*h,this._z=u*c*h-m*f*p,this._w=u*c*p-m*f*h;break;case"XZY":this._x=m*c*p-u*f*h,this._y=u*f*p-m*c*h,this._z=u*c*h+m*f*p,this._w=u*c*p+m*f*h;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],u=t[2],c=t[6],p=t[10],m=i+a+p;if(m>0){const f=.5/Math.sqrt(m+1);this._w=.25/f,this._x=(c-l)*f,this._y=(r-u)*f,this._z=(o-s)*f}else if(i>a&&i>p){const f=2*Math.sqrt(1+i-a-p);this._w=(c-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+u)/f}else if(a>p){const f=2*Math.sqrt(1+a-i-p);this._w=(r-u)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+c)/f}else{const f=2*Math.sqrt(1+p-i-a);this._w=(o-s)/f,this._x=(r+u)/f,this._y=(l+c)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,u=t._z,c=t._w;return this._x=i*c+o*a+s*u-r*l,this._y=s*c+o*l+r*a-i*u,this._z=r*c+o*u+i*l-s*a,this._w=o*c-i*a-s*l-r*u,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const u=Math.sqrt(l),c=Math.atan2(u,a),p=Math.sin((1-t)*c)/u,m=Math.sin(t*c)/u;return this._w=o*p+this._w*m,this._x=i*p+this._x*m,this._y=s*p+this._y*m,this._z=r*p+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*s-a*i),c=2*(a*t-r*s),p=2*(r*i-o*t);return this.x=t+l*u+o*p-a*c,this.y=i+l*c+a*u-r*p,this.z=s+l*p+r*c-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Xo.copy(this).projectOnVector(e),this.sub(Xo)}reflect(e){return this.sub(Xo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Dt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Xo=new F,zl=new di;class Ni{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(vn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(vn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=vn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,vn):vn.fromBufferAttribute(r,o),vn.applyMatrix4(e.matrixWorld),this.expandByPoint(vn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),_r.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),_r.copy(i.boundingBox)),_r.applyMatrix4(e.matrixWorld),this.union(_r)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,vn),vn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ps),xr.subVectors(this.max,Ps),Bi.subVectors(e.a,Ps),Hi.subVectors(e.b,Ps),Vi.subVectors(e.c,Ps),Zn.subVectors(Hi,Bi),Qn.subVectors(Vi,Hi),mi.subVectors(Bi,Vi);let t=[0,-Zn.z,Zn.y,0,-Qn.z,Qn.y,0,-mi.z,mi.y,Zn.z,0,-Zn.x,Qn.z,0,-Qn.x,mi.z,0,-mi.x,-Zn.y,Zn.x,0,-Qn.y,Qn.x,0,-mi.y,mi.x,0];return!qo(t,Bi,Hi,Vi,xr)||(t=[1,0,0,0,1,0,0,0,1],!qo(t,Bi,Hi,Vi,xr))?!1:(yr.crossVectors(Zn,Qn),t=[yr.x,yr.y,yr.z],qo(t,Bi,Hi,Vi,xr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(vn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kn=[new F,new F,new F,new F,new F,new F,new F,new F],vn=new F,_r=new Ni,Bi=new F,Hi=new F,Vi=new F,Zn=new F,Qn=new F,mi=new F,Ps=new F,xr=new F,yr=new F,gi=new F;function qo(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){gi.fromArray(n,r);const a=s.x*Math.abs(gi.x)+s.y*Math.abs(gi.y)+s.z*Math.abs(gi.z),l=e.dot(gi),u=t.dot(gi),c=i.dot(gi);if(Math.max(-Math.max(l,u,c),Math.min(l,u,c))>a)return!1}return!0}const Fd=new Ni,Ls=new F,$o=new F;class fr{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Fd.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ls.subVectors(e,this.center);const t=Ls.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ls,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($o.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ls.copy(e.center).add($o)),this.expandByPoint(Ls.copy(e.center).sub($o))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const On=new F,Yo=new F,Mr=new F,ei=new F,jo=new F,Sr=new F,Ko=new F;class kd{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Yo.copy(e).add(t).multiplyScalar(.5),Mr.copy(t).sub(e).normalize(),ei.copy(this.origin).sub(Yo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Mr),a=ei.dot(this.direction),l=-ei.dot(Mr),u=ei.lengthSq(),c=Math.abs(1-o*o);let p,m,f,h;if(c>0)if(p=o*l-a,m=o*a-l,h=r*c,p>=0)if(m>=-h)if(m<=h){const v=1/c;p*=v,m*=v,f=p*(p+o*m+2*a)+m*(o*p+m+2*l)+u}else m=r,p=Math.max(0,-(o*m+a)),f=-p*p+m*(m+2*l)+u;else m=-r,p=Math.max(0,-(o*m+a)),f=-p*p+m*(m+2*l)+u;else m<=-h?(p=Math.max(0,-(-o*r+a)),m=p>0?-r:Math.min(Math.max(-r,-l),r),f=-p*p+m*(m+2*l)+u):m<=h?(p=0,m=Math.min(Math.max(-r,-l),r),f=m*(m+2*l)+u):(p=Math.max(0,-(o*r+a)),m=p>0?r:Math.min(Math.max(-r,-l),r),f=-p*p+m*(m+2*l)+u);else m=o>0?-r:r,p=Math.max(0,-(o*m+a)),f=-p*p+m*(m+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Yo).addScaledVector(Mr,m),f}intersectSphere(e,t){On.subVectors(e.center,this.origin);const i=On.dot(this.direction),s=On.dot(On)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const u=1/this.direction.x,c=1/this.direction.y,p=1/this.direction.z,m=this.origin;return u>=0?(i=(e.min.x-m.x)*u,s=(e.max.x-m.x)*u):(i=(e.max.x-m.x)*u,s=(e.min.x-m.x)*u),c>=0?(r=(e.min.y-m.y)*c,o=(e.max.y-m.y)*c):(r=(e.max.y-m.y)*c,o=(e.min.y-m.y)*c),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(e.min.z-m.z)*p,l=(e.max.z-m.z)*p):(a=(e.max.z-m.z)*p,l=(e.min.z-m.z)*p),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,s,r){jo.subVectors(t,e),Sr.subVectors(i,e),Ko.crossVectors(jo,Sr);let o=this.direction.dot(Ko),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ei.subVectors(this.origin,e);const l=a*this.direction.dot(Sr.crossVectors(ei,Sr));if(l<0)return null;const u=a*this.direction.dot(jo.cross(ei));if(u<0||l+u>o)return null;const c=-a*ei.dot(Ko);return c<0?null:this.at(c/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,s,r,o,a,l,u,c,p,m,f,h,v,d){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,u,c,p,m,f,h,v,d)}set(e,t,i,s,r,o,a,l,u,c,p,m,f,h,v,d){const g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=u,g[6]=c,g[10]=p,g[14]=m,g[3]=f,g[7]=h,g[11]=v,g[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Gi.setFromMatrixColumn(e,0).length(),r=1/Gi.setFromMatrixColumn(e,1).length(),o=1/Gi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),u=Math.sin(s),c=Math.cos(r),p=Math.sin(r);if(e.order==="XYZ"){const m=o*c,f=o*p,h=a*c,v=a*p;t[0]=l*c,t[4]=-l*p,t[8]=u,t[1]=f+h*u,t[5]=m-v*u,t[9]=-a*l,t[2]=v-m*u,t[6]=h+f*u,t[10]=o*l}else if(e.order==="YXZ"){const m=l*c,f=l*p,h=u*c,v=u*p;t[0]=m+v*a,t[4]=h*a-f,t[8]=o*u,t[1]=o*p,t[5]=o*c,t[9]=-a,t[2]=f*a-h,t[6]=v+m*a,t[10]=o*l}else if(e.order==="ZXY"){const m=l*c,f=l*p,h=u*c,v=u*p;t[0]=m-v*a,t[4]=-o*p,t[8]=h+f*a,t[1]=f+h*a,t[5]=o*c,t[9]=v-m*a,t[2]=-o*u,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const m=o*c,f=o*p,h=a*c,v=a*p;t[0]=l*c,t[4]=h*u-f,t[8]=m*u+v,t[1]=l*p,t[5]=v*u+m,t[9]=f*u-h,t[2]=-u,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const m=o*l,f=o*u,h=a*l,v=a*u;t[0]=l*c,t[4]=v-m*p,t[8]=h*p+f,t[1]=p,t[5]=o*c,t[9]=-a*c,t[2]=-u*c,t[6]=f*p+h,t[10]=m-v*p}else if(e.order==="XZY"){const m=o*l,f=o*u,h=a*l,v=a*u;t[0]=l*c,t[4]=-p,t[8]=u*c,t[1]=m*p+v,t[5]=o*c,t[9]=f*p-h,t[2]=h*p-f,t[6]=a*c,t[10]=v*p+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Od,e,zd)}lookAt(e,t,i){const s=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),ti.crossVectors(i,Zt),ti.lengthSq()===0&&(Math.abs(i.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),ti.crossVectors(i,Zt)),ti.normalize(),br.crossVectors(Zt,ti),s[0]=ti.x,s[4]=br.x,s[8]=Zt.x,s[1]=ti.y,s[5]=br.y,s[9]=Zt.y,s[2]=ti.z,s[6]=br.z,s[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],c=i[1],p=i[5],m=i[9],f=i[13],h=i[2],v=i[6],d=i[10],g=i[14],x=i[3],y=i[7],M=i[11],w=i[15],b=s[0],_=s[4],T=s[8],U=s[12],S=s[1],A=s[5],k=s[9],H=s[13],G=s[2],O=s[6],I=s[10],W=s[14],D=s[3],re=s[7],ce=s[11],he=s[15];return r[0]=o*b+a*S+l*G+u*D,r[4]=o*_+a*A+l*O+u*re,r[8]=o*T+a*k+l*I+u*ce,r[12]=o*U+a*H+l*W+u*he,r[1]=c*b+p*S+m*G+f*D,r[5]=c*_+p*A+m*O+f*re,r[9]=c*T+p*k+m*I+f*ce,r[13]=c*U+p*H+m*W+f*he,r[2]=h*b+v*S+d*G+g*D,r[6]=h*_+v*A+d*O+g*re,r[10]=h*T+v*k+d*I+g*ce,r[14]=h*U+v*H+d*W+g*he,r[3]=x*b+y*S+M*G+w*D,r[7]=x*_+y*A+M*O+w*re,r[11]=x*T+y*k+M*I+w*ce,r[15]=x*U+y*H+M*W+w*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],u=e[13],c=e[2],p=e[6],m=e[10],f=e[14],h=e[3],v=e[7],d=e[11],g=e[15];return h*(+r*l*p-s*u*p-r*a*m+i*u*m+s*a*f-i*l*f)+v*(+t*l*f-t*u*m+r*o*m-s*o*f+s*u*c-r*l*c)+d*(+t*u*p-t*a*f-r*o*p+i*o*f+r*a*c-i*u*c)+g*(-s*a*c-t*l*p+t*a*m+s*o*p-i*o*m+i*l*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],u=e[7],c=e[8],p=e[9],m=e[10],f=e[11],h=e[12],v=e[13],d=e[14],g=e[15],x=p*d*u-v*m*u+v*l*f-a*d*f-p*l*g+a*m*g,y=h*m*u-c*d*u-h*l*f+o*d*f+c*l*g-o*m*g,M=c*v*u-h*p*u+h*a*f-o*v*f-c*a*g+o*p*g,w=h*p*l-c*v*l-h*a*m+o*v*m+c*a*d-o*p*d,b=t*x+i*y+s*M+r*w;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/b;return e[0]=x*_,e[1]=(v*m*r-p*d*r-v*s*f+i*d*f+p*s*g-i*m*g)*_,e[2]=(a*d*r-v*l*r+v*s*u-i*d*u-a*s*g+i*l*g)*_,e[3]=(p*l*r-a*m*r-p*s*u+i*m*u+a*s*f-i*l*f)*_,e[4]=y*_,e[5]=(c*d*r-h*m*r+h*s*f-t*d*f-c*s*g+t*m*g)*_,e[6]=(h*l*r-o*d*r-h*s*u+t*d*u+o*s*g-t*l*g)*_,e[7]=(o*m*r-c*l*r+c*s*u-t*m*u-o*s*f+t*l*f)*_,e[8]=M*_,e[9]=(h*p*r-c*v*r-h*i*f+t*v*f+c*i*g-t*p*g)*_,e[10]=(o*v*r-h*a*r+h*i*u-t*v*u-o*i*g+t*a*g)*_,e[11]=(c*a*r-o*p*r-c*i*u+t*p*u+o*i*f-t*a*f)*_,e[12]=w*_,e[13]=(c*v*s-h*p*s+h*i*m-t*v*m-c*i*d+t*p*d)*_,e[14]=(h*a*s-o*v*s-h*i*l+t*v*l+o*i*d-t*a*d)*_,e[15]=(o*p*s-c*a*s+c*i*l-t*p*l-o*i*m+t*a*m)*_,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,u=r*o,c=r*a;return this.set(u*o+i,u*a-s*l,u*l+s*a,0,u*a+s*l,c*a+i,c*l-s*o,0,u*l-s*a,c*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,u=r+r,c=o+o,p=a+a,m=r*u,f=r*c,h=r*p,v=o*c,d=o*p,g=a*p,x=l*u,y=l*c,M=l*p,w=i.x,b=i.y,_=i.z;return s[0]=(1-(v+g))*w,s[1]=(f+M)*w,s[2]=(h-y)*w,s[3]=0,s[4]=(f-M)*b,s[5]=(1-(m+g))*b,s[6]=(d+x)*b,s[7]=0,s[8]=(h+y)*_,s[9]=(d-x)*_,s[10]=(1-(m+v))*_,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Gi.set(s[0],s[1],s[2]).length();const o=Gi.set(s[4],s[5],s[6]).length(),a=Gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],_n.copy(this);const u=1/r,c=1/o,p=1/a;return _n.elements[0]*=u,_n.elements[1]*=u,_n.elements[2]*=u,_n.elements[4]*=c,_n.elements[5]*=c,_n.elements[6]*=c,_n.elements[8]*=p,_n.elements[9]*=p,_n.elements[10]*=p,t.setFromRotationMatrix(_n),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Xn){const l=this.elements,u=2*r/(t-e),c=2*r/(i-s),p=(t+e)/(t-e),m=(i+s)/(i-s);let f,h;if(a===Xn)f=-(o+r)/(o-r),h=-2*o*r/(o-r);else if(a===go)f=-o/(o-r),h=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=c,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=h,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Xn){const l=this.elements,u=1/(t-e),c=1/(i-s),p=1/(o-r),m=(t+e)*u,f=(i+s)*c;let h,v;if(a===Xn)h=(o+r)*p,v=-2*p;else if(a===go)h=r*p,v=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-m,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-h,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Gi=new F,_n=new ct,Od=new F(0,0,0),zd=new F(1,1,1),ti=new F,br=new F,Zt=new F,Bl=new ct,Hl=new di;class on{constructor(e=0,t=0,i=0,s=on.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],u=s[5],c=s[9],p=s[2],m=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(m,u),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Dt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(m,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(Dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,u),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,u),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-c,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Bl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hl.setFromEuler(this),this.setFromQuaternion(Hl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}on.DEFAULT_ORDER="XYZ";class Uh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Bd=0;const Vl=new F,Wi=new di,zn=new ct,wr=new F,Is=new F,Hd=new F,Vd=new di,Gl=new F(1,0,0),Wl=new F(0,1,0),Xl=new F(0,0,1),ql={type:"added"},Gd={type:"removed"},Xi={type:"childadded",child:null},Jo={type:"childremoved",child:null};class At extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=At.DEFAULT_UP.clone();const e=new F,t=new on,i=new di,s=new F(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new Je}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=At.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Uh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(e,t){return Wi.setFromAxisAngle(e,t),this.quaternion.premultiply(Wi),this}rotateX(e){return this.rotateOnAxis(Gl,e)}rotateY(e){return this.rotateOnAxis(Wl,e)}rotateZ(e){return this.rotateOnAxis(Xl,e)}translateOnAxis(e,t){return Vl.copy(e).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gl,e)}translateY(e){return this.translateOnAxis(Wl,e)}translateZ(e){return this.translateOnAxis(Xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?wr.copy(e):wr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Is,wr,this.up):zn.lookAt(wr,Is,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(zn),this.quaternion.premultiply(Wi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ql),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gd),Jo.child=e,this.dispatchEvent(Jo),Jo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ql),Xi.child=e,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,e,Hd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,Vd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,c=l.length;u<c;u++){const p=l[u];r(e.shapes,p)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),c=o(e.images),p=o(e.shapes),m=o(e.skeletons),f=o(e.animations),h=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),c.length>0&&(i.images=c),p.length>0&&(i.shapes=p),m.length>0&&(i.skeletons=m),f.length>0&&(i.animations=f),h.length>0&&(i.nodes=h)}return i.object=s,i;function o(a){const l=[];for(const u in a){const c=a[u];delete c.metadata,l.push(c)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}At.DEFAULT_UP=new F(0,1,0);At.DEFAULT_MATRIX_AUTO_UPDATE=!0;At.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new F,Bn=new F,Zo=new F,Hn=new F,qi=new F,$i=new F,$l=new F,Qo=new F,ea=new F,ta=new F,na=new St,ia=new St,sa=new St;class bn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),xn.subVectors(e,t),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){xn.subVectors(s,t),Bn.subVectors(i,t),Zo.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(Bn),l=xn.dot(Zo),u=Bn.dot(Bn),c=Bn.dot(Zo),p=o*u-a*a;if(p===0)return r.set(0,0,0),null;const m=1/p,f=(u*l-a*c)*m,h=(o*c-a*l)*m;return r.set(1-f-h,h,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return na.setScalar(0),ia.setScalar(0),sa.setScalar(0),na.fromBufferAttribute(e,t),ia.fromBufferAttribute(e,i),sa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(na,r.x),o.addScaledVector(ia,r.y),o.addScaledVector(sa,r.z),o}static isFrontFacing(e,t,i,s){return xn.subVectors(i,t),Bn.subVectors(e,t),xn.cross(Bn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),xn.cross(Bn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return bn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;qi.subVectors(s,i),$i.subVectors(r,i),Qo.subVectors(e,i);const l=qi.dot(Qo),u=$i.dot(Qo);if(l<=0&&u<=0)return t.copy(i);ea.subVectors(e,s);const c=qi.dot(ea),p=$i.dot(ea);if(c>=0&&p<=c)return t.copy(s);const m=l*p-c*u;if(m<=0&&l>=0&&c<=0)return o=l/(l-c),t.copy(i).addScaledVector(qi,o);ta.subVectors(e,r);const f=qi.dot(ta),h=$i.dot(ta);if(h>=0&&f<=h)return t.copy(r);const v=f*u-l*h;if(v<=0&&u>=0&&h<=0)return a=u/(u-h),t.copy(i).addScaledVector($i,a);const d=c*h-f*p;if(d<=0&&p-c>=0&&f-h>=0)return $l.subVectors(r,s),a=(p-c)/(p-c+(f-h)),t.copy(s).addScaledVector($l,a);const g=1/(d+v+m);return o=v*g,a=m*g,t.copy(i).addScaledVector(qi,o).addScaledVector($i,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Dh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},Er={h:0,s:0,l:0};function ra(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class He{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=Ed(e,1),t=Dt(t,0,1),i=Dt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=ra(o,r,e+1/3),this.g=ra(o,r,e),this.b=ra(o,r,e-1/3)}return at.toWorkingColorSpace(this,s),this}setStyle(e,t=fn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=fn){const i=Dh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}copyLinearToSRGB(e){return this.r=Go(e.r),this.g=Go(e.g),this.b=Go(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=fn){return at.fromWorkingColorSpace(Ft.copy(this),e),Math.round(Dt(Ft.r*255,0,255))*65536+Math.round(Dt(Ft.g*255,0,255))*256+Math.round(Dt(Ft.b*255,0,255))}getHexString(e=fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.fromWorkingColorSpace(Ft.copy(this),t);const i=Ft.r,s=Ft.g,r=Ft.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,u;const c=(a+o)/2;if(a===o)l=0,u=0;else{const p=o-a;switch(u=c<=.5?p/(o+a):p/(2-o-a),o){case i:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-i)/p+2;break;case r:l=(i-s)/p+4;break}l/=6}return e.h=l,e.s=u,e.l=c,e}getRGB(e,t=at.workingColorSpace){return at.fromWorkingColorSpace(Ft.copy(this),t),e.r=Ft.r,e.g=Ft.g,e.b=Ft.b,e}getStyle(e=fn){at.fromWorkingColorSpace(Ft.copy(this),e);const t=Ft.r,i=Ft.g,s=Ft.b;return e!==fn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(ni),this.setHSL(ni.h+e,ni.s+t,ni.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(ni),e.getHSL(Er);const i=Ho(ni.h,Er.h,t),s=Ho(ni.s,Er.s,t),r=Ho(ni.l,Er.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ft=new He;He.NAMES=Dh;let Wd=0;class Es extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=ls,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oa,this.blendDst=za,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new He(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ls&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Oa&&(i.blendSrc=this.blendSrc),this.blendDst!==za&&(i.blendDst=this.blendDst),this.blendEquation!==wi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Il&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class tn extends Es{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new F,Ar=new ye;class rn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ul,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ar.fromBufferAttribute(this,t),Ar.applyMatrix3(e),this.setXY(t,Ar.x,Ar.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Rs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Rs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Rs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Rs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Rs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),s=Xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Xt(t,this.array),i=Xt(i,this.array),s=Xt(s,this.array),r=Xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ul&&(e.usage=this.usage),e}}class Nh extends rn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Fh extends rn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Qe extends rn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Xd=0;const ln=new ct,oa=new At,Yi=new F,Qt=new Ni,Us=new Ni,Pt=new F;class Ct extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xd++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ph(e)?Fh:Nh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Je().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,i){return ln.makeTranslation(e,t,i),this.applyMatrix4(ln),this}scale(e,t,i){return ln.makeScale(e,t,i),this.applyMatrix4(ln),this}lookAt(e){return oa.lookAt(e),oa.updateMatrix(),this.applyMatrix4(oa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Yi).negate(),this.translate(Yi.x,Yi.y,Yi.z),this}setFromPoints(e){const t=[];for(let i=0,s=e.length;i<s;i++){const r=e[i];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qe(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Us.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(Qt.min,Us.min),Qt.expandByPoint(Pt),Pt.addVectors(Qt.max,Us.max),Qt.expandByPoint(Pt)):(Qt.expandByPoint(Us.min),Qt.expandByPoint(Us.max))}Qt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let u=0,c=a.count;u<c;u++)Pt.fromBufferAttribute(a,u),l&&(Yi.fromBufferAttribute(e,u),Pt.add(Yi)),s=Math.max(s,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let T=0;T<i.count;T++)a[T]=new F,l[T]=new F;const u=new F,c=new F,p=new F,m=new ye,f=new ye,h=new ye,v=new F,d=new F;function g(T,U,S){u.fromBufferAttribute(i,T),c.fromBufferAttribute(i,U),p.fromBufferAttribute(i,S),m.fromBufferAttribute(r,T),f.fromBufferAttribute(r,U),h.fromBufferAttribute(r,S),c.sub(u),p.sub(u),f.sub(m),h.sub(m);const A=1/(f.x*h.y-h.x*f.y);isFinite(A)&&(v.copy(c).multiplyScalar(h.y).addScaledVector(p,-f.y).multiplyScalar(A),d.copy(p).multiplyScalar(f.x).addScaledVector(c,-h.x).multiplyScalar(A),a[T].add(v),a[U].add(v),a[S].add(v),l[T].add(d),l[U].add(d),l[S].add(d))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let T=0,U=x.length;T<U;++T){const S=x[T],A=S.start,k=S.count;for(let H=A,G=A+k;H<G;H+=3)g(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const y=new F,M=new F,w=new F,b=new F;function _(T){w.fromBufferAttribute(s,T),b.copy(w);const U=a[T];y.copy(U),y.sub(w.multiplyScalar(w.dot(U))).normalize(),M.crossVectors(b,U);const A=M.dot(l[T])<0?-1:1;o.setXYZW(T,y.x,y.y,y.z,A)}for(let T=0,U=x.length;T<U;++T){const S=x[T],A=S.start,k=S.count;for(let H=A,G=A+k;H<G;H+=3)_(e.getX(H+0)),_(e.getX(H+1)),_(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let m=0,f=i.count;m<f;m++)i.setXYZ(m,0,0,0);const s=new F,r=new F,o=new F,a=new F,l=new F,u=new F,c=new F,p=new F;if(e)for(let m=0,f=e.count;m<f;m+=3){const h=e.getX(m+0),v=e.getX(m+1),d=e.getX(m+2);s.fromBufferAttribute(t,h),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,d),c.subVectors(o,r),p.subVectors(s,r),c.cross(p),a.fromBufferAttribute(i,h),l.fromBufferAttribute(i,v),u.fromBufferAttribute(i,d),a.add(c),l.add(c),u.add(c),i.setXYZ(h,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(d,u.x,u.y,u.z)}else for(let m=0,f=t.count;m<f;m+=3)s.fromBufferAttribute(t,m+0),r.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),c.subVectors(o,r),p.subVectors(s,r),c.cross(p),i.setXYZ(m+0,c.x,c.y,c.z),i.setXYZ(m+1,c.x,c.y,c.z),i.setXYZ(m+2,c.x,c.y,c.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,l){const u=a.array,c=a.itemSize,p=a.normalized,m=new u.constructor(l.length*c);let f=0,h=0;for(let v=0,d=l.length;v<d;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*c;for(let g=0;g<c;g++)m[h++]=u[f++]}return new rn(m,c,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ct,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],u=e(l,i);t.setAttribute(a,u)}const r=this.morphAttributes;for(const a in r){const l=[],u=r[a];for(let c=0,p=u.length;c<p;c++){const m=u[c],f=e(m,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];t.addGroup(u.start,u.count,u.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],c=[];for(let p=0,m=u.length;p<m;p++){const f=u[p];c.push(f.toJSON(e.data))}c.length>0&&(s[l]=c,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const u in s){const c=s[u];this.setAttribute(u,c.clone(t))}const r=e.morphAttributes;for(const u in r){const c=[],p=r[u];for(let m=0,f=p.length;m<f;m++)c.push(p[m].clone(t));this.morphAttributes[u]=c}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,c=o.length;u<c;u++){const p=o[u];this.addGroup(p.start,p.count,p.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yl=new ct,vi=new kd,Tr=new fr,jl=new F,Rr=new F,Cr=new F,Pr=new F,aa=new F,Lr=new F,Kl=new F,Ir=new F;class pt extends At{constructor(e=new Ct,t=new tn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){Lr.set(0,0,0);for(let l=0,u=r.length;l<u;l++){const c=a[l],p=r[l];c!==0&&(aa.fromBufferAttribute(p,e),o?Lr.addScaledVector(aa,c):Lr.addScaledVector(aa.sub(t),c))}t.add(Lr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Tr.copy(i.boundingSphere),Tr.applyMatrix4(r),vi.copy(e.ray).recast(e.near),!(Tr.containsPoint(vi.origin)===!1&&(vi.intersectSphere(Tr,jl)===null||vi.origin.distanceToSquared(jl)>(e.far-e.near)**2))&&(Yl.copy(r).invert(),vi.copy(e.ray).applyMatrix4(Yl),!(i.boundingBox!==null&&vi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,u=r.attributes.uv,c=r.attributes.uv1,p=r.attributes.normal,m=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let h=0,v=m.length;h<v;h++){const d=m[h],g=o[d.materialIndex],x=Math.max(d.start,f.start),y=Math.min(a.count,Math.min(d.start+d.count,f.start+f.count));for(let M=x,w=y;M<w;M+=3){const b=a.getX(M),_=a.getX(M+1),T=a.getX(M+2);s=Ur(this,g,e,i,u,c,p,b,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const h=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let d=h,g=v;d<g;d+=3){const x=a.getX(d),y=a.getX(d+1),M=a.getX(d+2);s=Ur(this,o,e,i,u,c,p,x,y,M),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let h=0,v=m.length;h<v;h++){const d=m[h],g=o[d.materialIndex],x=Math.max(d.start,f.start),y=Math.min(l.count,Math.min(d.start+d.count,f.start+f.count));for(let M=x,w=y;M<w;M+=3){const b=M,_=M+1,T=M+2;s=Ur(this,g,e,i,u,c,p,b,_,T),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=d.materialIndex,t.push(s))}}else{const h=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let d=h,g=v;d<g;d+=3){const x=d,y=d+1,M=d+2;s=Ur(this,o,e,i,u,c,p,x,y,M),s&&(s.faceIndex=Math.floor(d/3),t.push(s))}}}}function qd(n,e,t,i,s,r,o,a){let l;if(e.side===kt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===hi,a),l===null)return null;Ir.copy(a),Ir.applyMatrix4(n.matrixWorld);const u=t.ray.origin.distanceTo(Ir);return u<t.near||u>t.far?null:{distance:u,point:Ir.clone(),object:n}}function Ur(n,e,t,i,s,r,o,a,l,u){n.getVertexPosition(a,Rr),n.getVertexPosition(l,Cr),n.getVertexPosition(u,Pr);const c=qd(n,e,t,i,Rr,Cr,Pr,Kl);if(c){const p=new F;bn.getBarycoord(Kl,Rr,Cr,Pr,p),s&&(c.uv=bn.getInterpolatedAttribute(s,a,l,u,p,new ye)),r&&(c.uv1=bn.getInterpolatedAttribute(r,a,l,u,p,new ye)),o&&(c.normal=bn.getInterpolatedAttribute(o,a,l,u,p,new F),c.normal.dot(i.direction)>0&&c.normal.multiplyScalar(-1));const m={a,b:l,c:u,normal:new F,materialIndex:0};bn.getNormal(Rr,Cr,Pr,m.normal),c.face=m,c.barycoord=p}return c}class mn extends Ct{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],u=[],c=[],p=[];let m=0,f=0;h("z","y","x",-1,-1,i,t,e,o,r,0),h("z","y","x",1,-1,i,t,-e,o,r,1),h("x","z","y",1,1,e,i,t,s,o,2),h("x","z","y",1,-1,e,i,-t,s,o,3),h("x","y","z",1,-1,e,t,i,s,r,4),h("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Qe(u,3)),this.setAttribute("normal",new Qe(c,3)),this.setAttribute("uv",new Qe(p,2));function h(v,d,g,x,y,M,w,b,_,T,U){const S=M/_,A=w/T,k=M/2,H=w/2,G=b/2,O=_+1,I=T+1;let W=0,D=0;const re=new F;for(let ce=0;ce<I;ce++){const he=ce*A-H;for(let Q=0;Q<O;Q++){const me=Q*S-k;re[v]=me*x,re[d]=he*y,re[g]=G,u.push(re.x,re.y,re.z),re[v]=0,re[d]=0,re[g]=b>0?1:-1,c.push(re.x,re.y,re.z),p.push(Q/_),p.push(1-ce/T),W+=1}}for(let ce=0;ce<T;ce++)for(let he=0;he<_;he++){const Q=m+he+O*ce,me=m+he+O*(ce+1),K=m+(he+1)+O*(ce+1),j=m+(he+1)+O*ce;l.push(Q,me,j),l.push(me,K,j),D+=6}a.addGroup(f,D,U),f+=D,m+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ys(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=ys(n[t]);for(const s in i)e[s]=i[s]}return e}function $d(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function kh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Yd={clone:ys,merge:zt};var jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Es{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jd,this.fragmentShader=Kd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ys(e.uniforms),this.uniformsGroups=$d(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Oh extends At{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=Xn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ii=new F,Jl=new ye,Zl=new ye;class dn extends Oh{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=bc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return bc*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ii.x,ii.y).multiplyScalar(-e/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ii.x,ii.y).multiplyScalar(-e/ii.z)}getViewSize(e,t){return this.getViewBounds(e,Jl,Zl),t.subVectors(Zl,Jl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Bo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/u,s*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ji=-90,Ki=1;class Jd extends At{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new dn(ji,Ki,e,t);s.layers=this.layers,this.add(s);const r=new dn(ji,Ki,e,t);r.layers=this.layers,this.add(r);const o=new dn(ji,Ki,e,t);o.layers=this.layers,this.add(o);const a=new dn(ji,Ki,e,t);a.layers=this.layers,this.add(a);const l=new dn(ji,Ki,e,t);l.layers=this.layers,this.add(l);const u=new dn(ji,Ki,e,t);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const u of t)this.remove(u);if(e===Xn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===go)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of t)this.add(u),u.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,u,c]=this.children,p=e.getRenderTarget(),m=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),h=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,u),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,c),e.setRenderTarget(p,m,f),e.xr.enabled=h,i.texture.needsPMREMUpdate=!0}}class zh extends Ot{constructor(e,t,i,s,r,o,a,l,u,c){e=e!==void 0?e:[],t=t!==void 0?t:gs,super(e,t,i,s,r,o,a,l,u,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Zd extends Pi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new zh(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new mn(5,5,5),r=new An({name:"CubemapFromEquirect",uniforms:ys(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:kt,blending:li});r.uniforms.tEquirect.value=t;const o=new pt(s,r),a=t.minFilter;return t.minFilter===Ri&&(t.minFilter=Sn),new Jd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const ca=new F,Qd=new F,ep=new Je;class Si{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=ca.subVectors(i,t).cross(Qd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ca),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ep.getNormalMatrix(e),s=this.coplanarPoint(ca).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new fr,Dr=new F;class Jc{constructor(e=new Si,t=new Si,i=new Si,s=new Si,r=new Si,o=new Si){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Xn){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],l=s[3],u=s[4],c=s[5],p=s[6],m=s[7],f=s[8],h=s[9],v=s[10],d=s[11],g=s[12],x=s[13],y=s[14],M=s[15];if(i[0].setComponents(l-r,m-u,d-f,M-g).normalize(),i[1].setComponents(l+r,m+u,d+f,M+g).normalize(),i[2].setComponents(l+o,m+c,d+h,M+x).normalize(),i[3].setComponents(l-o,m-c,d-h,M-x).normalize(),i[4].setComponents(l-a,m-p,d-v,M-y).normalize(),t===Xn)i[5].setComponents(l+a,m+p,d+v,M+y).normalize();else if(t===go)i[5].setComponents(a,p,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){return _i.center.set(0,0,0),_i.radius=.7071067811865476,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Dr.x=s.normal.x>0?e.max.x:e.min.x,Dr.y=s.normal.y>0?e.max.y:e.min.y,Dr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bh(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function tp(n){const e=new WeakMap;function t(a,l){const u=a.array,c=a.usage,p=u.byteLength,m=n.createBuffer();n.bindBuffer(l,m),n.bufferData(l,u,c),a.onUploadCallback();let f;if(u instanceof Float32Array)f=n.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)f=n.SHORT;else if(u instanceof Uint32Array)f=n.UNSIGNED_INT;else if(u instanceof Int32Array)f=n.INT;else if(u instanceof Int8Array)f=n.BYTE;else if(u instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:f,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:p}}function i(a,l,u){const c=l.array,p=l.updateRanges;if(n.bindBuffer(u,a),p.length===0)n.bufferSubData(u,0,c);else{p.sort((f,h)=>f.start-h.start);let m=0;for(let f=1;f<p.length;f++){const h=p[m],v=p[f];v.start<=h.start+h.count+1?h.count=Math.max(h.count,v.start+v.count-h.start):(++m,p[m]=v)}p.length=m+1;for(let f=0,h=p.length;f<h;f++){const v=p[f];n.bufferSubData(u,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=e.get(a);(!c||c.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,t(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:s,remove:r,update:o}}class Li extends Ct{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),u=a+1,c=l+1,p=e/a,m=t/l,f=[],h=[],v=[],d=[];for(let g=0;g<c;g++){const x=g*m-o;for(let y=0;y<u;y++){const M=y*p-r;h.push(M,-x,0),v.push(0,0,1),d.push(y/a),d.push(1-g/l)}}for(let g=0;g<l;g++)for(let x=0;x<a;x++){const y=x+u*g,M=x+u*(g+1),w=x+1+u*(g+1),b=x+1+u*g;f.push(y,M,b),f.push(M,w,b)}this.setIndex(f),this.setAttribute("position",new Qe(h,3)),this.setAttribute("normal",new Qe(v,3)),this.setAttribute("uv",new Qe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.width,e.height,e.widthSegments,e.heightSegments)}}var np=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ip=`#ifdef USE_ALPHAHASH
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
#endif`,sp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,op=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ap=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cp=`#ifdef USE_AOMAP
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
#endif`,lp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,up=`#ifdef USE_BATCHING
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
#endif`,hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mp=`#ifdef USE_IRIDESCENCE
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
#endif`,gp=`#ifdef USE_BUMPMAP
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
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ep=`#define PI 3.141592653589793
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
} // validated`,Ap=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Tp=`vec3 transformedNormal = objectNormal;
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
#endif`,Rp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ip="gl_FragColor = linearToOutputTexel( gl_FragColor );",Up=`
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
}`,Dp=`#ifdef USE_ENVMAP
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
#endif`,Np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fp=`#ifdef USE_ENVMAP
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
#endif`,kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Op=`#ifdef USE_ENVMAP
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
#endif`,zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gp=`#ifdef USE_GRADIENTMAP
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
}`,Wp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$p=`uniform bool receiveShadow;
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
#endif`,Yp=`#ifdef USE_ENVMAP
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
#endif`,jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kp=`varying vec3 vViewPosition;
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
material.specularStrength = specularStrength;`,Zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qp=`PhysicalMaterial material;
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
#endif`,em=`struct PhysicalMaterial {
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
}`,tm=`
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
#endif`,nm=`#if defined( RE_IndirectDiffuse )
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
#endif`,im=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,om=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,am=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,um=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,hm=`#if defined( USE_POINTS_UV )
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
#endif`,fm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vm=`#ifdef USE_MORPHTARGETS
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
#endif`,_m=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wm=`#ifdef USE_NORMALMAP
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
#endif`,Em=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Am=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Pm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Im=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Um=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,km=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Om=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
}`,Hm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vm=`#ifdef USE_SKINNING
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
#endif`,Gm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wm=`#ifdef USE_SKINNING
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
#endif`,Xm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$m=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ym=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jm=`#ifdef USE_TRANSMISSION
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
#endif`,Km=`#ifdef USE_TRANSMISSION
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
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,e0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const t0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,n0=`uniform sampler2D t2D;
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
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,s0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,r0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a0=`#include <common>
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
}`,c0=`#if DEPTH_PACKING == 3200
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
}`,l0=`#define DISTANCE
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
}`,u0=`#define DISTANCE
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
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`uniform float scale;
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
}`,p0=`uniform vec3 diffuse;
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
}`,m0=`#include <common>
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
}`,g0=`uniform vec3 diffuse;
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
}`,v0=`#define LAMBERT
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
}`,_0=`#define LAMBERT
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
}`,x0=`#define MATCAP
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
}`,y0=`#define MATCAP
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
}`,M0=`#define NORMAL
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
}`,S0=`#define NORMAL
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
}`,b0=`#define PHONG
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
}`,w0=`#define PHONG
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
}`,E0=`#define STANDARD
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
}`,A0=`#define STANDARD
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
}`,T0=`#define TOON
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
}`,R0=`#define TOON
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
}`,C0=`uniform float size;
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
}`,P0=`uniform vec3 diffuse;
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
}`,L0=`#include <common>
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
}`,I0=`uniform vec3 color;
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
}`,U0=`uniform float rotation;
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
}`,D0=`uniform vec3 diffuse;
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
}`,Ke={alphahash_fragment:np,alphahash_pars_fragment:ip,alphamap_fragment:sp,alphamap_pars_fragment:rp,alphatest_fragment:op,alphatest_pars_fragment:ap,aomap_fragment:cp,aomap_pars_fragment:lp,batching_pars_vertex:up,batching_vertex:hp,begin_vertex:fp,beginnormal_vertex:dp,bsdfs:pp,iridescence_fragment:mp,bumpmap_pars_fragment:gp,clipping_planes_fragment:vp,clipping_planes_pars_fragment:_p,clipping_planes_pars_vertex:xp,clipping_planes_vertex:yp,color_fragment:Mp,color_pars_fragment:Sp,color_pars_vertex:bp,color_vertex:wp,common:Ep,cube_uv_reflection_fragment:Ap,defaultnormal_vertex:Tp,displacementmap_pars_vertex:Rp,displacementmap_vertex:Cp,emissivemap_fragment:Pp,emissivemap_pars_fragment:Lp,colorspace_fragment:Ip,colorspace_pars_fragment:Up,envmap_fragment:Dp,envmap_common_pars_fragment:Np,envmap_pars_fragment:Fp,envmap_pars_vertex:kp,envmap_physical_pars_fragment:Yp,envmap_vertex:Op,fog_vertex:zp,fog_pars_vertex:Bp,fog_fragment:Hp,fog_pars_fragment:Vp,gradientmap_pars_fragment:Gp,lightmap_pars_fragment:Wp,lights_lambert_fragment:Xp,lights_lambert_pars_fragment:qp,lights_pars_begin:$p,lights_toon_fragment:jp,lights_toon_pars_fragment:Kp,lights_phong_fragment:Jp,lights_phong_pars_fragment:Zp,lights_physical_fragment:Qp,lights_physical_pars_fragment:em,lights_fragment_begin:tm,lights_fragment_maps:nm,lights_fragment_end:im,logdepthbuf_fragment:sm,logdepthbuf_pars_fragment:rm,logdepthbuf_pars_vertex:om,logdepthbuf_vertex:am,map_fragment:cm,map_pars_fragment:lm,map_particle_fragment:um,map_particle_pars_fragment:hm,metalnessmap_fragment:fm,metalnessmap_pars_fragment:dm,morphinstance_vertex:pm,morphcolor_vertex:mm,morphnormal_vertex:gm,morphtarget_pars_vertex:vm,morphtarget_vertex:_m,normal_fragment_begin:xm,normal_fragment_maps:ym,normal_pars_fragment:Mm,normal_pars_vertex:Sm,normal_vertex:bm,normalmap_pars_fragment:wm,clearcoat_normal_fragment_begin:Em,clearcoat_normal_fragment_maps:Am,clearcoat_pars_fragment:Tm,iridescence_pars_fragment:Rm,opaque_fragment:Cm,packing:Pm,premultiplied_alpha_fragment:Lm,project_vertex:Im,dithering_fragment:Um,dithering_pars_fragment:Dm,roughnessmap_fragment:Nm,roughnessmap_pars_fragment:Fm,shadowmap_pars_fragment:km,shadowmap_pars_vertex:Om,shadowmap_vertex:zm,shadowmask_pars_fragment:Bm,skinbase_vertex:Hm,skinning_pars_vertex:Vm,skinning_vertex:Gm,skinnormal_vertex:Wm,specularmap_fragment:Xm,specularmap_pars_fragment:qm,tonemapping_fragment:$m,tonemapping_pars_fragment:Ym,transmission_fragment:jm,transmission_pars_fragment:Km,uv_pars_fragment:Jm,uv_pars_vertex:Zm,uv_vertex:Qm,worldpos_vertex:e0,background_vert:t0,background_frag:n0,backgroundCube_vert:i0,backgroundCube_frag:s0,cube_vert:r0,cube_frag:o0,depth_vert:a0,depth_frag:c0,distanceRGBA_vert:l0,distanceRGBA_frag:u0,equirect_vert:h0,equirect_frag:f0,linedashed_vert:d0,linedashed_frag:p0,meshbasic_vert:m0,meshbasic_frag:g0,meshlambert_vert:v0,meshlambert_frag:_0,meshmatcap_vert:x0,meshmatcap_frag:y0,meshnormal_vert:M0,meshnormal_frag:S0,meshphong_vert:b0,meshphong_frag:w0,meshphysical_vert:E0,meshphysical_frag:A0,meshtoon_vert:T0,meshtoon_frag:R0,points_vert:C0,points_frag:P0,shadow_vert:L0,shadow_frag:I0,sprite_vert:U0,sprite_frag:D0},pe={common:{diffuse:{value:new He(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Je}},envmap:{envMap:{value:null},envMapRotation:{value:new Je},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Je},normalScale:{value:new ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new He(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new He(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0},uvTransform:{value:new Je}},sprite:{diffuse:{value:new He(16777215)},opacity:{value:1},center:{value:new ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Je},alphaMap:{value:null},alphaMapTransform:{value:new Je},alphaTest:{value:0}}},Cn={basic:{uniforms:zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new He(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new He(0)},specular:{value:new He(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:zt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new He(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:zt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new He(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:zt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:zt([pe.points,pe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:zt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:zt([pe.common,pe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:zt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:zt([pe.sprite,pe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Je}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:zt([pe.common,pe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:zt([pe.lights,pe.fog,{color:{value:new He(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Cn.physical={uniforms:zt([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Je},clearcoatNormalScale:{value:new ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Je},sheen:{value:0},sheenColor:{value:new He(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Je},transmissionSamplerSize:{value:new ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Je},attenuationDistance:{value:0},attenuationColor:{value:new He(0)},specularColor:{value:new He(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Je},anisotropyVector:{value:new ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Je}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Nr={r:0,b:0,g:0},xi=new on,N0=new ct;function F0(n,e,t,i,s,r,o){const a=new He(0);let l=r===!0?0:1,u,c,p=null,m=0,f=null;function h(x){let y=x.isScene===!0?x.background:null;return y&&y.isTexture&&(y=(x.backgroundBlurriness>0?t:e).get(y)),y}function v(x){let y=!1;const M=h(x);M===null?g(a,l):M&&M.isColor&&(g(M,1),y=!0);const w=n.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function d(x,y){const M=h(y);M&&(M.isCubeTexture||M.mapping===wo)?(c===void 0&&(c=new pt(new mn(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:ys(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,b,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),xi.copy(y.backgroundRotation),xi.x*=-1,xi.y*=-1,xi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(N0.makeRotationFromEuler(xi)),c.material.toneMapped=at.getTransfer(M.colorSpace)!==vt,(p!==M||m!==M.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,p=M,m=M.version,f=n.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(u===void 0&&(u=new pt(new Li(2,2),new An({name:"BackgroundMaterial",uniforms:ys(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(u)),u.material.uniforms.t2D.value=M,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=at.getTransfer(M.colorSpace)!==vt,M.matrixAutoUpdate===!0&&M.updateMatrix(),u.material.uniforms.uvTransform.value.copy(M.matrix),(p!==M||m!==M.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,p=M,m=M.version,f=n.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null))}function g(x,y){x.getRGB(Nr,kh(n)),i.buffers.color.setClear(Nr.r,Nr.g,Nr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),l=y,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,g(a,l)},render:v,addToRenderList:d}}function k0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=m(null);let r=s,o=!1;function a(S,A,k,H,G){let O=!1;const I=p(H,k,A);r!==I&&(r=I,u(r.object)),O=f(S,H,k,G),O&&h(S,H,k,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(O||o)&&(o=!1,M(S,A,k,H),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function u(S){return n.bindVertexArray(S)}function c(S){return n.deleteVertexArray(S)}function p(S,A,k){const H=k.wireframe===!0;let G=i[S.id];G===void 0&&(G={},i[S.id]=G);let O=G[A.id];O===void 0&&(O={},G[A.id]=O);let I=O[H];return I===void 0&&(I=m(l()),O[H]=I),I}function m(S){const A=[],k=[],H=[];for(let G=0;G<t;G++)A[G]=0,k[G]=0,H[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:k,attributeDivisors:H,object:S,attributes:{},index:null}}function f(S,A,k,H){const G=r.attributes,O=A.attributes;let I=0;const W=k.getAttributes();for(const D in W)if(W[D].location>=0){const ce=G[D];let he=O[D];if(he===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&(he=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&(he=S.instanceColor)),ce===void 0||ce.attribute!==he||he&&ce.data!==he.data)return!0;I++}return r.attributesNum!==I||r.index!==H}function h(S,A,k,H){const G={},O=A.attributes;let I=0;const W=k.getAttributes();for(const D in W)if(W[D].location>=0){let ce=O[D];ce===void 0&&(D==="instanceMatrix"&&S.instanceMatrix&&(ce=S.instanceMatrix),D==="instanceColor"&&S.instanceColor&&(ce=S.instanceColor));const he={};he.attribute=ce,ce&&ce.data&&(he.data=ce.data),G[D]=he,I++}r.attributes=G,r.attributesNum=I,r.index=H}function v(){const S=r.newAttributes;for(let A=0,k=S.length;A<k;A++)S[A]=0}function d(S){g(S,0)}function g(S,A){const k=r.newAttributes,H=r.enabledAttributes,G=r.attributeDivisors;k[S]=1,H[S]===0&&(n.enableVertexAttribArray(S),H[S]=1),G[S]!==A&&(n.vertexAttribDivisor(S,A),G[S]=A)}function x(){const S=r.newAttributes,A=r.enabledAttributes;for(let k=0,H=A.length;k<H;k++)A[k]!==S[k]&&(n.disableVertexAttribArray(k),A[k]=0)}function y(S,A,k,H,G,O,I){I===!0?n.vertexAttribIPointer(S,A,k,G,O):n.vertexAttribPointer(S,A,k,H,G,O)}function M(S,A,k,H){v();const G=H.attributes,O=k.getAttributes(),I=A.defaultAttributeValues;for(const W in O){const D=O[W];if(D.location>=0){let re=G[W];if(re===void 0&&(W==="instanceMatrix"&&S.instanceMatrix&&(re=S.instanceMatrix),W==="instanceColor"&&S.instanceColor&&(re=S.instanceColor)),re!==void 0){const ce=re.normalized,he=re.itemSize,Q=e.get(re);if(Q===void 0)continue;const me=Q.buffer,K=Q.type,j=Q.bytesPerElement,de=K===n.INT||K===n.UNSIGNED_INT||re.gpuType===Vc;if(re.isInterleavedBufferAttribute){const fe=re.data,q=fe.stride,ee=re.offset;if(fe.isInstancedInterleavedBuffer){for(let ie=0;ie<D.locationSize;ie++)g(D.location+ie,fe.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=fe.meshPerAttribute*fe.count)}else for(let ie=0;ie<D.locationSize;ie++)d(D.location+ie);n.bindBuffer(n.ARRAY_BUFFER,me);for(let ie=0;ie<D.locationSize;ie++)y(D.location+ie,he/D.locationSize,K,ce,q*j,(ee+he/D.locationSize*ie)*j,de)}else{if(re.isInstancedBufferAttribute){for(let fe=0;fe<D.locationSize;fe++)g(D.location+fe,re.meshPerAttribute);S.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let fe=0;fe<D.locationSize;fe++)d(D.location+fe);n.bindBuffer(n.ARRAY_BUFFER,me);for(let fe=0;fe<D.locationSize;fe++)y(D.location+fe,he/D.locationSize,K,ce,he*j,he/D.locationSize*fe*j,de)}}else if(I!==void 0){const ce=I[W];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(D.location,ce);break;case 3:n.vertexAttrib3fv(D.location,ce);break;case 4:n.vertexAttrib4fv(D.location,ce);break;default:n.vertexAttrib1fv(D.location,ce)}}}}x()}function w(){T();for(const S in i){const A=i[S];for(const k in A){const H=A[k];for(const G in H)c(H[G].object),delete H[G];delete A[k]}delete i[S]}}function b(S){if(i[S.id]===void 0)return;const A=i[S.id];for(const k in A){const H=A[k];for(const G in H)c(H[G].object),delete H[G];delete A[k]}delete i[S.id]}function _(S){for(const A in i){const k=i[A];if(k[S.id]===void 0)continue;const H=k[S.id];for(const G in H)c(H[G].object),delete H[G];delete k[S.id]}}function T(){U(),o=!0,r!==s&&(r=s,u(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:T,resetDefaultState:U,dispose:w,releaseStatesOfGeometry:b,releaseStatesOfProgram:_,initAttributes:v,enableAttribute:d,disableUnusedAttributes:x}}function O0(n,e,t){let i;function s(u){i=u}function r(u,c){n.drawArrays(i,u,c),t.update(c,i,1)}function o(u,c,p){p!==0&&(n.drawArraysInstanced(i,u,c,p),t.update(c,i,p))}function a(u,c,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,c,0,p);let f=0;for(let h=0;h<p;h++)f+=c[h];t.update(f,i,1)}function l(u,c,p,m){if(p===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let h=0;h<u.length;h++)o(u[h],c[h],m[h]);else{f.multiDrawArraysInstancedWEBGL(i,u,0,c,0,m,0,p);let h=0;for(let v=0;v<p;v++)h+=c[v];for(let v=0;v<m.length;v++)t.update(h,i,m[v])}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function z0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const _=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(_){return!(_!==pn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){const T=_===hr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(_!==Yn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&_!==In&&!T)}function l(_){if(_==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=t.precision!==void 0?t.precision:"highp";const c=l(u);c!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",c,"instead."),u=c);const p=t.logarithmicDepthBuffer===!0,m=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(m===!0){const _=e.get("EXT_clip_control");_.clipControlEXT(_.LOWER_LEFT_EXT,_.ZERO_TO_ONE_EXT)}const f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),d=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),x=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=h>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:p,reverseDepthBuffer:m,maxTextures:f,maxVertexTextures:h,maxTextureSize:v,maxCubemapSize:d,maxAttributes:g,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:M,vertexTextures:w,maxSamples:b}}function B0(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Si,a=new Je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,m){const f=p.length!==0||m||i!==0||s;return s=m,i=p.length,f},this.beginShadows=function(){r=!0,c(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,m){t=c(p,m,0)},this.setState=function(p,m,f){const h=p.clippingPlanes,v=p.clipIntersection,d=p.clipShadows,g=n.get(p);if(!s||h===null||h.length===0||r&&!d)r?c(null):u();else{const x=r?0:i,y=x*4;let M=g.clippingState||null;l.value=M,M=c(h,m,y,f);for(let w=0;w!==y;++w)M[w]=t[w];g.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function u(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function c(p,m,f,h){const v=p!==null?p.length:0;let d=null;if(v!==0){if(d=l.value,h!==!0||d===null){const g=f+v*4,x=m.matrixWorldInverse;a.getNormalMatrix(x),(d===null||d.length<g)&&(d=new Float32Array(g));for(let y=0,M=f;y!==v;++y,M+=4)o.copy(p[y]).applyMatrix4(x,a),o.normal.toArray(d,M),d[M+3]=o.constant}l.value=d,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,d}}function H0(n){let e=new WeakMap;function t(o,a){return a===$a?o.mapping=gs:a===Ya&&(o.mapping=vs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===$a||a===Ya)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new Zd(l.height);return u.fromEquirectangularTexture(n,o),e.set(o,u),o.addEventListener("dispose",s),t(u.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Hh extends Oh{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=u*this.view.offsetX,o=r+u*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const os=4,Ql=[.125,.215,.35,.446,.526,.582],Ei=20,la=new Hh,eu=new He;let ua=null,ha=0,fa=0,da=!1;const bi=(1+Math.sqrt(5))/2,Ji=1/bi,tu=[new F(-bi,Ji,0),new F(bi,Ji,0),new F(-Ji,0,bi),new F(Ji,0,bi),new F(0,bi,-Ji),new F(0,bi,Ji),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class nu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){ua=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ru(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=su(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ua,ha,fa),this._renderer.xr.enabled=da,e.scissorTest=!1,Fr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gs||e.mapping===vs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ua=this._renderer.getRenderTarget(),ha=this._renderer.getActiveCubeFace(),fa=this._renderer.getActiveMipmapLevel(),da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Sn,minFilter:Sn,generateMipmaps:!1,type:hr,format:pn,colorSpace:fi,depthBuffer:!1},s=iu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=iu(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=V0(r)),this._blurMaterial=G0(r,e,t)}return s}_compileMaterial(e){const t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,la)}_sceneToCubeUV(e,t,i,s){const a=new dn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,p=c.autoClear,m=c.toneMapping;c.getClearColor(eu),c.toneMapping=qn,c.autoClear=!1;const f=new tn({name:"PMREM.Background",side:kt,depthWrite:!1,depthTest:!1}),h=new pt(new mn,f);let v=!1;const d=e.background;d?d.isColor&&(f.color.copy(d),e.background=null,v=!0):(f.color.copy(eu),v=!0);for(let g=0;g<6;g++){const x=g%3;x===0?(a.up.set(0,l[g],0),a.lookAt(u[g],0,0)):x===1?(a.up.set(0,0,l[g]),a.lookAt(0,u[g],0)):(a.up.set(0,l[g],0),a.lookAt(0,0,u[g]));const y=this._cubeSize;Fr(s,x*y,g>2?y:0,y,y),c.setRenderTarget(s),v&&c.render(h,a),c.render(e,a)}h.geometry.dispose(),h.material.dispose(),c.toneMapping=m,c.autoClear=p,e.background=d}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===gs||e.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ru()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=su());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new pt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Fr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,la)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=tu[(s-r-1)%tu.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,p=new pt(this._lodPlanes[s],u),m=u.uniforms,f=this._sizeLods[i]-1,h=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ei-1),v=r/h,d=isFinite(r)?1+Math.floor(c*v):Ei;d>Ei&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${d} samples when the maximum is set to ${Ei}`);const g=[];let x=0;for(let _=0;_<Ei;++_){const T=_/v,U=Math.exp(-T*T/2);g.push(U),_===0?x+=U:_<d&&(x+=2*U)}for(let _=0;_<g.length;_++)g[_]=g[_]/x;m.envMap.value=e.texture,m.samples.value=d,m.weights.value=g,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:y}=this;m.dTheta.value=h,m.mipInt.value=y-i;const M=this._sizeLods[s],w=3*M*(s>y-os?s-y+os:0),b=4*(this._cubeSize-M);Fr(t,w,b,3*M,2*M),l.setRenderTarget(t),l.render(p,la)}}function V0(n){const e=[],t=[],i=[];let s=n;const r=n-os+1+Ql.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-os?l=Ql[o-n+os-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),c=-u,p=1+u,m=[c,c,p,c,p,p,c,c,p,p,c,p],f=6,h=6,v=3,d=2,g=1,x=new Float32Array(v*h*f),y=new Float32Array(d*h*f),M=new Float32Array(g*h*f);for(let b=0;b<f;b++){const _=b%3*2/3-1,T=b>2?0:-1,U=[_,T,0,_+2/3,T,0,_+2/3,T+1,0,_,T,0,_+2/3,T+1,0,_,T+1,0];x.set(U,v*h*b),y.set(m,d*h*b);const S=[b,b,b,b,b,b];M.set(S,g*h*b)}const w=new Ct;w.setAttribute("position",new rn(x,v)),w.setAttribute("uv",new rn(y,d)),w.setAttribute("faceIndex",new rn(M,g)),e.push(w),s>os&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function iu(n,e,t){const i=new Pi(n,e,t);return i.texture.mapping=wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Fr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function G0(n,e,t){const i=new Float32Array(Ei),s=new F(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Zc(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function su(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zc(),fragmentShader:`

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
		`,blending:li,depthTest:!1,depthWrite:!1})}function ru(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Zc(){return`

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
	`}function W0(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===$a||l===Ya,c=l===gs||l===vs;if(u||c){let p=e.get(a);const m=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return t===null&&(t=new nu(n)),p=u?t.fromEquirectangular(a,p):t.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,e.set(a,p),p.texture;if(p!==void 0)return p.texture;{const f=a.image;return u&&f&&f.height>0||c&&f&&s(f)?(t===null&&(t=new nu(n)),p=u?t.fromEquirectangular(a):t.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,e.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const u=6;for(let c=0;c<u;c++)a[c]!==void 0&&l++;return l===u}function r(a){const l=a.target;l.removeEventListener("dispose",r);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function X0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&oo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function q0(n,e,t,i){const s={},r=new WeakMap;function o(p){const m=p.target;m.index!==null&&e.remove(m.index);for(const h in m.attributes)e.remove(m.attributes[h]);for(const h in m.morphAttributes){const v=m.morphAttributes[h];for(let d=0,g=v.length;d<g;d++)e.remove(v[d])}m.removeEventListener("dispose",o),delete s[m.id];const f=r.get(m);f&&(e.remove(f),r.delete(m)),i.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function a(p,m){return s[m.id]===!0||(m.addEventListener("dispose",o),s[m.id]=!0,t.memory.geometries++),m}function l(p){const m=p.attributes;for(const h in m)e.update(m[h],n.ARRAY_BUFFER);const f=p.morphAttributes;for(const h in f){const v=f[h];for(let d=0,g=v.length;d<g;d++)e.update(v[d],n.ARRAY_BUFFER)}}function u(p){const m=[],f=p.index,h=p.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let y=0,M=x.length;y<M;y+=3){const w=x[y+0],b=x[y+1],_=x[y+2];m.push(w,b,b,_,_,w)}}else if(h!==void 0){const x=h.array;v=h.version;for(let y=0,M=x.length/3-1;y<M;y+=3){const w=y+0,b=y+1,_=y+2;m.push(w,b,b,_,_,w)}}else return;const d=new(Ph(m)?Fh:Nh)(m,1);d.version=v;const g=r.get(p);g&&e.remove(g),r.set(p,d)}function c(p){const m=r.get(p);if(m){const f=p.index;f!==null&&m.version<f.version&&u(p)}else u(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:c}}function $0(n,e,t){let i;function s(m){i=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function l(m,f){n.drawElements(i,f,r,m*o),t.update(f,i,1)}function u(m,f,h){h!==0&&(n.drawElementsInstanced(i,f,r,m*o,h),t.update(f,i,h))}function c(m,f,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,m,0,h);let d=0;for(let g=0;g<h;g++)d+=f[g];t.update(d,i,1)}function p(m,f,h,v){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<m.length;g++)u(m[g]/o,f[g],v[g]);else{d.multiDrawElementsInstancedWEBGL(i,f,0,r,m,0,v,0,h);let g=0;for(let x=0;x<h;x++)g+=f[x];for(let x=0;x<v.length;x++)t.update(g,i,v[x])}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=c,this.renderMultiDrawInstances=p}function Y0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function j0(n,e,t){const i=new WeakMap,s=new St;function r(o,a,l){const u=o.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=c!==void 0?c.length:0;let m=i.get(a);if(m===void 0||m.count!==p){let U=function(){_.dispose(),i.delete(a),a.removeEventListener("dispose",U)};m!==void 0&&m.texture.dispose();const f=a.morphAttributes.position!==void 0,h=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),h===!0&&(y=2),v===!0&&(y=3);let M=a.attributes.position.count*y,w=1;M>e.maxTextureSize&&(w=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const b=new Float32Array(M*w*4*p),_=new Ih(b,M,w,p);_.type=In,_.needsUpdate=!0;const T=y*4;for(let S=0;S<p;S++){const A=d[S],k=g[S],H=x[S],G=M*w*4*S;for(let O=0;O<A.count;O++){const I=O*T;f===!0&&(s.fromBufferAttribute(A,O),b[G+I+0]=s.x,b[G+I+1]=s.y,b[G+I+2]=s.z,b[G+I+3]=0),h===!0&&(s.fromBufferAttribute(k,O),b[G+I+4]=s.x,b[G+I+5]=s.y,b[G+I+6]=s.z,b[G+I+7]=0),v===!0&&(s.fromBufferAttribute(H,O),b[G+I+8]=s.x,b[G+I+9]=s.y,b[G+I+10]=s.z,b[G+I+11]=H.itemSize===4?s.w:1)}}m={count:p,texture:_,size:new ye(M,w)},i.set(a,m),a.addEventListener("dispose",U)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let v=0;v<u.length;v++)f+=u[v];const h=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",h),l.getUniforms().setValue(n,"morphTargetInfluences",u)}l.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}return{update:r}}function K0(n,e,t,i){let s=new WeakMap;function r(l){const u=i.render.frame,c=l.geometry,p=e.get(l,c);if(s.get(p)!==u&&(e.update(p),s.set(p,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return p}function o(){s=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:r,dispose:o}}class Vh extends Ot{constructor(e,t,i,s,r,o,a,l,u,c=us){if(c!==us&&c!==xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&c===us&&(i=Ci),i===void 0&&c===xs&&(i=_s),super(null,s,r,o,a,l,c,i,u),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Vt,this.minFilter=l!==void 0?l:Vt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gh=new Ot,ou=new Vh(1,1),Wh=new Ih,Xh=new Nd,qh=new zh,au=[],cu=[],lu=new Float32Array(16),uu=new Float32Array(9),hu=new Float32Array(4);function As(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=au[s];if(r===void 0&&(r=new Float32Array(s),au[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Tt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Ao(n,e){let t=cu[e];t===void 0&&(t=new Int32Array(e),cu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function J0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Z0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function Q0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function eg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function tg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;hu.set(i),n.uniformMatrix2fv(this.addr,!1,hu),Rt(t,i)}}function ng(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;uu.set(i),n.uniformMatrix3fv(this.addr,!1,uu),Rt(t,i)}}function ig(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Tt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Tt(t,i))return;lu.set(i),n.uniformMatrix4fv(this.addr,!1,lu),Rt(t,i)}}function sg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function rg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function og(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function ag(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function cg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function lg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function ug(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function fg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(ou.compareFunction=Ch,r=ou):r=Gh,t.setTexture2D(e||r,s)}function dg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||Xh,s)}function pg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||qh,s)}function mg(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Wh,s)}function gg(n){switch(n){case 5126:return J0;case 35664:return Z0;case 35665:return Q0;case 35666:return eg;case 35674:return tg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return og;case 35669:case 35673:return ag;case 5125:return cg;case 36294:return lg;case 36295:return ug;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return fg;case 35679:case 36299:case 36307:return dg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}function vg(n,e){n.uniform1fv(this.addr,e)}function _g(n,e){const t=As(e,this.size,2);n.uniform2fv(this.addr,t)}function xg(n,e){const t=As(e,this.size,3);n.uniform3fv(this.addr,t)}function yg(n,e){const t=As(e,this.size,4);n.uniform4fv(this.addr,t)}function Mg(n,e){const t=As(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Sg(n,e){const t=As(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function bg(n,e){const t=As(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function wg(n,e){n.uniform1iv(this.addr,e)}function Eg(n,e){n.uniform2iv(this.addr,e)}function Ag(n,e){n.uniform3iv(this.addr,e)}function Tg(n,e){n.uniform4iv(this.addr,e)}function Rg(n,e){n.uniform1uiv(this.addr,e)}function Cg(n,e){n.uniform2uiv(this.addr,e)}function Pg(n,e){n.uniform3uiv(this.addr,e)}function Lg(n,e){n.uniform4uiv(this.addr,e)}function Ig(n,e,t){const i=this.cache,s=e.length,r=Ao(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Gh,r[o])}function Ug(n,e,t){const i=this.cache,s=e.length,r=Ao(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Xh,r[o])}function Dg(n,e,t){const i=this.cache,s=e.length,r=Ao(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||qh,r[o])}function Ng(n,e,t){const i=this.cache,s=e.length,r=Ao(t,s);Tt(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Wh,r[o])}function Fg(n){switch(n){case 5126:return vg;case 35664:return _g;case 35665:return xg;case 35666:return yg;case 35674:return Mg;case 35675:return Sg;case 35676:return bg;case 5124:case 35670:return wg;case 35667:case 35671:return Eg;case 35668:case 35672:return Ag;case 35669:case 35673:return Tg;case 5125:return Rg;case 36294:return Cg;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return Dg;case 36289:case 36303:case 36311:case 36292:return Ng}}class kg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=gg(t.type)}}class Og{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Fg(t.type)}}class zg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const pa=/(\w+)(\])?(\[|\.)?/g;function fu(n,e){n.seq.push(e),n.map[e.id]=e}function Bg(n,e,t){const i=n.name,s=i.length;for(pa.lastIndex=0;;){const r=pa.exec(i),o=pa.lastIndex;let a=r[1];const l=r[2]==="]",u=r[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===s){fu(t,u===void 0?new kg(a,n,e):new Og(a,n,e));break}else{let p=t.map[a];p===void 0&&(p=new zg(a),fu(t,p)),t=p}}}class ao{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Bg(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function du(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Hg=37297;let Vg=0;function Gg(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}function Wg(n){const e=at.getPrimaries(at.workingColorSpace),t=at.getPrimaries(n);let i;switch(e===t?i="":e===mo&&t===po?i="LinearDisplayP3ToLinearSRGB":e===po&&t===mo&&(i="LinearSRGBToLinearDisplayP3"),n){case fi:case Eo:return[i,"LinearTransferOETF"];case fn:case Kc:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function pu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Gg(n.getShaderSource(e),o)}else return s}function Xg(n,e){const t=Wg(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qg(n,e){let t;switch(e){case ad:t="Linear";break;case cd:t="Reinhard";break;case ld:t="Cineon";break;case ud:t="ACESFilmic";break;case fd:t="AgX";break;case dd:t="Neutral";break;case hd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const kr=new F;function $g(){at.getLuminanceCoefficients(kr);const n=kr.x.toFixed(4),e=kr.y.toFixed(4),t=kr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Yg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qs).join(`
`)}function jg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Kg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function qs(n){return n!==""}function mu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function gu(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function wc(n){return n.replace(Jg,Qg)}const Zg=new Map;function Qg(n,e){let t=Ke[e];if(t===void 0){const i=Zg.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return wc(t)}const ev=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vu(n){return n.replace(ev,tv)}function tv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function _u(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function nv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===vh?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===_h?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Gn&&(e="SHADOWMAP_TYPE_VSM"),e}function iv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case gs:case vs:e="ENVMAP_TYPE_CUBE";break;case wo:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case vs:e="ENVMAP_MODE_REFRACTION";break}return e}function rv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Hc:e="ENVMAP_BLENDING_MULTIPLY";break;case rd:e="ENVMAP_BLENDING_MIX";break;case od:e="ENVMAP_BLENDING_ADD";break}return e}function ov(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function av(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=nv(t),u=iv(t),c=sv(t),p=rv(t),m=ov(t),f=Yg(t),h=jg(r),v=s.createProgram();let d,g,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(qs).join(`
`),d.length>0&&(d+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(qs).join(`
`),g.length>0&&(g+=`
`)):(d=[_u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qs).join(`
`),g=[_u(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.envMap?"#define "+c:"",t.envMap?"#define "+p:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Ke.tonemapping_pars_fragment:"",t.toneMapping!==qn?qg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,Xg("linearToOutputTexel",t.outputColorSpace),$g(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qs).join(`
`)),o=wc(o),o=mu(o,t),o=gu(o,t),a=wc(a),a=mu(a,t),a=gu(a,t),o=vu(o),a=vu(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,g=["#define varying in",t.glslVersion===Nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const y=x+d+o,M=x+g+a,w=du(s,s.VERTEX_SHADER,y),b=du(s,s.FRAGMENT_SHADER,M);s.attachShader(v,w),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function _(A){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(v).trim(),H=s.getShaderInfoLog(w).trim(),G=s.getShaderInfoLog(b).trim();let O=!0,I=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(O=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,w,b);else{const W=pu(s,w,"vertex"),D=pu(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+k+`
`+W+`
`+D)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(H===""||G==="")&&(I=!1);I&&(A.diagnostics={runnable:O,programLog:k,vertexShader:{log:H,prefix:d},fragmentShader:{log:G,prefix:g}})}s.deleteShader(w),s.deleteShader(b),T=new ao(s,v),U=Kg(s,v)}let T;this.getUniforms=function(){return T===void 0&&_(this),T};let U;this.getAttributes=function(){return U===void 0&&_(this),U};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,Hg)),S},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=b,this}let cv=0;class lv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new uv(e),t.set(e,i)),i}}class uv{constructor(e){this.id=cv++,this.code=e,this.usedTimes=0}}function hv(n,e,t,i,s,r,o){const a=new Uh,l=new lv,u=new Set,c=[],p=s.logarithmicDepthBuffer,m=s.reverseDepthBuffer,f=s.vertexTextures;let h=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(S){return u.add(S),S===0?"uv":`uv${S}`}function g(S,A,k,H,G){const O=H.fog,I=G.geometry,W=S.isMeshStandardMaterial?H.environment:null,D=(S.isMeshStandardMaterial?t:e).get(S.envMap||W),re=D&&D.mapping===wo?D.image.height:null,ce=v[S.type];S.precision!==null&&(h=s.getMaxPrecision(S.precision),h!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",h,"instead."));const he=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Q=he!==void 0?he.length:0;let me=0;I.morphAttributes.position!==void 0&&(me=1),I.morphAttributes.normal!==void 0&&(me=2),I.morphAttributes.color!==void 0&&(me=3);let K,j,de,fe;if(ce){const Wt=Cn[ce];K=Wt.vertexShader,j=Wt.fragmentShader}else K=S.vertexShader,j=S.fragmentShader,l.update(S),de=l.getVertexShaderID(S),fe=l.getFragmentShaderID(S);const q=n.getRenderTarget(),ee=G.isInstancedMesh===!0,ie=G.isBatchedMesh===!0,N=!!S.map,$=!!S.matcap,L=!!D,Me=!!S.aoMap,ge=!!S.lightMap,Te=!!S.bumpMap,ne=!!S.normalMap,Ce=!!S.displacementMap,Se=!!S.emissiveMap,P=!!S.metalnessMap,E=!!S.roughnessMap,X=S.anisotropy>0,se=S.clearcoat>0,ae=S.dispersion>0,Z=S.iridescence>0,Re=S.sheen>0,ve=S.transmission>0,be=X&&!!S.anisotropyMap,ze=se&&!!S.clearcoatMap,le=se&&!!S.clearcoatNormalMap,we=se&&!!S.clearcoatRoughnessMap,Be=Z&&!!S.iridescenceMap,qe=Z&&!!S.iridescenceThicknessMap,Pe=Re&&!!S.sheenColorMap,et=Re&&!!S.sheenRoughnessMap,$e=!!S.specularMap,ft=!!S.specularColorMap,z=!!S.specularIntensityMap,Ee=ve&&!!S.transmissionMap,te=ve&&!!S.thicknessMap,oe=!!S.gradientMap,_e=!!S.alphaMap,Ae=S.alphaTest>0,nt=!!S.alphaHash,wt=!!S.extensions;let Gt=qn;S.toneMapped&&(q===null||q.isXRRenderTarget===!0)&&(Gt=n.toneMapping);const it={shaderID:ce,shaderType:S.type,shaderName:S.name,vertexShader:K,fragmentShader:j,defines:S.defines,customVertexShaderID:de,customFragmentShaderID:fe,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:h,batching:ie,batchingColor:ie&&G._colorsTexture!==null,instancing:ee,instancingColor:ee&&G.instanceColor!==null,instancingMorph:ee&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:q===null?n.outputColorSpace:q.isXRRenderTarget===!0?q.texture.colorSpace:fi,alphaToCoverage:!!S.alphaToCoverage,map:N,matcap:$,envMap:L,envMapMode:L&&D.mapping,envMapCubeUVHeight:re,aoMap:Me,lightMap:ge,bumpMap:Te,normalMap:ne,displacementMap:f&&Ce,emissiveMap:Se,normalMapObjectSpace:ne&&S.normalMapType===vd,normalMapTangentSpace:ne&&S.normalMapType===jc,metalnessMap:P,roughnessMap:E,anisotropy:X,anisotropyMap:be,clearcoat:se,clearcoatMap:ze,clearcoatNormalMap:le,clearcoatRoughnessMap:we,dispersion:ae,iridescence:Z,iridescenceMap:Be,iridescenceThicknessMap:qe,sheen:Re,sheenColorMap:Pe,sheenRoughnessMap:et,specularMap:$e,specularColorMap:ft,specularIntensityMap:z,transmission:ve,transmissionMap:Ee,thicknessMap:te,gradientMap:oe,opaque:S.transparent===!1&&S.blending===ls&&S.alphaToCoverage===!1,alphaMap:_e,alphaTest:Ae,alphaHash:nt,combine:S.combine,mapUv:N&&d(S.map.channel),aoMapUv:Me&&d(S.aoMap.channel),lightMapUv:ge&&d(S.lightMap.channel),bumpMapUv:Te&&d(S.bumpMap.channel),normalMapUv:ne&&d(S.normalMap.channel),displacementMapUv:Ce&&d(S.displacementMap.channel),emissiveMapUv:Se&&d(S.emissiveMap.channel),metalnessMapUv:P&&d(S.metalnessMap.channel),roughnessMapUv:E&&d(S.roughnessMap.channel),anisotropyMapUv:be&&d(S.anisotropyMap.channel),clearcoatMapUv:ze&&d(S.clearcoatMap.channel),clearcoatNormalMapUv:le&&d(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&d(S.clearcoatRoughnessMap.channel),iridescenceMapUv:Be&&d(S.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&d(S.iridescenceThicknessMap.channel),sheenColorMapUv:Pe&&d(S.sheenColorMap.channel),sheenRoughnessMapUv:et&&d(S.sheenRoughnessMap.channel),specularMapUv:$e&&d(S.specularMap.channel),specularColorMapUv:ft&&d(S.specularColorMap.channel),specularIntensityMapUv:z&&d(S.specularIntensityMap.channel),transmissionMapUv:Ee&&d(S.transmissionMap.channel),thicknessMapUv:te&&d(S.thicknessMap.channel),alphaMapUv:_e&&d(S.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ne||X),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!I.attributes.uv&&(N||_e),fog:!!O,useFog:S.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:m,skinning:G.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Q,morphTextureStride:me,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:Gt,decodeVideoTexture:N&&S.map.isVideoTexture===!0&&at.getTransfer(S.map.colorSpace)===vt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===en,flipSided:S.side===kt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:wt&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&S.extensions.multiDraw===!0||ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return it.vertexUv1s=u.has(1),it.vertexUv2s=u.has(2),it.vertexUv3s=u.has(3),u.clear(),it}function x(S){const A=[];if(S.shaderID?A.push(S.shaderID):(A.push(S.customVertexShaderID),A.push(S.customFragmentShaderID)),S.defines!==void 0)for(const k in S.defines)A.push(k),A.push(S.defines[k]);return S.isRawShaderMaterial===!1&&(y(A,S),M(A,S),A.push(n.outputColorSpace)),A.push(S.customProgramCacheKey),A.join()}function y(S,A){S.push(A.precision),S.push(A.outputColorSpace),S.push(A.envMapMode),S.push(A.envMapCubeUVHeight),S.push(A.mapUv),S.push(A.alphaMapUv),S.push(A.lightMapUv),S.push(A.aoMapUv),S.push(A.bumpMapUv),S.push(A.normalMapUv),S.push(A.displacementMapUv),S.push(A.emissiveMapUv),S.push(A.metalnessMapUv),S.push(A.roughnessMapUv),S.push(A.anisotropyMapUv),S.push(A.clearcoatMapUv),S.push(A.clearcoatNormalMapUv),S.push(A.clearcoatRoughnessMapUv),S.push(A.iridescenceMapUv),S.push(A.iridescenceThicknessMapUv),S.push(A.sheenColorMapUv),S.push(A.sheenRoughnessMapUv),S.push(A.specularMapUv),S.push(A.specularColorMapUv),S.push(A.specularIntensityMapUv),S.push(A.transmissionMapUv),S.push(A.thicknessMapUv),S.push(A.combine),S.push(A.fogExp2),S.push(A.sizeAttenuation),S.push(A.morphTargetsCount),S.push(A.morphAttributeCount),S.push(A.numDirLights),S.push(A.numPointLights),S.push(A.numSpotLights),S.push(A.numSpotLightMaps),S.push(A.numHemiLights),S.push(A.numRectAreaLights),S.push(A.numDirLightShadows),S.push(A.numPointLightShadows),S.push(A.numSpotLightShadows),S.push(A.numSpotLightShadowsWithMaps),S.push(A.numLightProbes),S.push(A.shadowMapType),S.push(A.toneMapping),S.push(A.numClippingPlanes),S.push(A.numClipIntersection),S.push(A.depthPacking)}function M(S,A){a.disableAll(),A.supportsVertexTextures&&a.enable(0),A.instancing&&a.enable(1),A.instancingColor&&a.enable(2),A.instancingMorph&&a.enable(3),A.matcap&&a.enable(4),A.envMap&&a.enable(5),A.normalMapObjectSpace&&a.enable(6),A.normalMapTangentSpace&&a.enable(7),A.clearcoat&&a.enable(8),A.iridescence&&a.enable(9),A.alphaTest&&a.enable(10),A.vertexColors&&a.enable(11),A.vertexAlphas&&a.enable(12),A.vertexUv1s&&a.enable(13),A.vertexUv2s&&a.enable(14),A.vertexUv3s&&a.enable(15),A.vertexTangents&&a.enable(16),A.anisotropy&&a.enable(17),A.alphaHash&&a.enable(18),A.batching&&a.enable(19),A.dispersion&&a.enable(20),A.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reverseDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.alphaToCoverage&&a.enable(20),S.push(a.mask)}function w(S){const A=v[S.type];let k;if(A){const H=Cn[A];k=Yd.clone(H.uniforms)}else k=S.uniforms;return k}function b(S,A){let k;for(let H=0,G=c.length;H<G;H++){const O=c[H];if(O.cacheKey===A){k=O,++k.usedTimes;break}}return k===void 0&&(k=new av(n,A,S,r),c.push(k)),k}function _(S){if(--S.usedTimes===0){const A=c.indexOf(S);c[A]=c[c.length-1],c.pop(),S.destroy()}}function T(S){l.remove(S)}function U(){l.dispose()}return{getParameters:g,getProgramCacheKey:x,getUniforms:w,acquireProgram:b,releaseProgram:_,releaseShaderCache:T,programs:c,dispose:U}}function fv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function dv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function xu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function yu(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(p,m,f,h,v,d){let g=n[e];return g===void 0?(g={id:p.id,object:p,geometry:m,material:f,groupOrder:h,renderOrder:p.renderOrder,z:v,group:d},n[e]=g):(g.id=p.id,g.object=p,g.geometry=m,g.material=f,g.groupOrder=h,g.renderOrder=p.renderOrder,g.z=v,g.group=d),e++,g}function a(p,m,f,h,v,d){const g=o(p,m,f,h,v,d);f.transmission>0?i.push(g):f.transparent===!0?s.push(g):t.push(g)}function l(p,m,f,h,v,d){const g=o(p,m,f,h,v,d);f.transmission>0?i.unshift(g):f.transparent===!0?s.unshift(g):t.unshift(g)}function u(p,m){t.length>1&&t.sort(p||dv),i.length>1&&i.sort(m||xu),s.length>1&&s.sort(m||xu)}function c(){for(let p=e,m=n.length;p<m;p++){const f=n[p];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:c,sort:u}}function pv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new yu,n.set(i,[o])):s>=r.length?(o=new yu,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function mv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new He};break;case"SpotLight":t={position:new F,direction:new F,color:new He,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new He,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new He,groundColor:new He};break;case"RectAreaLight":t={color:new He,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function gv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let vv=0;function _v(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function xv(n){const e=new mv,t=gv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new F);const s=new F,r=new ct,o=new ct;function a(u){let c=0,p=0,m=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let f=0,h=0,v=0,d=0,g=0,x=0,y=0,M=0,w=0,b=0,_=0;u.sort(_v);for(let U=0,S=u.length;U<S;U++){const A=u[U],k=A.color,H=A.intensity,G=A.distance,O=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)c+=k.r*H,p+=k.g*H,m+=k.b*H;else if(A.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(A.sh.coefficients[I],H);_++}else if(A.isDirectionalLight){const I=e.get(A);if(I.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const W=A.shadow,D=t.get(A);D.shadowIntensity=W.intensity,D.shadowBias=W.bias,D.shadowNormalBias=W.normalBias,D.shadowRadius=W.radius,D.shadowMapSize=W.mapSize,i.directionalShadow[f]=D,i.directionalShadowMap[f]=O,i.directionalShadowMatrix[f]=A.shadow.matrix,x++}i.directional[f]=I,f++}else if(A.isSpotLight){const I=e.get(A);I.position.setFromMatrixPosition(A.matrixWorld),I.color.copy(k).multiplyScalar(H),I.distance=G,I.coneCos=Math.cos(A.angle),I.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),I.decay=A.decay,i.spot[v]=I;const W=A.shadow;if(A.map&&(i.spotLightMap[w]=A.map,w++,W.updateMatrices(A),A.castShadow&&b++),i.spotLightMatrix[v]=W.matrix,A.castShadow){const D=t.get(A);D.shadowIntensity=W.intensity,D.shadowBias=W.bias,D.shadowNormalBias=W.normalBias,D.shadowRadius=W.radius,D.shadowMapSize=W.mapSize,i.spotShadow[v]=D,i.spotShadowMap[v]=O,M++}v++}else if(A.isRectAreaLight){const I=e.get(A);I.color.copy(k).multiplyScalar(H),I.halfWidth.set(A.width*.5,0,0),I.halfHeight.set(0,A.height*.5,0),i.rectArea[d]=I,d++}else if(A.isPointLight){const I=e.get(A);if(I.color.copy(A.color).multiplyScalar(A.intensity),I.distance=A.distance,I.decay=A.decay,A.castShadow){const W=A.shadow,D=t.get(A);D.shadowIntensity=W.intensity,D.shadowBias=W.bias,D.shadowNormalBias=W.normalBias,D.shadowRadius=W.radius,D.shadowMapSize=W.mapSize,D.shadowCameraNear=W.camera.near,D.shadowCameraFar=W.camera.far,i.pointShadow[h]=D,i.pointShadowMap[h]=O,i.pointShadowMatrix[h]=A.shadow.matrix,y++}i.point[h]=I,h++}else if(A.isHemisphereLight){const I=e.get(A);I.skyColor.copy(A.color).multiplyScalar(H),I.groundColor.copy(A.groundColor).multiplyScalar(H),i.hemi[g]=I,g++}}d>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=c,i.ambient[1]=p,i.ambient[2]=m;const T=i.hash;(T.directionalLength!==f||T.pointLength!==h||T.spotLength!==v||T.rectAreaLength!==d||T.hemiLength!==g||T.numDirectionalShadows!==x||T.numPointShadows!==y||T.numSpotShadows!==M||T.numSpotMaps!==w||T.numLightProbes!==_)&&(i.directional.length=f,i.spot.length=v,i.rectArea.length=d,i.point.length=h,i.hemi.length=g,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=M+w-b,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=_,T.directionalLength=f,T.pointLength=h,T.spotLength=v,T.rectAreaLength=d,T.hemiLength=g,T.numDirectionalShadows=x,T.numPointShadows=y,T.numSpotShadows=M,T.numSpotMaps=w,T.numLightProbes=_,i.version=vv++)}function l(u,c){let p=0,m=0,f=0,h=0,v=0;const d=c.matrixWorldInverse;for(let g=0,x=u.length;g<x;g++){const y=u[g];if(y.isDirectionalLight){const M=i.directional[p];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),p++}else if(y.isSpotLight){const M=i.spot[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(d),f++}else if(y.isRectAreaLight){const M=i.rectArea[h];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),o.identity(),r.copy(y.matrixWorld),r.premultiply(d),o.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),h++}else if(y.isPointLight){const M=i.point[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(d),m++}else if(y.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(d),v++}}}return{setup:a,setupView:l,state:i}}function Mu(n){const e=new xv(n),t=[],i=[];function s(c){u.camera=c,t.length=0,i.length=0}function r(c){t.push(c)}function o(c){i.push(c)}function a(){e.setup(t)}function l(c){e.setupView(t,c)}const u={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:u,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function yv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Mu(n),e.set(s,[a])):r>=o.length?(a=new Mu(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Mv extends Es{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=md,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sv extends Es{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wv=`uniform sampler2D shadow_pass;
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
}`;function Ev(n,e,t){let i=new Jc;const s=new ye,r=new ye,o=new St,a=new Mv({depthPacking:gd}),l=new Sv,u={},c=t.maxTextureSize,p={[hi]:kt,[kt]:hi,[en]:en},m=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ye},radius:{value:4}},vertexShader:bv,fragmentShader:wv}),f=m.clone();f.defines.HORIZONTAL_PASS=1;const h=new Ct;h.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new pt(h,m),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=vh;let g=this.type;this.render=function(b,_,T){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||b.length===0)return;const U=n.getRenderTarget(),S=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),k=n.state;k.setBlending(li),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const H=g!==Gn&&this.type===Gn,G=g===Gn&&this.type!==Gn;for(let O=0,I=b.length;O<I;O++){const W=b[O],D=W.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;s.copy(D.mapSize);const re=D.getFrameExtents();if(s.multiply(re),r.copy(D.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(r.x=Math.floor(c/re.x),s.x=r.x*re.x,D.mapSize.x=r.x),s.y>c&&(r.y=Math.floor(c/re.y),s.y=r.y*re.y,D.mapSize.y=r.y)),D.map===null||H===!0||G===!0){const he=this.type!==Gn?{minFilter:Vt,magFilter:Vt}:{};D.map!==null&&D.map.dispose(),D.map=new Pi(s.x,s.y,he),D.map.texture.name=W.name+".shadowMap",D.camera.updateProjectionMatrix()}n.setRenderTarget(D.map),n.clear();const ce=D.getViewportCount();for(let he=0;he<ce;he++){const Q=D.getViewport(he);o.set(r.x*Q.x,r.y*Q.y,r.x*Q.z,r.y*Q.w),k.viewport(o),D.updateMatrices(W,he),i=D.getFrustum(),M(_,T,D.camera,W,this.type)}D.isPointLightShadow!==!0&&this.type===Gn&&x(D,T),D.needsUpdate=!1}g=this.type,d.needsUpdate=!1,n.setRenderTarget(U,S,A)};function x(b,_){const T=e.update(v);m.defines.VSM_SAMPLES!==b.blurSamples&&(m.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,m.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Pi(s.x,s.y)),m.uniforms.shadow_pass.value=b.map.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(_,null,T,m,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(_,null,T,f,v,null)}function y(b,_,T,U){let S=null;const A=T.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(A!==void 0)S=A;else if(S=T.isPointLight===!0?l:a,n.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0){const k=S.uuid,H=_.uuid;let G=u[k];G===void 0&&(G={},u[k]=G);let O=G[H];O===void 0&&(O=S.clone(),G[H]=O,_.addEventListener("dispose",w)),S=O}if(S.visible=_.visible,S.wireframe=_.wireframe,U===Gn?S.side=_.shadowSide!==null?_.shadowSide:_.side:S.side=_.shadowSide!==null?_.shadowSide:p[_.side],S.alphaMap=_.alphaMap,S.alphaTest=_.alphaTest,S.map=_.map,S.clipShadows=_.clipShadows,S.clippingPlanes=_.clippingPlanes,S.clipIntersection=_.clipIntersection,S.displacementMap=_.displacementMap,S.displacementScale=_.displacementScale,S.displacementBias=_.displacementBias,S.wireframeLinewidth=_.wireframeLinewidth,S.linewidth=_.linewidth,T.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const k=n.properties.get(S);k.light=T}return S}function M(b,_,T,U,S){if(b.visible===!1)return;if(b.layers.test(_.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&S===Gn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,b.matrixWorld);const H=e.update(b),G=b.material;if(Array.isArray(G)){const O=H.groups;for(let I=0,W=O.length;I<W;I++){const D=O[I],re=G[D.materialIndex];if(re&&re.visible){const ce=y(b,re,U,S);b.onBeforeShadow(n,b,_,T,H,ce,D),n.renderBufferDirect(T,null,H,ce,b,D),b.onAfterShadow(n,b,_,T,H,ce,D)}}}else if(G.visible){const O=y(b,G,U,S);b.onBeforeShadow(n,b,_,T,H,O,null),n.renderBufferDirect(T,null,H,O,b,null),b.onAfterShadow(n,b,_,T,H,O,null)}}const k=b.children;for(let H=0,G=k.length;H<G;H++)M(k[H],_,T,U,S)}function w(b){b.target.removeEventListener("dispose",w);for(const T in u){const U=u[T],S=b.target.uuid;S in U&&(U[S].dispose(),delete U[S])}}}const Av={[Ba]:Ha,[Va]:Xa,[Ga]:qa,[ms]:Wa,[Ha]:Ba,[Xa]:Va,[qa]:Ga,[Wa]:ms};function Tv(n){function e(){let z=!1;const Ee=new St;let te=null;const oe=new St(0,0,0,0);return{setMask:function(_e){te!==_e&&!z&&(n.colorMask(_e,_e,_e,_e),te=_e)},setLocked:function(_e){z=_e},setClear:function(_e,Ae,nt,wt,Gt){Gt===!0&&(_e*=wt,Ae*=wt,nt*=wt),Ee.set(_e,Ae,nt,wt),oe.equals(Ee)===!1&&(n.clearColor(_e,Ae,nt,wt),oe.copy(Ee))},reset:function(){z=!1,te=null,oe.set(-1,0,0,0)}}}function t(){let z=!1,Ee=!1,te=null,oe=null,_e=null;return{setReversed:function(Ae){Ee=Ae},setTest:function(Ae){Ae?de(n.DEPTH_TEST):fe(n.DEPTH_TEST)},setMask:function(Ae){te!==Ae&&!z&&(n.depthMask(Ae),te=Ae)},setFunc:function(Ae){if(Ee&&(Ae=Av[Ae]),oe!==Ae){switch(Ae){case Ba:n.depthFunc(n.NEVER);break;case Ha:n.depthFunc(n.ALWAYS);break;case Va:n.depthFunc(n.LESS);break;case ms:n.depthFunc(n.LEQUAL);break;case Ga:n.depthFunc(n.EQUAL);break;case Wa:n.depthFunc(n.GEQUAL);break;case Xa:n.depthFunc(n.GREATER);break;case qa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}oe=Ae}},setLocked:function(Ae){z=Ae},setClear:function(Ae){_e!==Ae&&(n.clearDepth(Ae),_e=Ae)},reset:function(){z=!1,te=null,oe=null,_e=null}}}function i(){let z=!1,Ee=null,te=null,oe=null,_e=null,Ae=null,nt=null,wt=null,Gt=null;return{setTest:function(it){z||(it?de(n.STENCIL_TEST):fe(n.STENCIL_TEST))},setMask:function(it){Ee!==it&&!z&&(n.stencilMask(it),Ee=it)},setFunc:function(it,Wt,Fn){(te!==it||oe!==Wt||_e!==Fn)&&(n.stencilFunc(it,Wt,Fn),te=it,oe=Wt,_e=Fn)},setOp:function(it,Wt,Fn){(Ae!==it||nt!==Wt||wt!==Fn)&&(n.stencilOp(it,Wt,Fn),Ae=it,nt=Wt,wt=Fn)},setLocked:function(it){z=it},setClear:function(it){Gt!==it&&(n.clearStencil(it),Gt=it)},reset:function(){z=!1,Ee=null,te=null,oe=null,_e=null,Ae=null,nt=null,wt=null,Gt=null}}}const s=new e,r=new t,o=new i,a=new WeakMap,l=new WeakMap;let u={},c={},p=new WeakMap,m=[],f=null,h=!1,v=null,d=null,g=null,x=null,y=null,M=null,w=null,b=new He(0,0,0),_=0,T=!1,U=null,S=null,A=null,k=null,H=null;const G=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,I=0;const W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(W)[1]),O=I>=1):W.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),O=I>=2);let D=null,re={};const ce=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),Q=new St().fromArray(ce),me=new St().fromArray(he);function K(z,Ee,te,oe){const _e=new Uint8Array(4),Ae=n.createTexture();n.bindTexture(z,Ae),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let nt=0;nt<te;nt++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(Ee,0,n.RGBA,1,1,oe,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(Ee+nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return Ae}const j={};j[n.TEXTURE_2D]=K(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=K(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=K(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=K(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),de(n.DEPTH_TEST),r.setFunc(ms),ge(!1),Te(Rl),de(n.CULL_FACE),L(li);function de(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function fe(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function q(z,Ee){return c[z]!==Ee?(n.bindFramebuffer(z,Ee),c[z]=Ee,z===n.DRAW_FRAMEBUFFER&&(c[n.FRAMEBUFFER]=Ee),z===n.FRAMEBUFFER&&(c[n.DRAW_FRAMEBUFFER]=Ee),!0):!1}function ee(z,Ee){let te=m,oe=!1;if(z){te=p.get(Ee),te===void 0&&(te=[],p.set(Ee,te));const _e=z.textures;if(te.length!==_e.length||te[0]!==n.COLOR_ATTACHMENT0){for(let Ae=0,nt=_e.length;Ae<nt;Ae++)te[Ae]=n.COLOR_ATTACHMENT0+Ae;te.length=_e.length,oe=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,oe=!0);oe&&n.drawBuffers(te)}function ie(z){return f!==z?(n.useProgram(z),f=z,!0):!1}const N={[wi]:n.FUNC_ADD,[Vf]:n.FUNC_SUBTRACT,[Gf]:n.FUNC_REVERSE_SUBTRACT};N[Wf]=n.MIN,N[Xf]=n.MAX;const $={[qf]:n.ZERO,[$f]:n.ONE,[Yf]:n.SRC_COLOR,[Oa]:n.SRC_ALPHA,[ed]:n.SRC_ALPHA_SATURATE,[Zf]:n.DST_COLOR,[Kf]:n.DST_ALPHA,[jf]:n.ONE_MINUS_SRC_COLOR,[za]:n.ONE_MINUS_SRC_ALPHA,[Qf]:n.ONE_MINUS_DST_COLOR,[Jf]:n.ONE_MINUS_DST_ALPHA,[td]:n.CONSTANT_COLOR,[nd]:n.ONE_MINUS_CONSTANT_COLOR,[id]:n.CONSTANT_ALPHA,[sd]:n.ONE_MINUS_CONSTANT_ALPHA};function L(z,Ee,te,oe,_e,Ae,nt,wt,Gt,it){if(z===li){h===!0&&(fe(n.BLEND),h=!1);return}if(h===!1&&(de(n.BLEND),h=!0),z!==Hf){if(z!==v||it!==T){if((d!==wi||y!==wi)&&(n.blendEquation(n.FUNC_ADD),d=wi,y=wi),it)switch(z){case ls:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cl:n.blendFunc(n.ONE,n.ONE);break;case Pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ll:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case ls:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Cl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Pl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ll:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}g=null,x=null,M=null,w=null,b.set(0,0,0),_=0,v=z,T=it}return}_e=_e||Ee,Ae=Ae||te,nt=nt||oe,(Ee!==d||_e!==y)&&(n.blendEquationSeparate(N[Ee],N[_e]),d=Ee,y=_e),(te!==g||oe!==x||Ae!==M||nt!==w)&&(n.blendFuncSeparate($[te],$[oe],$[Ae],$[nt]),g=te,x=oe,M=Ae,w=nt),(wt.equals(b)===!1||Gt!==_)&&(n.blendColor(wt.r,wt.g,wt.b,Gt),b.copy(wt),_=Gt),v=z,T=!1}function Me(z,Ee){z.side===en?fe(n.CULL_FACE):de(n.CULL_FACE);let te=z.side===kt;Ee&&(te=!te),ge(te),z.blending===ls&&z.transparent===!1?L(li):L(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),r.setFunc(z.depthFunc),r.setTest(z.depthTest),r.setMask(z.depthWrite),s.setMask(z.colorWrite);const oe=z.stencilWrite;o.setTest(oe),oe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Ce(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?de(n.SAMPLE_ALPHA_TO_COVERAGE):fe(n.SAMPLE_ALPHA_TO_COVERAGE)}function ge(z){U!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),U=z)}function Te(z){z!==zf?(de(n.CULL_FACE),z!==S&&(z===Rl?n.cullFace(n.BACK):z===Bf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):fe(n.CULL_FACE),S=z}function ne(z){z!==A&&(O&&n.lineWidth(z),A=z)}function Ce(z,Ee,te){z?(de(n.POLYGON_OFFSET_FILL),(k!==Ee||H!==te)&&(n.polygonOffset(Ee,te),k=Ee,H=te)):fe(n.POLYGON_OFFSET_FILL)}function Se(z){z?de(n.SCISSOR_TEST):fe(n.SCISSOR_TEST)}function P(z){z===void 0&&(z=n.TEXTURE0+G-1),D!==z&&(n.activeTexture(z),D=z)}function E(z,Ee,te){te===void 0&&(D===null?te=n.TEXTURE0+G-1:te=D);let oe=re[te];oe===void 0&&(oe={type:void 0,texture:void 0},re[te]=oe),(oe.type!==z||oe.texture!==Ee)&&(D!==te&&(n.activeTexture(te),D=te),n.bindTexture(z,Ee||j[z]),oe.type=z,oe.texture=Ee)}function X(){const z=re[D];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function se(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ae(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Z(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Re(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ve(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function be(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ze(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function le(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Be(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function qe(z){Q.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Q.copy(z))}function Pe(z){me.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),me.copy(z))}function et(z,Ee){let te=l.get(Ee);te===void 0&&(te=new WeakMap,l.set(Ee,te));let oe=te.get(z);oe===void 0&&(oe=n.getUniformBlockIndex(Ee,z.name),te.set(z,oe))}function $e(z,Ee){const oe=l.get(Ee).get(z);a.get(Ee)!==oe&&(n.uniformBlockBinding(Ee,oe,z.__bindingPointIndex),a.set(Ee,oe))}function ft(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},D=null,re={},c={},p=new WeakMap,m=[],f=null,h=!1,v=null,d=null,g=null,x=null,y=null,M=null,w=null,b=new He(0,0,0),_=0,T=!1,U=null,S=null,A=null,k=null,H=null,Q.set(0,0,n.canvas.width,n.canvas.height),me.set(0,0,n.canvas.width,n.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:de,disable:fe,bindFramebuffer:q,drawBuffers:ee,useProgram:ie,setBlending:L,setMaterial:Me,setFlipSided:ge,setCullFace:Te,setLineWidth:ne,setPolygonOffset:Ce,setScissorTest:Se,activeTexture:P,bindTexture:E,unbindTexture:X,compressedTexImage2D:se,compressedTexImage3D:ae,texImage2D:we,texImage3D:Be,updateUBOMapping:et,uniformBlockBinding:$e,texStorage2D:ze,texStorage3D:le,texSubImage2D:Z,texSubImage3D:Re,compressedTexSubImage2D:ve,compressedTexSubImage3D:be,scissor:qe,viewport:Pe,reset:ft}}function Su(n,e,t,i){const s=Rv(i);switch(t){case bh:return n*e;case Eh:return n*e;case Ah:return n*e*2;case Xc:return n*e/s.components*s.byteLength;case qc:return n*e/s.components*s.byteLength;case Th:return n*e*2/s.components*s.byteLength;case $c:return n*e*2/s.components*s.byteLength;case wh:return n*e*3/s.components*s.byteLength;case pn:return n*e*4/s.components*s.byteLength;case Yc:return n*e*4/s.components*s.byteLength;case to:case no:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case io:case so:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Za:case ec:return Math.max(n,16)*Math.max(e,8)/4;case Ja:case Qa:return Math.max(n,8)*Math.max(e,8)/2;case tc:case nc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ic:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case sc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case rc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case oc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ac:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case cc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case lc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case uc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case hc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case fc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case dc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case pc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case mc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case gc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case vc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ro:case _c:case xc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Rh:case yc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Mc:case Sc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rv(n){switch(n){case Yn:case yh:return{byteLength:1,components:1};case nr:case Mh:case hr:return{byteLength:2,components:1};case Gc:case Wc:return{byteLength:2,components:4};case Ci:case Vc:case In:return{byteLength:4,components:1};case Sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function Cv(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new ye,c=new WeakMap;let p;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function h(P,E){return f?new OffscreenCanvas(P,E):vo("canvas")}function v(P,E,X){let se=1;const ae=Se(P);if((ae.width>X||ae.height>X)&&(se=X/Math.max(ae.width,ae.height)),se<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const Z=Math.floor(se*ae.width),Re=Math.floor(se*ae.height);p===void 0&&(p=h(Z,Re));const ve=E?h(Z,Re):p;return ve.width=Z,ve.height=Re,ve.getContext("2d").drawImage(P,0,0,Z,Re),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+Z+"x"+Re+")."),ve}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),P;return P}function d(P){return P.generateMipmaps&&P.minFilter!==Vt&&P.minFilter!==Sn}function g(P){n.generateMipmap(P)}function x(P,E,X,se,ae=!1){if(P!==null){if(n[P]!==void 0)return n[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let Z=E;if(E===n.RED&&(X===n.FLOAT&&(Z=n.R32F),X===n.HALF_FLOAT&&(Z=n.R16F),X===n.UNSIGNED_BYTE&&(Z=n.R8)),E===n.RED_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.R8UI),X===n.UNSIGNED_SHORT&&(Z=n.R16UI),X===n.UNSIGNED_INT&&(Z=n.R32UI),X===n.BYTE&&(Z=n.R8I),X===n.SHORT&&(Z=n.R16I),X===n.INT&&(Z=n.R32I)),E===n.RG&&(X===n.FLOAT&&(Z=n.RG32F),X===n.HALF_FLOAT&&(Z=n.RG16F),X===n.UNSIGNED_BYTE&&(Z=n.RG8)),E===n.RG_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.RG8UI),X===n.UNSIGNED_SHORT&&(Z=n.RG16UI),X===n.UNSIGNED_INT&&(Z=n.RG32UI),X===n.BYTE&&(Z=n.RG8I),X===n.SHORT&&(Z=n.RG16I),X===n.INT&&(Z=n.RG32I)),E===n.RGB_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.RGB8UI),X===n.UNSIGNED_SHORT&&(Z=n.RGB16UI),X===n.UNSIGNED_INT&&(Z=n.RGB32UI),X===n.BYTE&&(Z=n.RGB8I),X===n.SHORT&&(Z=n.RGB16I),X===n.INT&&(Z=n.RGB32I)),E===n.RGBA_INTEGER&&(X===n.UNSIGNED_BYTE&&(Z=n.RGBA8UI),X===n.UNSIGNED_SHORT&&(Z=n.RGBA16UI),X===n.UNSIGNED_INT&&(Z=n.RGBA32UI),X===n.BYTE&&(Z=n.RGBA8I),X===n.SHORT&&(Z=n.RGBA16I),X===n.INT&&(Z=n.RGBA32I)),E===n.RGB&&X===n.UNSIGNED_INT_5_9_9_9_REV&&(Z=n.RGB9_E5),E===n.RGBA){const Re=ae?fo:at.getTransfer(se);X===n.FLOAT&&(Z=n.RGBA32F),X===n.HALF_FLOAT&&(Z=n.RGBA16F),X===n.UNSIGNED_BYTE&&(Z=Re===vt?n.SRGB8_ALPHA8:n.RGBA8),X===n.UNSIGNED_SHORT_4_4_4_4&&(Z=n.RGBA4),X===n.UNSIGNED_SHORT_5_5_5_1&&(Z=n.RGB5_A1)}return(Z===n.R16F||Z===n.R32F||Z===n.RG16F||Z===n.RG32F||Z===n.RGBA16F||Z===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(P,E){let X;return P?E===null||E===Ci||E===_s?X=n.DEPTH24_STENCIL8:E===In?X=n.DEPTH32F_STENCIL8:E===nr&&(X=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Ci||E===_s?X=n.DEPTH_COMPONENT24:E===In?X=n.DEPTH_COMPONENT32F:E===nr&&(X=n.DEPTH_COMPONENT16),X}function M(P,E){return d(P)===!0||P.isFramebufferTexture&&P.minFilter!==Vt&&P.minFilter!==Sn?Math.log2(Math.max(E.width,E.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?E.mipmaps.length:1}function w(P){const E=P.target;E.removeEventListener("dispose",w),_(E),E.isVideoTexture&&c.delete(E)}function b(P){const E=P.target;E.removeEventListener("dispose",b),U(E)}function _(P){const E=i.get(P);if(E.__webglInit===void 0)return;const X=P.source,se=m.get(X);if(se){const ae=se[E.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&T(P),Object.keys(se).length===0&&m.delete(X)}i.remove(P)}function T(P){const E=i.get(P);n.deleteTexture(E.__webglTexture);const X=P.source,se=m.get(X);delete se[E.__cacheKey],o.memory.textures--}function U(P){const E=i.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(E.__webglFramebuffer[se]))for(let ae=0;ae<E.__webglFramebuffer[se].length;ae++)n.deleteFramebuffer(E.__webglFramebuffer[se][ae]);else n.deleteFramebuffer(E.__webglFramebuffer[se]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[se])}else{if(Array.isArray(E.__webglFramebuffer))for(let se=0;se<E.__webglFramebuffer.length;se++)n.deleteFramebuffer(E.__webglFramebuffer[se]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let se=0;se<E.__webglColorRenderbuffer.length;se++)E.__webglColorRenderbuffer[se]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[se]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const X=P.textures;for(let se=0,ae=X.length;se<ae;se++){const Z=i.get(X[se]);Z.__webglTexture&&(n.deleteTexture(Z.__webglTexture),o.memory.textures--),i.remove(X[se])}i.remove(P)}let S=0;function A(){S=0}function k(){const P=S;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),S+=1,P}function H(P){const E=[];return E.push(P.wrapS),E.push(P.wrapT),E.push(P.wrapR||0),E.push(P.magFilter),E.push(P.minFilter),E.push(P.anisotropy),E.push(P.internalFormat),E.push(P.format),E.push(P.type),E.push(P.generateMipmaps),E.push(P.premultiplyAlpha),E.push(P.flipY),E.push(P.unpackAlignment),E.push(P.colorSpace),E.join()}function G(P,E){const X=i.get(P);if(P.isVideoTexture&&ne(P),P.isRenderTargetTexture===!1&&P.version>0&&X.__version!==P.version){const se=P.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{me(X,P,E);return}}t.bindTexture(n.TEXTURE_2D,X.__webglTexture,n.TEXTURE0+E)}function O(P,E){const X=i.get(P);if(P.version>0&&X.__version!==P.version){me(X,P,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,X.__webglTexture,n.TEXTURE0+E)}function I(P,E){const X=i.get(P);if(P.version>0&&X.__version!==P.version){me(X,P,E);return}t.bindTexture(n.TEXTURE_3D,X.__webglTexture,n.TEXTURE0+E)}function W(P,E){const X=i.get(P);if(P.version>0&&X.__version!==P.version){K(X,P,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture,n.TEXTURE0+E)}const D={[ja]:n.REPEAT,[Ti]:n.CLAMP_TO_EDGE,[Ka]:n.MIRRORED_REPEAT},re={[Vt]:n.NEAREST,[pd]:n.NEAREST_MIPMAP_NEAREST,[vr]:n.NEAREST_MIPMAP_LINEAR,[Sn]:n.LINEAR,[zo]:n.LINEAR_MIPMAP_NEAREST,[Ri]:n.LINEAR_MIPMAP_LINEAR},ce={[_d]:n.NEVER,[wd]:n.ALWAYS,[xd]:n.LESS,[Ch]:n.LEQUAL,[yd]:n.EQUAL,[bd]:n.GEQUAL,[Md]:n.GREATER,[Sd]:n.NOTEQUAL};function he(P,E){if(E.type===In&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Sn||E.magFilter===zo||E.magFilter===vr||E.magFilter===Ri||E.minFilter===Sn||E.minFilter===zo||E.minFilter===vr||E.minFilter===Ri)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(P,n.TEXTURE_WRAP_S,D[E.wrapS]),n.texParameteri(P,n.TEXTURE_WRAP_T,D[E.wrapT]),(P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY)&&n.texParameteri(P,n.TEXTURE_WRAP_R,D[E.wrapR]),n.texParameteri(P,n.TEXTURE_MAG_FILTER,re[E.magFilter]),n.texParameteri(P,n.TEXTURE_MIN_FILTER,re[E.minFilter]),E.compareFunction&&(n.texParameteri(P,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(P,n.TEXTURE_COMPARE_FUNC,ce[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Vt||E.minFilter!==vr&&E.minFilter!==Ri||E.type===In&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");n.texParameterf(P,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Q(P,E){let X=!1;P.__webglInit===void 0&&(P.__webglInit=!0,E.addEventListener("dispose",w));const se=E.source;let ae=m.get(se);ae===void 0&&(ae={},m.set(se,ae));const Z=H(E);if(Z!==P.__cacheKey){ae[Z]===void 0&&(ae[Z]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ae[Z].usedTimes++;const Re=ae[P.__cacheKey];Re!==void 0&&(ae[P.__cacheKey].usedTimes--,Re.usedTimes===0&&T(E)),P.__cacheKey=Z,P.__webglTexture=ae[Z].texture}return X}function me(P,E,X){let se=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(se=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(se=n.TEXTURE_3D);const ae=Q(P,E),Z=E.source;t.bindTexture(se,P.__webglTexture,n.TEXTURE0+X);const Re=i.get(Z);if(Z.version!==Re.__version||ae===!0){t.activeTexture(n.TEXTURE0+X);const ve=at.getPrimaries(at.workingColorSpace),be=E.colorSpace===ai?null:at.getPrimaries(E.colorSpace),ze=E.colorSpace===ai||ve===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let le=v(E.image,!1,s.maxTextureSize);le=Ce(E,le);const we=r.convert(E.format,E.colorSpace),Be=r.convert(E.type);let qe=x(E.internalFormat,we,Be,E.colorSpace,E.isVideoTexture);he(se,E);let Pe;const et=E.mipmaps,$e=E.isVideoTexture!==!0,ft=Re.__version===void 0||ae===!0,z=Z.dataReady,Ee=M(E,le);if(E.isDepthTexture)qe=y(E.format===xs,E.type),ft&&($e?t.texStorage2D(n.TEXTURE_2D,1,qe,le.width,le.height):t.texImage2D(n.TEXTURE_2D,0,qe,le.width,le.height,0,we,Be,null));else if(E.isDataTexture)if(et.length>0){$e&&ft&&t.texStorage2D(n.TEXTURE_2D,Ee,qe,et[0].width,et[0].height);for(let te=0,oe=et.length;te<oe;te++)Pe=et[te],$e?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,Pe.width,Pe.height,we,Be,Pe.data):t.texImage2D(n.TEXTURE_2D,te,qe,Pe.width,Pe.height,0,we,Be,Pe.data);E.generateMipmaps=!1}else $e?(ft&&t.texStorage2D(n.TEXTURE_2D,Ee,qe,le.width,le.height),z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,le.width,le.height,we,Be,le.data)):t.texImage2D(n.TEXTURE_2D,0,qe,le.width,le.height,0,we,Be,le.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){$e&&ft&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,qe,et[0].width,et[0].height,le.depth);for(let te=0,oe=et.length;te<oe;te++)if(Pe=et[te],E.format!==pn)if(we!==null)if($e){if(z)if(E.layerUpdates.size>0){const _e=Su(Pe.width,Pe.height,E.format,E.type);for(const Ae of E.layerUpdates){const nt=Pe.data.subarray(Ae*_e/Pe.data.BYTES_PER_ELEMENT,(Ae+1)*_e/Pe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,Ae,Pe.width,Pe.height,1,we,nt,0,0)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,Pe.width,Pe.height,le.depth,we,Pe.data,0,0)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,te,qe,Pe.width,Pe.height,le.depth,0,Pe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else $e?z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,te,0,0,0,Pe.width,Pe.height,le.depth,we,Be,Pe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,te,qe,Pe.width,Pe.height,le.depth,0,we,Be,Pe.data)}else{$e&&ft&&t.texStorage2D(n.TEXTURE_2D,Ee,qe,et[0].width,et[0].height);for(let te=0,oe=et.length;te<oe;te++)Pe=et[te],E.format!==pn?we!==null?$e?z&&t.compressedTexSubImage2D(n.TEXTURE_2D,te,0,0,Pe.width,Pe.height,we,Pe.data):t.compressedTexImage2D(n.TEXTURE_2D,te,qe,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):$e?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,Pe.width,Pe.height,we,Be,Pe.data):t.texImage2D(n.TEXTURE_2D,te,qe,Pe.width,Pe.height,0,we,Be,Pe.data)}else if(E.isDataArrayTexture)if($e){if(ft&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ee,qe,le.width,le.height,le.depth),z)if(E.layerUpdates.size>0){const te=Su(le.width,le.height,E.format,E.type);for(const oe of E.layerUpdates){const _e=le.data.subarray(oe*te/le.data.BYTES_PER_ELEMENT,(oe+1)*te/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,oe,le.width,le.height,1,we,Be,_e)}E.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,we,Be,le.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,qe,le.width,le.height,le.depth,0,we,Be,le.data);else if(E.isData3DTexture)$e?(ft&&t.texStorage3D(n.TEXTURE_3D,Ee,qe,le.width,le.height,le.depth),z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,we,Be,le.data)):t.texImage3D(n.TEXTURE_3D,0,qe,le.width,le.height,le.depth,0,we,Be,le.data);else if(E.isFramebufferTexture){if(ft)if($e)t.texStorage2D(n.TEXTURE_2D,Ee,qe,le.width,le.height);else{let te=le.width,oe=le.height;for(let _e=0;_e<Ee;_e++)t.texImage2D(n.TEXTURE_2D,_e,qe,te,oe,0,we,Be,null),te>>=1,oe>>=1}}else if(et.length>0){if($e&&ft){const te=Se(et[0]);t.texStorage2D(n.TEXTURE_2D,Ee,qe,te.width,te.height)}for(let te=0,oe=et.length;te<oe;te++)Pe=et[te],$e?z&&t.texSubImage2D(n.TEXTURE_2D,te,0,0,we,Be,Pe):t.texImage2D(n.TEXTURE_2D,te,qe,we,Be,Pe);E.generateMipmaps=!1}else if($e){if(ft){const te=Se(le);t.texStorage2D(n.TEXTURE_2D,Ee,qe,te.width,te.height)}z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,Be,le)}else t.texImage2D(n.TEXTURE_2D,0,qe,we,Be,le);d(E)&&g(se),Re.__version=Z.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function K(P,E,X){if(E.image.length!==6)return;const se=Q(P,E),ae=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,P.__webglTexture,n.TEXTURE0+X);const Z=i.get(ae);if(ae.version!==Z.__version||se===!0){t.activeTexture(n.TEXTURE0+X);const Re=at.getPrimaries(at.workingColorSpace),ve=E.colorSpace===ai?null:at.getPrimaries(E.colorSpace),be=E.colorSpace===ai||Re===ve?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const ze=E.isCompressedTexture||E.image[0].isCompressedTexture,le=E.image[0]&&E.image[0].isDataTexture,we=[];for(let oe=0;oe<6;oe++)!ze&&!le?we[oe]=v(E.image[oe],!0,s.maxCubemapSize):we[oe]=le?E.image[oe].image:E.image[oe],we[oe]=Ce(E,we[oe]);const Be=we[0],qe=r.convert(E.format,E.colorSpace),Pe=r.convert(E.type),et=x(E.internalFormat,qe,Pe,E.colorSpace),$e=E.isVideoTexture!==!0,ft=Z.__version===void 0||se===!0,z=ae.dataReady;let Ee=M(E,Be);he(n.TEXTURE_CUBE_MAP,E);let te;if(ze){$e&&ft&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,et,Be.width,Be.height);for(let oe=0;oe<6;oe++){te=we[oe].mipmaps;for(let _e=0;_e<te.length;_e++){const Ae=te[_e];E.format!==pn?qe!==null?$e?z&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e,0,0,Ae.width,Ae.height,qe,Ae.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e,et,Ae.width,Ae.height,0,Ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e,0,0,Ae.width,Ae.height,qe,Pe,Ae.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e,et,Ae.width,Ae.height,0,qe,Pe,Ae.data)}}}else{if(te=E.mipmaps,$e&&ft){te.length>0&&Ee++;const oe=Se(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,et,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(le){$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,we[oe].width,we[oe].height,qe,Pe,we[oe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,et,we[oe].width,we[oe].height,0,qe,Pe,we[oe].data);for(let _e=0;_e<te.length;_e++){const nt=te[_e].image[oe].image;$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e+1,0,0,nt.width,nt.height,qe,Pe,nt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e+1,et,nt.width,nt.height,0,qe,Pe,nt.data)}}else{$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,qe,Pe,we[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,et,qe,Pe,we[oe]);for(let _e=0;_e<te.length;_e++){const Ae=te[_e];$e?z&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e+1,0,0,qe,Pe,Ae.image[oe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+oe,_e+1,et,qe,Pe,Ae.image[oe])}}}d(E)&&g(n.TEXTURE_CUBE_MAP),Z.__version=ae.version,E.onUpdate&&E.onUpdate(E)}P.__version=E.version}function j(P,E,X,se,ae,Z){const Re=r.convert(X.format,X.colorSpace),ve=r.convert(X.type),be=x(X.internalFormat,Re,ve,X.colorSpace);if(!i.get(E).__hasExternalTextures){const le=Math.max(1,E.width>>Z),we=Math.max(1,E.height>>Z);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,Z,be,le,we,E.depth,0,Re,ve,null):t.texImage2D(ae,Z,be,le,we,0,Re,ve,null)}t.bindFramebuffer(n.FRAMEBUFFER,P),Te(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,se,ae,i.get(X).__webglTexture,0,ge(E)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,se,ae,i.get(X).__webglTexture,Z),t.bindFramebuffer(n.FRAMEBUFFER,null)}function de(P,E,X){if(n.bindRenderbuffer(n.RENDERBUFFER,P),E.depthBuffer){const se=E.depthTexture,ae=se&&se.isDepthTexture?se.type:null,Z=y(E.stencilBuffer,ae),Re=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ve=ge(E);Te(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ve,Z,E.width,E.height):X?n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Z,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Z,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Re,n.RENDERBUFFER,P)}else{const se=E.textures;for(let ae=0;ae<se.length;ae++){const Z=se[ae],Re=r.convert(Z.format,Z.colorSpace),ve=r.convert(Z.type),be=x(Z.internalFormat,Re,ve,Z.colorSpace),ze=ge(E);X&&Te(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ze,be,E.width,E.height):Te(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ze,be,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,be,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(P,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,P),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(E.depthTexture).__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),G(E.depthTexture,0);const se=i.get(E.depthTexture).__webglTexture,ae=ge(E);if(E.depthTexture.format===us)Te(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(E.depthTexture.format===xs)Te(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,ae):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function q(P){const E=i.get(P),X=P.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==P.depthTexture){const se=P.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),se){const ae=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,se.removeEventListener("dispose",ae)};se.addEventListener("dispose",ae),E.__depthDisposeCallback=ae}E.__boundDepthTexture=se}if(P.depthTexture&&!E.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");fe(E.__webglFramebuffer,P)}else if(X){E.__webglDepthbuffer=[];for(let se=0;se<6;se++)if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[se]),E.__webglDepthbuffer[se]===void 0)E.__webglDepthbuffer[se]=n.createRenderbuffer(),de(E.__webglDepthbuffer[se],P,!1);else{const ae=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Z=E.__webglDepthbuffer[se];n.bindRenderbuffer(n.RENDERBUFFER,Z),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,Z)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),de(E.__webglDepthbuffer,P,!1);else{const se=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ae),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,ae)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(P,E,X){const se=i.get(P);E!==void 0&&j(se.__webglFramebuffer,P,P.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),X!==void 0&&q(P)}function ie(P){const E=P.texture,X=i.get(P),se=i.get(E);P.addEventListener("dispose",b);const ae=P.textures,Z=P.isWebGLCubeRenderTarget===!0,Re=ae.length>1;if(Re||(se.__webglTexture===void 0&&(se.__webglTexture=n.createTexture()),se.__version=E.version,o.memory.textures++),Z){X.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer[ve]=[];for(let be=0;be<E.mipmaps.length;be++)X.__webglFramebuffer[ve][be]=n.createFramebuffer()}else X.__webglFramebuffer[ve]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){X.__webglFramebuffer=[];for(let ve=0;ve<E.mipmaps.length;ve++)X.__webglFramebuffer[ve]=n.createFramebuffer()}else X.__webglFramebuffer=n.createFramebuffer();if(Re)for(let ve=0,be=ae.length;ve<be;ve++){const ze=i.get(ae[ve]);ze.__webglTexture===void 0&&(ze.__webglTexture=n.createTexture(),o.memory.textures++)}if(P.samples>0&&Te(P)===!1){X.__webglMultisampledFramebuffer=n.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ve=0;ve<ae.length;ve++){const be=ae[ve];X.__webglColorRenderbuffer[ve]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,X.__webglColorRenderbuffer[ve]);const ze=r.convert(be.format,be.colorSpace),le=r.convert(be.type),we=x(be.internalFormat,ze,le,be.colorSpace,P.isXRRenderTarget===!0),Be=ge(P);n.renderbufferStorageMultisample(n.RENDERBUFFER,Be,we,P.width,P.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ve,n.RENDERBUFFER,X.__webglColorRenderbuffer[ve])}n.bindRenderbuffer(n.RENDERBUFFER,null),P.depthBuffer&&(X.__webglDepthRenderbuffer=n.createRenderbuffer(),de(X.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Z){t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),he(n.TEXTURE_CUBE_MAP,E);for(let ve=0;ve<6;ve++)if(E.mipmaps&&E.mipmaps.length>0)for(let be=0;be<E.mipmaps.length;be++)j(X.__webglFramebuffer[ve][be],P,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,be);else j(X.__webglFramebuffer[ve],P,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);d(E)&&g(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let ve=0,be=ae.length;ve<be;ve++){const ze=ae[ve],le=i.get(ze);t.bindTexture(n.TEXTURE_2D,le.__webglTexture),he(n.TEXTURE_2D,ze),j(X.__webglFramebuffer,P,ze,n.COLOR_ATTACHMENT0+ve,n.TEXTURE_2D,0),d(ze)&&g(n.TEXTURE_2D)}t.unbindTexture()}else{let ve=n.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ve=P.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ve,se.__webglTexture),he(ve,E),E.mipmaps&&E.mipmaps.length>0)for(let be=0;be<E.mipmaps.length;be++)j(X.__webglFramebuffer[be],P,E,n.COLOR_ATTACHMENT0,ve,be);else j(X.__webglFramebuffer,P,E,n.COLOR_ATTACHMENT0,ve,0);d(E)&&g(ve),t.unbindTexture()}P.depthBuffer&&q(P)}function N(P){const E=P.textures;for(let X=0,se=E.length;X<se;X++){const ae=E[X];if(d(ae)){const Z=P.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Re=i.get(ae).__webglTexture;t.bindTexture(Z,Re),g(Z),t.unbindTexture()}}}const $=[],L=[];function Me(P){if(P.samples>0){if(Te(P)===!1){const E=P.textures,X=P.width,se=P.height;let ae=n.COLOR_BUFFER_BIT;const Z=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Re=i.get(P),ve=E.length>1;if(ve)for(let be=0;be<E.length;be++)t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let be=0;be<E.length;be++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),ve){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ze=i.get(E[be]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ze,0)}n.blitFramebuffer(0,0,X,se,0,0,X,se,ae,n.NEAREST),l===!0&&($.length=0,L.length=0,$.push(n.COLOR_ATTACHMENT0+be),P.depthBuffer&&P.resolveDepthBuffer===!1&&($.push(Z),L.push(Z),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,L)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,$))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ve)for(let be=0;be<E.length;be++){t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.RENDERBUFFER,Re.__webglColorRenderbuffer[be]);const ze=i.get(E[be]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Re.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+be,n.TEXTURE_2D,ze,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const E=P.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function ge(P){return Math.min(s.maxSamples,P.samples)}function Te(P){const E=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function ne(P){const E=o.render.frame;c.get(P)!==E&&(c.set(P,E),P.update())}function Ce(P,E){const X=P.colorSpace,se=P.format,ae=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||X!==fi&&X!==ai&&(at.getTransfer(X)===vt?(se!==pn||ae!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",X)),E}function Se(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(u.width=P.naturalWidth||P.width,u.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(u.width=P.displayWidth,u.height=P.displayHeight):(u.width=P.width,u.height=P.height),u}this.allocateTextureUnit=k,this.resetTextureUnits=A,this.setTexture2D=G,this.setTexture2DArray=O,this.setTexture3D=I,this.setTextureCube=W,this.rebindTextures=ee,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=q,this.setupFrameBufferTexture=j,this.useMultisampledRTT=Te}function Pv(n,e){function t(i,s=ai){let r;const o=at.getTransfer(s);if(i===Yn)return n.UNSIGNED_BYTE;if(i===Gc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Sh)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===yh)return n.BYTE;if(i===Mh)return n.SHORT;if(i===nr)return n.UNSIGNED_SHORT;if(i===Vc)return n.INT;if(i===Ci)return n.UNSIGNED_INT;if(i===In)return n.FLOAT;if(i===hr)return n.HALF_FLOAT;if(i===bh)return n.ALPHA;if(i===wh)return n.RGB;if(i===pn)return n.RGBA;if(i===Eh)return n.LUMINANCE;if(i===Ah)return n.LUMINANCE_ALPHA;if(i===us)return n.DEPTH_COMPONENT;if(i===xs)return n.DEPTH_STENCIL;if(i===Xc)return n.RED;if(i===qc)return n.RED_INTEGER;if(i===Th)return n.RG;if(i===$c)return n.RG_INTEGER;if(i===Yc)return n.RGBA_INTEGER;if(i===to||i===no||i===io||i===so)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===to)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===to)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===no)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===io)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===so)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ja||i===Za||i===Qa||i===ec)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ja)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Za)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ec)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===tc||i===nc||i===ic)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===tc||i===nc)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ic)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===sc||i===rc||i===oc||i===ac||i===cc||i===lc||i===uc||i===hc||i===fc||i===dc||i===pc||i===mc||i===gc||i===vc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===sc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===rc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===oc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ac)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===cc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===lc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===uc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===fc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===dc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===pc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===mc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===gc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vc)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ro||i===_c||i===xc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ro)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===_c)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rh||i===yc||i===Mc||i===Sc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===ro)return r.COMPRESSED_RED_RGTC1_EXT;if(i===yc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Mc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===_s?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Lv extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class dt extends At{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Iv={type:"move"};class ma{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const v of e.hand.values()){const d=t.getJointPose(v,i),g=this._getHandJoint(u,v);d!==null&&(g.matrix.fromArray(d.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=d.radius),g.visible=d!==null}const c=u.joints["index-finger-tip"],p=u.joints["thumb-tip"],m=c.position.distanceTo(p.position),f=.02,h=.005;u.inputState.pinching&&m>f+h?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&m<=f-h&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Iv)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new dt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Uv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Dv=`
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

}`;class Nv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Ot,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new An({vertexShader:Uv,fragmentShader:Dv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new Li(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Fv extends bs{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,u=null,c=null,p=null,m=null,f=null,h=null;const v=new Nv,d=t.getContextAttributes();let g=null,x=null;const y=[],M=[],w=new ye;let b=null;const _=new dn;_.layers.enable(1),_.viewport=new St;const T=new dn;T.layers.enable(2),T.viewport=new St;const U=[_,T],S=new Lv;S.layers.enable(1),S.layers.enable(2);let A=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let j=y[K];return j===void 0&&(j=new ma,y[K]=j),j.getTargetRaySpace()},this.getControllerGrip=function(K){let j=y[K];return j===void 0&&(j=new ma,y[K]=j),j.getGripSpace()},this.getHand=function(K){let j=y[K];return j===void 0&&(j=new ma,y[K]=j),j.getHandSpace()};function H(K){const j=M.indexOf(K.inputSource);if(j===-1)return;const de=y[j];de!==void 0&&(de.update(K.inputSource,K.frame,u||o),de.dispatchEvent({type:K.type,data:K.inputSource}))}function G(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",O);for(let K=0;K<y.length;K++){const j=M[K];j!==null&&(M[K]=null,y[K].disconnect(j))}A=null,k=null,v.reset(),e.setRenderTarget(g),f=null,m=null,p=null,s=null,x=null,me.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(K){u=K},this.getBaseLayer=function(){return m!==null?m:f},this.getBinding=function(){return p},this.getFrame=function(){return h},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(g=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",G),s.addEventListener("inputsourceschange",O),d.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(w),s.renderState.layers===void 0){const j={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Pi(f.framebufferWidth,f.framebufferHeight,{format:pn,type:Yn,colorSpace:e.outputColorSpace,stencilBuffer:d.stencil})}else{let j=null,de=null,fe=null;d.depth&&(fe=d.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=d.stencil?xs:us,de=d.stencil?_s:Ci);const q={colorFormat:t.RGBA8,depthFormat:fe,scaleFactor:r};p=new XRWebGLBinding(s,t),m=p.createProjectionLayer(q),s.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),x=new Pi(m.textureWidth,m.textureHeight,{format:pn,type:Yn,depthTexture:new Vh(m.textureWidth,m.textureHeight,de,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:d.stencil,colorSpace:e.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await s.requestReferenceSpace(a),me.setContext(s),me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function O(K){for(let j=0;j<K.removed.length;j++){const de=K.removed[j],fe=M.indexOf(de);fe>=0&&(M[fe]=null,y[fe].disconnect(de))}for(let j=0;j<K.added.length;j++){const de=K.added[j];let fe=M.indexOf(de);if(fe===-1){for(let ee=0;ee<y.length;ee++)if(ee>=M.length){M.push(de),fe=ee;break}else if(M[ee]===null){M[ee]=de,fe=ee;break}if(fe===-1)break}const q=y[fe];q&&q.connect(de)}}const I=new F,W=new F;function D(K,j,de){I.setFromMatrixPosition(j.matrixWorld),W.setFromMatrixPosition(de.matrixWorld);const fe=I.distanceTo(W),q=j.projectionMatrix.elements,ee=de.projectionMatrix.elements,ie=q[14]/(q[10]-1),N=q[14]/(q[10]+1),$=(q[9]+1)/q[5],L=(q[9]-1)/q[5],Me=(q[8]-1)/q[0],ge=(ee[8]+1)/ee[0],Te=ie*Me,ne=ie*ge,Ce=fe/(-Me+ge),Se=Ce*-Me;if(j.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Se),K.translateZ(Ce),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),q[10]===-1)K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const P=ie+Ce,E=N+Ce,X=Te-Se,se=ne+(fe-Se),ae=$*N/E*P,Z=L*N/E*P;K.projectionMatrix.makePerspective(X,se,ae,Z,P,E),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function re(K,j){j===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(j.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let j=K.near,de=K.far;v.texture!==null&&(v.depthNear>0&&(j=v.depthNear),v.depthFar>0&&(de=v.depthFar)),S.near=T.near=_.near=j,S.far=T.far=_.far=de,(A!==S.near||k!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),A=S.near,k=S.far);const fe=K.parent,q=S.cameras;re(S,fe);for(let ee=0;ee<q.length;ee++)re(q[ee],fe);q.length===2?D(S,_,T):S.projectionMatrix.copy(_.projectionMatrix),ce(K,S,fe)};function ce(K,j,de){de===null?K.matrix.copy(j.matrixWorld):(K.matrix.copy(de.matrixWorld),K.matrix.invert(),K.matrix.multiply(j.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(j.projectionMatrix),K.projectionMatrixInverse.copy(j.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=bc*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(m===null&&f===null))return l},this.setFoveation=function(K){l=K,m!==null&&(m.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let he=null;function Q(K,j){if(c=j.getViewerPose(u||o),h=j,c!==null){const de=c.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let fe=!1;de.length!==S.cameras.length&&(S.cameras.length=0,fe=!0);for(let ee=0;ee<de.length;ee++){const ie=de[ee];let N=null;if(f!==null)N=f.getViewport(ie);else{const L=p.getViewSubImage(m,ie);N=L.viewport,ee===0&&(e.setRenderTargetTextures(x,L.colorTexture,m.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(x))}let $=U[ee];$===void 0&&($=new dn,$.layers.enable(ee),$.viewport=new St,U[ee]=$),$.matrix.fromArray(ie.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(ie.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(N.x,N.y,N.width,N.height),ee===0&&(S.matrix.copy($.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),fe===!0&&S.cameras.push($)}const q=s.enabledFeatures;if(q&&q.includes("depth-sensing")){const ee=p.getDepthInformation(de[0]);ee&&ee.isValid&&ee.texture&&v.init(e,ee,s.renderState)}}for(let de=0;de<y.length;de++){const fe=M[de],q=y[de];fe!==null&&q!==void 0&&q.update(fe,j,u||o)}he&&he(K,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),h=null}const me=new Bh;me.setAnimationLoop(Q),this.setAnimationLoop=function(K){he=K},this.dispose=function(){}}}const yi=new on,kv=new ct;function Ov(n,e){function t(d,g){d.matrixAutoUpdate===!0&&d.updateMatrix(),g.value.copy(d.matrix)}function i(d,g){g.color.getRGB(d.fogColor.value,kh(n)),g.isFog?(d.fogNear.value=g.near,d.fogFar.value=g.far):g.isFogExp2&&(d.fogDensity.value=g.density)}function s(d,g,x,y,M){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(d,g):g.isMeshToonMaterial?(r(d,g),p(d,g)):g.isMeshPhongMaterial?(r(d,g),c(d,g)):g.isMeshStandardMaterial?(r(d,g),m(d,g),g.isMeshPhysicalMaterial&&f(d,g,M)):g.isMeshMatcapMaterial?(r(d,g),h(d,g)):g.isMeshDepthMaterial?r(d,g):g.isMeshDistanceMaterial?(r(d,g),v(d,g)):g.isMeshNormalMaterial?r(d,g):g.isLineBasicMaterial?(o(d,g),g.isLineDashedMaterial&&a(d,g)):g.isPointsMaterial?l(d,g,x,y):g.isSpriteMaterial?u(d,g):g.isShadowMaterial?(d.color.value.copy(g.color),d.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(d,g){d.opacity.value=g.opacity,g.color&&d.diffuse.value.copy(g.color),g.emissive&&d.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.bumpMap&&(d.bumpMap.value=g.bumpMap,t(g.bumpMap,d.bumpMapTransform),d.bumpScale.value=g.bumpScale,g.side===kt&&(d.bumpScale.value*=-1)),g.normalMap&&(d.normalMap.value=g.normalMap,t(g.normalMap,d.normalMapTransform),d.normalScale.value.copy(g.normalScale),g.side===kt&&d.normalScale.value.negate()),g.displacementMap&&(d.displacementMap.value=g.displacementMap,t(g.displacementMap,d.displacementMapTransform),d.displacementScale.value=g.displacementScale,d.displacementBias.value=g.displacementBias),g.emissiveMap&&(d.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,d.emissiveMapTransform)),g.specularMap&&(d.specularMap.value=g.specularMap,t(g.specularMap,d.specularMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest);const x=e.get(g),y=x.envMap,M=x.envMapRotation;y&&(d.envMap.value=y,yi.copy(M),yi.x*=-1,yi.y*=-1,yi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),d.envMapRotation.value.setFromMatrix4(kv.makeRotationFromEuler(yi)),d.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.reflectivity.value=g.reflectivity,d.ior.value=g.ior,d.refractionRatio.value=g.refractionRatio),g.lightMap&&(d.lightMap.value=g.lightMap,d.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,d.lightMapTransform)),g.aoMap&&(d.aoMap.value=g.aoMap,d.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,d.aoMapTransform))}function o(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform))}function a(d,g){d.dashSize.value=g.dashSize,d.totalSize.value=g.dashSize+g.gapSize,d.scale.value=g.scale}function l(d,g,x,y){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.size.value=g.size*x,d.scale.value=y*.5,g.map&&(d.map.value=g.map,t(g.map,d.uvTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function u(d,g){d.diffuse.value.copy(g.color),d.opacity.value=g.opacity,d.rotation.value=g.rotation,g.map&&(d.map.value=g.map,t(g.map,d.mapTransform)),g.alphaMap&&(d.alphaMap.value=g.alphaMap,t(g.alphaMap,d.alphaMapTransform)),g.alphaTest>0&&(d.alphaTest.value=g.alphaTest)}function c(d,g){d.specular.value.copy(g.specular),d.shininess.value=Math.max(g.shininess,1e-4)}function p(d,g){g.gradientMap&&(d.gradientMap.value=g.gradientMap)}function m(d,g){d.metalness.value=g.metalness,g.metalnessMap&&(d.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,d.metalnessMapTransform)),d.roughness.value=g.roughness,g.roughnessMap&&(d.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,d.roughnessMapTransform)),g.envMap&&(d.envMapIntensity.value=g.envMapIntensity)}function f(d,g,x){d.ior.value=g.ior,g.sheen>0&&(d.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),d.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(d.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,d.sheenColorMapTransform)),g.sheenRoughnessMap&&(d.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,d.sheenRoughnessMapTransform))),g.clearcoat>0&&(d.clearcoat.value=g.clearcoat,d.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(d.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,d.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(d.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===kt&&d.clearcoatNormalScale.value.negate())),g.dispersion>0&&(d.dispersion.value=g.dispersion),g.iridescence>0&&(d.iridescence.value=g.iridescence,d.iridescenceIOR.value=g.iridescenceIOR,d.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],d.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(d.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,d.iridescenceMapTransform)),g.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),g.transmission>0&&(d.transmission.value=g.transmission,d.transmissionSamplerMap.value=x.texture,d.transmissionSamplerSize.value.set(x.width,x.height),g.transmissionMap&&(d.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,d.transmissionMapTransform)),d.thickness.value=g.thickness,g.thicknessMap&&(d.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=g.attenuationDistance,d.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(d.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(d.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=g.specularIntensity,d.specularColor.value.copy(g.specularColor),g.specularColorMap&&(d.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,d.specularColorMapTransform)),g.specularIntensityMap&&(d.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,d.specularIntensityMapTransform))}function h(d,g){g.matcap&&(d.matcap.value=g.matcap)}function v(d,g){const x=e.get(g).light;d.referencePosition.value.setFromMatrixPosition(x.matrixWorld),d.nearDistance.value=x.shadow.camera.near,d.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function zv(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,y){const M=y.program;i.uniformBlockBinding(x,M)}function u(x,y){let M=s[x.id];M===void 0&&(h(x),M=c(x),s[x.id]=M,x.addEventListener("dispose",d));const w=y.program;i.updateUBOMapping(x,w);const b=e.render.frame;r[x.id]!==b&&(m(x),r[x.id]=b)}function c(x){const y=p();x.__bindingPointIndex=y;const M=n.createBuffer(),w=x.__size,b=x.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,w,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,M),M}function p(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(x){const y=s[x.id],M=x.uniforms,w=x.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let b=0,_=M.length;b<_;b++){const T=Array.isArray(M[b])?M[b]:[M[b]];for(let U=0,S=T.length;U<S;U++){const A=T[U];if(f(A,b,U,w)===!0){const k=A.__offset,H=Array.isArray(A.value)?A.value:[A.value];let G=0;for(let O=0;O<H.length;O++){const I=H[O],W=v(I);typeof I=="number"||typeof I=="boolean"?(A.__data[0]=I,n.bufferSubData(n.UNIFORM_BUFFER,k+G,A.__data)):I.isMatrix3?(A.__data[0]=I.elements[0],A.__data[1]=I.elements[1],A.__data[2]=I.elements[2],A.__data[3]=0,A.__data[4]=I.elements[3],A.__data[5]=I.elements[4],A.__data[6]=I.elements[5],A.__data[7]=0,A.__data[8]=I.elements[6],A.__data[9]=I.elements[7],A.__data[10]=I.elements[8],A.__data[11]=0):(I.toArray(A.__data,G),G+=W.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(x,y,M,w){const b=x.value,_=y+"_"+M;if(w[_]===void 0)return typeof b=="number"||typeof b=="boolean"?w[_]=b:w[_]=b.clone(),!0;{const T=w[_];if(typeof b=="number"||typeof b=="boolean"){if(T!==b)return w[_]=b,!0}else if(T.equals(b)===!1)return T.copy(b),!0}return!1}function h(x){const y=x.uniforms;let M=0;const w=16;for(let _=0,T=y.length;_<T;_++){const U=Array.isArray(y[_])?y[_]:[y[_]];for(let S=0,A=U.length;S<A;S++){const k=U[S],H=Array.isArray(k.value)?k.value:[k.value];for(let G=0,O=H.length;G<O;G++){const I=H[G],W=v(I),D=M%w,re=D%W.boundary,ce=D+re;M+=re,ce!==0&&w-ce<W.storage&&(M+=w-ce),k.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=M,M+=W.storage}}}const b=M%w;return b>0&&(M+=w-b),x.__size=M,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function d(x){const y=x.target;y.removeEventListener("dispose",d);const M=o.indexOf(y.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function g(){for(const x in s)n.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:u,dispose:g}}class Bv{constructor(e={}){const{canvas:t=Ad(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:p=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const f=new Uint32Array(4),h=new Int32Array(4);let v=null,d=null;const g=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=fn,this.toneMapping=qn,this.toneMappingExposure=1;const y=this;let M=!1,w=0,b=0,_=null,T=-1,U=null;const S=new St,A=new St;let k=null;const H=new He(0);let G=0,O=t.width,I=t.height,W=1,D=null,re=null;const ce=new St(0,0,O,I),he=new St(0,0,O,I);let Q=!1;const me=new Jc;let K=!1,j=!1;const de=new ct,fe=new ct,q=new F,ee=new St,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let N=!1;function $(){return _===null?W:1}let L=i;function Me(C,B){return t.getContext(C,B)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:c,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Bc}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),L===null){const B="webgl2";if(L=Me(B,C),L===null)throw Me(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let ge,Te,ne,Ce,Se,P,E,X,se,ae,Z,Re,ve,be,ze,le,we,Be,qe,Pe,et,$e,ft,z;function Ee(){ge=new X0(L),ge.init(),$e=new Pv(L,ge),Te=new z0(L,ge,e,$e),ne=new Tv(L),Te.reverseDepthBuffer&&ne.buffers.depth.setReversed(!0),Ce=new Y0(L),Se=new fv,P=new Cv(L,ge,ne,Se,Te,$e,Ce),E=new H0(y),X=new W0(y),se=new tp(L),ft=new k0(L,se),ae=new q0(L,se,Ce,ft),Z=new K0(L,ae,se,Ce),qe=new j0(L,Te,P),le=new B0(Se),Re=new hv(y,E,X,ge,Te,ft,le),ve=new Ov(y,Se),be=new pv,ze=new yv(ge),Be=new F0(y,E,X,ne,Z,m,l),we=new Ev(y,Z,Te),z=new zv(L,Ce,Te,ne),Pe=new O0(L,ge,Ce),et=new $0(L,ge,Ce),Ce.programs=Re.programs,y.capabilities=Te,y.extensions=ge,y.properties=Se,y.renderLists=be,y.shadowMap=we,y.state=ne,y.info=Ce}Ee();const te=new Fv(y,L);this.xr=te,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const C=ge.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=ge.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(C){C!==void 0&&(W=C,this.setSize(O,I,!1))},this.getSize=function(C){return C.set(O,I)},this.setSize=function(C,B,Y=!0){if(te.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=C,I=B,t.width=Math.floor(C*W),t.height=Math.floor(B*W),Y===!0&&(t.style.width=C+"px",t.style.height=B+"px"),this.setViewport(0,0,C,B)},this.getDrawingBufferSize=function(C){return C.set(O*W,I*W).floor()},this.setDrawingBufferSize=function(C,B,Y){O=C,I=B,W=Y,t.width=Math.floor(C*Y),t.height=Math.floor(B*Y),this.setViewport(0,0,C,B)},this.getCurrentViewport=function(C){return C.copy(S)},this.getViewport=function(C){return C.copy(ce)},this.setViewport=function(C,B,Y,J){C.isVector4?ce.set(C.x,C.y,C.z,C.w):ce.set(C,B,Y,J),ne.viewport(S.copy(ce).multiplyScalar(W).round())},this.getScissor=function(C){return C.copy(he)},this.setScissor=function(C,B,Y,J){C.isVector4?he.set(C.x,C.y,C.z,C.w):he.set(C,B,Y,J),ne.scissor(A.copy(he).multiplyScalar(W).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(C){ne.setScissorTest(Q=C)},this.setOpaqueSort=function(C){D=C},this.setTransparentSort=function(C){re=C},this.getClearColor=function(C){return C.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor.apply(Be,arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha.apply(Be,arguments)},this.clear=function(C=!0,B=!0,Y=!0){let J=0;if(C){let V=!1;if(_!==null){const ue=_.texture.format;V=ue===Yc||ue===$c||ue===qc}if(V){const ue=_.texture.type,xe=ue===Yn||ue===Ci||ue===nr||ue===_s||ue===Gc||ue===Wc,Le=Be.getClearColor(),Ue=Be.getClearAlpha(),Ge=Le.r,We=Le.g,Fe=Le.b;xe?(f[0]=Ge,f[1]=We,f[2]=Fe,f[3]=Ue,L.clearBufferuiv(L.COLOR,0,f)):(h[0]=Ge,h[1]=We,h[2]=Fe,h[3]=Ue,L.clearBufferiv(L.COLOR,0,h))}else J|=L.COLOR_BUFFER_BIT}B&&(J|=L.DEPTH_BUFFER_BIT,L.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Y&&(J|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),be.dispose(),ze.dispose(),Se.dispose(),E.dispose(),X.dispose(),Z.dispose(),ft.dispose(),z.dispose(),Re.dispose(),te.dispose(),te.removeEventListener("sessionstart",_l),te.removeEventListener("sessionend",xl),pi.stop()};function oe(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const C=Ce.autoReset,B=we.enabled,Y=we.autoUpdate,J=we.needsUpdate,V=we.type;Ee(),Ce.autoReset=C,we.enabled=B,we.autoUpdate=Y,we.needsUpdate=J,we.type=V}function Ae(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function nt(C){const B=C.target;B.removeEventListener("dispose",nt),wt(B)}function wt(C){Gt(C),Se.remove(C)}function Gt(C){const B=Se.get(C).programs;B!==void 0&&(B.forEach(function(Y){Re.releaseProgram(Y)}),C.isShaderMaterial&&Re.releaseShaderCache(C))}this.renderBufferDirect=function(C,B,Y,J,V,ue){B===null&&(B=ie);const xe=V.isMesh&&V.matrixWorld.determinant()<0,Le=Tf(C,B,Y,J,V);ne.setMaterial(J,xe);let Ue=Y.index,Ge=1;if(J.wireframe===!0){if(Ue=ae.getWireframeAttribute(Y),Ue===void 0)return;Ge=2}const We=Y.drawRange,Fe=Y.attributes.position;let lt=We.start*Ge,mt=(We.start+We.count)*Ge;ue!==null&&(lt=Math.max(lt,ue.start*Ge),mt=Math.min(mt,(ue.start+ue.count)*Ge)),Ue!==null?(lt=Math.max(lt,0),mt=Math.min(mt,Ue.count)):Fe!=null&&(lt=Math.max(lt,0),mt=Math.min(mt,Fe.count));const yt=mt-lt;if(yt<0||yt===1/0)return;ft.setup(V,J,Le,Y,Ue);let Kt,rt=Pe;if(Ue!==null&&(Kt=se.get(Ue),rt=et,rt.setIndex(Kt)),V.isMesh)J.wireframe===!0?(ne.setLineWidth(J.wireframeLinewidth*$()),rt.setMode(L.LINES)):rt.setMode(L.TRIANGLES);else if(V.isLine){let ke=J.linewidth;ke===void 0&&(ke=1),ne.setLineWidth(ke*$()),V.isLineSegments?rt.setMode(L.LINES):V.isLineLoop?rt.setMode(L.LINE_LOOP):rt.setMode(L.LINE_STRIP)}else V.isPoints?rt.setMode(L.POINTS):V.isSprite&&rt.setMode(L.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)rt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(ge.get("WEBGL_multi_draw"))rt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const ke=V._multiDrawStarts,Ut=V._multiDrawCounts,ot=V._multiDrawCount,gn=Ue?se.get(Ue).bytesPerElement:1,ki=Se.get(J).currentProgram.getUniforms();for(let Jt=0;Jt<ot;Jt++)ki.setValue(L,"_gl_DrawID",Jt),rt.render(ke[Jt]/gn,Ut[Jt])}else if(V.isInstancedMesh)rt.renderInstances(lt,yt,V.count);else if(Y.isInstancedBufferGeometry){const ke=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ut=Math.min(Y.instanceCount,ke);rt.renderInstances(lt,yt,Ut)}else rt.render(lt,yt)};function it(C,B,Y){C.transparent===!0&&C.side===en&&C.forceSinglePass===!1?(C.side=kt,C.needsUpdate=!0,gr(C,B,Y),C.side=hi,C.needsUpdate=!0,gr(C,B,Y),C.side=en):gr(C,B,Y)}this.compile=function(C,B,Y=null){Y===null&&(Y=C),d=ze.get(Y),d.init(B),x.push(d),Y.traverseVisible(function(V){V.isLight&&V.layers.test(B.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),C!==Y&&C.traverseVisible(function(V){V.isLight&&V.layers.test(B.layers)&&(d.pushLight(V),V.castShadow&&d.pushShadow(V))}),d.setupLights();const J=new Set;return C.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ue=V.material;if(ue)if(Array.isArray(ue))for(let xe=0;xe<ue.length;xe++){const Le=ue[xe];it(Le,Y,V),J.add(Le)}else it(ue,Y,V),J.add(ue)}),x.pop(),d=null,J},this.compileAsync=function(C,B,Y=null){const J=this.compile(C,B,Y);return new Promise(V=>{function ue(){if(J.forEach(function(xe){Se.get(xe).currentProgram.isReady()&&J.delete(xe)}),J.size===0){V(C);return}setTimeout(ue,10)}ge.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let Wt=null;function Fn(C){Wt&&Wt(C)}function _l(){pi.stop()}function xl(){pi.start()}const pi=new Bh;pi.setAnimationLoop(Fn),typeof self<"u"&&pi.setContext(self),this.setAnimationLoop=function(C){Wt=C,te.setAnimationLoop(C),C===null?pi.stop():pi.start()},te.addEventListener("sessionstart",_l),te.addEventListener("sessionend",xl),this.render=function(C,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(B),B=te.getCamera()),C.isScene===!0&&C.onBeforeRender(y,C,B,_),d=ze.get(C,x.length),d.init(B),x.push(d),fe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),me.setFromProjectionMatrix(fe),j=this.localClippingEnabled,K=le.init(this.clippingPlanes,j),v=be.get(C,g.length),v.init(),g.push(v),te.enabled===!0&&te.isPresenting===!0){const ue=y.xr.getDepthSensingMesh();ue!==null&&No(ue,B,-1/0,y.sortObjects)}No(C,B,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(D,re),N=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,N&&Be.addToRenderList(v,C),this.info.render.frame++,K===!0&&le.beginShadows();const Y=d.state.shadowsArray;we.render(Y,C,B),K===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=v.opaque,V=v.transmissive;if(d.setupLights(),B.isArrayCamera){const ue=B.cameras;if(V.length>0)for(let xe=0,Le=ue.length;xe<Le;xe++){const Ue=ue[xe];Ml(J,V,C,Ue)}N&&Be.render(C);for(let xe=0,Le=ue.length;xe<Le;xe++){const Ue=ue[xe];yl(v,C,Ue,Ue.viewport)}}else V.length>0&&Ml(J,V,C,B),N&&Be.render(C),yl(v,C,B);_!==null&&(P.updateMultisampleRenderTarget(_),P.updateRenderTargetMipmap(_)),C.isScene===!0&&C.onAfterRender(y,C,B),ft.resetDefaultState(),T=-1,U=null,x.pop(),x.length>0?(d=x[x.length-1],K===!0&&le.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,g.pop(),g.length>0?v=g[g.length-1]:v=null};function No(C,B,Y,J){if(C.visible===!1)return;if(C.layers.test(B.layers)){if(C.isGroup)Y=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(B);else if(C.isLight)d.pushLight(C),C.castShadow&&d.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||me.intersectsSprite(C)){J&&ee.setFromMatrixPosition(C.matrixWorld).applyMatrix4(fe);const xe=Z.update(C),Le=C.material;Le.visible&&v.push(C,xe,Le,Y,ee.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||me.intersectsObject(C))){const xe=Z.update(C),Le=C.material;if(J&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),ee.copy(C.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),ee.copy(xe.boundingSphere.center)),ee.applyMatrix4(C.matrixWorld).applyMatrix4(fe)),Array.isArray(Le)){const Ue=xe.groups;for(let Ge=0,We=Ue.length;Ge<We;Ge++){const Fe=Ue[Ge],lt=Le[Fe.materialIndex];lt&&lt.visible&&v.push(C,xe,lt,Y,ee.z,Fe)}}else Le.visible&&v.push(C,xe,Le,Y,ee.z,null)}}const ue=C.children;for(let xe=0,Le=ue.length;xe<Le;xe++)No(ue[xe],B,Y,J)}function yl(C,B,Y,J){const V=C.opaque,ue=C.transmissive,xe=C.transparent;d.setupLightsView(Y),K===!0&&le.setGlobalState(y.clippingPlanes,Y),J&&ne.viewport(S.copy(J)),V.length>0&&mr(V,B,Y),ue.length>0&&mr(ue,B,Y),xe.length>0&&mr(xe,B,Y),ne.buffers.depth.setTest(!0),ne.buffers.depth.setMask(!0),ne.buffers.color.setMask(!0),ne.setPolygonOffset(!1)}function Ml(C,B,Y,J){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[J.id]===void 0&&(d.state.transmissionRenderTarget[J.id]=new Pi(1,1,{generateMipmaps:!0,type:ge.has("EXT_color_buffer_half_float")||ge.has("EXT_color_buffer_float")?hr:Yn,minFilter:Ri,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const ue=d.state.transmissionRenderTarget[J.id],xe=J.viewport||S;ue.setSize(xe.z,xe.w);const Le=y.getRenderTarget();y.setRenderTarget(ue),y.getClearColor(H),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),N&&Be.render(Y);const Ue=y.toneMapping;y.toneMapping=qn;const Ge=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),d.setupLightsView(J),K===!0&&le.setGlobalState(y.clippingPlanes,J),mr(C,Y,J),P.updateMultisampleRenderTarget(ue),P.updateRenderTargetMipmap(ue),ge.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Fe=0,lt=B.length;Fe<lt;Fe++){const mt=B[Fe],yt=mt.object,Kt=mt.geometry,rt=mt.material,ke=mt.group;if(rt.side===en&&yt.layers.test(J.layers)){const Ut=rt.side;rt.side=kt,rt.needsUpdate=!0,Sl(yt,Y,J,Kt,rt,ke),rt.side=Ut,rt.needsUpdate=!0,We=!0}}We===!0&&(P.updateMultisampleRenderTarget(ue),P.updateRenderTargetMipmap(ue))}y.setRenderTarget(Le),y.setClearColor(H,G),Ge!==void 0&&(J.viewport=Ge),y.toneMapping=Ue}function mr(C,B,Y){const J=B.isScene===!0?B.overrideMaterial:null;for(let V=0,ue=C.length;V<ue;V++){const xe=C[V],Le=xe.object,Ue=xe.geometry,Ge=J===null?xe.material:J,We=xe.group;Le.layers.test(Y.layers)&&Sl(Le,B,Y,Ue,Ge,We)}}function Sl(C,B,Y,J,V,ue){C.onBeforeRender(y,B,Y,J,V,ue),C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),V.onBeforeRender(y,B,Y,J,C,ue),V.transparent===!0&&V.side===en&&V.forceSinglePass===!1?(V.side=kt,V.needsUpdate=!0,y.renderBufferDirect(Y,B,J,V,C,ue),V.side=hi,V.needsUpdate=!0,y.renderBufferDirect(Y,B,J,V,C,ue),V.side=en):y.renderBufferDirect(Y,B,J,V,C,ue),C.onAfterRender(y,B,Y,J,V,ue)}function gr(C,B,Y){B.isScene!==!0&&(B=ie);const J=Se.get(C),V=d.state.lights,ue=d.state.shadowsArray,xe=V.state.version,Le=Re.getParameters(C,V.state,ue,B,Y),Ue=Re.getProgramCacheKey(Le);let Ge=J.programs;J.environment=C.isMeshStandardMaterial?B.environment:null,J.fog=B.fog,J.envMap=(C.isMeshStandardMaterial?X:E).get(C.envMap||J.environment),J.envMapRotation=J.environment!==null&&C.envMap===null?B.environmentRotation:C.envMapRotation,Ge===void 0&&(C.addEventListener("dispose",nt),Ge=new Map,J.programs=Ge);let We=Ge.get(Ue);if(We!==void 0){if(J.currentProgram===We&&J.lightsStateVersion===xe)return wl(C,Le),We}else Le.uniforms=Re.getUniforms(C),C.onBeforeCompile(Le,y),We=Re.acquireProgram(Le,Ue),Ge.set(Ue,We),J.uniforms=Le.uniforms;const Fe=J.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Fe.clippingPlanes=le.uniform),wl(C,Le),J.needsLights=Cf(C),J.lightsStateVersion=xe,J.needsLights&&(Fe.ambientLightColor.value=V.state.ambient,Fe.lightProbe.value=V.state.probe,Fe.directionalLights.value=V.state.directional,Fe.directionalLightShadows.value=V.state.directionalShadow,Fe.spotLights.value=V.state.spot,Fe.spotLightShadows.value=V.state.spotShadow,Fe.rectAreaLights.value=V.state.rectArea,Fe.ltc_1.value=V.state.rectAreaLTC1,Fe.ltc_2.value=V.state.rectAreaLTC2,Fe.pointLights.value=V.state.point,Fe.pointLightShadows.value=V.state.pointShadow,Fe.hemisphereLights.value=V.state.hemi,Fe.directionalShadowMap.value=V.state.directionalShadowMap,Fe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Fe.spotShadowMap.value=V.state.spotShadowMap,Fe.spotLightMatrix.value=V.state.spotLightMatrix,Fe.spotLightMap.value=V.state.spotLightMap,Fe.pointShadowMap.value=V.state.pointShadowMap,Fe.pointShadowMatrix.value=V.state.pointShadowMatrix),J.currentProgram=We,J.uniformsList=null,We}function bl(C){if(C.uniformsList===null){const B=C.currentProgram.getUniforms();C.uniformsList=ao.seqWithValue(B.seq,C.uniforms)}return C.uniformsList}function wl(C,B){const Y=Se.get(C);Y.outputColorSpace=B.outputColorSpace,Y.batching=B.batching,Y.batchingColor=B.batchingColor,Y.instancing=B.instancing,Y.instancingColor=B.instancingColor,Y.instancingMorph=B.instancingMorph,Y.skinning=B.skinning,Y.morphTargets=B.morphTargets,Y.morphNormals=B.morphNormals,Y.morphColors=B.morphColors,Y.morphTargetsCount=B.morphTargetsCount,Y.numClippingPlanes=B.numClippingPlanes,Y.numIntersection=B.numClipIntersection,Y.vertexAlphas=B.vertexAlphas,Y.vertexTangents=B.vertexTangents,Y.toneMapping=B.toneMapping}function Tf(C,B,Y,J,V){B.isScene!==!0&&(B=ie),P.resetTextureUnits();const ue=B.fog,xe=J.isMeshStandardMaterial?B.environment:null,Le=_===null?y.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:fi,Ue=(J.isMeshStandardMaterial?X:E).get(J.envMap||xe),Ge=J.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,We=!!Y.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Fe=!!Y.morphAttributes.position,lt=!!Y.morphAttributes.normal,mt=!!Y.morphAttributes.color;let yt=qn;J.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(yt=y.toneMapping);const Kt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,rt=Kt!==void 0?Kt.length:0,ke=Se.get(J),Ut=d.state.lights;if(K===!0&&(j===!0||C!==U)){const cn=C===U&&J.id===T;le.setState(J,C,cn)}let ot=!1;J.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==Ut.state.version||ke.outputColorSpace!==Le||V.isBatchedMesh&&ke.batching===!1||!V.isBatchedMesh&&ke.batching===!0||V.isBatchedMesh&&ke.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&ke.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&ke.instancing===!1||!V.isInstancedMesh&&ke.instancing===!0||V.isSkinnedMesh&&ke.skinning===!1||!V.isSkinnedMesh&&ke.skinning===!0||V.isInstancedMesh&&ke.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&ke.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&ke.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&ke.instancingMorph===!1&&V.morphTexture!==null||ke.envMap!==Ue||J.fog===!0&&ke.fog!==ue||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==le.numPlanes||ke.numIntersection!==le.numIntersection)||ke.vertexAlphas!==Ge||ke.vertexTangents!==We||ke.morphTargets!==Fe||ke.morphNormals!==lt||ke.morphColors!==mt||ke.toneMapping!==yt||ke.morphTargetsCount!==rt)&&(ot=!0):(ot=!0,ke.__version=J.version);let gn=ke.currentProgram;ot===!0&&(gn=gr(J,B,V));let ki=!1,Jt=!1,Fo=!1;const bt=gn.getUniforms(),Jn=ke.uniforms;if(ne.useProgram(gn.program)&&(ki=!0,Jt=!0,Fo=!0),J.id!==T&&(T=J.id,Jt=!0),ki||U!==C){Te.reverseDepthBuffer?(de.copy(C.projectionMatrix),Rd(de),Cd(de),bt.setValue(L,"projectionMatrix",de)):bt.setValue(L,"projectionMatrix",C.projectionMatrix),bt.setValue(L,"viewMatrix",C.matrixWorldInverse);const cn=bt.map.cameraPosition;cn!==void 0&&cn.setValue(L,q.setFromMatrixPosition(C.matrixWorld)),Te.logarithmicDepthBuffer&&bt.setValue(L,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&bt.setValue(L,"isOrthographic",C.isOrthographicCamera===!0),U!==C&&(U=C,Jt=!0,Fo=!0)}if(V.isSkinnedMesh){bt.setOptional(L,V,"bindMatrix"),bt.setOptional(L,V,"bindMatrixInverse");const cn=V.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),bt.setValue(L,"boneTexture",cn.boneTexture,P))}V.isBatchedMesh&&(bt.setOptional(L,V,"batchingTexture"),bt.setValue(L,"batchingTexture",V._matricesTexture,P),bt.setOptional(L,V,"batchingIdTexture"),bt.setValue(L,"batchingIdTexture",V._indirectTexture,P),bt.setOptional(L,V,"batchingColorTexture"),V._colorsTexture!==null&&bt.setValue(L,"batchingColorTexture",V._colorsTexture,P));const ko=Y.morphAttributes;if((ko.position!==void 0||ko.normal!==void 0||ko.color!==void 0)&&qe.update(V,Y,gn),(Jt||ke.receiveShadow!==V.receiveShadow)&&(ke.receiveShadow=V.receiveShadow,bt.setValue(L,"receiveShadow",V.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(Jn.envMap.value=Ue,Jn.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&B.environment!==null&&(Jn.envMapIntensity.value=B.environmentIntensity),Jt&&(bt.setValue(L,"toneMappingExposure",y.toneMappingExposure),ke.needsLights&&Rf(Jn,Fo),ue&&J.fog===!0&&ve.refreshFogUniforms(Jn,ue),ve.refreshMaterialUniforms(Jn,J,W,I,d.state.transmissionRenderTarget[C.id]),ao.upload(L,bl(ke),Jn,P)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ao.upload(L,bl(ke),Jn,P),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&bt.setValue(L,"center",V.center),bt.setValue(L,"modelViewMatrix",V.modelViewMatrix),bt.setValue(L,"normalMatrix",V.normalMatrix),bt.setValue(L,"modelMatrix",V.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const cn=J.uniformsGroups;for(let Oo=0,Pf=cn.length;Oo<Pf;Oo++){const El=cn[Oo];z.update(El,gn),z.bind(El,gn)}}return gn}function Rf(C,B){C.ambientLightColor.needsUpdate=B,C.lightProbe.needsUpdate=B,C.directionalLights.needsUpdate=B,C.directionalLightShadows.needsUpdate=B,C.pointLights.needsUpdate=B,C.pointLightShadows.needsUpdate=B,C.spotLights.needsUpdate=B,C.spotLightShadows.needsUpdate=B,C.rectAreaLights.needsUpdate=B,C.hemisphereLights.needsUpdate=B}function Cf(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(C,B,Y){Se.get(C.texture).__webglTexture=B,Se.get(C.depthTexture).__webglTexture=Y;const J=Se.get(C);J.__hasExternalTextures=!0,J.__autoAllocateDepthBuffer=Y===void 0,J.__autoAllocateDepthBuffer||ge.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),J.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,B){const Y=Se.get(C);Y.__webglFramebuffer=B,Y.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(C,B=0,Y=0){_=C,w=B,b=Y;let J=!0,V=null,ue=!1,xe=!1;if(C){const Ue=Se.get(C);if(Ue.__useDefaultFramebuffer!==void 0)ne.bindFramebuffer(L.FRAMEBUFFER,null),J=!1;else if(Ue.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(Ue.__hasExternalTextures)P.rebindTextures(C,Se.get(C.texture).__webglTexture,Se.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Fe=C.depthTexture;if(Ue.__boundDepthTexture!==Fe){if(Fe!==null&&Se.has(Fe)&&(C.width!==Fe.image.width||C.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const Ge=C.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(xe=!0);const We=Se.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(We[B])?V=We[B][Y]:V=We[B],ue=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?V=Se.get(C).__webglMultisampledFramebuffer:Array.isArray(We)?V=We[Y]:V=We,S.copy(C.viewport),A.copy(C.scissor),k=C.scissorTest}else S.copy(ce).multiplyScalar(W).floor(),A.copy(he).multiplyScalar(W).floor(),k=Q;if(ne.bindFramebuffer(L.FRAMEBUFFER,V)&&J&&ne.drawBuffers(C,V),ne.viewport(S),ne.scissor(A),ne.setScissorTest(k),ue){const Ue=Se.get(C.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ue.__webglTexture,Y)}else if(xe){const Ue=Se.get(C.texture),Ge=B||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ue.__webglTexture,Y||0,Ge)}T=-1},this.readRenderTargetPixels=function(C,B,Y,J,V,ue,xe){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&xe!==void 0&&(Le=Le[xe]),Le){ne.bindFramebuffer(L.FRAMEBUFFER,Le);try{const Ue=C.texture,Ge=Ue.format,We=Ue.type;if(!Te.textureFormatReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Te.textureTypeReadable(We)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=C.width-J&&Y>=0&&Y<=C.height-V&&L.readPixels(B,Y,J,V,$e.convert(Ge),$e.convert(We),ue)}finally{const Ue=_!==null?Se.get(_).__webglFramebuffer:null;ne.bindFramebuffer(L.FRAMEBUFFER,Ue)}}},this.readRenderTargetPixelsAsync=async function(C,B,Y,J,V,ue,xe){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Se.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&xe!==void 0&&(Le=Le[xe]),Le){const Ue=C.texture,Ge=Ue.format,We=Ue.type;if(!Te.textureFormatReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Te.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(B>=0&&B<=C.width-J&&Y>=0&&Y<=C.height-V){ne.bindFramebuffer(L.FRAMEBUFFER,Le);const Fe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.bufferData(L.PIXEL_PACK_BUFFER,ue.byteLength,L.STREAM_READ),L.readPixels(B,Y,J,V,$e.convert(Ge),$e.convert(We),0);const lt=_!==null?Se.get(_).__webglFramebuffer:null;ne.bindFramebuffer(L.FRAMEBUFFER,lt);const mt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Td(L,mt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Fe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ue),L.deleteBuffer(Fe),L.deleteSync(mt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,B=null,Y=0){C.isTexture!==!0&&(oo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),B=arguments[0]||null,C=arguments[1]);const J=Math.pow(2,-Y),V=Math.floor(C.image.width*J),ue=Math.floor(C.image.height*J),xe=B!==null?B.x:0,Le=B!==null?B.y:0;P.setTexture2D(C,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,xe,Le,V,ue),ne.unbindTexture()},this.copyTextureToTexture=function(C,B,Y=null,J=null,V=0){C.isTexture!==!0&&(oo("WebGLRenderer: copyTextureToTexture function signature has changed."),J=arguments[0]||null,C=arguments[1],B=arguments[2],V=arguments[3]||0,Y=null);let ue,xe,Le,Ue,Ge,We;Y!==null?(ue=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,Le=Y.min.x,Ue=Y.min.y):(ue=C.image.width,xe=C.image.height,Le=0,Ue=0),J!==null?(Ge=J.x,We=J.y):(Ge=0,We=0);const Fe=$e.convert(B.format),lt=$e.convert(B.type);P.setTexture2D(B,0),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,B.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,B.unpackAlignment);const mt=L.getParameter(L.UNPACK_ROW_LENGTH),yt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Kt=L.getParameter(L.UNPACK_SKIP_PIXELS),rt=L.getParameter(L.UNPACK_SKIP_ROWS),ke=L.getParameter(L.UNPACK_SKIP_IMAGES),Ut=C.isCompressedTexture?C.mipmaps[V]:C.image;L.pixelStorei(L.UNPACK_ROW_LENGTH,Ut.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ut.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Le),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ue),C.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,V,Ge,We,ue,xe,Fe,lt,Ut.data):C.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,V,Ge,We,Ut.width,Ut.height,Fe,Ut.data):L.texSubImage2D(L.TEXTURE_2D,V,Ge,We,ue,xe,Fe,lt,Ut),L.pixelStorei(L.UNPACK_ROW_LENGTH,mt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Kt),L.pixelStorei(L.UNPACK_SKIP_ROWS,rt),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ke),V===0&&B.generateMipmaps&&L.generateMipmap(L.TEXTURE_2D),ne.unbindTexture()},this.copyTextureToTexture3D=function(C,B,Y=null,J=null,V=0){C.isTexture!==!0&&(oo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,J=arguments[1]||null,C=arguments[2],B=arguments[3],V=arguments[4]||0);let ue,xe,Le,Ue,Ge,We,Fe,lt,mt;const yt=C.isCompressedTexture?C.mipmaps[V]:C.image;Y!==null?(ue=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,Le=Y.max.z-Y.min.z,Ue=Y.min.x,Ge=Y.min.y,We=Y.min.z):(ue=yt.width,xe=yt.height,Le=yt.depth,Ue=0,Ge=0,We=0),J!==null?(Fe=J.x,lt=J.y,mt=J.z):(Fe=0,lt=0,mt=0);const Kt=$e.convert(B.format),rt=$e.convert(B.type);let ke;if(B.isData3DTexture)P.setTexture3D(B,0),ke=L.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)P.setTexture2DArray(B,0),ke=L.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,B.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,B.unpackAlignment);const Ut=L.getParameter(L.UNPACK_ROW_LENGTH),ot=L.getParameter(L.UNPACK_IMAGE_HEIGHT),gn=L.getParameter(L.UNPACK_SKIP_PIXELS),ki=L.getParameter(L.UNPACK_SKIP_ROWS),Jt=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,yt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,yt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ge),L.pixelStorei(L.UNPACK_SKIP_IMAGES,We),C.isDataTexture||C.isData3DTexture?L.texSubImage3D(ke,V,Fe,lt,mt,ue,xe,Le,Kt,rt,yt.data):B.isCompressedArrayTexture?L.compressedTexSubImage3D(ke,V,Fe,lt,mt,ue,xe,Le,Kt,yt.data):L.texSubImage3D(ke,V,Fe,lt,mt,ue,xe,Le,Kt,rt,yt),L.pixelStorei(L.UNPACK_ROW_LENGTH,Ut),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ot),L.pixelStorei(L.UNPACK_SKIP_PIXELS,gn),L.pixelStorei(L.UNPACK_SKIP_ROWS,ki),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Jt),V===0&&B.generateMipmaps&&L.generateMipmap(ke),ne.unbindTexture()},this.initRenderTarget=function(C){Se.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),ne.unbindTexture()},this.resetState=function(){w=0,b=0,_=null,ne.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Kc?"display-p3":"srgb",t.unpackColorSpace=at.workingColorSpace===Eo?"display-p3":"srgb"}}class Qc{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new He(e),this.near=t,this.far=i}clone(){return new Qc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hv extends At{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new on,this.environmentIntensity=1,this.environmentRotation=new on,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class $h extends Ot{constructor(e=null,t=1,i=1,s,r,o,a,l,u=Vt,c=Vt,p,m){super(null,o,a,l,u,c,s,r,p,m),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ec extends rn{constructor(e,t,i,s=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Zi=new ct,bu=new ct,Or=[],wu=new Ni,Vv=new ct,Ds=new pt,Ns=new fr;class To extends pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ec(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Vv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ni),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),wu.copy(e.boundingBox).applyMatrix4(Zi),this.boundingBox.union(wu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,Zi),Ns.copy(e.boundingSphere).applyMatrix4(Zi),this.boundingSphere.union(Ns)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=i.length+1,o=e*r+1;for(let a=0;a<i.length;a++)i[a]=s[o+a]}raycast(e,t){const i=this.matrixWorld,s=this.count;if(Ds.geometry=this.geometry,Ds.material=this.material,Ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ns.copy(this.boundingSphere),Ns.applyMatrix4(i),e.ray.intersectsSphere(Ns)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Zi),bu.multiplyMatrices(i,Zi),Ds.matrixWorld=bu,Ds.raycast(e,Or);for(let o=0,a=Or.length;o<a;o++){const l=Or[o];l.instanceId=r,l.object=this,t.push(l)}Or.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ec(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,s=i.length+1;this.morphTexture===null&&(this.morphTexture=new $h(new Float32Array(s*this.count),s,this.count,Xc,In));const r=this.morphTexture.source.data.data;let o=0;for(let u=0;u<i.length;u++)o+=i[u];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;r[l]=a,r.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Gv extends Ot{constructor(e,t,i,s,r,o,a,l,u){super(e,t,i,s,r,o,a,l,u),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,u;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),u=i[s]-o,u<0)a=s+1;else if(u>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const c=i[s],m=i[s+1]-c,f=(o-c)/m;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new ye:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new F,s=[],r=[],o=[],a=new F,l=new ct;for(let f=0;f<=e;f++){const h=f/e;s[f]=this.getTangentAt(h,new F)}r[0]=new F,o[0]=new F;let u=Number.MAX_VALUE;const c=Math.abs(s[0].x),p=Math.abs(s[0].y),m=Math.abs(s[0].z);c<=u&&(u=c,i.set(1,0,0)),p<=u&&(u=p,i.set(0,1,0)),m<=u&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const h=Math.acos(Dt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,h))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Dt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let h=1;h<=e;h++)r[h].applyMatrix4(l.makeRotationAxis(s[h],f*h)),o[h].crossVectors(s[h],r[h])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class el extends Nn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ye){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),u=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),p=Math.sin(this.aRotation),m=l-this.aX,f=u-this.aY;l=m*c-f*p+this.aX,u=m*p+f*c+this.aY}return i.set(l,u)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Wv extends el{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function tl(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,u){s(o,a,u*(a-r),u*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,u,c,p){let m=(o-r)/u-(a-r)/(u+c)+(a-o)/c,f=(a-o)/c-(l-o)/(c+p)+(l-a)/p;m*=c,f*=c,s(o,a,m,f)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const zr=new F,ga=new tl,va=new tl,_a=new tl;class Xv extends Nn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new F){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let u,c;this.closed||a>0?u=s[(a-1)%r]:(zr.subVectors(s[0],s[1]).add(s[0]),u=zr);const p=s[a%r],m=s[(a+1)%r];if(this.closed||a+2<r?c=s[(a+2)%r]:(zr.subVectors(s[r-1],s[r-2]).add(s[r-1]),c=zr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let h=Math.pow(u.distanceToSquared(p),f),v=Math.pow(p.distanceToSquared(m),f),d=Math.pow(m.distanceToSquared(c),f);v<1e-4&&(v=1),h<1e-4&&(h=v),d<1e-4&&(d=v),ga.initNonuniformCatmullRom(u.x,p.x,m.x,c.x,h,v,d),va.initNonuniformCatmullRom(u.y,p.y,m.y,c.y,h,v,d),_a.initNonuniformCatmullRom(u.z,p.z,m.z,c.z,h,v,d)}else this.curveType==="catmullrom"&&(ga.initCatmullRom(u.x,p.x,m.x,c.x,this.tension),va.initCatmullRom(u.y,p.y,m.y,c.y,this.tension),_a.initCatmullRom(u.z,p.z,m.z,c.z,this.tension));return i.set(ga.calc(l),va.calc(l),_a.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new F().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Eu(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function qv(n,e){const t=1-n;return t*t*e}function $v(n,e){return 2*(1-n)*n*e}function Yv(n,e){return n*n*e}function js(n,e,t,i){return qv(n,e)+$v(n,t)+Yv(n,i)}function jv(n,e){const t=1-n;return t*t*t*e}function Kv(n,e){const t=1-n;return 3*t*t*n*e}function Jv(n,e){return 3*(1-n)*n*n*e}function Zv(n,e){return n*n*n*e}function Ks(n,e,t,i,s){return jv(n,e)+Kv(n,t)+Jv(n,i)+Zv(n,s)}class Yh extends Nn{constructor(e=new ye,t=new ye,i=new ye,s=new ye){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new ye){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ks(e,s.x,r.x,o.x,a.x),Ks(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Qv extends Nn{constructor(e=new F,t=new F,i=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new F){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ks(e,s.x,r.x,o.x,a.x),Ks(e,s.y,r.y,o.y,a.y),Ks(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class jh extends Nn{constructor(e=new ye,t=new ye){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ye){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ye){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class e_ extends Nn{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Kh extends Nn{constructor(e=new ye,t=new ye,i=new ye){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ye){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(js(e,s.x,r.x,o.x),js(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class t_ extends Nn{constructor(e=new F,t=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new F){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(js(e,s.x,r.x,o.x),js(e,s.y,r.y,o.y),js(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Jh extends Nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ye){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],u=s[o],c=s[o>s.length-2?s.length-1:o+1],p=s[o>s.length-3?s.length-1:o+2];return i.set(Eu(a,l.x,u.x,c.x,p.x),Eu(a,l.y,u.y,c.y,p.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new ye().fromArray(s))}return this}}var Au=Object.freeze({__proto__:null,ArcCurve:Wv,CatmullRomCurve3:Xv,CubicBezierCurve:Yh,CubicBezierCurve3:Qv,EllipseCurve:el,LineCurve:jh,LineCurve3:e_,QuadraticBezierCurve:Kh,QuadraticBezierCurve3:t_,SplineCurve:Jh});class n_ extends Nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Au[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),u=l===0?0:1-o/l;return a.getPointAt(u,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let u=0;u<l.length;u++){const c=l[u];i&&i.equals(c)||(t.push(c),i=c)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new Au[s.type]().fromJSON(s))}return this}}class Ac extends n_{constructor(e){super(),this.type="Path",this.currentPoint=new ye,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new jh(this.currentPoint.clone(),new ye(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new Kh(this.currentPoint.clone(),new ye(e,t),new ye(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){const a=new Yh(this.currentPoint.clone(),new ye(e,t),new ye(i,s),new ye(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new Jh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){const u=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(e+u,t+c,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){const u=new el(e,t,i,s,r,o,a,l);if(this.curves.length>0){const p=u.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(u);const c=u.getPoint(1);return this.currentPoint.copy(c),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ro extends Ct{constructor(e=[new ye(0,-.5),new ye(.5,0),new ye(0,.5)],t=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:s},t=Math.floor(t),s=Dt(s,0,Math.PI*2);const r=[],o=[],a=[],l=[],u=[],c=1/t,p=new F,m=new ye,f=new F,h=new F,v=new F;let d=0,g=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:d=e[x+1].x-e[x].x,g=e[x+1].y-e[x].y,f.x=g*1,f.y=-d,f.z=g*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:d=e[x+1].x-e[x].x,g=e[x+1].y-e[x].y,f.x=g*1,f.y=-d,f.z=g*0,h.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(h)}for(let x=0;x<=t;x++){const y=i+x*c*s,M=Math.sin(y),w=Math.cos(y);for(let b=0;b<=e.length-1;b++){p.x=e[b].x*M,p.y=e[b].y,p.z=e[b].x*w,o.push(p.x,p.y,p.z),m.x=x/t,m.y=b/(e.length-1),a.push(m.x,m.y);const _=l[3*b+0]*M,T=l[3*b+1],U=l[3*b+0]*w;u.push(_,T,U)}}for(let x=0;x<t;x++)for(let y=0;y<e.length-1;y++){const M=y+x*e.length,w=M,b=M+e.length,_=M+e.length+1,T=M+1;r.push(w,b,T),r.push(_,T,b)}this.setIndex(r),this.setAttribute("position",new Qe(o,3)),this.setAttribute("uv",new Qe(a,2)),this.setAttribute("normal",new Qe(u,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ro(e.points,e.segments,e.phiStart,e.phiLength)}}class nl extends Ro{constructor(e=1,t=1,i=4,s=8){const r=new Ac;r.absarc(0,-t/2,e,Math.PI*1.5,0),r.absarc(0,t/2,e,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:i,radialSegments:s}}static fromJSON(e){return new nl(e.radius,e.length,e.capSegments,e.radialSegments)}}class Co extends Ct{constructor(e=1,t=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:s},t=Math.max(3,t);const r=[],o=[],a=[],l=[],u=new F,c=new ye;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,m=3;p<=t;p++,m+=3){const f=i+p/t*s;u.x=e*Math.cos(f),u.y=e*Math.sin(f),o.push(u.x,u.y,u.z),a.push(0,0,1),c.x=(o[m]/e+1)/2,c.y=(o[m+1]/e+1)/2,l.push(c.x,c.y)}for(let p=1;p<=t;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new Qe(o,3)),this.setAttribute("normal",new Qe(a,3)),this.setAttribute("uv",new Qe(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Co(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class It extends Ct{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const u=this;s=Math.floor(s),r=Math.floor(r);const c=[],p=[],m=[],f=[];let h=0;const v=[],d=i/2;let g=0;x(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(c),this.setAttribute("position",new Qe(p,3)),this.setAttribute("normal",new Qe(m,3)),this.setAttribute("uv",new Qe(f,2));function x(){const M=new F,w=new F;let b=0;const _=(t-e)/i;for(let T=0;T<=r;T++){const U=[],S=T/r,A=S*(t-e)+e;for(let k=0;k<=s;k++){const H=k/s,G=H*l+a,O=Math.sin(G),I=Math.cos(G);w.x=A*O,w.y=-S*i+d,w.z=A*I,p.push(w.x,w.y,w.z),M.set(O,_,I).normalize(),m.push(M.x,M.y,M.z),f.push(H,1-S),U.push(h++)}v.push(U)}for(let T=0;T<s;T++)for(let U=0;U<r;U++){const S=v[U][T],A=v[U+1][T],k=v[U+1][T+1],H=v[U][T+1];e>0&&(c.push(S,A,H),b+=3),t>0&&(c.push(A,k,H),b+=3)}u.addGroup(g,b,0),g+=b}function y(M){const w=h,b=new ye,_=new F;let T=0;const U=M===!0?e:t,S=M===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,d*S,0),m.push(0,S,0),f.push(.5,.5),h++;const A=h;for(let k=0;k<=s;k++){const G=k/s*l+a,O=Math.cos(G),I=Math.sin(G);_.x=U*I,_.y=d*S,_.z=U*O,p.push(_.x,_.y,_.z),m.push(0,S,0),b.x=O*.5+.5,b.y=I*.5*S+.5,f.push(b.x,b.y),h++}for(let k=0;k<s;k++){const H=w+k,G=A+k;M===!0?c.push(G,G+1,H):c.push(G+1,G,H),T+=3}u.addGroup(g,T,M===!0?1:2),g+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new It(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Bt extends It{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Bt(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class dr extends Ct{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),u(i),c(),this.setAttribute("position",new Qe(r,3)),this.setAttribute("normal",new Qe(r.slice(),3)),this.setAttribute("uv",new Qe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const y=new F,M=new F,w=new F;for(let b=0;b<t.length;b+=3)f(t[b+0],y),f(t[b+1],M),f(t[b+2],w),l(y,M,w,x)}function l(x,y,M,w){const b=w+1,_=[];for(let T=0;T<=b;T++){_[T]=[];const U=x.clone().lerp(M,T/b),S=y.clone().lerp(M,T/b),A=b-T;for(let k=0;k<=A;k++)k===0&&T===b?_[T][k]=U:_[T][k]=U.clone().lerp(S,k/A)}for(let T=0;T<b;T++)for(let U=0;U<2*(b-T)-1;U++){const S=Math.floor(U/2);U%2===0?(m(_[T][S+1]),m(_[T+1][S]),m(_[T][S])):(m(_[T][S+1]),m(_[T+1][S+1]),m(_[T+1][S]))}}function u(x){const y=new F;for(let M=0;M<r.length;M+=3)y.x=r[M+0],y.y=r[M+1],y.z=r[M+2],y.normalize().multiplyScalar(x),r[M+0]=y.x,r[M+1]=y.y,r[M+2]=y.z}function c(){const x=new F;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];const M=d(x)/2/Math.PI+.5,w=g(x)/Math.PI+.5;o.push(M,1-w)}h(),p()}function p(){for(let x=0;x<o.length;x+=6){const y=o[x+0],M=o[x+2],w=o[x+4],b=Math.max(y,M,w),_=Math.min(y,M,w);b>.9&&_<.1&&(y<.2&&(o[x+0]+=1),M<.2&&(o[x+2]+=1),w<.2&&(o[x+4]+=1))}}function m(x){r.push(x.x,x.y,x.z)}function f(x,y){const M=x*3;y.x=e[M+0],y.y=e[M+1],y.z=e[M+2]}function h(){const x=new F,y=new F,M=new F,w=new F,b=new ye,_=new ye,T=new ye;for(let U=0,S=0;U<r.length;U+=9,S+=6){x.set(r[U+0],r[U+1],r[U+2]),y.set(r[U+3],r[U+4],r[U+5]),M.set(r[U+6],r[U+7],r[U+8]),b.set(o[S+0],o[S+1]),_.set(o[S+2],o[S+3]),T.set(o[S+4],o[S+5]),w.copy(x).add(y).add(M).divideScalar(3);const A=d(w);v(b,S+0,x,A),v(_,S+2,y,A),v(T,S+4,M,A)}}function v(x,y,M,w){w<0&&x.x===1&&(o[y]=x.x-1),M.x===0&&M.z===0&&(o[y]=w/2/Math.PI+.5)}function d(x){return Math.atan2(x.z,-x.x)}function g(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dr(e.vertices,e.indices,e.radius,e.details)}}class fs extends dr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new fs(e.radius,e.detail)}}class il extends Ac{constructor(e){super(e),this.uuid=ws(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new Ac().fromJSON(s))}return this}}const i_={triangulate:function(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=Zh(n,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,u,c,p,m,f;if(i&&(r=c_(n,e,r,t)),n.length>80*t){a=u=n[0],l=c=n[1];for(let h=t;h<s;h+=t)p=n[h],m=n[h+1],p<a&&(a=p),m<l&&(l=m),p>u&&(u=p),m>c&&(c=m);f=Math.max(u-a,c-l),f=f!==0?32767/f:0}return ir(r,o,t,a,l,f,0),o}};function Zh(n,e,t,i,s){let r,o;if(s===x_(n,e,t,i)>0)for(r=e;r<t;r+=i)o=Tu(r,n[r],n[r+1],o);else for(r=t-i;r>=e;r-=i)o=Tu(r,n[r],n[r+1],o);return o&&Po(o,o.next)&&(rr(o),o=o.next),o}function Ii(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Po(t,t.next)||xt(t.prev,t,t.next)===0)){if(rr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function ir(n,e,t,i,s,r,o){if(!n)return;!o&&r&&d_(n,i,s,r);let a=n,l,u;for(;n.prev!==n.next;){if(l=n.prev,u=n.next,r?r_(n,i,s,r):s_(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(u.i/t|0),rr(n),n=u.next,a=u.next;continue}if(n=u,n===a){o?o===1?(n=o_(Ii(n),e,t),ir(n,e,t,i,s,r,2)):o===2&&a_(n,e,t,i,s,r):ir(Ii(n),e,t,i,s,r,1);break}}}function s_(n){const e=n.prev,t=n,i=n.next;if(xt(e,t,i)>=0)return!1;const s=e.x,r=t.x,o=i.x,a=e.y,l=t.y,u=i.y,c=s<r?s<o?s:o:r<o?r:o,p=a<l?a<u?a:u:l<u?l:u,m=s>r?s>o?s:o:r>o?r:o,f=a>l?a>u?a:u:l>u?l:u;let h=i.next;for(;h!==e;){if(h.x>=c&&h.x<=m&&h.y>=p&&h.y<=f&&as(s,a,r,l,o,u,h.x,h.y)&&xt(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function r_(n,e,t,i){const s=n.prev,r=n,o=n.next;if(xt(s,r,o)>=0)return!1;const a=s.x,l=r.x,u=o.x,c=s.y,p=r.y,m=o.y,f=a<l?a<u?a:u:l<u?l:u,h=c<p?c<m?c:m:p<m?p:m,v=a>l?a>u?a:u:l>u?l:u,d=c>p?c>m?c:m:p>m?p:m,g=Tc(f,h,e,t,i),x=Tc(v,d,e,t,i);let y=n.prevZ,M=n.nextZ;for(;y&&y.z>=g&&M&&M.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=h&&y.y<=d&&y!==s&&y!==o&&as(a,c,l,p,u,m,y.x,y.y)&&xt(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=f&&M.x<=v&&M.y>=h&&M.y<=d&&M!==s&&M!==o&&as(a,c,l,p,u,m,M.x,M.y)&&xt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=g;){if(y.x>=f&&y.x<=v&&y.y>=h&&y.y<=d&&y!==s&&y!==o&&as(a,c,l,p,u,m,y.x,y.y)&&xt(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=x;){if(M.x>=f&&M.x<=v&&M.y>=h&&M.y<=d&&M!==s&&M!==o&&as(a,c,l,p,u,m,M.x,M.y)&&xt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function o_(n,e,t){let i=n;do{const s=i.prev,r=i.next.next;!Po(s,r)&&Qh(s,i,i.next,r)&&sr(s,r)&&sr(r,s)&&(e.push(s.i/t|0),e.push(i.i/t|0),e.push(r.i/t|0),rr(i),rr(i.next),i=n=r),i=i.next}while(i!==n);return Ii(i)}function a_(n,e,t,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&g_(o,a)){let l=ef(o,a);o=Ii(o,o.next),l=Ii(l,l.next),ir(o,e,t,i,s,r,0),ir(l,e,t,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function c_(n,e,t,i){const s=[];let r,o,a,l,u;for(r=0,o=e.length;r<o;r++)a=e[r]*i,l=r<o-1?e[r+1]*i:n.length,u=Zh(n,a,l,i,!1),u===u.next&&(u.steiner=!0),s.push(m_(u));for(s.sort(l_),r=0;r<s.length;r++)t=u_(s[r],t);return t}function l_(n,e){return n.x-e.x}function u_(n,e){const t=h_(n,e);if(!t)return e;const i=ef(t,n);return Ii(i,i.next),Ii(t,t.next)}function h_(n,e){let t=e,i=-1/0,s;const r=n.x,o=n.y;do{if(o<=t.y&&o>=t.next.y&&t.next.y!==t.y){const m=t.x+(o-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(m<=r&&m>i&&(i=m,s=t.x<t.next.x?t:t.next,m===r))return s}t=t.next}while(t!==e);if(!s)return null;const a=s,l=s.x,u=s.y;let c=1/0,p;t=s;do r>=t.x&&t.x>=l&&r!==t.x&&as(o<u?r:i,o,l,u,o<u?i:r,o,t.x,t.y)&&(p=Math.abs(o-t.y)/(r-t.x),sr(t,n)&&(p<c||p===c&&(t.x>s.x||t.x===s.x&&f_(s,t)))&&(s=t,c=p)),t=t.next;while(t!==a);return s}function f_(n,e){return xt(n.prev,n,e.prev)<0&&xt(e.next,n,n.next)<0}function d_(n,e,t,i){let s=n;do s.z===0&&(s.z=Tc(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,p_(s)}function p_(n){let e,t,i,s,r,o,a,l,u=1;do{for(t=n,n=null,r=null,o=0;t;){for(o++,i=t,a=0,e=0;e<u&&(a++,i=i.nextZ,!!i);e++);for(l=u;a>0||l>0&&i;)a!==0&&(l===0||!i||t.z<=i.z)?(s=t,t=t.nextZ,a--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;t=i}r.nextZ=null,u*=2}while(o>1);return n}function Tc(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function m_(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function as(n,e,t,i,s,r,o,a){return(s-o)*(e-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(i-a)}function g_(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!v_(n,e)&&(sr(n,e)&&sr(e,n)&&__(n,e)&&(xt(n.prev,n,e.prev)||xt(n,e.prev,e))||Po(n,e)&&xt(n.prev,n,n.next)>0&&xt(e.prev,e,e.next)>0)}function xt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Po(n,e){return n.x===e.x&&n.y===e.y}function Qh(n,e,t,i){const s=Hr(xt(n,e,t)),r=Hr(xt(n,e,i)),o=Hr(xt(t,i,n)),a=Hr(xt(t,i,e));return!!(s!==r&&o!==a||s===0&&Br(n,t,e)||r===0&&Br(n,i,e)||o===0&&Br(t,n,i)||a===0&&Br(t,e,i))}function Br(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function Hr(n){return n>0?1:n<0?-1:0}function v_(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Qh(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function sr(n,e){return xt(n.prev,n,n.next)<0?xt(n,e,n.next)>=0&&xt(n,n.prev,e)>=0:xt(n,e,n.prev)<0||xt(n,n.next,e)<0}function __(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function ef(n,e){const t=new Rc(n.i,n.x,n.y),i=new Rc(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Tu(n,e,t,i){const s=new Rc(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function rr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Rc(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function x_(n,e,t,i){let s=0;for(let r=e,o=t-i;r<t;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class Js{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return Js.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];Ru(e),Cu(i,e);let o=e.length;t.forEach(Ru);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Cu(i,t[l]);const a=i_.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Ru(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Cu(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class En extends dr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new En(e.radius,e.detail)}}class Lo extends dr{constructor(e=1,t=0){const i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Lo(e.radius,e.detail)}}class pr extends Ct{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],u=[],c=[];let p=e;const m=(t-e)/s,f=new F,h=new ye;for(let v=0;v<=s;v++){for(let d=0;d<=i;d++){const g=r+d/i*o;f.x=p*Math.cos(g),f.y=p*Math.sin(g),l.push(f.x,f.y,f.z),u.push(0,0,1),h.x=(f.x/t+1)/2,h.y=(f.y/t+1)/2,c.push(h.x,h.y)}p+=m}for(let v=0;v<s;v++){const d=v*(i+1);for(let g=0;g<i;g++){const x=g+d,y=x,M=x+i+1,w=x+i+2,b=x+1;a.push(y,M,b),a.push(M,w,b)}}this.setIndex(a),this.setAttribute("position",new Qe(l,3)),this.setAttribute("normal",new Qe(u,3)),this.setAttribute("uv",new Qe(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Io extends Ct{constructor(e=new il([new ye(0,.5),new ye(-.5,-.5),new ye(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const i=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(e)===!1)u(e);else for(let c=0;c<e.length;c++)u(e[c]),this.addGroup(a,l,c),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Qe(s,3)),this.setAttribute("normal",new Qe(r,3)),this.setAttribute("uv",new Qe(o,2));function u(c){const p=s.length/3,m=c.extractPoints(t);let f=m.shape;const h=m.holes;Js.isClockWise(f)===!1&&(f=f.reverse());for(let d=0,g=h.length;d<g;d++){const x=h[d];Js.isClockWise(x)===!0&&(h[d]=x.reverse())}const v=Js.triangulateShape(f,h);for(let d=0,g=h.length;d<g;d++){const x=h[d];f=f.concat(x)}for(let d=0,g=f.length;d<g;d++){const x=f[d];s.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let d=0,g=v.length;d<g;d++){const x=v[d],y=x[0]+p,M=x[1]+p,w=x[2]+p;i.push(y,M,w),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return y_(t,e)}static fromJSON(e,t){const i=[];for(let s=0,r=e.shapes.length;s<r;s++){const o=t[e.shapes[s]];i.push(o)}return new Io(i,e.curveSegments)}}function y_(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,i=n.length;t<i;t++){const s=n[t];e.shapes.push(s.uuid)}else e.shapes.push(n.uuid);return e}class Ts extends Ct{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let u=0;const c=[],p=new F,m=new F,f=[],h=[],v=[],d=[];for(let g=0;g<=i;g++){const x=[],y=g/i;let M=0;g===0&&o===0?M=.5/t:g===i&&l===Math.PI&&(M=-.5/t);for(let w=0;w<=t;w++){const b=w/t;p.x=-e*Math.cos(s+b*r)*Math.sin(o+y*a),p.y=e*Math.cos(o+y*a),p.z=e*Math.sin(s+b*r)*Math.sin(o+y*a),h.push(p.x,p.y,p.z),m.copy(p).normalize(),v.push(m.x,m.y,m.z),d.push(b+M,1-y),x.push(u++)}c.push(x)}for(let g=0;g<i;g++)for(let x=0;x<t;x++){const y=c[g][x+1],M=c[g][x],w=c[g+1][x],b=c[g+1][x+1];(g!==0||o>0)&&f.push(y,M,b),(g!==i-1||l<Math.PI)&&f.push(M,w,b)}this.setIndex(f),this.setAttribute("position",new Qe(h,3)),this.setAttribute("normal",new Qe(v,3)),this.setAttribute("uv",new Qe(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ts(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ui extends Ct{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],l=[],u=[],c=new F,p=new F,m=new F;for(let f=0;f<=i;f++)for(let h=0;h<=s;h++){const v=h/s*r,d=f/i*Math.PI*2;p.x=(e+t*Math.cos(d))*Math.cos(v),p.y=(e+t*Math.cos(d))*Math.sin(v),p.z=t*Math.sin(d),a.push(p.x,p.y,p.z),c.x=e*Math.cos(v),c.y=e*Math.sin(v),m.subVectors(p,c).normalize(),l.push(m.x,m.y,m.z),u.push(h/s),u.push(f/i)}for(let f=1;f<=i;f++)for(let h=1;h<=s;h++){const v=(s+1)*f+h-1,d=(s+1)*(f-1)+h-1,g=(s+1)*(f-1)+h,x=(s+1)*f+h;o.push(v,d,x),o.push(d,g,x)}this.setIndex(o),this.setAttribute("position",new Qe(a,3)),this.setAttribute("normal",new Qe(l,3)),this.setAttribute("uv",new Qe(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class M_ extends Es{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new He(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jc,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}class or extends Es{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new He(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new He(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jc,this.normalScale=new ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new on,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class tf extends At{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new He(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class S_ extends tf{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.groundColor=new He(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const xa=new ct,Pu=new F,Lu=new F;class b_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ye(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Jc,this._frameExtents=new ye(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;Pu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pu),Lu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Lu),t.updateMatrixWorld(),xa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class w_ extends b_{constructor(){super(new Hh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class E_ extends tf{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(At.DEFAULT_UP),this.updateMatrix(),this.target=new At,this.shadow=new w_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bc);const Lt=.5,Vr=n=>n*n*(3-2*n),Qi=["canyon","mesa","beach"];function A_(n){const e=n.segs,t=e.reduce((v,d)=>v+d.len,0),i=Math.ceil(t/Lt)+1,s={n:i,length:(i-1)*Lt,def:n,x:new Float32Array(i),y:new Float32Array(i),z:new Float32Array(i),a:new Float32Array(i),w:new Float32Array(i),flow:new Float32Array(i),k:new Float32Array(i),h:new Float32Array(i),lf:new Uint8Array(i),lt:new Uint8Array(i),lk:new Float32Array(i),rf:new Uint8Array(i),rt:new Uint8Array(i),rk:new Float32Array(i)};let r=n.start?.x||0,o=n.start?.z||0,a=n.start?.y||0,l=n.start?.a||0,u=e[0].w,c=e[0].flow??3,p=e[0].h??7,m=Qi.indexOf(e[0].L||"canyon"),f=Qi.indexOf(e[0].R||"canyon"),h=0;for(const v of e){const d=Qi.indexOf(v.L||Qi[m]),g=Qi.indexOf(v.R||Qi[f]),x=v.w??u,y=v.flow??c,M=v.h??p,w=v.dy||0,b=(v.turn||0)*Math.PI/180,_=Math.round(v.len/Lt),T=a,U=l;for(let S=0;S<_&&h<i;S++){const A=S/_,k=Vr(A),H=Math.min(1,S*Lt/Math.min(12,v.len));s.x[h]=r,s.y[h]=a,s.z[h]=o,s.a[h]=l,s.w[h]=u+(x-u)*k,s.flow[h]=c+(y-c)*k,s.h[h]=p+(M-p)*k,s.k[h]=b/v.len,s.lf[h]=m,s.lt[h]=d,s.lk[h]=Vr(H),s.rf[h]=f,s.rt[h]=g,s.rk[h]=Vr(H);const G=l+s.k[h]*Lt/2;r+=Math.sin(G)*Lt,o-=Math.cos(G)*Lt,l=U+b*(S+1)/_,a=T+w*Vr((S+1)/_),h++}u=x,c=y,p=M,m=d,f=g}for(;h<i;h++)s.x[h]=r,s.y[h]=a,s.z[h]=o,s.a[h]=l,s.w[h]=u,s.flow[h]=c,s.h[h]=p,s.lf[h]=s.lt[h]=m,s.rf[h]=s.rt[h]=f,s.lk[h]=s.rk[h]=1;return s.at=(v,d={})=>T_(s,v,d),s.project=(v,d,g)=>R_(s,v,d,g),s.world=(v,d,g={})=>(s.at(v,g),g.wx=g.x+g.nx*d,g.wz=g.z+g.nz*d,g),s}function T_(n,e,t={}){const i=Math.max(0,Math.min(n.n-1.0001,e/Lt)),s=Math.floor(i),r=i-s,o=l=>l[s]+(l[s+1]-l[s])*r;t.s=e,t.x=o(n.x),t.y=o(n.y),t.z=o(n.z),t.w=o(n.w),t.flow=o(n.flow),t.h=o(n.h),t.k=n.k[s];const a=n.a[s]+(n.a[s+1]-n.a[s])*r;return t.a=a,t.tx=Math.sin(a),t.tz=-Math.cos(a),t.nx=t.tz,t.nz=-t.tx,t.slope=(n.y[s+1]-n.y[s])/Lt,t}function R_(n,e,t,i){let s=0,r=n.n-2,o=-1,a=1/0;if(i!=null&&i>=0){const _=Math.round(i/Lt);s=Math.max(0,_-60),r=Math.min(n.n-2,_+60)}const l=i!=null?1:4;for(let _=s;_<=r;_+=l){const T=e-n.x[_],U=t-n.z[_],S=T*T+U*U;S<a&&(a=S,o=_)}if(l>1){const _=o;for(let T=Math.max(0,_-4);T<=Math.min(n.n-2,_+4);T++){const U=e-n.x[T],S=t-n.z[T],A=U*U+S*S;A<a&&(a=A,o=T)}}let u=o;const c=n.x[u],p=n.z[u];let m=n.x[u+1],f=n.z[u+1],h=m-c,v=f-p,d=((e-c)*h+(t-p)*v)/(h*h+v*v);if(d<0&&u>0){u--;const _=n.x[u],T=n.z[u];h=c-_,v=p-T,d=((e-_)*h+(t-T)*v)/(h*h+v*v)}d=Math.max(u===0?-20:0,Math.min(1,d));const g=(u+d)*Lt,x=n.a[u],y=-Math.cos(x),M=-Math.sin(x),w=n.x[u]+(n.x[u+1]-n.x[u])*Math.max(0,d),b=n.z[u]+(n.z[u+1]-n.z[u])*Math.max(0,d);return{s:g,d:(e-w)*y+(t-b)*M}}function C_(n,e=!1){const t=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Ct;let u=0;for(let c=0;c<n.length;++c){const p=n[c];let m=0;if(t!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in p.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(p.attributes[f]),m++}if(m!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in p.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(p.morphAttributes[f])}if(e){let f;if(t)f=p.index.count;else if(p.attributes.position!==void 0)f=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+c+". The geometry must have either an index or a position attribute"),null;l.addGroup(u,f,c),u+=f}}if(t){let c=0;const p=[];for(let m=0;m<n.length;++m){const f=n[m].index;for(let h=0;h<f.count;++h)p.push(f.getX(h)+c);c+=n[m].attributes.position.count}l.setIndex(p)}for(const c in r){const p=Iu(r[c]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" attribute."),null;l.setAttribute(c,p)}for(const c in o){const p=o[c][0].length;if(p===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[c]=[];for(let m=0;m<p;++m){const f=[];for(let v=0;v<o[c].length;++v)f.push(o[c][v][m]);const h=Iu(f);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+c+" morphAttribute."),null;l.morphAttributes[c].push(h)}}return l}function Iu(n){let e,t,i,s=-1,r=0;for(let u=0;u<n.length;++u){const c=n[u];if(e===void 0&&(e=c.array.constructor),e!==c.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=c.itemSize),t!==c.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=c.normalized),i!==c.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=c.gpuType),s!==c.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=c.count*t}const o=new e(r),a=new rn(o,t,i);let l=0;for(let u=0;u<n.length;++u){const c=n[u];if(c.isInterleavedBufferAttribute){const p=l/t;for(let m=0,f=c.count;m<f;m++)for(let h=0;h<t;h++){const v=c.getComponent(m,h);a.setComponent(m+p,h,v)}}else o.set(c.array,l);l+=c.count*t}return s!==void 0&&(a.gpuType=s),a}let si;function P_(){if(si)return si;const n=new Uint8Array([120,120,120,255,196,196,196,255,255,255,255,255]);return si=new $h(n,3,1,pn),si.minFilter=si.magFilter=Vt,si.generateMipmaps=!1,si.needsUpdate=!0,si}const ds=new Map;function Cc(n,e={}){const t="toon"+n+JSON.stringify(e);return ds.has(t)||ds.set(t,new M_({color:n,gradientMap:P_(),...e})),ds.get(t)}const Dn=()=>Cc("#ffffff",{vertexColors:!0});function nf(n,e={}){const t="flat"+n+JSON.stringify(e);return ds.has(t)||ds.set(t,new or({color:n,flatShading:!0,...e})),ds.get(t)}const Zs=()=>nf("#ffffff",{vertexColors:!0}),ya=new Map;function L_(n=.028,e="#2b2230"){const t=n+e;if(ya.has(t))return ya.get(t);const i=new tn({color:e,side:kt});return i.onBeforeCompile=s=>{s.vertexShader=s.vertexShader.replace("#include <begin_vertex>",`vec3 transformed = position + normal * ${n.toFixed(4)};`)},i.customProgramCacheKey=()=>"ink"+t,ya.set(t,i),i}function _t(n,e,t){const i=new pt(n.geometry,L_(e,t));return i.name="ink",i.castShadow=!1,i.receiveShadow=!1,n.add(i),i}const ci=new He;function De(n,e){ci.set(e);const t=n.attributes.position.count,i=new Float32Array(t*3);for(let s=0;s<t;s++)i[s*3]=ci.r,i[s*3+1]=ci.g,i[s*3+2]=ci.b;return n.setAttribute("color",new rn(i,3)),n}const Uu=new ct,Du=new di,Nu=new on,I_=new F,Fu=new F;function Oe(n,e,t,i=1){return e=e||[0,0,0],t=t||[0,0,0],Nu.set(t[0],t[1],t[2]),Du.setFromEuler(Nu),Fu.set(...Array.isArray(i)?i:[i,i,i]),Uu.compose(I_.set(e[0],e[1],e[2]),Du,Fu),n.applyMatrix4(Uu),n}function je(n){const e=n.map(r=>{const o=(r.index,r);for(const a of Object.keys(o.attributes))["position","normal","color"].includes(a)||o.deleteAttribute(a);return o.attributes.color||De(o,"#ffffff"),o}),i=e.every(r=>r.index)?e:e.map(r=>r.index?r.toNonIndexed():r),s=C_(i,!1);return i.forEach(r=>r.dispose()),s}const Ie=(n,e,t,i,s,r=16)=>Oe(De(new Ts(n,r,Math.max(8,r*.75|0)),e),t,i,s),Ne=(n,e,t,i,s,r,o,a=14)=>Oe(De(new It(n,e,t,a),i),s,r,o),nn=(n,e,t,i,s,r,o=12)=>Oe(De(new Bt(n,e,o),t),i,s,r),ht=(n,e,t,i,s,r,o)=>Oe(De(new mn(n,e,t),i),s,r,o),Fs=(n,e,t,i,s,r,o=10)=>Oe(De(new nl(n,e,4,o),t),i,s,r),Qs=(n,e,t,i,s,r,o=Math.PI*2)=>Oe(De(new ui(n,e,8,20,o),t),i,s,r);function tt(n,e,{cast:t=!0,receive:i=!1}={}){const s=new pt(n,e);return s.castShadow=t,s.receiveShadow=i,s}function st(n,e){return ci.set(n),e>0?ci.lerp(new He("#ffffff"),e):ci.multiplyScalar(1+e),"#"+ci.getHexString()}function U_(n,{w:e=1024,h:t=256,font:i="Luckiest Guy",size:s=150,fill:r="#ffd23f",stroke:o="#1e4f8a",bg:a=null,sw:l=26}={}){const u=document.createElement("canvas");u.width=e,u.height=t;const c=u.getContext("2d");a&&(c.fillStyle=a,c.fillRect(0,0,e,t)),c.font=`${s}px "${i}", "Arial Black", sans-serif`,c.textAlign="center",c.textBaseline="middle",c.lineJoin="round",c.lineWidth=l,c.strokeStyle=o;const p=t/2+s*.08;c.strokeText(n,e/2,p),c.fillStyle=r,c.fillText(n,e/2,p);const m=new Gv(u);return m.colorSpace=fn,m.anisotropy=4,m}let co=1;const Ye=()=>(co=co*16807%2147483647,(co-1)/2147483646),Mt=n=>{const e=Math.sin(n*127.1+311.7)*43758.5453;return e-Math.floor(e)},Ma=n=>{const e=Math.floor(n),t=n-e,i=t*t*(3-2*t);return Mt(e)*(1-i)+Mt(e+1)*i};function ku(n,e){const t=[[0,-1.4],[0,.5],[.85,.62],[.9,.8],[3,.86]];return n===1?[...t,[3.3,-1.2],[3.8,-9],[4.7,-28],[5.6,-60],[6.2,-95]]:n===2?[...t,[5,1.15],[8.5,1.8],[13,2.4],[40,e],[42,e-45]]:[...t,[3.4,e*.38],[3.9,e*.72],[4.4,e],[40,e+1],[42,e-45]]}const Gr=new He;function Ou(n,e,t,i,s,r){n.push(t[0],t[1],t[2],i[0],i[1],i[2],s[0],s[1],s[2]),Gr.set(r);for(let o=0;o<3;o++)e.push(Gr.r,Gr.g,Gr.b)}function D_(n,e){const t=new Ct;return t.setAttribute("position",new Qe(n,3)),t.setAttribute("color",new Qe(e,3)),t.computeVertexNormals(),t}function N_(n,e){const t=[];for(let s=0;s<n.n;s+=2){const r=n.a[s],o=-Math.cos(r)*e,a=-Math.sin(r)*e;let l=0,u=0;for(let d=Math.max(0,s-24);d<=Math.min(n.n-1,s+24);d+=4)l+=n.k[d],u++;const c=l/u,m=(e>0&&c<0||e<0&&c>0)&&Math.abs(c)>1e-4?Math.max(4.5,.8/Math.abs(c)-n.w[s]):1e9,f=e>0?n.lf[s]:n.rf[s],h=e>0?n.lt[s]:n.rt[s],v=e>0?n.lk[s]:n.rk[s];t.push({cx:n.x[s],cz:n.z[s],y:n.y[s],ox:o,oz:a,w:n.w[s],f,t:h,k:v,H:n.h[s],s:s*Lt,maxOff:m})}return t}function zu(n,e){const t=e?n.n-1:0,i=n.a[t],s=Math.sin(i)*(e?1:-1),r=-Math.cos(i)*(e?1:-1),o=-Math.cos(i),a=-Math.sin(i),l=[],u=e?n.lt[t]:n.lf[t];for(let c=0;c<=24;c++){const p=c/24*Math.PI,m=Math.cos(p),f=Math.sin(p),h=o*m+s*f,v=a*m+r*f;l.push({cx:n.x[t],cz:n.z[t],y:n.y[t],ox:h,oz:v,w:n.w[t],f:u,t:u,k:1,H:n.h[t],s:e?n.length+c:-c,maxOff:1e9,cap:!0})}return l}function Sa(n,e,t,i){let s=null;for(const r of n){const o=ku(r.f,r.H),a=ku(r.t,r.H),l=r.k<.5?r.f:r.t,u=o.map((c,p)=>{let m=c[0]+(a[p][0]-c[0])*r.k,f=c[1]+(a[p][1]-c[1])*r.k;return p>=5&&p<=7&&(m+=(Ma(r.s*.23+p*7)-.5)*.9,f+=(Ma(r.s*.17+p*3.1)-.5)*(l===1?3:1.2)),p>=8&&(f+=(Ma(r.s*.05+p)-.5)*2.2),m=Math.min(m,r.maxOff+(p>=8?p-8:0)*.4),[r.cx+r.ox*(r.w+m),r.y+f,r.cz+r.oz*(r.w+m)]});if(s)for(let c=0;c<u.length-1;c++){const p=s.pts[c],m=s.pts[c+1],f=u[c+1],h=u[c],v=F_(l,c,r.s,e);Ou(t,i,p,m,f,v),Ou(t,i,p,f,h,v)}s={pts:u}}}function F_(n,e,t,i){if(e<=1)return i.wall;if(e<=3)return e===3?i.ledge:st(i.ledge,-.04);const s=Mt(Math.floor(t/2.5)*13+e);return n===1?e===4?i.wall:st(e%2?i.wall:i.ledge,-.05-s*.08-(e-4)*.05):n===2?e===4?i.sand:e<=6?st(i.sand,(s-.5)*.06):e===7?st(i.top,(s-.5)*.05):i.cliff[3]:e===7?st(i.top,(s-.5)*.05):e===8?i.cliff[3]:st(i.cliff[(e+Math.floor(t/7))%3],(s-.5)*.07)}const k_=`
attribute float aTau; attribute float aRapid;
varying vec2 vUv; varying float vTau; varying float vRapid; varying float vFog;
void main(){ vUv = uv; vTau = aTau; vRapid = aRapid;
  vec4 mv = modelViewMatrix * vec4(position,1.); vFog = -mv.z; gl_Position = projectionMatrix * mv; }`,O_=`
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
}`;function z_(n,e){const i=[],s=[],r=[],o=[],a=[];let l=0;const u=[];for(let h=0;h<n.n;h+=2)h>0&&(l+=Lt*2/Math.max(.4,n.flow[h])),u.push({i:h,tau:l});for(const h of u){const v=h.i,d=n.a[v],g=-Math.cos(d),x=-Math.sin(d),y=n.w[v]+.05,M=v<n.n-2?(n.y[v+2]-n.y[v])/(2*Lt):0;for(let w=0;w<=8;w++){const b=w/8*2-1;i.push(n.x[v]+g*b*y,n.y[v],n.z[v]+x*b*y),s.push(b,v*Lt),r.push(h.tau*.35),o.push(Math.min(1,Math.max(0,(n.flow[v]-2.5)/3)+Math.max(0,-M)*3))}}const c=9;for(let h=0;h<u.length-1;h++)for(let v=0;v<8;v++){const d=h*c+v,g=d+1,x=d+c,y=x+1;a.push(d,x,g,g,x,y)}for(const h of[0,1]){const v=h?n.n-1:0,d=n.a[v],g=Math.sin(d)*(h?1:-1),x=-Math.cos(d)*(h?1:-1),y=-Math.cos(d),M=-Math.sin(d),w=n.w[v]+.05,b=i.length/3,_=h?u[u.length-1].tau*.35:0;i.push(n.x[v],n.y[v],n.z[v]),s.push(0,v*Lt),r.push(_),o.push(0);for(let T=0;T<=24;T++){const U=T/24*Math.PI,S=y*Math.cos(U)+g*Math.sin(U),A=M*Math.cos(U)+x*Math.sin(U);i.push(n.x[v]+S*w,n.y[v],n.z[v]+A*w),s.push(1,v*Lt),r.push(_),o.push(0),T&&a.push(b,b+T,b+T+1)}}const p=new Ct;p.setAttribute("position",new Qe(i,3)),p.setAttribute("uv",new Qe(s,2)),p.setAttribute("aTau",new Qe(r,1)),p.setAttribute("aRapid",new Qe(o,1)),p.setIndex(a),p.computeBoundingSphere();const m=new An({vertexShader:k_,fragmentShader:O_,side:en,uniforms:{uTime:{value:0},uDeep:{value:new He(e.water)},uEdge:{value:new He(e.waterEdge)},uFoam:{value:new He(e.foam)},uFogColor:{value:new He(e.fog)},uFogNear:{value:e.fogNear},uFogFar:{value:e.fogFar}}}),f=new pt(p,m);return f.receiveShadow=!1,f.renderOrder=-1,f}function Bu(n,e,t,i=10){const s=[],r=[],o=new F(0,1,0),a=new F,l=new F,u=new F;n.forEach((p,m)=>{const f=n[Math.min(n.length-1,m+1)],h=n[Math.max(0,m-1)];a.set(f[0]-h[0],f[1]-h[1],f[2]-h[2]).normalize(),l.crossVectors(a,o).normalize(),u.crossVectors(l,a).normalize();for(let v=0;v<i;v++){const d=v/i*Math.PI*2,g=Math.cos(d)*e,x=Math.sin(d)*e;s.push(p[0]+l.x*g+u.x*x,p[1]+l.y*g+u.y*x,p[2]+l.z*g+u.z*x)}});for(let p=0;p<n.length-1;p++)for(let m=0;m<i;m++){const f=p*i+m,h=p*i+(m+1)%i,v=f+i,d=h+i;r.push(f,h,v,h,d,v)}const c=new Ct;return c.setAttribute("position",new Qe(s,3)),c.setIndex(r),c.computeVertexNormals(),De(c,t)}function Pc(n,e){const t=n.leaf,i=n.trunk,s=[];if(e===0)s.push(Ne(.22,.34,3.2,i,[0,1.6,0],[0,0,.06],1,7)),[[0,3.8,0,1.6],[1.1,3.3,.3,1.15],[-1,3.4,-.2,1.2],[.2,4.6,-.3,1.15],[-.3,3.2,1,1]].forEach(([r,o,a,l],u)=>s.push(Oe(De(new En(l,0),t[u%3]),[r,o,a],[u,u*2,0])));else if(e===1)s.push(Ne(.2,.3,4.2,i,[0,2.1,0],0,1,7)),s.push(Oe(De(new It(2.2,2.6,.9,9),t[0]),[0,4.3,0]),Oe(De(new It(1.6,2.1,.8,9),t[1]),[.2,5,.1]),Oe(De(new It(.9,1.4,.7,9),t[2]),[-.1,5.6,0]));else if(e===2){for(let r=0;r<6;r++)s.push(Ne(.17-r*.012,.19-r*.012,.9,r%2?i:st(i,.12),[r*r*.025,.45+r*.85,0],[0,0,-r*.05],1,7));for(let r=0;r<7;r++){const o=r/7*Math.PI*2;s.push(Oe(De(new Bt(.42,2.6,4),t[r%2]),[.62+Math.cos(o)*1.2,4.95,Math.sin(o)*1.2],[0,-o,-Math.PI/2-.38],[.25,1,1]))}s.push(Ie(.3,"#6b4a2a",[.62,5.1,0],0,1,6))}else if(e===3)for(let r=0;r<5;r++){const o=(Mt(r*3.1)-.5)*1.4,a=(Mt(r*7.7)-.5)*1.4,l=3.5+Mt(r)*3;s.push(Ne(.09,.1,l,n.rail,[o,l/2,a],[0,0,(Mt(r*2)-.5)*.12],1,6));for(let u=1;u<l;u+=1.1)s.push(Ne(.11,.11,.08,n.railRing,[o+u/l*(Mt(r*2)-.5)*-.2,u,a],0,1,6));s.push(Oe(De(new Bt(.25,.9,3),t[r%3]),[o+.3,l-.3,a],[0,0,-1],[1,1,.3]))}else if(e===4)for(let r=0;r<6;r++){const o=(Mt(r*5.3)-.5)*1.2,a=(Mt(r*9.1)-.5)*1.2,l=1.4+Mt(r*1.3)*1.2;s.push(Ne(.03,.04,l,t[1],[o,l/2-.2,a],0,1,5)),r%2===0?s.push(Ne(.08,.08,.4,"#8b5a34",[o,l-.1,a],0,1,6)):s.push(Oe(De(new Bt(.12,1.2,3),t[0]),[o+.15,.4,a],[0,0,-.5],[1,1,.3]))}else if(e===5)for(let r=0;r<5;r++)s.push(Oe(De(new Bt(.12,.7,3),t[r%3]),[(Mt(r)-.5)*.6,.3,(Mt(r*4)-.5)*.6],[(Mt(r*2)-.5)*.7,0,(Mt(r*3)-.5)*.7]));else if(e===6){s.push(Oe(De(new En(.6,0),t[0]),[0,.4,0],0,[1,.7,1]));for(let r=0;r<6;r++){const o=r/6*Math.PI*2;s.push(Ie(.14,r%2?"#ff7fb6":"#ffb3d4",[Math.cos(o)*.45,.62,Math.sin(o)*.45],0,1,6))}}else if(e===7)s.push(Ne(.18,.26,1.6,i,[0,.8,0],0,1,6)),[[2.2,2.6,1.9],[1.75,2.2,3.1],[1.25,1.9,4.2],[.75,1.5,5.2]].forEach(([r,o,a],l)=>{s.push(Oe(De(new Bt(r,o,7),t[l%3]),[0,a,0],[0,l*.4,0])),s.push(Oe(De(new Bt(r*.82,o*.4,7),"#ffffff"),[0,a+o*.34,0],[0,l*.4,0]))});else if(e===8){s.push(Oe(De(new It(.28,.5,3.4,7),i),[0,1.6,0],[.12,0,.1])),s.push(Oe(De(new It(.14,.22,2.2,6),i),[.7,3.4,0],[0,0,-.8]),Oe(De(new It(.12,.2,2,6),i),[-.6,3.5,.3],[.3,0,.9])),[[0,4.3,0,1.5],[1.4,4,.2,1.1],[-1.3,4.1,.3,1.1]].forEach(([r,o,a,l],u)=>s.push(Oe(De(new En(l,0),t[u%3]),[r,o,a],0,[1,.6,1])));for(let r=0;r<5;r++)s.push(Oe(De(new Bt(.16,1.4,4),st(t[1],.15)),[(Mt(r)-.5)*2.6,3.2,(Mt(r*3)-.5)*1.6],[Math.PI,0,0]))}else if(e===9){const r=n.mush||"#c0479a";s.push(Ne(.28,.4,2.2,"#f3e6d2",[0,1.1,0],0,1,8)),s.push(Oe(De(new Ts(1.5,12,8,0,Math.PI*2,0,Math.PI/2),r),[0,2.1,0],0,[1,.7,1]));for(let o=0;o<6;o++){const a=o/6*Math.PI*2;s.push(Ie(.2,"#fff3e0",[Math.cos(a)*.9,2.75,Math.sin(a)*.9],0,[1,.4,1],6))}}else if(e===10)for(let r=0;r<5;r++){const o=(Mt(r*2.3)-.5)*1.6,a=(Mt(r*5.9)-.5)*1.6,l=1+Mt(r)*2.2;s.push(Oe(De(new Lo(.45,0),r%2?"#bdeeff":"#e6f9ff"),[o,l*.6,a],[(Mt(r)-.5)*.5,r,(Mt(r*7)-.5)*.5],[.7,l,.7]))}return je(s)}function Hu(n,e){const t=[];return e===0?t.push(Oe(De(new fs(1,0),n.rock),[0,0,0],[.3,.5,.1],[1,.8,1.1])):e===1?(t.push(Oe(De(new mn(1.6,3.4,1.4),n.rock),[0,1.2,0],[.08,.3,.1])),t.push(Oe(De(new mn(1.3,2.6,1.2),st(n.rock,.08)),[1.1,.9,.3],[-.1,.6,-.12])),t.push(Oe(De(new mn(1.1,1.8,1),st(n.rock,-.06)),[-.9,.5,.4],[.15,-.3,.1]))):t.push(Oe(De(new En(1,0),st(n.rock,.05)),[0,0,0],[0,.7,0],[1.3,.6,1])),je(t)}function Wr(n,e,t,{cast:i=!0}={}){const s=new To(n,e,Math.max(1,t.length)),r=new At;return t.forEach((o,a)=>{r.position.set(o[0],o[1],o[2]),r.rotation.set(0,o[3]||0,0),r.scale.setScalar(o[4]||1),r.updateMatrix(),s.setMatrixAt(a,r.matrix)}),s.count=t.length,s.castShadow=i,s.receiveShadow=!1,s.computeBoundingSphere(),s}function sf(n,e,{color:t="#2f8fd8",pole:i="#86c540",ring:s="#5f9c2a"}={}){const r=new dt,o=je([Ne(.26,.3,6.6,i,[0,3.3,0],0,1,8),...[1,2.2,3.4,4.6,5.8].map(p=>Ne(.32,.32,.12,s,[0,p,0],0,1,8)),Ne(.36,.36,.3,"#f7a43a",[0,6.6,0],0,1,8)]);for(const p of[-1,1]){const m=tt(o,Dn());m.position.x=p*e/2,_t(m,.04),r.add(m)}const a=tt(je([Ne(.24,.24,e+.6,i,[0,0,0],[0,0,Math.PI/2],1,8),...[-.3,0,.3].map(p=>Ne(.29,.29,.1,s,[p*e,0,0],[0,0,Math.PI/2],1,8))]),Dn());a.position.y=6.1,_t(a,.04),r.add(a);const l=Math.min(e*.78,n.length*.62+1.6),u=tt(je([ht(l+.4,1.9,.26,"#b5703a",[0,0,0]),ht(l,1.5,.3,t,[0,0,0])]),Dn());u.position.y=6.1,u.rotation.x=-.08,_t(u,.04),r.add(u);const c=U_(n,{w:1024,h:256,size:Math.min(170,1700/n.length),fill:"#ffd23f",stroke:"#173b6b",sw:30});for(const p of[1,-1]){const m=new pt(new Li(l*.98,l*.98/4),new tn({map:c,transparent:!0}));m.position.set(0,6.12,p*.2),m.rotation.set(-.08,p<0?Math.PI:0,0,"YXZ"),r.add(m)}return r}function B_(n,e){const t=e.theme;co=7+e.id.length*31;const i=new dt;i.name="world";const s=[],r=[];for(const O of[1,-1]){const I=N_(n,O);I.side=O,Sa(I,t,s,r)}const o=zu(n,!1),a=zu(n,!0);o.side=1,Sa(o,t,s,r),a.side=1,Sa(a,t,s,r);const l=new pt(D_(s,r),nf("#ffffff",{vertexColors:!0,side:en}));l.receiveShadow=!0,l.name="terrain",i.add(l);const u=z_(n,t);i.add(u);const c=[],p=[];for(const O of[1,-1]){const I=[];for(let W=0;W<n.n;W+=2){const D=n.a[W],re=-Math.cos(D)*O,ce=-Math.sin(D)*O,he=n.w[W]+.42;I.push([n.x[W]+re*he,n.y[W]+.78,n.z[W]+ce*he]),W%5===0&&c.push([I[I.length-1],n.a[W]])}p.push(Bu(I,.4,t.rail,10))}for(const O of[0,1]){const I=O?n.n-1:0,W=n.a[I],D=Math.sin(W)*(O?1:-1),re=-Math.cos(W)*(O?1:-1),ce=-Math.cos(W),he=-Math.sin(W),Q=n.w[I]+.42,me=[];for(let K=0;K<=24;K++){const j=K/24*Math.PI;me.push([n.x[I]+(ce*Math.cos(j)+D*Math.sin(j))*Q,n.y[I]+.78,n.z[I]+(he*Math.cos(j)+re*Math.sin(j))*Q])}p.push(Bu(me,.4,t.rail,10))}const m=new pt(je(p),Dn());m.castShadow=!0,m.receiveShadow=!0,i.add(m);const f=Oe(De(new ui(.42,.07,6,12),t.railRing),0,[0,0,0]),h=new To(je([f]),Dn(),c.length),v=new At;c.forEach(([O,I],W)=>{v.position.set(O[0],O[1],O[2]),v.rotation.set(0,-I,0),v.updateMatrix(),h.setMatrixAt(W,v.matrix)}),i.add(h);const d=(O,I,W)=>{for(let D=0;D<n.n;D+=6){const re=O-n.x[D],ce=I-n.z[D];if(re*re+ce*ce<(n.w[D]+W)**2)return!0}return!1},g={tree0:[],tree1:[],palm:[],bamboo:[],reeds:[],grass:[],bush:[],rock0:[],rock1:[],rock2:[]},x={};for(let O=2;O<n.length-2;O+=2.5){n.at(O,x);for(const I of[1,-1]){const W=Math.round(O/Lt),D=(I>0?n.lk[W]:n.rk[W])<.5?I>0?n.lf[W]:n.rf[W]:I>0?n.lt[W]:n.rt[W],re=Ye(),ce=x.nx*I,he=x.nz*I,Q=(me,K,j,de=1,fe=4)=>{const q=x.x+ce*(x.w+K),ee=x.z+he*(x.w+K);d(q,ee,fe)||me.push([q,x.y+j,ee,Ye()*6.28,de])};D===0?(re<.3&&Q(Ye()<.55?g.tree0:g.tree1,6+Ye()*16,x.h+.9,.8+Ye()*.6,6),Ye()<.35&&Q(g.grass,5+Ye()*20,x.h+1,1+Ye(),5),Ye()<.06&&Q(g.rock2,7+Ye()*12,x.h+.9,.8+Ye(),6),Ye()<.07&&Q(g.bamboo,2+Ye()*.6,.85,.8+Ye()*.3,1.6)):D===1?re<.08?Q(g.bamboo,2.2+Ye()*.4,.85,.7+Ye()*.3,1.6):re<.2?Q(g.bush,2.3,.86,.8+Ye()*.4,1.6):re<.3&&Q(g.grass,2+Ye(),.86,1,1.6):(re<.22&&Q(g.palm,6+Ye()*10,1.6,.9+Ye()*.3,5),Ye()<.25&&Q(g.bamboo,3.5+Ye()*6,1.3,.9,3),Ye()<.3&&Q(g.grass,4+Ye()*14,1.6,1.2,4),Ye()<.3&&Q(g.reeds,-.7,0,.9+Ye()*.4,-1),Ye()<.08&&Q(g.rock1,5+Ye()*6,1,1+Ye()*.5,4),Ye()<.2&&Q(g.tree0,12+Ye()*18,x.h,1+Ye()*.4,8))}}const y={tree0:0,tree1:1,palm:2,bamboo:3,reeds:4,grass:5,bush:6,...t.flora},M={...t,leaf:Array(3).fill(t.bush||"#6fb84a")},w=Zs(),b=(O,I,W=!0)=>{I.length&&i.add(Wr(O,w,I,{cast:W}))};for(const[O,I]of[["tree0",!0],["tree1",!0],["palm",!0],["bamboo",!0],["reeds",!1],["grass",!1],["bush",!1]])y[O]==null||!g[O].length||b(Pc(y[O]===6?M:t,y[O]),g[O],I);b(Hu(t,2),g.rock2),b(Hu(t,1),g.rock1);const _=[],T=(O,I,W)=>{n.at(O,x);const D=sf(I,x.w*2+2.2,{pole:t.rail,ring:t.railRing});D.position.set(x.x,x.y,x.z),D.rotation.y=-x.a+Math.PI,D.userData={s:O,kind:W},i.add(D),_.push(D);const re=Wr(Pc(y.bush===6?M:t,y.bush??6),w,[-1,1].map(ce=>[x.x+x.nx*ce*(x.w+1.4),x.y+.86,x.z+x.nz*ce*(x.w+1.4),0,1.1]),{cast:!1});return i.add(re),D};T(e.start,"DÉPART","start"),e.checkpoints.forEach((O,I)=>T(O,"CHECKPOINT","cp"+(I+1))),T(e.finish,"ARRIVÉE","finish");const U=[],S=[],A=(Math.min(...n.x)+Math.max(...n.x))/2,k=(Math.min(...n.z)+Math.max(...n.z))/2;for(let O=0;O<26;O++){const I=Ye()*Math.PI*2,W=230+Ye()*260;U.push([A+Math.cos(I)*W,-40+Ye()*50,k+Math.sin(I)*W,Ye()*6,14+Ye()*24])}const H=je([Oe(De(new It(1,.8,3,9),t.far),[0,0,0]),Oe(De(new It(1.02,1.02,.25,9),t.farTop||t.grass),[0,1.55,0]),Oe(De(new Bt(.8,1.6,9),st(t.far,-.12)),[0,-2.3,0],[Math.PI,0,0])]);i.add(Wr(H,Zs(),U,{cast:!1}));for(let O=0;O<40;O++){const I=Ye()*Math.PI*2,W=120+Ye()*420;S.push([A+Math.cos(I)*W,35+Ye()*70,k+Math.sin(I)*W,Ye()*6,6+Ye()*10])}const G=je([[0,0,0,1],[1.1,-.2,.2,.75],[-1.1,-.25,-.1,.7],[.4,.35,-.3,.7],[-.5,.1,.5,.6]].map(([O,I,W,D])=>Oe(De(new En(D,1),"#ffffff"),[O,I,W],0,[1,.7,1])));return i.add(Wr(G,new or({vertexColors:!0,flatShading:!0,emissive:t.cloud||"#e8f4ff",emissiveIntensity:.55}),S,{cast:!1})),{root:i,water:u,signs:_,theme:t,update(O){u.material.uniforms.uTime.value=O}}}function H_(n){const e=new Ts(1200,24,12),t=new An({side:kt,depthWrite:!1,fog:!1,uniforms:{top:{value:new He(n.sky[0])},bottom:{value:new He(n.sky[1])}},vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",fragmentShader:`uniform vec3 top, bottom; varying vec3 vP; void main(){ float k = smoothstep(-.15, .55, vP.y); gl_FragColor = vec4(mix(bottom, top, k), 1.);
#include <colorspace_fragment>
}`}),i=new pt(e,t);return i.renderOrder=-10,i.frustumCulled=!1,i}function V_(n,{quality:e="high"}={}){const t=e==="low"||/iPhone|Android/.test(navigator.userAgent),i=/[?&]pflow/.test(location.search),s=new Bv({canvas:n,antialias:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1});s.outputColorSpace=fn,s.toneMapping=qn,s.shadowMap.enabled=!i,s.shadowMap.type=_h;const r=new Hv,o=new dn(55,16/9,.3,1500),a=new S_("#e6f6ff","#f2c3a0",1.55),l=new E_("#fff4e2",1.75);l.castShadow=!0;const u=t?1024:2048;l.shadow.mapSize.set(u,u),Object.assign(l.shadow.camera,{left:-26,right:26,top:26,bottom:-26,near:1,far:140}),l.shadow.bias=-6e-4,l.shadow.normalBias=.04,r.add(a,l,l.target);const c=new F(.45,.85,.35).normalize();let p=null;const m={renderer:s,scene:r,camera:o,sun:l,hemi:a,pixelRatio:i?.3:Math.min(devicePixelRatio||1,t?1.5:2),setTheme(f){p&&r.remove(p),p=H_(f),r.add(p),r.fog=new Qc(f.fog,f.fogNear,f.fogFar),r.background=new He(f.sky[1]);const h={sky:"#e6f6ff",ground:"#f2c3a0",sun:"#fff4e2",hemiI:1.55,sunI:1.75,...f.light};a.color.set(h.sky),a.groundColor.set(h.ground),a.intensity=h.hemiI,l.color.set(h.sun),l.intensity=h.sunI},focus(f,h,v){l.position.set(f+c.x*60,h+c.y*60,v+c.z*60),l.target.position.set(f,h,v),p&&p.position.set(o.position.x,0,o.position.z)},resize(f,h){s.setPixelRatio(m.pixelRatio),s.setSize(f,h,!1),o.aspect=f/Math.max(1,h),o.fov=o.aspect<1.2?68:55,o.updateProjectionMatrix()},render(){s.render(r,o)},dispose(){r.traverse(f=>{f.geometry&&f.geometry.dispose();const h=f.material;h&&(Array.isArray(h)?h:[h]).forEach(v=>{v.map?.dispose(),v.dispose()})}),s.dispose(),s.forceContextLoss?.()}};return m}const ar=Math.PI*2,$s=(n,e,t)=>Math.max(e,Math.min(t,n)),Ui=n=>n*n*(3-2*n),Uo=(n,e)=>((e+(n.phase||0)*n.period)%n.period+n.period)%n.period/n.period;function _o(n,e){const t=Uo(n,e);return t<.5?0:t<.6?Ui((t-.5)/.1):t<.75?1:1-Ui((t-.75)/.25)}function sl(n,e){const t=Uo(n,e),i=n.up??4.6,s=.55;if(t<.55)return i;if(t<.62){const r=(t-.55)/.07;return i-(i-s)*r*r}return t<.74?s:s+(i-s)*Ui((t-.74)/.26)}const rf=(n,e)=>(n.phase||0)*ar+e*n.speed;function of(n,e){const t=Uo(n,e);return t<.62?0:t<.7?Ui((t-.62)/.08):t<.86?1:1-Ui((t-.86)/.14)}function af(n,e){const t=Uo(n,e);return t<.7?0:t<.76?Ui((t-.7)/.06):t<.84?1:1-Ui((t-.84)/.16)}const cs=(n,e)=>(n.d||0)+(n.amp||0)*Math.sin(ar*e/(n.period||4)+(n.phase||0)*ar);function G_(n,e,t,i=[]){i.length=0;const s=n.side*(e+1.3),r=n.len??7.2,o=n.hub??3.4,a=n.arms??4,l=1.7,u=rf(n,t);for(let c=0;c<a;c++){const p=u+c*ar/a,m=Math.cos(p),f=Math.sin(p);if(o+r*f>l)continue;const v=f<0?$s((l-o)/(r*f),0,1):0;i.push([s+v*r*m,s+r*m])}return i}const Vu=[];function W_(n,e,t,i,s){const r=e.s-n.s;switch(n.type){case"spikes":{if(e.s<n.s-t*.6||e.s>n.s1+t*.6)return null;const o=s.w-(n.inset??.7),a=n.side*e.d+t-o;return a>0?{n:[0,-n.side],depth:a,hit:!0}:null}case"rock":case"post":case"mine":case"saw":case"croc":{if(Math.abs(r)>t+n.r+1)return null;const o=n.type==="rock"||n.type==="post"?n.d:cs(n,i),a=e.d-o,l=Math.hypot(r,a),u=t+n.r-l;if(u<=0)return null;const c=l>1e-4?1/l:0,p=n.type==="mine"||n.type==="saw"||n.type==="croc"&&af(n,i)>.6;return{n:l>1e-4?[r*c,a*c]:[-1,0],depth:u,hit:p,kick:n.type==="croc"&&p?3:0}}case"turnstile":{const o=n.len??4,a=n.r??.45;if(Math.abs(r)>o+t+a)return null;const l=(n.phase||0)*ar+i*(n.speed??1),u=Math.cos(l),c=Math.sin(l),p=e.d-(n.d||0),m=$s(r*u+p*c,-o,o),f=r-m*u,h=p-m*c,v=Math.hypot(f,h);if(v>=t+a){const d=Math.hypot(r,p),g=p+(p<0?-.8:.8),x=Math.hypot(r,g);return d<t+.6?{n:[r/x,g/x],depth:t+.6-d,hit:!1}:null}return{n:v>1e-4?[f/v,h/v]:[1,0],depth:t+a-v,hit:!0,kick:2}}case"log":{const o=(n.len??4.5)/2,a=n.r??.5;if(Math.abs(r)>o+t+a)return null;const l=cs(n,i),u=$s(r,-o,o),c=r-u,p=e.d-l,m=Math.hypot(c,p);return m>=t+a?null:{n:m>1e-4?[c/m,p/m]:[0,1],depth:t+a-m,hit:!1}}case"jaws":{const o=(n.thick??1.3)/2;if(Math.abs(r)>o+t)return null;const a=_o(n,i),l=s.w*(1-a)+.05;let u=null;for(const c of[1,-1]){const p=$s(r,-o,o),m=c>0?Math.max(e.d,l):Math.min(e.d,-l),f=r-p,h=e.d-m,v=Math.hypot(f,h),d=Math.abs(r)<=o&&c*e.d>=l;if(!d&&v>=t)continue;const g=d?t+c*e.d-l:t-v,x=d?[0,-c]:[f/v,h/v];(!u||g>u.depth)&&(u={n:x,depth:g,hit:!1})}return u&&a>.35&&Math.abs(r)<o+t*.5&&2*l<2*t*.9&&_o(n,i+.05)>=a&&(u.crush=!0),u}case"bar":{const o=sl(n,i),a=n.r??.55;return o>2.1||Math.abs(r)>t+a?null:{n:[r>=0?1:-1,0],depth:t+a-Math.abs(r),hit:!0,kick:3}}case"mill":{if(Math.abs(r)>t+1.2)return null;G_(n,s.w,i,Vu);const o=n.r??.5;for(const[a,l]of Vu){const u=Math.min(a,l),c=Math.max(a,l),p=$s(e.d,u,c),m=Math.hypot(r,e.d-p);if(m<t+o)return{n:m>1e-4?[r/m,(e.d-p)/m]:[1,0],depth:t+o-m,hit:!0,kick:2}}return null}}return null}function X_(n,e,t,i,s){const r=e.s-n.s;if(n.type==="whirl"){const o=e.d-n.d,a=Math.hypot(r,o);if(a>n.r)return!1;const l=(1-a/n.r)*(n.strength??3);return i.s+=-o/(a||1)*l*n.dir-r/(a||1)*l*.25,i.d+=r/(a||1)*l*n.dir-o/(a||1)*l*.25,i.spin+=l*.45*n.dir,!0}if(n.type==="geyser"){const o=of(n,s),a=e.d-n.d,l=Math.hypot(r,a),u=(n.r??1.8)+t;if(o<=0||l>u)return!1;const c=o*(1-l/u)*(n.power??14);return i.s+=(l>.01?r/l:1)*c,i.d+=(l>.01?a/l:0)*c,i.spin+=o*2.5*(a>=0?1:-1),!0}return n.type==="boost"?r<0||r>n.len||Math.abs(e.d-n.d)>n.w/2+t*.4?!1:(i.s+=n.power??5,!0):!1}const oi=2.2,er=3,ba=5.6,Gu=5.2,Wu=.32,q_=2.6,$_=1.6,ut={},es={};class Y_{constructor(e,t){this.track=e,this.course=t,this.cps=[t.spawn,...t.checkpoints],this.hz=t.hazards.slice().sort((i,s)=>i.s-s.s),this.st={x:0,z:0,y:0,vx:0,vz:0,yaw:0,w:0,air:er,inv:0,pop:-1,cp:0,s:0,d:0,deaths:0,finished:!1,time:0,bump:0,lastHit:null},this.respawn(0)}respawn(e=this.st.cp){const t=this.st,i=this.track,s=this.cps[e]+(e===0?0:3);i.at(s,ut),Object.assign(t,{x:ut.x,z:ut.z,y:ut.y,vx:ut.tx*ut.flow*.5,vz:ut.tz*ut.flow*.5,yaw:ut.a,w:0,air:er,inv:1.2,pop:-1,cp:e,s,d:0})}get popped(){return this.st.pop>=0}step(e,t,i,s=[]){const r=this.st,o=this.track;if(r.finished)return r.vx*=.9,r.vz*=.9,r.x+=r.vx*e,r.z+=r.vz*e,s;if(r.time+=e,r.pop>=0)return r.pop+=e,r.pop>=q_&&(this.respawn(),s.push({k:"respawn",cp:r.cp})),s;r.inv=Math.max(0,r.inv-e),r.bump=Math.max(0,r.bump-e);const a=o.project(r.x,r.z,r.s);r.s=a.s,r.d=a.d,o.at(Math.max(0,a.s),ut);let l=0,u=0;for(const y of i){const M=r.yaw+y.a,w=Math.cos(M),b=Math.sin(M);y.f&&(l-=w*ba,u-=b*ba),y.sp>0&&(r.vx-=w*Gu*y.sp,r.vz-=b*Gu*y.sp,r.w+=(Math.random()-.5)*.6)}const c=Math.hypot(l,u),p=ba*1.7;c>p&&(l*=p/c,u*=p/c);const m={s:0,d:0,spin:0};for(const y of this.hz){if(y.s-a.s>14)break;a.s-y.s>30||X_(y,a,oi,m,t)}const f=ut.flow+m.s,h=ut.tx*f+ut.nx*m.d,v=ut.tz*f+ut.nz*m.d,d=1-Math.exp(-.85*e);r.vx+=(h-r.vx)*d+l*e,r.vz+=(v-r.vz)*d+u*e,r.w+=m.spin*e,r.w*=Math.exp(-.9*e),ut.slope<-.02&&(r.vx+=ut.tx*-ut.slope*9*e,r.vz+=ut.tz*-ut.slope*9*e),r.x+=r.vx*e,r.z+=r.vz*e,r.yaw+=r.w*e;const g=o.project(r.x,r.z,r.s);if(o.at(Math.max(0,g.s),ut),g.s<0){const y=r.x-ut.x,M=r.z-ut.z,w=Math.hypot(y,M),b=w+oi-ut.w;b>0&&this.contact(y/w,M/w,b,s)}else{const y=Math.abs(g.d)+oi-ut.w;if(y>0){const M=Math.sign(g.d)||1;this.contact(ut.nx*M,ut.nz*M,y,s)}}g.s=Math.max(g.s,-50);for(const y of this.hz){if(y.s-g.s>12)break;if(g.s-(y.s1??y.s)>12)continue;o.at(y.type==="spikes"?j_(g.s,y):y.s,es);const M=W_(y,g,oi,t,es);if(!M)continue;const w=es.tx*M.n[0]+es.nx*M.n[1],b=es.tz*M.n[0]+es.nz*M.n[1];if(M.crush)return this.burst(s,"crush",y),s;if(this.contact(-w,-b,M.depth,s,M.kick),M.hit&&r.inv<=0&&(r.air--,r.inv=$_,r.lastHit=y.type,r.w+=(Math.random()<.5?-1:1)*(2+Math.random()*2),r.vx+=w*4.5,r.vz+=b*4.5,s.push({k:"hit",air:r.air,x:r.x-w*oi,z:r.z-b*oi,cause:y.type}),r.air<=0))return this.burst(s,y.type,y),s}r.s=g.s,r.d=g.d,r.y=ut.y;const x=this.cps[r.cp+1];return x!=null&&r.s>=x&&(r.cp++,s.push({k:"cp",i:r.cp})),r.s>=this.course.finish&&(r.finished=!0,s.push({k:"finish",time:r.time,deaths:r.deaths})),Number.isFinite(r.x+r.z+r.vx+r.vz+r.yaw+r.w)||(this.respawn(),s.push({k:"respawn",cp:r.cp})),s}contact(e,t,i,s,r=0){const o=this.st;o.x-=e*i,o.z-=t*i;const a=o.vx*e+o.vz*t;a>0&&(o.vx-=(1+Wu)*a*e,o.vz-=(1+Wu)*a*t,a>1.6&&o.bump<=0&&(s.push({k:"bump",v:a}),o.bump=.25)),r&&(o.vx-=e*r,o.vz-=t*r);const l=e*2.2,u=t*2.2,c=-t,p=e,f=-((o.vx+o.w*u)*c+(o.vz-o.w*l)*p)*.22;o.vx+=c*f*.5,o.vz+=p*f*.5,o.w+=(u*c-l*p)*f*2/4.84}burst(e,t){const i=this.st;i.pop=0,i.air=0,i.deaths++,i.vx=i.vz=0,i.w=0,e.push({k:"pop",x:i.x,z:i.z,cause:t,deaths:i.deaths})}giveUp(e=[]){return this.st.pop<0&&!this.st.finished&&this.burst(e,"reset"),e}pack(){const e=this.st,t=i=>Math.round(i*1e3)/1e3;return[t(e.x),t(e.z),t(e.y),t(e.yaw),t(e.vx),t(e.vz),t(e.w),e.air,t(e.pop),e.cp,t(e.s),e.deaths,e.finished?1:0,t(e.time),t(e.inv)]}}function Xu(n,e={}){return[e.x,e.z,e.y,e.yaw,e.vx,e.vz,e.w,e.air,e.pop,e.cp,e.s,e.deaths,e.finished,e.time,e.inv]=n,e.finished=!!e.finished,e}const j_=(n,e)=>Math.max(e.s,Math.min(e.s1,n));let cf="#b24fc8",lf="#c97be0",ss="#fbf7f2";function K_(){const n=new dt,e=new dt;n.add(e);const t=oi-.25,i=tt(je([Oe(De(new ui(t,.44,14,40),"#f7dcb8"),[0,.35,0],[Math.PI/2,0,0]),Oe(De(new ui(t,.46,8,40,Math.PI*2),"#8fe0d6"),[0,.2,0],[Math.PI/2,0,0],[1,1,.55])]),Dn());_t(i,.035),e.add(i);const s=[Ne(t-.1,t-.1,.16,"#9fd273",[0,.38,0],0,1,32)];for(let a=-2;a<=2;a++){const l=a*.62,u=Math.sqrt(Math.max(0,(t-.14)**2-l*l));s.push(ht(.05,.02,u*2,"#6f9f4b",[l+.31,.47,0]))}for(let a=0;a<4;a++){const l=a*Math.PI/2+Math.PI/4,u=Math.cos(l),c=Math.sin(l);s.push(Oe(De(new ui(.3,.09,6,12,Math.PI),"#c8423a"),[u*t,.72,c*t],[0,-l+Math.PI/2,0])),s.push(ht(.5,.3,.25,"#f2a33a",[u*(t+.5),.05,c*(t+.5)],[0,-l,0]))}const r=tt(je(s),Dn());r.receiveShadow=!0,_t(r,.03),e.add(r);let o=0;return{root:n,body:e,tube:i,setState(a,l,u){const c=a>=3?1:a===2?.92:.8;if(i.scale.set(1,1,c+Math.sin(u*30)*(a<3?.012:0)),l>=0){o=l;const p=l<.12?1+l*3:Math.max(0,1.36-(l-.12)*6);e.scale.setScalar(p),e.visible=p>.01}else o&&(o=0,e.scale.setScalar(1),e.visible=!0)}}}function Xr(n,e=.45,t=2.6,i=[[0,1],[1,0],[-1,0],[0,-1]]){const s=[Ne(e,e,n,cf,[0,0,0],[0,0,Math.PI/2],1,12)];for(let o=-n/2+.4;o<n/2;o+=1.4)s.push(Ne(e+.04,e+.04,.18,lf,[o,0,0],[0,0,Math.PI/2],1,12));const r=Math.max(2,Math.round(n*t/i.length));for(let o=0;o<r;o++){const a=-n/2+(o+.5)*n/r;i.forEach(([l,u],c)=>{const p=c%2*.5*n/r,m=De(new Bt(.16,.55,8),ss);m.translate(0,e+.2,0),m.rotateX(Math.atan2(u,l)),m.translate(a+p-(p?n/r/4:0),0,0),s.push(m)})}return je(s)}function J_(n,e){const t=e.theme;cf=t.trap||"#b24fc8",lf=t.trapHi||"#c97be0",ss=t.spike||"#fbf7f2";const i=t.mine||"#d2463c",s=t.rail||"#86c540",r=t.railRing||"#5f9c2a",o=t.tower||"#f39bb0",a=new dt,l=[],u={},c={},p=Dn(),m=(f,h=.035)=>(h&&_t(f,h),a.add(f),f);for(const f of e.hazards)if(n.at(f.s,u),f.type==="spikes"){const h=[];for(let v=f.s;v<f.s1-.1;v+=4){const d=Math.min(f.s1,v+4),g=d-v,x=Xr(g+.3,.42,2.4,[[.3,-1],[-.25,-1],[1,-.6],[-.9,-.5]].map(([w,b])=>{const _=Math.hypot(w,b);return[w/_,b/_]}));n.at((v+d)/2,c);const y=f.side*(c.w-.2),M=new ct().compose(new F(c.x+c.nx*y,c.y+.35,c.z+c.nz*y),new di().setFromEuler(new on(0,-c.a+Math.PI/2+(f.side>0?Math.PI:0),0)),new F(1,1,1));x.applyMatrix4(M),h.push(x)}m(tt(je(h),p))}else if(f.type==="rock"||f.type==="post"){const h=t.rock||"#8d8f99",v=f.type==="post"?je([Ne(f.r,f.r*1.1,4,s,[0,1.5,0],0,1,10)]):je([Oe(De(new fs(1,0),h),[0,.3,0],[.4,f.s,.2],[1,1.3,1]),Oe(De(new fs(.7,0),st(h,.1)),[.5,1.1,.2],[.1,f.s*2,.5]),Oe(De(new En(.55,0),st(h,-.08)),[-.55,.9,-.3],[.6,0,.3]),...t.snowRocks?[Oe(De(new fs(.75,0),"#ffffff"),[0,1.25,0],[.4,f.s,.2],[1,.45,1.05])]:[]]),d=tt(v,f.type==="post"?p:new or({vertexColors:!0,flatShading:!0}));n.world(f.s,f.d,c),d.position.set(c.wx,c.y,c.wz),d.scale.setScalar(f.r*(f.type==="rock"?1.15:1)),m(d,f.type==="post"?.03:0)}else if(f.type==="mine"){const h=je([Ie(1,i,[0,0,0],0,[1,.78,1],18),Ne(1.02,1.02,.22,"#fbf7f2",[0,-.02,0],0,1,18),...Array.from({length:10},(d,g)=>{const x=g/10*Math.PI*2,y=g%2?.25:.9,M=De(new Bt(.2,.55,8),ss);return M.translate(0,1.05,0),M.rotateZ(-y),M.rotateY(x),M}),nn(.22,.6,ss,[0,1.05,0],0,1,8)]),v=m(tt(h,p));v.scale.setScalar(f.r*.95),l.push(d=>{n.world(f.s,cs(f,d),c),v.position.set(c.wx,c.y+.15+Math.sin(d*2.4+f.s)*.12,c.wz),v.rotation.y=d*.6})}else if(f.type==="saw"){const h=[Ne(1,1,.16,"#c3c9d4",[0,0,0],0,1,28),Ne(.32,.32,.3,"#d2463c",[0,.05,0],0,1,14)];for(let d=0;d<16;d++){const g=d/16*Math.PI*2;h.push(Oe(De(new Bt(.16,.42,4),ss),[Math.cos(g)*1.12,0,Math.sin(g)*1.12],[0,-g,-Math.PI/2-.4]))}const v=m(tt(je(h),p));v.scale.setScalar(f.r/1.12),l.push(d=>{n.world(f.s,cs(f,d),c),v.position.set(c.wx,c.y+.55,c.wz),v.rotation.y=-d*7,v.rotation.z=Math.sin(d*3)*.08})}else if(f.type==="jaws"){const h=u.w,v=h+1.2,d=f.thick??1.3,g=()=>{const M=[ht(v,3.2,d,"#6f7685",[v/2,1.2,0]),ht(v+.1,.25,d+.1,"#565c69",[v/2,2.85,0])];for(let w=0;w<Math.floor(v/.9);w++)for(let b=0;b<3;b++)for(const _ of[1,-1])M.push(ht(.32,.32,.12,ss,[.5+w*.9,.3+b*.9,_*(d/2+.03)]));return je(M)},x=[1,-1].map(M=>{const w=new dt,b=tt(g(),p);return _t(b,.04),w.add(b),a.add(w),{g:w,side:M}}),y=je([ht(v+.5,4,d+.6,"#7b8292",[0,1.5,0]),ht(v+.7,.45,d+.8,"#f7a43a",[0,3.6,0]),ht(v*.7,7,d*.8,"#6a7180",[v*.1,-4,0]),...[-1,1].map(M=>ht(.5,.5,.1,"#ffd23f",[-(v+.5)/2+.6,2.6,M*(d+.62)/2]))]);for(const M of[1,-1]){const w=m(tt(y,p));n.world(f.s,M*(h+.1+(v+.5)/2),c),w.position.set(c.wx,c.y-.3,c.wz),w.rotation.y=M>0?Math.PI-c.a:-c.a}l.push(M=>{const w=_o(f,M),b=h*(1-w);for(const{g:_,side:T}of x)n.world(f.s,T*(b+.02),c),_.position.set(c.wx,c.y-.4,c.wz),_.rotation.y=T>0?Math.PI-c.a:-c.a})}else if(f.type==="bar"){const h=u.w,v=new dt,d=tt(Xr(h*2+1,.45,2.4,[[-1,0],[-.7,.7],[-.7,-.7],[0,1],[0,-1]]),p);_t(d,.035),v.add(d),a.add(v);for(const g of[1,-1]){const x=m(tt(je([Ne(.35,.45,6.4,s,[0,3.2,0],0,1,8),Ne(.5,.5,.4,"#f7a43a",[0,6.4,0],0,1,8),...[1.4,2.8,4.2].map(y=>Ne(.42,.42,.1,r,[0,y,0],0,1,8))]),p));n.world(f.s,g*(h+1.1),c),x.position.set(c.wx,c.y,c.wz)}v.rotation.y=Math.PI-u.a,l.push(g=>{v.position.set(u.x,u.y+sl(f,g)+.2,u.z)})}else if(f.type==="mill"){const h=u.w,v=f.len??7.2,d=f.hub??3.4,g=f.arms??4,x=m(tt(je([Ne(.7,1,d+1.2,o,[0,(d-1.2)/2,0],0,1,10),Ne(.9,.9,.4,"#f7a43a",[0,-1,0],0,1,10),nn(1,1.4,"#e8605a",[0,d+.3,0],0,1,10)]),p));n.world(f.s,f.side*(h+1.3),c),x.position.set(c.wx-c.tx*1.2,c.y,c.wz-c.tz*1.2);const y=new dt,M=[];for(let _=0;_<g;_++){const T=Xr(v,.4,2.2,[[0,1],[0,-1],[1,0],[-1,0]]);T.translate(v/2,0,0),T.rotateZ(_*Math.PI*2/g),M.push(T)}M.push(Ne(.65,.65,.9,"#f7a43a",[0,0,0],[Math.PI/2,0,0],1,12));const w=tt(je(M),p);_t(w,.035),y.add(w),a.add(y),y.position.set(c.wx,c.y+d,c.wz);const b=new ct().makeBasis(new F(c.nx,0,c.nz),new F(0,1,0),new F(c.tx,0,c.tz));y.quaternion.setFromRotationMatrix(b),l.push(_=>{w.rotation.z=rf(f,_)})}else if(f.type==="whirl"){const h=new dt,v=new tn({color:"#ffffff",transparent:!0,opacity:.55,depthWrite:!1});for(let d=0;d<3;d++){const g=new pt(new pr(f.r*(.25+d*.25),f.r*(.25+d*.25)+.18,40,1,0,Math.PI*1.3),v);g.rotation.x=-Math.PI/2,g.position.y=.05+d*.01,g.userData.k=d,h.add(g)}n.world(f.s,f.d,c),h.position.set(c.wx,c.y,c.wz),a.add(h),l.push(d=>h.children.forEach(g=>{g.rotation.z=d*(2.4-g.userData.k*.5)*f.dir}))}else if(f.type==="geyser"){const h=f.r??1.8,v=new tn({color:"#ffffff",transparent:!0,opacity:.4,depthWrite:!1}),d=new pt(new Co(h,28).rotateX(-Math.PI/2),v),g=new or({color:t.foam||"#ffffff",emissive:"#bfefff",emissiveIntensity:.35,transparent:!0,opacity:.85}),x=new pt(je([Ne(h*.55,h*.8,1,"#ffffff",[0,.5,0],0,1,14),...[0,1,2,3,4].map(M=>Ie(h*.42,"#ffffff",[Math.cos(M*1.3)*h*.35,1.02,Math.sin(M*1.3)*h*.35],0,1,8))]),g);n.world(f.s,f.d,c);const y=new dt;y.position.set(c.wx,c.y+.05,c.wz),y.add(d,x),a.add(y),l.push(M=>{const w=of(f,M),b=((M/f.period+(f.phase||0))%1+1)%1,_=b>.45&&b<.62?.5+.5*Math.sin(M*30):0;v.opacity=.25+_*.35+w*.4,d.scale.setScalar(1+_*.08+w*.25),x.visible=w>.01,x.scale.set(1+Math.sin(M*20)*.04,Math.max(.01,w*7.5),1+Math.cos(M*23)*.04)})}else if(f.type==="croc"){const h=t.croc||"#5e9e3e",v="#e7e29a",d=new dt,g=tt(je([ht(1.1,.32,2.2,h,[0,-.05,.9]),ht(.9,.1,1.9,v,[0,.12,.9]),...[-1,1].flatMap(w=>[0,1,2,3].map(b=>nn(.07,.22,"#ffffff",[w*.42,.25,.3+b*.45],0,1,6)))]),p),x=new dt;x.position.set(0,.12,-.1);const y=tt(je([ht(1.15,.4,2.3,h,[0,.2,1]),...[-1,1].map(w=>Ie(.22,h,[w*.32,.5,.05],0,1,10)),...[-1,1].map(w=>Ie(.13,"#fff7c2",[w*.32,.62,.1],0,1,8)),...[-1,1].map(w=>ht(.04,.16,.05,"#1d1d26",[w*.32,.64,.2])),...[-1,1].map(w=>Ie(.05,"#2a3b20",[w*.2,.42,2.1],0,1,6)),...[-1,1].flatMap(w=>[0,1,2,3].map(b=>nn(.07,.22,"#ffffff",[w*.44,-.02,.4+b*.45],[Math.PI,0,0],1,6)))]),p);_t(g,.03),_t(y,.03),x.add(y),d.add(g,x);const M=tt(je([0,1,2].map(w=>Ie(.4,h,[0,-.15,-1-w*.9],0,[1.2,.5,1],8))),p);d.add(M),d.scale.setScalar(f.r/1.1),a.add(d),l.push(w=>{n.world(f.s,cs(f,w),c),d.position.set(c.wx,c.y+.1+Math.sin(w*1.7+f.s)*.05,c.wz),d.rotation.y=-c.a,x.rotation.x=-(1-af(f,w))*.75})}else if(f.type==="turnstile"){const h=f.len??4,v=Xr(h*2,.45,2.4,[[1,0],[0,1],[0,-1],[.7,.7],[.7,-.7]]),d=tt(v,p);_t(d,.035);const g=tt(je([Ne(.55,.6,2.4,s,[0,.6,0],0,1,10),Ne(.7,.7,.3,"#f7a43a",[0,1.9,0],0,1,10)]),p);_t(g,.035),n.world(f.s,f.d||0,c);const x=new dt;x.position.set(c.wx,c.y+.35,c.wz),x.add(d),a.add(x),g.position.set(c.wx,c.y,c.wz),a.add(g);const y=c.a;l.push(M=>{const w=(f.phase||0)*Math.PI*2+M*(f.speed??1),b=Math.cos(w)*Math.sin(y)+Math.sin(w)*-Math.cos(y),_=Math.cos(w)*-Math.cos(y)+Math.sin(w)*-Math.sin(y);x.rotation.y=Math.atan2(-_,b)})}else if(f.type==="log"){const h=f.len??4.5,v=f.r??.5,d=tt(je([Ne(v,v,h,"#8a5a34",[0,0,0],[Math.PI/2,0,0],1,10),...[-1,1].map(g=>Ne(v*.82,v*.82,.04,"#d9b07a",[0,0,g*h/2],[Math.PI/2,0,0],1,10)),...[-.25,.15].map(g=>Ne(v+.03,v+.03,.12,"#6e4527",[0,0,g*h],[Math.PI/2,0,0],1,10)),Ie(.22,"#6fb84a",[.1,v,.6],0,[1.3,.5,1],6)]),p);_t(d,.03),a.add(d),l.push(g=>{n.world(f.s,cs(f,g),c),d.position.set(c.wx,c.y+.12,c.wz),d.rotation.set(Math.sin(g*1.3+f.s)*.05,-c.a,Math.sin(g*2.1)*.2)})}else if(f.type==="boost"){const h=new dt,v=new tn({color:"#ffd23f"}),d=new il;d.moveTo(-1,0),d.lineTo(0,.9),d.lineTo(1,0),d.lineTo(.6,0),d.lineTo(0,.55),d.lineTo(-.6,0);const g=new Io(d);g.rotateX(-Math.PI/2);const x=[];for(let y=0;y<4;y++){const M=new pt(g,v);M.scale.setScalar(f.w*.45),h.add(M),x.push(M)}a.add(h),l.push(y=>x.forEach((M,w)=>{const b=(y*.8+w/4)%1,_=f.s+b*f.len;n.world(_,f.d,c),M.position.set(c.wx,c.y+.06,c.wz),M.rotation.y=-c.a,M.scale.setScalar(f.w*.45*Math.sin(b*Math.PI))}))}return{root:a,update(f){for(const h of l)h(f)}}}const Tn=new ct,ks=new di,wa=new on,Os=new F,zs=new F,Ys=new He;class Bs{constructor(e,t,i,{alpha:s=!1}={}){this.max=i,this.items=[],this.free=[],this.mesh=new To(e,t,i),this.mesh.instanceMatrix.setUsage(Dl),this.mesh.frustumCulled=!1,this.mesh.castShadow=!1,this.mesh.setColorAt(0,Ys.set("#ffffff")),s&&(this.alpha=new Ec(new Float32Array(i),1),this.alpha.setUsage(Dl),e.setAttribute("aAlpha",this.alpha),t.transparent=!0,t.depthWrite=!1,t.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("void main() {",`attribute float aAlpha; varying float vAlpha;
void main() { vAlpha = aAlpha;`),r.fragmentShader=r.fragmentShader.replace("void main() {",`varying float vAlpha;
void main() {`).replace("#include <dithering_fragment>",`#include <dithering_fragment>
gl_FragColor.a *= vAlpha;`)}),this.mesh.count=0}spawn(e){return this.items.length>=this.max&&this.items.shift(),this.items.push(e),e}flush(e){const t=this.mesh;let i=0;for(const s of this.items)e(s,i),i++;t.count=i,t.instanceMatrix.needsUpdate=!0,t.instanceColor&&(t.instanceColor.needsUpdate=!0),this.alpha&&(this.alpha.needsUpdate=!0)}}function Z_(n){const e=new Bs(new En(1,1),Cc("#ffffff"),420),t=new Bs(new pr(.82,1,32).rotateX(-Math.PI/2),new tn({color:"#ffffff"}),90,{alpha:!0}),i=new Bs(new En(1,0),Cc("#ffffff"),260),s=new Bs(new mn(1,.12,.6),new tn({color:"#ffffff",side:en}),360),r=new Bs(new Lo(1,0),new tn({color:"#ffffff"}),60),o=new pt(new Co(1,32).rotateX(-Math.PI/2),new tn({color:"#0b3a66",transparent:!0,opacity:.22,depthWrite:!1}));for(const u of[e,t,i,s,r])n.add(u.mesh);const a=()=>Math.random(),l={puff(u,c,p,m=1){const f=Math.round(2+m*2);for(let h=0;h<f;h++){const v=(2.4+a()*2.4)*Math.sqrt(m);e.spawn({x:u.x+(a()-.5)*.3,y:u.y+(a()-.5)*.3,z:u.z+(a()-.5)*.3,vx:c.x*v+(a()-.5)*1.4,vy:.6+a()*1.2,vz:c.z*v+(a()-.5)*1.4,age:0,life:.9+a()*.6+m*.25,s0:.18+a()*.12,s1:(.36+a()*.3)*(.75+m*.35),c:p[Math.floor(a()*p.length)],rot:a()*6})}},ring(u,c,p,m=2.6,f=1.6,h=.75){t.spawn({x:u,y:c+.04,z:p,age:0,life:f,s0:m*.55,s1:m*1.45,a:h})},splash(u,c,p,m=18,f=1){for(let h=0;h<m;h++){const v=a()*Math.PI*2,d=(1.5+a()*3)*f;i.spawn({x:u,y:c+.1,z:p,vx:Math.cos(v)*d,vy:(3+a()*4)*f,vz:Math.sin(v)*d,age:0,life:1.5,s:.08+a()*.14,c:a()<.3?"#d7f3ff":"#ffffff"})}l.ring(u,c,p,2.2,1.2,.9)},confetti(u,c,p,m=80,f=4){const h=["#ff5d8f","#ffd23f","#46b8f0","#7cc94a","#b46fd6","#ff8a3d"];for(let v=0;v<m;v++)s.spawn({x:u+(a()-.5)*f,y:c+a()*2,z:p+(a()-.5)*f,vx:(a()-.5)*6,vy:5+a()*7,vz:(a()-.5)*6,age:0,life:3+a()*1.5,s:.16+a()*.1,c:h[v%h.length],rx:a()*6,ry:a()*6,sx:(a()-.5)*14,sy:(a()-.5)*14})},stars(u,c,p,m=8){for(let f=0;f<m;f++){const h=f/m*Math.PI*2;r.spawn({x:u,y:c,z:p,vx:Math.cos(h)*3,vy:2+a()*2,vz:Math.sin(h)*3,age:0,life:.8,s:.18,c:f%2?"#ffd23f":"#ffffff"})}},shadow:o,update(u){e.flush((c,p)=>{c.age+=u;const m=Math.exp(-2.2*u);c.vx*=m,c.vz*=m,c.vy=c.vy*m+.35*u,c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u;const f=c.age/c.life,h=f<.18?f/.18:1,v=f>.7?1-(f-.7)/.3:1,d=(c.s0+(c.s1-c.s0)*Math.min(1,f*2.2))*h*Math.max(0,v);Tn.compose(Os.set(c.x,c.y,c.z),ks.setFromEuler(wa.set(c.rot,c.rot*.7,0)),zs.set(d,d*.9,d)),e.mesh.setMatrixAt(p,Tn),e.mesh.setColorAt(p,Ys.set(c.c))}),e.items=e.items.filter(c=>c.age<c.life),t.flush((c,p)=>{c.age+=u;const m=c.age/c.life,f=c.s0+(c.s1-c.s0)*(1-(1-m)*(1-m));Tn.compose(Os.set(c.x,c.y,c.z),ks.identity(),zs.set(f,1,f)),t.mesh.setMatrixAt(p,Tn),t.alpha.setX(p,c.a*(1-m))}),t.items=t.items.filter(c=>c.age<c.life),i.flush((c,p)=>{c.age+=u,c.vy-=16*u,c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u;const m=c.s*Math.max(0,1-c.age/c.life);Tn.compose(Os.set(c.x,c.y,c.z),ks.identity(),zs.set(m,m,m)),i.mesh.setMatrixAt(p,Tn),i.mesh.setColorAt(p,Ys.set(c.c))}),i.items=i.items.filter(c=>c.age<c.life&&c.y>-3),s.flush((c,p)=>{c.age+=u,c.vy-=9*u;const m=Math.exp(-1.6*u);c.vx*=m,c.vz*=m,c.vy=Math.max(c.vy,-2.4),c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u,c.rx+=c.sx*u,c.ry+=c.sy*u;const f=c.s*Math.min(1,(c.life-c.age)*2);Tn.compose(Os.set(c.x,c.y,c.z),ks.setFromEuler(wa.set(c.rx,c.ry,0)),zs.set(f,f,f)),s.mesh.setMatrixAt(p,Tn),s.mesh.setColorAt(p,Ys.set(c.c))}),s.items=s.items.filter(c=>c.age<c.life),r.flush((c,p)=>{c.age+=u,c.vy-=6*u,c.x+=c.vx*u,c.y+=c.vy*u,c.z+=c.vz*u;const m=c.s*(1-c.age/c.life);Tn.compose(Os.set(c.x,c.y,c.z),ks.setFromEuler(wa.set(c.age*8,c.age*5,0)),zs.set(m,m*1.6,m)),r.mesh.setMatrixAt(p,Tn),r.mesh.setColorAt(p,Ys.set(c.c))}),r.items=r.items.filter(c=>c.age<c.life)},clear(){for(const u of[e,t,i,s,r])u.items.length=0},dispose(){for(const u of[e,t,i,s,r])u.mesh.removeFromParent(),u.mesh.geometry.dispose(),u.mesh.dispose();o.removeFromParent()}};return l}const Di=[{id:"hippo",name:"Bobo",kind:"Hippopotame",main:"#9d8fc4",belly:"#c9bfe6"},{id:"capy",name:"Capi",kind:"Capybara",main:"#e0975a",belly:"#f2bf8a"},{id:"frog",name:"Gloup",kind:"Grenouille",main:"#7cc94a",belly:"#e4f08a"},{id:"walrus",name:"Morso",kind:"Morse",main:"#5d8fd0",belly:"#a9c8ef"},{id:"bear",name:"Nono",kind:"Ours",main:"#6e5a52",belly:"#b89a84",lvl:2},{id:"pig",name:"Groin",kind:"Cochon",main:"#f39bb0",belly:"#ffd0da",lvl:4}],rl=["#9d8fc4","#e0975a","#7cc94a","#5d8fd0","#6e5a52","#f39bb0","#f2c94c","#e8605a","#4fc6b8","#8a8f9c","#b46fd6","#f4f1ea"],uf=[{id:"none",name:"Aucun"},{id:"cap",name:"Casquette"},{id:"party",name:"Chapeau de fête"},{id:"flower",name:"Fleur"},{id:"bucket",name:"Bob de pêcheur",lvl:2},{id:"crown",name:"Couronne",lvl:3},{id:"viking",name:"Casque viking",lvl:5},{id:"propeller",name:"Casquette à hélice",lvl:6},{id:"chef",name:"Toque",lvl:7},{id:"bow",name:"Nœud",lvl:1}],hf=[{id:"none",name:"Aucun"},{id:"shades",name:"Lunettes de soleil"},{id:"bowtie",name:"Nœud papillon",lvl:2},{id:"scarf",name:"Écharpe",lvl:3}],xo=[{id:"green",name:"Classique",c:["#c4ef3f","#e2fb7a"]},{id:"pink",name:"Barbe à papa",c:["#ff8fd0","#ffc3e8"]},{id:"blue",name:"Menthe glaciale",c:["#7ad8ff","#c4f0ff"],lvl:2},{id:"violet",name:"Myrtille",c:["#b28bff","#d9c6ff"],lvl:3},{id:"gold",name:"Or",c:["#ffd23f","#fff09a"],lvl:6},{id:"rainbow",name:"Arc-en-ciel",c:["#ff6b6b","#ffd23f","#6be36b","#6bc8ff","#c08bff"],lvl:8}],jn=[{id:"wave",name:"Coucou",icon:"👋"},{id:"laugh",name:"Rire",icon:"😂"},{id:"dance",name:"Danse",icon:"🕺"},{id:"cheer",name:"Hourra",icon:"🎉"},{id:"angry",name:"Grrr",icon:"😤",lvl:2},{id:"love",name:"Bisou",icon:"😘",lvl:4}],ol=(n=0)=>({species:Di[n%4].id,color:Di[n%4].main,hat:["none","cap","party","flower"][n%4],extra:"none",gas:"green"}),cr=n=>Di.find(e=>e.id===n)||Di[0];function qu(n){const e=new Set;return n.map(t=>{let i=t.look||ol(0);const s=r=>r.species+r.color;if(e.has(s(i))){const r=rl.find(o=>!e.has(i.species+o)&&o!==i.color);r&&(i={...i,color:r})}return e.add(s(i)),{...t,look:i}})}const lr=n=>xo.find(e=>e.id===n)||xo[0],Wn="#fbfbf7",ts="#2a2230",Ea="#f28aa0";function Q_(n,e,t){const i=[],s=st(e,-.25),r=(o,a,l,u=.12,c=!0)=>{for(const p of[-1,1])i.push(Ie(u,Wn,[p*o,a,l]),Ie(u*.55,ts,[p*o,a+.005,l+u*.72]),Ie(u*.18,Wn,[p*o+.025,a+.04,l+u*1.05],0,1,6)),c&&i.push(ex(u*1.08,e,[p*o,a+.012,l]))};switch(n){case"hippo":i.push(Ie(.4,e,[0,.28,.02],0,[1.1,.92,1])),i.push(Ie(.3,e,[0,.12,.33],0,[1.32,.86,1]));for(const o of[-1,1])i.push(Ie(.05,s,[o*.12,.27,.6],0,[1,.7,1],8),Ie(.085,e,[o*.28,.62,-.02],0,[1,1.25,.6],10),Ie(.045,Ea,[o*.28,.63,.02],0,[1,1.2,.5],8));i.push(ht(.085,.1,.05,Wn,[-.09,-.05,.6]),ht(.085,.1,.05,Wn,[.09,-.05,.6])),r(.17,.44,.3);break;case"capy":i.push(Ie(.38,e,[0,.3,0],0,[1,.95,1.05])),i.push(Ie(.28,e,[0,.2,.34],0,[.95,.82,1.2])),i.push(Ie(.12,ts,[0,.3,.64],0,[1.3,.6,.55],10));for(const o of[-1,1])i.push(Ie(.075,s,[o*.24,.6,-.08],0,[1,1,.6],8));r(.2,.44,.24,.1);break;case"frog":i.push(Ie(.42,e,[0,.24,.04],0,[1.22,.78,1])),i.push(Ie(.3,t,[0,.1,.16],0,[1.15,.5,1]));for(const o of[-1,1])i.push(Ie(.17,e,[o*.21,.5,.16])),i.push(Ie(.07,Ea,[o*.3,.17,.36],0,[1,.6,.5],8));i.push(Qs(.2,.022,ts,[0,.12,.34],[Math.PI/2+.25,0,Math.PI],[1.25,1,1],Math.PI)),r(.21,.55,.25,.13);break;case"walrus":i.push(Ie(.4,e,[0,.28,.02],0,[1.08,.95,1]));for(const o of[-1,1]){i.push(Ie(.17,t,[o*.11,.14,.36],0,[1,.85,.9])),i.push(nn(.045,.32,Wn,[o*.1,-.08,.44],[Math.PI+.12,0,-o*.1],1,8));for(let a=0;a<3;a++)i.push(Ie(.018,ts,[o*(.08+a*.05),.16-a*.025,.5],0,1,6))}i.push(Ie(.075,Ea,[0,.25,.48],0,[1.2,.9,1],10)),r(.16,.45,.3,.11);break;case"bear":i.push(Ie(.4,e,[0,.3,.02],0,[1.06,.95,1])),i.push(Ie(.2,t,[0,.15,.32],0,[1.15,.85,1])),i.push(Ie(.075,ts,[0,.24,.5],0,[1.3,.9,1],10));for(const o of[-1,1])i.push(Ie(.13,e,[o*.3,.6,-.02],0,[1,1,.55]),Ie(.075,t,[o*.3,.6,.04],0,[1,1,.4],10));r(.16,.42,.3,.1);break;case"pig":i.push(Ie(.4,e,[0,.28,.02],0,[1.08,.95,1])),i.push(Ne(.15,.16,.14,st(e,.15),[0,.2,.4],[Math.PI/2,0,0]));for(const o of[-1,1])i.push(Ie(.035,ts,[o*.055,.2,.48],0,[1,1.3,.6],8)),i.push(nn(.12,.2,e,[o*.25,.62,0],[.5,0,-o*.5],[1,1,.5]));r(.17,.43,.3,.1);break}return i}function ex(n,e,t){const i=new Ts(n,14,8,0,Math.PI*2,0,Math.PI*.42);return i.rotateX(.62),i.translate(t[0],t[1],t[2]),De(i,e)}function tx(n){const e=[];switch(n){case"cap":e.push(Ie(.3,"#e8463c",[0,0,0],0,[1,.55,1]),Ne(.22,.24,.03,"#e8463c",[0,-.01,.26],0,[1,1,1.2]),Ie(.05,Wn,[0,.16,0],0,1,8));break;case"party":e.push(nn(.18,.48,"#46b8f0",[0,.2,0]),Qs(.18,.03,"#ffd23f",[0,-.03,0],[Math.PI/2,0,0]),Ie(.07,"#ff5d8f",[0,.46,0],0,1,10));for(let t=0;t<3;t++)e.push(Qs(.15-t*.045,.022,"#ff5d8f",[0,.06+t*.12,0],[Math.PI/2,0,0]));break;case"flower":for(let t=0;t<6;t++){const i=t/6*Math.PI*2;e.push(Ie(.09,"#ffffff",[Math.cos(i)*.11,.02,Math.sin(i)*.11],0,[1,.45,1],10))}e.push(Ie(.07,"#ffcf3f",[0,.05,0],0,[1,.6,1],10));break;case"bucket":e.push(Ne(.22,.27,.2,"#e9d9a6",[0,.06,0]),Ne(.4,.4,.03,"#d9c48c",[0,-.04,0]),Ne(.225,.225,.05,"#5d8a4a",[0,.02,0]));break;case"crown":e.push(Ne(.24,.22,.16,"#f6c33b",[0,.04,0],0,1,16));for(let t=0;t<6;t++){const i=t/6*Math.PI*2;e.push(nn(.06,.16,"#f6c33b",[Math.cos(i)*.2,.2,Math.sin(i)*.2],0,1,8),Ie(.035,t%2?"#e8463c":"#46b8f0",[Math.cos(i)*.23,.06,Math.sin(i)*.23],0,1,8))}break;case"viking":e.push(Ie(.31,"#a7adb8",[0,-.02,0],0,[1,.7,1]),Qs(.3,.035,"#8a6a42",[0,-.04,0],[Math.PI/2,0,0]));for(const t of[-1,1])e.push(nn(.07,.3,"#fff3d6",[t*.33,.12,0],[0,0,-t*.9],1,10));break;case"propeller":e.push(Ie(.3,"#4aa3f0",[0,0,0],0,[1,.55,1]),Ne(.22,.24,.03,"#ffd23f",[0,-.01,.26],0,[1,1,1.2]),Ne(.02,.02,.14,"#888",[0,.2,0],0,1,6));break;case"chef":e.push(Ne(.22,.22,.22,Wn,[0,.08,0]));for(let t=0;t<5;t++){const i=t/5*Math.PI*2;e.push(Ie(.13,Wn,[Math.cos(i)*.12,.26,Math.sin(i)*.12]))}e.push(Ie(.14,Wn,[0,.32,0]));break;case"bow":for(const t of[-1,1])e.push(nn(.1,.2,"#ff5d8f",[t*.1,0,0],[0,0,t*Math.PI/2],[1,1,.6],10));e.push(Ie(.06,"#e8467a",[0,0,0],0,1,10));break}return e}function nx(n,e){const t=[];if(n==="shades"){const i=e==="frog"?.55:.44,s=e==="frog"?.4:.42,r=e==="frog"?.21:.17;for(const o of[-1,1])t.push(ht(.2,.12,.04,"#1d1d26",[o*r,i,s],[0,o*.15,0]));t.push(ht(.16,.03,.03,"#1d1d26",[0,i+.03,s+.02]))}return t}let Aa=new Map;function Hs(n,e){return Aa.has(n)||Aa.set(n,je(e())),Aa.get(n)}function Lc(n){const e=cr(n.species).id,t=n.color||cr(e).main,i=st(t,.38),s=Dn(),r=new dt;r.name="pouf";const o=new dt;r.add(o);const a=tt(Hs(`body:${t}:${n.extra}`,()=>{const w=[[0,.02],[.3,.03],[.48,.12],[.58,.28],[.61,.45],[.58,.62],[.5,.8],[.38,.95],[.22,1.05],[0,1.08]].map(([T,U])=>new ye(T,U)),b=new Ro(w,20);b.scale(1,1,.94);const _=[b,Ie(.42,i,[0,.48,.26],0,[1,1.15,.55]),Ie(.31,t,[-.17,.42,-.36],0,[1,1,.9]),Ie(.31,t,[.17,.42,-.36],0,[1,1,.9]),Ie(.09,st(t,-.1),[0,.34,-.62],0,[1,1,1],8)];return De(b,t),n.extra==="bowtie"&&_.push(nn(.09,.16,"#e8463c",[-.08,.98,.3],[0,0,Math.PI/2],[1,1,.6],8),nn(.09,.16,"#e8463c",[.08,.98,.3],[0,0,-Math.PI/2],[1,1,.6],8),Ie(.05,"#c4302a",[0,.98,.33],0,1,8)),n.extra==="scarf"&&_.push(Qs(.33,.09,"#e8463c",[0,.96,0],[Math.PI/2,0,0],[1,1,.9]),Fs(.07,.25,"#e8463c",[.18,.8,.3],[.3,0,.2])),_}),s);_t(a,.03),o.add(a);const l=new dt;l.position.set(0,.98,.04),o.add(l);const u=tt(Hs(`head:${e}:${t}:${n.extra}`,()=>[...Q_(e,t,i),...nx(n.extra,e)]),s);_t(u,.026),l.add(u);let c=null;if(n.hat&&n.hat!=="none"){const w=tt(Hs("hat:"+n.hat,()=>tx(n.hat)),s);_t(w,.02);const b=e==="frog"?.58:.66;w.position.set(0,n.hat==="flower"||n.hat==="bow"?b-.02:b,0),(n.hat==="flower"||n.hat==="bow")&&(w.position.x=.2,w.rotation.z=-.4),l.add(w),n.hat==="propeller"&&(c=tt(Hs("prop",()=>[ht(.5,.015,.07,"#e8463c",[0,0,0]),ht(.07,.015,.5,"#ffd23f",[0,0,0])]),s),c.position.set(0,.28,0),w.add(c))}const p=(w,b,_,T,U)=>{const S=new dt;S.position.set(_,T,U);const A=tt(Hs(w,b),s);return _t(A,.022),S.add(A),o.add(S),S},m=p("arm:"+t,()=>[Fs(.1,.3,t,[0,-.2,0]),Ie(.12,st(t,.12),[0,-.42,.02])],.5,.78,.1),f=p("arm:"+t,()=>[Fs(.1,.3,t,[0,-.2,0]),Ie(.12,st(t,.12),[0,-.42,.02])],-.5,.78,.1),h=p("leg:"+t,()=>[Fs(.13,.1,t,[0,-.08,0]),Ie(.16,st(t,-.08),[0,-.17,.06],0,[1,.55,1.3])],.25,.2,0),v=p("leg:"+t,()=>[Fs(.13,.1,t,[0,-.08,0]),Ie(.16,st(t,-.08),[0,-.17,.06],0,[1,.55,1.3])],-.25,.2,0);o.position.y=.2;let d=Math.random()*10,g=0,x=0,y=null;const M={root:r,look:n,head:l,hips:o,butt(w=new F){return w.set(0,.62,-.72).applyMatrix4(o.matrixWorld)},emote(w){y=w,x=0},update(w,b={}){d+=w;const _=b.run||0,T=Math.abs(_),U=b.mode||"stand";g=b.puff?Math.min(1,g+w*6):Math.max(0,g-w*4),y&&(x+=w,(x>2.6||T>.3&&x>.4||b.puff)&&(y=null));let S=.2,A=0,k=0,H=0,G=1,O=1,I=-1.15,W=-1.15,D=.25,re=-.25,ce=0,he=0,Q=0,me=0;if(U==="raft"||U==="stand"||U==="menu"){const K=Math.sin(d*2.2)*.02;if(O=1+K,G=1-K*.6,U!=="raft"&&(I=W=-.25,D=.35,re=-.35),T>.05){const j=d*14;S+=Math.abs(Math.sin(j))*.09*T,k=Math.sin(j)*.08*T,ce=Math.sin(j)*.7*T,he=-ce,H=-_*.5}if(g>0){const j=Math.sin(d*38)*.06*g;O-=.1*g-j,G+=.07*g+j*.5,A+=.28*g,Q=-.15*g}if(b.big>0&&(O-=b.big*.35,G+=b.big*.25,A+=b.big*.4),y){const j=Math.min(1,x*5)*Math.min(1,(2.6-x)*4);y==="wave"&&(W=-2.9*j+W*(1-j),re=(-.4+Math.sin(d*12)*.45)*j,me=.15*j),y==="laugh"&&(A=-.25*j,Q=-.4*j,O+=Math.sin(d*30)*.05*j,k=Math.sin(d*15)*.06*j),y==="dance"&&(k=Math.sin(d*8)*.3*j,S+=Math.abs(Math.sin(d*8))*.15*j,I=-2.6*j*(.5+.5*Math.sin(d*8)),W=-2.6*j*(.5-.5*Math.sin(d*8)),H=Math.sin(d*4)*.5*j),y==="cheer"&&(I=W=-2.9*j,D=.5*j,re=-.5*j,S+=Math.abs(Math.sin(d*9))*.25*j),y==="angry"&&(A=.2*j,O+=Math.sin(d*40)*.03*j,D=1.2*j,re=-1.2*j,I=W=-.6*j,Q=.2*j),y==="love"&&(I=W=-1.9*j,D=-.3*j,re=.3*j,me=Math.sin(d*3)*.2*j,H=Math.sin(d*3)*.2*j)}}else U==="air"?(I=-2.5,W=-2.5,D=.7,re=-.7,ce=.9,he=.5,A=-.1,Q=-.15,b.big>0&&(O-=b.big*.25,G+=b.big*.2)):U==="stun"?(k=Math.sin(d*14)*.35,A=.25,me=Math.sin(d*9)*.4,I=-1.8,W=-.4,D=1.1,re=-1.1,ce=Math.sin(d*16)*.6,he=-ce):U==="fly"?(I=-2.8+Math.sin(d*25)*.5,W=-2.8-Math.sin(d*25)*.5,D=1,re=-1,ce=Math.sin(d*20),he=-ce,Q=-.3):U==="swim"&&(A=.9,S=.05,I=-2.2+Math.sin(d*7)*1.2,W=-2.2-Math.sin(d*7)*1.2,D=.8,re=-.8,ce=Math.sin(d*9)*.5,he=-ce,Q=-.8);o.position.y=S,o.rotation.set(A,H,k),o.scale.set(G,O,G),l.rotation.set(Q,0,me),m.rotation.set(I,0,D),f.rotation.set(W,0,re),h.rotation.x=ce,v.rotation.x=he,c&&(c.rotation.y+=w*(12+T*20))},dispose(){r.removeFromParent()}};return M.update(0),M}const qr=1.58,ix=.3,ri=new F,un=new F,sx=(n,e,t)=>n+Math.atan2(Math.sin(e-n),Math.cos(e-n))*t;function rx(n,e){const t=R("div.pf-tags");e.append(t);let i=null,s=null,r=null,o=null,a=null,l=null;const u=new Map,c={mode:"orbit",yaw:0,user:0,pos:new F,look:new F,shake:0,t:0,focusId:null,intro:0},p={x:0,z:0,y:0,yaw:0,air:3,pop:-1,s:0,inv:0},m={},f={get track(){return a},get course(){return l},get fx(){return o},get raft(){return r},rs:p,crew:u,cam:c,load(h){if(l?.id!==h.id){f.unload(),l=h,a=A_(h),n.setTheme(h.theme),i=B_(a,h),n.scene.add(i.root),s=J_(a,h),n.scene.add(s.root),r=K_(),n.scene.add(r.root),o=Z_(n.scene),n.scene.add(o.shadow),f.placeAt(h.spawn);for(const v of u.values())r.body.add(v.char.root)}},unload(){if(l){for(const h of u.values())h.char.root.removeFromParent();o.dispose();for(const h of[i.root,s.root,r.root])h.removeFromParent(),h.traverse(v=>{v.geometry&&!v.geometry.userData.shared&&v.geometry.dispose()});l=null}},placeAt(h,v=0){a.world(h,v,m),Object.assign(p,{x:m.wx,z:m.wz,y:m.y,yaw:m.a,air:3,pop:-1,s:h,inv:0}),c.yaw=m.a,c.pos.set(m.wx-m.tx*10,m.y+6,m.wz-m.tz*10)},setCrew(h,v){const d=new Set(h.map(g=>g.id));for(const[g,x]of u)d.has(g)||(x.char.dispose(),x.tag.remove(),x.bubble.remove(),u.delete(g));for(const g of h){let x=u.get(g.id);const y=JSON.stringify(g.look);x&&x.key!==y&&(x.char.dispose(),x.char=Lc(g.look),r?.body.add(x.char.root),x.key=y),x||(x={char:Lc(g.look),key:y,a:(g.seat??u.size)*Math.PI/2+Math.PI/2,tag:R("div.pf-tag"),bubble:R("div.pf-bubble"),puff:!1,puffT:0,big:0,run:0,mode:"raft",fly:null},t.append(x.tag,x.bubble),r?.body.add(x.char.root),u.set(g.id,x)),x.name=g.name,x.me=g.id===v,x.look=g.look,x.tag.textContent=g.name,x.tag.classList.toggle("me",x.me)}},seatAngle(h){return u.get(h)?.a??0},emote(h,v){const d=u.get(h);if(!d)return;d.char.emote(v);const g=jn.find(x=>x.id===v);d.bubble.textContent=g?.icon||"",d.bubble.classList.remove("show"),d.bubble.offsetWidth,d.bubble.classList.add("show")},puffFrom(h,v=1){const d=u.get(h);if(!d||!o)return;const g=p.yaw+d.a,x=un.set(Math.cos(g),0,Math.sin(g));d.char.root.updateMatrixWorld(!0),o.puff(d.char.butt(ri),x,lr(d.look.gas).c,v),v>1.5&&(d.big=1)},throwCrew(){for(const h of u.values()){const v=p.yaw+h.a+(Math.random()-.5)*.8,d=4+Math.random()*3;h.fly={x:p.x+Math.cos(v)*qr,y:p.y+1,z:p.z+Math.sin(v)*qr,vx:Math.cos(v)*d,vy:8+Math.random()*3,vz:Math.sin(v)*d,spin:(Math.random()-.5)*14,swim:!1},n.scene.add(h.char.root)}},boardCrew(){for(const h of u.values())h.fly=null,r.body.add(h.char.root),h.char.root.rotation.set(0,0,0)},update(h,v){if(c.t+=h,!l)return;i.update(v),s.update(v);const d=Math.sin(c.t*2.1)*.06;r.root.position.set(p.x,p.y+d,p.z),r.root.rotation.y=-p.yaw;let g=0,x=0;for(const M of u.values())if(M.puff&&!M.fly){const w=M.a;g-=Math.cos(w),x-=Math.sin(w)}r.body.rotation.x+=(x*.07+Math.sin(c.t*1.3)*.025-r.body.rotation.x)*Math.min(1,h*4),r.body.rotation.z+=(-g*.07+Math.cos(c.t*1.1)*.025-r.body.rotation.z)*Math.min(1,h*4),r.setState(p.air,p.pop,c.t),r.body.visible=p.pop<0||p.pop<.4,p.inv>0&&p.pop<0&&(r.body.visible=Math.floor(c.t*12)%2===0||p.inv<.2),o.shadow.position.set(p.x,p.y+.03,p.z),o.shadow.scale.setScalar(oi*1.15),o.shadow.visible=p.pop<0;for(const[M,w]of u){const b=w.char;if(b.root.visible=c.mode!=="closeup"||M===c.focusId,w.fly){const _=w.fly;if(_.swim)_.y+=(a.at(Math.max(0,a.project(_.x,_.z,p.s).s),m).y-.55-_.y)*Math.min(1,h*5),Math.random()<h*2&&o.ring(_.x,_.y+.5,_.z,1.4,1,.6);else{_.vy-=18*h,_.x+=_.vx*h,_.y+=_.vy*h,_.z+=_.vz*h,b.root.rotation.x+=_.spin*h,b.root.rotation.z+=_.spin*.6*h;const T=a.at(Math.max(0,a.project(_.x,_.z,p.s).s),m).y;_.y<T&&_.vy<0&&(_.swim=!0,_.y=T,o.splash(_.x,T,_.z,14,.8),b.root.rotation.set(0,Math.random()*6,0))}b.root.position.set(_.x,_.y,_.z),b.update(h,{mode:_.swim?"swim":"fly"})}else b.root.position.set(Math.cos(w.a)*qr,ix,Math.sin(w.a)*qr),b.root.rotation.set(0,-w.a-Math.PI/2,0),w.big=Math.max(0,w.big-h*3),b.update(h,{mode:w.mode,run:w.run,puff:w.puff,big:w.big})}o.update(h);const y=n.camera;if(c.mode==="follow"){a.at(Math.min(a.length,Math.max(0,p.s)+7),m),c.yaw=sx(c.yaw,m.a,Math.min(1,h*1.6));const M=c.yaw+c.user,w=Math.sin(M),b=-Math.cos(M),_=11.5,T=6.8;let U=p.x-w*_,S=p.z-b*_,A=p.y+T;if(c.intro>0){const k=c.intro*c.intro*(3-2*c.intro);U-=w*9*k,S-=b*9*k,A+=16*k}c.pos.lerp(ri.set(U,A,S),Math.min(1,h*(c.intro>0?3:5))),c.look.lerp(un.set(p.x+w*4,p.y+1.2,p.z+b*4),Math.min(1,h*6))}else if(c.mode==="orbit"){const M=c.t*.12+c.user;c.pos.lerp(ri.set(p.x+Math.cos(M)*10,p.y+4.6,p.z+Math.sin(M)*10),Math.min(1,h*2)),c.look.lerp(un.set(p.x,p.y+1.3,p.z),Math.min(1,h*3))}else if(c.mode==="closeup"){const M=u.get(c.focusId);if(M){M.char.root.updateMatrixWorld(!0);const w=M.char.root.getWorldPosition(un),b=p.yaw+M.a,_=Math.cos(b),T=Math.sin(b),U=Math.sin(c.t*.4)*.35,S=w.x-_*3.1+T*U,A=w.z-T*3.1-_*U;c.pos.lerp(ri.set(S,w.y+1.25,A),Math.min(1,h*3)),c.look.lerp(un.set(w.x-T*.9,w.y+.85,w.z+_*.9),Math.min(1,h*4))}}else if(c.mode==="finish"){const M=c.t*.35;c.pos.lerp(ri.set(p.x+Math.cos(M)*8,p.y+3.6,p.z+Math.sin(M)*8),Math.min(1,h*2)),c.look.lerp(un.set(p.x,p.y+1,p.z),Math.min(1,h*3))}y.position.copy(c.pos),zc.settings.reduceMotion&&(c.shake=0),c.shake>0&&(c.shake=Math.max(0,c.shake-h*2.5),y.position.x+=(Math.random()-.5)*c.shake*.5,y.position.y+=(Math.random()-.5)*c.shake*.5),y.lookAt(c.look),n.focus(p.x,p.y,p.z)},updateTags(h,v){const d=n.camera;for(const g of u.values()){g.char.head.getWorldPosition(ri),ri.y+=.95,un.copy(ri).project(d);const x=un.z<1&&Math.abs(un.x)<1.1&&Math.abs(un.y)<1.1&&!(g.fly?.swim&&p.pop<0),y=(un.x*.5+.5)*h,M=(-un.y*.5+.5)*v,w=`translate(${y.toFixed(1)}px, ${M.toFixed(1)}px)`;g.tag.style.transform=w+" translate(-50%, -100%)",g.tag.style.opacity=x?1:0,g.bubble.style.transform=w+" translate(-50%, -190%)"}},showTags(h){t.classList.toggle("hidden",!h)},setVisible(h){for(const v of[i?.root,s?.root,r?.root,o?.shadow])v&&(v.visible=h);t.classList.toggle("hidden",!h)},dispose(){f.unload();for(const h of u.values())h.char.dispose();u.clear(),t.remove()}};return f}const Ta=.2;function ox(n,e){const t=new Set;let i=0,s=!1,r=0,o=0,a=null,l=!1,u=!1,c={mx:0,my:0,puff:!1,look:0};const p={};let m=!1;const f=Q=>{if(!m||Q.metaKey||Q.ctrlKey||Q.altKey)return;const me=Q.target?.tagName;if(!(me==="INPUT"||me==="TEXTAREA"))if(Q.type==="keydown"){if(!Q.repeat){(Q.code==="ShiftLeft"||Q.code==="ShiftRight"||Q.code==="KeyE")&&r++,Q.code==="Space"&&o++;const K=/^Digit([1-6])$/.exec(Q.code);K&&(a=jn[+K[1]-1]?.id||null)}t.add(Q.code),["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Tab"].includes(Q.code)&&Q.preventDefault()}else t.delete(Q.code)},h=()=>{t.clear(),s=!1},v=Q=>{if(!(!m||Q.pointerType==="touch")&&(Q.button===0&&(s=!0,o++),Q.button===2&&r++,!u&&Ht.device==="mouse"&&e.requestPointerLock&&!Lf))try{e.requestPointerLock()?.catch?.(()=>{})}catch{}},d=Q=>{Q.button===0&&(s=!1),Q.button},g=Q=>{u&&(i+=Q.movementX||0)},x=()=>{u=document.pointerLockElement===e};addEventListener("keydown",f),addEventListener("keyup",f),addEventListener("blur",h),e.addEventListener("pointerdown",v),addEventListener("pointerup",d),addEventListener("mousemove",g),document.addEventListener("pointerlockchange",x);const y=(Q,me)=>{try{Q.setPointerCapture(me)}catch{}},M=R("i"),w=R("div.pf-stick",M),b=R("button.pf-tbtn.puff",{type:"button"},R("b","POUF")),_=R("button.pf-tbtn.super",{type:"button"},R("b","SUPER")),T=R("button.pf-tbtn.emo",{type:"button"},"😀"),U=R("div.pf-emorow.hidden",jn.slice(0,4).map(Q=>R("button.pf-tbtn.mini",{type:"button",onclick:()=>{a=Q.id,U.classList.add("hidden")}},Q.icon))),S=R("button.pf-tbtn.pause",{type:"button","aria-label":"Pause",onclick:()=>{l=!0}},R("span","❚❚")),A=R("div.pf-touch",w,b,_,T,U,S);n.append(A);let k=null,H=0,G=0,O=null,I=0;w.addEventListener("pointerdown",Q=>{k=Q.pointerId;const me=w.getBoundingClientRect();H=me.left+me.width/2,G=me.top+me.height/2,y(w,Q.pointerId),W(Q),Q.preventDefault()});const W=Q=>{if(Q.pointerId!==k)return;const me=w.offsetWidth*.42;let K=(Q.clientX-H)/me,j=(Q.clientY-G)/me;const de=Math.hypot(K,j);de>1&&(K/=de,j/=de),c.mx=K,c.my=j,M.style.transform=`translate(${K*me}px, ${j*me}px)`};w.addEventListener("pointermove",W);const D=Q=>{Q.pointerId===k&&(k=null,c.mx=c.my=0,M.style.transform="")};w.addEventListener("pointerup",D),w.addEventListener("pointercancel",D),b.addEventListener("pointerdown",Q=>{c.puff=!0,o++,y(b,Q.pointerId),Q.preventDefault()});for(const Q of["pointerup","pointercancel","lostpointercapture"])b.addEventListener(Q,()=>{c.puff=!1});_.addEventListener("pointerdown",Q=>{r++,Q.preventDefault()}),T.addEventListener("click",()=>U.classList.toggle("hidden")),e.addEventListener("pointerdown",Q=>{Q.pointerType!=="touch"||!m||(O=Q.pointerId,I=Q.clientX)}),e.addEventListener("pointermove",Q=>{Q.pointerId===O&&(c.look+=Q.clientX-I,I=Q.clientX)});const re=Q=>{Q.pointerId===O&&(O=null)};e.addEventListener("pointerup",re),e.addEventListener("pointercancel",re);const ce=Q=>Math.abs(Q)<Ta?0:(Q-Math.sign(Q)*Ta)/(1-Ta);return{get locked(){return u},setPlaying(Q){m=Q,A.classList.toggle("on",Q),Q||(t.clear(),s=!1,c.puff=!1,c.mx=c.my=0,U.classList.add("hidden"),u&&document.exitPointerLock?.())},poll(Q){let me=0,K=0,j=0,de=!1,fe=!1,q=r,ee=o,ie=a,N=l;r=0,o=0,a=null,l=!1,(t.has("KeyA")||t.has("ArrowLeft"))&&(me-=1),(t.has("KeyD")||t.has("ArrowRight"))&&(me+=1),(t.has("KeyW")||t.has("ArrowUp"))&&(K-=1),(t.has("KeyS")||t.has("ArrowDown"))&&(K+=1),(t.has("Space")||s)&&(de=!0),t.has("KeyR")&&(fe=!0),j+=i*.0032,i=0,(c.mx||c.my)&&(me=c.mx,K=c.my),c.puff&&(de=!0),j+=c.look*.006,c.look=0;for(const L of Ht.pads()){if(!L?.connected||L.mapping!=="standard"&&L.buttons.length<12)continue;const Me=P=>!!(L.buttons[P]&&(L.buttons[P].pressed||L.buttons[P].value>.5)),ge=ce(L.axes[0]||0),Te=ce(L.axes[1]||0);Math.abs(ge)+Math.abs(Te)>Math.abs(me)+Math.abs(K)&&(me=ge,K=Te),Me(14)&&(me=-1),Me(15)&&(me=1),j+=ce(L.axes[2]||0)*Q*2.6,(Me(0)||Me(7))&&(de=!0);const ne=p[L.index]||{},Ce=P=>Me(P)&&!ne[P];(Ce(2)||Ce(5))&&q++,(Ce(0)||Ce(7))&&ee++,Me(3)&&(fe=!0),Ce(12)&&(ie="wave"),Ce(13)&&(ie="laugh"),Ce(1)&&(ie="cheer"),Ce(4)&&(ie="dance");const Se={};for(const P of[0,1,2,3,4,5,7,12,13])Se[P]=Me(P);p[L.index]=Se}const $=Math.hypot(me,K);return $>1&&(me/=$,K/=$),{mx:me,my:K,look:j,puff:de,jump:ee,sup:q,emote:ie,respawn:fe,pause:N}},dispose(){removeEventListener("keydown",f),removeEventListener("keyup",f),removeEventListener("blur",h),e.removeEventListener("pointerdown",v),removeEventListener("pointerup",d),removeEventListener("mousemove",g),document.removeEventListener("pointerlockchange",x),u&&document.exitPointerLock?.(),A.remove()}}}let Ve=null,Ai,Ms,$n,yo,Ra=0,tr=0,ns=0,ff=112,Ic=!1;const Mn=Math.random;function lo(){if(Ve)return!0;if(Al.init(),Ve=Al.ctx,!Ve)return!1;Ai=Ve.createGain(),Ai.gain.value=.9;const n=Ve.createDynamicsCompressor();n.threshold.value=-16,n.ratio.value=4,Ai.connect(n),n.connect(Ve.destination),Ms=Ve.createGain(),Ms.connect(Ai),$n=Ve.createGain(),$n.gain.value=0,$n.connect(Ai);const e=Ve.sampleRate*2;yo=Ve.createBuffer(1,e,Ve.sampleRate);const t=yo.getChannelData(0);for(let i=0;i<e;i++)t[i]=Mn()*2-1;return Uc(),!0}function Uc(){if(!Ve)return;const n=zc.settings;Ms.gain.setTargetAtTime(n.sfx?n.sfxVol*1.1:0,Ve.currentTime,.05),$n.gain.setTargetAtTime(Ic&&n.music?n.musicVol*.75:0,Ve.currentTime,.3)}const qt=()=>lo()&&Ve.state==="running",$t=()=>Ve.currentTime;function Fi(n,e,t,i,s){n.gain.setValueAtTime(1e-4,e),n.gain.linearRampToValueAtTime(s,e+t),n.gain.exponentialRampToValueAtTime(1e-4,e+t+i)}function gt(n,e,t,i,s,{f2:r,dest:o=Ms,a=.005,pan:l=0}={}){const u=Ve.createOscillator(),c=Ve.createGain();return u.type=n,u.frequency.setValueAtTime(e,t),r&&u.frequency.exponentialRampToValueAtTime(r,t+i),Fi(c,t,a,i,s),u.connect(c),al(c,o,l),u.start(t),u.stop(t+a+i+.05),u}function yn(n,e,t,{type:i="lowpass",f:s=1200,f2:r,q:o=1,dest:a=Ms,a:l=.005,pan:u=0}={}){const c=Ve.createBufferSource();c.buffer=yo,c.loop=!0;const p=Ve.createBiquadFilter();p.type=i,p.frequency.setValueAtTime(s,n),p.Q.value=o,r&&p.frequency.exponentialRampToValueAtTime(r,n+e);const m=Ve.createGain();Fi(m,n,l,e,t),c.connect(p),p.connect(m),al(m,a,u),c.start(n,Mn()*1.5),c.stop(n+l+e+.05)}function al(n,e,t){if(t&&Ve.createStereoPanner){const i=Ve.createStereoPanner();i.pan.value=Math.max(-1,Math.min(1,t)),n.connect(i),i.connect(e)}else n.connect(e)}const Xe={init:lo,applySettings:Uc,puff(n=1,{pitch:e=1,pan:t=0,vol:i=1}={}){if(!qt())return;const s=$t()+.005,r=.12+n*.2+Mn()*.08,o=(55+Mn()*40)*e*(n<.7?1.8:1),a=Ve.createOscillator(),l=Ve.createOscillator(),u=Ve.createGain(),c=Ve.createGain(),p=Ve.createBiquadFilter();a.type="sawtooth",a.frequency.setValueAtTime(o*1.25,s),a.frequency.exponentialRampToValueAtTime(o*(.7+Mn()*.3),s+r),l.type="square",l.frequency.setValueAtTime(18+Mn()*22,s),l.frequency.linearRampToValueAtTime(10+Mn()*10,s+r);const m=Ve.createGain();m.gain.value=.6,u.gain.value=.4,l.connect(u),u.connect(m.gain),p.type="lowpass",p.frequency.setValueAtTime(650+n*300,s),p.Q.value=3,Fi(c,s,.015,r,.32*i*Math.min(1.4,.5+n*.5)),a.connect(p),p.connect(m),m.connect(c),al(c,Ms,t),a.start(s),l.start(s),a.stop(s+r+.1),l.stop(s+r+.1),yn(s,r*.9,.06*i*n,{type:"bandpass",f:380,f2:220,q:.8,pan:t})},sputter(){if(!qt())return;const n=$t();for(let e=0;e<3;e++)gt("square",90+Mn()*30,n+e*.07,.05,.06,{f2:60})},bigPuff(n=0){if(!qt())return;Xe.puff(2,{pitch:.8,pan:n});const e=$t();yn(e,.7,.18,{f:900,f2:200,pan:n}),gt("sine",120,e,.4,.25,{f2:45,pan:n})},splash(n=1,e=0){if(!qt())return;const t=$t();yn(t,.5,.22*n,{f:2600,f2:500,pan:e}),yn(t+.05,.35,.1*n,{type:"highpass",f:3e3,pan:e}),gt("sine",300,t,.15,.08*n,{f2:90,pan:e})},bump(n=1){if(!qt())return;const e=$t();gt("sine",160,e,.22,.3*Math.min(1,n/4),{f2:60}),yn(e,.15,.08*Math.min(1,n/4),{f:600})},hit(){if(!qt())return;const n=$t();gt("triangle",620,n,.5,.22,{f2:140}),gt("sine",300,n+.02,.35,.15,{f2:90}),yn(n+.05,1.1,.08,{type:"highpass",f:5e3,f2:2500})},pop(){if(!qt())return;const n=$t();yn(n,.25,.55,{f:4e3,f2:300,a:.002}),gt("sine",180,n,.3,.5,{f2:40,a:.002}),gt("square",900,n+.08,.5,.06,{f2:120});for(let e=0;e<4;e++)Xe.splash(.6,(Mn()-.5)*1.4)},checkpoint(){if(!qt())return;const n=$t();[72,76,79,84].forEach((t,i)=>{const s=440*2**((t-69)/12);gt("triangle",s,n+i*.09,.35,.16),gt("sine",s*2,n+i*.09,.25,.05)}),yn(n+.3,.6,.05,{type:"highpass",f:6e3})},beep(n=!1){if(!qt())return;const e=$t(),t=n?1046:523;gt("square",t,e,n?.5:.18,.1),gt("sine",t*2,e,n?.5:.15,.08)},fanfare(){if(!qt())return;const n=$t(),e=[[60,0],[64,.12],[67,.24],[72,.36],[67,.55],[72,.7],[76,.82]];e.forEach(([t,i],s)=>{const r=440*2**((t-69)/12);gt("square",r,n+i,s===e.length-1?.9:.16,.07),gt("triangle",r,n+i,s===e.length-1?1:.2,.14)});for(let t=0;t<6;t++)yn(n+.8+t*.08,.2,.05,{type:"highpass",f:5e3+Mn()*3e3})},slam(n=1,e=0){if(!qt()||n<.03)return;const t=$t();yn(t,.2,.3*n,{type:"bandpass",f:900,q:2,pan:e}),gt("square",70,t,.25,.15*n,{f2:40,pan:e}),gt("triangle",1800,t,.3,.04*n,{f2:1700,pan:e})},whoosh(n=1,e=0){!qt()||n<.03||yn($t(),.5,.1*n,{type:"bandpass",f:400,f2:1400,q:1.5,pan:e,a:.2})},emote(n){if(!qt())return;const e=$t();if(n==="laugh")for(let t=0;t<4;t++)gt("triangle",520-t*30,e+t*.11,.08,.1,{f2:380});else n==="cheer"?[0,.1,.2].forEach((t,i)=>gt("triangle",660*(1+i*.25),e+t,.18,.1)):n==="angry"?gt("sawtooth",140,e,.4,.08,{f2:90}):n==="love"?(gt("sine",880,e,.12,.1,{f2:1320}),gt("sine",1320,e+.14,.2,.08,{f2:990})):gt("triangle",700,e,.15,.1,{f2:900})},ui(n="move"){if(!qt())return;const e=$t();n==="ok"?(gt("triangle",880,e,.12,.1),gt("triangle",1320,e+.05,.15,.08)):gt("triangle",1200,e,.05,.05)},music(n,{fast:e=!1}={}){lo()&&(n=!1,Ic=n,ff=e?124:104,Uc(),clearInterval(Ra),n&&(tr=Math.max(tr,Ve.currentTime+.1),Ra=setInterval(ux,60)))},stop(){clearInterval(Ra),Ic=!1,Ve&&$n.gain.setTargetAtTime(0,Ve.currentTime,.2)},async peak(n=400){if(!lo())return 0;const e=Ve.createAnalyser();e.fftSize=2048,Ai.connect(e);const t=new Float32Array(e.fftSize);let i=0;const s=performance.now()+n;for(;performance.now()<s;){e.getFloatTimeDomainData(t);for(const r of t)i=Math.max(i,Math.abs(r));await new Promise(r=>setTimeout(r,20))}return Ai.disconnect(e),i}},ax=[[60,64,67],[55,59,62],[57,60,64],[53,57,60]],cx=[48,43,45,41],lx=[76,null,79,76,74,null,72,null,74,76,null,72,69,null,67,null];function ux(){if(!Ve||Ve.state!=="running")return;const n=60/ff/2;for(;tr<Ve.currentTime+.25;){const e=Math.floor(ns/8)%4,t=ns%8,i=tr,s=o=>440*2**((o-69)/12);(t%2===1||t===0)&&ax[e].forEach((o,a)=>hx(s(o+12),i+a*.012,.22,t===0?.05:.035)),(t===0||t===3||t===4||t===6)&&fx(s(cx[e]+(t===6?7:0)),i,n*1.6);const r=lx[(ns+Math.floor(ns/32)%2*8)%16];r&&Math.floor(ns/32)%4!==3&&dx(s(r),i),px(i,t%2?.02:.035),tr+=n,ns++}}function hx(n,e,t,i){const s=Ve.createOscillator(),r=Ve.createGain(),o=Ve.createBiquadFilter();s.type="triangle",s.frequency.value=n,o.type="lowpass",o.frequency.setValueAtTime(3e3,e),o.frequency.exponentialRampToValueAtTime(600,e+t),Fi(r,e,.003,t,i),s.connect(o),o.connect(r),r.connect($n),s.start(e),s.stop(e+t+.05)}function fx(n,e,t){const i=Ve.createOscillator(),s=Ve.createGain();i.type="sine",i.frequency.value=n,Fi(s,e,.01,t,.16),i.connect(s),s.connect($n),i.start(e),i.stop(e+t+.05)}function dx(n,e){const t=Ve.createOscillator(),i=Ve.createOscillator(),s=Ve.createGain();t.type="sine",i.type="sine",t.frequency.value=n,i.frequency.value=n*4,Fi(s,e,.002,.35,.07);const r=Ve.createGain();r.gain.value=.25,t.connect(s),i.connect(r),r.connect(s),s.connect($n),t.start(e),i.start(e),t.stop(e+.4),i.stop(e+.4)}function px(n,e){const t=Ve.createBufferSource();t.buffer=yo;const i=Ve.createBiquadFilter();i.type="highpass",i.frequency.value=7e3;const s=Ve.createGain();Fi(s,n,.004,.05,e),t.connect(i),i.connect(s),s.connect($n),t.start(n,Mn()),t.stop(n+.08)}const $r={clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9.5" fill="#fff"/><path d="M12 6.5V12l3.6 2.2" stroke="#33465c" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>',pop:'<svg viewBox="0 0 24 24"><path d="M12 2.5l2 5.2 5.4-2-2.5 5 4.6 3-5.5.8.6 5.6L12 16.4 7.4 20l.6-5.6-5.5-.8 4.6-3-2.5-5 5.4 2z" fill="#fff"/></svg>',raft:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" fill="#f7dcb8" stroke="#2b2230" stroke-width="1.6"/><circle cx="12" cy="12" r="5.6" fill="#9fd273" stroke="#2b2230" stroke-width="1.2"/></svg>',flag:'<svg viewBox="0 0 24 24"><path d="M5 21V3" stroke="#fff" stroke-width="2"/><path d="M6 4h12l-3 4 3 4H6z" fill="#fff"/><path d="M6 4h3v4H6zM12 4h3v4h-3zM9 8h3v4H9zM15 8h3l-1 2 1 2h-3z" fill="#2b2230"/></svg>'},wn=n=>{n=Math.max(0,n);const e=Math.floor(n/60),t=n-e*60;return`${String(e).padStart(2,"0")}:${t.toFixed(2).padStart(5,"0")}`},mx=["ps","xbox","nintendo","generic"];function df(n,e,{mode:t="raft"}={}){const i=t==="race"?e.finishZ:e.finish||1,s=t==="survival"?[]:e.checkpoints.map(I=>R("i.tick",{style:{left:(typeof I=="number"?I:I.p[2])/i*100+"%"}})),r=R("b.marker"),o=R("span.fill"),a=R("div.pf-prog",R("div.line",o,...s,r),R("span.flag",{html:$r.flag})),l=[R("i"),R("i"),R("i")],u=R("div.pf-air",R("span.ic",{html:$r.raft}),R("div.segs",l)),c=R("span"),p=R("div.pf-pill.timer",R("span.ic",{html:$r.clock}),c),m=R("span","0"),f=R("div.pf-pill.pops",R("span.ic",{html:$r.pop}),m),h=R("i"),v=R("div.pf-gas",R("div.bar",h),R("small",t==="raft"?"GAZ":"POUF")),d=R("i.hold"),g=R("div.pf-key"),x=R("div.pf-key",d),y=R("div.pf-keys",g,x),M=R("div.pf-banner"),w=R("div.pf-sub"),b=R("div.pf-toast"),_=R("div.pf-net"),T=R("span"),U=R("div.pf-pill.rank",T),S=R(`div.pf-hud.hidden.mode-${t}`,a,u,p,f,U,v,y,M,w,b,_);n.append(S);let A=0,k=0,H="";function G(){const I=Ht.device;if(I===H)return;H=I;const W=mx.includes(I);g.replaceChildren(W?Ln("options"):R("span.gl.key","Échap"),R("span","PAUSE")),x.replaceChildren(d,W?Ln("triangle"):R("span.gl.key","R"),R("span","RÉAPPARAÎTRE")),x.classList.toggle("hidden",t==="survival"),y.classList.toggle("hidden",I==="touch")}const O={el:S,show(I){S.classList.toggle("hidden",!I),G()},rank(I){T.textContent!==I&&(T.textContent=I,U.classList.remove("bump"),U.offsetWidth,U.classList.add("bump"))},progress(I,W){const D=Math.max(0,Math.min(1,I/i));r.style.left=D*100+"%",o.style.width=D*100+"%",s.forEach((re,ce)=>re.classList.toggle("done",ce<W))},air(I,W){l.forEach((D,re)=>D.classList.toggle("on",re<I)),u.classList.toggle("low",I<=1),W&&(u.classList.remove("flash"),u.offsetWidth,u.classList.add("flash"))},time(I){c.textContent=wn(I)},pops(I){m.textContent!==String(I)&&(m.textContent=I,f.classList.remove("bump"),f.offsetWidth,f.classList.add("bump"))},gas(I,W,D){h.style.width=(I*100).toFixed(1)+"%",h.style.background=W,v.classList.toggle("empty",!!D)},hold(I){d.style.setProperty("--k",I),x.classList.toggle("holding",I>0)},banner(I,{kind:W="",ms:D=1400,subText:re=""}={}){M.textContent=I,M.className="pf-banner show "+W,w.textContent=re,w.classList.toggle("show",!!re),A=D/1e3},toast(I,W=2600){b.textContent=I,b.classList.add("show"),k=W/1e3},net(I){_.textContent=I||""},update(I){G(),A>0&&(A-=I)<=0&&(M.classList.remove("show"),w.classList.remove("show")),k>0&&(k-=I)<=0&&b.classList.remove("show")},dispose(){S.remove()}};return O.air(3),O.time(0),O}const Ca=3,Pa=1/60,gx=1/20,vx=1/20,$u=.12,_x=4.3,Yu=.8,xx=.42,yx=.34,ju=.3,Ku=.9,hn=n=>Math.atan2(Math.sin(n),Math.cos(n)),Dc=n=>Math.PI/2+n*Math.PI/2,Yr=n=>Math.round(n*1e3)/1e3;function Mx(n,{course:e,roster:t,host:i,meId:s,spectator:r=!1}){const{arena:o,lobby:a}=n;o.load(e),o.setCrew(t,s),o.placeAt(e.spawn),o.boardCrew();const l=new Map;t.forEach(q=>{const ee=o.crew.get(q.id);ee&&(ee.a=Dc(q.seat)),l.set(q.id,{id:q.id,a:Dc(q.seat),puff:!1,sp:0,spSeen:0,spUsed:0,em:"",es:0,esSeen:0,gu:0,guSeen:0,puffTime:0,supers:0,emotes:0,fxT:0,sndT:0})});const u=r?null:l.get(s),c=i?new Y_(o.track,e):null,p=df(n.overlay,e);p.show(!0),o.cam.mode="follow",o.cam.user=0,o.cam.intro=1,o.showTags(!0),n.input.setPlaying(!0);const m=new il;m.moveTo(-.35,0),m.lineTo(.35,0),m.lineTo(.35,2.2),m.lineTo(.85,2.2),m.lineTo(0,3.3),m.lineTo(-.85,2.2),m.lineTo(-.35,2.2);const f=new Io(m);f.rotateX(Math.PI/2);const h=new pt(f,new tn({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1,side:en}));h.renderOrder=2,n.stage.scene.add(h);let v=0,d=0,g=0,x=0,y=-1,M=!1,w="count",b=4,_=0,T=0,U=1,S=0,A=0,k=!1,H=0;const G=[],O=[];let I=!1,W=performance.now();const D={x:0,z:0,y:0,yaw:0,air:er,pop:-1,cp:0,s:e.spawn,deaths:0,finished:!1,time:0,inv:0},re=new Map;c&&Object.assign(D,c.st),p.progress(D.s,0),p.pops(0),p.air(er),r&&p.banner("Vous regardez la partie",{subText:"Vous rejoindrez la prochaine épreuve",ms:4e3}),Xe.music(!0,{fast:!0});function ce(q){const ee=o.rs;if(q.k==="hit")Xe.hit(),o.fx.stars(q.x,ee.y+1,q.z,10),p.air(q.air,!0),p.toast(["Aïe !","Ouille !","Ça pique !"][Math.floor(Math.random()*3)],1200),o.cam.shake=.8,Ht.rumble(.7,.5,220);else if(q.k==="pop")Xe.pop(),o.throwCrew(),o.fx.splash(q.x,ee.y,q.z,40,1.6),o.fx.stars(q.x,ee.y+1.2,q.z,14),p.air(0,!0),p.pops(q.deaths),p.banner(q.cause==="reset"?"PLOUF !":"POUF ! La bouée a éclaté",{kind:"bad",ms:2200,subText:"Retour au dernier checkpoint…"}),o.cam.shake=1.4,Ht.rumble(1,1,420);else if(q.k==="respawn")o.boardCrew(),Xe.splash(1),setTimeout(()=>o.fx.splash(o.rs.x,o.rs.y,o.rs.z,26,1.1),30),p.air(er),p.banner("C’est reparti !",{ms:1200}),U=1;else if(q.k==="cp"){Xe.checkpoint();const ie=e.checkpoints[q.i-1],N=o.track.at(ie);o.fx.confetti(N.x,N.y+6,N.z,90,N.w*1.6),p.banner("CHECKPOINT !",{kind:"good",ms:1600,subText:`${q.i} / ${e.checkpoints.length}`}),Ht.rumble(.4,.3,140)}else if(q.k==="finish"){Xe.fanfare(),w="finish";const ie=o.track.at(e.finish);for(let N=0;N<3;N++)setTimeout(()=>o.fx.confetti(ie.x,ie.y+6,ie.z,120,ie.w*1.8),N*450);p.banner("ARRIVÉE !",{kind:"good",ms:4200,subText:`Temps ${he(q.time)} · ${q.deaths} éclatement${q.deaths>1?"s":""}`}),o.cam.mode="finish";for(const N of l.keys())setTimeout(()=>o.emote(N,"cheer"),300+Math.random()*600);n.input.setPlaying(!1)}else q.k==="bump"&&(Xe.bump(q.v),q.v>3&&(o.cam.shake=Math.max(o.cam.shake,.35)))}const he=q=>`${Math.floor(q/60)}:${(q%60).toFixed(2).padStart(5,"0")}`;function Q(q){q.length&&(q.forEach(ce),a.broadcast({t:"ev",at:v,e:q}),q.some(ee=>ee.k==="finish")&&(y=v))}function me(q,ee){const ie=o.crew.get(s),N=D.pop<0&&!D.finished&&w!=="finish";o.cam.user=hn(o.cam.user+ee.look);let $=0;const L=Math.hypot(ee.mx,ee.my);if(N&&L>.3){const ge=o.cam.yaw+o.cam.user,Te=Math.sin(ge),ne=-Math.cos(ge),Ce=Math.cos(ge),Se=Math.sin(ge),P=Ce*ee.mx-Te*ee.my,E=Se*ee.mx-ne*ee.my,X=n.settings.aim!=="seat",se=hn((X?Math.atan2(-E,-P):Math.atan2(E,P))-D.yaw),ae=[...l.values()].filter(ze=>ze!==u&&o.crew.has(ze.id)),Z=Math.PI*2,Re=ze=>{const le=hn(se-u.a)*ze;return le>=0?le:le+Z},ve=(ze,le)=>(hn(ze.a-u.a)*le%Z+Z)%Z,be=ze=>ae.some(le=>{const we=ve(le,ze);return we>.01&&we<Re(ze)+Yu*.5});if(Re(1)>.03&&Re(-1)>.03){let ze=Re(1)<=Re(-1)?1:-1;be(ze)&&!be(-ze)&&(ze=-ze);const le=hn(u.a+ze*Math.min(Re(ze),_x*q*Math.min(1,L*1.2)));ae.some(Be=>Math.abs(hn(le-Be.a))<Yu&&Math.abs(hn(le-Be.a))<Math.abs(hn(u.a-Be.a)))||(u.a=le,$=ze)}H=1}ie&&(ie.run+=($-ie.run)*Math.min(1,q*10),ie.a=u.a),A=Math.max(0,A-q);const Me=ee.puff&&N&&w==="run";Me&&U>.02?(u.puff=!0,U=Math.max(0,U-xx*q),S=.35,k=!1):(Me&&U<=.02&&!k&&(k=!0,Xe.sputter()),u.puff=!1,S-=q,S<=0&&(U=Math.min(1,U+yx*q)),ee.puff||(k=!1)),ee.sup&&N&&w==="run"&&(U>=ju&&A<=0?(U-=ju,A=1,u.sp++,S=.5,i&&u.supers++):A<=0&&Xe.sputter()),ee.emote&&N&&(u.em=ee.emote,u.es++,i&&u.emotes++),ee.respawn&&N&&w==="run"?(_+=q,_>=Ku&&(_=0,u.gu++)):_=0,p.hold(_/Ku),ee.pause&&n.openPause(),p.gas(U,lr(ie?.look?.gas).c[0],k),u.puff&&(H=1)}function K(q){const ee=D.pop>=0;for(const ie of l.values()){const N=o.crew.get(ie.id);if(!N)continue;N.puff=ie.puff&&!ee,ie!==u&&(N.a=ie.a);const $=ie===u,L=0;N.puff?(ie.fxT-=q,ie.sndT-=q,ie.fxT<=0&&(o.puffFrom(ie.id,1),ie.fxT=.085),ie.sndT<=0&&(Xe.puff(ie.sndT<-1?1.2:.7,{vol:$?1:.55,pitch:.9+ie.id.length%5*.08,pan:L}),ie.sndT=.2+Math.random()*.1)):(ie.fxT=0,ie.sndT=Math.min(ie.sndT,-1.1)),ie.sp>ie.spSeen&&((ie.spSeen||ie.sp-ie.spSeen<3)&&(o.puffFrom(ie.id,2.6),Xe.bigPuff(),$&&(o.cam.shake=Math.max(o.cam.shake,.6),Ht.rumble(.9,.6,260))),ie.spSeen=ie.sp),ie.es>ie.esSeen&&(ie.esSeen=ie.es,ie.em&&(o.emote(ie.id,ie.em),Xe.emote(ie.em))),i&&ie.puff&&!ee&&(ie.puffTime+=q)}}function j(){const q=o.rs;for(const ee of e.hazards){if(ee.type!=="jaws"&&ee.type!=="bar")continue;const ie=Math.abs(ee.s-q.s);if(ie>45)continue;const N=ee.type==="jaws"?_o(ee,v)>=1:sl(ee,v)<.6;N&&!re.get(ee)&&Xe.slam(Math.max(0,1-ie/45)),re.set(ee,N)}}function de(q){if(!G.length)return;for(;G.length>2&&G[1].at<=q;)G.shift();const ee=G[0],ie=G[1]||G[0],N=ie.at>ee.at?Math.max(0,Math.min(1.5,(q-ee.at)/(ie.at-ee.at))):0,$=Xu(ee.r,{}),L=Xu(ie.r,{});D.x=$.x+(L.x-$.x)*N,D.z=$.z+(L.z-$.z)*N,D.y=$.y+(L.y-$.y)*N,D.yaw=$.yaw+hn(L.yaw-$.yaw)*N,D.s=$.s+(L.s-$.s)*N,Object.assign(D,{air:L.air,pop:L.pop,cp:L.cp,deaths:L.deaths,finished:L.finished,time:$.time+(L.time-$.time)*Math.min(1,N),inv:L.inv});const Me=new Map(ee.p.map(Te=>[Te[0],Te])),ge=ie.p;for(const Te of ge){const ne=l.get(Te[0]);if(!ne||ne===u)continue;const Ce=Me.get(Te[0])||Te;ne.a=Ce[1]+hn(Te[1]-Ce[1])*Math.min(1,N),ne.puff=!!Te[2],ne.sp=Te[3],Te[5]>ne.es&&(ne.em=Te[4],ne.es=Te[5]),!ne.spSeen&&ne.sp&&(ne.spSeen=ne.sp),!ne.esSeen&&ne.es&&(ne.esSeen=ne.es)}}const fe={kind:"raft",roster:t,get t(){return v},get finished(){return D.finished},riders:l,sim:c,hud:p,debug:()=>({buf:G.length,t:v,clockSet:I,snapAge:performance.now()-W,phase:w,view:{...D}}),onMsg(q){if(i){if(q.t==="inp"){const ee=l.get(q.from);if(!ee)return;Number.isFinite(q.a)&&(ee.a=hn(q.a)),ee.puff=!!q.f,q.sp>ee.sp&&q.sp-ee.sp<20&&(ee.supers+=q.sp-ee.sp,ee.sp=q.sp),q.es>ee.es&&(ee.es=q.es,ee.em=jn.some(ie=>ie.id===q.em)?q.em:"",ee.emotes++),q.gu>ee.gu&&(ee.gu=q.gu)}return}if(q.t==="snap"){W=performance.now();const ee=Math.min(.25,(a.rtt||80)/2e3);if(!Number.isFinite(q.at))return;!I||Math.abs(q.at+ee-v)>.5?(v=q.at+ee,I=!0):v+=(q.at+ee-v)*.1,(!G.length||q.at>G[G.length-1].at)&&G.push(q),G.length>30&&G.shift()}else if(q.t==="ev")for(const ee of q.e)O.push({at:q.at,e:ee})},removeRider(q){const ee=o.crew.get(q);if(ee){ee.char.root.updateMatrixWorld(!0);const ie=ee.char.root.getWorldPosition(new F);o.fx.splash(ie.x,o.rs.y,ie.z,16,.8),ee.char.dispose(),ee.tag.remove(),ee.bubble.remove(),o.crew.delete(q)}l.delete(q)},update(q,ee){ee||(v+=q);const ie=n.input.poll(q);if(ee&&(ie.mx=ie.my=0,ie.puff=!1,ie.sup=0,ie.respawn=!1),w==="count"){o.cam.intro=Math.max(0,1-v/(Ca-.4));const N=Math.ceil(Ca-v);N!==b&&N>=1&&N<=3&&(b=N,p.banner(String(N),{kind:"count",ms:900}),Xe.beep()),v>=Ca&&(w="run",o.cam.intro=0,p.banner("POUF !",{kind:"go",ms:900}),Xe.beep(!0))}if(u?me(q,ie):(o.cam.user=hn(o.cam.user+ie.look),ie.pause&&n.openPause()),i){if(w!=="count"&&!ee)for(d=Math.min(d+q,.25);d>=Pa;){d-=Pa;const N=[],$=[];for(const L of l.values()){if(!o.crew.has(L.id))continue;const Me=L.sp-L.spUsed;L.spUsed=L.sp,N.push({a:L.a,f:L.puff,sp:Me}),L.gu>L.guSeen&&(L.guSeen=L.gu,c.giveUp($))}c.step(Pa,v,N,$),Q($)}if(Object.assign(D,c.st),g-=q,g<=0&&a.online&&(g=gx,a.broadcast({t:"snap",at:Yr(v),r:c.pack(),p:[...l.values()].map(N=>[N.id,Yr(N.a),N.puff?1:0,N.sp,N.em,N.es])})),y>=0&&v-y>4.5&&!M){M=!0;const N=n.decorate?n.decorate(fe.summary()):fe.summary();a.broadcast({t:"end",summary:N}),n.onEnd(N);return}}else{for(de(v-$u);O.length&&O[0].at<=v-$u;)ce(O.shift().e);x-=q,x<=0&&u&&(x=vx,a.toHost({t:"inp",a:Yr(u.a),f:u.puff?1:0,sp:u.sp,em:u.em,es:u.es,gu:u.gu}));const N=performance.now()-W;p.net(I&&N>1500&&!D.finished?"Connexion à l’hôte instable…":"")}if(Object.assign(o.rs,{x:D.x,z:D.z,y:D.y,yaw:D.yaw,air:D.pop>=0?0:D.air,pop:D.pop,s:D.s,inv:D.inv}),K(q),j(),T-=q,T<=0&&D.pop<0&&(T=.28,o.fx.ring(D.x,D.y,D.z,3.1,1.8,.6)),H=Math.max(0,H-q*2.5),u&&o.crew.has(s)){const N=D.yaw+u.a+Math.PI;h.position.set(D.x+Math.cos(N)*2.4,D.y+.08,D.z+Math.sin(N)*2.4),h.rotation.y=-N+Math.PI/2,h.material.opacity=H*.75*(D.pop<0?1:0),h.material.color.set(lr(o.crew.get(s).look.gas).c[0])}p.progress(D.s,D.cp),p.time(D.time),p.pops(D.deaths),D.pop<0&&!D.finished&&p.air(D.air),p.update(q)},summary(){return{course:e.id,time:Yr(c.st.time),deaths:c.st.deaths,finished:c.st.finished,cps:c.st.cp,riders:[...l.values()].filter(q=>o.crew.has(q.id)).map(q=>({id:q.id,name:o.crew.get(q.id)?.name||"Joueur",look:o.crew.get(q.id)?.look,puff:Math.round(q.puffTime*10)/10,supers:q.supers,emotes:q.emotes}))}},dispose(){p.dispose(),h.removeFromParent(),f.dispose(),h.material.dispose(),n.input.setPlaying(!1),Xe.music(!0)}};return fe}const Ss=Math.PI*2,Mo=(n,e,t)=>Math.max(e,Math.min(t,n)),Ju=(n,e)=>{const t=((e/(n.period||4)+(n.phase||0))%1+1)%1;return .5-.5*Math.cos(t*Ss)},sn=.45,Pn=1.5,Zu=7.2,Qu=42,Sx=16,bx=30,wx=11.2,Ex=10,eh=7;function ur(n,e,t={}){const[i,s,r]=n.p;if(t.x=i,t.y=s,t.z=r,t.vx=0,t.vy=0,t.vz=0,t.yaw=n.yaw||0,t.w=0,n.move){const o=Ju(n,e),a=Ju(n,e+.02);t.x+=n.move[0]*o,t.y+=n.move[1]*o,t.z+=n.move[2]*o,t.vx=n.move[0]*(a-o)/.02,t.vy=n.move[1]*(a-o)/.02,t.vz=n.move[2]*(a-o)/.02}return n.spin&&(t.w=n.spin,t.yaw+=n.spin*e+(n.phase||0)*Ss),t}function pf(n,e){if(!n.sink)return 0;const t=(((e-(n.sink.start||0))/n.sink.period+(n.sink.phase||0))%1+1)%1;if(e<(n.sink.start||0))return 0;const i=n.sink.on??.5;return t<i?0:t<i+.08?(t-i)/.08*6:t<.92?6:(1-(t-.92)/.08)*6}function Ax(n,e){if(!n.sink||e<(n.sink.start||0))return 0;const t=(((e-(n.sink.start||0))/n.sink.period+(n.sink.phase||0))%1+1)%1,i=n.sink.on??.5;return t>i-.12&&t<i?1:0}const Nc=(n,e)=>(n.amp??1.1)*Math.sin(Ss*e/(n.period||3)+(n.phase||0)*Ss),mf=(n,e,t)=>(n.phase||0)*Ss+e*n.speed*(1+(t?.accel||0)*e);function Tx(n,e,t,i,s,r=[],o=[]){const a=n.parts,l={};if(e.stun=Math.max(0,e.stun-s),e.coyote=Math.max(0,e.coyote-s),e.jumpLock=Math.max(0,e.jumpLock-s),e.gas=Math.min(1,e.gas+s*.35),e.ground>=0){const y=a[e.ground];if(ur(y,i,l),y.type==="disc"||y.type==="box"&&y.spin){const M=l.w*s,w=e.x-l.x,b=e.z-l.z,_=Math.cos(M),T=Math.sin(M);e.x=l.x+w*_+b*T,e.z=l.z-w*T+b*_,e.yaw+=M}e.x+=l.vx*s,e.z+=l.vz*s,l.vy&&(e.y+=l.vy*s),y.conveyor&&(e.x+=y.conveyor[0]*s,e.z+=y.conveyor[1]*s)}const u=e.stun>0?.15:1,c=Math.hypot(t.mx,t.mz),p=t.mx*Zu,m=t.mz*Zu,f=e.ground>=0&&a[e.ground].ice,h=(e.ground>=0?f?Qu*.22:Qu:Sx)*u*s,v=p-e.vx,d=m-e.vz,g=Math.hypot(v,d);if(g>0){const y=Math.min(1,h/g);e.vx+=v*y,e.vz+=d*y}if(c>.1&&e.stun<=0&&(e.yaw=Math.atan2(t.mx,t.mz)),t.jump&&e.stun<=0&&(e.ground>=0||e.coyote>0)&&e.jumpLock<=0)e.vy=wx,e.ground=-1,e.coyote=0,e.jumpLock=.2,o.push({k:"jump"});else if(t.puff&&e.stun<=0&&e.gas>=.5){e.gas-=.5,e.vy=Math.max(e.vy,Ex);const y=Math.sin(e.yaw),M=Math.cos(e.yaw);e.vx+=y*eh,e.vz+=M*eh,e.ground=-1,e.puffs++,o.push({k:"puff"})}e.vy-=bx*s,e.vy=Math.max(e.vy,-40),e.x+=e.vx*s,e.y+=e.vy*s,e.z+=e.vz*s;const x=e.ground;e.ground=-1;for(let y=0;y<a.length;y++){const M=a[y];M.type==="box"||M.type==="disc"?Rx(M,y,e,i,l,o):M.type==="sweeper"?Cx(M,e,i,o,n):M.type==="hammer"?Px(M,e,i,o):M.type==="bumper"&&Lx(M,e,i,l,o)}if(e.ground>=0?(e.coyote=.12,x<0&&e.vy<=0&&o.push({k:"land"})):x>=0&&(e.coyote=.12),e.ground>=0&&c<.1){const y=Math.exp((a[e.ground].ice?-.8:-10)*s);e.vx*=y,e.vz*=y}for(const y of r){const M=e.x-y.x,w=e.z-y.z,b=Math.hypot(M,w);if(b>0&&b<sn*2&&Math.abs(e.y-y.y)<Pn*.8){const _=(sn*2-b)/2;e.x+=M/b*_,e.z+=w/b*_,e.vx+=M/b*2.2,e.vz+=w/b*2.2}}return o}function th(n,e,t){n.y=t,n.vy<0&&(n.vy=0),n.ground=e}function Rx(n,e,t,i,s,r){ur(n,i,s);const o=pf(n,i);if(o>=5.9)return;if(n.type==="disc"){const k=s.y+n.h/2-o,H=s.y-n.h/2-o,G=t.x-s.x,O=t.z-s.z,I=Math.hypot(G,O);if(t.y>k+.05||t.y+Pn<H)return;if(I<n.r&&t.y>k-.6&&t.vy<=.5){th(t,e,k);return}if(I<n.r+sn&&I>0&&t.y+Pn>H+.05&&t.y<k-.05){const W=n.r+sn-I;t.x+=G/I*W,t.z+=O/I*W}return}const a=n.s[0]/2,l=n.s[1]/2,u=n.s[2]/2,c=s.y+l-o,p=s.y-l-o;if(t.y>c+.05||t.y+Pn<p)return;const m=Math.cos(s.yaw),f=Math.sin(s.yaw),h=t.x-s.x,v=t.z-s.z,d=h*m-v*f,g=h*f+v*m,x=Math.abs(d)<=a&&Math.abs(g)<=u;if(x&&t.y>c-.6&&t.vy<=.5){th(t,e,c),n.bounce&&(t.vy=n.bounce,t.ground=-1,r.push({k:"boing"}));return}if(x&&t.vy>0&&t.y+Pn>p&&t.y<p){t.vy=0,t.y=p-Pn;return}if(t.y+Pn<=p+.05||t.y>=c-.05)return;const y=Mo(d,-a,a),M=Mo(g,-u,u);let w=d-y,b=g-M,_=Math.hypot(w,b);if(_>=sn)return;if(_<1e-5){const k=a-Math.abs(d),H=u-Math.abs(g);k<H?(w=Math.sign(d)||1,b=0,_=-k):(w=0,b=Math.sign(g)||1,_=-H)}else w/=_,b/=_;const T=sn-_,U=w*m+b*f,S=-w*f+b*m;t.x+=U*T,t.z+=S*T;const A=t.vx*U+t.vz*S;A<0&&(t.vx-=A*U,t.vz-=A*S),n.move&&(t.vx+=Math.max(0,s.vx*U+s.vz*S)*U,t.vz+=Math.max(0,s.vx*U+s.vz*S)*S)}function cl(n,e,t,i,s,r,o){if(n.stun>.25)return;const a=Math.hypot(e,t)||1;n.vx=e/a*i,n.vz=t/a*i,n.vy=Math.max(n.vy,s),n.ground=-1,n.stun=.7,r.push({k:"knock",kind:o})}function Cx(n,e,t,i,s){const[r,o,a]=n.p,l=mf(n,t,s),u=n.r??.4,c=n.arms??1;if(e.y>o+u||e.y+Pn<o-u||n.start!=null&&t<n.start)return;const p=n.half?Ss/c:Math.PI/c;for(let m=0;m<c;m++){const f=l+m*p,h=Math.cos(f),v=Math.sin(f),d=n.half?0:-n.len,g=Mo((e.x-r)*h+(e.z-a)*v,d,n.len),x=r+h*g,y=a+v*g,M=e.x-x,w=e.z-y;if(Math.hypot(M,w)<sn+u){const _=Math.sign(n.speed)||1,T=-v*_*Math.sign(g||1),U=h*_*Math.sign(g||1),S=Math.max(7,Math.abs(n.speed*g)*1.4);cl(e,T*.8+M*.2,U*.8+w*.2,S,6.5,i,"sweeper");return}}}function Px(n,e,t,i){const[s,r,o]=n.p,a=Nc(n,t),l=n.len??4,u=n.r??.9,c=n.axis==="x",p=s+(c?0:Math.sin(a)*l),m=o+(c?Math.sin(a)*l:0),f=r-Math.cos(a)*l,h=Mo(f,e.y+sn,e.y+Pn-sn),v=e.x-p,d=h-f,g=e.z-m;if(Math.hypot(v,d,g)<sn+u){const y=Math.cos(a)*Math.sign(Nc(n,t+.02)-a||1);cl(e,c?v*.3:y*3+v*.3,c?y*3+g*.3:g*.3,13,7,i,"hammer")}}function Lx(n,e,t,i,s){ur(n,t,i);const r=i.x,o=i.y,a=i.z,l=e.x-r,u=e.z-a,c=Math.hypot(l,u);e.y>o+n.h||e.y+Pn<o||c<n.r+sn&&c>0&&(e.x=r+l/c*(n.r+sn),e.z=a+u/c*(n.r+sn),cl(e,l,u,13,5,s,"bumper"))}function nh(n,e){return Math.abs(e.x-n.p[0])<=n.s[0]/2&&Math.abs(e.z-n.p[2])<=n.s[2]/2&&e.y>=n.p[1]-1&&e.y<=n.p[1]+n.s[1]}function ih(n){return{x:n[0],y:n[1],z:n[2],vx:0,vy:0,vz:0,yaw:n[3]||0,ground:-1,coyote:0,stun:0,jumpLock:0,puffs:0,gas:1}}const Ix=`varying vec2 vW; varying float vFog;
void main(){ vec4 w = modelMatrix * vec4(position,1.); vW = w.xz; vec4 mv = viewMatrix * w; vFog = -mv.z; gl_Position = projectionMatrix * mv; }`,Ux=`uniform float uTime; uniform vec3 uDeep, uFoam, uFogColor; uniform float uFogNear, uFogFar;
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
}`;function Dx(n){const e=n.c||"#fff1d6",t=st(e,-.18),[i,s,r]=n.s,o=[ht(i,s*.72,r,t,[0,-s*.14,0]),ht(i,s*.28,r,e,[0,s*.36,0])];for(const a of[-1,1])o.push(Oe(De(new It(.18,.18,r,8),st(e,.2)),[a*i/2,s/2,0],[Math.PI/2,0,0]));for(const a of[-1,1])o.push(Oe(De(new It(.18,.18,i,8),st(e,.2)),[0,s/2,a*r/2],[0,0,Math.PI/2]));if(n.ice)for(let a=-2;a<=2;a++)o.push(Oe(De(new mn(i*.15,.02,r*.5),"#ffffff"),[a*i/5,s/2+.015,a%2*r/6],[0,.5,0]));if(n.bounce)for(let a=0;a<3;a++)o.push(Ne(.5,.5,.12,"#ff5d8f",[(a-1)*1.4,s/2+.07,0],0,1,12));if(n.conveyor)for(let a=-2;a<=2;a++)o.push(ht(i*.8,.04,.25,st(e,-.3),[0,s/2+.02,a*r/6]));return je(o)}function Nx(n){const e=n.c||"#4fd1c5",t=[Ne(n.r,n.r*.92,n.h*.72,st(e,-.18),[0,-n.h*.14,0],0,1,36),Ne(n.r,n.r,n.h*.28,e,[0,n.h*.36,0],0,1,36)];if(n.spin)for(let i=0;i<6;i++)t.push(Oe(De(new mn(n.r*.9,.03,.3),st(e,.25)),[Math.cos(i/6*Math.PI*2)*n.r*.5,n.h/2+.01,Math.sin(i/6*Math.PI*2)*n.r*.5],[0,-i/6*Math.PI*2,0]));return t.push(Oe(De(new ui(n.r,.16,6,36),st(e,.2)),[0,n.h/2,0],[Math.PI/2,0,0])),je(t)}function Fx(n){const e=n.theme,t=new dt,i=[],s=Dn(),r={},o=new pt(new Li(900,900).rotateX(-Math.PI/2),new An({vertexShader:Ix,fragmentShader:Ux,uniforms:{uTime:{value:0},uDeep:{value:new He(e.water)},uFoam:{value:new He(e.foam)},uFogColor:{value:new He(e.fog)},uFogNear:{value:e.fogNear},uFogFar:{value:e.fogFar}}}));t.add(o);for(const d of n.parts)if(d.type==="box"||d.type==="disc"){const g=tt(d.type==="box"?Dx(d):Nx(d),s,{receive:!0});_t(g,.05),t.add(g);const x=new pt(d.type==="disc"?new pr(d.r,d.r+.6,32).rotateX(-Math.PI/2):new Li(d.s[0]+1.2,d.s[2]+1.2).rotateX(-Math.PI/2),new tn({color:"#ffffff",transparent:!0,opacity:.35,depthWrite:!1}));x.position.y=.03,t.add(x);const y=d.p[1]-(d.type==="disc"?d.h:d.s[1])/2;if(y>.2&&!d.move){const w=tt(je([Ne(.5,.65,y+1,st(d.c||"#fff1d6",-.3),[0,(y-1)/2,0],0,1,10)]),s);w.position.set(d.p[0],0,d.p[2]),t.add(w)}const M=w=>{ur(d,w,r);const b=pf(d,w),_=Ax(d,w);g.position.set(r.x+(_?Math.sin(w*50)*.06:0),r.y-b,r.z),g.rotation.y=r.yaw,g.visible=b<5.9,x.position.set(r.x,.03,r.z),x.rotation.y=r.yaw,x.visible=r.y-b-(d.type==="disc"?d.h:d.s[1])/2<.4};M(0),(d.move||d.spin||d.sink)&&i.push(M)}else if(d.type==="sweeper"){const g=new dt,x=d.arms??1,y=d.half?Math.PI*2/x:Math.PI/x,M=[];for(let T=0;T<x;T++){const U=d.half?d.len:d.len*2,S=d.half?d.len/2:0,A=[Ne(d.r,d.r,U,d.c||"#b58cf0",[S,0,0],[0,0,Math.PI/2],1,12)];for(let H=d.half?.6:-d.len+.6;H<d.len;H+=1.2)A.push(Ne(d.r+.03,d.r+.03,.3,"#ffffff",[H,0,0],[0,0,Math.PI/2],1,12));A.push(Ie(d.r*1.6,"#ff5d8f",[d.len,0,0],0,1,10)),d.half||A.push(Ie(d.r*1.6,"#ff5d8f",[-d.len,0,0],0,1,10));const k=je(A);k.rotateY(-T*y),M.push(k)}const w=tt(je(M),s);_t(w,.04),g.add(w);const b=tt(je([Ne(.9,1.1,1.4,"#ffd23f",[0,0,0],0,1,14),nn(.9,.8,"#ff5d8f",[0,1.1,0],0,1,14)]),s);_t(b,.04),g.add(b),g.position.set(...d.p),t.add(g);const _=T=>{w.rotation.y=-mf(d,T,n);const U=d.start==null||T>=d.start;w.position.y=U?0:Math.min(8,(d.start-T)*2)};_(0),i.push(_)}else if(d.type==="hammer"){new dt;const g=d.len??4,x=d.r??.9,y=d.c||"#ff8fb1",M=tt(je([ht(.5,.5,.5,"#5d6472",[0,0,0])]),s);M.position.set(...d.p),t.add(M);const w=new dt,b=tt(je([Ne(.1,.1,g,"#5d6472",[0,-g/2,0],0,1,6),Ne(x,x,x*2.4,y,[0,-g,0],[Math.PI/2,0,0],1,16),Ne(x*1.03,x*1.03,.3,"#ffffff",[0,-g,x*.7],[Math.PI/2,0,0],1,16),Ne(x*1.03,x*1.03,.3,"#ffffff",[0,-g,-x*.7],[Math.PI/2,0,0],1,16)]),s);_t(b,.04),w.add(b),w.position.set(...d.p),t.add(w);const _=T=>{const U=Nc(d,T);d.axis==="x"?w.rotation.set(-U,0,0):w.rotation.set(0,0,U)};_(0),i.push(_)}else if(d.type==="gantry"){const[g,x,y]=d.p,M=d.len,w=d.w,b=[ht(.5,.5,M,"#7b8292",[0,0,0])];for(const T of[-1,1]){b.push(ht(w*2+.6,.5,.5,"#7b8292",[0,0,T*M/2]));for(const U of[-1,1])b.push(Ne(.25,.32,x+1,"#7b8292",[U*w,-x/2-.3,T*M/2],0,1,8),Ne(.36,.36,.3,"#f7a43a",[U*w,.35,T*M/2],0,1,8))}const _=tt(je(b),s);_t(_,.04),_.position.set(g,x+.25,y),t.add(_)}else if(d.type==="bumper"){const g=[Ne(d.r,d.r*1.05,d.h,d.c||"#ff9f43",[0,d.h/2,0],0,1,18)];for(let y=0;y<3;y++)g.push(Ne(d.r+.04,d.r+.04,.22,"#ffffff",[0,.4+y*.6,0],0,1,18));g.push(Ie(d.r*.9,"#ff5d8f",[0,d.h,0],0,[1,.45,1],14));const x=tt(je(g),s);_t(x,.04),x.position.set(...d.p),t.add(x),i.push(y=>{ur(d,y,r),x.position.set(r.x,r.y,r.z);const M=1+Math.sin(y*6+d.p[0])*.03;x.scale.set(M,1,M)})}const a=(d,g,x)=>{const y=sf(g,x/1.5,{pole:e.rail,ring:e.railRing});y.scale.setScalar(1.5),y.position.set(d.p[0],d.p[1]-1,d.p[2]),t.add(y)};n.checkpoints.forEach(d=>a(d,"CHECKPOINT",d.s[0]+1)),n.finish&&a({p:[n.finish.p[0],n.finish.p[1],n.finish.p[2]+n.finish.s[2]/2+.5]},"ARRIVÉE",n.finish.s[0]+1),n.kind==="race"&&a({p:[0,3,8.5]},"DÉPART",15);const l=(()=>{let d=99;return()=>((d=d*16807%2147483647)-1)/2147483646})(),u=[],c=[],p=[],m=[],f=n.kind==="race"?75:0,h=(d,g)=>n.kind==="race"?Math.abs(d)>26||g<-30||g>(n.finishZ||150)+30:Math.hypot(d,g)>34;for(let d=0;d<40&&u.length<14;d++){const g=l()*Math.PI*2,x=45+l()*60,y=Math.cos(g)*x,M=f+Math.sin(g)*x;h(y,M)&&u.push([y,-.4,M,l()*6,3+l()*4])}u.forEach(([d,g,x,,y])=>{l()<.8&&c.push([d+(l()-.5)*y,g+y*.55,x+(l()-.5)*y,l()*6,.9+l()*.4])});for(let d=0;d<22;d++){const g=l()*Math.PI*2,x=200+l()*240;p.push([Math.cos(g)*x,-30+l()*40,f+Math.sin(g)*x,l()*6,14+l()*22])}for(let d=0;d<30;d++){const g=l()*Math.PI*2,x=100+l()*350;m.push([Math.cos(g)*x,30+l()*60,f+Math.sin(g)*x,l()*6,6+l()*9])}const v=(d,g,x,y=!1)=>{const M=new To(d,g,x.length),w=new At;return x.forEach((b,_)=>{w.position.set(b[0],b[1],b[2]),w.rotation.set(0,b[3],0),w.scale.setScalar(b[4]),w.updateMatrix(),M.setMatrixAt(_,w.matrix)}),M.castShadow=y,t.add(M),M};return v(je([Oe(De(new It(1,.7,1.1,9),e.sand),[0,0,0]),Oe(De(new It(.92,1,.25,9),e.grass),[0,.6,0])]),Zs(),u),v(Pc(e,e.flora?.palm??2),Zs(),c,!0),v(je([Oe(De(new It(1,.8,3,9),e.far),[0,0,0]),Oe(De(new It(1.02,1.02,.25,9),e.grass),[0,1.55,0]),Oe(De(new Bt(.8,1.6,9),st(e.far,-.12)),[0,-2.3,0],[Math.PI,0,0])]),Zs(),p),v(je([[0,0,0,1],[1.1,-.2,.2,.75],[-1.1,-.25,-.1,.7],[.4,.35,-.3,.7]].map(([d,g,x,y])=>Oe(De(new En(y,1),"#ffffff"),[d,g,x],0,[1,.7,1]))),new or({vertexColors:!0,flatShading:!0,emissive:"#e8f4ff",emissiveIntensity:.55}),m),{root:t,update(d){o.material.uniforms.uTime.value=d;for(const g of i)g(d)}}}const Yt=3,La=1/60,sh=1/20,rh=.12,kx=-1.2,oh=n=>Math.atan2(Math.sin(n),Math.cos(n)),jt=n=>Math.round(n*1e3)/1e3,Ia=n=>n===1?"1er":`${n}e`,Vn={ground:1,stun:2,swim:8,done:16};function Ox(n,{course:e,roster:t,host:i,meId:s,spectator:r=!1}){const{arena:o,lobby:a,stage:l}=n,u=e.kind==="race";o.setVisible(!1),l.setTheme(e.theme);const c=Fx(e);l.scene.add(c.root);const p=o.fx,m=df(n.overlay,e,{mode:e.kind});m.show(!0),n.input.setPlaying(!0);const f=R("div.pf-tags");n.overlay.append(f);const h=new Map;t.forEach(N=>{const $=Lc(N.look);l.scene.add($.root);const L=R(`div.pf-tag${N.id===s?".me":""}`,N.name),Me=R("div.pf-bubble");f.append(L,Me);const ge=e.spawn[N.seat%e.spawn.length];h.set(N.id,{id:N.id,name:N.name,look:N.look,seat:N.seat,char:$,tag:L,bubble:Me,buf:[],x:ge[0],y:ge[1],z:ge[2],yaw:ge[3]||0,flags:Vn.ground,cp:0,fin:null,out:null,rank:0,puffs:0,emotes:0,last:0,run:0,big:0,es:0})});const v=r?null:h.get(s);let d=v?ih(e.spawn[v.seat%e.spawn.length]):null,g=0,x=0,y=0,M=0,w=0,b=0,_=0,T="count",U=4,S=0,A=-1,k=!1,H=-1,G=!1;const O={yaw:e.camYaw||0,user:0,pos:new F,look:new F,shake:0},I=e.spawn[0];O.pos.set(I[0],I[1]+14,I[2]-16),O.look.set(I[0],I[1],I[2]+6);const W=new F,D=new F;Xe.music(!0,{fast:!0}),r&&m.banner("Vous regardez la partie",{subText:"Vous rejoindrez la prochaine épreuve",ms:4e3});const re=()=>{if(g>0){const N=e.checkpoints[g-1],$=v.seat%4;return[N.p[0]+($-1.5)*1.2,N.p[1],N.p[2],0]}return e.spawn[v.seat%e.spawn.length]};function ce(){const N=re();d=ih(N),d.gas=1,p.splash(N[0],N[1],N[2],12,.7),Xe.splash(.6)}function he(N){const $=h.get(N.id);if($){if(N.k==="fin")$.fin=N.time,$.rank=N.rank,$===v?(Xe.fanfare(),m.banner(`${Ia(N.rank)} !`,{kind:"good",ms:3500,subText:`Temps ${Q(N.time)}`}),p.confetti($.x,$.y+4,$.z,90,6)):(Xe.checkpoint(),m.toast(`${$.name} arrive ${Ia(N.rank)}`,2200));else if(N.k==="out")$.out=N.at,$.rank=N.rank,$===v?m.banner("TOMBÉ !",{kind:"bad",ms:2600,subText:`Vous avez tenu ${Q(N.at)}`}):m.toast(`${$.name} est tombé !`,2e3);else if(N.k==="em"){$.char.emote(N.em),Xe.emote(N.em);const L=jn.find(Me=>Me.id===N.em);$.bubble.textContent=L?.icon||"",$.bubble.classList.remove("show"),$.bubble.offsetWidth,$.bubble.classList.add("show")}}}const Q=N=>`${Math.floor(N/60)}:${(N%60).toFixed(2).padStart(5,"0")}`;function me(N){he(N),a.broadcast({t:"fev",e:N})}function K(N,$){const L=h.get(N);!L||L.fin!=null||L.out!=null||(S++,H<0&&(H=_),me({k:"fin",id:N,rank:S,time:jt($)}))}function j(N){const $=h.get(N);if(!$||$.out!=null||$.fin!=null)return;const L=[...h.values()].filter(Me=>Me.out==null).length;me({k:"out",id:N,rank:L,at:jt(Math.max(0,_-Yt))})}function de(N,$){const L=[];if(x>0)return x-=N,x<=0&&u&&ce(),L;const Me=[...h.values()].filter(Z=>Z!==v&&Z.out==null).map(Z=>({x:Z.x,y:Z.y,z:Z.z})),ge=Math.sin(O.yaw+O.user),Te=Math.cos(O.yaw+O.user),ne=-Te,Ce=ge;let Se=ne*$.mx-ge*$.my,P=Ce*$.mx-Te*$.my;const E=Math.hypot(Se,P);E>1&&(Se/=E,P/=E);const X=T==="count"||v.fin!=null||v.out!=null,se=!X&&$.jump>0;M=Math.min(M+N,.25);let ae=!0;for(;M>=La;)M-=La,Tx(e,d,X?{mx:0,mz:0,jump:!1,puff:!1}:{mx:Se,mz:P,jump:se&&ae,puff:$.sup>0&&ae},Math.max(0,_-Yt),La,Me,L),ae=!1;if($.sup>0&&!L.some(Z=>Z.k==="puff")&&!X&&Xe.sputter(),d.y<kx&&x<=0&&v.out==null&&(p.splash(d.x,0,d.z,26,1.2),Xe.splash(1),Ht.rumble(.6,.5,200),u?(x=1.1,m.toast("Plouf !",1e3)):(x=1e9,i?j(s):a.toHost({t:"fout"}))),u&&v.fin==null&&(e.checkpoints.forEach((Z,Re)=>{Re>=g&&nh(Z,d)&&(g=Re+1,Xe.checkpoint(),m.banner("CHECKPOINT !",{kind:"good",ms:1200}),p.confetti(Z.p[0],Z.p[1]+5,Z.p[2],60,Z.s[0]))}),nh(e.finish,d))){const Z=_-Yt;i?K(s,Z):(v.fin=Z,a.toHost({t:"ffin",time:jt(Z)}))}return u&&$.respawn&&v.fin==null&&x<=0&&T==="run"?(y+=N,y>.9&&(y=0,ce())):y=0,m.hold(y/.9),$.emote&&v.out==null&&(i?(v.emotes++,me({k:"em",id:s,em:$.emote})):a.toHost({t:"fem",em:$.emote})),L}function fe(N){for(const $ of N)$.k==="jump"?Xe.ui():$.k==="land"?p.ring(d.x,d.y+.05,d.z,1.2,.5,.5):$.k==="boing"?(Xe.emote("cheer"),p.stars(d.x,d.y+.3,d.z,6)):$.k==="puff"?(v.big=1,v.puffs++,q(v,1.6),Xe.bigPuff(),Ht.rumble(.6,.4,160)):$.k==="knock"&&(Xe.hit(),p.stars(d.x,d.y+1.6,d.z,8),O.shake=.6,Ht.rumble(.8,.6,220))}function q(N,$){const L=W.set(-Math.sin(N.yaw),0,-Math.cos(N.yaw));N.char.root.updateMatrixWorld(!0),p.puff(N.char.butt(D),L,lr(N.look.gas).c,$)}function ee(N,$){const L=N.buf;if(!L.length)return;for(;L.length>2&&L[1].at<=$;)L.shift();const Me=L[0],ge=L[1]||L[0],Te=ge.at>Me.at?Math.max(0,Math.min(1.3,($-Me.at)/(ge.at-Me.at))):0;N.x=Me.x+(ge.x-Me.x)*Te,N.y=Me.y+(ge.y-Me.y)*Te,N.z=Me.z+(ge.z-Me.z)*Te,N.yaw=Me.yaw+oh(ge.yaw-Me.yaw)*Math.min(1,Te),N.flags=ge.flags;const ne=N.puffs;N.puffs=ge.puffs,N.puffs>ne&&ne>=0&&(N.big=1,q(N,1.6),Xe.puff(1.4,{vol:.6}))}const ie={kind:"foot",riders:h,roster:t,get t(){return _},get finished(){return k},onMsg(N){if(i){const $=h.get(N.from);if(!$)return;if(N.t==="fs"&&Array.isArray(N.s)){const[L,Me,ge,Te,ne,Ce,Se]=N.s;if(![L,Me,ge,Te].every(Number.isFinite))return;$.buf.push({at:_,x:L,y:Me,z:ge,yaw:Te,flags:ne,puffs:Se}),$.buf.length>30&&$.buf.shift(),$.cp=Ce|0,$.puffsHost=Se}else N.t==="ffin"?K(N.from,+N.time||Math.max(0,_-Yt)):N.t==="fout"?j(N.from):N.t==="fem"&&jn.some(L=>L.id===N.em)&&($.emotes++,me({k:"em",id:N.from,em:N.em}));return}if(N.t==="fsnap"){if(!Number.isFinite(N.at))return;const $=Math.min(.25,(a.rtt||80)/2e3);!G||Math.abs(N.at+$-_)>.5?(_=N.at+$,G=!0):_+=(N.at+$-_)*.1;for(const[L,Me,ge,Te,ne,Ce,Se,P]of N.pl){const E=h.get(L);!E||E===v||((!E.buf.length||N.at>E.buf[E.buf.length-1].at)&&E.buf.push({at:N.at,x:Me,y:ge,z:Te,yaw:ne,flags:Ce,puffs:P}),E.buf.length>30&&E.buf.shift(),E.cp=Se)}}else N.t==="fev"&&he(N.e)},removeRider(N){const $=h.get(N);!$||$===v||(p.splash($.x,Math.max(0,$.y),$.z,14,.8),$.char.dispose(),$.tag.remove(),$.bubble.remove(),h.delete(N))},update(N,$){$||(_+=N);const L=n.input.poll(N);if($&&(L.mx=L.my=0,L.puff=!1,L.jump=0,L.sup=0,L.respawn=!1,L.emote=null),T==="count"){const ne=Math.ceil(Yt-_);ne!==U&&ne>=1&&ne<=3&&(U=ne,m.banner(String(ne),{kind:"count",ms:900}),Xe.beep()),_>=Yt&&(T="run",m.banner(u?"PARTEZ !":"TENEZ BON !",{kind:"go",ms:900}),Xe.beep(!0))}if(O.user=oh(O.user+L.look*(n.settings.camSpeed||1)),L.pause&&n.openPause(),v&&v.out==null?(fe(de(N,L)),v.x=d.x,v.y=d.y,v.z=d.z,v.yaw=d.yaw,v.flags=(d.ground>=0?Vn.ground:0)|(d.stun>0?Vn.stun:0)|(x>0?Vn.swim:0)|(v.fin!=null?Vn.done:0),m.gas(d.gas,lr(v.look.gas).c[0],d.gas<.5)):v&&(v.flags=Vn.swim),w-=N,w<=0&&(w=sh,v&&!i&&a.toHost({t:"fs",s:[jt(v.x),jt(v.y),jt(v.z),jt(v.yaw),v.flags,g,d?.puffs||0]})),i){for(const P of h.values())P!==v&&ee(P,_-rh);b-=N,b<=0&&a.online&&(b=sh,a.broadcast({t:"fsnap",at:jt(_),pl:[...h.values()].map(P=>[P.id,jt(P.x),jt(P.y),jt(P.z),jt(P.yaw),P.flags,P===v?g:P.cp,P===v?d?.puffs||0:P.puffsHost||0])}));const ne=[...h.values()],Ce=ne.filter(P=>P.out==null&&P.fin==null);if((u?Ce.length===0||H>=0&&_-H>40||_-Yt>(e.maxTime||300):Ce.length<=(ne.length>1?1:0)||_-Yt>(e.maxTime||150))&&A<0&&T==="run"&&(A=_,!u))for(const P of Ce)me({k:"fin",id:P.id,rank:1,time:jt(_-Yt)});if(A>=0&&_-A>2.5&&!k){k=!0;const P=n.decorate?n.decorate(ie.summary()):ie.summary();a.broadcast({t:"end",summary:P}),n.onEnd(P);return}}else for(const ne of h.values())ne!==v&&ee(ne,_-rh);for(const ne of h.values()){const Ce=ne.char,Se=ne===v&&d?Math.min(1,Math.hypot(d.vx,d.vz)/7):Math.min(1,Math.hypot(ne.x-(ne.px??ne.x),ne.z-(ne.pz??ne.z))/Math.max(.001,N)/7);ne.px=ne.x,ne.pz=ne.z,ne.run+=(Se-ne.run)*Math.min(1,N*10),ne.big=Math.max(0,ne.big-N*3);const P=ne.flags,E=P&Vn.swim?"swim":P&Vn.stun?"stun":P&Vn.ground?"stand":"air";Ce.root.position.set(ne.x,E==="swim"?-.55:ne.y,ne.z),Ce.root.rotation.set(0,ne.yaw,0),Ce.root.visible=!(ne.out!=null&&E==="swim"&&_-Yt-ne.out>2),Ce.update(N,{mode:E,run:E==="stand"?ne.run:0,big:ne.big})}const Me=v&&v.out==null?v:[...h.values()].find(ne=>ne.out==null&&ne.fin==null)||v||[...h.values()][0];if(Me){const ne=O.yaw+O.user,Ce=Math.sin(ne),Se=Math.cos(ne),P=T==="count"?Math.max(0,1-_/(Yt-.3)):0,E=(u?10:11)+P*10,X=(u?6:7.5)+P*8;O.pos.lerp(W.set(Me.x-Ce*E,Math.max(Me.y,0)+X,Me.z-Se*E),Math.min(1,N*5)),O.look.lerp(D.set(Me.x+Ce*5,Math.max(Me.y,0)+1,Me.z+Se*5),Math.min(1,N*7))}const ge=l.camera;ge.position.copy(O.pos),zc.settings.reduceMotion&&(O.shake=0),O.shake>0&&(O.shake=Math.max(0,O.shake-N*2.5),ge.position.x+=(Math.random()-.5)*O.shake*.4,ge.position.y+=(Math.random()-.5)*O.shake*.4),ge.lookAt(O.look),Me&&l.focus(Me.x,Math.max(0,Me.y),Me.z),c.update(Math.max(0,_-Yt)),p.update(N);const Te=Math.max(0,_-Yt);if(u){m.time(v?.fin??Te),m.progress(v?Math.max(0,v.z):0,g);const ne=[...h.values()].sort((Ce,Se)=>Ce.fin!=null!=(Se.fin!=null)?Ce.fin!=null?-1:1:Ce.fin!=null?Ce.rank-Se.rank:Se.z-Ce.z);v&&m.rank(`${Ia(ne.indexOf(v)+1)} / ${ne.length}`)}else{m.time(v?.out??Te);const ne=[...h.values()].filter(Ce=>Ce.out==null).length;m.rank(`${ne} en vie`)}m.update(N)},updateTags(N,$){for(const L of h.values()){L.char.head.getWorldPosition(W),W.y+=.95,D.copy(W).project(l.camera);const Me=D.z<1&&Math.abs(D.x)<1.1&&Math.abs(D.y)<1.1&&L.char.root.visible,ge=`translate(${((D.x*.5+.5)*N).toFixed(1)}px, ${((-D.y*.5+.5)*$).toFixed(1)}px)`;L.tag.style.transform=ge+" translate(-50%, -100%)",L.tag.style.opacity=Me?1:0,L.bubble.style.transform=ge+" translate(-50%, -190%)"}},debugTeleport(N,$,L){d&&Object.assign(d,{x:N,y:$,z:L,vx:0,vy:0,vz:0,ground:-1,stun:0}),x=0,O.user=0},summary(){const N=[...h.values()];return N.sort(($,L)=>($.rank||99)-(L.rank||99)||L.z-$.z),{course:e.id,kind:e.kind,time:jt(Math.max(0,_-Yt)),finished:!0,riders:N.map(($,L)=>({id:$.id,name:$.name,look:$.look,rank:L+1,time:$.fin,out:$.out,puffs:$===v?d?.puffs||0:$.puffsHost||0,emotes:$.emotes,puff:0,supers:0}))}},dispose(){m.dispose(),f.remove();for(const N of h.values())N.char.dispose();c.root.removeFromParent(),c.root.traverse(N=>{N.geometry&&N.geometry.dispose()}),o.setVisible(!0),l.setTheme(o.course.theme),n.input.setPlaying(!1),Xe.music(!0)}};return ie}const So="ABCDEFGHJKMNPQRSTUVWXYZ23456789",gf=()=>Array.from({length:5},()=>So[Math.floor(Math.random()*So.length)]).join("");function zx(n){let e=2166136261;for(const i of String(n))e^=i.charCodeAt(0),e=Math.imul(e,16777619);let t="";for(let i=0;i<5;i++)t+=So[(e>>>0)%So.length],e=Math.imul(e^e>>>13,2654435761);return t}const uo=n=>String(n||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5),jr=(n,e=24)=>typeof n=="string"&&n.length<=e?n:void 0;function Ua(n={}){return{species:jr(n.species)||"hippo",color:/^#[0-9a-f]{6}$/i.test(n.color||"")?n.color:"#9d8fc4",hat:jr(n.hat)||"none",extra:jr(n.extra)||"none",gas:jr(n.gas)||"green"}}const ah="poufparty-v1-",bo=4,Bx=8,Hx=1e3,Vx=7e3,Gx=9e3,Wx=12e3;function ch(){const n=new URLSearchParams(location.search).get("peerhost");if(!n)return{debug:0,config:{iceServers:If}};const[e,t]=n.split(":");return{debug:0,host:e,port:+t,path:"/",secure:!1}}function Kr(n){return{"peer-unavailable":"Aucune partie ouverte avec ce code.","unavailable-id":"Ce code est déjà pris.",network:"Connexion au service de mise en relation impossible. Vérifiez votre connexion Internet.","server-error":"Le service de mise en relation ne répond pas. Réessayez dans un instant.","browser-incompatible":"Ce navigateur ne permet pas le jeu en ligne.","socket-error":"Connexion au service de mise en relation impossible.","socket-closed":"Connexion au service de mise en relation perdue."}[n?.type]||n?.message||"La connexion a échoué."}function lh(n){return new Promise((e,t)=>{let i=!1;const s=n?new Tl(n,ch()):new Tl(ch()),r=setTimeout(()=>{if(!i){i=!0;try{s.destroy()}catch{}t({type:"network"})}},12e3);s.once("open",()=>{i||(i=!0,clearTimeout(r),e(s))}),s.once("error",o=>{if(!i){i=!0,clearTimeout(r);try{s.destroy()}catch{}t(o)}})})}class Xx extends EventTarget{constructor(e){super(),this.me=e,this.code=null,this.role="none",this.online=!1,this.members=[],this.peer=null,this.conns=new Map,this.hostConn=null,this.offset=0,this.bestRtt=1/0,this.closed=!1,this.lastHostMsg=0,this.timer=setInterval(()=>this.tick(),Hx)}emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t}))}on(e,t){const i=s=>t(s.detail);return this.addEventListener(e,i),()=>this.removeEventListener(e,i)}get isHost(){return this.role==="host"||this.role==="local"}get hostNow(){return performance.now()+(this.isHost?0:this.offset)}get players(){return this.members.slice(0,bo)}async host(e=gf()){this.reset(),this.code=e,this.members=[{...this.me,ready:!0,host:!0,joinedAt:Date.now(),online:!0}];try{if(this.peer=await lh(ah+e),this.closed){this.peer.destroy();return}this.role="host",this.online=!0,this.peer.on("connection",t=>this.accept(t)),this.peer.on("disconnected",()=>{!this.closed&&this.peer&&!this.peer.destroyed&&setTimeout(()=>{try{this.peer.reconnect()}catch{}},1500)}),this.peer.on("error",t=>{(t?.type==="network"||t?.type==="server-error")&&this.emit("status",{online:!1,role:this.role,error:Kr(t)})})}catch(t){if(t?.type==="unavailable-id")throw t;this.role="local",this.online=!1,this.emit("status",{online:!1,role:"local",error:Kr(t)})}this.pushState(),this.emit("status",{online:this.online,role:this.role})}async join(e){if(e=uo(e),e.length!==5)throw new Error("Le code de partie contient 5 caractères.");this.reset(),this.code=e;try{this.peer=await lh(),await this.connect(e)}catch(t){throw this.reset(),new Error(Kr(t))}}async claim(e,t=6){for(let i=0;;i++){try{await this.host(e);return}catch(s){if(s?.type!=="unavailable-id")throw s}try{await this.join(e);return}catch(s){if(i>=t||this.closed)throw s;await new Promise(r=>setTimeout(r,1200+Math.random()*800))}}}connect(e){return new Promise((t,i)=>{const s=this.peer.connect(ah+e,{reliable:!0,serialization:"json"});let r=!1;const o=l=>{r||(r=!0,i(l))},a=l=>{l?.type==="peer-unavailable"&&o(l)};this.peer.on("error",a),s.on("open",()=>{this.hostConn=s,this.role="guest",this.online=!0,this.lastHostMsg=performance.now(),s.send({t:"hello",user:this.me});for(let l=0;l<4;l++)setTimeout(()=>this.ping(),150+l*300)}),s.on("data",l=>{if(!(!l||typeof l.t!="string")){if(this.lastHostMsg=performance.now(),l.t==="welcome"){r=!0,this.peer?.off("error",a),this.members=l.members,this.emit("state",this.members),this.emit("status",{online:!0,role:"guest"}),t();return}if(l.t==="denied"){o({message:l.message});try{s.close()}catch{}return}this.guestHandle(l)}}),s.on("close",()=>{this.hostConn===s?this.hostLost():o({type:"peer-unavailable"})}),s.on("error",o),setTimeout(()=>o({type:"peer-unavailable"}),15e3)})}reset(){this.closed=!1,this.conns.forEach(e=>{try{e.conn.close()}catch{}}),this.conns.clear();try{this.hostConn?.close()}catch{}this.hostConn=null;try{this.peer?.destroy()}catch{}this.peer=null,this.role="none",this.online=!1,this.members=[],this.offset=0,this.bestRtt=1/0}leave(){this.role==="guest"&&this.toHost({t:"bye"}),this.role==="host"&&this.broadcast({t:"closing"});const e=this.peer,t=[...this.conns.values()],i=this.hostConn;this.peer=null,this.hostConn=null,this.conns=new Map,this.closed=!0,this.role="none",this.online=!1,this.members=[],setTimeout(()=>{t.forEach(s=>{try{s.conn.close()}catch{}});try{i?.close()}catch{}try{e?.destroy()}catch{}},250)}destroy(){this.leave(),clearInterval(this.timer)}accept(e){const t={conn:e,id:null,last:performance.now()};e.on("data",i=>{if(!(!i||typeof i.t!="string")){if(t.last=performance.now(),i.t==="hello"){const s=i.user||{},r=String(s.id||e.peer).slice(0,64);let o=this.members.find(l=>l.id===r);if(!o&&this.members.length>=Bx){e.send({t:"denied",message:"La partie est complète."});return}const a=[...this.conns.values()].find(l=>l.id===r&&l!==t);if(a){this.conns.delete(a.conn.peer);try{a.conn.close()}catch{}}t.id=r,this.conns.set(e.peer,t),o?(o.online=!0,clearTimeout(o.timer),o.timer=0,o.name=String(s.name||o.name).slice(0,16),o.look=Ua(s.look)):(o={id:r,name:String(s.name||"Joueur").slice(0,16),look:Ua(s.look),ready:!1,host:!1,joinedAt:Date.now(),online:!0},this.members.push(o)),e.send({t:"welcome",members:this.publicMembers()}),this.pushState(),this.emit("joined",o);return}if(t.id){if(i.t==="ping"){e.send({t:"pong",c:i.c,h:performance.now()});return}if(i.t==="bye"){this.drop(t.id,!0);return}if(i.t==="ready"){const s=this.members.find(r=>r.id===t.id);s&&(s.ready=!!i.v,this.pushState());return}if(i.t==="look"){const s=this.members.find(r=>r.id===t.id);s&&(s.look=Ua(i.look),this.pushState());return}this.emit("msg",{...i,from:t.id})}}}),e.on("close",()=>{this.conns.get(e.peer)===t&&(this.conns.delete(e.peer),t.id&&this.drop(t.id,!1))})}drop(e,t){const i=this.members.find(s=>s.id===e);if(!(!i||i.host)){for(const[s,r]of this.conns)if(r.id===e){this.conns.delete(s);try{r.conn.close()}catch{}}if(t){this.members=this.members.filter(s=>s!==i),this.pushState(),this.emit("left",i);return}i.online=!1,this.pushState(),clearTimeout(i.timer),i.timer=setTimeout(()=>{i.online||(this.members=this.members.filter(s=>s!==i),this.pushState(),this.emit("left",i))},Wx)}}publicMembers(){return this.members.map(({timer:e,...t})=>t)}pushState(){this.isHost&&this.broadcast({t:"members",members:this.publicMembers()}),this.emit("state",this.members)}setReady(e){if(this.isHost){const t=this.members[0];t&&(t.ready=!0);return}this.toHost({t:"ready",v:e})}setLook(e){if(this.me.look=e,this.isHost){const t=this.members.find(i=>i.id===this.me.id);t&&(t.look=e,this.pushState())}else this.toHost({t:"look",look:e})}broadcast(e,t){for(const i of this.conns.values())if(i.id&&i.id!==t&&i.conn.open)try{i.conn.send(e)}catch{}}sendTo(e,t){for(const i of this.conns.values())if(i.id===e&&i.conn.open)try{i.conn.send(t)}catch{}}toHost(e){if(this.hostConn?.open)try{return this.hostConn.send(e),!0}catch{}return!1}ping(){this.toHost({t:"ping",c:performance.now()})}guestHandle(e){if(e.t==="pong"){const t=performance.now(),i=t-e.c;(i<this.bestRtt*1.2||i<60)&&(this.bestRtt=Math.min(i,this.bestRtt*1.05+1),this.offset=e.h+i/2-t),this.rtt=i;return}if(e.t==="members"){this.members=e.members,this.emit("state",this.members);return}if(e.t==="closing"){this.hostLost(!0);return}this.emit("msg",e)}hostLost(e=!1){if(this.closed||this.role!=="guest")return;const t=this.code,i=this.members.filter(r=>!r.host&&r.online!==!1);this.hostConn=null,this.role="none",this.online=!1,this.emit("status",{online:!1,role:"none",hostLost:!0,closing:e});const s=Math.max(0,i.findIndex(r=>r.id===this.me.id));setTimeout(async()=>{if(!this.closed)try{try{this.peer?.destroy()}catch{}this.peer=null,await this.claim(t),this.emit("status",{online:this.online,role:this.role,reelected:!0})}catch(r){this.emit("status",{online:!1,role:"none",error:r.message||Kr(r),lost:!0})}},400+s*1600)}tick(){if(this.closed)return;const e=performance.now();if(this.role==="guest"){if(this.ping(),e-this.lastHostMsg>Vx){try{this.hostConn?.close()}catch{}this.hostLost()}}else if(this.role==="host"){for(const t of[...this.conns.values()])if(t.id&&e-t.last>Gx){this.conns.delete(t.conn.peer);try{t.conn.close()}catch{}this.drop(t.id,!1)}if(this.peer?.disconnected&&!this.peer.destroyed)try{this.peer.reconnect()}catch{}}}}const ll={id:"lagon",name:"La Descente du Lagon Rose",short:"Lagon Rose",kind:"coop",players:"1-4",blurb:"Pilotez la bouée à coups de pouf à travers le canyon rose : mâchoires, mines, moulins et toboggan géant.",par:[150,210,300],segs:[{len:34,w:13,flow:.6,L:"beach",R:"beach",h:2.5},{len:14,w:5.6,flow:2.2,L:"canyon",R:"canyon",h:6},{len:26,turn:28,flow:2.8},{len:26,turn:-40,h:8},{len:22,turn:12},{len:20,w:6.2},{len:46,w:5.6,L:"mesa",R:"canyon",h:9},{len:20,turn:-30,w:8,flow:2.4},{len:50,turn:10,w:8.5,flow:2.2,L:"mesa",R:"mesa"},{len:20,w:6.5},{len:30,turn:45,w:6,L:"canyon",R:"mesa",h:8,flow:2.8},{len:30,turn:-50},{len:40,turn:15,dy:-9,w:5.2,flow:5,L:"canyon",R:"canyon",h:10},{len:18,w:9,flow:1.6},{len:50,turn:-20,w:6.5,flow:2.6,R:"mesa"},{len:50,turn:25,w:7.5,L:"mesa",R:"mesa"},{len:40,turn:-30,w:6,L:"canyon",R:"canyon",h:7},{len:30,turn:20,dy:-3,flow:3.5},{len:26,w:12,flow:.8,L:"beach",R:"beach",h:2.5}],spawn:12,start:44,checkpoints:[135,262,392,500],finish:575,hazards:[{type:"rock",s:8,d:-9,r:1.6},{type:"rock",s:22,d:8.5,r:1.4},{type:"rock",s:29,d:-7,r:1},{type:"spikes",s:58,s1:72,side:1},{type:"spikes",s:82,s1:96,side:-1},{type:"spikes",s:104,s1:116,side:1},{type:"rock",s:110,d:-2.6,r:.9},{type:"jaws",s:158,period:4.6,phase:0},{type:"jaws",s:176,period:4.6,phase:.45},{type:"mine",s:216,d:0,amp:4,period:5,r:.75},{type:"mine",s:226,d:-2,amp:3,period:4,phase:.3,r:.75},{type:"mine",s:236,d:2,amp:4,period:6,phase:.6,r:.75},{type:"mine",s:246,d:0,amp:5,period:4.5,phase:.1,r:.75},{type:"mine",s:254,d:-3,amp:2,period:3,phase:.5,r:.75},{type:"rock",s:272,d:0,r:1.5},{type:"spikes",s:280,s1:300,side:-1},{type:"mill",s:292,side:1,speed:.9},{type:"spikes",s:312,s1:334,side:1},{type:"mill",s:322,side:-1,speed:-.8,phase:.2},{type:"boost",s:339,d:0,len:9,w:3.2,power:4},{type:"spikes",s:346,s1:372,side:1,inset:.6},{type:"spikes",s:352,s1:376,side:-1,inset:.6},{type:"spikes",s:400,s1:440,side:-1},{type:"bar",s:408,period:3.8},{type:"whirl",s:418,d:-1.5,r:4.2,dir:1,strength:3},{type:"bar",s:430,period:3.4,phase:.5},{type:"saw",s:456,d:0,amp:4.4,period:5,r:1.3},{type:"saw",s:471,d:0,amp:4.4,period:4,phase:.5,r:1.3},{type:"saw",s:486,d:1,amp:4,period:3.6,phase:.25,r:1.3},{type:"spikes",s:505,s1:530,side:1},{type:"mill",s:520,side:-1,speed:1.1},{type:"jaws",s:545,period:4.2,phase:.2},{type:"mine",s:556,d:0,amp:3.2,period:3.5,r:.75},{type:"boost",s:560,d:0,len:8,w:3,power:3}],theme:{sky:["#7fc8f2","#e8f7ff"],fog:"#dcefff",fogNear:70,fogFar:260,water:"#4fb3ef",waterEdge:"#86d4fa",foam:"#ffffff",wall:"#ee9147",ledge:"#f7b169",rail:"#86c540",railRing:"#5f9c2a",cliff:["#ef8f7d","#e57a6c","#f4a28f","#e8857a"],top:"#f6bf98",sand:"#f8d4a3",grass:"#9fd25a",leaf:["#5fae3a","#79c447","#4e9a33"],trunk:"#8a5a3c",rock:"#8d8f99",far:"#f3b49a"}},ul={id:"glacier",name:"Les Rapides du Glacier",short:"Glacier",kind:"coop",players:"1-4",blurb:"Slalom entre les icebergs, geysers glacés, troncs à la dérive et un toboggan de glace vertigineux.",par:[130,185,280],segs:[{len:32,w:12,flow:.6,L:"beach",R:"beach",h:3},{len:14,w:6,flow:2.4,L:"canyon",R:"canyon",h:7},{len:32,turn:-25,flow:2.8},{len:30,turn:35},{len:26,w:7.5,flow:2.4,L:"mesa"},{len:30,turn:-15},{len:22,w:6.5},{len:40,w:6.2,turn:22,flow:3,R:"mesa"},{len:30,turn:-30},{len:52,dy:-12,w:5.6,flow:5.6,L:"canyon",R:"canyon",h:11},{len:22,w:10,flow:1.4},{len:40,turn:30,w:6.5,flow:2.8,L:"mesa",R:"canyon",h:8},{len:40,turn:-35,w:6},{len:18,w:7},{len:50,w:8,turn:10,flow:2.4,L:"mesa",R:"mesa"},{len:40,turn:-25,w:6,L:"canyon",R:"canyon",h:8},{len:18,w:6.5},{len:40,turn:20,dy:-4,flow:3.6},{len:28,w:12,flow:.8,L:"beach",R:"beach",h:3}],spawn:[0,.38],start:[1,.7],checkpoints:[[6,.5],[10,.6],[13,.5],[16,.5]],finish:[18,.5],hazards:[{type:"rock",at:[0,.2],d:-8,r:1.8},{type:"rock",at:[0,.7],d:8,r:1.5},{type:"rock",at:[2,.25],d:3.7,r:1.2},{type:"rock",at:[2,.55],d:-3.7,r:1.2},{type:"rock",at:[2,.85],d:3.6,r:1.1},{type:"rock",at:[3,.35],d:-3.6,r:1.1},{type:"spikes",at:[3,.55],to:[3,.95],side:1},{type:"geyser",at:[4,.3],d:-2,r:1.8,period:4.2},{type:"geyser",at:[4,.75],d:2.4,r:1.8,period:4.2,phase:.5},{type:"geyser",at:[5,.35],d:0,r:2,period:3.6,phase:.25},{type:"mine",at:[5,.6],d:0,amp:3.5,period:4.5,r:.8},{type:"geyser",at:[5,.85],d:-2.5,r:1.6,period:3.8,phase:.7},{type:"log",at:[7,.3],d:0,amp:3.6,period:6,len:4.5},{type:"log",at:[7,.7],d:0,amp:3.6,period:5,phase:.5,len:4},{type:"spikes",at:[8,.1],to:[8,.9],side:-1},{type:"log",at:[8,.4],d:1,amp:2.5,period:4,phase:.2,len:4},{type:"mine",at:[8,.8],d:0,amp:3.5,period:3.8,phase:.4,r:.8},{type:"boost",at:[9,.02],d:0,len:8,w:3,power:3},{type:"spikes",at:[9,.15],to:[9,.9],side:1,inset:.6},{type:"spikes",at:[9,.25],to:[9,.95],side:-1,inset:.6},{type:"mill",at:[11,.35],side:-1,speed:.85},{type:"spikes",at:[11,.55],to:[11,.95],side:1},{type:"mill",at:[11,.85],side:1,speed:-.9,phase:.3},{type:"jaws",at:[12,.3],period:4.4},{type:"jaws",at:[12,.75],period:4.4,phase:.5},{type:"geyser",at:[14,.2],d:2.5,r:1.8,period:4,phase:.1},{type:"mine",at:[14,.4],d:0,amp:4,period:5,r:.8},{type:"geyser",at:[14,.6],d:-2.5,r:1.8,period:4,phase:.6},{type:"mine",at:[14,.8],d:1,amp:4.5,period:4,phase:.3,r:.8},{type:"spikes",at:[15,.05],to:[15,.95],side:-1},{type:"bar",at:[15,.3],period:3.6},{type:"bar",at:[15,.7],period:3.2,phase:.4},{type:"log",at:[17,.25],d:0,amp:3,period:4.5,len:4},{type:"saw",at:[17,.55],d:0,amp:4,period:4.4,r:1.3},{type:"saw",at:[17,.85],d:0,amp:4,period:3.8,phase:.5,r:1.3}],theme:{sky:["#8fcdf5","#f2fbff"],fog:"#e3f3ff",fogNear:70,fogFar:260,water:"#2f9fd4",waterEdge:"#86d9f7",foam:"#ffffff",wall:"#7fb6d8",ledge:"#e3f4ff",rail:"#94d8f2",railRing:"#5aaed6",cliff:["#eef8ff","#d4ebf8","#f8fcff","#bcdcef"],top:"#ffffff",sand:"#eef8ff",grass:"#d9f1ff",leaf:["#2f7d5a","#3b9168","#286b4c"],trunk:"#7a5236",rock:"#a7bed3",far:"#d6ebfa",farTop:"#ffffff",snowRocks:!0,trap:"#3b78c9",trapHi:"#79abea",spike:"#f4fbff",mine:"#4a86d8",tower:"#b9e3f7",bush:"#bdeeff",flora:{tree0:7,tree1:7,palm:7,bamboo:10,reeds:null,grass:10,bush:10},light:{sky:"#eef8ff",ground:"#cfe3f2",sun:"#ffffff",hemiI:1.5,sunI:1.45}}},qx={id:"marais",name:"Le Marais au Crépuscule",short:"Marais",kind:"coop",players:"1-4",blurb:"Au coucher du soleil, les crocodiles claquent des dents entre les tourbillons et les mines toxiques.",par:[140,200,300],segs:[{len:30,w:12,flow:.6,L:"beach",R:"beach",h:3},{len:14,w:6.2,flow:2.2,L:"canyon",R:"beach",h:6},{len:36,turn:30,flow:2.4},{len:30,turn:-20,w:7},{len:30,turn:-25},{len:20,w:6.5},{len:46,w:8,turn:15,flow:2.2,L:"mesa",R:"beach"},{len:30,turn:-30,w:6.5,L:"canyon"},{len:20,w:7},{len:40,dy:-7,w:5.6,flow:4.6,L:"canyon",R:"canyon",h:9},{len:34,turn:40,w:7,flow:2.6,L:"mesa",R:"canyon"},{len:30,turn:-40},{len:18,w:6.5},{len:46,w:7.5,turn:10,flow:2.6,L:"beach",R:"mesa"},{len:40,turn:-25,w:6,L:"canyon",R:"canyon",h:8},{len:18,w:6.5},{len:36,turn:20,dy:-3,flow:3.4,L:"beach",R:"beach"},{len:28,w:12,flow:.8,h:3}],spawn:[0,.38],start:[1,.7],checkpoints:[[5,.5],[8,.5],[12,.5],[15,.5]],finish:[17,.5],hazards:[{type:"rock",at:[0,.25],d:-8.5,r:1.6},{type:"rock",at:[0,.75],d:8,r:1.4},{type:"croc",at:[2,.25],d:2.6,period:3.4,r:1.2},{type:"croc",at:[2,.55],d:-2.6,period:3.4,phase:.5,r:1.2},{type:"croc",at:[2,.85],d:2.2,period:3,phase:.2,r:1.2},{type:"whirl",at:[3,.5],d:0,r:4.6,dir:-1,strength:3.4},{type:"spikes",at:[3,.1],to:[3,.9],side:1},{type:"log",at:[4,.3],d:0,amp:3,period:5,len:4.5},{type:"log",at:[4,.75],d:0,amp:3,period:4.2,phase:.5,len:4},{type:"mine",at:[6,.2],d:0,amp:4,period:6,r:.75},{type:"mine",at:[6,.45],d:-1.5,amp:3.2,period:5,phase:.3,r:.75},{type:"mine",at:[6,.7],d:1.5,amp:3.5,period:5.5,phase:.6,r:.75},{type:"mine",at:[6,.92],d:0,amp:3.5,period:4.6,phase:.15,r:.75},{type:"croc",at:[7,.2],d:-2.8,period:3.8,r:1.1},{type:"croc",at:[7,.5],d:2.8,period:3.8,phase:.33,r:1.1},{type:"croc",at:[7,.8],d:-2.6,period:3.8,phase:.66,r:1.1},{type:"spikes",at:[7,.05],to:[7,.95],side:1},{type:"boost",at:[9,.02],d:0,len:8,w:3,power:3},{type:"spikes",at:[9,.15],to:[9,.9],side:-1,inset:.6},{type:"spikes",at:[9,.2],to:[9,.95],side:1,inset:.6},{type:"mill",at:[10,.3],side:1,speed:.9},{type:"whirl",at:[10,.6],d:1,r:4,dir:1,strength:3},{type:"mill",at:[10,.85],side:-1,speed:-.85,phase:.25},{type:"jaws",at:[11,.35],period:4.2},{type:"jaws",at:[11,.8],period:4.2,phase:.45},{type:"croc",at:[13,.2],d:0,amp:3,period:4,r:1.2},{type:"saw",at:[13,.45],d:0,amp:4.3,period:4.6,r:1.3},{type:"croc",at:[13,.7],d:0,amp:3.2,period:3.6,phase:.5,r:1.2},{type:"saw",at:[13,.92],d:0,amp:4,period:3.8,phase:.3,r:1.3},{type:"spikes",at:[14,.05],to:[14,.95],side:1},{type:"bar",at:[14,.3],period:3.4},{type:"bar",at:[14,.7],period:3,phase:.5},{type:"mine",at:[16,.2],d:0,amp:3.5,period:3.6,r:.8},{type:"croc",at:[16,.45],d:-2.4,period:2.8,r:1.2},{type:"jaws",at:[16,.7],period:4},{type:"mill",at:[16,.9],side:1,speed:1}],theme:{sky:["#f08a6e","#ffe2b8"],fog:"#ffd2a8",fogNear:60,fogFar:240,water:"#3a9c8a",waterEdge:"#7ccaa6",foam:"#eafff4",wall:"#8a6a4a",ledge:"#b0915f",rail:"#7a9e3a",railRing:"#557a24",cliff:["#916f92","#7b5d80","#a483a3","#6d5370"],top:"#6f9a4f",sand:"#c9a874",grass:"#7fae4a",leaf:["#4f8a3a","#6aa548","#3f7530"],trunk:"#5a3f2e",rock:"#6f6a7a",far:"#b98aa8",farTop:"#6f9a4f",trap:"#e08a2a",trapHi:"#f2b35a",spike:"#fff3d6",mine:"#8a4fd0",tower:"#c98a5a",bush:"#5f9a3e",mush:"#c0479a",croc:"#5e9e3e",cloud:"#ffd9c2",flora:{tree0:8,tree1:9,palm:8,bamboo:3,reeds:4,grass:5,bush:9},light:{sky:"#ffe4c8",ground:"#9a7a9a",sun:"#ffc48a",hemiI:1.35,sunI:1.7}}},$x={id:"cascades",name:"Les Cascades Turquoise",short:"Cascades",kind:"coop",players:"1-4",blurb:"Trois cascades vertigineuses dans la jungle, des tourniquets à piques et des crocodiles dans les bassins.",par:[150,210,310],segs:[{len:30,w:12,flow:.6,L:"beach",R:"beach",h:3},{len:14,w:6,flow:2.4,L:"canyon",R:"canyon",h:7},{len:30,turn:20,w:8,flow:2.8},{len:16,dy:-5,flow:5,w:5.8},{len:26,w:8.5,flow:1.6,turn:-20},{len:20,w:6.5},{len:40,turn:30,w:8,flow:2.8,L:"mesa"},{len:16,dy:-6,flow:5.5,w:5.6,L:"canyon",h:9},{len:26,w:9,flow:1.6},{len:20,w:6.5,turn:-20},{len:40,turn:-25,w:6.5,flow:2.8},{len:30,turn:30,R:"mesa"},{len:18,dy:-7,flow:6,w:5.6,R:"canyon",h:10},{len:24,w:9,flow:1.6},{len:40,turn:20,w:8,flow:3,R:"mesa"},{len:30,turn:-30,w:6.5},{len:18,w:6.5},{len:30,turn:10,dy:-3,w:8,flow:3.6,R:"canyon"},{len:28,w:12,flow:.8,L:"beach",R:"beach",h:3}],spawn:[0,.38],start:[1,.7],checkpoints:[[5,.3],[9,.5],[13,.75],[16,.5]],finish:[18,.5],hazards:[{type:"rock",at:[0,.25],d:-8.5,r:1.6},{type:"rock",at:[0,.75],d:8,r:1.4},{type:"turnstile",at:[2,.5],d:0,len:2.8,speed:.9},{type:"spikes",at:[3,.1],to:[3,.9],side:1,inset:.6},{type:"whirl",at:[4,.45],d:1.5,r:4.4,dir:-1,strength:3},{type:"rock",at:[4,.8],d:-4,r:1.3},{type:"turnstile",at:[6,.45],d:0,len:2.8,speed:-1,phase:.25},{type:"spikes",at:[6,.58],to:[6,.7],side:-1},{type:"turnstile",at:[6,.85],d:0,len:2.8,speed:1.1},{type:"spikes",at:[7,.1],to:[7,.9],side:1,inset:.6},{type:"spikes",at:[7,.2],to:[7,.95],side:-1,inset:.6},{type:"mine",at:[8,.35],d:0,amp:4.5,period:5,r:.8},{type:"mine",at:[8,.75],d:1,amp:4,period:4.2,phase:.5,r:.8},{type:"mill",at:[10,.3],side:1,speed:.9},{type:"jaws",at:[10,.75],period:4.4},{type:"croc",at:[11,.25],d:2.6,period:3.4,r:1.15},{type:"log",at:[11,.55],d:0,amp:3,period:4.8,len:4.2},{type:"croc",at:[11,.85],d:-2.6,period:3.4,phase:.5,r:1.15},{type:"boost",at:[12,.02],d:0,len:8,w:3,power:3},{type:"spikes",at:[12,.15],to:[12,.9],side:-1,inset:.6},{type:"turnstile",at:[14,.4],d:0,len:2.8,speed:1.2},{type:"spikes",at:[14,.5],to:[14,.95],side:1},{type:"saw",at:[15,.3],d:0,amp:4,period:4.8,r:1.3},{type:"saw",at:[15,.72],d:0,amp:4,period:4.2,phase:.5,r:1.3},{type:"turnstile",at:[17,.3],d:0,len:2.8,speed:-1.2},{type:"mine",at:[17,.7],d:0,amp:3.4,period:3.6,r:.8}],theme:{sky:["#5ec4f0","#e2f8ff"],fog:"#d6f2ff",fogNear:70,fogFar:260,water:"#1fb4c4",waterEdge:"#7fe6e8",foam:"#ffffff",wall:"#c98a4a",ledge:"#e2ab66",rail:"#86c540",railRing:"#5f9c2a",cliff:["#7fae5a","#6a9a4c","#90c068","#5d8a44"],top:"#7ab84c",sand:"#f0d49a",grass:"#86c540",leaf:["#3f9a3a","#5cb848","#2f7f2f"],trunk:"#7a5236",rock:"#8a8f80",far:"#9ccf7a",farTop:"#5f9c3a",croc:"#4f8f36",bush:"#4f9a3a",flora:{tree0:1,tree1:0,palm:2,bamboo:3,reeds:4,grass:5,bush:6}}},Vs="#ff8fb1",Da="#ffd23f",Jr="#4fd1c5",Mi="#ff9f43",Na="#b58cf0",Zr="#fff1d6",Yx={id:"parcours",name:"Le Parcours Pétillant",short:"Parcours",kind:"race",players:"1-4",foot:!0,blurb:"Une course d’obstacles au-dessus du lagon : barres tournantes, plateformes mobiles, marteaux et bumpers. Le premier arrivé gagne !",par:[45,70,120],spawn:[[-4.5,2,3,0],[-1.5,2,3,0],[1.5,2,3,0],[4.5,2,3,0]],finishZ:150,parts:[{type:"box",p:[0,1,4],s:[16,2,10],c:Zr},{type:"box",p:[0,1,13],s:[10,2,8],c:Vs},{type:"disc",p:[0,1,25],r:9,h:2,c:Da},{type:"sweeper",p:[0,2.6,25],len:8.6,r:.45,speed:1.35,c:Na},{type:"box",p:[0,1,37],s:[6,2,6],c:Vs},{type:"box",p:[-5,1.5,44],s:[5,1,5],move:[10,0,0],period:4,c:Jr},{type:"box",p:[5,1.5,51],s:[5,1,5],move:[-10,0,0],period:4.4,phase:.3,c:Mi},{type:"box",p:[0,.2,58],s:[5,1,5],move:[0,2.6,0],period:3.2,c:Jr},{type:"box",p:[0,1,66],s:[10,2,6],c:Zr},{type:"box",p:[0,1,79],s:[3.4,2,20],c:Da},{type:"gantry",p:[0,9,79],len:18,w:6},{type:"hammer",p:[0,9,73],len:5.8,r:1,period:2.6,c:Vs},{type:"hammer",p:[0,9,79],len:5.8,r:1,period:2.6,phase:.33,c:Vs},{type:"hammer",p:[0,9,85],len:5.8,r:1,period:2.6,phase:.66,c:Vs},{type:"box",p:[0,1,99],s:[16,2,18],c:Zr},{type:"bumper",p:[-4,2,94],r:1,h:2.2,c:Mi},{type:"bumper",p:[3,2,96],r:1,h:2.2,c:Mi},{type:"bumper",p:[-1,2,100],r:1.2,h:2.2,c:Mi},{type:"bumper",p:[5,2,102],r:1,h:2.2,c:Mi},{type:"bumper",p:[-5,2,104],r:1,h:2.2,c:Mi},{type:"bumper",p:[1.5,2,105],r:.9,h:2.2,c:Mi},{type:"sweeper",p:[0,2.6,99],len:7.5,r:.4,speed:-1,half:!0,arms:2,c:Na},{type:"disc",p:[0,1.2,114],r:4,h:2,spin:.8,c:Jr},{type:"disc",p:[4,1.6,123],r:3.4,h:2,spin:-1,c:Na},{type:"disc",p:[-2,2,132],r:3.4,h:2,spin:1.2,c:Jr},{type:"box",p:[0,1.6,139.5],s:[5,1.2,4],bounce:15,c:Da},{type:"box",p:[0,3,149],s:[14,2,12],c:Zr}],checkpoints:[{p:[0,2,37],s:[6,4,6]},{p:[0,2,66],s:[10,4,6]},{p:[0,2,92],s:[16,4,4]},{p:[0,4,145],s:[14,4,4]}],finish:{p:[0,4,151],s:[14,4,4]},theme:ll.theme},vf=[];for(let n=0;n<12;n++){const e=n/12*Math.PI*2,t=10;vf.push({type:"box",p:[Math.cos(e)*t,1,Math.sin(e)*t],s:[5.4,2,4.4],yaw:-e+Math.PI/2,c:n%2?"#ffd23f":"#ff9f43",sink:{start:15,period:14,phase:n*5/12%1,on:.62}})}const jx={id:"tourbillon",name:"Le Grand Tourbillon",short:"Tourbillon",kind:"survival",players:"1-4",foot:!0,blurb:"Restez sur l’arène le plus longtemps possible : les barres accélèrent et le sol s’enfonce. Le dernier debout gagne !",par:[90,60,30],spawn:[[2.5,2,-2.5,0],[2.5,2,2.5,Math.PI],[-2.5,2,2.5,Math.PI],[-2.5,2,-2.5,0]],accel:.006,maxTime:150,parts:[{type:"disc",p:[0,1,0],r:7.4,h:2,c:"#4fd1c5"},...vf,{type:"sweeper",p:[0,2.6,0],len:12.6,r:.45,speed:.85,phase:0,c:"#b58cf0"},{type:"sweeper",p:[0,3.35,0],len:12.6,r:.45,speed:-.55,half:!0,arms:1,start:30,c:"#ff5d8f"}],checkpoints:[],theme:ll.theme},Gs="#eef8ff",Ws="#9fdcf5",Qr="#4a86d8",uh="#ff8fb1",Kx="#b58cf0",hh="#ffd23f",Jx={id:"glissade",name:"La Grande Glissade",short:"Glissade",kind:"race",players:"1-4",foot:!0,blurb:"Course sur la glace : ça glisse, ça tourne, ça repousse. Gardez l’équilibre jusqu’à l’arrivée !",par:[50,80,130],spawn:[[-4.5,2,3,0],[-1.5,2,3,0],[1.5,2,3,0],[4.5,2,3,0]],finishZ:154,parts:[{type:"box",p:[0,1,4],s:[16,2,10],c:Gs},{type:"box",p:[0,1,15],s:[9,2,12],ice:!0,c:Ws},{type:"box",p:[0,1,28],s:[14,2,3],spin:.6,c:Qr},{type:"box",p:[0,1.01,28],s:[3,2,14],spin:.6,c:Qr},{type:"box",p:[0,1,40],s:[8,2,6],c:Gs},{type:"box",p:[0,1,52],s:[6,2,14],conveyor:[0,-3],c:Kx},{type:"gantry",p:[0,9,52],len:24,w:4.5},{type:"hammer",p:[0,9,48.5],len:5.8,r:.9,period:2.8,axis:"x",c:uh},{type:"hammer",p:[0,9,55.5],len:5.8,r:.9,period:2.8,phase:.5,axis:"x",c:uh},{type:"disc",p:[0,.4,65],r:3,h:2,move:[0,1.6,0],period:3,c:Ws},{type:"disc",p:[-2,.4,72],r:3,h:2,move:[0,1.6,0],period:3,phase:.33,c:Ws},{type:"disc",p:[1,.4,79],r:3,h:2,move:[0,1.6,0],period:3,phase:.66,c:Ws},{type:"box",p:[0,1,89],s:[10,2,6],c:Gs},{type:"box",p:[0,1,104],s:[4.5,2,24],ice:!0,c:Ws},{type:"sweeper",p:[0,2.6,99],len:3.4,r:.4,speed:2,c:hh},{type:"sweeper",p:[0,2.6,109],len:3.4,r:.4,speed:-2.2,phase:.25,c:hh},{type:"box",p:[0,1,120],s:[10,2,6],c:Gs},{type:"box",p:[-5,1.5,128],s:[5,1,5],move:[10,0,0],period:3.6,c:Qr},{type:"box",p:[5,1.5,135],s:[5,1,5],move:[-10,0,0],period:4,phase:.4,c:Qr},{type:"box",p:[0,1,148],s:[14,2,14],c:Gs}],checkpoints:[{p:[0,2,40],s:[8,4,6]},{p:[0,2,89],s:[10,4,6]},{p:[0,2,120],s:[10,4,6]}],finish:{p:[0,2,152],s:[14,4,4]},theme:ul.theme},Zx=[[1,1],[-1,1],[-1,-1],[1,-1]].map(([n,e],t)=>({type:"box",p:[n*9,1,e*9],s:[6,2,6],ice:!0,c:"#c4ecfb",sink:{start:22+t*8,period:40,on:.08}})),Qx={id:"patinoire",name:"La Patinoire Folle",short:"Patinoire",kind:"survival",players:"1-4",foot:!0,blurb:"Une patinoire glissante, des bumpers qui foncent et des coins qui fondent : tenez le plus longtemps possible !",par:[100,70,35],spawn:[[3,2,-3,0],[3,2,3,Math.PI],[-3,2,3,Math.PI],[-3,2,-3,0]],accel:.004,maxTime:150,parts:[{type:"box",p:[0,1,0],s:[12,2,24],ice:!0,c:"#9fdcf5"},{type:"box",p:[0,1.005,0],s:[24,2,12],ice:!0,c:"#9fdcf5"},...Zx,{type:"bumper",p:[-10,2,0],r:1.2,h:2.2,move:[20,0,0],period:7,c:"#ff9f43"},{type:"bumper",p:[0,2,-10],r:1.2,h:2.2,move:[0,0,20],period:8,phase:.5,c:"#ff9f43"},{type:"sweeper",p:[0,2.6,0],len:12,r:.45,speed:.7,half:!0,arms:2,start:12,c:"#b58cf0"}],checkpoints:[],theme:ul.theme};function e1(n){const e=[];let t=0;for(const r of n.segs)e.push(t),t+=r.len;const i=r=>Array.isArray(r)?e[r[0]]+r[1]*n.segs[r[0]].len:r,s={...n,spawn:i(n.spawn),start:i(n.start),finish:i(n.finish),checkpoints:n.checkpoints.map(i)};return s.hazards=n.hazards.map(({at:r,to:o,...a})=>({...a,s:r!=null?i(r):a.s,...o!=null?{s1:i(o)}:{}})),s}function t1(n){if(!n.par){const e=n.finish/575;n.par=[150,210,300].map(t=>Math.round(t*e/5)*5)}return n}const eo=[ll,ul,qx,$x].map(e1).map(t1),hl=[eo[0],Yx,eo[1],jx,eo[2],Jx,eo[3],Qx],Un=Object.fromEntries(hl.map(n=>[n.id,n])),Fc=["lagon","parcours","glacier","tourbillon","marais","glissade"],fh="pouf.v1.",kc="pouf.v1.board",fl=(n,e)=>{try{return JSON.parse(localStorage.getItem(n))??e}catch{return e}},_f=(n,e)=>{try{localStorage.setItem(n,JSON.stringify(e))}catch{}},Fa=n=>160+n*90;function Kn(n){let e=1;for(;n>=Fa(e);)n-=Fa(e),e++;return{level:e,into:n,need:Fa(e)}}const Xs=120;function n1(n){const e=fl(fh+n.id,null)||{},t={id:n.id,name:n.psn||"Joueur",look:{...i1(n.id),...e.look||{}},xp:e.xp||0,coins:e.coins??50,bought:e.bought||[],stats:{runs:0,finishes:0,pops:0,puffSec:0,supers:0,cps:0,...e.stats||{}},best:e.best||{},settings:{aim:"push",invert:!1,camSpeed:1,...e.settings||{}},tutorial:!!e.tutorial};return t.save=()=>_f(fh+n.id,{look:t.look,xp:t.xp,coins:t.coins,bought:t.bought,stats:t.stats,best:t.best,settings:t.settings,tutorial:t.tutorial}),t.level=()=>Kn(t.xp).level,t.owns=(i,s)=>!s.lvl||t.level()>=s.lvl||t.bought.includes(i+":"+s.id),t}function i1(n){const e=Math.abs(s1(n));return{...ol(e%4),hat:["none","cap","party","flower"][(e>>3)%4]}}const s1=n=>{let e=0;for(const t of String(n))e=e*31+t.charCodeAt(0)|0;return e},xf={species:Di,hat:uf,extra:hf,gas:xo,emote:jn,color:rl.map(n=>({id:n,name:n}))};function dl(n,e,t){if(n.kind==="survival"){const[r,o,a]=n.par;return e>=r?3:e>=o?2:e>=a?1:0}if(!t)return 0;const[i,s]=n.par;return e<=i?3:e<=s?2:1}function r1(n,e){const t=n.riders.find(r=>r.id===e);if(!t)return null;const i=n.kind==="survival",s=i?t.out??t.time??n.time:t.time;return{mine:t,value:s,finished:i?!0:t.time!=null,survival:i}}function o1(n,e,t){const i=Un[e.course];if(i.foot)return a1(n,e,t,i);const s=e.riders.find(f=>f.id===t),r=dl(i,e.time,e.finished),o=Kn(n.xp).level;let a=40+e.cps*25+(e.finished?120:0)+r*40+(e.riders.length>1?30:0);e.finished&&e.deaths===0&&(a+=60);const l=Math.round(a/4);n.xp+=a,n.coins+=l;const u=n.stats;u.runs++,e.finished&&u.finishes++,u.pops+=e.deaths,u.cps+=e.cps,s&&(u.puffSec+=s.puff,u.supers+=s.supers);let c=!1;if(e.finished){const f=n.best[i.id];!f||e.time<f.time?(n.best[i.id]={time:e.time,deaths:e.deaths,stars:r,at:Date.now()},c=!0):r>f.stars&&(f.stars=r),yf(i.id,{time:e.time,deaths:e.deaths,stars:r,names:e.riders.map(h=>h.name),at:Date.now()})}n.save();const p=Kn(n.xp).level,m=[];if(p>o)for(const[f,h]of Object.entries(xf))for(const v of h)v.lvl&&v.lvl>o&&v.lvl<=p&&m.push({kind:f,...v});return{xp:a,coins:l,stars:r,record:c,levelUp:p>o?p:0,unlocked:m}}function a1(n,e,t,i){const s=r1(e,t),r=Kn(n.xp).level,o=e.riders.length,a=s.finished?dl(i,s.value,!0):0;let l=40+a*35+(s.finished?60:0)+(o>1?[90,55,30,15][s.mine.rank-1]||10:0);s.survival&&(l+=Math.round(s.value));const u=Math.round(l/4);n.xp+=l,n.coins+=u,n.stats.runs++,s.finished&&n.stats.finishes++,s.mine.rank===1&&o>1&&(n.stats.wins=(n.stats.wins||0)+1);let c=!1;if(s.finished&&s.value!=null){const f=n.best[i.id];!f||(s.survival?s.value>f.time:s.value<f.time)?(n.best[i.id]={time:s.value,deaths:0,stars:a,at:Date.now()},c=!0):a>f.stars&&(f.stars=a),yf(i.id,{time:s.value,deaths:0,stars:a,names:[s.mine.name],at:Date.now()},s.survival)}n.save();const p=Kn(n.xp).level,m=[];if(p>r)for(const[f,h]of Object.entries(xf))for(const v of h)v.lvl&&v.lvl>r&&v.lvl<=p&&m.push({kind:f,...v});return{xp:l,coins:u,stars:a,record:c,levelUp:p>r?p:0,unlocked:m,rank:s.mine.rank}}function c1(n){const e={},t=Un[n.course];if(n.kind==="race"||n.kind==="survival")n.riders.forEach(i=>{e[i.id]=n.kind==="race"&&i.time==null?1:[10,7,5,3][i.rank-1]||2});else{const i=[1,4,6,8][dl(t,n.time,n.finished)],s=n.riders.slice().sort((r,o)=>o.puff-r.puff)[0];n.riders.forEach(r=>{e[r.id]=i+(r===s&&n.riders.length>1?2:0)})}return e}function l1(n){return fl(kc,{})[n]||[]}function yf(n,e,t=!1){const i=fl(kc,{}),s=i[n]||[];s.some(r=>Math.abs(r.time-e.time)<.01&&r.names.join()===e.names.join())||s.push(e),s.sort((r,o)=>t?o.time-r.time:r.time-o.time),i[n]=s.slice(0,10),_f(kc,i)}const pl=["ps","xbox","nintendo","generic"],dh=["Orientez le stick vers où la bouée doit aller, puis faites POUF !","Trois coups de piques et la bouée éclate : retour au dernier checkpoint.","Le SUPER POUF coûte beaucoup de gaz mais sauve des situations désespérées.","Deux joueurs du même côté poussent ensemble : coordonnez-vous !","Les mâchoires se referment en rythme : comptez avant de passer.","Vos amis peuvent vous rejoindre à tout moment avec le code du salon."],u1=()=>dh[Math.floor(Math.random()*dh.length)];function ml(n=!1){return R(`div.pf-logo${n?".small":""}`,R("span.l1","POUF"),R("span.l2","PARTY"),R("i.cloud"),R("i.cloud.c2"),R("i.cloud.c3"))}const Ze=(n,e,{primary:t=!1,cls:i="",ic:s=null,key:r=null,disabled:o=!1}={})=>R(`button.pf-btn${t?".primary":""}${i?"."+i:""}`,{f:!0,onok:()=>{Xe.ui("ok"),e()},"data-key":r,disabled:o},s&&R("span.icw",{html:ka(s)}),R("span",n));function an(n,e,t,i={}){const r={root:R(`div.pf-${e}`,t),hints:i.hints||[["ok","Sélectionner"],["back","Retour"]],cls:e,...i};return r.back??(r.back=()=>n.close(r)),n.push(r)}function is(n){for(const e of n.layers)e.refresh?.()}function ph(n){const e=n.profile,t=Kn(e.xp),i=cr(n.me.look.species);return R("div.pf-card.me",R("div.pf-av",{style:{background:n.me.look.color}},i.name[0]),R("div",R("div.nm",n.me.name),R("div.lv",`Niveau ${t.level}`),R("div.xp",R("i",{style:{width:t.into/t.need*100+"%"}}))),R("div.coins",R("b","●"),e.coins))}function h1(n){const e=R("div.pf-list",Ze("Jouer",()=>n.enterLobby(),{primary:!0,ic:"play",key:"play"}),Ze("Rejoindre une partie",()=>v1(n),{ic:"userPlus",key:"join"}),Ze("Personnaliser",()=>Sf(n),{ic:"sparkle",key:"custom"}),Ze("Épreuves et records",()=>bf(n),{ic:"trophy",key:"courses"}),Ze("Options",()=>wf(n),{ic:"settings",key:"options"}),Ze("Comment jouer",()=>vl(n),{ic:"info",key:"help"}),Ze("Quitter le jeu",()=>Oc(n),{ic:"power",key:"quit"})),t=R("div.pf-me-slot",ph(n)),i=an(n,"title",[R("div.pf-title-l",ml(),R("div.pf-tag-line","La descente de rivière la plus gonflée du lagon !"),e),t],{back:()=>Oc(n),hints:[["ok","Sélectionner"],["back","Quitter"]]});return i.refresh=()=>t.replaceChildren(ph(n)),i.onResume=()=>i.refresh(),n.state="title",n.syncCamera(),i}function Oc(n){ps("Quitter Pouf Party ?",n.lobby.members.length>1?"Vous quitterez la partie en cours et vos amis continueront sans vous.":"Vous retournerez à l’écran d’accueil de la console.","Quitter",()=>n.exit(),{danger:!0})}function f1(n,e){return n.closeAll(),an(n,"connect",R("div.pf-panel.small",R("div.pf-spin",R("i"),R("i"),R("i")),R("p",e),Ze("Annuler",()=>n.leaveLobby(),{key:"cancel"})),{back:()=>n.leaveLobby()})}function d1(n,e,t){mh({title:e,body:t,actions:[{label:"OK",primary:!0}]})}function p1(n){const{lobby:e}=n,t=R("div.pf-players"),i=R("div.pf-spect"),s=R("b"),r=R("span.st"),o=R("div.pf-course"),a=Ze("",()=>{if(e.isHost)n.canStart()?n.startMatch():(Xe.ui(),n.toast("Tout le monde n’est pas prêt","Attendez que vos amis appuient sur « Prêt »","error"));else{const p=e.members.find(m=>m.id===n.me.id);e.setReady(!p?.ready)}},{primary:!0,ic:"play",key:"start"});a.dataset.autofocus="";const l=Ze("Changer d’épreuve",()=>bf(n,{pick:!0}),{ic:"grid",key:"course"}),u=Ze("",()=>n.setTourMode(!n.tourMode),{ic:"trophy",key:"mode"}),c=an(n,"lobby",[R("div.pf-lobby-top",ml(!0),R("div.pf-code",R("span","CODE"),s),r),R("div.pf-lobby-l",R("div.pf-panel",R("h3","Joueurs"),t,i)),R("div.pf-lobby-r",R("div.pf-panel",R("h3","Épreuve"),o,R("div.pf-lobby-acts",l,u))),R("div.pf-lobby-b",a,Ze("Inviter des amis",()=>g1(n),{ic:"userPlus",key:"invite"}),Ze("Personnaliser",()=>Sf(n),{ic:"sparkle",key:"custom"}),Ze("Quitter le salon",()=>ps("Quitter le salon ?",e.isHost&&e.members.length>1?"Un autre joueur deviendra l’hôte.":"Vous retournerez au menu principal.","Quitter",()=>n.leaveLobby(),{danger:!0}),{ic:"close",key:"leave"}))],{back:()=>ps("Quitter le salon ?","Vous retournerez au menu principal.","Quitter",()=>n.leaveLobby(),{danger:!0}),hints:()=>[["ok","Sélectionner"],["back","Quitter le salon"]]});return c.refresh=()=>{s.textContent=e.code||"—",r.textContent=e.online?e.isHost?"Vous êtes l’hôte · en ligne":"Connecté à l’hôte":e.role==="local"?"Hors ligne · partie solo":"Reconnexion…",r.classList.toggle("off",!e.online);const p=e.members.length?e.members:[{...n.me,host:!0,ready:!0}];t.replaceChildren(...Array.from({length:bo},(d,g)=>{const x=p[g];if(!x)return R("div.pf-player.empty",R("div.pf-av"),R("div.nm","Place libre"),R("div.badge","Invitez un ami"));const y=x.id===n.me.id?n.me.look:x.look;return R(`div.pf-player${x.id===n.me.id?".me":""}${x.online===!1?".away":""}`,R("div.pf-av",{style:{background:y?.color}},cr(y?.species).name[0]),R("div.nm",x.name,x.id===n.me.id?R("small"," (vous)"):null),R(`div.badge${x.host?".host":x.ready?".ready":""}`,x.online===!1?"Reconnexion…":x.host?"Hôte":x.ready?"Prêt":"Pas prêt"))}));const m=p.slice(bo);i.replaceChildren(...m.length?[R("small",`Spectateurs : ${m.map(d=>d.name).join(", ")}`)]:[]);const f=n.course,h=n.profile.best[f.id];n.tourMode?o.replaceChildren(R("div.cn","Tournoi Pouf Party"),R("p",`${Fc.length} épreuves à la suite : chaque épreuve rapporte des points, le meilleur total gagne.`),R("ol.pf-tourlist",Fc.map(d=>R("li",Un[d].name," ",R(`span.kind.${Un[d].kind}`,gl[Un[d].kind]))))):o.replaceChildren(R("div.cn",f.name),R("p",f.blurb),m1(f),R("div.best",Mf(f,h))),l.classList.toggle("hidden",!e.isHost||n.tourMode),u.classList.toggle("hidden",!e.isHost),u.lastChild.textContent=n.tourMode?"Épreuve unique":"Mode tournoi";const v=e.members.find(d=>d.id===n.me.id);a.lastChild.textContent=e.isHost?e.members.length>1?"Lancer la partie":"Jouer en solo":v?.ready?"Prêt ! (annuler)":"Je suis prêt",a.classList.toggle("waiting",e.isHost&&!n.canStart()),rs.top===c&&c.focused&&!c.focused.isConnected&&rs.focusFirst(c),Uf()},c.onResume=()=>{n.state="lobby",n.syncCamera(),c.refresh()},n.state="lobby",n.syncCamera(),c.refresh(),c}const Do=n=>R("span.pf-stars",[1,2,3].map(e=>R(`i${e<=n?".on":""}`,"★"))),gl={coop:"Coopération",race:"Course",survival:"Survie"},ho=n=>n===1?"1er":`${n}e`;function m1(n){return R("div.meta",R("span",gl[n.kind]),R("span",`${n.players} joueurs`),n.kind==="survival"?R("span","Le dernier debout gagne"):R("span",`${n.checkpoints.length} checkpoints`))}function Mf(n,e,t="Record"){return e?[Do(e.stars),n.kind==="survival"?` ${t} : tenu ${wn(e.time)}`:` ${t} : ${wn(e.time)}`]:n.kind==="survival"?"Aucun record : tenez le plus longtemps possible":"Aucun record pour le moment"}function g1(n){const{lobby:e}=n,t=n.shareLink(),i=R("div.pf-friends"),s=async()=>{const a=`Viens jouer à Pouf Party avec moi ! Code ${e.code}`;try{if(navigator.share){await navigator.share({title:"Pouf Party",text:a,url:t});return}}catch(l){if(l?.name==="AbortError")return}try{await navigator.clipboard.writeText(t),n.toast("Lien copié",`Envoyez-le à vos amis · code ${e.code}`)}catch{mh({title:`Code de la partie : ${e.code}`,body:R("div","Envoyez ce lien à vos amis :",R("div.salon-link",t)),actions:[{label:"OK",primary:!0}]})}},r=()=>{const a=(Rn.friends||[]).filter(l=>Rn.presenceOf(l.id).online);if(!Rn.available||!a.length){i.replaceChildren(R("p.dim",Rn.party?"Les membres de votre groupe arrivent automatiquement dans ce salon quand ils lancent Pouf Party.":"Partagez le code ou le lien : vos amis l’ouvrent sur leur console et arrivent directement ici."));return}i.replaceChildren(R("h4","Amis en ligne"),...a.map(l=>R("div.pf-friend",{f:!0,onok:async()=>{try{Rn.party||await Rn.createParty(),Rn.startGame("pouf-party"),await Rn.invite(l.id),n.toast("Invitation envoyée",l.psn);const u=n.partyCode();u&&e.isHost&&n.moveLobby(u)}catch(u){n.toast("Invitation impossible",u.message,"error")}}},R("div.pf-av",l.psn[0]),R("div.nm",l.psn),R("span.badge","Inviter"))))},o=an(n,"invite",R("div.pf-panel.mid",R("h2","Inviter des amis"),R("div.pf-bigcode",e.code||"—"),R("p.dim","Vos amis choisissent « Rejoindre une partie » dans Pouf Party et saisissent ce code, ou ouvrent le lien."),R("div.salon-link",t),R("div.row",Ze("Partager le lien",s,{primary:!0,ic:"userPlus",key:"share"}),Ze("Fermer",()=>n.close(o),{key:"close"})),i));return r(),o}function v1(n){const e=R("input.f-input.pf-codein",{type:"text",maxLength:5,autocapitalize:"characters",autocorrect:"off",spellcheck:!1,enterkeyhint:"go",placeholder:"EX : K7P2Q","aria-label":"Code de la partie"}),t=r=>{n.close(s),n.joinCode(r)};e.addEventListener("keydown",r=>{r.key==="Enter"&&(r.preventDefault(),r.stopPropagation(),e.blur(),t(e.value))});const i=R("div.f-row",{f:!0,"data-autofocus":"",onok:()=>{pl.includes(Ht.device)?Nf({title:"Code de la partie (5 caractères)",maxLength:5,onDone:r=>t(r)}):e.focus()}},R("label.f-label","Code de la partie de votre ami"),e),s=an(n,"join",R("div.pf-panel.mid",R("h2","Rejoindre une partie"),R("p.dim","Demandez le code à 5 caractères affiché dans le salon de votre ami."),i,R("div.row",Ze("Rejoindre",()=>t(e.value),{primary:!0,ic:"play",key:"go"}),Ze("Annuler",()=>n.close(s),{key:"cancel"}))));return s}function Sf(n){const e=n.profile,t={...n.me.look},i=R("div.pf-custom-head"),s=[],r=[["species","Personnage",Di,f=>`${f.name} · ${f.kind}`],["color","Couleur",rl.map(f=>({id:f,name:f})),null],["hat","Chapeau",uf,f=>f.name],["extra","Accessoire",hf,f=>f.name],["gas","Gaz",xo,f=>f.name]],o=()=>{n.setLook({...t}),a()},a=()=>{n.arena.cam.mode="closeup",n.arena.cam.focusId=n.me.id};for(const[f,h,v,d]of r){const g=R("div.val"),x=R("div.lock"),y=()=>Math.max(0,v.findIndex(T=>T.id===t[f]));let M=y();const w=()=>{const T=v[M],U=e.owns(f,T);g.replaceChildren(...[f==="color"?R("i.swatch",{style:{background:T.id}}):f==="gas"?R("i.swatch",{style:{background:`linear-gradient(90deg, ${T.c.join(",")})`}}):null,d?R("span",d(T)):null].filter(Boolean)),x.textContent=U?t[f]===T.id?"Équipé":"Appuyez pour équiper":`Niveau ${T.lvl} · ou ${Xs} pièces`,_.classList.toggle("locked",!U)},b=T=>{M=(M+T+v.length)%v.length;const U=v[M];e.owns(f,U)&&(t[f]=U.id,f==="species"&&(t.color=U.main),o(),l()),w(),Xe.ui()},_=R("div.pf-crow",{f:!0,onok:()=>{const T=v[M];if(e.owns(f,T)){t[f]=T.id,o(),l();return}if(e.coins<Xs){Xe.sputter(),n.toast("Pas assez de pièces",`Il faut ${Xs} pièces ou le niveau ${T.lvl}`,"error");return}ps("Débloquer cet objet ?",`${d?d(T):T.name} pour ${Xs} pièces (vous en avez ${e.coins}).`,"Débloquer",()=>{e.coins-=Xs,e.bought.push(f+":"+T.id),e.save(),t[f]=T.id,o(),l(),u(),Xe.fanfare()})}},R("div.lab",h),R("button.arr",{type:"button",onclick:T=>{T.stopPropagation(),b(-1)}},"‹"),g,R("button.arr",{type:"button",onclick:T=>{T.stopPropagation(),b(1)}},"›"),x);_.adjust=b,_.sync=()=>{M=y(),w()},s.push(_)}const l=()=>s.forEach(f=>f.sync()),u=()=>{const f=Kn(e.xp);i.replaceChildren(R("div",`Niveau ${f.level}`,R("small",` · ${f.into} / ${f.need} XP`)),R("div.coins",R("b","●"),`${e.coins} pièces`))};u(),l();const c=R("div.pf-emotes",jn.map((f,h)=>R(`div.emo${e.level()>=(f.lvl||0)?"":".locked"}`,R("b",f.icon),R("span",f.name),R("small",e.level()>=(f.lvl||0)?`Touche ${h+1}`:`Niveau ${f.lvl}`)))),p=n.state,m=an(n,"custom",R("div.pf-panel.side",R("h2","Personnaliser"),i,...s,R("h4","Emotes"),c,Ze("Terminé",()=>m.back(),{primary:!0,key:"done"})),{hints:[["ok","Équiper / débloquer"],["back","Terminé"]],onAction:f=>gh(m,f),onEnter:a,onLeave:()=>{n.arena.cam.mode="orbit",n.state=p,n.syncCamera()}});return m}function bf(n,{pick:e=!1}={}){const t=hl.map(s=>{const r=n.profile.best[s.id],o=l1(s.id).slice(0,5),a=s.kind==="survival"?`Objectif ★★★ : tenir ${wn(s.par[0])}`:`Objectif ★★★ : ${wn(s.par[0])}`;return R(`div.pf-ccard${n.course.id===s.id?".sel":""}`,{f:!0,onok:()=>{e&&n.lobby.isHost&&(n.setCourse(s),n.close(i))}},R("div.cn",s.name," ",R(`span.kind.${s.kind}`,gl[s.kind])),R("p",s.blurb),R("div.meta",R("span",`${s.players} joueurs`),R("span",a)),R("div.best",Mf(s,r,"Votre record")),R("h4","Records de la console"),o.length?R("ol.pf-board",o.map(l=>R("li",R("b",wn(l.time)),Do(l.stars),R("span",l.names.join(", ")),s.kind==="coop"?R("small",`${l.deaths} 💥`):null))):R("p.dim","Aucun record : soyez les premiers !"))}),i=an(n,"courses",R("div.pf-panel.wide",R("h2",e?"Choisir l’épreuve":"Épreuves et records"),R("div.pf-ccards",{"data-scroll":"y","data-row":""},t),Ze("Retour",()=>n.close(i),{key:"back"})));return i}function wf(n){const e=n.settings,t=(s,r,o,a,l)=>{const u=R("span"),c=()=>{u.textContent=(a.find(f=>f[0]===o())||a[0])[1]},p=f=>{let h=a.findIndex(v=>v[0]===o());h=(h+f+a.length)%a.length,l(a[h][0]),c(),n.profile.save(),Xe.ui()},m=R("div.set-item",{f:!0,onok:()=>p(1)},R("div.sl",R("div.st",s),R("div.sd",r)),R("div.sv.cycle",R("span.icw",{html:ka("chevron","l")}),u,R("span.icw",{html:ka("chevron")})));return m.adjust=p,c(),m},i=an(n,"options",R("div.pf-panel.mid.opts",R("h2","Options"),t("Visée","Ce que fait le stick pendant la descente",()=>e.aim,[["push","Pousser la bouée vers le stick"],["seat","Se placer vers le stick"]],s=>{e.aim=s}),t("Sensibilité de la caméra","Souris, stick droit et glisser",()=>e.camSpeed,[[.5,"Lente"],[1,"Normale"],[1.6,"Rapide"]],s=>{e.camSpeed=s}),Df("Effets sonores","Poufs, plouf et compagnie","sfxVol",()=>Xe.applySettings()),Ze("Retour",()=>n.close(i),{key:"back"})),{hints:[["ok","Changer"],["back","Retour"]],onAction:s=>gh(i,s)});return i}function vl(n,{first:e=!1}={}){if(n.course.foot)return x1(n,e);const t=pl.includes(Ht.device),s=Ht.device==="touch"?[["Joystick (à gauche)","Viser"],["POUF (maintenir)","Pousser la bouée"],["SUPER","Grosse poussée"],["😀","Emotes"],["Glisser l’écran","Tourner la caméra"]]:t?[[_1("Stick gauche"),"Viser"],[Ln("ok"),"Pouf (maintenir) · aussi R2"],[Ln("square"),"Super pouf · aussi R1"],["Stick droit","Caméra"],["Croix ↑ ↓, ○, L1","Emotes"],[Ln("triangle"),"Réapparaître (maintenir)"],[Ln("options"),"Pause"]]:[["ZQSD / WASD / flèches","Viser"],["Espace / clic gauche","Pouf (maintenir)"],["Maj / E / clic droit","Super pouf"],["Souris (cliquer pour la capturer)","Caméra"],["1 à 6","Emotes"],["R (maintenir)","Réapparaître"],["Échap","Pause"]],r=an(n,"help",R("div.pf-panel.mid",R("h2",e?"Avant de plonger…":"Comment jouer"),R("div.pf-rules",R("div",R("b","1"),"Chaque joueur se tient au bord de la bouée. Son POUF pousse la bouée à l’opposé."),R("div",R("b","2"),"Orientez le stick vers où vous voulez aller : votre personnage court de l’autre côté."),R("div",R("b","3"),"Évitez les piques, mâchoires, mines et moulins : au 3ᵉ coup, la bouée éclate et tout le monde repart du dernier checkpoint."),R("div",R("b","4"),"Le gaz se recharge quand vous ne poussez pas. Coopérez pour aller vite !")),R("div.pf-keys-table",s.map(([o,a])=>R("div",R("span.k",o),R("span",a)))),Ze(e?"C’est parti !":"Retour",()=>n.close(r),{primary:!0,key:"back"})),{onLeave:()=>{n.state==="match"&&n.resumeRun()}});return n.state==="match"&&n.input.setPlaying(!1),r}const _1=n=>R("span",n);function x1(n,e){const t=pl.includes(Ht.device),i=Ht.device==="touch",s=n.course.kind==="race",r=i?[["Joystick (à gauche)","Courir"],["POUF","Sauter"],["SUPER","Pouf en l’air (élan)"],["Glisser l’écran","Caméra"]]:t?[["Stick gauche","Courir"],[Ln("ok"),"Sauter"],[Ln("square"),"Pouf en l’air (élan)"],["Stick droit","Caméra"],...s?[[Ln("triangle"),"Revenir au checkpoint (maintenir)"]]:[],[Ln("options"),"Pause"]]:[["ZQSD / WASD / flèches","Courir"],["Espace / clic gauche","Sauter"],["Maj / E / clic droit","Pouf en l’air (élan)"],["Souris","Caméra"],...s?[["R (maintenir)","Revenir au checkpoint"]]:[],["Échap","Pause"]],o=an(n,"help",R("div.pf-panel.mid",R("h2",e?"À vos marques…":"Comment jouer"),R("div.pf-rules",s?[R("div",R("b","1"),"Courez jusqu’à l’arrivée : le premier arrivé gagne."),R("div",R("b","2"),"Sautez par-dessus les barres, évitez marteaux et bumpers, attendez les plateformes mobiles."),R("div",R("b","3"),"En l’air, un POUF vous donne un deuxième élan (il consomme la jauge)."),R("div",R("b","4"),"Tombé à l’eau ? Vous repartez du dernier checkpoint.")]:[R("div",R("b","1"),"Restez sur l’arène : tomber à l’eau vous élimine."),R("div",R("b","2"),"Sautez par-dessus la barre qui tourne de plus en plus vite."),R("div",R("b","3"),"Le sol s’enfonce par endroits : il tremble juste avant."),R("div",R("b","4"),"Le dernier debout gagne. En solo, tenez le plus longtemps possible !")]),R("div.pf-keys-table",r.map(([a,l])=>R("div",R("span.k",a),R("span",l)))),Ze(e?"C’est parti !":"Retour",()=>n.close(o),{primary:!0,key:"back"})),{onLeave:()=>{n.state==="match"&&n.resumeRun()}});return n.state==="match"&&n.input.setPlaying(!1),o}function y1(n){const e=n.lobby.isHost,t=an(n,"pause",R("div.pf-panel.small",R("h2","Pause"),n.paused?R("p.dim","La partie est en pause."):R("p.dim","La partie continue pour vos amis !"),R("div.pf-list",Ze("Reprendre",()=>t.back(),{primary:!0,ic:"play",key:"resume"}),Ze("Comment jouer",()=>vl(n),{ic:"info",key:"help"}),Ze("Options",()=>wf(n),{ic:"settings",key:"options"}),e?Ze(n.lobby.members.length>1?"Arrêter et revenir au salon":"Revenir au salon",()=>ps("Revenir au salon ?","La descente en cours sera abandonnée pour tout le monde.","Revenir au salon",()=>{n.lobby.broadcast({t:"abort"}),n.abortMatch()}),{ic:"party",key:"lobby"}):Ze("Quitter la partie",()=>ps("Quitter la partie ?","Vos amis continueront sans vous.","Quitter",()=>n.leaveLobby(),{danger:!0}),{ic:"close",key:"leave"}),Ze("Quitter le jeu",()=>Oc(n),{ic:"power",key:"quit"}))),{hints:[["ok","Sélectionner"],["back","Reprendre"]],back:()=>{n.close(t)},onAction:i=>{if(i==="options")return t.back(),!0},onLeave:()=>n.resumeRun()});return t}function M1(n){const e=n.summary,t=n.rewards,i=Un[e.course];if(i.foot)return S1(n,e,t,i);const s=t?.stars??0,r=b1(e),o=R("div.pf-results-crew",e.riders.map(p=>R("div.pf-rrow",R("div.pf-av",{style:{background:p.look?.color}},cr(p.look?.species).name[0]),R("div.nm",p.name),R("div.ttl",r.get(p.id)||""),R("div.st",`${p.puff.toFixed(1)} s de pouf · ${p.supers} super`)))),a=Kn(n.profile.xp),l=t?R("div.pf-rewards",R("div.rw",R("b",`+${t.xp}`)," XP"),R("div.rw",R("b",`+${t.coins}`)," pièces"),R("div.lvl",`Niveau ${a.level}`,R("div.xp",R("i",{style:{width:a.into/a.need*100+"%"}}))),t.record?R("div.rec","Nouveau record personnel !"):null,t.levelUp?R("div.rec",`Niveau ${t.levelUp} atteint !`):null,t.unlocked.length?R("div.unl","Débloqué : ",t.unlocked.map(p=>p.name||p.id).join(", ")):null):R("p.dim","Vous regardiez cette descente : rejoignez la prochaine !"),u=n.lobby.isHost,c=an(n,"results",R("div.pf-panel.wide.results",R("div.pf-res-head",R("h2",e.finished?"ARRIVÉE !":"Partie terminée"),Do(s)),R("div.pf-res-big",R("div",R("small","Temps"),R("b",wn(e.time))),R("div",R("small","Éclatements"),R("b",String(e.deaths))),R("div",R("small","Checkpoints"),R("b",`${e.cps}/${i.checkpoints.length}`))),o,l,Ef(n,e),R("div.row",e.tour?Af(n,e):u?[Ze("Rejouer",()=>{n.close(c),n.startMatch()},{primary:!0,ic:"refresh",key:"again"}),Ze("Retour au salon",()=>{n.state="lobby",n.openBase()},{key:"lobby"})]:[Ze("Retour au salon",()=>{n.state="lobby",n.openBase()},{primary:!0,key:"lobby"}),R("span.dim","L’hôte choisit la suite…")])),{back:()=>{n.state="lobby",n.openBase()},hints:[["ok","Sélectionner"],["back","Salon"]]});for(let p=0;p<2;p++)setTimeout(()=>n.arena.fx.confetti(n.arena.rs.x,n.arena.rs.y+5,n.arena.rs.z,70,5),200+p*500);return c}function S1(n,e,t,i){const s=i.kind==="survival",r=e.riders.find(h=>h.id===n.me.id),o=r?e.riders.length>1?r.rank===1?"VICTOIRE !":`${ho(r.rank)} place`:s?"Bien tenu !":r.time!=null?"ARRIVÉE !":"Partie terminée":"Partie terminée",a=h=>s?`Tenu ${wn(h.out??h.time??e.time)}`:h.time!=null?wn(h.time):"Pas arrivé",l=R("div.pf-results-crew",e.riders.map(h=>R(`div.pf-rrow${h.rank===1?".first":""}`,R("div.rk",ho(h.rank)),R("div.nm",h.name,h.id===n.me.id?R("small"," (vous)"):null),R("div.ttl",h.rank===1&&e.riders.length>1?s?"Dernier debout":"Champion":""),R("div.st",`${a(h)} · ${h.puffs} pouf${h.puffs>1?"s":""}`)))),u=Kn(n.profile.xp),c=t?R("div.pf-rewards",R("div.rw",R("b",`+${t.xp}`)," XP"),R("div.rw",R("b",`+${t.coins}`)," pièces"),R("div.lvl",`Niveau ${u.level}`,R("div.xp",R("i",{style:{width:u.into/u.need*100+"%"}}))),t.record?R("div.rec","Nouveau record personnel !"):null,t.levelUp?R("div.rec",`Niveau ${t.levelUp} atteint !`):null,t.unlocked.length?R("div.unl","Débloqué : ",t.unlocked.map(h=>h.name||h.id).join(", ")):null):R("p.dim","Vous regardiez cette épreuve : rejoignez la prochaine !"),p=n.lobby.isHost,m=()=>{n.state="lobby",n.openBase()},f=an(n,"results",R("div.pf-panel.wide.results",R("div.pf-res-head",R("h2",o),Do(t?.stars??0)),R("div.pf-res-big",R("div",R("small","Votre temps"),R("b",r?s?wn(r.out??r.time??e.time):r.time!=null?wn(r.time):"—":"—")),R("div",R("small","Classement"),R("b",r?`${ho(r.rank)} / ${e.riders.length}`:"—")),R("div",R("small","Épreuve"),R("b",i.short))),l,c,Ef(n,e),R("div.row",e.tour?Af(n,e):p?[Ze("Rejouer",()=>{n.close(f),n.startMatch()},{primary:!0,ic:"refresh",key:"again"}),Ze("Retour au salon",m,{key:"lobby"})]:[Ze("Retour au salon",m,{primary:!0,key:"lobby"}),R("span.dim","L’hôte choisit la suite…")])),{back:m,hints:[["ok","Sélectionner"],["back","Salon"]]});return f}function Ef(n,e){const t=e.tour;if(!t)return null;const i=Object.keys(t.pts).sort((r,o)=>t.pts[o]-t.pts[r]),s=t.i+1>=t.n;return R("div.pf-tour",R("h4",s?"Classement final du tournoi":`Tournoi · épreuve ${t.i+1} sur ${t.n}`),R("div.pf-tour-rows",i.map((r,o)=>R(`div.pf-tour-row${o===0?".lead":""}${r===n.me.id?".me":""}`,R("b",s&&o===0?"🏆":ho(o+1)),R("span.nm",t.names[r]||"Joueur"),R("span.plus",`+${t.round[r]||0}`),R("span.pts",`${t.pts[r]} pts`)))))}function Af(n,e){const t=e.tour,i=t.i+1>=t.n;return n.lobby.isHost?[Ze(i?"Terminer le tournoi":"Épreuve suivante",()=>n.nextRound(),{primary:!0,ic:i?"check":"play",key:"next"}),Ze("Abandonner le tournoi",()=>{n.tour=null,n.state="lobby",n.openBase()},{key:"lobby"})]:[Ze("Retour au salon",()=>{n.tour=null,n.state="lobby",n.openBase()},{key:"lobby"}),R("span.dim",i?"Fin du tournoi !":"L’hôte lance l’épreuve suivante…")]}function b1(n){const e=new Map,t=n.riders;if(!t.length)return e;const i=a=>t.slice().sort((l,u)=>a(u)-a(l))[0],s=i(a=>a.puff);s.puff>0&&e.set(s.id,"Moteur principal");const r=i(a=>a.supers);r.supers>0&&!e.has(r.id)&&e.set(r.id,"Roi du super pouf");const o=i(a=>a.emotes);o.emotes>0&&!e.has(o.id)&&e.set(o.id,"Ambianceur");for(const a of t)e.has(a.id)||e.set(a.id,a.puff<3?"Touriste du lagon":"Équipier fiable");return e}const E1="pouf-party";async function A1({el:n,user:e,opts:t={},exit:i,trophy:s}){const r=R("div.pf-loading",ml(),R("div.pf-spin",R("i"),R("i"),R("i")),R("div.pf-tip",u1()));n.append(r),await Promise.race([document.fonts?.load('80px "Luckiest Guy"'),new Promise(_=>setTimeout(_,2500))]).catch(()=>{});const o=R("canvas.pf-canvas"),a=R("div.pf-overlay");n.prepend(o),n.append(a);const l=V_(o,{}),u=rx(l,a),c=ox(a,o),p=n1(e),m={id:e.id,name:e.psn||"Joueur",look:p.look},f=new Xx(m),h={el:n,overlay:a,stage:l,arena:u,input:c,lobby:f,profile:p,me:m,settings:p.settings,state:"title",course:hl[0],match:null,summary:null,rewards:null,paused:!1,menuT:0,alive:!0,attached:!1,get layers(){return rs.layers.filter(_=>_.pf)},push(_){return _.root.classList.add("overlay","pf-layer","in"),_.shade=0,_.opaque=!0,_.pf=!0,document.getElementById("app").append(_.root),rs.push(_),Of(),_},close(_,T=!1){_&&rs.layers.includes(_)&&kf(_,{silent:T})},closeAll(){for(const _ of[...h.layers].reverse())h.close(_,!0)},openBase(){if(!(!h.attached||h.opening)){h.opening=!0;try{h.closeAll(),h.state==="title"?h1(h):h.state==="lobby"?p1(h):h.state==="results"&&M1(h)}finally{h.opening=!1}h.syncCamera()}},syncCamera(){h.state!=="match"&&(u.cam.mode=h.state==="customize"?"closeup":"orbit",u.showTags(h.state==="lobby"||h.state==="results"))},toast(_,T="",U="notify"){Ff({title:_,sub:T,icon:"gamepad",sound:U,log:!1})},showcase(){if(h.state==="title"||!f.members.length){const T=[0,1,2,3].map(S=>ol(S)).filter(S=>S.species!==m.look.species).slice(0,3),U=[m.look,...T];u.setCrew(U.map((S,A)=>({id:A?"npc"+A:m.id,name:A?Di.find(k=>k.id===S.species).name:m.name,look:S,seat:A})),m.id)}else u.setCrew(qu(f.players.map((T,U)=>({id:T.id,name:T.name,look:T.id===m.id?m.look:T.look,seat:U}))),m.id);let _=0;for(const T of u.crew.values())T.a=Dc(_++),T.mode="raft",T.puff=!1,T.run=0;u.boardCrew()},setLook(_){m.look=p.look=_,p.save(),f.setLook(_),h.showcase()},partyCode(){const _=Rn.party;return _&&_.members?.length>1?zx("pouf:"+_.id):null},async enterLobby({join:_=null,party:T=null}={}){h.state="lobby",f1(h,_?`Connexion à la partie ${_}…`:"Création du salon…");try{_?await f.join(_):T?await f.claim(T):await f.host(gf())}catch(U){h.state="title",h.openBase(),d1(h,"Impossible de rejoindre",U.message||"La connexion a échoué.");return}h.openBase(),h.showcase(),f.online||h.toast("Mode hors ligne","Partie solo : le jeu en ligne n’est pas disponible pour le moment","error")},leaveLobby(){f.leave(),h.state="title",h.openBase(),h.showcase()},setCourse(_){h.course=_,f.isHost&&f.broadcast({t:"lobby",course:_.id}),!_.foot&&u.course?.id!==_.id&&(u.load(_),h.showcase()),is(h)},canStart(){return f.isHost&&f.players.filter(_=>_.online!==!1).every(_=>_.host||_.ready)},tourMode:!1,tour:null,setTourMode(_){h.tourMode=_,h.tour=null,f.isHost&&f.broadcast({t:"lobby",course:h.course.id,tour:_}),is(h)},decorate(_){if(!h.tour)return _;const T=c1(_);for(const U of _.riders)h.tour.pts[U.id]=(h.tour.pts[U.id]||0)+(T[U.id]||0),h.tour.names[U.id]=U.name,h.tour.looks[U.id]=U.look;return _.tour={i:h.tour.i,n:h.tour.list.length,round:T,pts:{...h.tour.pts},names:{...h.tour.names},looks:{...h.tour.looks}},_},nextRound(){if(!(!f.isHost||!h.tour)){if(h.tour.i+1>=h.tour.list.length){h.tour=null,h.state="lobby",h.openBase();return}h.tour.i++,h.course=Un[h.tour.list[h.tour.i]],h.startMatch()}},startMatch(){if(!f.isHost)return;h.tourMode&&!h.tour&&(h.tour={list:Fc.slice(),i:0,pts:{},names:{},looks:{}},h.course=Un[h.tour.list[0]]);const _=qu(f.players.filter(U=>U.online!==!1).slice(0,bo).map((U,S)=>({id:U.id,name:U.name,look:U.id===m.id?m.look:U.look,seat:S})));f.members.forEach(U=>{U.host||(U.ready=!1)}),f.pushState();const T={t:"start",course:h.course.id,roster:_,tour:h.tour?{i:h.tour.i,n:h.tour.list.length}:null};f.broadcast(T),h.beginMatch(T,!0)},beginMatch(_,T){const U=Un[_.course];if(!U)return;h.endMatch(),h.course=U,h.closeAll(),h.state="match",h.paused=!1;const S=!_.roster.some(k=>k.id===m.id);h.match=(U.foot?Ox:Mx)(h,{course:U,roster:_.roster,host:T,meId:m.id,spectator:S});const A=U.foot?"tutorialFoot":"tutorial";!p[A]&&!S&&(p[A]=!0,p.save(),vl(h,{first:!0}))},endMatch(){h.match&&(h.match.dispose(),h.match=null),h.paused=!1},onEnd(_){h.state==="match"&&(h.endMatch(),h.summary=_,h.rewards=_.riders.some(T=>T.id===m.id)?o1(p,_,m.id):null,h.checkTrophies(_),h.state="results",h.closeAll(),h.showcase(),h.openBase())},abortMatch(_){h.state!=="match"&&h.state!=="results"||(h.tour=null,h.endMatch(),h.state="lobby",h.closeAll(),h.showcase(),h.openBase(),_&&h.toast(_))},openPause(){h.state!=="match"||h.layers.length||(h.paused=f.members.length<=1,c.setPlaying(!1),y1(h))},resumeRun(){h.layers.length||(h.paused=!1,h.match&&!h.match.finished&&h.attached&&c.setPlaying(!0))},checkTrophies(_){const T=p.stats,U=_.riders.find(A=>A.id===m.id);if(_.kind==="race"||_.kind==="survival"){U&&U.rank===1&&_.riders.length>=2&&s?.(1),h.rewards?.stars===3&&s?.(4);return}const S=_.finished&&!!U;S&&s?.(0),S&&_.riders.length>=2&&s?.(1),S&&_.deaths===0&&s?.(2),T.supers>=50&&s?.(3),S&&h.rewards?.stars===3&&s?.(4)},async moveLobby(_){if(!(!f.isHost||f.code===_)){f.broadcast({t:"move",code:_}),await new Promise(T=>setTimeout(T,300));try{await f.claim(_)}catch(T){h.toast("Salon",T.message,"error")}h.showcase(),is(h)}},shareLink(){return`${location.origin}${location.pathname}#pouf=${f.code}`},async joinCode(_){_=uo(_),h.state==="match"&&h.endMatch(),f.role!=="none"&&f.leave(),await h.enterLobby({join:_})},exit(){h.destroy(),i?.()},destroy(){h.alive&&(h.alive=!1,cancelAnimationFrame(d),h.endMatch(),h.closeAll(),f.destroy(),c.dispose(),u.dispose(),l.dispose(),Xe.stop(),x.disconnect(),n.replaceChildren())}};/[?&]pfdebug/.test(location.search)&&(window.__pouf=h,h.sound=Xe),f.on("msg",_=>{if(["snap","ev","inp","fs","fsnap","fev","ffin","fout","fem"].includes(_.t)){h.match?.onMsg(_);return}if(_.t==="start"&&!f.isHost){h.beginMatch(_,!1);return}if(_.t==="end"&&!f.isHost){h.onEnd(_.summary);return}if(_.t==="abort"&&!f.isHost){h.abortMatch("L’hôte a mis fin à la partie");return}if(_.t==="lobby"&&!f.isHost){const T=Un[_.course];h.tourMode=!!_.tour,T&&(h.course=T,h.state!=="match"&&!T.foot&&(u.load(T),h.showcase())),is(h);return}if(_.t==="move"&&!f.isHost){const T=uo(_.code);setTimeout(()=>h.joinCode(T),900)}}),f.on("state",()=>{if(h.state==="match"&&h.match){const _=new Set(f.members.map(T=>T.id));for(const T of[...h.match.riders.keys()])_.has(T)||h.match.removeRider(T)}else(h.state==="lobby"||h.state==="results")&&h.showcase();is(h)}),f.on("joined",_=>{f.isHost&&(f.sendTo(_.id,{t:"lobby",course:h.course.id,tour:h.tourMode}),h.state==="match"&&h.match&&f.sendTo(_.id,{t:"start",course:h.course.id,roster:h.match.roster.filter(T=>h.match.riders.has(T.id))}),Xe.ui("ok"),h.toast(`${_.name} a rejoint la partie`))}),f.on("left",_=>h.toast(`${_.name} a quitté la partie`,"",null)),f.on("status",_=>{_.hostLost?((h.state==="match"||h.state==="results")&&h.abortMatch(),h.toast(_.closing?"L’hôte a fermé la partie":"L’hôte a quitté la partie","Recherche d’un nouvel hôte…","error")):_.reelected?(h.toast(f.isHost?"Vous êtes le nouvel hôte":"Nouvel hôte trouvé",`Code ${f.code}`),h.showcase()):_.lost&&(h.toast("Partie perdue",_.error,"error"),h.state!=="title"&&(h.endMatch(),h.state="title",h.openBase(),h.showcase())),is(h)});const v=Rn.on("party",()=>{const _=h.partyCode();_&&f.isHost&&f.code!==_&&h.state==="lobby"&&h.moveLobby(_)});let d=0,g=performance.now();const x=new ResizeObserver(()=>{const _=n.getBoundingClientRect();_.width&&_.height&&l.resize(_.width,_.height)});x.observe(n);function y(_){d=requestAnimationFrame(y);const T=Math.min(.25,(_-g)/1e3);if(g=_,window.__pouf&&(window.__fps=(window.__fps||30)*.95+1/Math.max(.001,T)*.05),!h.alive)return;const U=h.match?.kind==="foot";if(h.match)h.match.update(T,h.paused||h.covered&&f.members.length<=1);else if(h.menuT+=T,Math.random()<T*.25&&u.crew.size){const S=[...u.crew.keys()];u.emote(S[Math.floor(Math.random()*S.length)],jn[Math.floor(Math.random()*4)].id)}(!U||!h.match)&&u.update(T,h.match?h.match.t:h.menuT),h.attached&&n.isConnected&&(l.render(),U&&h.match?h.match.updateTags(n.clientWidth,n.clientHeight):u.updateTags(n.clientWidth,n.clientHeight))}const M={attach(){h.attached=!0;const _=n.getBoundingClientRect();_.width&&l.resize(_.width,_.height),h.match&&!h.layers.length&&c.setPlaying(!0),Xe.music(!0,{fast:!!h.match})},detach(){h.attached=!1,c.setPlaying(!1),h.closeAll(),h.state==="match"&&f.members.length<=1&&!h.match?.finished&&(h.paused=!0)},covered(_){h.covered=_,_&&c.setPlaying(!1)},resumed(){queueMicrotask(()=>{!h.alive||h.opening||h.layers.length||rs.top?.pf||(h.state!=="match"?h.openBase():h.paused?(h.paused=!1,h.openPause()):h.match?.finished||c.setPlaying(!0))})},onAction(_,T){return _==="ps"?!1:h.state==="match"?((_==="options"||_==="back"&&T?.type==="keydown")&&h.openPause(),!0):(_==="back"&&h.openBase(),!0)},joinCode:_=>h.joinCode(_),destroy(){v(),h.destroy()},G:h};u.load(h.course),h.showcase();const w=n.getBoundingClientRect();l.resize(w.width||innerWidth,w.height||innerHeight),l.render(),d=requestAnimationFrame(y),r.classList.add("out"),setTimeout(()=>r.remove(),600),Xe.music(!0),M.attach();const b=h.partyCode();return t.join?h.enterLobby({join:uo(t.join)}):b?h.enterLobby({party:b}):h.openBase(),M}export{E1 as GAME_ID,A1 as createGame};
