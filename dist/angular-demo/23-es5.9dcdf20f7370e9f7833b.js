function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _createSuper(e){return function(){var t,n=_getPrototypeOf(e);if(_isNativeReflectConstruct()){var r=_getPrototypeOf(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{"6Br6":function(e,t,n){"use strict";var r=n("HDdC"),a=n("VRyK");r.a.merge=a.a},"82/m":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("G5QB"),a=n("fXoL"),i=n("tk/3"),o=n("ZtWP"),c=n("hHWK"),l=function(){var e=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,r,a){var i;return _classCallCheck(this,n),(i=t.call(this,"section",e)).http=e,i.companyService=r,i.campaignService=a,i}return _createClass(n,[{key:"setSectionId",value:function(e){this.section_id=e}},{key:"getSectionId",value:function(){return this.section_id}},{key:"setCourseId",value:function(e){this.course_id=e}},{key:"getCourseId",value:function(){return this.course_id}},{key:"getCampaigns",value:function(e){return this.campaignService.getAll({company_id:e})}},{key:"getTypesFromCampaign",value:function(e){return this.http.get("".concat(this.apiUrl,"campaign/geography_from_campaign?campaign_id=")+e)}},{key:"getSectionData",value:function(e,t){return this.http.get("".concat(this.apiUrl,"section/section_dropdown_list?campaign_id=")+t+"&course_id="+e)}}]),n}(r.a);return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275inject"](i.b),a["\u0275\u0275inject"](o.a),a["\u0275\u0275inject"](c.a))},e.\u0275prov=a["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},rHrF:function(e,t,n){"use strict";n.r(t),n.d(t,"CourseReportModule",(function(){return A}));var r=n("ofXK"),a=n("1kSV"),i=n("Egam"),o=n("3Pt+"),c=n("PCNd"),l=n("tyNb"),s=n("uu/O"),u=n("quSY"),d=n("HDdC"),p=(n("6Br6"),n("lJxs")),m=n("bOdf"),f=n("Kj3r"),h=n("/uUt"),g=n("eIep"),v=n("fXoL"),b=n("hHWK"),y=n("KY19"),C=n("utbL"),_=n("5Lta"),x=["searchForm"];function S(e,t){if(1&e){var n=v["\u0275\u0275getCurrentView"]();v["\u0275\u0275elementStart"](0,"app-topbar",15),v["\u0275\u0275listener"]("changeCampaign",(function(e){return v["\u0275\u0275restoreView"](n),v["\u0275\u0275nextContext"]().changeCampaign(e)})),v["\u0275\u0275elementEnd"]()}}function w(e,t){1&e&&(v["\u0275\u0275elementStart"](0,"tr"),v["\u0275\u0275elementStart"](1,"td"),v["\u0275\u0275text"](2,"No Records Found!"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()),2&e&&(v["\u0275\u0275advance"](1),v["\u0275\u0275attribute"]("colSpan",3))}function E(e,t){if(1&e){var n=v["\u0275\u0275getCurrentView"]();v["\u0275\u0275elementStart"](0,"tr"),v["\u0275\u0275elementStart"](1,"th",21),v["\u0275\u0275text"](2),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](3,"td"),v["\u0275\u0275text"](4),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](5,"td"),v["\u0275\u0275text"](6),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](7,"td"),v["\u0275\u0275elementStart"](8,"a",22),v["\u0275\u0275listener"]("click",(function(){v["\u0275\u0275restoreView"](n);var e=t.$implicit;return v["\u0275\u0275nextContext"](2).openUrl(e.id,"course-details-report")})),v["\u0275\u0275text"](9,"View Details"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()}if(2&e){var r=t.$implicit,a=t.index,i=v["\u0275\u0275nextContext"](2);v["\u0275\u0275advance"](2),v["\u0275\u0275textInterpolate1"](" ",(i.records.current_page-1)*i.records.per_page+a+1," "),v["\u0275\u0275advance"](2),v["\u0275\u0275textInterpolate"](r.name),v["\u0275\u0275advance"](2),v["\u0275\u0275textInterpolate"](r.usr_count)}}function k(e,t){if(1&e){var n=v["\u0275\u0275getCurrentView"]();v["\u0275\u0275elementStart"](0,"div"),v["\u0275\u0275elementStart"](1,"ngb-pagination",23),v["\u0275\u0275listener"]("pageChange",(function(e){return v["\u0275\u0275restoreView"](n),v["\u0275\u0275nextContext"](2).pageChange(e)}))("pageChange",(function(e){return v["\u0275\u0275restoreView"](n),v["\u0275\u0275nextContext"](2).records.current_page=e})),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()}if(2&e){var r=v["\u0275\u0275nextContext"](2);v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("maxSize",3)("rotate",!0)("collectionSize",r.records.total)("pageSize",r.records.per_page)("page",r.records.current_page)}}function I(e,t){if(1&e&&(v["\u0275\u0275elementStart"](0,"div",16),v["\u0275\u0275elementStart"](1,"table",17),v["\u0275\u0275elementStart"](2,"thead"),v["\u0275\u0275elementStart"](3,"tr"),v["\u0275\u0275elementStart"](4,"th"),v["\u0275\u0275text"](5,"Sr. No"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](6,"th"),v["\u0275\u0275text"](7,"Course Title"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](8,"th"),v["\u0275\u0275text"](9,"User's Count"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](10,"th"),v["\u0275\u0275text"](11,"Action"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](12,"tbody"),v["\u0275\u0275elementStart"](13,"tr"),v["\u0275\u0275element"](14,"td"),v["\u0275\u0275elementStart"](15,"td"),v["\u0275\u0275element"](16,"input",18),v["\u0275\u0275elementEnd"](),v["\u0275\u0275element"](17,"td"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementContainerStart"](18),v["\u0275\u0275template"](19,w,3,1,"tr",19),v["\u0275\u0275template"](20,E,10,3,"tr",20),v["\u0275\u0275elementContainerEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275template"](21,k,2,5,"div",19),v["\u0275\u0275elementEnd"]()),2&e){var n=v["\u0275\u0275nextContext"]();v["\u0275\u0275advance"](19),v["\u0275\u0275property"]("ngIf",!n.records.data.length),v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("ngForOf",n.records.data),v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("ngIf",n.records)}}function O(e,t){1&e&&v["\u0275\u0275text"](0,"Loading Data...")}var j,P,R,F=[{path:"",component:(j=function(){function e(t,n,r,a){_classCallCheck(this,e),this.router=t,this.activeRoute=n,this.campaignService=r,this.reportsService=a,this.selectedCampaign=[],this.searchObj={},this.parameters={},this.showExport=!1,this.isAccessible=!1,this.subscription=new u.a}return _createClass(e,[{key:"getCurrentCampaign",value:function(){return this.campaignService.getCampaignId()}},{key:"ngOnInit",value:function(){this.title=this.activeRoute.snapshot.data.title,this.campaign_id=this.getCurrentCampaign(),this.campaign_id&&(this.parameters.campaign_id=this.campaign_id);var e=this.reportsService.checkPermissionExist(["last-login-report-export","export-campaign"]);this.showExport=e[0],this.isAccessible=e[1]}},{key:"ngAfterViewInit",value:function(){this.loadReportData()}},{key:"loadReportData",value:function(){var e=this;this.subscription=d.a.merge(this.activeRoute.queryParams.pipe(Object(p.a)((function(t){return e.parameters=s.a.merge({},e.parameters,t),e.parameters})),Object(m.a)((function(t){return e.loadData(t)}))),this.search()).subscribe((function(t){e.records=t}))}},{key:"loadData",value:function(e){return this.campaign_id&&(e.campaign_id=this.campaign_id),this.reportsService.getCourseReport(e)}},{key:"search",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.sf.valueChanges.pipe(Object(f.a)(400),Object(h.a)(),Object(p.a)((function(n){return e.searchObj=s.a.removeNullKeys(n),e.parameters=s.a.merge({},e.parameters,e.searchObj,t),e.parameters})),Object(g.a)((function(t){return e.loadData(t)})))}},{key:"export",value:function(){this.searchObj.campaign_id=this.getCurrentCampaign();var e=this.reportsService.getCurrentDate();this.reportsService.exportData(this.searchObj,"Course-Report-"+e,"report","last_login_export")}},{key:"pageChange",value:function(e){this.router.navigate([],{relativeTo:this.activeRoute,queryParams:{page:e,campaign_id:this.campaign_id}})}},{key:"changeCampaign",value:function(e){this.campaignService.setCampaignId(e.id),this.campaign_id=this.getCurrentCampaign(),this.parameters.campaign_id=this.campaign_id,this.sf.form.updateValueAndValidity()}},{key:"ngOnDestroy",value:function(){this.subscription.unsubscribe()}},{key:"openUrl",value:function(e,t){this.router.navigate(["/"+t],{queryParams:{course_id:e,campaign_id:this.campaign_id}})}}]),e}(),j.\u0275fac=function(e){return new(e||j)(v["\u0275\u0275directiveInject"](l.c),v["\u0275\u0275directiveInject"](l.a),v["\u0275\u0275directiveInject"](b.a),v["\u0275\u0275directiveInject"](y.a))},j.\u0275cmp=v["\u0275\u0275defineComponent"]({type:j,selectors:[["app-course-report"]],viewQuery:function(e,t){var n;1&e&&v["\u0275\u0275viewQuery"](x,!0),2&e&&v["\u0275\u0275queryRefresh"](n=v["\u0275\u0275loadQuery"]())&&(t.sf=n.first)},decls:17,vars:6,consts:[[2,"min-height","calc(100vh - 75px)"],[3,"changeCampaign",4,"ngIf"],["id","simple-table"],[1,"row"],[1,"col-sm-12"],[1,"card","card-border-shadow-0"],[1,"card-header","m-top-bottom-10","px-3"],[1,"card-title","module-title"],[3,"showAdd","showImport","showExport","download"],[1,"card-body"],[1,"px-3"],["name","searchForm","ngForm","",1,"table-responsive"],["searchForm","ngForm"],["class","card-block",4,"ngIf"],["loading",""],[3,"changeCampaign"],[1,"card-block"],[1,"table","table-bordered","table-condensed"],["type","text","name","name","ngModel","","placeholder","Course Name","autocomplete","off",1,"form-control"],[4,"ngIf"],[4,"ngFor","ngForOf"],["scope","row"],["href","javascript:void(0)",3,"click"],[3,"maxSize","rotate","collectionSize","pageSize","page","pageChange"]],template:function(e,t){1&e&&(v["\u0275\u0275elementStart"](0,"div",0),v["\u0275\u0275template"](1,S,1,0,"app-topbar",1),v["\u0275\u0275elementStart"](2,"section",2),v["\u0275\u0275elementStart"](3,"div",3),v["\u0275\u0275elementStart"](4,"div",4),v["\u0275\u0275elementStart"](5,"div",5),v["\u0275\u0275elementStart"](6,"div",6),v["\u0275\u0275elementStart"](7,"h4",7),v["\u0275\u0275text"](8),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](9,"app-actionbtns",8),v["\u0275\u0275listener"]("download",(function(){return t.export()})),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](10,"div",9),v["\u0275\u0275elementStart"](11,"div",10),v["\u0275\u0275elementStart"](12,"form",11,12),v["\u0275\u0275template"](14,I,22,3,"div",13),v["\u0275\u0275elementEnd"](),v["\u0275\u0275template"](15,O,1,0,"ng-template",null,14,v["\u0275\u0275templateRefExtractor"]),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()),2&e&&(v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("ngIf",t.isAccessible),v["\u0275\u0275advance"](7),v["\u0275\u0275textInterpolate"](t.title),v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("showAdd",!1)("showImport",!1)("showExport",t.showExport),v["\u0275\u0275advance"](5),v["\u0275\u0275property"]("ngIf",t.records))},directives:[r.n,C.a,o.D,o.r,o.s,_.a,o.b,o.q,o.t,r.m,a.l],styles:[""]}),j),data:{title:"Course Report",permission:"course-report"}}],V=((R=function e(){_classCallCheck(this,e)}).\u0275mod=v["\u0275\u0275defineNgModule"]({type:R}),R.\u0275inj=v["\u0275\u0275defineInjector"]({factory:function(e){return new(e||R)},imports:[[l.g.forChild(F)],l.g]}),R),A=((P=function e(){_classCallCheck(this,e)}).\u0275mod=v["\u0275\u0275defineNgModule"]({type:P}),P.\u0275inj=v["\u0275\u0275defineInjector"]({factory:function(e){return new(e||P)},providers:[y.a],imports:[[r.c,a.j,o.l,V,i.b.forRoot(),c.a,a.i]]}),P)},utbL:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n("fXoL"),a=n("tyNb"),i=n("hHWK"),o=n("82/m"),c=n("IAlr"),l=n("ofXK"),s=n("1kSV"),u=n("3Pt+"),d=["uploadForm"];function p(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"a",13),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](n),r["\u0275\u0275nextContext"]().add()})),r["\u0275\u0275element"](1,"i",14),r["\u0275\u0275elementEnd"]()}}function m(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"a",13),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](n),r["\u0275\u0275nextContext"]().initiateExport()})),r["\u0275\u0275element"](1,"i",15),r["\u0275\u0275elementEnd"]()}}function f(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"button",16),r["\u0275\u0275listener"]("click",(function(){r["\u0275\u0275restoreView"](n);var e=r["\u0275\u0275nextContext"]();return e.isCollapsed=!e.isCollapsed})),r["\u0275\u0275element"](1,"i",17),r["\u0275\u0275elementEnd"]()}if(2&e){var a=r["\u0275\u0275nextContext"]();r["\u0275\u0275attribute"]("aria-expanded",!a.isCollapsed)}}var h=function(){var e=function(){function e(t,n,a,i){_classCallCheck(this,e),this.router=t,this.cs=n,this.ss=a,this.courseService=i,this.download=new r.EventEmitter,this.uploaded=new r.EventEmitter,this.uploadFile=new r.EventEmitter,this.files=[],this.isCollapsed=!0,this.section_id="",this.course_id=""}return _createClass(e,[{key:"ngOnInit",value:function(){this.campainId=this.cs.getCampaignId(),this.section_id=this.ss.getSectionId(),this.course_id=this.courseService.getCourseId()}},{key:"add",value:function(){this.router.navigate([this.addRedirect],{queryParams:{section_id:this.section_id,campaign_id:this.campainId,course_id:this.course_id}})}},{key:"initiateExport",value:function(){this.download.emit("export_data")}},{key:"upload",value:function(){this.uploadFile.emit(this.files),this.isCollapsed=!0}},{key:"onChange",value:function(e){var t=e.srcElement.files;this.uploaded.emit(t[0]),this.files=t[0]}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](a.c),r["\u0275\u0275directiveInject"](i.a),r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](c.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-actionbtns"]],viewQuery:function(e,t){var n;1&e&&r["\u0275\u0275viewQuery"](d,!0),2&e&&r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.userFrm=n.first)},inputs:{addRedirect:"addRedirect",showAdd:"showAdd",showExport:"showExport",showImport:"showImport",uploadFields:"uploadFields",uploadAction:"uploadAction"},outputs:{download:"download",uploaded:"uploaded",uploadFile:"uploadFile"},decls:20,vars:5,consts:[[2,"float","right","margin-bottom","10px"],["class","btn btn-raised btn-purple m-1",3,"click",4,"ngIf"],["type","button","class","btn btn-raised btn-purple m-1","aria-controls","collapseExample",3,"click",4,"ngIf"],["id","collapseExample",3,"ngbCollapse"],[2,"margin-top","60px","margin-bottom","5px",3,"ngSubmit"],["uploadForm","ngForm"],["id","upcsv",1,"form-group","fupload-main-contianer"],[1,"fupload"],["type","file","name","upload","id","upload",1,"",3,"change"],[1,"fbtn-upload"],["type","submit",1,"btn","btn-raised","btn-purple"],[2,"clear","both"],[1,"text-danger","text-csv"],[1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-plus-circle","white","warning","font-medium-1",2,"color","#fff !important"],[1,"ft-download","white","warning","font-medium-1",2,"color","#fff !important"],["type","button","aria-controls","collapseExample",1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-upload","white","warning","font-medium-1",2,"color","#fff !important"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275template"](1,p,2,0,"a",1),r["\u0275\u0275template"](2,m,2,0,"a",1),r["\u0275\u0275template"](3,f,2,1,"button",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"div",3),r["\u0275\u0275elementStart"](5,"form",4,5),r["\u0275\u0275listener"]("ngSubmit",(function(){return t.upload()})),r["\u0275\u0275elementStart"](7,"div",6),r["\u0275\u0275elementStart"](8,"b"),r["\u0275\u0275text"](9,"Upload CSV"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](10,"br"),r["\u0275\u0275elementStart"](11,"div",7),r["\u0275\u0275elementStart"](12,"input",8),r["\u0275\u0275listener"]("change",(function(e){return t.onChange(e)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](13,"br"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](14,"div",9),r["\u0275\u0275elementStart"](15,"button",10),r["\u0275\u0275text"](16," Upload "),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](17,"div",11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](18,"span",12),r["\u0275\u0275text"](19),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showAdd),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showExport),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showImport),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngbCollapse",t.isCollapsed),r["\u0275\u0275advance"](15),r["\u0275\u0275textInterpolate1"]("Csv Format (",t.uploadFields,")"))},directives:[l.n,s.b,u.D,u.r,u.s],styles:[".fupload-main-contianer[_ngcontent-%COMP%]{width:50%;border:2px dotted #ffc107;padding:18px;border-radius:5px;background-color:#fffcf7}.fupload[_ngcontent-%COMP%]{padding-top:5px}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:50%;float:left}.text-csv[_ngcontent-%COMP%]{font-size:13px}@media only screen and (max-width:600px){.fupload-main-contianer[_ngcontent-%COMP%]{width:100%!important}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:100%}}@media only screen and (max-width:1024px){.fupload-main-contianer[_ngcontent-%COMP%]{width:80%!important}}"]}),e}()},"uu/O":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getValueCampaign",value:function(){return e.campaign_id}}],[{key:"removeNullKeys",value:function(e){return Object.keys(e).reduce((function(t,n){var r=t;return void 0!==e[n]&&(r[n]=e[n]),r}),{})}},{key:"merge",value:function(){for(var e={},t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.forEach((function(t){e=Object.assign(e,t)})),e}},{key:"setValueCampaign",value:function(t){e.campaign_id=t}},{key:"dropDownSettings",value:function(e,t,n,r){return{singleSelection:e||!1,idField:n||"id",textField:r||"name",selectAllText:"Select All",unSelectAllText:"UnSelect All",itemsShowLimit:3,allowSearchFilter:!0,closeDropDownOnSelection:t||!0}}}]),e}()}}]);