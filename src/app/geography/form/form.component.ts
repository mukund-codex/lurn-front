import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Router, ActivatedRoute, Params } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

import { ToastrService } from "ngx-toastr";
import { GeographyService } from "../../services/geography.service";

import { combineLatest } from "rxjs";
import { concatMap, startWith } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs";
import "rxjs/add/observable/of";
import { CustomizeObject } from "../../shared/classes/cutomizeObject";
import { CampaignService } from "src/app/services/campaign.service";

@Component({
    selector: "app-form",
    templateUrl: "./form.component.html",
    styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
    title: string;
    urlKey: string;
    disabled: boolean;

    campaign_id = "";
    geography_id = "";
    geographyForm: FormGroup;
    buildForm: boolean;
    dropdownSettings: {};
    submitted = false;

    companyData: any = [];
    campaignData: any = [];
    typesData: any = [];
    nationalZonesData: any = [];
    zonesData: any = [];
    regionsData: any = [];
    areaData: any = [];
    cityData: any = [];
    errors: any = [];
    error_messages: any = [];

    showField = {
        "National Zone": false,
        Zone: false,
        Region: false,
        Area: false,
        City: false,
    };

    fields = [
        { keyname: "national_zone", text: "National Zone" },
        { keyname: "zone", text: "Zone" },
        { keyname: "region", text: "Region" },
        { keyname: "area", text: "Area" },
        { keyname: "city", text: "City" },
    ];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private geoService: GeographyService,
        public toasterService: ToastrService,
        private cs: CampaignService
    ) {}

    getCurrentCampaign() {
        return this.cs.getCampaignId();
    }

    ngOnInit() {
        this.campaign_id = this.getCurrentCampaign();
        const page = this.activeRoute.snapshot.data;
        this.title = page["title"];
        this.urlKey = page["urlKey"];
        this.disabled = page["urlKey"] === "edit" ? false : false;
        this.dropdownSettings = CustomizeObject.dropDownSettings(true, true);

        this.geographyForm = this.create_form();
        this.typesData = this.geoService.getTypesFromCampaign(this.campaign_id);

        if (this.urlKey === "add") {
        } else {
            this.activeRoute.params
                .pipe(
                    concatMap((params: Params) =>
                        this.geoService.getAll({ id: params.id })
                    )
                )
                .subscribe((result: any) => {
                    if (result.data && result.data[0]) {
                        this.geography_id = result.data[0].id;

                        this.geographyForm.patchValue(
                            this.rewriteGeography(result.data[0])
                        );

                        // this.buildForm = true;
                    } else {
                        this.buildForm = false;
                    }
                });
        }

        combineLatest(
            this.geographyForm.controls.type.valueChanges.pipe(
                startWith(this.geographyForm.controls.type.value),
                concatMap((type: any) => {
                    this.resetHeirarchyFor("All");
                    if (type) {
                        return type;
                    }
                    return of({ name: "" });
                })
            )
        ).subscribe((result: any) => {
            this.geoService
                .getTypesFromCampaign(this.campaign_id)
                .subscribe((resultData) => {
                    this.typesData = resultData["data"];
                    this.requiredFields(result[0]);

                    if (this.typesData.length) {
                        this.initializeFields(this.typesData);
                    }
                    this.buildForm = true;
                });
        });
    }

    rewriteGeography(data) {
        const newObj = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (["id", "name"].indexOf(key) >= 0) {
                    newObj[key] = data[key];
                } else {
                    newObj[key] = [data[key]];
                }
            }
        }

        return newObj;
    }

    resetHeirarchyFor(controlName: string) {
        if (controlName === "All") {
            this.geographyForm.controls.national_zone.patchValue([]);
            this.nationalZonesData = [];
        }

        if (controlName === "National Zone" || controlName === "All") {
            this.geographyForm.controls.zone.patchValue([]);
            this.zonesData = [];
        }

        if (
            controlName === "National Zone" ||
            controlName === "Zone" ||
            controlName === "All"
        ) {
            this.geographyForm.controls.region.patchValue([]);
            this.regionsData = [];
        }

        if (
            controlName === "National Zone" ||
            controlName === "Zone" ||
            controlName === "Region" ||
            controlName === "All"
        ) {
            this.geographyForm.controls.area.patchValue([]);
            this.areaData = [];
        }

        if (
            controlName === "National Zone" ||
            controlName === "Zone" ||
            controlName === "Region" ||
            controlName === "Area" ||
            controlName === "All"
        ) {
            this.geographyForm.controls.city.patchValue([]);
            this.cityData = [];
        }
    }

    resetFieldsAndVAlidity() {
        // reset all geography fields [NZ, Z, R, A, C]
        for (const key in this.showField) {
            if (this.showField.hasOwnProperty(key)) {
                this.showField[key] = false;

                const formFieldNode = this.fields.find((o) => o.text === key);
                this.geographyForm.controls[
                    formFieldNode.keyname
                ].setValidators(null);

                this.geographyForm.controls[
                    formFieldNode.keyname
                ].updateValueAndValidity();
            }
        }
    }

    requiredFields(geographyField: { id?: string; name?: string }) {
        if (geographyField.name) {
            const selectedTypeIndex = this.typesData.findIndex(
                (obj) => obj.name === geographyField.name
            );

            this.resetFieldsAndVAlidity();

            if (selectedTypeIndex > -1) {
                for (let i = 0; i < selectedTypeIndex; i++) {
                    const key = this.typesData[i].name;
                    this.showField[key] = true;

                    const formFieldNode = this.fields.find(
                        (o) => o.text === key
                    );
                    this.geographyForm.controls[
                        formFieldNode.keyname
                    ].setValidators([Validators.required]);

                    this.geographyForm.controls[
                        formFieldNode.keyname
                    ].updateValueAndValidity();
                }
            }
        }
    }

    create_form(): FormGroup {
        const form: FormGroup = this.fb.group({
            type: [null, [Validators.required]],
            national_zone: [null, [Validators.required]],
            zone: [null, [Validators.required]],
            region: [null, [Validators.required]],
            area: [null, [Validators.required]],
            city: [null, [Validators.required]],
            name: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                    Validators.pattern("^([a-zA-Z0-9- ])+$"),
                ],
            ],
        });

        return form;
    }

    listing(type, parent = null, campaign = null) {
        if (campaign) {
            return this.geoService.getGeography(type, parent, campaign);
        } else {
            return this.geoService.getGeography(type, parent);
        }
    }

    loadingFieldData(data, records, flag = 0) {
        if (data.name === "National Zone") {
            this.nationalZonesData = records.data;
        }
        if (data.name === "Zone") {
            this.zonesData = records.data;
            if (flag === 1) {
                this.areaData = [];
                this.geographyForm.get("area").setValue([]);
                this.geographyForm.get("zone").setValue([]);
                this.regionsData = [];
                this.geographyForm.get("region").setValue([]);
            }
        }
        if (data.name === "Region") {
            this.regionsData = records.data;

            if (flag === 1) {
                this.geographyForm.get("region").setValue([]);
                this.areaData = [];
                this.geographyForm.get("area").setValue([]);
            }
        }
        if (data.name === "Area") {
            this.areaData = records.data;
            if (flag === 1) {
                this.geographyForm.get("area").setValue([]);
            }
        }
        if (data.name === "City") {
            this.cityData = records.data;
        }
    }

    getParent(fieldType: string) {
        if (fieldType === "National Zone") {
            return this.geographyForm.controls.national_zone.value;
        } else if (fieldType === "Zone") {
            return this.geographyForm.controls.zone.value;
        } else if (fieldType === "Region") {
            return this.geographyForm.controls.region.value;
        } else if (fieldType === "Area") {
            return this.geographyForm.controls.area.value;
        } else if (fieldType === "City") {
            return this.geographyForm.controls.city.value;
        } else {
            return null;
        }
    }

    initializeFields(fields) {
        const fieldCount = fields.length;
        let parent_id = null;

        for (let i = 0; i < fieldCount; i++) {
            if (i > 0) {
                const parentNode = this.getParent(fields[i - 1].name);
                if (parentNode.length) {
                    if (parentNode[0]) {
                        parent_id = parentNode[0].id;
                    }
                }
            }

            this.listing(fields[i].id, parent_id, this.campaign_id).subscribe(
                (records: any) => {
                    this.loadingFieldData(fields[i], records);
                }
            );
        }
    }

    updateValue(event, elem) {
        const currIndex = this.typesData.findIndex((obj) => obj.name === elem);

        if (currIndex >= 0) {
            const nextData = this.typesData[currIndex + 1];

            this.listing(nextData.id, event.id, this.campaign_id).subscribe(
                (records: any) => {
                    this.loadingFieldData(nextData, records, 1);
                }
            );
        }
    }

    removeValue(event, elem) {
        this.resetHeirarchyFor(elem);
    }

    onSubmit() {
        this.submitted = true;
        if (this.geographyForm.invalid) {
            return;
        }

        const data = this.geographyForm.value;
        const formData = new FormData();

        this.geoService
            .getCampaignDataById(this.campaign_id)
            .subscribe((result) => {
                formData.set("campaign_id", this.campaign_id);
                formData.set("company_id", result["data"][0].company.id);
                formData.set("type", data.type[0].id);
                formData.set("name", data.name);

                const typeIndex = this.typesData.findIndex(
                    (obj) => obj.name === data.type[0].name
                );

                if (typeIndex > 0) {
                    const parentType = this.typesData[typeIndex - 1];
                    const parentObj = this.getParent(parentType.name);

                    formData.set("parent_id", parentObj[0].id);
                }

                if (this.urlKey === "add") {
                    this.save(formData);
                } else {
                    this.update(formData);
                }
            });
    }

    private save(formData) {
        this.geoService.save(formData).subscribe(
            (response: any) => {
                this.router
                    .navigate(["/geography"], {
                        queryParams: { campaign_id: this.campaign_id },
                    })
                    .then(() => {
                        this.toasterService.success(
                            "Records Added Successfully!",
                            "Success!",
                            { positionClass: "toast-top-right" }
                        );
                    });
            },
            (err: HttpErrorResponse) => {
                this.handleError(err, this.geographyForm);
            }
        );
    }

    private update(formData) {
        this.geoService.update(formData, this.geography_id).subscribe(
            (response: any) => {
                this.router
                    .navigate(["/geography"], {
                        queryParams: { campaign_id: this.campaign_id },
                    })
                    .then(() => {
                        this.toasterService.success(
                            "Records Updated Successfully!",
                            "Success!",
                            { positionClass: "toast-top-right" }
                        );
                    });
            },
            (err: HttpErrorResponse) => {
                this.handleError(err, this.geographyForm);
            }
        );
    }

    handleError(err: HttpErrorResponse, form: FormGroup) {
        if (err.status === 400) {
            this.error_messages = err.error.error;
        } else {
            alert("Problems while saving data");
        }
    }

    get geography() {
        return this.geographyForm;
    }

    elementTouched(element) {
        element.markAsTouched();
    }

    changeCampaign(campaign) {
        this.cs.setCampaignId(campaign.id);
    }
}
