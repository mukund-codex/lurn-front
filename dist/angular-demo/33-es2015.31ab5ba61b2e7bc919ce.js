(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{"6Br6":function(e,t,n){"use strict";var i=n("HDdC"),a=n("VRyK");i.a.merge=a.a},"82/m":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n("G5QB"),a=n("fXoL"),r=n("tk/3"),o=n("ZtWP"),s=n("hHWK");let c=(()=>{class e extends i.a{constructor(e,t,n){super("section",e),this.http=e,this.companyService=t,this.campaignService=n}setSectionId(e){this.section_id=e}getSectionId(){return this.section_id}setCourseId(e){this.course_id=e}getCourseId(){return this.course_id}getCampaigns(e){return this.campaignService.getAll({company_id:e})}getTypesFromCampaign(e){return this.http.get(`${this.apiUrl}campaign/geography_from_campaign?campaign_id=`+e)}getSectionData(e,t){return this.http.get(`${this.apiUrl}section/section_dropdown_list?campaign_id=`+t+"&course_id="+e)}}return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275inject"](r.b),a["\u0275\u0275inject"](o.a),a["\u0275\u0275inject"](s.a))},e.\u0275prov=a["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},"K/1Y":function(e,t,n){"use strict";n.r(t),n.d(t,"QuizReportModule",(function(){return k}));var i=n("ofXK"),a=n("1kSV"),r=n("Egam"),o=n("3Pt+"),s=n("PCNd"),c=n("tyNb"),l=n("uu/O"),d=n("quSY"),p=n("HDdC"),m=(n("6Br6"),n("lJxs")),u=n("bOdf"),h=n("Kj3r"),g=n("/uUt"),f=n("eIep"),v=n("fXoL"),b=n("hHWK"),x=n("KY19"),S=n("utbL"),w=n("5Lta");const C=["searchForm"];function E(e,t){if(1&e){const e=v["\u0275\u0275getCurrentView"]();v["\u0275\u0275elementStart"](0,"app-topbar",15),v["\u0275\u0275listener"]("changeCampaign",(function(t){return v["\u0275\u0275restoreView"](e),v["\u0275\u0275nextContext"]().changeCampaign(t)})),v["\u0275\u0275elementEnd"]()}}function _(e,t){1&e&&(v["\u0275\u0275elementStart"](0,"tr"),v["\u0275\u0275elementStart"](1,"td"),v["\u0275\u0275text"](2,"No Records Found!"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()),2&e&&(v["\u0275\u0275advance"](1),v["\u0275\u0275attribute"]("colSpan",3))}function y(e,t){if(1&e){const e=v["\u0275\u0275getCurrentView"]();v["\u0275\u0275elementStart"](0,"tr"),v["\u0275\u0275elementStart"](1,"th",21),v["\u0275\u0275text"](2),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](3,"td"),v["\u0275\u0275text"](4),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](5,"td"),v["\u0275\u0275text"](6),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](7,"td"),v["\u0275\u0275elementStart"](8,"a",22),v["\u0275\u0275listener"]("click",(function(){v["\u0275\u0275restoreView"](e);const n=t.$implicit;return v["\u0275\u0275nextContext"](2).openUrl(n.id,"quiz-answer-report")})),v["\u0275\u0275text"](9,"View Details"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()}if(2&e){const e=t.$implicit,n=t.index,i=v["\u0275\u0275nextContext"](2);v["\u0275\u0275advance"](2),v["\u0275\u0275textInterpolate1"](" ",(i.records.meta.pagination.current_page-1)*i.records.meta.pagination.per_page+n+1," "),v["\u0275\u0275advance"](2),v["\u0275\u0275textInterpolate"](e.quiz_title),v["\u0275\u0275advance"](2),v["\u0275\u0275textInterpolate"](e.user_count)}}function I(e,t){if(1&e){const e=v["\u0275\u0275getCurrentView"]();v["\u0275\u0275elementStart"](0,"div"),v["\u0275\u0275elementStart"](1,"ngb-pagination",23),v["\u0275\u0275listener"]("pageChange",(function(t){return v["\u0275\u0275restoreView"](e),v["\u0275\u0275nextContext"](2).pageChange(t)}))("pageChange",(function(t){return v["\u0275\u0275restoreView"](e),v["\u0275\u0275nextContext"](2).records.meta.pagination.current_page=t})),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()}if(2&e){const e=v["\u0275\u0275nextContext"](2);v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("maxSize",3)("rotate",!0)("collectionSize",e.records.meta.pagination.total)("pageSize",e.records.meta.pagination.per_page)("page",e.records.meta.pagination.current_page)}}function j(e,t){if(1&e&&(v["\u0275\u0275elementStart"](0,"div",16),v["\u0275\u0275elementStart"](1,"table",17),v["\u0275\u0275elementStart"](2,"thead"),v["\u0275\u0275elementStart"](3,"tr"),v["\u0275\u0275elementStart"](4,"th"),v["\u0275\u0275text"](5,"Sr. No"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](6,"th"),v["\u0275\u0275text"](7,"Quiz Title"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](8,"th"),v["\u0275\u0275text"](9,"Quiz Attemptted User Count"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](10,"th"),v["\u0275\u0275text"](11,"Action"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](12,"tbody"),v["\u0275\u0275elementStart"](13,"tr"),v["\u0275\u0275element"](14,"td"),v["\u0275\u0275elementStart"](15,"td"),v["\u0275\u0275element"](16,"input",18),v["\u0275\u0275elementEnd"](),v["\u0275\u0275element"](17,"td"),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementContainerStart"](18),v["\u0275\u0275template"](19,_,3,1,"tr",19),v["\u0275\u0275template"](20,y,10,3,"tr",20),v["\u0275\u0275elementContainerEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275template"](21,I,2,5,"div",19),v["\u0275\u0275elementEnd"]()),2&e){const e=v["\u0275\u0275nextContext"]();v["\u0275\u0275advance"](19),v["\u0275\u0275property"]("ngIf",!e.records.data.length),v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("ngForOf",e.records.data),v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("ngIf",e.records)}}function O(e,t){1&e&&v["\u0275\u0275text"](0,"Loading Data...")}const F=[{path:"",component:(()=>{class e{constructor(e,t,n,i){this.router=e,this.activeRoute=t,this.campaignService=n,this.reportsService=i,this.selectedCampaign=[],this.searchObj={},this.parameters={},this.showExport=!1,this.isAccessible=!1,this.subscription=new d.a}getCurrentCampaign(){return this.campaignService.getCampaignId()}ngOnInit(){this.title=this.activeRoute.snapshot.data.title,this.campaign_id=this.getCurrentCampaign(),this.campaign_id&&(this.parameters.campaign_id=this.campaign_id);const e=this.reportsService.checkPermissionExist(["last-login-report-export","export-campaign"]);this.showExport=e[0],this.isAccessible=e[1]}ngAfterViewInit(){this.loadReportData()}loadReportData(){this.subscription=p.a.merge(this.activeRoute.queryParams.pipe(Object(m.a)(e=>(this.parameters=l.a.merge({},this.parameters,e),this.parameters)),Object(u.a)(e=>this.loadData(e))),this.search()).subscribe(e=>{this.records=e})}loadData(e){return this.campaign_id&&(e.campaign_id=this.campaign_id),this.reportsService.getQuizReport(e)}search(e={}){return this.sf.valueChanges.pipe(Object(h.a)(400),Object(g.a)(),Object(m.a)(t=>(this.searchObj=l.a.removeNullKeys(t),this.parameters=l.a.merge({},this.parameters,this.searchObj,e),this.parameters)),Object(f.a)(e=>this.loadData(e)))}export(){this.searchObj.campaign_id=this.getCurrentCampaign();const e=this.reportsService.getCurrentDate();this.reportsService.exportData(this.searchObj,"Quiz-Report-"+e,"report","last_login_export")}pageChange(e){this.router.navigate([],{relativeTo:this.activeRoute,queryParams:{page:e,campaign_id:this.campaign_id}})}changeCampaign(e){this.campaignService.setCampaignId(e.id),this.campaign_id=this.getCurrentCampaign(),this.parameters.campaign_id=this.campaign_id,this.sf.form.updateValueAndValidity()}ngOnDestroy(){this.subscription.unsubscribe()}openUrl(e,t){this.router.navigate(["/"+t],{queryParams:{quiz_id:e,campaign_id:this.campaign_id}})}}return e.\u0275fac=function(t){return new(t||e)(v["\u0275\u0275directiveInject"](c.c),v["\u0275\u0275directiveInject"](c.a),v["\u0275\u0275directiveInject"](b.a),v["\u0275\u0275directiveInject"](x.a))},e.\u0275cmp=v["\u0275\u0275defineComponent"]({type:e,selectors:[["app-last-login"]],viewQuery:function(e,t){var n;1&e&&v["\u0275\u0275viewQuery"](C,!0),2&e&&v["\u0275\u0275queryRefresh"](n=v["\u0275\u0275loadQuery"]())&&(t.sf=n.first)},decls:17,vars:6,consts:[[2,"min-height","calc(100vh - 75px)"],[3,"changeCampaign",4,"ngIf"],["id","simple-table"],[1,"row"],[1,"col-sm-12"],[1,"card","card-border-shadow-0"],[1,"card-header","m-top-bottom-10","px-3"],[1,"card-title","module-title"],[3,"showAdd","showImport","showExport","download"],[1,"card-body"],[1,"px-3"],["name","searchForm","ngForm","",1,"table-responsive"],["searchForm","ngForm"],["class","card-block",4,"ngIf"],["loading",""],[3,"changeCampaign"],[1,"card-block"],[1,"table","table-bordered","table-condensed"],["type","text","name","title","ngModel","","placeholder","Quiz Title","autocomplete","off",1,"form-control"],[4,"ngIf"],[4,"ngFor","ngForOf"],["scope","row"],["href","javascript:void(0)",3,"click"],[3,"maxSize","rotate","collectionSize","pageSize","page","pageChange"]],template:function(e,t){1&e&&(v["\u0275\u0275elementStart"](0,"div",0),v["\u0275\u0275template"](1,E,1,0,"app-topbar",1),v["\u0275\u0275elementStart"](2,"section",2),v["\u0275\u0275elementStart"](3,"div",3),v["\u0275\u0275elementStart"](4,"div",4),v["\u0275\u0275elementStart"](5,"div",5),v["\u0275\u0275elementStart"](6,"div",6),v["\u0275\u0275elementStart"](7,"h4",7),v["\u0275\u0275text"](8),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](9,"app-actionbtns",8),v["\u0275\u0275listener"]("download",(function(){return t.export()})),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementStart"](10,"div",9),v["\u0275\u0275elementStart"](11,"div",10),v["\u0275\u0275elementStart"](12,"form",11,12),v["\u0275\u0275template"](14,j,22,3,"div",13),v["\u0275\u0275elementEnd"](),v["\u0275\u0275template"](15,O,1,0,"ng-template",null,14,v["\u0275\u0275templateRefExtractor"]),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"](),v["\u0275\u0275elementEnd"]()),2&e&&(v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("ngIf",t.isAccessible),v["\u0275\u0275advance"](7),v["\u0275\u0275textInterpolate"](t.title),v["\u0275\u0275advance"](1),v["\u0275\u0275property"]("showAdd",!1)("showImport",!1)("showExport",t.showExport),v["\u0275\u0275advance"](5),v["\u0275\u0275property"]("ngIf",t.records))},directives:[i.n,S.a,o.D,o.r,o.s,w.a,o.b,o.q,o.t,i.m,a.l],styles:[""]}),e})(),data:{title:"Quiz Report",permission:"quiz-report"}}];let V=(()=>{class e{}return e.\u0275mod=v["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=v["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},imports:[[c.g.forChild(F)],c.g]}),e})(),k=(()=>{class e{}return e.\u0275mod=v["\u0275\u0275defineNgModule"]({type:e}),e.\u0275inj=v["\u0275\u0275defineInjector"]({factory:function(t){return new(t||e)},providers:[x.a],imports:[[i.c,a.j,o.l,V,r.b.forRoot(),s.a,a.i]]}),e})()},utbL:function(e,t,n){"use strict";n.d(t,"a",(function(){return g}));var i=n("fXoL"),a=n("tyNb"),r=n("hHWK"),o=n("82/m"),s=n("IAlr"),c=n("ofXK"),l=n("1kSV"),d=n("3Pt+");const p=["uploadForm"];function m(e,t){if(1&e){const e=i["\u0275\u0275getCurrentView"]();i["\u0275\u0275elementStart"](0,"a",13),i["\u0275\u0275listener"]("click",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275nextContext"]().add()})),i["\u0275\u0275element"](1,"i",14),i["\u0275\u0275elementEnd"]()}}function u(e,t){if(1&e){const e=i["\u0275\u0275getCurrentView"]();i["\u0275\u0275elementStart"](0,"a",13),i["\u0275\u0275listener"]("click",(function(){return i["\u0275\u0275restoreView"](e),i["\u0275\u0275nextContext"]().initiateExport()})),i["\u0275\u0275element"](1,"i",15),i["\u0275\u0275elementEnd"]()}}function h(e,t){if(1&e){const e=i["\u0275\u0275getCurrentView"]();i["\u0275\u0275elementStart"](0,"button",16),i["\u0275\u0275listener"]("click",(function(){i["\u0275\u0275restoreView"](e);const t=i["\u0275\u0275nextContext"]();return t.isCollapsed=!t.isCollapsed})),i["\u0275\u0275element"](1,"i",17),i["\u0275\u0275elementEnd"]()}if(2&e){const e=i["\u0275\u0275nextContext"]();i["\u0275\u0275attribute"]("aria-expanded",!e.isCollapsed)}}let g=(()=>{class e{constructor(e,t,n,a){this.router=e,this.cs=t,this.ss=n,this.courseService=a,this.download=new i.EventEmitter,this.uploaded=new i.EventEmitter,this.uploadFile=new i.EventEmitter,this.files=[],this.isCollapsed=!0,this.section_id="",this.course_id=""}ngOnInit(){this.campainId=this.cs.getCampaignId(),this.section_id=this.ss.getSectionId(),this.course_id=this.courseService.getCourseId()}add(){this.router.navigate([this.addRedirect],{queryParams:{section_id:this.section_id,campaign_id:this.campainId,course_id:this.course_id}})}initiateExport(){this.download.emit("export_data")}upload(){this.uploadFile.emit(this.files),this.isCollapsed=!0}onChange(e){const t=e.srcElement.files;this.uploaded.emit(t[0]),this.files=t[0]}}return e.\u0275fac=function(t){return new(t||e)(i["\u0275\u0275directiveInject"](a.c),i["\u0275\u0275directiveInject"](r.a),i["\u0275\u0275directiveInject"](o.a),i["\u0275\u0275directiveInject"](s.a))},e.\u0275cmp=i["\u0275\u0275defineComponent"]({type:e,selectors:[["app-actionbtns"]],viewQuery:function(e,t){var n;1&e&&i["\u0275\u0275viewQuery"](p,!0),2&e&&i["\u0275\u0275queryRefresh"](n=i["\u0275\u0275loadQuery"]())&&(t.userFrm=n.first)},inputs:{addRedirect:"addRedirect",showAdd:"showAdd",showExport:"showExport",showImport:"showImport",uploadFields:"uploadFields",uploadAction:"uploadAction"},outputs:{download:"download",uploaded:"uploaded",uploadFile:"uploadFile"},decls:20,vars:5,consts:[[2,"float","right","margin-bottom","10px"],["class","btn btn-raised btn-purple m-1",3,"click",4,"ngIf"],["type","button","class","btn btn-raised btn-purple m-1","aria-controls","collapseExample",3,"click",4,"ngIf"],["id","collapseExample",3,"ngbCollapse"],[2,"margin-top","60px","margin-bottom","5px",3,"ngSubmit"],["uploadForm","ngForm"],["id","upcsv",1,"form-group","fupload-main-contianer"],[1,"fupload"],["type","file","name","upload","id","upload",1,"",3,"change"],[1,"fbtn-upload"],["type","submit",1,"btn","btn-raised","btn-purple"],[2,"clear","both"],[1,"text-danger","text-csv"],[1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-plus-circle","white","warning","font-medium-1",2,"color","#fff !important"],[1,"ft-download","white","warning","font-medium-1",2,"color","#fff !important"],["type","button","aria-controls","collapseExample",1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-upload","white","warning","font-medium-1",2,"color","#fff !important"]],template:function(e,t){1&e&&(i["\u0275\u0275elementStart"](0,"div",0),i["\u0275\u0275template"](1,m,2,0,"a",1),i["\u0275\u0275template"](2,u,2,0,"a",1),i["\u0275\u0275template"](3,h,2,1,"button",2),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](4,"div",3),i["\u0275\u0275elementStart"](5,"form",4,5),i["\u0275\u0275listener"]("ngSubmit",(function(){return t.upload()})),i["\u0275\u0275elementStart"](7,"div",6),i["\u0275\u0275elementStart"](8,"b"),i["\u0275\u0275text"](9,"Upload CSV"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](10,"br"),i["\u0275\u0275elementStart"](11,"div",7),i["\u0275\u0275elementStart"](12,"input",8),i["\u0275\u0275listener"]("change",(function(e){return t.onChange(e)})),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](13,"br"),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](14,"div",9),i["\u0275\u0275elementStart"](15,"button",10),i["\u0275\u0275text"](16," Upload "),i["\u0275\u0275elementEnd"](),i["\u0275\u0275element"](17,"div",11),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementStart"](18,"span",12),i["\u0275\u0275text"](19),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"](),i["\u0275\u0275elementEnd"]()),2&e&&(i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",!1!==t.showAdd),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",!1!==t.showExport),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngIf",!1!==t.showImport),i["\u0275\u0275advance"](1),i["\u0275\u0275property"]("ngbCollapse",t.isCollapsed),i["\u0275\u0275advance"](15),i["\u0275\u0275textInterpolate1"]("Csv Format (",t.uploadFields,")"))},directives:[c.n,l.b,d.D,d.r,d.s],styles:[".fupload-main-contianer[_ngcontent-%COMP%]{width:50%;border:2px dotted #ffc107;padding:18px;border-radius:5px;background-color:#fffcf7}.fupload[_ngcontent-%COMP%]{padding-top:5px}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:50%;float:left}.text-csv[_ngcontent-%COMP%]{font-size:13px}@media only screen and (max-width:600px){.fupload-main-contianer[_ngcontent-%COMP%]{width:100%!important}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:100%}}@media only screen and (max-width:1024px){.fupload-main-contianer[_ngcontent-%COMP%]{width:80%!important}}"]}),e})()},"uu/O":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));class i{static removeNullKeys(e){return Object.keys(e).reduce((t,n)=>{const i=t;return void 0!==e[n]&&(i[n]=e[n]),i},{})}static merge(...e){let t={};return e.forEach(e=>{t=Object.assign(t,e)}),t}static setValueCampaign(e){i.campaign_id=e}getValueCampaign(){return i.campaign_id}static dropDownSettings(e,t,n,i){return{singleSelection:e||!1,idField:n||"id",textField:i||"name",selectAllText:"Select All",unSelectAllText:"UnSelect All",itemsShowLimit:3,allowSearchFilter:!0,closeDropDownOnSelection:t||!0}}}}}]);