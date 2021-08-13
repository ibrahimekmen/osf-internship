const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sentry = require('@sentry/node');
const tracing = require('@sentry/tracing');
const app = express();

sentry.init({
    dsn: "https://7244564833894140add9ebf97f4dc3b8@o952236.ingest.sentry.io/5901597",
    tracesSampleRate: 1.0,
});

const transaction = sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static',express.static('./public'));

app.set('view engine','pug');

const mainRoutes = require('./routes');
const productRoutes = require('./routes/products');
const subcategoryRoutes = require('./routes/subcategories');
const registerRoutes = require('./routes/register');


get_breadcrumbs = function(url) {
    var rtn = [{name: "HOME", url: "/"}];
    var acc = ""; 
    var arr = url.substring(1).split("/");

    for (i=0; i<arr.length; i++){
        if(arr[i] === "product"){
            continue;
        }
        acc = i != arr.length-1 ? acc+"/"+arr[i] : null;
        arr[i] = arr[i].replaceAll("%20"," ");
        arr[i] = arr[i].replaceAll("?","");
        rtn[i+1] = {name: arr[i].toUpperCase(), url: acc};
    }
    return rtn;
};

app.use(function(req, res, next) {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);
    next();
});

app.use(mainRoutes);
app.use('/product', productRoutes);
app.use('/subcategories', subcategoryRoutes);
app.use('/register', registerRoutes);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
  });

app.listen(3000);