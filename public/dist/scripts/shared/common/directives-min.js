function sampleDirective(e){return function(e,r,i){}}function colorpicker(){return{require:"ngModel",link:function(e,r,i,t){r.spectrum(),t&&(t.$render=function(){r.spectrum("set",t.$viewValue||"#fff")},r.on("change",function(){e.$apply(function(){t.$setViewValue(r.val())})}))}}}function numberInput(){return{require:"?ngModel",link:function(e,r,i,t){t.$parsers.push(function(e){var r=e.replace(/[^0-9]/g,"");return r!==e&&(t.$setViewValue(r),t.$render()),r})}}}function restrictField(){return{restrict:"AE",scope:{restrictField:"="},link:function(e){e.$watch("restrictField",function(r,i){r!=i&&"^[a-zA-Z0-9]+$".test(r)&&(e.restrictField=r.replace("^[a-zA-Z0-9]+$",""))})}}}angular.module("fantumn").directive("sampleDirective",sampleDirective).directive("colorpicker",colorpicker).directive("numberInput",numberInput).directive("restrictField",restrictField);