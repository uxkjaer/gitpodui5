sap.ui.define([
  "sap/ui/test/opaQunit",
  "au/com/agilux/gitpodUi5/test/integration/pages/MainView"
], function (opaTest) {
  "use strict";

  opaTest("should show correct number of nested pages", function (Given, When, Then) {

    // Arrangements
    Given.iStartMyApp();

    // Assertions
    Then.onTheAppPage.iShouldSeePageCount(1);

    // Cleanup
    Then.iTeardownMyApp();
  });

});
