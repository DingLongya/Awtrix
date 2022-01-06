$(function () {
    $('.dd').nestable({
        maxDepth:1
    });

    $('.dd').on('change', function () {
        var $this = $(this);
        var serializedData = window.JSON.stringify($($this).nestable('serialize'));
        awtrix_raiseEvent("list_changed", { "list": serializedData });
    });
});