$(document).ready(function() {


$('form').submit(function(e) {
   e.preventDefault();
 var input=$('#search').val();
 if(input!==null || "" || undefined)
   {
     $('.pageClass').remove();
 $('#search').addClass('searching').val('');
   setTimeout(function() {

      $('#search').removeClass('searching');
   }, 1000);

// console.log(input);
 url(input);
   }
 else{

 }
});

function url(txt){
var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=7&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
   var call = '&callback=?';
 $.getJSON(api+txt+call,getData,'jsonp');
}

function getData(data){
 var pages=data.query.pages;
 var keys=Object.keys(pages);
 var ids=[];
 var titles=[];
 var contents=[];
 keys.forEach(function(val){
      ids.push(pages[val].pageid);
      titles.push(pages[val].title);
      contents.push(pages[val].extract);
 });
 listArticle(ids,titles,contents);
 //console.log(titles);
 //console.log(JSON.stringify(pages));
}

function listArticle(ids,titles,contents)
{
 var page = 'https://en.wikipedia.org/?curid=';
 for(var i=0;i<ids.length;i++)
   {

     $('.resultList').append('<a href="'+page+ids[i]+'" target="_Blank" class="pageClass"><li><h2>'+titles[i]+'</h2><p>'+contents[i]+'</p></li></a>');
   }
 $('.close_btn').removeClass('hide');
}

$('.btn').click(function(){
 $('.pageClass').remove();
 $('.close_btn').addClass('hide');
});


});
