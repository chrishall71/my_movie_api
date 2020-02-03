module.exports = {
	"extends": "airbnb",
	"parser": "babel-eslint",
	"parserOptions": {
		"sourceType": "module",
		"ecmaFeatures": {
			"jsx": true,
			"modules": true
		}
	},
	"plugins": ["prettier"],
	"extends": ["prettier"],
	"rules": {
		"prettier/prettier": "error"
	}
};