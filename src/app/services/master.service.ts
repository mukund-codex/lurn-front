import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { CblocksService } from './cblocks.service';
import { DimensionService } from './dimension.service';

@Injectable({
	providedIn: 'root'
})
export class MasterService extends GenericService {
	constructor(public http: HttpClient, private cblocksService: CblocksService, private dimensionService: DimensionService) {
		super('masterfile', http);
	}

	getModules() {
		return this.cblocksService.allRecords();
	}

	getDimensions() {
		return this.dimensionService.allRecords();
	}

	getAllFontStyles() {
		return this.httpClient.get('https://poster-service.techizertech.in/api/v1/poster/getFontFace');
	}
}
