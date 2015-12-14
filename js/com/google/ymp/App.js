/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 */

__DATA({
  model_: 'foam.build.WebApplication',
  id: 'com.google.ymp.App',
  controller: 'com.google.ymp.Client',
  defaultView: 'foam.ui.DetailView',
  htmlHeaders: [
    '<link rel="stylesheet" href="fonts.css" />',
  ],
  appcacheManifest: true,
  precompileTemplates: true,
  coreFiles: [
    // (Possibly modified) list from App Builder.
    'funcName',
    'stdlib',
    'WeakMap',
    'async',
    'parse',
    'event',
    'JSONUtil',
    'XMLUtil',
    'context',
    'JSONParser',
    'TemplateUtil',
    'ChromeEval',
    'FOAM',
    'FObject',
    'BootstrapModel',
    'mm1Model',
    'mm2Property',
    'mm3Types',
    'mm4Method',
    'mm6Misc',
    '../js/foam/ui/Window',
    'value',
    'view',
    '../js/foam/ui/FoamTagView',
    '../js/foam/grammars/CSSDecl',
    'HTMLParser',
    'mlang',
    'mlang1',
    'mlang2',
    'QueryParser',
    'visitor',
    'messaging',
    'dao',
    'arrayDAO',
    'index',
    'models',
    'oauth',
    'NullModelDAO'
    // "full" list.
    // 'firefox',
    // 'funcName',
    // 'safari',
    // 'XMLHttpRequest',
    // 'i18n',
    // 'stdlib',
    // 'WeakMap',
    // 'async',
    // 'parse',
    // 'event',
    // 'JSONUtil',
    // 'XMLUtil',
    // 'context',
    // 'JSONParser',
    // 'TemplateUtil',
    // 'FOAM',
    // 'FObject',
    // 'BootstrapModel',
    // 'mm1Model',
    // 'mm2Property',
    // 'mm3Types',
    // 'mm4Method',
    // 'FOAMmodels',
    // 'mm5Debug',
    // 'mm6Misc',
    // '../js/foam/core/bootstrap/OrDAO',
    // '../js/foam/core/bootstrap/BrowserFileDAO',
    // '../js/foam/ui/Window',
    // 'value',
    // 'view',
    // '../js/foam/ui/FoamTagView',
    // 'cview',
    // '../js/foam/grammars/CSSDecl',
    // 'HTMLParser',
    // 'mlang',
    // 'mlang1',
    // 'mlang2',
    // 'QueryParser',
    // 'oam',
    // 'visitor',
    // 'messaging',
    // 'dao',
    // 'arrayDAO',
    // 'index',
    // 'models',
    // 'oauth',
    // 'ModelDAO',
  ]
});
