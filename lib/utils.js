const utils = {};

utils.fileExtension = (url) => {
    // about-us                     return ''
    // css/main.css                 return 'css'
    // css/main.css?v=2             return 'css'
    // css/main.css?version=2.0.5   return 'css'
    // css/fontawesome.min.css      return 'css'
    // js/main.js                   return 'js'
    // img/logo.png                 return 'png'

//  css/main.css?version=2.0.5
//  split(?) -> [css/main.css, version=2.0.5]
//  [0]
//  css/main.css
//  split(.) -> [css/main.css]  
//  last
//  css

    const parts = url.split('?')[0].split('.');
    if (parts.length < 2) {
        return '';
    }
   
    return parts[parts.length - 1];
}

export { utils };