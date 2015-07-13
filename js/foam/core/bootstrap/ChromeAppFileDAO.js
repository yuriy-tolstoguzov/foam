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

MODEL({
  package: 'foam.core.bootstrap',
  name: 'ChromeAppFileDAO',

  imports: [
    'document',
    'window'
  ],

  properties: [
    {
      name: 'pending',
      factory: function() { return {}; }
    },
    {
      name: 'preload',
      factory: function() { return {}; }
    },
    {
      name: 'rootPath',
      factory: function() {
        return this.window.FOAM_BOOT_DIR + '../js/';
      }
    },
    'looking_'
  ],

  methods: {
    toURL_: function(key) {
      return this.rootPath + key.replace(/\./g, '/') + '.js';
    },
    find: function(key, sink) {
      if ( this.preload[key] ) {
        sink && sink.put && sink.put(this.preload[key]);
        delete this.preload[key];
        return;
      }

      if ( this.pending[key] ) {
        this.pending[key].push(sink);
        return;
      }

      this.pending[key] = [sink];

      var tag;
      var onerror = function() {
        var pending = this.pending[key];
        delete this.pending[key];
        for ( var i = 0 ; i < pending.length ; i++ ) {
          pending[i] && pending[i].error && pending[i].error.apply(null, arguments);
        }
        if ( tag ) tag.remove();
      }.bind(this);

      aseq(
        function(ret) {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", this.toURL_(key));
          xhr.responseType = "blob";
          xhr.onreadystatechange = function() {
            if ( xhr.readyState != xhr.DONE ) return;

            if ( xhr.status >= 200 && xhr.status < 300 ) {
              ret(xhr.response);
              return;
            }
            ret(null);
          };
          xhr.send();
        }.bind(this),
        function(ret, blob) {
          if (!blob) {
            onerror();
            return;
          }

          tag = this.document.createElement('script');
          var looking = key;

          tag.callback = function(data, latch) {
	    data.sourcePath = this.toURL_(key);

	    if ( looking === data.package + '.' + data.name ) looking = null;

	    aseq(
	      JSONUtil.aMapToObj(this.X, data),
	      function(ret, obj) {
		if ( ! obj ) throw new Error('Failed to decode data: ' + data);

		if ( ! this.pending[obj.id] ) {
		  if ( latch ) {
                    latch(data);
		  } else {
                    // Workaround for legacy apps that include extra models via
                    // additional script tags.
                    this.preload[obj.id] = obj;
		  }
		  return;
		}

                var sinks = this.pending[obj.id];
                delete this.pending[obj.id];
                if ( sinks ) {
                  for ( var i = 0; i < sinks.length ; i++ ) {
                    var sink = sinks[i];
                    sink && sink.put && sink.put(obj);
                  }
                }
              }.bind(this))();
          }.bind(this);

          tag.onload = function() {
            if ( looking != null ) {
              onerror();
            }
            tag.remove();
          };
          tag.onerror = onerror;

          tag.src = this.window.URL.createObjectURL(blob);

          this.document.head.appendChild(tag);
        }.bind(this))(function(){});
    }
  }
});
