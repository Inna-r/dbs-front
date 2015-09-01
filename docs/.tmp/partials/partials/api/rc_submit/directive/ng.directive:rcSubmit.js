(function(module) {
try {
  module = angular.module('docApp');
} catch (e) {
  module = angular.module('docApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/api/rc_submit/directive/ng.directive:rcSubmit.html',
    '<header class="api-profile-header"><h1 class="api-profile-header-heading">ng.directive:rcSubmit</h1><ol class="api-profile-header-structure naked-list step-list"><li>- directive in module <a href=""></a></li></ol></header><div class="api-profile-description"><p>Alternative to ngSubmit that verifies the ngFormController is valid before executing the given expression. Otherwise it cancels the event.</p></div><div><h2>Directive Info</h2><ul><li>This directive executes at priority level 0.</li></ul><h2 id="usage">Usage</h2><div class="usage"><ul><li>as attribute:<pre><code>&lt;form&#10;  rc-submit=&quot;&quot;&gt;&#10;...&#10;&lt;/form&gt;</code></pre></li></ul></div><section class="api-section"><h3>Arguments</h3><table class="variables-matrix input-arguments"><thead><tr><th>Param</th><th>Type</th><th>Details</th></tr></thead><tbody><tr><td>rcSubmit</td><td><a href="" class="label type-hint type-hint-expression">expression</a></td><td><p><a href="guide/expression">Expression</a> to eval.</p></td></tr></tbody></table></section></div>');
}]);
})();
