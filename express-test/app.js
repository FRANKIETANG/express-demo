const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置 views 文件夹为视图文件的目录，存放模板文件，__dirname 为全局变量，存储着当前正在执行脚本所在文件夹的绝对路径
app.set('view engine', 'ejs'); // 设置视图模版引擎为 ejs

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/**
 *  Express 依赖于 connect，提供了大量的中间件，可以通过  app.use 启用
 *
 *  app.use([path], function)：使用中间件 function，可选参数path默认为'/'
 *  app.use(express.favicon())：connect 内建的中间件，使用默认的 favicon 图标，
 *  如果想使用自己的图标，需改为app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
 *  这里我们把自定义的 favicon.ico 放到了 public/images 文件夹下。
 */
app.use(logger('dev'));
/**
 *  connect 内建的中间件，在开发环境下使用，在终端显示简单的不同颜色的日志，比如在启动 app.js 后访问 localhost:3000，终端会输出：
 *  Express server listening on port 3000 GET / 200 21ms - 206b GET /stylesheets/style.css 304 4ms
 *  数字200显示为绿色，304显示为蓝色。假如你去掉这一行代码，不管你怎么刷新网页，终端都只有一行 Express server listening on port 3000。
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * bodyParser作用是对post请求的请求体进行解析
 * bodyParser用于解析客户端请求的body中的内容,内部使用JSON编码处理,url编码处理以及对于文件的上传处理
 */
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 *  设置静态文件目录
 *  express.static指定了静态页面的查找目录，如果定义express.static('/var/www')，
 *  当用户向node请求http://server/file.html，node将会自动查找/var/www下面找server/file.html
 */

//  是一个路由控制器，用户如果访问“ / ”路径，则由 routes.index 来控制。
app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
// 上面全部走完没有结果就 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 错误信息会经过 error.ejs 渲染出来
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
