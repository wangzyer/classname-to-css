# classname-to-css
原子化样式类自动转化为css样式

## example

```html
   <section className={classNames('o-fs40 o-mt50')}>
            <h1 className="o-fs34 o-mb80">Webpack React</h1>
            <p><img className="o-w200" src={Logo} alt={''}/></p>
            <p>Start a new project</p>
   </section>
```

上面的类名将会转化成为以下样式

```css
.o-fs40{font-size:0.053vw}.o-mt50{margin-top:0.067vw}.o-fs34{font-size:0.045vw}.o-mb80{margin-bottom:0.107vw}.o-w200{width:0.267vw}
```

## 配置
```javascript
...
    plugin:[
           new ClassName2CSSPlugin({
                 unit: 'vw'
           })
    ]
...

```

|  Name   | Type  | Default | Description
|  ----  | ----  | ----  | ----  |
| unit  | string | px  | 转化成css的单位，支持vw，rem |
| htmlFontSize  | number | 75 | unit为rem时有效，html fontsize的大小 |
| output  | string | 'webpack的output目录下的/css/classname2css.{hash}.css' | 转化后webpack的output目录下输出路径 |

## 转化规则

命名规则：前缀o-原子化名字数字

例：o-mt30 -> margin-top: 30px

目前支持的转化样式：

| 转化前 | 转化后 |
| --- | --- |
|  mt | margin-top |
| mt|margin-top|
| mb| margin-bottom|
| ml| margin-left|
| mr| margin-right|
| m| margin|
| pt| padding-top|
| pb| padding-bottom|
| pl| padding-left|
| pr| padding-right|
| p| padding|
| fs| font-size|
| w| width|
| h| height|
| lh| line-height|
| br| border-radius|




