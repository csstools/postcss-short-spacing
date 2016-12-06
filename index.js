// tooling
const postcss = require('postcss');

// side properties
const properties = ['top', 'right', 'bottom', 'left'];

// plugin
module.exports = postcss.plugin('postcss-short-spacing', ({
	prefix = '',
	skip   = '*'
}) => {
	// dashed prefix
	const dashedPrefix = prefix ? '-' + prefix + '-' : '';

	// property pattern
	const propertyMatch = new RegExp(`^${ dashedPrefix }(margin|padding)$`);

	return (css) => {
		// walk each matching declaration
		css.walkDecls(propertyMatch, (decl) => {
			// unprefixed property
			const property = decl.prop.match(propertyMatch)[1];

			// if a prefix is in use
			if (prefix) {
				// remove it from the property
				decl.prop = property;
			}

			// space-separated values (top, right, bottom, left)
			const values = postcss.list.space(decl.value);

			// if the values contain a skip token
			if (values.indexOf(skip) !== -1) {
				// conditionally add a right value
				if (values.length === 1) {
					values.push(values[0]);
				}

				// conditionally add a bottom value
				if (values.length === 2) {
					values.push(values[0]);
				}

				// conditionally add a left value
				if (values.length === 3) {
					values.push(values[1]);
				}

				// for each side property
				properties.forEach((side, index) => {
					// if the value is not a skip token
					if (values[index] !== skip) {
						// create a new declaration for the spacing side property
						decl.cloneBefore({
							prop:  `${ property }-${ side }`,
							value: values[index]
						});
					}
				});

				// remove the original spacing declaration
				decl.remove();
			}
		});
	};
});
