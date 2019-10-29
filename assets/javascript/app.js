// jQuery Tool botton from Materialize.com

$('.fixed-action-btn').floatingActionButton({
    toolbarEnabled: true
});

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});
