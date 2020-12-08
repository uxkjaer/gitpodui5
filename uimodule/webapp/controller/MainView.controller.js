sap.ui.define([
  "au/com/agilux/gitpodUi5/controller/BaseController"
], function(Controller) {
  "use strict";

  return Controller.extend("au.com.agilux.gitpodUi5.controller.MainView", {

    onInit: function(){
      console.log("hello world");
    }
  });
});
