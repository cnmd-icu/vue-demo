module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	extends: [
		'plugin:vue/vue3-essential',
		'plugin:vue/essential',
		'eslint:recommended',
		'./src/eslintrc-auto-import.json'],
	plugins: ['vue', '@typescript-eslint'],
	overrides: [
		{
			files: ['*.ts', '*.tsx', '*.vue'],
			rules: {
				'no-undef': 'off',//禁用未声明的变量
			},
		},
	],
	rules: {
		"no-var": "error", // 要求使用 let 或 const 而不是 var
		"no-multiple-empty-lines": ["error", { max: 1 }], // 不允许多个空行
		"prefer-const": "off", // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
		"no-use-before-define": "off", // 禁止在 函数/类/变量 定义之前使用它们
		'@typescript-eslint/ban-ts-ignore': 'off',//禁止使用@ts-ignore
		'@typescript-eslint/explicit-function-return-type': 'off',//禁止在函数返回类型的位置使用显式类型
		'@typescript-eslint/no-explicit-any': 'off',//禁止使用any类型
		'@typescript-eslint/no-var-requires': 'off',//禁止使用require语句
		'@typescript-eslint/no-empty-function': 'off',//禁止空函数
		'@typescript-eslint/no-use-before-define': 'off',//禁止定义前使用
		'@typescript-eslint/ban-ts-comment': 'off',//禁止使用@ts-xxx注释
		'@typescript-eslint/ban-types': 'off',//禁止使用特定的类型
		'@typescript-eslint/no-non-null-assertion': 'off',//禁止使用非空断言
		'@typescript-eslint/explicit-module-boundary-types': 'off',//禁止在导出函数的返回类型或参数类型上使用显式类型
		'@typescript-eslint/no-redeclare': 'error',//禁止重复声明变量
		'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',//禁止在可能的情况下使用非空断言的可选链
		'@typescript-eslint/no-unused-vars': [2],//禁止未使用过的变量
		'vue/custom-event-name-casing': 'off',//自定义事件名称的大小写
		'vue/attributes-order': 'off',//强制属性顺序
		'vue/one-component-per-file': 'off',//每个文件一个组件
		'vue/html-closing-bracket-newline': 'off',//在标签的右括号换行
		'vue/max-attributes-per-line': 'off',//每行最大属性数
		'vue/multiline-html-element-content-newline': 'off',//多行元素内容换行
		'vue/singleline-html-element-content-newline': 'off',//单行元素内容换行
		'vue/attribute-hyphenation': 'off',//属性连字符
		'vue/html-self-closing': 'off',//自闭合标签
		'vue/no-multiple-template-root': 'off',//禁止多个根节点
		'vue/require-default-prop': 'off',//要求默认值
		'vue/no-v-model-argument': 'off',//禁止v-model参数
		'vue/no-arrow-functions-in-watch': 'off',//禁止在watch中使用箭头函数
		'vue/no-template-key': 'off',//禁止在<template>中使用key属性
		'vue/no-v-html': 'off',//禁止使用v-html
		'vue/comment-directive': 'off',//注释指令
		'vue/no-parsing-error': 'off',//禁止解析错误
		'vue/no-deprecated-v-on-native-modifier': 'off',//禁止使用已废弃的.native修饰符
		'vue/multi-word-component-names': 'off',//多个单词组件名
		'no-useless-escape': 'off',//禁用不必要的转义字符
		'no-sparse-arrays': 'off',//禁用稀疏数组
		'no-prototype-builtins': 'off',//禁止直接使用Object.prototypes内置属性
		'no-constant-condition': 'off',//禁止在条件中使用常量表达式
		'no-restricted-globals': 'off',//禁用特定的全局变量
		'no-restricted-syntax': 'off',//禁用特定的语法
		'generator-star-spacing': 'off',//强制generator函数中*号周围使用一致的空格
		'no-unreachable': 'off',//禁止在return、throw、continue和break语句之后出现不可达代码
		'no-multiple-template-root': 'off',//禁止多个根节点
		'no-unused-vars': 'error',//禁止未使用过的变量
		'no-v-model-argument': 'off',//禁止v-model参数
		'no-case-declarations': 'off',//禁止在case或default子句中出现词法声明
		'no-console': 'error',//禁用console
		'no-redeclare': 'off',//禁止重复声明变量
	},
};
