const HtmlWebpackPlugin = require('html-webpack-plugin');
const {RawSource} = require('webpack-sources');
const classNameToStyle = require('./core/classNameToStyle');
const extractClassName = require('./core/extractClassName');


class ClassNames2CSSS {
    constructor(options) {
        // hash值
        this.hash = Math.floor(Math.random() * 10000) + '';

        // 是否开发模式
        this.isDev = options.isDev;

        // 样式转化相关
        this.classname2css = {
            // css类名列表
            mooCssArray: new Set(),
            // 转化单位
            unit: options.unit || 'px',
            // 输出文件名
            cssFileName: `css/classname2css.${this.hash}.css`,
            // 单位转化基准
            standard: (options.viewportUnit / 100) || options.htmlFontSize || null,
            // id
            elementID: `ClassNames2CSS${this.hash}`
        };
    }

    apply(compiler) {
        compiler.hooks.compilation.tap('classname2css', compilation => {
            compilation.hooks.optimizeChunkAssets.tapAsync('classname2css', (chunks, callback) => {
                chunks.forEach(chunk => {
                    chunk.files.forEach(file => {

                        // 提取原子化样式
                        if (file.indexOf('.css') === -1) {
                            const source = compilation.assets[file].source();
                            let classNames = extractClassName(source);
                            classNames.forEach((value) => this.classname2css.mooCssArray.add(value))
                        }

                        if (this.isDev) {
                            // 样式热更新
                            if (~file.indexOf('hot-update.js')) {
                                compilation.assets[file].children.splice(9, 0, new RawSource(`eval("document.getElementById('${this.classname2css.elementID}').innerHTML = '${classNameToStyle(this.classname2css.mooCssArray, this.classname2css.viewportUnit)}'");`))
                            }
                        }

                    });
                });
                callback()
            });

            HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
                'classname2css',
                (data, cb) => {
                    if (!this.isDev) {
                        // 添加css文件引用
                        data.assets.css.push(this.classname2css.cssFileName);
                    }
                    cb(null, data)
                }
            );

            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'classname2css',
                (data, cb) => {
                    if (this.isDev) {
                        // 增加css样式内联 本地开发环境直接内联到HTML中
                        data.html = data.html.replace('</head>', `<style type="text/css" id='${this.classname2css.elementID}'>${classNameToStyle(this.classname2css.mooCssArray, this.classname2css.unit, this.classname2css.standard)}</style></head>`);
                    }
                    cb(null, data)
                }
            );
        });

        compiler.hooks.emit.tap('classname2css', compilation => {
            if (!this.isDev) {
                // 添加css资源
                compilation.assets[this.classname2css.cssFileName] = new RawSource(classNameToStyle(this.classname2css.mooCssArray, this.classname2css.standard))
            }
        });
    }
}

module.exports = ClassNames2CSSS;
