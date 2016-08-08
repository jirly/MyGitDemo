define(["app"], function(app) {
    app.controller("homeCtrl", function($scope, breadcrumbs) { // 主模块
        $scope.breadcrumbs = breadcrumbs;
        $scope.testText = "~Hey, Home!!!";
    });
});
