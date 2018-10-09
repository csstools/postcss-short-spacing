import postcss from 'postcss';

export default postcss.plugin('postcss-short-spacing', opts => {
	// get the prefix
	const prefix = 'prefix' in Object(opts) ? `-${opts.prefix}-` : '';

	// get the skip token
	const skip = 'skip' in Object(opts) ? String(opts.skip) : '*';

	// property pattern
	const spacingPropertyRegExp = new RegExp(`^${prefix}(margin|padding)(-(?:block|end|inline|start))?$`, 'i');

	return root => {
		// walk each matching declaration
		root.walkDecls(spacingPropertyRegExp, decl => {
			const [, property, logical] = decl.prop.match(spacingPropertyRegExp);

			// update the property
			if (prefix) {
				decl.prop = `${property}${logical || ''}`
			}

			// get the space-separated values
			const values = postcss.list.space(decl.value);

			if (values.includes(skip)) {
				const isBlockInline = blockInlineRegExp.test(logical);
				const isStartEnd = startEndRegExp.test(logical);
				const isFourSide = !logical;

				if (isBlockInline) {
					transformBlockInline(decl, `${property}${logical}-&`, values, skip);
				} else if (isStartEnd) {
					transformStartEnd(decl, `${property}-&${logical}`, values, skip);
				} else if (isFourSide) {
					transformFourSide(decl, `${property}-&`, values, skip);
				}

				decl.remove();
			}
		});
	};
});

const blockInlineRegExp = /^-(block|inline)$/i;
const startEndRegExp = /^-(start|end)$/i;

// conditionally add start/end values
const transformBlockInline = (decl, property, values, skip) => { // eslint-disable-line max-params
	const [$1, $2] = values;

	if ($1 && $1 !== skip) {
		decl.cloneBefore({
			prop: property.replace('&', 'start'),
			value: $1
		});
	}

	if ($2 && $2 !== skip) {
		decl.cloneBefore({
			prop: property.replace('&', 'end'),
			value: $2
		});
	}
};

// conditionally add block/inline values
const transformStartEnd = (decl, property, values, skip) => { // eslint-disable-line max-params
	const [$1, $2] = values;

	if ($1 && $1 !== skip) {
		decl.cloneBefore({
			prop: property.replace('&', 'block'),
			value: $1
		});
	}

	if ($2 && $2 !== skip) {
		decl.cloneBefore({
			prop: property.replace('&', 'inline'),
			value: $2
		});
	}
};

// conditionally add top/right/bottom/left values
const transformFourSide = (decl, property, values, skip) => { // eslint-disable-line max-params
	const [$1, $2, $3, $4] = values;

	// conditionally add a left value
	if ($4 && $4 !== skip) {
		decl.cloneBefore({
			prop: property.replace('&', 'left'),
			value: $4
		});
	}

	// conditionally add a bottom value
	if ($3 && $3 !== skip) {
		decl.cloneBefore({
			prop: property.replace('&', 'bottom'),
			value: $3
		});
	}

	// conditionally add a right value
	if ($2 && $2 !== skip) {
		if (!$4) {
			decl.cloneBefore({
				prop: property.replace('&', 'left'),
				value: $2
			});
		}

		decl.cloneBefore({
			prop: property.replace('&', 'right'),
			value: $2
		});
	}

	// conditionally add a top value
	if ($1 && $1 !== skip) {
		if (!$3) {
			decl.cloneBefore({
				prop: property.replace('&', 'bottom'),
				value: $1
			});
		}

		decl.cloneBefore({
			prop: property.replace('&', 'top'),
			value: $1
		});
	}
};
