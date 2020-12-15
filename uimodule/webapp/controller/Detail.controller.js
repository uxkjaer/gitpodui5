sap.ui.define([
  "au/com/agilux/gitpodUi5/controller/BaseController",
  "sap/ui/core/Fragment",
  "sap/m/MessageBox"
], function(Controller, Fragment, MessageBox) {
  "use strict";

  return Controller.extend("au.com.agilux.gitpodUi5.controller.Detail", {

    onInit: function(){
      this.getRouter().getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
    },

    calcPrice: function(){
var oView = this.getView();

			// create dialog lazily
			if (!this.pDialog) {
				this.pDialog = Fragment.load({
					id: oView.getId(),
          name: "au.com.agilux.gitpodUi5.view.calcPrice",
          controller: this
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					return oDialog;
				});
			}

			this.pDialog.then(function(oDialog) {
				oDialog.open();
			});
    },

     onBtnAccept: function(oEvent){
       let product = this.byId("product"),
          quantity = this.byId("quantity"),
          oParam = {
            product: product.getValue(),
            quantity: parseInt(quantity.getValue())
          };
          oEvent.getSource().getParent().close();
          this.getModel().callFunction("/calcPrice", {
            method: "POST",
            urlParameters: oParam,
            success: function(oData){
              MessageBox.information(`Price is ${oData.amount}`)
            },
            error: function(oError){
              MessageBox.error("Something went wrong")
            }
          });
    },

    onBtnCancel: function(){
      this.pDialog.close();
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
