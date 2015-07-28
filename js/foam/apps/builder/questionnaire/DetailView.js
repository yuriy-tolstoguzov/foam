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

CLASS({
  package: 'foam.apps.builder.questionnaire',
  name: 'DetailView',
  extendsModel: 'foam.ui.md.DetailView',


  templates: [
    function toHTML() {/*
      <div id="%%id" <%= this.cssClassAttr() %>>
        $$appName
        $$model{ model_: 'foam.ui.md.DetailView' }
      </div>
    */},
    function CSS() {/*
    */},
  ],
});
