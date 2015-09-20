var path    = require('path');
var postcss = require('postcss');
var expect  = require('chai').expect;
var fs      = require('fs');

var plugin = require('../');

function test(name, opts, done) {
	var fixtureDir = './test/fixtures/';
	var baseName   = name.split(':')[0];
	var testName   = name.split(':').join('.');
	var inputPath  = path.resolve(fixtureDir + baseName + '.css');
	// var actualPath = path.resolve(fixtureDir + testName + '.actual.css');
	var expectPath = path.resolve(fixtureDir + testName + '.expect.css');

	var inputCSS  = fs.readFileSync(inputPath, 'utf8');
	var expectCSS = fs.readFileSync(expectPath, 'utf8');

	postcss([plugin(opts)]).process(inputCSS, {
		from: inputPath
	}).then(function (result) {
		var actualCSS = result.css;

		// fs.writeFileSync(actualPath, actualCSS);

		expect(actualCSS).to.eql(expectCSS);
		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
}

describe('postcss-short-spacing', function () {
	it('supports standard margin and padding', function (done) {
		test('basic', {}, done);
	});

	it('ignores standard margin and padding with prefix', function (done) {
		test('basic:w-prefix', { prefix: 'x' }, done);
	});

	it('ignores prefixed margin and padding', function (done) {
		test('prefixed', {}, done);
	});

	it('supports margin and padding with prefix', function (done) {
		test('prefixed:w-prefix', { prefix: 'x' }, done);
	});
});
