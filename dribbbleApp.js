function createDOMElement(dribbbleResult) {
  var divElement = $('<div />');
  var imageURL = dribbbleResult.image_teaser_url;
  $('<img />').attr('src', imageURL).appendTo(divElement);
  return divElement;
}

function populateDIVWithDribbleResults(username) {
  $.ajax({
    url: 'http://api.dribbble.com/players/' + username + '/shots/following',
    method: 'get',
    dataType: 'jsonp',
    success: function(dribbbleResults) {
      var dribbbleElements = _.map(dribbbleResults.shots, function(dribbbleResult) {
        return createDOMElement(dribbbleResult);
      });
      $('#dribbble-gallery').fadeOut(400, function() {
        $("#dribbble-gallery").html("");
        $('#dribbble-gallery').append(dribbbleElements);
        $('#dribbble-gallery').fadeIn();
      });
    }});
}

$(document).ready(function(){

  $('#this > a').bind('click', function(){
    $('#this-content').removeClass('hidden').hide().fadeIn();
    $('#ifthisthenthat').fadeTo("slow", 0.33);
  });

  $('#portrait').hover(function(){
    $(this).attr("src", "face_laugh.png");
  }, function () {
    $(this).attr("src", "face_smile.png");
  });
  
  $('#next-btn').bind('click', function(){
    $('#this-content').fadeOut(400, function() {
      $('#that-content').removeClass('hidden').hide().fadeIn();
    }).addClass('hidden');
    $('#this').html($('#this a').html());
    $('#that').html('<a href="#">'+ $('#that').html() + '</a>');
  });
  
  $('#dribbble-btn').bind('click', function(){
    populateDIVWithDribbleResults($('#dribbble-input').val());
  });
  populateDIVWithDribbleResults("livienyin");


});
