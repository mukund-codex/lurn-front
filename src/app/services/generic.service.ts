import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { share, shareReplay } from 'rxjs/operators';

export abstract class GenericService {
	apiUrl: string = environment.apiUrl;

	constructor(private controller: string, protected httpClient: HttpClient) {}

	isEmpty(obj) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	api() {
		return this.apiUrl;
	}

	formatQueryString(params) {
		let queryString = '';

		if (!this.isEmpty(params)) {
			queryString += '?';
			for (const key in params) {
				if (params.hasOwnProperty(key)) {
					queryString += key + '=' + params[key] + '&';
				}
			}
			queryString = queryString.slice(0, queryString.length - 1);
		}

		return queryString;
	}

	convertToFormData(request) {
		const data = new FormData();

		Object.keys(request).forEach(key => {
			if (Array.isArray(request[key])) {
				request[key].forEach((Obj, k) => {
					if (typeof Obj === 'object' && Obj !== null) {
						for (const obk in Obj) {
							if (Obj.hasOwnProperty(obk) && Obj[obk]) {
								data.set(key + '[' + obk + ']', Obj[obk]);
							}
						}
					} else {
						data.set(key + '[' + k + ']', Obj);
					}
				});
			} else if (typeof request[key] === 'object' && request[key] !== null) {
				if (request[key].day && request[key].month && request[key].year) {
					data.set(key, request[key].year + '-' + this.pad(request[key].month) + '-' + this.pad(request[key].day));
				} else {
					data.set(key, request[key]);
				}
			} else {
				data.set(key, request[key]);
			}
		});

		return data;
	}

	pad(str) {
		return ('00' + str).slice(-2);
	}

	getAll(params?, controller = null) {
		const queryString = this.formatQueryString(params);
		if(controller) {
			return this.httpClient.get(this.apiUrl + controller + `${queryString}`).pipe(share());
		} else {
			return this.httpClient.get(this.apiUrl + this.controller + `${queryString}`).pipe(share());
		}
	}

	upload(uploadData) {
		return this.httpClient.post(this.apiUrl + this.controller + `/import`, uploadData);
	}

	show(id: string) {
		return this.httpClient.get(this.apiUrl + this.controller + `?id=${id}`);
	}

	allRecords(params: {} = {}) {
		const queryString = this.formatQueryString(params);
		return this.httpClient.get(this.apiUrl + this.controller + `/export${queryString}`);
	}

	exportData(params, fileName, controllerName = "", methodName = "") {

		const controller = controllerName ? controllerName : this.controller;
		const method = methodName ? methodName : 'download';
		const queryString = this.formatQueryString(params);

		this.httpClient.get(
			this.apiUrl + controller + `/${method}${queryString}`,
			{ responseType: 'arraybuffer' }
		).subscribe(response => {
			this.downloadFile(response, "application/vnd.ms-excel", fileName);
		});
	}

	downloadFile(data: any, type: string, fileName) {
		let blob = new Blob([data], { type: type });
		let url = window.URL.createObjectURL(blob);

		const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	save(resource) {
		return this.httpClient.post(this.apiUrl + this.controller + `/create`, resource);
	}

	update(resource, id) {
		resource.set('_method', 'PUT');
		return this.httpClient.post(this.apiUrl + this.controller + `/update/` + id, resource);
	}

	delete(resource, id) {
		resource.append('_method', 'DELETE');
		return this.httpClient.post(this.apiUrl + this.controller + `/delete/` + id, resource);
	}

	delete_all(resource) {
		return this.httpClient.post(this.apiUrl + this.controller + `/delete_all`, resource);
	}

	export(params: {}) {
		return this.allRecords(params);
	}

	rgbToHex(red, green, blue) {
		const rgb = blue | (green << 8) | (red << 16);
		return '#' + (0x1000000 + rgb).toString(16).slice(1);
	}

	hexToRgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			}
			: null;
	}

	checkPermissionExist(permission: any[] = []) {
		const permissionSet: any = JSON.parse(localStorage.getItem('userPermissions'));
		let obj = [];
		permission.forEach(element => {
			let temp = permissionSet.find(e => e.name === element);
			temp ? obj.push(true) : obj.push(false);
		});
		return obj;
	}

	getDateTimeFromTimeZone(timezone) {
		let date_time:any = timezone.toLocaleString("en-US", {timeZone: "Asia/Shanghai"});
		date_time = new Date(date_time);
		return date_time.toLocaleString();
	}

	getCurrentDate() {
		return new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear();
	}
}
