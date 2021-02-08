  
  
  ```
  module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'react'],
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    rules: {
      quotes: ['error', 'single'], //强制使用单引号
      semi: ['error', 'always'], // 要求或禁止使用分号而不是 ASI
      camelcase: 0, // 双峰驼命名格式
      eqeqeq: 2, //必须使用全等
      yoda: [2, 'never'], //禁止尤达条件
      strict: [2, 'never'], // 禁用严格模式，禁止在任何地方出现 'use strict'
      'no-extra-boolean-cast': 2, //禁止不必要的bool转换
      'no-lone-blocks': 2, //禁止不必要的嵌套块
      'no-plusplus': 0, //禁止使用++，--
      'no-proto': 2, //禁止使用__proto__属性
      'no-self-compare': 2, //不能比较自身
      'no-undef': 2, //不能有未定义的变量
      'no-unreachable': 2, //不能有无法执行的代码
      'no-unused-expressions': 2, //禁止无用的表达式
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
      'no-alert': 2, //禁止使用alert
      'no-caller': 1, //禁止使用arguments.caller或arguments.callee
      'no-inline-comments': 2, //禁止行内备注
      'no-func-assign': 2, //禁止重复的函数声明
      'no-eval': 2, //禁止使用eval,
      'no-empty': 2, //块语句中的内容不能为空
      'no-const-assign': 2, //禁止修改const声明的变量
      'no-var': 2, //禁止使用var
      'no-multiple-empty-lines': [1, { max: 2 }], //空行最多不能超过2行
      'no-extra-semi': 'error', // 禁止不必要的分号
      'array-bracket-spacing': [2, 'never'], //是否允许非空数组里面有多余的空格
      'linebreak-style': ['error', 'unix'], // 强制使用一致的换行风格
      'brace-style': [2, '1tbs', { allowSingleLine: true }], // if while function 后面的{必须与if在同一行，java风格。
      'comma-dangle': 0, // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号，
      'comma-spacing': [2, { before: false, after: true }], // 控制逗号前后的空格
      'computed-property-spacing': [2, 'never'], // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
      'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
      'default-case': 2, //switch语句最后必须有default
      'newline-after-var': 2, //变量声明后是否需要空一行
      'max-depth': [2, 4], //嵌套块深度最多四层
      'max-params': [2, 4], //函数最多只能有4个参数
      'no-else-return': 2, //如果if语句里面有return,后面不能跟else语句，禁止出现 if (cond) { return a } else { return b }，应该写为 if (cond) { return a } return b
      'no-eq-null': 2, //禁止对null使用==或!=运算符
      'no-iterator': 2, //禁止使用__iterator__ 属性
      'no-mixed-spaces-and-tabs': [2, false], //禁止混用tab和空格
      'no-new-func': 1, //禁止使用new Function
      'no-new-object': 2, //禁止使用new Object()
      'no-self-compare': 2, //不能比较自身
      'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], //不能有声明后未被使用的变量或参数
      'no-use-before-define': 0, //未定义前不能使用
      'valid-typeof': 2, //无效的类型判断
      'wrap-iife': [2, 'inside'], //立即执行函数表达式的小括号风格
      // 注释的斜线和星号后要加空格
      'spaced-comment': [
        2,
        'always',
        {
          block: {
            exceptions: ['*'],
            balanced: true,
          },
        },
      ],
      // new, delete, typeof, void, yield 等表达式前后必须有空格，-, +, --, ++, !, !! 等表达式前后不许有空格
      'space-unary-ops': [
        2,
        {
          words: true,
          nonwords: false,
        },
      ],
      'prefer-rest-params': 2, // 必须使用解构 ...args 来代替 arguments
      'consistent-this': [2, 'self', 'that'], // this 的别名规则，只允许 self 或 that
      curly: [2, 'multi-line', 'consistent'], // if 后必须包含 { ，单行 if 除外
      'for-direction': 2, // for 循环不得因方向错误造成死循环
      'getter-return': [2, { allowImplicit: true }], // getter 必须有返回值，允许返回 undefined
      'keyword-spacing': 2, // 关键字前后必须有空格
      // new关键字后类名应首字母大写
      'new-cap': [
        2,
        {
          capIsNew: false, // 允许大写开头的函数直接执行
        },
      ],
      'no-await-in-loop': 2, // 禁止将 await 写在循环里
      'no-class-assign': 2, // class定义的类名不得与其它变量重名
      'no-dupe-args': 2, // 函数参数禁止重名
      'no-duplicate-case': 2, // 禁止 switch 中出现相同的 case
      'no-duplicate-imports': 2, // 禁止重复 import
      'no-empty-function': 0, // 禁止空的 function,包含注释的情况下允许
      'no-empty-pattern': 2, // 禁止解构中出现空 {} 或 []
      'no-ex-assign': 2, // catch 定义的参数禁止赋值
      'no-extend-native': [2, { exceptions: ['Array', 'Object'] }], // 禁止扩展原生对象
      'no-extra-parens': [2, 'functions'], // 禁止额外的括号，仅针对函数体
      'no-floating-decimal': 2, // 不允许使用 2. 或 .5 来表示数字，需要用 2、2.0、0.5 的格式
      'no-func-assign': 2, // 禁止对函数声明重新赋值
      'no-implied-eval': 2, // 禁止在 setTimeout 和 setInterval 中传入字符串，因会触发隐式 eval
      'no-multi-assign': 2, // 禁止连等赋值
      '@typescript-eslint/explicit-function-return-type': [
        'off',
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      '@typescript-eslint/no-explicit-any': 0, // 特殊情况可将类型显示设置为any
      '@typescript-eslint/interface-name-prefix': 0, // 允许接口命名以I开头
      '@typescript-eslint/no-var-requires': 0, // antd中引用style需要用require
      '@typescript-eslint/no-use-before-define': 0, // mapStateToProps在之前就用到(typeof推断类型)
      '@typescript-eslint/camelcase': 0, // 驼峰命名格式
      '@typescript-eslint/no-empty-function': 0, // 给函数默认值可以为空
      'react/display-name': 0, // 一个莫名其妙的Bug
      'react/no-find-dom-node': 0,
      '@typescript-eslint/no-non-null-assertion': 0, // 允许用！断言不为空
      '@typescript-eslint/ban-types': 0, //允许定义成Function
    },
    settings: {
      //自动发现React的版本，从而进行规范react代码
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    parserOptions: {
      //指定ESLint可以解析JSX语法
      ecmaVersion: 2019,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
  };
```