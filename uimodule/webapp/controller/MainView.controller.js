sap.ui.define([
  "au/com/agilux/gitpodUi5/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("au.com.agilux.gitpodUi5.controller.MainView", {

    onInit: function(){
      console.log("hello world");
    },

    onListItemPress: function(oEvent){
      this.getRouter().navTo("detail", {
              orderId: oEvent.getParameter("listItem").getBindingContext().getProperty("OrderID"),
            });
    }
  });
});
