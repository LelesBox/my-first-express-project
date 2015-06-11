define([], function() {
    var hasClass = function(elements, cName) {
        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    };
    return {
        hasClass: hasClass,
        addClass: function(element, cname) {
            if (!hasClass(element, cname)) {
                element.className += " " + cname;
            };
        },
        removeClass: function(element, cname) {
            if (hasClass(element, cname)) {
                element.className = element.className.replace(new RegExp("(\\s|^)" + cname + "(\\s|$)"), " ");
            };
        }
    }
})