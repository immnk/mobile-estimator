'use strict';

directives.directive('cssImgUrl', function() {
    return function(scope, element, attrs) {
        var url = attrs.cssImgUrl ? attrs.cssImgUrl : '../img/sirius.png';
        var overlayColor = attrs.color ? attrs.color : 'rgba(0, 0, 0, 0.5)';
        element.css({
            'background-image': '-webkit-gradient(to bottom right, ' + overlayColor + ', ' + overlayColor + '), url(' + url + ')',
            'background-image': 'linear-gradient(to bottom right, ' + overlayColor + ', ' + overlayColor + '), url(' + url + ')',
            'background-size': 'cover',
            'background-position': '50% 50%'
        });
    };
});
