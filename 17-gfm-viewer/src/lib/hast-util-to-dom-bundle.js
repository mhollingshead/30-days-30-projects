/* esm.sh - esbuild bundle(hast-util-to-dom@3.1.0) es2022 production */
var ln=Object.defineProperty;var en=(e,l)=>{for(var t in l)ln(e,t,{get:l[t],enumerable:!0})};var b={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};var f=class{constructor(l,t,r){this.property=l,this.normal=t,r&&(this.space=r)}};f.prototype.property={};f.prototype.normal={};f.prototype.space=null;function T(e,l){let t={},r={},u=-1;for(;++u<e.length;)Object.assign(t,e[u].property),Object.assign(r,e[u].normal);return new f(t,r,l)}function w(e){return e.toLowerCase()}var c=class{constructor(l,t){this.property=l,this.attribute=t}};c.prototype.space=null;c.prototype.boolean=!1;c.prototype.booleanish=!1;c.prototype.overloadedBoolean=!1;c.prototype.number=!1;c.prototype.commaSeparated=!1;c.prototype.spaceSeparated=!1;c.prototype.commaOrSpaceSeparated=!1;c.prototype.mustUseProperty=!1;c.prototype.defined=!1;var C={};en(C,{boolean:()=>o,booleanish:()=>s,commaOrSpaceSeparated:()=>m,commaSeparated:()=>y,number:()=>n,overloadedBoolean:()=>A,spaceSeparated:()=>a});var on=0,o=v(),s=v(),A=v(),n=v(),a=v(),y=v(),m=v();function v(){return 2**++on}var E=Object.keys(C),k=class extends c{constructor(l,t,r,u){let i=-1;if(super(l,t),N(this,"space",u),typeof r=="number")for(;++i<E.length;){let p=E[i];N(this,E[i],(r&C[p])===C[p])}}};k.prototype.defined=!0;function N(e,l,t){t&&(e[l]=t)}var tn={}.hasOwnProperty;function h(e){let l={},t={},r;for(r in e.properties)if(tn.call(e.properties,r)){let u=e.properties[r],i=new k(r,e.transform(e.attributes||{},r),u,e.space);e.mustUseProperty&&e.mustUseProperty.includes(r)&&(i.mustUseProperty=!0),l[r]=i,t[w(r)]=r,t[w(i.attribute)]=r}return new f(l,t,e.space)}var U=h({space:"xlink",transform(e,l){return"xlink:"+l.slice(5).toLowerCase()},properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null}});var z=h({space:"xml",transform(e,l){return"xml:"+l.slice(3).toLowerCase()},properties:{xmlLang:null,xmlBase:null,xmlSpace:null}});function M(e,l){return l in e?e[l]:l}function L(e,l){return M(e,l.toLowerCase())}var B=h({space:"xmlns",attributes:{xmlnsxlink:"xmlns:xlink"},transform:L,properties:{xmlns:null,xmlnsXLink:null}});var I=h({transform(e,l){return l==="role"?l:"aria-"+l.slice(4).toLowerCase()},properties:{ariaActiveDescendant:null,ariaAtomic:s,ariaAutoComplete:null,ariaBusy:s,ariaChecked:s,ariaColCount:n,ariaColIndex:n,ariaColSpan:n,ariaControls:a,ariaCurrent:null,ariaDescribedBy:a,ariaDetails:null,ariaDisabled:s,ariaDropEffect:a,ariaErrorMessage:null,ariaExpanded:s,ariaFlowTo:a,ariaGrabbed:s,ariaHasPopup:null,ariaHidden:s,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:a,ariaLevel:n,ariaLive:null,ariaModal:s,ariaMultiLine:s,ariaMultiSelectable:s,ariaOrientation:null,ariaOwns:a,ariaPlaceholder:null,ariaPosInSet:n,ariaPressed:s,ariaReadOnly:s,ariaRelevant:null,ariaRequired:s,ariaRoleDescription:a,ariaRowCount:n,ariaRowIndex:n,ariaRowSpan:n,ariaSelected:s,ariaSetSize:n,ariaSort:null,ariaValueMax:n,ariaValueMin:n,ariaValueNow:n,ariaValueText:null,role:null}});var V=h({space:"html",attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},transform:L,mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:y,acceptCharset:a,accessKey:a,action:null,allow:null,allowFullScreen:o,allowPaymentRequest:o,allowUserMedia:o,alt:null,as:null,async:o,autoCapitalize:null,autoComplete:a,autoFocus:o,autoPlay:o,capture:o,charSet:null,checked:o,cite:null,className:a,cols:n,colSpan:null,content:null,contentEditable:s,controls:o,controlsList:a,coords:n|y,crossOrigin:null,data:null,dateTime:null,decoding:null,default:o,defer:o,dir:null,dirName:null,disabled:o,download:A,draggable:s,encType:null,enterKeyHint:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:o,formTarget:null,headers:a,height:n,hidden:o,high:n,href:null,hrefLang:null,htmlFor:a,httpEquiv:a,id:null,imageSizes:null,imageSrcSet:null,inputMode:null,integrity:null,is:null,isMap:o,itemId:null,itemProp:a,itemRef:a,itemScope:o,itemType:a,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:o,low:n,manifest:null,max:null,maxLength:n,media:null,method:null,min:null,minLength:n,multiple:o,muted:o,name:null,nonce:null,noModule:o,noValidate:o,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforePrint:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:o,optimum:n,pattern:null,ping:a,placeholder:null,playsInline:o,poster:null,preload:null,readOnly:o,referrerPolicy:null,rel:a,required:o,reversed:o,rows:n,rowSpan:n,sandbox:a,scope:null,scoped:o,seamless:o,selected:o,shape:null,size:n,sizes:null,slot:null,span:n,spellCheck:s,src:null,srcDoc:null,srcLang:null,srcSet:null,start:n,step:null,style:null,tabIndex:n,target:null,title:null,translate:null,type:null,typeMustMatch:o,useMap:null,value:s,width:n,wrap:null,align:null,aLink:null,archive:a,axis:null,background:null,bgColor:null,border:n,borderColor:null,bottomMargin:n,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:o,declare:o,event:null,face:null,frame:null,frameBorder:null,hSpace:n,leftMargin:n,link:null,longDesc:null,lowSrc:null,marginHeight:n,marginWidth:n,noResize:o,noHref:o,noShade:o,noWrap:o,object:null,profile:null,prompt:null,rev:null,rightMargin:n,rules:null,scheme:null,scrolling:s,standby:null,summary:null,text:null,topMargin:n,valueType:null,version:null,vAlign:null,vLink:null,vSpace:n,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:o,disableRemotePlayback:o,prefix:null,property:null,results:n,security:null,unselectable:null}});var j=h({space:"svg",attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},transform:M,properties:{about:m,accentHeight:n,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:n,amplitude:n,arabicForm:null,ascent:n,attributeName:null,attributeType:null,azimuth:n,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:n,by:null,calcMode:null,capHeight:n,className:a,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:n,diffuseConstant:n,direction:null,display:null,dur:null,divisor:n,dominantBaseline:null,download:o,dx:null,dy:null,edgeMode:null,editable:null,elevation:n,enableBackground:null,end:null,event:null,exponent:n,externalResourcesRequired:null,fill:null,fillOpacity:n,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:y,g2:y,glyphName:y,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:n,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:n,horizOriginX:n,horizOriginY:n,id:null,ideographic:n,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:n,k:n,k1:n,k2:n,k3:n,k4:n,kernelMatrix:m,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:n,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:n,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:n,overlineThickness:n,paintOrder:null,panose1:null,path:null,pathLength:n,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:a,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:n,pointsAtY:n,pointsAtZ:n,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:m,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:m,rev:m,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:m,requiredFeatures:m,requiredFonts:m,requiredFormats:m,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:n,specularExponent:n,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:n,strikethroughThickness:n,string:null,stroke:null,strokeDashArray:m,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:n,strokeOpacity:n,strokeWidth:null,style:null,surfaceScale:n,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:m,tabIndex:n,tableValues:null,target:null,targetX:n,targetY:n,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:m,to:null,transform:null,u1:null,u2:null,underlinePosition:n,underlineThickness:n,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:n,values:null,vAlphabetic:n,vMathematical:n,vectorEffect:null,vHanging:n,vIdeographic:n,version:null,vertAdvY:n,vertOriginX:n,vertOriginY:n,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:n,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null}});var rn=/^data[-\w.:]+$/i,W=/-[a-z]/g,an=/[A-Z]/g;function H(e,l){let t=w(l),r=l,u=c;if(t in e.normal)return e.property[e.normal[t]];if(t.length>4&&t.slice(0,4)==="data"&&rn.test(l)){if(l.charAt(4)==="-"){let i=l.slice(5).replace(W,sn);r="data"+i.charAt(0).toUpperCase()+i.slice(1)}else{let i=l.slice(4);if(!W.test(i)){let p=i.replace(an,un);p.charAt(0)!=="-"&&(p="-"+p),l="data"+p}}u=k}return new u(r,l)}function un(e){return"-"+e.toLowerCase()}function sn(e){return e.charAt(1).toUpperCase()}var q=T([z,U,B,I,V],"html"),K=T([z,U,B,I,j],"svg");function Y(e,l){let t=cn(e,l);return l.afterTransform&&l.afterTransform(e,t),t}function cn(e,l){switch(e.type){case"root":return pn(e,l);case"text":return dn(e,l);case"element":return X(e,l);case"doctype":return mn(e,l);case"comment":return gn(e,l);default:return X(e,l)}}function pn(e,l){let{doc:t,fragment:r,namespace:u}=l,{children:i=[]}=e,p=u,P=i.length===0,D=-1;for(;++D<i.length;){let x=i[D];if(x.type==="element"&&x.tagName==="html"){let{properties:O={}}=x;P=!0,u===void 0&&(p=String(O.xmlns||"")||b.html)}}let d;return P?d=t.implementation.createDocument(p||null,"",null):r?d=t.createDocumentFragment():d=t.createElement("html"),Z(d,i,{...l,fragment:r,namespace:p,impliedNamespace:p})}function mn(e,{doc:l}){return l.implementation.createDocumentType("html","","")}function dn(e,{doc:l}){return l.createTextNode(e.value)}function gn(e,{doc:l}){return l.createComment(e.value)}function X(e,l){let{namespace:t,doc:r}=l,u=l.impliedNamespace||t,{tagName:i=u===b.svg?"g":"div",properties:p={},children:P=[]}=e;(u==null||u===b.html)&&i==="svg"&&(u=b.svg);let D=u===b.svg?K:q,d=u==null?r.createElement(i):r.createElementNS(u,i),x=Object.keys(p),{length:O}=x;for(let R=0;R<O;R+=1){let F=x[R],{attribute:S,property:_,mustUseProperty:J,boolean:G,booleanish:$,overloadedBoolean:Q,commaSeparated:nn}=H(D,F),g=p[F];Array.isArray(g)&&(g=g.join(nn?", ":" ")),J&&(d[_]=g),G||Q&&typeof g=="boolean"?g?d.setAttribute(S,""):d.removeAttribute(S):$?d.setAttribute(S,String(g)):g===!0?d.setAttribute(S,""):(g||g===0||g==="")&&d.setAttribute(S,String(g))}return Z(d,P,{...l,impliedNamespace:u})}function Z(e,l,t){let r=-1;for(;++r<l.length;)e.appendChild(Y(l[r],t));return e}function hn(e,l={}){let{document:t=document,...r}=l;return Y(e,{doc:t,...r})}{toDom = hn};