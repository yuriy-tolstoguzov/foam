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
  package: 'foam.core',
  name: 'Enum',
  requires: [
    'foam.core.EnumValue'
  ],
  properties: [
    {
      name: 'name',
      defaultValueFn: function() {
        return this.id.split('.').pop();
      }
    },
    {
      name: 'package',
      defaultValueFn: function() {
        return this.id.split('.').slice(0, -1).join('.');
      }
    },
    {
      name: 'startIndex',
      defaultValue: 0,
      type: 'Int'
    },
    {
      name: 'step',
      defaultValue: 1,
      type: 'Int'
    },
    {
      name: 'id',
    },
    {
      name: 'values',
      adapt: function(_, a) {
        // TODO: this should be a custom Property.fromJson implementation
        var index = this.startIndex;
        var used = {};
        for ( var i = 0 ; i < a.length ; i++ ) {
          if ( typeof a[i] == 'string' ) {
            a[i] = this.EnumValue.create({
              label: a[i],
              index: index
            });
          }

          if ( ! a[i].index ) {
            a[i].index = index;
          } else {
            index = a[i].index;
          }
          index += this.step;

          if ( used[index] ) {
            throw "Duplicate Enum index.";
          }
          used[index] = true;

          if ( ! this.EnumValue.isInstance(a[i]) ) {
            a[i] = this.EnumValue.create(a[i]);
          }
        }

        return a;
      }
    }
  ],
  methods: [
    {
      name: 'init',
      labels: ['javascript'],
      code: function init() {
        for ( var i = 0 ; i < this.values.length ; i++ ) {
          var value = this.values[i];
          this[value.name] = value.value;
        }
      }
    }
  ],
  templates: [
    {
      name: 'swiftSource',
      labels: ['swift'],
      template: function() {/*
// Generated by foam.core.Enum.  DO NOT MODIFY BY HAND
import Foundation
class <%= this.name %>: FoamEnum {
<% for (var i = 0, value; value = this.values[i]; i++) { %>
  static let <%= value.name %> = <%= value.index %>
<% } %>
  static let choices: [[AnyObject]] = [
<% for (var i = 0, value; value = this.values[i]; i++) { %>
    [
      <%= this.name %>.<%= value.name %>,
  <% if (value.label) { %>
      NSLocalizedString("<%= value.label %>", comment: "<%= value.description %>"),
  <% } else { %>
      "<%= value.name %>",
  <% } %>
    ],
<% } %>
  ]
  static func valueToLabel(value: AnyObject) -> String {
    for e in <%= this.name %>.choices {
      if equals(e[0], b: value) { return e[1] as! String }
    }
    return ""
  }
}
      */}
    },
    {
      name: 'javaSource',
      labels: ['java'],
      template: function() {/*
// Generated by FOAM, do not modify.
package <%= this.package %>;

public enum <%= this.name %> {
<%
  for ( var i = 0 ; i < this.values.length ; i++ ) {
    var value = this.values[i];
    if ( value.javaSource ) { value.javaSource(out); }
    else {
%>  <%= value.name %>(<%= value.index %>)<%
    }
    if ( i == this.values.length - 1 ) {%>;<%}
    else {%>,<%}
  }
%>

  private final int index_;
  <%= this.name %>(int index) {
    index_ = index;
  }

  public int getIndex() {
    return index_;
  }
}
*/}
    }
  ]
});
