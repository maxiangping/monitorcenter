; (function (global, dt) {
    global.search = (function (search) {
        var pairs = search.slice(1).split('&')

        var result = {}
        pairs.forEach(function (pair) {
            var idx
            if (pair && (idx = pair.indexOf('=')) !== -1) {
                var name = pair.slice(0, idx)
                //兼容写法
                result[name] = result[name.toLocaleLowerCase()] = decodeURIComponent(pair.substr(idx + 1) || '')
            }
        })

        return JSON.parse(JSON.stringify(result))
    })(location.search);

    var _ = {};
    _.copy = function(obj){
        if(!(obj instanceof Object)) throw new Error('argument is noObject');
        if(Array.isArray(obj)) return obj.slice();

        var tempObj = {},
            self = this;
        if(obj && typeof obj === 'object'){
            Object.keys(obj).forEach(key => {
                var node = obj[key];
                if(node && typeof node === 'object'){
                    tempObj[key] = self.copy(node);
                    return;
                }
                tempObj[key] = node;
            });
        }
        return tempObj;
    }
    
})(window, window.document);