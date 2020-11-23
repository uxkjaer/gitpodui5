sap.ui.define([
  "sap/ui/test/Opa5"
], function(Opa5) {
  "use strict";

  return Opa5.extend("au.com.agilux.gitpodUi5.test.integration.arrangements.Startup", {

    iStartMyApp: function () {
      this.iStartMyUIComponent({
        componentConfig: {
          name: "au.com.agilux.gitpodUi5",
          async: true,
          manifest: true
        }
      });
    }

  });
});
