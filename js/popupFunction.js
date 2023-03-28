$.extend($.expr[':'], {
  'containsi': function(elem, i, match, array)
  {
    return (elem.textContent || elem.innerText || '').toLowerCase()
    .indexOf((match[3] || "").toLowerCase()) >= 0;
  }
});


function loadPopups(elementToFilter){
    $.getJSON("/armazenzinho/data/all.json", function(data, status) {            
        //Para cada texto do Json, realizo a consulta na página.
        $.each(data, function(index, item){
            //Listar todos os elementos que contém determinado texto
            var elementsHtml = $(':containsi("'+ item.titulo +'"):not([data-toggle]):not([class="popup"]):not("script"):not("style"):not("img")', elementToFilter);
            
            //Pra cada elemento encontrado realizo o replace com o Span do Popup
            for (count = 0; elementsHtml.length > count; count ++) {
                if ($(elementsHtml[count]).children().length == 0){
                    //Para o caso de haver repetições de mesmo texto em um elemento, realizo um replaceAll
                    $(elementsHtml[count]).html($(elementsHtml[count]).html().replace(new RegExp("\\b" + item.titulo + "\\b" , "i"),
                                x => {
                                    /* x:Se o link estará Maiúsculo ou minúsculo depende de como o texto foi escrito */
                                    return '<spam id="popup' + Math.floor((Math.random() * 99999999) + 1) + '" data-toggle="popover" title="' + item.titulo 
                                        + '" data-content="' + item.text + '"><b class="popup">' + x/*item.titulo*/ + '</b></spam>'
                                }
                                
                    ));
                    break;
                }
            }
        });

        document.querySelectorAll('[data-toggle="popover"]').forEach(item => {
            
            if(item.className != "img-tio-denis"){
                item.addEventListener('mouseover', showPopUp);
                item.addEventListener('mouseout', hidePopup);           
                item.addEventListener('click', clickPopup);
            }
        });  
    });
}

var showingByClick = undefined;

function showPopUp(event) {
    var target = $('#' + event.currentTarget.id);      
    if (showingByClick && showingByClick != event.currentTarget.id){
        $('[data-toggle="popover"]').popover("hide");
            showingByClick = undefined;
    }
    target.popover("show");            
}

function hidePopup (event){
    if (showingByClick === undefined){
        var target = $('#' + event.currentTarget.id);
        target.popover("hide");
    }
}

function clickPopup (event){
    
    $('[data-toggle="popover"]').popover("hide");

    showingByClick = event.currentTarget.id;
    $('#' + showingByClick).popover("toggle");
    
    event.stopPropagation();
    window.event.cancelBubble = true
}

document.onclick = function onClick (){
    $('[data-toggle="popover"]:not(".img-tio-denis")').popover("hide");
    showingByClick = undefined;
}