/**
 * Copied from p5.js library
 */

class q5Element {
  constructor(elt) {
    this.elt = elt;
    this._events = {};
    this.width = this.elt.offsetWidth;
    this.height = this.elt.offsetHeight;
  }

  position() {
    if (arguments.length === 0) {
      return {
        x: this.elt.offsetLeft,
        y: this.elt.offsetTop
      };
    } else {
      var positionType = 'absolute';
      if (arguments[2] === 'static' || arguments[2] === 'fixed' || arguments[2] === 'relative' || arguments[2] === 'sticky' || arguments[2] === 'initial' || arguments[2] === 'inherit') {
        positionType = arguments[2];
      }
      this.elt.style.position = positionType;
      this.elt.style.left = arguments[0] + 'px';
      this.elt.style.top = arguments[1] + 'px';
      this.x = arguments[0];
      this.y = arguments[1];
      return this;
    }
  }

  show() {
    this.elt.style.display = 'block';
    return this;
  };

  hide() {
    this.elt.style.display = 'none';
    return this;
  };
  
  size(w, h) {
    if (arguments.length === 0) {
      return {
        width: this.elt.offsetWidth,
        height: this.elt.offsetHeight
      };
    } else {
      var aW = w;
      var aH = h;
      if (aW !== AUTO || aH !== AUTO) {
        if (aW === AUTO) {
          aW = h * this.width / this.height;
        } else if (aH === AUTO) {
          aH = w * this.height / this.width;
        } // set diff for cnv vs normal div

        if (this.elt instanceof HTMLCanvasElement) {
          var j = {
          };
          var k = this.elt.getContext('2d');
          var prop;
          for (prop in k) {
            j[prop] = k[prop];
          }
          this.elt.setAttribute('width', aW * this._pInst._pixelDensity);
          this.elt.setAttribute('height', aH * this._pInst._pixelDensity);
          this.elt.style.width = aW + 'px';
          this.elt.style.height = aH + 'px';
          this._pInst.scale(this._pInst._pixelDensity, this._pInst._pixelDensity);
          for (prop in j) {
            this.elt.getContext('2d') [prop] = j[prop];
          }
        } else {
          this.elt.style.width = aW + 'px';
          this.elt.style.height = aH + 'px';
          this.elt.width = aW;
          this.elt.height = aH;
        }
        this.width = this.elt.offsetWidth;
        this.height = this.elt.offsetHeight;
        if (this._pInst && this._pInst._curElement) {
          // main canvas associated with p5 instance
          if (this._pInst._curElement.elt === this.elt) {
            this._pInst._setProperty('width', this.elt.offsetWidth);
            this._pInst._setProperty('height', this.elt.offsetHeight);
          }
        }
      }
      return this;
    }
  }

  style(prop, val) {
    var self = this;
    if (val instanceof Color) {
      val = 'rgba(' + val.levels[0] + ',' + val.levels[1] + ',' + val.levels[2] + ',' + val.levels[3] / 255 + ')';
    }
    if (typeof val === 'undefined') {
      if (prop.indexOf(':') === - 1) {
        // no value set, so assume requesting a value
        var styles = window.getComputedStyle(self.elt);
        var style = styles.getPropertyValue(prop);
        return style;
      } else {
        // value set using `:` in a single line string
        var attrs = prop.split(';');
        for (var i = 0; i < attrs.length; i++) {
          var parts = attrs[i].split(':');
          if (parts[0] && parts[1]) {
            this.elt.style[parts[0].trim()] = parts[1].trim();
          }
        }
      }
    } else {
      // input provided as key,val pair
      this.elt.style[prop] = val;
      if (prop === 'width' || prop === 'height' || prop === 'left' || prop === 'top') {
        var _styles = window.getComputedStyle(self.elt);
        var styleVal = _styles.getPropertyValue(prop);
        var numVal = styleVal.replace(/[^\d.]/g, '');
        this[prop] = Math.round(parseFloat(numVal, 10));
      }
    }
    return this;
  };

  value() {
    if (arguments.length > 0) {
      this.elt.value = arguments[0];
      return this;
    } else {
      if (this.elt.type === 'range') {
        return parseFloat(this.elt.value);
      } else return this.elt.value;
    }
  };

  mouseClicked(fxn) {
    this._adjustListener('click', fxn, this);
    return this;
  };

  isFocused() {
    return document.activeElement === this.elt;
  }

  // General handler for event attaching and detaching
  _adjustListener(ev, fxn, ctx) {
    if (fxn === false) {
      this._detachListener(ev, ctx);
    } else {
      this._attachListener(ev, fxn, ctx);
    }
    return this;
  };
  
  _attachListener(ev, fxn, ctx) {
    // detach the old listener if there was one
    if (ctx._events[ev]) {
      this._detachListener(ev, ctx);
    }
    var f = fxn.bind(ctx);
    ctx.elt.addEventListener(ev, f, false);
    ctx._events[ev] = f;
  };
  
  _detachListener(ev, ctx) {
    var f = ctx._events[ev];
    ctx.elt.removeEventListener(ev, f, false);
    ctx._events[ev] = null;
  };
}

function createButton(label, value) {
  var elt = document.createElement('button');
  elt.innerHTML = label;
  if (value) elt.value = value;
  return addElement(elt);  
}

function createFileInput(callback) {
  var multiple = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var handleFileSelect = function handleFileSelect(event) {
    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;
    try {
      for (var _iterator8 = event.target.files[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
        var file = _step8.value;
        File._load(file, callback);
      }
    } catch (err) {
      _didIteratorError8 = true;
      _iteratorError8 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion8 && _iterator8.return != null) {
          _iterator8.return();
        }
      } finally {
        if (_didIteratorError8) {
          throw _iteratorError8;
        }
      }
    }
  }; // If File API's are not supported, throw Error
  if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
    console.log('The File APIs are not fully supported in this browser. Cannot create element.');
    return;
  }
  var fileInput = document.createElement('input');
  fileInput.setAttribute('type', 'file');
  if (multiple) fileInput.setAttribute('multiple', true);
  fileInput.addEventListener('change', handleFileSelect, false);
  return addElement(fileInput);
};

createImg = function () {
  var elt = document.createElement('img');
  var args = arguments;
  var self;
  if (args.length > 1 && typeof args[1] === 'string') {
    elt.alt = args[1];
  }
  if (args.length > 2 && typeof args[2] === 'string') {
    elt.crossOrigin = args[2];
  }
  elt.src = args[0];
  self = addElement(elt, this);
  elt.addEventListener('load', function () {
    self.width = elt.offsetWidth || elt.width;
    self.height = elt.offsetHeight || elt.height;
    var last = args[args.length - 1];
    if (typeof last === 'function') last(self);
  });
  return self;
};

createInput = function () {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text';
  var elt = document.createElement('input');
  elt.setAttribute('value', value);
  elt.setAttribute('type', type);
  return addElement(elt, this);
};

function addElement(elt) {
  document.body.appendChild(elt);
  return new q5Element(elt);
} 

const AUTO = 'auto';

File = function (file, pInst) {
  this.file = file;
  this._pInst = pInst; // Splitting out the file type into two components
  // This makes determining if image or text etc simpler
  var typeList = file.type.split('/');
  this.type = typeList[0];
  this.subtype = typeList[1];
  this.name = file.name;
  this.size = file.size;
  this.data = undefined;
}

File._createLoader = function (theFile, callback) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var p5file = new File(theFile);
    if (p5file.file.type === 'application/json') {
      // Parse JSON and store the result in data
      p5file.data = JSON.parse(e.target.result);
    } else if (p5file.file.type === 'text/xml') {
      // Parse XML, wrap it in p5.XML and store the result in data
      var parser = new DOMParser();
      var xml = parser.parseFromString(e.target.result, 'text/xml');
      p5file.data = new XML(xml.documentElement);
    } else {
      p5file.data = e.target.result;
    }
    callback(p5file);
  };
  return reader;
}

File._load = function (f, callback) {
  // Text or data?
  // This should likely be improved
  if (/^text\//.test(f.type) || f.type === 'application/json') {
    File._createLoader(f, callback).readAsText(f);
  } else if (!/^(video|audio)\//.test(f.type)) {
    File._createLoader(f, callback).readAsDataURL(f);
  } else {
    var file = new File(f);
    file.data = URL.createObjectURL(f);
    callback(file);
  }
}

XML = function (DOM) {
  if (!DOM) {
    var xmlDoc = document.implementation.createDocument(null, 'doc');
    this.DOM = xmlDoc.createElement('root');
  } else {
    this.DOM = DOM;
  }
}

function eraseCanvas(canvas) {
  setEraseMode(canvas);

  const curMode = canvas._rectMode;
  canvas.rectMode(CORNER);
  canvas.rect(0, 0, canvas.width, canvas.height);
  canvas.rectMode(curMode);
  
  setNoEraseMode(canvas);
}

function setEraseMode(canvas) {
  canvas.push();
  canvas.fill(255, 255, 255, 255);
  canvas.blendMode(REMOVE);
}

function setNoEraseMode(canvas) {
  canvas.blendMode(BLEND);
  canvas.pop();
}

document.addEventListener("DOMContentLoaded", function() {
  addEventListener('mousemove', (e) => {
    window.mouseX = e.pageX;
    window.mouseY = e.pageY;
  });
});