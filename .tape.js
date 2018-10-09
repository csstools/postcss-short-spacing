module.exports = {
	'postcss-short-spacing': {
		'basic': {
			message: 'supports basic usage'
		},
		'prefix': {
			message: 'ignores prefix without option usage',
			expect: 'prefix.css'
		},
		'prefix:opt': {
			message: 'supports { prefix: "x" } usage',
			options: { prefix: 'x' },
			expect: 'basic.expect.css'
		}
	}
};
