define(["app"], function(app) {
    var utilService = function($rootScope, $modal, $location, $q) {

        var confirmScope = $rootScope.$new();

        var selectedIds = function(items, idKey) {
            var rets = [];
            var hasKey = angular.isDefined(idKey);
            if (angular.isDefined(items)) {
                angular.forEach(items, function(o) {
                    if (o.$selected == true) {
                        if (hasKey) {
                            rets.push(o[idKey]);
                        } else {
                            rets.push(o);
                        }
                    }
                });
            }
            return rets;
        };

        var buildQueryParam = function(tblParam, otherParam) {
            return {
                count: tblParam.count(),
                page: tblParam.page(),
                sorts: tblParam.sorting(),
                params: otherParam
            }
        };

        var handleMulti = function(obj) {
            console.log(obj);
            for (e in obj) {
                var attr = obj[e];
                if (attr.ref && attr.checks) { // handle ref-1-n
                    for (c in attr.checks) {
                        if (attr.checks[c]) {
                            attr[c] = attr.ref[c]
                        }
                    }
                    delete attr.ref;
                    delete attr.checks;
                }
            }
            console.log(obj);
            return obj;
        };


        var hideModal = function(modal) {
            if (modal == undefined) {
                if ($(".modal").length > 0) {
                    $(".modal").remove();
                    $(".modal-backdrop").remove();
                    $("body").removeClass("modal-open modal-with-am-fade");
                }
            } else {
                modal.$promise.then(modal.hide);
            }
        };

        var commonModal = function(parentScope, title, contentUrl, init) {
            var modal = $modal({
                scope: parentScope,
                title: title,
                templateUrl: "modal/common.tpl.html",
                contentTemplate: "view/" + contentUrl,
                show: false,
                backdrop: "static"
            });
            modal.$promise.then(function() {
                init(modal);
                modal.show();
            });
            var scope = modal.$scope;
            scope.$on("modal.hide", function() {
                scope.$destroy();
            });
        };

        var commonOptinal = function(parentScope, title, contentUrl, init) {
            var modal = $modal({
                scope: parentScope,
                title: title,
                templateUrl: "modal/commonOptinal.tpl.html",
                contentTemplate: contentUrl,
                show: false,
                backdrop: "static"
            });
            modal.$promise.then(function() {
                init(modal);
                modal.show();
            });
            var scope = modal.$scope;
            scope.$on("modal.hide", function() {
                scope.$destroy();
            });
        };

        var htmlModal = function(parentScope, title, tempId, init) {
            var modal = $modal({
                scope: parentScope,
                title: title,
                templateUrl: "modal/common.tpl.html",
                contentTemplate: tempId,
                html: true,
                show: false,
                backdrop: "static"
            });
            modal.$promise.then(function() {
                init(modal);
                modal.show();
            });
            var scope = modal.$scope;
            scope.$on("modal.hide", function() {
                scope.$destroy();
            });
        };

        var procModal = function(parentScope, title) {
            var modal = $modal({
                scope: parentScope,
                title: title,
                templateUrl: "modal/process.tpl.html",
                show: false,
                backdrop: "static"
            });
            var scope = modal.$scope;
            modal.$promise.then(function() {
                scope.okBtn = {
                    click: function() {
                        hideModal(modal)
                    }
                }
                modal.show();
            });
            scope.$on("modal.hide", function() {
                scope.$destroy();
            });
            return modal;
        };

        var confirmModal = function(content, okFn) {
            var modal = $modal({
                scope: confirmScope,
                content: content,
                templateUrl: "modal/confirm.tpl.html",
                show: true,
                backdrop: "static"
            });
            var scope = modal.$scope;
            scope.$on("modal.hide", function() {
                scope.$destroy();
            });
            scope.okBtn = {
                click: function() {
                    okFn();
                    hideModal(modal);
                }
            }
        };

        var toDate = function toDate(dateStr) {
            if (dateStr == undefined) {
                return null;
            }
            var arr = dateStr.substring(0, 10).split("-");
            var time = arr[1] + "/" + arr[2] + "/" + arr[0] + dateStr.substring(10, 19);
            return Date.parse(time);
        };

        var showProc = function showProc($scope, title) {
            var modal = procModal($scope, title + '进度');
            var mScope = modal.$scope;
            var proc = mScope.proc = {
                msgs: ['正在' + title + '，请稍候...']
            };
            //get base URL
            var url = $location.absUrl();
            var idx = url.indexOf('#', 0);
            if (idx > 0) {
                url = url.substring(0, idx);
            }
            var defer = $q.defer();
            var sock = new SockJS(addContext(url + 'sock')); //close by server
            sock.onopen = function() {
                defer.resolve(modal);
            };
            sock.onmessage = function(e) {
                proc.msgs.push(e.data);
                mScope.$apply();
            };
            return defer.promise;
        };

        var isRespOK = function(resp) {
            if (angular.isDefined(resp) && resp.status == 0) {
                return true;
            }
            return false;
        };

        var clearObjAttr = function(obj) {
            if (obj) {
                angular.forEach(obj, function(value, key) {
                    delete obj[key];
                });
            }
        };

        var clearArray = function(array) {
            if (array && array.length > 0) {
                var len = array.length;
                for (var i = 0; i < len; i++) {
                    array.pop();
                }
            }
        };

        var getFromArray = function(arrays, key, value) {
            if (arrays && key && value) {
                var len = arrays.length;
                for (var i = 0; i < len; i++) {
                    if (arrays[i][key] == value) {
                        return arrays[i];
                    }
                }
            }
        };
        var getUUID = function() {
            return UUID.prototype.createUUID();
        };

        function UUID() {
            this.id = this.createUUID();
        };

        UUID.prototype.valueOf = function() {
            return this.id;
        };
        UUID.prototype.toString = function() {
            return this.id;
        };
        UUID.prototype.createUUID = function() {
            var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
            var dc = new Date();
            var t = dc.getTime() - dg.getTime();
            var tl = UUID.getIntegerBits(t, 0, 31);
            var tm = UUID.getIntegerBits(t, 32, 47);
            var thv = UUID.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2
            var csar = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
            var csl = UUID.getIntegerBits(UUID.rand(4095), 0, 7);
            var n = UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
                UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
                UUID.getIntegerBits(UUID.rand(8191), 0, 7) +
                UUID.getIntegerBits(UUID.rand(8191), 8, 15) +
                UUID.getIntegerBits(UUID.rand(8191), 0, 15); // this last number is two octets long
            return tl + tm + thv + csar + csl + n;
        };
        UUID.getIntegerBits = function(val, start, end) {
            var base16 = UUID.returnBase(val, 16);
            var quadArray = new Array();
            var quadString = '';
            var i = 0;
            for (i = 0; i < base16.length; i++) {
                quadArray.push(base16.substring(i, i + 1));
            }
            for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {
                if (!quadArray[i] || quadArray[i] == '') quadString += '0';
                else quadString += quadArray[i];
            }
            return quadString;
        };

        UUID.returnBase = function(number, base) {
            return (number).toString(base).toUpperCase();
        };

        UUID.rand = function(max) {
            return Math.floor(Math.random() * (max + 1));
        };
        var getSum = function() {};
        var getAver = function() {};
        var getMax = function() {};
        var getMin = function() {};

        return {
            selectedIds: selectedIds,
            buildQueryParam: buildQueryParam,
            handleMulti: handleMulti,
            hideModal: hideModal,
            commonModal: commonModal,
            commonOptinal: commonOptinal,
            htmlModal: htmlModal,
            procModal: procModal,
            confirm: confirmModal,
            toDate: toDate,
            showProc: showProc,
            clearObjAttr: clearObjAttr,
            clearArray: clearArray,
            isRespOK: isRespOK,
            getFromArray: getFromArray,
            getUUID: getUUID
        };
    };
    app.factory("utilService", ["$rootScope", "$modal", '$location', '$q', utilService]);
});
