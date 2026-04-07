/* replace occurrences of _ZWSP_CHAR_ with \200B, preventing Parcel from rendering actual zwsp */
const { Optimizer } = require('@parcel/plugin');

module.exports = new Optimizer({
	async optimize({ contents }) {
        contents = contents.toString();
		contents = contents.replace(/_ZWSP_CHAR_/g, '\\200B');
        contents = Buffer.from(contents, 'utf8');
        return { contents };
	}
})