(function(module) {
try {
  module = angular.module('docApp');
} catch (e) {
  module = angular.module('docApp', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/api/main/directive/icon.html',
    '<header class="api-profile-header"><h1 class="api-profile-header-heading">icon</h1><ol class="api-profile-header-structure naked-list step-list"><li>- directive in module <a href="api/main">main</a></li></ol></header><div class="api-profile-description"><p>This directive is an API that enables to use icons located on a sprite image.</p></div><div><h2>Directive Info</h2><ul><li>This directive creates new scope.</li><li>This directive executes at priority level 0.</li></ul><h2 id="usage">Usage</h2><div class="usage"><ul><li>as element:<pre><code>&lt;icon&#10;  source=&quot;&quot;&#10;  position=&quot;&quot;&#10;  hover-offset=&quot;&quot;&#10;  alt-text=&quot;&quot;&#10;  offset-on=&quot;&quot;&gt;&#10;...&#10;&lt;/icon&gt;</code></pre></li></ul></div><section class="api-section"><h3>Arguments</h3><table class="variables-matrix input-arguments"><thead><tr><th>Param</th><th>Type</th><th>Details</th></tr></thead><tbody><tr><td>source</td><td><a href="" class="label type-hint type-hint-string">String</a></td><td><p>Source URL for the sprite image. Default is <code>images/icons.png</code></p></td></tr><tr><td>position</td><td><a href="" class="label type-hint type-hint-array">Array</a></td><td><p>Position of the icon on the sprite (both coordinates should be negative).</p></td></tr><tr><td>hoverOffset</td><td><a href="" class="label type-hint type-hint-array">Array</a></td><td><p>Offset of the icon to be displayed on hover, relative to the original icon position.</p></td></tr><tr><td>altText</td><td><a href="" class="label type-hint type-hint-object">Object</a></td><td><p>English and Hebrew alt text for the icon img element; eg. <code>{en: &#39;english text&#39;, he:&#39;טקסט בעברית&#39;}</code></p></td></tr><tr><td>offsetOn</td><td><a href="" class="label type-hint type-hint-expression">expression</a></td><td><p>Expression to listen to and offset icon on change.</p></td></tr></tbody></table></section></div>');
}]);
})();
