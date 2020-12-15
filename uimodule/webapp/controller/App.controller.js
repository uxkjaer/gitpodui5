sap.ui.define([
	"au/com/agilux/gitpodUi5/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("au.com.agilux.gitpodUi5.controller.App", {

		onInit: function () {
			var oViewModel,
				fnSetAppNotBusy,
				iOriginalBusyDelay = this.getView().getBusyIndicatorDelay();

			oViewModel = new JSONModel({
				busy: true,
				delay: 0
			});
			this.setModel(oViewModel, "appView");

			fnSetAppNotBusy = function () {
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/delay", iOriginalBusyDelay);
			};

			// disable busy indication when the metadata is loaded and in case of errors
			this.getOwnerComponent().getModel().metadataLoaded().
			then(fnSetAppNotBusy);
			this.getOwnerComponent().getModel().attachMetadataFailed(fnSetAppNotBusy);

			// apply content density mode to root view
			// this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			// //If we already have a GUID, then we need to go to the details app
			// if (this.getModel("passingparameter") && this.getModel("passingparameter").getProperty("/GUID")) {
			// 	this.getRouter().navTo("display", {
			// 		objectId: this.getModel("passingparameter").getProperty("/GUID")
			// 	});
			// }
		}
	});

});
