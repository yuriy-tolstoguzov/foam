/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

CLASS({
  name: 'EnumFieldView',
  package: 'foam.ui',
  extends: 'foam.ui.SimpleView',
  properties: [
    {
      name: 'data',
      hidden: true,
      postSet: function(_, n) {
        var e = this.X.lookup(this.enum);
        if (!e) return;
        var value = e.valueForIndex(n);
        this.enumLabel = value ? value.label : '';
      },
    },
    {
      name: 'enum',
    },
    {
      name: 'enumLabel',
      mode: 'read-only',
    },
  ],
  templates: [
    function toHTML() {/*
      $$enumLabel
    */},
  ]
});
