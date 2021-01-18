export class CustomizeObject {
	
	static campaign_id: string;

	static removeNullKeys(Obj) {
		return Object.keys(Obj).reduce((acc, key) => {
			const _acc = acc;
			if (Obj[key] !== undefined) {
				_acc[key] = Obj[key];
			}

			return _acc;
		}, {});
	}

	static merge(...Obj) {
		let mergedObj = {};

		Obj.forEach(element => {
			mergedObj = Object.assign(mergedObj, element);
		});

		return mergedObj;
	}

	static setValueCampaign(campaign_id) {
		CustomizeObject.campaign_id = campaign_id;
	}

	getValueCampaign() {
		return CustomizeObject.campaign_id;
	}

	static dropDownSettings(selection?: boolean, close?: boolean, value?: string, text?: string) {

		return {
			singleSelection: selection ? selection : false,
			idField: value ? value : 'id',
			textField: text ? text : 'name',
			selectAllText: 'Select All',
			unSelectAllText: 'UnSelect All',
			itemsShowLimit: 3,
			allowSearchFilter: true,
			closeDropDownOnSelection: close ? close : true
		};
	}
}
