$(function() {



  $('#addressBox-link').click(function(e) {
    $('#restWrap').show();

    $('html,body').animate({ scrollTop: jQuery('#productionWrap').offset().top}, 1000);
    e.preventDefault();

    var addressData = $("#addressBox-input").val();

    console.log(addressData);

    $.ajax({
      method: "get",
      url: "http://test.soldout.tk/get_energy.php",
      data: {
        address: addressData,
        sunshine: 1
      },
      success: function(res) {
        console.log(res);
        $("#sunlightHoursNumber").text(res);
      }
    });



    return false;
  });

});
