/**
 * Created by 14062539 on 2015/4/2.
 */
define([], function () {
    return ["$http", "$upload", "$q", function ($http, $upload, $q) {
        var uploadFile = function (files, url, filename) {
            var d = $q.defer();
            if (files && files.length) {
                var file = files[0];
                $upload.upload({
                    url: url,
                    fields: {'username': 'leebox', 'filename': filename || file.name},
                    fileName: file.name,
                    file: file
                }).progress(function (evt) {
                    d.notify(parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    d.resolve(data);
                }).error(function (err) {
                    d.reject(err);
                });
            } else {
                d.reject("files is null");
            }
            return d.promise;
        };
        return {
            uploadFile: uploadFile
        }
    }]
});