define(['app'], function (app) {

    /**
     * 文本框回车事件directive, eg:<input type="text" ng-enter="tenantProductsTable.reload()" />
     */
    app.directive('ngEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
    
    /**
     * 时间控件
     * <input class="form-control" id="starttime" ng-model="param.startTime" ng-date max-date="param.endTime"  date-format="yyyy-MM-dd HH:mm:ss" class="Wdate" type="text" >
     */
    app.directive('ngDate', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                minDate: '=',
                maxDate: '=',
                isShowClear: '=',
                dateFormat: '@'
            },
            link: function (scope, element, attr, ngModel) {
            	
                function onpicking(dp) {
                    var date = dp.cal.getNewDateStr();
                    scope.$apply(function () {
                        ngModel.$setViewValue(date);
                    });
                }
                
                function oncleared(){
                    scope.$apply(function () {
                        ngModel.$setViewValue("");
                    });
                }

                element.bind('click', function () {
                	var minDate, maxDate;
                	if(scope.minDate){
                		minDate = new Date(scope.minDate.replace(/-/g,"/"));
                	}
                	if(scope.maxDate){
                		maxDate = new Date(scope.maxDate.replace(/-/g,"/"));
                	}
                    WdatePicker({
                        onpicking: onpicking,
                        oncleared:oncleared,
                        dateFmt: (scope.dateFormat || 'yyyy-MM-dd'),
                        minDate: scope.minDate,
                        maxDate: scope.maxDate,
                        isShowClear: scope.isShowClear,
                        autoPickDate:true
                    })
                });
            }
        };
    });

    /**
     * input[type="number"] 文本类型数据转换成number类型
     * 如:<input ng-model="stringValue" type="number" string-to-number />
     */
    app.directive('stringToNumber', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function(value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function(value) {
                    return parseInt(value);
                });
            }
        };
    })

    /**
     * 可外部调用添加文本的输入框
     * Controller中需要依赖$rootScope，调用方式如:$rootScope.$broadcast('insert_[name]', "xxx");
     * <textarea insert-able="[name]"> </textarea>
     */
    app.directive('insertAble', ['$rootScope', function($rootScope) {
        return {
            require: 'ngModel',
            scope: {
                insertAble: '@'
            },
            link: function(scope, element, attrs, ngModel) {
                $rootScope.$on('insert_' + scope.insertAble, function(e, val) {
                    if (!val) {
                        return;
                    }
                    var domElement = element[0];
                    if (document.selection) {
                        domElement.focus();
                        var sel = document.selection.createRange();
                        sel.text = val;
                        domElement.focus();
                    } else if (domElement.selectionStart || domElement.selectionStart === 0) {
                        var startPos = domElement.selectionStart;
                        var endPos = domElement.selectionEnd;
                        var scrollTop = domElement.scrollTop;
                        domElement.value = domElement.value.substring(0, startPos) + val +
                            domElement.value.substring(endPos, domElement.value.length);
                        domElement.focus();
                        domElement.selectionStart = startPos + val.length;
                        domElement.selectionEnd = startPos + val.length;
                        domElement.scrollTop = scrollTop;
                    } else {
                        domElement.value += val;
                        domElement.focus();
                    }
                    ngModel.$setViewValue(domElement.value);
                });
            }
        }
    }])


    /**
     * Delegate点击事件
     * 如:<ul ng-click-delegate="fn($delegateValue)">
     *     <li delegateValue="值1">1</li>
     *     <li delegateValue="值...">...</li>
     *    </ul>
     */
    app.directive('ngClickDelegate', function($parse){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                var selector = attrs.selector;
                var fn = $parse(attrs.ngClickDelegate);
                element.on('click', selector, function(e){
                    var delegateValue = e.target.getAttribute('delegateValue');
                    var callback = function() {
                        fn(scope, {$event:event, $delegateValue:delegateValue});
                    };
                    scope.$apply(callback);
                });
            }
        };
    });

});