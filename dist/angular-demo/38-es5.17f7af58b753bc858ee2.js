function _createSuper(e){return function(){var t,n=_getPrototypeOf(e);if(_isNativeReflectConstruct()){var r=_getPrototypeOf(this).constructor;t=Reflect.construct(n,arguments,r)}else t=n.apply(this,arguments);return _possibleConstructorReturn(this,t)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{"0m1P":function(e,t,n){"use strict";n.r(t),n.d(t,"DesignationModule",(function(){return U}));var r=n("ofXK"),o=n("1kSV"),i=n("tyNb"),a=n("fXoL"),c=n("WddB"),l=n("5eHb"),s=n("utbL"),d=n("QJFE"),u=n("3Pt+"),p=["searchForm"];function m(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"div",22),a["\u0275\u0275elementStart"](1,"b",23),a["\u0275\u0275text"](2),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e){var n=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate1"]("Total Records : ",null==n.records.meta||null==n.records.meta.pagination?null:n.records.meta.pagination.total,"")}}function f(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"tr"),a["\u0275\u0275elementStart"](1,"td"),a["\u0275\u0275text"](2,"No Records Found!"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e&&(a["\u0275\u0275advance"](1),a["\u0275\u0275attribute"]("colSpan",4))}var h=function(e){return[e]};function g(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"a",31),a["\u0275\u0275element"](1,"i",32),a["\u0275\u0275elementEnd"]()),2&e){var n=a["\u0275\u0275nextContext"]().$implicit;a["\u0275\u0275property"]("routerLink",a["\u0275\u0275pureFunction1"](1,h,"/designation/edit/"+n.id))}}function v(e,t){if(1&e){var n=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"a",33),a["\u0275\u0275listener"]("confirm",(function(){a["\u0275\u0275restoreView"](n);var e=a["\u0275\u0275nextContext"]().$implicit;return a["\u0275\u0275nextContext"](2).delete(e.id)})),a["\u0275\u0275element"](1,"i",34),a["\u0275\u0275elementEnd"]()}if(2&e){a["\u0275\u0275nextContext"](3);var r=a["\u0275\u0275reference"](9);a["\u0275\u0275property"]("swal",r)}}function b(e,t){if(1&e){var n=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"tr"),a["\u0275\u0275elementStart"](1,"td",25),a["\u0275\u0275elementStart"](2,"input",26),a["\u0275\u0275listener"]("click",(function(e){a["\u0275\u0275restoreView"](n);var r=t.$implicit;return a["\u0275\u0275nextContext"](2).selectID(r.id,e)})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](3,"label",27),a["\u0275\u0275text"](4,"\xa0"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](5,"td"),a["\u0275\u0275template"](6,g,2,3,"a",28),a["\u0275\u0275template"](7,v,2,1,"a",29),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](8,"th",30),a["\u0275\u0275text"](9),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](10,"td"),a["\u0275\u0275text"](11),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){var r=t.$implicit,o=t.index,i=a["\u0275\u0275nextContext"](2);a["\u0275\u0275advance"](2),a["\u0275\u0275propertyInterpolate"]("id",r.id),a["\u0275\u0275propertyInterpolate"]("value",r.id),a["\u0275\u0275property"]("checked",r.selected),a["\u0275\u0275advance"](1),a["\u0275\u0275propertyInterpolate"]("for",r.id),a["\u0275\u0275advance"](3),a["\u0275\u0275property"]("ngIf",i.showEdit),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",i.showDelete),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate1"](" ",(i.records.meta.pagination.current_page-1)*i.records.meta.pagination.per_page+o+1," "),a["\u0275\u0275advance"](2),a["\u0275\u0275textInterpolate"](r.name)}}function x(e,t){if(1&e&&(a["\u0275\u0275elementContainerStart"](0),a["\u0275\u0275template"](1,f,3,1,"tr",20),a["\u0275\u0275template"](2,b,12,8,"tr",24),a["\u0275\u0275elementContainerEnd"]()),2&e){var n=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",!n.records.data.length),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngForOf",n.records.data)}}function y(e,t){if(1&e){var n=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275elementStart"](1,"button",35),a["\u0275\u0275listener"]("confirm",(function(){return a["\u0275\u0275restoreView"](n),a["\u0275\u0275nextContext"]().deleteSelected()})),a["\u0275\u0275text"](2,"Delete"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){a["\u0275\u0275nextContext"]();var r=a["\u0275\u0275reference"](9);a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("swal",r)}}function S(e,t){if(1&e){var n=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275elementStart"](1,"button",36),a["\u0275\u0275listener"]("click",(function(){return a["\u0275\u0275restoreView"](n),a["\u0275\u0275nextContext"]().invalidSelection()})),a["\u0275\u0275text"](2,"Delete"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}}function C(e,t){if(1&e){var n=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275elementStart"](1,"ngb-pagination",37),a["\u0275\u0275listener"]("pageChange",(function(e){return a["\u0275\u0275restoreView"](n),a["\u0275\u0275nextContext"]().pageChange(e)}))("pageChange",(function(e){return a["\u0275\u0275restoreView"](n),a["\u0275\u0275nextContext"]().records.meta.pagination.current_page=e})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()}if(2&e){var r=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("maxSize",3)("rotate",!0)("collectionSize",r.records.meta.pagination.total)("pageSize",r.records.meta.pagination.per_page)("page",r.records.meta.pagination.current_page)}}function _(e,t){1&e&&a["\u0275\u0275text"](0,"Loading Data...")}var E,w=((E=function(){function e(t,n,r,o){_classCallCheck(this,e),this.activeRoute=t,this.designationService=n,this.router=r,this.toasterService=o,this.parameters={},this.searchObj={},this.SelectedIDs=[],this.uploadedFile=[],this.errors=[],this.uploadFields=[],this.showExport=!1,this.showDelete=!1,this.showMultiDelete=!1,this.showAdd=!1,this.showEdit=!1}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.change_in_params=this.activeRoute.queryParams.flatMap((function(t){e.parameters=t;var n=Object.assign(e.searchObj,t);return e.designationService.getAll(n)})).subscribe((function(t){e.records=t,e.uploadFields=t.fields}));var t=this.designationService.checkPermissionExist(["export-designation","remove-designation","create-designation","modify-designation"]);this.showExport=t[0],this.showDelete=t[1],this.showAdd=t[2],this.showEdit=t[3],this.showMultiDelete=!0}},{key:"pageChange",value:function(e){this.router.navigate([],{relativeTo:this.activeRoute,queryParams:{page:e},queryParamsHandling:"merge"})}},{key:"delete",value:function(e){var t=this,n=new FormData;this.designationService.delete(n,e).subscribe((function(e){t.toasterService.success("Record Deleted!","Success!",{positionClass:"toast-top-right"}),t.search()}),(function(e){t.handleError(e)}))}},{key:"handleError",value:function(e){400===e.status?this.toasterService.error(e.error.message,"Error!",{positionClass:"toast-top-right"}):alert("Problems while deleting records!")}},{key:"export",value:function(){var e=this.designationService.getCurrentDate();this.designationService.exportData(this.searchObj,"Designation-"+e)}},{key:"search",value:function(){var e=this;this.searchObj=Object.assign(this.designation_name?{name:this.designation_name}:{},this.parameters),this.designationService.getAll(this.searchObj).subscribe((function(t){e.records=t}))}},{key:"checkAll",value:function(e){var t=this,n=e.target.checked;this.records.data.forEach((function(e,r){e.selected=n,t.selectID(e.id,n)}))}},{key:"selectID",value:function(e,t){("boolean"==typeof t?t:t.target.checked)?this.SelectedIDs.push(e):this.SelectedIDs.pop(e)}},{key:"invalidSelection",value:function(){alert("Please Select atleast one record!")}},{key:"deleteSelected",value:function(){var e=this;this.designationService.delete_all({id:this.SelectedIDs}).subscribe((function(t){e.toasterService.success(t.data+" Records Deleted Successfully!","Success!",{positionClass:"toast-top-right"}),e.search()}),(function(t){e.handleError(t)}))}},{key:"fileChange",value:function(e){this.uploadedFile=e}},{key:"upload",value:function(e){var t=this,n=new FormData;n.set("upload_file",e,e.name),this.designationService.upload(n).subscribe((function(e){return t.closePopup(e)}),(function(e){return t.controlError(e)}))}},{key:"controlError",value:function(e){if(400===e.status){for(var t=0,n=Object.keys(e.error.error);t<n.length;t++){var r=n[t];this.errors.push(e.error.error[r])}alert(e.error.error.upload_file)}}},{key:"closePopup",value:function(e){this.toasterService.success(e.data.count+" Records Uploaded Successfully!","Success!",{positionClass:"toast-top-right"}),this.search()}}]),e}()).\u0275fac=function(e){return new(e||E)(a["\u0275\u0275directiveInject"](i.a),a["\u0275\u0275directiveInject"](c.a),a["\u0275\u0275directiveInject"](i.c),a["\u0275\u0275directiveInject"](l.b))},E.\u0275cmp=a["\u0275\u0275defineComponent"]({type:E,selectors:[["app-designation"]],viewQuery:function(e,t){var n;1&e&&a["\u0275\u0275viewQuery"](p,!0),2&e&&a["\u0275\u0275queryRefresh"](n=a["\u0275\u0275loadQuery"]())&&(t.sf=n.first)},decls:41,vars:13,consts:[["id","simple-table"],[1,"row"],[1,"col-sm-12"],[1,"card","card-border-shadow-0"],[1,"card-header","m-top-bottom-10"],[1,"card-title","module-title"],[3,"showAdd","addRedirect","showExport","uploadFields","uploadFile","uploaded","download"],["title","Are you sure ?","text","This cannot be undone","icon","question",3,"showCancelButton","focusCancel"],["deleteSwal",""],[1,"card-body"],[1,"card-block"],["style","float:right;",4,"ngIf"],[1,"table-responsive"],[1,"table","table-bordered","table-condensed"],["width","8%",1,"text-center"],["type","checkbox","id","all",3,"change"],["for","all"],[2,"width","70px"],["type","text","placeholder","Search By Name",1,"form-control",3,"ngModel","keyup","ngModelChange"],[4,"ngIf","ngIfElse"],[4,"ngIf"],["loading",""],[2,"float","right"],[1,"tot-record"],[4,"ngFor","ngForOf"],[1,"text-center"],["type","checkbox","data-md-icheck","","name","deletecheck",3,"checked","id","value","click"],[3,"for"],["class","ng2-smart-action ng2-smart-action-edit-edit",3,"routerLink",4,"ngIf"],["class","ng2-smart-action ng2-smart-action-delete-delete",3,"swal","confirm",4,"ngIf"],["scope","row"],[1,"ng2-smart-action","ng2-smart-action-edit-edit",3,"routerLink"],[1,"ft-edit-2","info","font-medium-1","mr-2"],[1,"ng2-smart-action","ng2-smart-action-delete-delete",3,"swal","confirm"],[1,"ft-x","danger","font-medium-1","mr-2"],[1,"btn","btn-danger",2,"color","#fff !important",3,"swal","confirm"],[1,"btn","btn-danger",2,"color","#fff !important",3,"click"],[3,"maxSize","rotate","collectionSize","pageSize","page","pageChange"]],template:function(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"section",0),a["\u0275\u0275elementStart"](1,"div",1),a["\u0275\u0275elementStart"](2,"div",2),a["\u0275\u0275elementStart"](3,"div",3),a["\u0275\u0275elementStart"](4,"div",4),a["\u0275\u0275elementStart"](5,"h4",5),a["\u0275\u0275text"](6,"Designation"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](7,"app-actionbtns",6),a["\u0275\u0275listener"]("uploadFile",(function(e){return t.upload(e)}))("uploaded",(function(e){return t.fileChange(e)}))("download",(function(){return t.export()})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275element"](8,"swal",7,8),a["\u0275\u0275elementStart"](10,"div",9),a["\u0275\u0275elementStart"](11,"div",10),a["\u0275\u0275template"](12,m,3,1,"div",11),a["\u0275\u0275elementStart"](13,"div",12),a["\u0275\u0275elementStart"](14,"table",13),a["\u0275\u0275elementStart"](15,"thead"),a["\u0275\u0275elementStart"](16,"tr"),a["\u0275\u0275elementStart"](17,"th",14),a["\u0275\u0275elementStart"](18,"input",15),a["\u0275\u0275listener"]("change",(function(e){return t.checkAll(e)})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](19,"label",16),a["\u0275\u0275text"](20,"\xa0"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](21,"th"),a["\u0275\u0275text"](22,"Action"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](23,"th",17),a["\u0275\u0275text"](24,"Sr. No"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](25,"th"),a["\u0275\u0275text"](26,"Designation Name"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](27,"tbody"),a["\u0275\u0275elementStart"](28,"tr"),a["\u0275\u0275element"](29,"td"),a["\u0275\u0275element"](30,"td"),a["\u0275\u0275element"](31,"td"),a["\u0275\u0275elementStart"](32,"td"),a["\u0275\u0275elementStart"](33,"input",18),a["\u0275\u0275listener"]("keyup",(function(){return t.search()}))("ngModelChange",(function(e){return t.designation_name=e})),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275template"](34,x,3,2,"ng-container",19),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275template"](35,y,3,1,"div",20),a["\u0275\u0275template"](36,S,3,0,"div",20),a["\u0275\u0275element"](37,"br"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275template"](38,C,2,5,"div",20),a["\u0275\u0275elementEnd"](),a["\u0275\u0275template"](39,_,1,0,"ng-template",null,21,a["\u0275\u0275templateRefExtractor"]),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e){var n=a["\u0275\u0275reference"](40);a["\u0275\u0275advance"](7),a["\u0275\u0275property"]("showAdd",t.showAdd)("addRedirect","/designation/add")("showExport",t.showExport)("uploadFields",t.uploadFields),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("showCancelButton",!0)("focusCancel",!0),a["\u0275\u0275advance"](4),a["\u0275\u0275property"]("ngIf",t.records),a["\u0275\u0275advance"](21),a["\u0275\u0275property"]("ngModel",t.designation_name),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",t.records)("ngIfElse",n),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",t.SelectedIDs.length&&t.showMultiDelete),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",!t.SelectedIDs.length&&t.showMultiDelete),a["\u0275\u0275advance"](2),a["\u0275\u0275property"]("ngIf",t.records)}},directives:[s.a,d.a,r.n,u.b,u.q,u.t,r.m,i.f,d.b,o.l],styles:['.geo_checkboxes[_ngcontent-%COMP%]:before{content:"";-webkit-appearance:none;background-color:transparent;border:2px solid #0079bf;box-shadow:0 1px 2px rgba(0,0,0,.05),inset 0 -15px 10px -12px rgba(0,0,0,.05);padding:10px;display:inline-block;position:relative;vertical-align:middle;cursor:pointer;margin-right:5px}.geo_checkboxes[_ngcontent-%COMP%]:after{content:"";display:block;position:absolute;top:2px;left:9px;width:6px;height:14px;border:solid #0079bf;border-width:0 2px 2px 0;transform:rotate(45deg)}.acc-header-bg[_ngcontent-%COMP%]{padding:20px;display:block;border-bottom:1px solid #b7b3b3}#checkbox-1[_ngcontent-%COMP%]   .form-group[_ngcontent-%COMP%]{margin-top:10px!important}[type=checkbox][_ngcontent-%COMP%]:checked, [type=checkbox][_ngcontent-%COMP%]:not(:checked){position:absolute;left:-9999px}[type=checkbox][_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%], [type=checkbox][_ngcontent-%COMP%]:not(:checked) + label[_ngcontent-%COMP%]{position:relative;padding-left:2.85em;cursor:pointer;padding-top:.2em}[type=checkbox][_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:before, [type=checkbox][_ngcontent-%COMP%]:not(:checked) + label[_ngcontent-%COMP%]:before{content:"";position:absolute;left:0;top:0;width:2em;height:2em;border:2px solid #673ab7;background:#fff;border-radius:4px;box-shadow:inset 0 1px 3px rgba(0,0,0,.1)}[type=checkbox][_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:after, [type=checkbox][_ngcontent-%COMP%]:not(:checked) + label[_ngcontent-%COMP%]:after{content:"\\2713\\0020";position:absolute;top:.15em;left:.18em;font-size:2em;line-height:.8;color:#673ab7;transition:all .2s;font-family:Lucida Sans Unicode,Arial Unicode MS,Arial}[type=checkbox][_ngcontent-%COMP%]:not(:checked) + label[_ngcontent-%COMP%]:after{opacity:0;transform:scale(0)}[type=checkbox][_ngcontent-%COMP%]:checked + label[_ngcontent-%COMP%]:after{opacity:1;transform:scale(1)}[type=checkbox][_ngcontent-%COMP%]:disabled:checked + label[_ngcontent-%COMP%]:before, [type=checkbox][_ngcontent-%COMP%]:disabled:not(:checked) + label[_ngcontent-%COMP%]:before{box-shadow:none;border-color:#bbb;background-color:#ddd}[type=checkbox][_ngcontent-%COMP%]:disabled:checked + label[_ngcontent-%COMP%]:after{color:#999}[type=checkbox][_ngcontent-%COMP%]:disabled + label[_ngcontent-%COMP%]{color:#aaa}[type=checkbox][_ngcontent-%COMP%]:checked:focus + label[_ngcontent-%COMP%]:before, [type=checkbox][_ngcontent-%COMP%]:not(:checked):focus + label[_ngcontent-%COMP%]:before{border:2px solid #673ab7}label[_ngcontent-%COMP%]:hover:before{border:2px solid #673ab7!important}']}),E);n("UEVY");var k=n("TnO9");function I(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275text"](1," Designation Name is required! "),a["\u0275\u0275elementEnd"]())}function O(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275text"](1," Designation Name format is invalid! "),a["\u0275\u0275elementEnd"]())}function P(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275text"](1," Please Enter atleast 2 Characters! "),a["\u0275\u0275elementEnd"]())}function M(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"div"),a["\u0275\u0275text"](1," Desingation Name too long! "),a["\u0275\u0275elementEnd"]())}function F(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"div",29),a["\u0275\u0275template"](1,I,2,0,"div",30),a["\u0275\u0275template"](2,O,2,0,"div",30),a["\u0275\u0275template"](3,P,2,0,"div",30),a["\u0275\u0275template"](4,M,2,0,"div",30),a["\u0275\u0275elementEnd"]()),2&e){var n=a["\u0275\u0275nextContext"](2);a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",n.designationForm.get("name").errors.required),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",n.designationForm.get("name").errors.pattern),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",n.designationForm.get("name").errors.minlength),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",n.designationForm.get("name").errors.maxlength)}}function D(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"div",29),a["\u0275\u0275text"](1),a["\u0275\u0275elementEnd"]()),2&e){var n=a["\u0275\u0275nextContext"](2);a["\u0275\u0275advance"](1),a["\u0275\u0275textInterpolate1"](" ",n.error_messages.name," ")}}var j=function(){return["/designation"]};function R(e,t){if(1&e){var n=a["\u0275\u0275getCurrentView"]();a["\u0275\u0275elementContainerStart"](0),a["\u0275\u0275elementStart"](1,"form",8),a["\u0275\u0275listener"]("submit",(function(){return a["\u0275\u0275restoreView"](n),a["\u0275\u0275nextContext"]().onSubmit()})),a["\u0275\u0275elementStart"](2,"div",9),a["\u0275\u0275elementStart"](3,"h4",10),a["\u0275\u0275element"](4,"i",11),a["\u0275\u0275text"](5),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](6,"div",12),a["\u0275\u0275elementStart"](7,"div",13),a["\u0275\u0275elementStart"](8,"label",14),a["\u0275\u0275text"](9," Designation Name "),a["\u0275\u0275elementStart"](10,"span",15),a["\u0275\u0275text"](11,"*"),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](12,"div",16),a["\u0275\u0275element"](13,"input",17),a["\u0275\u0275template"](14,F,5,4,"div",18),a["\u0275\u0275template"](15,D,2,1,"div",18),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](16,"div",12),a["\u0275\u0275elementStart"](17,"div",13),a["\u0275\u0275elementStart"](18,"label",19),a["\u0275\u0275text"](19," Status "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](20,"div",16),a["\u0275\u0275elementStart"](21,"div",20),a["\u0275\u0275element"](22,"ui-switch",21),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](23,"div",22),a["\u0275\u0275element"](24,"div",23),a["\u0275\u0275elementStart"](25,"div",24),a["\u0275\u0275elementStart"](26,"a",25),a["\u0275\u0275element"](27,"i",26),a["\u0275\u0275text"](28," Cancel "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementStart"](29,"button",27),a["\u0275\u0275element"](30,"i",28),a["\u0275\u0275text"](31," Save "),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementContainerEnd"]()}if(2&e){var r=a["\u0275\u0275nextContext"]();a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("formGroup",r.designationForm),a["\u0275\u0275advance"](4),a["\u0275\u0275textInterpolate1"](" ",r.title," "),a["\u0275\u0275advance"](9),a["\u0275\u0275property"]("ngIf",r.submitted&&r.designationForm.get("name").errors),a["\u0275\u0275advance"](1),a["\u0275\u0275property"]("ngIf",r.error_messages.name),a["\u0275\u0275advance"](11),a["\u0275\u0275property"]("routerLink",a["\u0275\u0275pureFunction0"](5,j))}}function A(e,t){1&e&&(a["\u0275\u0275elementStart"](0,"p"),a["\u0275\u0275text"](1,"Loading Data..."),a["\u0275\u0275elementEnd"]())}var V,N,L,q=((V=function(){function e(t,n,r,o,i){_classCallCheck(this,e),this.activeRoute=t,this.designationService=n,this.router=r,this.toasterService=o,this.fb=i,this.buildForm=!1,this.change_in_params={},this.submitted=!1,this.error_messages=[],this.formData=new FormData}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.title=this.activeRoute.snapshot.data.title,this.buildForm=!1,this.change_in_params=this.activeRoute.params.flatMap((function(t){return t.id?(e.designation_id=t.id,e.designationService.getAll({id:t.id})):e.activeRoute.params})).subscribe((function(t){e.designationForm=t.data?e.create_form(t.data[0]):e.create_form(),e.buildForm=!0}))}},{key:"create_form",value:function(e){return this.fb.group({name:[e?e.name:"",[u.B.required,u.B.minLength(2),u.B.maxLength(50),u.B.pattern("^([a-zA-Z0-9 _-])+$")]],id:[e?e.id:""],is_active:[e?String(e.is_active):"true"]})}},{key:"formObj",value:function(){return this.designationForm.controls}},{key:"onSubmit",value:function(){this.submitted=!0,this.designationForm.invalid||(this.formData=this.designationService.convertToFormData(this.designationForm.value),this.designation_id?this.update():this.save())}},{key:"save",value:function(){var e=this;this.designationService.save(this.formData).subscribe((function(t){e.router.navigate(["/designation"]).then((function(){e.toasterService.success("Records Added Successfully!","Success!",{positionClass:"toast-top-right"})}))}),(function(t){e.handleError(t,e.designationForm)}))}},{key:"update",value:function(){var e=this;this.designationService.update(this.formData,this.designation_id).subscribe((function(t){e.router.navigate(["/designation"]).then((function(){e.toasterService.success("Records Updated Successfully!","Success!",{positionClass:"toast-top-right"})}))}),(function(t){e.handleError(t,e.designationForm)}))}},{key:"handleError",value:function(e,t){400===e.status?this.error_messages=e.error.error:alert("Problems while saving data")}}]),e}()).\u0275fac=function(e){return new(e||V)(a["\u0275\u0275directiveInject"](i.a),a["\u0275\u0275directiveInject"](c.a),a["\u0275\u0275directiveInject"](i.c),a["\u0275\u0275directiveInject"](l.b),a["\u0275\u0275directiveInject"](u.e))},V.\u0275cmp=a["\u0275\u0275defineComponent"]({type:V,selectors:[["app-form"]],decls:9,vars:2,consts:[["id","basic-form-layouts"],[1,"row","match-height"],[1,"col-md-12"],[1,"card"],[1,"card-body"],[1,"px-3"],[4,"ngIf","ngIfElse"],["norecord",""],["enctype","multipart/form-data",1,"form","form-horizontal","striped-rows",3,"formGroup","submit"],[1,"form-body"],[1,"form-section"],[1,"ft-user"],[1,"form-group"],[1,"row"],["for","name",1,"col-md-3","pt-1"],[2,"color","red"],[1,"col-md-9"],["type","text","formControlName","name","maxlength","50","id","name","autocomplete","off",1,"form-control"],["class","invalid-feedback",4,"ngIf"],[1,"col-md-3","pt-1"],[1,"input-group"],["defaultBgColor","#ff4d4d","labelOn","Active","labelOff","Inactive","formControlName","is_active"],[1,"form-actions","center"],[1,"col-md-3"],[1,"col-sm-9"],[1,"btn","btn-raised","btn-orange","mr-1",3,"routerLink"],[1,"ft-x"],["type","submit",1,"btn","btn-raised","btn-purple"],[1,"fa","fa-check-square-o"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(e,t){if(1&e&&(a["\u0275\u0275elementStart"](0,"section",0),a["\u0275\u0275elementStart"](1,"div",1),a["\u0275\u0275elementStart"](2,"div",2),a["\u0275\u0275elementStart"](3,"div",3),a["\u0275\u0275elementStart"](4,"div",4),a["\u0275\u0275elementStart"](5,"div",5),a["\u0275\u0275template"](6,R,32,6,"ng-container",6),a["\u0275\u0275template"](7,A,2,0,"ng-template",null,7,a["\u0275\u0275templateRefExtractor"]),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"](),a["\u0275\u0275elementEnd"]()),2&e){var n=a["\u0275\u0275reference"](8);a["\u0275\u0275advance"](6),a["\u0275\u0275property"]("ngIf",t.buildForm)("ngIfElse",n)}},directives:[r.n,u.D,u.r,u.j,u.b,u.q,u.h,u.m,k.a,i.f],styles:[""]}),V),z=[{path:"",component:w,data:{title:"Designation",permission:"list-designation"}},{path:"add",component:q,data:{title:"Add Designation",permission:"create-designation"}},{path:"edit/:id",component:q,data:{title:"Edit Designation",permission:"modify-designation"}}],T=((N=function e(){_classCallCheck(this,e)}).\u0275mod=a["\u0275\u0275defineNgModule"]({type:N}),N.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(e){return new(e||N)},imports:[[i.g.forChild(z)],i.g]}),N),B=n("PCNd"),U=((L=function e(){_classCallCheck(this,e)}).\u0275mod=a["\u0275\u0275defineNgModule"]({type:L}),L.\u0275inj=a["\u0275\u0275defineInjector"]({factory:function(e){return new(e||L)},providers:[c.a],imports:[[r.c,T,o.j,u.l,o.i,u.y,B.a,d.c.forRoot()]]}),L)},"82/m":function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var r=n("G5QB"),o=n("fXoL"),i=n("tk/3"),a=n("ZtWP"),c=n("hHWK"),l=function(){var e=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,r,o){var i;return _classCallCheck(this,n),(i=t.call(this,"section",e)).http=e,i.companyService=r,i.campaignService=o,i}return _createClass(n,[{key:"setSectionId",value:function(e){this.section_id=e}},{key:"getSectionId",value:function(){return this.section_id}},{key:"setCourseId",value:function(e){this.course_id=e}},{key:"getCourseId",value:function(){return this.course_id}},{key:"getCampaigns",value:function(e){return this.campaignService.getAll({company_id:e})}},{key:"getTypesFromCampaign",value:function(e){return this.http.get("".concat(this.apiUrl,"campaign/geography_from_campaign?campaign_id=")+e)}},{key:"getSectionData",value:function(e,t){return this.http.get("".concat(this.apiUrl,"section/section_dropdown_list?campaign_id=")+t+"&course_id="+e)}}]),n}(r.a);return e.\u0275fac=function(t){return new(t||e)(o["\u0275\u0275inject"](i.b),o["\u0275\u0275inject"](a.a),o["\u0275\u0275inject"](c.a))},e.\u0275prov=o["\u0275\u0275defineInjectable"]({token:e,factory:e.\u0275fac,providedIn:"root"}),e}()},UEVY:function(e,t,n){"use strict";var r=n("HDdC"),o=n("5+tZ");function i(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Number.POSITIVE_INFINITY;return Object(o.a)(e,t)(this)}r.a.prototype.mergeMap=i,r.a.prototype.flatMap=i},utbL:function(e,t,n){"use strict";n.d(t,"a",(function(){return h}));var r=n("fXoL"),o=n("tyNb"),i=n("hHWK"),a=n("82/m"),c=n("IAlr"),l=n("ofXK"),s=n("1kSV"),d=n("3Pt+"),u=["uploadForm"];function p(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"a",13),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](n),r["\u0275\u0275nextContext"]().add()})),r["\u0275\u0275element"](1,"i",14),r["\u0275\u0275elementEnd"]()}}function m(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"a",13),r["\u0275\u0275listener"]("click",(function(){return r["\u0275\u0275restoreView"](n),r["\u0275\u0275nextContext"]().initiateExport()})),r["\u0275\u0275element"](1,"i",15),r["\u0275\u0275elementEnd"]()}}function f(e,t){if(1&e){var n=r["\u0275\u0275getCurrentView"]();r["\u0275\u0275elementStart"](0,"button",16),r["\u0275\u0275listener"]("click",(function(){r["\u0275\u0275restoreView"](n);var e=r["\u0275\u0275nextContext"]();return e.isCollapsed=!e.isCollapsed})),r["\u0275\u0275element"](1,"i",17),r["\u0275\u0275elementEnd"]()}if(2&e){var o=r["\u0275\u0275nextContext"]();r["\u0275\u0275attribute"]("aria-expanded",!o.isCollapsed)}}var h=function(){var e=function(){function e(t,n,o,i){_classCallCheck(this,e),this.router=t,this.cs=n,this.ss=o,this.courseService=i,this.download=new r.EventEmitter,this.uploaded=new r.EventEmitter,this.uploadFile=new r.EventEmitter,this.files=[],this.isCollapsed=!0,this.section_id="",this.course_id=""}return _createClass(e,[{key:"ngOnInit",value:function(){this.campainId=this.cs.getCampaignId(),this.section_id=this.ss.getSectionId(),this.course_id=this.courseService.getCourseId()}},{key:"add",value:function(){this.router.navigate([this.addRedirect],{queryParams:{section_id:this.section_id,campaign_id:this.campainId,course_id:this.course_id}})}},{key:"initiateExport",value:function(){this.download.emit("export_data")}},{key:"upload",value:function(){this.uploadFile.emit(this.files),this.isCollapsed=!0}},{key:"onChange",value:function(e){var t=e.srcElement.files;this.uploaded.emit(t[0]),this.files=t[0]}}]),e}();return e.\u0275fac=function(t){return new(t||e)(r["\u0275\u0275directiveInject"](o.c),r["\u0275\u0275directiveInject"](i.a),r["\u0275\u0275directiveInject"](a.a),r["\u0275\u0275directiveInject"](c.a))},e.\u0275cmp=r["\u0275\u0275defineComponent"]({type:e,selectors:[["app-actionbtns"]],viewQuery:function(e,t){var n;1&e&&r["\u0275\u0275viewQuery"](u,!0),2&e&&r["\u0275\u0275queryRefresh"](n=r["\u0275\u0275loadQuery"]())&&(t.userFrm=n.first)},inputs:{addRedirect:"addRedirect",showAdd:"showAdd",showExport:"showExport",showImport:"showImport",uploadFields:"uploadFields",uploadAction:"uploadAction"},outputs:{download:"download",uploaded:"uploaded",uploadFile:"uploadFile"},decls:20,vars:5,consts:[[2,"float","right","margin-bottom","10px"],["class","btn btn-raised btn-purple m-1",3,"click",4,"ngIf"],["type","button","class","btn btn-raised btn-purple m-1","aria-controls","collapseExample",3,"click",4,"ngIf"],["id","collapseExample",3,"ngbCollapse"],[2,"margin-top","60px","margin-bottom","5px",3,"ngSubmit"],["uploadForm","ngForm"],["id","upcsv",1,"form-group","fupload-main-contianer"],[1,"fupload"],["type","file","name","upload","id","upload",1,"",3,"change"],[1,"fbtn-upload"],["type","submit",1,"btn","btn-raised","btn-purple"],[2,"clear","both"],[1,"text-danger","text-csv"],[1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-plus-circle","white","warning","font-medium-1",2,"color","#fff !important"],[1,"ft-download","white","warning","font-medium-1",2,"color","#fff !important"],["type","button","aria-controls","collapseExample",1,"btn","btn-raised","btn-purple","m-1",3,"click"],[1,"ft-upload","white","warning","font-medium-1",2,"color","#fff !important"]],template:function(e,t){1&e&&(r["\u0275\u0275elementStart"](0,"div",0),r["\u0275\u0275template"](1,p,2,0,"a",1),r["\u0275\u0275template"](2,m,2,0,"a",1),r["\u0275\u0275template"](3,f,2,1,"button",2),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](4,"div",3),r["\u0275\u0275elementStart"](5,"form",4,5),r["\u0275\u0275listener"]("ngSubmit",(function(){return t.upload()})),r["\u0275\u0275elementStart"](7,"div",6),r["\u0275\u0275elementStart"](8,"b"),r["\u0275\u0275text"](9,"Upload CSV"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](10,"br"),r["\u0275\u0275elementStart"](11,"div",7),r["\u0275\u0275elementStart"](12,"input",8),r["\u0275\u0275listener"]("change",(function(e){return t.onChange(e)})),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](13,"br"),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](14,"div",9),r["\u0275\u0275elementStart"](15,"button",10),r["\u0275\u0275text"](16," Upload "),r["\u0275\u0275elementEnd"](),r["\u0275\u0275element"](17,"div",11),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementStart"](18,"span",12),r["\u0275\u0275text"](19),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"](),r["\u0275\u0275elementEnd"]()),2&e&&(r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showAdd),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showExport),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngIf",!1!==t.showImport),r["\u0275\u0275advance"](1),r["\u0275\u0275property"]("ngbCollapse",t.isCollapsed),r["\u0275\u0275advance"](15),r["\u0275\u0275textInterpolate1"]("Csv Format (",t.uploadFields,")"))},directives:[l.n,s.b,d.D,d.r,d.s],styles:[".fupload-main-contianer[_ngcontent-%COMP%]{width:50%;border:2px dotted #ffc107;padding:18px;border-radius:5px;background-color:#fffcf7}.fupload[_ngcontent-%COMP%]{padding-top:5px}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:50%;float:left}.text-csv[_ngcontent-%COMP%]{font-size:13px}@media only screen and (max-width:600px){.fupload-main-contianer[_ngcontent-%COMP%]{width:100%!important}.fbtn-upload[_ngcontent-%COMP%], .fupload[_ngcontent-%COMP%]{width:100%}}@media only screen and (max-width:1024px){.fupload-main-contianer[_ngcontent-%COMP%]{width:80%!important}}"]}),e}()}}]);