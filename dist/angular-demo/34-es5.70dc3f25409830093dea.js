function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}function _createSuper(e){return function(){var t,n=_getPrototypeOf(e);if(_isNativeReflectConstruct()){var r=_getPrototypeOf(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{"6Br6":function(e,t,n){"use strict";var r=n("HDdC"),a=n("VRyK");r.a.merge=a.a},"82/m":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("G5QB"),a=n("fXoL"),o=n("tk/3"),i=n("ZtWP"),s=n("hHWK"),l=function(){var e=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,r,a){var o;return _classCallCheck(this,n),(o=t.call(this,"section",e)).http=e,o.companyService=r,o.campaignService=a,o}return _createClass(n,[{key:"setSectionId",value:function(e){this.section_id=e}},{key:"getSectionId",value:function(){return this.section_id}},{key:"setCourseId",value:function(e){this.course_id=e}},{key:"getCourseId",value:function(){return this.course_id}},{key:"getCampaigns",value:function(e){return this.campaignService.getAll({company_id:e})}},{key:"getTypesFromCampaign",value:function(e){return this.http.get("".concat(this.apiUrl,"campaign/geography_from_campaign?campaign_id=")+e)}},{key:"getSectionData",value:function(e,t){return this.http.get("".concat(this.apiUrl,"section/section_dropdown_list?campaign_id=")+t+"&course_id="+e)}}]),n}(r.a);return e.\u0275fac=function(t){return new(t||e)(a["\u0275\u0275inject"](o.b),a["\u0275\u0275inject"](i.a),a["\u0275\u0275inject"](s.a))},e.\u0275prov=a["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},ESCD:function(e,t,n){"use strict";n.r(t),n.d(t,"RolesModule",(function(){return ee}));var r=n("ofXK"),a=n("3Pt+"),o=n("Egam"),i=n("tyNb"),s=n("zE9r"),l=n("lJxs"),c=n("bOdf"),d=n("Kj3r"),u=n("/uUt"),m=n("eIep"),p=(n("6Br6"),n("quSY")),f=n("uu/O"),h=n("fXoL"),v=n("0ceX"),g=n("5eHb"),b=n("utbL"),y=n("QJFE"),S=n("1kSV"),E=["searchForm"];function w(e,t){if(1&e&&(h["\u0275\u0275elementStart"](0,"div",20),h["\u0275\u0275elementStart"](1,"b",21),h["\u0275\u0275text"](2),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"]()),2&e){var n=h["\u0275\u0275nextContext"]();h["\u0275\u0275advance"](2),h["\u0275\u0275textInterpolate1"]("Total Records : ",null==n.records.meta||null==n.records.meta.pagination?null:n.records.meta.pagination.total,"")}}var x=function(e){return[e]};function C(e,t){if(1&e){var n=h["\u0275\u0275getCurrentView"]();h["\u0275\u0275elementStart"](0,"tr"),h["\u0275\u0275elementStart"](1,"td"),h["\u0275\u0275elementStart"](2,"a",23),h["\u0275\u0275element"](3,"i",24),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](4,"a",25),h["\u0275\u0275listener"]("confirm",(function(){h["\u0275\u0275restoreView"](n);var e=t.$implicit;return h["\u0275\u0275nextContext"](2).delete(e.id)})),h["\u0275\u0275element"](5,"i",26),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](6,"th",27),h["\u0275\u0275text"](7),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](8,"td"),h["\u0275\u0275text"](9),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"]()}if(2&e){var r=t.$implicit,a=t.index,o=h["\u0275\u0275nextContext"](2),i=h["\u0275\u0275reference"](9);h["\u0275\u0275advance"](2),h["\u0275\u0275property"]("routerLink",h["\u0275\u0275pureFunction1"](4,x,"/manpower/roles/edit/"+r.id)),h["\u0275\u0275advance"](2),h["\u0275\u0275property"]("swal",i),h["\u0275\u0275advance"](3),h["\u0275\u0275textInterpolate1"](" ",(o.records.meta.pagination.current_page-1)*o.records.meta.pagination.per_page+a+1," "),h["\u0275\u0275advance"](2),h["\u0275\u0275textInterpolate"](r.name)}}function _(e,t){if(1&e&&(h["\u0275\u0275elementContainerStart"](0),h["\u0275\u0275template"](1,C,10,6,"tr",22),h["\u0275\u0275elementContainerEnd"]()),2&e){var n=h["\u0275\u0275nextContext"]();h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngForOf",n.records.data)}}function I(e,t){if(1&e){var n=h["\u0275\u0275getCurrentView"]();h["\u0275\u0275elementStart"](0,"div"),h["\u0275\u0275elementStart"](1,"ngb-pagination",28),h["\u0275\u0275listener"]("pageChange",(function(e){return h["\u0275\u0275restoreView"](n),h["\u0275\u0275nextContext"]().pageChange(e)}))("pageChange",(function(e){return h["\u0275\u0275restoreView"](n),h["\u0275\u0275nextContext"]().records.meta.pagination.current_page=e})),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"]()}if(2&e){var r=h["\u0275\u0275nextContext"]();h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("maxSize",3)("rotate",!0)("collectionSize",r.records.meta.pagination.total)("pageSize",r.records.meta.pagination.per_page)("page",r.records.meta.pagination.current_page)}}function k(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"tr"),h["\u0275\u0275elementStart"](1,"td",29),h["\u0275\u0275text"](2,"Loading Data..."),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"]())}var O,j,R=((O=function(){function e(t,n,r,a){_classCallCheck(this,e),this.router=t,this.activeRoute=n,this.rolesService=r,this.toasterService=a,this.subscription=new p.a,this.parameters={},this.searchObj={},this.showExport=!1,this.showDelete=!1,this.showAdd=!1}return _createClass(e,[{key:"ngOnInit",value:function(){this.title=this.activeRoute.snapshot.data.title;var e=this.rolesService.checkPermissionExist(["export-user-role","remove-user-role","create-user-role"]);this.showExport=e[0],this.showDelete=e[1],this.showAdd=e[2]}},{key:"ngAfterViewInit",value:function(){var e=this;this.subscription=s.a.merge(this.activeRoute.queryParams.pipe(Object(l.a)((function(t){return e.parameters=f.a.merge({},e.parameters,t),e.parameters})),Object(c.a)((function(t){return e.loadData(t)}))),this.search()).subscribe((function(t){e.records=t}))}},{key:"loadData",value:function(e){return this.rolesService.getAll(e)}},{key:"search",value:function(){var e=this;return this.sf.valueChanges.pipe(Object(d.a)(400),Object(u.a)(),Object(l.a)((function(t){return e.searchObj=f.a.removeNullKeys(t),e.parameters=f.a.merge({},e.parameters,e.searchObj),e.parameters})),Object(m.a)((function(t){return e.loadData(t)})))}},{key:"pageChange",value:function(e){this.router.navigate([],{relativeTo:this.activeRoute,queryParams:{page:e}})}},{key:"delete",value:function(e){var t=this,n=new FormData;this.rolesService.delete(n,e).subscribe((function(e){t.toasterService.success("Record Deleted!","Success!",{positionClass:"toast-top-right"}),t.sf.form.updateValueAndValidity()}),(function(e){t.handleError(e)}))}},{key:"handleError",value:function(e){400===e.status?this.toasterService.error(e.error.message,"Error!",{positionClass:"toast-top-right"}):alert("Problems while deleting records!")}},{key:"export",value:function(e){}},{key:"ngOnDestroy",value:function(){this.subscription.unsubscribe()}}]),e}()).\u0275fac=function(e){return new(e||O)(h["\u0275\u0275directiveInject"](i.c),h["\u0275\u0275directiveInject"](i.a),h["\u0275\u0275directiveInject"](v.a),h["\u0275\u0275directiveInject"](g.b))},O.\u0275cmp=h["\u0275\u0275defineComponent"]({type:O,selectors:[["app-roles"]],viewQuery:function(e,t){var n;1&e&&h["\u0275\u0275viewQuery"](E,!0),2&e&&h["\u0275\u0275queryRefresh"](n=h["\u0275\u0275loadQuery"]())&&(t.sf=n.first)},decls:35,vars:11,consts:[["id","simple-table"],[1,"row"],[1,"col-sm-12"],[1,"card","card-border-shadow-0"],[1,"card-header","m-top-bottom-10"],[1,"card-title","module-title",2,"display","contents"],[3,"showExport","showImport","showAdd","addRedirect","download"],["title","Are you sure ?","text","This cannot be undone","icon","question",3,"showCancelButton","focusCancel"],["deleteSwal",""],[1,"card-body"],[1,"card-block"],["style","float:right;",4,"ngIf"],["name","searchForm"],["searchForm","ngForm"],[1,"table-responsive"],[1,"table","table-bordered","table-condensed"],["type","text","name","name","ngModel","","placeholder","Search By Name","autocomplete","off",1,"form-control"],[4,"ngIf","ngIfElse"],[4,"ngIf"],["loading",""],[2,"float","right"],[1,"tot-record"],[4,"ngFor","ngForOf"],[1,"ng2-smart-action","ng2-smart-action-edit-edit",3,"routerLink"],[1,"ft-edit-2","info","font-medium-1","mr-2"],[1,"ng2-smart-action","ng2-smart-action-delete-delete",3,"swal","confirm"],[1,"ft-x","danger","font-medium-1","mr-2"],["scope","row"],[3,"maxSize","rotate","collectionSize","pageSize","page","pageChange"],["colspan","3"]],template:function(e,t){if(1&e&&(h["\u0275\u0275elementStart"](0,"section",0),h["\u0275\u0275elementStart"](1,"div",1),h["\u0275\u0275elementStart"](2,"div",2),h["\u0275\u0275elementStart"](3,"div",3),h["\u0275\u0275elementStart"](4,"div",4),h["\u0275\u0275elementStart"](5,"h4",5),h["\u0275\u0275text"](6),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](7,"app-actionbtns",6),h["\u0275\u0275listener"]("download",(function(e){return t.export(e)})),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275element"](8,"swal",7,8),h["\u0275\u0275elementStart"](10,"div",9),h["\u0275\u0275elementStart"](11,"div",10),h["\u0275\u0275template"](12,w,3,1,"div",11),h["\u0275\u0275elementStart"](13,"form",12,13),h["\u0275\u0275elementStart"](15,"div",14),h["\u0275\u0275elementStart"](16,"table",15),h["\u0275\u0275elementStart"](17,"thead"),h["\u0275\u0275elementStart"](18,"tr"),h["\u0275\u0275elementStart"](19,"th"),h["\u0275\u0275text"](20,"Action"),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](21,"th"),h["\u0275\u0275text"](22,"Sr. No"),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](23,"th"),h["\u0275\u0275text"](24,"Role Name"),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](25,"tbody"),h["\u0275\u0275elementStart"](26,"tr"),h["\u0275\u0275element"](27,"td"),h["\u0275\u0275element"](28,"td"),h["\u0275\u0275elementStart"](29,"td"),h["\u0275\u0275element"](30,"input",16),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275template"](31,_,2,1,"ng-container",17),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275template"](32,I,2,5,"div",18),h["\u0275\u0275elementEnd"](),h["\u0275\u0275template"](33,k,3,0,"ng-template",null,19,h["\u0275\u0275templateRefExtractor"]),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"]()),2&e){var n=h["\u0275\u0275reference"](34);h["\u0275\u0275advance"](6),h["\u0275\u0275textInterpolate"](t.title),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("showExport",!1)("showImport",!1)("showAdd",t.showAdd)("addRedirect","/manpower/roles/add"),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("showCancelButton",!0)("focusCancel",!0),h["\u0275\u0275advance"](4),h["\u0275\u0275property"]("ngIf",t.records),h["\u0275\u0275advance"](19),h["\u0275\u0275property"]("ngIf",t.records)("ngIfElse",n),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",t.records)}},directives:[b.a,y.a,r.n,a.D,a.r,a.s,a.b,a.q,a.t,r.m,i.f,y.b,S.l],styles:[""]}),O),F=n("LRne"),P=n("itXk"),A=(n("qnbw"),n("G5QB")),D=n("tk/3"),V=((j=function(e){_inherits(n,e);var t=_createSuper(n);function n(e){var r;return _classCallCheck(this,n),(r=t.call(this,"user/permission",e)).http=e,r}return n}(A.a)).\u0275fac=function(e){return new(e||j)(h["\u0275\u0275inject"](D.b))},j.\u0275prov=h["\u0275\u0275defineInjectable"]({token:j,factory:j.\u0275fac,providedIn:"root"}),j);function N(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"div"),h["\u0275\u0275text"](1," Role Name is required! "),h["\u0275\u0275elementEnd"]())}function q(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"div"),h["\u0275\u0275text"](1," Please Enter atleast 3 Characters! "),h["\u0275\u0275elementEnd"]())}function L(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"div"),h["\u0275\u0275text"](1," Role Name must be less than 10 characters! "),h["\u0275\u0275elementEnd"]())}function M(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"div"),h["\u0275\u0275text"](1," Role Name must be letters, numbers or dashes! "),h["\u0275\u0275elementEnd"]())}function T(e,t){if(1&e&&(h["\u0275\u0275elementStart"](0,"div",27),h["\u0275\u0275template"](1,N,2,0,"div",28),h["\u0275\u0275template"](2,q,2,0,"div",28),h["\u0275\u0275template"](3,L,2,0,"div",28),h["\u0275\u0275template"](4,M,2,0,"div",28),h["\u0275\u0275elementEnd"]()),2&e){var n=h["\u0275\u0275nextContext"](2);h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",n.roles.get("name").errors.required),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",n.roles.get("name").errors.minlength),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",n.roles.get("name").errors.maxlength),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",n.roles.get("name").errors.pattern)}}function z(e,t){if(1&e&&(h["\u0275\u0275elementStart"](0,"div",27),h["\u0275\u0275text"](1),h["\u0275\u0275elementEnd"]()),2&e){var n=h["\u0275\u0275nextContext"](2);h["\u0275\u0275advance"](1),h["\u0275\u0275textInterpolate1"](" ",n.error_messages.name," ")}}function B(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"div"),h["\u0275\u0275text"](1," Role is required! "),h["\u0275\u0275elementEnd"]())}function K(e,t){if(1&e&&(h["\u0275\u0275elementStart"](0,"div",27),h["\u0275\u0275template"](1,B,2,0,"div",28),h["\u0275\u0275elementEnd"]()),2&e){var n=h["\u0275\u0275nextContext"](2);h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",n.roles.get("permissions").errors.required)}}var Q=function(){return["/manpower/roles"]};function U(e,t){if(1&e){var n=h["\u0275\u0275getCurrentView"]();h["\u0275\u0275elementContainerStart"](0),h["\u0275\u0275elementStart"](1,"form",8),h["\u0275\u0275listener"]("submit",(function(){return h["\u0275\u0275restoreView"](n),h["\u0275\u0275nextContext"]().onSubmit()})),h["\u0275\u0275elementStart"](2,"div",9),h["\u0275\u0275elementStart"](3,"h4",10),h["\u0275\u0275element"](4,"i",11),h["\u0275\u0275text"](5),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](6,"div",12),h["\u0275\u0275elementStart"](7,"div",13),h["\u0275\u0275elementStart"](8,"label",14),h["\u0275\u0275text"](9," Role Name "),h["\u0275\u0275elementStart"](10,"span",15),h["\u0275\u0275text"](11,"*"),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](12,"div",16),h["\u0275\u0275element"](13,"input",17),h["\u0275\u0275template"](14,T,5,4,"div",18),h["\u0275\u0275template"](15,z,2,1,"div",18),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](16,"div",12),h["\u0275\u0275elementStart"](17,"div",13),h["\u0275\u0275elementStart"](18,"label",14),h["\u0275\u0275text"](19," Permissions "),h["\u0275\u0275elementStart"](20,"span",15),h["\u0275\u0275text"](21,"*"),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](22,"div",16),h["\u0275\u0275elementStart"](23,"ng-multiselect-dropdown",19),h["\u0275\u0275listener"]("click",(function(){h["\u0275\u0275restoreView"](n);var e=h["\u0275\u0275nextContext"]();return e.elementTouched(e.roles.get("permissions"))})),h["\u0275\u0275elementEnd"](),h["\u0275\u0275template"](24,K,2,1,"div",18),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](25,"div",20),h["\u0275\u0275element"](26,"div",21),h["\u0275\u0275elementStart"](27,"div",22),h["\u0275\u0275elementStart"](28,"a",23),h["\u0275\u0275element"](29,"i",24),h["\u0275\u0275text"](30," Cancel "),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementStart"](31,"button",25),h["\u0275\u0275element"](32,"i",26),h["\u0275\u0275text"](33," Save "),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementContainerEnd"]()}if(2&e){var r=h["\u0275\u0275nextContext"]();h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("formGroup",r.rolesForm),h["\u0275\u0275advance"](4),h["\u0275\u0275textInterpolate1"](" ",r.title," "),h["\u0275\u0275advance"](9),h["\u0275\u0275property"]("ngIf",r.roles.get("name").errors&&r.submitted),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",r.error_messages.name),h["\u0275\u0275advance"](8),h["\u0275\u0275property"]("placeholder","Select Permissions")("settings",r.dropdownSettings)("data",r.permissions),h["\u0275\u0275advance"](1),h["\u0275\u0275property"]("ngIf",r.roles.get("permissions").errors&&r.submitted),h["\u0275\u0275advance"](4),h["\u0275\u0275property"]("routerLink",h["\u0275\u0275pureFunction0"](9,Q))}}function X(e,t){1&e&&(h["\u0275\u0275elementStart"](0,"p"),h["\u0275\u0275text"](1,"Loading Data..."),h["\u0275\u0275elementEnd"]())}var G,H,J,W=((G=function(){function e(t,n,r,a,o,i){_classCallCheck(this,e),this.rolesService=t,this.pService=n,this.activeRoute=r,this.router=a,this.fb=o,this.toasterService=i,this.roles_id="",this.formData=new FormData,this.submitted=!1,this.dropdownSettings={},this.error_messages=[]}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.buildForm=!1,this.title=this.activeRoute.snapshot.data.title,this.dropdownSettings=f.a.dropDownSettings(),Object(P.a)([this.activeRoute.params.pipe(Object(c.a)((function(t){return t.id?e.rolesService.getAll({id:t.id}):Object(F.a)({data:[]})}))),this.pService.getAll()]).subscribe((function(t){t[0].data[0]&&"edit"===e.activeRoute.snapshot.data.urlKey&&(e.roles_id=t[0].data[0].id,e.rolesForm=e.create_form(t[0].data[0])),"add"===e.activeRoute.snapshot.data.urlKey&&(e.rolesForm=e.create_form()),e.permissions=t[1].data}))}},{key:"create_form",value:function(e){var t=this.fb.group({name:[e?e.name:"",[a.B.required,a.B.minLength(2),a.B.maxLength(15),a.B.pattern("^([a-zA-Z0-9-])+$")]],permissions:[e?e.permissions:[],a.B.required]});return this.buildForm=!0,t}},{key:"onSubmit",value:function(){this.rolesForm.value.permissions.length&&(this.rolesForm.value.permissions=this.rolesForm.value.permissions.map((function(e){return e.id}))),this.submitted=!0,this.rolesForm.invalid||(this.formData=this.rolesService.convertToFormData(this.rolesForm.value),this.roles_id?this.update():this.save())}},{key:"save",value:function(){var e=this;this.rolesService.save(this.formData).subscribe((function(t){e.router.navigate(["/manpower/roles"]).then((function(){e.toasterService.success("Records Added Successfully!","Success!",{positionClass:"toast-top-right"})}))}),(function(t){e.handleError(t,e.rolesForm)}))}},{key:"update",value:function(){var e=this;this.rolesService.update(this.formData,this.roles_id).subscribe((function(t){e.router.navigate(["/manpower/roles"]).then((function(){e.toasterService.success("Records Updated Successfully!","Success!",{positionClass:"toast-top-right"})}))}),(function(t){e.handleError(t,e.rolesForm)}))}},{key:"handleError",value:function(e,t){400===e.status?this.error_messages=e.error.error:alert("Problems while saving data")}},{key:"elementTouched",value:function(e){e.markAsTouched()}},{key:"roles",get:function(){return this.rolesForm}}]),e}()).\u0275fac=function(e){return new(e||G)(h["\u0275\u0275directiveInject"](v.a),h["\u0275\u0275directiveInject"](V),h["\u0275\u0275directiveInject"](i.a),h["\u0275\u0275directiveInject"](i.c),h["\u0275\u0275directiveInject"](a.e),h["\u0275\u0275directiveInject"](g.b))},G.\u0275cmp=h["\u0275\u0275defineComponent"]({type:G,selectors:[["app-form"]],decls:9,vars:2,consts:[["id","basic-form-layouts"],[1,"row","match-height"],[1,"col-md-12"],[1,"card"],[1,"card-body"],[1,"px-3"],[4,"ngIf","ngIfElse"],["norecord",""],["enctype","multipart/form-data",1,"form","form-horizontal","striped-rows",3,"formGroup","submit"],[1,"form-body"],[1,"form-section"],[1,"ft-user"],[1,"form-group"],[1,"row"],["for","name",1,"col-md-3","pt-1"],[2,"color","red"],[1,"col-md-9"],["type","text","formControlName","name","maxlength","50","id","name","autocomplete","off",1,"form-control"],["class","invalid-feedback",4,"ngIf"],["formControlName","permissions",3,"placeholder","settings","data","click"],[1,"form-actions","center"],[1,"col-md-3"],[1,"col-sm-9"],[1,"btn","btn-raised","btn-orange","mr-1",3,"routerLink"],[1,"ft-x"],["type","submit",1,"btn","btn-raised","btn-purple"],[1,"fa","fa-check-square-o"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(e,t){if(1&e&&(h["\u0275\u0275elementStart"](0,"section",0),h["\u0275\u0275elementStart"](1,"div",1),h["\u0275\u0275elementStart"](2,"div",2),h["\u0275\u0275elementStart"](3,"div",3),h["\u0275\u0275elementStart"](4,"div",4),h["\u0275\u0275elementStart"](5,"div",5),h["\u0275\u0275template"](6,U,34,10,"ng-container",6),h["\u0275\u0275template"](7,X,2,0,"ng-template",null,7,h["\u0275\u0275templateRefExtractor"]),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"](),h["\u0275\u0275elementEnd"]()),2&e){var n=h["\u0275\u0275reference"](8);h["\u0275\u0275advance"](6),h["\u0275\u0275property"]("ngIf",t.buildForm)("ngIfElse",n)}},directives:[r.n,a.D,a.r,a.j,a.b,a.q,a.h,a.m,o.a,i.f],styles:[".position-relative.has-icon-right[_ngcontent-%COMP%]{display:none}"]}),G),$=[{path:"",component:R,data:{title:" User Roles",permission:"list-user-role"}},{path:"add",component:W,data:{title:"Add Roles",urlKey:"add",permission:"create-user-role"}},{path:"edit/:id",component:W,data:{title:"Edit Roles",urlKey:"edit",permission:"modify-user-role"}}],Z=((H=function e(){_classCallCheck(this,e)}).\u0275mod=h["\u0275\u0275defineNgModule"]({type:H}),H.\u0275inj=h["\u0275\u0275defineInjector"]({factory:function(e){return new(e||H)},imports:[[i.g.forChild($)],i.g]}),H),Y=n("PCNd"),ee=((J=function e(){_classCallCheck(this,e)}).\u0275mod=h["\u0275\u0275defineNgModule"]({type:J}),J.\u0275inj=h["\u0275\u0275defineInjector"]({factory:function(e){return new(e||J)},providers:[v.a,V],imports:[[r.c,Z,a.l,a.y,o.b.forRoot(),Y.a,y.c.forRoot()]]}),J)},utbL:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n("fXoL"),a=n("tyNb"),o=n("hHWK"),i=n("82/m"),s=n("IAlr"),l=n("ofXK"),c=n("1kSV"),d=n("3Pt+"),u=["uploadForm"];function m(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"a",13),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](n),r["\u0275\u0275nextContext"]().add()})),r["\u0275\u0275element"](1,"i",14),r["\u0275\u0275elementEnd"]()}}function p(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"a",13),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](n),r["\u0275\u0275nextContext"]().initiateExport()})),r["\u0275\u0275element"](1,"i",15),r["\u0275\u0275elementEnd"]()}}function f(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"button",16),r["\u0275\u0275listener"]("click",(function(){r["\u0275\u0275restoreView"](n);var e=r["\u0275\u0275nextContext"]();return e.isCollapsed=!e.isCollapsed})),r["\u0275\u0275element"](1,"i",17),r["\u0275\u0275elementEnd"]()}if(2&e){var a=r["\u0275\u0275nextContext"]();r["\u0275\u0275attribute"]("aria-expanded",!a.isCollapsed)}}var h=function(){var e=function(){function e(t,n,a,o){_classCallCheck(this,e),this.router=t,this.cs=n,this.ss=a,this.courseService=o,this.download=new r.EventEmitter,this.uploaded=new r.EventEmitter,this.uploadFile=new r.EventEmitter,this.files=[],this.isCollapsed=!0,this.section_id="",this.course_id=""}return _createClass(e,[{key:"ngOnInit",value:function(){this.campainId=this.cs.getCampaignId(),this.section_id=this.ss.getSectionId(),this.course_id=this.courseService.getCourseId()}},{key:"add",value:function(){this.router.navigate([this.addRedirect],{queryParams:{section_id:this.section_id,campaign_id:this.campainId,course_id:this.course_id}})}},{key:"initiateExport",value:function(){this.download.emit("export_data")}},{key:"upload",value:function(){this.uploadFile.emit(this.files),this.isCollapsed=!0}},{key:"onChange",value:function(e){var t=e.srcElement.files;this.uploaded.emit(t[0]),this.files=t[0]}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](a.c),r["\u0275\u0275directiveInject"](o.a),r["\u0275\u0275directiveInject"](i.a),r["\u0275\u0275directiveInject"](s.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-actionbtns"]],viewQuery:function(e,t){var n;1&e&&r["\u0275\u0275viewQuery"](u,!0),2&e&&r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.userFrm=n.first)},inputs:{addRedirect:"addRedirect",showAdd:"showAdd",showExport:"showExport",showImport:"showImport",uploadFields:"uploadFields",uploadAction:"uploadAction"},outputs:{download:"download",uploaded:"uploaded",uploadFile:"uploadFile"},decls:20,vars:5,consts:[[2,"float","right","margin-bottom","10px"],["class","btn btn-raised btn-purple m-1",3,"click",4,"ngIf"],["type","button","class","btn btn-raised btn-purple m-1","aria-controls","collapseExample",3,"click",4,"ngIf"],["id","collapseExample",3,"ngbCollapse"],[2,"margin-top","60px","margin-bottom","5px",3,"ngSubmit"],["uploadForm","ngForm"],["id","upcsv",1,"form-group","fupload-main-contianer"],[1,"fupload"],["type","file","name","upload","id","upload",1,"",3,"change"],[1,"fbtn-upload"],["type","submit",1,"btn","btn-raised","btn-purple"],[2,"clear","both"],[1,"text-danger","text-csv"],[1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-plus-circle","white","warning","font-medium-1",2,"color","#fff !important"],[1,"ft-download","white","warning","font-medium-1",2,"color","#fff !important"],["type","button","aria-controls","collapseExample",1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-upload","white","warning","font-medium-1",2,"color","#fff !important"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275template"](1,m,2,0,"a",1),r["\u0275\u0275template"](2,p,2,0,"a",1),r["\u0275\u0275template"](3,f,2,1,"button",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"div",3),r["\u0275\u0275elementStart"](5,"form",4,5),r["\u0275\u0275listener"]("ngSubmit",(function(){return t.upload()})),r["\u0275\u0275elementStart"](7,"div",6),r["\u0275\u0275elementStart"](8,"b"),r["\u0275\u0275text"](9,"Upload CSV"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](10,"br"),r["\u0275\u0275elementStart"](11,"div",7),r["\u0275\u0275elementStart"](12,"input",8),r["\u0275\u0275listener"]("change",(function(e){return t.onChange(e)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](13,"br"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](14,"div",9),r["\u0275\u0275elementStart"](15,"button",10),r["\u0275\u0275text"](16," Upload "),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](17,"div",11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](18,"span",12),r["\u0275\u0275text"](19),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showAdd),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showExport),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showImport),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngbCollapse",t.isCollapsed),r["\u0275\u0275advance"](15),r["\u0275\u0275textInterpolate1"]("Csv Format (",t.uploadFields,")"))},directives:[l.n,c.b,d.D,d.r,d.s],styles:[".fupload-main-contianer[_ngcontent-%COMP%]{width:50%;border:2px dotted #ffc107;padding:18px;border-radius:5px;background-color:#fffcf7}.fupload[_ngcontent-%COMP%]{padding-top:5px}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:50%;float:left}.text-csv[_ngcontent-%COMP%]{font-size:13px}@media only screen and (max-width:600px){.fupload-main-contianer[_ngcontent-%COMP%]{width:100%!important}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:100%}}@media only screen and (max-width:1024px){.fupload-main-contianer[_ngcontent-%COMP%]{width:80%!important}}"]}),e}()},"uu/O":function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"getValueCampaign",value:function(){return e.campaign_id}}],[{key:"removeNullKeys",value:function(e){return Object.keys(e).reduce((function(t,n){var r=t;return void 0!==e[n]&&(r[n]=e[n]),r}),{})}},{key:"merge",value:function(){for(var e={},t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];return n.forEach((function(t){e=Object.assign(e,t)})),e}},{key:"setValueCampaign",value:function(t){e.campaign_id=t}},{key:"dropDownSettings",value:function(e,t,n,r){return{singleSelection:e||!1,idField:n||"id",textField:r||"name",selectAllText:"Select All",unSelectAllText:"UnSelect All",itemsShowLimit:3,allowSearchFilter:!0,closeDropDownOnSelection:t||!0}}}]),e}()}}]);