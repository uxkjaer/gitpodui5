sap.ui.define([
  "au/com/agilux/gitpodUi5/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("au.com.agilux.gitpodUi5.controller.Detail", {

    onInit: function(){
      this.getRouter().getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    },

    onObjectMatched: function(oEvent){
      var sObjectPath = this.getModel().createKey("Orders", {
							OrderID: oEvent.getParameter("arguments").orderId
						})
						;
        this._bindView("/" + sObjectPath, {
              expand: 'Order_Details,Customer'
            });
    },

    _bindView: function (sObjectPath, oParam) {
			var oDataModel = this.getView().getModel(),
				that = this;
			this.getView().bindElement({
				path: sObjectPath,
				parameters: oParam,

				events: {
					change: this._onBindingChange.bind(this),
					/**
					 * Callback for the event for data requested
					 * @returns {void}
					 */
					dataRequested: function () {
						oDataModel.metadataLoaded().then(function () {
							// Busy indicator on view should only be set if metadata is loaded,
							// otherwise there may be two busy indications next to each other on the
							// screen. This happens because route matched handler already calls '_bindView'
							// while metadata is loaded.
						});
					},
					/**
					 * Callback function for event when data is returned
					 * @param {object} oData Json object with the items from the pan
					 * @returns {void}
					 */
					dataReceived: function (oData) {

					}.bind(this)
				}
			});
		},
		/**
		 * Adds the binding to the view
		 * @private
		 * @returns {void}
		 */
		_onBindingChange: function () {
			var oView = this.getView(),
				//oViewModel =  this.getView().getModel("objectView"),
				oElementBinding = oView.getElementBinding();
			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			} else {
				var oModel = this.getView().getModel();
				oModel.attachPropertyChange(function (oEvent) {
					this.setViewDirty(oModel.hasPendingChanges());
				}.bind(this));
			}
		}
  });
});
