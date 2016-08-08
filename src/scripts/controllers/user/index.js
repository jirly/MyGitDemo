define(["app"], function(app) {
    var injectParams = ['$scope', 'NgTableParams', 'repoService', 'utilService'];
    var userIndexCtrl = function($scope, NgTableParams, repo, util) {
        var userConf = {
            url: 'user', //基本URL，必填
            showName: '用户' //提示的名称，一般为模块名，必填
        };

        $scope.userParams = {
            name: ""
        };

        $scope.usersTable = new NgTableParams({
            page: 1,
            count: 10
        }, {
            total: 0,
            getData: function(params) {
                return repo.query(userConf, util.buildQueryParam(params, $scope.userParams)).then(function(data) {
                    params.total(data.total);
                    return data.data;
                });
            }
        });

        $scope.searchUsers = function() {
            $scope.usersTable.reload();
        };

        $scope.showUser = function(action, user) {
            util.htmlModal($scope, action == 0 ? "新增用户" : "修改用户", "modal/userForm.tpl.html", function(modal) {
                var mScope = modal.$scope;
                if (action == 0) { //新增
                    mScope.user = {
                        id: 0,
                        name: "",
                        mobile: ""
                    };
                } else { //修改
                    mScope.user = angular.copy(user);
                }

                mScope.diagCls = "modal-md";
                mScope.okBtn = {
                    text: "保存",
                    click: function() {
                        if (action == 0) { //保存新增
                            repo.add(userConf, mScope.user).then(function(json) {
                                if (json.status == 0) {
                                    $scope.usersTable.reload();
                                    util.hideModal(modal);
                                }
                            });
                        } else { //保存修改
                            repo.update(userConf, mScope.user).then(function(json) {
                                if (json.status == 0) {
                                    $scope.usersTable.reload();
                                    util.hideModal(modal);
                                }
                            });
                        }
                    }
                };
            });
        };

        $scope.deleteUser = function(user) { //删除用户
            repo.removeOne(userConf, user.id, user.name).then(function(data) {
                $scope.usersTable.reload();
            });
        };
    };

    userIndexCtrl.$inject = injectParams;
    app.register.controller('userIndexCtrl', userIndexCtrl);
});
