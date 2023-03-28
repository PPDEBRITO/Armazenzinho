var criarBuscaGoogle = function() {
    var cx = '000359453723870088808:qbbgmowm2wk';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  };

var exibirPesquisar = function (visivel) {
    if (visivel) {
        $('#divPesquisar').show(400);
        document.body.style.overflowY = "hidden";
    } else {
        $('#divPesquisar').hide(400);
        document.body.style.overflowY = "visible";
    }
};  

var carregar = function () {
    criarBuscaGoogle();

    $('#btnPesquisar').click(function() { exibirPesquisar(true); });
    $('#btnFecharPesquisar').click(function () { exibirPesquisar(false); });
};

$(function () {
    carregar();
})
