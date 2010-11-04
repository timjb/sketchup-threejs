// ThreeDebug.js r27 - http://github.com/mrdoob/three.js
/**
 * @author mr.doob / http://mrdoob.com/
 */

var THREE = THREE || {};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Color = function ( hex ) {

	/*
	this.r; this.g; this.b; this.a;
	this.hex;
	this.__styleString;
	*/

	this.autoUpdate = true;
	this.setHex( hex );

}

THREE.Color.prototype = {

	setRGBA: function ( r, g, b, a ) {

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;

		if ( this.autoUpdate ) {

			this.updateHex();
			this.updateStyleString();

		}

	},

	setHex: function ( hex ) {

		this.hex = hex;

		if ( this.autoUpdate ) {

			this.updateRGBA();
			this.updateStyleString();

		}

	},

	copyRGB: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

	},

	copyRGBA: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;
		this.a = color.a;

	},

	multiplySelfRGB: function ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

	},

	updateHex: function () {

		this.hex = Math.floor( this.a * 255 ) << 24 | Math.floor( this.r * 255 ) << 16 | Math.floor( this.g * 255 ) << 8 | Math.floor( this.b * 255 );

	},

	updateRGBA: function () {

		this.a = ( this.hex >> 24 & 255 ) / 255;
		this.r = ( this.hex >> 16 & 255 ) / 255;
		this.g = ( this.hex >> 8 & 255 ) / 255;
		this.b = ( this.hex & 255 ) / 255;

	},

	updateStyleString: function () {

		this.__styleString = 'rgba(' + Math.floor( this.r * 255 ) + ',' + Math.floor( this.g * 255 ) + ',' + Math.floor( this.b * 255 ) + ',' + this.a + ')';

	},

	toString: function () {

		return 'THREE.Color ( r: ' + this.r + ', g: ' + this.g + ', b: ' + this.b + ', a: ' + this.a + ', hex: ' + this.hex + ' )';

	}

};

/**
 * @author mr.doob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 */

THREE.Vector2 = function ( x, y ) {

	this.x = x || 0;
	this.y = y || 0;

};

THREE.Vector2.prototype = {

	set: function ( x, y ) {

		this.x = x;
		this.y = y;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;

		return this;

	},

	add: function ( v1, v2 ) {

		this.x = v1.x + v2.x;
		this.y = v1.y + v2.y;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;

		return this;

	},

	sub: function ( v1, v2 ) {

		this.x = v1.x - v2.x;
		this.y = v1.y - v2.y;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;

		return this;

	},

	unit: function () {

		this.multiplyScalar( 1 / this.length() );

		return this;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y;

	},

	negate: function() {

		this.x = - this.x;
		this.y = - this.y;

		return this;

	},

	clone: function () {

		return new THREE.Vector2( this.x, this.y );

	},

	toString: function () {

		return 'THREE.Vector2 (' + this.x + ', ' + this.y + ')';

	}

};

/**
 * @author mr.doob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 */

THREE.Vector3 = function ( x, y, z ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

};

THREE.Vector3.prototype = {

	set: function ( x, y, z ) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;

	},

	add: function( v1, v2 ) {

		this.x = v1.x + v2.x;
		this.y = v1.y + v2.y;
		this.z = v1.z + v2.z;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	},

	addScalar: function ( s ) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	},

	sub: function( v1, v2 ) {

		this.x = v1.x - v2.x;
		this.y = v1.y - v2.y;
		this.z = v1.z - v2.z;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;

	},

	cross: function ( v1, v2 ) {

		this.x = v1.y * v2.z - v1.z * v2.y;
		this.y = v1.z * v2.x - v1.x * v2.z;
		this.z = v1.x * v2.y - v1.y * v2.x;

		return this;

	},

	crossSelf: function ( v ) {

		var tx = this.x, ty = this.y, tz = this.z;

		this.x = ty * v.z - tz * v.y;
		this.y = tz * v.x - tx * v.z;
		this.z = tx * v.y - ty * v.x;

		return this;

	},

	multiplySelf: function ( v ) {

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.x *= s;
		this.y *= s;
		this.z *= s;

		return this;

	},

	divideScalar: function ( s ) {

		this.x /= s;
		this.y /= s;
		this.z /= s;

		return this;

	},

	dot: function ( v ) {

		return this.x * v.x + this.y * v.y + this.z * v.z;

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
		return dx * dx + dy * dy + dz * dz;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	},

	negate: function () {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	},

	normalize: function () {

		if ( this.length() > 0 ) {

			this.multiplyScalar( 1 / this.length() );

		} else {

			this.multiplyScalar( 0 );

		}

		return this;

	},

	setLength: function( len ) {

		return this.normalize().multiplyScalar( len );

	},

	isZero: function () {

		var almostZero = 0.0001;
		return ( Math.abs( this.x ) < almostZero ) && ( Math.abs( this.y ) < almostZero ) && ( Math.abs( this.z ) < almostZero );

	},

	clone: function () {

		return new THREE.Vector3( this.x, this.y, this.z );

	},

	toString: function () {

		return 'THREE.Vector3 ( ' + this.x + ', ' + this.y + ', ' + this.z + ' )';

	}

};

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 */

THREE.Vector4 = function ( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = w || 1;

};

THREE.Vector4.prototype = {

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	copy: function ( v ) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;

		return this;

	},

	add: function ( v1, v2 ) {

		this.x = v1.x + v2.x;
		this.y = v1.y + v2.y;
		this.z = v1.z + v2.z;
		this.w = v1.w + v2.w;

		return this;

	},

	addSelf: function ( v ) {

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		this.w += v.w;

		return this;

	},

	sub: function ( v1, v2 ) {

		this.x = v1.x - v2.x;
		this.y = v1.y - v2.y;
		this.z = v1.z - v2.z;
		this.w = v1.w - v2.w;

		return this;

	},

	subSelf: function ( v ) {

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		this.w -= v.w;

		return this;

	},

	clone: function () {

		return new THREE.Vector4( this.x, this.y, this.z, this.w );

	},

	toString: function () {

		return 'THREE.Vector4 (' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')';

	}

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Rectangle = function () {

	var _x1, _y1, _x2, _y2,
	_width, _height,
	_isEmpty = true;

	function resize() {

		_width = _x2 - _x1;
		_height = _y2 - _y1;

	}

	this.getX = function () {

		return _x1;

	};

	this.getY = function () {

		return _y1;

	};

	this.getWidth = function () {

		return _width;

	};

	this.getHeight = function () {

		return _height;

	};

	this.getX1 = function() {

		return _x1;

	};

	this.getY1 = function() {

		return _y1;

	};

	this.getX2 = function() {

		return _x2;

	};

	this.getY2 = function() {

		return _y2;

	};

	this.set = function ( x1, y1, x2, y2 ) {

		_isEmpty = false;

		_x1 = x1; _y1 = y1;
		_x2 = x2; _y2 = y2;

		resize();

	};

	this.addPoint = function ( x, y ) {

		if ( _isEmpty ) {

			_isEmpty = false;
			_x1 = x; _y1 = y;
			_x2 = x; _y2 = y;

		} else {

			_x1 = Math.min( _x1, x );
			_y1 = Math.min( _y1, y );
			_x2 = Math.max( _x2, x );
			_y2 = Math.max( _y2, y );

		}

		resize();

	};

	this.addRectangle = function ( r ) {

		if ( _isEmpty ) {

			_isEmpty = false;
			_x1 = r.getX1(); _y1 = r.getY1();
			_x2 = r.getX2(); _y2 = r.getY2();

		} else {

			_x1 = Math.min(_x1, r.getX1());
			_y1 = Math.min(_y1, r.getY1());
			_x2 = Math.max(_x2, r.getX2());
			_y2 = Math.max(_y2, r.getY2());

		}

		resize();

	};

	this.inflate = function ( v ) {

		_x1 -= v; _y1 -= v;
		_x2 += v; _y2 += v;

		resize();

	};

	this.minSelf = function( r ) {

		_x1 = Math.max( _x1, r.getX1() );
		_y1 = Math.max( _y1, r.getY1() );
		_x2 = Math.min( _x2, r.getX2() );
		_y2 = Math.min( _y2, r.getY2() );

		resize();

	};

	/*
	this.containsPoint = function (x, y) {

		return x > _x1 && x < _x2 && y > _y1 && y < _y2;

	}
	*/

	this.instersects = function ( r ) {

		return Math.min( _x2, r.getX2() ) - Math.max( _x1, r.getX1() ) >= 0 && Math.min( _y2, r.getY2() ) - Math.max( _y1, r.getY1() ) >= 0;

	};

	this.empty = function () {

		_isEmpty = true;

		_x1 = 0; _y1 = 0;
		_x2 = 0; _y2 = 0;

		resize();

	};

	this.isEmpty = function () {

		return _isEmpty;

	};

	this.toString = function () {

		return "THREE.Rectangle (x1: " + _x1 + ", y1: " + _y2 + ", x2: " + _x2 + ", y1: " + _y1 + ", width: " + _width + ", height: " + _height + ")";

	};

};

THREE.Matrix3 = function () {

	this.m = [];

};

THREE.Matrix3.prototype = {

	transpose: function () {

		var tmp;

		tmp = this.m[1]; this.m[1] = this.m[3]; this.m[3] = tmp;
		tmp = this.m[2]; this.m[2] = this.m[6]; this.m[6] = tmp;
		tmp = this.m[5]; this.m[5] = this.m[7]; this.m[7] = tmp;

		return this;

	}

}

/**
 * @author mr.doob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 */

THREE.Matrix4 = function () {

	this._x = new THREE.Vector3();
	this._y = new THREE.Vector3();
	this._z = new THREE.Vector3();

};

THREE.Matrix4.prototype = {

	n11: 1, n12: 0, n13: 0, n14: 0,
	n21: 0, n22: 1, n23: 0, n24: 0,
	n31: 0, n32: 0, n33: 1, n34: 0,
	n41: 0, n42: 0, n43: 0, n44: 1,

	identity: function () {

		this.n11 = 1; this.n12 = 0; this.n13 = 0; this.n14 = 0;
		this.n21 = 0; this.n22 = 1; this.n23 = 0; this.n24 = 0;
		this.n31 = 0; this.n32 = 0; this.n33 = 1; this.n34 = 0;
		this.n41 = 0; this.n42 = 0; this.n43 = 0; this.n44 = 1;

	},

	copy: function ( m ) {

		this.n11 = m.n11; this.n12 = m.n12; this.n13 = m.n13; this.n14 = m.n14;
		this.n21 = m.n21; this.n22 = m.n22; this.n23 = m.n23; this.n24 = m.n24;
		this.n31 = m.n31; this.n32 = m.n32; this.n33 = m.n33; this.n34 = m.n34;
		this.n41 = m.n41; this.n42 = m.n42; this.n43 = m.n43; this.n44 = m.n44;

	},

	lookAt: function ( eye, center, up ) {

		var x = this._x, y = this._y, z = this._z;

		z.sub( eye, center );
		z.normalize();

		x.cross( up, z );
		x.normalize();

		y.cross( z, x );
		y.normalize();

		this.n11 = x.x; this.n12 = x.y; this.n13 = x.z; this.n14 = - x.dot( eye );
		this.n21 = y.x; this.n22 = y.y; this.n23 = y.z; this.n24 = - y.dot( eye );
		this.n31 = z.x; this.n32 = z.y; this.n33 = z.z; this.n34 = - z.dot( eye );
		this.n41 = 0; this.n42 = 0; this.n43 = 0; this.
n44 = 1;
	},

	transform: function ( v ) {

		var vx = v.x, vy = v.y, vz = v.z, vw = v.w ? v.w : 1.0;

		v.x = this.n11 * vx + this.n12 * vy + this.n13 * vz + this.n14 * vw;
		v.y = this.n21 * vx + this.n22 * vy + this.n23 * vz + this.n24 * vw;
		v.z = this.n31 * vx + this.n32 * vy + this.n33 * vz + this.n34 * vw;

		vw = this.n41 * vx + this.n42 * vy + this.n43 * vz + this.n44 * vw;

		if( v.w ) {

			v.w = vw;

		} else {

			v.x = v.x / vw;
			v.y = v.y / vw;
			v.z = v.z / vw;

		}

		return v;

	},

	crossVector: function ( a ) {

		var v = new THREE.Vector4();

		v.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
		v.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
		v.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;

		v.w = ( a.w ) ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1;

		return v;

	},

	multiply: function ( a, b ) {

		this.n11 = a.n11 * b.n11 + a.n12 * b.n21 + a.n13 * b.n31 + a.n14 * b.n41;
		this.n12 = a.n11 * b.n12 + a.n12 * b.n22 + a.n13 * b.n32 + a.n14 * b.n42;
		this.n13 = a.n11 * b.n13 + a.n12 * b.n23 + a.n13 * b.n33 + a.n14 * b.n43;
		this.n14 = a.n11 * b.n14 + a.n12 * b.n24 + a.n13 * b.n34 + a.n14 * b.n44;

		this.n21 = a.n21 * b.n11 + a.n22 * b.n21 + a.n23 * b.n31 + a.n24 * b.n41;
		this.n22 = a.n21 * b.n12 + a.n22 * b.n22 + a.n23 * b.n32 + a.n24 * b.n42;
		this.n23 = a.n21 * b.n13 + a.n22 * b.n23 + a.n23 * b.n33 + a.n24 * b.n43;
		this.n24 = a.n21 * b.n14 + a.n22 * b.n24 + a.n23 * b.n34 + a.n24 * b.n44;

		this.n31 = a.n31 * b.n11 + a.n32 * b.n21 + a.n33 * b.n31 + a.n34 * b.n41;
		this.n32 = a.n31 * b.n12 + a.n32 * b.n22 + a.n33 * b.n32 + a.n34 * b.n42;
		this.n33 = a.n31 * b.n13 + a.n32 * b.n23 + a.n33 * b.n33 + a.n34 * b.n43;
		this.n34 = a.n31 * b.n14 + a.n32 * b.n24 + a.n33 * b.n34 + a.n34 * b.n44;

		this.n41 = a.n41 * b.n11 + a.n42 * b.n21 + a.n43 * b.n31 + a.n44 * b.n41;
		this.n42 = a.n41 * b.n12 + a.n42 * b.n22 + a.n43 * b.n32 + a.n44 * b.n42;
		this.n43 = a.n41 * b.n13 + a.n42 * b.n23 + a.n43 * b.n33 + a.n44 * b.n43;
		this.n44 = a.n41 * b.n14 + a.n42 * b.n24 + a.n43 * b.n34 + a.n44 * b.n44;

	},

	multiplySelf: function ( m ) {

		var n11 = this.n11, n12 = this.n12, n13 = this.n13, n14 = this.n14,
		n21 = this.n21, n22 = this.n22, n23 = this.n23, n24 = this.n24,
		n31 = this.n31, n32 = this.n32, n33 = this.n33, n34 = this.n34,
		n41 = this.n41, n42 = this.n42, n43 = this.n43, n44 = this.n44;

		this.n11 = n11 * m.n11 + n12 * m.n21 + n13 * m.n31 + n14 * m.n41;
		this.n12 = n11 * m.n12 + n12 * m.n22 + n13 * m.n32 + n14 * m.n42;
		this.n13 = n11 * m.n13 + n12 * m.n23 + n13 * m.n33 + n14 * m.n43;
		this.n14 = n11 * m.n14 + n12 * m.n24 + n13 * m.n34 + n14 * m.n44;

		this.n21 = n21 * m.n11 + n22 * m.n21 + n23 * m.n31 + n24 * m.n41;
		this.n22 = n21 * m.n12 + n22 * m.n22 + n23 * m.n32 + n24 * m.n42;
		this.n23 = n21 * m.n13 + n22 * m.n23 + n23 * m.n33 + n24 * m.n43;
		this.n24 = n21 * m.n14 + n22 * m.n24 + n23 * m.n34 + n24 * m.n44;

		this.n31 = n31 * m.n11 + n32 * m.n21 + n33 * m.n31 + n34 * m.n41;
		this.n32 = n31 * m.n12 + n32 * m.n22 + n33 * m.n32 + n34 * m.n42;
		this.n33 = n31 * m.n13 + n32 * m.n23 + n33 * m.n33 + n34 * m.n43;
		this.n34 = n31 * m.n14 + n32 * m.n24 + n33 * m.n34 + n34 * m.n44;

		this.n41 = n41 * m.n11 + n42 * m.n21 + n43 * m.n31 + n44 * m.n41;
		this.n42 = n41 * m.n12 + n42 * m.n22 + n43 * m.n32 + n44 * m.n42;
		this.n43 = n41 * m.n13 + n42 * m.n23 + n43 * m.n33 + n44 * m.n43;
		this.n44 = n41 * m.n14 + n42 * m.n24 + n43 * m.n34 + n44 * m.n44;

	},

	multiplyScalar: function ( s ) {

		this.n11 *= s; this.n12 *= s; this.n13 *= s; this.n14 *= s;
		this.n21 *= s; this.n22 *= s; this.n23 *= s; this.n24 *= s;
		this.n31 *= s; this.n32 *= s; this.n33 *= s; this.n34 *= s;
		this.n41 *= s; this.n42 *= s; this.n43 *= s; this.n44 *= s;

	},

	determinant: function () {

		//TODO: make this more efficient
		//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
		return (
			this.n14 * this.n23 * this.n32 * this.n41-
			this.n13 * this.n24 * this.n32 * this.n41-
			this.n14 * this.n22 * this.n33 * this.n41+
			this.n12 * this.n24 * this.n33 * this.n41+

			this.n13 * this.n22 * this.n34 * this.n41-
			this.n12 * this.n23 * this.n34 * this.n41-
			this.n14 * this.n23 * this.n31 * this.n42+
			this.n13 * this.n24 * this.n31 * this.n42+

			this.n14 * this.n21 * this.n33 * this.n42-
			this.n11 * this.n24 * this.n33 * this.n42-
			this.n13 * this.n21 * this.n34 * this.n42+
			this.n11 * this.n23 * this.n34 * this.n42+

			this.n14 * this.n22 * this.n31 * this.n43-
			this.n12 * this.n24 * this.n31 * this.n43-
			this.n14 * this.n21 * this.n32 * this.n43+
			this.n11 * this.n24 * this.n32 * this.n43+

			this.n12 * this.n21 * this.n34 * this.n43-
			this.n11 * this.n22 * this.n34 * this.n43-
			this.n13 * this.n22 * this.n31 * this.n44+
			this.n12 * this.n23 * this.n31 * this.n44+

			this.n13 * this.n21 * this.n32 * this.n44-
			this.n11 * this.n23 * this.n32 * this.n44-
			this.n12 * this.n21 * this.n33 * this.n44+
			this.n11 * this.n22 * this.n33 * this.n44 );

	},

	transpose: function () {

		function swap( obj, p1, p2 ) {

			var aux = obj[ p1 ];
			obj[ p1 ] = obj[ p2 ];
			obj[ p2 ] = aux;

		}

		swap( this, 'n21', 'n12' );
		swap( this, 'n31', 'n13' );
		swap( this, 'n32', 'n23' );
		swap( this, 'n41', 'n14' );
		swap( this, 'n42', 'n24' );
		swap( this, 'n43', 'n34' );

		return this;

	},

	clone: function () {

		var m = new THREE.Matrix4();
		m.n11 = this.n11; m.n12 = this.n12; m.n13 = this.n13; m.n14 = this.n14;
		m.n21 = this.n21; m.n22 = this.n22; m.n23 = this.n23; m.n24 = this.n24;
		m.n31 = this.n31; m.n32 = this.n32; m.n33 = this.n33; m.n34 = this.n34;
		m.n41 = this.n41; m.n42 = this.n42; m.n43 = this.n43; m.n44 = this.n44;
		return m;

	},

	flatten: function() {

		return [this.n11, this.n21, this.n31, this.n41,
			this.n12, this.n22, this.n32, this.n42,
			this.n13, this.n23, this.n33, this.n43,
			this.n14, this.n24, this.n34, this.n44];

	},

	toString: function() {

		return  "| " + this.n11 + " " + this.n12 + " " + this.n13 + " " + this.n14 + " |\n" +
			"| " + this.n21 + " " + this.n22 + " " + this.n23 + " " + this.n24 + " |\n" +
			"| " + this.n31 + " " + this.n32 + " " + this.n33 + " " + this.n34 + " |\n" +
			"| " + this.n41 + " " + this.n42 + " " + this.n43 + " " + this.n44 + " |";

	}

};

THREE.Matrix4.translationMatrix = function ( x, y, z ) {

	var m = new THREE.Matrix4();

	m.n14 = x;
	m.n24 = y;
	m.n34 = z;

	return m;

};

THREE.Matrix4.scaleMatrix = function ( x, y, z ) {

	var m = new THREE.Matrix4();

	m.n11 = x;
	m.n22 = y;
	m.n33 = z;

	return m;

};

THREE.Matrix4.rotationXMatrix = function ( theta ) {

	var rot = new THREE.Matrix4();

	rot.n22 = rot.n33 = Math.cos( theta );
	rot.n32 = Math.sin( theta );
	rot.n23 = - rot.n32;

	return rot;

};

THREE.Matrix4.rotationYMatrix = function ( theta ) {

	var rot = new THREE.Matrix4();

	rot.n11 = rot.n33 = Math.cos( theta );
	rot.n13 = Math.sin( theta );
	rot.n31 = - rot.n13;

	return rot;

};

THREE.Matrix4.rotationZMatrix = function ( theta ) {

	var rot = new THREE.Matrix4();

	rot.n11 = rot.n22 = Math.cos( theta );
	rot.n21 = Math.sin( theta );
	rot.n12 = - rot.n21;

	return rot;

};

THREE.Matrix4.rotationAxisAngleMatrix = function ( axis, angle ) {

	//Based on http://www.gamedev.net/reference/articles/article1199.asp

	var rot = new THREE.Matrix4(),
	c = Math.cos( angle ),
	s = Math.sin( angle ),
	t = 1 - c,
	x = axis.x, y = axis.y, z = axis.z;

	rot.n11 = t * x * x + c;
	rot.n12 = t * x * y - s * z;
	rot.n13 = t * x * z + s * y;
	rot.n21 = t * x * y + s * z;
	rot.n22 = t * y * y + c;
	rot.n23 = t * y * z - s * x;
	rot.n31 = t * x * z - s * y;
	rot.n32 = t * y * z + s * x;
	rot.n33 = t * z * z + c;

	return rot;

};

THREE.Matrix4.makeInvert = function ( m1 ) {

	//TODO: make this more efficient
	//( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )
	var m2 = new THREE.Matrix4();

	m2.n11 = m1.n23*m1.n34*m1.n42 - m1.n24*m1.n33*m1.n42 + m1.n24*m1.n32*m1.n43 - m1.n22*m1.n34*m1.n43 - m1.n23*m1.n32*m1.n44 + m1.n22*m1.n33*m1.n44;
	m2.n12 = m1.n14*m1.n33*m1.n42 - m1.n13*m1.n34*m1.n42 - m1.n14*m1.n32*m1.n43 + m1.n12*m1.n34*m1.n43 + m1.n13*m1.n32*m1.n44 - m1.n12*m1.n33*m1.n44;
	m2.n13 = m1.n13*m1.n24*m1.n42 - m1.n14*m1.n23*m1.n42 + m1.n14*m1.n22*m1.n43 - m1.n12*m1.n24*m1.n43 - m1.n13*m1.n22*m1.n44 + m1.n12*m1.n23*m1.n44;
	m2.n14 = m1.n14*m1.n23*m1.n32 - m1.n13*m1.n24*m1.n32 - m1.n14*m1.n22*m1.n33 + m1.n12*m1.n24*m1.n33 + m1.n13*m1.n22*m1.n34 - m1.n12*m1.n23*m1.n34;
	m2.n21 = m1.n24*m1.n33*m1.n41 - m1.n23*m1.n34*m1.n41 - m1.n24*m1.n31*m1.n43 + m1.n21*m1.n34*m1.n43 + m1.n23*m1.n31*m1.n44 - m1.n21*m1.n33*m1.n44;
	m2.n22 = m1.n13*m1.n34*m1.n41 - m1.n14*m1.n33*m1.n41 + m1.n14*m1.n31*m1.n43 - m1.n11*m1.n34*m1.n43 - m1.n13*m1.n31*m1.n44 + m1.n11*m1.n33*m1.n44;
	m2.n23 = m1.n14*m1.n23*m1.n41 - m1.n13*m1.n24*m1.n41 - m1.n14*m1.n21*m1.n43 + m1.n11*m1.n24*m1.n43 + m1.n13*m1.n21*m1.n44 - m1.n11*m1.n23*m1.n44;
	m2.n24 = m1.n13*m1.n24*m1.n31 - m1.n14*m1.n23*m1.n31 + m1.n14*m1.n21*m1.n33 - m1.n11*m1.n24*m1.n33 - m1.n13*m1.n21*m1.n34 + m1.n11*m1.n23*m1.n34;
	m2.n31 = m1.n22*m1.n34*m1.n41 - m1.n24*m1.n32*m1.n41 + m1.n24*m1.n31*m1.n42 - m1.n21*m1.n34*m1.n42 - m1.n22*m1.n31*m1.n44 + m1.n21*m1.n32*m1.n44;
	m2.n32 = m1.n14*m1.n32*m1.n41 - m1.n12*m1.n34*m1.n41 - m1.n14*m1.n31*m1.n42 + m1.n11*m1.n34*m1.n42 + m1.n12*m1.n31*m1.n44 - m1.n11*m1.n32*m1.n44;
	m2.n33 = m1.n13*m1.n24*m1.n41 - m1.n14*m1.n22*m1.n41 + m1.n14*m1.n21*m1.n42 - m1.n11*m1.n24*m1.n42 - m1.n12*m1.n21*m1.n44 + m1.n11*m1.n22*m1.n44;
	m2.n34 = m1.n14*m1.n22*m1.n31 - m1.n12*m1.n24*m1.n31 - m1.n14*m1.n21*m1.n32 + m1.n11*m1.n24*m1.n32 + m1.n12*m1.n21*m1.n34 - m1.n11*m1.n22*m1.n34;
	m2.n41 = m1.n23*m1.n32*m1.n41 - m1.n22*m1.n33*m1.n41 - m1.n23*m1.n31*m1.n42 + m1.n21*m1.n33*m1.n42 + m1.n22*m1.n31*m1.n43 - m1.n21*m1.n32*m1.n43;
	m2.n42 = m1.n12*m1.n33*m1.n41 - m1.n13*m1.n32*m1.n41 + m1.n13*m1.n31*m1.n42 - m1.n11*m1.n33*m1.n42 - m1.n12*m1.n31*m1.n43 + m1.n11*m1.n32*m1.n43;
	m2.n43 = m1.n13*m1.n22*m1.n41 - m1.n12*m1.n23*m1.n41 - m1.n13*m1.n21*m1.n42 + m1.n11*m1.n23*m1.n42 + m1.n12*m1.n21*m1.n43 - m1.n11*m1.n22*m1.n43;
	m2.n44 = m1.n12*m1.n23*m1.n31 - m1.n13*m1.n22*m1.n31 + m1.n13*m1.n21*m1.n32 - m1.n11*m1.n23*m1.n32 - m1.n12*m1.n21*m1.n33 + m1.n11*m1.n22*m1.n33;
	m2.multiplyScalar( 1 / m1.determinant() );

	return m2;

};

THREE.Matrix4.makeInvert3x3 = function ( m1 ) {

	// input:  THREE.Matrix4, output: THREE.Matrix3
	// ( based on http://code.google.com/p/webgl-mjs/ )

	var m = m1.flatten(),
	m2 = new THREE.Matrix3(),

	a11 = m[ 10 ] * m[ 5 ] - m[ 6 ] * m[ 9 ],
	a21 = - m[ 10 ] * m[ 1 ] + m[ 2 ] * m[ 9 ],
	a31 = m[ 6 ] * m[ 1 ] - m[ 2 ] * m[ 5 ],
	a12 = - m[ 10 ] * m[ 4 ] + m[ 6 ] * m[ 8 ],
	a22 = m[ 10 ] * m[ 0 ] - m[ 2 ] * m[ 8 ],
	a32 = - m[ 6 ] * m[ 0 ] + m[ 2 ] * m[ 4 ],
	a13 = m[ 9 ] * m[ 4 ] - m[ 5 ] * m[ 8 ],
	a23 = - m[ 9 ] * m[ 0 ] + m[ 1 ] * m[ 8 ],
	a33 = m[ 5 ] * m[ 0 ] - m[ 1 ] * m[ 4 ],
	det = m[ 0 ] * ( a11 ) + m[ 1 ] * ( a12 ) + m[ 2 ] * ( a13 ),
	idet;

	// no inverse
	if (det == 0) throw "matrix not invertible";

	idet = 1.0 / det;

	m2.m[ 0 ] = idet * a11; m2.m[ 1 ] = idet * a21; m2.m[ 2 ] = idet * a31;
	m2.m[ 3 ] = idet * a12; m2.m[ 4 ] = idet * a22; m2.m[ 5 ] = idet * a32;
	m2.m[ 6 ] = idet * a13; m2.m[ 7 ] = idet * a23; m2.m[ 8 ] = idet * a33;

	return m2;

}

THREE.Matrix4.makeFrustum = function( left, right, bottom, top, near, far ) {

	var m, x, y, a, b, c, d;

	m = new THREE.Matrix4();
	x = 2 * near / ( right - left );
	y = 2 * near / ( top - bottom );
	a = ( right + left ) / ( right - left );
	b = ( top + bottom ) / ( top - bottom );
	c = - ( far + near ) / ( far - near );
	d = - 2 * far * near / ( far - near );

	m.n11 = x;  m.n12 = 0;  m.n13 = a;   m.n14 = 0;
	m.n21 = 0;  m.n22 = y;  m.n23 = b;   m.n24 = 0;
	m.n31 = 0;  m.n32 = 0;  m.n33 = c;   m.n34 = d;
	m.n41 = 0;  m.n42 = 0;  m.n43 = - 1; m.n44 = 0;

	return m;

};

THREE.Matrix4.makePerspective = function( fov, aspect, near, far ) {

	var ymax, ymin, xmin, xmax;

	ymax = near * Math.tan( fov * Math.PI / 360 );
	ymin = - ymax;
	xmin = ymin * aspect;
	xmax = ymax * aspect;

	return THREE.Matrix4.makeFrustum( xmin, xmax, ymin, ymax, near, far );

};

THREE.Matrix4.makeOrtho = function( left, right, top, bottom, near, far ) {

	var m, x, y, z, w, h, p;

	m = new THREE.Matrix4();
	w = right - left;
	h = top - bottom;
	p = far - near;
	x = ( right + left ) / w;
	y = ( top + bottom ) / h;
	z = ( far + near ) / p;

	m.n11 = 2 / w; m.n12 = 0;     m.n13 = 0;      m.n14 = -x;
	m.n21 = 0;     m.n22 = 2 / h; m.n23 = 0;      m.n24 = -y;
	m.n31 = 0;     m.n32 = 0;     m.n33 = -2 / p; m.n34 = -z;
	m.n41 = 0;     m.n42 = 0;     m.n43 = 0;      m.n44 = 1;

	return m;

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Vertex = function ( position, normal ) {

	this.position = position || new THREE.Vector3();
	this.positionWorld = new THREE.Vector3();
	this.positionScreen = new THREE.Vector3();

	this.normal = normal || new THREE.Vector3();
	this.normalWorld = new THREE.Vector3();
	this.normalScreen = new THREE.Vector3();

	this.__visible = true;

}

THREE.Vertex.prototype = {

	toString: function () {

		return 'THREE.Vertex ( position: ' + this.position + ', normal: ' + this.normal + ' )';
	}
};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Face3 = function ( a, b, c, normal, material ) {

	this.a = a;
	this.b = b;
	this.c = c;

	this.centroid = new THREE.Vector3();
	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals =  normal instanceof Array ? normal : [];

	this.material = material instanceof Array ? material : [ material ];

};

THREE.Face3.prototype = {

	toString: function () {

		return 'THREE.Face3 ( ' + this.a + ', ' + this.b + ', ' + this.c + ' )';

	}

}

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Face4 = function ( a, b, c, d, normal, material ) {

	this.a = a;
	this.b = b;
	this.c = c;
	this.d = d;

	this.centroid = new THREE.Vector3();
	this.normal = normal instanceof THREE.Vector3 ? normal : new THREE.Vector3();
	this.vertexNormals =  normal instanceof Array ? normal : [];

	this.material = material instanceof Array ? material : [ material ];

};


THREE.Face4.prototype = {

	toString: function () {

		return 'THREE.Face4 ( ' + this.a + ', ' + this.b + ', ' + this.c + ' ' + this.d + ' )';

	}

}

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.UV = function ( u, v ) {

	this.u = u || 0;
	this.v = v || 0;

};

THREE.UV.prototype = {

	copy: function ( uv ) {

		this.u = uv.u;
		this.v = uv.v;

	},

	toString: function () {

		return 'THREE.UV (' + this.u + ', ' + this.v + ')';

	}

}

/**
 * @author mr.doob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 */

THREE.Geometry = function () {

	this.vertices = [];
	this.faces = [];
	this.uvs = [];

};

THREE.Geometry.prototype = {

	computeCentroids: function () {

		var f, fl, face;

		for ( f = 0, fl = this.faces.length; f < fl; f++ ) {

			face = this.faces[ f ];
			face.centroid.set( 0, 0, 0 );

			if ( face instanceof THREE.Face3 ) {

				face.centroid.addSelf( this.vertices[ face.a ].position );
				face.centroid.addSelf( this.vertices[ face.b ].position );
				face.centroid.addSelf( this.vertices[ face.c ].position );
				face.centroid.divideScalar( 3 );

			} else if ( face instanceof THREE.Face4 ) {

				face.centroid.addSelf( this.vertices[ face.a ].position );
				face.centroid.addSelf( this.vertices[ face.b ].position );
				face.centroid.addSelf( this.vertices[ face.c ].position );
				face.centroid.addSelf( this.vertices[ face.d ].position );
				face.centroid.divideScalar( 4 );

			}

		}

	},

	computeNormals: function ( useVertexNormals ) {

		var n, nl, v, vl, vertex, f, fl, face, vA, vB, vC,
		cb = new THREE.Vector3(), ab = new THREE.Vector3();

		for ( v = 0, vl = this.vertices.length; v < vl; v++ ) {

			vertex = this.vertices[ v ];
			vertex.normal.set( 0, 0, 0 );

		}

		for ( f = 0, fl = this.faces.length; f < fl; f++ ) {

			face = this.faces[ f ];

			if ( useVertexNormals && face.vertexNormals.length  ) {

				cb.set( 0, 0, 0 );

				for ( n = 0, nl = face.normal.length; n < nl; n++ ) {

					cb.addSelf( face.vertexNormals[n] );

				}

				cb.divideScalar( 3 );

				if ( ! cb.isZero() ) {

					cb.normalize();

				}

				face.normal.copy( cb );

			} else {

				vA = this.vertices[ face.a ];
				vB = this.vertices[ face.b ];
				vC = this.vertices[ face.c ];

				cb.sub( vC.position, vB.position );
				ab.sub( vA.position, vB.position );
				cb.crossSelf( ab );

				if ( !cb.isZero() ) {

				    cb.normalize();

				}

				face.normal.copy( cb );

			}

		}

	},

	computeBoundingBox: function ( ) {

		if ( this.vertices.length > 0 ) {

			this.bbox = { 'x': [ this.vertices[ 0 ].position.x, this.vertices[ 0 ].position.x ],
			'y': [ this.vertices[ 0 ].position.y, this.vertices[ 0 ].position.y ], 
			'z': [ this.vertices[ 0 ].position.z, this.vertices[ 0 ].position.z ] };

			for ( var v = 1, vl = this.vertices.length; v < vl; v++ ) {

				vertex = this.vertices[ v ];

				if ( vertex.position.x < this.bbox.x[ 0 ] ) {

					this.bbox.x[ 0 ] = vertex.position.x;

				} else if ( vertex.position.x > this.bbox.x[ 1 ] ) {

					this.bbox.x[ 1 ] = vertex.position.x;

				}

				if ( vertex.position.y < this.bbox.y[ 0 ] ) {

					this.bbox.y[ 0 ] = vertex.position.y;

				} else if ( vertex.position.y > this.bbox.y[ 1 ] ) {

					this.bbox.y[ 1 ] = vertex.position.y;

				}

				if ( vertex.position.z < this.bbox.z[ 0 ] ) {

					this.bbox.z[ 0 ] = vertex.position.z;

				} else if ( vertex.position.z > this.bbox.z[ 1 ] ) {

					this.bbox.z[ 1 ] = vertex.position.z;

				}

			}

		}

	},

	toString: function () {

		return 'THREE.Geometry ( vertices: ' + this.vertices + ', faces: ' + this.faces + ' )';

	}

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Camera = function ( fov, aspect, near, far ) {

	this.fov = fov;
	this.aspect = aspect;
	this.position = new THREE.Vector3( 0, 0, 0 );
	this.target = { position: new THREE.Vector3( 0, 0, 0 ) };

	this.projectionMatrix = THREE.Matrix4.makePerspective( fov, aspect, near, far );
	this.up = new THREE.Vector3( 0, 1, 0 );
	this.matrix = new THREE.Matrix4();

	this.autoUpdateMatrix = true;

	this.updateMatrix = function () {

		this.matrix.lookAt( this.position, this.target.position, this.up );

	};

	this.toString = function () {

		return 'THREE.Camera ( ' + this.position + ', ' + this.target.position + ' )';

	};

};

THREE.Light = function ( hex ) {

	this.color = new THREE.Color( 0xff << 24 | hex );

};

THREE.AmbientLight = function ( hex ) {

	THREE.Light.call( this, hex );

};

THREE.AmbientLight.prototype = new THREE.Light();
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight; 

THREE.DirectionalLight = function ( hex, intensity ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 1, 0 );
	this.intensity = intensity || 1;

};

THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight; 

THREE.PointLight = function ( hex, intensity ) {

	THREE.Light.call( this, hex );

	this.position = new THREE.Vector3( 0, 0, 0 );
	this.intensity = intensity || 1;

};

THREE.DirectionalLight.prototype = new THREE.Light();
THREE.DirectionalLight.prototype.constructor = THREE.PointLight; 

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Object3D = function ( material ) {

	this.position = new THREE.Vector3();
	this.rotation = new THREE.Vector3();
	this.scale = new THREE.Vector3( 1, 1, 1 );

	this.matrix = new THREE.Matrix4();
	this.matrixTranslation = new THREE.Matrix4();
	this.matrixRotation = new THREE.Matrix4();
	this.matrixScale = new THREE.Matrix4();

	this.screen = new THREE.Vector3();

	this.autoUpdateMatrix = true;

	this.updateMatrix = function () {

		this.matrixPosition = THREE.Matrix4.translationMatrix( this.position.x, this.position.y, this.position.z );

		this.matrixRotation = THREE.Matrix4.rotationXMatrix( this.rotation.x );
		this.matrixRotation.multiplySelf( THREE.Matrix4.rotationYMatrix( this.rotation.y ) );
		this.matrixRotation.multiplySelf( THREE.Matrix4.rotationZMatrix( this.rotation.z ) );

		this.matrixScale = THREE.Matrix4.scaleMatrix( this.scale.x, this.scale.y, this.scale.z );

		this.matrix.copy( this.matrixPosition );
		this.matrix.multiplySelf( this.matrixRotation );
		this.matrix.multiplySelf( this.matrixScale );

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Particle = function ( material ) {

	THREE.Object3D.call( this );

	this.material = material instanceof Array ? material : [ material ];
	this.autoUpdateMatrix = false;

};

THREE.Particle.prototype = new THREE.Object3D();
THREE.Particle.prototype.constructor = THREE.Particle;

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Line = function ( geometry, material ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = material instanceof Array ? material : [ material ];

};

THREE.Line.prototype = new THREE.Object3D();
THREE.Line.prototype.constructor = THREE.Line;

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Mesh = function ( geometry, material, normUVs ) {

	THREE.Object3D.call( this );

	this.geometry = geometry;
	this.material = material instanceof Array ? material : [ material ];

	this.flipSided = false;
	this.doubleSided = false;

	this.overdraw = false;

	this.materialFaceGroup = {};
	this.sortFacesByMaterial();
	if( normUVs ) this.normalizeUVs();

	this.geometry.computeBoundingBox();

};

THREE.Mesh.prototype = new THREE.Object3D();
THREE.Mesh.prototype.constructor = THREE.Mesh;

THREE.Mesh.prototype.sortFacesByMaterial = function () {

	// TODO
	// Should optimize by grouping faces with ColorFill / ColorStroke materials
	// which could then use vertex color attributes instead of each being
	// in its separate VBO

	var i, l, f, fl, face, material, vertices, mhash, ghash, hash_map = {};

	function materialHash( material ) {

		var hash_array = [];

		for ( i = 0, l = material.length; i < l; i++ ) {

			if ( material[ i ] == undefined ) {

				hash_array.push( "undefined" );

			} else {

				hash_array.push( material[ i ].toString() );

			}

		}

		return hash_array.join("_");

	}

	for ( f = 0, fl = this.geometry.faces.length; f < fl; f++ ) {

		face = this.geometry.faces[ f ];
		material = face.material;
		
		mhash = materialHash( material );

		if ( hash_map[ mhash ] == undefined ) {
			
			hash_map[ mhash ] = { 'hash': mhash, 'counter': 0 };
		}

		ghash = hash_map[ mhash ].hash + "_" + hash_map[ mhash ].counter;

		if ( this.materialFaceGroup[ ghash ] == undefined ) {

			this.materialFaceGroup[ ghash ] = { 'faces': [], 'material': material, 'vertices': 0 };

		}
		
		vertices = face instanceof THREE.Face3 ? 3 : 4;

		if ( this.materialFaceGroup[ ghash ].vertices + vertices > 65535 ) {
			
			hash_map[ mhash ].counter += 1;
			ghash = hash_map[ mhash ].hash + "_" + hash_map[ mhash ].counter;
			
			if ( this.materialFaceGroup[ ghash ] == undefined ) {

				this.materialFaceGroup[ ghash ] = { 'faces': [], 'material': material, 'vertices': 0 };

			}
			
		}
		
		this.materialFaceGroup[ ghash ].faces.push( f );
		this.materialFaceGroup[ ghash ].vertices += vertices;
		

	}

};

THREE.Mesh.prototype.normalizeUVs = function () {

	var i, il, j, jl, uvs;

	for ( i = 0, il = this.geometry.uvs.length; i < il; i++ ) {

		uvs = this.geometry.uvs[ i ];

		for ( j = 0, jl = uvs.length; j < jl; j++ ) {

			// texture repeat
			// (WebGL does this by default but canvas renderer needs to do it explicitly)

			if( uvs[ j ].u != 1.0 ) uvs[ j ].u = uvs[ j ].u - Math.floor( uvs[ j ].u );
			if( uvs[ j ].v != 1.0 ) uvs[ j ].v = uvs[ j ].v - Math.floor( uvs[ j ].v );

		}

	}

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.LineColorMaterial = function ( hex, opacity, lineWidth ) {

	this.lineWidth = lineWidth || 1;

	this.color = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | hex );

};

THREE.LineColorMaterial.prototype = {

	toString: function () {

		return 'THREE.LineColorMaterial ( color: ' + this.color + ', lineWidth: ' + this.lineWidth + ' )';

	}

};

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.MeshPhongMaterial = function ( ambient, diffuse, specular, shininess, opacity ) {

	this.ambient = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | ambient );
	this.diffuse = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | diffuse );
	this.specular = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | specular );
    this.shininess = shininess;
    this.opacity = opacity;

	this.toString = function () {

		return 'THREE.MeshPhongMaterial ( <br/>ambient: ' + this.ambient 
                + ', <br/>diffuse: ' + this.diffuse 
                + ', <br/>specular: ' + this.specular 
                + ', <br/>shininess: ' + this.shininess 
                + ', <br/>opacity: ' + this.opacity + ')';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.MeshBitmapMaterial = function ( bitmap, mode ) {

	this.bitmap = bitmap;
	this.mode = mode || THREE.MeshBitmapMaterialMode.UVMAPPING;
    
    this.id = THREE.MeshBitmapMaterialCounter.value++;
    
	this.toString = function () {

		return 'THREE.MeshBitmapMaterial ( bitmap: ' + this.bitmap + ', mode: ' + this.mode + ', id: ' + this.id + ' )';

	};

};

THREE.MeshBitmapMaterialCounter = { value:0 };

THREE.MeshBitmapMaterialMode = { UVMAPPING: 0 };

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.MeshColorFillMaterial = function ( hex, opacity ) {

	this.color = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | hex );

	this.toString = function () {

		return 'THREE.MeshColorFillMaterial ( color: ' + this.color + ' )';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.MeshColorStrokeMaterial = function ( hex, opacity, lineWidth ) {

	this.lineWidth = lineWidth || 1;

	this.color = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | hex );

	this.toString = function () {

		return 'THREE.MeshColorStrokeMaterial ( lineWidth: ' + this.lineWidth + ', color: ' + this.color + ' )';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.MeshFaceMaterial = function () {

	this.toString = function () {

		return 'THREE.MeshFaceMaterial';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.ParticleBitmapMaterial = function ( bitmap ) {

	this.bitmap = bitmap;
	this.offset = new THREE.Vector2();

	this.toString = function () {

		return 'THREE.ParticleBitmapMaterial ( bitmap: ' + this.bitmap + ' )';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.ParticleCircleMaterial = function ( hex, opacity ) {

	this.color = new THREE.Color( ( opacity >= 0 ? ( opacity * 0xff ) << 24 : 0xff000000 ) | hex );

	this.toString = function () {

		return 'THREE.ParticleCircleMaterial ( color: ' + this.color + ' )';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.ParticleDOMMaterial = function ( domElement ) {

	this.domElement = domElement;

	this.toString = function () {

		return 'THREE.ParticleDOMMaterial ( domElement: ' + this.domElement + ' )';

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Scene = function () {

	this.objects = [];
	this.lights = [];

	this.addObject = function ( object ) {

		this.objects.push( object );

	};

	this.removeObject = function ( object ) {

		for ( var i = 0, l = this.objects.length; i < l; i++ ) {

			if ( object == this.objects[ i ] ) {

				this.objects.splice( i, 1 );
				return;

			}

		}

	};

	this.addLight = function ( light ) {

		this.lights.push( light );

	};

	this.removeLight = function ( light ) {

		for ( var i = 0, l = this.lights.length; i < l; i++ ) {

			if ( light == this.lights[ i ] ) {

				this.lights.splice( i, 1 );
				return;

			}

		}

	};

	this.toString = function () {

		return 'THREE.Scene ( ' + this.objects + ' )';
	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 */

THREE.Projector = function() {

	var _renderList = null,
	_face3, _face3Count, _face3Pool = [],
	_face4, _face4Count, _face4Pool = [],
	_line, _lineCount, _linePool = [],
	_particle, _particleCount, _particlePool = [],

	_vector4 = new THREE.Vector4(),
	_projScreenMatrix = new THREE.Matrix4(),
	_projScreenObjectMatrix = new THREE.Matrix4();

	this.projectScene = function ( scene, camera ) {

		var o, ol, v, vl, f, fl, objects, object, objectMatrix,
		vertices, vertex, vertexPositionScreen, vertex2,
		faces, face, v1, v2, v3, v4;

		_renderList = [];
		_face3Count = 0, _face4Count = 0, _lineCount = 0, _particleCount = 0;

		if( camera.autoUpdateMatrix ) {

			camera.updateMatrix();

		}

		_projScreenMatrix.multiply( camera.projectionMatrix, camera.matrix );

		objects = scene.objects;

		for ( o = 0, ol = objects.length; o < ol; o++ ) {

			object = objects[ o ];
			objectMatrix = object.matrix;

			if( object.autoUpdateMatrix ) {

				object.updateMatrix();

			}

			if ( object instanceof THREE.Mesh ) {

				_projScreenObjectMatrix.multiply( _projScreenMatrix, objectMatrix );

				// vertices

				vertices = object.geometry.vertices;

				for ( v = 0, vl = vertices.length; v < vl; v++ ) {

					vertex = vertices[ v ];

					vertexPositionScreen = vertex.positionScreen;
					vertexPositionScreen.copy( vertex.position );
					_projScreenObjectMatrix.transform( vertexPositionScreen );

					vertex.__visible = vertexPositionScreen.z > 0 && vertexPositionScreen.z < 1;

				}

				// faces

				faces = object.geometry.faces;

				for ( f = 0, fl = faces.length; f < fl; f++ ) {

					face = faces[ f ];

					if ( face instanceof THREE.Face3 ) {

						v1 = vertices[ face.a ]; v2 = vertices[ face.b ]; v3 = vertices[ face.c ];

						if ( v1.__visible && v2.__visible && v3.__visible ) {

							if ( ( object.doubleSided || ( object.flipSided !=
							   ( v3.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -
							   ( v3.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) < 0 ) ) ) {

								_face3 = _face3Pool[ _face3Count ] = _face3Pool[ _face3Count ] || new THREE.RenderableFace3();
								_face3.v1.copy( v1.positionScreen );
								_face3.v2.copy( v2.positionScreen );
								_face3.v3.copy( v3.positionScreen );

								_face3.normalWorld.copy( face.normal );
								object.matrixRotation.transform( _face3.normalWorld );

								_face3.centroidWorld.copy( face.centroid );
								objectMatrix.transform( _face3.centroidWorld );

								_face3.centroidScreen.copy( _face3.centroidWorld );
								_projScreenMatrix.transform( _face3.centroidScreen );

								_face3.z = _face3.centroidScreen.z;

								_face3.meshMaterial = object.material;
								_face3.faceMaterial = face.material;
								_face3.overdraw = object.overdraw;
								_face3.uvs = object.geometry.uvs[ f ];
								_face3.color = face.color;

								_renderList.push( _face3 );

								_face3Count ++;

							}

						}

					} else if ( face instanceof THREE.Face4 ) {

						v1 = vertices[ face.a ]; v2 = vertices[ face.b ]; v3 = vertices[ face.c ]; v4 = vertices[ face.d ];

						if ( v1.__visible && v2.__visible && v3.__visible && v4.__visible ) {

							if ( ( object.doubleSided || ( object.flipSided !=
							   ( ( v4.positionScreen.x - v1.positionScreen.x ) * ( v2.positionScreen.y - v1.positionScreen.y ) -
							   ( v4.positionScreen.y - v1.positionScreen.y ) * ( v2.positionScreen.x - v1.positionScreen.x ) < 0 ||
							   ( v2.positionScreen.x - v3.positionScreen.x ) * ( v4.positionScreen.y - v3.positionScreen.y ) -
							   ( v2.positionScreen.y - v3.positionScreen.y ) * ( v4.positionScreen.x - v3.positionScreen.x ) < 0 ) ) ) ) {

								_face4 = _face4Pool[ _face4Count ] = _face4Pool[ _face4Count ] || new THREE.RenderableFace4();
								_face4.v1.copy( v1.positionScreen );
								_face4.v2.copy( v2.positionScreen );
								_face4.v3.copy( v3.positionScreen );
								_face4.v4.copy( v4.positionScreen );

								_face4.normalWorld.copy( face.normal );
								object.matrixRotation.transform( _face4.normalWorld );

								_face4.centroidWorld.copy( face.centroid );
								objectMatrix.transform( _face4.centroidWorld );

								_face4.centroidScreen.copy( _face4.centroidWorld );
								_projScreenMatrix.transform( _face4.centroidScreen );

								_face4.z = _face4.centroidScreen.z;

								_face4.meshMaterial = object.material;
								_face4.faceMaterial = face.material;
								_face4.overdraw = object.overdraw;
								_face4.uvs = object.geometry.uvs[ f ];
								_face4.color = face.color;

								_renderList.push( _face4 );

								_face4Count ++;

							}

						}

					}

				}

			} else if ( object instanceof THREE.Line ) {

				_projScreenObjectMatrix.multiply( _projScreenMatrix, objectMatrix );

				vertices = object.geometry.vertices;

				for ( v = 0, vl = vertices.length; v < vl; v++ ) {

					vertex = vertices[ v ];

					vertexPositionScreen = vertex.positionScreen;
					vertexPositionScreen.copy( vertex.position );
					_projScreenObjectMatrix.transform( vertexPositionScreen );

					vertex.__visible = vertexPositionScreen.z > 0 && vertexPositionScreen.z < 1;

					if ( v > 0 ) {

						vertex2 = object.geometry.vertices[ v - 1 ];

						if ( vertex.__visible && vertex2.__visible ) {

							_line = _linePool[ _lineCount ] = _linePool[ _lineCount ] || new THREE.RenderableLine();
							_line.v1.copy( vertex.positionScreen );
							_line.v2.copy( vertex2.positionScreen );

							// TODO: Use centriums here too.
							_line.z = Math.max( vertex.positionScreen.z, vertex2.positionScreen.z );

							_line.material = object.material;

							_renderList.push( _line );

							_lineCount ++;

						}
					}
				}

			} else if ( object instanceof THREE.Particle ) {

				_vector4.set( object.position.x, object.position.y, object.position.z, 1 );

				camera.matrix.transform( _vector4 );
				camera.projectionMatrix.transform( _vector4 );

				object.screen.set( _vector4.x / _vector4.w, _vector4.y / _vector4.w, _vector4.z / _vector4.w );

				if ( object.screen.z > 0 && object.screen.z < 1 ) {

					_particle = _particlePool[ _particleCount ] = _particlePool[ _particleCount ] || new THREE.RenderableParticle();
					_particle.x = object.screen.x;
					_particle.y = object.screen.y;
					_particle.z = object.screen.z;

					_particle.rotation = object.rotation.z;

					_particle.scale.x = object.scale.x * Math.abs( _vector4.x / _vector4.w - ( _vector4.x + camera.projectionMatrix.n11 ) / ( _vector4.w + camera.projectionMatrix.n14 ) );
					_particle.scale.y = object.scale.y * Math.abs( _vector4.y / _vector4.w - ( _vector4.y + camera.projectionMatrix.n22 ) / ( _vector4.w + camera.projectionMatrix.n24 ) );
					_particle.material = object.material;
					_particle.color = object.color;

					_renderList.push( _particle );

					_particleCount ++;

				}

			}

		}

		_renderList.sort( function ( a, b ) { return b.z - a.z; } );

		return _renderList;

	};

	this.unprojectVector = function ( vector, camera ) {

		var vector2 = vector.clone(),
		matrix = new THREE.Matrix4();

		matrix.multiply( THREE.Matrix4.makeInvert( camera.matrix ), THREE.Matrix4.makeInvert( camera.projectionMatrix ) );
		matrix.transform( vector2 );

		return vector2;

	};

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.DOMRenderer = function () {

	THREE.Renderer.call( this );

	var _renderList = null,
	_projector = new THREE.Projector(),
	_div = document.createElement( 'div' ),
	_width, _height, _widthHalf, _heightHalf;

	this.domElement = _div;

	this.setSize = function ( width, height ) {

		_width = width; _height = height;
		_widthHalf = _width / 2; _heightHalf = _height / 2;

	};

	this.render = function ( scene, camera ) {

		var e, el, m, ml, element, material, dom, v1x, v1y;

		_renderList = _projector.projectScene( scene, camera );

		for ( e = 0, el = _renderList.length; e < el; e++ ) {

			element = _renderList[ e ];

			if ( element instanceof THREE.RenderableParticle ) {

				v1x = element.x * _widthHalf + _widthHalf; v1y = element.y * _heightHalf + _heightHalf;

				for ( m = 0, ml = element.material.length; m < ml; m++ ) {

					material = element.material[ m ];

					if ( material instanceof THREE.ParticleDOMMaterial ) {

						dom = material.domElement;
						dom.style.left = v1x + 'px';
						dom.style.top = v1y + 'px';

					}

				}

			}

		}

	};

}

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.CanvasRenderer = function () {

	var _renderList = null,
	_projector = new THREE.Projector(),

	_canvas = document.createElement( 'canvas' ),
	_canvasWidth, _canvasHeight, _canvasWidthHalf, _canvasHeightHalf,
	_context = _canvas.getContext( '2d' ),
	_clipRect = new THREE.Rectangle(),
	_clearRect = new THREE.Rectangle(),
	_bboxRect = new THREE.Rectangle(),

	_enableLighting = false,
	_color = new THREE.Color( 0xffffffff ),
	_light = new THREE.Color( 0xffffffff ),
	_ambientLight = new THREE.Color( 0xffffffff ),

	_pi2 = Math.PI * 2,
	_vector2 = new THREE.Vector2(), // Needed for expand
	_vector3 = new THREE.Vector3(), // Needed for PointLight
	_uv1 = new THREE.UV(), _uv2 = new THREE.UV(), _uv3 = new THREE.UV(), _uv4 = new THREE.UV(),
	v5 = new THREE.Vector2(), v6 = new THREE.Vector2(); // Needed for latter splitting tris to quads

	this.domElement = _canvas;
	this.autoClear = true;

	this.setSize = function ( width, height ) {

		_canvasWidth = width; _canvasHeight = height;
		_canvasWidthHalf = _canvasWidth / 2; _canvasHeightHalf = _canvasHeight / 2;

		_canvas.width = _canvasWidth;
		_canvas.height = _canvasHeight;

		_clipRect.set( - _canvasWidthHalf, - _canvasHeightHalf, _canvasWidthHalf, _canvasHeightHalf );

	};

	this.clear = function () {

		if ( !_clearRect.isEmpty() ) {

			_clearRect.inflate( 1 );
			_clearRect.minSelf( _clipRect );

			_context.setTransform( 1, 0, 0, - 1, _canvasWidthHalf, _canvasHeightHalf );
			_context.clearRect( _clearRect.getX(), _clearRect.getY(), _clearRect.getWidth(), _clearRect.getHeight() );

			_clearRect.empty();

		}
	};

	this.render = function ( scene, camera ) {

		var e, el, element, m, ml, fm, fml, material,
		v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5x, v5y, v6x, v6y;

		if ( this.autoClear ) {

			this.clear();

		}

		_renderList = _projector.projectScene( scene, camera );

		_context.setTransform( 1, 0, 0, - 1, _canvasWidthHalf, _canvasHeightHalf );

		
		_context.fillStyle = 'rgba(0, 255, 255, 0.5)';
		_context.fillRect( _clipRect.getX(), _clipRect.getY(), _clipRect.getWidth(), _clipRect.getHeight() );
		

		_enableLighting = scene.lights.length > 0;

		if ( _enableLighting ) {

			calculateAmbientLight( scene, _ambientLight );

		}

		for ( e = 0, el = _renderList.length; e < el; e++ ) {

			element = _renderList[ e ];

			_bboxRect.empty();

			if ( element instanceof THREE.RenderableParticle ) {

				v1x = element.x * _canvasWidthHalf; v1y = element.y * _canvasHeightHalf;

				for ( m = 0, ml = element.material.length; m < ml; m++ ) {

					material = element.material[ m ];

					renderParticle( v1x, v1y, element, material, scene );

				}

			} else if ( element instanceof THREE.RenderableLine ) {

				v1x = element.v1.x * _canvasWidthHalf; v1y = element.v1.y * _canvasHeightHalf;
				v2x = element.v2.x * _canvasWidthHalf; v2y = element.v2.y * _canvasHeightHalf;

				_bboxRect.addPoint( v1x, v1y );
				_bboxRect.addPoint( v2x, v2y );

				if ( !_clipRect.instersects( _bboxRect ) ) {

					continue;

				}

				_context.beginPath();
				_context.moveTo( v1x, v1y );
				_context.lineTo( v2x, v2y );
				_context.closePath();

				for ( m = 0, ml = element.material.length; m < ml; m++ ) {

					material = element.material[ m ];

					renderLine( v1x, v1y, v2x, v2y, element, material, scene );

				}

			} else if ( element instanceof THREE.RenderableFace3 ) {

				element.v1.x *= _canvasWidthHalf; element.v1.y *= _canvasHeightHalf;
				element.v2.x *= _canvasWidthHalf; element.v2.y *= _canvasHeightHalf;
				element.v3.x *= _canvasWidthHalf; element.v3.y *= _canvasHeightHalf;

				if ( element.overdraw ) {

					expand( element.v1, element.v2 );
					expand( element.v2, element.v3 );
					expand( element.v3, element.v1 );

				}

				v1x = element.v1.x; v1y = element.v1.y;
				v2x = element.v2.x; v2y = element.v2.y;
				v3x = element.v3.x; v3y = element.v3.y;

				_bboxRect.addPoint( v1x, v1y );
				_bboxRect.addPoint( v2x, v2y );
				_bboxRect.addPoint( v3x, v3y );

				if ( !_clipRect.instersects( _bboxRect ) ) {

					continue;

				}

				m = 0; ml = element.meshMaterial.length;

				while ( m < ml ) {

					material = element.meshMaterial[ m ++ ];

					if ( material instanceof THREE.MeshFaceMaterial ) {

						fm = 0; fml = element.faceMaterial.length;

						while ( fm < fml ) {

							material = element.faceMaterial[ fm ++ ];

							renderFace3( v1x, v1y, v2x, v2y, v3x, v3y, element, material, scene );

						}

						continue;

					}

					renderFace3( v1x, v1y, v2x, v2y, v3x, v3y, element, material, scene );

				}

			} else if ( element instanceof THREE.RenderableFace4 ) {

				element.v1.x *= _canvasWidthHalf; element.v1.y *= _canvasHeightHalf;
				element.v2.x *= _canvasWidthHalf; element.v2.y *= _canvasHeightHalf;
				element.v3.x *= _canvasWidthHalf; element.v3.y *= _canvasHeightHalf;
				element.v4.x *= _canvasWidthHalf; element.v4.y *= _canvasHeightHalf;

				v5.copy( element.v2 ); v6.copy( element.v4 );

				if ( element.overdraw ) {

					expand( element.v1, element.v2 );
					expand( element.v2, element.v4 );
					expand( element.v4, element.v1 );

				}

				v1x = element.v1.x; v1y = element.v1.y;
				v2x = element.v2.x; v2y = element.v2.y;
				v4x = element.v4.x; v4y = element.v4.y;

				if ( element.overdraw ) {

					expand( element.v3, v5 );
					expand( element.v3, v6 );

				}

				v3x = element.v3.x; v3y = element.v3.y;
				v5x = v5.x; v5y = v5.y;
				v6x = v6.x; v6y = v6.y;

				_bboxRect.addPoint( v1x, v1y );
				_bboxRect.addPoint( v2x, v2y );
				_bboxRect.addPoint( v3x, v3y );
				_bboxRect.addPoint( v4x, v4y );

				if ( !_clipRect.instersects( _bboxRect ) ) {

					continue;

				}

				m = 0; ml = element.meshMaterial.length;

				while ( m < ml ) {

					material = element.meshMaterial[ m ++ ];

					if ( material instanceof THREE.MeshFaceMaterial ) {

						fm = 0; fml = element.faceMaterial.length;

						while ( fm < fml ) {

							material = element.faceMaterial[ fm ++ ];

							renderFace4( v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5x, v5y, v6x, v6y, element, material, scene );

						}

						continue;

					}

					renderFace4( v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5x, v5y, v6x, v6y, element, material, scene );

				}

			}

			/*
			_context.lineWidth = 1;
			_context.strokeStyle = 'rgba( 0, 255, 0, 0.5 )';
			_context.strokeRect( _bboxRect.getX(), _bboxRect.getY(), _bboxRect.getWidth(), _bboxRect.getHeight() );
			*/

			_clearRect.addRectangle( _bboxRect );


		}

		
		_context.lineWidth = 1;
		_context.strokeStyle = 'rgba( 255, 0, 0, 0.5 )';
		_context.strokeRect( _clearRect.getX(), _clearRect.getY(), _clearRect.getWidth(), _clearRect.getHeight() );
		

		_context.setTransform( 1, 0, 0, 1, 0, 0 );

	};

	function calculateAmbientLight( scene, color ) {

		var l, ll, light;

		color.setRGBA( 0, 0, 0, 1 );

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.AmbientLight ) {

				color.r += light.color.r;
				color.g += light.color.g;
				color.b += light.color.b;

			}

		}

	}

	function calculateLight( scene, element, color ) {

		var l, ll, light;

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.DirectionalLight ) {

				color.r += light.color.r;
				color.g += light.color.g;
				color.b += light.color.b;

			} else if ( light instanceof THREE.PointLight ) {

				color.r += light.color.r;
				color.g += light.color.g;
				color.b += light.color.b;

			}

		}

	}

	function calculateFaceLight( scene, element, color ) {

		var l, ll, light, amount;

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.DirectionalLight ) {

				amount = element.normalWorld.dot( light.position ) * light.intensity;

				if ( amount > 0 ) {

					color.r += light.color.r * amount;
					color.g += light.color.g * amount;
					color.b += light.color.b * amount;

				}

			} else if ( light instanceof THREE.PointLight ) {

				_vector3.sub( light.position, element.centroidWorld );
				_vector3.normalize();

				amount = element.normalWorld.dot( _vector3 ) * light.intensity;

				if ( amount > 0 ) {

					color.r += light.color.r * amount;
					color.g += light.color.g * amount;
					color.b += light.color.b * amount;

				}

			}

		}

	}

	function renderParticle ( v1x, v1y, element, material, scene ) {
	
		var width, height, scaleX, scaleY, offsetX, offsetY,
		bitmap, bitmapWidth, bitmapHeight;

		if ( material instanceof THREE.ParticleCircleMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			width = element.scale.x * _canvasWidthHalf;
			height = element.scale.y * _canvasHeightHalf;

			_bboxRect.set( v1x - width, v1y - height, v1x + width, v1y + height );

			if ( !_clipRect.instersects( _bboxRect ) ) {

				return;

			}

			_context.save();
			_context.translate( v1x, v1y );
			_context.rotate( - element.rotation );
			_context.scale( width, height );

			_context.beginPath();
			_context.arc( 0, 0, 1, 0, _pi2, true );
			_context.closePath();

			_context.fillStyle = _color.__styleString;
			_context.fill();

			_context.restore();

		} else if ( material instanceof THREE.ParticleBitmapMaterial ) {

			bitmap = material.bitmap;
			bitmapWidth = bitmap.width / 2;
			bitmapHeight = bitmap.height / 2;

			scaleX = element.scale.x * _canvasWidthHalf;
			scaleY = element.scale.y * _canvasHeightHalf;

			width = scaleX * bitmapWidth;
			height = scaleY * bitmapHeight;

			offsetX = material.offset.x * scaleX;
			offsetY = material.offset.y * scaleY;

			// TODO: Rotations break this...

			_bboxRect.set( v1x + offsetX - width, v1y + offsetY - height, v1x + offsetX + width, v1y + offsetY + height );

			if ( !_clipRect.instersects( _bboxRect ) ) {

				return;

			}

			_context.save();
			_context.translate( v1x, v1y );
			_context.rotate( - element.rotation );
			_context.scale( scaleX, - scaleY );
			_context.translate( - bitmapWidth + material.offset.x, - bitmapHeight - material.offset.y );

			_context.drawImage( bitmap, 0, 0 );

			_context.restore();

			
			_context.beginPath();
			_context.moveTo( v1x - 10, v1y );
			_context.lineTo( v1x + 10, v1y );
			_context.moveTo( v1x, v1y - 10 );
			_context.lineTo( v1x, v1y + 10 );
			_context.closePath();
			_context.strokeStyle = 'rgb(255,255,0)';
			_context.stroke();
			

		}

	}

	function renderLine( v1x, v1y, v2x, v2y, element, material, scene ) {

		if ( material instanceof THREE.LineColorMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_context.lineWidth = material.lineWidth;
			_context.lineJoin = "round";
			_context.lineCap = "round";

			_context.strokeStyle = _color.__styleString;
			_context.stroke();

			_bboxRect.inflate( _context.lineWidth );

		}

	}

	function renderFace3( v1x, v1y, v2x, v2y, v3x, v3y, element, material, scene ) {

		var bitmap, bitmapWidth, bitmapHeight;

		if ( material instanceof THREE.MeshColorFillMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_context.beginPath();
			_context.moveTo( v1x, v1y );
			_context.lineTo( v2x, v2y );
			_context.lineTo( v3x, v3y );
			_context.lineTo( v1x, v1y );
			_context.closePath();

			_context.fillStyle = _color.__styleString;
			_context.fill();

		} else if ( material instanceof THREE.MeshColorStrokeMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_context.beginPath();
			_context.moveTo( v1x, v1y );
			_context.lineTo( v2x, v2y );
			_context.lineTo( v3x, v3y );
			_context.lineTo( v1x, v1y );
			_context.closePath();

			_context.lineWidth = material.lineWidth;
			_context.lineJoin = "round";
			_context.lineCap = "round";

			_context.strokeStyle = _color.__styleString;
			_context.stroke();

			_bboxRect.inflate( _context.lineWidth );

		} else if ( material instanceof THREE.MeshBitmapMaterial ) {

			bitmap = material.bitmap;
			bitmapWidth = bitmap.width - 1;
			bitmapHeight = bitmap.height - 1;

			
			if ( !element.uvs[ 0 ] || !element.uvs[ 1 ] || !element.uvs[ 2 ]) {

				_context.beginPath();
				_context.moveTo( v1x, v1y );
				_context.lineTo( v2x, v2y );
				_context.lineTo( v3x, v3y );
				_context.lineTo( v1x, v1y );
				_context.closePath();

				_context.fillStyle = 'rgb(0, 255, 0)';
				_context.fill();

				return;

			}
			

			_uv1.copy( element.uvs[ 0 ] );
			_uv2.copy( element.uvs[ 1 ] );
			_uv3.copy( element.uvs[ 2 ] );

			_uv1.u *= bitmapWidth; _uv1.v *= bitmapHeight;
			_uv2.u *= bitmapWidth; _uv2.v *= bitmapHeight;
			_uv3.u *= bitmapWidth; _uv3.v *= bitmapHeight;

			drawTexturedTriangle( bitmap, v1x, v1y, v2x, v2y, v3x, v3y, _uv1.u, _uv1.v, _uv2.u, _uv2.v, _uv3.u, _uv3.v );

		}

	}

	function renderFace4 ( v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, v5x, v5y, v6x, v6y, element, material, scene ) {

		var bitmap, bitmapWidth, bitmapHeight;

		if ( material instanceof THREE.MeshColorFillMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_context.beginPath();
			_context.moveTo( v1x, v1y );
			_context.lineTo( v2x, v2y );
			_context.lineTo( v3x, v3y );
			_context.lineTo( v4x, v4y );
			_context.lineTo( v1x, v1y );
			_context.closePath();

			_context.fillStyle = _color.__styleString;
			_context.fill();


		} else if ( material instanceof THREE.MeshColorStrokeMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_context.beginPath();
			_context.moveTo( v1x, v1y );
			_context.lineTo( v2x, v2y );
			_context.lineTo( v3x, v3y );
			_context.lineTo( v4x, v4y );
			_context.lineTo( v1x, v1y );
			_context.closePath();

			_context.lineWidth = material.lineWidth;
			_context.lineJoin = "round";
			_context.lineCap = "round";

			_context.strokeStyle = _color.__styleString;
			_context.stroke();

			_bboxRect.inflate( _context.lineWidth );

		} else if ( material instanceof THREE.MeshBitmapMaterial ) {

			bitmap = material.bitmap;
			bitmapWidth = bitmap.width - 1;
			bitmapHeight = bitmap.height - 1;

			
			if ( !element.uvs[ 0 ] || !element.uvs[ 1 ] || !element.uvs[ 2 ] || !element.uvs[ 3 ] || !element.uvs[ 4 ] ) {

				_context.beginPath();
				_context.moveTo( v1x, v1y );
				_context.lineTo( v2x, v2y );
				_context.lineTo( v3x, v3y );
				_context.lineTo( v4x, v4y );
				_context.lineTo( v1x, v1y );
				_context.closePath();

				_context.fillStyle = 'rgb(255, 0, 255)';
				_context.fill();

				return;

			}
			

			_uv1.copy( element.uvs[ 0 ] );
			_uv2.copy( element.uvs[ 1 ] );
			_uv3.copy( element.uvs[ 2 ] );
			_uv4.copy( element.uvs[ 3 ] );

			_uv1.u *= bitmapWidth; _uv1.v *= bitmapHeight;
			_uv2.u *= bitmapWidth; _uv2.v *= bitmapHeight;
			_uv3.u *= bitmapWidth; _uv3.v *= bitmapHeight;
			_uv4.u *= bitmapWidth; _uv4.v *= bitmapHeight;

			drawTexturedTriangle( bitmap, v1x, v1y, v2x, v2y, v4x, v4y, _uv1.u, _uv1.v, _uv2.u, _uv2.v, _uv4.u, _uv4.v );
			drawTexturedTriangle( bitmap, v5x, v5y, v3x, v3y, v6x, v6y, _uv2.u, _uv2.v, _uv3.u, _uv3.v, _uv4.u, _uv4.v );

		}

	}

	function drawTexturedTriangle( bitmap, v1x, v1y, v2x, v2y, v3x, v3y, _uv1u, _uv1v, _uv2u, _uv2v, _uv3u, _uv3v ) {

		// Textured triangle drawing by Thatcher Ulrich.
		// http://tulrich.com/geekstuff/canvas/jsgl.js

		var denom, m11, m12, m21, m22, dx, dy;

		_context.beginPath();
		_context.moveTo( v1x, v1y );
		_context.lineTo( v2x, v2y );
		_context.lineTo( v3x, v3y );
		_context.lineTo( v1x, v1y );
		_context.closePath();

		_context.save();
		_context.clip();

		denom = _uv1u * ( _uv3v - _uv2v ) - _uv2u * _uv3v + _uv3u * _uv2v + ( _uv2u - _uv3u ) * _uv1v;

		m11 = - ( _uv1v * (v3x - v2x ) - _uv2v * v3x + _uv3v * v2x + ( _uv2v - _uv3v ) * v1x ) / denom;
		m12 = ( _uv2v * v3y + _uv1v * ( v2y - v3y ) - _uv3v * v2y + ( _uv3v - _uv2v) * v1y ) / denom;
		m21 = ( _uv1u * ( v3x - v2x ) - _uv2u * v3x + _uv3u * v2x + ( _uv2u - _uv3u ) * v1x ) / denom;
		m22 = - ( _uv2u * v3y + _uv1u * ( v2y - v3y ) - _uv3u * v2y + ( _uv3u - _uv2u ) * v1y ) / denom;
		dx = ( _uv1u * ( _uv3v * v2x - _uv2v * v3x ) + _uv1v * ( _uv2u * v3x - _uv3u * v2x ) + ( _uv3u * _uv2v - _uv2u * _uv3v ) * v1x ) / denom;
		dy = ( _uv1u * ( _uv3v * v2y - _uv2v * v3y ) + _uv1v * ( _uv2u * v3y - _uv3u * v2y ) + ( _uv3u * _uv2v - _uv2u * _uv3v ) * v1y ) / denom;

		_context.transform( m11, m12, m21, m22, dx, dy );

		_context.drawImage( bitmap, 0, 0 );
		_context.restore();

	}

	// Hide anti-alias gaps

	function expand( a, b ) {

		_vector2.sub( b, a );
		_vector2.unit();
		_vector2.multiplyScalar( 0.75 );

		b.addSelf( _vector2 );
		a.subSelf( _vector2 );

	}

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.SVGRenderer = function () {

	var _renderList = null,
	_projector = new THREE.Projector(),
	_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
	_svgWidth, _svgHeight, _svgWidthHalf, _svgHeightHalf,
	_clipRect = new THREE.Rectangle(),
	_bboxRect = new THREE.Rectangle(),

	_enableLighting = false,
	_color = new THREE.Color( 0xffffffff ),
	_light = new THREE.Color( 0xffffffff ),
	_ambientLight = new THREE.Color( 0xffffffff ),

	_vector3 = new THREE.Vector3(), // Needed for PointLight

	_svgPathPool = [], _svgCirclePool = [],
	_svgNode, _pathCount, _circleCount,
	_quality = 1;

	this.domElement = _svg;
	this.autoClear = true;

	this.setQuality = function( quality ) {

		switch(quality) {

			case "high": _quality = 1; break;
			case "low": _quality = 0; break;

		}

	};

	this.setSize = function ( width, height ) {

		_svgWidth = width; _svgHeight = height;
		_svgWidthHalf = _svgWidth / 2; _svgHeightHalf = _svgHeight / 2;

		_svg.setAttribute( 'viewBox', ( - _svgWidthHalf ) + ' ' + ( - _svgHeightHalf ) + ' ' + _svgWidth + ' ' + _svgHeight );
		_svg.setAttribute( 'width', _svgWidth );
		_svg.setAttribute( 'height', _svgHeight );

		_clipRect.set( - _svgWidthHalf, - _svgHeightHalf, _svgWidthHalf, _svgHeightHalf );

	};

	this.clear = function () {

		while ( _svg.childNodes.length > 0 ) {

			_svg.removeChild( _svg.childNodes[ 0 ] );

		}

	};

	this.render = function ( scene, camera ) {

		var e, el, m, ml, fm, fml, element, material,
		v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y;

		if ( this.autoClear ) {

			this.clear();

		}

		_renderList = _projector.projectScene( scene, camera );

		_pathCount = 0; _circleCount = 0;

		_enableLighting = scene.lights.length > 0;

		if ( _enableLighting ) {

			calculateAmbientLight( scene, _ambientLight );

		}

		for ( e = 0, el = _renderList.length; e < el; e++ ) {

			element = _renderList[ e ];

			_bboxRect.empty();

			if ( element instanceof THREE.RenderableParticle ) {

				v1x = element.x * _svgWidthHalf; v1y = element.y * -_svgHeightHalf;

				for ( m = 0, ml = element.material.length; m < ml; m++ ) {

					material = element.material[ m ];

					renderParticle( v1x, v1y, element, material, scene );

				}

			}/* else if ( element instanceof THREE.RenderableLine ) {



			}*/ else if ( element instanceof THREE.RenderableFace3 ) {

				v1x = element.v1.x * _svgWidthHalf; v1y = element.v1.y * -_svgHeightHalf;
				v2x = element.v2.x * _svgWidthHalf; v2y = element.v2.y * -_svgHeightHalf;
				v3x = element.v3.x * _svgWidthHalf; v3y = element.v3.y * -_svgHeightHalf;

				_bboxRect.addPoint( v1x, v1y );
				_bboxRect.addPoint( v2x, v2y );
				_bboxRect.addPoint( v3x, v3y );

				if ( !_clipRect.instersects( _bboxRect ) ) {

					continue;

				}

				m = 0; ml = element.meshMaterial.length;

				while ( m < ml ) {

					material = element.meshMaterial[ m ++ ];

					if ( material instanceof THREE.MeshFaceMaterial ) {

						fm = 0; fml = element.faceMaterial.length;

						while ( fm < fml ) {

							material = element.faceMaterial[ fm ++ ];

							renderFace3( v1x, v1y, v2x, v2y, v3x, v3y, element, material, scene );

						}

						continue;

					}

					renderFace3( v1x, v1y, v2x, v2y, v3x, v3y, element, material, scene );

				}

			} else if ( element instanceof THREE.RenderableFace4 ) {

				v1x = element.v1.x * _svgWidthHalf; v1y = element.v1.y * -_svgHeightHalf;
				v2x = element.v2.x * _svgWidthHalf; v2y = element.v2.y * -_svgHeightHalf;
				v3x = element.v3.x * _svgWidthHalf; v3y = element.v3.y * -_svgHeightHalf;
				v4x = element.v4.x * _svgWidthHalf; v4y = element.v4.y * -_svgHeightHalf;

				_bboxRect.addPoint( v1x, v1y );
				_bboxRect.addPoint( v2x, v2y );
				_bboxRect.addPoint( v3x, v3y );
				_bboxRect.addPoint( v4x, v4y );

				if ( !_clipRect.instersects( _bboxRect) ) {

					continue;

				}

				m = 0; ml = element.meshMaterial.length;

				while ( m < ml ) {

					material = element.meshMaterial[ m ++ ];

					if ( material instanceof THREE.MeshFaceMaterial ) {

						fm = 0; fml = element.faceMaterial.length;

						while ( fm < fml ) {

							material = element.faceMaterial[ fm ++ ];

							renderFace4( v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, element, material, scene );

						}

						continue;

					}

					renderFace4( v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, element, material, scene );

				}

			}

		}

	};

	function calculateAmbientLight( scene, color ) {

		var l, ll, light;

		color.setRGBA( 0, 0, 0, 1 );

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.AmbientLight ) {

				color.r += light.color.r;
				color.g += light.color.g;
				color.b += light.color.b;

			}

		}

	}

	function calculateLight( scene, element, color ) {

		var l, ll, light;

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.DirectionalLight ) {

				color.r += light.color.r;
				color.g += light.color.g;
				color.b += light.color.b;

			} else if ( light instanceof THREE.PointLight ) {

				color.r += light.color.r;
				color.g += light.color.g;
				color.b += light.color.b;

			}

		}

	}

	function calculateFaceLight( scene, element, color ) {

		var l, ll, light, amount;

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.DirectionalLight ) {

				amount = element.normalWorld.dot( light.position ) * light.intensity;

				if ( amount > 0 ) {

					color.r += light.color.r * amount;
					color.g += light.color.g * amount;
					color.b += light.color.b * amount;

				}

			} else if ( light instanceof THREE.PointLight ) {

				_vector3.sub( light.position, element.centroidWorld );
				_vector3.normalize();

				amount = element.normalWorld.dot( _vector3 ) * light.intensity;

				if ( amount > 0 ) {

					color.r += light.color.r * amount;
					color.g += light.color.g * amount;
					color.b += light.color.b * amount;

				}

			}

		}

	}

	function renderParticle ( v1x, v1y, element, material, scene ) {

		_svgNode = getCircleNode( _circleCount++ );
		_svgNode.setAttribute( 'cx', v1x );
		_svgNode.setAttribute( 'cy', v1y );
		_svgNode.setAttribute( 'r', element.scale.x * _svgWidthHalf );

		if ( material instanceof THREE.ParticleCircleMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_svgNode.setAttribute( 'style', 'fill: ' + _color.__styleString );

		}

		_svg.appendChild( _svgNode );

	}
	
	/*
	function renderLine ( ) {
	
		
	
	}
	*/
	
	function renderFace3 ( v1x, v1y, v2x, v2y, v3x, v3y, element, material, scene ) {

		_svgNode = getPathNode( _pathCount ++ );
		_svgNode.setAttribute( 'd', 'M ' + v1x + ' ' + v1y + ' L ' + v2x + ' ' + v2y + ' L ' + v3x + ',' + v3y + 'z' );

		if ( material instanceof THREE.MeshColorFillMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_svgNode.setAttribute( 'style', 'fill: ' + _color.__styleString );

		} else if ( material instanceof THREE.MeshColorStrokeMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_svgNode.setAttribute( 'style', 'fill: none; stroke: ' + _color.__styleString + '; stroke-width: ' + material.lineWidth + '; stroke-linecap: round; stroke-linejoin: round' );

		}

		_svg.appendChild( _svgNode );

	}

	function renderFace4 ( v1x, v1y, v2x, v2y, v3x, v3y, v4x, v4y, element, material, scene ) {

		_svgNode = getPathNode( _pathCount ++ );
		_svgNode.setAttribute( 'd', 'M ' + v1x + ' ' + v1y + ' L ' + v2x + ' ' + v2y + ' L ' + v3x + ',' + v3y + ' L ' + v4x + ',' + v4y + 'z' );

		if ( material instanceof THREE.MeshColorFillMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_svgNode.setAttribute( 'style', 'fill: ' + _color.__styleString );

		} else if ( material instanceof THREE.MeshColorStrokeMaterial ) {

			if ( _enableLighting ) {

				_light.copyRGB( _ambientLight );
				calculateFaceLight( scene, element, _light );

				_color.copyRGBA( material.color );
				_color.multiplySelfRGB( _light );
				_color.updateStyleString();

			} else {

				_color = material.color;

			}

			_svgNode.setAttribute( 'style', 'fill: none; stroke: ' + _color.__styleString + '; stroke-width: ' + material.lineWidth + '; stroke-linecap: round; stroke-linejoin: round' );

		}

		_svg.appendChild( _svgNode );

	}

	function getPathNode ( id ) {

		if ( _svgPathPool[ id ] == null ) {

			_svgPathPool[ id ] = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );

			if ( _quality == 0 ) {

				_svgPathPool[ id ].setAttribute( 'shape-rendering', 'crispEdges' ); //optimizeSpeed

			}

			return _svgPathPool[ id ];

		}

		return _svgPathPool[ id ];

	}

	function getCircleNode ( id ) {

		if ( _svgCirclePool[id] == null ) {

			_svgCirclePool[ id ] = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );

			if ( _quality == 0 ) {

				_svgCirclePool[id].setAttribute( 'shape-rendering', 'crispEdges' ); //optimizeSpeed

			}

			return _svgCirclePool[ id ];

		}

		return _svgCirclePool[ id ];

	}

};

/**
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 */

THREE.WebGLRenderer = function ( scene ) {
	
	// Currently you can use just up to 5 directional / point lights total.
	// Chrome barfs on shader linking when there are more than 5 lights :(
		
	// It seems problem comes from having too many varying vectors.
	
	// Weirdly, this is not GPU limitation as the same shader works ok in Firefox.
	// This difference could come from Chrome using ANGLE on Windows, 
	// thus going DirectX9 route (while FF uses OpenGL).
	
	var _canvas = document.createElement( 'canvas' ), _gl, _program,
	_modelViewMatrix = new THREE.Matrix4(), _normalMatrix,
	
	COLORFILL = 0, COLORSTROKE = 1, BITMAP = 2, PHONG = 3, // material constants used in shader
	
	maxLightCount = allocateLights( scene, 5 );
	
	this.domElement = _canvas;
	this.autoClear = true;

	initGL();
	initProgram( maxLightCount.directional, maxLightCount.point );
	
	// Querying via gl.getParameter() reports different values for CH and FF for many max parameters.
	// On my GPU Chrome reports MAX_VARYING_VECTORS = 8, FF reports 0 yet compiles shaders with many
	// more varying vectors (up to 29 lights are ok, more start to throw warnings to FF error console
	// and then crash the browser).
	
	//alert( dumpObject( getGLParams() ) );
	
	
	function allocateLights( scene, maxLights ) {

		// heuristics to create shader parameters according to lights in the scene
		// (not to blow over maxLights budget)
		
		if ( scene ) {

			var l, ll, light, dirLights = pointLights = maxDirLights = maxPointLights = 0;
			
			for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {
				
				light = scene.lights[ l ];
				
				if ( light instanceof THREE.DirectionalLight ) dirLights++;
				if ( light instanceof THREE.PointLight ) pointLights++;
				
			}
			
			if ( ( pointLights + dirLights ) <= maxLights ) {
				
				maxDirLights = dirLights;
				maxPointLights = pointLights;
			
			} else {
				
				maxDirLights = Math.ceil( maxLights * dirLights / ( pointLights + dirLights ) );
				maxPointLights = maxLights - maxDirLights;
				
			}
			
			return { 'directional' : maxDirLights, 'point' : maxPointLights };
			
		}
		
		return { 'directional' : 1, 'point' : maxLights - 1 };
		
	};

	this.setSize = function ( width, height ) {

		_canvas.width = width;
		_canvas.height = height;
		_gl.viewport( 0, 0, _canvas.width, _canvas.height );

	};

	this.clear = function () {

		_gl.clear( _gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT );

	};

	this.setupLights = function ( scene ) {

		var l, ll, light, r, g, b,
		    ambientLights = [], pointLights = [], directionalLights = [],
			colors = [], positions = [];

		_gl.uniform1i( _program.enableLighting, scene.lights.length );

		for ( l = 0, ll = scene.lights.length; l < ll; l++ ) {

			light = scene.lights[ l ];

			if ( light instanceof THREE.AmbientLight ) {

				ambientLights.push( light );

			} else if ( light instanceof THREE.DirectionalLight ) {

				directionalLights.push( light );

			} else if( light instanceof THREE.PointLight ) {

				pointLights.push( light );
				
			}

		}
		
		// sum all ambient lights
		r = g = b = 0.0;
		
		for ( l = 0, ll = ambientLights.length; l < ll; l++ ) {
			
			r += ambientLights[ l ].color.r;
			g += ambientLights[ l ].color.g;
			b += ambientLights[ l ].color.b;
			
		}
		
		_gl.uniform3f( _program.ambientLightColor, r, g, b );

		// pass directional lights as float arrays
		
		colors = []; positions = [];
		
		for ( l = 0, ll = directionalLights.length; l < ll; l++ ) {
			
			light = directionalLights[ l ];
			
			colors.push( light.color.r * light.intensity );
			colors.push( light.color.g * light.intensity );
			colors.push( light.color.b * light.intensity );

			positions.push( light.position.x );
			positions.push( light.position.y );
			positions.push( light.position.z );
			
		}
		
		if ( directionalLights.length ) {

			_gl.uniform1i(  _program.directionalLightNumber, directionalLights.length );
			_gl.uniform3fv( _program.directionalLightDirection, positions );
			_gl.uniform3fv( _program.directionalLightColor, colors );
			
		}

		// pass point lights as float arrays
		
		colors = []; positions = [];
		
		for ( l = 0, ll = pointLights.length; l < ll; l++ ) {
			
			light = pointLights[ l ];
			
			colors.push( light.color.r * light.intensity );
			colors.push( light.color.g * light.intensity );
			colors.push( light.color.b * light.intensity );

			positions.push( light.position.x );
			positions.push( light.position.y );
			positions.push( light.position.z );
			
		}
		
		if ( pointLights.length ) {

			_gl.uniform1i(  _program.pointLightNumber, pointLights.length );
			_gl.uniform3fv( _program.pointLightPosition, positions );
			_gl.uniform3fv( _program.pointLightColor, colors );
		
		}
		
	};

	this.createBuffers = function ( object, mf ) {

		var f, fl, fi, face, vertexNormals, normal, uv, v1, v2, v3, v4,

		materialFaceGroup = object.materialFaceGroup[ mf ],

		faceArray = [],
		lineArray = [],

		vertexArray = [],
		normalArray = [],
		uvArray = [],

		vertexIndex = 0;

		for ( f = 0, fl = materialFaceGroup.faces.length; f < fl; f++ ) {

			fi = materialFaceGroup.faces[f];

			face = object.geometry.faces[ fi ];
			vertexNormals = face.vertexNormals;
			normal = face.normal;
			uv = object.geometry.uvs[ fi ];

			if ( face instanceof THREE.Face3 ) {

				v1 = object.geometry.vertices[ face.a ].position;
				v2 = object.geometry.vertices[ face.b ].position;
				v3 = object.geometry.vertices[ face.c ].position;

				vertexArray.push( v1.x, v1.y, v1.z );
				vertexArray.push( v2.x, v2.y, v2.z );
				vertexArray.push( v3.x, v3.y, v3.z );

				if ( vertexNormals.length == 3 ) {

					normalArray.push( vertexNormals[0].x, vertexNormals[0].y, vertexNormals[0].z );
					normalArray.push( vertexNormals[1].x, vertexNormals[1].y, vertexNormals[1].z );
					normalArray.push( vertexNormals[2].x, vertexNormals[2].y, vertexNormals[2].z );

				} else {

					normalArray.push( normal.x, normal.y, normal.z );
					normalArray.push( normal.x, normal.y, normal.z );
					normalArray.push( normal.x, normal.y, normal.z );

				}

				if ( uv ) {

					uvArray.push( uv[0].u, uv[0].v );
					uvArray.push( uv[1].u, uv[1].v );
					uvArray.push( uv[2].u, uv[2].v );

				}

				faceArray.push( vertexIndex, vertexIndex + 1, vertexIndex + 2 );

				// TODO: don't add lines that already exist (faces sharing edge)

				lineArray.push( vertexIndex, vertexIndex + 1 );
				lineArray.push( vertexIndex, vertexIndex + 2 );
				lineArray.push( vertexIndex + 1, vertexIndex + 2 );

				vertexIndex += 3;

			} else if ( face instanceof THREE.Face4 ) {

				v1 = object.geometry.vertices[ face.a ].position;
				v2 = object.geometry.vertices[ face.b ].position;
				v3 = object.geometry.vertices[ face.c ].position;
				v4 = object.geometry.vertices[ face.d ].position;

				vertexArray.push( v1.x, v1.y, v1.z );
				vertexArray.push( v2.x, v2.y, v2.z );
				vertexArray.push( v3.x, v3.y, v3.z );
				vertexArray.push( v4.x, v4.y, v4.z );

				if ( vertexNormals.length == 4 ) {

					normalArray.push( vertexNormals[0].x, vertexNormals[0].y, vertexNormals[0].z );
					normalArray.push( vertexNormals[1].x, vertexNormals[1].y, vertexNormals[1].z );
					normalArray.push( vertexNormals[2].x, vertexNormals[2].y, vertexNormals[2].z );
					normalArray.push( vertexNormals[3].x, vertexNormals[3].y, vertexNormals[3].z );

				} else {

					normalArray.push( normal.x, normal.y, normal.z );
					normalArray.push( normal.x, normal.y, normal.z );
					normalArray.push( normal.x, normal.y, normal.z );
					normalArray.push( normal.x, normal.y, normal.z );

				}

				if ( uv ) {

					uvArray.push( uv[0].u, uv[0].v );
					uvArray.push( uv[1].u, uv[1].v );
					uvArray.push( uv[2].u, uv[2].v );
					uvArray.push( uv[3].u, uv[3].v );

				}

				faceArray.push( vertexIndex, vertexIndex + 1, vertexIndex + 2 );
				faceArray.push( vertexIndex, vertexIndex + 2, vertexIndex + 3 );

				// TODO: don't add lines that already exist (faces sharing edge)

				lineArray.push( vertexIndex, vertexIndex + 1 );
				lineArray.push( vertexIndex, vertexIndex + 2 );
				lineArray.push( vertexIndex, vertexIndex + 3 );
				lineArray.push( vertexIndex + 1, vertexIndex + 2 );
				lineArray.push( vertexIndex + 2, vertexIndex + 3 );

				vertexIndex += 4;
			}
		}

		if ( !vertexArray.length ) {

			return;

		}

		materialFaceGroup.__webGLVertexBuffer = _gl.createBuffer();
		_gl.bindBuffer( _gl.ARRAY_BUFFER, materialFaceGroup.__webGLVertexBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, new Float32Array( vertexArray ), _gl.STATIC_DRAW );

		materialFaceGroup.__webGLNormalBuffer = _gl.createBuffer();
		_gl.bindBuffer( _gl.ARRAY_BUFFER, materialFaceGroup.__webGLNormalBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, new Float32Array( normalArray ), _gl.STATIC_DRAW );

		materialFaceGroup.__webGLUVBuffer = _gl.createBuffer();
		_gl.bindBuffer( _gl.ARRAY_BUFFER, materialFaceGroup.__webGLUVBuffer );
		_gl.bufferData( _gl.ARRAY_BUFFER, new Float32Array( uvArray ), _gl.STATIC_DRAW );

		materialFaceGroup.__webGLFaceBuffer = _gl.createBuffer();
		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, materialFaceGroup.__webGLFaceBuffer );
		_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( faceArray ), _gl.STATIC_DRAW );

		materialFaceGroup.__webGLLineBuffer = _gl.createBuffer();
		_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, materialFaceGroup.__webGLLineBuffer );
		_gl.bufferData( _gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( lineArray ), _gl.STATIC_DRAW );

		materialFaceGroup.__webGLFaceCount = faceArray.length;
		materialFaceGroup.__webGLLineCount = lineArray.length;

	};

	this.renderBuffer = function ( material, materialFaceGroup ) {

		if ( material instanceof THREE.MeshPhongMaterial ) {

			mAmbient  = material.ambient;
			mDiffuse  = material.diffuse;
			mSpecular = material.specular;

			_gl.uniform4f( _program.mAmbient,  mAmbient.r,  mAmbient.g,  mAmbient.b,  material.opacity );
			_gl.uniform4f( _program.mDiffuse,  mDiffuse.r,  mDiffuse.g,  mDiffuse.b,  material.opacity );
			_gl.uniform4f( _program.mSpecular, mSpecular.r, mSpecular.g, mSpecular.b, material.opacity );

			_gl.uniform1f( _program.mShininess, material.shininess );
			_gl.uniform1i( _program.material, PHONG );

		} else if ( material instanceof THREE.MeshColorFillMaterial ) {

			color = material.color;
			_gl.uniform4f( _program.mColor,  color.r * color.a, color.g * color.a, color.b * color.a, color.a );
			_gl.uniform1i( _program.material, COLORFILL );

		} else if ( material instanceof THREE.MeshColorStrokeMaterial ) {

			lineWidth = material.lineWidth;

			color = material.color;
			_gl.uniform4f( _program.mColor,  color.r * color.a, color.g * color.a, color.b * color.a, color.a );
			_gl.uniform1i( _program.material, COLORSTROKE );

		} else if ( material instanceof THREE.MeshBitmapMaterial ) {

			if ( !material.__webGLTexture && material.loaded ) {

				material.__webGLTexture = _gl.createTexture();
				_gl.bindTexture( _gl.TEXTURE_2D, material.__webGLTexture );
				_gl.texImage2D( _gl.TEXTURE_2D, 0, _gl.RGBA, _gl.RGBA, _gl.UNSIGNED_BYTE, material.bitmap ) ;
				_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, _gl.LINEAR );
				//_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_NEAREST );
				_gl.texParameteri( _gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, _gl.LINEAR_MIPMAP_LINEAR );
				_gl.generateMipmap( _gl.TEXTURE_2D );
				_gl.bindTexture( _gl.TEXTURE_2D, null );

			}

			_gl.activeTexture( _gl.TEXTURE0 );
			_gl.bindTexture( _gl.TEXTURE_2D, material.__webGLTexture );
			_gl.uniform1i( _program.tDiffuse,  0 );

			_gl.uniform1i( _program.material, BITMAP );

		}

		// vertices
		
		_gl.bindBuffer( _gl.ARRAY_BUFFER, materialFaceGroup.__webGLVertexBuffer );
		_gl.vertexAttribPointer( _program.position, 3, _gl.FLOAT, false, 0, 0 );

		// normals
		
		_gl.bindBuffer( _gl.ARRAY_BUFFER, materialFaceGroup.__webGLNormalBuffer );
		_gl.vertexAttribPointer( _program.normal, 3, _gl.FLOAT, false, 0, 0 );

		// uvs
		
		if ( material instanceof THREE.MeshBitmapMaterial ) {

			_gl.bindBuffer( _gl.ARRAY_BUFFER, materialFaceGroup.__webGLUVBuffer );

			_gl.enableVertexAttribArray( _program.uv );
			_gl.vertexAttribPointer( _program.uv, 2, _gl.FLOAT, false, 0, 0 );

		} else {

			_gl.disableVertexAttribArray( _program.uv );

		}

		// render triangles
		
		if ( material instanceof THREE.MeshBitmapMaterial || 

			material instanceof THREE.MeshColorFillMaterial ||
			material instanceof THREE.MeshPhongMaterial ) {

			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, materialFaceGroup.__webGLFaceBuffer );
			_gl.drawElements( _gl.TRIANGLES, materialFaceGroup.__webGLFaceCount, _gl.UNSIGNED_SHORT, 0 );

		// render lines
		
		} else if ( material instanceof THREE.MeshColorStrokeMaterial ) {

			_gl.lineWidth( lineWidth );
			_gl.bindBuffer( _gl.ELEMENT_ARRAY_BUFFER, materialFaceGroup.__webGLLineBuffer );
			_gl.drawElements( _gl.LINES, materialFaceGroup.__webGLLineCount, _gl.UNSIGNED_SHORT, 0 );

		}

	};

	this.renderMesh = function ( object, camera ) {

		var i, l, m, ml, mf, material, meshMaterial, materialFaceGroup;

		// create separate VBOs per material
		
		for ( mf in object.materialFaceGroup ) {

			materialFaceGroup = object.materialFaceGroup[ mf ];

			// initialise buffers on the first access
			
			if( ! materialFaceGroup.__webGLVertexBuffer ) {

				this.createBuffers( object, mf );

			}

			for ( m = 0, ml = object.material.length; m < ml; m++ ) {

				meshMaterial = object.material[ m ];

				if ( meshMaterial instanceof THREE.MeshFaceMaterial ) {

					for ( i = 0, l = materialFaceGroup.material.length; i < l; i++ ) {

						material = materialFaceGroup.material[ i ];
						this.renderBuffer( material, materialFaceGroup );

					}

				} else {

					material = meshMaterial;
					this.renderBuffer( material, materialFaceGroup );

				}

			}

		}

	};

	this.setupMatrices = function ( object, camera ) {

		object.autoUpdateMatrix && object.updateMatrix();

		_modelViewMatrix.multiply( camera.matrix, object.matrix );

		_program.viewMatrixArray = new Float32Array( camera.matrix.flatten() );
		_program.modelViewMatrixArray = new Float32Array( _modelViewMatrix.flatten() );
		_program.projectionMatrixArray = new Float32Array( camera.projectionMatrix.flatten() );

		_normalMatrix = THREE.Matrix4.makeInvert3x3( _modelViewMatrix ).transpose();
		_program.normalMatrixArray = new Float32Array( _normalMatrix.m );

		_gl.uniformMatrix4fv( _program.viewMatrix, false, _program.viewMatrixArray );
		_gl.uniformMatrix4fv( _program.modelViewMatrix, false, _program.modelViewMatrixArray );
		_gl.uniformMatrix4fv( _program.projectionMatrix, false, _program.projectionMatrixArray );
		_gl.uniformMatrix3fv( _program.normalMatrix, false, _program.normalMatrixArray );
		_gl.uniformMatrix4fv( _program.objMatrix, false, new Float32Array( object.matrix.flatten() ) );

	};

	this.render = function ( scene, camera ) {

		var o, ol, object;

		if ( this.autoClear ) {

			this.clear();

		}

		camera.autoUpdateMatrix && camera.updateMatrix();
		_gl.uniform3f( _program.cameraPosition, camera.position.x, camera.position.y, camera.position.z );

		this.setupLights( scene );

		for ( o = 0, ol = scene.objects.length; o < ol; o++ ) {

			object = scene.objects[ o ];

			this.setupMatrices( object, camera );

			if ( object instanceof THREE.Mesh ) {

				this.renderMesh( object, camera );

			} else if ( object instanceof THREE.Line ) {

				// TODO

				// It would be very inefficient to do lines one-by-one.

				// This will need a complete redesign from how CanvasRenderer does it.

				// Though it could be brute forced, if only used for lightweight
				// stuff (as CanvasRenderer can only handle small number of elements 
				// anyways). 

				// Heavy-duty wireframe lines are handled efficiently in mesh renderer.

			} else if ( object instanceof THREE.Particle ) {

				// TODO

				// The same as with lines, particles shouldn't be handled one-by-one.

				// Again, heavy duty particle system would require different approach,
				// like one VBO per particle system and then update attribute arrays, 
				// though the best would be to move also behavior computation
				// into the shader (ala http://spidergl.org/example.php?id=11)

			}

		}

	};
	
	this.setFaceCulling = function( cullFace, frontFace ) {
		
		if ( cullFace ) {
			
			if ( !frontFace || frontFace == "ccw" ) {
			
				_gl.frontFace( _gl.CCW );
				
			} else {
				
				_gl.frontFace( _gl.CW );
			}
			
			if( cullFace == "back" ) {
					
				_gl.cullFace( _gl.BACK );
				
			} else if( cullFace == "front" ) {
				
				_gl.cullFace( _gl.FRONT );
			
			} else {
				
				_gl.cullFace( _gl.FRONT_AND_BACK );
			}
			
			_gl.enable( _gl.CULL_FACE );
			
		} else {
			
			_gl.disable( _gl.CULL_FACE );
		}

	};

	function initGL() {

		try {

			_gl = _canvas.getContext( 'experimental-webgl', { antialias: true} );

		} catch(e) { }

		if (!_gl) {

			alert("WebGL not supported");
			throw "cannot create webgl context";

		}

		_gl.clearColor( 0, 0, 0, 1 );
		_gl.clearDepth( 1 );

		_gl.enable( _gl.DEPTH_TEST );
		_gl.depthFunc( _gl.LEQUAL );

		_gl.frontFace( _gl.CCW );
		_gl.cullFace( _gl.BACK );
		_gl.enable( _gl.CULL_FACE );		
		
		_gl.enable( _gl.BLEND );
		//_gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA );
		// _gl.blendFunc( _gl.SRC_ALPHA, _gl.ONE ); // cool!
		_gl.blendFunc( _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA );
		_gl.clearColor( 0, 0, 0, 0 );

	};

	function generateFragmentShader( maxDirLights, maxPointLights ) {
	
		var chunks = [

			"#ifdef GL_ES",
			"precision highp float;",
			"#endif",
		
			maxDirLights   ? "#define MAX_DIR_LIGHTS " + maxDirLights     : "",
			maxPointLights ? "#define MAX_POINT_LIGHTS " + maxPointLights : "",
		
			"uniform int material;", // 0 - ColorFill, 1 - ColorStroke, 2 - Bitmap, 3 - Phong

			"uniform sampler2D tDiffuse;",
			"uniform vec4 mColor;",

			"uniform vec4 mAmbient;",
			"uniform vec4 mDiffuse;",
			"uniform vec4 mSpecular;",
			"uniform float mShininess;",

			"uniform int pointLightNumber;",
			"uniform int directionalLightNumber;",
			
			maxDirLights ? "uniform mat4 viewMatrix;" : "",
			maxDirLights ? "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];" : "",
			
			"varying vec3 vNormal;",
			"varying vec2 vUv;",
			
			"varying vec3 vLightWeighting;",

			maxPointLights ? "varying vec3 vPointLightVector[ MAX_POINT_LIGHTS ];"     : "",
			
			"varying vec3 vViewPosition;",

			"void main() {",

				// Blinn-Phong
				// based on o3d example

				"if ( material == 3 ) { ", 

					"vec3 normal = normalize( vNormal );",
					"vec3 viewPosition = normalize( vViewPosition );",

					// point lights
					
					maxPointLights ? "vec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );" : "",
					maxPointLights ? "vec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );" : "",

					maxPointLights ? "for( int i = 0; i < pointLightNumber; i++ ) {" : "",
					
					maxPointLights ? 	"vec3 pointVector = normalize( vPointLightVector[ i ] );" : "",
					maxPointLights ? 	"vec3 pointHalfVector = normalize( vPointLightVector[ i ] + vViewPosition );" : "",
						
					maxPointLights ? 	"float pointDotNormalHalf = dot( normal, pointHalfVector );" : "",
					maxPointLights ? 	"float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );" : "",

					// Ternary conditional is from the original o3d shader. Here it produces abrupt dark cutoff artefacts.
					// Using just pow works ok in Chrome, but makes different artefact in Firefox 4.
					// Zeroing on negative pointDotNormalHalf seems to work in both.
					
					//"float specularCompPoint = dot( normal, pointVector ) < 0.0 || pointDotNormalHalf < 0.0 ? 0.0 : pow( pointDotNormalHalf, mShininess );",
					//"float specularCompPoint = pow( pointDotNormalHalf, mShininess );",
					//"float pointSpecularWeight = pointDotNormalHalf < 0.0 ? 0.0 : pow( pointDotNormalHalf, mShininess );",

					// Ternary conditional inside for loop breaks Chrome shader linking.
					// Must do it with if.

					maxPointLights ? 	"float pointSpecularWeight = 0.0;" : "",
					maxPointLights ? 	"if ( pointDotNormalHalf >= 0.0 )" : "",
					maxPointLights ? 		"pointSpecularWeight = pow( pointDotNormalHalf, mShininess );" : "",
						
					maxPointLights ? 	"pointDiffuse  += mDiffuse  * pointDiffuseWeight;" : "",
					maxPointLights ? 	"pointSpecular += mSpecular * pointSpecularWeight;" : "",
						
					maxPointLights ? "}" : "",

					// directional lights

					maxDirLights ? "vec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );" : "",
					maxDirLights ? "vec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );" : "",
					
					maxDirLights ? "for( int i = 0; i < directionalLightNumber; i++ ) {" : "",

					maxDirLights ?		"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );" : "",

					maxDirLights ? 		"vec3 dirVector = normalize( lDirection.xyz );" : "",
					maxDirLights ? 		"vec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );" : "",
						
					maxDirLights ? 		"float dirDotNormalHalf = dot( normal, dirHalfVector );" : "",

					maxDirLights ? 		"float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );" : "",  
						
					maxDirLights ? 		"float dirSpecularWeight = 0.0;" : "",
					maxDirLights ? 		"if ( dirDotNormalHalf >= 0.0 )" : "",
					maxDirLights ? 			"dirSpecularWeight = pow( dirDotNormalHalf, mShininess );" : "",

					maxDirLights ? 		"dirDiffuse  += mDiffuse  * dirDiffuseWeight;" : "",
					maxDirLights ? 		"dirSpecular += mSpecular * dirSpecularWeight;" : "",

					maxDirLights ? "}" : "",

					// all lights contribution summation
					
					"vec4 totalLight = mAmbient;",
					maxDirLights   ? "totalLight += dirDiffuse + dirSpecular;" : "",
					maxPointLights ? "totalLight += pointDiffuse + pointSpecular;" : "",

					// looks nicer with weighting
					
					"gl_FragColor = vec4( totalLight.xyz * vLightWeighting, 1.0 );",                    
					//"gl_FragColor = vec4( totalLight.xyz, 1.0 );", 

				// Bitmap: texture
				
				"} else if ( material == 2 ) {", 

					"vec4 texelColor = texture2D( tDiffuse, vUv );",
					"gl_FragColor = vec4( texelColor.rgb * vLightWeighting, texelColor.a );",

				// ColorStroke: wireframe using uniform color
				
				"} else if ( material == 1 ) {", 

					"gl_FragColor = vec4( mColor.rgb * vLightWeighting, mColor.a );",

				// ColorFill: triangle using uniform color
				
				"} else {", 

					"gl_FragColor = vec4( mColor.rgb * vLightWeighting, mColor.a );",
					
				"}",

			"}" ];
			
		return chunks.join("\n");
		
	};
	
	function generateVertexShader( maxDirLights, maxPointLights ) {
		
		var chunks = [
			
			maxDirLights   ? "#define MAX_DIR_LIGHTS " + maxDirLights     : "",
			maxPointLights ? "#define MAX_POINT_LIGHTS " + maxPointLights : "",
			
			"attribute vec3 position;",
			"attribute vec3 normal;",
			"attribute vec2 uv;",

			"uniform vec3 cameraPosition;",

			"uniform bool enableLighting;",
			
			"uniform int pointLightNumber;",
			"uniform int directionalLightNumber;",
			
			"uniform vec3 ambientLightColor;",
			
			maxDirLights ? "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];"     : "",
			maxDirLights ? "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];" : "",

			maxPointLights ? "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];"    : "",
			maxPointLights ? "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];" : "",

			"uniform mat4 objMatrix;",
			"uniform mat4 viewMatrix;",
			"uniform mat4 modelViewMatrix;",
			"uniform mat4 projectionMatrix;",
			"uniform mat3 normalMatrix;",

			"varying vec3 vNormal;",
			"varying vec2 vUv;",
			
			"varying vec3 vLightWeighting;",

			maxPointLights ? "varying vec3 vPointLightVector[ MAX_POINT_LIGHTS ];"     : "",
			
			"varying vec3 vViewPosition;",

			"void main(void) {",

				// world space
				
				"vec4 mPosition = objMatrix * vec4( position, 1.0 );",
				"vViewPosition = cameraPosition - mPosition.xyz;",

				// eye space
				
				"vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
				"vec3 transformedNormal = normalize( normalMatrix * normal );",

				"if ( !enableLighting ) {",

					"vLightWeighting = vec3( 1.0, 1.0, 1.0 );",

				"} else {",

					"vLightWeighting = ambientLightColor;",
					
					// directional lights
					
					maxDirLights ? "for( int i = 0; i < directionalLightNumber; i++ ) {" : "",
					maxDirLights ?		"vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );" : "",
					maxDirLights ?		"float directionalLightWeighting = max( dot( transformedNormal, normalize(lDirection.xyz ) ), 0.0 );" : "",						
					maxDirLights ?		"vLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;" : "",
					maxDirLights ? "}" : "",
					
					// point lights
					
					maxPointLights ? "for( int i = 0; i < pointLightNumber; i++ ) {" : "",
					maxPointLights ? 	"vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );" : "",
					maxPointLights ? 	"vPointLightVector[ i ] = normalize( lPosition.xyz - mvPosition.xyz );" : "",
					maxPointLights ? 	"float pointLightWeighting = max( dot( transformedNormal, vPointLightVector[ i ] ), 0.0 );" : "",
					maxPointLights ? 	"vLightWeighting += pointLightColor[ i ] * pointLightWeighting;" : "",
					maxPointLights ? "}" : "",
					
				"}",

				"vNormal = transformedNormal;",
				"vUv = uv;",

				"gl_Position = projectionMatrix * mvPosition;",

			"}" ];
			
		return chunks.join("\n");
		
	};
		
	function initProgram( maxDirLights, maxPointLights ) {

		_program = _gl.createProgram();
		
		//log ( generateVertexShader( maxDirLights, maxPointLights ) );
		//log ( generateFragmentShader( maxDirLights, maxPointLights ) );
		
		_gl.attachShader( _program, getShader( "fragment", generateFragmentShader( maxDirLights, maxPointLights ) ) );
		_gl.attachShader( _program, getShader( "vertex",   generateVertexShader( maxDirLights, maxPointLights ) ) );

		_gl.linkProgram( _program );

		if ( !_gl.getProgramParameter( _program, _gl.LINK_STATUS ) ) {

			alert( "Could not initialise shaders" );

			//alert( "VALIDATE_STATUS: " + _gl.getProgramParameter( _program, _gl.VALIDATE_STATUS ) );
			//alert( _gl.getError() );
		}
		

		_gl.useProgram( _program );

		// matrices
		
		_program.viewMatrix = _gl.getUniformLocation( _program, "viewMatrix" );
		_program.modelViewMatrix = _gl.getUniformLocation( _program, "modelViewMatrix" );
		_program.projectionMatrix = _gl.getUniformLocation( _program, "projectionMatrix" );
		_program.normalMatrix = _gl.getUniformLocation( _program, "normalMatrix" );
		_program.objMatrix = _gl.getUniformLocation( _program, "objMatrix" );

		_program.cameraPosition = _gl.getUniformLocation(_program, 'cameraPosition');

		// lights
		
		_program.enableLighting = _gl.getUniformLocation(_program, 'enableLighting');
		
		_program.ambientLightColor = _gl.getUniformLocation(_program, 'ambientLightColor');
		
		if ( maxDirLights ) {
			
			_program.directionalLightNumber = _gl.getUniformLocation(_program, 'directionalLightNumber');
			_program.directionalLightColor = _gl.getUniformLocation(_program, 'directionalLightColor');
			_program.directionalLightDirection = _gl.getUniformLocation(_program, 'directionalLightDirection');
			
		}

		if ( maxPointLights ) {
			
			_program.pointLightNumber = _gl.getUniformLocation(_program, 'pointLightNumber');
			_program.pointLightColor = _gl.getUniformLocation(_program, 'pointLightColor');
			_program.pointLightPosition = _gl.getUniformLocation(_program, 'pointLightPosition');
			
		}

		// material
		
		_program.material = _gl.getUniformLocation(_program, 'material');
		
		// material properties (ColorFill / ColorStroke shader)
		
		_program.mColor = _gl.getUniformLocation(_program, 'mColor');

		// material properties (Blinn-Phong shader)
		
		_program.mAmbient = _gl.getUniformLocation(_program, 'mAmbient');
		_program.mDiffuse = _gl.getUniformLocation(_program, 'mDiffuse');
		_program.mSpecular = _gl.getUniformLocation(_program, 'mSpecular');
		_program.mShininess = _gl.getUniformLocation(_program, 'mShininess');

		// texture (Bitmap shader)
		
		_program.tDiffuse = _gl.getUniformLocation( _program, "tDiffuse");
		_gl.uniform1i( _program.tDiffuse,  0 );

		// vertex arrays
		
		_program.position = _gl.getAttribLocation( _program, "position" );
		_gl.enableVertexAttribArray( _program.position );

		_program.normal = _gl.getAttribLocation( _program, "normal" );
		_gl.enableVertexAttribArray( _program.normal );

		_program.uv = _gl.getAttribLocation( _program, "uv" );
		_gl.enableVertexAttribArray( _program.uv );


		_program.viewMatrixArray = new Float32Array(16);
		_program.modelViewMatrixArray = new Float32Array(16);
		_program.projectionMatrixArray = new Float32Array(16);

	};

	function getShader( type, string ) {

		var shader;

		if ( type == "fragment" ) {

			shader = _gl.createShader( _gl.FRAGMENT_SHADER );

		} else if ( type == "vertex" ) {

			shader = _gl.createShader( _gl.VERTEX_SHADER );

		}

		_gl.shaderSource( shader, string );
		_gl.compileShader( shader );

		if ( !_gl.getShaderParameter( shader, _gl.COMPILE_STATUS ) ) {

			alert( _gl.getShaderInfoLog( shader ) );
			return null;

		}

		return shader;
		
	};

	function getGLParams() {
		
		var params  = {
			
			'MAX_VARYING_VECTORS': _gl.getParameter( _gl.MAX_VARYING_VECTORS ),
			'MAX_VERTEX_ATTRIBS': _gl.getParameter( _gl.MAX_VERTEX_ATTRIBS ),
			
			'MAX_TEXTURE_IMAGE_UNITS': _gl.getParameter( _gl.MAX_TEXTURE_IMAGE_UNITS ),
			'MAX_VERTEX_TEXTURE_IMAGE_UNITS': _gl.getParameter( _gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS ),
			'MAX_COMBINED_TEXTURE_IMAGE_UNITS' : _gl.getParameter( _gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS ),
			
			'MAX_VERTEX_UNIFORM_VECTORS': _gl.getParameter( _gl.MAX_VERTEX_UNIFORM_VECTORS ),
			'MAX_FRAGMENT_UNIFORM_VECTORS': _gl.getParameter( _gl.MAX_FRAGMENT_UNIFORM_VECTORS )
		}
			
		return params;
	};
	
	function dumpObject( obj ) {
		
		var p, str = "";
		for ( p in obj ) {
			
			str += p + ": " + obj[p] + "\n";
			
		}
		
		return str;
	}
	
};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableFace3 = function () {

	this.v1 = new THREE.Vector2();
	this.v2 = new THREE.Vector2();
	this.v3 = new THREE.Vector2();

	this.centroidWorld = new THREE.Vector3();
	this.centroidScreen = new THREE.Vector3();

	this.normalWorld = new THREE.Vector3();

	this.z = null;

	this.color = null;
	this.material = null;

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableFace4 = function () {

	this.v1 = new THREE.Vector2();
	this.v2 = new THREE.Vector2();
	this.v3 = new THREE.Vector2();
	this.v4 = new THREE.Vector2();

	this.centroidWorld = new THREE.Vector3();
	this.centroidScreen = new THREE.Vector3();

	this.normalWorld = new THREE.Vector3();

	this.z = null;

	this.color = null;
	this.material = null;

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableParticle = function () {

	this.x = null;
	this.y = null;
	this.z = null;

	this.rotation = null;
	this.scale = new THREE.Vector2();

	this.color = null;
	this.material = null;

};

/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.RenderableLine = function () {

	this.v1 = new THREE.Vector2();
	this.v2 = new THREE.Vector2();

	this.z = null;

	this.color = null;
	this.material = null;

};

