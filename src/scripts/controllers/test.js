define(["app"], function(app) {
    var injectParams = ['$scope', '$modal'];
    var testCtrl = function($scope, $modal) {
        $scope.testText = "~Hey, Test!!!";
        console.log($modal);
    };

    testCtrl.$inject = injectParams;
    app.register.controller('testCtrl', testCtrl);
});
